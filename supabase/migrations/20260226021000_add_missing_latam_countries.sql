INSERT INTO "public"."countries" (name, iso_code)
SELECT * FROM (VALUES 
    ('Bolivia', 'BO'),
    ('Costa Rica', 'CR'),
    ('Cuba', 'CU'),
    ('República Dominicana', 'DO'),
    ('El Salvador', 'SV'),
    ('Guatemala', 'GT'),
    ('Honduras', 'HN'),
    ('Nicaragua', 'NI'),
    ('Panamá', 'PA'),
    ('Puerto Rico', 'PR')
) AS v(name, iso_code)
WHERE NOT EXISTS (
    SELECT 1 FROM "public"."countries" WHERE iso_code = v.iso_code
);
