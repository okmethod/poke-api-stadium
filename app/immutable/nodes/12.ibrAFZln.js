import{m as t,c as a,g as e}from"../chunks/makePokeData.client.BOrPvhSn.js";import{c as n,T as s}from"../chunks/type.DlO2-6e_.js";import{f as o,I as c}from"../chunks/Icon.IWEbX5rG.js";import{P as l,F as i,b as r,c as u}from"../chunks/common.C5pIxUDg.js";import{s as f,e as d,a as m,c as h,b as p,D as y,f as g,g as b,h as v,i as k,j as w,G as j,t as S,d as I,O as $,v as N,E as x,k as P,w as T}from"../chunks/scheduler.CKlfITpV.js";import{S as D,i as O,a as E,c as F,t as B,b as C,d as V,m as R,e as U,g as J}from"../chunks/index.DneOF3-m.js";import{e as L}from"../chunks/each.BSaG3cXF.js";async function M(e,n){const s={},o=n.map((async n=>{try{const o=await t(e,n.toString()),c=a(o);s[n.toString()]=c}catch(o){console.error(`Failed to fetch data for pokeId ${n}:`,o)}}));return await Promise.all(o),s}async function z(t,a){const s={},o=a.map((async a=>{const o=await e(t,a.toString()),c=n(o);s[a]=c}));return await Promise.all(o),s}async function A(a,e){const n={},s=e.map((async e=>{try{const s=function(t){var a;return{"名前":t.jaName,"分類":t.jaGenus,"タイプ1":t.type1.jaName,"タイプ2":(null==(a=t.type2)?void 0:a.jaName)??null,"高さ":o(t.height,"height"),"重さ":o(t.weight,"weight"),"姿":t.shape,"伝説である":t.isLegendary||t.isMythical}}(await t(a,e.toString()));n[e.toString()]=s}catch(s){console.error(`Failed to fetch data for pokeId ${e}:`,s)}}));return await Promise.all(s),n}const _=Object.freeze(Object.defineProperty({__proto__:null,load:async function(){function t(t,a){return Array.from({length:a},((a,e)=>t+e))}return{downloadConfigs:[{id:"dlPokeJson",fileName:"staticPokeDict.json",label:"全ポケモン(通常) Json",makeFunction:M,keys:t(i,l)},{id:"dlAddPokeJson",fileName:"staticAddPokeDict.json",label:"全ポケモン(別ver) Json",makeFunction:M,keys:t(u,r)},{id:"dlTypeJson",fileName:"staticTypeDict.json",label:"全タイプJson",makeFunction:z,keys:Object.values(s)},{id:"dlPokenatorTuningCsv",fileName:"tuningPokenator.csv",label:"Pokenatorチューニング用CSV",makeFunction:A,keys:t(i,151)}]}}},Symbol.toStringTag,{value:"Module"}));async function G(t,a,e,n){try{let s;n?(s=await async function(t,a){const e=new Blob([t],{type:a}).stream().pipeThrough(new CompressionStream("gzip"));return await new Response(e).blob()}(t,e),a+=".gz"):s=new Blob([t],{type:e}),function(t,a){const e=URL.createObjectURL(t),n=document.createElement("a");n.href=e,n.download=a,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(e)}(s,a)}catch(s){throw console.error(`failed to download ${a}:`,s),s}}function H(t,a,e){const n=t.slice();return n[6]=a[e],n[7]=a,n[8]=e,n}function q(t){let a,e,n,s,o,l,i,r,u,f,y,j,D,O,F,J,L,M,z,A,_,G,H,q,K=t[6].label+"";function Q(){t[3].call(s,t[7],t[8])}function W(){return t[4](t[6])}function X(){return t[5](t[6])}return f=new c({props:{icon:"mdi:download-box-outline",class:"cIconStyle"}}),J=new c({props:{icon:"mdi:zip-box-outline",class:"cIconStyle"}}),{c(){a=d("div"),e=d("div"),n=d("div"),s=d("input"),l=m(),i=d("form"),r=d("button"),u=d("div"),C(f.$$.fragment),j=m(),D=d("form"),O=d("button"),F=d("div"),C(J.$$.fragment),M=m(),z=d("span"),A=S(K),_=m(),this.h()},l(t){a=h(t,"DIV",{class:!0});var o=p(a);e=h(o,"DIV",{class:!0});var c=p(e);n=h(c,"DIV",{class:!0});var d=p(n);s=h(d,"INPUT",{type:!0,id:!0,class:!0}),l=g(d),i=h(d,"FORM",{});var m=p(i);r=h(m,"BUTTON",{type:!0,class:!0});var y=p(r);u=h(y,"DIV",{class:!0});var v=p(u);V(f.$$.fragment,v),v.forEach(b),y.forEach(b),m.forEach(b),j=g(d),D=h(d,"FORM",{});var k=p(D);O=h(k,"BUTTON",{type:!0,class:!0});var w=p(O);F=h(w,"DIV",{class:!0});var S=p(F);V(J.$$.fragment,S),S.forEach(b),w.forEach(b),k.forEach(b),M=g(d),z=h(d,"SPAN",{class:!0});var $=p(z);A=I($,K),$.forEach(b),d.forEach(b),c.forEach(b),_=g(o),o.forEach(b),this.h()},h(){v(s,"type","text"),v(s,"id",o=t[6].id),v(s,"class","border rounded px-4 py-1 h-full"),v(u,"class","cIconDivStyle"),v(r,"type","submit"),r.disabled=t[1],v(r,"class",y="cIconButtonStyle "+(t[1]?"!bg-gray-500":"")),v(F,"class","cIconDivStyle"),v(O,"type","submit"),O.disabled=t[1],v(O,"class",L="cIconButtonStyle "+(t[1]?"!bg-gray-500":"")),v(z,"class","cSpanTextStyle"),v(n,"class","cInputFormAndMessagePartStyle"),v(e,"class","flex flex-col md:flex-row space-x-3"),v(a,"class","m-4")},m(o,c){k(o,a,c),w(a,e),w(e,n),w(n,s),$(s,t[6].fileName),w(n,l),w(n,i),w(i,r),w(r,u),R(f,u,null),w(n,j),w(n,D),w(D,O),w(O,F),R(J,F,null),w(n,M),w(n,z),w(z,A),w(a,_),G=!0,H||(q=[N(s,"input",Q),N(i,"submit",x(W)),N(D,"submit",x(X))],H=!0)},p(a,e){t=a,(!G||1&e&&o!==(o=t[6].id))&&v(s,"id",o),1&e&&s.value!==t[6].fileName&&$(s,t[6].fileName),(!G||2&e)&&(r.disabled=t[1]),(!G||2&e&&y!==(y="cIconButtonStyle "+(t[1]?"!bg-gray-500":"")))&&v(r,"class",y),(!G||2&e)&&(O.disabled=t[1]),(!G||2&e&&L!==(L="cIconButtonStyle "+(t[1]?"!bg-gray-500":"")))&&v(O,"class",L),(!G||1&e)&&K!==(K=t[6].label+"")&&P(A,K)},i(t){G||(E(f.$$.fragment,t),E(J.$$.fragment,t),G=!0)},o(t){B(f.$$.fragment,t),B(J.$$.fragment,t),G=!1},d(t){t&&b(a),U(f),U(J),H=!1,T(q)}}}function K(t){let a,e,n,s,o,c='<h1 class="cTitleStyle">うらわざ</h1>',l=L(t[0].downloadConfigs),i=[];for(let u=0;u<l.length;u+=1)i[u]=q(H(t,l,u));const r=t=>B(i[t],1,1,(()=>{i[t]=null}));return{c(){a=d("div"),e=d("div"),e.innerHTML=c,n=m(),s=d("div");for(let t=0;t<i.length;t+=1)i[t].c();this.h()},l(t){a=h(t,"DIV",{class:!0});var o=p(a);e=h(o,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-19ephz6"!==y(e)&&(e.innerHTML=c),n=g(o),s=h(o,"DIV",{class:!0});var l=p(s);for(let a=0;a<i.length;a+=1)i[a].l(l);l.forEach(b),o.forEach(b),this.h()},h(){v(e,"class","cTitlePartStyle"),v(s,"class","cContentPartStyle !min-w-[300px] !max-w-[600px]"),v(a,"class","cRouteBodyStyle")},m(t,c){k(t,a,c),w(a,e),w(a,n),w(a,s);for(let a=0;a<i.length;a+=1)i[a]&&i[a].m(s,null);o=!0},p(t,[a]){if(7&a){let e;for(l=L(t[0].downloadConfigs),e=0;e<l.length;e+=1){const n=H(t,l,e);i[e]?(i[e].p(n,a),E(i[e],1)):(i[e]=q(n),i[e].c(),E(i[e],1),i[e].m(s,null))}for(J(),e=l.length;e<i.length;e+=1)r(e);F()}},i(t){if(!o){for(let t=0;t<l.length;t+=1)E(i[t]);o=!0}},o(t){i=i.filter(Boolean);for(let a=0;a<i.length;a+=1)B(i[a]);o=!1},d(t){t&&b(a),j(i,t)}}}function Q(t,a,e){let{data:n}=a,s=!1;async function o(t,a,n,o){e(1,s=!0);const c=await t(window.fetch,a),l=function(t){const a=t.lastIndexOf(".");return-1===a?"":t.substring(a+1)}(n);if("json"===l){const t=JSON.stringify(c,null,2);await G(t,n,"application/json",o)}else if("csv"===l){const t=function(t){const a=Object.values(t),e=Object.keys(t);if(0===e.length)return"";const n=Object.keys(a[0]);return["No",...n].join(",")+"\n"+e.map(((t,e)=>[t,...n.map((t=>null!==a[e][t]?a[e][t]:"null"))].join(","))).join("\n")}(c);console.log(t),await G(t,n,"application/json",o)}else console.log(`Unsupported file extension: ${l}`);e(1,s=!1)}return t.$$set=t=>{"data"in t&&e(0,n=t.data)},[n,s,o,function(t,a){t[a].fileName=this.value,e(0,n)},t=>o(t.makeFunction,t.keys,t.fileName,!1),t=>o(t.makeFunction,t.keys,t.fileName,!0)]}class W extends D{constructor(t){super(),O(this,t,Q,K,f,{data:0})}}export{W as component,_ as universal};