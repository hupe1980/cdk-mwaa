import { Lazy, Stack, Tags } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as mwaa from 'aws-cdk-lib/aws-mwaa';
import { Construct } from 'constructs';

import { DagStorage } from './dag-storage';
import { SecurityGroup } from './security-group';
import { Sizing } from './sizing';

/**
 * Enum for the webserver access mode of the MWAA environment.
 */
export enum WebserverAccessMode {
  PRIVATE_ONLY = 'PRIVATE_ONLY',
  PUBLIC_ONLY = 'PUBLIC_ONLY',
}

/**
 * Enum for the endpoint management type for the MWAA environment.
 */
export enum EndpointManagement {
  CUSTOMER = 'CUSTOMER',
  SERVICE = 'SERVICE',
}

/**
 * Enum for the log level for Apache Airflow.
 */
export enum LogLevel {
  CRITICAL = 'CRITICAL',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

/**
 * Options for configuring the Secrets backend.
 */
export interface SecretsBackendOptions {
  readonly connectionsPrefix?: string;
  readonly connectionsLookupPattern?: string;
  readonly variablesPrefix?: string;
  readonly variablesLookupPattern?: string;
}

/**
 * Options for configuring the Email backend.
 */
export interface EmailBackendOptions {
  readonly fromEmail: string;
  readonly connId?: string;
}

/**
 * Defines the logging configuration properties for various Airflow log types.
 */
export interface LoggingConfigurationProperty {
  /**
   * Indicates whether to enable the Apache Airflow log type (e.g. DagProcessingLogs) in CloudWatch Logs.
   */
  readonly enabled?: boolean;

  /**
   * Defines the log level for the specified log type (e.g. DagProcessingLogs).
   * Valid values: CRITICAL, ERROR, WARNING, INFO, DEBUG.
   */
  readonly logLevel?: LogLevel;
}

/**
 * Logging configuration for the MWAA environment.
 */
export interface LoggingConfiguration {
  readonly dagProcessingLogs?: LoggingConfigurationProperty;
  readonly schedulerLogs?: LoggingConfigurationProperty;
  readonly taskLogs?: LoggingConfigurationProperty;
  readonly webserverLogs?: LoggingConfigurationProperty;
  readonly workerLogs?: LoggingConfigurationProperty;
}

/**
 * Properties for creating an MWAA environment.
 */
export interface EnvironmentProps {
  readonly airflowVersion: string; // Version of Apache Airflow to use
  readonly airflowConfigurationOptions?: { [key: string]: any }; // Airflow configuration options
  readonly name: string; // The name of the MWAA environment
  readonly dagStorage: DagStorage; // Storage for the DAGs
  readonly vpc: ec2.IVpc; // VPC where MWAA environment is created
  readonly securityGroups?: ec2.ISecurityGroup[]; // Security groups for the MWAA environment
  readonly webserverAccessMode?: WebserverAccessMode; // Webserver access mode (default: PUBLIC_ONLY)
  readonly endpointManagement?: EndpointManagement; // Defines whether the VPC endpoints are managed by the customer or by MWAA
  readonly sizing: Sizing; // Sizing configuration for MWAA environment
  readonly kmsKey?: kms.IKey; // KMS key for encryption (optional)
  readonly loggingConfiguration?: LoggingConfiguration; // Airflow logs configuration
  readonly weeklyMaintenanceWindowStart?: string; // Weekly maintenance window start time
  readonly tags?: { [key: string]: string }; // Tags to apply to MWAA environment
}

/**
 * Represents an MWAA environment.
 */
export class Environment extends Construct {
  public readonly name: string; // Name of the MWAA environment
  public readonly arn: string; // ARN of the MWAA environment
  public readonly celeryExecutorQueue: string; // ARN for Celery Executor queue
  public readonly databaseVpcEndpointService: string; // VPC endpoint for RDS database
  public readonly dagProcessingLogsGroupArn: string; // ARN for DAG processing logs group
  public readonly schedulerLogsGroupArn: string; // ARN for scheduler logs group
  public readonly taskLogsGroupArn: string; // ARN for task logs group
  public readonly webserverLogsGroupArn: string; // ARN for webserver logs group
  public readonly workerLogsGroupArn: string; // ARN for worker logs group
  public readonly webserverUrl: string; // URL for the web server
  public readonly webserverVpcEndpointService: string; // VPC endpoint for web server

  private airflowConfigurationOptions: { [key: string]: any }; // Airflow configuration options
  private executionRole: iam.Role; // IAM execution role for MWAA environment

