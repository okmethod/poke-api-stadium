import{n,s as t}from"./scheduler.BlZZSZ7p.js";const e=[];function s(n,t){return{subscribe:o(n,t).subscribe}}function o(s,o=n){let r;const u=new Set;function c(n){if(t(s,n)&&(s=n,r)){const n=!e.length;for(const t of u)t[1](),e.push(t,s);if(n){for(let n=0;n<e.length;n+=2)e[n][0](e[n+1]);e.length=0}}}function i(n){c(n(s))}return{set:c,update:i,subscribe:function(t,e=n){const f=[t,e];return u.add(f),1===u.size&&(r=o(c,i)||n),t(s),()=>{u.delete(f),0===u.size&&r&&(r(),r=null)}}}}export{s as r,o as w};
