import{w as S,r as M}from"./index.CqkERTz3.js";import{J as v,K as E,L}from"./scheduler.BwsJB9cj.js";const h="modalStore";function _(){const e=v(h);if(!e)throw new Error("modalStore is not initialized. Please ensure that `initializeStores()` is invoked in the root layout file of this app!");return e}function x(){const e=b();return E(h,e)}function b(){const{subscribe:e,set:o,update:r}=S([]);return{subscribe:e,set:o,update:r,trigger:t=>r(s=>(s.push(t),s)),close:()=>r(t=>(t.length>0&&t.shift(),t)),clear:()=>o([])}}const u={};function p(e){return e==="local"?localStorage:sessionStorage}function l(e,o,r){const t=JSON,s="local";function f(a,c){p(s).setItem(a,t.stringify(c))}if(!u[e]){const a=S(o,n=>{const i=p(s).getItem(e);i&&n(t.parse(i));{const m=d=>{d.key===e&&n(d.newValue?t.parse(d.newValue):null)};return window.addEventListener("storage",m),()=>window.removeEventListener("storage",m)}}),{subscribe:c,set:g}=a;u[e]={set(n){f(e,n),g(n)},update(n){const i=n(L(a));f(e,i),g(i)},subscribe:c}}return u[e]}l("modeOsPrefers",!1);l("modeUserPrefers",void 0);l("modeCurrent",!1);const w="(prefers-reduced-motion: reduce)";function z(){return window.matchMedia(w).matches}const C=M(z(),e=>{{const o=t=>{e(t.matches)},r=window.matchMedia(w);return r.addEventListener("change",o),()=>{r.removeEventListener("change",o)}}});export{_ as g,x as i,C as p};
