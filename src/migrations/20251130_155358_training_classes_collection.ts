import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "training_classes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" ADD COLUMN "full_name" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "training_classes_id" integer;
  CREATE UNIQUE INDEX "training_classes_name_idx" ON "training_classes" USING btree ("name");
  CREATE INDEX "training_classes_updated_at_idx" ON "training_classes" USING btree ("updated_at");
  CREATE INDEX "training_classes_created_at_idx" ON "training_classes" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_training_classes_fk" FOREIGN KEY ("training_classes_id") REFERENCES "public"."training_classes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_training_classes_id_idx" ON "payload_locked_documents_rels" USING btree ("training_classes_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "training_classes" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "training_classes" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_training_classes_fk";
  
  DROP INDEX "payload_locked_documents_rels_training_classes_id_idx";
  ALTER TABLE "users" DROP COLUMN "full_name";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "training_classes_id";`)
}
