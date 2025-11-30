import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "attendance_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  ALTER TABLE "attendance" DROP CONSTRAINT "attendance_member_id_users_id_fk";
  
  DROP INDEX "attendance_member_idx";
  ALTER TABLE "attendance" ADD COLUMN "training_class_id" integer NOT NULL;
  ALTER TABLE "attendance_rels" ADD CONSTRAINT "attendance_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."attendance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "attendance_rels" ADD CONSTRAINT "attendance_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "attendance_rels_order_idx" ON "attendance_rels" USING btree ("order");
  CREATE INDEX "attendance_rels_parent_idx" ON "attendance_rels" USING btree ("parent_id");
  CREATE INDEX "attendance_rels_path_idx" ON "attendance_rels" USING btree ("path");
  CREATE INDEX "attendance_rels_users_id_idx" ON "attendance_rels" USING btree ("users_id");
  ALTER TABLE "attendance" ADD CONSTRAINT "attendance_training_class_id_training_classes_id_fk" FOREIGN KEY ("training_class_id") REFERENCES "public"."training_classes"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "attendance_training_class_idx" ON "attendance" USING btree ("training_class_id");
  ALTER TABLE "attendance" DROP COLUMN "member_id";
  ALTER TABLE "attendance" DROP COLUMN "is_present";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "attendance_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "attendance_rels" CASCADE;
  ALTER TABLE "attendance" DROP CONSTRAINT "attendance_training_class_id_training_classes_id_fk";
  
  DROP INDEX "attendance_training_class_idx";
  ALTER TABLE "attendance" ADD COLUMN "member_id" integer NOT NULL;
  ALTER TABLE "attendance" ADD COLUMN "is_present" boolean DEFAULT true NOT NULL;
  ALTER TABLE "attendance" ADD CONSTRAINT "attendance_member_id_users_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "attendance_member_idx" ON "attendance" USING btree ("member_id");
  ALTER TABLE "attendance" DROP COLUMN "training_class_id";`)
}
