/**
 * Deployment testing utilities
 * These functions help test and validate deployment configuration
 */

/**
 * Test Vercel configuration
 * @returns Validation result with status and message
 */
export const testVercelConfig = (): { valid: boolean; message: string } => {
  try {
    // Check if vercel.json exists
    const vercelConfig = require('../../vercel.json');
    
    // Check if rewrites are configured correctly
    if (!vercelConfig.rewrites || !Array.isArray(vercelConfig.rewrites) || vercelConfig.rewrites.length === 0) {
      return { valid: false, message: 'Missing or invalid rewrites configuration in vercel.json' };
    }
    
    // Check if headers are configured correctly
    if (!vercelConfig.headers || !Array.isArray(vercelConfig.headers) || vercelConfig.headers.length === 0) {
      return { valid: false, message: 'Missing or invalid headers configuration in vercel.json' };
    }
    
    // Check if build configuration is set
    if (!vercelConfig.buildCommand || !vercelConfig.outputDirectory) {
      return { valid: false, message: 'Missing build configuration in vercel.json' };
    }
    
    return { valid: true, message: 'Vercel configuration is valid' };
  } catch (error) {
    return { valid: false, message: 'Failed to load vercel.json' };
  }
};

/**
 * Test external integrations
 * @returns Validation results for each integration
 */
export const testExternalIntegrations = (): Array<{ name: string; valid: boolean; message: string }> => {
  const results: Array<{ name: string; valid: boolean; message: string }> = [];
  
  // Test Google Tag Manager
  try {
    if (typeof window !== 'undefined' && window.dataLayer) {
      results.push({ name: 'Google Tag Manager', valid: true, message: 'Google Tag Manager is loaded' });
    } else {
      results.push({ name: 'Google Tag Manager', valid: false, message: 'Google Tag Manager is not loaded' });
    }
  } catch (error) {
    results.push({ name: 'Google Tag Manager', valid: false, message: 'Error testing Google Tag Manager' });
  }
  
  // Test Google Maps API
  try {
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      results.push({ name: 'Google Maps API', valid: true, message: 'Google Maps API is loaded' });
    } else {
      results.push({ name: 'Google Maps API', valid: false, message: 'Google Maps API is not loaded' });
    }
  } catch (error) {
    results.push({ name: 'Google Maps API', valid: false, message: 'Error testing Google Maps API' });
  }
  
  // Test reCAPTCHA
  try {
    if (typeof window !== 'undefined' && window.grecaptcha) {
      results.push({ name: 'reCAPTCHA', valid: true, message: 'reCAPTCHA is loaded' });
    } else {
      results.push({ name: 'reCAPTCHA', valid: false, message: 'reCAPTCHA is not loaded' });
    }
  } catch (error) {
    results.push({ name: 'reCAPTCHA', valid: false, message: 'Error testing reCAPTCHA' });
  }
  
  return results;
};

/**
 * Test form functionality
 * @param formId ID of the form to test
 * @returns Validation result with status and message
 */
export const testFormFunctionality = (formId: string): { valid: boolean; message: string } => {
  try {
    // Check if form exists
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) {
      return { valid: false, message: `Form with ID "${formId}" not found` };
    }
    
    // Check if form has required fields
    const requiredFields = form.querySelectorAll('[required]');
    if (requiredFields.length === 0) {
      return { valid: false, message: 'Form has no required fields' };
    }
    
    // Check if form has submit button
    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) {
      return { valid: false, message: 'Form has no submit button' };
    }
    
    return { valid: true, message: 'Form functionality is valid' };
  } catch (error) {
    return { valid: false, message: 'Error testing form functionality' };
  }
};

/**
 * Test navigation functionality
 * @returns Validation result with status and message
 */
export const testNavigationFunctionality = (): { valid: boolean; message: string } => {
  try {
    // Check if navigation exists
    const navigation = document.querySelector('nav');
    if (!navigation) {
      return { valid: false, message: 'Navigation not found' };
    }
    
    // Check if navigation has links
    const links = navigation.querySelectorAll('a');
    if (links.length === 0) {
      return { valid: false, message: 'Navigation has no links' };
    }
    
    return { valid: true, message: 'Navigation functionality is valid' };
  } catch (error) {
    return { valid: false, message: 'Error testing navigation functionality' };
  }
};

/**
 * Run comprehensive deployment test
 * @returns Test results with status and messages
 */
export const runDeploymentTest = (): { valid: boolean; results: Array<{ name: string; valid: boolean; message: string }> } => {
  const results: Array<{ name: string; valid: boolean; message: string }> = [];
  
  // Test Vercel configuration
  const vercelResult = testVercelConfig();
  results.push({ name: 'Vercel Configuration', ...vercelResult });
  
  // Test external integrations
  const integrationResults = testExternalIntegrations();
  results.push(...integrationResults);
  
  // Test form functionality
  const contactFormResult = testFormFunctionality('contact-form');
  results.push({ name: 'Contact Form', ...contactFormResult });
  
  const bookingFormResult = testFormFunctionality('booking-form');
  results.push({ name: 'Booking Form', ...bookingFormResult });
  
  // Test navigation functionality
  const navigationResult = testNavigationFunctionality();
  results.push({ name: 'Navigation', ...navigationResult });
  
  // Check if all tests passed
  const valid = results.every(result => result.valid);
  
  return { valid, results };
};

export default {
  testVercelConfig,
  testExternalIntegrations,
  testFormFunctionality,
  testNavigationFunctionality,
  runDeploymentTest
};