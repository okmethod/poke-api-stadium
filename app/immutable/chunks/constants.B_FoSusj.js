import{s as ze,D,j as B,n as ce,d as C,F as He,$ as Ge,a0 as L,a1 as ae,e as Qe,c as Ve,b as Se,a2 as le,a3 as Ke,a4 as We,a5 as Ye,a6 as Xe,a7 as fe,a8 as Ze}from"./scheduler.DYDYJMk9.js";import{g as Ce}from"./spread.CgU5AtxT.js";import{S as Je,i as $e}from"./index.oLKdMOgl.js";const T=/^[a-z0-9]+(-[a-z0-9]+)*$/,q=(e,t,n,r="")=>{const o=e.split(":");if(e.slice(0,1)==="@"){if(o.length<2||o.length>3)return null;r=o.shift().slice(1)}if(o.length>3||!o.length)return null;if(o.length>1){const c=o.pop(),a=o.pop(),l={provider:o.length>0?o[0]:r,prefix:a,name:c};return t&&!F(l)?null:l}const s=o[0],i=s.split("-");if(i.length>1){const c={provider:r,prefix:i.shift(),name:i.join("-")};return t&&!F(c)?null:c}if(n&&r===""){const c={provider:r,prefix:"",name:s};return t&&!F(c,n)?null:c}return null},F=(e,t)=>e?!!((e.provider===""||e.provider.match(T))&&(t&&e.prefix===""||e.prefix.match(T))&&e.name.match(T)):!1,_e=Object.freeze({left:0,top:0,width:16,height:16}),N=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),R=Object.freeze({..._e,...N}),Q=Object.freeze({...R,body:"",hidden:!1});function et(e,t){const n={};!e.hFlip!=!t.hFlip&&(n.hFlip=!0),!e.vFlip!=!t.vFlip&&(n.vFlip=!0);const r=((e.rotate||0)+(t.rotate||0))%4;return r&&(n.rotate=r),n}function ue(e,t){const n=et(e,t);for(const r in Q)r in N?r in e&&!(r in n)&&(n[r]=N[r]):r in t?n[r]=t[r]:r in e&&(n[r]=e[r]);return n}function tt(e,t){const n=e.icons,r=e.aliases||Object.create(null),o=Object.create(null);function s(i){if(n[i])return o[i]=[];if(!(i in o)){o[i]=null;const c=r[i]&&r[i].parent,a=c&&s(c);a&&(o[i]=[c].concat(a))}return o[i]}return Object.keys(n).concat(Object.keys(r)).forEach(s),o}function nt(e,t,n){const r=e.icons,o=e.aliases||Object.create(null);let s={};function i(c){s=ue(r[c]||o[c],s)}return i(t),n.forEach(i),ue(e,s)}function Ee(e,t){const n=[];if(typeof e!="object"||typeof e.icons!="object")return n;e.not_found instanceof Array&&e.not_found.forEach(o=>{t(o,null),n.push(o)});const r=tt(e);for(const o in r){const s=r[o];s&&(t(o,nt(e,o,s)),n.push(o))}return n}const ot={provider:"",aliases:{},not_found:{},..._e};function H(e,t){for(const n in t)if(n in e&&typeof e[n]!=typeof t[n])return!1;return!0}function Te(e){if(typeof e!="object"||e===null)return null;const t=e;if(typeof t.prefix!="string"||!e.icons||typeof e.icons!="object"||!H(e,ot))return null;const n=t.icons;for(const o in n){const s=n[o];if(!o.match(T)||typeof s.body!="string"||!H(s,Q))return null}const r=t.aliases||Object.create(null);for(const o in r){const s=r[o],i=s.parent;if(!o.match(T)||typeof i!="string"||!n[i]&&!r[i]||!H(s,Q))return null}return t}const pe=Object.create(null);function rt(e,t){return{provider:e,prefix:t,icons:Object.create(null),missing:new Set}}function S(e,t){const n=pe[e]||(pe[e]=Object.create(null));return n[t]||(n[t]=rt(e,t))}function $(e,t){return Te(t)?Ee(t,(n,r)=>{r?e.icons[n]=r:e.missing.add(n)}):[]}function st(e,t,n){try{if(typeof n.body=="string")return e.icons[t]={...n},!0}catch{}return!1}let j=!1;function je(e){return typeof e=="boolean"&&(j=e),j}function it(e){const t=typeof e=="string"?q(e,!0,j):e;if(t){const n=S(t.provider,t.prefix),r=t.name;return n.icons[r]||(n.missing.has(r)?null:void 0)}}function ct(e,t){const n=q(e,!0,j);if(!n)return!1;const r=S(n.provider,n.prefix);return st(r,n.name,t)}function at(e,t){if(typeof e!="object")return!1;if(typeof t!="string"&&(t=e.provider||""),j&&!t&&!e.prefix){let o=!1;return Te(e)&&(e.prefix="",Ee(e,(s,i)=>{i&&ct(s,i)&&(o=!0)})),o}const n=e.prefix;if(!F({provider:t,prefix:n,name:"a"}))return!1;const r=S(t,n);return!!$(r,e)}const Pe=Object.freeze({width:null,height:null}),Ae=Object.freeze({...Pe,...N}),lt=/(-?[0-9.]*[0-9]+[0-9.]*)/g,ft=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function de(e,t,n){if(t===1)return e;if(n=n||100,typeof e=="number")return Math.ceil(e*t*n)/n;if(typeof e!="string")return e;const r=e.split(lt);if(r===null||!r.length)return e;const o=[];let s=r.shift(),i=ft.test(s);for(;;){if(i){const c=parseFloat(s);isNaN(c)?o.push(s):o.push(Math.ceil(c*t*n)/n)}else o.push(s);if(s=r.shift(),s===void 0)return o.join("");i=!i}}function ut(e,t="defs"){let n="";const r=e.indexOf("<"+t);for(;r>=0;){const o=e.indexOf(">",r),s=e.indexOf("</"+t);if(o===-1||s===-1)break;const i=e.indexOf(">",s);if(i===-1)break;n+=e.slice(o+1,s).trim(),e=e.slice(0,r).trim()+e.slice(i+1)}return{defs:n,content:e}}function pt(e,t){return e?"<defs>"+e+"</defs>"+t:t}function dt(e,t,n){const r=ut(e);return pt(r.defs,t+r.content+n)}const ht=e=>e==="unset"||e==="undefined"||e==="none";function gt(e,t){const n={...R,...e},r={...Ae,...t},o={left:n.left,top:n.top,width:n.width,height:n.height};let s=n.body;[n,r].forEach(k=>{const m=[],g=k.hFlip,u=k.vFlip;let x=k.rotate;g?u?x+=2:(m.push("translate("+(o.width+o.left).toString()+" "+(0-o.top).toString()+")"),m.push("scale(-1 1)"),o.top=o.left=0):u&&(m.push("translate("+(0-o.left).toString()+" "+(o.height+o.top).toString()+")"),m.push("scale(1 -1)"),o.top=o.left=0);let w;switch(x<0&&(x-=Math.floor(x/4)*4),x=x%4,x){case 1:w=o.height/2+o.top,m.unshift("rotate(90 "+w.toString()+" "+w.toString()+")");break;case 2:m.unshift("rotate(180 "+(o.width/2+o.left).toString()+" "+(o.height/2+o.top).toString()+")");break;case 3:w=o.width/2+o.left,m.unshift("rotate(-90 "+w.toString()+" "+w.toString()+")");break}x%2===1&&(o.left!==o.top&&(w=o.left,o.left=o.top,o.top=w),o.width!==o.height&&(w=o.width,o.width=o.height,o.height=w)),m.length&&(s=dt(s,'<g transform="'+m.join(" ")+'">',"</g>"))});const i=r.width,c=r.height,a=o.width,l=o.height;let f,p;i===null?(p=c===null?"1em":c==="auto"?l:c,f=de(p,a/l)):(f=i==="auto"?a:i,p=c===null?de(f,l/a):c==="auto"?l:c);const h={},y=(k,m)=>{ht(m)||(h[k]=m.toString())};y("width",f),y("height",p);const b=[o.left,o.top,a,l];return h.viewBox=b.join(" "),{attributes:h,viewBox:b,body:s}}const mt=/\sid="(\S+)"/g,yt="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let bt=0;function wt(e,t=yt){const n=[];let r;for(;r=mt.exec(e);)n.push(r[1]);if(!n.length)return e;const o="suffix"+(Math.random()*16777216|Date.now()).toString(16);return n.forEach(s=>{const i=typeof t=="function"?t(s):t+(bt++).toString(),c=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e=e.replace(new RegExp('([#;"])('+c+')([")]|\\.[a-z])',"g"),"$1"+i+o+"$3")}),e=e.replace(new RegExp(o,"g"),""),e}const V=Object.create(null);function vt(e,t){V[e]=t}function K(e){return V[e]||V[""]}function ee(e){let t;if(typeof e.resources=="string")t=[e.resources];else if(t=e.resources,!(t instanceof Array)||!t.length)return null;return{resources:t,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const te=Object.create(null),E=["https://api.simplesvg.com","https://api.unisvg.com"],M=[];for(;E.length>0;)E.length===1||Math.random()>.5?M.push(E.shift()):M.push(E.pop());te[""]=ee({resources:["https://api.iconify.design"].concat(M)});function xt(e,t){const n=ee(t);return n===null?!1:(te[e]=n,!0)}function ne(e){return te[e]}const kt=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let he=kt();function It(e,t){const n=ne(e);if(!n)return 0;let r;if(!n.maxURL)r=0;else{let o=0;n.resources.forEach(i=>{o=Math.max(o,i.length)});const s=t+".json?icons=";r=n.maxURL-o-n.path.length-s.length}return r}function St(e){return e===404}const Ct=(e,t,n)=>{const r=[],o=It(e,t),s="icons";let i={type:s,provider:e,prefix:t,icons:[]},c=0;return n.forEach((a,l)=>{c+=a.length+1,c>=o&&l>0&&(r.push(i),i={type:s,provider:e,prefix:t,icons:[]},c=a.length),i.icons.push(a)}),r.push(i),r};function _t(e){if(typeof e=="string"){const t=ne(e);if(t)return t.path}return"/"}const Et=(e,t,n)=>{if(!he){n("abort",424);return}let r=_t(t.provider);switch(t.type){case"icons":{const s=t.prefix,c=t.icons.join(","),a=new URLSearchParams({icons:c});r+=s+".json?"+a.toString();break}case"custom":{const s=t.uri;r+=s.slice(0,1)==="/"?s.slice(1):s;break}default:n("abort",400);return}let o=503;he(e+r).then(s=>{const i=s.status;if(i!==200){setTimeout(()=>{n(St(i)?"abort":"next",i)});return}return o=501,s.json()}).then(s=>{if(typeof s!="object"||s===null){setTimeout(()=>{s===404?n("abort",s):n("next",o)});return}setTimeout(()=>{n("success",s)})}).catch(()=>{n("next",o)})},Tt={prepare:Ct,send:Et};function jt(e){const t={loaded:[],missing:[],pending:[]},n=Object.create(null);e.sort((o,s)=>o.provider!==s.provider?o.provider.localeCompare(s.provider):o.prefix!==s.prefix?o.prefix.localeCompare(s.prefix):o.name.localeCompare(s.name));let r={provider:"",prefix:"",name:""};return e.forEach(o=>{if(r.name===o.name&&r.prefix===o.prefix&&r.provider===o.provider)return;r=o;const s=o.provider,i=o.prefix,c=o.name,a=n[s]||(n[s]=Object.create(null)),l=a[i]||(a[i]=S(s,i));let f;c in l.icons?f=t.loaded:i===""||l.missing.has(c)?f=t.missing:f=t.pending;const p={provider:s,prefix:i,name:c};f.push(p)}),t}function Oe(e,t){e.forEach(n=>{const r=n.loaderCallbacks;r&&(n.loaderCallbacks=r.filter(o=>o.id!==t))})}function Pt(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const t=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!t.length)return;let n=!1;const r=e.provider,o=e.prefix;t.forEach(s=>{const i=s.icons,c=i.pending.length;i.pending=i.pending.filter(a=>{if(a.prefix!==o)return!0;const l=a.name;if(e.icons[l])i.loaded.push({provider:r,prefix:o,name:l});else if(e.missing.has(l))i.missing.push({provider:r,prefix:o,name:l});else return n=!0,!0;return!1}),i.pending.length!==c&&(n||Oe([e],s.id),s.callback(i.loaded.slice(0),i.missing.slice(0),i.pending.slice(0),s.abort))})}))}let At=0;function Ot(e,t,n){const r=At++,o=Oe.bind(null,n,r);if(!t.pending.length)return o;const s={id:r,icons:t,callback:e,abort:o};return n.forEach(i=>{(i.loaderCallbacks||(i.loaderCallbacks=[])).push(s)}),o}function Ft(e,t=!0,n=!1){const r=[];return e.forEach(o=>{const s=typeof o=="string"?q(o,t,n):o;s&&r.push(s)}),r}var Mt={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function Dt(e,t,n,r){const o=e.resources.length,s=e.random?Math.floor(Math.random()*o):e.index;let i;if(e.random){let d=e.resources.slice(0);for(i=[];d.length>1;){const v=Math.floor(Math.random()*d.length);i.push(d[v]),d=d.slice(0,v).concat(d.slice(v+1))}i=i.concat(d)}else i=e.resources.slice(s).concat(e.resources.slice(0,s));const c=Date.now();let a="pending",l=0,f,p=null,h=[],y=[];typeof r=="function"&&y.push(r);function b(){p&&(clearTimeout(p),p=null)}function k(){a==="pending"&&(a="aborted"),b(),h.forEach(d=>{d.status==="pending"&&(d.status="aborted")}),h=[]}function m(d,v){v&&(y=[]),typeof d=="function"&&y.push(d)}function g(){return{startTime:c,payload:t,status:a,queriesSent:l,queriesPending:h.length,subscribe:m,abort:k}}function u(){a="failed",y.forEach(d=>{d(void 0,f)})}function x(){h.forEach(d=>{d.status==="pending"&&(d.status="aborted")}),h=[]}function w(d,v,_){const A=v!=="success";switch(h=h.filter(I=>I!==d),a){case"pending":break;case"failed":if(A||!e.dataAfterTimeout)return;break;default:return}if(v==="abort"){f=_,u();return}if(A){f=_,h.length||(i.length?z():u());return}if(b(),x(),!e.random){const I=e.resources.indexOf(d.resource);I!==-1&&I!==e.index&&(e.index=I)}a="completed",y.forEach(I=>{I(_)})}function z(){if(a!=="pending")return;b();const d=i.shift();if(d===void 0){if(h.length){p=setTimeout(()=>{b(),a==="pending"&&(x(),u())},e.timeout);return}u();return}const v={status:"pending",resource:d,callback:(_,A)=>{w(v,_,A)}};h.push(v),l++,p=setTimeout(z,e.rotate),n(d,t,v.callback)}return setTimeout(z),g}function Fe(e){const t={...Mt,...e};let n=[];function r(){n=n.filter(c=>c().status==="pending")}function o(c,a,l){const f=Dt(t,c,a,(p,h)=>{r(),l&&l(p,h)});return n.push(f),f}function s(c){return n.find(a=>c(a))||null}return{query:o,find:s,setIndex:c=>{t.index=c},getIndex:()=>t.index,cleanup:r}}function ge(){}const G=Object.create(null);function Lt(e){if(!G[e]){const t=ne(e);if(!t)return;const n=Fe(t),r={config:t,redundancy:n};G[e]=r}return G[e]}function Nt(e,t,n){let r,o;if(typeof e=="string"){const s=K(e);if(!s)return n(void 0,424),ge;o=s.send;const i=Lt(e);i&&(r=i.redundancy)}else{const s=ee(e);if(s){r=Fe(s);const i=e.resources?e.resources[0]:"",c=K(i);c&&(o=c.send)}}return!r||!o?(n(void 0,424),ge):r.query(t,o,n)().abort}const me="iconify2",P="iconify",Me=P+"-count",ye=P+"-version",De=36e5,Bt=168,qt=50;function W(e,t){try{return e.getItem(t)}catch{}}function oe(e,t,n){try{return e.setItem(t,n),!0}catch{}}function be(e,t){try{e.removeItem(t)}catch{}}function Y(e,t){return oe(e,Me,t.toString())}function X(e){return parseInt(W(e,Me))||0}const U={local:!0,session:!0},Le={local:new Set,session:new Set};let re=!1;function Rt(e){re=e}let O=typeof window>"u"?{}:window;function Ne(e){const t=e+"Storage";try{if(O&&O[t]&&typeof O[t].length=="number")return O[t]}catch{}U[e]=!1}function Be(e,t){const n=Ne(e);if(!n)return;const r=W(n,ye);if(r!==me){if(r){const c=X(n);for(let a=0;a<c;a++)be(n,P+a.toString())}oe(n,ye,me),Y(n,0);return}const o=Math.floor(Date.now()/De)-Bt,s=c=>{const a=P+c.toString(),l=W(n,a);if(typeof l=="string"){try{const f=JSON.parse(l);if(typeof f=="object"&&typeof f.cached=="number"&&f.cached>o&&typeof f.provider=="string"&&typeof f.data=="object"&&typeof f.data.prefix=="string"&&t(f,c))return!0}catch{}be(n,a)}};let i=X(n);for(let c=i-1;c>=0;c--)s(c)||(c===i-1?(i--,Y(n,i)):Le[e].add(c))}function qe(){if(!re){Rt(!0);for(const e in U)Be(e,t=>{const n=t.data,r=t.provider,o=n.prefix,s=S(r,o);if(!$(s,n).length)return!1;const i=n.lastModified||-1;return s.lastModifiedCached=s.lastModifiedCached?Math.min(s.lastModifiedCached,i):i,!0})}}function Ut(e,t){const n=e.lastModifiedCached;if(n&&n>=t)return n===t;if(e.lastModifiedCached=t,n)for(const r in U)Be(r,o=>{const s=o.data;return o.provider!==e.provider||s.prefix!==e.prefix||s.lastModified===t});return!0}function zt(e,t){re||qe();function n(r){let o;if(!U[r]||!(o=Ne(r)))return;const s=Le[r];let i;if(s.size)s.delete(i=Array.from(s).shift());else if(i=X(o),i>=qt||!Y(o,i+1))return;const c={cached:Math.floor(Date.now()/De),provider:e.provider,data:t};return oe(o,P+i.toString(),JSON.stringify(c))}t.lastModified&&!Ut(e,t.lastModified)||Object.keys(t.icons).length&&(t.not_found&&(t=Object.assign({},t),delete t.not_found),n("local")||n("session"))}function we(){}function Ht(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,Pt(e)}))}function Gt(e,t){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(t).sort():e.iconsToLoad=t,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:n,prefix:r}=e,o=e.iconsToLoad;delete e.iconsToLoad;let s;if(!o||!(s=K(n)))return;s.prepare(n,r,o).forEach(c=>{Nt(n,c,a=>{if(typeof a!="object")c.icons.forEach(l=>{e.missing.add(l)});else try{const l=$(e,a);if(!l.length)return;const f=e.pendingIcons;f&&l.forEach(p=>{f.delete(p)}),zt(e,a)}catch(l){console.error(l)}Ht(e)})})}))}const Qt=(e,t)=>{const n=Ft(e,!0,je()),r=jt(n);if(!r.pending.length){let a=!0;return t&&setTimeout(()=>{a&&t(r.loaded,r.missing,r.pending,we)}),()=>{a=!1}}const o=Object.create(null),s=[];let i,c;return r.pending.forEach(a=>{const{provider:l,prefix:f}=a;if(f===c&&l===i)return;i=l,c=f,s.push(S(l,f));const p=o[l]||(o[l]=Object.create(null));p[f]||(p[f]=[])}),r.pending.forEach(a=>{const{provider:l,prefix:f,name:p}=a,h=S(l,f),y=h.pendingIcons||(h.pendingIcons=new Set);y.has(p)||(y.add(p),o[l][f].push(p))}),s.forEach(a=>{const{provider:l,prefix:f}=a;o[l][f].length&&Gt(a,o[l][f])}),t?Ot(t,r,s):we};function Vt(e,t){const n={...e};for(const r in t){const o=t[r],s=typeof o;r in Pe?(o===null||o&&(s==="string"||s==="number"))&&(n[r]=o):s===typeof n[r]&&(n[r]=r==="rotate"?o%4:o)}return n}const Kt=/[\s,]+/;function Wt(e,t){t.split(Kt).forEach(n=>{switch(n.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}function Yt(e,t=0){const n=e.replace(/^-?[0-9.]*/,"");function r(o){for(;o<0;)o+=4;return o%4}if(n===""){const o=parseInt(e);return isNaN(o)?0:r(o)}else if(n!==e){let o=0;switch(n){case"%":o=25;break;case"deg":o=90}if(o){let s=parseFloat(e.slice(0,e.length-n.length));return isNaN(s)?0:(s=s/o,s%1===0?r(s):0)}}return t}function Xt(e,t){let n=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const r in t)n+=" "+r+'="'+t[r]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+e+"</svg>"}function Zt(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function Jt(e){return"data:image/svg+xml,"+Zt(e)}function $t(e){return'url("'+Jt(e)+'")'}const ve={...Ae,inline:!1},en={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},tn={display:"inline-block"},Z={"background-color":"currentColor"},Re={"background-color":"transparent"},xe={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},ke={"-webkit-mask":Z,mask:Z,background:Re};for(const e in ke){const t=ke[e];for(const n in xe)t[e+"-"+n]=xe[n]}function nn(e){return e+(e.match(/^[-0-9.]+$/)?"px":"")}function on(e,t){const n=Vt(ve,t),r=t.mode||"svg",o=r==="svg"?{...en}:{};e.body.indexOf("xlink:")===-1&&delete o["xmlns:xlink"];let s=typeof t.style=="string"?t.style:"";for(let g in t){const u=t[g];if(u!==void 0)switch(g){case"icon":case"style":case"onLoad":case"mode":break;case"inline":case"hFlip":case"vFlip":n[g]=u===!0||u==="true"||u===1;break;case"flip":typeof u=="string"&&Wt(n,u);break;case"color":s=s+(s.length>0&&s.trim().slice(-1)!==";"?";":"")+"color: "+u+"; ";break;case"rotate":typeof u=="string"?n[g]=Yt(u):typeof u=="number"&&(n[g]=u);break;case"ariaHidden":case"aria-hidden":u!==!0&&u!=="true"&&delete o["aria-hidden"];break;default:if(g.slice(0,3)==="on:")break;ve[g]===void 0&&(o[g]=u)}}const i=gt(e,n),c=i.attributes;if(n.inline&&(s="vertical-align: -0.125em; "+s),r==="svg"){Object.assign(o,c),s!==""&&(o.style=s);let g=0,u=t.id;return typeof u=="string"&&(u=u.replace(/-/g,"_")),{svg:!0,attributes:o,body:wt(i.body,u?()=>u+"ID"+g++:"iconifySvelte")}}const{body:a,width:l,height:f}=e,p=r==="mask"||(r==="bg"?!1:a.indexOf("currentColor")!==-1),h=Xt(a,{...c,width:l+"",height:f+""}),b={"--svg":$t(h)},k=g=>{const u=c[g];u&&(b[g]=nn(u))};k("width"),k("height"),Object.assign(b,tn,p?Z:Re);let m="";for(const g in b)m+=g+": "+b[g]+";";return o.style=m+s,{svg:!1,attributes:o}}je(!0);vt("",Tt);if(typeof document<"u"&&typeof window<"u"){qe();const e=window;if(e.IconifyPreload!==void 0){const t=e.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof t=="object"&&t!==null&&(t instanceof Array?t:[t]).forEach(r=>{try{(typeof r!="object"||r===null||r instanceof Array||typeof r.icons!="object"||typeof r.prefix!="string"||!at(r))&&console.error(n)}catch{console.error(n)}})}if(e.IconifyProviders!==void 0){const t=e.IconifyProviders;if(typeof t=="object"&&t!==null)for(let n in t){const r="IconifyProviders["+n+"] is invalid.";try{const o=t[n];if(typeof o!="object"||!o||o.resources===void 0)continue;xt(n,o)||console.error(r)}catch{console.error(r)}}}}function rn(e,t,n,r,o){function s(){t.loading&&(t.loading.abort(),t.loading=null)}if(typeof e=="object"&&e!==null&&typeof e.body=="string")return t.name="",s(),{data:{...R,...e}};let i;if(typeof e!="string"||(i=q(e,!1,!0))===null)return s(),null;const c=it(i);if(!c)return n&&(!t.loading||t.loading.name!==e)&&(s(),t.name="",t.loading={name:e,abort:Qt([i],r)}),null;s(),t.name!==e&&(t.name=e,o&&!t.destroyed&&o(e));const a=["iconify"];return i.prefix!==""&&a.push("iconify--"+i.prefix),i.provider!==""&&a.push("iconify--"+i.provider),{data:c,classes:a}}function sn(e,t){return e?on({...R,...e},t):null}function Ie(e){let t;function n(s,i){return s[0].svg?an:cn}let r=n(e),o=r(e);return{c(){o.c(),t=D()},l(s){o.l(s),t=D()},m(s,i){o.m(s,i),B(s,t,i)},p(s,i){r===(r=n(s))&&o?o.p(s,i):(o.d(1),o=r(s),o&&(o.c(),o.m(t.parentNode,t)))},d(s){s&&C(t),o.d(s)}}}function cn(e){let t,n=[e[0].attributes],r={};for(let o=0;o<n.length;o+=1)r=L(r,n[o]);return{c(){t=Qe("span"),this.h()},l(o){t=Ve(o,"SPAN",{}),Se(t).forEach(C),this.h()},h(){le(t,r)},m(o,s){B(o,t,s)},p(o,s){le(t,r=Ce(n,[s&1&&o[0].attributes]))},d(o){o&&C(t)}}}function an(e){let t,n,r=e[0].body+"",o=[e[0].attributes],s={};for(let i=0;i<o.length;i+=1)s=L(s,o[i]);return{c(){t=Ke("svg"),n=new We(!0),this.h()},l(i){t=Ye(i,"svg",{});var c=Se(t);n=Xe(c,!0),c.forEach(C),this.h()},h(){n.a=null,fe(t,s)},m(i,c){B(i,t,c),n.m(r,t)},p(i,c){c&1&&r!==(r=i[0].body+"")&&n.p(r),fe(t,s=Ce(o,[c&1&&i[0].attributes]))},d(i){i&&C(t)}}}function ln(e){let t,n=e[0]&&Ie(e);return{c(){n&&n.c(),t=D()},l(r){n&&n.l(r),t=D()},m(r,o){n&&n.m(r,o),B(r,t,o)},p(r,[o]){r[0]?n?n.p(r,o):(n=Ie(r),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},i:ce,o:ce,d(r){r&&C(t),n&&n.d(r)}}}function fn(e,t,n){const r={name:"",loading:null,destroyed:!1};let o=!1,s=0,i;const c=l=>{typeof t.onLoad=="function"&&t.onLoad(l),Ze()("load",{icon:l})};function a(){n(3,s++,s)}return He(()=>{n(2,o=!0)}),Ge(()=>{n(1,r.destroyed=!0,r),r.loading&&(r.loading.abort(),n(1,r.loading=null,r))}),e.$$set=l=>{n(6,t=L(L({},t),ae(l)))},e.$$.update=()=>{{const l=rn(t.icon,r,o,a,c);n(0,i=l?sn(l.data,t):null),i&&l.classes&&n(0,i.attributes.class=(typeof t.class=="string"?t.class+" ":"")+l.classes.join(" "),i)}},t=ae(t),[i,r,o,s]}class xn extends Je{constructor(t){super(),$e(this,t,fn,ln,ze,{})}}function se(){return{credentials:"same-origin"}}async function ie(e,t,n){try{const r=await e(t,n);if(!r.ok)throw console.error("API response:",r.status),new Error(`Failed to fetch: ${n.method} ${t}`);return r}catch(r){throw console.error("API error:",r),new Error(`Failed to fetch: ${n.method} ${t}`)}}async function un(e,t){const n=`https://pokeapi.co/api/v2/pokemon/${t}`;return pn(e,n)}async function pn(e,t){const r={...se(),method:"GET"};return await(await ie(e,t,r)).json()}async function dn(e,t){const r={...se(),method:"GET"};return await(await ie(e,t,r)).json()}async function kn(e,t){const n=`https://pokeapi.co/api/v2/type/${t}`;return J(e,n)}async function J(e,t){const r={...se(),method:"GET"};return await(await ie(e,t,r)).json()}function Ue(e){let t=[];if(typeof e=="object"&&e!==null)for(const n in e){const r=e[n];typeof r=="string"?t.push(r):typeof r=="object"&&r!==null&&(t=t.concat(Ue(r)))}return t}function hn(e){let t=Ue(e);return e.front_default&&(t=[e.front_default,...t.filter(n=>n!==e.front_default)]),t}function gn(e){const t={};return e.forEach(n=>{switch(n.stat.name){case"hp":t.hp=n.base_stat;break;case"attack":t.attack=n.base_stat;break;case"defense":t.defense=n.base_stat;break;case"special-attack":t.specialAttack=n.base_stat;break;case"special-defense":t.specialDefense=n.base_stat;break;case"speed":t.speed=n.base_stat;break}}),t}const In=1025;function mn(e,t,n,r){var o,s,i,c;return{id:e.id,enName:e.species.name,jaName:((o=t.names.find(a=>a.language.name==="ja"))==null?void 0:o.name)??"???",imageUrlArray:hn(e.sprites),jaGenus:((s=t.genera.find(a=>a.language.name==="ja"))==null?void 0:s.genus)??"???",type1:{id:n.id,enName:e.types[0].type.name,jaName:((i=n.names.find(a=>a.language.name==="ja"))==null?void 0:i.name)??"???"},type2:r!==null?{id:r.id,enName:e.types[1].type.name,jaName:((c=r.names.find(a=>a.language.name==="ja"))==null?void 0:c.name)??"???"}:null,height:e.height,weight:e.weight,stats:gn(e.stats)}}async function Sn(e,t){const n=await un(e,t),r=await dn(e,n.species.url),o=await J(e,n.types[0].type.url),s=n.types[1]?await J(e,n.types[1].type.url):null;return mn(n,r,o,s)}const Cn={normal:{color:"#FDF6CB",url:"https://pokeapi.co/api/v2/type/1/"},fighting:{color:"#EE8130",url:"https://pokeapi.co/api/v2/type/2/"},flying:{color:"#A2C3E8",url:"https://pokeapi.co/api/v2/type/3/"},poison:{color:"#A33EA1",url:"https://pokeapi.co/api/v2/type/4/"},ground:{color:"#9C7743",url:"https://pokeapi.co/api/v2/type/5/"},rock:{color:"#C0B88A",url:"https://pokeapi.co/api/v2/type/6/"},bug:{color:"#A6B91A",url:"https://pokeapi.co/api/v2/type/7/"},ghost:{color:"#735797",url:"https://pokeapi.co/api/v2/type/8/"},steel:{color:"#B7B7CE",url:"https://pokeapi.co/api/v2/type/9/"},fire:{color:"#D22E28",url:"https://pokeapi.co/api/v2/type/10/"},water:{color:"#5285C6",url:"https://pokeapi.co/api/v2/type/11/"},grass:{color:"#7AC74C",url:"https://pokeapi.co/api/v2/type/12/"},electric:{color:"#F7D02C",url:"https://pokeapi.co/api/v2/type/13/"},psychic:{color:"#F95587",url:"https://pokeapi.co/api/v2/type/14/"},ice:{color:"#6DC8EB",url:"https://pokeapi.co/api/v2/type/15/"},dragon:{color:"#545BA8",url:"https://pokeapi.co/api/v2/type/16/"},dark:{color:"#222222",url:"https://pokeapi.co/api/v2/type/17/"},fairy:{color:"#FCAFF9",url:"https://pokeapi.co/api/v2/type/18/"}},_n="#888888";function En(e,t){return`${e!==void 0?(e*.1).toFixed(1):"???"} ${t==="height"?"m":"kg"}`}function Tn(e){return e!==void 0?e.toString():"???"}function yn(e){return Math.floor(Math.random()*e)}function jn(e,t){if(e.length<t)throw new Error("shortage elements in the array");const n=[],r=new Set;for(;n.length<t;){const o=yn(e.length);r.has(o)||(n.push(e[o]),r.add(o))}return n}const Pn="container flex flex-col md:w-11/12 space-y-4",An="container mb-2 ml-2",On="text-2xl font-bold",Fn="container space-y-4",Mn="flex items-center h-full px-2 py-1 text-white rounded bg-blue-500 hover:bg-blue-600",Dn="w-5 h-5 flex-shrink-0",Ln="w-full h-full";export{xn as I,In as L,Cn as T,Mn as a,On as b,Ln as c,An as d,Dn as e,Fn as f,Pn as g,En as h,Tn as i,Sn as j,yn as k,kn as l,_n as n,jn as p};
