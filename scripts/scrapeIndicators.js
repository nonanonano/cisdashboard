const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function scrape() {
  const usdJpyUrl = 'https://finance.yahoo.com/quote/JPY=X';
  const us10yUrl = 'https://finance.yahoo.com/quote/%5ETNX';

  const resUsdJpy = await fetch(usdJpyUrl);
  const htmlUsdJpy = await resUsdJpy.text();
  const $usdJpy = cheerio.load(htmlUsdJpy);
  const usdJpyVal = $usdJpy('fin-streamer[data-field="regularMarketPrice"]').first().text().trim();

  const resUs10y = await fetch(us10yUrl);
  const htmlUs10y = await resUs10y.text();
  const $us10y = cheerio.load(htmlUs10y);
  const us10yVal = $us10y('fin-streamer[data-field="regularMarketPrice"]').first().text().trim();

  const data = {
    usdjpy: usdJpyVal,
    us10y: us10yVal
  };

  const outPath = path.join(__dirname, '..', 'public', 'data', 'indicators.json');
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
}

scrape().catch(err => {
  console.error('Failed to scrape indicators:', err);
  process.exit(1);
});
