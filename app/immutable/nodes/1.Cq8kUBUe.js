import{s as q,e as f,m as x,a as y,c as g,b as h,n as E,d as D,f as m,h as _,i as I,j as l,o as $,q as S,u as V}from"../chunks/scheduler.Du92bOLs.js";import{S as j,i as k}from"../chunks/index.BE2YmAfd.js";import{s as w}from"../chunks/entry.DYuUwrvJ.js";const C=()=>{const e=w;return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},updated:e.updated}},P={subscribe(e){return C().page.subscribe(e)}};function z(e){var v;let s,a,t,o=e[0].status+"",u,b,i=((v=e[0].error)==null?void 0:v.message)+"",p;return{c(){s=f("div"),a=f("div"),t=f("p"),u=x(o),b=y(),p=x(i),this.h()},l(r){s=g(r,"DIV",{class:!0});var n=h(s);a=g(n,"DIV",{class:!0});var c=h(a);t=g(c,"P",{class:!0});var d=h(t);u=E(d,o),b=D(d),p=E(d,i),d.forEach(m),c.forEach(m),n.forEach(m),this.h()},h(){_(t,"class","text-4xl font-bold text-gray-800 leading-loose tracking-wider"),_(a,"class","m-auto text-center"),_(s,"class","flex h-screen")},m(r,n){I(r,s,n),l(s,a),l(a,t),l(t,u),l(t,b),l(t,p)},p(r,[n]){var c;n&1&&o!==(o=r[0].status+"")&&$(u,o),n&1&&i!==(i=((c=r[0].error)==null?void 0:c.message)+"")&&$(p,i)},i:S,o:S,d(r){r&&m(s)}}}function A(e,s,a){let t;return V(e,P,o=>a(0,t=o)),[t]}let H=class extends j{constructor(s){super(),k(this,s,A,z,q,{})}};export{H as component};
