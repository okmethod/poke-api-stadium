import{g as a,i as t}from"../chunks/transitions.kznzKyZs.js";import{b as e}from"../chunks/fetchStaticData.BdrNxkR4.js";import{a as l,G as s}from"../chunks/common.D9akoRAZ.js";import{s as r,e as n,a as c,c as o,b as i,D as m,f as b,g as y,h as g,i as u,j as h,n as d,F as p,t as f,d as k,r as v,G as S,k as x,p as j}from"../chunks/scheduler.bui552vp.js";import{e as w}from"../chunks/each.DJOpqiLE.js";import{S as T,i as D}from"../chunks/index.4QmalfrF.js";const I=[{label:"ポケモンずかん",symbolSrc:{type:"image",key:"poke-ball"},action:"navigate",target:"/zukan"},{label:"ポケモンXXくらべ",symbolSrc:{type:"image",key:"great-ball"},action:"navigate",target:"/kurabe"},{label:"ポケモンたかさくらべ 改",symbolSrc:{type:"image",key:"ultra-ball"},action:"navigate",target:"/kurabe-h"},{label:"ポケモンおもさくらべ 改",symbolSrc:{type:"image",key:"heavy-ball"},action:"navigate",target:"/kurabe-w"},{label:"ポケモンタイプじゃんけん",symbolSrc:{type:"image",key:"fast-ball"},action:"navigate",target:"/janken"},{label:"ポケモンしりとり",symbolSrc:{type:"image",key:"heal-ball"},action:"navigate",target:"/shiritori"},{label:"ポケモンだ〜れだ？",symbolSrc:{type:"image",key:"dusk-ball"},action:"navigate",target:"/dareda"},{label:"ポケモンだ〜れだ？ 改",symbolSrc:{type:"image",key:"luxury-ball"},action:"redirect",target:`${l}/dareda`},{label:"ポケモンとりほうだい",symbolSrc:{type:"image",key:"safari-ball"},action:"navigate",target:"/hodai"},{label:"ポケモンえあわせ",symbolSrc:{type:"image",key:"repeat-ball"},action:"navigate",target:"/eawase"},{label:"ポケネイター",symbolSrc:{type:"image",key:"luxury-ball"},action:"redirect",target:l},{label:"しさくひん",symbolSrc:{type:"image",key:"premier-ball"},action:"navigate",target:"/prototype"},{label:"ソースコード",symbolSrc:{type:"image",key:"master-ball"},action:"redirectNewTab",target:s}];const P=Object.freeze(Object.defineProperty({__proto__:null,load:async function(){const t=await Promise.all(I.map((a=>a.symbolSrc&&a.symbolSrc.key?e(a.symbolSrc.key):null))),l=I.reduce(((a,e,l)=>(e.symbolSrc&&e.symbolSrc.key&&null!==t[l]&&(a[e.symbolSrc.key]=t[l].imageUrl),a)),{});return{buttonConfigs:a(I,l)}}},Symbol.toStringTag,{value:"Module"}));function C(a,t,e){const l=a.slice();return l[1]=t[e],l}function E(a){let t,e,l;return{c(){t=n("img"),this.h()},l(a){t=o(a,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){j(t.src,e=a[1].symbol.src)||g(t,"src",e),g(t,"alt",l=a[1].symbol.alt),g(t,"class","w-full h-full")},m(a,e){u(a,t,e)},p(a,s){1&s&&!j(t.src,e=a[1].symbol.src)&&g(t,"src",e),1&s&&l!==(l=a[1].symbol.alt)&&g(t,"alt",l)},d(a){a&&y(t)}}}function V(a){return{c:d,l:d,m:d,p:d,d:d}}function M(a){let e,l,s,r,m,d,p,j,w,T=a[1].label+"";function D(a,e){return 1&e&&(s=null),null===a[1].symbol?V:(null==s&&(s=!!t(a[1].symbol)),s?E:void 0)}let I=D(a,-1),P=I&&I(a);return{c(){e=n("button"),l=n("div"),P&&P.c(),r=c(),m=n("span"),d=f(T),p=c(),this.h()},l(a){e=o(a,"BUTTON",{type:!0,class:!0});var t=i(e);l=o(t,"DIV",{class:!0});var s=i(l);P&&P.l(s),s.forEach(y),r=b(t),m=o(t,"SPAN",{class:!0});var n=i(m);d=k(n,T),n.forEach(y),p=b(t),t.forEach(y),this.h()},h(){g(l,"class","w-6 h-6 mr-1"),g(m,"class","hover:underline text-left text-sm xs:text-xl md:text-2xl w-64 md:w-72"),g(e,"type","button"),g(e,"class","btn variant-ghost flex items-center")},m(t,s){u(t,e,s),h(e,l),P&&P.m(l,null),h(e,r),h(e,m),h(m,d),h(e,p),j||(w=v(e,"click",(function(){S(a[1].onClick)&&a[1].onClick.apply(this,arguments)})),j=!0)},p(t,e){I===(I=D(a=t,e))&&P?P.p(a,e):(P&&P.d(1),P=I&&I(a),P&&(P.c(),P.m(l,null))),1&e&&T!==(T=a[1].label+"")&&x(d,T)},d(a){a&&y(e),P&&P.d(),j=!1,w()}}}function _(a){let t,e,l,s,r,f='<h1 class="cTitleStyle md:!text-3xl"><span class="block xs:inline">PokeAPI スタジアム</span> <span class="block text-right xs:inline">へようこそ !</span></h1>',k=w(a[0].buttonConfigs),v=[];for(let n=0;n<k.length;n+=1)v[n]=M(C(a,k,n));return{c(){t=n("div"),e=n("div"),e.innerHTML=f,l=c(),s=n("div"),r=n("div");for(let a=0;a<v.length;a+=1)v[a].c();this.h()},l(a){t=o(a,"DIV",{class:!0});var n=i(t);e=o(n,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-1nhdgdk"!==m(e)&&(e.innerHTML=f),l=b(n),s=o(n,"DIV",{class:!0});var c=i(s);r=o(c,"DIV",{class:!0});var g=i(r);for(let t=0;t<v.length;t+=1)v[t].l(g);g.forEach(y),c.forEach(y),n.forEach(y),this.h()},h(){g(e,"class","cTitlePartStyle !m-0 !mt-2 !mb-2 md:!mt-4 md:!mb-4"),g(r,"class","grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"),g(s,"class","cContentPartStyle !mt-4"),g(t,"class","cRouteBodyStyle")},m(a,n){u(a,t,n),h(t,e),h(t,l),h(t,s),h(s,r);for(let t=0;t<v.length;t+=1)v[t]&&v[t].m(r,null)},p(a,[t]){if(1&t){let e;for(k=w(a[0].buttonConfigs),e=0;e<k.length;e+=1){const l=C(a,k,e);v[e]?v[e].p(l,t):(v[e]=M(l),v[e].c(),v[e].m(r,null))}for(;e<v.length;e+=1)v[e].d(1);v.length=k.length}},i:d,o:d,d(a){a&&y(t),p(v,a)}}}function G(a,t,e){let{data:l}=t;return a.$$set=a=>{"data"in a&&e(0,l=a.data)},[l]}class N extends T{constructor(a){super(),D(this,a,G,_,r,{data:0})}}export{N as component,P as universal};
