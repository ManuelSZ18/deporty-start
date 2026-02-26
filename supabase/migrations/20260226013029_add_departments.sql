-- =============================================
-- Migration: Add Departments
-- Creates department table and links cities
-- =============================================

-- ─── Table: department ──────────────────────────────
CREATE TABLE IF NOT EXISTS "public"."department" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(100) NOT NULL,
    "country_id" bigint NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"()
);

ALTER TABLE "public"."department" OWNER TO "postgres";

ALTER TABLE ONLY "public"."department"
    ADD CONSTRAINT "department_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."department"
    ADD CONSTRAINT "department_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id");

-- Index for filtering by country
CREATE INDEX "idx_department_country" ON "public"."department" ("country_id");

-- ─── Alter Table: city ────────────────────────────
-- 1. Add new column department_id
ALTER TABLE "public"."city" ADD COLUMN "department_id" "uuid";

-- 2. Add foreign key linking city to department
ALTER TABLE "public"."city"
    ADD CONSTRAINT "city_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id");

CREATE INDEX "idx_city_department" ON "public"."city" ("department_id");

-- ─── RLS: department ────────────────────────────────
ALTER TABLE "public"."department" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read departments" ON "public"."department"
    FOR SELECT USING (true);

-- ─── Grants ───────────────────────────────────
GRANT ALL ON TABLE "public"."department" TO "anon";
GRANT ALL ON TABLE "public"."department" TO "authenticated";
GRANT ALL ON TABLE "public"."department" TO "service_role";

-- ─── Seed: Departments & Update Cities ─────────────────────────────
-- This block will create a sample department for each country where cities exist
-- and assign existing cities to these new departments.

DO $$
DECLARE
    rec RECORD;
    new_dept_id UUID;
    colombia_id BIGINT;
    argentina_id BIGINT;
    brasil_id BIGINT;
    mexico_id BIGINT;
    chile_id BIGINT;
    peru_id BIGINT;
    venezuela_id BIGINT;
    antioquia_id UUID;
    cundinamarca_id UUID;
    valle_id UUID;
    atlantico_id UUID;
    bolivar_id UUID;
    santander_id UUID;
