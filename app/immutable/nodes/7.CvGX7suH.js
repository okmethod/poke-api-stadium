import{n as a}from"../chunks/navigation.client.CwNl_xeF.js";import{a as t}from"../chunks/collections.4L4Gi_HF.js";import{b as l,c as e}from"../chunks/fetchStaticData.BqbxKkfy.js";import{a as s,G as o}from"../chunks/common.D8PMWOc0.js";import{a as r,e as n,b as i,c,d as u,D as m,h,f as b,j as f,q as d,l as g,m as v,o as p,G as k,t as y,i as N,u as j,E as S,H as x,n as w}from"../chunks/scheduler.DlxO6Kfx.js";import{e as U}from"../chunks/each.D5UHESZ7.js";import{S as I,i as C}from"../chunks/index.DMIAoLi9.js";const D=[{title:"ポケモンずかん",ballName:"poke-ball",action:"navigate",route:"/zukan"},{title:"ポケモンXXくらべ",ballName:"great-ball",action:"navigate",route:"/kurabe"},{title:"ポケモンたかさくらべ改",ballName:"ultra-ball",action:"navigate",route:"/kurabe-h"},{title:"ポケモンおもさくらべ改",ballName:"heavy-ball",action:"navigate",route:"/kurabe-w"},{title:"ポケモンタイプじゃんけん",ballName:"fast-ball",action:"navigate",route:"/janken"},{title:"ポケモンしりとり",ballName:"heal-ball",action:"navigate",route:"/shiritori"},{title:"ポケモンだ〜れだ？",ballName:"dusk-ball",action:"navigate",route:"/dareda"},{title:"ポケモンとりほうだい",ballName:"safari-ball",action:"navigate",route:"/hodai"},{title:"ポケモンえあわせ",ballName:"repeat-ball",action:"navigate",route:"/eawase"},{title:"ポケネーター",ballName:"luxury-ball",action:"redirect",route:s},{title:"ソースコード",ballName:"premier-ball",action:"redirect",route:o}],E=[10080,10081,10082,10083,10084,10085,10094,10095,10096,10097,10098,10099,10148,10158,10160];const P=Object.freeze(Object.defineProperty({__proto__:null,load:async function({fetch:s}){const o=await Promise.all(D.map((a=>l(a.ballName)))),r=D.map(((a,t)=>{var l;return{title:a.title,imageUrl:(null==(l=o[t])?void 0:l.imageUrl)??"not_found",alt:a.ballName,onClick:n(a.action,a.route)}}));function n(t,l){return{navigate:()=>a(l),redirect:()=>window.open(l,"_blank")}[t]||(()=>{})}const i=t(E,1)[0];return{buttonConfigs:r,symbolUrl:(await e(s,i.toString())).gifUrl??"not_found"}}},Symbol.toStringTag,{value:"Module"}));function T(a,t,l){const e=a.slice();return e[1]=t[l],e}function _(a){let t,l,e,s,o,r,m,p,k,U,I=a[1].title+"";return{c(){t=n("div"),l=n("button"),e=n("img"),r=i(),m=n("span"),p=y(I),this.h()},l(a){t=c(a,"DIV",{class:!0});var s=u(t);l=c(s,"BUTTON",{class:!0});var o=u(l);e=c(o,"IMG",{src:!0,alt:!0,class:!0}),r=h(o),m=c(o,"SPAN",{class:!0});var n=u(m);p=N(n,I),n.forEach(b),o.forEach(b),s.forEach(b),this.h()},h(){d(e.src,s=a[1].imageUrl)||f(e,"src",s),f(e,"alt",o=a[1].alt),f(e,"class","w-6 h-6 mr-2"),f(m,"class","cLinkButtonStyle md:!text-2xl"),f(l,"class","flex items-center"),f(t,"class","")},m(s,o){g(s,t,o),v(t,l),v(l,e),v(l,r),v(l,m),v(m,p),k||(U=j(l,"click",S((function(){x(a[1].onClick)&&a[1].onClick.apply(this,arguments)}))),k=!0)},p(t,l){a=t,1&l&&!d(e.src,s=a[1].imageUrl)&&f(e,"src",s),1&l&&o!==(o=a[1].alt)&&f(e,"alt",o),1&l&&I!==(I=a[1].title+"")&&w(p,I)},d(a){a&&b(t),k=!1,U()}}}function M(a){let t,l,e,s,o,r,y,N,j='<h1 class="cTitleStyle md:!text-3xl">PokeAPI スタジアムへようこそ !</h1>',S=U(a[0].buttonConfigs),x=[];for(let n=0;n<S.length;n+=1)x[n]=_(T(a,S,n));return{c(){t=n("div"),l=n("div"),l.innerHTML=j,e=i(),s=n("div");for(let a=0;a<x.length;a+=1)x[a].c();o=i(),r=n("div"),y=n("img"),this.h()},l(a){t=c(a,"DIV",{class:!0});var n=u(t);l=c(n,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-1jhip1"!==m(l)&&(l.innerHTML=j),e=h(n),s=c(n,"DIV",{class:!0});var i=u(s);for(let t=0;t<x.length;t+=1)x[t].l(i);o=h(i),r=c(i,"DIV",{class:!0});var f=u(r);y=c(f,"IMG",{src:!0,alt:!0,class:!0}),f.forEach(b),i.forEach(b),n.forEach(b),this.h()},h(){f(l,"class","cTitlePartStyle md:!mb-4"),d(y.src,N=a[0].symbolUrl)||f(y,"src",N),f(y,"alt","symbol"),f(y,"class","w-full h-full object-contain"),f(r,"class","absolute -bottom-1 -right-14 w-20 h-20"),f(s,"class","cContentPartStyle !mt-4 !relative"),f(t,"class","cRouteBodyStyle")},m(a,n){g(a,t,n),v(t,l),v(t,e),v(t,s);for(let t=0;t<x.length;t+=1)x[t]&&x[t].m(s,null);v(s,o),v(s,r),v(r,y)},p(a,[t]){if(1&t){let l;for(S=U(a[0].buttonConfigs),l=0;l<S.length;l+=1){const e=T(a,S,l);x[l]?x[l].p(e,t):(x[l]=_(e),x[l].c(),x[l].m(s,o))}for(;l<x.length;l+=1)x[l].d(1);x.length=S.length}1&t&&!d(y.src,N=a[0].symbolUrl)&&f(y,"src",N)},i:p,o:p,d(a){a&&b(t),k(x,a)}}}function V(a,t,l){let{data:e}=t;return a.$$set=a=>{"data"in a&&l(0,e=a.data)},[e]}class G extends I{constructor(a){super(),C(this,a,V,M,r,{data:0})}}export{G as component,P as universal};
