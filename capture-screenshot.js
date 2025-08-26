const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to standard desktop size
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navigate to the site
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  
  // Wait a bit for animations to complete
  await page.waitForTimeout(2000);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'current-homepage.png',
    fullPage: true 
  });
  
  console.log('Screenshot saved as current-homepage.png');
  
  // Also take a viewport-only screenshot
  await page.screenshot({ 
    path: 'current-homepage-viewport.png',
    fullPage: false 
  });
  
  console.log('Viewport screenshot saved as current-homepage-viewport.png');
  
  await browser.close();
})();