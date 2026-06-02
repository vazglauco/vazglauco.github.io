import { chromium } from '@playwright/test'

const sites = [
  { url: 'https://usemila.app', file: 'mila.png' },
  { url: 'https://angeladasreis.com.br', file: 'angela-das-reis.png' },
]

const browser = await chromium.launch()

for (const { url, file } of sites) {
  console.log(`Capturing ${url}...`)
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  await page.screenshot({
    path: `public/projects/${file}`,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  })
  await page.close()
  console.log(`  → saved public/projects/${file}`)
}

await browser.close()
console.log('Done.')
