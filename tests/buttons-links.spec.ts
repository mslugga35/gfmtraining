import { test, expect } from '@playwright/test';

test.describe('GFMTF Website - Buttons and Links Tests', () => {
  const BASE_URL = 'http://localhost:3000';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    // Wait for page to be fully loaded
    await page.waitForLoadState('domcontentloaded');
    // Wait for React components to be loaded
    await page.waitForSelector('nav', { timeout: 10000 });
  });

  test.describe('Navigation Bar Tests', () => {
    test('should have all navigation links with correct hrefs', async ({ page }) => {
      // Programs link
      const programsLink = page.locator('nav a[href="#programs"]');
      await expect(programsLink).toBeVisible();
      await expect(programsLink).toHaveText('Programs');

      // Gallery link
      const galleryLink = page.locator('nav a[href="#gallery"]');
      await expect(galleryLink).toBeVisible();
      await expect(galleryLink).toHaveText('Gallery');

      // Contact link
      const contactLink = page.locator('nav a[href="#booking"]');
      await expect(contactLink).toBeVisible();
      await expect(contactLink).toHaveText('Contact');

      // Book Session button
      const bookSessionBtn = page.locator('nav a[href="/booking"]');
      await expect(bookSessionBtn).toBeVisible();
      await expect(bookSessionBtn).toHaveText('Book Session');
    });

    test('should navigate to correct sections when navigation links are clicked', async ({ page }) => {
      // Test Programs section navigation
      await page.click('nav a[href="#programs"]');
      await expect(page.locator('#programs')).toBeInViewport();

      // Test Gallery section navigation
      await page.click('nav a[href="#gallery"]');
      await expect(page.locator('#gallery')).toBeInViewport();

      // Test Contact/Booking section navigation
      await page.click('nav a[href="#booking"]');
      await expect(page.locator('#booking')).toBeInViewport();
    });

    test('should navigate to booking page when Book Session button is clicked', async ({ page }) => {
      await page.click('nav a[href="/booking"]');
      await expect(page).toHaveURL(`${BASE_URL}/booking`);
    });

    test('should have mobile menu button visible on mobile', async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      
      const mobileMenuButton = page.locator('nav button.md\\:hidden');
      await expect(mobileMenuButton).toBeVisible();
      
      // Check if the mobile menu has the hamburger icon
      const hamburgerIcon = mobileMenuButton.locator('svg');
      await expect(hamburgerIcon).toBeVisible();
    });
  });

  test.describe('Hero Section Tests', () => {
    test('should have hero section buttons with correct hrefs', async ({ page }) => {
      // Book Session button in hero
      const heroBookBtn = page.locator('section a[href="/booking"]').first();
      await expect(heroBookBtn).toBeVisible();
      await expect(heroBookBtn).toContainText('BOOK SESSION');

      // View Programs button in hero
      const viewProgramsBtn = page.locator('section a[href="#programs"]');
      await expect(viewProgramsBtn).toBeVisible();
      await expect(viewProgramsBtn).toContainText('VIEW PROGRAMS');
    });

    test('should navigate correctly when hero buttons are clicked', async ({ page }) => {
      // Test View Programs button
      await page.click('section a[href="#programs"]');
      await expect(page.locator('#programs')).toBeInViewport();

      // Go back to top and test Book Session button
      await page.goto(BASE_URL);
      await page.click('section a[href="/booking"]');
      await expect(page).toHaveURL(`${BASE_URL}/booking`);
    });

    test('should have promotional banner with correct links', async ({ page }) => {
      // Check for the daytime program banner
      const banner = page.locator('section.bg-\\[\\#DC2626\\]');
      await expect(banner).toBeVisible();
      
      // Check the Learn More link in banner
      const learnMoreLink = banner.locator('a[href="#daytime-program"]');
      await expect(learnMoreLink).toBeVisible();
      await expect(learnMoreLink).toContainText('Learn More');
    });
  });

  test.describe('Programs Section Tests', () => {
    test('should have program cards with Book Session buttons', async ({ page }) => {
      // Wait for programs section to be visible
      await page.locator('#programs').scrollIntoViewIfNeeded();
      
      // Get all "Book Session" buttons in programs section (excluding featured program)
      const bookSessionButtons = page.locator('#programs a[href="/booking"]:has-text("Book Session")');
      const buttonCount = await bookSessionButtons.count();
      
      // Should have multiple Book Session buttons for regular programs
      expect(buttonCount).toBeGreaterThan(0);
      
      // Test that all buttons are visible and have correct text
      for (let i = 0; i < buttonCount; i++) {
        const button = bookSessionButtons.nth(i);
        await expect(button).toBeVisible();
        await expect(button).toHaveText('Book Session');
      }
    });

    test('should have featured Daytime Program with special buttons', async ({ page }) => {
      // Scroll to programs section
      await page.locator('#programs').scrollIntoViewIfNeeded();
      
      // Find the featured program card (should have "NEW" badge)
      const featuredCard = page.locator('#programs .ring-2.ring-\\[\\#DC2626\\]\\/20');
      await expect(featuredCard).toBeVisible();
      
      // Check for "Learn More" button
      const learnMoreBtn = featuredCard.locator('a[href="#booking"]:has-text("Learn More")');
      await expect(learnMoreBtn).toBeVisible();
      
      // Check for "Book Now" button
      const bookNowBtn = featuredCard.locator('a[href="/booking"]:has-text("Book Now")');
      await expect(bookNowBtn).toBeVisible();
    });

    test('should navigate correctly when program buttons are clicked', async ({ page }) => {
      // Scroll to programs section
      await page.locator('#programs').scrollIntoViewIfNeeded();
      
      // Test regular Book Session button
      const firstBookBtn = page.locator('#programs a[href="/booking"]:has-text("Book Session")').first();
      await firstBookBtn.click();
      await expect(page).toHaveURL(`${BASE_URL}/booking`);
      
      // Go back and test featured program buttons
      await page.goto(BASE_URL);
      await page.locator('#programs').scrollIntoViewIfNeeded();
      
      // Test Learn More button (should go to booking section)
      const learnMoreBtn = page.locator('#programs a[href="#booking"]:has-text("Learn More")');
      if (await learnMoreBtn.count() > 0) {
        await learnMoreBtn.click();
        await expect(page.locator('#booking')).toBeInViewport();
      }
      
      // Test Book Now button
      const bookNowBtn = page.locator('#programs a[href="/booking"]:has-text("Book Now")');
      if (await bookNowBtn.count() > 0) {
        await bookNowBtn.click();
        await expect(page).toHaveURL(`${BASE_URL}/booking`);
      }
    });
  });

  test.describe('Gallery Section Tests', () => {
    test('should have gallery section with images', async ({ page }) => {
      // Scroll to gallery section
      await page.locator('#gallery').scrollIntoViewIfNeeded();
      
      // Check if gallery section is visible
      await expect(page.locator('#gallery')).toBeVisible();
      
      // Check for gallery images
      const galleryImages = page.locator('#gallery img');
      const imageCount = await galleryImages.count();
      expect(imageCount).toBeGreaterThan(0);
    });

    test('should have "Schedule Your First Session" button', async ({ page }) => {
      // Scroll to gallery section
      await page.locator('#gallery').scrollIntoViewIfNeeded();
      
      // Find the CTA button in gallery
      const scheduleBtn = page.locator('#gallery a[href="/booking"]:has-text("Schedule Your First Session")');
      await expect(scheduleBtn).toBeVisible();
    });

    test('should navigate to booking when gallery CTA is clicked', async ({ page }) => {
      // Scroll to gallery section
      await page.locator('#gallery').scrollIntoViewIfNeeded();
      
      // Click the Schedule button
      const scheduleBtn = page.locator('#gallery a[href="/booking"]:has-text("Schedule Your First Session")');
      await scheduleBtn.click();
      await expect(page).toHaveURL(`${BASE_URL}/booking`);
    });
  });

  test.describe('Booking Section Tests', () => {
    test('should have booking form with all required fields', async ({ page }) => {
      // Scroll to booking section
      await page.locator('#booking').scrollIntoViewIfNeeded();
      
      // Check form fields
      await expect(page.locator('#booking input[name="name"]')).toBeVisible();
      await expect(page.locator('#booking input[name="phone"]')).toBeVisible();
      await expect(page.locator('#booking input[name="email"]')).toBeVisible();
      await expect(page.locator('#booking select[name="service"]')).toBeVisible();
      await expect(page.locator('#booking input[name="preferredDate"]')).toBeVisible();
      await expect(page.locator('#booking textarea[name="message"]')).toBeVisible();
      
      // Check submit button
      await expect(page.locator('#booking button[type="submit"]')).toBeVisible();
      await expect(page.locator('#booking button[type="submit"]')).toContainText('Schedule Your First Session');
    });

    test('should have correct phone and WhatsApp links', async ({ page }) => {
      // Scroll to booking section
      await page.locator('#booking').scrollIntoViewIfNeeded();
      
      // Check phone link
      const phoneLink = page.locator('#booking a[href="tel:407-519-0984"]');
      await expect(phoneLink).toBeVisible();
      await expect(phoneLink).toContainText('(407) 519-0984');
      
      // Check WhatsApp link
      const whatsAppLink = page.locator('#booking a[href="https://wa.me/14075190984"]');
      await expect(whatsAppLink).toBeVisible();
      await expect(whatsAppLink).toContainText('WhatsApp');
      
      // Verify WhatsApp link opens in new tab
      await expect(whatsAppLink).toHaveAttribute('target', '_blank');
      await expect(whatsAppLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('should be able to fill and submit booking form', async ({ page }) => {
      // Scroll to booking section
      await page.locator('#booking').scrollIntoViewIfNeeded();
      
      // Fill out the form
      await page.fill('input[name="name"]', 'John Doe');
      await page.fill('input[name="phone"]', '(407) 555-0123');
      await page.fill('input[name="email"]', 'john.doe@example.com');
      await page.selectOption('select[name="service"]', 'Hitting Mechanics - $75');
      
      // Set date (tomorrow)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateString = tomorrow.toISOString().split('T')[0];
      await page.fill('input[name="preferredDate"]', dateString);
      
      // Select a time slot
      await page.click('button:has-text("10:00 AM")');
      
      // Fill message
      await page.fill('textarea[name="message"]', 'Looking forward to improving my hitting mechanics.');
      
      // Verify form data is filled
      await expect(page.locator('input[name="name"]')).toHaveValue('John Doe');
      await expect(page.locator('input[name="phone"]')).toHaveValue('(407) 555-0123');
      await expect(page.locator('input[name="email"]')).toHaveValue('john.doe@example.com');
      
      // Note: We don't actually submit to avoid triggering real form submission
      // But we verify the submit button is clickable
      await expect(page.locator('button[type="submit"]')).toBeEnabled();
    });

    test('should have time slot selection functionality', async ({ page }) => {
      // Scroll to booking section
      await page.locator('#booking').scrollIntoViewIfNeeded();
      
      // Test time slot selection
      const timeSlot = page.locator('button:has-text("2:00 PM")');
      await expect(timeSlot).toBeVisible();
      
      // Click time slot and verify it gets selected
      await timeSlot.click();
      await expect(timeSlot).toHaveClass(/bg-\[#DC2626\]/);
    });
  });

  test.describe('Footer Tests', () => {
    test('should have footer with correct links', async ({ page }) => {
      // Scroll to footer
      await page.locator('footer').scrollIntoViewIfNeeded();
      
      // Check phone link in footer
      const footerPhoneLink = page.locator('footer a[href="tel:407-519-0984"]');
      await expect(footerPhoneLink).toBeVisible();
      await expect(footerPhoneLink).toContainText('(407) 519-0984');
      
      // Check contact email link
      const emailLink = page.locator('footer a[href="mailto:Larrygrayson@gfmtf.com"]');
      await expect(emailLink).toBeVisible();
      await expect(emailLink).toContainText('Contact');
      
      // Check Book Now link in footer
      const footerBookNow = page.locator('footer a[href="/booking"]');
      await expect(footerBookNow).toBeVisible();
      await expect(footerBookNow).toContainText('Book Now');
    });

    test('should navigate correctly when footer links are clicked', async ({ page }) => {
      // Scroll to footer
      await page.locator('footer').scrollIntoViewIfNeeded();
      
      // Test Book Now link
      const footerBookNow = page.locator('footer a[href="/booking"]');
      await footerBookNow.click();
      await expect(page).toHaveURL(`${BASE_URL}/booking`);
    });
  });

  test.describe('External Links and Accessibility', () => {
    test('should have correct href attributes for external links', async ({ page }) => {
      // Check WhatsApp link has correct format
      const whatsAppLink = page.locator('a[href="https://wa.me/14075190984"]');
      await expect(whatsAppLink).toHaveAttribute('href', 'https://wa.me/14075190984');
      
      // Check phone links have correct format
      const phoneLinks = page.locator('a[href="tel:407-519-0984"]');
      const phoneCount = await phoneLinks.count();
      expect(phoneCount).toBeGreaterThan(0);
      
      for (let i = 0; i < phoneCount; i++) {
        await expect(phoneLinks.nth(i)).toHaveAttribute('href', 'tel:407-519-0984');
      }
    });

    test('should have proper email link format', async ({ page }) => {
      const emailLink = page.locator('a[href="mailto:Larrygrayson@gfmtf.com"]');
      await expect(emailLink).toHaveAttribute('href', 'mailto:Larrygrayson@gfmtf.com');
    });

    test('should not have any broken internal links', async ({ page }) => {
      // Get all internal links
      const internalLinks = page.locator('a[href^="/"], a[href^="#"]');
      const linkCount = await internalLinks.count();
      
      for (let i = 0; i < linkCount; i++) {
        const link = internalLinks.nth(i);
        const href = await link.getAttribute('href');
        
        if (href && href.startsWith('/')) {
          // Test navigation to internal pages
          await link.click();
          
          // Verify page loads without 404
          await page.waitForLoadState('networkidle');
          const title = await page.title();
          expect(title).not.toContain('404');
          expect(title).not.toContain('Not Found');
          
          // Go back to main page for next test
          await page.goto(BASE_URL);
          await page.waitForLoadState('networkidle');
        }
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should work properly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check that mobile menu button is visible
      const mobileMenuBtn = page.locator('nav button.md\\:hidden');
      await expect(mobileMenuBtn).toBeVisible();
      
      // Check that desktop navigation is hidden
      const desktopNav = page.locator('nav .hidden.md\\:flex');
      await expect(desktopNav).not.toBeVisible();
      
      // Test that sections are still accessible by scrolling
      await expect(page.locator('#programs')).toBeVisible();
      await expect(page.locator('#gallery')).toBeVisible();
      await expect(page.locator('#booking')).toBeVisible();
    });

    test('should work properly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // On tablet, desktop nav should be visible
      const desktopNav = page.locator('nav .hidden.md\\:flex');
      await expect(desktopNav).toBeVisible();
      
      // Mobile menu should be hidden
      const mobileMenuBtn = page.locator('nav button.md\\:hidden');
      await expect(mobileMenuBtn).not.toBeVisible();
    });
  });

  test.describe('Performance and Loading', () => {
    test('should load all critical elements without errors', async ({ page }) => {
      // Check for JavaScript errors
      const errors: string[] = [];
      page.on('pageerror', (error) => {
        errors.push(error.message);
      });
      
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      
      // Verify no JavaScript errors
      expect(errors).toHaveLength(0);
      
      // Check that all major sections are present
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('section')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });

    test('should have proper page title and meta information', async ({ page }) => {
      await expect(page).toHaveTitle(/GFM/i);
      
      // Check for viewport meta tag (indicates mobile optimization)
      const viewportMeta = page.locator('meta[name="viewport"]');
      await expect(viewportMeta).toHaveAttribute('content', /width=device-width/);
    });
  });
});