import{w as e,r as t}from"./index.BoyZvVsf.js";import{G as n}from"./scheduler.BlZZSZ7p.js";const s={};function r(e){return"local"===e?localStorage:sessionStorage}function o(t,o,a){const c=JSON,i="local";function d(e,t){r(i).setItem(e,c.stringify(t))}if(!s[t]){const a=e(o,(e=>{const n=r(i).getItem(t);n&&e(c.parse(n));{const n=n=>{n.key===t&&e(n.newValue?c.parse(n.newValue):null)};return window.addEventListener("storage",n),()=>window.removeEventListener("storage",n)}})),{subscribe:u,set:m}=a;s[t]={set(e){d(t,e),m(e)},update(e){const s=e(n(a));d(t,s),m(s)},subscribe:u}}return s[t]}o("modeOsPrefers",!1),o("modeUserPrefers",void 0),o("modeCurrent",!1);const a="(prefers-reduced-motion: reduce)";const c=t(window.matchMedia(a).matches,(e=>{{const t=t=>{e(t.matches)},n=window.matchMedia(a);return n.addEventListener("change",t),()=>{n.removeEventListener("change",t)}}}));export{c as p};
