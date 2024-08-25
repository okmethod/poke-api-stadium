import{s as t,B as a,e as s,a as e,c as n,b as o,C as r,f as c,g as l,h as i,i as f,j as m,v as d,D as u,E as p,J as h,S as v}from"../chunks/scheduler.BlZZSZ7p.js";import{S as y,i as g,f as $,b as I,d as S,m as C,a as E,t as M,e as b}from"../chunks/index.BmmfLK84.js";import{I as k,g as j}from"../chunks/Icon.CbI2r_q0.js";import{M as w,c as x}from"../chunks/MatterRenderContainer.CfhKVphc.js";import{f as B,p as D}from"../chunks/collections.CcO4f3jY.js";const F=Object.freeze(Object.defineProperty({__proto__:null,load:async function({parent:t}){return{pokeItems:(await t()).pokeItems}}},Symbol.toStringTag,{value:"Module"}));function T(t){const a=a=>function(t,a){a.pairs.forEach((a=>{const{bodyA:s,bodyB:e}=a;1!==s.collisionFilter.category&&1!==e.collisionFilter.category&&s.collisionFilter.category===e.collisionFilter.category&&(Matter.Composite.remove(t.world,s),Matter.Composite.remove(t.world,e))}))}(t,a);return Matter.Events.on(t,"collisionStart",a),()=>{Matter.Events.off(t,"collisionStart",a)}}function V(t){let h,v,y,g,j,x,B,D,F,T,V,P,A,O,_,R,z,H,L,N,U='<h1 class="cTitleStyle">ポケモンえあわせ</h1>',J="ポケモン を よびだす";function q(a){t[4](a)}function G(a){t[5](a)}P=new k({props:{icon:"mdi:pokeball",class:"cIconStyle"}});let K={};return void 0!==t[0]&&(K.renderContainer=t[0]),void 0!==t[1]&&(K.matterBase=t[1]),_=new w({props:K}),a.push((()=>$(_,"renderContainer",q))),a.push((()=>$(_,"matterBase",G))),{c(){h=s("div"),v=s("div"),v.innerHTML=U,y=e(),g=s("div"),j=s("div"),x=s("div"),B=s("span"),B.textContent=J,D=e(),F=s("form"),T=s("button"),V=s("div"),I(P.$$.fragment),A=e(),O=s("div"),I(_.$$.fragment),this.h()},l(t){h=n(t,"DIV",{class:!0});var a=o(h);v=n(a,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-1x0fz5f"!==r(v)&&(v.innerHTML=U),y=c(a),g=n(a,"DIV",{class:!0});var s=o(g);j=n(s,"DIV",{class:!0});var e=o(j);x=n(e,"DIV",{class:!0});var i=o(x);B=n(i,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-263kan"!==r(B)&&(B.textContent=J),D=c(i),F=n(i,"FORM",{});var f=o(F);T=n(f,"BUTTON",{type:!0,class:!0});var m=o(T);V=n(m,"DIV",{class:!0});var d=o(V);S(P.$$.fragment,d),d.forEach(l),m.forEach(l),f.forEach(l),i.forEach(l),e.forEach(l),A=c(s),O=n(s,"DIV",{class:!0});var u=o(O);S(_.$$.fragment,u),u.forEach(l),s.forEach(l),a.forEach(l),this.h()},h(){i(v,"class","cTitlePartStyle"),i(B,"class","cSpanTextStyle"),i(V,"class","cIconDivStyle"),i(T,"type","submit"),i(T,"class","cIconButtonStyle"),i(x,"class","cInputFormAndMessagePartStyle"),i(j,"class","flex items-center justify-center"),i(O,"class","m-4"),i(g,"class","cContentPartStyle"),i(h,"class","cRouteBodyStyle")},m(a,s){f(a,h,s),m(h,v),m(h,y),m(h,g),m(g,j),m(j,x),m(x,B),m(x,D),m(x,F),m(F,T),m(T,V),C(P,V,null),m(g,A),m(g,O),C(_,O,null),H=!0,L||(N=d(F,"submit",u(t[2])),L=!0)},p(t,[a]){const s={};!R&&1&a&&(R=!0,s.renderContainer=t[0],p((()=>R=!1))),!z&&2&a&&(z=!0,s.matterBase=t[1],p((()=>z=!1))),_.$set(s)},i(t){H||(E(P.$$.fragment,t),E(_.$$.fragment,t),H=!0)},o(t){M(P.$$.fragment,t),M(_.$$.fragment,t),H=!1},d(t){t&&l(h),b(P),b(_),L=!1,N()}}}function P(t,a,s){let e,n,{data:o}=a;{let t;h((async()=>{t=T(n.engine)})),v((()=>{t&&t()}))}return t.$$set=t=>{"data"in t&&s(3,o=t.data)},[e,n,async function(){const t=B(o.pokeItems,"pokeId"),a=D(t,60),s=2*a.length,e=Promise.all(Array.from({length:s},(async(t,s)=>{const e=s%a.length,o=j(100);await async function(t,a,s){const e=await x(t.imageUrl,!1,1,s);e.collisionFilter.category=a,e.collisionFilter,Matter.Composite.add(n.engine.world,[e])}(a[e],e+2,{x:3*o,y:50})})));await e},o,function(t){e=t,s(0,e)},function(t){n=t,s(1,n)}]}class A extends y{constructor(a){super(),g(this,a,P,V,t,{data:3})}}export{A as component,F as universal};
