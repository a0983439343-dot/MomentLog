// 把這裡替換成 Firebase Console → 專案設定 → 你的 Web App 所提供的 firebaseConfig。
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

self.MOMENTLOG_FIREBASE_CONFIG = firebaseConfig;
export default firebaseConfig;
