-- =============================================
-- Migration: Calendar dynamic filters + ownership safety
-- Ensures calendar_event has fields/policies required for
-- dynamic loading by city and owner-only soft delete.
-- =============================================

ALTER TABLE "public"."calendar_event"
    ADD COLUMN IF NOT EXISTS "created_by" "uuid",
    ADD COLUMN IF NOT EXISTS "deleted_at" timestamp without time zone,
    ADD COLUMN IF NOT EXISTS "updated_at" timestamp without time zone DEFAULT "now"();

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'calendar_event_created_by_fkey'
    ) THEN
        ALTER TABLE ONLY "public"."calendar_event"
            ADD CONSTRAINT "calendar_event_created_by_fkey"
            FOREIGN KEY ("created_by") REFERENCES "public"."profile"("profile_id");
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS "idx_calendar_event_city_sport_dates"
    ON "public"."calendar_event" ("city_id", "sport_id", "reference_start", "reference_end")
    WHERE "deleted_at" IS NULL;

CREATE INDEX IF NOT EXISTS "idx_calendar_event_created_by"
    ON "public"."calendar_event" ("created_by")
    WHERE "deleted_at" IS NULL;

ALTER TABLE "public"."calendar_event" ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'calendar_event'
          AND policyname = 'Public read active calendar events'
    ) THEN
        CREATE POLICY "Public read active calendar events" ON "public"."calendar_event"
            FOR SELECT USING ("deleted_at" IS NULL);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'calendar_event'
          AND policyname = 'Authenticated users can create events'
    ) THEN
        CREATE POLICY "Authenticated users can create events" ON "public"."calendar_event"
            FOR INSERT WITH CHECK ("auth"."uid"() = "created_by");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'calendar_event'
          AND policyname = 'Creators can delete own events'
    ) THEN
        CREATE POLICY "Creators can delete own events" ON "public"."calendar_event"
            FOR DELETE USING ("auth"."uid"() = "created_by");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'calendar_event'
          AND policyname = 'Creators can soft-delete own events'
    ) THEN
        CREATE POLICY "Creators can soft-delete own events" ON "public"."calendar_event"
            FOR UPDATE USING ("auth"."uid"() = "created_by")
            WITH CHECK ("auth"."uid"() = "created_by");
    END IF;
END $$;

GRANT SELECT ON TABLE "public"."calendar_event" TO "anon";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "public"."calendar_event" TO "authenticated";
GRANT ALL ON TABLE "public"."calendar_event" TO "service_role";
