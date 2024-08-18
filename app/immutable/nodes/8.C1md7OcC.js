import{c as ce,d as ue}from"../chunks/numerics.CBh2V9Uf.js";import{P as Ee,F as be}from"../chunks/common.3e1mQu3z.js";import{a as Pe,e as h,b as C,c as _,d as g,y as Q,h as N,f as p,j as m,l as X,m as i,u as de,A as Me,v as De,C as we,D as Be,E as Ve,t as U,i as W,n as Z,p as fe,z as xe}from"../chunks/scheduler.D16oZ6cK.js";import{S as Ae,i as Ce,b as me,d as pe,m as he,a as _e,t as ve,e as ge}from"../chunks/index.BWx_jO9Z.js";import{e as ye}from"../chunks/each.CeXzaOas.js";import{I as Ie}from"../chunks/Icon.HXW41lnT.js";import{i as Ne,a as Te,b as je,c as Re,d as Fe,e as Oe,f as He}from"../chunks/createPokeBody.B3WQ_gmC.js";import{f as ze}from"../chunks/generation.C4JV6S5l.js";import{a as Ue}from"../chunks/collections.CXwjzRNc.js";async function We({fetch:c}){await ce(c,"load to cache");const s=await t();async function t(){const r=Array.from({length:Ee},(o,u)=>be+u).map(async o=>{const u=await ce(c,o.toString());return u&&u.imageUrl!==null?a(o,u):null});return(await Promise.all(r)).filter(o=>o!==null)}function a(e,r){return{pokeId:e,jaName:r.jaName,imageUrl:r.imageUrl??"not_found",height:r.height}}return{pokeItems:s}}const nt=Object.freeze(Object.defineProperty({__proto__:null,load:We},Symbol.toStringTag,{value:"Module"}));function Se(c,s,t){const a=c.slice();return a[18]=s[t],a}function Le(c){let s,t;return{c(){s=h("span"),t=U(c[4]),this.h()},l(a){s=_(a,"SPAN",{class:!0});var e=g(s);t=W(e,c[4]),e.forEach(p),this.h()},h(){m(s,"class","text-lg")},m(a,e){X(a,s,e),i(s,t)},p(a,e){e&16&&Z(t,a[4])},d(a){a&&p(s)}}}function qe(c){let s,t=ye(c[3]),a=[];for(let e=0;e<t.length;e+=1)a[e]=ke(Se(c,t,e));return{c(){for(let e=0;e<a.length;e+=1)a[e].c();s=fe()},l(e){for(let r=0;r<a.length;r+=1)a[r].l(e);s=fe()},m(e,r){for(let l=0;l<a.length;l+=1)a[l]&&a[l].m(e,r);X(e,s,r)},p(e,r){if(r&8){t=ye(e[3]);let l;for(l=0;l<t.length;l+=1){const o=Se(e,t,l);a[l]?a[l].p(o,r):(a[l]=ke(o),a[l].c(),a[l].m(s.parentNode,s))}for(;l<a.length;l+=1)a[l].d(1);a.length=t.length}},d(e){e&&p(s),xe(a,e)}}}function ke(c){let s,t,a,e=c[18].jaName+"",r,l,o,u,E=ue(c[18].height,"height")+"",P,I;return{c(){s=h("div"),t=h("span"),a=U("["),r=U(e),l=U("]"),o=C(),u=h("span"),P=U(E),I=C(),this.h()},l(d){s=_(d,"DIV",{class:!0});var f=g(s);t=_(f,"SPAN",{class:!0});var y=g(t);a=W(y,"["),r=W(y,e),l=W(y,"]"),y.forEach(p),o=N(f),u=_(f,"SPAN",{class:!0});var B=g(u);P=W(B,E),B.forEach(p),I=N(f),f.forEach(p),this.h()},h(){m(t,"class","text-base"),m(u,"class","text-xl bold"),m(s,"class","flex flex-col items-center")},m(d,f){X(d,s,f),i(s,t),i(t,a),i(t,r),i(t,l),i(s,o),i(s,u),i(u,P),i(s,I)},p(d,f){f&8&&e!==(e=d[18].jaName+"")&&Z(r,e),f&8&&E!==(E=ue(d[18].height,"height")+"")&&Z(P,E)},d(d){d&&p(s)}}}function Ke(c){let s,t,a='<h1 class="cTitleStyle">ポケモンたかさくらべ 改</h1>',e,r,l,o,u,E="ポケモン を よびだす",P,I,d,f,y,B,D,x,A,O,n,S,k,b="こたえをみる",H,V,R,T,Y,j,z,J,$;y=new Ie({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),T=new Ie({props:{icon:"mdi:pokeball",class:"cIconStyle"}});function ee(v,w){return v[2]?qe:Le}let L=ee(c),M=L(c);return{c(){s=h("div"),t=h("div"),t.innerHTML=a,e=C(),r=h("div"),l=h("div"),o=h("div"),u=h("span"),u.textContent=E,P=C(),I=h("form"),d=h("button"),f=h("div"),me(y.$$.fragment),D=C(),x=h("div"),A=h("div"),O=C(),n=h("div"),S=h("div"),k=h("span"),k.textContent=b,H=C(),V=h("button"),R=h("div"),me(T.$$.fragment),Y=C(),j=h("div"),M.c(),this.h()},l(v){s=_(v,"DIV",{class:!0});var w=g(s);t=_(w,"DIV",{class:!0,"data-svelte-h":!0}),Q(t)!=="svelte-eaqgzc"&&(t.innerHTML=a),e=N(w),r=_(w,"DIV",{class:!0});var F=g(r);l=_(F,"DIV",{class:!0});var te=g(l);o=_(te,"DIV",{class:!0});var q=g(o);u=_(q,"SPAN",{class:!0,"data-svelte-h":!0}),Q(u)!=="svelte-mp7i3f"&&(u.textContent=E),P=N(q),I=_(q,"FORM",{});var se=g(I);d=_(se,"BUTTON",{type:!0,class:!0});var ae=g(d);f=_(ae,"DIV",{class:!0});var re=g(f);pe(y.$$.fragment,re),re.forEach(p),ae.forEach(p),se.forEach(p),q.forEach(p),te.forEach(p),D=N(F),x=_(F,"DIV",{class:!0});var ne=g(x);A=_(ne,"DIV",{class:!0}),g(A).forEach(p),ne.forEach(p),O=N(F),n=_(F,"DIV",{class:!0});var K=g(n);S=_(K,"DIV",{class:!0});var G=g(S);k=_(G,"SPAN",{class:!0,"data-svelte-h":!0}),Q(k)!=="svelte-b801jg"&&(k.textContent=b),H=N(G),V=_(G,"BUTTON",{type:!0,class:!0});var le=g(V);R=_(le,"DIV",{class:!0});var oe=g(R);pe(T.$$.fragment,oe),oe.forEach(p),le.forEach(p),G.forEach(p),Y=N(K),j=_(K,"DIV",{class:!0});var ie=g(j);M.l(ie),ie.forEach(p),K.forEach(p),F.forEach(p),w.forEach(p),this.h()},h(){m(t,"class","cTitlePartStyle"),m(u,"class","text-lg"),m(f,"class","cIconDivStyle"),m(d,"type","submit"),d.disabled=B=!c[1],m(d,"class","cIconButtonStyle"),m(o,"class","cInputFormAndMessagePartStyle"),m(l,"class","flex items-center justify-center"),m(A,"class","w-80 h-80 bg-gray-300 border border-black"),m(x,"class","m-4"),m(k,"class","text-lg"),m(R,"class","cIconDivStyle"),m(V,"type","button"),m(V,"class","cIconButtonStyle"),m(S,"class","cInputFormAndMessagePartStyle justify-center"),m(j,"class","cInputFormAndMessagePartStyle justify-center"),m(n,"class","m-4 mt-2 space-y-4"),m(r,"class","cContentPartStyle"),m(s,"class","cRouteBodyStyle")},m(v,w){X(v,s,w),i(s,t),i(s,e),i(s,r),i(r,l),i(l,o),i(o,u),i(o,P),i(o,I),i(I,d),i(d,f),he(y,f,null),i(r,D),i(r,x),i(x,A),c[8](A),i(r,O),i(r,n),i(n,S),i(S,k),i(S,H),i(S,V),i(V,R),he(T,R,null),i(n,Y),i(n,j),M.m(j,null),z=!0,J||($=[de(I,"submit",Me(c[5])),de(V,"click",c[6])],J=!0)},p(v,[w]){(!z||w&2&&B!==(B=!v[1]))&&(d.disabled=B),L===(L=ee(v))&&M?M.p(v,w):(M.d(1),M=L(v),M&&(M.c(),M.m(j,null)))},i(v){z||(_e(y.$$.fragment,v),_e(T.$$.fragment,v),z=!0)},o(v){ve(y.$$.fragment,v),ve(T.$$.fragment,v),z=!1},d(v){v&&p(s),ge(y),c[8](null),ge(T),M.d(),J=!1,De($)}}}let Ge=!1,Xe=3;function Ye(c,s,t){let{data:a}=s,e,r,l,o,u,E,P;we(async()=>{o=Ne(),u=Te(),E=je(o,e),r=e.clientWidth*.5,l=e.clientHeight*.5,P=Re(o,E);const n=await Fe(e);{Matter.World.add(o.world,n),Matter.Runner.run(u,o),Matter.Render.run(E);let S=Oe(o.world,P,e,{isHolding:Ge});if(!S)return;Object.entries(S).forEach(([k,b])=>{e.addEventListener(k,b)})}}),Be(()=>{{Matter.Render.stop(E),Matter.Runner.stop(u),Matter.World.clear(o.world,!1),Matter.Engine.clear(o);return}});let I=!0,d=!1,f=[],y=[];async function B(){t(1,I=!1),t(4,D="じゅんびちゅう..."),A();const n=ze(a.pokeItems,"pokeId");t(3,f=Ue(n,Xe));const S=f.map((b,H)=>He(b.imageUrl,100,{x:r+r*.6*(H-1),y:l*1.5}));(await Promise.all(S)).forEach(b=>{Matter.Body.setStatic(b,!0),Matter.World.add(o.world,[b]),y.push(b)}),await new Promise(b=>setTimeout(b,500)),t(4,D="じゅんび かんりょう！"),t(1,I=!0)}let D="";function x(){if(f.length==0){t(4,D="さきに ポケモンを よびだしてね");return}if(I===!1){t(4,D="じゅんびちゅう...");return}d===!1&&y.forEach((n,S)=>{const k=f[S].height/10;Matter.Body.scale(n,k,k),n.render.sprite&&(n.render.sprite.xScale=n.render.sprite.xScale*k,n.render.sprite.yScale=n.render.sprite.yScale*k),Matter.Body.setStatic(n,!1),Matter.Body.applyForce(n,n.position,{x:0,y:-n.mass*.02}),Matter.Body.setVelocity(n,{x:0,y:0}),Matter.Body.setAngularVelocity(n,0)}),t(2,d=!0)}function A(){t(4,D=""),t(2,d=!1),y.forEach(n=>Matter.World.remove(o.world,n)),y=[]}function O(n){Ve[n?"unshift":"push"](()=>{e=n,t(0,e)})}return c.$$set=n=>{"data"in n&&t(7,a=n.data)},[e,I,d,f,D,B,x,a,O]}class lt extends Ae{constructor(s){super(),Ce(this,s,Ye,Ke,Pe,{data:7})}}export{lt as component,nt as universal};
