import{g as a,i as t}from"../chunks/transitions.CtWEuE2H.js";import{b as l}from"../chunks/fetchStaticData.D_5_gbJl.js";import{a as e,G as s}from"../chunks/common.D9akoRAZ.js";import{s as r,e as n,a as c,c as o,b as i,D as m,f as b,g as y,h as g,i as u,j as h,n as d,F as p,t as f,d as k,r as v,G as S,k as x,p as j}from"../chunks/scheduler.bui552vp.js";import{e as w}from"../chunks/each.DJOpqiLE.js";import{S as T,i as D}from"../chunks/index.4QmalfrF.js";const I=[{label:"ポケモンずかん",symbolSrc:{type:"image",key:"poke-ball"},action:"navigate",target:"/zukan"},{label:"ポケモンXXくらべ",symbolSrc:{type:"image",key:"great-ball"},action:"navigate",target:"/kurabe"},{label:"ポケモンたかさくらべ 改",symbolSrc:{type:"image",key:"ultra-ball"},action:"navigate",target:"/kurabe-h"},{label:"ポケモンおもさくらべ 改",symbolSrc:{type:"image",key:"heavy-ball"},action:"navigate",target:"/kurabe-w"},{label:"ポケモンタイプじゃんけん",symbolSrc:{type:"image",key:"fast-ball"},action:"navigate",target:"/janken"},{label:"ポケモンしりとり",symbolSrc:{type:"image",key:"heal-ball"},action:"navigate",target:"/shiritori"},{label:"ポケモンだ〜れだ？",symbolSrc:{type:"image",key:"dusk-ball"},action:"navigate",target:"/dareda"},{label:"ポケモンだ〜れだ？ 改",symbolSrc:{type:"image",key:"luxury-ball"},action:"redirect",target:`${e}/dareda`},{label:"ポケモンとりほうだい",symbolSrc:{type:"image",key:"safari-ball"},action:"navigate",target:"/hodai"},{label:"ポケモンえあわせ",symbolSrc:{type:"image",key:"repeat-ball"},action:"navigate",target:"/eawase"},{label:"ポケネイター",symbolSrc:{type:"image",key:"luxury-ball"},action:"redirect",target:e},{label:"しさくひん",symbolSrc:{type:"image",key:"premier-ball"},action:"navigate",target:"/prototype"},{label:"ソースコード",symbolSrc:{type:"image",key:"master-ball"},action:"redirectNewTab",target:s}];const P=Object.freeze(Object.defineProperty({__proto__:null,load:async function(){const t=await Promise.all(I.map((a=>a.symbolSrc&&a.symbolSrc.key?l(a.symbolSrc.key):null))),e=I.reduce(((a,l,e)=>(l.symbolSrc&&l.symbolSrc.key&&null!==t[e]&&(a[l.symbolSrc.key]=t[e].imageUrl),a)),{});return{buttonConfigs:a(I,e)}}},Symbol.toStringTag,{value:"Module"}));function C(a,t,l){const e=a.slice();return e[1]=t[l],e}function E(a){let t,l,e;return{c(){t=n("img"),this.h()},l(a){t=o(a,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){j(t.src,l=a[1].symbol.src)||g(t,"src",l),g(t,"alt",e=a[1].symbol.alt),g(t,"class","w-full h-full")},m(a,l){u(a,t,l)},p(a,s){1&s&&!j(t.src,l=a[1].symbol.src)&&g(t,"src",l),1&s&&e!==(e=a[1].symbol.alt)&&g(t,"alt",e)},d(a){a&&y(t)}}}function V(a){return{c:d,l:d,m:d,p:d,d:d}}function M(a){let l,e,s,r,m,d,p,j,w,T=a[1].label+"";function D(a,l){return 1&l&&(s=null),null===a[1].symbol?V:(null==s&&(s=!!t(a[1].symbol)),s?E:void 0)}let I=D(a,-1),P=I&&I(a);return{c(){l=n("button"),e=n("div"),P&&P.c(),r=c(),m=n("span"),d=f(T),p=c(),this.h()},l(a){l=o(a,"BUTTON",{type:!0,class:!0});var t=i(l);e=o(t,"DIV",{class:!0});var s=i(e);P&&P.l(s),s.forEach(y),r=b(t),m=o(t,"SPAN",{class:!0});var n=i(m);d=k(n,T),n.forEach(y),p=b(t),t.forEach(y),this.h()},h(){g(e,"class","w-6 h-6 mr-1"),g(m,"class","hover:underline text-left text-xl md:text-2xl w-64 md:w-72"),g(l,"type","button"),g(l,"class","btn variant-ghost flex items-center")},m(t,s){u(t,l,s),h(l,e),P&&P.m(e,null),h(l,r),h(l,m),h(m,d),h(l,p),j||(w=v(l,"click",(function(){S(a[1].onClick)&&a[1].onClick.apply(this,arguments)})),j=!0)},p(t,l){I===(I=D(a=t,l))&&P?P.p(a,l):(P&&P.d(1),P=I&&I(a),P&&(P.c(),P.m(e,null))),1&l&&T!==(T=a[1].label+"")&&x(d,T)},d(a){a&&y(l),P&&P.d(),j=!1,w()}}}function _(a){let t,l,e,s,r,f='<h1 class="cTitleStyle md:!text-3xl"><span class="block xs:inline">PokeAPI スタジアム</span> <span class="block text-right xs:inline">へようこそ !</span></h1>',k=w(a[0].buttonConfigs),v=[];for(let n=0;n<k.length;n+=1)v[n]=M(C(a,k,n));return{c(){t=n("div"),l=n("div"),l.innerHTML=f,e=c(),s=n("div"),r=n("div");for(let a=0;a<v.length;a+=1)v[a].c();this.h()},l(a){t=o(a,"DIV",{class:!0});var n=i(t);l=o(n,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-1nhdgdk"!==m(l)&&(l.innerHTML=f),e=b(n),s=o(n,"DIV",{class:!0});var c=i(s);r=o(c,"DIV",{class:!0});var g=i(r);for(let t=0;t<v.length;t+=1)v[t].l(g);g.forEach(y),c.forEach(y),n.forEach(y),this.h()},h(){g(l,"class","cTitlePartStyle !m-0 !mt-2 !mb-2 md:!mt-4 md:!mb-4"),g(r,"class","grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"),g(s,"class","cContentPartStyle !mt-4"),g(t,"class","cRouteBodyStyle")},m(a,n){u(a,t,n),h(t,l),h(t,e),h(t,s),h(s,r);for(let t=0;t<v.length;t+=1)v[t]&&v[t].m(r,null)},p(a,[t]){if(1&t){let l;for(k=w(a[0].buttonConfigs),l=0;l<k.length;l+=1){const e=C(a,k,l);v[l]?v[l].p(e,t):(v[l]=M(e),v[l].c(),v[l].m(r,null))}for(;l<v.length;l+=1)v[l].d(1);v.length=k.length}},i:d,o:d,d(a){a&&y(t),p(v,a)}}}function G(a,t,l){let{data:e}=t;return a.$$set=a=>{"data"in a&&l(0,e=a.data)},[e]}class N extends T{constructor(a){super(),D(this,a,G,_,r,{data:0})}}export{N as component,P as universal};
