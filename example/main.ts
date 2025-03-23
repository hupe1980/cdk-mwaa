import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import * as mwaa from '../src';

export class MwaaExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new VPC
    const vpc = new mwaa.PublicRoutingVpc(this, 'MyMwaaVpc', {
      natGateways: 1,
    });

    const dagStorage = new mwaa.DagStorage(this, 'MyMwaaDagStorage', {
      bucketName: 'my-mwaa-dag-storage',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      dagsOptions: {
        localPath: path.join(__dirname, 'dags'),
        s3Path: 'dags/',
        deployOptions: {
          logRetention: logs.RetentionDays.ONE_DAY,
        },
      },
      configsOptions: {
        localPath: path.join(__dirname, 'configs'),
        s3Prefix: 'configs/',
        requirements: { name: 'requirements.txt' },
        deployOptions: {
          logRetention: logs.RetentionDays.ONE_DAY,
        },
      },
    });

    // Create the MWAA environment
    const environment = new mwaa.Environment(this, 'MyMwaaEnvironment', {
      name: 'MyMwaaEnv',
      executionRoleName: 'MyMwaaExecutionRole',
      dagStorage,
      vpc: vpc,
      airflowVersion: '2.10.3',
      sizing: mwaa.Sizing.mw1Micro(),
      loggingConfiguration: {
        dagProcessingLogs: {
          enabled: true,
          logLevel: mwaa.LogLevel.INFO,
          retention: logs.RetentionDays.ONE_WEEK,
        },
        webserverLogs: {
          enabled: true,
          logLevel: mwaa.LogLevel.INFO,
          retention: logs.RetentionDays.ONE_WEEK,
        },
      },
    });

    environment.enableSecretsBackend();

    new mwaa.AirflowPool(this, 'MyMwaaPool', {
      environment,
      poolName: 'my_pool',
      poolSlots: 3,
      poolDescription: 'My custom pool',
    });
  }
}

const app = new cdk.App();

new MwaaExampleStack(app, 'MwaaExampleStack', { 
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT, 
        region: process.env.CDK_DEFAULT_REGION,
    }
});

app.synth();