import * as migration_20260622_084302_init from './20260622_084302_init';

export const migrations = [
  {
    up: migration_20260622_084302_init.up,
    down: migration_20260622_084302_init.down,
    name: '20260622_084302_init'
  },
];
