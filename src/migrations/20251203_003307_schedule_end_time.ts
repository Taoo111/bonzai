import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      -- Rename column and change type from numeric to varchar
      IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'schedule_days_classes' 
        AND column_name = 'duration'
      ) THEN
        ALTER TABLE "schedule_days_classes" RENAME COLUMN "duration" TO "end_time";
        ALTER TABLE "schedule_days_classes" 
        ALTER COLUMN "end_time" TYPE varchar USING "end_time"::text;
        ALTER TABLE "schedule_days_classes" 
        ALTER COLUMN "end_time" DROP DEFAULT;
        ALTER TABLE "schedule_days_classes" 
        ALTER COLUMN "end_time" SET NOT NULL;
      END IF;
    END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      -- Revert: rename column and change type back from varchar to numeric
      IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'schedule_days_classes' 
        AND column_name = 'end_time'
      ) THEN
        ALTER TABLE "schedule_days_classes" 
        ALTER COLUMN "end_time" TYPE numeric USING NULLIF("end_time", '')::numeric;
        ALTER TABLE "schedule_days_classes" 
        ALTER COLUMN "end_time" SET DEFAULT 90;
        ALTER TABLE "schedule_days_classes" 
        ALTER COLUMN "end_time" SET NOT NULL;
        ALTER TABLE "schedule_days_classes" RENAME COLUMN "end_time" TO "duration";
      END IF;
    END $$;
  `)
}
