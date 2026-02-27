const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const LATAM_DATE_REGEX = /^(\d{2})\/(\d{2})\/(\d{4})$/;

function isValidDateParts(year: number, month: number, day: number): boolean {
	if (month < 1 || month > 12 || day < 1 || day > 31) return false;

	const date = new Date(Date.UTC(year, month - 1, day));
	return (
		date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
	);
}

function toIsoDate(year: number, month: number, day: number): string {
	const monthPadded = String(month).padStart(2, '0');
	const dayPadded = String(day).padStart(2, '0');
	return `${year}-${monthPadded}-${dayPadded}`;
}

export function normalizeToIsoDate(value: string): string | null {
	const input = value?.trim();
	if (!input) return null;

	if (ISO_DATE_REGEX.test(input)) {
		const year = Number(input.slice(0, 4));
		const month = Number(input.slice(5, 7));
		const day = Number(input.slice(8, 10));
		return isValidDateParts(year, month, day) ? input : null;
	}

	const latamMatch = input.match(LATAM_DATE_REGEX);
	if (!latamMatch) return null;

	const day = Number(latamMatch[1]);
	const month = Number(latamMatch[2]);
	const year = Number(latamMatch[3]);

	if (!isValidDateParts(year, month, day)) return null;
	return toIsoDate(year, month, day);
}

export function formatDateLatam(value: string | Date | null | undefined): string {
	if (!value) return '';

	if (value instanceof Date) {
		if (Number.isNaN(value.getTime())) return '';
		const day = String(value.getDate()).padStart(2, '0');
		const month = String(value.getMonth() + 1).padStart(2, '0');
		const year = value.getFullYear();
		return `${day}/${month}/${year}`;
	}

	const input = value.trim();
	const isoCandidate = input.length >= 10 ? input.slice(0, 10) : input;
	const iso = normalizeToIsoDate(isoCandidate);
	if (!iso) return input;

	const year = iso.slice(0, 4);
	const month = iso.slice(5, 7);
	const day = iso.slice(8, 10);
	return `${day}/${month}/${year}`;
}
