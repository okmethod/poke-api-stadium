import{c as H,g as F}from"../chunks/fetchStaticData.7nrzdWS2.js";import{P as W,F as $}from"../chunks/common.3e1mQu3z.js";import{a as A,e as c,b as R,c as d,d as g,x as N,h as x,f,j as u,l as L,m as o,u as z,z as K,o as q,B as X,C as G,D as J}from"../chunks/scheduler.CUIDQL-i.js";import{S as Q,i as Y,b as Z,d as tt,m as et,a as at,t as nt,e as st}from"../chunks/index.DvDG_np6.js";import{I as rt}from"../chunks/Icon.jS-m3xkb.js";import{i as ot,a as lt,b as it,c as ct,d as dt,e as ut,f as mt}from"../chunks/createPokeBody.B3WQ_gmC.js";async function ft({fetch:v}){await H(v,"load to cache");const n=await l();async function l(){const r=Array.from({length:W},(s,a)=>$+a).map(async s=>(await H(v,s.toString())).imageUrl??null);return(await Promise.all(r)).filter(s=>s!==null)}return{imageUrls:n}}const wt=Object.freeze(Object.defineProperty({__proto__:null,load:ft},Symbol.toStringTag,{value:"Module"}));function vt(v){let n,l,h='<h1 class="cTitleStyle">ポケモンとりほうだい</h1>',r,t,s,a,m,w="ポケモン ゲットだぜ！",S,y,e,i,p,D,b,I,E,C,T;return p=new rt({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),{c(){n=c("div"),l=c("div"),l.innerHTML=h,r=R(),t=c("div"),s=c("div"),a=c("div"),m=c("span"),m.textContent=w,S=R(),y=c("form"),e=c("button"),i=c("div"),Z(p.$$.fragment),D=R(),b=c("div"),I=c("div"),this.h()},l(_){n=d(_,"DIV",{class:!0});var P=g(n);l=d(P,"DIV",{class:!0,"data-svelte-h":!0}),N(l)!=="svelte-jgc82w"&&(l.innerHTML=h),r=x(P),t=d(P,"DIV",{class:!0});var M=g(t);s=d(M,"DIV",{class:!0});var U=g(s);a=d(U,"DIV",{class:!0});var k=g(a);m=d(k,"SPAN",{class:!0,"data-svelte-h":!0}),N(m)!=="svelte-2lras7"&&(m.textContent=w),S=x(k),y=d(k,"FORM",{});var O=g(y);e=d(O,"BUTTON",{type:!0,class:!0});var V=g(e);i=d(V,"DIV",{class:!0});var j=g(i);tt(p.$$.fragment,j),j.forEach(f),V.forEach(f),O.forEach(f),k.forEach(f),U.forEach(f),D=x(M),b=d(M,"DIV",{class:!0});var B=g(b);I=d(B,"DIV",{class:!0}),g(I).forEach(f),B.forEach(f),M.forEach(f),P.forEach(f),this.h()},h(){u(l,"class","cTitlePartStyle"),u(m,"class","text-lg"),u(i,"class","cIconDivStyle"),u(e,"type","submit"),u(e,"class","cIconButtonStyle"),u(a,"class","cInputFormAndMessagePartStyle"),u(s,"class","flex items-center justify-center"),u(I,"class","w-80 h-80 bg-gray-300 border border-black"),u(b,"class","m-4"),u(t,"class","cContentPartStyle"),u(n,"class","cRouteBodyStyle")},m(_,P){L(_,n,P),o(n,l),o(n,r),o(n,t),o(t,s),o(s,a),o(a,m),o(a,S),o(a,y),o(y,e),o(e,i),et(p,i,null),o(t,D),o(t,b),o(b,I),v[3](I),E=!0,C||(T=z(y,"submit",K(v[1])),C=!0)},p:q,i(_){E||(at(p.$$.fragment,_),E=!0)},o(_){nt(p.$$.fragment,_),E=!1},d(_){_&&f(n),st(p),v[3](null),C=!1,T()}}}let pt=!1;function _t(v,n,l){let{data:h}=n,r,t,s,a,m;X(async()=>{t=ot(),s=lt(),a=it(t,r),m=ct(t,a);const e=await dt(r);{Matter.World.add(t.world,e),Matter.Runner.run(s,t),Matter.Render.run(a);let i=ut(t.world,m,r,{isHolding:pt});if(!i)return;Object.entries(i).forEach(([p,D])=>{r.addEventListener(p,D)})}}),G(()=>{{Matter.Render.stop(a),Matter.Runner.stop(s),Matter.World.clear(t.world,!1),Matter.Engine.clear(t);return}});let w;async function S(){w=F(h.imageUrls.length);const e=F(100),i=await mt(h.imageUrls[w],!1,{x:50+e*2,y:20});Matter.World.add(t.world,[i])}function y(e){J[e?"unshift":"push"](()=>{r=e,l(0,r)})}return v.$$set=e=>{"data"in e&&l(2,h=e.data)},[r,S,h,y]}class St extends Q{constructor(n){super(),Y(this,n,_t,vt,A,{data:2})}}export{St as component,wt as universal};
