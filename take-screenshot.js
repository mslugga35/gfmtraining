const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to capture full desktop view
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  console.log('Navigating to http://localhost:3005...');
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  
  // Wait for animations to settle
  await page.waitForTimeout(3000);
  
  // Take full page screenshot
  console.log('Taking screenshot...');
  await page.screenshot({ 
    path: 'website-screenshot.png', 
    fullPage: true 
  });
  
  // Take hero section screenshot
  await page.screenshot({ 
    path: 'hero-screenshot.png', 
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });
  
  console.log('Screenshots saved!');
  console.log('- website-screenshot.png (full page)');
  console.log('- hero-screenshot.png (hero section)');
  
  await browser.close();
})();