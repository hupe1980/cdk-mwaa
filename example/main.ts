import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib';
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
      },
      configsOptions: {
        localPath: path.join(__dirname, 'configs'),
        s3Prefix: 'configs/',
        requirements: { name: 'requirements.txt' },
      },
    });

    // Create the MWAA environment
    const environment = new mwaa.Environment(this, 'MyMwaaEnvironment', {
      name: 'MyMwaaEnv',
      dagStorage,
      vpc: vpc,
      airflowVersion: '2.10.3',
      sizing: mwaa.Sizing.mw1Micro(),
    });

    environment.enableSecretsBackend();
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