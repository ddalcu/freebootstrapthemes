#!/usr/bin/env node
/**
 * Thumbnail Generator Script
 * Generates static thumbnail images from HTML preview pages
 * Usage: node generate-thumbnails.js
 * 
 * Note: This script requires puppeteer to be installed
 * Install with: npm install puppeteer
 */

const fs = require('fs');
const path = require('path');

// Simple HTML to SVG thumbnail generator (no dependencies)
function generateSVGThumbnail(themeName, category, color) {
    const colors = {
        'Business': '#2c3e50',
        'Portfolio': '#6c5ce7', 
        'Dashboard': '#4f46e5',
        'Blog': '#1a202c',
        'E-commerce': '#1f2937',
        'Marketing': '#6366f1'
    };
    
    const themeColor = colors[category] || '#6366f1';
    
    return `<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bg-${category}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${themeColor};stop-opacity:0.1" />
                <stop offset="100%" style="stop-color:${themeColor};stop-opacity:0.3" />
            </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="400" height="250" fill="url(#bg-${category})"/>
        
        <!-- Header Bar -->
        <rect x="0" y="0" width="400" height="50" fill="${themeColor}" opacity="0.9"/>
        <rect x="20" y="15" width="80" height="20" rx="3" fill="white" opacity="0.9"/>
        <rect x="320" y="15" width="60" height="20" rx="3" fill="white" opacity="0.7"/>
        
        <!-- Content Areas -->
        <rect x="20" y="70" width="170" height="120" rx="8" fill="white" opacity="0.8"/>
        <rect x="30" y="80" width="150" height="60" rx="4" fill="${themeColor}" opacity="0.2"/>
        <rect x="30" y="150" width="100" height="15" rx="2" fill="${themeColor}" opacity="0.6"/>
        <rect x="30" y="170" width="150" height="10" rx="2" fill="${themeColor}" opacity="0.3"/>
        
        <rect x="210" y="70" width="170" height="120" rx="8" fill="white" opacity="0.8"/>
        <rect x="220" y="80" width="150" height="60" rx="4" fill="${themeColor}" opacity="0.2"/>
        <rect x="220" y="150" width="80" height="15" rx="2" fill="${themeColor}" opacity="0.6"/>
        <rect x="220" y="170" width="150" height="10" rx="2" fill="${themeColor}" opacity="0.3"/>
        
        <!-- Footer -->
        <rect x="0" y="210" width="400" height="40" fill="${themeColor}" opacity="0.8"/>
        <rect x="20" y="225" width="60" height="10" rx="2" fill="white" opacity="0.8"/>
        <rect x="320" y="225" width="60" height="10" rx="2" fill="white" opacity="0.6"/>
        
        <!-- Theme Name -->
        <text x="200" y="130" text-anchor="middle" fill="${themeColor}" font-family="Arial, sans-serif" font-size="18" font-weight="bold" opacity="0.8">${themeName}</text>
        <text x="200" y="150" text-anchor="middle" fill="${themeColor}" font-family="Arial, sans-serif" font-size="12" opacity="0.6">${category} Theme</text>
    </svg>`;
}

// Theme configurations
const themes = [
    { name: 'Corporate Pro', category: 'Business', folder: 'corporate-pro' },
    { name: 'Portfolio Creative', category: 'Portfolio', folder: 'portfolio-creative' },
    { name: 'Dashboard Admin', category: 'Dashboard', folder: 'dashboard-admin' },
    { name: 'Blog Minimal', category: 'Blog', folder: 'blog-minimal' },
    { name: 'E-commerce Shop', category: 'E-commerce', folder: 'ecommerce-shop' },
    { name: 'Landing Page', category: 'Marketing', folder: 'landing-page' }
];

// Generate SVG thumbnails
console.log('🎨 Generating theme thumbnails...');

themes.forEach(theme => {
    const svgContent = generateSVGThumbnail(theme.name, theme.category);
    const thumbnailPath = path.join(__dirname, 'themes', theme.folder, 'thumbnail.svg');
    
    try {
        fs.writeFileSync(thumbnailPath, svgContent);
        console.log(`✅ Generated thumbnail for ${theme.name}`);
    } catch (error) {
        console.error(`❌ Error generating thumbnail for ${theme.name}:`, error.message);
    }
});

// Generate a simple package.json for this project
const packageJson = {
    "name": "free-bootstrap-themes",
    "version": "1.0.0",
    "description": "Free Bootstrap 5.3 themes for download",
    "main": "index.html",
    "scripts": {
        "generate-thumbnails": "node generate-thumbnails.js",
        "serve": "python3 -m http.server 8000 || python -m SimpleHTTPServer 8000"
    },
    "keywords": ["bootstrap", "themes", "css", "free", "responsive"],
    "author": "Free Bootstrap Themes",
    "license": "MIT",
    "devDependencies": {
        "puppeteer": "^21.0.0"
    }
};

try {
    fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(packageJson, null, 2));
    console.log('📦 Generated package.json');
} catch (error) {
    console.error('❌ Error generating package.json:', error.message);
}

console.log('\n🚀 Thumbnail generation complete!');
console.log('💡 To serve the site locally, run: npm run serve');
console.log('🌐 Then visit: http://localhost:8000');

// Advanced thumbnail generation with Puppeteer (optional)
const advancedThumbnailGenerator = `
// Advanced Thumbnail Generator with Puppeteer
// Uncomment and run this if you have Puppeteer installed

/*
const puppeteer = require('puppeteer');

async function generateScreenshots() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1200, height: 800 });
    
    for (const theme of themes) {
        const previewPath = path.join(__dirname, 'themes', theme.folder, 'preview.html');
        const screenshotPath = path.join(__dirname, 'themes', theme.folder, 'screenshot.png');
        
        await page.goto('file://' + previewPath);
        await page.screenshot({ 
            path: screenshotPath,
            width: 1200,
            height: 800,
            type: 'png'
        });
        
        console.log(\`📸 Generated screenshot for \${theme.name}\`);
    }
    
    await browser.close();
    console.log('📸 All screenshots generated!');
}

// Uncomment to generate real screenshots:
// generateScreenshots().catch(console.error);
*/
`;

console.log('\n💡 Advanced screenshot generation available in the script comments');
console.log('   Install puppeteer and uncomment the code to generate real screenshots');