import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import fs from 'fs';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
import imagemin from 'vite-plugin-imagemin';

// Custom plugin to generate sitemap during build
const generateSitemap = () => {
  return {
    name: 'generate-sitemap',
    closeBundle: async () => {
      try {
        // Dynamically import the sitemap generator
        const { 
          generateSitemapXml, 
          generateServiceSitemapXml, 
          generateLocationSitemapXml,
          generateSitemapIndexXml
        } = await import('./src/utils/sitemapGenerator');
        
        // Ensure the dist directory exists
        if (!fs.existsSync('./dist')) {
          fs.mkdirSync('./dist', { recursive: true });
        }
        
        // Generate and write the main sitemap
        const sitemap = generateSitemapXml();
        fs.writeFileSync('./dist/sitemap.xml', sitemap);
        
        // Generate and write the services sitemap
        const servicesSitemap = generateServiceSitemapXml();
        fs.writeFileSync('./dist/sitemap-services.xml', servicesSitemap);
        
        // Generate and write the locations sitemap
        const locationsSitemap = generateLocationSitemapXml();
        fs.writeFileSync('./dist/sitemap-locations.xml', locationsSitemap);
        
        // Generate and write the sitemap index
        const sitemapIndex = generateSitemapIndexXml();
        fs.writeFileSync('./dist/sitemap-index.xml', sitemapIndex);
        
        console.log('Generated sitemaps successfully');
      } catch (error) {
        console.error('Failed to generate sitemap:', error);
      }
    },
  };
};

// Custom plugin to generate robots.txt during build
const generateRobotsTxt = () => {
  return {
    name: 'generate-robots-txt',
    writeBundle: async () => {
      try {
        // Ensure the dist directory exists
        if (!fs.existsSync('./dist')) {
          fs.mkdirSync('./dist', { recursive: true });
        }
        
        // Copy robots.txt from public to dist
        if (fs.existsSync('./public/robots.txt')) {
          fs.copyFileSync('./public/robots.txt', './dist/robots.txt');
          console.log('Copied robots.txt to dist directory');
        }
      } catch (error) {
        console.error('Failed to generate robots.txt:', error);
      }
    },
  };
};

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Image optimization for production builds
    mode === 'production' && imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
      webp: {
        quality: 80,
      },
    }),
    // Compression for production builds
    mode === 'production' && compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    mode === 'production' && compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Generate sitemap for production builds
    mode === 'production' && generateSitemap(),
    mode === 'production' && generateRobotsTxt(),
    // Bundle analyzer for analyze mode
    mode === 'analyze' && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser', // Make sure terser is installed
    cssMinify: true,
    reportCompressedSize: false, // Speeds up build
    chunkSizeWarningLimit: 1000, // Higher threshold for warnings
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '@/components/ui/button', 
            '@/components/ui/card',
            '@/components/ui/form',
            '@/components/ui/input',
            '@/components/ui/skeleton'
          ],
          utils: ['@/lib/utils', '@/utils/performanceMonitoring'],
          maps: ['@react-google-maps/api'],
          animations: ['framer-motion'],
          forms: ['react-hook-form', 'zod'],
        },
        // Ensure consistent file naming to improve caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
}));