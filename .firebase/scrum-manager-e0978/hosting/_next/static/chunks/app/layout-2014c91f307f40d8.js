(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{7299:function(e,n,r){Promise.resolve().then(r.t.bind(r,2445,23)),Promise.resolve().then(r.bind(r,7421)),Promise.resolve().then(r.bind(r,4690))},405:function(e,n,r){"use strict";r.d(n,{Kd:function(){return s},_2:function(){return i},_e:function(){return t},ef:function(){return u}});let t="/login",s="/register",i="/profile",u="/"},7421:function(e,n,r){"use strict";r.r(n),r.d(n,{AuthContext:function(){return o}});var t=r(7437),s=r(2265),i=r(7313);let u=(0,s.createContext)({}),o=()=>(0,s.useContext)(u);n.default=e=>{let{children:n}=e,[r,o]=(0,s.useState)({user:null,isLogin:!1});return(0,s.useEffect)(()=>i.I.onAuthStateChanged(e=>{o({isLogin:!!e,user:e})}),[]),console.log("useState",r.user),(0,t.jsx)(u.Provider,{value:{user:r,setUser:o},children:n})}},7313:function(e,n,r){"use strict";r.d(n,{I:function(){return u}});var t=r(6142),s=r(2738);let i=(0,t.ZF)({apiKey:"AIzaSyA9gyR2Vzlx4Wbp0nLY7JnTGPwYk2rkxMQ",authDomain:"scrum-manager-e0978.firebaseapp.com",projectId:"scrum-manager-e0978",storageBucket:"scrum-manager-e0978.appspot.com",messagingSenderId:"116287469649",appId:"1:116287469649:web:582bb4f590465ef21d6070"}),u=(0,s.v0)(i)},4690:function(e,n,r){"use strict";r.r(n);var t=r(7437);r(8184);var s=r(8792),i=r(405),u=r(7421),o=r(5903),c=r(7313),l=r(7907);n.default=()=>{let{user:e}=(0,u.AuthContext)(),n=(0,l.useRouter)();return(0,t.jsx)("header",{children:(0,t.jsxs)("nav",{children:[(0,t.jsx)(s.default,{href:i.ef,children:(0,t.jsx)("div",{children:"logo"})}),(0,t.jsxs)("ul",{children:[!(null==e?void 0:e.isLogin)&&(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(s.default,{href:i._e,children:(0,t.jsx)("span",{children:"Войти"})})}),(null==e?void 0:e.isLogin)&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.default,{href:i._2,children:(0,t.jsx)("span",{children:"Профиль"})}),(0,t.jsx)("li",{onClick:()=>{(0,o.w7)(c.I).then(e=>{console.log("response",e)}).catch(e=>{console.log("error",e)}),n.push(i.ef)},children:(0,t.jsx)("span",{children:"Выйти"})})]})]})]})})}},2445:function(){},8184:function(){}},function(e){e.O(0,[54,687,971,69,744],function(){return e(e.s=7299)}),_N_E=e.O()}]);