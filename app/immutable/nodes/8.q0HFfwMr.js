import{s,C as a,e as t,a as e,t as n,c as r,b as c,D as o,f as l,g as i,d as m,h as f,i as d,j as u,v as p,E as h,F as v,k as g}from"../chunks/scheduler.CKlfITpV.js";import{S as y,i as I,f as $,b as j,d as S,m as k,a as E,t as D,e as b}from"../chunks/index.DneOF3-m.js";import{I as x,g as C}from"../chunks/Icon.IWEbX5rG.js";import{M as T,c as V}from"../chunks/MatterRenderContainer.C8-fffXU.js";import{f as M}from"../chunks/generation.DcGQj0cF.js";import{p as w}from"../chunks/audio.xbct9IjX.js";import{p as B}from"../chunks/collections.CGPSP4TL.js";const N=Object.freeze(Object.defineProperty({__proto__:null,load:async function({parent:s}){return{pokeItems:(await s()).pokeItems}}},Symbol.toStringTag,{value:"Module"}));function O(s){let y,I,C,V,M,w,B,N,O,P,R,_,z,A,F,U,H,L,G,q,J,K,Q,W,X,Y='<h1 class="cTitleStyle">ポケモンとりほうだい</h1>',Z="ポケモン ゲットだぜ！",ss=(s[2]?s[2].jaName:"")+"";function as(a){s[5](a)}function ts(a){s[6](a)}_=new x({props:{icon:"mdi:pokeball",class:"cIconStyle"}});let es={};return void 0!==s[0]&&(es.renderContainer=s[0]),void 0!==s[1]&&(es.matterBase=s[1]),F=new T({props:es}),a.push((()=>$(F,"renderContainer",as))),a.push((()=>$(F,"matterBase",ts))),{c(){y=t("div"),I=t("div"),I.innerHTML=Y,C=e(),V=t("div"),M=t("div"),w=t("div"),B=t("span"),B.textContent=Z,N=e(),O=t("form"),P=t("button"),R=t("div"),j(_.$$.fragment),z=e(),A=t("div"),j(F.$$.fragment),L=e(),G=t("div"),q=t("div"),J=t("strong"),K=n(ss),this.h()},l(s){y=r(s,"DIV",{class:!0});var a=c(y);I=r(a,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-jgc82w"!==o(I)&&(I.innerHTML=Y),C=l(a),V=r(a,"DIV",{class:!0});var t=c(V);M=r(t,"DIV",{class:!0});var e=c(M);w=r(e,"DIV",{class:!0});var n=c(w);B=r(n,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-1ezseob"!==o(B)&&(B.textContent=Z),N=l(n),O=r(n,"FORM",{});var f=c(O);P=r(f,"BUTTON",{type:!0,class:!0});var d=c(P);R=r(d,"DIV",{class:!0});var u=c(R);S(_.$$.fragment,u),u.forEach(i),d.forEach(i),f.forEach(i),n.forEach(i),e.forEach(i),z=l(t),A=r(t,"DIV",{class:!0});var p=c(A);S(F.$$.fragment,p),p.forEach(i),L=l(t),G=r(t,"DIV",{class:!0});var h=c(G);q=r(h,"DIV",{class:!0});var v=c(q);J=r(v,"STRONG",{});var g=c(J);K=m(g,ss),g.forEach(i),v.forEach(i),h.forEach(i),t.forEach(i),a.forEach(i),this.h()},h(){f(I,"class","cTitlePartStyle"),f(B,"class","cSpanTextStyle"),f(R,"class","cIconDivStyle"),f(P,"type","submit"),f(P,"class","cIconButtonStyle"),f(w,"class","cInputFormAndMessagePartStyle"),f(M,"class","flex items-center justify-center"),f(A,"class","m-4"),f(q,"class","flex items-center justify-center"),f(G,"class","m-4"),f(V,"class","cContentPartStyle"),f(y,"class","cRouteBodyStyle")},m(a,t){d(a,y,t),u(y,I),u(y,C),u(y,V),u(V,M),u(M,w),u(w,B),u(w,N),u(w,O),u(O,P),u(P,R),k(_,R,null),u(V,z),u(V,A),k(F,A,null),u(V,L),u(V,G),u(G,q),u(q,J),u(J,K),Q=!0,W||(X=p(O,"submit",h(s[3])),W=!0)},p(s,[a]){const t={};!U&&1&a&&(U=!0,t.renderContainer=s[0],v((()=>U=!1))),!H&&2&a&&(H=!0,t.matterBase=s[1],v((()=>H=!1))),F.$set(t),(!Q||4&a)&&ss!==(ss=(s[2]?s[2].jaName:"")+"")&&g(K,ss)},i(s){Q||(E(_.$$.fragment,s),E(F.$$.fragment,s),Q=!0)},o(s){D(_.$$.fragment,s),D(F.$$.fragment,s),Q=!1},d(s){s&&i(y),b(_),b(F),W=!1,X()}}}function P(s,a,t){let e,n,r,{data:c}=a;return s.$$set=s=>{"data"in s&&t(4,c=s.data)},[e,n,r,async function(){const s=M(c.pokeItems,"pokeId");t(2,r=B(s,1)[0]),w(r.oggUrl);const a=C(100),e=await V(r.imageUrl,!1,1,{x:50+2*a,y:20});Matter.Composite.add(n.engine.world,[e])},c,function(s){e=s,t(0,e)},function(s){n=s,t(1,n)}]}class R extends y{constructor(a){super(),I(this,a,P,O,s,{data:4})}}export{R as component,N as universal};
