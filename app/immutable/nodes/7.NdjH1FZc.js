import{s as t,C as a,e,a as s,c as n,b as o,D as r,f as i,g as c,h as l,i as m,j as f,E as d,I as u,R as p}from"../chunks/scheduler.bui552vp.js";import{S as h,i as g,f as y,b as v,d as $,m as k,a as I,t as S,e as j}from"../chunks/index.4QmalfrF.js";import{p as C}from"../chunks/audio.D-niu1aU.js";import{M,c as b}from"../chunks/MatterRenderContainer.D5fx0ho8.js";import{f as E}from"../chunks/generation.CYwiHA7u.js";import{p as w,g as x}from"../chunks/pickRandom.BuNLCyVC.js";import{a as F}from"../chunks/IconButton.B89Jc3jM.js";const B=Object.freeze(Object.defineProperty({__proto__:null,load:async function({parent:t}){return{pokeItems:(await t()).pokeItems}}},Symbol.toStringTag,{value:"Module"}));function D(t){const a=a=>function(t,a){a.pairs.forEach((a=>{const{bodyA:e,bodyB:s}=a;1!==e.collisionFilter.category&&1!==s.collisionFilter.category&&e.collisionFilter.category===s.collisionFilter.category&&(Matter.Composite.remove(t.world,e),Matter.Composite.remove(t.world,s),C(e.label))}))}(t,a);return Matter.Events.on(t,"collisionStart",a),()=>{Matter.Events.off(t,"collisionStart",a)}}function P(t){let u,p,h,g,C,b,E,w,x,B,D,P,T,V,A,R='<h1 class="cTitleStyle">ポケモンえあわせ</h1>',_="ポケモン を よびだす";function z(a){t[4](a)}function H(a){t[5](a)}x=new F({props:{icon:"mdi:pokeball",cButton:"btn-sm",onClick:t[2]}});let L={};return void 0!==t[0]&&(L.renderContainer=t[0]),void 0!==t[1]&&(L.matterBase=t[1]),P=new M({props:L}),a.push((()=>y(P,"renderContainer",z))),a.push((()=>y(P,"matterBase",H))),{c(){u=e("div"),p=e("div"),p.innerHTML=R,h=s(),g=e("div"),C=e("div"),b=e("div"),E=e("span"),E.textContent=_,w=s(),v(x.$$.fragment),B=s(),D=e("div"),v(P.$$.fragment),this.h()},l(t){u=n(t,"DIV",{class:!0});var a=o(u);p=n(a,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-1x0fz5f"!==r(p)&&(p.innerHTML=R),h=i(a),g=n(a,"DIV",{class:!0});var e=o(g);C=n(e,"DIV",{class:!0});var s=o(C);b=n(s,"DIV",{class:!0});var l=o(b);E=n(l,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-263kan"!==r(E)&&(E.textContent=_),w=i(l),$(x.$$.fragment,l),l.forEach(c),s.forEach(c),B=i(e),D=n(e,"DIV",{class:!0});var m=o(D);$(P.$$.fragment,m),m.forEach(c),e.forEach(c),a.forEach(c),this.h()},h(){l(p,"class","cTitlePartStyle"),l(E,"class","cSpanTextStyle"),l(b,"class","cInputFormAndMessagePartStyle"),l(C,"class","flex items-center justify-center"),l(D,"class","m-4"),l(g,"class","cContentPartStyle"),l(u,"class","cRouteBodyStyle")},m(t,a){m(t,u,a),f(u,p),f(u,h),f(u,g),f(g,C),f(C,b),f(b,E),f(b,w),k(x,b,null),f(g,B),f(g,D),k(P,D,null),A=!0},p(t,[a]){const e={};!T&&1&a&&(T=!0,e.renderContainer=t[0],d((()=>T=!1))),!V&&2&a&&(V=!0,e.matterBase=t[1],d((()=>V=!1))),P.$set(e)},i(t){A||(I(x.$$.fragment,t),I(P.$$.fragment,t),A=!0)},o(t){S(x.$$.fragment,t),S(P.$$.fragment,t),A=!1},d(t){t&&c(u),j(x),j(P)}}}function T(t,a,e){let s,n,{data:o}=a;{let t;u((async()=>{t=D(n.engine)})),p((()=>{t&&t()}))}return t.$$set=t=>{"data"in t&&e(3,o=t.data)},[s,n,async function(){const t=E(o.pokeItems,"pokeId"),a=w(t,60),e=2*a.length,s=Promise.all(Array.from({length:e},(async(t,e)=>{const s=e%a.length,o=x(100);await async function(t,a,e){const s=await b(t.imageUrl,t.oggUrl,!1,1,e);s.collisionFilter.category=a,s.collisionFilter,Matter.Composite.add(n.engine.world,[s])}(a[s],s+2,{x:3*o,y:50})})));await s},o,function(t){s=t,e(0,s)},function(t){n=t,e(1,n)}]}class V extends h{constructor(a){super(),g(this,a,T,P,t,{data:3})}}export{V as component,B as universal};
