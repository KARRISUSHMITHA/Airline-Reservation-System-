/* BACKEND · services.js — business logic: flight generation, simulated weather, time/duration, refund hours */
const wx=(c,d)=>{const h=hash(c+d),s=SKY[h%5];return{ic:s[0],tx:s[1],t:Math.round(33-Math.abs(AP[c].lat)*.45)-2+h%6}};
const tm=h=>pad(h%24)+':00',hm=m=>Math.floor(m/60)+'h '+pad(m%60)+'m',hrsLeft=b=>(new Date(b.d+'T'+pad(b.dep)+':00')-new Date())/36e5;
const flights=(f,t,d)=>AIR.map((a,i)=>{const h=hash(a.code+f+t),k=km(f,t);
 return{fid:a.code+(100+h%800)+f+t+d,a,f,t,d,dep:(6+i*3+h%3)%24,dur:Math.round(55+k/13+h%30)+(h%5===0&&k>2000?150:0),stops:h%5===0&&k>2000?1:0,via:['DXB','DOH','BOM','DEL','BLR'].filter(v=>v!==f&&v!==t)[h%3],ot:82+h%17,price:a.fare(Math.round(2200+k*3.4+h%600))}});
