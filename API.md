# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### DagStorage <a name="DagStorage" id="cdk-mwaa.DagStorage"></a>

Represents a storage location for MWAA DAGs and dependencies in an S3 bucket.

#### Initializers <a name="Initializers" id="cdk-mwaa.DagStorage.Initializer"></a>

```typescript
import { DagStorage } from 'cdk-mwaa'

new DagStorage(scope: Construct, id: string, props: DagStorageProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.DagStorage.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-mwaa.DagStorage.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.DagStorage.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-mwaa.DagStorageProps">DagStorageProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-mwaa.DagStorage.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-mwaa.DagStorage.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-mwaa.DagStorage.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-mwaa.DagStorageProps">DagStorageProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-mwaa.DagStorage.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-mwaa.DagStorage.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-mwaa.DagStorage.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-mwaa.DagStorage.isConstruct"></a>

```typescript
import { DagStorage } from 'cdk-mwaa'

DagStorage.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-mwaa.DagStorage.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.DagStorage.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-mwaa.DagStorage.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.Bucket</code> | The S3 bucket storing DAGs, plugins, requirements, and startup scripts. |
| <code><a href="#cdk-mwaa.DagStorage.property.dagS3Path">dagS3Path</a></code> | <code>string</code> | S3 path for DAGs. |
| <code><a href="#cdk-mwaa.DagStorage.property.pluginsConfig">pluginsConfig</a></code> | <code><a href="#cdk-mwaa.DagStorageConfigOptions">DagStorageConfigOptions</a></code> | Plugin storage configuration. |
| <code><a href="#cdk-mwaa.DagStorage.property.requirementsConfig">requirementsConfig</a></code> | <code><a href="#cdk-mwaa.DagStorageConfigOptions">DagStorageConfigOptions</a></code> | Requirements storage configuration. |
| <code><a href="#cdk-mwaa.DagStorage.property.startupScriptConfig">startupScriptConfig</a></code> | <code><a href="#cdk-mwaa.DagStorageConfigOptions">DagStorageConfigOptions</a></code> | Startup script storage configuration. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-mwaa.DagStorage.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="cdk-mwaa.DagStorage.property.bucket"></a>

```typescript
public readonly bucket: Bucket;
```

- *Type:* aws-cdk-lib.aws_s3.Bucket

The S3 bucket storing DAGs, plugins, requirements, and startup scripts.

---

##### `dagS3Path`<sup>Optional</sup> <a name="dagS3Path" id="cdk-mwaa.DagStorage.property.dagS3Path"></a>

```typescript
public readonly dagS3Path: string;
```

- *Type:* string

S3 path for DAGs.

---

##### `pluginsConfig`<sup>Optional</sup> <a name="pluginsConfig" id="cdk-mwaa.DagStorage.property.pluginsConfig"></a>

```typescript
public readonly pluginsConfig: DagStorageConfigOptions;
```

- *Type:* <a href="#cdk-mwaa.DagStorageConfigOptions">DagStorageConfigOptions</a>

Plugin storage configuration.

---

##### `requirementsConfig`<sup>Optional</sup> <a name="requirementsConfig" id="cdk-mwaa.DagStorage.property.requirementsConfig"></a>

```typescript
public readonly requirementsConfig: DagStorageConfigOptions;
```

- *Type:* <a href="#cdk-mwaa.DagStorageConfigOptions">DagStorageConfigOptions</a>

Requirements storage configuration.

---

##### `startupScriptConfig`<sup>Optional</sup> <a name="startupScriptConfig" id="cdk-mwaa.DagStorage.property.startupScriptConfig"></a>

```typescript
public readonly startupScriptConfig: DagStorageConfigOptions;
```

- *Type:* <a href="#cdk-mwaa.DagStorageConfigOptions">DagStorageConfigOptions</a>

Startup script storage configuration.

---


### Environment <a name="Environment" id="cdk-mwaa.Environment"></a>

Represents an MWAA environment.

#### Initializers <a name="Initializers" id="cdk-mwaa.Environment.Initializer"></a>

```typescript
import { Environment } from 'cdk-mwaa'

new Environment(scope: Construct, id: string, props: EnvironmentProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.Environment.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | - The scope of the construct. |
| <code><a href="#cdk-mwaa.Environment.Initializer.parameter.id">id</a></code> | <code>string</code> | - The unique ID of the construct. |
| <code><a href="#cdk-mwaa.Environment.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-mwaa.EnvironmentProps">EnvironmentProps</a></code> | - The properties for the MWAA environment. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-mwaa.Environment.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope of the construct.

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-mwaa.Environment.Initializer.parameter.id"></a>

- *Type:* string

The unique ID of the construct.

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-mwaa.Environment.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-mwaa.EnvironmentProps">EnvironmentProps</a>

The properties for the MWAA environment.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-mwaa.Environment.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-mwaa.Environment.addToRolePolicy">addToRolePolicy</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.Environment.enableEmailBackend">enableEmailBackend</a></code> | Enables the email backend for Airflow to send email notifications. |
| <code><a href="#cdk-mwaa.Environment.enableSecretsBackend">enableSecretsBackend</a></code> | Enables the use of AWS Secrets Manager as a backend for storing Airflow connections and variables. |

---

##### `toString` <a name="toString" id="cdk-mwaa.Environment.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addToRolePolicy` <a name="addToRolePolicy" id="cdk-mwaa.Environment.addToRolePolicy"></a>

```typescript
public addToRolePolicy(statement: PolicyStatement): void
```

###### `statement`<sup>Required</sup> <a name="statement" id="cdk-mwaa.Environment.addToRolePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `enableEmailBackend` <a name="enableEmailBackend" id="cdk-mwaa.Environment.enableEmailBackend"></a>

```typescript
public enableEmailBackend(options: EmailBackendOptions): void
```

Enables the email backend for Airflow to send email notifications.

###### `options`<sup>Required</sup> <a name="options" id="cdk-mwaa.Environment.enableEmailBackend.parameter.options"></a>

- *Type:* <a href="#cdk-mwaa.EmailBackendOptions">EmailBackendOptions</a>

The configuration options for the email backend.

---

##### `enableSecretsBackend` <a name="enableSecretsBackend" id="cdk-mwaa.Environment.enableSecretsBackend"></a>

```typescript
public enableSecretsBackend(options?: SecretsBackendOptions): void
```

Enables the use of AWS Secrets Manager as a backend for storing Airflow connections and variables.

###### `options`<sup>Optional</sup> <a name="options" id="cdk-mwaa.Environment.enableSecretsBackend.parameter.options"></a>

- *Type:* <a href="#cdk-mwaa.SecretsBackendOptions">SecretsBackendOptions</a>

The configuration options for Secrets Manager backend.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-mwaa.Environment.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-mwaa.Environment.isConstruct"></a>

