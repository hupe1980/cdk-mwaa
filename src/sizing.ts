/**
 * Represents the available environment classes for MWAA (Managed Workflows for Apache Airflow).
 */
export enum EnvironmentClass {
  MW1_MICRO = 'mw1.micro',
  MW1_SMALL = 'mw1.small',
  MW1_MEDIUM = 'mw1.medium',
  MW1_LARGE = 'mw1.large',
}

/**
 * Defines the configuration properties for sizing an MWAA environment.
 */
export interface SizingProps {
  /** The environment class determining the available resources. */
  readonly environmentClass: EnvironmentClass;

  /** Minimum number of workers in the MWAA environment. */
  readonly minWorkers: number;

  /** Maximum number of workers in the MWAA environment. */
  readonly maxWorkers: number;

  /** Minimum number of webservers in the MWAA environment. */
  readonly minWebservers: number;

  /** Maximum number of webservers in the MWAA environment. */
  readonly maxWebservers: number;

  /** Number of schedulers in the MWAA environment. */
  readonly schedulers: number;
}

/**
 * Provides predefined and customizable sizing options for an MWAA environment.
 */
export class Sizing {
  /**
   * Creates an MW1_MICRO sized environment with a single worker, webserver, and scheduler.
   */
  static mw1Micro(): Sizing {
    return new Sizing({
      environmentClass: EnvironmentClass.MW1_MICRO,
      minWorkers: 1,
      maxWorkers: 1,
      minWebservers: 1,
      maxWebservers: 1,
      schedulers: 1,
    });
  }

  /**
   * Creates an MW1_SMALL sized environment with a predefined range of workers and webservers.
   */
  static mw1Small(): Sizing {
    return new Sizing({
      environmentClass: EnvironmentClass.MW1_SMALL,
      minWorkers: 2,
      maxWorkers: 5,
      minWebservers: 2,
      maxWebservers: 5,
      schedulers: 2,
    });
  }

  /**
   * Creates an MW1_MEDIUM sized environment with a predefined range of workers and webservers.
   */
  static mw1Medium(): Sizing {
    return new Sizing({
      environmentClass: EnvironmentClass.MW1_MEDIUM,
      minWorkers: 2,
      maxWorkers: 5,
      minWebservers: 2,
      maxWebservers: 5,
      schedulers: 2,
    });
  }

  /**
   * Creates an MW1_LARGE sized environment with a predefined range of workers and webservers.
   */
  static mw1Large(): Sizing {
    return new Sizing({
      environmentClass: EnvironmentClass.MW1_LARGE,
      minWorkers: 2,
      maxWorkers: 5,
      minWebservers: 2,
      maxWebservers: 5,
      schedulers: 2,
    });
  }

  /**
   * Creates a custom-sized MWAA environment based on user-defined configuration.
   *
   * @param config Custom sizing properties.
   */
  static custom(config: SizingProps): Sizing {
    return new Sizing(config);
  }

  /**
   * Creates a new instance of Sizing.
   *
   * @param props The sizing properties for the MWAA environment.
   */
  private constructor(
    private readonly props: SizingProps,
  ) {
    this.validateConfig();
  }

  /**
   * Validates the sizing configuration to ensure all values are within allowed ranges.
   */
  private validateConfig(): void {
    const { environmentClass, minWorkers, maxWorkers, minWebservers, maxWebservers, schedulers } = this.props;

    if (environmentClass === EnvironmentClass.MW1_MICRO) {
      if (minWorkers !== 1 || maxWorkers !== 1 || minWebservers !== 1 || maxWebservers !== 1 || schedulers !== 1) {
        throw new Error('For MW1_MICRO environment class, minWorkers, maxWorkers, minWebservers, maxWebservers, and schedulers must all be 1.');
      }
    } else {
      if (minWorkers < 1 || minWorkers > 25) {
        throw new Error('For non-MW1_MICRO environment classes, minWorkers must be between 1 and 25.');
      }
      if (maxWorkers < 1 || maxWorkers > 25) {
        throw new Error('For non-MW1_MICRO environment classes, maxWorkers must be between 1 and 25.');
      }
      if (minWorkers > maxWorkers) {
        throw new Error('For non-MW1_MICRO environment classes, minWorkers must be less than or equal to maxWorkers.');
      }
      if (minWebservers < 2 || minWebservers > 5) {
        throw new Error('For non-MW1_MICRO environment classes, minWebservers must be between 2 and 5.');
      }
      if (maxWebservers < 2 || maxWebservers > 5) {
        throw new Error('For non-MW1_MICRO environment classes, maxWebservers must be between 2 and 5.');
      }
      if (minWebservers > maxWebservers) {
        throw new Error('For non-MW1_MICRO environment classes, minWebservers must be less than or equal to maxWebservers.');
      }
      if (schedulers < 2 || schedulers > 5) {
        throw new Error('For non-MW1_MICRO environment classes, schedulers must be between 2 and 5.');
      }
    }
  }

  /** Returns the environment class. */
  get environmentClass(): EnvironmentClass {
    return this.props.environmentClass;
  }

  /** Returns the minimum number of workers. */
  get minWorkers(): number {
    return this.props.minWorkers;
  }

  /** Returns the maximum number of workers. */
  get maxWorkers(): number {
    return this.props.maxWorkers;
  }

  /** Returns the minimum number of webservers. */
  get minWebservers(): number {
    return this.props.minWebservers;
  }

  /** Returns the maximum number of webservers. */
  get maxWebservers(): number {
    return this.props.maxWebservers;
  }

  /** Returns the number of schedulers. */
  get schedulers(): number {
    return this.props.schedulers;
  }
}
