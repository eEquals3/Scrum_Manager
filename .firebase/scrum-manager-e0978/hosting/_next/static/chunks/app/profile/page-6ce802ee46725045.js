(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[178],{429:function(e,r,n){Promise.resolve().then(n.bind(n,9939))},9939:function(e,r,n){"use strict";n.r(r);var s=n(7437),l=n(1974),o=n(4073);n(3733),n(889);var a=n(2670),t=n(7957),i=n(7622),u=n(2265),c=n(7421),d=n(5903),m=n(9009),p=n(7313);r.default=(0,u.memo)(()=>{let{user:e}=(0,c.AuthContext)(),r=e.user,{handleSubmit:n,register:f,formState:{errors:h}}=(0,a.cI)({resolver:(0,t.X)(i.jE)}),{handleSubmit:x,register:g,formState:{errors:j}}=(0,a.cI)({resolver:(0,t.X)(i.Js)}),[b,_]=(0,u.useState)("none"),v=(0,u.useCallback)(()=>{"profile"===b?_("none"):_("profile")},[b]),w=(0,u.useCallback)(()=>{"password"===b?_("none"):_("password")},[b]),y=(0,u.useCallback)(e=>{e&&(0,d.ck)(r,{displayName:e.user_name,photoURL:e.icon_url}).then(async n=>{try{await (0,m.r7)((0,m.JU)(p.db,"users",r.uid),{name:e.user_name,iconURL:e.icon_url})}catch(e){console.log("errors",JSON.stringify(e,null,2)),console.log("userInfo.uid",JSON.stringify(r.uid,null,2))}console.log("profile successfully changed",n),_("none")}).catch(e=>{alert("что-то пошло не так"),console.log("errors",null==e?void 0:e.message)})},[r]),S=(0,u.useCallback)(e=>{(0,d.gQ)(r,e.password).then(e=>{console.log("password successfully changed",e),_("none")}).catch(e=>{console.log("errors",null==e?void 0:e.message)})},[r]);return(0,s.jsx)("div",{children:(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{children:"Добро пожаловать ".concat(null==r?void 0:r.displayName)}),(0,s.jsxs)("span",{children:[(0,s.jsxs)("span",{children:["Имя: ",null==r?void 0:r.displayName]}),(0,s.jsxs)("span",{children:["Email: ",null==r?void 0:r.email]}),(0,s.jsxs)("span",{children:["URL фото: ",null==r?void 0:r.photoURL]}),(0,s.jsx)("button",{onClick:v,children:" редактировать профиль "}),(0,s.jsx)("button",{onClick:w,children:" изменить пароль "})]}),"profile"===b?(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("form",{onSubmit:n(y),children:[(0,s.jsx)(l.ZP,{register:f,error:h.user_name,type:"text",placeholder:" Введите ваше имя...",name:"user_name",label:"Имя"}),(0,s.jsx)(l.ZP,{register:f,error:h.icon_url,type:"text",placeholder:" Ссылка на фото...",name:"icon_url",label:"URL фото"}),(0,s.jsx)(o.Z,{label:"Обновить профиль"})]})}):null,"password"===b?(0,s.jsxs)("form",{onSubmit:x(S),children:[(0,s.jsx)(l.ZP,{register:g,error:j.password,type:"password",placeholder:" Введите пароль...",name:"password",label:"Пароль"}),(0,s.jsx)(l.ZP,{register:g,error:j.confirm_password,type:"password",placeholder:" Подтвердите пароль...",name:"confirm_password",label:"Подтвердите пароль"}),(0,s.jsx)(o.Z,{label:"Обновить пароль"})]}):null]})})})},7421:function(e,r,n){"use strict";n.r(r),n.d(r,{AuthContext:function(){return t}});var s=n(7437),l=n(2265),o=n(7313);n(2182),n(161);let a=(0,l.createContext)({}),t=()=>(0,l.useContext)(a);r.default=e=>{let{children:r}=e,[n,t]=(0,l.useState)(!0),[i,u]=(0,l.useState)({user:null,isLogin:!1});return(0,l.useEffect)(()=>o.I.onAuthStateChanged(e=>{u({isLogin:!!e,user:e}),t(!1)}),[]),console.log("useState",i.user),(0,s.jsxs)(a.Provider,{value:{user:i,setUser:u},children:[n?(0,s.jsxs)("div",{className:"LoaderScreen",children:[(0,s.jsx)("span",{className:"Loader"})," "]}):null,n?null:r]})}},7313:function(e,r,n){"use strict";n.d(r,{I:function(){return t},db:function(){return i}});var s=n(6142),l=n(2738),o=n(8121);let a=(0,s.ZF)({apiKey:"AIzaSyA9gyR2Vzlx4Wbp0nLY7JnTGPwYk2rkxMQ",authDomain:"scrum-manager-e0978.firebaseapp.com",projectId:"scrum-manager-e0978",storageBucket:"scrum-manager-e0978.appspot.com",messagingSenderId:"116287469649",appId:"1:116287469649:web:582bb4f590465ef21d6070"}),t=(0,l.v0)(a),i=(0,o.ad)(a)},7622:function(e,r,n){"use strict";n.d(r,{Js:function(){return i},dm:function(){return o},gY:function(){return a},jE:function(){return t}});var s=n(1991);let l={email:s.Z_().email("пожалуйста введите свой email").required("пожалуйста заполните это поле"),password:s.Z_().required("пожалуйста заполните это поле").min(6,"пожалуста введите пароль")},o=s.Ry({...l}),a=s.Ry({...l,confirm_password:s.Z_().oneOf([s.iH("password")],"Пароль должен совпадать")}),t=s.Ry({user_name:s.Z_().nullable(),icon_url:s.Z_().nullable()}),i=s.Ry({password:s.Z_().required("пожалуйста заполните это поле").min(6,"пожалуста введите пароль"),confirm_password:s.Z_().oneOf([s.iH("password")],"Пароль должен совпадать")})},1974:function(e,r,n){"use strict";n.d(r,{UP:function(){return l},ox:function(){return o}});var s=n(7437);n(3595);let l=e=>{let{label:r,type:n,name:l,placeholder:o,register:a,error:t,defaultValue:i}=e;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("b",{children:[(0,s.jsx)("label",{children:r}),(0,s.jsx)("input",{...a(l,{required:"error message"}),type:n,name:l,placeholder:o,id:"field_".concat(l),defaultValue:i})]}),t&&(0,s.jsx)("var",{children:null==t?void 0:t.message})]})},o=e=>{let{label:r,name:n,placeholder:l,register:o,error:a,defaultValue:t}=e;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("b",{children:[(0,s.jsx)("label",{children:r}),(0,s.jsx)("textarea",{...o(n,{required:"error message"}),name:n,placeholder:l,id:"field_".concat(n),defaultValue:t})]}),a&&(0,s.jsx)("var",{children:null==a?void 0:a.message})]})};r.ZP=l},4073:function(e,r,n){"use strict";var s=n(7437);n(3649),r.Z=e=>{let{label:r,onClickFunk:n}=e;return(0,s.jsx)("a",{children:(0,s.jsx)("button",{onClick:n,children:r})})}},3733:function(){},889:function(){},2182:function(){},3595:function(){},161:function(){},3649:function(){}},function(e){e.O(0,[358,54,449,342,971,69,744],function(){return e(e.s=429)}),_N_E=e.O()}]);