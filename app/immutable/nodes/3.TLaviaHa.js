import{m as ce,c as ue,g as de}from"../chunks/makePokeData.client.CZiiFNIb.js";import{c as fe,T as me}from"../chunks/type.BpnlySAn.js";import{P as _e,a as pe,A as he,F as ve}from"../chunks/common.BO00ojXF.js";import{a as ye,e as h,b as E,c as v,d as I,x as ge,h as F,f as y,j as d,l as oe,m as f,y as be,t as De,i as Ie,E as G,u as V,z as Q,n as ke,v as Se}from"../chunks/scheduler.CjbLQ75Z.js";import{S as Te,i as Pe,a as O,c as we,t as C,b as X,d as Y,m as Z,e as x,g as Ne}from"../chunks/index.C8jGW1p8.js";import{e as ee}from"../chunks/each.BfLvJT1H.js";import{I as te}from"../chunks/Icon.D9OMTyLg.js";import{a as Ee}from"../chunks/download.client.DW2nYgxR.js";async function ae(e,n){const o={},s=n.map(async l=>{try{const c=await ce(e,l.toString()),_=ue(c);o[l.toString()]=_}catch(c){console.error(`Failed to fetch data for pokeId ${l}:`,c)}});return await Promise.all(s),o}async function Fe(e,n){const o={},s=n.map(async l=>{const c=await de(e,l.toString()),_=fe(c);o[l]=_});return await Promise.all(s),o}async function Oe(){function e(s,l){return Array.from({length:l},(c,_)=>s+_)}function n(){return Object.values(me)}return{downloadConfigs:[{id:"dlPokeJson",fileName:"staticPokeDict.json",label:"全ポケモン(通常) Json",makeFunction:ae,keys:e(pe,_e)},{id:"dlAddPokeJson",fileName:"staticAddPokeDict.json",label:"全ポケモン(別ver) Json",makeFunction:ae,keys:e(ve,he)},{id:"dlTypeJson",fileName:"staticTypeDict.json",label:"全タイプJson",makeFunction:Fe,keys:n()}]}}const ze=Object.freeze(Object.defineProperty({__proto__:null,load:Oe},Symbol.toStringTag,{value:"Module"}));function ne(e,n,o){const s=e.slice();return s[6]=n[o],s[7]=n,s[8]=o,s}function se(e){let n,o,s,l,c,_,p,t,u,a,i,r,m,D,P,T,$,J,w,N=e[6].label+"",A,j,k,B,M;function le(){e[3].call(l,e[7],e[8])}a=new te({props:{icon:"mdi:download-box-outline",class:"cIconStyle"}});function re(){return e[4](e[6])}T=new te({props:{icon:"mdi:zip-box-outline",class:"cIconStyle"}});function ie(){return e[5](e[6])}return{c(){n=h("div"),o=h("div"),s=h("div"),l=h("input"),_=E(),p=h("form"),t=h("button"),u=h("div"),X(a.$$.fragment),r=E(),m=h("form"),D=h("button"),P=h("div"),X(T.$$.fragment),J=E(),w=h("span"),A=De(N),j=E(),this.h()},l(g){n=v(g,"DIV",{class:!0});var b=I(n);o=v(b,"DIV",{class:!0});var R=I(o);s=v(R,"DIV",{class:!0});var S=I(s);l=v(S,"INPUT",{type:!0,id:!0,class:!0}),_=F(S),p=v(S,"FORM",{});var U=I(p);t=v(U,"BUTTON",{type:!0,class:!0});var z=I(t);u=v(z,"DIV",{class:!0});var K=I(u);Y(a.$$.fragment,K),K.forEach(y),z.forEach(y),U.forEach(y),r=F(S),m=v(S,"FORM",{});var L=I(m);D=v(L,"BUTTON",{type:!0,class:!0});var H=I(D);P=v(H,"DIV",{class:!0});var W=I(P);Y(T.$$.fragment,W),W.forEach(y),H.forEach(y),L.forEach(y),J=F(S),w=v(S,"SPAN",{class:!0});var q=I(w);A=Ie(q,N),q.forEach(y),S.forEach(y),R.forEach(y),j=F(b),b.forEach(y),this.h()},h(){d(l,"type","text"),d(l,"id",c=e[6].id),d(l,"class","border rounded px-4 py-1 h-full"),d(u,"class","cIconDivStyle"),d(t,"type","submit"),t.disabled=e[1],d(t,"class",i="cIconButtonStyle "+(e[1]?"!bg-gray-500":"")),d(P,"class","cIconDivStyle"),d(D,"type","submit"),D.disabled=e[1],d(D,"class",$="cIconButtonStyle "+(e[1]?"!bg-gray-500":"")),d(w,"class","text-lg"),d(s,"class","cInputFormAndMessagePartStyle"),d(o,"class","flex flex-col md:flex-row space-x-3"),d(n,"class","m-4")},m(g,b){oe(g,n,b),f(n,o),f(o,s),f(s,l),G(l,e[6].fileName),f(s,_),f(s,p),f(p,t),f(t,u),Z(a,u,null),f(s,r),f(s,m),f(m,D),f(D,P),Z(T,P,null),f(s,J),f(s,w),f(w,A),f(n,j),k=!0,B||(M=[V(l,"input",le),V(p,"submit",Q(re)),V(m,"submit",Q(ie))],B=!0)},p(g,b){e=g,(!k||b&1&&c!==(c=e[6].id))&&d(l,"id",c),b&1&&l.value!==e[6].fileName&&G(l,e[6].fileName),(!k||b&2)&&(t.disabled=e[1]),(!k||b&2&&i!==(i="cIconButtonStyle "+(e[1]?"!bg-gray-500":"")))&&d(t,"class",i),(!k||b&2)&&(D.disabled=e[1]),(!k||b&2&&$!==($="cIconButtonStyle "+(e[1]?"!bg-gray-500":"")))&&d(D,"class",$),(!k||b&1)&&N!==(N=e[6].label+"")&&ke(A,N)},i(g){k||(O(a.$$.fragment,g),O(T.$$.fragment,g),k=!0)},o(g){C(a.$$.fragment,g),C(T.$$.fragment,g),k=!1},d(g){g&&y(n),x(a),x(T),B=!1,Se(M)}}}function $e(e){let n,o,s='<h1 class="cTitleStyle">うらわざ</h1>',l,c,_,p=ee(e[0].downloadConfigs),t=[];for(let a=0;a<p.length;a+=1)t[a]=se(ne(e,p,a));const u=a=>C(t[a],1,1,()=>{t[a]=null});return{c(){n=h("div"),o=h("div"),o.innerHTML=s,l=E(),c=h("div");for(let a=0;a<t.length;a+=1)t[a].c();this.h()},l(a){n=v(a,"DIV",{class:!0});var i=I(n);o=v(i,"DIV",{class:!0,"data-svelte-h":!0}),ge(o)!=="svelte-19ephz6"&&(o.innerHTML=s),l=F(i),c=v(i,"DIV",{class:!0});var r=I(c);for(let m=0;m<t.length;m+=1)t[m].l(r);r.forEach(y),i.forEach(y),this.h()},h(){d(o,"class","cTitlePartStyle"),d(c,"class","cContentPartStyle !min-w-[300px] !max-w-[600px]"),d(n,"class","cRouteBodyStyle")},m(a,i){oe(a,n,i),f(n,o),f(n,l),f(n,c);for(let r=0;r<t.length;r+=1)t[r]&&t[r].m(c,null);_=!0},p(a,[i]){if(i&7){p=ee(a[0].downloadConfigs);let r;for(r=0;r<p.length;r+=1){const m=ne(a,p,r);t[r]?(t[r].p(m,i),O(t[r],1)):(t[r]=se(m),t[r].c(),O(t[r],1),t[r].m(c,null))}for(Ne(),r=p.length;r<t.length;r+=1)u(r);we()}},i(a){if(!_){for(let i=0;i<p.length;i+=1)O(t[i]);_=!0}},o(a){t=t.filter(Boolean);for(let i=0;i<t.length;i+=1)C(t[i]);_=!1},d(a){a&&y(n),be(t,a)}}}function Ae(e,n,o){let{data:s}=n,l=!1;async function c(u,a,i,r){o(1,l=!0);try{const m=await u(window.fetch,a),D=JSON.stringify(m,null,2);await Ee(D,i,r),console.log(`File Write Done: ${i}`)}catch(m){console.error("File Write Failed:",m)}o(1,l=!1)}function _(u,a){u[a].fileName=this.value,o(0,s)}const p=u=>c(u.makeFunction,u.keys,u.fileName,!1),t=u=>c(u.makeFunction,u.keys,u.fileName,!0);return e.$$set=u=>{"data"in u&&o(0,s=u.data)},[s,l,c,_,p,t]}class Ke extends Te{constructor(n){super(),Pe(this,n,Ae,$e,ye,{data:0})}}export{Ke as component,ze as universal};
