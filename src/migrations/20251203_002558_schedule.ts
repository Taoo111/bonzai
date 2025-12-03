import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create enum type only if it doesn't exist
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_schedule_days_name" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  // Create tables with IF NOT EXISTS equivalent
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "schedule_days_classes" (
    	"_order" integer NOT NULL,
    	"_parent_id" varchar NOT NULL,
    	"id" varchar PRIMARY KEY NOT NULL,
    	"start_time" varchar NOT NULL,
    	"duration" numeric DEFAULT 90 NOT NULL,
    	"training_class_id" integer NOT NULL,
    	"trainer_id" integer
    );
    
    CREATE TABLE IF NOT EXISTS "schedule_days" (
    	"_order" integer NOT NULL,
    	"_parent_id" integer NOT NULL,
    	"id" varchar PRIMARY KEY NOT NULL,
    	"name" "enum_schedule_days_name" NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "schedule" (
    	"id" serial PRIMARY KEY NOT NULL,
    	"updated_at" timestamp(3) with time zone,
    	"created_at" timestamp(3) with time zone
    );
  `)

  // Add constraints (with IF NOT EXISTS check)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "schedule_days_classes" ADD CONSTRAINT "schedule_days_classes_training_class_id_training_classes_id_fk" FOREIGN KEY ("training_class_id") REFERENCES "public"."training_classes"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      ALTER TABLE "schedule_days_classes" ADD CONSTRAINT "schedule_days_classes_trainer_id_users_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      ALTER TABLE "schedule_days_classes" ADD CONSTRAINT "schedule_days_classes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schedule_days"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      ALTER TABLE "schedule_days" ADD CONSTRAINT "schedule_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schedule"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  // Create indexes (with IF NOT EXISTS)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "schedule_days_classes_order_idx" ON "schedule_days_classes" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "schedule_days_classes_parent_id_idx" ON "schedule_days_classes" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "schedule_days_classes_training_class_idx" ON "schedule_days_classes" USING btree ("training_class_id");
    CREATE INDEX IF NOT EXISTS "schedule_days_classes_trainer_idx" ON "schedule_days_classes" USING btree ("trainer_id");
    CREATE INDEX IF NOT EXISTS "schedule_days_order_idx" ON "schedule_days" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "schedule_days_parent_id_idx" ON "schedule_days" USING btree ("_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "schedule_days_classes" CASCADE;
    DROP TABLE IF EXISTS "schedule_days" CASCADE;
    DROP TABLE IF EXISTS "schedule" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_schedule_days_name";
  `)
}