```typescript
import { Environment } from 'cdk-mwaa'

Environment.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-mwaa.Environment.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.Environment.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-mwaa.Environment.property.arn">arn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.Environment.property.celeryExecutorQueue">celeryExecutorQueue</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.Environment.property.dagProcessingLogsGroupArn">dagProcessingLogsGroupArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.Environment.property.databaseVpcEndpointService">databaseVpcEndpointService</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.Environment.property.schedulerLogsGroupArn">schedulerLogsGroupArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.Environment.property.taskLogsGroupArn">taskLogsGroupArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.Environment.property.webserverLogsGroupArn">webserverLogsGroupArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.Environment.property.webserverUrl">webserverUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.Environment.property.webserverVpcEndpointService">webserverVpcEndpointService</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.Environment.property.workerLogsGroupArn">workerLogsGroupArn</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-mwaa.Environment.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="cdk-mwaa.Environment.property.arn"></a>

```typescript
public readonly arn: string;
```

- *Type:* string

---

##### `celeryExecutorQueue`<sup>Required</sup> <a name="celeryExecutorQueue" id="cdk-mwaa.Environment.property.celeryExecutorQueue"></a>

```typescript
public readonly celeryExecutorQueue: string;
```

- *Type:* string

---

##### `dagProcessingLogsGroupArn`<sup>Required</sup> <a name="dagProcessingLogsGroupArn" id="cdk-mwaa.Environment.property.dagProcessingLogsGroupArn"></a>

```typescript
public readonly dagProcessingLogsGroupArn: string;
```

- *Type:* string

---

##### `databaseVpcEndpointService`<sup>Required</sup> <a name="databaseVpcEndpointService" id="cdk-mwaa.Environment.property.databaseVpcEndpointService"></a>

```typescript
public readonly databaseVpcEndpointService: string;
```

- *Type:* string

---

##### `schedulerLogsGroupArn`<sup>Required</sup> <a name="schedulerLogsGroupArn" id="cdk-mwaa.Environment.property.schedulerLogsGroupArn"></a>

```typescript
public readonly schedulerLogsGroupArn: string;
```

- *Type:* string

---

##### `taskLogsGroupArn`<sup>Required</sup> <a name="taskLogsGroupArn" id="cdk-mwaa.Environment.property.taskLogsGroupArn"></a>

```typescript
public readonly taskLogsGroupArn: string;
```

- *Type:* string

---

##### `webserverLogsGroupArn`<sup>Required</sup> <a name="webserverLogsGroupArn" id="cdk-mwaa.Environment.property.webserverLogsGroupArn"></a>

```typescript
public readonly webserverLogsGroupArn: string;
```

- *Type:* string

---

##### `webserverUrl`<sup>Required</sup> <a name="webserverUrl" id="cdk-mwaa.Environment.property.webserverUrl"></a>

```typescript
public readonly webserverUrl: string;
```

- *Type:* string

---

##### `webserverVpcEndpointService`<sup>Required</sup> <a name="webserverVpcEndpointService" id="cdk-mwaa.Environment.property.webserverVpcEndpointService"></a>

```typescript
public readonly webserverVpcEndpointService: string;
```

- *Type:* string

---

##### `workerLogsGroupArn`<sup>Required</sup> <a name="workerLogsGroupArn" id="cdk-mwaa.Environment.property.workerLogsGroupArn"></a>

```typescript
public readonly workerLogsGroupArn: string;
```

- *Type:* string

---


### PublicRoutingMWAA <a name="PublicRoutingMWAA" id="cdk-mwaa.PublicRoutingMWAA"></a>

PublicRoutingMWAA constructs a Managed Airflow (MWAA) environment with public webserver access.

It creates the necessary VPC, S3 storage for DAGs, and an Airflow environment.

#### Initializers <a name="Initializers" id="cdk-mwaa.PublicRoutingMWAA.Initializer"></a>

```typescript
import { PublicRoutingMWAA } from 'cdk-mwaa'

