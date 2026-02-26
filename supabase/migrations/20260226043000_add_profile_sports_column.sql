alter table public.profile
add column if not exists sports text[] not null default '{}';

comment on column public.profile.sports is 'Selected sport identifiers for the user profile.';
