importScripts("https://www.gstatic.com/firebasejs/12.17.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.17.0/firebase-messaging-compat.js");
importScripts("./firebase-config-sw.js");
firebase.initializeApp(self.MOMENTLOG_FIREBASE_CONFIG);
const messaging=firebase.messaging();
messaging.onBackgroundMessage(payload=>{
  const title=payload.data?.title||"MomentLog";
  const body=payload.data?.body||"該記錄了！";
  self.registration.showNotification(title,{body,icon:"./icon.svg",badge:"./icon.svg",data:payload.data||{}});
});
