import { EnvironmentClass, Sizing, SizingProps } from '../src';

describe('Sizing', () => {
  test('should create MW1_MICRO sizing with correct values', () => {
    const sizing = Sizing.mw1Micro();
    expect(sizing.environmentClass).toBe(EnvironmentClass.MW1_MICRO);
    expect(sizing.minWorkers).toBe(1);
    expect(sizing.maxWorkers).toBe(1);
    expect(sizing.minWebservers).toBe(1);
    expect(sizing.maxWebservers).toBe(1);
    expect(sizing.schedulers).toBe(1);
  });

  test('should create MW1_SMALL sizing with correct values', () => {
    const sizing = Sizing.mw1Small();
    expect(sizing.environmentClass).toBe(EnvironmentClass.MW1_SMALL);
    expect(sizing.minWorkers).toBe(2);
    expect(sizing.maxWorkers).toBe(5);
    expect(sizing.minWebservers).toBe(2);
    expect(sizing.maxWebservers).toBe(5);
    expect(sizing.schedulers).toBe(2);
  });

  test('should create MW1_MEDIUM sizing with correct values', () => {
    const sizing = Sizing.mw1Medium();
    expect(sizing.environmentClass).toBe(EnvironmentClass.MW1_MEDIUM);
    expect(sizing.minWorkers).toBe(2);
    expect(sizing.maxWorkers).toBe(5);
    expect(sizing.minWebservers).toBe(2);
    expect(sizing.maxWebservers).toBe(5);
    expect(sizing.schedulers).toBe(2);
  });

  test('should create MW1_LARGE sizing with correct values', () => {
    const sizing = Sizing.mw1Large();
    expect(sizing.environmentClass).toBe(EnvironmentClass.MW1_LARGE);
    expect(sizing.minWorkers).toBe(2);
    expect(sizing.maxWorkers).toBe(5);
    expect(sizing.minWebservers).toBe(2);
    expect(sizing.maxWebservers).toBe(5);
    expect(sizing.schedulers).toBe(2);
  });

  test('should create custom sizing with valid values', () => {
    const customConfig: SizingProps = {
      environmentClass: EnvironmentClass.MW1_SMALL,
      minWorkers: 3,
      maxWorkers: 10,
      minWebservers: 3,
      maxWebservers: 4,
      schedulers: 3,
    };
    const sizing = Sizing.custom(customConfig);
    expect(sizing.environmentClass).toBe(customConfig.environmentClass);
    expect(sizing.minWorkers).toBe(customConfig.minWorkers);
    expect(sizing.maxWorkers).toBe(customConfig.maxWorkers);
    expect(sizing.minWebservers).toBe(customConfig.minWebservers);
    expect(sizing.maxWebservers).toBe(customConfig.maxWebservers);
    expect(sizing.schedulers).toBe(customConfig.schedulers);
  });

  test('should throw an error for MW1_MICRO with invalid values', () => {
    expect(() =>
      Sizing.custom({
        environmentClass: EnvironmentClass.MW1_MICRO,
        minWorkers: 2,
        maxWorkers: 2,
        minWebservers: 2,
        maxWebservers: 2,
        schedulers: 2,
      }),
    ).toThrow('For MW1_MICRO environment class, minWorkers, maxWorkers, minWebservers, maxWebservers, and schedulers must all be 1.');
  });

  test('should throw an error if minWorkers is greater than maxWorkers', () => {
    expect(() =>
      Sizing.custom({
        environmentClass: EnvironmentClass.MW1_SMALL,
        minWorkers: 6,
        maxWorkers: 5,
        minWebservers: 2,
        maxWebservers: 5,
        schedulers: 2,
      }),
    ).toThrow('For non-MW1_MICRO environment classes, minWorkers must be less than or equal to maxWorkers.');
  });

  test('should throw an error if minWebservers is greater than maxWebservers', () => {
    expect(() =>
      Sizing.custom({
        environmentClass: EnvironmentClass.MW1_MEDIUM,
        minWorkers: 2,
        maxWorkers: 5,
        minWebservers: 5,
        maxWebservers: 3,
        schedulers: 2,
      }),
    ).toThrow('For non-MW1_MICRO environment classes, minWebservers must be less than or equal to maxWebservers.');
  });

  test('should throw an error if minWorkers is out of range', () => {
    expect(() =>
      Sizing.custom({
        environmentClass: EnvironmentClass.MW1_SMALL,
        minWorkers: 0,
        maxWorkers: 5,
        minWebservers: 2,
        maxWebservers: 5,
        schedulers: 2,
      }),
    ).toThrow('For non-MW1_MICRO environment classes, minWorkers must be between 1 and 25.');
  });

  test('should throw an error if maxWorkers is out of range', () => {
    expect(() =>
      Sizing.custom({
        environmentClass: EnvironmentClass.MW1_SMALL,
        minWorkers: 2,
        maxWorkers: 30,
        minWebservers: 2,
        maxWebservers: 5,
        schedulers: 2,
      }),
    ).toThrow('For non-MW1_MICRO environment classes, maxWorkers must be between 1 and 25.');
  });

  test('should throw an error if schedulers is out of range', () => {
    expect(() =>
      Sizing.custom({
        environmentClass: EnvironmentClass.MW1_SMALL,
        minWorkers: 2,
        maxWorkers: 5,
        minWebservers: 2,
        maxWebservers: 5,
        schedulers: 6,
      }),
    ).toThrow('For non-MW1_MICRO environment classes, schedulers must be between 2 and 5.');
  });
});
