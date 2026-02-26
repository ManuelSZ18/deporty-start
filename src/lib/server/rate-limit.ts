// Basic In-Memory Rate Limiter for Authentication Methods
// In a cloud-scaled environment this should be backed by Redis or Supabase.
// For now, this effectively limits basic automated brute force attempts.

interface RateLimitTracker {
	count: number;
	expiresAt: number;
}

const rateLimitMap = new Map<string, RateLimitTracker>();

export class RateLimiter {
	/**
	 * Checks if the request should be rate-limited.
	 *
	 * @param identifier Usually the client's IP or a generic token
	 * @param limit Maximum allowed requests within the defined window
	 * @param timeWindowMs The length of the window in milliseconds
	 * @returns true if the request exceeded the limit, false otherwise
	 */
	static isRateLimited(
		identifier: string,
		limit: number = 5,
		timeWindowMs: number = 60000
	): boolean {
		// Bypass test environments
		if (process.env.NODE_ENV === 'test') {
			return false;
		}

		const now = Date.now();
		const tracker = rateLimitMap.get(identifier);

		// If entry exists but has expired, clean it up and start fresh
		if (tracker && tracker.expiresAt < now) {
			rateLimitMap.delete(identifier);
		}

		if (!rateLimitMap.has(identifier)) {
			rateLimitMap.set(identifier, {
				count: 1,
				expiresAt: now + timeWindowMs
			});
			return false; // Not limited
		}

		const currentTracker = rateLimitMap.get(identifier)!;
		currentTracker.count += 1;

		if (currentTracker.count > limit) {
			return true; // Exceeded limit
		}

		return false;
	}

	/**
	 * Extracts a useful identifier from the request object for rate limiting.
	 * Using x-forwarded-for falls back to standard ClientAddress
	 */
	static getClientIp(request: Request, getClientAddress?: () => string): string {
		const forwarded = request.headers.get('x-forwarded-for');
		if (forwarded) {
			return forwarded.split(',')[0].trim();
		}

		try {
			// SvelteKit's built in getClientAddress from RequestEvent
			if (getClientAddress) {
				return getClientAddress();
			}
		} catch {
			// Ignore if not available in context
		}

		return 'unknown-ip';
	}
}
