// 範例：複製成 firebase-config.js 後，填入你自己的 Firebase Web App 設定。
// Firebase Web config 本身不是服務帳號私鑰；真正的後端權限仍由 Rules 控制。

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const MOMENTLOG_FIREBASE_CONFIG = firebaseConfig;
export default firebaseConfig;
