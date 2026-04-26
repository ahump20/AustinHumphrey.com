// Generate Austin_Humphrey_Resume.pdf from the canonical HTML source.
// Uses Chromium (via @playwright/test) for high-fidelity rendering with
// background colors, web fonts, and print stylesheet applied.
//
// Usage: node scripts/generate-resume-pdf.js

import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { existsSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, '../public/Austin_Humphrey_Resume.html');
const pdfPath = resolve(__dirname, '../public/Austin_Humphrey_Resume.pdf');

if (!existsSync(htmlPath)) {
  console.error(`HTML source not found at ${htmlPath}`);
  process.exit(1);
}

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

// Allow Google Fonts to fully load.
await page.evaluate(() => document.fonts && document.fonts.ready);

await page.emulateMedia({ media: 'print' });

await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: '6mm', right: '6mm', bottom: '6mm', left: '6mm' },
});

await browser.close();

console.log(`PDF written: ${pdfPath}`);
