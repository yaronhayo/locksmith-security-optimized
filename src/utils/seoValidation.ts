/**
 * SEO validation utilities
 * These functions help validate and optimize SEO elements
 */

/**
 * Validate meta title
 * @param title Meta title to validate
 * @returns Validation result with status and message
 */
export const validateMetaTitle = (title: string): { valid: boolean; message: string } => {
  if (!title) {
    return { valid: false, message: 'Title is missing' };
  }
  
  if (title.length < 10) {
    return { valid: false, message: 'Title is too short (less than 10 characters)' };
  }
  
  if (title.length > 60) {
    return { valid: false, message: `Title is too long (${title.length} characters, should be 60 or less)` };
  }
  
  return { valid: true, message: 'Title length is optimal' };
};

/**
 * Validate meta description
 * @param description Meta description to validate
 * @returns Validation result with status and message
 */
export const validateMetaDescription = (description: string): { valid: boolean; message: string } => {
  if (!description) {
    return { valid: false, message: 'Description is missing' };
  }
  
  if (description.length < 50) {
    return { valid: false, message: 'Description is too short (less than 50 characters)' };
  }
  
  if (description.length > 160) {
    return { valid: false, message: `Description is too long (${description.length} characters, should be 160 or less)` };
  }
  
  return { valid: true, message: 'Description length is optimal' };
};

/**
 * Validate heading hierarchy
 * @param headings Array of heading elements (h1, h2, h3, etc.)
 * @returns Validation result with status and message
 */
export const validateHeadingHierarchy = (headings: HTMLHeadingElement[]): { valid: boolean; message: string } => {
  // Check if there's exactly one H1
  const h1Count = headings.filter(h => h.tagName === 'H1').length;
  if (h1Count === 0) {
    return { valid: false, message: 'No H1 heading found on the page' };
  }
  
  if (h1Count > 1) {
    return { valid: false, message: `Multiple H1 headings found (${h1Count})` };
  }
  
  // Check heading hierarchy (H1 -> H2 -> H3, etc.)
  let currentLevel = 1;
  let hierarchyValid = true;
  let invalidHeading = '';
  
  for (const heading of headings) {
    const level = parseInt(heading.tagName.substring(1));
    
    // Heading level should not skip (e.g., H1 -> H3)
    if (level > currentLevel + 1) {
      hierarchyValid = false;
      invalidHeading = `${heading.tagName} (${heading.textContent})`;
      break;
    }
    
    currentLevel = Math.max(currentLevel, level);
  }
  
  if (!hierarchyValid) {
    return { valid: false, message: `Heading hierarchy is not sequential, found ${invalidHeading}` };
  }
  
  return { valid: true, message: 'Heading hierarchy is valid' };
};

/**
 * Validate structured data
 * @param schema Structured data schema to validate
 * @returns Validation result with status and message
 */
export const validateStructuredData = (schema: any): { valid: boolean; message: string } => {
  if (!schema) {
    return { valid: false, message: 'Structured data is missing' };
  }
  
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    return { valid: false, message: 'Invalid @context in structured data' };
  }
  
  if (!schema['@type']) {
    return { valid: false, message: 'Missing @type in structured data' };
  }
  
  // Validate LocalBusiness schema
  if (schema['@type'] === 'LocalBusiness') {
    if (!schema.name) {
      return { valid: false, message: 'Missing name in LocalBusiness schema' };
    }
    
    if (!schema.address) {
      return { valid: false, message: 'Missing address in LocalBusiness schema' };
    }
    
    if (!schema.telephone) {
      return { valid: false, message: 'Missing telephone in LocalBusiness schema' };
    }
  }
  
  // Validate Service schema
  if (schema['@type'] === 'Service') {
    if (!schema.name) {
      return { valid: false, message: 'Missing name in Service schema' };
    }
    
    if (!schema.description) {
      return { valid: false, message: 'Missing description in Service schema' };
    }
  }
  
  return { valid: true, message: 'Structured data is valid' };
};

/**
 * Validate canonical URL
 * @param url Canonical URL to validate
 * @param currentUrl Current page URL
 * @returns Validation result with status and message
 */
export const validateCanonicalUrl = (url: string, currentUrl: string): { valid: boolean; message: string } => {
  if (!url) {
    return { valid: false, message: 'Canonical URL is missing' };
  }
  
  try {
    new URL(url);
  } catch (e) {
    return { valid: false, message: 'Canonical URL is not a valid URL' };
  }
  
  // Check if canonical URL matches current URL (ignoring trailing slash)
  const normalizedCanonical = url.replace(/\/$/, '');
  const normalizedCurrent = currentUrl.replace(/\/$/, '');
  
  if (normalizedCanonical !== normalizedCurrent) {
    return { valid: false, message: `Canonical URL (${url}) does not match current URL (${currentUrl})` };
  }
  
  return { valid: true, message: 'Canonical URL is valid' };
};

/**
 * Run comprehensive SEO audit
 * @param document DOM document to audit
 * @returns Audit results with status and messages
 */
export const runSEOAudit = (document: Document): { valid: boolean; results: Array<{ name: string; valid: boolean; message: string }> } => {
  const results: Array<{ name: string; valid: boolean; message: string }> = [];
  
  // Get meta title
  const metaTitle = document.querySelector('title')?.textContent || '';
  results.push({ name: 'Meta Title', ...validateMetaTitle(metaTitle) });
  
  // Get meta description
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  results.push({ name: 'Meta Description', ...validateMetaDescription(metaDescription) });
  
  // Get headings
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  results.push({ name: 'Heading Hierarchy', ...validateHeadingHierarchy(headings as HTMLHeadingElement[]) });
  
  // Get canonical URL
  const canonicalUrl = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
  results.push({ name: 'Canonical URL', ...validateCanonicalUrl(canonicalUrl, window.location.href) });
  
  // Get structured data
  const structuredData = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
    .map(script => {
      try {
        return JSON.parse(script.textContent || '');
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean);
  
  if (structuredData.length === 0) {
    results.push({ name: 'Structured Data', valid: false, message: 'No structured data found' });
  } else {
    structuredData.forEach((schema, index) => {
      results.push({ name: `Structured Data ${index + 1}`, ...validateStructuredData(schema) });
    });
  }
  
  // Check if all validations passed
  const valid = results.every(result => result.valid);
  
  return { valid, results };
};

export default {
  validateMetaTitle,
  validateMetaDescription,
  validateHeadingHierarchy,
  validateStructuredData,
  validateCanonicalUrl,
  runSEOAudit
};