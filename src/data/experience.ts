/** First calendar year of professional software engineering (updates “N+ years” across the site). */
export const CAREER_START_YEAR = 2017;

export function getExperienceYears(): number {
	const n = new Date().getFullYear() - CAREER_START_YEAR;
	return Math.max(1, n);
}
