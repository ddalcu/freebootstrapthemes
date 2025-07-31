#!/usr/bin/env node
/**
 * Thumbnail Generator Script - PNG Screenshots with Puppeteer
 * Generates actual screenshots from HTML preview pages
 * Usage: node generate-thumbnails.js
 * 
 * Requirements: npm install puppeteer sharp
 */

const fs = require('fs');
const path = require('path');

// Theme configurations
const themes = [
    { name: 'Corporate Pro', folder: 'corporate-pro' },
    { name: 'Portfolio Creative', folder: 'portfolio-creative' },
    { name: 'Dashboard Admin', folder: 'dashboard-admin' },
    { name: 'Blog Minimal', folder: 'blog-minimal' },
    { name: 'E-commerce Shop', folder: 'ecommerce-shop' },
    { name: 'Landing Page', folder: 'landing-page' }
];

// Generate PNG screenshots using Puppeteer
async function generateScreenshots() {
    console.log('🎨 Generating PNG screenshots...\n');
    
    try {
        const puppeteer = require('puppeteer');
        
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
        
        for (const theme of themes) {
            console.log(`📸 Processing ${theme.name}...`);
            
            const previewPath = path.join(__dirname, 'themes', theme.folder, 'preview.html');
            const screenshotPath = path.join(__dirname, 'themes', theme.folder, 'preview.png');
            const thumbnailPath = path.join(__dirname, 'themes', theme.folder, 'thumbnail.png');
            
            if (!fs.existsSync(previewPath)) {
                console.log(`⚠️  Preview file not found: ${previewPath}`);
                continue;
            }
            
            try {
                await page.goto(`file://${previewPath}`, { 
                    waitUntil: 'networkidle2',
                    timeout: 30000 
                });
                
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Full page screenshot
                await page.screenshot({
                    path: screenshotPath,
                    type: 'png',
                    fullPage: true
                });
                
                // Viewport thumbnail screenshot
                const thumbnailBuffer = await page.screenshot({
                    type: 'png',
                    clip: { x: 0, y: 0, width: 1920, height: 1080 }
                });
                
                // Resize thumbnail using Sharp
                try {
                    const sharp = require('sharp');
                    await sharp(thumbnailBuffer)
                        .resize(800, 450, { fit: 'cover', position: 'top' })
                        .png()
                        .toFile(thumbnailPath);
                } catch (sharpError) {
                    console.log(`⚠️  Sharp not available, using original size for ${theme.name}`);
                    fs.writeFileSync(thumbnailPath, thumbnailBuffer);
                }
                
                console.log(`✅ Generated screenshots for ${theme.name}`);
                
            } catch (error) {
                console.error(`❌ Error processing ${theme.name}:`, error.message);
            }
        }
        
        await browser.close();
        console.log('\n🎉 All screenshots generated successfully!');
        
    } catch (error) {
        console.error('❌ Error:', error.message, error);
        console.log('💡 Make sure to install dependencies: npm install puppeteer sharp');
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    generateScreenshots();
}

module.exports = { generateScreenshots };