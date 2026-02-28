-- =============================================
-- Migration: Add Modality + Másters Categories
-- Adds modality field to sport_category to distinguish
-- sub-disciplines (Carreras vs Másters) within a sport.
-- Seeds Másters swimming categories.
-- =============================================

-- ─── Add modality column ───────────────────────
ALTER TABLE "public"."sport_category"
    ADD COLUMN "modality" character varying(100) NOT NULL DEFAULT 'Carreras';

-- ─── Update unique constraint ──────────────────
-- Drop old constraint (sport_id, name, min_age) and replace with one
-- that includes modality, since "Mayores" in Carreras (21+) and
-- a hypothetical overlap in Másters need to coexist.
ALTER TABLE "public"."sport_category"
    DROP CONSTRAINT "sport_category_unique";

ALTER TABLE "public"."sport_category"
    ADD CONSTRAINT "sport_category_unique" UNIQUE ("sport_id", "modality", "name", "min_age");

-- ─── Seed: Natación Carreras - Másters 2026 ────
DO $$
DECLARE
    swimming_id UUID;
BEGIN
    SELECT sport_id INTO swimming_id
    FROM "public"."sport"
    WHERE name ILIKE '%nataci%n%'
    LIMIT 1;

    IF swimming_id IS NOT NULL THEN
        INSERT INTO "public"."sport_category"
            (sport_id, modality, name, min_age, max_age, max_individual_events, sort_order)
        VALUES
            (swimming_id, 'Másters', 'Másters', 20, 29, 6, 10),
            (swimming_id, 'Másters', 'Másters', 30, 39, 6, 11),
            (swimming_id, 'Másters', 'Másters', 40, 49, 6, 12),
            (swimming_id, 'Másters', 'Másters', 50, 59, 6, 13),
            (swimming_id, 'Másters', 'Másters', 60, NULL, 6, 14);
    END IF;
END $$;
