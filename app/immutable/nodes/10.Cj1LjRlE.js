import{s as t,C as e,e as s,a,c as n,b as o,D as r,f as c,g as l,h as i,i as d,j as f,v as h,E as m,F as u,w as p,J as y,t as g,d as v,k as S,q as x,G as I}from"../chunks/scheduler.CKlfITpV.js";import{S as $,i as M,f as w,b as E,d as b,m as B,a as k,t as j,e as C}from"../chunks/index.DneOF3-m.js";import{e as D}from"../chunks/each.BSaG3cXF.js";import{I as P,f as V}from"../chunks/Icon.IWEbX5rG.js";import{M as A,c as T}from"../chunks/MatterRenderContainer.C8-fffXU.js";import{f as N}from"../chunks/generation.DcGQj0cF.js";import{p as F}from"../chunks/collections.CGPSP4TL.js";const O=Object.freeze(Object.defineProperty({__proto__:null,load:async function({parent:t}){return{pokeItems:(await t()).pokeItems}}},Symbol.toStringTag,{value:"Module"}));function _(t,e,s){const a=t.slice();return a[17]=e[s],a}function H(t){let e,a;return{c(){e=s("span"),a=g(t[5]),this.h()},l(s){e=n(s,"SPAN",{class:!0});var r=o(e);a=v(r,t[5]),r.forEach(l),this.h()},h(){i(e,"class","cSpanTextStyle")},m(t,s){d(t,e,s),f(e,a)},p(t,e){32&e&&S(a,t[5])},d(t){t&&l(e)}}}function R(t){let e,s=D(t[4]),a=[];for(let n=0;n<s.length;n+=1)a[n]=U(_(t,s,n));return{c(){for(let t=0;t<a.length;t+=1)a[t].c();e=x()},l(t){for(let e=0;e<a.length;e+=1)a[e].l(t);e=x()},m(t,s){for(let e=0;e<a.length;e+=1)a[e]&&a[e].m(t,s);d(t,e,s)},p(t,n){if(16&n){let o;for(s=D(t[4]),o=0;o<s.length;o+=1){const r=_(t,s,o);a[o]?a[o].p(r,n):(a[o]=U(r),a[o].c(),a[o].m(e.parentNode,e))}for(;o<a.length;o+=1)a[o].d(1);a.length=s.length}},d(t){t&&l(e),I(a,t)}}}function U(t){let e,r,h,m,u,p,y,x,I,$=t[17].jaName+"",M=V(t[17].weight,"weight")+"";return{c(){e=s("div"),r=s("span"),h=g("["),m=g($),u=g("]"),p=a(),y=s("span"),x=g(M),I=a(),this.h()},l(t){e=n(t,"DIV",{class:!0});var s=o(e);r=n(s,"SPAN",{class:!0});var a=o(r);h=v(a,"["),m=v(a,$),u=v(a,"]"),a.forEach(l),p=c(s),y=n(s,"SPAN",{class:!0});var i=o(y);x=v(i,M),i.forEach(l),I=c(s),s.forEach(l),this.h()},h(){i(r,"class","text-base"),i(y,"class","text-xl bold"),i(e,"class","flex flex-col items-center")},m(t,s){d(t,e,s),f(e,r),f(r,h),f(r,m),f(r,u),f(e,p),f(e,y),f(y,x),f(e,I)},p(t,e){16&e&&$!==($=t[17].jaName+"")&&S(m,$),16&e&&M!==(M=V(t[17].weight,"weight")+"")&&S(x,M)},d(t){t&&l(e)}}}function L(t){let y,g,v,S,x,I,$,M,D,V,T,N,F,O,_,U,L,W,q,z,G,J,K,Q,X,Y,Z,tt,et,st,at,nt='<h1 class="cTitleStyle">ポケモンおもさくらべ 改</h1>',ot="ポケモン を よびだす",rt="こたえをみる";function ct(e){t[9](e)}function lt(e){t[10](e)}N=new P({props:{icon:"mdi:pokeball",class:"cIconStyle"}});let it={};function dt(t,e){return t[3]?R:H}void 0!==t[0]&&(it.renderContainer=t[0]),void 0!==t[1]&&(it.matterBase=t[1]),U=new A({props:it}),e.push((()=>w(U,"renderContainer",ct))),e.push((()=>w(U,"matterBase",lt))),Y=new P({props:{icon:"mdi:pokeball",class:"cIconStyle"}});let ft=dt(t),ht=ft(t);return{c(){y=s("div"),g=s("div"),g.innerHTML=nt,v=a(),S=s("div"),x=s("div"),I=s("div"),$=s("span"),$.textContent=ot,M=a(),D=s("form"),V=s("button"),T=s("div"),E(N.$$.fragment),O=a(),_=s("div"),E(U.$$.fragment),q=a(),z=s("div"),G=s("div"),J=s("span"),J.textContent=rt,K=a(),Q=s("button"),X=s("div"),E(Y.$$.fragment),Z=a(),tt=s("div"),ht.c(),this.h()},l(t){y=n(t,"DIV",{class:!0});var e=o(y);g=n(e,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-ooobby"!==r(g)&&(g.innerHTML=nt),v=c(e),S=n(e,"DIV",{class:!0});var s=o(S);x=n(s,"DIV",{class:!0});var a=o(x);I=n(a,"DIV",{class:!0});var i=o(I);$=n(i,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-263kan"!==r($)&&($.textContent=ot),M=c(i),D=n(i,"FORM",{});var d=o(D);V=n(d,"BUTTON",{type:!0,class:!0});var f=o(V);T=n(f,"DIV",{class:!0});var h=o(T);b(N.$$.fragment,h),h.forEach(l),f.forEach(l),d.forEach(l),i.forEach(l),a.forEach(l),O=c(s),_=n(s,"DIV",{class:!0});var m=o(_);b(U.$$.fragment,m),m.forEach(l),q=c(s),z=n(s,"DIV",{class:!0});var u=o(z);G=n(u,"DIV",{class:!0});var p=o(G);J=n(p,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-1egwsn2"!==r(J)&&(J.textContent=rt),K=c(p),Q=n(p,"BUTTON",{type:!0,class:!0});var w=o(Q);X=n(w,"DIV",{class:!0});var E=o(X);b(Y.$$.fragment,E),E.forEach(l),w.forEach(l),p.forEach(l),Z=c(u),tt=n(u,"DIV",{class:!0});var B=o(tt);ht.l(B),B.forEach(l),u.forEach(l),s.forEach(l),e.forEach(l),this.h()},h(){i(g,"class","cTitlePartStyle"),i($,"class","cSpanTextStyle"),i(T,"class","cIconDivStyle"),i(V,"type","submit"),V.disabled=F=!t[2],i(V,"class","cIconButtonStyle"),i(I,"class","cInputFormAndMessagePartStyle"),i(x,"class","flex items-center justify-center"),i(_,"class","m-4"),i(J,"class","cSpanTextStyle"),i(X,"class","cIconDivStyle"),i(Q,"type","button"),i(Q,"class","cIconButtonStyle"),i(G,"class","cInputFormAndMessagePartStyle justify-center"),i(tt,"class","cInputFormAndMessagePartStyle justify-center"),i(z,"class","m-4 mt-2 space-y-4"),i(S,"class","cContentPartStyle"),i(y,"class","cRouteBodyStyle")},m(e,s){d(e,y,s),f(y,g),f(y,v),f(y,S),f(S,x),f(x,I),f(I,$),f(I,M),f(I,D),f(D,V),f(V,T),B(N,T,null),f(S,O),f(S,_),B(U,_,null),f(S,q),f(S,z),f(z,G),f(G,J),f(G,K),f(G,Q),f(Q,X),B(Y,X,null),f(z,Z),f(z,tt),ht.m(tt,null),et=!0,st||(at=[h(D,"submit",m(t[6])),h(Q,"click",t[7])],st=!0)},p(t,[e]){(!et||4&e&&F!==(F=!t[2]))&&(V.disabled=F);const s={};!L&&1&e&&(L=!0,s.renderContainer=t[0],u((()=>L=!1))),!W&&2&e&&(W=!0,s.matterBase=t[1],u((()=>W=!1))),U.$set(s),ft===(ft=dt(t))&&ht?ht.p(t,e):(ht.d(1),ht=ft(t),ht&&(ht.c(),ht.m(tt,null)))},i(t){et||(k(N.$$.fragment,t),k(U.$$.fragment,t),k(Y.$$.fragment,t),et=!0)},o(t){j(N.$$.fragment,t),j(U.$$.fragment,t),j(Y.$$.fragment,t),et=!1},d(t){t&&l(y),C(N),C(U),C(Y),ht.d(),st=!1,p(at)}}}function W(t,e,s){let a,n,o,r,c,l,{data:i}=e;y((async()=>{n=.5*a.clientWidth,o=.5*a.clientHeight;const t=.9*a.clientWidth;({seesaw:c,seesawStick:l}=function(t,e,s){const{Bodies:a,Composite:n,Constraint:o}=Matter,r=n.create(),c=a.rectangle(s.x,s.y,t,e,{label:"seesawStick",restitution:1,friction:.8,mass:5,render:{fillStyle:"#888888"}}),l=o.create({pointA:{x:s.x,y:s.y},bodyB:c,pointB:{x:0,y:0},stiffness:1,length:0});return n.add(r,c),n.add(r,l),{seesaw:r,seesawStick:c}}(t,20,{x:n,y:1.4*o})),Matter.Composite.add(r.engine.world,c)}));let d=!0,f=!1,h=[],m=[];let u="";return t.$$set=t=>{"data"in t&&s(8,i=t.data)},[a,r,d,f,h,u,async function(){s(2,d=!1),s(5,u="じゅんびちゅう..."),s(5,u=""),s(3,f=!1),m.forEach((t=>Matter.Composite.remove(r.engine.world,t))),m=[],l&&(Matter.Body.setAngle(l,0),Matter.Body.setAngularVelocity(l,0),Matter.Body.setPosition(l,{x:n,y:1.5*o}));const t=N(i.pokeItems,"pokeId");s(4,h=F(t,2));const e=h.map((t=>T(t.imageUrl,!1,1,{x:0,y:0})));(await Promise.all(e)).forEach(((t,e)=>{const s=t.bounds,a=s.max.y-s.min.y;Matter.Body.setPosition(t,{x:n+(0===e?.6*-n:.6*n),y:.8*o-.5*a}),Matter.Body.setMass(t,h[e].weight/10),Matter.Body.setStatic(t,!0),Matter.Composite.add(r.engine.world,[t]),m.push(t)})),await new Promise((t=>setTimeout(t,500))),s(5,u="じゅんび かんりょう！"),s(2,d=!0)},function(){0!=h.length?!1!==d?(!1===f&&m.forEach((t=>{Matter.Body.setStatic(t,!1),Matter.Body.applyForce(t,t.position,{x:0,y:.01*t.mass}),Matter.Body.setVelocity(t,{x:0,y:0}),Matter.Body.setAngularVelocity(t,0)})),s(3,f=!0)):s(5,u="じゅんびちゅう..."):s(5,u="さきに ポケモンを よびだしてね")},i,function(t){a=t,s(0,a)},function(t){r=t,s(1,r)}]}class q extends ${constructor(e){super(),M(this,e,W,L,t,{data:8})}}export{q as component,O as universal};
