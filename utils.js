/* BACKEND · utils.js — pure helpers (no DOM) */
const hash=s=>[...s].reduce((x,c)=>(x*31+c.charCodeAt(0))>>>0,7),pad=n=>String(n).padStart(2,'0'),inr=n=>'₹'+n.toLocaleString('en-IN');
