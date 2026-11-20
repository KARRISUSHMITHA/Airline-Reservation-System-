/* BACKEND · store.js — data layer (Store = bookings, UserStore = passenger accounts). Persists in localStorage. */
// ENCAPSULATION: bookings are private; only methods can read or change them
class Store{
  #k='aerobook-v2';#b;
  constructor(){try{this.#b=JSON.parse(localStorage.getItem(this.#k))||[]}catch{this.#b=[]}}
  #save(){try{localStorage.setItem(this.#k,JSON.stringify(this.#b))}catch{}}
  all(){return this.#b.map(x=>({...x}))}
  add(b){this.#b.push(b);this.#save()}
  taken(fid){return this.#b.filter(x=>x.fid===fid&&x.st==='Confirmed').map(x=>x.seat)}
  find(p){return this.#b.find(x=>x.pnr===p.toUpperCase())}
  cancel(p,r){const x=this.find(p);if(x){x.st='Cancelled';x.refund=r;this.#save()}}
}
const db=new Store();

/* ===== passenger accounts: login / sign up (ENCAPSULATION: private user list + private password hashing) ===== */
class UserStore{
  #k='aerobook-users';#u;
  constructor(){try{this.#u=JSON.parse(localStorage.getItem(this.#k))||[]}catch{this.#u=[]}}
  #save(){try{localStorage.setItem(this.#k,JSON.stringify(this.#u))}catch{}}
  #h(p){return String(hash('aero'+p))}
  #pub(u){const{ph,...p}=u;return p}
  register(name,email,phone,age,pw){email=email.toLowerCase();
    if(this.#u.some(x=>x.email===email))return 'This email is already registered. Please log in.';
    this.#u.push({id:'U'+Date.now().toString(36),name,email,phone,age,ph:this.#h(pw),since:new Date().toLocaleDateString()});this.#save();return null}
  login(email,pw){const u=this.#u.find(x=>x.email===email.toLowerCase()&&x.ph===this.#h(pw));return u?this.#pub(u):null}
  get(id){const u=this.#u.find(x=>x.id===id);return u?this.#pub(u):null}
  update(id,patch){const u=this.#u.find(x=>x.id===id);if(!u)return null;Object.assign(u,patch);this.#save();return this.#pub(u)}
}
const users=new UserStore();
