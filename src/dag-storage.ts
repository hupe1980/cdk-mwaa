import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

/**
 * Options for deploying files to the DAG storage bucket.
 */
export interface DeployOptions {
  /** Patterns to exclude from deployment. */
  readonly exclude?: string[];

  /** Whether to retain files upon stack deletion. */
  readonly retainOnDelete?: boolean;

  /** Whether to remove outdated file versions. */
  readonly prune?: boolean;
}

/**
 * Configuration options for DAG storage.
 */
export interface DagsOptions {
  /** The S3 path where the DAGs are stored. */
  readonly s3Path?: string;

  /** Optional local path for DAGs before deployment. */
  readonly localPath?: string;

  /** Deployment options for DAG storage. */
  readonly deployOptions?: DeployOptions;
}

/**
 * Represents a configuration file stored in S3.
 */
export interface ConfigFile {
  /** The name of the configuration file. */
  readonly name: string;

  /** Optional S3 object version identifier. */
  readonly version?: string;
}

/**
 * Configuration options for storing configuration files in S3.
 */
export interface ConfigsOptions {
  /** The S3 prefix where configuration files are stored. */
  readonly s3Prefix?: string;

  /** Optional requirements file configuration. */
  readonly requirements?: ConfigFile;

  /** Optional plugins file configuration. */
  readonly plugins?: ConfigFile;

  /** Optional startup script file configuration. */
  readonly startupScript?: ConfigFile;

  /** Optional local path for the configuration files. */
  readonly localPath?: string;

  /** Deployment options for configuration storage. */
  readonly deployOptions?: DeployOptions;
}

/**
 * Properties for configuring the DAG storage bucket.
 */
export interface DagStorageProps {
  /** Optional custom bucket name. */
  readonly bucketName?: string;

  /** Whether to enable versioning for the bucket. */
  readonly versioned?: boolean;

  /** Lifecycle rule for expiring non-current object versions. */
  readonly noncurrentVersionExpiration?: cdk.Duration;

  /** Policy to determine bucket removal behavior. */
  readonly removalPolicy?: cdk.RemovalPolicy;

  /** Configuration for DAG storage. */
  readonly dagsOptions?: DagsOptions;

  /** Configuration for additional configuration files. */
  readonly configsOptions?: ConfigsOptions;
}

/**
 * Represents an S3 storage solution for MWAA DAGs and dependencies.
 */
export class DagStorage extends Construct {
  /** The S3 bucket storing DAGs, plugins, requirements, and startup scripts. */
  public readonly bucket: s3.Bucket;

  /** S3 path for DAGs. */
  public readonly dagS3Path?: string;

  /** S3 paths and object versions for configuration files. */
  public readonly pluginsS3Path?: string;
  public readonly pluginsS3ObjectVersion?: string;
  public readonly requirementsS3Path?: string;
  public readonly requirementsS3ObjectVersion?: string;
  public readonly startupScriptS3Path?: string;
  public readonly startupScriptS3ObjectVersion?: string;

  constructor(scope: Construct, id: string, props: DagStorageProps) {
    super(scope, id);

    // Create S3 bucket with specified properties
    this.bucket = new s3.Bucket(this, 'DagStorageBucket', {
      bucketName: props.bucketName,
      versioned: props.versioned,
      bucketKeyEnabled: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: false,
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
    this.dagS3Path = props.dagsOptions?.s3Path ?? 'dags/';
    if (props.configsOptions) {
      const { s3Prefix = 'configs/', requirements, plugins, startupScript } = props.configsOptions;

      this.requirementsS3Path = joinPaths(s3Prefix, requirements?.name);
      this.requirementsS3ObjectVersion = requirements?.version;
      this.pluginsS3Path = joinPaths(s3Prefix, plugins?.name);
      this.pluginsS3ObjectVersion = plugins?.version;
      this.startupScriptS3Path = joinPaths(s3Prefix, startupScript?.name);
      this.startupScriptS3ObjectVersion = startupScript?.version;
    }

    // Deploy configurations if local paths are provided
    this.deployDags(props.dagsOptions);
    this.deployConfigs(props.configsOptions);
  }

  /**
   * Deploys DAG files to the S3 bucket if a local path is specified.
   */
  private deployDags(config: DagsOptions | undefined): void {
    if (config?.localPath) {
      new s3deploy.BucketDeployment(this, 'DagsDeployment', {
        sources: [s3deploy.Source.asset(config.localPath, {
          exclude: config.deployOptions?.exclude,
        })],
        destinationBucket: this.bucket,
        destinationKeyPrefix: config.s3Path,
        retainOnDelete: config.deployOptions?.retainOnDelete,
        prune: config.deployOptions?.prune,
      });
    }
  }

  /**
   * Deploys configuration files to the S3 bucket if a local path is specified.
   */
  private deployConfigs(configs: ConfigsOptions | undefined): void {
    if (configs?.localPath) {
      new s3deploy.BucketDeployment(this, 'ConfigsDeployment', {
        sources: [s3deploy.Source.asset(configs.localPath, {
          exclude: configs.deployOptions?.exclude,
        })],
        destinationBucket: this.bucket,
        destinationKeyPrefix: configs.s3Prefix,
        retainOnDelete: configs.deployOptions?.retainOnDelete,
        prune: configs.deployOptions?.prune,
      });
    }
  }
}

/**
 * Utility function to join paths safely, ensuring a single '/' separator.
 */
function joinPaths(prefix: string, name: string | undefined): string | undefined {
  if (!name) {
    return undefined;
  }
  return path.posix.join(prefix, name);
}
