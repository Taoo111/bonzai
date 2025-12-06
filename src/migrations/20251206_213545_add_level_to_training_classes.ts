import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create enum type only if it doesn't exist
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_training_classes_level" AS ENUM('beginner', 'intermediate', 'advanced', 'kids');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  // Add column only if it doesn't exist
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'training_classes' 
        AND column_name = 'level'
      ) THEN
        ALTER TABLE "training_classes" ADD COLUMN "level" "enum_training_classes_level" NOT NULL DEFAULT 'beginner';
      END IF;
    END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'training_classes' 
        AND column_name = 'level'
      ) THEN
        ALTER TABLE "training_classes" DROP COLUMN "level";
      END IF;
    END $$;
    
    DO $$ BEGIN
      DROP TYPE IF EXISTS "public"."enum_training_classes_level";
    EXCEPTION
      WHEN undefined_object THEN null;
    END $$;
  `)
}
