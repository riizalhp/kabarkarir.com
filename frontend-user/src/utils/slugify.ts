/**
 * Convert a string to URL-friendly slug format
 * Handles special characters, spaces, and preserves readability
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Replace forward slashes with hyphens
    .replace(/\//g, '-')
    // Replace ampersands with 'and'
    .replace(/&/g, 'and')
    // Remove special characters except hyphens
    .replace(/[^\w\-]+/g, '')
    // Replace multiple hyphens with single hyphen
    .replace(/\-\-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * Convert a slug back to readable text
 * Used for displaying category names from URL slugs
 */
export const deslugify = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    // Handle special cases
    .replace(/\bMt\b/g, 'MT')
    .replace(/\bOdp\b/g, 'ODP')
    .replace(/\bBumn\b/g, 'BUMN')
    .replace(/\bCv\b/g, 'CV')
    .replace(/\bIt\b/g, 'IT')
    .replace(/\bHr\b/g, 'HR')
    .replace(/\bSma\b/g, 'SMA')
    .replace(/\bSmk\b/g, 'SMK')
    .replace(/\bD1\b/g, 'D1')
    .replace(/\bD2\b/g, 'D2')
    .replace(/\bD3\b/g, 'D3')
    .replace(/\bD4\b/g, 'D4')
    .replace(/\bS1\b/g, 'S1')
    .replace(/\bS2\b/g, 'S2')
    .replace(/\bS3\b/g, 'S3');
};
