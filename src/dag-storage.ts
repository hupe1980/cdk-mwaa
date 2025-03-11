import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

/**
 * Configuration options for S3 path storage.
 */
export interface DagStorageConfigOptions {
  /** The S3 path where the resource is stored */
  readonly s3Path: string;
  /** Optional object version for versioned buckets */
  readonly s3ObjectVersion?: string;
}

/**
 * Options for deploying files to the DAG storage bucket.
 */
export interface DagStorageDeployOptions {
  /** Sources to deploy into the bucket */
  readonly sources?: s3deploy.ISource[];
  /** Whether to retain files on deletion of the stack */
  readonly retainOnDelete?: boolean;
  /** Whether to prune old versions of deployed files */
  readonly prune?: boolean;
}

/**
 * Properties for configuring the DAG storage bucket.
 */
export interface DagStorageProps {
  /** Optional custom bucket name */
  readonly bucketName?: string;
  /** Enable versioning for the bucket */
  readonly versioned?: boolean;
  /** Lifecycle rule for expiring non-current versions */
  readonly noncurrentVersionExpiration?: cdk.Duration;
  /** Policy for bucket removal */
  readonly removalPolicy?: cdk.RemovalPolicy;
  /** Path for storing DAG files */
  readonly dagS3Path?: string;
  /** Configuration for plugins storage */
  readonly pluginsConfig?: DagStorageConfigOptions;
  /** Configuration for requirements storage */
  readonly requirementsConfig?: DagStorageConfigOptions;
  /** Configuration for startup script storage */
  readonly startupScriptConfig?: DagStorageConfigOptions;
  /** Options for deploying files into the bucket */
  readonly deployOptions?: DagStorageDeployOptions;
}

/**
 * Represents a storage location for MWAA DAGs and dependencies in an S3 bucket.
 */
export class DagStorage extends Construct {
  /** The S3 bucket storing DAGs, plugins, requirements, and startup scripts */
  public readonly bucket: s3.Bucket;
  /** S3 path for DAGs */
  public readonly dagS3Path?: string;
  /** Plugin storage configuration */
  public readonly pluginsConfig?: DagStorageConfigOptions;
  /** Requirements storage configuration */
  public readonly requirementsConfig?: DagStorageConfigOptions;
  /** Startup script storage configuration */
  public readonly startupScriptConfig?: DagStorageConfigOptions;

  constructor(scope: Construct, id: string, props: DagStorageProps) {
    super(scope, id);

    // Create S3 bucket with defined properties
    this.bucket = new s3.Bucket(this, 'DagStorageBucket', {
      bucketName: props.bucketName,
      versioned: props.versioned,
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
    this.dagS3Path = props.dagS3Path ?? 'dags/';
    this.pluginsConfig = props.pluginsConfig;
    this.requirementsConfig = props.requirementsConfig;
    this.startupScriptConfig = props.startupScriptConfig;

    // Deploy specified sources to the bucket if provided
    if (props.deployOptions?.sources && props.deployOptions?.sources.length > 0) {
      new s3deploy.BucketDeployment(this, 'DagStorageDeployment', {
        sources: props.deployOptions.sources,
        destinationBucket: this.bucket,
        retainOnDelete: props.deployOptions.retainOnDelete ?? false,
        prune: props.deployOptions.prune ?? true,
      });
    }
  }
}
