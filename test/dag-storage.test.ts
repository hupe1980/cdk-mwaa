import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { DagStorage, DagStorageProps } from '../src';

describe('DagStorage Snapshot Tests', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeEach(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');

    const props: DagStorageProps = {
      bucketName: 'test-bucket',
      versioned: true,
      noncurrentVersionExpiration: cdk.Duration.days(30),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      dagsOptions: { s3Path: 'dags/' },
      configsOptions: {
        s3Prefix: 'configs/',
        requirements: { name: 'requirements.txt' },
        plugins: { name: 'plugins.zip' },
        startupScript: { name: 'startup.sh' },
      },
    };

    new DagStorage(stack, 'DagStorage', props);
  });

  test('matches snapshot', () => {
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
  });

  test('S3 Bucket has correct properties', () => {
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'test-bucket',
      VersioningConfiguration: { Status: 'Enabled' },
      LifecycleConfiguration: Match.objectLike({
        Rules: [
          {
            NoncurrentVersionExpiration: { NoncurrentDays: 30 },
            Status: 'Enabled',
          },
        ],
      }),
    });
  });
});