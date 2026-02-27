-- Add phone support to profile and sync trigger metadata

ALTER TABLE public.profile
ADD COLUMN IF NOT EXISTS phone character varying(20);

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
AS $$
BEGIN
  INSERT INTO public.profile (profile_id, first_name, last_name, nickname, birth_date, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'nickname', ''),
    CASE
      WHEN NEW.raw_user_meta_data ->> 'birth_date' IS NOT NULL
        THEN (NEW.raw_user_meta_data ->> 'birth_date')::date
      ELSE NULL
    END,
    NULLIF(NEW.raw_user_meta_data ->> 'phone', '')
  )
  ON CONFLICT (profile_id) DO NOTHING;

  RETURN NEW;
END;
$$;
