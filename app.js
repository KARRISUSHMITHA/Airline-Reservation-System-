/* FRONTEND · app.js — UI: rendering, navigation, forms, event handlers. Uses the backend layer. */
const $=s=>document.querySelector(s);
const gc=s=>{const v=$(s).value.trim().toUpperCase(),m=v.match(/\(([A-Z]{3})\)/)||v.match(/^([A-Z]{3})$/);if(m&&AP[m[1]])return m[1];const h=APL.find(a=>a.city.toUpperCase()===v);return h?h.code:null},sc=(s,c)=>{$(s).value=AP[c].city+' ('+c+')'};

document.body.insertAdjacentHTML('beforeend','<datalist id="aps">'+APL.map(a=>`<option value="${a.city} (${a.code})">${a.name}, ${a.country}</option>`).join('')+'</datalist>');

let FT=FARES[0],RS,cab='eco';

const LOGO={'6E':['#2b3f94','<g fill="#fff"><circle cx="12" cy="32" r="2.5"/><circle cx="18" cy="26" r="2.5"/><circle cx="24" cy="20" r="2.5"/><circle cx="30" cy="14" r="2.5"/><path d="M25 11h8v8z"/></g>'],
 AI:['#c8102e','<path d="M9 31Q13 8 35 12Q23 14 19 31Z" fill="#f6c56f"/>'],
 SG:['#d71f26','<circle cx="22" cy="22" r="11" fill="none" stroke="#ffd43b" stroke-width="4.5"/><circle cx="22" cy="22" r="3" fill="#fff"/>'],
 QP:['#ff6a13','<path d="M22 9L35 35H28.5L22 21.5L15.5 35H9Z" fill="#fff"/>'],
 EK:['#d71921','<text x="22" y="27" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" font-family="sans-serif">EK</text><rect x="10" y="31" width="24" height="2.5" fill="#f6c56f"/>'],
 QR:['#5c0632','<text x="22" y="27" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" font-family="sans-serif">QR</text><rect x="10" y="31" width="24" height="2.5" fill="#cbd5e1"/>']};
const logo=a=>`<svg class="lg" viewBox="0 0 44 44" aria-hidden="true"><rect width="44" height="44" rx="10" fill="${LOGO[a.code][0]}"/>${LOGO[a.code][1]}</svg>`;
const go=id=>{document.querySelectorAll('main>section').forEach(s=>s.classList.toggle('hide',s.id!==id));scrollTo({top:0,behavior:'smooth'})};
const toast=t=>{let e=$('#toast');if(!e){document.body.insertAdjacentHTML('beforeend','<div id="toast"></div>');e=$('#toast')}e.textContent=t;e.classList.add('on');clearTimeout(e.t);e.t=setTimeout(()=>e.classList.remove('on'),2200)};
const seatSVG=l=>{const w=[26,28,32,36][l],x=(64-w)/2;return`<svg class="sv" viewBox="0 0 64 64" aria-hidden="true"><rect x="${x}" y="8" width="${w}" height="34" rx="9" fill="#3b82f6"/><rect x="${x+4}" y="3" width="${w-8}" height="10" rx="5" fill="#93c5fd"/><rect x="${x-5}" y="28" width="7" height="20" rx="3" fill="#2563eb"/><rect x="${x+w-2}" y="28" width="7" height="20" rx="3" fill="#2563eb"/><rect x="${x-2}" y="40" width="${w+4}" height="12" rx="5" fill="#60a5fa"/>${l>1?`<rect x="${x+2}" y="52" width="${w-4}" height="5" rx="2.5" fill="#bfdbfe"/>`:''}<rect x="${x+4}" y="56" width="5" height="5" rx="2" fill="#475569"/><rect x="${x+w-9}" y="56" width="5" height="5" rx="2" fill="#475569"/></svg>`};
function setFT(id){FT=FARES.find(x=>x.id===id);if($('#ft'))renderFT()}
function renderFT(){$('#ft').innerHTML=FARES.map(x=>`<button type="button" class="fpill${x===FT?' on':''}" onclick="setFT('${x.id}')">${x.icon} ${x.label}${x.off?` <i>−${Math.round(x.off*100)}%</i>`:''}</button>`).join('');$('#ftn').textContent=FT.note}

let cur,seat,L;
/* ===== navigation ===== */
document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#nav button').forEach(x=>x.classList.toggle('on',x===b));
 document.querySelectorAll('main>section').forEach(s=>s.classList.toggle('hide',s.id!==b.dataset.v));
 if(b.dataset.v==='tickets')tickets();if(b.dataset.v==='admin')admin();if(b.dataset.v==='account')accountView()});
