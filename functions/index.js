const {onSchedule}=require("firebase-functions/v2/scheduler");
const admin=require("firebase-admin");
admin.initializeApp();
const db=admin.database();
const messaging=admin.messaging();
const tz="Asia/Taipei";
const pad=n=>String(n).padStart(2,"0");
function parts(d){return new Intl.DateTimeFormat("en-CA",{timeZone:tz,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}).formatToParts(d).reduce((o,p)=>(o[p.type]=p.value,o),{})}
exports.momentReminders=onSchedule({schedule:"every 1 minutes",timeZone:tz,region:"asia-east1"},async()=>{
  const now=new Date();const p=parts(now);const minute=Number(p.minute);const hour=Number(p.hour);if(minute!==50&&minute!==0)return;
  const baseDate=new Date(now.getTime());if(minute===50)baseDate.setTime(now.getTime()+10*60*1000);
  const t=parts(baseDate);const targetDate=`${t.year}-${t.month}-${t.day}`;const targetHour=Number(t.hour);
  const roomsSnap=await db.ref("rooms").once("value");const rooms=roomsSnap.val()||{};const jobs=[];
  for(const [roomId,room] of Object.entries(rooms)){
    const members=room.members||{};const recSnap=await db.ref(`rooms/${roomId}/records/${targetDate}/${pad(targetHour)}`).once("value");const records=recSnap.val()||{};
    for(const [uid] of Object.entries(members)){
      const setting=(room.notificationSettings||{})[uid];if(setting?.enabled!==true)continue;if(records[uid])continue;
      const tokenSnap=await db.ref(`fcmTokens/${uid}`).once("value");const tokenData=tokenSnap.val()||{};const tokens=Object.entries(tokenData).map(([key,v])=>({key,...v})).filter(v=>v.token);
      const kind=minute===50?"10m":"hour";const deliveryKey=`${targetDate}_${pad(targetHour)}_${kind}_${uid}`;const tx=await db.ref(`reminderDeliveries/${roomId}/${deliveryKey}`).transaction(v=>v||{claimedAt:Date.now()});if(!tx.committed||tx.snapshot.val()?.claimedAt===undefined)continue;
      if(!tokens.length)continue;
      const title=minute===50?"⏰ 10 分鐘後要記錄":"🔔 現在要記錄";const body=minute===50?`${pad(targetHour)}:00 要記錄了！`:`${pad(targetHour)}:00 到了，記錄一下吧！`;
      jobs.push((async()=>{const r=await messaging.sendEachForMulticast({tokens:tokens.map(x=>x.token),data:{title,body,roomId,date:targetDate,hour:String(targetHour),kind}});for(let i=0;i<r.responses.length;i++){const rr=r.responses[i];if(!rr.success&&rr.error&&(rr.error.code.includes("registration-token-not-registered")||rr.error.code.includes("invalid-registration-token")))await db.ref(`fcmTokens/${uid}/${tokens[i].key}`).remove();}})());
    }
  }
  await Promise.all(jobs);
});
