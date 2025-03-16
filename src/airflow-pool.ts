import { Construct } from 'constructs';
import { AirflowResourceBase } from './airflow-resource';
import { Environment } from './environment';

export interface AirflowPoolProps {
  readonly environment: Environment;
  readonly poolName: string;
  readonly poolSlots?: number;
  readonly poolDescription?: string;
}

export class AirflowPool extends AirflowResourceBase {
  constructor(scope: Construct, id: string, props: AirflowPoolProps) {
    super(scope, id, {
      environment: props.environment,
      resourceType: 'pool',
      properties: {
        PoolName: props.poolName,
        PoolSlots: props.poolSlots ?? 3,
        PoolDescription: props.poolDescription ?? '',
      },
    });
  }
}
