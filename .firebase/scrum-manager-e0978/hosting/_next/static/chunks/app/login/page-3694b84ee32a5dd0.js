(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[626],{4759:function(e,r,n){Promise.resolve().then(n.bind(n,4338))},405:function(e,r,n){"use strict";n.d(r,{Kd:function(){return i},Po:function(){return t},_2:function(){return u},_e:function(){return s},ef:function(){return a}});let t="/",s="/login",i="/register",u="/profile",a="/home"},4338:function(e,r,n){"use strict";n.r(r);var t=n(7437);n(3733);var s=n(405),i=n(8792),u=n(1974),a=n(4073),o=n(2670),c=n(7957),l=n(7622),d=n(7313),f=n(5903),m=n(7907),p=n(2265);r.default=(0,p.memo)(()=>{let{handleSubmit:e,register:r,formState:{errors:n},reset:h}=(0,o.cI)({resolver:(0,c.X)(l.dm)}),x=(0,m.useRouter)(),j=(0,p.useCallback)(e=>{console.log(e),(0,f.e5)(d.I,e.email,e.password).then(e=>{h(),x.push(s.ef)}).catch(e=>{alert("что-то пошло не так")})},[h,x]);return(0,t.jsx)("div",{children:(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{children:"Вход в аккаунт"}),(0,t.jsxs)("form",{onSubmit:e(j),children:[(0,t.jsx)(u.Z,{register:r,error:n.email,type:"text",placeholder:" Введите email...",name:"email",label:"Email"}),(0,t.jsx)(u.Z,{register:r,error:n.password,type:"password",placeholder:" Введите пароль...",name:"password",label:"Пароль"}),(0,t.jsx)(a.Z,{label:"Войти"}),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("span",{children:"Нет аккаунта? "}),(0,t.jsx)(i.default,{href:s.Kd,children:(0,t.jsx)("span",{children:"Зарегестрироваться"})})]})]})]})})})},7313:function(e,r,n){"use strict";n.d(r,{I:function(){return a}});var t=n(6142),s=n(2738),i=n(8121);let u=(0,t.ZF)({apiKey:"AIzaSyA9gyR2Vzlx4Wbp0nLY7JnTGPwYk2rkxMQ",authDomain:"scrum-manager-e0978.firebaseapp.com",projectId:"scrum-manager-e0978",storageBucket:"scrum-manager-e0978.appspot.com",messagingSenderId:"116287469649",appId:"1:116287469649:web:582bb4f590465ef21d6070"}),a=(0,s.v0)(u);(0,i.ad)(u)},7622:function(e,r,n){"use strict";n.d(r,{Js:function(){return o},dm:function(){return i},gY:function(){return u},jE:function(){return a}});var t=n(1991);let s={email:t.Z_().email("пожалуйста введите свой email").required("пожалуйста заполните это поле"),password:t.Z_().required("пожалуйста заполните это поле").min(6,"пожалуста введите пароль")},i=t.Ry({...s}),u=t.Ry({...s,confirm_password:t.Z_().oneOf([t.iH("password")],"Пароль должен совпадать")}),a=t.Ry({user_name:t.Z_().nullable(),icon_url:t.Z_().nullable()}),o=t.Ry({password:t.Z_().required("пожалуйста заполните это поле").min(6,"пожалуста введите пароль"),confirm_password:t.Z_().oneOf([t.iH("password")],"Пароль должен совпадать")})},1974:function(e,r,n){"use strict";var t=n(7437);n(3595),r.Z=e=>{let{label:r,type:n,name:s,placeholder:i,register:u,error:a}=e;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{children:r}),(0,t.jsx)("input",{...u(s,{required:"error message"}),type:n,name:s,placeholder:i,id:"field_".concat(s)})]}),a&&(0,t.jsx)("var",{children:null==a?void 0:a.message})]})}},4073:function(e,r,n){"use strict";var t=n(7437);n(3649),r.Z=e=>{let{label:r,onClickFunk:n}=e;return(0,t.jsx)("div",{children:(0,t.jsx)("button",{onClick:n,children:r})})}},8792:function(e,r,n){"use strict";n.d(r,{default:function(){return s.a}});var t=n(5250),s=n.n(t)},7907:function(e,r,n){"use strict";var t=n(5313);n.o(t,"useRouter")&&n.d(r,{useRouter:function(){return t.useRouter}})},3733:function(){},3595:function(){},3649:function(){}},function(e){e.O(0,[358,54,449,250,342,971,69,744],function(){return e(e.s=4759)}),_N_E=e.O()}]);