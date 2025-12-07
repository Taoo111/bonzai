import * as migration_20251129_141020_user_collection from './20251129_141020_user_collection';
import * as migration_20251130_151750_payments_collection from './20251130_151750_payments_collection';
import * as migration_20251130_152123_subscriptions_collection from './20251130_152123_subscriptions_collection';
import * as migration_20251130_152830_attendance_collection from './20251130_152830_attendance_collection';
import * as migration_20251130_155358_training_classes_collection from './20251130_155358_training_classes_collection';
import * as migration_20251130_155924_attendees_column from './20251130_155924_attendees_column';
import * as migration_20251203_002558_schedule from './20251203_002558_schedule';
import * as migration_20251203_003307_schedule_end_time from './20251203_003307_schedule_end_time';
import * as migration_20251206_213545_add_level_to_training_classes from './20251206_213545_add_level_to_training_classes';
import * as migration_20251206_215345_remove_color_training_classes from './20251206_215345_remove_color_training_classes';
import * as migration_20251207_145046_add_profile_image_and_nickname_to_users from './20251207_145046_add_profile_image_and_nickname_to_users';
import * as migration_20251207_150427_add_description_to_users from './20251207_150427_add_description_to_users';

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
    name: '20251130_152830_attendance_collection',
  },
  {
    up: migration_20251130_155358_training_classes_collection.up,
    down: migration_20251130_155358_training_classes_collection.down,
    name: '20251130_155358_training_classes_collection',
  },
  {
    up: migration_20251130_155924_attendees_column.up,
    down: migration_20251130_155924_attendees_column.down,
    name: '20251130_155924_attendees_column',
  },
  {
    up: migration_20251203_002558_schedule.up,
    down: migration_20251203_002558_schedule.down,
    name: '20251203_002558_schedule',
  },
  {
    up: migration_20251203_003307_schedule_end_time.up,
    down: migration_20251203_003307_schedule_end_time.down,
    name: '20251203_003307_schedule_end_time',
  },
  {
    up: migration_20251206_213545_add_level_to_training_classes.up,
    down: migration_20251206_213545_add_level_to_training_classes.down,
    name: '20251206_213545_add_level_to_training_classes',
  },
  {
    up: migration_20251206_215345_remove_color_training_classes.up,
    down: migration_20251206_215345_remove_color_training_classes.down,
    name: '20251206_215345_remove_color_training_classes',
  },
  {
    up: migration_20251207_145046_add_profile_image_and_nickname_to_users.up,
    down: migration_20251207_145046_add_profile_image_and_nickname_to_users.down,
    name: '20251207_145046_add_profile_image_and_nickname_to_users',
  },
  {
    up: migration_20251207_150427_add_description_to_users.up,
    down: migration_20251207_150427_add_description_to_users.down,
    name: '20251207_150427_add_description_to_users'
  },
];
