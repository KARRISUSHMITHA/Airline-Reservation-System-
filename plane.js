/* FRONTEND · plane.js — animated background plane */

/* background plane: follows the cursor / finger, drifts on its own when idle */
(()=>{const pl=document.querySelector('.plane'),tr=document.querySelector('#trail polyline'),rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
let W=innerWidth,H=innerHeight,mx=0,my=0,last=-1e9,x=W*.3,y=H*.35,dir=1,tilt=0,pts=[];
addEventListener('resize',()=>{W=innerWidth;H=innerHeight});
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;last=performance.now()});
function frame(t){const act=t-last<4000,tx=act?mx:W*(.5+.38*Math.sin(t/5000)),ty=act?my:H*(.32+.16*Math.sin(t/3100)),
 nx=x+(tx-x)*.055,ny=y+(ty-y)*.055,vx=nx-x,vy=ny-y;x=nx;y=ny;if(Math.abs(vx)>.4)dir=vx>0?1:-1;
 const want=Math.max(-28,Math.min(28,Math.atan2(vy,Math.max(Math.abs(vx),.5))*57.3));tilt+=(want-tilt)*.1;
 pl.style.transform=`translate(${x-80}px,${y-29}px) scale(${dir},1) rotate(${tilt}deg)`;
 pts.push([x-dir*72,y+2]);if(pts.length>45)pts.shift();tr.setAttribute('points',pts.map(p=>p[0].toFixed(0)+','+p[1].toFixed(0)).join(' '));
 requestAnimationFrame(frame)}
if(rm)pl.style.transform=`translate(${W*.62}px,${H*.28}px)`;else requestAnimationFrame(frame)})();
