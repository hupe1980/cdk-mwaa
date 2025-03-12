import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

/**
 * Configuration options for DAG storage.
 */
export interface DagStorageConfigOptions {
  /** The S3 path where the resource is stored. */
  readonly s3Path: string;

  /** Optional local path for the resource. */
  readonly localPath?: string;

  /** Deployment options for DAG storage. */
  readonly deployOptions?: DagStorageDeployOptions;
}

export interface DagStorageConfigOptionsWithS3ObjectVersion extends DagStorageConfigOptions {
  /** S3 object version identifier. */
  readonly s3ObjectVersion?: string;
}

/**
 * Options for deploying files to the DAG storage bucket.
 */
export interface DagStorageDeployOptions {
  /** Patterns to exclude from deployment. */
  readonly exclude?: string[];

  /** Whether to retain files upon stack deletion. */
  readonly retainOnDelete?: boolean;

  /** Whether to remove outdated file versions. */
  readonly prune?: boolean;
}

/**
 * Properties for configuring the DAG storage bucket.
 */
export interface DagStorageProps {
  /** Custom bucket name (optional). */
  readonly bucketName?: string;

  /** Enable versioning for the bucket. */
  readonly versioned?: boolean;

  /** Lifecycle rule for expiring non-current object versions. */
  readonly noncurrentVersionExpiration?: cdk.Duration;

  /** Bucket removal policy. */
  readonly removalPolicy?: cdk.RemovalPolicy;

  /** Configuration for DAG storage. */
  readonly dagsConfig?: DagStorageConfigOptions;

  /** Configuration for plugins storage. */
  readonly pluginsConfig?: DagStorageConfigOptionsWithS3ObjectVersion;

  /** Configuration for requirements storage. */
  readonly requirementsConfig?: DagStorageConfigOptionsWithS3ObjectVersion;

  /** Configuration for startup script storage. */
  readonly startupScriptConfig?: DagStorageConfigOptionsWithS3ObjectVersion;
}

/**
 * Represents an S3 storage solution for MWAA DAGs and dependencies.
 */
export class DagStorage extends Construct {
  /** The S3 bucket storing DAGs, plugins, requirements, and startup scripts. */
  public readonly bucket: s3.Bucket;

  /** S3 path for DAGs. */
  public readonly dagS3Path?: string;

  /** Plugin storage configuration. */
  public readonly pluginsConfig?: DagStorageConfigOptionsWithS3ObjectVersion;;

  /** Requirements storage configuration. */
  public readonly requirementsConfig?: DagStorageConfigOptionsWithS3ObjectVersion;;

  /** Startup script storage configuration. */
  public readonly startupScriptConfig?: DagStorageConfigOptionsWithS3ObjectVersion;;

  constructor(scope: Construct, id: string, props: DagStorageProps) {
    super(scope, id);

    // Create S3 bucket with specified properties
    this.bucket = new s3.Bucket(this, 'DagStorageBucket', {
      bucketName: props.bucketName,
      versioned: props.versioned,
      bucketKeyEnabled: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: props.removalPolicy ?? cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: props.removalPolicy === cdk.RemovalPolicy.DESTROY,
    });

    // Apply lifecycle rule if versioning and expiration settings are provided
    if (props.versioned && props.noncurrentVersionExpiration) {
      this.bucket.addLifecycleRule({
        id: 'DeleteOldVersions',
        noncurrentVersionExpiration: props.noncurrentVersionExpiration,
      });
    }

    // Assign configuration properties
    this.dagS3Path = props.dagsConfig?.s3Path ?? 'dags/';
    this.pluginsConfig = props.pluginsConfig;
    this.requirementsConfig = props.requirementsConfig;
    this.startupScriptConfig = props.startupScriptConfig;

    // Deploy configurations if local paths are provided
    this.deployConfig(props.dagsConfig, 'DagsDeployment');
    this.deployConfig(props.pluginsConfig, 'PluginsDeployment');
    this.deployConfig(props.requirementsConfig, 'RequirementsDeployment');
    this.deployConfig(props.startupScriptConfig, 'StartupScriptDeployment');
  }

  private deployConfig(config: DagStorageConfigOptions | undefined, deploymentName: string): void {
    if (config?.localPath) {
      new s3deploy.BucketDeployment(this, deploymentName, {
        sources: [s3deploy.Source.asset(config.localPath, {
          exclude: config.deployOptions?.exclude,
        })],
        destinationBucket: this.bucket,
        destinationKeyPrefix: config.s3Path,
        retainOnDelete: config.deployOptions?.retainOnDelete ?? false,
        prune: config.deployOptions?.prune,
      });
    }
  }
}
