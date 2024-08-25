import{s as t,C as a,e as s,a as e,c as n,b as o,D as r,f as c,g as l,h as i,i as f,j as m,v as u,E as d,F as p,J as h,S as v}from"../chunks/scheduler.CKlfITpV.js";import{S as y,i as g,f as $,b as I,d as S,m as k,a as E,t as b,e as j}from"../chunks/index.DneOF3-m.js";import{I as M,g as C}from"../chunks/Icon.IWEbX5rG.js";import{p as w}from"../chunks/audio.xbct9IjX.js";import{M as x,c as D}from"../chunks/MatterRenderContainer.BvJMgEGR.js";import{f as F}from"../chunks/generation.DFhL16SV.js";import{p as T}from"../chunks/collections.CGPSP4TL.js";const B=Object.freeze(Object.defineProperty({__proto__:null,load:async function({parent:t}){return{pokeItems:(await t()).pokeItems}}},Symbol.toStringTag,{value:"Module"}));function V(t){const a=a=>function(t,a){a.pairs.forEach((a=>{const{bodyA:s,bodyB:e}=a;1!==s.collisionFilter.category&&1!==e.collisionFilter.category&&s.collisionFilter.category===e.collisionFilter.category&&(Matter.Composite.remove(t.world,s),Matter.Composite.remove(t.world,e),w(s.label))}))}(t,a);return Matter.Events.on(t,"collisionStart",a),()=>{Matter.Events.off(t,"collisionStart",a)}}function P(t){let h,v,y,g,C,w,D,F,T,B,V,P,A,O,_,z,R,U,H,L,N='<h1 class="cTitleStyle">ポケモンえあわせ</h1>',J="ポケモン を よびだす";function q(a){t[4](a)}function G(a){t[5](a)}P=new M({props:{icon:"mdi:pokeball",class:"cIconStyle"}});let K={};return void 0!==t[0]&&(K.renderContainer=t[0]),void 0!==t[1]&&(K.matterBase=t[1]),_=new x({props:K}),a.push((()=>$(_,"renderContainer",q))),a.push((()=>$(_,"matterBase",G))),{c(){h=s("div"),v=s("div"),v.innerHTML=N,y=e(),g=s("div"),C=s("div"),w=s("div"),D=s("span"),D.textContent=J,F=e(),T=s("form"),B=s("button"),V=s("div"),I(P.$$.fragment),A=e(),O=s("div"),I(_.$$.fragment),this.h()},l(t){h=n(t,"DIV",{class:!0});var a=o(h);v=n(a,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-1x0fz5f"!==r(v)&&(v.innerHTML=N),y=c(a),g=n(a,"DIV",{class:!0});var s=o(g);C=n(s,"DIV",{class:!0});var e=o(C);w=n(e,"DIV",{class:!0});var i=o(w);D=n(i,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-263kan"!==r(D)&&(D.textContent=J),F=c(i),T=n(i,"FORM",{});var f=o(T);B=n(f,"BUTTON",{type:!0,class:!0});var m=o(B);V=n(m,"DIV",{class:!0});var u=o(V);S(P.$$.fragment,u),u.forEach(l),m.forEach(l),f.forEach(l),i.forEach(l),e.forEach(l),A=c(s),O=n(s,"DIV",{class:!0});var d=o(O);S(_.$$.fragment,d),d.forEach(l),s.forEach(l),a.forEach(l),this.h()},h(){i(v,"class","cTitlePartStyle"),i(D,"class","cSpanTextStyle"),i(V,"class","cIconDivStyle"),i(B,"type","submit"),i(B,"class","cIconButtonStyle"),i(w,"class","cInputFormAndMessagePartStyle"),i(C,"class","flex items-center justify-center"),i(O,"class","m-4"),i(g,"class","cContentPartStyle"),i(h,"class","cRouteBodyStyle")},m(a,s){f(a,h,s),m(h,v),m(h,y),m(h,g),m(g,C),m(C,w),m(w,D),m(w,F),m(w,T),m(T,B),m(B,V),k(P,V,null),m(g,A),m(g,O),k(_,O,null),U=!0,H||(L=u(T,"submit",d(t[2])),H=!0)},p(t,[a]){const s={};!z&&1&a&&(z=!0,s.renderContainer=t[0],p((()=>z=!1))),!R&&2&a&&(R=!0,s.matterBase=t[1],p((()=>R=!1))),_.$set(s)},i(t){U||(E(P.$$.fragment,t),E(_.$$.fragment,t),U=!0)},o(t){b(P.$$.fragment,t),b(_.$$.fragment,t),U=!1},d(t){t&&l(h),j(P),j(_),H=!1,L()}}}function A(t,a,s){let e,n,{data:o}=a;{let t;h((async()=>{t=V(n.engine)})),v((()=>{t&&t()}))}return t.$$set=t=>{"data"in t&&s(3,o=t.data)},[e,n,async function(){const t=F(o.pokeItems,"pokeId"),a=T(t,60),s=2*a.length,e=Promise.all(Array.from({length:s},(async(t,s)=>{const e=s%a.length,o=C(100);await async function(t,a,s){const e=await D(t.imageUrl,t.oggUrl,!1,1,s);e.collisionFilter.category=a,e.collisionFilter,Matter.Composite.add(n.engine.world,[e])}(a[e],e+2,{x:3*o,y:50})})));await e},o,function(t){e=t,s(0,e)},function(t){n=t,s(1,n)}]}class O extends y{constructor(a){super(),g(this,a,A,P,t,{data:3})}}export{O as component,B as universal};
