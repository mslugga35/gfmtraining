# GFMTF Website Playwright Tests

This directory contains comprehensive Playwright tests for the GFMTF website, focusing on testing all buttons, links, and user interactions.

## Test Coverage

### 🧭 Navigation Bar Tests
- ✅ All navigation links have correct hrefs
- ✅ Navigation links scroll to correct sections
- ✅ Book Session button navigates to booking page
- ✅ Mobile menu button visibility on mobile devices

### 🦸 Hero Section Tests
- ✅ Hero CTA buttons (Book Session, View Programs)
- ✅ Navigation functionality of hero buttons
- ✅ Promotional banner links (Daytime Program)

### 📚 Programs Section Tests
- ✅ All program cards have Book Session buttons
- ✅ Featured Daytime Program special buttons (Learn More, Book Now)
- ✅ Button navigation to correct destinations

### 🖼️ Gallery Section Tests
- ✅ Gallery images display correctly
- ✅ "Schedule Your First Session" CTA button
- ✅ Gallery CTA navigation to booking page

### 📝 Booking Section Tests
- ✅ All form fields are present and functional
- ✅ Form can be filled out completely
- ✅ Time slot selection works
- ✅ Phone and WhatsApp links have correct hrefs
- ✅ External links open in new tabs with proper attributes

### 🦶 Footer Tests
- ✅ Footer phone link
- ✅ Footer contact email link
- ✅ Footer Book Now button
- ✅ All footer links navigate correctly

### 🔗 External Links & Accessibility
- ✅ Phone links use correct `tel:` format
- ✅ WhatsApp links use correct `https://wa.me/` format
- ✅ Email links use correct `mailto:` format
- ✅ No broken internal links (404 checks)

### 📱 Responsive Design Tests
- ✅ Mobile viewport functionality
- ✅ Tablet viewport functionality
- ✅ Mobile menu vs desktop navigation visibility

### ⚡ Performance & Loading Tests
- ✅ No JavaScript errors on load
- ✅ All critical elements load properly
- ✅ Proper page title and meta tags

## Running the Tests

### Prerequisites
Make sure your development server is running:
```bash
npm run dev
```
The server should be available at `http://localhost:3000`

### Run All Tests
```bash
npm run test
```

### Run Tests with UI (Visual Test Runner)
```bash
npm run test:ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```

### Debug Tests
```bash
npm run test:debug
```

### Run Specific Test File
```bash
npx playwright test buttons-links.spec.ts
```

### Run Tests on Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Configuration

The tests are configured to run across multiple browsers and viewports:
- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: Chrome (Pixel 5), Safari (iPhone 12)

Key configuration settings:
- Base URL: `http://localhost:3000`
- Screenshots: Taken on failure
- Video: Recorded on failure
- Traces: Collected on retry

## Test Data

The tests verify these key elements:

### Navigation Links
- `#programs` - Programs section
- `#gallery` - Gallery section
- `#booking` - Booking/Contact section
- `/booking` - Booking page

### Contact Information
- Phone: `tel:407-519-0984`
- WhatsApp: `https://wa.me/14075190984`
- Email: `mailto:Larrygrayson@gfmtf.com`

### Form Fields
- Name (required)
- Phone (required)
- Email (optional)
- Service selection (required)
- Preferred date
- Preferred time (button selection)
- Message (textarea)

## Troubleshooting

### Server Not Running
If you get connection errors, make sure:
1. Development server is running: `npm run dev`
2. Server is accessible at `http://localhost:3000`
3. No other process is using port 3000

### Test Failures
- Check the HTML report: `npx playwright show-report`
- Review screenshots and videos in `test-results/`
- Use debug mode to step through tests: `npm run test:debug`

### Browser Issues
- Install browsers if missing: `npx playwright install`
- Update browsers: `npx playwright install --with-deps`

## Adding New Tests

When adding new tests:
1. Follow the existing test structure
2. Use descriptive test names
3. Group related tests in describe blocks
4. Add proper assertions with meaningful error messages
5. Test both positive and negative scenarios

## CI/CD Integration

These tests are ready for CI/CD pipelines. The configuration automatically:
- Starts the dev server before tests
- Retries failed tests (in CI)
- Generates HTML reports
- Captures screenshots and videos on failure