import * as migration_20251129_141020_user_collection from './20251129_141020_user_collection';

export const migrations = [
  {
    up: migration_20251129_141020_user_collection.up,
    down: migration_20251129_141020_user_collection.down,
    name: '20251129_141020_user_collection'
  },
];
