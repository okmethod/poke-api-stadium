import{a as t,C as s,e as a,b as e,c as n,d as o,D as r,h as c,f as i,j as l,l as m,m as f,u,E as d,F as p,J as h,M as v}from"../chunks/scheduler.DlxO6Kfx.js";import{S as y,i as g,f as $,b as I,d as S,m as M,a as k,t as E,e as b}from"../chunks/index.DMIAoLi9.js";import{I as j}from"../chunks/Icon.B0NrHuK_.js";import{M as C,c as w}from"../chunks/MatterRenderContainer.c_G11aHE.js";import{f as x}from"../chunks/generation.BvlEJdXb.js";import{g as D}from"../chunks/numerics.DOcq6E6e.js";import{p as F}from"../chunks/collections.4L4Gi_HF.js";const B=Object.freeze(Object.defineProperty({__proto__:null,load:async function({parent:t}){return{pokeItems:(await t()).pokeItems}}},Symbol.toStringTag,{value:"Module"}));function T(t){const s=s=>function(t,s){s.pairs.forEach((s=>{const{bodyA:a,bodyB:e}=s;1!==a.collisionFilter.category&&1!==e.collisionFilter.category&&a.collisionFilter.category===e.collisionFilter.category&&(Matter.Composite.remove(t.world,a),Matter.Composite.remove(t.world,e))}))}(t,s);return Matter.Events.on(t,"collisionStart",s),()=>{Matter.Events.off(t,"collisionStart",s)}}function V(t){let h,v,y,g,w,x,D,F,B,T,V,P,A,O,_,R,z,H,L,N,U='<h1 class="cTitleStyle">ポケモンえあわせ</h1>',J="ポケモン を よびだす";function q(s){t[4](s)}function G(s){t[5](s)}P=new j({props:{icon:"mdi:pokeball",class:"cIconStyle"}});let K={};return void 0!==t[0]&&(K.renderContainer=t[0]),void 0!==t[1]&&(K.matterBase=t[1]),_=new C({props:K}),s.push((()=>$(_,"renderContainer",q))),s.push((()=>$(_,"matterBase",G))),{c(){h=a("div"),v=a("div"),v.innerHTML=U,y=e(),g=a("div"),w=a("div"),x=a("div"),D=a("span"),D.textContent=J,F=e(),B=a("form"),T=a("button"),V=a("div"),I(P.$$.fragment),A=e(),O=a("div"),I(_.$$.fragment),this.h()},l(t){h=n(t,"DIV",{class:!0});var s=o(h);v=n(s,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-1x0fz5f"!==r(v)&&(v.innerHTML=U),y=c(s),g=n(s,"DIV",{class:!0});var a=o(g);w=n(a,"DIV",{class:!0});var e=o(w);x=n(e,"DIV",{class:!0});var l=o(x);D=n(l,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-mp7i3f"!==r(D)&&(D.textContent=J),F=c(l),B=n(l,"FORM",{});var m=o(B);T=n(m,"BUTTON",{type:!0,class:!0});var f=o(T);V=n(f,"DIV",{class:!0});var u=o(V);S(P.$$.fragment,u),u.forEach(i),f.forEach(i),m.forEach(i),l.forEach(i),e.forEach(i),A=c(a),O=n(a,"DIV",{class:!0});var d=o(O);S(_.$$.fragment,d),d.forEach(i),a.forEach(i),s.forEach(i),this.h()},h(){l(v,"class","cTitlePartStyle"),l(D,"class","text-lg"),l(V,"class","cIconDivStyle"),l(T,"type","submit"),l(T,"class","cIconButtonStyle"),l(x,"class","cInputFormAndMessagePartStyle"),l(w,"class","flex items-center justify-center"),l(O,"class","m-4"),l(g,"class","cContentPartStyle"),l(h,"class","cRouteBodyStyle")},m(s,a){m(s,h,a),f(h,v),f(h,y),f(h,g),f(g,w),f(w,x),f(x,D),f(x,F),f(x,B),f(B,T),f(T,V),M(P,V,null),f(g,A),f(g,O),M(_,O,null),H=!0,L||(N=u(B,"submit",d(t[2])),L=!0)},p(t,[s]){const a={};!R&&1&s&&(R=!0,a.renderContainer=t[0],p((()=>R=!1))),!z&&2&s&&(z=!0,a.matterBase=t[1],p((()=>z=!1))),_.$set(a)},i(t){H||(k(P.$$.fragment,t),k(_.$$.fragment,t),H=!0)},o(t){E(P.$$.fragment,t),E(_.$$.fragment,t),H=!1},d(t){t&&i(h),b(P),b(_),L=!1,N()}}}function P(t,s,a){let e,n,{data:o}=s;{let t;h((async()=>{t=T(n.engine)})),v((()=>{t&&t()}))}return t.$$set=t=>{"data"in t&&a(3,o=t.data)},[e,n,async function(){const t=x(o.pokeItems,"pokeId"),s=F(t,60),a=2*s.length,e=Promise.all(Array.from({length:a},(async(t,a)=>{const e=a%s.length,o=D(100);await async function(t,s,a){const e=await w(t.imageUrl,!1,1,a);e.collisionFilter.category=s,e.collisionFilter,Matter.Composite.add(n.engine.world,[e])}(s[e],e+2,{x:3*o,y:50})})));await e},o,function(t){e=t,a(0,e)},function(t){n=t,a(1,n)}]}class A extends y{constructor(s){super(),g(this,s,P,V,t,{data:3})}}export{A as component,B as universal};
