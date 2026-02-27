import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
    
    await page.goto('http://localhost:5173/register');
    await page.waitForTimeout(2000);

    const heading = await page.$eval('h2', el => el.textContent).catch(() => 'no h2');
    console.log('Heading text:', heading);

    await browser.close();
})();
