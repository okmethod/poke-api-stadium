import{b as k,t as q}from"./index.BX9BVEZ1.js";import{r as z}from"./scheduler.D4GYTqH1.js";function F(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}function B(n,d){k(n,1,1,()=>{d.delete(n.key)})}function G(n,d){n.f(),B(n,d)}function H(n,d,x,C,S,g,o,A,p,b,a,j){let i=n.length,f=g.length,c=i;const u={};for(;c--;)u[n[c].key]=c;const h=[],w=new Map,m=new Map,_=[];for(c=f;c--;){const e=j(S,g,c),s=x(e);let t=o.get(s);t?_.push(()=>t.p(e,d)):(t=b(s,e),t.c()),w.set(s,h[c]=t),s in u&&m.set(s,Math.abs(c-u[s]))}const M=new Set,v=new Set;function y(e){q(e,1),e.m(A,a),o.set(e.key,e),a=e.first,f--}for(;i&&f;){const e=h[f-1],s=n[i-1],t=e.key,l=s.key;e===s?(a=e.first,i--,f--):w.has(l)?!o.has(t)||M.has(t)?y(e):v.has(l)?i--:m.get(t)>m.get(l)?(v.add(t),y(e)):(M.add(l),i--):(p(s,o),i--)}for(;i--;){const e=n[i];w.has(e.key)||p(e,o)}for(;f;)y(h[f-1]);return z(_),h}export{F as e,G as f,B as o,H as u};