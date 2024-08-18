import{c as ce,d as ue}from"../chunks/numerics.CBh2V9Uf.js";import{P as Se,F as we}from"../chunks/common.3e1mQu3z.js";import{a as Me,e as _,b as N,c as v,d as g,y as Q,h as T,f as p,j as m,l as Y,m as o,u as de,A as Ee,v as Pe,C as Be,D as De,E as xe,t as L,i as z,n as Z,p as fe,z as Ce}from"../chunks/scheduler.D16oZ6cK.js";import{S as Ae,i as Ve,b as me,d as pe,m as he,a as _e,t as ve,e as ye}from"../chunks/index.BWx_jO9Z.js";import{e as ge}from"../chunks/each.CeXzaOas.js";import{I as be}from"../chunks/Icon.HXW41lnT.js";import{i as Ne,a as Te,b as je,c as Fe,d as Re,e as He,f as Oe}from"../chunks/createPokeBody.B3WQ_gmC.js";import{f as We}from"../chunks/generation.C4JV6S5l.js";import{a as Ue}from"../chunks/collections.CXwjzRNc.js";async function Le({fetch:i}){await ce(i,"load to cache");const s=await t();async function t(){const n=Array.from({length:Se},(l,c)=>we+c).map(async l=>{const c=await ce(i,l.toString());return c&&c.imageUrl!==null?a(l,c):null});return(await Promise.all(n)).filter(l=>l!==null)}function a(e,n){return{pokeId:e,jaName:n.jaName,imageUrl:n.imageUrl??"not_found",weight:n.weight}}return{pokeItems:s}}const lt=Object.freeze(Object.defineProperty({__proto__:null,load:Le},Symbol.toStringTag,{value:"Module"}));function ze(i,s,t){const{Bodies:a,Composite:e,Constraint:n}=Matter,r=e.create(),l=a.rectangle(t.x,t.y,i,s,{label:"seesawStick",restitution:1,friction:.8,mass:5,render:{fillStyle:"#888888"}}),c=n.create({pointA:{x:t.x,y:t.y},bodyB:l,pointB:{x:0,y:0},stiffness:1,length:0});return e.add(r,l),e.add(r,c),{seesaw:r,seesawStick:l}}function Ie(i,s,t){const a=i.slice();return a[20]=s[t],a}function Ke(i){let s,t;return{c(){s=_("span"),t=L(i[4]),this.h()},l(a){s=v(a,"SPAN",{class:!0});var e=g(s);t=z(e,i[4]),e.forEach(p),this.h()},h(){m(s,"class","text-lg")},m(a,e){Y(a,s,e),o(s,t)},p(a,e){e&16&&Z(t,a[4])},d(a){a&&p(s)}}}function qe(i){let s,t=ge(i[3]),a=[];for(let e=0;e<t.length;e+=1)a[e]=ke(Ie(i,t,e));return{c(){for(let e=0;e<a.length;e+=1)a[e].c();s=fe()},l(e){for(let n=0;n<a.length;n+=1)a[n].l(e);s=fe()},m(e,n){for(let r=0;r<a.length;r+=1)a[r]&&a[r].m(e,n);Y(e,s,n)},p(e,n){if(n&8){t=ge(e[3]);let r;for(r=0;r<t.length;r+=1){const l=Ie(e,t,r);a[r]?a[r].p(l,n):(a[r]=ke(l),a[r].c(),a[r].m(s.parentNode,s))}for(;r<a.length;r+=1)a[r].d(1);a.length=t.length}},d(e){e&&p(s),Ce(a,e)}}}function ke(i){let s,t,a,e=i[20].jaName+"",n,r,l,c,I=ue(i[20].weight,"weight")+"",M,k;return{c(){s=_("div"),t=_("span"),a=L("["),n=L(e),r=L("]"),l=N(),c=_("span"),M=L(I),k=N(),this.h()},l(d){s=v(d,"DIV",{class:!0});var f=g(s);t=v(f,"SPAN",{class:!0});var b=g(t);a=z(b,"["),n=z(b,e),r=z(b,"]"),b.forEach(p),l=T(f),c=v(f,"SPAN",{class:!0});var S=g(c);M=z(S,I),S.forEach(p),k=T(f),f.forEach(p),this.h()},h(){m(t,"class","text-base"),m(c,"class","text-xl bold"),m(s,"class","flex flex-col items-center")},m(d,f){Y(d,s,f),o(s,t),o(t,a),o(t,n),o(t,r),o(s,l),o(s,c),o(c,M),o(s,k)},p(d,f){f&8&&e!==(e=d[20].jaName+"")&&Z(n,e),f&8&&I!==(I=ue(d[20].weight,"weight")+"")&&Z(M,I)},d(d){d&&p(s)}}}function Ge(i){let s,t,a='<h1 class="cTitleStyle">ポケモンおもさくらべ 改</h1>',e,n,r,l,c,I="ポケモン を よびだす",M,k,d,f,b,S,A,V,w,O,B,D,u,R="こたえをみる",j,h,E,x,W,F,U,J,$;b=new be({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),x=new be({props:{icon:"mdi:pokeball",class:"cIconStyle"}});function ee(y,C){return y[2]?qe:Ke}let K=ee(i),P=K(i);return{c(){s=_("div"),t=_("div"),t.innerHTML=a,e=N(),n=_("div"),r=_("div"),l=_("div"),c=_("span"),c.textContent=I,M=N(),k=_("form"),d=_("button"),f=_("div"),me(b.$$.fragment),A=N(),V=_("div"),w=_("div"),O=N(),B=_("div"),D=_("div"),u=_("span"),u.textContent=R,j=N(),h=_("button"),E=_("div"),me(x.$$.fragment),W=N(),F=_("div"),P.c(),this.h()},l(y){s=v(y,"DIV",{class:!0});var C=g(s);t=v(C,"DIV",{class:!0,"data-svelte-h":!0}),Q(t)!=="svelte-ooobby"&&(t.innerHTML=a),e=T(C),n=v(C,"DIV",{class:!0});var H=g(n);r=v(H,"DIV",{class:!0});var te=g(r);l=v(te,"DIV",{class:!0});var q=g(l);c=v(q,"SPAN",{class:!0,"data-svelte-h":!0}),Q(c)!=="svelte-mp7i3f"&&(c.textContent=I),M=T(q),k=v(q,"FORM",{});var se=g(k);d=v(se,"BUTTON",{type:!0,class:!0});var ae=g(d);f=v(ae,"DIV",{class:!0});var ne=g(f);pe(b.$$.fragment,ne),ne.forEach(p),ae.forEach(p),se.forEach(p),q.forEach(p),te.forEach(p),A=T(H),V=v(H,"DIV",{class:!0});var re=g(V);w=v(re,"DIV",{class:!0}),g(w).forEach(p),re.forEach(p),O=T(H),B=v(H,"DIV",{class:!0});var G=g(B);D=v(G,"DIV",{class:!0});var X=g(D);u=v(X,"SPAN",{class:!0,"data-svelte-h":!0}),Q(u)!=="svelte-b801jg"&&(u.textContent=R),j=T(X),h=v(X,"BUTTON",{type:!0,class:!0});var le=g(h);E=v(le,"DIV",{class:!0});var oe=g(E);pe(x.$$.fragment,oe),oe.forEach(p),le.forEach(p),X.forEach(p),W=T(G),F=v(G,"DIV",{class:!0});var ie=g(F);P.l(ie),ie.forEach(p),G.forEach(p),H.forEach(p),C.forEach(p),this.h()},h(){m(t,"class","cTitlePartStyle"),m(c,"class","text-lg"),m(f,"class","cIconDivStyle"),m(d,"type","submit"),d.disabled=S=!i[1],m(d,"class","cIconButtonStyle"),m(l,"class","cInputFormAndMessagePartStyle"),m(r,"class","flex items-center justify-center"),m(w,"class","w-80 h-80 bg-gray-300 border border-black"),m(V,"class","m-4"),m(u,"class","text-lg"),m(E,"class","cIconDivStyle"),m(h,"type","button"),m(h,"class","cIconButtonStyle"),m(D,"class","cInputFormAndMessagePartStyle justify-center"),m(F,"class","cInputFormAndMessagePartStyle justify-center"),m(B,"class","m-4 mt-2 space-y-4"),m(n,"class","cContentPartStyle"),m(s,"class","cRouteBodyStyle")},m(y,C){Y(y,s,C),o(s,t),o(s,e),o(s,n),o(n,r),o(r,l),o(l,c),o(l,M),o(l,k),o(k,d),o(d,f),he(b,f,null),o(n,A),o(n,V),o(V,w),i[8](w),o(n,O),o(n,B),o(B,D),o(D,u),o(D,j),o(D,h),o(h,E),he(x,E,null),o(B,W),o(B,F),P.m(F,null),U=!0,J||($=[de(k,"submit",Ee(i[5])),de(h,"click",i[6])],J=!0)},p(y,[C]){(!U||C&2&&S!==(S=!y[1]))&&(d.disabled=S),K===(K=ee(y))&&P?P.p(y,C):(P.d(1),P=K(y),P&&(P.c(),P.m(F,null)))},i(y){U||(_e(b.$$.fragment,y),_e(x.$$.fragment,y),U=!0)},o(y){ve(b.$$.fragment,y),ve(x.$$.fragment,y),U=!1},d(y){y&&p(s),ye(b),i[8](null),ye(x),P.d(),J=!1,Pe($)}}}let Xe=!1,Ye=2;function Je(i,s,t){let{data:a}=s,e,n,r,l,c,I,M,k,d;Be(async()=>{l=Ne(),c=Te(),I=je(l,e),n=e.clientWidth*.5,r=e.clientHeight*.5,M=Fe(l,I);const u=await Re(e),R=e.clientHeight*.8;({seesaw:k,seesawStick:d}=ze(R,20,{x:n,y:r*1.4}));{Matter.World.add(l.world,u),Matter.World.add(l.world,k),Matter.Runner.run(c,l),Matter.Render.run(I);let j=He(l.world,M,e,{isHolding:Xe});if(!j)return;Object.entries(j).forEach(([h,E])=>{e.addEventListener(h,E)})}}),De(()=>{{Matter.Render.stop(I),Matter.Runner.stop(c),Matter.World.clear(l.world,!1),Matter.Engine.clear(l);return}});let f=!0,b=!1,S=[],A=[];async function V(){t(1,f=!1),t(4,w="じゅんびちゅう..."),B();const u=We(a.pokeItems,"pokeId");t(3,S=Ue(u,Ye));const R=S.map(h=>Oe(h.imageUrl,!1,{x:0,y:0}));(await Promise.all(R)).forEach((h,E)=>{const x=h.bounds,W=x.max.y-x.min.y;Matter.Body.setPosition(h,{x:n+(E===0?-n*.6:n*.6),y:r*.8-W*.5}),Matter.Body.setMass(h,S[E].weight/10),Matter.Body.setStatic(h,!0),Matter.World.add(l.world,[h]),A.push(h)}),await new Promise(h=>setTimeout(h,500)),t(4,w="じゅんび かんりょう！"),t(1,f=!0)}let w="";function O(){if(S.length==0){t(4,w="さきに ポケモンを よびだしてね");return}if(f===!1){t(4,w="じゅんびちゅう...");return}b===!1&&A.forEach(u=>{Matter.Body.setStatic(u,!1),Matter.Body.applyForce(u,u.position,{x:0,y:u.mass*.01}),Matter.Body.setVelocity(u,{x:0,y:0}),Matter.Body.setAngularVelocity(u,0)}),t(2,b=!0)}function B(){t(4,w=""),t(2,b=!1),A.forEach(u=>Matter.World.remove(l.world,u)),A=[],d&&(Matter.Body.setAngle(d,0),Matter.Body.setAngularVelocity(d,0),Matter.Body.setPosition(d,{x:n,y:r*1.5}))}function D(u){xe[u?"unshift":"push"](()=>{e=u,t(0,e)})}return i.$$set=u=>{"data"in u&&t(7,a=u.data)},[e,f,b,S,w,V,O,a,D]}class ot extends Ae{constructor(s){super(),Ve(this,s,Je,Ge,Me,{data:7})}}export{ot as component,lt as universal};
