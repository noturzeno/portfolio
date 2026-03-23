/** MIME type for `<link type="…">` on preloaded `/public` images. */
export function mimeForPublicImage(path: string): string | undefined {
	const lower = path.toLowerCase().split('?')[0];
	if (lower.endsWith('.png')) return 'image/png';
	if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
	if (lower.endsWith('.webp')) return 'image/webp';
	if (lower.endsWith('.svg')) return 'image/svg+xml';
	return undefined;
}