  /**
   * Creates an MWAA environment.
   * @param scope - The scope of the construct.
   * @param id - The unique ID of the construct.
   * @param props - The properties for the MWAA environment.
   */
  constructor(scope: Construct, id: string, props: EnvironmentProps) {
    super(scope, id);

    const { region, account } = Stack.of(this);

    // Default Airflow configuration options
    this.airflowConfigurationOptions = {
      'scheduler.catchup_by_default': false,
      ...props.airflowConfigurationOptions ?? {},
    };

    const executionPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['airflow:PublishMetrics'],
          resources: [`arn:aws:airflow:${region}:${account}:environment/${props.name}`],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.DENY,
          actions: ['s3:ListAllMyBuckets'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
          resources: [props.dagStorage.bucket.bucketArn, `${props.dagStorage.bucket.bucketArn}/*`],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'logs:CreateLogStream',
            'logs:CreateLogGroup',
            'logs:PutLogEvents',
            'logs:GetLogEvents',
            'logs:GetLogRecord',
            'logs:GetLogGroupFields',
            'logs:GetQueryResults',
          ],
          resources: [
            `arn:aws:logs:${region}:${account}:log-group:airflow-${props.name}-*`,
          ],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['cloudwatch:PutMetricData'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['sqs:ChangeMessageVisibility', 'sqs:DeleteMessage', 'sqs:GetQueueAttributes', 'sqs:ReceiveMessage'],
          resources: [`arn:aws:sqs:${region}:*:airflow-celery-*`],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'kms:Decrypt',
            'kms:DescribeKey',
            'kms:GenerateDataKey*',
            'kms:Encrypt',
          ],
          notResources: [`arn:aws:kms:*:${account}:key/*`],
          conditions: {
            StringLike: {
              'kms:ViaService': [`sqs.${region}.amazonaws.com`],
            },
          },
        }),
      ],
    });

    // Cross-service confused deputy prevention
    const conditions = {
      ArnLike: {
        'aws:SourceArn': `arn:aws:airflow:${region}:${account}:environment/${props.name}`,
      },
      StringEquals: {
        'aws:SourceAccount': account,
      },
    };

    // Creating the IAM execution role
    this.executionRole = new iam.Role(this, 'MWAAExecutionRole', {
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('airflow.amazonaws.com', { conditions }),
        new iam.ServicePrincipal('airflow-env.amazonaws.com', { conditions }),
      ),
      path: '/service-role/',
      inlinePolicies: {
        mwaaExecutionPolicy: executionPolicy,
      },
    });

    const weeklyMaintenanceWindowStart = this.validateWeeklyMaintenanceWindowStart(props.weeklyMaintenanceWindowStart);

    // Security group for MWAA environment
    const securityGroups = props.securityGroups ?? [new SecurityGroup(this, 'MWAAEnvironmentSecurityGroup', {
      vpc: props.vpc,
    })];

    // Creating the MWAA environment
    const environment = new mwaa.CfnEnvironment(this, 'MWAAEnvironment', {
      airflowVersion: props.airflowVersion,
      airflowConfigurationOptions: Lazy.any({ produce: () => this.airflowConfigurationOptions }),
      name: props.name,
      executionRoleArn: this.executionRole.roleArn,
      sourceBucketArn: props.dagStorage.bucket.bucketArn,
      dagS3Path: props.dagStorage.dagS3Path,
      pluginsS3Path: props.dagStorage.pluginsS3Path,
      pluginsS3ObjectVersion: props.dagStorage.pluginsS3ObjectVersion,
      requirementsS3Path: props.dagStorage.requirementsS3Path,
      requirementsS3ObjectVersion: props.dagStorage.requirementsS3ObjectVersion,
      startupScriptS3Path: props.dagStorage.startupScriptS3Path,
      startupScriptS3ObjectVersion: props.dagStorage.startupScriptS3ObjectVersion,
      environmentClass: props.sizing.environmentClass,
      maxWorkers: props.sizing.maxWorkers,
      minWorkers: props.sizing.minWorkers,
      maxWebservers: props.sizing.maxWebservers,
      minWebservers: props.sizing.minWebservers,
      schedulers: props.sizing.schedulers,
      webserverAccessMode: props.webserverAccessMode ?? WebserverAccessMode.PUBLIC_ONLY,
      networkConfiguration: {
        securityGroupIds: securityGroups.map(sg => sg.securityGroupId),
        subnetIds: props.vpc.privateSubnets.map(subnet => subnet.subnetId),
      },
      endpointManagement: props.endpointManagement,
      loggingConfiguration: props.loggingConfiguration,
      weeklyMaintenanceWindowStart: weeklyMaintenanceWindowStart,
    });

    environment.node.addDependency(props.dagStorage);
    environment.node.addDependency(this.executionRole);

    // Assign environment properties
    this.name = props.name;
    this.arn = environment.attrArn;
    this.celeryExecutorQueue = environment.attrCeleryExecutorQueue;
    this.databaseVpcEndpointService = environment.attrDatabaseVpcEndpointService;
    this.dagProcessingLogsGroupArn = environment.attrLoggingConfigurationDagProcessingLogsCloudWatchLogGroupArn;
    this.schedulerLogsGroupArn = environment.attrLoggingConfigurationSchedulerLogsCloudWatchLogGroupArn;
    this.taskLogsGroupArn = environment.attrLoggingConfigurationTaskLogsCloudWatchLogGroupArn;
    this.webserverLogsGroupArn = environment.attrLoggingConfigurationWebserverLogsCloudWatchLogGroupArn;
    this.workerLogsGroupArn = environment.attrLoggingConfigurationWorkerLogsCloudWatchLogGroupArn;
    this.webserverUrl = environment.attrWebserverUrl;
    this.webserverVpcEndpointService = environment.attrWebserverVpcEndpointService;

    // Apply tags if any
    if (props.tags) {
      for (const [key, value] of Object.entries(props.tags)) {
        Tags.of(environment).add(key, value);
      }
    }
  }

  /**
   * Enables the use of AWS Secrets Manager as a backend for storing Airflow connections and variables.
   * @param options - The configuration options for Secrets Manager backend.
   */
  public enableSecretsBackend(options?: SecretsBackendOptions): void {
    const defaultOptions = {
      connectionsPrefix: 'airflow/connections',
      variablesPrefix: 'airflow/variables',
    };

    const finalOptions = {
      ...defaultOptions,
      ...options,
    };

    this.airflowConfigurationOptions['secrets.backend'] = 'airflow.providers.amazon.aws.secrets.secrets_manager.SecretsManagerBackend';
    this.airflowConfigurationOptions['secrets.backend_kwargs'] = JSON.stringify({
      connections_prefix: finalOptions.connectionsPrefix,
      connections_lookup_pattern: finalOptions.connectionsLookupPattern,
      variables_prefix: finalOptions.variablesPrefix,
      variables_lookup_pattern: finalOptions.variablesLookupPattern,
    });

    const { region, account } = Stack.of(this);

    // Adding permissions for the Secrets Manager backend
    this.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'secretsmanager:GetResourcePolicy',
        'secretsmanager:GetSecretValue',
        'secretsmanager:DescribeSecret',
        'secretsmanager:ListSecretVersionIds',
      ],
      resources: [
        `arn:aws:secretsmanager:${region}:${account}:secret:${finalOptions.connectionsPrefix}/*`,
        `arn:aws:secretsmanager:${region}:${account}:secret:${finalOptions.variablesPrefix}/*`,
      ],
      conditions: {
        StringEquals: {
          'aws:ResourceTag/Environment': 'MWAA',
        },
      },
    }));

    this.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['secretsmanager:ListSecrets'],
      resources: ['*'],
      conditions: {
        StringEquals: {
          'aws:ResourceTag/Environment': 'MWAA',
        },
      },
    }));
  }

  /**
   * Enables the email backend for Airflow to send email notifications.
   * @param options - The configuration options for the email backend.
   */
  public enableEmailBackend(options: EmailBackendOptions): void {
    const connId = options.connId ?? 'aws_default';

    this.airflowConfigurationOptions['email.email_backend'] = 'airflow.providers.amazon.aws.utils.emailer.send_email';
    this.airflowConfigurationOptions['email.from_email'] = options.fromEmail;
    this.airflowConfigurationOptions['email.conn_id'] = connId;

    if (connId === 'aws_default') {
      this.addToRolePolicy(new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['ses:SendEmail'],
        resources: ['*'],
      }));
    }
  }

  /**
   * Adds a policy statement to the execution role's policy.
   *
   * @param statement - The IAM policy statement to add to the role's policy.
   */
  public addToRolePolicy(statement: iam.PolicyStatement): void {
    this.executionRole.addToPolicy(statement);
  }

  /**
   * Sets an Airflow configuration option.
   *
   * @param key - The configuration option key.
   * @param value - The configuration option value.
   * @returns void
   */
  public setAirflowConfigurationOption(key: string, value: any): void {
    this.airflowConfigurationOptions[key] = value;
  }

  /**
   * Validates the weekly maintenance window start time.
   * @param weeklyMaintenanceWindowStart - The weekly maintenance window start time in UTC (e.g., 'Sun:10:00').
   */
  private validateWeeklyMaintenanceWindowStart(weeklyMaintenanceWindowStart?: string): string | undefined {
    if (weeklyMaintenanceWindowStart) {
      const regex = /^([a-zA-Z]+):([0-9]{2}):([0-9]{2})$/;
      if (!weeklyMaintenanceWindowStart.match(regex)) {
        throw new Error('Invalid format for weeklyMaintenanceWindowStart. Expected format: "Day:HH:mm"');
      }
      return weeklyMaintenanceWindowStart;
    }
    return undefined;
  }
}
