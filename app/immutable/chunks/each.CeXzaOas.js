import{t as q,a as z}from"./index.BWx_jO9Z.js";import{v as B}from"./scheduler.D16oZ6cK.js";function G(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}function C(n,d){q(n,1,1,()=>{d.delete(n.key)})}function H(n,d){n.f(),C(n,d)}function I(n,d,x,D,S,g,o,A,p,j,l,k){let i=n.length,f=g.length,c=i;const u={};for(;c--;)u[n[c].key]=c;const h=[],w=new Map,m=new Map,_=[];for(c=f;c--;){const e=k(S,g,c),s=x(e);let t=o.get(s);t?_.push(()=>t.p(e,d)):(t=j(s,e),t.c()),w.set(s,h[c]=t),s in u&&m.set(s,Math.abs(c-u[s]))}const v=new Set,M=new Set;function y(e){z(e,1),e.m(A,l),o.set(e.key,e),l=e.first,f--}for(;i&&f;){const e=h[f-1],s=n[i-1],t=e.key,a=s.key;e===s?(l=e.first,i--,f--):w.has(a)?!o.has(t)||v.has(t)?y(e):M.has(a)?i--:m.get(t)>m.get(a)?(M.add(t),y(e)):(v.add(a),i--):(p(s,o),i--)}for(;i--;){const e=n[i];w.has(e.key)||p(e,o)}for(;f;)y(h[f-1]);return B(_),h}export{G as e,H as f,C as o,I as u};
