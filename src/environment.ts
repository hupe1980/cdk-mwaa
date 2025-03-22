import { Lazy, Stack, Tags } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as logs from 'aws-cdk-lib/aws-logs';
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
   * Indicates whether to enable the Apache Airflow log type (e.g., DagProcessingLogs) in CloudWatch Logs.
   */
  readonly enabled?: boolean;

  /**
   * Defines the log level for the specified log type (e.g., DagProcessingLogs).
   * Valid values: CRITICAL, ERROR, WARNING, INFO, DEBUG.
   */
  readonly logLevel?: LogLevel;

  /**
   * Specifies the retention period for the log group in Amazon CloudWatch Logs.
   * Determines how long the logs should be kept before being automatically deleted.
   */
  readonly retention?: logs.RetentionDays;
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
  public readonly dagProcessingLogsGroup: logs.ILogGroup; // Log group for DAG processing logs
  public readonly schedulerLogsGroup: logs.ILogGroup; // Log group for scheduler logs
  public readonly taskLogsGroup: logs.ILogGroup; // Log group for task logs
  public readonly webserverLogsGroup: logs.ILogGroup; // Log group for webserver logs
  public readonly workerLogsGroup: logs.ILogGroup; // Log group for worker logs
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

    // Create the IAM execution role
    this.executionRole = this.createExecutionRole(props.name, props.dagStorage.bucket.bucketArn, region, account);

    // Validate the weekly maintenance window start time
    const weeklyMaintenanceWindowStart = this.validateWeeklyMaintenanceWindowStart(props.weeklyMaintenanceWindowStart);

    // Security group for MWAA environment
    const securityGroups = props.securityGroups ?? [new SecurityGroup(this, 'MWAAEnvironmentSecurityGroup', {
      vpc: props.vpc,
    })];

    // Create the MWAA environment
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

    // Create log groups with retention
    this.dagProcessingLogsGroup = this.createLogGroupWithRetention(
      'DagProcessingLogs',
      environment.attrLoggingConfigurationDagProcessingLogsCloudWatchLogGroupArn,
      props.loggingConfiguration?.dagProcessingLogs?.retention,
    );

    this.schedulerLogsGroup = this.createLogGroupWithRetention(
      'SchedulerLogs',
      environment.attrLoggingConfigurationSchedulerLogsCloudWatchLogGroupArn,
      props.loggingConfiguration?.schedulerLogs?.retention,
    );

    this.taskLogsGroup = this.createLogGroupWithRetention(
      'TaskLogs',
      environment.attrLoggingConfigurationTaskLogsCloudWatchLogGroupArn,
      props.loggingConfiguration?.taskLogs?.retention,
    );

    this.webserverLogsGroup = this.createLogGroupWithRetention(
      'WebserverLogs',
      environment.attrLoggingConfigurationWebserverLogsCloudWatchLogGroupArn,
      props.loggingConfiguration?.webserverLogs?.retention,
    );

    this.workerLogsGroup = this.createLogGroupWithRetention(
      'WorkerLogs',
      environment.attrLoggingConfigurationWorkerLogsCloudWatchLogGroupArn,
      props.loggingConfiguration?.workerLogs?.retention,
    );

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
   * Creates an IAM execution role for the MWAA environment.
   * @param name - The name of the MWAA environment.
   * @param bucketArn - The ARN of the DAG storage bucket.
   * @param region - The AWS region.
   * @param account - The AWS account ID.
   * @returns The IAM execution role.
   */
  private createExecutionRole(name: string, bucketArn: string, region: string, account: string): iam.Role {
    const executionPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['airflow:PublishMetrics'],
          resources: [`arn:aws:airflow:${region}:${account}:environment/${name}`],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.DENY,
          actions: ['s3:ListAllMyBuckets'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
          resources: [bucketArn, `${bucketArn}/*`],
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
          resources: [`arn:aws:logs:${region}:${account}:log-group:airflow-${name}-*`],
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
          actions: ['kms:Decrypt', 'kms:DescribeKey', 'kms:GenerateDataKey*', 'kms:Encrypt'],
          notResources: [`arn:aws:kms:*:${account}:key/*`],
          conditions: {
            StringLike: {
              'kms:ViaService': [`sqs.${region}.amazonaws.com`],
            },
          },
        }),
      ],
    });

    const conditions = {
      ArnLike: {
        'aws:SourceArn': `arn:aws:airflow:${region}:${account}:environment/${name}`,
      },
      StringEquals: {
        'aws:SourceAccount': account,
      },
    };

    return new iam.Role(this, 'MWAAExecutionRole', {
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('airflow.amazonaws.com', { conditions }),
        new iam.ServicePrincipal('airflow-env.amazonaws.com', { conditions }),
      ),
      path: '/service-role/',
      inlinePolicies: {
        mwaaExecutionPolicy: executionPolicy,
      },
    });
  }

  /**
   * Creates or references a CloudWatch log group and optionally sets its retention policy.
   * @param id - The unique ID for the log group.
   * @param logGroupArn - The ARN of the log group.
   * @param retention - The retention period for the log group.
   * @returns The log group.
   */
  private createLogGroupWithRetention(
    id: string,
    logGroupArn: string,
    retention?: logs.RetentionDays,
  ): logs.ILogGroup {
    const logGroup = logs.LogGroup.fromLogGroupArn(this, `${id}LogGroup`, logGroupArn);

    if (retention) {
      new logs.LogRetention(this, `${id}LogRetention`, {
        logGroupName: logGroup.logGroupName,
        retention: retention,
      });
    }

    return logGroup;
  }

  /**
   * Validates the weekly maintenance window start time.
   * @param weeklyMaintenanceWindowStart - The weekly maintenance window start time in UTC (e.g., 'Sun:10:00').
   * @returns The validated weekly maintenance window start time.
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

  /**
   * Enables the use of AWS Secrets Manager as a backend for storing Airflow connections and variables.
   * @param options - The configuration options for Secrets Manager backend.
   */
  public enableSecretsBackend(options?: SecretsBackendOptions): void {
    const defaultOptions: SecretsBackendOptions = {
      connectionsPrefix: 'airflow/connections',
      connectionsLookupPattern: '^(?!aws_default$).*$',
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
    }));

    this.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['secretsmanager:ListSecrets'],
      resources: ['*'],
    }));
  }

  /**
   * Enables the email backend for Airflow to send email notifications.
   *
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
}
