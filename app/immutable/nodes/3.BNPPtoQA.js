import{s as rt,q as Te,i as te,n as me,f as I,u as gn,R as mn,S as Pe,T as jt,e as x,c as _,b as k,U as Tt,V as yn,W as bn,X as vn,Y as wn,Z as Pt,_ as xn,a as N,t as F,d as O,k as q,g as oe,h,j as f,m as J,$ as Dt,l as We,a0 as Nt,p as _n,a1 as $t,B as In}from"../chunks/scheduler.CpnG_ZNi.js";import{S as st,i as ot,g as kn,t as De,c as Sn,a as Ne,b as Kt,d as Wt,m as Xt,e as Yt}from"../chunks/index.GCM9fUSs.js";import{g as Zt}from"../chunks/spread.CgU5AtxT.js";function it(){return{credentials:"same-origin"}}async function lt(e,t,n){try{const s=await e(t,n);if(!s.ok)throw console.error("API response:",s.status),new Error(`Failed to fetch: ${n.method} ${t}`);return s}catch(s){throw console.error("API error:",s),new Error(`Failed to fetch: ${n.method} ${t}`)}}async function Cn(e,t){const n=`https://pokeapi.co/api/v2/pokemon/${t}`,r={...it(),method:"GET"};return await(await lt(e,n,r)).json()}async function En(e,t){const s={...it(),method:"GET"};return await(await lt(e,t,s)).json()}async function Ot(e,t){const s={...it(),method:"GET"};return await(await lt(e,t,s)).json()}function jn(e,t,n,s){var r,o,i,l;return{id:e.id,enName:e.species.name,jaName:((r=t.names.find(a=>a.language.name==="ja"))==null?void 0:r.name)??"???",imageUrl:[e.sprites.front_default,e.sprites.back_default],jaGenus:((o=t.genera.find(a=>a.language.name==="ja"))==null?void 0:o.genus)??"???",type1:{enName:e.types[0].type.name,jaName:((i=n.names.find(a=>a.language.name==="ja"))==null?void 0:i.name)??"???"},type2:s!==null?{enName:e.types[0].type.name,jaName:((l=s.names.find(a=>a.language.name==="ja"))==null?void 0:l.name)??"???"}:null,height:e.height,weight:e.weight}}async function Tn(e,t){const n=await Cn(e,t),s=await En(e,n.species.url),r=await Ot(e,n.types[0].type.url),o=n.types[1]?await Ot(e,n.types[1].type.url):null;return jn(n,s,r,o)}const ge=/^[a-z0-9]+(-[a-z0-9]+)*$/,Le=(e,t,n,s="")=>{const r=e.split(":");if(e.slice(0,1)==="@"){if(r.length<2||r.length>3)return null;s=r.shift().slice(1)}if(r.length>3||!r.length)return null;if(r.length>1){const l=r.pop(),a=r.pop(),c={provider:r.length>0?r[0]:s,prefix:a,name:l};return t&&!Ee(c)?null:c}const o=r[0],i=o.split("-");if(i.length>1){const l={provider:s,prefix:i.shift(),name:i.join("-")};return t&&!Ee(l)?null:l}if(n&&s===""){const l={provider:s,prefix:"",name:o};return t&&!Ee(l,n)?null:l}return null},Ee=(e,t)=>e?!!((e.provider===""||e.provider.match(ge))&&(t&&e.prefix===""||e.prefix.match(ge))&&e.name.match(ge)):!1,Jt=Object.freeze({left:0,top:0,width:16,height:16}),Oe=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),Me=Object.freeze({...Jt,...Oe}),Xe=Object.freeze({...Me,body:"",hidden:!1});function Pn(e,t){const n={};!e.hFlip!=!t.hFlip&&(n.hFlip=!0),!e.vFlip!=!t.vFlip&&(n.vFlip=!0);const s=((e.rotate||0)+(t.rotate||0))%4;return s&&(n.rotate=s),n}function Lt(e,t){const n=Pn(e,t);for(const s in Xe)s in Oe?s in e&&!(s in n)&&(n[s]=Oe[s]):s in t?n[s]=t[s]:s in e&&(n[s]=e[s]);return n}function Dn(e,t){const n=e.icons,s=e.aliases||Object.create(null),r=Object.create(null);function o(i){if(n[i])return r[i]=[];if(!(i in r)){r[i]=null;const l=s[i]&&s[i].parent,a=l&&o(l);a&&(r[i]=[l].concat(a))}return r[i]}return Object.keys(n).concat(Object.keys(s)).forEach(o),r}function Nn(e,t,n){const s=e.icons,r=e.aliases||Object.create(null);let o={};function i(l){o=Lt(s[l]||r[l],o)}return i(t),n.forEach(i),Lt(e,o)}function en(e,t){const n=[];if(typeof e!="object"||typeof e.icons!="object")return n;e.not_found instanceof Array&&e.not_found.forEach(r=>{t(r,null),n.push(r)});const s=Dn(e);for(const r in s){const o=s[r];o&&(t(r,Nn(e,r,o)),n.push(r))}return n}const On={provider:"",aliases:{},not_found:{},...Jt};function $e(e,t){for(const n in t)if(n in e&&typeof e[n]!=typeof t[n])return!1;return!0}function tn(e){if(typeof e!="object"||e===null)return null;const t=e;if(typeof t.prefix!="string"||!e.icons||typeof e.icons!="object"||!$e(e,On))return null;const n=t.icons;for(const r in n){const o=n[r];if(!r.match(ge)||typeof o.body!="string"||!$e(o,Xe))return null}const s=t.aliases||Object.create(null);for(const r in s){const o=s[r],i=o.parent;if(!r.match(ge)||typeof i!="string"||!n[i]&&!s[i]||!$e(o,Xe))return null}return t}const Mt=Object.create(null);function Ln(e,t){return{provider:e,prefix:t,icons:Object.create(null),missing:new Set}}function ee(e,t){const n=Mt[e]||(Mt[e]=Object.create(null));return n[t]||(n[t]=Ln(e,t))}function at(e,t){return tn(t)?en(t,(n,s)=>{s?e.icons[n]=s:e.missing.add(n)}):[]}function Mn(e,t,n){try{if(typeof n.body=="string")return e.icons[t]={...n},!0}catch{}return!1}let ye=!1;function nn(e){return typeof e=="boolean"&&(ye=e),ye}function An(e){const t=typeof e=="string"?Le(e,!0,ye):e;if(t){const n=ee(t.provider,t.prefix),s=t.name;return n.icons[s]||(n.missing.has(s)?null:void 0)}}function Fn(e,t){const n=Le(e,!0,ye);if(!n)return!1;const s=ee(n.provider,n.prefix);return Mn(s,n.name,t)}function qn(e,t){if(typeof e!="object")return!1;if(typeof t!="string"&&(t=e.provider||""),ye&&!t&&!e.prefix){let r=!1;return tn(e)&&(e.prefix="",en(e,(o,i)=>{i&&Fn(o,i)&&(r=!0)})),r}const n=e.prefix;if(!Ee({provider:t,prefix:n,name:"a"}))return!1;const s=ee(t,n);return!!at(s,e)}const rn=Object.freeze({width:null,height:null}),sn=Object.freeze({...rn,...Oe}),Vn=/(-?[0-9.]*[0-9]+[0-9.]*)/g,Rn=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function At(e,t,n){if(t===1)return e;if(n=n||100,typeof e=="number")return Math.ceil(e*t*n)/n;if(typeof e!="string")return e;const s=e.split(Vn);if(s===null||!s.length)return e;const r=[];let o=s.shift(),i=Rn.test(o);for(;;){if(i){const l=parseFloat(o);isNaN(l)?r.push(o):r.push(Math.ceil(l*t*n)/n)}else r.push(o);if(o=s.shift(),o===void 0)return r.join("");i=!i}}function Un(e,t="defs"){let n="";const s=e.indexOf("<"+t);for(;s>=0;){const r=e.indexOf(">",s),o=e.indexOf("</"+t);if(r===-1||o===-1)break;const i=e.indexOf(">",o);if(i===-1)break;n+=e.slice(r+1,o).trim(),e=e.slice(0,s).trim()+e.slice(i+1)}return{defs:n,content:e}}function Bn(e,t){return e?"<defs>"+e+"</defs>"+t:t}function Hn(e,t,n){const s=Un(e);return Bn(s.defs,t+s.content+n)}const zn=e=>e==="unset"||e==="undefined"||e==="none";function Gn(e,t){const n={...Me,...e},s={...sn,...t},r={left:n.left,top:n.top,width:n.width,height:n.height};let o=n.body;[n,s].forEach(S=>{const v=[],w=S.hFlip,p=S.vFlip;let g=S.rotate;w?p?g+=2:(v.push("translate("+(r.width+r.left).toString()+" "+(0-r.top).toString()+")"),v.push("scale(-1 1)"),r.top=r.left=0):p&&(v.push("translate("+(0-r.left).toString()+" "+(r.height+r.top).toString()+")"),v.push("scale(1 -1)"),r.top=r.left=0);let y;switch(g<0&&(g-=Math.floor(g/4)*4),g=g%4,g){case 1:y=r.height/2+r.top,v.unshift("rotate(90 "+y.toString()+" "+y.toString()+")");break;case 2:v.unshift("rotate(180 "+(r.width/2+r.left).toString()+" "+(r.height/2+r.top).toString()+")");break;case 3:y=r.width/2+r.left,v.unshift("rotate(-90 "+y.toString()+" "+y.toString()+")");break}g%2===1&&(r.left!==r.top&&(y=r.left,r.left=r.top,r.top=y),r.width!==r.height&&(y=r.width,r.width=r.height,r.height=y)),v.length&&(o=Hn(o,'<g transform="'+v.join(" ")+'">',"</g>"))});const i=s.width,l=s.height,a=r.width,c=r.height;let u,b;i===null?(b=l===null?"1em":l==="auto"?c:l,u=At(b,a/c)):(u=i==="auto"?a:i,b=l===null?At(u,c/a):l==="auto"?c:l);const m={},E=(S,v)=>{zn(v)||(m[S]=v.toString())};E("width",u),E("height",b);const j=[r.left,r.top,a,c];return m.viewBox=j.join(" "),{attributes:m,viewBox:j,body:o}}const Qn=/\sid="(\S+)"/g,$n="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let Kn=0;function Wn(e,t=$n){const n=[];let s;for(;s=Qn.exec(e);)n.push(s[1]);if(!n.length)return e;const r="suffix"+(Math.random()*16777216|Date.now()).toString(16);return n.forEach(o=>{const i=typeof t=="function"?t(o):t+(Kn++).toString(),l=o.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e=e.replace(new RegExp('([#;"])('+l+')([")]|\\.[a-z])',"g"),"$1"+i+r+"$3")}),e=e.replace(new RegExp(r,"g"),""),e}const Ye=Object.create(null);function Xn(e,t){Ye[e]=t}function Ze(e){return Ye[e]||Ye[""]}function ct(e){let t;if(typeof e.resources=="string")t=[e.resources];else if(t=e.resources,!(t instanceof Array)||!t.length)return null;return{resources:t,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const ut=Object.create(null),he=["https://api.simplesvg.com","https://api.unisvg.com"],je=[];for(;he.length>0;)he.length===1||Math.random()>.5?je.push(he.shift()):je.push(he.pop());ut[""]=ct({resources:["https://api.iconify.design"].concat(je)});function Yn(e,t){const n=ct(t);return n===null?!1:(ut[e]=n,!0)}function ft(e){return ut[e]}const Zn=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let Ft=Zn();function Jn(e,t){const n=ft(e);if(!n)return 0;let s;if(!n.maxURL)s=0;else{let r=0;n.resources.forEach(i=>{r=Math.max(r,i.length)});const o=t+".json?icons=";s=n.maxURL-r-n.path.length-o.length}return s}function er(e){return e===404}const tr=(e,t,n)=>{const s=[],r=Jn(e,t),o="icons";let i={type:o,provider:e,prefix:t,icons:[]},l=0;return n.forEach((a,c)=>{l+=a.length+1,l>=r&&c>0&&(s.push(i),i={type:o,provider:e,prefix:t,icons:[]},l=a.length),i.icons.push(a)}),s.push(i),s};function nr(e){if(typeof e=="string"){const t=ft(e);if(t)return t.path}return"/"}const rr=(e,t,n)=>{if(!Ft){n("abort",424);return}let s=nr(t.provider);switch(t.type){case"icons":{const o=t.prefix,l=t.icons.join(","),a=new URLSearchParams({icons:l});s+=o+".json?"+a.toString();break}case"custom":{const o=t.uri;s+=o.slice(0,1)==="/"?o.slice(1):o;break}default:n("abort",400);return}let r=503;Ft(e+s).then(o=>{const i=o.status;if(i!==200){setTimeout(()=>{n(er(i)?"abort":"next",i)});return}return r=501,o.json()}).then(o=>{if(typeof o!="object"||o===null){setTimeout(()=>{o===404?n("abort",o):n("next",r)});return}setTimeout(()=>{n("success",o)})}).catch(()=>{n("next",r)})},sr={prepare:tr,send:rr};function or(e){const t={loaded:[],missing:[],pending:[]},n=Object.create(null);e.sort((r,o)=>r.provider!==o.provider?r.provider.localeCompare(o.provider):r.prefix!==o.prefix?r.prefix.localeCompare(o.prefix):r.name.localeCompare(o.name));let s={provider:"",prefix:"",name:""};return e.forEach(r=>{if(s.name===r.name&&s.prefix===r.prefix&&s.provider===r.provider)return;s=r;const o=r.provider,i=r.prefix,l=r.name,a=n[o]||(n[o]=Object.create(null)),c=a[i]||(a[i]=ee(o,i));let u;l in c.icons?u=t.loaded:i===""||c.missing.has(l)?u=t.missing:u=t.pending;const b={provider:o,prefix:i,name:l};u.push(b)}),t}function on(e,t){e.forEach(n=>{const s=n.loaderCallbacks;s&&(n.loaderCallbacks=s.filter(r=>r.id!==t))})}function ir(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const t=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!t.length)return;let n=!1;const s=e.provider,r=e.prefix;t.forEach(o=>{const i=o.icons,l=i.pending.length;i.pending=i.pending.filter(a=>{if(a.prefix!==r)return!0;const c=a.name;if(e.icons[c])i.loaded.push({provider:s,prefix:r,name:c});else if(e.missing.has(c))i.missing.push({provider:s,prefix:r,name:c});else return n=!0,!0;return!1}),i.pending.length!==l&&(n||on([e],o.id),o.callback(i.loaded.slice(0),i.missing.slice(0),i.pending.slice(0),o.abort))})}))}let lr=0;function ar(e,t,n){const s=lr++,r=on.bind(null,n,s);if(!t.pending.length)return r;const o={id:s,icons:t,callback:e,abort:r};return n.forEach(i=>{(i.loaderCallbacks||(i.loaderCallbacks=[])).push(o)}),r}function cr(e,t=!0,n=!1){const s=[];return e.forEach(r=>{const o=typeof r=="string"?Le(r,t,n):r;o&&s.push(o)}),s}var ur={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function fr(e,t,n,s){const r=e.resources.length,o=e.random?Math.floor(Math.random()*r):e.index;let i;if(e.random){let d=e.resources.slice(0);for(i=[];d.length>1;){const T=Math.floor(Math.random()*d.length);i.push(d[T]),d=d.slice(0,T).concat(d.slice(T+1))}i=i.concat(d)}else i=e.resources.slice(o).concat(e.resources.slice(0,o));const l=Date.now();let a="pending",c=0,u,b=null,m=[],E=[];typeof s=="function"&&E.push(s);function j(){b&&(clearTimeout(b),b=null)}function S(){a==="pending"&&(a="aborted"),j(),m.forEach(d=>{d.status==="pending"&&(d.status="aborted")}),m=[]}function v(d,T){T&&(E=[]),typeof d=="function"&&E.push(d)}function w(){return{startTime:l,payload:t,status:a,queriesSent:c,queriesPending:m.length,subscribe:v,abort:S}}function p(){a="failed",E.forEach(d=>{d(void 0,u)})}function g(){m.forEach(d=>{d.status==="pending"&&(d.status="aborted")}),m=[]}function y(d,T,L){const G=T!=="success";switch(m=m.filter(M=>M!==d),a){case"pending":break;case"failed":if(G||!e.dataAfterTimeout)return;break;default:return}if(T==="abort"){u=L,p();return}if(G){u=L,m.length||(i.length?D():p());return}if(j(),g(),!e.random){const M=e.resources.indexOf(d.resource);M!==-1&&M!==e.index&&(e.index=M)}a="completed",E.forEach(M=>{M(L)})}function D(){if(a!=="pending")return;j();const d=i.shift();if(d===void 0){if(m.length){b=setTimeout(()=>{j(),a==="pending"&&(g(),p())},e.timeout);return}p();return}const T={status:"pending",resource:d,callback:(L,G)=>{y(T,L,G)}};m.push(T),c++,b=setTimeout(D,e.rotate),n(d,t,T.callback)}return setTimeout(D),w}function ln(e){const t={...ur,...e};let n=[];function s(){n=n.filter(l=>l().status==="pending")}function r(l,a,c){const u=fr(t,l,a,(b,m)=>{s(),c&&c(b,m)});return n.push(u),u}function o(l){return n.find(a=>l(a))||null}return{query:r,find:o,setIndex:l=>{t.index=l},getIndex:()=>t.index,cleanup:s}}function qt(){}const Ke=Object.create(null);function dr(e){if(!Ke[e]){const t=ft(e);if(!t)return;const n=ln(t),s={config:t,redundancy:n};Ke[e]=s}return Ke[e]}function pr(e,t,n){let s,r;if(typeof e=="string"){const o=Ze(e);if(!o)return n(void 0,424),qt;r=o.send;const i=dr(e);i&&(s=i.redundancy)}else{const o=ct(e);if(o){s=ln(o);const i=e.resources?e.resources[0]:"",l=Ze(i);l&&(r=l.send)}}return!s||!r?(n(void 0,424),qt):s.query(t,r,n)().abort}const Vt="iconify2",be="iconify",an=be+"-count",Rt=be+"-version",cn=36e5,hr=168,gr=50;function Je(e,t){try{return e.getItem(t)}catch{}}function dt(e,t,n){try{return e.setItem(t,n),!0}catch{}}function Ut(e,t){try{e.removeItem(t)}catch{}}function et(e,t){return dt(e,an,t.toString())}function tt(e){return parseInt(Je(e,an))||0}const Ae={local:!0,session:!0},un={local:new Set,session:new Set};let pt=!1;function mr(e){pt=e}let Se=typeof window>"u"?{}:window;function fn(e){const t=e+"Storage";try{if(Se&&Se[t]&&typeof Se[t].length=="number")return Se[t]}catch{}Ae[e]=!1}function dn(e,t){const n=fn(e);if(!n)return;const s=Je(n,Rt);if(s!==Vt){if(s){const l=tt(n);for(let a=0;a<l;a++)Ut(n,be+a.toString())}dt(n,Rt,Vt),et(n,0);return}const r=Math.floor(Date.now()/cn)-hr,o=l=>{const a=be+l.toString(),c=Je(n,a);if(typeof c=="string"){try{const u=JSON.parse(c);if(typeof u=="object"&&typeof u.cached=="number"&&u.cached>r&&typeof u.provider=="string"&&typeof u.data=="object"&&typeof u.data.prefix=="string"&&t(u,l))return!0}catch{}Ut(n,a)}};let i=tt(n);for(let l=i-1;l>=0;l--)o(l)||(l===i-1?(i--,et(n,i)):un[e].add(l))}function pn(){if(!pt){mr(!0);for(const e in Ae)dn(e,t=>{const n=t.data,s=t.provider,r=n.prefix,o=ee(s,r);if(!at(o,n).length)return!1;const i=n.lastModified||-1;return o.lastModifiedCached=o.lastModifiedCached?Math.min(o.lastModifiedCached,i):i,!0})}}function yr(e,t){const n=e.lastModifiedCached;if(n&&n>=t)return n===t;if(e.lastModifiedCached=t,n)for(const s in Ae)dn(s,r=>{const o=r.data;return r.provider!==e.provider||o.prefix!==e.prefix||o.lastModified===t});return!0}function br(e,t){pt||pn();function n(s){let r;if(!Ae[s]||!(r=fn(s)))return;const o=un[s];let i;if(o.size)o.delete(i=Array.from(o).shift());else if(i=tt(r),i>=gr||!et(r,i+1))return;const l={cached:Math.floor(Date.now()/cn),provider:e.provider,data:t};return dt(r,be+i.toString(),JSON.stringify(l))}t.lastModified&&!yr(e,t.lastModified)||Object.keys(t.icons).length&&(t.not_found&&(t=Object.assign({},t),delete t.not_found),n("local")||n("session"))}function Bt(){}function vr(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,ir(e)}))}function wr(e,t){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(t).sort():e.iconsToLoad=t,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:n,prefix:s}=e,r=e.iconsToLoad;delete e.iconsToLoad;let o;if(!r||!(o=Ze(n)))return;o.prepare(n,s,r).forEach(l=>{pr(n,l,a=>{if(typeof a!="object")l.icons.forEach(c=>{e.missing.add(c)});else try{const c=at(e,a);if(!c.length)return;const u=e.pendingIcons;u&&c.forEach(b=>{u.delete(b)}),br(e,a)}catch(c){console.error(c)}vr(e)})})}))}const xr=(e,t)=>{const n=cr(e,!0,nn()),s=or(n);if(!s.pending.length){let a=!0;return t&&setTimeout(()=>{a&&t(s.loaded,s.missing,s.pending,Bt)}),()=>{a=!1}}const r=Object.create(null),o=[];let i,l;return s.pending.forEach(a=>{const{provider:c,prefix:u}=a;if(u===l&&c===i)return;i=c,l=u,o.push(ee(c,u));const b=r[c]||(r[c]=Object.create(null));b[u]||(b[u]=[])}),s.pending.forEach(a=>{const{provider:c,prefix:u,name:b}=a,m=ee(c,u),E=m.pendingIcons||(m.pendingIcons=new Set);E.has(b)||(E.add(b),r[c][u].push(b))}),o.forEach(a=>{const{provider:c,prefix:u}=a;r[c][u].length&&wr(a,r[c][u])}),t?ar(t,s,o):Bt};function _r(e,t){const n={...e};for(const s in t){const r=t[s],o=typeof r;s in rn?(r===null||r&&(o==="string"||o==="number"))&&(n[s]=r):o===typeof n[s]&&(n[s]=s==="rotate"?r%4:r)}return n}const Ir=/[\s,]+/;function kr(e,t){t.split(Ir).forEach(n=>{switch(n.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}function Sr(e,t=0){const n=e.replace(/^-?[0-9.]*/,"");function s(r){for(;r<0;)r+=4;return r%4}if(n===""){const r=parseInt(e);return isNaN(r)?0:s(r)}else if(n!==e){let r=0;switch(n){case"%":r=25;break;case"deg":r=90}if(r){let o=parseFloat(e.slice(0,e.length-n.length));return isNaN(o)?0:(o=o/r,o%1===0?s(o):0)}}return t}function Cr(e,t){let n=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const s in t)n+=" "+s+'="'+t[s]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+e+"</svg>"}function Er(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function jr(e){return"data:image/svg+xml,"+Er(e)}function Tr(e){return'url("'+jr(e)+'")'}const Ht={...sn,inline:!1},Pr={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},Dr={display:"inline-block"},nt={"background-color":"currentColor"},hn={"background-color":"transparent"},zt={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},Gt={"-webkit-mask":nt,mask:nt,background:hn};for(const e in Gt){const t=Gt[e];for(const n in zt)t[e+"-"+n]=zt[n]}function Nr(e){return e+(e.match(/^[-0-9.]+$/)?"px":"")}function Or(e,t){const n=_r(Ht,t),s=t.mode||"svg",r=s==="svg"?{...Pr}:{};e.body.indexOf("xlink:")===-1&&delete r["xmlns:xlink"];let o=typeof t.style=="string"?t.style:"";for(let w in t){const p=t[w];if(p!==void 0)switch(w){case"icon":case"style":case"onLoad":case"mode":break;case"inline":case"hFlip":case"vFlip":n[w]=p===!0||p==="true"||p===1;break;case"flip":typeof p=="string"&&kr(n,p);break;case"color":o=o+(o.length>0&&o.trim().slice(-1)!==";"?";":"")+"color: "+p+"; ";break;case"rotate":typeof p=="string"?n[w]=Sr(p):typeof p=="number"&&(n[w]=p);break;case"ariaHidden":case"aria-hidden":p!==!0&&p!=="true"&&delete r["aria-hidden"];break;default:if(w.slice(0,3)==="on:")break;Ht[w]===void 0&&(r[w]=p)}}const i=Gn(e,n),l=i.attributes;if(n.inline&&(o="vertical-align: -0.125em; "+o),s==="svg"){Object.assign(r,l),o!==""&&(r.style=o);let w=0,p=t.id;return typeof p=="string"&&(p=p.replace(/-/g,"_")),{svg:!0,attributes:r,body:Wn(i.body,p?()=>p+"ID"+w++:"iconifySvelte")}}const{body:a,width:c,height:u}=e,b=s==="mask"||(s==="bg"?!1:a.indexOf("currentColor")!==-1),m=Cr(a,{...l,width:c+"",height:u+""}),j={"--svg":Tr(m)},S=w=>{const p=l[w];p&&(j[w]=Nr(p))};S("width"),S("height"),Object.assign(j,Dr,b?nt:hn);let v="";for(const w in j)v+=w+": "+j[w]+";";return r.style=v+o,{svg:!1,attributes:r}}nn(!0);Xn("",sr);if(typeof document<"u"&&typeof window<"u"){pn();const e=window;if(e.IconifyPreload!==void 0){const t=e.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof t=="object"&&t!==null&&(t instanceof Array?t:[t]).forEach(s=>{try{(typeof s!="object"||s===null||s instanceof Array||typeof s.icons!="object"||typeof s.prefix!="string"||!qn(s))&&console.error(n)}catch{console.error(n)}})}if(e.IconifyProviders!==void 0){const t=e.IconifyProviders;if(typeof t=="object"&&t!==null)for(let n in t){const s="IconifyProviders["+n+"] is invalid.";try{const r=t[n];if(typeof r!="object"||!r||r.resources===void 0)continue;Yn(n,r)||console.error(s)}catch{console.error(s)}}}}function Lr(e,t,n,s,r){function o(){t.loading&&(t.loading.abort(),t.loading=null)}if(typeof e=="object"&&e!==null&&typeof e.body=="string")return t.name="",o(),{data:{...Me,...e}};let i;if(typeof e!="string"||(i=Le(e,!1,!0))===null)return o(),null;const l=An(i);if(!l)return n&&(!t.loading||t.loading.name!==e)&&(o(),t.name="",t.loading={name:e,abort:xr([i],s)}),null;o(),t.name!==e&&(t.name=e,r&&!t.destroyed&&r(e));const a=["iconify"];return i.prefix!==""&&a.push("iconify--"+i.prefix),i.provider!==""&&a.push("iconify--"+i.provider),{data:l,classes:a}}function Mr(e,t){return e?Or({...Me,...e},t):null}function Qt(e){let t;function n(o,i){return o[0].svg?Fr:Ar}let s=n(e),r=s(e);return{c(){r.c(),t=Te()},l(o){r.l(o),t=Te()},m(o,i){r.m(o,i),te(o,t,i)},p(o,i){s===(s=n(o))&&r?r.p(o,i):(r.d(1),r=s(o),r&&(r.c(),r.m(t.parentNode,t)))},d(o){o&&I(t),r.d(o)}}}function Ar(e){let t,n=[e[0].attributes],s={};for(let r=0;r<n.length;r+=1)s=Pe(s,n[r]);return{c(){t=x("span"),this.h()},l(r){t=_(r,"SPAN",{}),k(t).forEach(I),this.h()},h(){Tt(t,s)},m(r,o){te(r,t,o)},p(r,o){Tt(t,s=Zt(n,[o&1&&r[0].attributes]))},d(r){r&&I(t)}}}function Fr(e){let t,n,s=e[0].body+"",r=[e[0].attributes],o={};for(let i=0;i<r.length;i+=1)o=Pe(o,r[i]);return{c(){t=yn("svg"),n=new bn(!0),this.h()},l(i){t=vn(i,"svg",{});var l=k(t);n=wn(l,!0),l.forEach(I),this.h()},h(){n.a=null,Pt(t,o)},m(i,l){te(i,t,l),n.m(s,t)},p(i,l){l&1&&s!==(s=i[0].body+"")&&n.p(s),Pt(t,o=Zt(r,[l&1&&i[0].attributes]))},d(i){i&&I(t)}}}function qr(e){let t,n=e[0]&&Qt(e);return{c(){n&&n.c(),t=Te()},l(s){n&&n.l(s),t=Te()},m(s,r){n&&n.m(s,r),te(s,t,r)},p(s,[r]){s[0]?n?n.p(s,r):(n=Qt(s),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},i:me,o:me,d(s){s&&I(t),n&&n.d(s)}}}function Vr(e,t,n){const s={name:"",loading:null,destroyed:!1};let r=!1,o=0,i;const l=c=>{typeof t.onLoad=="function"&&t.onLoad(c),xn()("load",{icon:c})};function a(){n(3,o++,o)}return gn(()=>{n(2,r=!0)}),mn(()=>{n(1,s.destroyed=!0,s),s.loading&&(s.loading.abort(),n(1,s.loading=null,s))}),e.$$set=c=>{n(6,t=Pe(Pe({},t),jt(c)))},e.$$.update=()=>{{const c=Lr(t.icon,s,r,a,l);n(0,i=c?Mr(c.data,t):null),i&&c.classes&&n(0,i.attributes.class=(typeof t.class=="string"?t.class+" ":"")+c.classes.join(" "),i)}},t=jt(t),[i,s,r,o]}class Rr extends st{constructor(t){super(),ot(this,t,Vr,qr,rt,{})}}function Ur(e){let t,n;return t=new Rr({props:{icon:"mdi:image-off-outline",height:"40"}}),{c(){Kt(t.$$.fragment)},l(s){Wt(t.$$.fragment,s)},m(s,r){Xt(t,s,r),n=!0},p:me,i(s){n||(Ne(t.$$.fragment,s),n=!0)},o(s){De(t.$$.fragment,s),n=!1},d(s){Yt(t,s)}}}function Br(e){let t,n,s,r,o,i;return{c(){t=x("button"),n=x("img"),this.h()},l(l){t=_(l,"BUTTON",{type:!0,"aria-label":!0});var a=k(t);n=_(a,"IMG",{src:!0,alt:!0,class:!0}),a.forEach(I),this.h()},h(){var l,a;Dt(n.src,s=(l=e[0])==null?void 0:l.imageUrl[e[1]])||h(n,"src",s),h(n,"alt",r=(a=e[0])==null?void 0:a.jaName),h(n,"class","w-48 h-48"),h(t,"type","button"),h(t,"aria-label","Toggle Image")},m(l,a){te(l,t,a),f(t,n),o||(i=We(t,"click",e[2]),o=!0)},p(l,a){var c,u;a&3&&!Dt(n.src,s=(c=l[0])==null?void 0:c.imageUrl[l[1]])&&h(n,"src",s),a&1&&r!==(r=(u=l[0])==null?void 0:u.jaName)&&h(n,"alt",r)},i:me,o:me,d(l){l&&I(t),o=!1,i()}}}function Hr(e){var bt,vt,wt,xt,_t,It,kt,St;let t,n,s,r,o,i=((bt=e[0])==null?void 0:bt.jaName)+"",l,a,c=((vt=e[0])==null?void 0:vt.enName)+"",u,b,m,E=((wt=e[0])==null?void 0:wt.jaGenus)+"",j,S,v,w,p,g,y,D,d,T,L,G="タイプ",M,U,ne,ie=((xt=e[0])==null?void 0:xt.type1.jaName)+"",ve,Fe,re,le=(((_t=e[0])==null?void 0:_t.type2)!==null?(It=e[0])==null?void 0:It.type2.jaName:"なし")+"",we,qe,B,Q,ht="たかさ",Ve,$,ae=Ce((kt=e[0])==null?void 0:kt.height)+"",xe,Re,Ue,H,K,gt="おもさ",Be,W,ce=Ce((St=e[0])==null?void 0:St.weight)+"",_e,He,ze,ue,A;const mt=[Br,Ur],z=[];function yt(C,P){return C[0]!==null?0:1}return g=yt(e),y=z[g]=mt[g](e),{c(){t=x("div"),n=x("header"),s=N(),r=x("div"),o=x("h1"),l=F(i),a=F(" : "),u=F(c),b=N(),m=x("span"),j=F(E),S=N(),v=x("div"),w=x("div"),p=x("div"),y.c(),D=N(),d=x("div"),T=x("div"),L=x("h2"),L.textContent=G,M=N(),U=x("ul"),ne=x("li"),ve=F(ie),Fe=N(),re=x("li"),we=F(le),qe=N(),B=x("div"),Q=x("h2"),Q.textContent=ht,Ve=N(),$=x("p"),xe=F(ae),Re=F(" m"),Ue=N(),H=x("div"),K=x("h2"),K.textContent=gt,Be=N(),W=x("p"),_e=F(ce),He=F(" kg"),ze=N(),ue=x("footer"),this.h()},l(C){t=_(C,"DIV",{class:!0});var P=k(t);n=_(P,"HEADER",{class:!0}),k(n).forEach(I),s=O(P),r=_(P,"DIV",{class:!0});var se=k(r);o=_(se,"H1",{class:!0});var V=k(o);l=q(V,i),a=q(V," : "),u=q(V,c),b=O(V),m=_(V,"SPAN",{class:!0});var fe=k(m);j=q(fe,E),fe.forEach(I),V.forEach(I),se.forEach(I),S=O(P),v=_(P,"DIV",{class:!0});var X=k(v);w=_(X,"DIV",{class:!0});var de=k(w);p=_(de,"DIV",{class:!0});var pe=k(p);y.l(pe),pe.forEach(I),de.forEach(I),D=O(X),d=_(X,"DIV",{class:!0});var R=k(d);T=_(R,"DIV",{class:!0});var Y=k(T);L=_(Y,"H2",{class:!0,"data-svelte-h":!0}),oe(L)!=="svelte-58ktvz"&&(L.textContent=G),M=O(Y),U=_(Y,"UL",{class:!0});var Z=k(U);ne=_(Z,"LI",{class:!0});var Ct=k(ne);ve=q(Ct,ie),Ct.forEach(I),Fe=O(Z),re=_(Z,"LI",{class:!0});var Et=k(re);we=q(Et,le),Et.forEach(I),Z.forEach(I),Y.forEach(I),qe=O(R),B=_(R,"DIV",{class:!0});var Ie=k(B);Q=_(Ie,"H2",{class:!0,"data-svelte-h":!0}),oe(Q)!=="svelte-q1du04"&&(Q.textContent=ht),Ve=O(Ie),$=_(Ie,"P",{class:!0});var Ge=k($);xe=q(Ge,ae),Re=q(Ge," m"),Ge.forEach(I),Ie.forEach(I),Ue=O(R),H=_(R,"DIV",{class:!0});var ke=k(H);K=_(ke,"H2",{class:!0,"data-svelte-h":!0}),oe(K)!=="svelte-6it6r6"&&(K.textContent=gt),Be=O(ke),W=_(ke,"P",{class:!0});var Qe=k(W);_e=q(Qe,ce),He=q(Qe," kg"),Qe.forEach(I),ke.forEach(I),R.forEach(I),X.forEach(I),ze=O(P),ue=_(P,"FOOTER",{class:!0}),k(ue).forEach(I),P.forEach(I),this.h()},h(){h(n,"class","p-4 bg-red-100"),h(m,"class","text-lg font-normal text-gray-700 ml-4"),h(o,"class","text-2xl font-bold text-gray-900"),h(r,"class","p-2"),h(p,"class","w-48 h-48 bg-white rounded-lg border border-gray-200 flex items-center justify-center"),h(w,"class","p-2 flex justify-center"),h(L,"class","text-xl font-semibold text-gray-700"),h(ne,"class","text-gray-600"),h(re,"class","text-gray-600"),h(U,"class","list-inside flex space-x-4"),h(T,"class","mb-2"),h(Q,"class","text-xl font-semibold text-gray-700"),h($,"class","text-gray-600"),h(B,"class","mb-2"),h(K,"class","text-xl font-semibold text-gray-700"),h(W,"class","text-gray-600"),h(H,"class","mb-2"),h(d,"class","p-2"),h(v,"class","grid md:grid-cols-2 w-full"),h(ue,"class","p-4 bg-red-100"),h(t,"class","grid border bg-gray-50 border-gray-300 rounded-lg shadow-lg max-w-[600px]")},m(C,P){te(C,t,P),f(t,n),f(t,s),f(t,r),f(r,o),f(o,l),f(o,a),f(o,u),f(o,b),f(o,m),f(m,j),f(t,S),f(t,v),f(v,w),f(w,p),z[g].m(p,null),f(v,D),f(v,d),f(d,T),f(T,L),f(T,M),f(T,U),f(U,ne),f(ne,ve),f(U,Fe),f(U,re),f(re,we),f(d,qe),f(d,B),f(B,Q),f(B,Ve),f(B,$),f($,xe),f($,Re),f(d,Ue),f(d,H),f(H,K),f(H,Be),f(H,W),f(W,_e),f(W,He),f(t,ze),f(t,ue),A=!0},p(C,[P]){var V,fe,X,de,pe,R,Y,Z;(!A||P&1)&&i!==(i=((V=C[0])==null?void 0:V.jaName)+"")&&J(l,i),(!A||P&1)&&c!==(c=((fe=C[0])==null?void 0:fe.enName)+"")&&J(u,c),(!A||P&1)&&E!==(E=((X=C[0])==null?void 0:X.jaGenus)+"")&&J(j,E);let se=g;g=yt(C),g===se?z[g].p(C,P):(kn(),De(z[se],1,1,()=>{z[se]=null}),Sn(),y=z[g],y?y.p(C,P):(y=z[g]=mt[g](C),y.c()),Ne(y,1),y.m(p,null)),(!A||P&1)&&ie!==(ie=((de=C[0])==null?void 0:de.type1.jaName)+"")&&J(ve,ie),(!A||P&1)&&le!==(le=(((pe=C[0])==null?void 0:pe.type2)!==null?(R=C[0])==null?void 0:R.type2.jaName:"なし")+"")&&J(we,le),(!A||P&1)&&ae!==(ae=Ce((Y=C[0])==null?void 0:Y.height)+"")&&J(xe,ae),(!A||P&1)&&ce!==(ce=Ce((Z=C[0])==null?void 0:Z.weight)+"")&&J(_e,ce)},i(C){A||(Ne(y),A=!0)},o(C){De(y),A=!1},d(C){C&&I(t),z[g].d()}}}function Ce(e){return e!==void 0?(e*.1).toFixed(1):"???"}function zr(e,t,n){let{pokeData:s=null}=t,r=0;function o(){n(1,r=(r+1)%2)}return e.$$set=i=>{"pokeData"in i&&n(0,s=i.pokeData)},[s,r,o]}class Gr extends st{constructor(t){super(),ot(this,t,zr,Hr,rt,{pokeData:0})}}function Qr(e){let t,n,s="ポケモン検索",r,o,i,l,a="全国図鑑No:",c,u,b,m,E="検索",j,S,v,w,p;return S=new Gr({props:{pokeData:e[1]}}),{c(){t=x("div"),n=x("h1"),n.textContent=s,r=N(),o=x("div"),i=x("form"),l=x("label"),l.textContent=a,c=N(),u=x("input"),b=N(),m=x("button"),m.textContent=E,j=N(),Kt(S.$$.fragment),this.h()},l(g){t=_(g,"DIV",{class:!0});var y=k(t);n=_(y,"H1",{class:!0,"data-svelte-h":!0}),oe(n)!=="svelte-12lyrzc"&&(n.textContent=s),r=O(y),o=_(y,"DIV",{class:!0});var D=k(o);i=_(D,"FORM",{class:!0});var d=k(i);l=_(d,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),oe(l)!=="svelte-74onxo"&&(l.textContent=a),c=O(d),u=_(d,"INPUT",{type:!0,id:!0,class:!0}),b=O(d),m=_(d,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),oe(m)!=="svelte-h3mphk"&&(m.textContent=E),d.forEach(I),j=O(D),Wt(S.$$.fragment,D),D.forEach(I),y.forEach(I),this.h()},h(){h(n,"class","text-3xl font-bold"),h(l,"for","pokeId"),h(l,"class","text-lg"),h(u,"type","number"),h(u,"id","pokeId"),h(u,"class","border border-gray-300 rounded px-2 py-1"),h(m,"type","submit"),h(m,"class","bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"),h(i,"class","flex items-center space-x-3"),h(o,"class","space-y-5 min-w-[300px] max-w-[1200px]"),h(t,"class","h-full w-full mx-auto container")},m(g,y){te(g,t,y),f(t,n),f(t,r),f(t,o),f(o,i),f(i,l),f(i,c),f(i,u),Nt(u,e[0]),f(i,b),f(i,m),f(o,j),Xt(S,o,null),v=!0,w||(p=[We(u,"input",e[3]),We(i,"submit",_n(e[2]))],w=!0)},p(g,[y]){y&1&&$t(u.value)!==g[0]&&Nt(u,g[0]);const D={};y&2&&(D.pokeData=g[1]),S.$set(D)},i(g){v||(Ne(S.$$.fragment,g),v=!0)},o(g){De(S.$$.fragment,g),v=!1},d(g){g&&I(t),Yt(S),w=!1,In(p)}}}function $r(e,t,n){let s="",r=null;async function o(){try{n(1,r=await Tn(fetch,s))}catch{n(1,r=null)}}function i(){s=$t(this.value),n(0,s)}return[s,r,o,i]}class Yr extends st{constructor(t){super(),ot(this,t,$r,Qr,rt,{})}}export{Yr as component};
