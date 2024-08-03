import{s as Be,q as ye,i as D,n as W,f as g,u as Wt,R as Xt,S as be,T as ct,e as v,c as _,b as j,U as ut,V as Yt,W as Zt,X as Jt,Y as en,Z as ft,_ as tn,a as O,t as V,d as L,g as $,k as R,h as m,j as p,m as K,$ as dt,l as Le,a0 as pt,p as nn,a1 as jt,B as rn}from"../chunks/scheduler.CpnG_ZNi.js";import{S as He,i as ze,g as sn,t as ve,c as on,a as _e,b as Tt,d as Pt,m as Dt,e as Nt}from"../chunks/index.GCM9fUSs.js";import{g as Ot}from"../chunks/spread.CgU5AtxT.js";function Ge(){return{credentials:"same-origin"}}async function Qe(e,t,n){try{const s=await e(t,n);if(!s.ok)throw console.error("API response:",s.status),new Error(`Failed to fetch: ${n.method} ${t}`);return s}catch(s){throw console.error("API error:",s),new Error(`Failed to fetch: ${n.method} ${t}`)}}async function ln(e,t){const n=`https://pokeapi.co/api/v2/pokemon/${t}`,r={...Ge(),method:"GET"};return await(await Qe(e,n,r)).json()}async function an(e,t){const s={...Ge(),method:"GET"};return await(await Qe(e,t,s)).json()}async function ht(e,t){const s={...Ge(),method:"GET"};return await(await Qe(e,t,s)).json()}function cn(e,t,n,s){var r,o,i,l;return{id:e.id,enName:e.species.name,jaName:((r=t.names.find(a=>a.language.name==="ja"))==null?void 0:r.name)??"???",imageUrl:[e.sprites.front_default,e.sprites.back_default],jaGenus:((o=t.genera.find(a=>a.language.name==="ja"))==null?void 0:o.genus)??"???",type1:{enName:e.types[0].type.name,jaName:((i=n.names.find(a=>a.language.name==="ja"))==null?void 0:i.name)??"???"},type2:s!==null?{enName:e.types[0].type.name,jaName:((l=s.names.find(a=>a.language.name==="ja"))==null?void 0:l.name)??"???"}:null,height:e.height,weight:e.weight}}async function un(e,t){const n=await ln(e,t),s=await an(e,n.species.url),r=await ht(e,n.types[0].type.url),o=n.types[1]?await ht(e,n.types[1].type.url):null;return cn(n,s,r,o)}const se=/^[a-z0-9]+(-[a-z0-9]+)*$/,xe=(e,t,n,s="")=>{const r=e.split(":");if(e.slice(0,1)==="@"){if(r.length<2||r.length>3)return null;s=r.shift().slice(1)}if(r.length>3||!r.length)return null;if(r.length>1){const l=r.pop(),a=r.pop(),u={provider:r.length>0?r[0]:s,prefix:a,name:l};return t&&!ge(u)?null:u}const o=r[0],i=o.split("-");if(i.length>1){const l={provider:s,prefix:i.shift(),name:i.join("-")};return t&&!ge(l)?null:l}if(n&&s===""){const l={provider:s,prefix:"",name:o};return t&&!ge(l,n)?null:l}return null},ge=(e,t)=>e?!!((e.provider===""||e.provider.match(se))&&(t&&e.prefix===""||e.prefix.match(se))&&e.name.match(se)):!1,Lt=Object.freeze({left:0,top:0,width:16,height:16}),we=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),Ie=Object.freeze({...Lt,...we}),Me=Object.freeze({...Ie,body:"",hidden:!1});function fn(e,t){const n={};!e.hFlip!=!t.hFlip&&(n.hFlip=!0),!e.vFlip!=!t.vFlip&&(n.vFlip=!0);const s=((e.rotate||0)+(t.rotate||0))%4;return s&&(n.rotate=s),n}function gt(e,t){const n=fn(e,t);for(const s in Me)s in we?s in e&&!(s in n)&&(n[s]=we[s]):s in t?n[s]=t[s]:s in e&&(n[s]=e[s]);return n}function dn(e,t){const n=e.icons,s=e.aliases||Object.create(null),r=Object.create(null);function o(i){if(n[i])return r[i]=[];if(!(i in r)){r[i]=null;const l=s[i]&&s[i].parent,a=l&&o(l);a&&(r[i]=[l].concat(a))}return r[i]}return Object.keys(n).concat(Object.keys(s)).forEach(o),r}function pn(e,t,n){const s=e.icons,r=e.aliases||Object.create(null);let o={};function i(l){o=gt(s[l]||r[l],o)}return i(t),n.forEach(i),gt(e,o)}function Mt(e,t){const n=[];if(typeof e!="object"||typeof e.icons!="object")return n;e.not_found instanceof Array&&e.not_found.forEach(r=>{t(r,null),n.push(r)});const s=dn(e);for(const r in s){const o=s[r];o&&(t(r,pn(e,r,o)),n.push(r))}return n}const hn={provider:"",aliases:{},not_found:{},...Lt};function Ne(e,t){for(const n in t)if(n in e&&typeof e[n]!=typeof t[n])return!1;return!0}function At(e){if(typeof e!="object"||e===null)return null;const t=e;if(typeof t.prefix!="string"||!e.icons||typeof e.icons!="object"||!Ne(e,hn))return null;const n=t.icons;for(const r in n){const o=n[r];if(!r.match(se)||typeof o.body!="string"||!Ne(o,Me))return null}const s=t.aliases||Object.create(null);for(const r in s){const o=s[r],i=o.parent;if(!r.match(se)||typeof i!="string"||!n[i]&&!s[i]||!Ne(o,Me))return null}return t}const mt=Object.create(null);function gn(e,t){return{provider:e,prefix:t,icons:Object.create(null),missing:new Set}}function X(e,t){const n=mt[e]||(mt[e]=Object.create(null));return n[t]||(n[t]=gn(e,t))}function $e(e,t){return At(t)?Mt(t,(n,s)=>{s?e.icons[n]=s:e.missing.add(n)}):[]}function mn(e,t,n){try{if(typeof n.body=="string")return e.icons[t]={...n},!0}catch{}return!1}let oe=!1;function Ft(e){return typeof e=="boolean"&&(oe=e),oe}function yn(e){const t=typeof e=="string"?xe(e,!0,oe):e;if(t){const n=X(t.provider,t.prefix),s=t.name;return n.icons[s]||(n.missing.has(s)?null:void 0)}}function bn(e,t){const n=xe(e,!0,oe);if(!n)return!1;const s=X(n.provider,n.prefix);return mn(s,n.name,t)}function vn(e,t){if(typeof e!="object")return!1;if(typeof t!="string"&&(t=e.provider||""),oe&&!t&&!e.prefix){let r=!1;return At(e)&&(e.prefix="",Mt(e,(o,i)=>{i&&bn(o,i)&&(r=!0)})),r}const n=e.prefix;if(!ge({provider:t,prefix:n,name:"a"}))return!1;const s=X(t,n);return!!$e(s,e)}const qt=Object.freeze({width:null,height:null}),Vt=Object.freeze({...qt,...we}),_n=/(-?[0-9.]*[0-9]+[0-9.]*)/g,wn=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function yt(e,t,n){if(t===1)return e;if(n=n||100,typeof e=="number")return Math.ceil(e*t*n)/n;if(typeof e!="string")return e;const s=e.split(_n);if(s===null||!s.length)return e;const r=[];let o=s.shift(),i=wn.test(o);for(;;){if(i){const l=parseFloat(o);isNaN(l)?r.push(o):r.push(Math.ceil(l*t*n)/n)}else r.push(o);if(o=s.shift(),o===void 0)return r.join("");i=!i}}function xn(e,t="defs"){let n="";const s=e.indexOf("<"+t);for(;s>=0;){const r=e.indexOf(">",s),o=e.indexOf("</"+t);if(r===-1||o===-1)break;const i=e.indexOf(">",o);if(i===-1)break;n+=e.slice(r+1,o).trim(),e=e.slice(0,s).trim()+e.slice(i+1)}return{defs:n,content:e}}function In(e,t){return e?"<defs>"+e+"</defs>"+t:t}function kn(e,t,n){const s=xn(e);return In(s.defs,t+s.content+n)}const Sn=e=>e==="unset"||e==="undefined"||e==="none";function Cn(e,t){const n={...Ie,...e},s={...Vt,...t},r={left:n.left,top:n.top,width:n.width,height:n.height};let o=n.body;[n,s].forEach(x=>{const E=[],S=x.hFlip,h=x.vFlip;let I=x.rotate;S?h?I+=2:(E.push("translate("+(r.width+r.left).toString()+" "+(0-r.top).toString()+")"),E.push("scale(-1 1)"),r.top=r.left=0):h&&(E.push("translate("+(0-r.left).toString()+" "+(r.height+r.top).toString()+")"),E.push("scale(1 -1)"),r.top=r.left=0);let w;switch(I<0&&(I-=Math.floor(I/4)*4),I=I%4,I){case 1:w=r.height/2+r.top,E.unshift("rotate(90 "+w.toString()+" "+w.toString()+")");break;case 2:E.unshift("rotate(180 "+(r.width/2+r.left).toString()+" "+(r.height/2+r.top).toString()+")");break;case 3:w=r.width/2+r.left,E.unshift("rotate(-90 "+w.toString()+" "+w.toString()+")");break}I%2===1&&(r.left!==r.top&&(w=r.left,r.left=r.top,r.top=w),r.width!==r.height&&(w=r.width,r.width=r.height,r.height=w)),E.length&&(o=kn(o,'<g transform="'+E.join(" ")+'">',"</g>"))});const i=s.width,l=s.height,a=r.width,u=r.height;let c,f;i===null?(f=l===null?"1em":l==="auto"?u:l,c=yt(f,a/u)):(c=i==="auto"?a:i,f=l===null?yt(c,u/a):l==="auto"?u:l);const d={},b=(x,E)=>{Sn(E)||(d[x]=E.toString())};b("width",c),b("height",f);const k=[r.left,r.top,a,u];return d.viewBox=k.join(" "),{attributes:d,viewBox:k,body:o}}const En=/\sid="(\S+)"/g,jn="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let Tn=0;function Pn(e,t=jn){const n=[];let s;for(;s=En.exec(e);)n.push(s[1]);if(!n.length)return e;const r="suffix"+(Math.random()*16777216|Date.now()).toString(16);return n.forEach(o=>{const i=typeof t=="function"?t(o):t+(Tn++).toString(),l=o.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e=e.replace(new RegExp('([#;"])('+l+')([")]|\\.[a-z])',"g"),"$1"+i+r+"$3")}),e=e.replace(new RegExp(r,"g"),""),e}const Ae=Object.create(null);function Dn(e,t){Ae[e]=t}function Fe(e){return Ae[e]||Ae[""]}function Ke(e){let t;if(typeof e.resources=="string")t=[e.resources];else if(t=e.resources,!(t instanceof Array)||!t.length)return null;return{resources:t,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const We=Object.create(null),re=["https://api.simplesvg.com","https://api.unisvg.com"],me=[];for(;re.length>0;)re.length===1||Math.random()>.5?me.push(re.shift()):me.push(re.pop());We[""]=Ke({resources:["https://api.iconify.design"].concat(me)});function Nn(e,t){const n=Ke(t);return n===null?!1:(We[e]=n,!0)}function Xe(e){return We[e]}const On=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let bt=On();function Ln(e,t){const n=Xe(e);if(!n)return 0;let s;if(!n.maxURL)s=0;else{let r=0;n.resources.forEach(i=>{r=Math.max(r,i.length)});const o=t+".json?icons=";s=n.maxURL-r-n.path.length-o.length}return s}function Mn(e){return e===404}const An=(e,t,n)=>{const s=[],r=Ln(e,t),o="icons";let i={type:o,provider:e,prefix:t,icons:[]},l=0;return n.forEach((a,u)=>{l+=a.length+1,l>=r&&u>0&&(s.push(i),i={type:o,provider:e,prefix:t,icons:[]},l=a.length),i.icons.push(a)}),s.push(i),s};function Fn(e){if(typeof e=="string"){const t=Xe(e);if(t)return t.path}return"/"}const qn=(e,t,n)=>{if(!bt){n("abort",424);return}let s=Fn(t.provider);switch(t.type){case"icons":{const o=t.prefix,l=t.icons.join(","),a=new URLSearchParams({icons:l});s+=o+".json?"+a.toString();break}case"custom":{const o=t.uri;s+=o.slice(0,1)==="/"?o.slice(1):o;break}default:n("abort",400);return}let r=503;bt(e+s).then(o=>{const i=o.status;if(i!==200){setTimeout(()=>{n(Mn(i)?"abort":"next",i)});return}return r=501,o.json()}).then(o=>{if(typeof o!="object"||o===null){setTimeout(()=>{o===404?n("abort",o):n("next",r)});return}setTimeout(()=>{n("success",o)})}).catch(()=>{n("next",r)})},Vn={prepare:An,send:qn};function Rn(e){const t={loaded:[],missing:[],pending:[]},n=Object.create(null);e.sort((r,o)=>r.provider!==o.provider?r.provider.localeCompare(o.provider):r.prefix!==o.prefix?r.prefix.localeCompare(o.prefix):r.name.localeCompare(o.name));let s={provider:"",prefix:"",name:""};return e.forEach(r=>{if(s.name===r.name&&s.prefix===r.prefix&&s.provider===r.provider)return;s=r;const o=r.provider,i=r.prefix,l=r.name,a=n[o]||(n[o]=Object.create(null)),u=a[i]||(a[i]=X(o,i));let c;l in u.icons?c=t.loaded:i===""||u.missing.has(l)?c=t.missing:c=t.pending;const f={provider:o,prefix:i,name:l};c.push(f)}),t}function Rt(e,t){e.forEach(n=>{const s=n.loaderCallbacks;s&&(n.loaderCallbacks=s.filter(r=>r.id!==t))})}function Un(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const t=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!t.length)return;let n=!1;const s=e.provider,r=e.prefix;t.forEach(o=>{const i=o.icons,l=i.pending.length;i.pending=i.pending.filter(a=>{if(a.prefix!==r)return!0;const u=a.name;if(e.icons[u])i.loaded.push({provider:s,prefix:r,name:u});else if(e.missing.has(u))i.missing.push({provider:s,prefix:r,name:u});else return n=!0,!0;return!1}),i.pending.length!==l&&(n||Rt([e],o.id),o.callback(i.loaded.slice(0),i.missing.slice(0),i.pending.slice(0),o.abort))})}))}let Bn=0;function Hn(e,t,n){const s=Bn++,r=Rt.bind(null,n,s);if(!t.pending.length)return r;const o={id:s,icons:t,callback:e,abort:r};return n.forEach(i=>{(i.loaderCallbacks||(i.loaderCallbacks=[])).push(o)}),r}function zn(e,t=!0,n=!1){const s=[];return e.forEach(r=>{const o=typeof r=="string"?xe(r,t,n):r;o&&s.push(o)}),s}var Gn={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function Qn(e,t,n,s){const r=e.resources.length,o=e.random?Math.floor(Math.random()*r):e.index;let i;if(e.random){let y=e.resources.slice(0);for(i=[];y.length>1;){const N=Math.floor(Math.random()*y.length);i.push(y[N]),y=y.slice(0,N).concat(y.slice(N+1))}i=i.concat(y)}else i=e.resources.slice(o).concat(e.resources.slice(0,o));const l=Date.now();let a="pending",u=0,c,f=null,d=[],b=[];typeof s=="function"&&b.push(s);function k(){f&&(clearTimeout(f),f=null)}function x(){a==="pending"&&(a="aborted"),k(),d.forEach(y=>{y.status==="pending"&&(y.status="aborted")}),d=[]}function E(y,N){N&&(b=[]),typeof y=="function"&&b.push(y)}function S(){return{startTime:l,payload:t,status:a,queriesSent:u,queriesPending:d.length,subscribe:E,abort:x}}function h(){a="failed",b.forEach(y=>{y(void 0,c)})}function I(){d.forEach(y=>{y.status==="pending"&&(y.status="aborted")}),d=[]}function w(y,N,M){const U=N!=="success";switch(d=d.filter(A=>A!==y),a){case"pending":break;case"failed":if(U||!e.dataAfterTimeout)return;break;default:return}if(N==="abort"){c=M,h();return}if(U){c=M,d.length||(i.length?P():h());return}if(k(),I(),!e.random){const A=e.resources.indexOf(y.resource);A!==-1&&A!==e.index&&(e.index=A)}a="completed",b.forEach(A=>{A(M)})}function P(){if(a!=="pending")return;k();const y=i.shift();if(y===void 0){if(d.length){f=setTimeout(()=>{k(),a==="pending"&&(I(),h())},e.timeout);return}h();return}const N={status:"pending",resource:y,callback:(M,U)=>{w(N,M,U)}};d.push(N),u++,f=setTimeout(P,e.rotate),n(y,t,N.callback)}return setTimeout(P),S}function Ut(e){const t={...Gn,...e};let n=[];function s(){n=n.filter(l=>l().status==="pending")}function r(l,a,u){const c=Qn(t,l,a,(f,d)=>{s(),u&&u(f,d)});return n.push(c),c}function o(l){return n.find(a=>l(a))||null}return{query:r,find:o,setIndex:l=>{t.index=l},getIndex:()=>t.index,cleanup:s}}function vt(){}const Oe=Object.create(null);function $n(e){if(!Oe[e]){const t=Xe(e);if(!t)return;const n=Ut(t),s={config:t,redundancy:n};Oe[e]=s}return Oe[e]}function Kn(e,t,n){let s,r;if(typeof e=="string"){const o=Fe(e);if(!o)return n(void 0,424),vt;r=o.send;const i=$n(e);i&&(s=i.redundancy)}else{const o=Ke(e);if(o){s=Ut(o);const i=e.resources?e.resources[0]:"",l=Fe(i);l&&(r=l.send)}}return!s||!r?(n(void 0,424),vt):s.query(t,r,n)().abort}const _t="iconify2",ie="iconify",Bt=ie+"-count",wt=ie+"-version",Ht=36e5,Wn=168,Xn=50;function qe(e,t){try{return e.getItem(t)}catch{}}function Ye(e,t,n){try{return e.setItem(t,n),!0}catch{}}function xt(e,t){try{e.removeItem(t)}catch{}}function Ve(e,t){return Ye(e,Bt,t.toString())}function Re(e){return parseInt(qe(e,Bt))||0}const ke={local:!0,session:!0},zt={local:new Set,session:new Set};let Ze=!1;function Yn(e){Ze=e}let pe=typeof window>"u"?{}:window;function Gt(e){const t=e+"Storage";try{if(pe&&pe[t]&&typeof pe[t].length=="number")return pe[t]}catch{}ke[e]=!1}function Qt(e,t){const n=Gt(e);if(!n)return;const s=qe(n,wt);if(s!==_t){if(s){const l=Re(n);for(let a=0;a<l;a++)xt(n,ie+a.toString())}Ye(n,wt,_t),Ve(n,0);return}const r=Math.floor(Date.now()/Ht)-Wn,o=l=>{const a=ie+l.toString(),u=qe(n,a);if(typeof u=="string"){try{const c=JSON.parse(u);if(typeof c=="object"&&typeof c.cached=="number"&&c.cached>r&&typeof c.provider=="string"&&typeof c.data=="object"&&typeof c.data.prefix=="string"&&t(c,l))return!0}catch{}xt(n,a)}};let i=Re(n);for(let l=i-1;l>=0;l--)o(l)||(l===i-1?(i--,Ve(n,i)):zt[e].add(l))}function $t(){if(!Ze){Yn(!0);for(const e in ke)Qt(e,t=>{const n=t.data,s=t.provider,r=n.prefix,o=X(s,r);if(!$e(o,n).length)return!1;const i=n.lastModified||-1;return o.lastModifiedCached=o.lastModifiedCached?Math.min(o.lastModifiedCached,i):i,!0})}}function Zn(e,t){const n=e.lastModifiedCached;if(n&&n>=t)return n===t;if(e.lastModifiedCached=t,n)for(const s in ke)Qt(s,r=>{const o=r.data;return r.provider!==e.provider||o.prefix!==e.prefix||o.lastModified===t});return!0}function Jn(e,t){Ze||$t();function n(s){let r;if(!ke[s]||!(r=Gt(s)))return;const o=zt[s];let i;if(o.size)o.delete(i=Array.from(o).shift());else if(i=Re(r),i>=Xn||!Ve(r,i+1))return;const l={cached:Math.floor(Date.now()/Ht),provider:e.provider,data:t};return Ye(r,ie+i.toString(),JSON.stringify(l))}t.lastModified&&!Zn(e,t.lastModified)||Object.keys(t.icons).length&&(t.not_found&&(t=Object.assign({},t),delete t.not_found),n("local")||n("session"))}function It(){}function er(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,Un(e)}))}function tr(e,t){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(t).sort():e.iconsToLoad=t,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:n,prefix:s}=e,r=e.iconsToLoad;delete e.iconsToLoad;let o;if(!r||!(o=Fe(n)))return;o.prepare(n,s,r).forEach(l=>{Kn(n,l,a=>{if(typeof a!="object")l.icons.forEach(u=>{e.missing.add(u)});else try{const u=$e(e,a);if(!u.length)return;const c=e.pendingIcons;c&&u.forEach(f=>{c.delete(f)}),Jn(e,a)}catch(u){console.error(u)}er(e)})})}))}const nr=(e,t)=>{const n=zn(e,!0,Ft()),s=Rn(n);if(!s.pending.length){let a=!0;return t&&setTimeout(()=>{a&&t(s.loaded,s.missing,s.pending,It)}),()=>{a=!1}}const r=Object.create(null),o=[];let i,l;return s.pending.forEach(a=>{const{provider:u,prefix:c}=a;if(c===l&&u===i)return;i=u,l=c,o.push(X(u,c));const f=r[u]||(r[u]=Object.create(null));f[c]||(f[c]=[])}),s.pending.forEach(a=>{const{provider:u,prefix:c,name:f}=a,d=X(u,c),b=d.pendingIcons||(d.pendingIcons=new Set);b.has(f)||(b.add(f),r[u][c].push(f))}),o.forEach(a=>{const{provider:u,prefix:c}=a;r[u][c].length&&tr(a,r[u][c])}),t?Hn(t,s,o):It};function rr(e,t){const n={...e};for(const s in t){const r=t[s],o=typeof r;s in qt?(r===null||r&&(o==="string"||o==="number"))&&(n[s]=r):o===typeof n[s]&&(n[s]=s==="rotate"?r%4:r)}return n}const sr=/[\s,]+/;function or(e,t){t.split(sr).forEach(n=>{switch(n.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}function ir(e,t=0){const n=e.replace(/^-?[0-9.]*/,"");function s(r){for(;r<0;)r+=4;return r%4}if(n===""){const r=parseInt(e);return isNaN(r)?0:s(r)}else if(n!==e){let r=0;switch(n){case"%":r=25;break;case"deg":r=90}if(r){let o=parseFloat(e.slice(0,e.length-n.length));return isNaN(o)?0:(o=o/r,o%1===0?s(o):0)}}return t}function lr(e,t){let n=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const s in t)n+=" "+s+'="'+t[s]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+e+"</svg>"}function ar(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function cr(e){return"data:image/svg+xml,"+ar(e)}function ur(e){return'url("'+cr(e)+'")'}const kt={...Vt,inline:!1},fr={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},dr={display:"inline-block"},Ue={"background-color":"currentColor"},Kt={"background-color":"transparent"},St={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},Ct={"-webkit-mask":Ue,mask:Ue,background:Kt};for(const e in Ct){const t=Ct[e];for(const n in St)t[e+"-"+n]=St[n]}function pr(e){return e+(e.match(/^[-0-9.]+$/)?"px":"")}function hr(e,t){const n=rr(kt,t),s=t.mode||"svg",r=s==="svg"?{...fr}:{};e.body.indexOf("xlink:")===-1&&delete r["xmlns:xlink"];let o=typeof t.style=="string"?t.style:"";for(let S in t){const h=t[S];if(h!==void 0)switch(S){case"icon":case"style":case"onLoad":case"mode":break;case"inline":case"hFlip":case"vFlip":n[S]=h===!0||h==="true"||h===1;break;case"flip":typeof h=="string"&&or(n,h);break;case"color":o=o+(o.length>0&&o.trim().slice(-1)!==";"?";":"")+"color: "+h+"; ";break;case"rotate":typeof h=="string"?n[S]=ir(h):typeof h=="number"&&(n[S]=h);break;case"ariaHidden":case"aria-hidden":h!==!0&&h!=="true"&&delete r["aria-hidden"];break;default:if(S.slice(0,3)==="on:")break;kt[S]===void 0&&(r[S]=h)}}const i=Cn(e,n),l=i.attributes;if(n.inline&&(o="vertical-align: -0.125em; "+o),s==="svg"){Object.assign(r,l),o!==""&&(r.style=o);let S=0,h=t.id;return typeof h=="string"&&(h=h.replace(/-/g,"_")),{svg:!0,attributes:r,body:Pn(i.body,h?()=>h+"ID"+S++:"iconifySvelte")}}const{body:a,width:u,height:c}=e,f=s==="mask"||(s==="bg"?!1:a.indexOf("currentColor")!==-1),d=lr(a,{...l,width:u+"",height:c+""}),k={"--svg":ur(d)},x=S=>{const h=l[S];h&&(k[S]=pr(h))};x("width"),x("height"),Object.assign(k,dr,f?Ue:Kt);let E="";for(const S in k)E+=S+": "+k[S]+";";return r.style=E+o,{svg:!1,attributes:r}}Ft(!0);Dn("",Vn);if(typeof document<"u"&&typeof window<"u"){$t();const e=window;if(e.IconifyPreload!==void 0){const t=e.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof t=="object"&&t!==null&&(t instanceof Array?t:[t]).forEach(s=>{try{(typeof s!="object"||s===null||s instanceof Array||typeof s.icons!="object"||typeof s.prefix!="string"||!vn(s))&&console.error(n)}catch{console.error(n)}})}if(e.IconifyProviders!==void 0){const t=e.IconifyProviders;if(typeof t=="object"&&t!==null)for(let n in t){const s="IconifyProviders["+n+"] is invalid.";try{const r=t[n];if(typeof r!="object"||!r||r.resources===void 0)continue;Nn(n,r)||console.error(s)}catch{console.error(s)}}}}function gr(e,t,n,s,r){function o(){t.loading&&(t.loading.abort(),t.loading=null)}if(typeof e=="object"&&e!==null&&typeof e.body=="string")return t.name="",o(),{data:{...Ie,...e}};let i;if(typeof e!="string"||(i=xe(e,!1,!0))===null)return o(),null;const l=yn(i);if(!l)return n&&(!t.loading||t.loading.name!==e)&&(o(),t.name="",t.loading={name:e,abort:nr([i],s)}),null;o(),t.name!==e&&(t.name=e,r&&!t.destroyed&&r(e));const a=["iconify"];return i.prefix!==""&&a.push("iconify--"+i.prefix),i.provider!==""&&a.push("iconify--"+i.provider),{data:l,classes:a}}function mr(e,t){return e?hr({...Ie,...e},t):null}function Et(e){let t;function n(o,i){return o[0].svg?br:yr}let s=n(e),r=s(e);return{c(){r.c(),t=ye()},l(o){r.l(o),t=ye()},m(o,i){r.m(o,i),D(o,t,i)},p(o,i){s===(s=n(o))&&r?r.p(o,i):(r.d(1),r=s(o),r&&(r.c(),r.m(t.parentNode,t)))},d(o){o&&g(t),r.d(o)}}}function yr(e){let t,n=[e[0].attributes],s={};for(let r=0;r<n.length;r+=1)s=be(s,n[r]);return{c(){t=v("span"),this.h()},l(r){t=_(r,"SPAN",{}),j(t).forEach(g),this.h()},h(){ut(t,s)},m(r,o){D(r,t,o)},p(r,o){ut(t,s=Ot(n,[o&1&&r[0].attributes]))},d(r){r&&g(t)}}}function br(e){let t,n,s=e[0].body+"",r=[e[0].attributes],o={};for(let i=0;i<r.length;i+=1)o=be(o,r[i]);return{c(){t=Yt("svg"),n=new Zt(!0),this.h()},l(i){t=Jt(i,"svg",{});var l=j(t);n=en(l,!0),l.forEach(g),this.h()},h(){n.a=null,ft(t,o)},m(i,l){D(i,t,l),n.m(s,t)},p(i,l){l&1&&s!==(s=i[0].body+"")&&n.p(s),ft(t,o=Ot(r,[l&1&&i[0].attributes]))},d(i){i&&g(t)}}}function vr(e){let t,n=e[0]&&Et(e);return{c(){n&&n.c(),t=ye()},l(s){n&&n.l(s),t=ye()},m(s,r){n&&n.m(s,r),D(s,t,r)},p(s,[r]){s[0]?n?n.p(s,r):(n=Et(s),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},i:W,o:W,d(s){s&&g(t),n&&n.d(s)}}}function _r(e,t,n){const s={name:"",loading:null,destroyed:!1};let r=!1,o=0,i;const l=u=>{typeof t.onLoad=="function"&&t.onLoad(u),tn()("load",{icon:u})};function a(){n(3,o++,o)}return Wt(()=>{n(2,r=!0)}),Xt(()=>{n(1,s.destroyed=!0,s),s.loading&&(s.loading.abort(),n(1,s.loading=null,s))}),e.$$set=u=>{n(6,t=be(be({},t),ct(u)))},e.$$.update=()=>{{const u=gr(t.icon,s,r,a,l);n(0,i=u?mr(u.data,t):null),i&&u.classes&&n(0,i.attributes.class=(typeof t.class=="string"?t.class+" ":"")+u.classes.join(" "),i)}},t=ct(t),[i,s,r,o]}class wr extends He{constructor(t){super(),ze(this,t,_r,vr,Be,{})}}function xr(e){let t;return{c(){t=V("???")},l(n){t=R(n,"???")},m(n,s){D(n,t,s)},p:W,d(n){n&&g(t)}}}function Ir(e){let t=e[0].jaName+"",n,s,r=e[0].enName+"",o,i,l,a=(e[0]!==null?e[0].jaGenus:"???")+"",u;return{c(){n=V(t),s=V(" : "),o=V(r),i=O(),l=v("span"),u=V(a),this.h()},l(c){n=R(c,t),s=R(c," : "),o=R(c,r),i=L(c),l=_(c,"SPAN",{class:!0});var f=j(l);u=R(f,a),f.forEach(g),this.h()},h(){m(l,"class","text-lg font-normal text-gray-700 ml-4")},m(c,f){D(c,n,f),D(c,s,f),D(c,o,f),D(c,i,f),D(c,l,f),p(l,u)},p(c,f){f&1&&t!==(t=c[0].jaName+"")&&K(n,t),f&1&&r!==(r=c[0].enName+"")&&K(o,r),f&1&&a!==(a=(c[0]!==null?c[0].jaGenus:"???")+"")&&K(u,a)},d(c){c&&(g(n),g(s),g(o),g(i),g(l))}}}function kr(e){let t,n;return t=new wr({props:{icon:"mdi:image-off-outline",height:"40"}}),{c(){Tt(t.$$.fragment)},l(s){Pt(t.$$.fragment,s)},m(s,r){Dt(t,s,r),n=!0},p:W,i(s){n||(_e(t.$$.fragment,s),n=!0)},o(s){ve(t.$$.fragment,s),n=!1},d(s){Nt(t,s)}}}function Sr(e){let t,n,s,r,o,i;return{c(){t=v("button"),n=v("img"),this.h()},l(l){t=_(l,"BUTTON",{type:!0,"aria-label":!0});var a=j(t);n=_(a,"IMG",{src:!0,alt:!0,class:!0}),a.forEach(g),this.h()},h(){dt(n.src,s=e[0].imageUrl[e[1]])||m(n,"src",s),m(n,"alt",r=e[0].jaName),m(n,"class","w-48 h-48"),m(t,"type","button"),m(t,"aria-label","Toggle Image")},m(l,a){D(l,t,a),p(t,n),o||(i=Le(t,"click",e[2]),o=!0)},p(l,a){a&3&&!dt(n.src,s=l[0].imageUrl[l[1]])&&m(n,"src",s),a&1&&r!==(r=l[0].jaName)&&m(n,"alt",r)},i:W,o:W,d(l){l&&g(t),o=!1,i()}}}function Cr(e){let t,n="???";return{c(){t=v("li"),t.textContent=n,this.h()},l(s){t=_(s,"LI",{class:!0,"data-svelte-h":!0}),$(t)!=="svelte-ky9waa"&&(t.textContent=n),this.h()},h(){m(t,"class","text-gray-600")},m(s,r){D(s,t,r)},p:W,d(s){s&&g(t)}}}function Er(e){var a,u,c;let t,n=((a=e[0])==null?void 0:a.type1.jaName)+"",s,r,o,i=(((u=e[0])==null?void 0:u.type2)!==null?(c=e[0])==null?void 0:c.type2.jaName:"なし")+"",l;return{c(){t=v("li"),s=V(n),r=O(),o=v("li"),l=V(i),this.h()},l(f){t=_(f,"LI",{class:!0});var d=j(t);s=R(d,n),d.forEach(g),r=L(f),o=_(f,"LI",{class:!0});var b=j(o);l=R(b,i),b.forEach(g),this.h()},h(){m(t,"class","text-gray-600"),m(o,"class","text-gray-600")},m(f,d){D(f,t,d),p(t,s),D(f,r,d),D(f,o,d),p(o,l)},p(f,d){var b,k,x;d&1&&n!==(n=((b=f[0])==null?void 0:b.type1.jaName)+"")&&K(s,n),d&1&&i!==(i=(((k=f[0])==null?void 0:k.type2)!==null?(x=f[0])==null?void 0:x.type2.jaName:"なし")+"")&&K(l,i)},d(f){f&&(g(t),g(r),g(o))}}}function jr(e){var st,ot;let t,n,s,r,o,i,l,a,u,c,f,d,b,k,x,E="タイプ",S,h,I,w,P,y="たかさ",N,M,U=he((st=e[0])==null?void 0:st.height)+"",A,Se,Ce,B,z,Je="おもさ",Ee,G,ee=he((ot=e[0])==null?void 0:ot.weight)+"",le,je,Te,te,Y;function et(C,T){return C[0]!==null?Ir:xr}let ae=et(e),F=ae(e);const tt=[Sr,kr],H=[];function nt(C,T){return C[0]!==null?0:1}c=nt(e),f=H[c]=tt[c](e);function rt(C,T){return C[0]!==null?Er:Cr}let ce=rt(e),q=ce(e);return{c(){t=v("div"),n=v("header"),s=O(),r=v("div"),o=v("h1"),F.c(),i=O(),l=v("div"),a=v("div"),u=v("div"),f.c(),d=O(),b=v("div"),k=v("div"),x=v("h2"),x.textContent=E,S=O(),h=v("ul"),q.c(),I=O(),w=v("div"),P=v("h2"),P.textContent=y,N=O(),M=v("p"),A=V(U),Se=V(" m"),Ce=O(),B=v("div"),z=v("h2"),z.textContent=Je,Ee=O(),G=v("p"),le=V(ee),je=V(" kg"),Te=O(),te=v("footer"),this.h()},l(C){t=_(C,"DIV",{class:!0});var T=j(t);n=_(T,"HEADER",{class:!0}),j(n).forEach(g),s=L(T),r=_(T,"DIV",{class:!0});var Z=j(r);o=_(Z,"H1",{class:!0});var ne=j(o);F.l(ne),ne.forEach(g),Z.forEach(g),i=L(T),l=_(T,"DIV",{class:!0});var Q=j(l);a=_(Q,"DIV",{class:!0});var it=j(a);u=_(it,"DIV",{class:!0});var lt=j(u);f.l(lt),lt.forEach(g),it.forEach(g),d=L(Q),b=_(Q,"DIV",{class:!0});var J=j(b);k=_(J,"DIV",{class:!0});var ue=j(k);x=_(ue,"H2",{class:!0,"data-svelte-h":!0}),$(x)!=="svelte-58ktvz"&&(x.textContent=E),S=L(ue),h=_(ue,"UL",{class:!0});var at=j(h);q.l(at),at.forEach(g),ue.forEach(g),I=L(J),w=_(J,"DIV",{class:!0});var fe=j(w);P=_(fe,"H2",{class:!0,"data-svelte-h":!0}),$(P)!=="svelte-q1du04"&&(P.textContent=y),N=L(fe),M=_(fe,"P",{class:!0});var Pe=j(M);A=R(Pe,U),Se=R(Pe," m"),Pe.forEach(g),fe.forEach(g),Ce=L(J),B=_(J,"DIV",{class:!0});var de=j(B);z=_(de,"H2",{class:!0,"data-svelte-h":!0}),$(z)!=="svelte-6it6r6"&&(z.textContent=Je),Ee=L(de),G=_(de,"P",{class:!0});var De=j(G);le=R(De,ee),je=R(De," kg"),De.forEach(g),de.forEach(g),J.forEach(g),Q.forEach(g),Te=L(T),te=_(T,"FOOTER",{class:!0}),j(te).forEach(g),T.forEach(g),this.h()},h(){m(n,"class","p-4 bg-red-100"),m(o,"class","text-2xl font-bold text-gray-900"),m(r,"class","p-2"),m(u,"class","w-48 h-48 bg-white rounded-lg border border-gray-200 flex items-center justify-center"),m(a,"class","p-2 flex justify-center"),m(x,"class","text-xl font-semibold text-gray-700"),m(h,"class","list-inside flex space-x-4"),m(k,"class","mb-2"),m(P,"class","text-xl font-semibold text-gray-700"),m(M,"class","text-gray-600"),m(w,"class","mb-2"),m(z,"class","text-xl font-semibold text-gray-700"),m(G,"class","text-gray-600"),m(B,"class","mb-2"),m(b,"class","p-2"),m(l,"class","grid md:grid-cols-2 w-full"),m(te,"class","p-4 bg-red-100"),m(t,"class","grid border bg-gray-50 border-gray-300 rounded-lg shadow-lg max-w-[600px]")},m(C,T){D(C,t,T),p(t,n),p(t,s),p(t,r),p(r,o),F.m(o,null),p(t,i),p(t,l),p(l,a),p(a,u),H[c].m(u,null),p(l,d),p(l,b),p(b,k),p(k,x),p(k,S),p(k,h),q.m(h,null),p(b,I),p(b,w),p(w,P),p(w,N),p(w,M),p(M,A),p(M,Se),p(b,Ce),p(b,B),p(B,z),p(B,Ee),p(B,G),p(G,le),p(G,je),p(t,Te),p(t,te),Y=!0},p(C,[T]){var ne,Q;ae===(ae=et(C))&&F?F.p(C,T):(F.d(1),F=ae(C),F&&(F.c(),F.m(o,null)));let Z=c;c=nt(C),c===Z?H[c].p(C,T):(sn(),ve(H[Z],1,1,()=>{H[Z]=null}),on(),f=H[c],f?f.p(C,T):(f=H[c]=tt[c](C),f.c()),_e(f,1),f.m(u,null)),ce===(ce=rt(C))&&q?q.p(C,T):(q.d(1),q=ce(C),q&&(q.c(),q.m(h,null))),(!Y||T&1)&&U!==(U=he((ne=C[0])==null?void 0:ne.height)+"")&&K(A,U),(!Y||T&1)&&ee!==(ee=he((Q=C[0])==null?void 0:Q.weight)+"")&&K(le,ee)},i(C){Y||(_e(f),Y=!0)},o(C){ve(f),Y=!1},d(C){C&&g(t),F.d(),H[c].d(),q.d()}}}function he(e){return e!==void 0?(e*.1).toFixed(1):"???"}function Tr(e,t,n){let{pokeData:s=null}=t,r=0;function o(){n(1,r=(r+1)%2)}return e.$$set=i=>{"pokeData"in i&&n(0,s=i.pokeData)},[s,r,o]}class Pr extends He{constructor(t){super(),ze(this,t,Tr,jr,Be,{pokeData:0})}}function Dr(e){let t,n,s="ポケモン検索",r,o,i,l,a="全国図鑑No:",u,c,f,d,b="検索",k,x,E,S,h;return x=new Pr({props:{pokeData:e[1]}}),{c(){t=v("div"),n=v("h1"),n.textContent=s,r=O(),o=v("div"),i=v("form"),l=v("label"),l.textContent=a,u=O(),c=v("input"),f=O(),d=v("button"),d.textContent=b,k=O(),Tt(x.$$.fragment),this.h()},l(I){t=_(I,"DIV",{class:!0});var w=j(t);n=_(w,"H1",{class:!0,"data-svelte-h":!0}),$(n)!=="svelte-12lyrzc"&&(n.textContent=s),r=L(w),o=_(w,"DIV",{class:!0});var P=j(o);i=_(P,"FORM",{class:!0});var y=j(i);l=_(y,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),$(l)!=="svelte-74onxo"&&(l.textContent=a),u=L(y),c=_(y,"INPUT",{type:!0,id:!0,class:!0}),f=L(y),d=_(y,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),$(d)!=="svelte-h3mphk"&&(d.textContent=b),y.forEach(g),k=L(P),Pt(x.$$.fragment,P),P.forEach(g),w.forEach(g),this.h()},h(){m(n,"class","text-3xl font-bold"),m(l,"for","pokeId"),m(l,"class","text-lg"),m(c,"type","number"),m(c,"id","pokeId"),m(c,"class","border border-gray-300 rounded px-2 py-1"),m(d,"type","submit"),m(d,"class","bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"),m(i,"class","flex items-center space-x-3"),m(o,"class","space-y-5 min-w-[300px] max-w-[1200px]"),m(t,"class","h-full w-full mx-auto container")},m(I,w){D(I,t,w),p(t,n),p(t,r),p(t,o),p(o,i),p(i,l),p(i,u),p(i,c),pt(c,e[0]),p(i,f),p(i,d),p(o,k),Dt(x,o,null),E=!0,S||(h=[Le(c,"input",e[3]),Le(i,"submit",nn(e[2]))],S=!0)},p(I,[w]){w&1&&jt(c.value)!==I[0]&&pt(c,I[0]);const P={};w&2&&(P.pokeData=I[1]),x.$set(P)},i(I){E||(_e(x.$$.fragment,I),E=!0)},o(I){ve(x.$$.fragment,I),E=!1},d(I){I&&g(t),Nt(x),S=!1,rn(h)}}}function Nr(e,t,n){let s="",r=null;async function o(){try{n(1,r=await un(fetch,s))}catch{n(1,r=null)}}function i(){s=jt(this.value),n(0,s)}return[s,r,o,i]}class Ar extends He{constructor(t){super(),ze(this,t,Nr,Dr,Be,{})}}export{Ar as component};
