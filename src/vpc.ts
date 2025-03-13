import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

/**
 * Common properties shared across different VPC constructs.
 */
export interface CommonVpcProps {
  /** Optional name for the VPC */
  readonly vpcName?: string;
  /** IP address allocation strategy for the VPC */
  readonly ipAddresses?: ec2.IIpAddresses;
  /** Number of NAT gateways to create */
  readonly natGateways?: number;
}

/**
 * Properties for creating a base VPC.
 */
export interface BaseVpcProps extends CommonVpcProps {
  /** Whether to create an Internet Gateway for public access */
  readonly createInternetGateway: boolean;
  /** Subnet configuration for the VPC */
  readonly subnetConfiguration: ec2.SubnetConfiguration[];
}

/**
 * Abstract base class for creating a VPC with common configurations.
 */
export abstract class BaseVpc extends ec2.Vpc {
  /** S3 Gateway VPC Endpoint */
  public readonly s3VpcEndpoint: ec2.GatewayVpcEndpoint;

  constructor(scope: Construct, id: string, props: BaseVpcProps) {
    super(scope, id, {
      maxAzs: 2, // Limit to two Availability Zones for cost efficiency
      ...props,
    });

    // Add S3 Gateway VPC Endpoint
    this.s3VpcEndpoint = this.addGatewayEndpoint('S3Endpoint', {
      service: ec2.GatewayVpcEndpointAwsService.S3,
      subnets: props.subnetConfiguration.map(subnet => ({ subnetType: subnet.subnetType })),
    });

    // Attach policy to the S3 endpoint
    this.s3VpcEndpoint.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3:Get*', 's3:List*', 's3:PutObject*', 's3:DeleteObject*'],
      principals: [new iam.AnyPrincipal()],
      resources: ['*'],
    }));
  }
}

/**
 * Properties for a public-routing VPC.
 */
export interface PublicRoutingVpcProps extends CommonVpcProps {
  /** CIDR mask size for subnets */
  readonly subnetCidrMask?: number;
}

/**
 * A VPC with public and private subnets, supporting internet access.
 */
export class PublicRoutingVpc extends BaseVpc {
  constructor(scope: Construct, id: string, props: PublicRoutingVpcProps = {}) {
    super(scope, id, {
      ...props,
      createInternetGateway: true,
      subnetConfiguration: [
        {
          cidrMask: props.subnetCidrMask ?? 24,
          name: 'public-subnet',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: props.subnetCidrMask ?? 24,
          name: 'private-subnet',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],
    });
  }
}

/**
 * Properties for a private-routing VPC.
 */
export interface PrivateRoutingVpcProps extends CommonVpcProps {
  /** CIDR mask size for subnets */
  readonly subnetCidrMask?: number;
}

/**
 * A VPC with only private isolated subnets, intended for internal workloads.
 */
export class PrivateRoutingVpc extends BaseVpc {
  /** Interface VPC Endpoint for CloudWatch Monitoring */
  public readonly monitoringVpcEndpoint: ec2.InterfaceVpcEndpoint;
  /** Interface VPC Endpoint for CloudWatch Logs */
  public readonly logsVpcEndpoint: ec2.InterfaceVpcEndpoint;
  /** Interface VPC Endpoint for SQS */
  public readonly sqsVpcEndpoint: ec2.InterfaceVpcEndpoint;
  /** Interface VPC Endpoint for KMS */
  public readonly kmsVpcEndpoint: ec2.InterfaceVpcEndpoint;

  constructor(scope: Construct, id: string, props: PrivateRoutingVpcProps = {}) {
    super(scope, id, {
      ...props,
      createInternetGateway: false,
      subnetConfiguration: [
        {
          cidrMask: props.subnetCidrMask ?? 24,
          name: 'private-subnet',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    // Add required AWS service endpoints for private workloads
    this.monitoringVpcEndpoint = this.addInterfaceEndpoint('MonitoringEndpoint', {
      service: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_MONITORING,
      subnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      privateDnsEnabled: true,
    });

    this.logsVpcEndpoint = this.addInterfaceEndpoint('LogsEndpoint', {
      service: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_LOGS,
      subnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      privateDnsEnabled: true,
    });

    this.sqsVpcEndpoint = this.addInterfaceEndpoint('SQSEndpoint', {
      service: ec2.InterfaceVpcEndpointAwsService.SQS,
      subnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      privateDnsEnabled: true,
    });

    this.kmsVpcEndpoint = this.addInterfaceEndpoint('KMSEndpoint', {
      service: ec2.InterfaceVpcEndpointAwsService.KMS,
      subnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      privateDnsEnabled: true,
    });
  }
}