import{s as Ct,z as ve,j as A,u as X,f as m,B as Gt,W as Qt,X as _e,Y as lt,e as w,c as x,b as S,Z as ct,_ as Kt,$ as Wt,a0 as Yt,a1 as Xt,a2 as at,a3 as Zt,a as M,t as B,d as q,g as me,o as V,h as y,C as de,k as h,x as Y,a4 as ut,m as Jt}from"./scheduler.DON4Bl4l.js";import{S as Et,i as jt,g as $t,d as Oe,b as en,t as Fe,c as tn,a as nn,m as on,e as rn}from"./index.COoIKShN.js";import{g as Tt}from"./spread.CgU5AtxT.js";const oe=/^[a-z0-9]+(-[a-z0-9]+)*$/,xe=(e,t,n,r="")=>{const o=e.split(":");if(e.slice(0,1)==="@"){if(o.length<2||o.length>3)return null;r=o.shift().slice(1)}if(o.length>3||!o.length)return null;if(o.length>1){const l=o.pop(),c=o.pop(),a={provider:o.length>0?o[0]:r,prefix:c,name:l};return t&&!ye(a)?null:a}const s=o[0],i=s.split("-");if(i.length>1){const l={provider:r,prefix:i.shift(),name:i.join("-")};return t&&!ye(l)?null:l}if(n&&r===""){const l={provider:r,prefix:"",name:s};return t&&!ye(l,n)?null:l}return null},ye=(e,t)=>e?!!((e.provider===""||e.provider.match(oe))&&(t&&e.prefix===""||e.prefix.match(oe))&&e.name.match(oe)):!1,Pt=Object.freeze({left:0,top:0,width:16,height:16}),we=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),ke=Object.freeze({...Pt,...we}),Le=Object.freeze({...ke,body:"",hidden:!1});function sn(e,t){const n={};!e.hFlip!=!t.hFlip&&(n.hFlip=!0),!e.vFlip!=!t.vFlip&&(n.vFlip=!0);const r=((e.rotate||0)+(t.rotate||0))%4;return r&&(n.rotate=r),n}function ft(e,t){const n=sn(e,t);for(const r in Le)r in we?r in e&&!(r in n)&&(n[r]=we[r]):r in t?n[r]=t[r]:r in e&&(n[r]=e[r]);return n}function ln(e,t){const n=e.icons,r=e.aliases||Object.create(null),o=Object.create(null);function s(i){if(n[i])return o[i]=[];if(!(i in o)){o[i]=null;const l=r[i]&&r[i].parent,c=l&&s(l);c&&(o[i]=[l].concat(c))}return o[i]}return Object.keys(n).concat(Object.keys(r)).forEach(s),o}function cn(e,t,n){const r=e.icons,o=e.aliases||Object.create(null);let s={};function i(l){s=ft(r[l]||o[l],s)}return i(t),n.forEach(i),ft(e,s)}function Nt(e,t){const n=[];if(typeof e!="object"||typeof e.icons!="object")return n;e.not_found instanceof Array&&e.not_found.forEach(o=>{t(o,null),n.push(o)});const r=ln(e);for(const o in r){const s=r[o];s&&(t(o,cn(e,o,s)),n.push(o))}return n}const an={provider:"",aliases:{},not_found:{},...Pt};function De(e,t){for(const n in t)if(n in e&&typeof e[n]!=typeof t[n])return!1;return!0}function Dt(e){if(typeof e!="object"||e===null)return null;const t=e;if(typeof t.prefix!="string"||!e.icons||typeof e.icons!="object"||!De(e,an))return null;const n=t.icons;for(const o in n){const s=n[o];if(!o.match(oe)||typeof s.body!="string"||!De(s,Le))return null}const r=t.aliases||Object.create(null);for(const o in r){const s=r[o],i=s.parent;if(!o.match(oe)||typeof i!="string"||!n[i]&&!r[i]||!De(s,Le))return null}return t}const dt=Object.create(null);function un(e,t){return{provider:e,prefix:t,icons:Object.create(null),missing:new Set}}function Z(e,t){const n=dt[e]||(dt[e]=Object.create(null));return n[t]||(n[t]=un(e,t))}function Ue(e,t){return Dt(t)?Nt(t,(n,r)=>{r?e.icons[n]=r:e.missing.add(n)}):[]}function fn(e,t,n){try{if(typeof n.body=="string")return e.icons[t]={...n},!0}catch{}return!1}let re=!1;function At(e){return typeof e=="boolean"&&(re=e),re}function dn(e){const t=typeof e=="string"?xe(e,!0,re):e;if(t){const n=Z(t.provider,t.prefix),r=t.name;return n.icons[r]||(n.missing.has(r)?null:void 0)}}function pn(e,t){const n=xe(e,!0,re);if(!n)return!1;const r=Z(n.provider,n.prefix);return fn(r,n.name,t)}function hn(e,t){if(typeof e!="object")return!1;if(typeof t!="string"&&(t=e.provider||""),re&&!t&&!e.prefix){let o=!1;return Dt(e)&&(e.prefix="",Nt(e,(s,i)=>{i&&pn(s,i)&&(o=!0)})),o}const n=e.prefix;if(!ye({provider:t,prefix:n,name:"a"}))return!1;const r=Z(t,n);return!!Ue(r,e)}const Ot=Object.freeze({width:null,height:null}),Ft=Object.freeze({...Ot,...we}),gn=/(-?[0-9.]*[0-9]+[0-9.]*)/g,mn=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function pt(e,t,n){if(t===1)return e;if(n=n||100,typeof e=="number")return Math.ceil(e*t*n)/n;if(typeof e!="string")return e;const r=e.split(gn);if(r===null||!r.length)return e;const o=[];let s=r.shift(),i=mn.test(s);for(;;){if(i){const l=parseFloat(s);isNaN(l)?o.push(s):o.push(Math.ceil(l*t*n)/n)}else o.push(s);if(s=r.shift(),s===void 0)return o.join("");i=!i}}function yn(e,t="defs"){let n="";const r=e.indexOf("<"+t);for(;r>=0;){const o=e.indexOf(">",r),s=e.indexOf("</"+t);if(o===-1||s===-1)break;const i=e.indexOf(">",s);if(i===-1)break;n+=e.slice(o+1,s).trim(),e=e.slice(0,r).trim()+e.slice(i+1)}return{defs:n,content:e}}function bn(e,t){return e?"<defs>"+e+"</defs>"+t:t}function vn(e,t,n){const r=yn(e);return bn(r.defs,t+r.content+n)}const _n=e=>e==="unset"||e==="undefined"||e==="none";function wn(e,t){const n={...ke,...e},r={...Ft,...t},o={left:n.left,top:n.top,width:n.width,height:n.height};let s=n.body;[n,r].forEach(k=>{const j=[],I=k.hFlip,g=k.vFlip;let P=k.rotate;I?g?P+=2:(j.push("translate("+(o.width+o.left).toString()+" "+(0-o.top).toString()+")"),j.push("scale(-1 1)"),o.top=o.left=0):g&&(j.push("translate("+(0-o.left).toString()+" "+(o.height+o.top).toString()+")"),j.push("scale(1 -1)"),o.top=o.left=0);let E;switch(P<0&&(P-=Math.floor(P/4)*4),P=P%4,P){case 1:E=o.height/2+o.top,j.unshift("rotate(90 "+E.toString()+" "+E.toString()+")");break;case 2:j.unshift("rotate(180 "+(o.width/2+o.left).toString()+" "+(o.height/2+o.top).toString()+")");break;case 3:E=o.width/2+o.left,j.unshift("rotate(-90 "+E.toString()+" "+E.toString()+")");break}P%2===1&&(o.left!==o.top&&(E=o.left,o.left=o.top,o.top=E),o.width!==o.height&&(E=o.width,o.width=o.height,o.height=E)),j.length&&(s=vn(s,'<g transform="'+j.join(" ")+'">',"</g>"))});const i=r.width,l=r.height,c=o.width,a=o.height;let u,f;i===null?(f=l===null?"1em":l==="auto"?a:l,u=pt(f,c/a)):(u=i==="auto"?c:i,f=l===null?pt(u,a/c):l==="auto"?a:l);const d={},p=(k,j)=>{_n(j)||(d[k]=j.toString())};p("width",u),p("height",f);const b=[o.left,o.top,c,a];return d.viewBox=b.join(" "),{attributes:d,viewBox:b,body:s}}const xn=/\sid="(\S+)"/g,kn="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let In=0;function Sn(e,t=kn){const n=[];let r;for(;r=xn.exec(e);)n.push(r[1]);if(!n.length)return e;const o="suffix"+(Math.random()*16777216|Date.now()).toString(16);return n.forEach(s=>{const i=typeof t=="function"?t(s):t+(In++).toString(),l=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e=e.replace(new RegExp('([#;"])('+l+')([")]|\\.[a-z])',"g"),"$1"+i+o+"$3")}),e=e.replace(new RegExp(o,"g"),""),e}const Me=Object.create(null);function Cn(e,t){Me[e]=t}function qe(e){return Me[e]||Me[""]}function ze(e){let t;if(typeof e.resources=="string")t=[e.resources];else if(t=e.resources,!(t instanceof Array)||!t.length)return null;return{resources:t,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const Ge=Object.create(null),ne=["https://api.simplesvg.com","https://api.unisvg.com"],be=[];for(;ne.length>0;)ne.length===1||Math.random()>.5?be.push(ne.shift()):be.push(ne.pop());Ge[""]=ze({resources:["https://api.iconify.design"].concat(be)});function En(e,t){const n=ze(t);return n===null?!1:(Ge[e]=n,!0)}function Qe(e){return Ge[e]}const jn=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let ht=jn();function Tn(e,t){const n=Qe(e);if(!n)return 0;let r;if(!n.maxURL)r=0;else{let o=0;n.resources.forEach(i=>{o=Math.max(o,i.length)});const s=t+".json?icons=";r=n.maxURL-o-n.path.length-s.length}return r}function Pn(e){return e===404}const Nn=(e,t,n)=>{const r=[],o=Tn(e,t),s="icons";let i={type:s,provider:e,prefix:t,icons:[]},l=0;return n.forEach((c,a)=>{l+=c.length+1,l>=o&&a>0&&(r.push(i),i={type:s,provider:e,prefix:t,icons:[]},l=c.length),i.icons.push(c)}),r.push(i),r};function Dn(e){if(typeof e=="string"){const t=Qe(e);if(t)return t.path}return"/"}const An=(e,t,n)=>{if(!ht){n("abort",424);return}let r=Dn(t.provider);switch(t.type){case"icons":{const s=t.prefix,l=t.icons.join(","),c=new URLSearchParams({icons:l});r+=s+".json?"+c.toString();break}case"custom":{const s=t.uri;r+=s.slice(0,1)==="/"?s.slice(1):s;break}default:n("abort",400);return}let o=503;ht(e+r).then(s=>{const i=s.status;if(i!==200){setTimeout(()=>{n(Pn(i)?"abort":"next",i)});return}return o=501,s.json()}).then(s=>{if(typeof s!="object"||s===null){setTimeout(()=>{s===404?n("abort",s):n("next",o)});return}setTimeout(()=>{n("success",s)})}).catch(()=>{n("next",o)})},On={prepare:Nn,send:An};function Fn(e){const t={loaded:[],missing:[],pending:[]},n=Object.create(null);e.sort((o,s)=>o.provider!==s.provider?o.provider.localeCompare(s.provider):o.prefix!==s.prefix?o.prefix.localeCompare(s.prefix):o.name.localeCompare(s.name));let r={provider:"",prefix:"",name:""};return e.forEach(o=>{if(r.name===o.name&&r.prefix===o.prefix&&r.provider===o.provider)return;r=o;const s=o.provider,i=o.prefix,l=o.name,c=n[s]||(n[s]=Object.create(null)),a=c[i]||(c[i]=Z(s,i));let u;l in a.icons?u=t.loaded:i===""||a.missing.has(l)?u=t.missing:u=t.pending;const f={provider:s,prefix:i,name:l};u.push(f)}),t}function Lt(e,t){e.forEach(n=>{const r=n.loaderCallbacks;r&&(n.loaderCallbacks=r.filter(o=>o.id!==t))})}function Ln(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const t=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!t.length)return;let n=!1;const r=e.provider,o=e.prefix;t.forEach(s=>{const i=s.icons,l=i.pending.length;i.pending=i.pending.filter(c=>{if(c.prefix!==o)return!0;const a=c.name;if(e.icons[a])i.loaded.push({provider:r,prefix:o,name:a});else if(e.missing.has(a))i.missing.push({provider:r,prefix:o,name:a});else return n=!0,!0;return!1}),i.pending.length!==l&&(n||Lt([e],s.id),s.callback(i.loaded.slice(0),i.missing.slice(0),i.pending.slice(0),s.abort))})}))}let Mn=0;function qn(e,t,n){const r=Mn++,o=Lt.bind(null,n,r);if(!t.pending.length)return o;const s={id:r,icons:t,callback:e,abort:o};return n.forEach(i=>{(i.loaderCallbacks||(i.loaderCallbacks=[])).push(s)}),o}function Bn(e,t=!0,n=!1){const r=[];return e.forEach(o=>{const s=typeof o=="string"?xe(o,t,n):o;s&&r.push(s)}),r}var Vn={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function Rn(e,t,n,r){const o=e.resources.length,s=e.random?Math.floor(Math.random()*o):e.index;let i;if(e.random){let v=e.resources.slice(0);for(i=[];v.length>1;){const T=Math.floor(Math.random()*v.length);i.push(v[T]),v=v.slice(0,T).concat(v.slice(T+1))}i=i.concat(v)}else i=e.resources.slice(s).concat(e.resources.slice(0,s));const l=Date.now();let c="pending",a=0,u,f=null,d=[],p=[];typeof r=="function"&&p.push(r);function b(){f&&(clearTimeout(f),f=null)}function k(){c==="pending"&&(c="aborted"),b(),d.forEach(v=>{v.status==="pending"&&(v.status="aborted")}),d=[]}function j(v,T){T&&(p=[]),typeof v=="function"&&p.push(v)}function I(){return{startTime:l,payload:t,status:c,queriesSent:a,queriesPending:d.length,subscribe:j,abort:k}}function g(){c="failed",p.forEach(v=>{v(void 0,u)})}function P(){d.forEach(v=>{v.status==="pending"&&(v.status="aborted")}),d=[]}function E(v,T,N){const R=T!=="success";switch(d=d.filter(D=>D!==v),c){case"pending":break;case"failed":if(R||!e.dataAfterTimeout)return;break;default:return}if(T==="abort"){u=N,g();return}if(R){u=N,d.length||(i.length?O():g());return}if(b(),P(),!e.random){const D=e.resources.indexOf(v.resource);D!==-1&&D!==e.index&&(e.index=D)}c="completed",p.forEach(D=>{D(N)})}function O(){if(c!=="pending")return;b();const v=i.shift();if(v===void 0){if(d.length){f=setTimeout(()=>{b(),c==="pending"&&(P(),g())},e.timeout);return}g();return}const T={status:"pending",resource:v,callback:(N,R)=>{E(T,N,R)}};d.push(T),a++,f=setTimeout(O,e.rotate),n(v,t,T.callback)}return setTimeout(O),I}function Mt(e){const t={...Vn,...e};let n=[];function r(){n=n.filter(l=>l().status==="pending")}function o(l,c,a){const u=Rn(t,l,c,(f,d)=>{r(),a&&a(f,d)});return n.push(u),u}function s(l){return n.find(c=>l(c))||null}return{query:o,find:s,setIndex:l=>{t.index=l},getIndex:()=>t.index,cleanup:r}}function gt(){}const Ae=Object.create(null);function Hn(e){if(!Ae[e]){const t=Qe(e);if(!t)return;const n=Mt(t),r={config:t,redundancy:n};Ae[e]=r}return Ae[e]}function Un(e,t,n){let r,o;if(typeof e=="string"){const s=qe(e);if(!s)return n(void 0,424),gt;o=s.send;const i=Hn(e);i&&(r=i.redundancy)}else{const s=ze(e);if(s){r=Mt(s);const i=e.resources?e.resources[0]:"",l=qe(i);l&&(o=l.send)}}return!r||!o?(n(void 0,424),gt):r.query(t,o,n)().abort}const mt="iconify2",se="iconify",qt=se+"-count",yt=se+"-version",Bt=36e5,zn=168,Gn=50;function Be(e,t){try{return e.getItem(t)}catch{}}function Ke(e,t,n){try{return e.setItem(t,n),!0}catch{}}function bt(e,t){try{e.removeItem(t)}catch{}}function Ve(e,t){return Ke(e,qt,t.toString())}function Re(e){return parseInt(Be(e,qt))||0}const Ie={local:!0,session:!0},Vt={local:new Set,session:new Set};let We=!1;function Qn(e){We=e}let pe=typeof window>"u"?{}:window;function Rt(e){const t=e+"Storage";try{if(pe&&pe[t]&&typeof pe[t].length=="number")return pe[t]}catch{}Ie[e]=!1}function Ht(e,t){const n=Rt(e);if(!n)return;const r=Be(n,yt);if(r!==mt){if(r){const l=Re(n);for(let c=0;c<l;c++)bt(n,se+c.toString())}Ke(n,yt,mt),Ve(n,0);return}const o=Math.floor(Date.now()/Bt)-zn,s=l=>{const c=se+l.toString(),a=Be(n,c);if(typeof a=="string"){try{const u=JSON.parse(a);if(typeof u=="object"&&typeof u.cached=="number"&&u.cached>o&&typeof u.provider=="string"&&typeof u.data=="object"&&typeof u.data.prefix=="string"&&t(u,l))return!0}catch{}bt(n,c)}};let i=Re(n);for(let l=i-1;l>=0;l--)s(l)||(l===i-1?(i--,Ve(n,i)):Vt[e].add(l))}function Ut(){if(!We){Qn(!0);for(const e in Ie)Ht(e,t=>{const n=t.data,r=t.provider,o=n.prefix,s=Z(r,o);if(!Ue(s,n).length)return!1;const i=n.lastModified||-1;return s.lastModifiedCached=s.lastModifiedCached?Math.min(s.lastModifiedCached,i):i,!0})}}function Kn(e,t){const n=e.lastModifiedCached;if(n&&n>=t)return n===t;if(e.lastModifiedCached=t,n)for(const r in Ie)Ht(r,o=>{const s=o.data;return o.provider!==e.provider||s.prefix!==e.prefix||s.lastModified===t});return!0}function Wn(e,t){We||Ut();function n(r){let o;if(!Ie[r]||!(o=Rt(r)))return;const s=Vt[r];let i;if(s.size)s.delete(i=Array.from(s).shift());else if(i=Re(o),i>=Gn||!Ve(o,i+1))return;const l={cached:Math.floor(Date.now()/Bt),provider:e.provider,data:t};return Ke(o,se+i.toString(),JSON.stringify(l))}t.lastModified&&!Kn(e,t.lastModified)||Object.keys(t.icons).length&&(t.not_found&&(t=Object.assign({},t),delete t.not_found),n("local")||n("session"))}function vt(){}function Yn(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,Ln(e)}))}function Xn(e,t){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(t).sort():e.iconsToLoad=t,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:n,prefix:r}=e,o=e.iconsToLoad;delete e.iconsToLoad;let s;if(!o||!(s=qe(n)))return;s.prepare(n,r,o).forEach(l=>{Un(n,l,c=>{if(typeof c!="object")l.icons.forEach(a=>{e.missing.add(a)});else try{const a=Ue(e,c);if(!a.length)return;const u=e.pendingIcons;u&&a.forEach(f=>{u.delete(f)}),Wn(e,c)}catch(a){console.error(a)}Yn(e)})})}))}const Zn=(e,t)=>{const n=Bn(e,!0,At()),r=Fn(n);if(!r.pending.length){let c=!0;return t&&setTimeout(()=>{c&&t(r.loaded,r.missing,r.pending,vt)}),()=>{c=!1}}const o=Object.create(null),s=[];let i,l;return r.pending.forEach(c=>{const{provider:a,prefix:u}=c;if(u===l&&a===i)return;i=a,l=u,s.push(Z(a,u));const f=o[a]||(o[a]=Object.create(null));f[u]||(f[u]=[])}),r.pending.forEach(c=>{const{provider:a,prefix:u,name:f}=c,d=Z(a,u),p=d.pendingIcons||(d.pendingIcons=new Set);p.has(f)||(p.add(f),o[a][u].push(f))}),s.forEach(c=>{const{provider:a,prefix:u}=c;o[a][u].length&&Xn(c,o[a][u])}),t?qn(t,r,s):vt};function Jn(e,t){const n={...e};for(const r in t){const o=t[r],s=typeof o;r in Ot?(o===null||o&&(s==="string"||s==="number"))&&(n[r]=o):s===typeof n[r]&&(n[r]=r==="rotate"?o%4:o)}return n}const $n=/[\s,]+/;function eo(e,t){t.split($n).forEach(n=>{switch(n.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}function to(e,t=0){const n=e.replace(/^-?[0-9.]*/,"");function r(o){for(;o<0;)o+=4;return o%4}if(n===""){const o=parseInt(e);return isNaN(o)?0:r(o)}else if(n!==e){let o=0;switch(n){case"%":o=25;break;case"deg":o=90}if(o){let s=parseFloat(e.slice(0,e.length-n.length));return isNaN(s)?0:(s=s/o,s%1===0?r(s):0)}}return t}function no(e,t){let n=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const r in t)n+=" "+r+'="'+t[r]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+e+"</svg>"}function oo(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function ro(e){return"data:image/svg+xml,"+oo(e)}function so(e){return'url("'+ro(e)+'")'}const _t={...Ft,inline:!1},io={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},lo={display:"inline-block"},He={"background-color":"currentColor"},zt={"background-color":"transparent"},wt={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},xt={"-webkit-mask":He,mask:He,background:zt};for(const e in xt){const t=xt[e];for(const n in wt)t[e+"-"+n]=wt[n]}function co(e){return e+(e.match(/^[-0-9.]+$/)?"px":"")}function ao(e,t){const n=Jn(_t,t),r=t.mode||"svg",o=r==="svg"?{...io}:{};e.body.indexOf("xlink:")===-1&&delete o["xmlns:xlink"];let s=typeof t.style=="string"?t.style:"";for(let I in t){const g=t[I];if(g!==void 0)switch(I){case"icon":case"style":case"onLoad":case"mode":break;case"inline":case"hFlip":case"vFlip":n[I]=g===!0||g==="true"||g===1;break;case"flip":typeof g=="string"&&eo(n,g);break;case"color":s=s+(s.length>0&&s.trim().slice(-1)!==";"?";":"")+"color: "+g+"; ";break;case"rotate":typeof g=="string"?n[I]=to(g):typeof g=="number"&&(n[I]=g);break;case"ariaHidden":case"aria-hidden":g!==!0&&g!=="true"&&delete o["aria-hidden"];break;default:if(I.slice(0,3)==="on:")break;_t[I]===void 0&&(o[I]=g)}}const i=wn(e,n),l=i.attributes;if(n.inline&&(s="vertical-align: -0.125em; "+s),r==="svg"){Object.assign(o,l),s!==""&&(o.style=s);let I=0,g=t.id;return typeof g=="string"&&(g=g.replace(/-/g,"_")),{svg:!0,attributes:o,body:Sn(i.body,g?()=>g+"ID"+I++:"iconifySvelte")}}const{body:c,width:a,height:u}=e,f=r==="mask"||(r==="bg"?!1:c.indexOf("currentColor")!==-1),d=no(c,{...l,width:a+"",height:u+""}),b={"--svg":so(d)},k=I=>{const g=l[I];g&&(b[I]=co(g))};k("width"),k("height"),Object.assign(b,lo,f?He:zt);let j="";for(const I in b)j+=I+": "+b[I]+";";return o.style=j+s,{svg:!1,attributes:o}}At(!0);Cn("",On);if(typeof document<"u"&&typeof window<"u"){Ut();const e=window;if(e.IconifyPreload!==void 0){const t=e.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof t=="object"&&t!==null&&(t instanceof Array?t:[t]).forEach(r=>{try{(typeof r!="object"||r===null||r instanceof Array||typeof r.icons!="object"||typeof r.prefix!="string"||!hn(r))&&console.error(n)}catch{console.error(n)}})}if(e.IconifyProviders!==void 0){const t=e.IconifyProviders;if(typeof t=="object"&&t!==null)for(let n in t){const r="IconifyProviders["+n+"] is invalid.";try{const o=t[n];if(typeof o!="object"||!o||o.resources===void 0)continue;En(n,o)||console.error(r)}catch{console.error(r)}}}}function uo(e,t,n,r,o){function s(){t.loading&&(t.loading.abort(),t.loading=null)}if(typeof e=="object"&&e!==null&&typeof e.body=="string")return t.name="",s(),{data:{...ke,...e}};let i;if(typeof e!="string"||(i=xe(e,!1,!0))===null)return s(),null;const l=dn(i);if(!l)return n&&(!t.loading||t.loading.name!==e)&&(s(),t.name="",t.loading={name:e,abort:Zn([i],r)}),null;s(),t.name!==e&&(t.name=e,o&&!t.destroyed&&o(e));const c=["iconify"];return i.prefix!==""&&c.push("iconify--"+i.prefix),i.provider!==""&&c.push("iconify--"+i.provider),{data:l,classes:c}}function fo(e,t){return e?ao({...ke,...e},t):null}function kt(e){let t;function n(s,i){return s[0].svg?ho:po}let r=n(e),o=r(e);return{c(){o.c(),t=ve()},l(s){o.l(s),t=ve()},m(s,i){o.m(s,i),A(s,t,i)},p(s,i){r===(r=n(s))&&o?o.p(s,i):(o.d(1),o=r(s),o&&(o.c(),o.m(t.parentNode,t)))},d(s){s&&m(t),o.d(s)}}}function po(e){let t,n=[e[0].attributes],r={};for(let o=0;o<n.length;o+=1)r=_e(r,n[o]);return{c(){t=w("span"),this.h()},l(o){t=x(o,"SPAN",{}),S(t).forEach(m),this.h()},h(){ct(t,r)},m(o,s){A(o,t,s)},p(o,s){ct(t,r=Tt(n,[s&1&&o[0].attributes]))},d(o){o&&m(t)}}}function ho(e){let t,n,r=e[0].body+"",o=[e[0].attributes],s={};for(let i=0;i<o.length;i+=1)s=_e(s,o[i]);return{c(){t=Kt("svg"),n=new Wt(!0),this.h()},l(i){t=Yt(i,"svg",{});var l=S(t);n=Xt(l,!0),l.forEach(m),this.h()},h(){n.a=null,at(t,s)},m(i,l){A(i,t,l),n.m(r,t)},p(i,l){l&1&&r!==(r=i[0].body+"")&&n.p(r),at(t,s=Tt(o,[l&1&&i[0].attributes]))},d(i){i&&m(t)}}}function go(e){let t,n=e[0]&&kt(e);return{c(){n&&n.c(),t=ve()},l(r){n&&n.l(r),t=ve()},m(r,o){n&&n.m(r,o),A(r,t,o)},p(r,[o]){r[0]?n?n.p(r,o):(n=kt(r),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},i:X,o:X,d(r){r&&m(t),n&&n.d(r)}}}function mo(e,t,n){const r={name:"",loading:null,destroyed:!1};let o=!1,s=0,i;const l=a=>{typeof t.onLoad=="function"&&t.onLoad(a),Zt()("load",{icon:a})};function c(){n(3,s++,s)}return Gt(()=>{n(2,o=!0)}),Qt(()=>{n(1,r.destroyed=!0,r),r.loading&&(r.loading.abort(),n(1,r.loading=null,r))}),e.$$set=a=>{n(6,t=_e(_e({},t),lt(a)))},e.$$.update=()=>{{const a=uo(t.icon,r,o,c,l);n(0,i=a?fo(a.data,t):null),i&&a.classes&&n(0,i.attributes.class=(typeof t.class=="string"?t.class+" ":"")+a.classes.join(" "),i)}},t=lt(t),[i,r,o,s]}class yo extends Et{constructor(t){super(),jt(this,t,mo,go,Ct,{})}}function Ye(){return{credentials:"same-origin"}}async function Xe(e,t,n){try{const r=await e(t,n);if(!r.ok)throw console.error("API response:",r.status),new Error(`Failed to fetch: ${n.method} ${t}`);return r}catch(r){throw console.error("API error:",r),new Error(`Failed to fetch: ${n.method} ${t}`)}}async function bo(e,t){const n=`https://pokeapi.co/api/v2/pokemon/${t}`,o={...Ye(),method:"GET"};return await(await Xe(e,n,o)).json()}async function vo(e,t){const r={...Ye(),method:"GET"};return await(await Xe(e,t,r)).json()}async function It(e,t){const r={...Ye(),method:"GET"};return await(await Xe(e,t,r)).json()}const Do=1025;function _o(e,t,n,r){var o,s,i,l;return{id:e.id,enName:e.species.name,jaName:((o=t.names.find(c=>c.language.name==="ja"))==null?void 0:o.name)??"???",imageUrl:[e.sprites.front_default,e.sprites.back_default],jaGenus:((s=t.genera.find(c=>c.language.name==="ja"))==null?void 0:s.genus)??"???",type1:{enName:e.types[0].type.name,jaName:((i=n.names.find(c=>c.language.name==="ja"))==null?void 0:i.name)??"???"},type2:r!==null?{enName:e.types[1].type.name,jaName:((l=r.names.find(c=>c.language.name==="ja"))==null?void 0:l.name)??"???"}:null,height:e.height,weight:e.weight}}async function Ao(e,t){const n=await bo(e,t),r=await vo(e,n.species.url),o=await It(e,n.types[0].type.url),s=n.types[1]?await It(e,n.types[1].type.url):null;return _o(n,r,o,s)}const St={normal:{color:"#FDF6CB",url:"https://pokeapi.co/api/v2/type/1/"},fighting:{color:"#EE8130",url:"https://pokeapi.co/api/v2/type/2/"},flying:{color:"#A2C3E8",url:"https://pokeapi.co/api/v2/type/3/"},poison:{color:"#A33EA1",url:"https://pokeapi.co/api/v2/type/4/"},ground:{color:"#9C7743",url:"https://pokeapi.co/api/v2/type/5/"},rock:{color:"#C0B88A",url:"https://pokeapi.co/api/v2/type/6/"},bug:{color:"#A6B91A",url:"https://pokeapi.co/api/v2/type/7/"},ghost:{color:"#735797",url:"https://pokeapi.co/api/v2/type/8/"},steel:{color:"#B7B7CE",url:"https://pokeapi.co/api/v2/type/9/"},fire:{color:"#D22E28",url:"https://pokeapi.co/api/v2/type/10/"},water:{color:"#5285C6",url:"https://pokeapi.co/api/v2/type/11/"},grass:{color:"#7AC74C",url:"https://pokeapi.co/api/v2/type/12/"},electric:{color:"#F7D02C",url:"https://pokeapi.co/api/v2/type/13/"},psychic:{color:"#F95587",url:"https://pokeapi.co/api/v2/type/14/"},ice:{color:"#6DC8EB",url:"https://pokeapi.co/api/v2/type/15/"},dragon:{color:"#545BA8",url:"https://pokeapi.co/api/v2/type/16/"},dark:{color:"#222222",url:"https://pokeapi.co/api/v2/type/17/"},fairy:{color:"#FCAFF9",url:"https://pokeapi.co/api/v2/type/18/"}};function he(e){return e!==void 0?(e*.1).toFixed(1):"???"}function Oo(e,t,n){const r=new Set;for(;r.size<n;){const o=Math.floor(Math.random()*(t-e+1))+e;r.add(o)}return Array.from(r)}function wo(e){let t;return{c(){t=B("???")},l(n){t=V(n,"???")},m(n,r){A(n,t,r)},p:X,d(n){n&&m(t)}}}function xo(e){let t,n,r=e[0].jaName+"",o,s,i=e[0].enName+"",l,c,a,u=(e[0]!==null?e[0].jaGenus:"???")+"",f;return{c(){t=w("div"),n=w("div"),o=B(r),s=B(" : "),l=B(i),c=M(),a=w("span"),f=B(u),this.h()},l(d){t=x(d,"DIV",{class:!0});var p=S(t);n=x(p,"DIV",{});var b=S(n);o=V(b,r),s=V(b," : "),l=V(b,i),b.forEach(m),c=q(p),a=x(p,"SPAN",{class:!0});var k=S(a);f=V(k,u),k.forEach(m),p.forEach(m),this.h()},h(){y(a,"class","text-lg font-normal text-gray-700 ml-0 sm:ml-4"),y(t,"class","flex flex-col sm:flex-row items-start sm:items-center")},m(d,p){A(d,t,p),h(t,n),h(n,o),h(n,s),h(n,l),h(t,c),h(t,a),h(a,f)},p(d,p){p&1&&r!==(r=d[0].jaName+"")&&Y(o,r),p&1&&i!==(i=d[0].enName+"")&&Y(l,i),p&1&&u!==(u=(d[0]!==null?d[0].jaGenus:"???")+"")&&Y(f,u)},d(d){d&&m(t)}}}function ko(e){let t,n;return t=new yo({props:{icon:"mdi:image-off-outline",height:"40"}}),{c(){tn(t.$$.fragment)},l(r){nn(t.$$.fragment,r)},m(r,o){on(t,r,o),n=!0},p:X,i(r){n||(Fe(t.$$.fragment,r),n=!0)},o(r){Oe(t.$$.fragment,r),n=!1},d(r){rn(t,r)}}}function Io(e){let t,n,r,o,s,i;return{c(){t=w("button"),n=w("img"),this.h()},l(l){t=x(l,"BUTTON",{type:!0,"aria-label":!0});var c=S(t);n=x(c,"IMG",{src:!0,alt:!0,class:!0}),c.forEach(m),this.h()},h(){ut(n.src,r=e[0].imageUrl[e[3]])||y(n,"src",r),y(n,"alt",o=e[0].jaName),y(n,"class","w-48 h-48"),y(t,"type","button"),y(t,"aria-label","Toggle Image")},m(l,c){A(l,t,c),h(t,n),s||(i=Jt(t,"click",e[4]),s=!0)},p(l,c){c&9&&!ut(n.src,r=l[0].imageUrl[l[3]])&&y(n,"src",r),c&1&&o!==(o=l[0].jaName)&&y(n,"alt",o)},i:X,o:X,d(l){l&&m(t),s=!1,i()}}}function So(e){let t,n="???";return{c(){t=w("li"),t.textContent=n,this.h()},l(r){t=x(r,"LI",{class:!0,"data-svelte-h":!0}),me(t)!=="svelte-ky9waa"&&(t.textContent=n),this.h()},h(){y(t,"class","text-gray-600")},m(r,o){A(r,t,o)},p:X,d(r){r&&m(t)}}}function Co(e){var c,a,u;let t,n=((c=e[0])==null?void 0:c.type1.jaName)+"",r,o,s,i=(((a=e[0])==null?void 0:a.type2)!==null?(u=e[0])==null?void 0:u.type2.jaName:"")+"",l;return{c(){t=w("li"),r=B(n),o=M(),s=w("li"),l=B(i),this.h()},l(f){t=x(f,"LI",{class:!0});var d=S(t);r=V(d,n),d.forEach(m),o=q(f),s=x(f,"LI",{class:!0});var p=S(s);l=V(p,i),p.forEach(m),this.h()},h(){y(t,"class","text-gray-600"),y(s,"class","text-gray-600")},m(f,d){A(f,t,d),h(t,r),A(f,o,d),A(f,s,d),h(s,l)},p(f,d){var p,b,k;d&1&&n!==(n=((p=f[0])==null?void 0:p.type1.jaName)+"")&&Y(r,n),d&1&&i!==(i=(((b=f[0])==null?void 0:b.type2)!==null?(k=f[0])==null?void 0:k.type2.jaName:"")+"")&&Y(l,i)},d(f){f&&(m(t),m(o),m(s))}}}function Eo(e){var nt,ot;let t,n,r,o,s,i,l,c,a,u,f,d,p,b,k,j="[タイプ]",I,g,P,E,O,v="[たかさ]",T,N,R=he((nt=e[0])==null?void 0:nt.height)+"",D,Se,Ce,H,G,Ze="[おもさ]",Ee,Q,ee=he((ot=e[0])==null?void 0:ot.weight)+"",ie,je,Te,K,U;function Je(_,C){return _[0]!==null?xo:wo}let le=Je(e),F=le(e);const $e=[Io,ko],z=[];function et(_,C){return _[0]!==null?0:1}u=et(e),f=z[u]=$e[u](e);function tt(_,C){return _[0]!==null?Co:So}let ce=tt(e),L=ce(e);return{c(){t=w("div"),n=w("header"),r=M(),o=w("div"),s=w("h1"),F.c(),i=M(),l=w("div"),c=w("div"),a=w("div"),f.c(),d=M(),p=w("div"),b=w("div"),k=w("h2"),k.textContent=j,I=M(),g=w("ul"),L.c(),P=M(),E=w("div"),O=w("h2"),O.textContent=v,T=M(),N=w("p"),D=B(R),Se=B(" m"),Ce=M(),H=w("div"),G=w("h2"),G.textContent=Ze,Ee=M(),Q=w("p"),ie=B(ee),je=B(" kg"),Te=M(),K=w("footer"),this.h()},l(_){t=x(_,"DIV",{class:!0});var C=S(t);n=x(C,"HEADER",{class:!0,style:!0}),S(n).forEach(m),r=q(C),o=x(C,"DIV",{class:!0});var J=S(o);s=x(J,"H1",{class:!0});var te=S(s);F.l(te),te.forEach(m),J.forEach(m),i=q(C),l=x(C,"DIV",{class:!0});var W=S(l);c=x(W,"DIV",{class:!0});var rt=S(c);a=x(rt,"DIV",{class:!0});var st=S(a);f.l(st),st.forEach(m),rt.forEach(m),d=q(W),p=x(W,"DIV",{class:!0});var $=S(p);b=x($,"DIV",{class:!0});var ae=S(b);k=x(ae,"H2",{class:!0,"data-svelte-h":!0}),me(k)!=="svelte-xnj5ch"&&(k.textContent=j),I=q(ae),g=x(ae,"UL",{class:!0});var it=S(g);L.l(it),it.forEach(m),ae.forEach(m),P=q($),E=x($,"DIV",{class:!0});var ue=S(E);O=x(ue,"H2",{class:!0,"data-svelte-h":!0}),me(O)!=="svelte-xgvmlq"&&(O.textContent=v),T=q(ue),N=x(ue,"P",{class:!0});var Pe=S(N);D=V(Pe,R),Se=V(Pe," m"),Pe.forEach(m),ue.forEach(m),Ce=q($),H=x($,"DIV",{class:!0});var fe=S(H);G=x(fe,"H2",{class:!0,"data-svelte-h":!0}),me(G)!=="svelte-1xr86to"&&(G.textContent=Ze),Ee=q(fe),Q=x(fe,"P",{class:!0});var Ne=S(Q);ie=V(Ne,ee),je=V(Ne," kg"),Ne.forEach(m),fe.forEach(m),$.forEach(m),W.forEach(m),Te=q(C),K=x(C,"FOOTER",{class:!0,style:!0}),S(K).forEach(m),C.forEach(m),this.h()},h(){y(n,"class","p-4 bg-transparent"),de(n,"background-color",e[1]),y(s,"class","text-2xl font-bold text-gray-900"),y(o,"class","p-2 bg-transparent"),y(a,"class","w-48 h-48 bg-white rounded-lg border border-gray-200 flex items-center justify-center"),y(c,"class","p-2 flex justify-center"),y(k,"class","text-l font-semibold text-gray-700"),y(g,"class","list-inside flex space-x-4"),y(b,"class","mb-2 flex items-center space-x-4"),y(O,"class","text-l font-semibold text-gray-700"),y(N,"class","text-gray-600"),y(E,"class","mb-2 flex items-center space-x-4"),y(G,"class","text-l font-semibold text-gray-700"),y(Q,"class","text-gray-600"),y(H,"class","mb-2 flex items-center space-x-4"),y(p,"class","p-2"),y(l,"class","grid md:grid-cols-2 w-full mb-2 bg-transparent"),y(K,"class","p-4 bg-transparent"),de(K,"background-color",e[2]),y(t,"class","grid border bg-gray-50 rounded-2xl shadow max-w-[500px] overflow-hidden")},m(_,C){A(_,t,C),h(t,n),h(t,r),h(t,o),h(o,s),F.m(s,null),h(t,i),h(t,l),h(l,c),h(c,a),z[u].m(a,null),h(l,d),h(l,p),h(p,b),h(b,k),h(b,I),h(b,g),L.m(g,null),h(p,P),h(p,E),h(E,O),h(E,T),h(E,N),h(N,D),h(N,Se),h(p,Ce),h(p,H),h(H,G),h(H,Ee),h(H,Q),h(Q,ie),h(Q,je),h(t,Te),h(t,K),U=!0},p(_,[C]){var te,W;(!U||C&2)&&de(n,"background-color",_[1]),le===(le=Je(_))&&F?F.p(_,C):(F.d(1),F=le(_),F&&(F.c(),F.m(s,null)));let J=u;u=et(_),u===J?z[u].p(_,C):($t(),Oe(z[J],1,1,()=>{z[J]=null}),en(),f=z[u],f?f.p(_,C):(f=z[u]=$e[u](_),f.c()),Fe(f,1),f.m(a,null)),ce===(ce=tt(_))&&L?L.p(_,C):(L.d(1),L=ce(_),L&&(L.c(),L.m(g,null))),(!U||C&1)&&R!==(R=he((te=_[0])==null?void 0:te.height)+"")&&Y(D,R),(!U||C&1)&&ee!==(ee=he((W=_[0])==null?void 0:W.weight)+"")&&Y(ie,ee),(!U||C&4)&&de(K,"background-color",_[2])},i(_){U||(Fe(f),U=!0)},o(_){Oe(f),U=!1},d(_){_&&m(t),F.d(),z[u].d(),L.d()}}}const ge="#888888";function jo(e,t,n){let{pokeData:r=null}=t,o=ge,s=ge,i=0;function l(){n(3,i=(i+1)%2)}return e.$$set=c=>{"pokeData"in c&&n(0,r=c.pokeData)},e.$$.update=()=>{var c,a;e.$$.dirty&3&&r!==null&&(n(1,o=((c=St[r.type1.enName])==null?void 0:c.color)??ge),n(2,s=r.type2!==null?((a=St[r.type2.enName])==null?void 0:a.color)??ge:o))},[r,o,s,i,l]}class Fo extends Et{constructor(t){super(),jt(this,t,jo,Eo,Ct,{pokeData:0})}}export{yo as I,Do as L,Fo as P,Ao as a,Oo as g};
