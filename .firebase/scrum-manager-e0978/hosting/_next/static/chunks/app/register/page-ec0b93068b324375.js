(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[11],{1378:function(e,r,n){Promise.resolve().then(n.bind(n,5262))},405:function(e,r,n){"use strict";n.d(r,{Kd:function(){return i},Po:function(){return s},_2:function(){return o},_e:function(){return t},ef:function(){return a}});let s="/",t="/login",i="/register",o="/profile",a="/home"},5262:function(e,r,n){"use strict";n.r(r);var s=n(7437);n(3733);var t=n(1974),i=n(4073),o=n(8792),a=n(405),u=n(2670),c=n(7957),l=n(7622),d=n(5903),f=n(7313),m=n(7907),p=n(2265);r.default=(0,p.memo)(()=>{let{handleSubmit:e,register:r,formState:{errors:n},reset:h}=(0,u.cI)({resolver:(0,c.X)(l.gY)}),_=(0,m.useRouter)(),x=(0,p.useCallback)(e=>{console.log(e),(0,d.Xb)(f.I,e.email,e.password).then(e=>{alert("Регистрация прошла успешно"),h(),_.push(a._e)}).catch(e=>{console.log("catch ",e),alert("что-то пошло не так, попробуйте снова")})},[h,_]);return(0,s.jsx)("div",{children:(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{children:"Регистрация"}),(0,s.jsxs)("form",{onSubmit:e(x),children:[(0,s.jsx)(t.Z,{register:r,error:n.email,type:"text",placeholder:" Введите email...",name:"email",label:"Email"}),(0,s.jsx)(t.Z,{register:r,error:n.password,type:"password",placeholder:" Введите пароль...",name:"password",label:"Пароль"}),(0,s.jsx)(t.Z,{register:r,error:n.confirm_password,type:"password",placeholder:" Подтвердите пароль...",name:"confirm_password",label:"Подтвердите Пароль"}),(0,s.jsx)(i.Z,{label:"Зарегистрироваться"}),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{children:"Уже есть аккаунт? "}),(0,s.jsx)(o.default,{href:a._e,children:(0,s.jsx)("span",{children:"Войти"})})]})]})]})})})},7313:function(e,r,n){"use strict";n.d(r,{I:function(){return a}});var s=n(6142),t=n(2738),i=n(8121);let o=(0,s.ZF)({apiKey:"AIzaSyA9gyR2Vzlx4Wbp0nLY7JnTGPwYk2rkxMQ",authDomain:"scrum-manager-e0978.firebaseapp.com",projectId:"scrum-manager-e0978",storageBucket:"scrum-manager-e0978.appspot.com",messagingSenderId:"116287469649",appId:"1:116287469649:web:582bb4f590465ef21d6070"}),a=(0,t.v0)(o);(0,i.ad)(o)},7622:function(e,r,n){"use strict";n.d(r,{Js:function(){return u},dm:function(){return i},gY:function(){return o},jE:function(){return a}});var s=n(1991);let t={email:s.Z_().email("пожалуйста введите свой email").required("пожалуйста заполните это поле"),password:s.Z_().required("пожалуйста заполните это поле").min(6,"пожалуста введите пароль")},i=s.Ry({...t}),o=s.Ry({...t,confirm_password:s.Z_().oneOf([s.iH("password")],"Пароль должен совпадать")}),a=s.Ry({user_name:s.Z_().nullable(),icon_url:s.Z_().nullable()}),u=s.Ry({password:s.Z_().required("пожалуйста заполните это поле").min(6,"пожалуста введите пароль"),confirm_password:s.Z_().oneOf([s.iH("password")],"Пароль должен совпадать")})},1974:function(e,r,n){"use strict";var s=n(7437);n(3595),r.Z=e=>{let{label:r,type:n,name:t,placeholder:i,register:o,error:a}=e;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{children:r}),(0,s.jsx)("input",{...o(t,{required:"error message"}),type:n,name:t,placeholder:i,id:"field_".concat(t)})]}),a&&(0,s.jsx)("var",{children:null==a?void 0:a.message})]})}},4073:function(e,r,n){"use strict";var s=n(7437);n(3649),r.Z=e=>{let{label:r,onClickFunk:n}=e;return(0,s.jsx)("div",{children:(0,s.jsx)("button",{onClick:n,children:r})})}},8792:function(e,r,n){"use strict";n.d(r,{default:function(){return t.a}});var s=n(5250),t=n.n(s)},7907:function(e,r,n){"use strict";var s=n(5313);n.o(s,"useRouter")&&n.d(r,{useRouter:function(){return s.useRouter}})},3733:function(){},3595:function(){},3649:function(){}},function(e){e.O(0,[358,54,449,250,342,971,69,744],function(){return e(e.s=1378)}),_N_E=e.O()}]);