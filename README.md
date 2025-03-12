# cdk-mwaa

This project provides an AWS CDK construct library for creating and managing Amazon Managed Workflows for Apache Airflow (MWAA) environments.

## Features

- Create and manage MWAA environments
- Configure environment properties such as webserver access mode, Airflow version, environment class, and more
- Validate and set default values for environment properties
- Automatically create and configure necessary AWS resources such as S3 buckets and VPCs

## Installation

To use this construct library in your AWS CDK project, add it as a dependency:

```sh
npm install cdk-mwaa
# or
yarn add cdk-mwaa
```

## Usage

Here is an example of how to use the `cdk-mwaa` construct library in your AWS CDK project:

```typescript
import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib';
import * as mwaa from 'cdk-mwaa';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'MwaaStack');

const dagStorage = new mwaa.DagStorage(stack, 'MyMwaaDagStorage', {
    bucketName: 'my-mwaa-dag-storage',
    dagsOptions: {
        localPath: path.join(__dirname, 'dags'),
        s3Path: 'dags/',
      },
    // additional configuration options...
});

new mwaa.Environment(stack, 'MyMwaaEnvironment', {
    name: 'my-mwaa-environment',
    dagStorage,
    airflowVersion: '2.10.3',
    sizing: mwaa.Sizing.mw1Micro(),
    // additional configuration options...
});

app.synth();
```

## Enabling Secrets Backend

To enable the secrets backend for your MWAA environment, you can use the `enableSecretsBackend` method. This allows you to securely manage secrets and environment variables.

Here is an example of how to enable the secrets backend in your MWAA environment:

```typescript
import * as cdk from 'aws-cdk-lib';
import * as mwaa from 'cdk-mwaa';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'MwaaStack');

const dagStorage = new mwaa.DagStorage(stack, 'MyMwaaDagStorage', {
    bucketName: 'my-mwaa-dag-storage',
    // additional configuration options...
});

const environment = new mwaa.Environment(stack, 'MyMwaaEnvironment', {
    name: 'my-mwaa-environment',
    dagStorage,
    airflowVersion: '2.10.3',
    sizing: mwaa.Sizing.mw1Micro(),
    // additional configuration options...
});

// Enabling Secrets Backend
environment.enableSecretsBackend();

app.synth();
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
