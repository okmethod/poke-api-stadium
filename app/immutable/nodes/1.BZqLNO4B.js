import{a as s,e as a,t as e,b as r,c as t,d as c,i as n,h as i,f as o,j as u,l,m as d,n as h,o as b,x as p}from"../chunks/scheduler.BlVzsFL4.js";import{S as g,i as m}from"../chunks/index.CSk_aVci.js";import{s as f}from"../chunks/entry.G7VxkoNI.js";const v={subscribe:s=>(()=>{const s=f;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}})().page.subscribe(s)};function x(s){var p;let g,m,f,v,x,j,k=s[0].status+"",E=(null==(p=s[0].error)?void 0:p.message)+"";return{c(){g=a("div"),m=a("div"),f=a("p"),v=e(k),x=r(),j=e(E),this.h()},l(s){g=t(s,"DIV",{class:!0});var a=c(g);m=t(a,"DIV",{class:!0});var e=c(m);f=t(e,"P",{class:!0});var r=c(f);v=n(r,k),x=i(r),j=n(r,E),r.forEach(o),e.forEach(o),a.forEach(o),this.h()},h(){u(f,"class","text-4xl font-bold text-gray-800 leading-loose tracking-wider"),u(m,"class","m-auto text-center"),u(g,"class","flex h-screen")},m(s,a){l(s,g,a),d(g,m),d(m,f),d(f,v),d(f,x),d(f,j)},p(s,[a]){var e;1&a&&k!==(k=s[0].status+"")&&h(v,k),1&a&&E!==(E=(null==(e=s[0].error)?void 0:e.message)+"")&&h(j,E)},i:b,o:b,d(s){s&&o(g)}}}function j(s,a,e){let r;return p(s,v,(s=>e(0,r=s))),[r]}let k=class extends g{constructor(a){super(),m(this,a,j,x,s,{})}};export{k as component};
