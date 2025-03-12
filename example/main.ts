import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as mwaa from '../src';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class ExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new VPC
    const vpc = new ec2.Vpc(this, 'MyMwaaVpc', {
      maxAzs: 2, // Default is all AZs in the region
      natGateways: 1,
      createInternetGateway: true,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'public-subnet',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'private-subnet',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],
    });

    const dagStorage = new mwaa.DagStorage(this, 'MyMwaaDagStorage', {
      bucketName: 'my-mwaa-dag-storage',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      dagsConfig: {
        localPath: path.join(__dirname, 'dags'),
        s3Path: 'dags/',
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

new ExampleStack(app, 'ExampleStack', { 
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT, 
        region: process.env.CDK_DEFAULT_REGION,
    }
});

app.synth();