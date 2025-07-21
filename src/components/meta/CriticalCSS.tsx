import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Critical CSS for above-the-fold content
 * This helps reduce render-blocking resources and improve LCP
 */
const criticalCSS = `
/* Base styles */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}

/* Base element styles */
body {
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Layout */
#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  line-height: 1.2;
  font-weight: 700;
}

h1 {
  font-size: 2.25rem;
}

h2 {
  font-size: 1.875rem;
}

h3 {
  font-size: 1.5rem;
}

p {
  margin: 0;
}

/* Header */
header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Container */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  font-weight: 500;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.btn-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.btn-primary:hover {
  background-color: hsl(var(--primary) / 0.9);
}

/* Hero section */
.hero {
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-color: hsl(var(--secondary));
}

/* Prevent layout shift */
img {
  max-width: 100%;
  height: auto;
}

/* Font display */
@font-face {
  font-family: 'Outfit';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Outfit');
}

@font-face {
  font-family: 'Outfit';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Outfit Medium');
}

@font-face {
  font-family: 'Outfit';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Outfit Bold');
}
`;

interface CriticalCSSProps {
  additionalCSS?: string;
}

/**
 * CriticalCSS component for inlining critical CSS
 * This helps reduce render-blocking resources and improve LCP
 */
const CriticalCSS: React.FC<CriticalCSSProps> = ({
  additionalCSS = ''
}) => {
  return (
    <Helmet>
      <style type="text/css">{`${criticalCSS}${additionalCSS}`}</style>
    </Helmet>
  );
};

export default CriticalCSS;