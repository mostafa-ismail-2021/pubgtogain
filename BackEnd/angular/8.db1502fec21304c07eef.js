(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"8XlD":function(e,t,d){"use strict";d.r(t),d.d(t,"AdminPaidAdsModule",(function(){return A}));var a=d("3Pt+"),i=d("tyNb"),s=d("CG0s"),n=d("fXoL"),b=d("AytR"),o=d("tk/3");const c=b.a.apiUrl+"/paidads/";let u=(()=>{class e{constructor(e){this.http=e}addPaidAdToServer(e,t){return this.http.post(c+"addPaidAd",{paidAd:e,adminData:t})}getPaidAds(e){return this.http.post(c+"getPaidAds",{adminData:e})}getPaidAdsNot(e){return this.http.post(c+"getPaidAdsNot",{adminData:e})}getPaidAdsCompany(e,t){return this.http.post(c+"getPaidAdsCompany",{companyName:e,adminData:t})}getPaidAdsComFalse(e){return this.http.post(c+"getPaidAdsComFalse",{adminData:e})}setPaidComTrue(e,t){return this.http.post(c+"setPaidComTrue",{_id:e,adminData:t})}deletePaidAd(e,t){return this.http.post(c+"deletePaidAd",{_id:e,adminData:t})}}return e.\u0275fac=function(t){return new(t||e)(n.Sb(o.b))},e.\u0275prov=n.Fb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var r=d("0IaG");const l=[{path:"paidads/admincontrol",component:(()=>{class e{constructor(e,t){this.adminpaidad=e,this.dialog=t,this.messageAddPaidAd=null,this.numberPaidAds=null,this.numberPaidAdsNot=null,this.messageDeletePaidAds=null,this.numberPaidAdsCompany=null,this.messagePaidComTrue=null,this.disableButton=!1,this.numberPaidAdsComFalse=null,this.confirmRequest="test"}ngOnInit(){}addPaidAdToServer(e){this.disableButton=!0;let t=e.value.videoId.split("/").pop();this.checkAddPaidAdType=this.adminpaidad.addPaidAdToServer({videoId:t,totalViews:e.value.totalViews,companyName:e.value.companyName,costByEGP:e.value.costByEGP,adAppearanceCountry:e.value.adAppearanceCountry},this.confirmRequest).subscribe(e=>{this.messageAddPaidAd=e.message,this.disableButton=!1})}getPaidAds(){this.disableButton=!0;let e=null;this.checkPaidAdsType=this.adminpaidad.getPaidAds(this.confirmRequest).subscribe(t=>{e=t},e=>this.dialog.open(s.a),()=>{this.numberPaidAds=e.length,console.log(e),this.disableButton=!1})}getPaidAdsNot(){this.disableButton=!0;let e=null;this.checkPaidAdsNotType=this.adminpaidad.getPaidAdsNot(this.confirmRequest).subscribe(t=>{e=t},e=>this.dialog.open(s.a),()=>{this.numberPaidAdsNot=e.length,console.log(e),this.disableButton=!1})}getPaidAdsCompany(e){this.disableButton=!0;let t=null;this.checkPaidAdsCompanyType=this.adminpaidad.getPaidAdsCompany(e.value.companyName,this.confirmRequest).subscribe(e=>{t=e},e=>this.dialog.open(s.a),()=>{this.numberPaidAdsCompany=t.length,console.log(t),this.disableButton=!1})}getPaidAdsComFalse(){this.disableButton=!0;let e=null;this.checkPaidAdsNotType=this.adminpaidad.getPaidAdsComFalse(this.confirmRequest).subscribe(t=>{e=t},e=>this.dialog.open(s.a),()=>{this.numberPaidAdsComFalse=e.length,console.log(e),this.disableButton=!1})}setPaidComTrue(e){this.disableButton=!0,this.adminpaidad.setPaidComTrue(e.value._id,this.confirmRequest).subscribe(e=>{this.messagePaidComTrue=e.message,this.disableButton=!1})}deletePaidAd(e){this.disableButton=!0,this.checkDeletePaidAdsType=this.adminpaidad.deletePaidAd(e.value._id,this.confirmRequest).subscribe(e=>{this.messageDeletePaidAds=e.message,this.disableButton=!1})}openButtons(){this.disableButton=!1}ngOnDestroy(){this.checkAddPaidAdType&&this.checkAddPaidAdType.unsubscribe(),this.checkPaidAdsType&&this.checkPaidAdsType.unsubscribe(),this.checkPaidAdsNotType&&this.checkPaidAdsNotType.unsubscribe(),this.checkPaidAdsCompanyType&&this.checkPaidAdsCompanyType.unsubscribe(),this.checkDeletePaidAdsType&&this.checkDeletePaidAdsType.unsubscribe()}}return e.\u0275fac=function(t){return new(t||e)(n.Jb(u),n.Jb(r.a))},e.\u0275cmp=n.Db({type:e,selectors:[["app-adminpaidads"]],decls:129,vars:15,consts:[[1,"subH2"],["addPaidAdForm","ngForm"],["type","text","name","videoId","ngModel","","required","","pattern","^https://youtu.be/+[a-zA-Z0-9_-]+$","placeholder","Ex. https://youtu.be/test"],["type","text","name","totalViews","ngModel","","required","","pattern","^[0-9]+$","placeholder","take number only"],["type","text","name","companyName","ngModel","","required",""],["type","text","name","costByEGP","ngModel","","required","","pattern","^[0-9]+$","placeholder","take number only"],["type","text","name","adAppearanceCountry","ngModel","","required","","pattern","^[A-Z]{2,3}$","placeholder","take two Capital Letters or ALL",2,"width","208"],[3,"disabled","click"],[2,"color","black"],["addPaidAdCompanyForm","ngForm"],["setPaidComTrueForm","ngForm"],["type","text","name","_id","ngModel","","required",""],["deletePaidAdForm","ngForm"],[1,"subH3",3,"click"],["type","text","name","confirmRequest",3,"ngModel","ngModelChange"]],template:function(e,t){if(1&e){const e=n.Pb();n.Ob(0,"h2"),n.uc(1,"paid ads"),n.Nb(),n.Ob(2,"h3",0),n.uc(3,"--add paid ad"),n.Nb(),n.Ob(4,"form",null,1),n.Ob(6,"label"),n.uc(7,"video id of youtube : "),n.Nb(),n.Kb(8,"input",2),n.Kb(9,"br"),n.Ob(10,"label"),n.uc(11,"total views : "),n.Nb(),n.Kb(12,"input",3),n.Kb(13,"br"),n.Ob(14,"label"),n.uc(15,"company name : "),n.Nb(),n.Kb(16,"input",4),n.Kb(17,"br"),n.Ob(18,"label"),n.uc(19,"cost by EGP : "),n.Nb(),n.Kb(20,"input",5),n.Kb(21,"br"),n.Ob(22,"label"),n.uc(23,"ad appearance country code like EG not egypt or ALL : "),n.Nb(),n.Kb(24,"input",6),n.Kb(25,"br"),n.Ob(26,"button",7),n.Wb("click",(function(){n.jc(e);const d=n.ic(5);return t.addPaidAdToServer(d)})),n.uc(27,"add paid ad to server"),n.Nb(),n.Kb(28,"br"),n.Ob(29,"p"),n.uc(30,"message : "),n.Ob(31,"span"),n.uc(32),n.Nb(),n.Nb(),n.Nb(),n.Kb(33,"hr"),n.Ob(34,"h3",0),n.uc(35,"--get all paid ads"),n.Nb(),n.Ob(36,"button",7),n.Wb("click",(function(){return t.getPaidAds()})),n.uc(37,"get paid ads"),n.Nb(),n.Kb(38,"br"),n.Ob(39,"p"),n.uc(40,"number of ads is : "),n.Ob(41,"span"),n.uc(42),n.Nb(),n.Nb(),n.Ob(43,"p"),n.uc(44,"note you can see the ads data in console"),n.Nb(),n.Kb(45,"hr",8),n.Ob(46,"h3",0),n.uc(47,"--get paid ads not completed"),n.Nb(),n.Ob(48,"button",7),n.Wb("click",(function(){return t.getPaidAdsNot()})),n.uc(49,"get paid ads not completed"),n.Nb(),n.Kb(50,"br"),n.Ob(51,"p"),n.uc(52,"number of ads is : "),n.Ob(53,"span"),n.uc(54),n.Nb(),n.Nb(),n.Ob(55,"p"),n.uc(56,"note you can see the ads data in console"),n.Nb(),n.Kb(57,"hr",8),n.Ob(58,"h3",0),n.uc(59,"--get paid ads of specific company"),n.Nb(),n.Ob(60,"form",null,9),n.Ob(62,"label"),n.uc(63,"company name : "),n.Nb(),n.Kb(64,"input",4),n.Kb(65,"br"),n.Ob(66,"button",7),n.Wb("click",(function(){n.jc(e);const d=n.ic(61);return t.getPaidAdsCompany(d)})),n.uc(67,"get paid ads of company"),n.Nb(),n.Kb(68,"br"),n.Ob(69,"p"),n.uc(70,"number of ads is : "),n.Ob(71,"span"),n.uc(72),n.Nb(),n.Nb(),n.Ob(73,"p"),n.uc(74,"note you can see the ads data in console"),n.Nb(),n.Nb(),n.Kb(75,"hr",8),n.Ob(76,"h3",0),n.uc(77,"--get paid ads completed and inform company ads over false"),n.Nb(),n.Ob(78,"button",7),n.Wb("click",(function(){return t.getPaidAdsComFalse()})),n.uc(79,"get inform ads over false"),n.Nb(),n.Kb(80,"br"),n.Ob(81,"p"),n.uc(82,"number of ads is : "),n.Ob(83,"span"),n.uc(84),n.Nb(),n.Nb(),n.Ob(85,"p"),n.uc(86,"note you can see the ads data in console"),n.Nb(),n.Kb(87,"hr",8),n.Ob(88,"h3",0),n.uc(89,"--set inform company ads over true depend on _id"),n.Nb(),n.Ob(90,"form",null,10),n.Ob(92,"label"),n.uc(93,"id of paid ad : "),n.Nb(),n.Kb(94,"input",11),n.Kb(95,"br"),n.Ob(96,"button",7),n.Wb("click",(function(){n.jc(e);const d=n.ic(91);return t.setPaidComTrue(d)})),n.uc(97,"set inform ads over true"),n.Nb(),n.Kb(98,"br"),n.Ob(99,"p"),n.uc(100,"message : "),n.Ob(101,"span"),n.uc(102),n.Nb(),n.Nb(),n.Nb(),n.Kb(103,"hr",8),n.Ob(104,"h3",0),n.uc(105,"--delete paid ad depend on _id"),n.Nb(),n.Ob(106,"form",null,12),n.Ob(108,"label"),n.uc(109,"id of paid ad : "),n.Nb(),n.Kb(110,"input",11),n.Kb(111,"br"),n.Ob(112,"button",7),n.Wb("click",(function(){n.jc(e);const d=n.ic(107);return t.deletePaidAd(d)})),n.uc(113,"delete paid ad"),n.Nb(),n.Kb(114,"br"),n.Ob(115,"p"),n.uc(116,"message : "),n.Ob(117,"span"),n.uc(118),n.Nb(),n.Nb(),n.Nb(),n.Kb(119,"hr",8),n.Ob(120,"h2",0),n.uc(121,"--open disable button"),n.Nb(),n.Ob(122,"button",13),n.Wb("click",(function(){return t.openButtons()})),n.uc(123,"open buttons"),n.Nb(),n.Kb(124,"br"),n.Ob(125,"label"),n.uc(126,"confirm request "),n.Nb(),n.Ob(127,"input",14),n.Wb("ngModelChange",(function(e){return t.confirmRequest=e})),n.Nb(),n.Kb(128,"br")}if(2&e){const e=n.ic(5),d=n.ic(61),a=n.ic(91),i=n.ic(107);n.zb(26),n.dc("disabled",e.invalid||1==t.disableButton),n.zb(6),n.vc(t.messageAddPaidAd),n.zb(4),n.dc("disabled",1==t.disableButton),n.zb(6),n.vc(t.numberPaidAds),n.zb(6),n.dc("disabled",1==t.disableButton),n.zb(6),n.vc(t.numberPaidAdsNot),n.zb(12),n.dc("disabled",d.invalid||1==t.disableButton),n.zb(6),n.vc(t.numberPaidAdsCompany),n.zb(6),n.dc("disabled",1==t.disableButton),n.zb(6),n.vc(t.numberPaidAdsComFalse),n.zb(12),n.dc("disabled",a.invalid||1==t.disableButton),n.zb(6),n.vc(t.messagePaidComTrue),n.zb(10),n.dc("disabled",i.invalid||1==t.disableButton),n.zb(6),n.vc(t.messageDeletePaidAds),n.zb(9),n.dc("ngModel",t.confirmRequest)}},directives:[a.s,a.j,a.k,a.a,a.i,a.l,a.p,a.n],styles:[""]}),e})(),canActivate:[d("jO/0").a]}];let p=(()=>{class e{}return e.\u0275mod=n.Hb({type:e}),e.\u0275inj=n.Gb({factory:function(t){return new(t||e)},imports:[[i.c.forChild(l)],i.c]}),e})();var m=d("ofXK"),h=d("rhD1");let A=(()=>{class e{}return e.\u0275mod=n.Hb({type:e}),e.\u0275inj=n.Gb({factory:function(t){return new(t||e)},imports:[[a.d,p,m.b,h.a]]}),e})()}}]);