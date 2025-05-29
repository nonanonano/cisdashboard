# cis流リアルタイム株式ダッシュボード

このリポジトリは `index.html` をブラウザで開くだけで動作する簡易株価ダッシュボードです。

## マクロ指標のスクレイピング

Alpha Vantage API を使用せず、米ドル/円レートと米10年債利回りはウェブサイトをスクレイプして取得します。`scripts/scrapeIndicators.js` を実行すると `public/data/indicators.json` に以下の形式で保存されます。

```json
{ "usdjpy": "157.32", "us10y": "4.45" }
```

### 依存パッケージのインストール

```
npm install node-fetch cheerio
```

### 手動で実行

```
node scripts/scrapeIndicators.js
```

### 1日1回の実行例 (cron)

```
0 6 * * * /usr/bin/node /path/to/repo/scripts/scrapeIndicators.js
```

## 動作方法

`index.html` をブラウザで開くとダッシュボードが表示されます。ページ内では `public/data/indicators.json` を読み込み、ドル円と米10年債利回りを表示します。
