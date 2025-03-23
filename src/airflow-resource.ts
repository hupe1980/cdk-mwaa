import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as customResources from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { Environment } from './environment';


export interface AirflowResourceBaseProps {
  readonly environment: Environment;
  readonly resourceType: string;
  readonly properties: Record<string, any>;
  readonly airflowRole?: string;
}


export abstract class AirflowResourceBase extends Construct {
  constructor(scope: Construct, id: string, props: AirflowResourceBaseProps) {
    super(scope, id);

    const { region, account } = cdk.Stack.of(this);
    const mwaaEnvName = props.environment.name;
    const airlfowRole = props.airflowRole ?? 'Op';

    // IAM Role for Lambda
    const lambdaRole = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    lambdaRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
    );

    lambdaRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['airflow:InvokeRestApi'],
        resources: [`arn:aws:airflow:${region}:${account}:role/${mwaaEnvName}/${airlfowRole}`],
      }),
    );

    // Lambda Function
    const airflowLambda = new lambda.SingletonFunction(this, 'Lambda', {
      uuid: `github.com/hupe1980/cdk-mwaa/airflow/${props.resourceType}`,
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: `${props.resourceType}.on_event`,
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambdas')),
      timeout: cdk.Duration.seconds(30),
      role: lambdaRole,
    });

    // Custom Resource Provider
    const provider = new customResources.Provider(this, 'Provider', {
      onEventHandler: airflowLambda,
      logGroup: new logs.LogGroup(this, 'ProviderLogGroup', {
        retention: logs.RetentionDays.ONE_DAY,
      }),
    });

    // Custom Resource to trigger Lambda
    new cdk.CustomResource(this, 'Resource', {
      serviceToken: provider.serviceToken,
      properties: {
        MwaaEnvName: mwaaEnvName,
        ...props.properties,
      },
    });

    // Add dependency on the MWAA environment
    this.node.addDependency(props.environment);
  }
}
