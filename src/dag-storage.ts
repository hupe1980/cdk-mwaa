import * as fs from 'node:fs';
import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib';
import * as logs from 'aws-cdk-lib/aws-logs';
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

  /** Log retention settings for the deployment. */
  readonly logRetention?: logs.RetentionDays;
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

  /**
   * The S3 path where the plugins file is stored.
   * This is the full path in the S3 bucket, including the prefix and file name.
   */
  public readonly pluginsS3Path?: string;

  /**
   * The version ID of the plugins file in S3, if versioning is enabled for the bucket.
   * This allows referencing a specific version of the plugins file.
   */
  public readonly pluginsS3ObjectVersion?: string;

  /**
   * The S3 path where the requirements file is stored.
   * This is the full path in the S3 bucket, including the prefix and file name.
   */
  public readonly requirementsS3Path?: string;

  /**
   * The version ID of the requirements file in S3, if versioning is enabled for the bucket.
   * This allows referencing a specific version of the requirements file.
   */
  public readonly requirementsS3ObjectVersion?: string;

  /**
   * The S3 path where the startup script is stored.
   * This is the full path in the S3 bucket, including the prefix and file name.
   */
  public readonly startupScriptS3Path?: string;

  /**
   * The version ID of the startup script in S3, if versioning is enabled for the bucket.
   * This allows referencing a specific version of the startup script.
   */
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
      const { s3Prefix = 'configs/', requirements, plugins, startupScript, localPath } = props.configsOptions;

      if (localPath && requirements) {
        // Check if the requirements file contains the Airflow constraints URL
        const requirementsFilePath = joinPaths(localPath, requirements.name);
        if (requirementsFilePath && !hasAirflowConstraint(requirementsFilePath)) {
          throw new Error('The requirements file does not contain the Airflow constraints.');
        }
      }

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
  private deployDags(opts: DagsOptions | undefined): void {
    if (opts?.localPath) {
      new s3deploy.BucketDeployment(this, 'DagsDeployment', {
        sources: [s3deploy.Source.asset(opts.localPath, {
          exclude: opts.deployOptions?.exclude,
        })],
        destinationBucket: this.bucket,
        destinationKeyPrefix: opts.s3Path,
        retainOnDelete: opts.deployOptions?.retainOnDelete,
        prune: opts.deployOptions?.prune,
        logRetention: opts.deployOptions?.logRetention,
      });
    }
  }

  /**
   * Deploys configuration files to the S3 bucket if a local path is specified.
   */
  private deployConfigs(opts: ConfigsOptions | undefined): void {
    if (opts?.localPath) {
      new s3deploy.BucketDeployment(this, 'ConfigsDeployment', {
        sources: [s3deploy.Source.asset(opts.localPath, {
          exclude: opts.deployOptions?.exclude,
        })],
        destinationBucket: this.bucket,
        destinationKeyPrefix: opts.s3Prefix,
        retainOnDelete: opts.deployOptions?.retainOnDelete,
        prune: opts.deployOptions?.prune,
        logRetention: opts.deployOptions?.logRetention,
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

/**
 * Checks if the requirements.txt file contains the Airflow constraint URL.
 * @param filePath The local path to the requirements.txt file.
 * @returns `true` if the constraint is found, otherwise `false`.
 */
function hasAirflowConstraint(filePath: string): boolean {
  try {
    // Read the file contents
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if it contains the Airflow constraints URL
    return content.includes('--constraint "https://raw.githubusercontent.com/apache/airflow/constraints-');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return false; // Return false if the file cannot be read
  }
}