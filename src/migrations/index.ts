import * as migration_20251129_141020_user_collection from './20251129_141020_user_collection';
import * as migration_20251130_151750_payments_collection from './20251130_151750_payments_collection';
import * as migration_20251130_152123_subscriptions_collection from './20251130_152123_subscriptions_collection';
import * as migration_20251130_152830_attendance_collection from './20251130_152830_attendance_collection';

export const migrations = [
  {
    up: migration_20251129_141020_user_collection.up,
    down: migration_20251129_141020_user_collection.down,
    name: '20251129_141020_user_collection',
  },
  {
    up: migration_20251130_151750_payments_collection.up,
    down: migration_20251130_151750_payments_collection.down,
    name: '20251130_151750_payments_collection',
  },
  {
    up: migration_20251130_152123_subscriptions_collection.up,
    down: migration_20251130_152123_subscriptions_collection.down,
    name: '20251130_152123_subscriptions_collection',
  },
  {
    up: migration_20251130_152830_attendance_collection.up,
    down: migration_20251130_152830_attendance_collection.down,
    name: '20251130_152830_attendance_collection'
  },
];
