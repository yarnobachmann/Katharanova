import * as migration_20260622_084302_init from './20260622_084302_init';
import * as migration_20260622_095924_add_about_method_steps from './20260622_095924_add_about_method_steps';
import * as migration_20260622_103252_remove_pricing_unit from './20260622_103252_remove_pricing_unit';

export const migrations = [
  {
    up: migration_20260622_084302_init.up,
    down: migration_20260622_084302_init.down,
    name: '20260622_084302_init',
  },
  {
    up: migration_20260622_095924_add_about_method_steps.up,
    down: migration_20260622_095924_add_about_method_steps.down,
    name: '20260622_095924_add_about_method_steps',
  },
  {
    up: migration_20260622_103252_remove_pricing_unit.up,
    down: migration_20260622_103252_remove_pricing_unit.down,
    name: '20260622_103252_remove_pricing_unit'
  },
];
