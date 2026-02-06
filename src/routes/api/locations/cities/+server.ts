import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { cities } from '$lib/server/schema';
import { eq, ilike, and } from 'drizzle-orm';

type CacheEntry = { data: string[]; expiresAt: number };
const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60_000;
const MAX_OFFSET = 5000;

export async function GET({ url }: { url: URL }) {
    const country = url.searchParams.get('country') ?? '';
    const query = (url.searchParams.get('q') ?? '').trim();
    const limitParam = Number(url.searchParams.get('limit') ?? '50');
    const offsetParam = Number(url.searchParams.get('offset') ?? '0');
    const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 200) : 50;
    const offset = Number.isFinite(offsetParam) ? Math.min(Math.max(offsetParam, 0), MAX_OFFSET) : 0;
    if (!country) {
        return json({ country, cities: [] });
    }
    if (query.length === 1) {
        return json({ country, cities: [] });
    }

    const cacheKey = `${country}|${query}|${limit}|${offset}`;
    const cached = cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
        return json({ country, cities: cached.data });
    }

    const whereClause = query.length >= 2
        ? and(eq(cities.countryCode, country), ilike(cities.name, `${query}%`))
        : eq(cities.countryCode, country);

    const result = await db
        .select({ name: cities.name })
        .from(cities)
        .where(whereClause)
        .orderBy(cities.name)
        .limit(limit)
        .offset(offset);

    const cityNames = result.map((row) => row.name);
    cache.set(cacheKey, {
        data: cityNames,
        expiresAt: Date.now() + CACHE_TTL_MS
    });

    return json({
        country,
        cities: cityNames
    });
}
