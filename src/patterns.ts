import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

import { DagStorage, DagsOptions, ConfigsOptions } from './dag-storage';
import { Environment, WebserverAccessMode } from './environment';
import { Sizing } from './sizing';

/**
 * Interface defining the properties for configuring MWAA (Managed Airflow).
 */
export interface MWAAProps {
  /**
   * The name of the Airflow environment.
   */
  readonly environmentName: string;

  /**
   * The version of Airflow to deploy.
   */
  readonly airflowVersion: string;

  /**
   * Optional sizing configuration for the MWAA environment.
   * Defines the compute resources.
   */
  readonly sizing?: Sizing;

  /**
   * The VPC in which to deploy the MWAA environment.
   * If not provided, a default VPC will be created.
   */
  readonly vpc?: ec2.IVpc;

  /**
   * The name of the S3 bucket used for storing DAGs.
   * If not provided, a default bucket is created.
   */
  readonly bucketName?: string;

  /** Configuration for DAG storage. */
  readonly dagsOptions?: DagsOptions;

  /** Configuration for plugins storage. */
  readonly configsOptions?: ConfigsOptions;

  /**
   * Airflow configuration options as key-value pairs.
   * These configuration options are passed to the Airflow environment.
   */
  readonly airflowConfigurationOptions?: { [key: string]: any };

  /**
   * The removal policy for the MWAA resources.
   * Determines what happens to the resources when they are deleted.
   * Defaults to 'RETAIN' if not specified.
   */
  readonly removalPolicy?: cdk.RemovalPolicy;
}

/**
 * PublicRoutingMWAA constructs a Managed Airflow (MWAA) environment with public webserver access.
 * It creates the necessary VPC, S3 storage for DAGs, and an Airflow environment.
 */
export class PublicRoutingMWAA extends Construct {
  constructor(scope: Construct, id: string, props: MWAAProps) {
    super(scope, id);

    // Create a VPC if not provided, with specific configuration for subnets and NAT Gateways
    const vpc = props.vpc ?? new ec2.Vpc(this, 'Vpc', {
      maxAzs: 2, // Use up to 2 Availability Zones
      natGateways: 2, // Use 2 NAT Gateways for internet access
      createInternetGateway: true, // Create an Internet Gateway for public access
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

    // Create the DAG storage (S3 bucket) for the MWAA environment
    const dagStorage = new DagStorage(this, 'DagStorage', {
      bucketName: props.bucketName,
      dagsOptions: props.dagsOptions,
      configsOptions: props.configsOptions,
      removalPolicy: props.removalPolicy ?? cdk.RemovalPolicy.RETAIN,
    });

    // Create the Airflow environment
    const environment = new Environment(this, 'Environment', {
      name: props.environmentName,
      dagStorage,
      vpc,
      webserverAccessMode: WebserverAccessMode.PUBLIC_ONLY, // Public access to the webserver
      airflowVersion: props.airflowVersion,
      sizing: props.sizing ?? Sizing.mw1Micro(), // Default to 'mw1Micro' sizing if not provided
      airflowConfigurationOptions: props.airflowConfigurationOptions,
    });

    // Enable the secrets backend for Airflow (e.g., for environment variables or secrets storage)
    environment.enableSecretsBackend();
  }
}

// TODO: Refactor this class to implement private routing, if required
// export class PrivateRoutingMWAA extends Construct {
//   constructor(scope: Construct, id: string, props: MWAAProps) {
//     super(scope, id);
//     // Implement private routing logic for MWAA here
//   }
// }
