import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { SecurityGroup } from '../src';

describe('SecurityGroup Construct', () => {
  let stack: cdk.Stack;
  let vpc: ec2.Vpc;

  beforeEach(() => {
    stack = new cdk.Stack();
    vpc = new ec2.Vpc(stack, 'TestVpc');
  });

  test('SecurityGroup should be created with correct properties', () => {
    new SecurityGroup(stack, 'TestSecurityGroup', {
      vpc,
      description: 'Test security group',
      allowAllOutbound: true,
    });

    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });

  test('SecurityGroup should have a self-referencing ingress rule', () => {
    new SecurityGroup(stack, 'TestSecurityGroup', {
      vpc,
    });

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::EC2::SecurityGroupIngress', {
      IpProtocol: '-1',
      SourceSecurityGroupId: {
        'Fn::GetAtt': ['TestSecurityGroup880B57C0', 'GroupId'],
      },
    });
  });
});
