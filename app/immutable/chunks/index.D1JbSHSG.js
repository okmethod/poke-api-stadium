import{o as t,a as e}from"./scheduler.BlVzsFL4.js";const n=[];function s(t,e){return{subscribe:o(t,e).subscribe}}function o(s,o=t){let r;const u=new Set;function c(t){if(e(s,t)&&(s=t,r)){const t=!n.length;for(const e of u)e[1](),n.push(e,s);if(t){for(let t=0;t<n.length;t+=2)n[t][0](n[t+1]);n.length=0}}}function i(t){c(t(s))}return{set:c,update:i,subscribe:function(e,n=t){const f=[e,n];return u.add(f),1===u.size&&(r=o(c,i)||t),e(s),()=>{u.delete(f),0===u.size&&r&&(r(),r=null)}}}}export{s as r,o as w};