BEGIN
    -- Get country IDs
    SELECT id INTO colombia_id FROM "public"."countries" WHERE iso_code = 'CO';
    SELECT id INTO argentina_id FROM "public"."countries" WHERE iso_code = 'AR';
    SELECT id INTO brasil_id FROM "public"."countries" WHERE iso_code = 'BR';
    SELECT id INTO mexico_id FROM "public"."countries" WHERE iso_code = 'MX';
    SELECT id INTO chile_id FROM "public"."countries" WHERE iso_code = 'CL';
    SELECT id INTO peru_id FROM "public"."countries" WHERE iso_code = 'PE';
    SELECT id INTO venezuela_id FROM "public"."countries" WHERE iso_code = 'VE';

    -- Note: This is an idempotent seeding strategy for typical LatAm departments
    
    -- Colombia Departments
    IF colombia_id IS NOT NULL THEN
        INSERT INTO "public"."department" (name, country_id) VALUES ('Antioquia', colombia_id) RETURNING id INTO antioquia_id;
        INSERT INTO "public"."department" (name, country_id) VALUES ('Cundinamarca', colombia_id) RETURNING id INTO cundinamarca_id;
        INSERT INTO "public"."department" (name, country_id) VALUES ('Valle del Cauca', colombia_id) RETURNING id INTO valle_id;
        INSERT INTO "public"."department" (name, country_id) VALUES ('Atlántico', colombia_id) RETURNING id INTO atlantico_id;
        INSERT INTO "public"."department" (name, country_id) VALUES ('Bolívar', colombia_id) RETURNING id INTO bolivar_id;
        INSERT INTO "public"."department" (name, country_id) VALUES ('Santander', colombia_id) RETURNING id INTO santander_id;

        UPDATE "public"."city" SET department_id = antioquia_id WHERE name = 'Medellín' AND country_id = colombia_id;
        UPDATE "public"."city" SET department_id = cundinamarca_id WHERE name = 'Bogotá' AND country_id = colombia_id;
        UPDATE "public"."city" SET department_id = valle_id WHERE name = 'Cali' AND country_id = colombia_id;
        UPDATE "public"."city" SET department_id = atlantico_id WHERE name = 'Barranquilla' AND country_id = colombia_id;
        UPDATE "public"."city" SET department_id = bolivar_id WHERE name = 'Cartagena' AND country_id = colombia_id;
        UPDATE "public"."city" SET department_id = santander_id WHERE name = 'Bucaramanga' AND country_id = colombia_id;
    END IF;

    -- For the rest, just create a general "Provincia/Estado" and assign their cities.
    -- Argentina
    IF argentina_id IS NOT NULL THEN
        INSERT INTO "public"."department" (name, country_id) VALUES ('Buenos Aires', argentina_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Buenos Aires' AND country_id = argentina_id;
        
        INSERT INTO "public"."department" (name, country_id) VALUES ('Córdoba', argentina_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Córdoba' AND country_id = argentina_id;
        
        INSERT INTO "public"."department" (name, country_id) VALUES ('Santa Fe', argentina_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Rosario' AND country_id = argentina_id;
        
        INSERT INTO "public"."department" (name, country_id) VALUES ('Mendoza', argentina_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Mendoza' AND country_id = argentina_id;
    END IF;

    -- Brasil
    IF brasil_id IS NOT NULL THEN
        INSERT INTO "public"."department" (name, country_id) VALUES ('São Paulo', brasil_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'São Paulo' AND country_id = brasil_id;
        
        INSERT INTO "public"."department" (name, country_id) VALUES ('Rio de Janeiro', brasil_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Río de Janeiro' AND country_id = brasil_id;
        
        INSERT INTO "public"."department" (name, country_id) VALUES ('Distrito Federal', brasil_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Brasilia' AND country_id = brasil_id;
        
        INSERT INTO "public"."department" (name, country_id) VALUES ('Bahia', brasil_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Salvador' AND country_id = brasil_id;
    END IF;

    -- Mexico
    IF mexico_id IS NOT NULL THEN
        INSERT INTO "public"."department" (name, country_id) VALUES ('Ciudad de México', mexico_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Ciudad de México' AND country_id = mexico_id;
        
        INSERT INTO "public"."department" (name, country_id) VALUES ('Jalisco', mexico_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Guadalajara' AND country_id = mexico_id;
        
        INSERT INTO "public"."department" (name, country_id) VALUES ('Nuevo León', mexico_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Monterrey' AND country_id = mexico_id;
    END IF;

    -- Chile
    IF chile_id IS NOT NULL THEN
        INSERT INTO "public"."department" (name, country_id) VALUES ('Región Metropolitana', chile_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Santiago' AND country_id = chile_id;
        
        INSERT INTO "public"."department" (name, country_id) VALUES ('Valparaíso', chile_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Valparaíso' AND country_id = chile_id;
    END IF;

    -- Perú
    IF peru_id IS NOT NULL THEN
        INSERT INTO "public"."department" (name, country_id) VALUES ('Lima', peru_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Lima' AND country_id = peru_id;
        
        INSERT INTO "public"."department" (name, country_id) VALUES ('Arequipa', peru_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Arequipa' AND country_id = peru_id;
    END IF;

    -- Venezuela
    IF venezuela_id IS NOT NULL THEN
        INSERT INTO "public"."department" (name, country_id) VALUES ('Distrito Capital', venezuela_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Caracas' AND country_id = venezuela_id;
        
        INSERT INTO "public"."department" (name, country_id) VALUES ('Zulia', venezuela_id) RETURNING id INTO new_dept_id;
        UPDATE "public"."city" SET department_id = new_dept_id WHERE name = 'Maracaibo' AND country_id = venezuela_id;
    END IF;

END $$;

-- Drop country_id from city since it's redundant now (it implies through department)
-- NOTE: We will keep it for now for backwards compatibility and ease of queries, 
-- but normally you would drop it. Let's make department_id NOT NULL for the future.
ALTER TABLE "public"."city" ALTER COLUMN "department_id" SET NOT NULL;
