import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Usuń tabelę trainers jeśli istnieje
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'trainers') THEN
        ALTER TABLE "trainers" DISABLE ROW LEVEL SECURITY;
        DROP TABLE "trainers" CASCADE;
      END IF;
    END $$;
  `)

  // Usuń constraint jeśli istnieje
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF EXISTS (SELECT FROM information_schema.table_constraints WHERE constraint_name = 'payload_locked_documents_rels_trainers_fk') THEN
        ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_trainers_fk";
      END IF;
    END $$;
  `)

  // Usuń index jeśli istnieje
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF EXISTS (SELECT FROM pg_indexes WHERE indexname = 'payload_locked_documents_rels_trainers_id_idx') THEN
        DROP INDEX "payload_locked_documents_rels_trainers_id_idx";
      END IF;
    END $$;
  `)

  // Usuń kolumnę trainers_id jeśli istnieje
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'trainers_id') THEN
        ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "trainers_id";
      END IF;
    END $$;
  `)

  // Dodaj kolumny do users jeśli nie istnieją
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'profile_image_id') THEN
        ALTER TABLE "users" ADD COLUMN "profile_image_id" integer;
      END IF;
      IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'nickname') THEN
        ALTER TABLE "users" ADD COLUMN "nickname" varchar;
      END IF;
    END $$;
  `)

  // Dodaj constraint jeśli nie istnieje
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (SELECT FROM information_schema.table_constraints WHERE constraint_name = 'users_profile_image_id_media_id_fk') THEN
        ALTER TABLE "users" ADD CONSTRAINT "users_profile_image_id_media_id_fk" FOREIGN KEY ("profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
  `)

  // Dodaj index jeśli nie istnieje
  await db.execute(sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (SELECT FROM pg_indexes WHERE indexname = 'users_profile_image_idx') THEN
        CREATE INDEX "users_profile_image_idx" ON "users" USING btree ("profile_image_id");
      END IF;
    END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "trainers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"profile_image_id" integer NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"nickname" varchar,
  	"full_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" DROP CONSTRAINT "users_profile_image_id_media_id_fk";
  
  DROP INDEX "users_profile_image_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "trainers_id" integer;
  ALTER TABLE "trainers" ADD CONSTRAINT "trainers_profile_image_id_media_id_fk" FOREIGN KEY ("profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "trainers_profile_image_idx" ON "trainers" USING btree ("profile_image_id");
  CREATE INDEX "trainers_updated_at_idx" ON "trainers" USING btree ("updated_at");
  CREATE INDEX "trainers_created_at_idx" ON "trainers" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trainers_fk" FOREIGN KEY ("trainers_id") REFERENCES "public"."trainers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_trainers_id_idx" ON "payload_locked_documents_rels" USING btree ("trainers_id");
  ALTER TABLE "users" DROP COLUMN "profile_image_id";
  ALTER TABLE "users" DROP COLUMN "nickname";`)
}
