/* BACKEND · models.js — OOP classes: Airline (abstract) → LowCost / FullService / Premium, FareCategory, AdminUser */
/* ===== OOP model (mirrors the C++ project) ===== */
// ABSTRACTION: Airline says WHAT each airline must do, not HOW
class Airline{
  constructor(name,code,mult,bag,pet){if(new.target===Airline)throw Error('Airline is abstract');
    Object.assign(this,{name,code,mult,bag,pet})}
  fare(base){throw Error('implement fare()')}
  refund(paid,hrs){throw Error('implement refund()')}
  meal(price){throw Error('implement meal()')}
  petText(){return{cabin:'🐾 Pets in cabin (up to 7 kg)',cargo:'🐾 Pets in cargo hold only',no:'🚫 Pets not allowed'}[this.pet[0]]}
}
// INHERITANCE + POLYMORPHISM: subclasses override fare(), refund(), meal()
class LowCost extends Airline{fare(b){return Math.round(b*this.mult)}refund(p,h){return Math.round(p*(h>24?.7:.4))}meal(p){return p}}
class FullService extends Airline{fare(b){return Math.round(b*this.mult+500)}refund(p,h){return Math.round(p*(h>24?.9:.6))}meal(p){return Math.round(p*.5)}}
class Premium extends FullService{fare(b){return super.fare(b)+1500}refund(p,h){return Math.round(p*(h>24?.95:.75))}meal(){return 0}}
const AIR=[new LowCost('IndiGo','6E',1,'15 kg',['cargo',2500]),new LowCost('SpiceJet','SG',.95,'15 kg',['no',0]),new LowCost('Akasa Air','QP',.9,'15 kg',['cabin',1500]),
 new FullService('Air India','AI',1.15,'25 kg',['cabin',2000]),new Premium('Emirates','EK',1.4,'30 kg',['cargo',4000]),new Premium('Qatar Airways','QR',1.35,'30 kg',['cargo',4500])];

/* ===== SPECIAL FARES (OOP: base class + subclasses override eligible()) ===== */
class FareCategory{constructor(id,label,icon,off,note){Object.assign(this,{id,label,icon,off,note})}
 eligible(age){return true}
 apply(p){return Math.round(p*(1-this.off))}}
class Regular extends FareCategory{constructor(){super('reg','Regular','🧳',0,'Standard fare, no ID needed.')}}
class StudentFare extends FareCategory{constructor(){super('stu','Student','🎓',.10,'10% off for ages 12 to 35. Valid student ID required.')}eligible(a){return a>=12&&a<=35}}
class SeniorFare extends FareCategory{constructor(){super('sen','Senior citizen','👴',.12,'12% off for age 60 and above. Age proof required.')}eligible(a){return a>=60}}
class ArmedFare extends FareCategory{constructor(){super('arm','Armed forces','🎖️',.15,'15% off for serving and retired personnel. Service ID required.')}}
const FARES=[new Regular,new StudentFare,new SeniorFare,new ArmedFare];
/* ===== admin profile (ENCAPSULATION: private name, controlled by getter/setter) ===== */
class AdminUser{
  #name;#pw;#last='';
  constructor(id,n,pw,role,email,phone){this.#name=n;this.#pw=pw;Object.assign(this,{id,role,email,phone})}
  get name(){return this.#name}
  set name(v){if(v&&v.trim().length>1)this.#name=v.trim()}
  get last(){return this.#last}
  check(pw){return pw===this.#pw}
  login(){this.#last=new Date().toLocaleString()}
}
const ADMINS=[new AdminUser('ADM-001','Aarav Mehta','admin123','Operations Manager','aarav@aerobook.com','+91 98765 43210'),new AdminUser('ADM-002','Priya Nair','counter123','Ticket Counter Executive','priya@aerobook.com','+91 91234 56780')];