new PublicRoutingMWAA(scope: Construct, id: string, props: MWAAProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.PublicRoutingMWAA.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-mwaa.PublicRoutingMWAA.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.PublicRoutingMWAA.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-mwaa.MWAAProps">MWAAProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-mwaa.PublicRoutingMWAA.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-mwaa.PublicRoutingMWAA.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-mwaa.PublicRoutingMWAA.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-mwaa.MWAAProps">MWAAProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-mwaa.PublicRoutingMWAA.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-mwaa.PublicRoutingMWAA.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-mwaa.PublicRoutingMWAA.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-mwaa.PublicRoutingMWAA.isConstruct"></a>

```typescript
import { PublicRoutingMWAA } from 'cdk-mwaa'

PublicRoutingMWAA.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-mwaa.PublicRoutingMWAA.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.PublicRoutingMWAA.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-mwaa.PublicRoutingMWAA.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### SecurityGroup <a name="SecurityGroup" id="cdk-mwaa.SecurityGroup"></a>

A custom Security Group with a self-referencing ingress rule for MWAA.

#### Initializers <a name="Initializers" id="cdk-mwaa.SecurityGroup.Initializer"></a>

```typescript
import { SecurityGroup } from 'cdk-mwaa'

new SecurityGroup(scope: Construct, id: string, props: SecurityGroupProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.SecurityGroup.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The parent construct. |
| <code><a href="#cdk-mwaa.SecurityGroup.Initializer.parameter.id">id</a></code> | <code>string</code> | The unique identifier for this construct. |
| <code><a href="#cdk-mwaa.SecurityGroup.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-mwaa.SecurityGroupProps">SecurityGroupProps</a></code> | Security group properties. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-mwaa.SecurityGroup.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The parent construct.

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-mwaa.SecurityGroup.Initializer.parameter.id"></a>

- *Type:* string

The unique identifier for this construct.

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-mwaa.SecurityGroup.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-mwaa.SecurityGroupProps">SecurityGroupProps</a>

Security group properties.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-mwaa.SecurityGroup.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-mwaa.SecurityGroup.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#cdk-mwaa.SecurityGroup.addEgressRule">addEgressRule</a></code> | Add an egress rule for the current security group. |
| <code><a href="#cdk-mwaa.SecurityGroup.addIngressRule">addIngressRule</a></code> | Add an ingress rule for the current security group. |
| <code><a href="#cdk-mwaa.SecurityGroup.toEgressRuleConfig">toEgressRuleConfig</a></code> | Produce the egress rule JSON for the given connection. |
| <code><a href="#cdk-mwaa.SecurityGroup.toIngressRuleConfig">toIngressRuleConfig</a></code> | Produce the ingress rule JSON for the given connection. |

---

##### `toString` <a name="toString" id="cdk-mwaa.SecurityGroup.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="cdk-mwaa.SecurityGroup.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="cdk-mwaa.SecurityGroup.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addEgressRule` <a name="addEgressRule" id="cdk-mwaa.SecurityGroup.addEgressRule"></a>

```typescript
public addEgressRule(peer: IPeer, connection: Port, description?: string, remoteRule?: boolean): void
```

Add an egress rule for the current security group.

`remoteRule` controls where the Rule object is created if the peer is also a
securityGroup and they are in different stack. If false (default) the
rule object is created under the current SecurityGroup object. If true and the
peer is also a SecurityGroup, the rule object is created under the remote
SecurityGroup object.

###### `peer`<sup>Required</sup> <a name="peer" id="cdk-mwaa.SecurityGroup.addEgressRule.parameter.peer"></a>

- *Type:* aws-cdk-lib.aws_ec2.IPeer

---

###### `connection`<sup>Required</sup> <a name="connection" id="cdk-mwaa.SecurityGroup.addEgressRule.parameter.connection"></a>

- *Type:* aws-cdk-lib.aws_ec2.Port

---

###### `description`<sup>Optional</sup> <a name="description" id="cdk-mwaa.SecurityGroup.addEgressRule.parameter.description"></a>

- *Type:* string

---

###### `remoteRule`<sup>Optional</sup> <a name="remoteRule" id="cdk-mwaa.SecurityGroup.addEgressRule.parameter.remoteRule"></a>

- *Type:* boolean

---

##### `addIngressRule` <a name="addIngressRule" id="cdk-mwaa.SecurityGroup.addIngressRule"></a>

```typescript
public addIngressRule(peer: IPeer, connection: Port, description?: string, remoteRule?: boolean): void
```

Add an ingress rule for the current security group.

`remoteRule` controls where the Rule object is created if the peer is also a
securityGroup and they are in different stack. If false (default) the
rule object is created under the current SecurityGroup object. If true and the
peer is also a SecurityGroup, the rule object is created under the remote
SecurityGroup object.

###### `peer`<sup>Required</sup> <a name="peer" id="cdk-mwaa.SecurityGroup.addIngressRule.parameter.peer"></a>

- *Type:* aws-cdk-lib.aws_ec2.IPeer

---

###### `connection`<sup>Required</sup> <a name="connection" id="cdk-mwaa.SecurityGroup.addIngressRule.parameter.connection"></a>

- *Type:* aws-cdk-lib.aws_ec2.Port

---

###### `description`<sup>Optional</sup> <a name="description" id="cdk-mwaa.SecurityGroup.addIngressRule.parameter.description"></a>

- *Type:* string

---

###### `remoteRule`<sup>Optional</sup> <a name="remoteRule" id="cdk-mwaa.SecurityGroup.addIngressRule.parameter.remoteRule"></a>

- *Type:* boolean

---

##### `toEgressRuleConfig` <a name="toEgressRuleConfig" id="cdk-mwaa.SecurityGroup.toEgressRuleConfig"></a>

```typescript
public toEgressRuleConfig(): any
```

Produce the egress rule JSON for the given connection.

##### `toIngressRuleConfig` <a name="toIngressRuleConfig" id="cdk-mwaa.SecurityGroup.toIngressRuleConfig"></a>

```typescript
public toIngressRuleConfig(): any
```

Produce the ingress rule JSON for the given connection.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-mwaa.SecurityGroup.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#cdk-mwaa.SecurityGroup.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#cdk-mwaa.SecurityGroup.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#cdk-mwaa.SecurityGroup.fromLookupById">fromLookupById</a></code> | Look up a security group by id. |
| <code><a href="#cdk-mwaa.SecurityGroup.fromLookupByName">fromLookupByName</a></code> | Look up a security group by name. |
| <code><a href="#cdk-mwaa.SecurityGroup.fromSecurityGroupId">fromSecurityGroupId</a></code> | Import an existing security group into this app. |
| <code><a href="#cdk-mwaa.SecurityGroup.isSecurityGroup">isSecurityGroup</a></code> | Return whether the indicated object is a security group. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-mwaa.SecurityGroup.isConstruct"></a>

```typescript
import { SecurityGroup } from 'cdk-mwaa'

SecurityGroup.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-mwaa.SecurityGroup.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="cdk-mwaa.SecurityGroup.isOwnedResource"></a>

```typescript
import { SecurityGroup } from 'cdk-mwaa'

SecurityGroup.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="cdk-mwaa.SecurityGroup.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="cdk-mwaa.SecurityGroup.isResource"></a>

```typescript
import { SecurityGroup } from 'cdk-mwaa'

SecurityGroup.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="cdk-mwaa.SecurityGroup.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromLookupById` <a name="fromLookupById" id="cdk-mwaa.SecurityGroup.fromLookupById"></a>

```typescript
import { SecurityGroup } from 'cdk-mwaa'

SecurityGroup.fromLookupById(scope: Construct, id: string, securityGroupId: string)
```

Look up a security group by id.

###### `scope`<sup>Required</sup> <a name="scope" id="cdk-mwaa.SecurityGroup.fromLookupById.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="cdk-mwaa.SecurityGroup.fromLookupById.parameter.id"></a>

- *Type:* string

---

###### `securityGroupId`<sup>Required</sup> <a name="securityGroupId" id="cdk-mwaa.SecurityGroup.fromLookupById.parameter.securityGroupId"></a>

- *Type:* string

---

##### `fromLookupByName` <a name="fromLookupByName" id="cdk-mwaa.SecurityGroup.fromLookupByName"></a>

```typescript
import { SecurityGroup } from 'cdk-mwaa'

SecurityGroup.fromLookupByName(scope: Construct, id: string, securityGroupName: string, vpc: IVpc)
```

Look up a security group by name.

###### `scope`<sup>Required</sup> <a name="scope" id="cdk-mwaa.SecurityGroup.fromLookupByName.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="cdk-mwaa.SecurityGroup.fromLookupByName.parameter.id"></a>

- *Type:* string

---

###### `securityGroupName`<sup>Required</sup> <a name="securityGroupName" id="cdk-mwaa.SecurityGroup.fromLookupByName.parameter.securityGroupName"></a>

- *Type:* string

---

###### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-mwaa.SecurityGroup.fromLookupByName.parameter.vpc"></a>

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `fromSecurityGroupId` <a name="fromSecurityGroupId" id="cdk-mwaa.SecurityGroup.fromSecurityGroupId"></a>

```typescript
import { SecurityGroup } from 'cdk-mwaa'

SecurityGroup.fromSecurityGroupId(scope: Construct, id: string, securityGroupId: string, options?: SecurityGroupImportOptions)
```

Import an existing security group into this app.

This method will assume that the Security Group has a rule in it which allows
all outbound traffic, and so will not add egress rules to the imported Security
Group (only ingress rules).

If your existing Security Group needs to have egress rules added, pass the
`allowAllOutbound: false` option on import.

###### `scope`<sup>Required</sup> <a name="scope" id="cdk-mwaa.SecurityGroup.fromSecurityGroupId.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="cdk-mwaa.SecurityGroup.fromSecurityGroupId.parameter.id"></a>

- *Type:* string

---

###### `securityGroupId`<sup>Required</sup> <a name="securityGroupId" id="cdk-mwaa.SecurityGroup.fromSecurityGroupId.parameter.securityGroupId"></a>

- *Type:* string

---

###### `options`<sup>Optional</sup> <a name="options" id="cdk-mwaa.SecurityGroup.fromSecurityGroupId.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_ec2.SecurityGroupImportOptions

---

##### `isSecurityGroup` <a name="isSecurityGroup" id="cdk-mwaa.SecurityGroup.isSecurityGroup"></a>

```typescript
import { SecurityGroup } from 'cdk-mwaa'

SecurityGroup.isSecurityGroup(x: any)
```

Return whether the indicated object is a security group.

###### `x`<sup>Required</sup> <a name="x" id="cdk-mwaa.SecurityGroup.isSecurityGroup.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.SecurityGroup.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-mwaa.SecurityGroup.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#cdk-mwaa.SecurityGroup.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#cdk-mwaa.SecurityGroup.property.allowAllIpv6Outbound">allowAllIpv6Outbound</a></code> | <code>boolean</code> | Whether the SecurityGroup has been configured to allow all outbound ipv6 traffic. |
| <code><a href="#cdk-mwaa.SecurityGroup.property.allowAllOutbound">allowAllOutbound</a></code> | <code>boolean</code> | Whether the SecurityGroup has been configured to allow all outbound traffic. |
| <code><a href="#cdk-mwaa.SecurityGroup.property.canInlineRule">canInlineRule</a></code> | <code>boolean</code> | Whether the rule can be inlined into a SecurityGroup or not. |
| <code><a href="#cdk-mwaa.SecurityGroup.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | The network connections associated with this resource. |
| <code><a href="#cdk-mwaa.SecurityGroup.property.securityGroupId">securityGroupId</a></code> | <code>string</code> | The ID of the security group. |
| <code><a href="#cdk-mwaa.SecurityGroup.property.securityGroupVpcId">securityGroupVpcId</a></code> | <code>string</code> | The VPC ID this security group is part of. |
| <code><a href="#cdk-mwaa.SecurityGroup.property.uniqueId">uniqueId</a></code> | <code>string</code> | A unique identifier for this connection peer. |
| <code><a href="#cdk-mwaa.SecurityGroup.property.defaultPort">defaultPort</a></code> | <code>aws-cdk-lib.aws_ec2.Port</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-mwaa.SecurityGroup.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="cdk-mwaa.SecurityGroup.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="cdk-mwaa.SecurityGroup.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `allowAllIpv6Outbound`<sup>Required</sup> <a name="allowAllIpv6Outbound" id="cdk-mwaa.SecurityGroup.property.allowAllIpv6Outbound"></a>

```typescript
public readonly allowAllIpv6Outbound: boolean;
```

- *Type:* boolean

Whether the SecurityGroup has been configured to allow all outbound ipv6 traffic.

---

##### `allowAllOutbound`<sup>Required</sup> <a name="allowAllOutbound" id="cdk-mwaa.SecurityGroup.property.allowAllOutbound"></a>

```typescript
public readonly allowAllOutbound: boolean;
```

- *Type:* boolean

Whether the SecurityGroup has been configured to allow all outbound traffic.

---

##### `canInlineRule`<sup>Required</sup> <a name="canInlineRule" id="cdk-mwaa.SecurityGroup.property.canInlineRule"></a>

```typescript
public readonly canInlineRule: boolean;
```

- *Type:* boolean

Whether the rule can be inlined into a SecurityGroup or not.

---

##### `connections`<sup>Required</sup> <a name="connections" id="cdk-mwaa.SecurityGroup.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

The network connections associated with this resource.

---

##### `securityGroupId`<sup>Required</sup> <a name="securityGroupId" id="cdk-mwaa.SecurityGroup.property.securityGroupId"></a>

```typescript
public readonly securityGroupId: string;
```

- *Type:* string

The ID of the security group.

---

##### `securityGroupVpcId`<sup>Required</sup> <a name="securityGroupVpcId" id="cdk-mwaa.SecurityGroup.property.securityGroupVpcId"></a>

```typescript
public readonly securityGroupVpcId: string;
```

- *Type:* string

The VPC ID this security group is part of.

---

##### `uniqueId`<sup>Required</sup> <a name="uniqueId" id="cdk-mwaa.SecurityGroup.property.uniqueId"></a>

```typescript
public readonly uniqueId: string;
```

- *Type:* string

A unique identifier for this connection peer.

---

##### `defaultPort`<sup>Optional</sup> <a name="defaultPort" id="cdk-mwaa.SecurityGroup.property.defaultPort"></a>

```typescript
public readonly defaultPort: Port;
```

- *Type:* aws-cdk-lib.aws_ec2.Port

---


## Structs <a name="Structs" id="Structs"></a>

### DagStorageConfigOptions <a name="DagStorageConfigOptions" id="cdk-mwaa.DagStorageConfigOptions"></a>

Configuration options for S3 path storage.

#### Initializer <a name="Initializer" id="cdk-mwaa.DagStorageConfigOptions.Initializer"></a>

```typescript
import { DagStorageConfigOptions } from 'cdk-mwaa'

const dagStorageConfigOptions: DagStorageConfigOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.DagStorageConfigOptions.property.s3Path">s3Path</a></code> | <code>string</code> | The S3 path where the resource is stored. |
| <code><a href="#cdk-mwaa.DagStorageConfigOptions.property.s3ObjectVersion">s3ObjectVersion</a></code> | <code>string</code> | Optional object version for versioned buckets. |

---

##### `s3Path`<sup>Required</sup> <a name="s3Path" id="cdk-mwaa.DagStorageConfigOptions.property.s3Path"></a>

```typescript
public readonly s3Path: string;
```

- *Type:* string

The S3 path where the resource is stored.

---

##### `s3ObjectVersion`<sup>Optional</sup> <a name="s3ObjectVersion" id="cdk-mwaa.DagStorageConfigOptions.property.s3ObjectVersion"></a>

```typescript
public readonly s3ObjectVersion: string;
```

- *Type:* string

Optional object version for versioned buckets.

---

### DagStorageDeployOptions <a name="DagStorageDeployOptions" id="cdk-mwaa.DagStorageDeployOptions"></a>

Options for deploying files to the DAG storage bucket.

#### Initializer <a name="Initializer" id="cdk-mwaa.DagStorageDeployOptions.Initializer"></a>

```typescript
import { DagStorageDeployOptions } from 'cdk-mwaa'

const dagStorageDeployOptions: DagStorageDeployOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.DagStorageDeployOptions.property.prune">prune</a></code> | <code>boolean</code> | Whether to prune old versions of deployed files. |
| <code><a href="#cdk-mwaa.DagStorageDeployOptions.property.retainOnDelete">retainOnDelete</a></code> | <code>boolean</code> | Whether to retain files on deletion of the stack. |
| <code><a href="#cdk-mwaa.DagStorageDeployOptions.property.sources">sources</a></code> | <code>aws-cdk-lib.aws_s3_deployment.ISource[]</code> | Sources to deploy into the bucket. |

---

##### `prune`<sup>Optional</sup> <a name="prune" id="cdk-mwaa.DagStorageDeployOptions.property.prune"></a>

```typescript
public readonly prune: boolean;
```

- *Type:* boolean

Whether to prune old versions of deployed files.

---

##### `retainOnDelete`<sup>Optional</sup> <a name="retainOnDelete" id="cdk-mwaa.DagStorageDeployOptions.property.retainOnDelete"></a>

```typescript
public readonly retainOnDelete: boolean;
```

- *Type:* boolean

Whether to retain files on deletion of the stack.

---

##### `sources`<sup>Optional</sup> <a name="sources" id="cdk-mwaa.DagStorageDeployOptions.property.sources"></a>

```typescript
public readonly sources: ISource[];
```

- *Type:* aws-cdk-lib.aws_s3_deployment.ISource[]

Sources to deploy into the bucket.

---

### DagStorageProps <a name="DagStorageProps" id="cdk-mwaa.DagStorageProps"></a>

Properties for configuring the DAG storage bucket.

#### Initializer <a name="Initializer" id="cdk-mwaa.DagStorageProps.Initializer"></a>

```typescript
import { DagStorageProps } from 'cdk-mwaa'

const dagStorageProps: DagStorageProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.DagStorageProps.property.bucketName">bucketName</a></code> | <code>string</code> | Optional custom bucket name. |
| <code><a href="#cdk-mwaa.DagStorageProps.property.dagS3Path">dagS3Path</a></code> | <code>string</code> | Path for storing DAG files. |
| <code><a href="#cdk-mwaa.DagStorageProps.property.deployOptions">deployOptions</a></code> | <code><a href="#cdk-mwaa.DagStorageDeployOptions">DagStorageDeployOptions</a></code> | Options for deploying files into the bucket. |
| <code><a href="#cdk-mwaa.DagStorageProps.property.noncurrentVersionExpiration">noncurrentVersionExpiration</a></code> | <code>aws-cdk-lib.Duration</code> | Lifecycle rule for expiring non-current versions. |
| <code><a href="#cdk-mwaa.DagStorageProps.property.pluginsConfig">pluginsConfig</a></code> | <code><a href="#cdk-mwaa.DagStorageConfigOptions">DagStorageConfigOptions</a></code> | Configuration for plugins storage. |
| <code><a href="#cdk-mwaa.DagStorageProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Policy for bucket removal. |
| <code><a href="#cdk-mwaa.DagStorageProps.property.requirementsConfig">requirementsConfig</a></code> | <code><a href="#cdk-mwaa.DagStorageConfigOptions">DagStorageConfigOptions</a></code> | Configuration for requirements storage. |
| <code><a href="#cdk-mwaa.DagStorageProps.property.startupScriptConfig">startupScriptConfig</a></code> | <code><a href="#cdk-mwaa.DagStorageConfigOptions">DagStorageConfigOptions</a></code> | Configuration for startup script storage. |
| <code><a href="#cdk-mwaa.DagStorageProps.property.versioned">versioned</a></code> | <code>boolean</code> | Enable versioning for the bucket. |

---

##### `bucketName`<sup>Optional</sup> <a name="bucketName" id="cdk-mwaa.DagStorageProps.property.bucketName"></a>

```typescript
public readonly bucketName: string;
```

- *Type:* string

Optional custom bucket name.

---

##### `dagS3Path`<sup>Optional</sup> <a name="dagS3Path" id="cdk-mwaa.DagStorageProps.property.dagS3Path"></a>

```typescript
public readonly dagS3Path: string;
```

- *Type:* string

Path for storing DAG files.

---

##### `deployOptions`<sup>Optional</sup> <a name="deployOptions" id="cdk-mwaa.DagStorageProps.property.deployOptions"></a>

```typescript
public readonly deployOptions: DagStorageDeployOptions;
```

- *Type:* <a href="#cdk-mwaa.DagStorageDeployOptions">DagStorageDeployOptions</a>

Options for deploying files into the bucket.

---

##### `noncurrentVersionExpiration`<sup>Optional</sup> <a name="noncurrentVersionExpiration" id="cdk-mwaa.DagStorageProps.property.noncurrentVersionExpiration"></a>

```typescript
public readonly noncurrentVersionExpiration: Duration;
```

- *Type:* aws-cdk-lib.Duration

Lifecycle rule for expiring non-current versions.

---

##### `pluginsConfig`<sup>Optional</sup> <a name="pluginsConfig" id="cdk-mwaa.DagStorageProps.property.pluginsConfig"></a>

```typescript
public readonly pluginsConfig: DagStorageConfigOptions;
```

- *Type:* <a href="#cdk-mwaa.DagStorageConfigOptions">DagStorageConfigOptions</a>

Configuration for plugins storage.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="cdk-mwaa.DagStorageProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy

Policy for bucket removal.

---

##### `requirementsConfig`<sup>Optional</sup> <a name="requirementsConfig" id="cdk-mwaa.DagStorageProps.property.requirementsConfig"></a>

```typescript
public readonly requirementsConfig: DagStorageConfigOptions;
```

- *Type:* <a href="#cdk-mwaa.DagStorageConfigOptions">DagStorageConfigOptions</a>

Configuration for requirements storage.

---

##### `startupScriptConfig`<sup>Optional</sup> <a name="startupScriptConfig" id="cdk-mwaa.DagStorageProps.property.startupScriptConfig"></a>

```typescript
public readonly startupScriptConfig: DagStorageConfigOptions;
```

- *Type:* <a href="#cdk-mwaa.DagStorageConfigOptions">DagStorageConfigOptions</a>

Configuration for startup script storage.

---

##### `versioned`<sup>Optional</sup> <a name="versioned" id="cdk-mwaa.DagStorageProps.property.versioned"></a>

```typescript
public readonly versioned: boolean;
```

- *Type:* boolean

Enable versioning for the bucket.

---

### EmailBackendOptions <a name="EmailBackendOptions" id="cdk-mwaa.EmailBackendOptions"></a>

Options for configuring the Email backend.

#### Initializer <a name="Initializer" id="cdk-mwaa.EmailBackendOptions.Initializer"></a>

```typescript
import { EmailBackendOptions } from 'cdk-mwaa'

const emailBackendOptions: EmailBackendOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.EmailBackendOptions.property.fromEmail">fromEmail</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.EmailBackendOptions.property.connId">connId</a></code> | <code>string</code> | *No description.* |

---

##### `fromEmail`<sup>Required</sup> <a name="fromEmail" id="cdk-mwaa.EmailBackendOptions.property.fromEmail"></a>

```typescript
public readonly fromEmail: string;
```

- *Type:* string

---

##### `connId`<sup>Optional</sup> <a name="connId" id="cdk-mwaa.EmailBackendOptions.property.connId"></a>

```typescript
public readonly connId: string;
```

- *Type:* string

---

### EnvironmentProps <a name="EnvironmentProps" id="cdk-mwaa.EnvironmentProps"></a>

Properties for creating an MWAA environment.

#### Initializer <a name="Initializer" id="cdk-mwaa.EnvironmentProps.Initializer"></a>

```typescript
import { EnvironmentProps } from 'cdk-mwaa'

const environmentProps: EnvironmentProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.EnvironmentProps.property.airflowVersion">airflowVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentProps.property.dagStorage">dagStorage</a></code> | <code><a href="#cdk-mwaa.DagStorage">DagStorage</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentProps.property.environmentName">environmentName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentProps.property.sizing">sizing</a></code> | <code><a href="#cdk-mwaa.Sizing">Sizing</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentProps.property.airflowConfigurationOptions">airflowConfigurationOptions</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentProps.property.endpointManagement">endpointManagement</a></code> | <code><a href="#cdk-mwaa.EndpointManagement">EndpointManagement</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentProps.property.kmsKey">kmsKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentProps.property.loggingConfiguration">loggingConfiguration</a></code> | <code><a href="#cdk-mwaa.LoggingConfiguration">LoggingConfiguration</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentProps.property.webserverAccessMode">webserverAccessMode</a></code> | <code><a href="#cdk-mwaa.WebserverAccessMode">WebserverAccessMode</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentProps.property.weeklyMaintenanceWindowStart">weeklyMaintenanceWindowStart</a></code> | <code>string</code> | *No description.* |

---

##### `airflowVersion`<sup>Required</sup> <a name="airflowVersion" id="cdk-mwaa.EnvironmentProps.property.airflowVersion"></a>

```typescript
public readonly airflowVersion: string;
```

- *Type:* string

---

##### `dagStorage`<sup>Required</sup> <a name="dagStorage" id="cdk-mwaa.EnvironmentProps.property.dagStorage"></a>

```typescript
public readonly dagStorage: DagStorage;
```

- *Type:* <a href="#cdk-mwaa.DagStorage">DagStorage</a>

---

##### `environmentName`<sup>Required</sup> <a name="environmentName" id="cdk-mwaa.EnvironmentProps.property.environmentName"></a>

```typescript
public readonly environmentName: string;
```

- *Type:* string

---

##### `sizing`<sup>Required</sup> <a name="sizing" id="cdk-mwaa.EnvironmentProps.property.sizing"></a>

```typescript
public readonly sizing: Sizing;
```

- *Type:* <a href="#cdk-mwaa.Sizing">Sizing</a>

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-mwaa.EnvironmentProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `airflowConfigurationOptions`<sup>Optional</sup> <a name="airflowConfigurationOptions" id="cdk-mwaa.EnvironmentProps.property.airflowConfigurationOptions"></a>

```typescript
public readonly airflowConfigurationOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `endpointManagement`<sup>Optional</sup> <a name="endpointManagement" id="cdk-mwaa.EnvironmentProps.property.endpointManagement"></a>

```typescript
public readonly endpointManagement: EndpointManagement;
```

- *Type:* <a href="#cdk-mwaa.EndpointManagement">EndpointManagement</a>

---

##### `kmsKey`<sup>Optional</sup> <a name="kmsKey" id="cdk-mwaa.EnvironmentProps.property.kmsKey"></a>

```typescript
public readonly kmsKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

---

##### `loggingConfiguration`<sup>Optional</sup> <a name="loggingConfiguration" id="cdk-mwaa.EnvironmentProps.property.loggingConfiguration"></a>

```typescript
public readonly loggingConfiguration: LoggingConfiguration;
```

- *Type:* <a href="#cdk-mwaa.LoggingConfiguration">LoggingConfiguration</a>

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="cdk-mwaa.EnvironmentProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

---

##### `tags`<sup>Optional</sup> <a name="tags" id="cdk-mwaa.EnvironmentProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `webserverAccessMode`<sup>Optional</sup> <a name="webserverAccessMode" id="cdk-mwaa.EnvironmentProps.property.webserverAccessMode"></a>

```typescript
public readonly webserverAccessMode: WebserverAccessMode;
```

- *Type:* <a href="#cdk-mwaa.WebserverAccessMode">WebserverAccessMode</a>

---

##### `weeklyMaintenanceWindowStart`<sup>Optional</sup> <a name="weeklyMaintenanceWindowStart" id="cdk-mwaa.EnvironmentProps.property.weeklyMaintenanceWindowStart"></a>

```typescript
public readonly weeklyMaintenanceWindowStart: string;
```

- *Type:* string

---

### LoggingConfiguration <a name="LoggingConfiguration" id="cdk-mwaa.LoggingConfiguration"></a>

Logging configuration for the MWAA environment.

#### Initializer <a name="Initializer" id="cdk-mwaa.LoggingConfiguration.Initializer"></a>

```typescript
import { LoggingConfiguration } from 'cdk-mwaa'

const loggingConfiguration: LoggingConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.LoggingConfiguration.property.dagProcessingLogs">dagProcessingLogs</a></code> | <code><a href="#cdk-mwaa.LoggingConfigurationProperty">LoggingConfigurationProperty</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.LoggingConfiguration.property.schedulerLogs">schedulerLogs</a></code> | <code><a href="#cdk-mwaa.LoggingConfigurationProperty">LoggingConfigurationProperty</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.LoggingConfiguration.property.taskLogs">taskLogs</a></code> | <code><a href="#cdk-mwaa.LoggingConfigurationProperty">LoggingConfigurationProperty</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.LoggingConfiguration.property.webserverLogs">webserverLogs</a></code> | <code><a href="#cdk-mwaa.LoggingConfigurationProperty">LoggingConfigurationProperty</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.LoggingConfiguration.property.workerLogs">workerLogs</a></code> | <code><a href="#cdk-mwaa.LoggingConfigurationProperty">LoggingConfigurationProperty</a></code> | *No description.* |

---

##### `dagProcessingLogs`<sup>Optional</sup> <a name="dagProcessingLogs" id="cdk-mwaa.LoggingConfiguration.property.dagProcessingLogs"></a>

```typescript
public readonly dagProcessingLogs: LoggingConfigurationProperty;
```

- *Type:* <a href="#cdk-mwaa.LoggingConfigurationProperty">LoggingConfigurationProperty</a>

---

##### `schedulerLogs`<sup>Optional</sup> <a name="schedulerLogs" id="cdk-mwaa.LoggingConfiguration.property.schedulerLogs"></a>

```typescript
public readonly schedulerLogs: LoggingConfigurationProperty;
```

- *Type:* <a href="#cdk-mwaa.LoggingConfigurationProperty">LoggingConfigurationProperty</a>

---

##### `taskLogs`<sup>Optional</sup> <a name="taskLogs" id="cdk-mwaa.LoggingConfiguration.property.taskLogs"></a>

```typescript
public readonly taskLogs: LoggingConfigurationProperty;
```

- *Type:* <a href="#cdk-mwaa.LoggingConfigurationProperty">LoggingConfigurationProperty</a>

---

##### `webserverLogs`<sup>Optional</sup> <a name="webserverLogs" id="cdk-mwaa.LoggingConfiguration.property.webserverLogs"></a>

```typescript
public readonly webserverLogs: LoggingConfigurationProperty;
```

- *Type:* <a href="#cdk-mwaa.LoggingConfigurationProperty">LoggingConfigurationProperty</a>

---

##### `workerLogs`<sup>Optional</sup> <a name="workerLogs" id="cdk-mwaa.LoggingConfiguration.property.workerLogs"></a>

```typescript
public readonly workerLogs: LoggingConfigurationProperty;
```

- *Type:* <a href="#cdk-mwaa.LoggingConfigurationProperty">LoggingConfigurationProperty</a>

---

### LoggingConfigurationProperty <a name="LoggingConfigurationProperty" id="cdk-mwaa.LoggingConfigurationProperty"></a>

Defines the logging configuration properties for various Airflow log types.

#### Initializer <a name="Initializer" id="cdk-mwaa.LoggingConfigurationProperty.Initializer"></a>

```typescript
import { LoggingConfigurationProperty } from 'cdk-mwaa'

const loggingConfigurationProperty: LoggingConfigurationProperty = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.LoggingConfigurationProperty.property.enabled">enabled</a></code> | <code>boolean</code> | Indicates whether to enable the Apache Airflow log type (e.g. DagProcessingLogs) in CloudWatch Logs. |
| <code><a href="#cdk-mwaa.LoggingConfigurationProperty.property.logLevel">logLevel</a></code> | <code><a href="#cdk-mwaa.LogLevel">LogLevel</a></code> | Defines the log level for the specified log type (e.g. DagProcessingLogs). Valid values: CRITICAL, ERROR, WARNING, INFO, DEBUG. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="cdk-mwaa.LoggingConfigurationProperty.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Indicates whether to enable the Apache Airflow log type (e.g. DagProcessingLogs) in CloudWatch Logs.

---

##### `logLevel`<sup>Optional</sup> <a name="logLevel" id="cdk-mwaa.LoggingConfigurationProperty.property.logLevel"></a>

```typescript
public readonly logLevel: LogLevel;
```

- *Type:* <a href="#cdk-mwaa.LogLevel">LogLevel</a>

Defines the log level for the specified log type (e.g. DagProcessingLogs). Valid values: CRITICAL, ERROR, WARNING, INFO, DEBUG.

---

### MWAAProps <a name="MWAAProps" id="cdk-mwaa.MWAAProps"></a>

Interface defining the properties for configuring MWAA (Managed Airflow).

#### Initializer <a name="Initializer" id="cdk-mwaa.MWAAProps.Initializer"></a>

```typescript
import { MWAAProps } from 'cdk-mwaa'

const mWAAProps: MWAAProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.MWAAProps.property.airflowVersion">airflowVersion</a></code> | <code>string</code> | The version of Airflow to deploy. |
| <code><a href="#cdk-mwaa.MWAAProps.property.environmentName">environmentName</a></code> | <code>string</code> | The name of the Airflow environment. |
| <code><a href="#cdk-mwaa.MWAAProps.property.airflowConfigurationOptions">airflowConfigurationOptions</a></code> | <code>{[ key: string ]: any}</code> | Airflow configuration options as key-value pairs. |
| <code><a href="#cdk-mwaa.MWAAProps.property.bucketName">bucketName</a></code> | <code>string</code> | The name of the S3 bucket used for storing DAGs. |
| <code><a href="#cdk-mwaa.MWAAProps.property.deployOptions">deployOptions</a></code> | <code><a href="#cdk-mwaa.DagStorageDeployOptions">DagStorageDeployOptions</a></code> | Optional DAG storage deployment options. |
| <code><a href="#cdk-mwaa.MWAAProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | The removal policy for the MWAA resources. |
| <code><a href="#cdk-mwaa.MWAAProps.property.sizing">sizing</a></code> | <code><a href="#cdk-mwaa.Sizing">Sizing</a></code> | Optional sizing configuration for the MWAA environment. |
| <code><a href="#cdk-mwaa.MWAAProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC in which to deploy the MWAA environment. |

---

##### `airflowVersion`<sup>Required</sup> <a name="airflowVersion" id="cdk-mwaa.MWAAProps.property.airflowVersion"></a>

```typescript
public readonly airflowVersion: string;
```

- *Type:* string

The version of Airflow to deploy.

---

##### `environmentName`<sup>Required</sup> <a name="environmentName" id="cdk-mwaa.MWAAProps.property.environmentName"></a>

```typescript
public readonly environmentName: string;
```

- *Type:* string

The name of the Airflow environment.

---

##### `airflowConfigurationOptions`<sup>Optional</sup> <a name="airflowConfigurationOptions" id="cdk-mwaa.MWAAProps.property.airflowConfigurationOptions"></a>

```typescript
public readonly airflowConfigurationOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Airflow configuration options as key-value pairs.

These configuration options are passed to the Airflow environment.

---

##### `bucketName`<sup>Optional</sup> <a name="bucketName" id="cdk-mwaa.MWAAProps.property.bucketName"></a>

```typescript
public readonly bucketName: string;
```

- *Type:* string

The name of the S3 bucket used for storing DAGs.

If not provided, a default bucket is created.

---

##### `deployOptions`<sup>Optional</sup> <a name="deployOptions" id="cdk-mwaa.MWAAProps.property.deployOptions"></a>

```typescript
public readonly deployOptions: DagStorageDeployOptions;
```

- *Type:* <a href="#cdk-mwaa.DagStorageDeployOptions">DagStorageDeployOptions</a>

Optional DAG storage deployment options.

Configures how the DAGs are deployed to the S3 bucket.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="cdk-mwaa.MWAAProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy

The removal policy for the MWAA resources.

Determines what happens to the resources when they are deleted.
Defaults to 'RETAIN' if not specified.

---

##### `sizing`<sup>Optional</sup> <a name="sizing" id="cdk-mwaa.MWAAProps.property.sizing"></a>

```typescript
public readonly sizing: Sizing;
```

- *Type:* <a href="#cdk-mwaa.Sizing">Sizing</a>

Optional sizing configuration for the MWAA environment.

Defines the compute resources.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="cdk-mwaa.MWAAProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The VPC in which to deploy the MWAA environment.

If not provided, a default VPC will be created.

---

### SecretsBackendOptions <a name="SecretsBackendOptions" id="cdk-mwaa.SecretsBackendOptions"></a>

Options for configuring the Secrets backend.

#### Initializer <a name="Initializer" id="cdk-mwaa.SecretsBackendOptions.Initializer"></a>

```typescript
import { SecretsBackendOptions } from 'cdk-mwaa'

const secretsBackendOptions: SecretsBackendOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.SecretsBackendOptions.property.connectionsLookupPattern">connectionsLookupPattern</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.SecretsBackendOptions.property.connectionsPrefix">connectionsPrefix</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.SecretsBackendOptions.property.variablesLookupPattern">variablesLookupPattern</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-mwaa.SecretsBackendOptions.property.variablesPrefix">variablesPrefix</a></code> | <code>string</code> | *No description.* |

---

##### `connectionsLookupPattern`<sup>Optional</sup> <a name="connectionsLookupPattern" id="cdk-mwaa.SecretsBackendOptions.property.connectionsLookupPattern"></a>

```typescript
public readonly connectionsLookupPattern: string;
```

- *Type:* string

---

##### `connectionsPrefix`<sup>Optional</sup> <a name="connectionsPrefix" id="cdk-mwaa.SecretsBackendOptions.property.connectionsPrefix"></a>

```typescript
public readonly connectionsPrefix: string;
```

- *Type:* string

---

##### `variablesLookupPattern`<sup>Optional</sup> <a name="variablesLookupPattern" id="cdk-mwaa.SecretsBackendOptions.property.variablesLookupPattern"></a>

```typescript
public readonly variablesLookupPattern: string;
```

- *Type:* string

---

##### `variablesPrefix`<sup>Optional</sup> <a name="variablesPrefix" id="cdk-mwaa.SecretsBackendOptions.property.variablesPrefix"></a>

```typescript
public readonly variablesPrefix: string;
```

- *Type:* string

---

### SecurityGroupProps <a name="SecurityGroupProps" id="cdk-mwaa.SecurityGroupProps"></a>

Properties for defining a Security Group.

#### Initializer <a name="Initializer" id="cdk-mwaa.SecurityGroupProps.Initializer"></a>

```typescript
import { SecurityGroupProps } from 'cdk-mwaa'

const securityGroupProps: SecurityGroupProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.SecurityGroupProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC in which to create the security group. |
| <code><a href="#cdk-mwaa.SecurityGroupProps.property.allowAllIpv6Outbound">allowAllIpv6Outbound</a></code> | <code>boolean</code> | Whether to allow all outbound ipv6 traffic by default. |
| <code><a href="#cdk-mwaa.SecurityGroupProps.property.allowAllOutbound">allowAllOutbound</a></code> | <code>boolean</code> | Whether to allow all outbound traffic by default. |
| <code><a href="#cdk-mwaa.SecurityGroupProps.property.description">description</a></code> | <code>string</code> | A description of the security group. |
| <code><a href="#cdk-mwaa.SecurityGroupProps.property.disableInlineRules">disableInlineRules</a></code> | <code>boolean</code> | Whether to disable inline ingress and egress rule optimization. |
| <code><a href="#cdk-mwaa.SecurityGroupProps.property.securityGroupName">securityGroupName</a></code> | <code>string</code> | The name of the security group. |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-mwaa.SecurityGroupProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The VPC in which to create the security group.

---

##### `allowAllIpv6Outbound`<sup>Optional</sup> <a name="allowAllIpv6Outbound" id="cdk-mwaa.SecurityGroupProps.property.allowAllIpv6Outbound"></a>

```typescript
public readonly allowAllIpv6Outbound: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to allow all outbound ipv6 traffic by default.

If this is set to true, there will only be a single egress rule which allows all
outbound ipv6 traffic. If this is set to false, no outbound traffic will be allowed by
default and all egress ipv6 traffic must be explicitly authorized.

To allow all ipv4 traffic use allowAllOutbound

---

##### `allowAllOutbound`<sup>Optional</sup> <a name="allowAllOutbound" id="cdk-mwaa.SecurityGroupProps.property.allowAllOutbound"></a>

```typescript
public readonly allowAllOutbound: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to allow all outbound traffic by default.

If this is set to true, there will only be a single egress rule which allows all
outbound traffic. If this is set to false, no outbound traffic will be allowed by
default and all egress traffic must be explicitly authorized.

To allow all ipv6 traffic use allowAllIpv6Outbound

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-mwaa.SecurityGroupProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* The default name will be the construct's CDK path.

A description of the security group.

---

##### `disableInlineRules`<sup>Optional</sup> <a name="disableInlineRules" id="cdk-mwaa.SecurityGroupProps.property.disableInlineRules"></a>

```typescript
public readonly disableInlineRules: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to disable inline ingress and egress rule optimization.

If this is set to true, ingress and egress rules will not be declared under the
SecurityGroup in cloudformation, but will be separate elements.

Inlining rules is an optimization for producing smaller stack templates. Sometimes
this is not desirable, for example when security group access is managed via tags.

The default value can be overridden globally by setting the context variable
'@aws-cdk/aws-ec2.securityGroupDisableInlineRules'.

---

##### `securityGroupName`<sup>Optional</sup> <a name="securityGroupName" id="cdk-mwaa.SecurityGroupProps.property.securityGroupName"></a>

```typescript
public readonly securityGroupName: string;
```

- *Type:* string
- *Default:* If you don't specify a GroupName, AWS CloudFormation generates a unique physical ID and uses that ID for the group name.

The name of the security group.

For valid values, see the GroupName
parameter of the CreateSecurityGroup action in the Amazon EC2 API
Reference.

It is not recommended to use an explicit group name.

---

### SizingProps <a name="SizingProps" id="cdk-mwaa.SizingProps"></a>

Defines the configuration properties for sizing an MWAA environment.

#### Initializer <a name="Initializer" id="cdk-mwaa.SizingProps.Initializer"></a>

```typescript
import { SizingProps } from 'cdk-mwaa'

const sizingProps: SizingProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.SizingProps.property.environmentClass">environmentClass</a></code> | <code><a href="#cdk-mwaa.EnvironmentClass">EnvironmentClass</a></code> | The environment class determining the available resources. |
| <code><a href="#cdk-mwaa.SizingProps.property.maxWebservers">maxWebservers</a></code> | <code>number</code> | Maximum number of webservers in the MWAA environment. |
| <code><a href="#cdk-mwaa.SizingProps.property.maxWorkers">maxWorkers</a></code> | <code>number</code> | Maximum number of workers in the MWAA environment. |
| <code><a href="#cdk-mwaa.SizingProps.property.minWebservers">minWebservers</a></code> | <code>number</code> | Minimum number of webservers in the MWAA environment. |
| <code><a href="#cdk-mwaa.SizingProps.property.minWorkers">minWorkers</a></code> | <code>number</code> | Minimum number of workers in the MWAA environment. |
| <code><a href="#cdk-mwaa.SizingProps.property.schedulers">schedulers</a></code> | <code>number</code> | Number of schedulers in the MWAA environment. |

---

##### `environmentClass`<sup>Required</sup> <a name="environmentClass" id="cdk-mwaa.SizingProps.property.environmentClass"></a>

```typescript
public readonly environmentClass: EnvironmentClass;
```

- *Type:* <a href="#cdk-mwaa.EnvironmentClass">EnvironmentClass</a>

The environment class determining the available resources.

---

##### `maxWebservers`<sup>Required</sup> <a name="maxWebservers" id="cdk-mwaa.SizingProps.property.maxWebservers"></a>

```typescript
public readonly maxWebservers: number;
```

- *Type:* number

Maximum number of webservers in the MWAA environment.

---

##### `maxWorkers`<sup>Required</sup> <a name="maxWorkers" id="cdk-mwaa.SizingProps.property.maxWorkers"></a>

```typescript
public readonly maxWorkers: number;
```

- *Type:* number

Maximum number of workers in the MWAA environment.

---

##### `minWebservers`<sup>Required</sup> <a name="minWebservers" id="cdk-mwaa.SizingProps.property.minWebservers"></a>

```typescript
public readonly minWebservers: number;
```

- *Type:* number

Minimum number of webservers in the MWAA environment.

---

##### `minWorkers`<sup>Required</sup> <a name="minWorkers" id="cdk-mwaa.SizingProps.property.minWorkers"></a>

```typescript
public readonly minWorkers: number;
```

- *Type:* number

Minimum number of workers in the MWAA environment.

---

##### `schedulers`<sup>Required</sup> <a name="schedulers" id="cdk-mwaa.SizingProps.property.schedulers"></a>

```typescript
public readonly schedulers: number;
```

- *Type:* number

Number of schedulers in the MWAA environment.

---

## Classes <a name="Classes" id="Classes"></a>

### Sizing <a name="Sizing" id="cdk-mwaa.Sizing"></a>

Provides predefined and customizable sizing options for an MWAA environment.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-mwaa.Sizing.custom">custom</a></code> | Creates a custom-sized MWAA environment based on user-defined configuration. |
| <code><a href="#cdk-mwaa.Sizing.mw1Large">mw1Large</a></code> | Creates an MW1_LARGE sized environment with a predefined range of workers and webservers. |
| <code><a href="#cdk-mwaa.Sizing.mw1Medium">mw1Medium</a></code> | Creates an MW1_MEDIUM sized environment with a predefined range of workers and webservers. |
| <code><a href="#cdk-mwaa.Sizing.mw1Micro">mw1Micro</a></code> | Creates an MW1_MICRO sized environment with a single worker, webserver, and scheduler. |
| <code><a href="#cdk-mwaa.Sizing.mw1Small">mw1Small</a></code> | Creates an MW1_SMALL sized environment with a predefined range of workers and webservers. |

---

##### `custom` <a name="custom" id="cdk-mwaa.Sizing.custom"></a>

```typescript
import { Sizing } from 'cdk-mwaa'

Sizing.custom(config: SizingProps)
```

Creates a custom-sized MWAA environment based on user-defined configuration.

###### `config`<sup>Required</sup> <a name="config" id="cdk-mwaa.Sizing.custom.parameter.config"></a>

- *Type:* <a href="#cdk-mwaa.SizingProps">SizingProps</a>

Custom sizing properties.

---

##### `mw1Large` <a name="mw1Large" id="cdk-mwaa.Sizing.mw1Large"></a>

```typescript
import { Sizing } from 'cdk-mwaa'

Sizing.mw1Large()
```

Creates an MW1_LARGE sized environment with a predefined range of workers and webservers.

##### `mw1Medium` <a name="mw1Medium" id="cdk-mwaa.Sizing.mw1Medium"></a>

```typescript
import { Sizing } from 'cdk-mwaa'

Sizing.mw1Medium()
```

Creates an MW1_MEDIUM sized environment with a predefined range of workers and webservers.

##### `mw1Micro` <a name="mw1Micro" id="cdk-mwaa.Sizing.mw1Micro"></a>

```typescript
import { Sizing } from 'cdk-mwaa'

Sizing.mw1Micro()
```

Creates an MW1_MICRO sized environment with a single worker, webserver, and scheduler.

##### `mw1Small` <a name="mw1Small" id="cdk-mwaa.Sizing.mw1Small"></a>

```typescript
import { Sizing } from 'cdk-mwaa'

Sizing.mw1Small()
```

Creates an MW1_SMALL sized environment with a predefined range of workers and webservers.

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-mwaa.Sizing.property.environmentClass">environmentClass</a></code> | <code><a href="#cdk-mwaa.EnvironmentClass">EnvironmentClass</a></code> | Returns the environment class. |
| <code><a href="#cdk-mwaa.Sizing.property.maxWebservers">maxWebservers</a></code> | <code>number</code> | Returns the maximum number of webservers. |
| <code><a href="#cdk-mwaa.Sizing.property.maxWorkers">maxWorkers</a></code> | <code>number</code> | Returns the maximum number of workers. |
| <code><a href="#cdk-mwaa.Sizing.property.minWebservers">minWebservers</a></code> | <code>number</code> | Returns the minimum number of webservers. |
| <code><a href="#cdk-mwaa.Sizing.property.minWorkers">minWorkers</a></code> | <code>number</code> | Returns the minimum number of workers. |
| <code><a href="#cdk-mwaa.Sizing.property.schedulers">schedulers</a></code> | <code>number</code> | Returns the number of schedulers. |

---

##### `environmentClass`<sup>Required</sup> <a name="environmentClass" id="cdk-mwaa.Sizing.property.environmentClass"></a>

```typescript
public readonly environmentClass: EnvironmentClass;
```

- *Type:* <a href="#cdk-mwaa.EnvironmentClass">EnvironmentClass</a>

Returns the environment class.

---

##### `maxWebservers`<sup>Required</sup> <a name="maxWebservers" id="cdk-mwaa.Sizing.property.maxWebservers"></a>

```typescript
public readonly maxWebservers: number;
```

- *Type:* number

Returns the maximum number of webservers.

---

##### `maxWorkers`<sup>Required</sup> <a name="maxWorkers" id="cdk-mwaa.Sizing.property.maxWorkers"></a>

```typescript
public readonly maxWorkers: number;
```

- *Type:* number

Returns the maximum number of workers.

---

##### `minWebservers`<sup>Required</sup> <a name="minWebservers" id="cdk-mwaa.Sizing.property.minWebservers"></a>

```typescript
public readonly minWebservers: number;
```

- *Type:* number

Returns the minimum number of webservers.

---

##### `minWorkers`<sup>Required</sup> <a name="minWorkers" id="cdk-mwaa.Sizing.property.minWorkers"></a>

```typescript
public readonly minWorkers: number;
```

- *Type:* number

Returns the minimum number of workers.

---

##### `schedulers`<sup>Required</sup> <a name="schedulers" id="cdk-mwaa.Sizing.property.schedulers"></a>

```typescript
public readonly schedulers: number;
```

- *Type:* number

Returns the number of schedulers.

---



## Enums <a name="Enums" id="Enums"></a>

### EndpointManagement <a name="EndpointManagement" id="cdk-mwaa.EndpointManagement"></a>

Enum for the endpoint management type for the MWAA environment.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-mwaa.EndpointManagement.CUSTOMER">CUSTOMER</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.EndpointManagement.SERVICE">SERVICE</a></code> | *No description.* |

---

##### `CUSTOMER` <a name="CUSTOMER" id="cdk-mwaa.EndpointManagement.CUSTOMER"></a>

---


##### `SERVICE` <a name="SERVICE" id="cdk-mwaa.EndpointManagement.SERVICE"></a>

---


### EnvironmentClass <a name="EnvironmentClass" id="cdk-mwaa.EnvironmentClass"></a>

Represents the available environment classes for MWAA (Managed Workflows for Apache Airflow).

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-mwaa.EnvironmentClass.MW1_MICRO">MW1_MICRO</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentClass.MW1_SMALL">MW1_SMALL</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentClass.MW1_MEDIUM">MW1_MEDIUM</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.EnvironmentClass.MW1_LARGE">MW1_LARGE</a></code> | *No description.* |

---

##### `MW1_MICRO` <a name="MW1_MICRO" id="cdk-mwaa.EnvironmentClass.MW1_MICRO"></a>

---


##### `MW1_SMALL` <a name="MW1_SMALL" id="cdk-mwaa.EnvironmentClass.MW1_SMALL"></a>

---


##### `MW1_MEDIUM` <a name="MW1_MEDIUM" id="cdk-mwaa.EnvironmentClass.MW1_MEDIUM"></a>

---


##### `MW1_LARGE` <a name="MW1_LARGE" id="cdk-mwaa.EnvironmentClass.MW1_LARGE"></a>

---


### LogLevel <a name="LogLevel" id="cdk-mwaa.LogLevel"></a>

Enum for the log level for Apache Airflow.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-mwaa.LogLevel.CRITICAL">CRITICAL</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.LogLevel.ERROR">ERROR</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.LogLevel.WARNING">WARNING</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.LogLevel.INFO">INFO</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.LogLevel.DEBUG">DEBUG</a></code> | *No description.* |

---

##### `CRITICAL` <a name="CRITICAL" id="cdk-mwaa.LogLevel.CRITICAL"></a>

---


##### `ERROR` <a name="ERROR" id="cdk-mwaa.LogLevel.ERROR"></a>

---


##### `WARNING` <a name="WARNING" id="cdk-mwaa.LogLevel.WARNING"></a>

---


##### `INFO` <a name="INFO" id="cdk-mwaa.LogLevel.INFO"></a>

---


##### `DEBUG` <a name="DEBUG" id="cdk-mwaa.LogLevel.DEBUG"></a>

---


### WebserverAccessMode <a name="WebserverAccessMode" id="cdk-mwaa.WebserverAccessMode"></a>

Enum for the webserver access mode of the MWAA environment.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-mwaa.WebserverAccessMode.PRIVATE_ONLY">PRIVATE_ONLY</a></code> | *No description.* |
| <code><a href="#cdk-mwaa.WebserverAccessMode.PUBLIC_ONLY">PUBLIC_ONLY</a></code> | *No description.* |

---

##### `PRIVATE_ONLY` <a name="PRIVATE_ONLY" id="cdk-mwaa.WebserverAccessMode.PRIVATE_ONLY"></a>

---


##### `PUBLIC_ONLY` <a name="PUBLIC_ONLY" id="cdk-mwaa.WebserverAccessMode.PUBLIC_ONLY"></a>

---

