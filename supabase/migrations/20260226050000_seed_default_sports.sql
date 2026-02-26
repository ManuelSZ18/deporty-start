insert into public.sport (name)
select 'Fútbol'
where not exists (select 1 from public.sport where lower(name) = lower('Fútbol'));

insert into public.sport (name)
select 'Natación carreras'
where not exists (select 1 from public.sport where lower(name) = lower('Natación carreras'));

insert into public.sport (name)
select 'Aguas abiertas'
where not exists (select 1 from public.sport where lower(name) = lower('Aguas abiertas'));

insert into public.sport (name)
select 'Pádel'
where not exists (select 1 from public.sport where lower(name) = lower('Pádel'));
