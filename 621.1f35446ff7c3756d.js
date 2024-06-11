"use strict";(self.webpackChunkpokerfriend_UI=self.webpackChunkpokerfriend_UI||[]).push([[621],{5621:(F,p,s)=>{s.r(p),s.d(p,{AuthenticationModule:()=>T});var Z=s(6208),l=s(3403),i=s(6223);function c(e,a){return r=>{const o=r.value;return o?e.test(o)?null:a:null}}function U(e){const a=e.get("password").value,r=e.get("confirmPassword").value,o=e.get("confirmPassword").errors,n=e.get("confirmPassword");return function _(e,a){return e!==a&&""!==a}(a,r)?n.setErrors({...o,NoPassswordMatch:!0}):n.setErrors(o),n}var t=s(5879),C=s(1007),w=s(9692),g=s(6814),u=s(5195),h=s(4104),d=s(4170),v=s(2032),b=s(617),f=s(2296);function A(e,a){1&e&&(t.TgZ(0,"label",22),t._uU(1," Password do not match. "),t.qZA())}function q(e,a){if(1&e){const r=t.EpF();t.ynx(0),t._UZ(1,"hr"),t.TgZ(2,"form",4)(3,"div",13)(4,"mat-form-field",6)(5,"mat-label"),t._uU(6,"Enter code"),t.qZA(),t._UZ(7,"input",23),t.TgZ(8,"mat-icon",8),t._uU(9,"sentiment_very_satisfied"),t.qZA(),t.TgZ(10,"mat-hint"),t._uU(11,"The verification code is sent your registered email."),t.qZA()(),t.TgZ(12,"button",11),t.NdJ("click",function(){t.CHM(r);const n=t.oxw();return t.KtG(n.confirmSignUp())}),t._uU(13," Verify "),t.qZA()()(),t.BQk()}if(2&e){const r=t.oxw();t.xp6(2),t.Q6J("formGroup",r.verifyForm),t.xp6(10),t.Q6J("disabled",!r.verifyForm.valid&&!r.loading)}}const I=[{path:"",component:(()=>{class e{constructor(r,o,n){this.cognitoService=r,this.router=o,this.authService=n,this.hide=!0,this.loading=!1,this.isConfirm=!1,this.re_hide=!0,this.signInForm=new i.cw({email:new i.NI("",[i.kI.required,i.kI.email]),password:new i.NI("",[i.kI.required])}),this.signUpForm=new i.cw({name:new i.NI("",[i.kI.required]),emailId:new i.NI("",[i.kI.required,i.kI.email]),password:new i.NI("",[i.kI.required,c(/\d/,{hasNumber:!0}).bind(this),c(/[A-Z]/,{hasCapitalCase:!0}).bind(this),c(/[a-z]/,{hasSmallCase:!0}).bind(this),c(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,{hasSpecialCharacters:!0}).bind(this),i.kI.minLength(8)]),confirmPassword:new i.NI("",[i.kI.required])},{validators:U}),this.verifyForm=new i.cw({code:new i.NI("",[i.kI.required])})}signIn(){this.loading=!0,this.user={email:this.signInForm.value.email,password:this.signInForm.value.password},this.authService.login(),this.router.navigate(["lobby"])}signUp(){this.user={name:this.signUpForm.value.name,email:this.signUpForm.value.emailId,password:this.signUpForm.value.password},this.loading=!0,this.cognitoService.signUp(this.user).then(()=>{this.loading=!1,this.isConfirm=!0}).catch(r=>{this.loading=!1,alert(r)}),console.log(this.user)}confirmSignUp(){this.loading=!0,this.user.code=this.verifyForm.value.code,console.log(this.user),this.cognitoService.confirmSignUp(this.user).then(()=>{this.router.navigate(["/sign-in"])}).catch(r=>{this.loading=!1,alert(r)})}static#t=this.\u0275fac=function(o){return new(o||e)(t.Y36(C.A),t.Y36(l.F0),t.Y36(w.e))};static#n=this.\u0275cmp=t.Xpm({type:e,selectors:[["pofri-authentication"]],decls:91,vars:33,consts:[[1,"auth-position"],[1,"card-auth"],[1,"tab-grp"],["label","Log in"],[3,"formGroup"],[1,"sign-in-container"],["appearance","fill","color","accent"],["matInput","","formControlName","email","placeholder","Email ID"],["matSuffix",""],["matInput","","formControlName","password","placeholder","Password",3,"type"],["mat-icon-button","","matSuffix","",3,"click"],["mat-raised-button","","color","accent",1,"sign-button",3,"disabled","click"],["label","Register"],[1,"sign-up-container"],["matInput","","formControlName","name","placeholder","Name"],["matInput","","formControlName","emailId","placeholder","pat@example.com"],[1,"password-validation-contianer"],[1,"col",3,"ngClass"],[1,"pval-icon",3,"inline"],["matInput","","formControlName","confirmPassword","placeholder","Confirm Password",3,"type"],["class","text-danger",4,"ngIf"],[4,"ngIf"],[1,"text-danger"],["matInput","","formControlName","code","placeholder","Name"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"mat-card",1)(2,"mat-card-header")(3,"mat-card-title"),t._uU(4," Authentication "),t.qZA()(),t.TgZ(5,"mat-card-content",2)(6,"mat-tab-group")(7,"mat-tab",3)(8,"form",4)(9,"div",5)(10,"mat-form-field",6)(11,"mat-label"),t._uU(12,"Email Id"),t.qZA(),t._UZ(13,"input",7),t.TgZ(14,"mat-icon",8),t._uU(15,"sentiment_very_satisfied"),t.qZA(),t.TgZ(16,"mat-hint"),t._uU(17,"Registered Poker-Friend Email ID."),t.qZA()(),t.TgZ(18,"mat-form-field",6)(19,"mat-label"),t._uU(20,"Password"),t.qZA(),t._UZ(21,"input",9),t.TgZ(22,"button",10),t.NdJ("click",function(){return n.hide=!n.hide}),t.TgZ(23,"mat-icon"),t._uU(24),t.qZA()(),t.TgZ(25,"mat-hint"),t._uU(26,"Enter password."),t.qZA()(),t.TgZ(27,"button",11),t.NdJ("click",function(){return n.signIn()}),t._uU(28," Log In "),t.qZA()()()(),t.TgZ(29,"mat-tab",12)(30,"form",4)(31,"div",13)(32,"mat-form-field",6)(33,"mat-label"),t._uU(34,"Name"),t.qZA(),t._UZ(35,"input",14),t.TgZ(36,"mat-icon",8),t._uU(37,"sentiment_very_satisfied"),t.qZA(),t.TgZ(38,"mat-hint"),t._uU(39,"Prefered Name to register with us."),t.qZA()(),t.TgZ(40,"mat-form-field",6)(41,"mat-label"),t._uU(42,"Email Id"),t.qZA(),t._UZ(43,"input",15),t.TgZ(44,"mat-icon",8),t._uU(45,"sentiment_very_satisfied"),t.qZA(),t.TgZ(46,"mat-hint"),t._uU(47,"Prefered Email Id to register with us."),t.qZA()(),t.TgZ(48,"mat-form-field",6)(49,"mat-label"),t._uU(50,"Enter your password"),t.qZA(),t._UZ(51,"input",9),t.TgZ(52,"button",10),t.NdJ("click",function(){return n.hide=!n.hide}),t.TgZ(53,"mat-icon"),t._uU(54),t.qZA()(),t.TgZ(55,"mat-hint"),t._uU(56,"Refer below to write a strong password."),t.qZA()(),t.TgZ(57,"div",16)(58,"label",17)(59,"mat-icon",18),t._uU(60),t.qZA(),t._uU(61," Must be at least 8 characters! "),t.qZA(),t.TgZ(62,"label",17)(63,"mat-icon",18),t._uU(64),t.qZA(),t._uU(65," Must contain at least 1 number! "),t.qZA(),t.TgZ(66,"label",17)(67,"mat-icon",18),t._uU(68),t.qZA(),t._uU(69," Must contain at least 1 in Capital Case! "),t.qZA(),t.TgZ(70,"label",17)(71,"mat-icon",18),t._uU(72),t.qZA(),t._uU(73," Must contain at least 1 Letter in Small Case! "),t.qZA(),t.TgZ(74,"label",17)(75,"mat-icon",18),t._uU(76),t.qZA(),t._uU(77," Must contain at least 1 Special Character! "),t.qZA()(),t.TgZ(78,"mat-form-field",6)(79,"mat-label"),t._uU(80,"Re-enter your password"),t.qZA(),t._UZ(81,"input",19),t.TgZ(82,"button",10),t.NdJ("click",function(){return n.re_hide=!n.re_hide}),t.TgZ(83,"mat-icon"),t._uU(84),t.qZA()(),t.TgZ(85,"mat-hint"),t._uU(86,"Re-enter the password."),t.qZA()(),t.YNc(87,A,2,0,"label",20),t.TgZ(88,"button",11),t.NdJ("click",function(){return n.signUp()}),t._uU(89," Sign up / Register "),t.qZA()()(),t.YNc(90,q,14,2,"ng-container",21),t.qZA()()()()()),2&o&&(t.xp6(8),t.Q6J("formGroup",n.signInForm),t.xp6(13),t.Q6J("type",n.hide?"password":"text"),t.xp6(1),t.uIk("aria-label","Hide password")("aria-pressed",n.hide),t.xp6(2),t.Oqu(n.hide?"visibility_off":"visibility"),t.xp6(3),t.Q6J("disabled",!n.signInForm.valid&&n.loading),t.xp6(3),t.Q6J("formGroup",n.signUpForm),t.xp6(21),t.Q6J("type",n.hide?"password":"text"),t.xp6(1),t.uIk("aria-label","Hide password")("aria-pressed",n.hide),t.xp6(2),t.Oqu(n.hide?"visibility_off":"visibility"),t.xp6(4),t.Q6J("ngClass",n.signUpForm.controls.password.hasError("required")||n.signUpForm.controls.password.hasError("minlength")?"text-danger":"text-success"),t.xp6(1),t.Q6J("inline",!0),t.xp6(1),t.Oqu(n.signUpForm.controls.password.hasError("required")||n.signUpForm.controls.password.hasError("minlength")?"cancel":"check_circle"),t.xp6(2),t.Q6J("ngClass",n.signUpForm.controls.password.hasError("required")||n.signUpForm.controls.password.hasError("hasNumber")?"text-danger":"text-success"),t.xp6(1),t.Q6J("inline",!0),t.xp6(1),t.Oqu(n.signUpForm.controls.password.hasError("required")||n.signUpForm.controls.password.hasError("hasNumber")?"cancel":"check_circle"),t.xp6(2),t.Q6J("ngClass",n.signUpForm.controls.password.hasError("required")||n.signUpForm.controls.password.hasError("hasCapitalCase")?"text-danger":"text-success"),t.xp6(1),t.Q6J("inline",!0),t.xp6(1),t.Oqu(n.signUpForm.controls.password.hasError("required")||n.signUpForm.controls.password.hasError("hasCapitalCase")?"cancel":"check_circle"),t.xp6(2),t.Q6J("ngClass",n.signUpForm.controls.password.hasError("required")||n.signUpForm.controls.password.hasError("hasSmallCase")?"text-danger":"text-success"),t.xp6(1),t.Q6J("inline",!0),t.xp6(1),t.Oqu(n.signUpForm.controls.password.hasError("required")||n.signUpForm.controls.password.hasError("hasSmallCase")?"cancel":"check_circle"),t.xp6(2),t.Q6J("ngClass",n.signUpForm.controls.password.hasError("required")||n.signUpForm.controls.password.hasError("hasSpecialCharacters")?"text-danger":"text-success"),t.xp6(1),t.Q6J("inline",!0),t.xp6(1),t.Oqu(n.signUpForm.controls.password.hasError("required")||n.signUpForm.controls.password.hasError("hasSpecialCharacters")?"cancel":"check_circle"),t.xp6(5),t.Q6J("type",n.re_hide?"password":"text"),t.xp6(1),t.uIk("aria-label","Hide re-enter password")("aria-pressed",n.re_hide),t.xp6(2),t.Oqu(n.re_hide?"visibility_off":"visibility"),t.xp6(3),t.Q6J("ngIf",n.signUpForm.controls.confirmPassword.hasError("NoPassswordMatch")),t.xp6(1),t.Q6J("disabled",!n.signUpForm.valid&&n.loading),t.xp6(2),t.Q6J("ngIf",n.isConfirm))},dependencies:[g.mk,g.O5,i._Y,i.Fj,i.JJ,i.JL,i.sg,i.u,u.a8,u.dn,u.dk,u.n5,h.uX,h.SP,d.KE,d.hX,d.bx,d.R9,v.Nt,b.Hw,f.lW,f.RK],styles:[".auth-position[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:center;padding:100px}.card-auth[_ngcontent-%COMP%]{width:clamp(400px,90%,500px);height:max-content;display:flex;flex-direction:column;align-items:center;justify-content:flex-start}.tab-grp[_ngcontent-%COMP%]{width:80%;height:80%!important}.sign-in-container[_ngcontent-%COMP%]{display:flex;height:max-content;flex-direction:column;justify-content:flex-start}.sign-in-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{padding:10px 0}.sign-in-container[_ngcontent-%COMP%]   .sign-button[_ngcontent-%COMP%]{margin:10px 0 20px}.sign-up-container[_ngcontent-%COMP%]{display:flex;height:max-content;flex-direction:column;justify-content:flex-start}.sign-up-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{padding:10px 0}.sign-up-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:flex-start;align-items:center;font-size:14px;padding:5px 0}.sign-up-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .pval-icon[_ngcontent-%COMP%]{padding-right:8px}.sign-up-container[_ngcontent-%COMP%]   .sign-button[_ngcontent-%COMP%]{margin:10px 0 20px}.sign-up-container[_ngcontent-%COMP%]   .text-danger[_ngcontent-%COMP%]{color:#e93e3e}.sign-up-container[_ngcontent-%COMP%]   .text-success[_ngcontent-%COMP%]{color:#43da43}"]})}return e})()}];let x=(()=>{class e{static#t=this.\u0275fac=function(o){return new(o||e)};static#n=this.\u0275mod=t.oAB({type:e});static#e=this.\u0275inj=t.cJS({imports:[l.Bz.forChild(I),l.Bz]})}return e})(),T=(()=>{class e{static#t=this.\u0275fac=function(o){return new(o||e)};static#n=this.\u0275mod=t.oAB({type:e});static#e=this.\u0275inj=t.cJS({imports:[Z.m,l.Bz,x]})}return e})()}}]);