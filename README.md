# MomentLog

多人雲端版 MomentLog。

## 前端
1. 複製 `firebase-config.example.js` 為 `firebase-config.js`，填入 Firebase Web App config。
2. 複製相同設定到 `firebase-config-sw.js`。
3. 把 `index.html`、`firebase-config.js`、`firebase-config-sw.js`、`firebase-messaging-sw.js`、`manifest.webmanifest`、`icon.svg` 放在 GitHub Pages 根目錄。
4. Firebase Console 開啟 Authentication → Anonymous。
5. 建立 Realtime Database 與 Storage，套用 `database.rules.json` 與 `storage.rules`。
6. Cloud Messaging 啟用 Web Push，取得 VAPID Public Key，填進 `index.html` 的 `VAPID_PUBLIC_KEY`。

## Functions
在 `functions` 目錄執行 `npm install`，再用 Firebase CLI 部署 functions。排程功能需要適用的計費方案。

## 重要
Firebase Web App config 與 VAPID public key 都是前端可使用的設定；不要把服務帳號私鑰或其他後端 secret 放進 GitHub。
