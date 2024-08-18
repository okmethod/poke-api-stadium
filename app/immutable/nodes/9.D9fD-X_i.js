import{c as t,d as a}from"../chunks/numerics.pCl-y6qV.js";import{P as e,F as s}from"../chunks/common.CkzKN_UB.js";import{a as r,e as n,b as o,c as l,d as c,y as i,h as d,f,j as h,l as m,m as u,u as y,A as p,v as g,C as v,D as w,E as M,t as b,i as I,n as S,p as x,z as E}from"../chunks/scheduler.BlVzsFL4.js";import{S as k,i as j,b as B,d as P,m as $,a as D,t as V,e as A}from"../chunks/index.CSk_aVci.js";import{e as N}from"../chunks/each.yOjPqwOo.js";import{I as T}from"../chunks/Icon.BIHgwpMx.js";import{i as C,a as F,b as O,c as R,d as U,e as W,f as H}from"../chunks/createPokeBody.DVRBL-wl.js";import{f as _}from"../chunks/generation.CTlbytp5.js";import{a as L}from"../chunks/collections.BlUgappt.js";const z=Object.freeze(Object.defineProperty({__proto__:null,load:async function({fetch:a}){return await t(a,"load to cache"),{pokeItems:await async function(){const r=Array.from({length:e},((t,a)=>s+a)).map((async e=>{const s=await t(a,e.toString());return s&&null!==s.imageUrl?{pokeId:e,jaName:(r=s).jaName,imageUrl:r.imageUrl??"not_found",weight:r.weight}:null;var r}));return(await Promise.all(r)).filter((t=>null!==t))}()}}},Symbol.toStringTag,{value:"Module"}));function q(t,a,e){const s=t.slice();return s[20]=a[e],s}function G(t){let a,e;return{c(){a=n("span"),e=b(t[4]),this.h()},l(s){a=l(s,"SPAN",{class:!0});var r=c(a);e=I(r,t[4]),r.forEach(f),this.h()},h(){h(a,"class","text-lg")},m(t,s){m(t,a,s),u(a,e)},p(t,a){16&a&&S(e,t[4])},d(t){t&&f(a)}}}function J(t){let a,e=N(t[3]),s=[];for(let r=0;r<e.length;r+=1)s[r]=K(q(t,e,r));return{c(){for(let t=0;t<s.length;t+=1)s[t].c();a=x()},l(t){for(let a=0;a<s.length;a+=1)s[a].l(t);a=x()},m(t,e){for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(t,e);m(t,a,e)},p(t,r){if(8&r){let n;for(e=N(t[3]),n=0;n<e.length;n+=1){const o=q(t,e,n);s[n]?s[n].p(o,r):(s[n]=K(o),s[n].c(),s[n].m(a.parentNode,a))}for(;n<s.length;n+=1)s[n].d(1);s.length=e.length}},d(t){t&&f(a),E(s,t)}}}function K(t){let e,s,r,i,y,p,g,v,w,M=t[20].jaName+"",x=a(t[20].weight,"weight")+"";return{c(){e=n("div"),s=n("span"),r=b("["),i=b(M),y=b("]"),p=o(),g=n("span"),v=b(x),w=o(),this.h()},l(t){e=l(t,"DIV",{class:!0});var a=c(e);s=l(a,"SPAN",{class:!0});var n=c(s);r=I(n,"["),i=I(n,M),y=I(n,"]"),n.forEach(f),p=d(a),g=l(a,"SPAN",{class:!0});var o=c(g);v=I(o,x),o.forEach(f),w=d(a),a.forEach(f),this.h()},h(){h(s,"class","text-base"),h(g,"class","text-xl bold"),h(e,"class","flex flex-col items-center")},m(t,a){m(t,e,a),u(e,s),u(s,r),u(s,i),u(s,y),u(e,p),u(e,g),u(g,v),u(e,w)},p(t,e){8&e&&M!==(M=t[20].jaName+"")&&S(i,M),8&e&&x!==(x=a(t[20].weight,"weight")+"")&&S(v,x)},d(t){t&&f(e)}}}function Q(t){let a,e,s,r,v,w,M,b,I,S,x,E,k,j,N,C,F,O,R,U,W,H,_,L,z,q,K,Q,X,Y='<h1 class="cTitleStyle">ポケモンおもさくらべ 改</h1>',Z="ポケモン を よびだす",tt="こたえをみる";function at(t,a){return t[2]?J:G}E=new T({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),L=new T({props:{icon:"mdi:pokeball",class:"cIconStyle"}});let et=at(t),st=et(t);return{c(){a=n("div"),e=n("div"),e.innerHTML=Y,s=o(),r=n("div"),v=n("div"),w=n("div"),M=n("span"),M.textContent=Z,b=o(),I=n("form"),S=n("button"),x=n("div"),B(E.$$.fragment),j=o(),N=n("div"),C=n("div"),F=o(),O=n("div"),R=n("div"),U=n("span"),U.textContent=tt,W=o(),H=n("button"),_=n("div"),B(L.$$.fragment),z=o(),q=n("div"),st.c(),this.h()},l(t){a=l(t,"DIV",{class:!0});var n=c(a);e=l(n,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-ooobby"!==i(e)&&(e.innerHTML=Y),s=d(n),r=l(n,"DIV",{class:!0});var o=c(r);v=l(o,"DIV",{class:!0});var h=c(v);w=l(h,"DIV",{class:!0});var m=c(w);M=l(m,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-mp7i3f"!==i(M)&&(M.textContent=Z),b=d(m),I=l(m,"FORM",{});var u=c(I);S=l(u,"BUTTON",{type:!0,class:!0});var y=c(S);x=l(y,"DIV",{class:!0});var p=c(x);P(E.$$.fragment,p),p.forEach(f),y.forEach(f),u.forEach(f),m.forEach(f),h.forEach(f),j=d(o),N=l(o,"DIV",{class:!0});var g=c(N);C=l(g,"DIV",{class:!0}),c(C).forEach(f),g.forEach(f),F=d(o),O=l(o,"DIV",{class:!0});var k=c(O);R=l(k,"DIV",{class:!0});var B=c(R);U=l(B,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-b801jg"!==i(U)&&(U.textContent=tt),W=d(B),H=l(B,"BUTTON",{type:!0,class:!0});var $=c(H);_=l($,"DIV",{class:!0});var D=c(_);P(L.$$.fragment,D),D.forEach(f),$.forEach(f),B.forEach(f),z=d(k),q=l(k,"DIV",{class:!0});var V=c(q);st.l(V),V.forEach(f),k.forEach(f),o.forEach(f),n.forEach(f),this.h()},h(){h(e,"class","cTitlePartStyle"),h(M,"class","text-lg"),h(x,"class","cIconDivStyle"),h(S,"type","submit"),S.disabled=k=!t[1],h(S,"class","cIconButtonStyle"),h(w,"class","cInputFormAndMessagePartStyle"),h(v,"class","flex items-center justify-center"),h(C,"class","w-80 h-80 bg-gray-300 border border-black"),h(N,"class","m-4"),h(U,"class","text-lg"),h(_,"class","cIconDivStyle"),h(H,"type","button"),h(H,"class","cIconButtonStyle"),h(R,"class","cInputFormAndMessagePartStyle justify-center"),h(q,"class","cInputFormAndMessagePartStyle justify-center"),h(O,"class","m-4 mt-2 space-y-4"),h(r,"class","cContentPartStyle"),h(a,"class","cRouteBodyStyle")},m(n,o){m(n,a,o),u(a,e),u(a,s),u(a,r),u(r,v),u(v,w),u(w,M),u(w,b),u(w,I),u(I,S),u(S,x),$(E,x,null),u(r,j),u(r,N),u(N,C),t[8](C),u(r,F),u(r,O),u(O,R),u(R,U),u(R,W),u(R,H),u(H,_),$(L,_,null),u(O,z),u(O,q),st.m(q,null),K=!0,Q||(X=[y(I,"submit",p(t[5])),y(H,"click",t[6])],Q=!0)},p(t,[a]){(!K||2&a&&k!==(k=!t[1]))&&(S.disabled=k),et===(et=at(t))&&st?st.p(t,a):(st.d(1),st=et(t),st&&(st.c(),st.m(q,null)))},i(t){K||(D(E.$$.fragment,t),D(L.$$.fragment,t),K=!0)},o(t){V(E.$$.fragment,t),V(L.$$.fragment,t),K=!1},d(e){e&&f(a),A(E),t[8](null),A(L),st.d(),Q=!1,g(X)}}}function X(t,a,e){let s,r,n,o,l,c,i,d,f,{data:h}=a;v((async()=>{o=C(),l=F(),c=O(o,s),r=.5*s.clientWidth,n=.5*s.clientHeight,i=R(o,c);const t=await U(s),a=.8*s.clientHeight;({seesaw:d,seesawStick:f}=function(t,a,e){const{Bodies:s,Composite:r,Constraint:n}=Matter,o=r.create(),l=s.rectangle(e.x,e.y,t,a,{label:"seesawStick",restitution:1,friction:.8,mass:5,render:{fillStyle:"#888888"}}),c=n.create({pointA:{x:e.x,y:e.y},bodyB:l,pointB:{x:0,y:0},stiffness:1,length:0});return r.add(o,l),r.add(o,c),{seesaw:o,seesawStick:l}}(a,20,{x:r,y:1.4*n}));{Matter.World.add(o.world,t),Matter.World.add(o.world,d),Matter.Runner.run(l,o),Matter.Render.run(c);let a=W(o.world,i,s,{isHolding:false});if(!a)return;Object.entries(a).forEach((([t,a])=>{s.addEventListener(t,a)}))}})),w((()=>(Matter.Render.stop(c),Matter.Runner.stop(l),Matter.World.clear(o.world,!1),void Matter.Engine.clear(o))));let m=!0,u=!1,y=[],p=[];let g="";return t.$$set=t=>{"data"in t&&e(7,h=t.data)},[s,m,u,y,g,async function(){e(1,m=!1),e(4,g="じゅんびちゅう..."),e(4,g=""),e(2,u=!1),p.forEach((t=>Matter.World.remove(o.world,t))),p=[],f&&(Matter.Body.setAngle(f,0),Matter.Body.setAngularVelocity(f,0),Matter.Body.setPosition(f,{x:r,y:1.5*n}));const t=_(h.pokeItems,"pokeId");e(3,y=L(t,2));const a=y.map((t=>H(t.imageUrl,!1,{x:0,y:0})));(await Promise.all(a)).forEach(((t,a)=>{const e=t.bounds,s=e.max.y-e.min.y;Matter.Body.setPosition(t,{x:r+(0===a?.6*-r:.6*r),y:.8*n-.5*s}),Matter.Body.setMass(t,y[a].weight/10),Matter.Body.setStatic(t,!0),Matter.World.add(o.world,[t]),p.push(t)})),await new Promise((t=>setTimeout(t,500))),e(4,g="じゅんび かんりょう！"),e(1,m=!0)},function(){0!=y.length?!1!==m?(!1===u&&p.forEach((t=>{Matter.Body.setStatic(t,!1),Matter.Body.applyForce(t,t.position,{x:0,y:.01*t.mass}),Matter.Body.setVelocity(t,{x:0,y:0}),Matter.Body.setAngularVelocity(t,0)})),e(2,u=!0)):e(4,g="じゅんびちゅう..."):e(4,g="さきに ポケモンを よびだしてね")},h,function(t){M[t?"unshift":"push"]((()=>{s=t,e(0,s)}))}]}class Y extends k{constructor(t){super(),j(this,t,X,Q,r,{data:7})}}export{Y as component,z as universal};
