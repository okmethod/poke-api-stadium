import{g as t}from"../chunks/transitions.D5OEvhEh.js";import{b as a}from"../chunks/fetchStaticData.9PMlZd1J.js";import{M as s}from"../chunks/common.D3vKClQu.js";import{a as l,e,b as n,c as r,d as c,D as o,h as i,f as m,j as h,l as u,m as f,o as d,G as p,t as g,i as v,q as b,u as k,E as y,H as S,n as j}from"../chunks/scheduler.L2H8yLnq.js";import{e as x}from"../chunks/each.CpfqQuVK.js";import{S as T,i as C}from"../chunks/index.JYZId_L6.js";const D=[{title:"2D物理エンジン",ballName:"premier-ball",action:"redirectNewTab",route:s}];const E=Object.freeze(Object.defineProperty({__proto__:null,load:async function(){const s=await Promise.all(D.map((t=>a(t.ballName))));return{buttonConfigs:D.map(((a,l)=>{var e;return{title:a.title,imageUrl:(null==(e=s[l])?void 0:e.imageUrl)??"not_found",alt:a.ballName,onClick:t(a.action,a.route)}}))}}},Symbol.toStringTag,{value:"Module"}));function N(t,a,s){const l=t.slice();return l[1]=a[s],l}function I(t){let a,s,l,o,d,p,x,T,C,D,E,N=t[1].title+"";return{c(){a=e("div"),s=e("button"),l=e("img"),p=n(),x=e("span"),T=g(N),C=n(),this.h()},l(t){a=r(t,"DIV",{class:!0});var e=c(a);s=r(e,"BUTTON",{class:!0});var n=c(s);l=r(n,"IMG",{src:!0,alt:!0,class:!0}),p=i(n),x=r(n,"SPAN",{class:!0});var o=c(x);T=v(o,N),o.forEach(m),n.forEach(m),C=i(e),e.forEach(m),this.h()},h(){b(l.src,o=t[1].imageUrl)||h(l,"src",o),h(l,"alt",d=t[1].alt),h(l,"class","w-6 h-6 mr-2"),h(x,"class","cLinkButtonStyle md:!text-2xl"),h(s,"class","flex items-center"),h(a,"class","")},m(e,n){u(e,a,n),f(a,s),f(s,l),f(s,p),f(s,x),f(x,T),f(a,C),D||(E=k(s,"click",y((function(){S(t[1].onClick)&&t[1].onClick.apply(this,arguments)}))),D=!0)},p(a,s){t=a,1&s&&!b(l.src,o=t[1].imageUrl)&&h(l,"src",o),1&s&&d!==(d=t[1].alt)&&h(l,"alt",d),1&s&&N!==(N=t[1].title+"")&&j(T,N)},d(t){t&&m(a),D=!1,E()}}}function M(t){let a,s,l,g,v='<h1 class="cTitleStyle md:!text-3xl">しさくひん</h1>',b=x(t[0].buttonConfigs),k=[];for(let e=0;e<b.length;e+=1)k[e]=I(N(t,b,e));return{c(){a=e("div"),s=e("div"),s.innerHTML=v,l=n(),g=e("div");for(let t=0;t<k.length;t+=1)k[t].c();this.h()},l(t){a=r(t,"DIV",{class:!0});var e=c(a);s=r(e,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-vqrq47"!==o(s)&&(s.innerHTML=v),l=i(e),g=r(e,"DIV",{class:!0});var n=c(g);for(let a=0;a<k.length;a+=1)k[a].l(n);n.forEach(m),e.forEach(m),this.h()},h(){h(s,"class","cTitlePartStyle md:!mb-4"),h(g,"class","cContentPartStyle !mt-4 !relative"),h(a,"class","cRouteBodyStyle")},m(t,e){u(t,a,e),f(a,s),f(a,l),f(a,g);for(let a=0;a<k.length;a+=1)k[a]&&k[a].m(g,null)},p(t,[a]){if(1&a){let s;for(b=x(t[0].buttonConfigs),s=0;s<b.length;s+=1){const l=N(t,b,s);k[s]?k[s].p(l,a):(k[s]=I(l),k[s].c(),k[s].m(g,null))}for(;s<k.length;s+=1)k[s].d(1);k.length=b.length}},i:d,o:d,d(t){t&&m(a),p(k,t)}}}function P(t,a,s){let{data:l}=a;return t.$$set=t=>{"data"in t&&s(0,l=t.data)},[l]}class U extends T{constructor(t){super(),C(this,t,P,M,l,{data:0})}}export{U as component,E as universal};
