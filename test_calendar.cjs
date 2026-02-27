const { chromium } = require('playwright');
require('dotenv').config();

(async () => {
	const browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();

	page.on('console', (msg) => {
		if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
	});

	// Login first to get the cookie/session
	console.log('Logging in...');
	await page.goto('http://localhost:5173/login');
	await page.fill('input[name="email"]', 'manuel.deporty@gmail.com');
	await page.fill('input[name="password"]', 'Password123!');
	await page.click('button[type="submit"]');

	await page.waitForTimeout(3000);

	console.log('Going to calendar...');
	const response = await page.goto('http://localhost:5173/calendariodeportivo');
	await page.waitForTimeout(2000);

	// Click add event
	await page.click('button:has-text("Añadir")');
	await page.waitForTimeout(1000);

	console.log('Filling form...');
	await page.fill('input[name="name"]', 'Test Event');
	await page.selectOption('select[name="sport_id"]', { index: 1 });
	await page.selectOption('select[id="event-country"]', { index: 1 });
	await page.waitForTimeout(500);
	await page.selectOption('select[id="event-department"]', { index: 1 });
	await page.waitForTimeout(500);
	await page.selectOption('select[name="city_id"]', { index: 1 });

	// flatpickr inputs (the visible ones are altInputs)
	// but we can try to evaluate and set the hidden input values
	await page.evaluate(() => {
		document.querySelector('input[name="reference_start"]').value = '2026-10-10';
		document.querySelector('input[name="reference_end"]').value = '2026-10-12';
	});

	console.log('Submitting...');

	// Add an interceptor to see what formData is sent
	page.on('request', (request) => {
		if (request.method() === 'POST' && request.url().includes('createEvent')) {
			console.log('POST Data:', request.postData());
		}
	});

	await page.click('button[type="submit"]:has-text("Guardar")');
	await page.waitForTimeout(2000);

	console.log('Check modal for error text...');
	const errorText = await page
		.locator('.text-red-400')
		.first()
		.textContent()
		.catch(() => null);
	console.log('Form error message:', errorText);

	await browser.close();
})();