/* ===== hero: route map with animated plane + destination weather ===== */
sc('#f','DEL');sc('#t','BOM');renderFT();
$('#d').valueAsDate=new Date(Date.now()+864e5*3);$('#d').min=new Date().toISOString().slice(0,10);
const P=c=>[AP[c].lon+180,90-AP[c].lat],LAND=['15,24 40,20 85,18 100,28 118,32 125,42 110,48 104,55 99,65 83,72 92,75 100,82 75,68 62,58 55,42 45,32 15,30','100,82 120,80 145,96 140,112 122,128 112,144 106,135 109,108 99,95','170,54 171,47 180,40 190,32 205,20 260,14 320,18 360,24 340,35 320,50 302,60 302,68 288,80 283,89 278,74 272,68 260,82 252,70 238,65 230,60 215,60 208,52 192,52 175,54','163,69 174,54 190,53 212,59 223,78 231,78 220,95 220,105 213,117 200,125 192,108 189,87 172,85 163,76','294,112 310,102 322,101 333,116 326,129 310,122 295,124'];
function drawMap(f,t){const two=f&&t&&f!==t;let x=0,y=0,w=360,h=180,k=1;
 if(two){const[a,b]=P(f),[c,d]=P(t);w=Math.min(360,Math.max(Math.abs(a-c)*2.2,Math.abs(b-d)*3.5,110));h=Math.min(180,w*.62);x=Math.max(0,Math.min(360-w,(a+c)/2-w/2));y=Math.max(0,Math.min(180-h,(b+d)/2-h/2));k=w/360}
 let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="var(--bg)"/>`+LAND.map(p=>`<polygon points="${p}" fill="var(--land)" stroke="var(--dot)" stroke-width="${.5*k}"/>`).join('');
 s+=APL.map(q=>{const[px,py]=P(q.code),on=q.code===f||q.code===t;return`<circle cx="${px}" cy="${py}" r="${(on?3.6:1.3)*k}" fill="${on?'var(--p)':'var(--dot)'}"/>`+(on?`<text x="${px+5*k}" y="${py-4*k}" font-size="${11*k}" font-weight="700" fill="var(--t)">${q.code}</text>`:'')}).join('');
 if(two){const[a,b]=P(f),[c,d]=P(t),m=`M${a},${b} Q${(a+c)/2},${(b+d)/2-Math.hypot(a-c,b-d)*.25} ${c},${d}`;
  s+=`<path d="${m}" fill="none" stroke="var(--a)" stroke-width="${2*k}" stroke-dasharray="${5*k} ${5*k}"/><g><path transform="scale(${k*1.3})" d="M10 0L-7-7-3 0-7 7Z" fill="var(--a)"/><animateMotion dur="5s" repeatCount="indefinite" rotate="auto" path="${m}"/></g>`}
 $('#map').setAttribute('viewBox',`${x} ${y} ${w} ${h}`);$('#map').innerHTML=s}
function hero(){const f=gc('#f'),t=gc('#t'),w=f&&t&&f!==t?wx(t,$('#d').value):null;
 $('#fc').textContent=f||'---';$('#tc').textContent=t||'---';
 $('#names').textContent=f&&t?AP[f].city+', '+AP[f].country+' to '+AP[t].city+', '+AP[t].country+(f!==t?' · '+km(f,t).toLocaleString('en-IN')+' km':''):'Select both airports';
 $('#wx').innerHTML=w?`<span>${w.ic}</span><div><b>${w.t}°C ${w.tx}</b><div class="m">Forecast for ${AP[t].city} on ${$('#d').value} (simulated)</div></div>`:'<span>🌍</span><div class="m">Choose two different airports.</div>';drawMap(f,t)}
['#f','#t'].forEach(s=>{const e=$(s);e.onfocus=()=>{e.dataset.p=e.value;e.value=''};e.oninput=()=>{if(gc(s))hero()};e.onblur=()=>{const c=gc(s);if(c)sc(s,c);else e.value=e.dataset.p||'';hero()}});$('#d').onchange=hero;
$('#sw').onclick=()=>{const a=gc('#f'),b=gc('#t');if(a&&b){sc('#f',b);sc('#t',a);hero()}};hero();
/* ===== search -> loading page -> flights page ===== */
$('#go').onclick=()=>{if($('#ld').classList.contains('on'))return;const f=gc('#f'),t=gc('#t'),e=$('#serr');
 if(!f||!t||f===t||!$('#d').value){e.innerHTML='<span class="bad">Choose two different airports and a date.</span>';return}e.innerHTML='';
 L=flights(f,t,$('#d').value);RS={f,t,d:$('#d').value,sort:'p'};
 $('#ldt').textContent=AP[f].city+' → '+AP[t].city+' · '+$('#d').value+(FT.off?' · '+FT.label+' fare':'');
 $('#ldp').innerHTML=document.querySelector('svg.plane').innerHTML;$('#ld').classList.add('on');
 setTimeout(()=>{renderRes();$('#ld').classList.remove('on');go('flights')},2200)};
function fcard(x,i,tg){const a=x.a,p=FT.apply(x.price),perk=a.meal(250)===0?'Free meals | Priority boarding':a.meal(250)<250?'50% off meals | Free seat selection':'Get 10% off using FLY10 | Student, senior and armed forces fares';
 return`<div class="card fc"><span class="ot">${x.ot}% on time</span><details class="fdt"><summary><div class="fm"><div class="f1">${logo(a)}<div><b class="an">${a.name}</b><div class="m">${x.fid.slice(0,5)} · ${a.constructor.name}</div>${tg}</div></div>
 <div class="tt"><b>${tm(x.dep)}</b><div class="m">${x.f}</div></div><div class="dd"><div class="m">${hm(x.dur)}</div><hr><div class="m">${x.stops?'1 stop • '+x.via:'Non stop'}</div></div><div class="tt"><b>${tm(x.dep+(x.dur/60|0))}</b><div class="m">${x.t}</div></div>
 <div class="pr"><div class="pv">${FT.off?`<s>${inr(x.price)}</s> `:''}${inr(p)}</div><div class="m">/adult</div><button type="button" class="vp" onclick="event.preventDefault();event.stopPropagation();pick(${i})">VIEW PRICES</button>${FT.off?`<div class="sf">${FT.icon} ${FT.label} −${Math.round(FT.off*100)}%</div>`:''}</div></div>
 <div class="fo">${perk}</div><div class="fb"><div class="am">🍴 🎬 🔌 ☕ <span>+1 Amenities</span> <span class="mf">More flight details ⌄</span></div><div class="lk" onclick="event.preventDefault();event.stopPropagation();toast('Price locked for 24 hours (simulated)')">🔒 Lock this price @ <b>${inr(Math.round(p*.04))}</b> →</div></div></summary>
 <div class="fx"><span class="chip">🧳 ${a.bag}</span><span class="chip">${a.petText()}</span><span class="chip">🍽️ ${a.meal(250)?'Meals from '+inr(a.meal(150)):'Meals free'}</span><span class="chip">${x.stops?'1 stop via '+x.via:'Direct flight'}</span></div></details></div>`}
function renderRes(){const{f,t,d,sort}=RS,K={p:(a,b)=>a.price-b.price,d:(a,b)=>a.dur-b.dur,e:(a,b)=>a.dep-b.dep};
 const cheap=[...L].sort(K.p)[0],fast=[...L].sort(K.d)[0],val=[...L].sort((a,b)=>(a.price+a.dur*8)-(b.price+b.dur*8))[0];L.sort(K[sort]);
 $('#res').innerHTML=`<div class="card rh"><div><div class="big">${AP[f].city} → ${AP[t].city}</div><div class="m">${f} → ${t} · ${d} · 1 Adult · ${FT.icon} ${FT.label} fare · ${L.length} flights found</div></div>
 <div class="sc"><span class="m">Sort by</span>${[['p','Cheapest'],['d','Fastest'],['e','Earliest']].map(([k,n])=>`<button class="${k===sort?'on':''}" onclick="RS.sort='${k}';renderRes()">${n}</button>`).join('')}<button class="mod" onclick="go('search')">✎ Modify search</button></div></div>`+
 L.map((x,i)=>fcard(x,i,`${x===cheap?'<span class="tag">Cheapest</span>':''}${x===fast?'<span class="tag">Fastest</span>':''}${x===val?'<span class="tag">Best value</span>':''}`)).join('')}
/* ===== booking page: cabin class, seat, passenger, meals, pet, payment ===== */
function pick(i){cur=L[i];seat=null;cab='eco';const a=cur.a;$('#book').classList.remove('hide');
 $('#book').innerHTML=`<button class="back" onclick="go('flights')">← Back to flights</button><h3>${a.name} · ${cur.f} ✈ ${cur.t} · ${cur.d}</h3><div class="bk"><div>
 <b>1. Choose cabin class</b><div class="cabs" id="cabs"></div>
 <b>2. Pick a seat</b><div id="seatmap"></div>
 <b>3. Passenger details</b> <span class="m">${USER?'Booking as '+USER.name+' (saved to your account)':'Guest checkout. <a href="#" onclick="nav(\'account\');return false">Log in</a> to save this booking to your account'}</span><div class="row"><div><label>Full name<input id="pn" value="${USER?USER.name:''}"></label></div><div><label>Age<input id="pa" type="number" min="1" max="110" value="${USER&&USER.age?USER.age:''}"></label></div><div><label>Email<input id="pe" type="email" value="${USER?USER.email:''}"></label></div></div>
 ${FT.off?`<div class="idn">${FT.icon} <b>${FT.label} fare applied (−${Math.round(FT.off*100)}%).</b> ${FT.note}<label><input type="checkbox" id="idc" style="width:auto"> I will carry a valid ID proof at check-in</label></div>`:''}<br>
 <b>4. Order food</b> <span class="m">${a.meal(250)?'Pre-order price':'Complimentary for '+a.name+' passengers'}</span>
 <div class="meals">${MENU.map((m,i)=>`<div class="meal"><span>${m[0]}</span><div>${m[1]}</div><div class="m">${a.meal(m[2])?inr(a.meal(m[2])):'Free'}</div><input id="m${i}" type="number" min="0" max="3" value="0" aria-label="${m[1]} quantity" oninput="sum()"></div>`).join('')}</div>
 <b>5. Pets</b><div class="m">${a.petText()}</div>${a.pet[0]!=='no'?`<label><input type="checkbox" id="pet" style="width:auto" onchange="sum()"> I am travelling with a pet (fee ${inr(a.pet[1])})</label>`:''}<br>
 <b>6. Payment</b><div class="row"><div><label>Method<select id="pm"><option>Card</option><option>UPI</option><option>Net banking</option>${COUNTER?'<option>Cash at counter</option>':''}</select></label></div><div><label>Promo code<input id="pc" placeholder="FLY10 / STUDENT15" oninput="sum()"></label></div></div>
 <p id="msg" class="m"></p></div><div class="sum" id="sum"></div></div>`;renderCabs();renderSeats();sum();go('bookpg')}
function renderCabs(){$('#cabs').innerHTML=Object.entries(CAB).map(([k,c])=>`<div class="cab${k===cab?' on':''}" role="radio" aria-checked="${k===cab}" tabindex="0" onclick="setCab('${k}')" onkeydown="if(event.key==='Enter')setCab('${k}')"><span class="rd"></span><div class="cb"><b>${c.n}</b><div class="pk">${c.pk.map(x=>`<span>${x}</span>`).join('')}</div><div class="m">${k==='eco'?'Base fare':'+'+Math.round((c.m-1)*100)+'% over Economy'} · ${inr(Math.round(cur.price*c.m))}</div></div>${seatSVG(c.lv)}</div>`).join('')}
function renderSeats(){const c=CAB[cab],tk=db.taken(cur.fid);let h=`<div class="m" style="text-align:center">✈ Front of aircraft · ${c.n}</div><div class="sm">`;
 for(let r=c.rows[0];r<=c.rows[1];r++)h+=`<div class="sr"><span class="rn">${r}</span>`+[...c.lay].map(ch=>{if(ch===' ')return'<span class="ai"></span>';const s=r+ch,x=tk.includes(s)||hash(cur.fid+s)%6===0;return`<button class="s${x?' x':''}${seat===s?' sel':''}" ${x?'disabled':''} onclick="setSeat('${s}',this)">${s}</button>`}).join('')+'</div>';
 $('#seatmap').innerHTML=h+'</div><div class="lgd"><span><i class="s"></i>Available</span><span><i class="s sel"></i>Selected</span><span><i class="s x"></i>Booked</span></div>'}
function setCab(k){cab=k;seat=null;renderCabs();renderSeats();sum()}
function setSeat(s,b){seat=s;document.querySelectorAll('.sm .s').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sum()}
function calc(){const a=cur.a,base=Math.round(cur.price*CAB[cab].m),sf=base-FT.apply(base),meals=MENU.reduce((s,m,i)=>s+a.meal(m[2])*(+$('#m'+i).value||0),0),pet=$('#pet')?.checked?a.pet[1]:0,disc=Math.round((base-sf)*(PROMO[$('#pc').value.trim().toUpperCase()]||0)),tax=Math.round((base-sf-disc+meals+pet)*.05);
 return{fare:base,sf,meals,pet,disc,tax,total:base-sf-disc+meals+pet+tax}}
function sum(){const c=calc();$('#sum').innerHTML=`<b>✈ Flight summary</b><div class="m" style="color:#b9c6e4">${cur.f} to ${cur.t} · ${CAB[cab].n} · Seat ${seat||'not chosen'}</div><br>
 <div><span>Fare (${CAB[cab].n})</span><span>${inr(c.fare)}</span></div>${FT.off?`<div><span>${FT.label} fare</span><span>-${inr(c.sf)}</span></div>`:''}<div><span>Meals</span><span>${inr(c.meals)}</span></div><div><span>Pet fee</span><span>${inr(c.pet)}</span></div><div><span>Promo</span><span>-${inr(c.disc)}</span></div><div><span>Tax 5%</span><span>${inr(c.tax)}</span></div>
 <div class="t"><span>Total</span><span>${inr(c.total)}</span></div><br><button class="b" style="width:100%;background:var(--a);color:#2b1b00" onclick="pay()">Pay now</button>`}
function pay(){const n=$('#pn').value.trim(),ag=+$('#pa').value,e=$('#pe').value.trim(),m=$('#msg'),code=$('#pc').value.trim().toUpperCase();
 if(!seat)return m.innerHTML='<span class="bad">Select a seat first.</span>';
 if(n.length<2||!(ag>0)||!/^\S+@\S+\.\S+$/.test(e))return m.innerHTML='<span class="bad">Enter a valid name, age and email.</span>';
 if(!FT.eligible(ag))return m.innerHTML=`<span class="bad">Age ${ag} is not eligible for the ${FT.label} fare. ${FT.note}</span>`;
 if(FT.off&&!$('#idc').checked)return m.innerHTML='<span class="bad">Please confirm you will carry a valid ID proof.</span>';
 if(code&&!PROMO[code])return m.innerHTML='<span class="bad">Promo code not valid.</span>';
 const c=calc();m.textContent='Processing payment of '+inr(c.total)+'…';
 setTimeout(()=>{if(Math.random()<.1){m.innerHTML='<span class="bad">Payment failed (simulated). Please try again.</span>';return}
  const pnr=Array.from({length:6},()=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.random()*32|0]).join(''),
  food=MENU.map((x,i)=>[x[1],+$('#m'+i).value]).filter(x=>x[1]).map(x=>x[1]+'× '+x[0]).join(', ');
  db.add({pnr,fid:cur.fid,air:cur.a.name,code:cur.a.code,f:cur.f,t:cur.t,d:cur.d,dep:cur.dep,dur:cur.dur,seat,cab:CAB[cab].n,ft:FT.label,name:n,age:ag,email:e,total:c.total,mealAmt:c.meals,food,pet:!!$('#pet')?.checked,pay:$('#pm').value,st:'Confirmed',at:Date.now(),on:new Date().toISOString().slice(0,10),by:COUNTER&&ADMIN?ADMIN.name+' ('+ADMIN.id+')':'Online',uid:(COUNTER||!USER)?'':USER.id});
  $('#book').innerHTML='<div class="ok"><b>Payment successful. Your booking is confirmed.</b></div>'+ticket(db.find(pnr))+`<button class="b np" onclick="print()">Print ticket</button> <button class="b np" onclick="go('search')">Book another flight</button>`;scrollTo({top:0,behavior:'smooth'})},900)}
/* ===== digital ticket ===== */
function ticket(b){const w=wx(b.t,b.d);return`<div class="tk"><div><div class="m">${b.air} · ${b.fid.slice(0,5)} · ${b.d}</div>
 <div class="big">${b.f} ✈ ${b.t}</div><div>Departs ${tm(b.dep)} · ${hm(b.dur)}</div><p><b>${b.name}</b> (${b.age})<br><span class="m">${b.email}</span></p>
 <span class="tag">Seat ${b.seat}</span>${b.cab?`<span class="tag">${b.cab}</span>`:''}${b.ft&&b.ft!=='Regular'?`<span class="tag">${b.ft} fare</span>`:''}<span class="tag">${b.st}</span><span class="m">Paid ${inr(b.total)} via ${b.pay}</span>
 <div class="m">🍽️ ${b.food||'No meal pre-ordered'} · ${b.pet?'🐾 Travelling with pet':'No pet'} · ${w.ic} ${w.t}°C at destination</div>${b.by&&b.by!=='Online'?`<div class="m">Issued at counter by ${b.by}</div>`:''}</div>
 <div class="stub"><div class="m" style="color:#b9c6e4">PNR</div><div class="big">${b.pnr}</div><div class="bar"></div></div></div>`}
/* ===== my bookings + cancellation/refund ===== */
function tickets(){const A=db.all().filter(x=>(x.uid||'')===(USER?USER.id:'')).reverse();$('#tickets').innerHTML=A.length?A.map(b=>`<div class="card">${ticket(b)}${b.st==='Confirmed'?`<button class="b g np" onclick="cancelB('${b.pnr}')">Cancel ticket</button>`:`<span class="bad">Cancelled · Refunded ${inr(b.refund)}</span>`}</div>`).join(''):'<div class="card m">No bookings yet'+(USER?'':' (guest). <a href="#" onclick="nav(\'account\');return false">Log in</a> to see bookings saved to your account')+'. Search for a flight to get started.</div>'}
function cancelB(p){const b=db.find(p),air=AIR.find(a=>a.code===b.code),r=air.refund(b.total,hrsLeft(b));
 if(confirm(`Cancel ${p}? ${air.name} refund policy gives you ${inr(r)} of ${inr(b.total)}.`)){db.cancel(p,r);tickets()}}
/* ===== flight status ===== */
$('#chk').onclick=()=>{const b=db.find($('#pnr').value.trim()||'-');$('#stOut').innerHTML=b?(()=>{const h=hash(b.pnr)%10,s=h<6?'<b class="ok">On time</b>':h<9?'<b style="color:#b45309">Delayed by 25 min</b>':'<b class="ok">Boarding</b>';return`${b.air} ${b.fid.slice(0,5)} ${b.f} to ${b.t} on ${b.d}: ${s}`})():'No booking found for that PNR.'};
/* ===== admin + analytics ===== */
function admin(){if(!ADMIN)return loginView();const A=db.all(),ok=A.filter(x=>x.st==='Confirmed'),rev=ok.reduce((s,x)=>s+x.total,0),ml=ok.reduce((s,x)=>s+(x.mealAmt||0),0),ref=A.reduce((s,x)=>s+(x.refund||0),0),by={};ok.forEach(x=>by[x.air]=(by[x.air]||0)+x.total);const mx=Math.max(1,...Object.values(by));
 $('#admin').innerHTML=profileHTML()+`<div class="card row"><div><div class="m">Bookings</div><div class="big">${ok.length}</div></div><div><div class="m">Revenue</div><div class="big">${inr(rev)}</div></div><div><div class="m">Meal sales</div><div class="big">${inr(ml)}</div></div><div><div class="m">Cancelled</div><div class="big">${A.length-ok.length}</div></div><div><div class="m">Refunded</div><div class="big">${inr(ref)}</div></div></div>
 <div class="card"><b>Revenue by airline</b>${AIR.map(a=>`<div class="row c" style="margin-top:6px"><span style="width:110px;flex:none">${a.name}</span><div class="ob" style="width:${(by[a.name]||0)/mx*60}%;flex:none"></div><span class="m">${inr(by[a.name]||0)}</span></div>`).join('')}</div>
 <div class="card" style="overflow:auto"><b>All bookings</b><table><tr><th>PNR</th><th>Passenger</th><th>Flight</th><th>Seat</th><th>Meals</th><th>Pet</th><th>Paid</th><th>Status</th><th>Booked by</th></tr>${A.map(x=>`<tr><td>${x.pnr}</td><td>${x.name}</td><td>${x.air} ${x.f}-${x.t}</td><td>${x.seat}</td><td>${x.food||'-'}</td><td>${x.pet?'Yes':'No'}</td><td>${inr(x.total)}</td><td>${x.st}</td><td>${x.by||'Online'}</td></tr>`).join('')||'<tr><td colspan="9" class="m">No bookings yet.</td></tr>'}</table></div>`;dayView()}


let ADMIN=null,COUNTER=false;
const today=()=>new Date().toISOString().slice(0,10);
/* ===== staff login + ticket counter mode ===== */
function loginView(){$('#admin').innerHTML=`<div class="card" style="max-width:420px;margin:20px auto"><div class="big">Staff login</div><div class="m">AeroBook admin and ticket counter staff</div><br><label>Admin ID<input id="lid" placeholder="ADM-001"></label><br><label>Password<input id="lpw" type="password"></label><p id="lm" class="bad"></p><button class="b" style="width:100%" onclick="doLogin()">Log in</button><p class="m">Demo: ADM-001 / admin123 (Operations Manager) or ADM-002 / counter123 (Ticket Counter Executive)</p></div>`}
function doLogin(){const a=ADMINS.find(x=>x.id===$('#lid').value.trim().toUpperCase());if(a&&a.check($('#lpw').value)){ADMIN=a;a.login();admin()}else $('#lm').textContent='Wrong admin ID or password.'}
function logout(){ADMIN=null;COUNTER=false;cb();admin()}
function cb(){$('#cb').innerHTML=COUNTER&&ADMIN?`<div class="card" style="background:var(--a);color:#2b1b00"><b>Counter booking mode</b> · ${ADMIN.role}: ${ADMIN.name} (${ADMIN.id}) <button class="b g" style="margin-left:10px" onclick="COUNTER=false;cb()">Exit counter mode</button></div>`:''}
function startCounter(){COUNTER=true;cb();nav('search')}
function profileHTML(){const me=db.all().filter(x=>x.on===today()&&(x.by||'').includes(ADMIN.id)).length;
 return`<div class="card prof"><div class="av">${ADMIN.name[0]}</div><div style="flex:1"><div class="big">${ADMIN.name}</div><div class="m">${ADMIN.role} · ID ${ADMIN.id}</div><div class="m">✉ ${ADMIN.email} · ☎ ${ADMIN.phone}</div><div class="m">Logged in at ${ADMIN.last} · Tickets issued by you today: <b>${me}</b></div></div>
 <div class="row"><button class="b" onclick="startCounter()">Book a ticket (counter)</button><button class="b" onclick="editAdmin()">Edit name</button><button class="b g" onclick="logout()">Log out</button></div></div>
 <div class="card"><div class="row c"><b style="flex:none">✈ Tickets booked on</b><div style="flex:none"><input type="date" id="ad" value="${today()}" onchange="dayView()"></div></div><div id="dv"></div></div>`}
function editAdmin(){const n=prompt('Admin name',ADMIN.name);if(n){ADMIN.name=n;admin()}}
function dayView(){const day=$('#ad').value,A=db.all().filter(x=>x.on===day);
 $('#dv').innerHTML=`<p class="m">${A.length} ticket(s) booked on ${day} · ${inr(A.filter(x=>x.st==='Confirmed').reduce((s,x)=>s+x.total,0))} revenue (${A.filter(x=>x.by&&x.by!=='Online').length} at the counter, ${A.filter(x=>!x.by||x.by==='Online').length} online). Grouped by flight:</p><div class="grid3">${AIR.map(a=>{const r=A.filter(x=>x.air===a.name);return`<div class="mini"><b>${a.name}</b><div class="big">${r.length}</div>${r.map(x=>`<div class="m">${x.pnr} · ${x.name} · seat ${x.seat}${x.by&&x.by!=='Online'?' · counter':''}${x.st==='Cancelled'?' (cancelled)':''}</div>`).join('')||'<div class="m">No bookings</div>'}</div>`}).join('')}</div>`}
/* ===== home page ===== */
const nav=v=>document.querySelector(`#nav button[data-v=${v}]`).click();
function route(f,t){sc('#f',f);sc('#t',t);hero();nav('search');$('#go').click()}
function home(){const dt=new Date(Date.now()+864e5*3).toISOString().slice(0,10),R=[['DEL','BOM'],['BLR','HYD'],['HYD','DEL'],['DEL','CCU'],['HYD','DXB'],['DEL','LHR'],['BOM','SIN'],['BLR','JFK']],
 F=[['💺','Choose your seat','Pick a window or aisle seat on a live seat map.'],['🍽️','Pre-order meals','Add food to your booking at airline-specific prices.'],['🐾','Travel with pets','See each airline pet policy before you pay.'],['⛅','Destination weather','Check the forecast before you fly.'],['🏷️','Promo codes','Apply FLY10 or STUDENT15 for instant savings.'],['↩️','Easy cancellation','See your refund amount before you confirm.']];
 $('#home').innerHTML=(USER?`<div class="card"><b>Welcome back, ${USER.name}</b> <span class="m">Your details and bookings are saved to your account.</span> <button class="b" style="margin-left:8px" onclick="nav('tickets')">My bookings</button></div>`:'')+`<div class="land"><span class="fp" style="top:18px">✈</span><span class="fp" style="top:64px;animation-delay:-5s;font-size:11px">✈</span><span class="fp" style="top:110px;animation-delay:-2s;font-size:13px">✈</span>
 <div style="color:#b9c6e4">Your journey starts here</div><h1>Fly smarter, across India and the world</h1><p>Compare six airlines across 80 airports, pick your seat, order your meal and travel with your pet, all in one booking.</p>
 <button class="b" style="background:var(--a);color:#2b1b00" onclick="nav('search')">Book a flight ✈</button> <button class="b" onclick="nav('status')">Check flight status</button> ${USER?'':`<button class="b" onclick="nav('account')">Login / Sign up</button>`}
 <div class="stats"><div><b>${AIR.length}</b>partner airlines</div><div><b>${APL.length}</b>airports worldwide</div><div><b>${db.all().length}</b>bookings made</div></div></div>
 <h3>Special fares</h3><div class="grid3">${FARES.slice(1).map(x=>`<div class="card rt" style="margin:0" onclick="setFT('${x.id}');nav('search')"><div style="font-size:28px">${x.icon}</div><b>${x.label} fare · ${Math.round(x.off*100)}% off</b><div class="m">${x.note}</div></div>`).join('')}</div>
 <h3>Popular routes</h3><div class="grid3">${R.map(([f,t])=>`<div class="card rt" style="margin:0" onclick="route('${f}','${t}')"><b>${AP[f].city} ✈ ${AP[t].city}</b><div class="m">${f} to ${t}</div><div class="m">from <b>${inr(Math.min(...flights(f,t,dt).map(x=>x.price)))}</b></div></div>`).join('')}</div>
 <h3>Our partner airlines</h3><div class="grid3">${AIR.map(a=>`<div class="card" style="margin:0"><b>${a.name}</b><div class="m">${a.constructor.name} · ${a.code}</div><span class="chip">🧳 ${a.bag}</span><span class="chip">${a.petText()}</span></div>`).join('')}</div>
 <h3>Why book with AeroBook</h3><div class="grid3">${F.map(x=>`<div class="card" style="margin:0"><div style="font-size:28px">${x[0]}</div><b>${x[1]}</b><div class="m">${x[2]}</div></div>`).join('')}</div>
 <footer>AeroBook · College OOP project · admin@aerobook.com · All flights, weather and payments are simulated.</footer>`}

let USER=null,ATAB='login';
function updateNav(){$('#acc').textContent=USER?'👤 '+USER.name.split(' ')[0]:'Login'}
function setUser(u){USER=u;if(!u)ATAB='login';try{u?localStorage.setItem('aerobook-session',u.id):localStorage.removeItem('aerobook-session')}catch{}updateNav();home();accountView()}
function accountView(){const A=$('#account');
 if(USER){const mine=db.all().filter(x=>x.uid===USER.id),ok=mine.filter(x=>x.st==='Confirmed'),spent=ok.reduce((s,x)=>s+x.total,0),next=ok.filter(x=>hrsLeft(x)>0).sort((a,b)=>hrsLeft(a)-hrsLeft(b))[0];
  A.innerHTML=`<div class="card prof"><div class="av">${USER.name[0].toUpperCase()}</div><div style="flex:1"><div class="big">Hi, ${USER.name}</div><div class="m">✉ ${USER.email} · ☎ ${USER.phone}</div><div class="m">Member since ${USER.since}</div></div>
  <div class="row"><button class="b" onclick="nav('search')">Book a flight</button><button class="b" onclick="nav('tickets')">My bookings</button><button class="b g" onclick="setUser(null)">Log out</button></div></div>
  <div class="grid3"><div class="mini"><div class="m">Trips booked</div><div class="big">${ok.length}</div></div><div class="mini"><div class="m">Total spent</div><div class="big">${inr(spent)}</div></div><div class="mini"><div class="m">Aero points</div><div class="big">${Math.floor(spent/100)}</div></div><div class="mini"><div class="m">Cancelled</div><div class="big">${mine.length-ok.length}</div></div></div>
  <div class="card"><b>Next trip</b><div class="m">${next?`${next.air} · ${next.f} to ${next.t} · ${next.d} at ${tm(next.dep)} · seat ${next.seat} · PNR ${next.pnr}`:'No upcoming trips. Search for a flight to plan one.'}</div></div>
  <div class="card"><b>Edit profile</b><div class="row" style="margin-top:8px"><div><label>Name<input id="en" value="${USER.name}"></label></div><div><label>Phone<input id="ep" value="${USER.phone}"></label></div><div><label>Age<input id="ea" type="number" value="${USER.age||''}"></label></div></div><p id="em" class="m"></p><button class="b" onclick="saveProfile()">Save changes</button></div>`;return}
 const L=ATAB==='login';
 A.innerHTML=`<div class="card" style="max-width:440px;margin:16px auto"><div class="tabs"><button class="${L?'on':''}" onclick="ATAB='login';accountView()">Login</button><button class="${L?'':'on'}" onclick="ATAB='signup';accountView()">Sign up</button></div>
 ${L?`<div class="big">Welcome back</div><div class="m">Log in to see your bookings and book faster.</div><br><label>Email<input id="le" type="email"></label><br><label>Password<input id="lp" type="password"></label><p id="am" class="bad"></p><button class="b" style="width:100%" onclick="userLogin()">Login</button>`
 :`<div class="big">Create your account</div><div class="m">Your details are saved for faster checkout.</div><br><label>Full name<input id="sn"></label><br><div class="row"><div><label>Email<input id="se" type="email"></label></div><div><label>Mobile number<input id="sp" inputmode="numeric"></label></div></div><br><div class="row"><div><label>Age<input id="sa" type="number" min="1" max="110"></label></div><div><label>Password (min 6)<input id="spw" type="password"></label></div><div><label>Confirm password<input id="sc" type="password"></label></div></div><p id="am" class="bad"></p><button class="b" style="width:100%" onclick="userSignup()">Create account</button>`}
 <p class="m" style="text-align:center;margin-top:14px">Airline staff? <a href="#" onclick="nav('admin');return false">Staff / admin login</a></p></div>`}
function userLogin(){const u=users.login($('#le').value.trim(),$('#lp').value);if(u)setUser(u);else $('#am').textContent='Wrong email or password.'}
function userSignup(){const n=$('#sn').value.trim(),e=$('#se').value.trim(),p=$('#sp').value.trim(),a=+$('#sa').value,w=$('#spw').value,m=$('#am');
 if(n.length<2)return m.textContent='Enter your full name.';if(!/^\S+@\S+\.\S+$/.test(e))return m.textContent='Enter a valid email.';if(!/^\d{10}$/.test(p))return m.textContent='Mobile number must be 10 digits.';
 if(w.length<6)return m.textContent='Password must be at least 6 characters.';if(w!==$('#sc').value)return m.textContent='Passwords do not match.';
 const err=users.register(n,e,p,a>0?a:'',w);if(err)return m.textContent=err;setUser(users.login(e,w))}
function saveProfile(){const n=$('#en').value.trim(),p=$('#ep').value.trim(),a=+$('#ea').value;
 if(n.length<2||!/^\d{10}$/.test(p))return $('#em').innerHTML='<span class="bad">Enter a valid name and 10-digit mobile number.</span>';
 USER=users.update(USER.id,{name:n,phone:p,age:a>0?a:''});updateNav();home();accountView();$('#em').innerHTML='<span class="ok">Profile saved.</span>'}
try{const id=localStorage.getItem('aerobook-session');if(id)USER=users.get(id)}catch{}
updateNav();
home();
