"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = require("puppeteer");
(async () => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto('https://developers.google.com/web/');
    await page.type('.devsite-search-field', 'Headless Chrome');
    const allResultsSelector = '.devsite-suggest-all-results';
    await page.waitForSelector(allResultsSelector);
    await page.click(allResultsSelector);
    const resultsSelector = '.gsc-results .gs-title';
    await page.waitForSelector(resultsSelector);
    const links = await page.evaluate(resultsSelector => {
        return [...document.querySelectorAll(resultsSelector)].map(anchor => {
            const title = anchor.textContent.split('|')[0].trim();
            return `${title} - ${anchor}`;
        });
    }, resultsSelector);
    console.log(links.join('\n'));
    await browser.close();
})();
//# sourceMappingURL=Index.js.map