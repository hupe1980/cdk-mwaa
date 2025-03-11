import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

/**
 * Properties for defining a Security Group.
 */
export interface SecurityGroupProps extends ec2.SecurityGroupProps {}

/**
 * A custom Security Group with a self-referencing ingress rule for MWAA.
 */
export class SecurityGroup extends ec2.SecurityGroup {
  /**
   * Creates a new Security Group with self-referencing ingress rules.
   *
   * @param scope The parent construct.
   * @param id The unique identifier for this construct.
   * @param props Security group properties.
   */
  constructor(scope: Construct, id: string, props: SecurityGroupProps) {
    super(scope, id, props);

    // Allow all inbound traffic within the security group
    this.addIngressRule(this, ec2.Port.allTraffic(), 'MWAA Self-referencing rule');
  }
}
