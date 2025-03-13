import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { PrivateRoutingVpc, PublicRoutingVpc } from '../src';

describe('VPC Constructs', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeEach(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');
  });

  test('PublicRoutingVpc should match snapshot', () => {
    new PublicRoutingVpc(stack, 'TestPublicVpc', {});

    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });

  test('PublicRoutingVpc should create expected resources', () => {
    new PublicRoutingVpc(stack, 'TestPublicVpc', {});
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::VPC', Match.objectLike({}));
    template.hasResourceProperties('AWS::EC2::InternetGateway', Match.objectLike({}));
    template.hasResourceProperties('AWS::EC2::Subnet', Match.objectLike({
      Tags: Match.arrayWith([
        Match.objectLike({ Key: 'aws-cdk:subnet-name', Value: 'public-subnet' }),
      ]),
    }));
    template.hasResourceProperties('AWS::EC2::Subnet', Match.objectLike({
      Tags: Match.arrayWith([
        Match.objectLike({ Key: 'aws-cdk:subnet-name', Value: 'private-subnet' }),
      ]),
    }));
  });

  test('PrivateRoutingVpc should match snapshot', () => {
    new PrivateRoutingVpc(stack, 'TestPrivateVpc', {});

    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });

  test('PrivateRoutingVpc should create expected endpoints', () => {
    new PrivateRoutingVpc(stack, 'TestPrivateVpc', {});
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::VPCEndpoint', Match.objectLike({
      PrivateDnsEnabled: true,
      ServiceName: Match.objectLike({
        'Fn::Join': Match.arrayWith([
          '',
          Match.arrayWith([
            'com.amazonaws.',
            { Ref: 'AWS::Region' },
            '.monitoring',
          ]),
        ]),
      }),
    }));

    template.hasResourceProperties('AWS::EC2::VPCEndpoint', Match.objectLike({
      PrivateDnsEnabled: true,
      ServiceName: Match.objectLike({
        'Fn::Join': Match.arrayWith([
          '',
          Match.arrayWith([
            'com.amazonaws.',
            { Ref: 'AWS::Region' },
            '.logs',
          ]),
        ]),
      }),
    }));

    template.hasResourceProperties('AWS::EC2::VPCEndpoint', Match.objectLike({
      PrivateDnsEnabled: true,
      ServiceName: Match.objectLike({
        'Fn::Join': Match.arrayWith([
          '',
          Match.arrayWith([
            'com.amazonaws.',
            { Ref: 'AWS::Region' },
            '.sqs',
          ]),
        ]),
      }),
    }));

    template.hasResourceProperties('AWS::EC2::VPCEndpoint', Match.objectLike({
      PrivateDnsEnabled: true,
      ServiceName: Match.objectLike({
        'Fn::Join': Match.arrayWith([
          '',
          Match.arrayWith([
            'com.amazonaws.',
            { Ref: 'AWS::Region' },
            '.kms',
          ]),
        ]),
      }),
    }));
  });
});
