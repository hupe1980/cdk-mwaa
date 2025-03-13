import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface PublicRoutingVpcProps {
  readonly vpcName?: string;
  readonly ipAddresses?: ec2.IIpAddresses;
  readonly natGateways?: number;
  readonly subnetCidrMask?: number;
}

export class PublicRoutingVpc extends ec2.Vpc {
  constructor(scope: Construct, id: string, props: PublicRoutingVpcProps = {}) {
    super(scope, id, {
      vpcName: props.vpcName,
      ipAddresses: props.ipAddresses ?? ec2.IpAddresses.cidr('10.0.0.0/16'),
      maxAzs: 2,
      natGateways: props.natGateways ?? 2,
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

    // Add S3 Gateway VPC Endpoint
    const endpoint = this.addGatewayEndpoint('S3Endpoint', {
      service: ec2.GatewayVpcEndpointAwsService.S3,
      subnets: [
        {
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],
    });

    endpoint.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3:Get*', 's3:List*', 's3:PutObject*', 's3:DeleteObject*'],
      principals: [new iam.AnyPrincipal()],
      resources: ['*'],
    }));
  }
}

