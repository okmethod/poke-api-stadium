import{a as e,c as a,f as t}from"../chunks/fetchStaticData.DdOf0o26.js";import{P as l,F as s,b as n,c}from"../chunks/common.C5pIxUDg.js";import{s as r,e as o,a as i,t as u,c as f,b as m,g as p,f as h,d,h as g,p as v,i as y,j as $,k as b,C as w,n as k,q as I,r as j,u as N,v as E,w as x,D as U,E as S,J as D}from"../chunks/scheduler.CKlfITpV.js";import{S as O,i as B,g as V,t as T,c as A,a as P,b as C,d as M,m as F,e as H}from"../chunks/index.DneOF3-m.js";import{g as _}from"../chunks/stores.CQ0Pzujw.js";import"../chunks/ProgressBar.svelte_svelte_type_style_lang.bSY76LXU.js";import{I as L,f as R,g as z}from"../chunks/Icon.IWEbX5rG.js";import{f as G}from"../chunks/generation.DFhL16SV.js";import{p as q}from"../chunks/collections.CGPSP4TL.js";import{T as J}from"../chunks/type.DlO2-6e_.js";const W=Object.freeze(Object.defineProperty({__proto__:null,load:async function({fetch:r}){return await e(r,"load to cache"),await a(r,"load to cache"),{pokeItems:await async function(){const o=[...Array.from({length:l},((e,a)=>s+a)),...Array.from({length:n},((e,a)=>c+a))].map((async l=>{let s;return s=l<c?await e(r,l.toString()):await a(r,l.toString()),s&&null!==s.gifUrl&&null!==s.gifBackUrl?async function(e,a){return{pokeId:e,jaName:a.jaName,gifUrl:a.gifUrl??"",gifBackUrl:a.gifBackUrl??"",oggUrl:a.oggUrl,jaGenus:a.jaGenus,type1:await t(a.type1Name),type2:a.type2Name?await t(a.type2Name):null,height:a.height,weight:a.weight,stats:a.stats}}(l,s):null}));return(await Promise.all(o)).filter((e=>null!==e))}()}}},Symbol.toStringTag,{value:"Module"}));function K(e){let a,t,l;return t=new L({props:{icon:"mdi:image-off-outline",class:"w-8 h-8 bg-white"}}),{c(){a=o("div"),C(t.$$.fragment),this.h()},l(e){a=f(e,"DIV",{class:!0});var l=m(a);M(t.$$.fragment,l),l.forEach(p),this.h()},h(){g(a,"class","absolute inset-0 flex items-center justify-center h-full")},m(e,s){y(e,a,s),F(t,a,null),l=!0},p:k,i(e){l||(P(t.$$.fragment,e),l=!0)},o(e){T(t.$$.fragment,e),l=!1},d(e){e&&p(a),H(t)}}}function Q(e){let a,t,l,s,n,c,r,u,d,b,w=!e[6]&&X();return{c(){a=o("button"),t=o("img"),c=i(),w&&w.c(),r=I(),this.h()},l(e){a=f(e,"BUTTON",{type:!0,class:!0,style:!0});var l=m(a);t=f(l,"IMG",{src:!0,alt:!0,class:!0,style:!0}),l.forEach(p),c=h(e),w&&w.l(e),r=I(),this.h()},h(){j(t.src,l=e[10]?e[0]:e[1])||g(t,"src",l),g(t,"alt",e[7]),g(t,"class","w-full h-full object-contain"),g(t,"style",s=e[2]?"":"filter: brightness(0);"),N(t,"image",!e[6]),N(t,"loaded",e[6]),g(a,"type","button"),g(a,"class",n="w-full h-full "+e[9]),v(a,"-webkit-tap-highlight-color","transparent")},m(l,s){y(l,a,s),$(a,t),e[17](t),y(l,c,s),w&&w.m(l,s),y(l,r,s),u=!0,d||(b=[E(t,"load",e[11]),E(a,"click",e[12])],d=!0)},p(e,c){(!u||1027&c&&!j(t.src,l=e[10]?e[0]:e[1]))&&g(t,"src",l),(!u||128&c)&&g(t,"alt",e[7]),(!u||4&c&&s!==(s=e[2]?"":"filter: brightness(0);"))&&g(t,"style",s),(!u||64&c)&&N(t,"image",!e[6]),(!u||64&c)&&N(t,"loaded",e[6]),(!u||512&c&&n!==(n="w-full h-full "+e[9]))&&g(a,"class",n),e[6]?w&&(V(),T(w,1,1,(()=>{w=null})),A()):w?64&c&&P(w,1):(w=X(),w.c(),P(w,1),w.m(r.parentNode,r))},i(e){u||(P(w),u=!0)},o(e){T(w),u=!1},d(t){t&&(p(a),p(c),p(r)),e[17](null),w&&w.d(t),d=!1,x(b)}}}function X(e){let a,t,l;return t=new L({props:{icon:"mdi:progress-download",class:"w-full h-full text-white bg-gray-100 object-cover"}}),{c(){a=o("div"),C(t.$$.fragment),this.h()},l(e){a=f(e,"DIV",{class:!0});var l=m(a);M(t.$$.fragment,l),l.forEach(p),this.h()},h(){g(a,"class","absolute inset-0 flex items-center justify-center h-full")},m(e,s){y(e,a,s),F(t,a,null),l=!0},i(e){l||(P(t.$$.fragment,e),l=!0)},o(e){T(t.$$.fragment,e),l=!1},d(e){e&&p(a),H(t)}}}function Y(e){let a,t,l,s,n,c,r,w,k,I,j,N,E,x,U,S,D=(e[2]?e[7]:"???")+"";const O=[Q,K],B=[];function C(e,a){return null!==e[0]?0:1}return N=C(e),E=B[N]=O[N](e),{c(){a=o("div"),t=o("header"),l=i(),s=o("div"),n=o("div"),c=o("h1"),r=o("div"),w=u(D),k=i(),I=o("div"),j=o("div"),E.c(),x=i(),U=o("footer"),this.h()},l(e){a=f(e,"DIV",{class:!0});var o=m(a);t=f(o,"HEADER",{class:!0,style:!0}),m(t).forEach(p),l=h(o),s=f(o,"DIV",{class:!0});var i=m(s);n=f(i,"DIV",{class:!0});var u=m(n);c=f(u,"H1",{class:!0});var g=m(c);r=f(g,"DIV",{});var v=m(r);w=d(v,D),v.forEach(p),g.forEach(p),u.forEach(p),k=h(i),I=f(i,"DIV",{class:!0});var y=m(I);j=f(y,"DIV",{class:!0});var $=m(j);E.l($),$.forEach(p),y.forEach(p),i.forEach(p),x=h(o),U=f(o,"FOOTER",{class:!0,style:!0}),m(U).forEach(p),o.forEach(p),this.h()},h(){g(t,"class","absolute top-0 w-full z-10 p-4 bg-transparent"),v(t,"background-color",e[2]?e[4]:e[3]),g(c,"class","mt-6 bg-white bg-opacity-50 text-xl font-bold text-gray-900"),g(n,"class","flex justify-center"),g(j,"class","flex items-center h-[200px] w-[200px] justify-center bg-white rounded-2xl border border-gray-200"),g(I,"class","flex justify-center"),g(s,"class","p-2 bg-transparent z-20"),g(U,"class","absolute bottom-0 w-full z-10 p-4 bg-transparent"),v(U,"background-color",e[2]?e[5]:e[3]),g(a,"class","relative flex flex-col bg-gray-50 rounded-2xl shadow border h-[300px] w-[300px] overflow-hidden select-none")},m(e,o){y(e,a,o),$(a,t),$(a,l),$(a,s),$(s,n),$(n,c),$(c,r),$(r,w),$(s,k),$(s,I),$(I,j),B[N].m(j,null),$(a,x),$(a,U),S=!0},p(e,[a]){(!S||28&a)&&v(t,"background-color",e[2]?e[4]:e[3]),(!S||132&a)&&D!==(D=(e[2]?e[7]:"???")+"")&&b(w,D);let l=N;N=C(e),N===l?B[N].p(e,a):(V(),T(B[l],1,1,(()=>{B[l]=null})),A(),E=B[N],E?E.p(e,a):(E=B[N]=O[N](e),E.c()),P(E,1),E.m(j,null)),(!S||44&a)&&v(U,"background-color",e[2]?e[5]:e[3])},i(e){S||(P(E),S=!0)},o(e){T(E),S=!1},d(e){e&&p(a),B[N].d()}}}function Z(e,a,l){let{pokeId:s=null}=a,{name:n=null}=a,{type1Name:r=null}=a,{type2Name:o=null}=a,{imageUrl:i=null}=a,{imageBackUrl:u=null}=a,{isOpen:f=!1}=a,m="",p="",h="";let d,g=!1,v="???",y="";let $=!0;return e.$$set=e=>{"pokeId"in e&&l(13,s=e.pokeId),"name"in e&&l(14,n=e.name),"type1Name"in e&&l(15,r=e.type1Name),"type2Name"in e&&l(16,o=e.type2Name),"imageUrl"in e&&l(0,i=e.imageUrl),"imageBackUrl"in e&&l(1,u=e.imageBackUrl),"isOpen"in e&&l(2,f=e.isOpen)},e.$$.update=()=>{if(24578&e.$$.dirty&&s){if(l(6,g=!1),l(10,$=!0),u){(new Image).src=u}null!==n&&l(7,v=s<c?n:`とくべつな ${n}`),async function(){""===m&&l(3,m=(await t(J.Unknown)).themeColor),l(4,p=r?(await t(r)).themeColor:m),l(5,h=o?(await t(o)).themeColor:p)}()}},[i,u,f,m,p,h,g,v,d,y,$,function(){""===y&&l(9,y=function(e,a){if(t=e/a,t>=.7&&t<=1.3)return"p-4";var t;return"p-0"}(d.naturalWidth,d.naturalHeight)),l(6,g=!0)},function(){l(10,$=!$)},s,n,r,o,function(e){w[e?"unshift":"push"]((()=>{d=e,l(8,d)}))}]}class ee extends O{constructor(e){super(),B(this,e,Z,Y,r,{pokeId:13,name:14,type1Name:15,type2Name:16,imageUrl:0,imageBackUrl:1,isOpen:2})}}function ae(e){var a,t,l,s,n,c,r;let u,d,v,b,w,k,I,j,N,D,O,B,V,A,_,R,z,G,q,J,W,K,Q,X,Y,Z,ae,te,le,se,ne,ce,re,oe,ie,ue,fe='<h1 class="cTitleStyle">ポケモンだ〜れだ？</h1>',me="ポケモン を よびだす",pe="こたえをみる";return A=new L({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),W=new L({props:{icon:"mdi:lightbulb-on-outline",class:"cIconStyle"}}),Y=new ee({props:{pokeId:(null==(a=e[0])?void 0:a.pokeId)??null,name:(null==(t=e[0])?void 0:t.jaName)??null,type1Name:(null==(l=e[0])?void 0:l.type1.enName)??null,type2Name:(null==(n=null==(s=e[0])?void 0:s.type2)?void 0:n.enName)??null,imageUrl:(null==(c=e[0])?void 0:c.gifUrl)??null,imageBackUrl:(null==(r=e[0])?void 0:r.gifBackUrl)??null,isOpen:e[1]}}),re=new L({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),{c(){u=o("input"),d=i(),v=o("div"),b=o("div"),b.innerHTML=fe,w=i(),k=o("div"),I=o("div"),j=o("div"),N=o("span"),N.textContent=me,D=i(),O=o("form"),B=o("button"),V=o("div"),C(A.$$.fragment),_=i(),R=o("div"),R.innerHTML="",z=i(),G=o("form"),q=o("button"),J=o("div"),C(W.$$.fragment),K=i(),Q=o("div"),X=o("div"),C(Y.$$.fragment),Z=i(),ae=o("div"),te=o("div"),le=o("span"),le.textContent=pe,se=i(),ne=o("button"),ce=o("div"),C(re.$$.fragment),this.h()},l(e){u=f(e,"INPUT",{type:!0,accept:!0}),d=h(e),v=f(e,"DIV",{class:!0});var a=m(v);b=f(a,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-2df01y"!==U(b)&&(b.innerHTML=fe),w=h(a),k=f(a,"DIV",{class:!0});var t=m(k);I=f(t,"DIV",{class:!0});var l=m(I);j=f(l,"DIV",{class:!0});var s=m(j);N=f(s,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-263kan"!==U(N)&&(N.textContent=me),D=h(s),O=f(s,"FORM",{});var n=m(O);B=f(n,"BUTTON",{type:!0,class:!0});var c=m(B);V=f(c,"DIV",{class:!0});var r=m(V);M(A.$$.fragment,r),r.forEach(p),c.forEach(p),n.forEach(p),_=h(s),R=f(s,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-1s22dac"!==U(R)&&(R.innerHTML=""),z=h(s),G=f(s,"FORM",{});var o=m(G);q=f(o,"BUTTON",{type:!0,class:!0});var i=m(q);J=f(i,"DIV",{class:!0});var g=m(J);M(W.$$.fragment,g),g.forEach(p),i.forEach(p),o.forEach(p),s.forEach(p),l.forEach(p),K=h(t),Q=f(t,"DIV",{class:!0});var y=m(Q);X=f(y,"DIV",{class:!0});var $=m(X);M(Y.$$.fragment,$),$.forEach(p),y.forEach(p),Z=h(t),ae=f(t,"DIV",{class:!0});var E=m(ae);te=f(E,"DIV",{class:!0});var x=m(te);le=f(x,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-1egwsn2"!==U(le)&&(le.textContent=pe),se=h(x),ne=f(x,"BUTTON",{type:!0,class:!0});var S=m(ne);ce=f(S,"DIV",{class:!0});var T=m(ce);M(re.$$.fragment,T),T.forEach(p),S.forEach(p),x.forEach(p),E.forEach(p),t.forEach(p),a.forEach(p),this.h()},h(){g(u,"type","file"),g(u,"accept","audio/*"),g(b,"class","cTitlePartStyle"),g(N,"class","cSpanTextStyle"),g(V,"class","cIconDivStyle"),g(B,"type","submit"),g(B,"class","cIconButtonStyle"),g(R,"class","w-4"),g(J,"class","cIconDivStyle"),g(q,"type","submit"),g(q,"class","cIconButtonStyle"),g(j,"class","cInputFormAndMessagePartStyle"),g(I,"class","m-4"),g(X,"class","cInputFormAndMessagePartStyle"),g(Q,"class","m-4"),g(le,"class","cSpanTextStyle"),g(ce,"class","cIconDivStyle"),g(ne,"type","button"),g(ne,"class","cIconButtonStyle"),g(te,"class","cInputFormAndMessagePartStyle"),g(ae,"class","m-4"),g(k,"class","cContentPartStyle"),g(v,"class","cRouteBodyStyle")},m(a,t){y(a,u,t),y(a,d,t),y(a,v,t),$(v,b),$(v,w),$(v,k),$(k,I),$(I,j),$(j,N),$(j,D),$(j,O),$(O,B),$(B,V),F(A,V,null),$(j,_),$(j,R),$(j,z),$(j,G),$(G,q),$(q,J),F(W,J,null),$(k,K),$(k,Q),$(Q,X),F(Y,X,null),$(k,Z),$(k,ae),$(ae,te),$(te,le),$(te,se),$(te,ne),$(ne,ce),F(re,ce,null),oe=!0,ie||(ue=[E(u,"change",e[2]),E(O,"submit",S(e[3])),E(G,"submit",S(e[5])),E(ne,"click",e[4])],ie=!0)},p(e,[a]){var t,l,s,n,c,r,o;const i={};1&a&&(i.pokeId=(null==(t=e[0])?void 0:t.pokeId)??null),1&a&&(i.name=(null==(l=e[0])?void 0:l.jaName)??null),1&a&&(i.type1Name=(null==(s=e[0])?void 0:s.type1.enName)??null),1&a&&(i.type2Name=(null==(c=null==(n=e[0])?void 0:n.type2)?void 0:c.enName)??null),1&a&&(i.imageUrl=(null==(r=e[0])?void 0:r.gifUrl)??null),1&a&&(i.imageBackUrl=(null==(o=e[0])?void 0:o.gifBackUrl)??null),2&a&&(i.isOpen=e[1]),Y.$set(i)},i(e){oe||(P(A.$$.fragment,e),P(W.$$.fragment,e),P(Y.$$.fragment,e),P(re.$$.fragment,e),oe=!0)},o(e){T(A.$$.fragment,e),T(W.$$.fragment,e),T(Y.$$.fragment,e),T(re.$$.fragment,e),oe=!1},d(e){e&&(p(u),p(d),p(v)),H(A),H(W),H(Y),H(re),ie=!1,x(ue)}}}function te(e,a,t){let{data:l}=a,s=null,n=null;async function c(e){s||(s=new AudioContext);const a=await fetch(e),t=await a.arrayBuffer();n=await s.decodeAudioData(t)}function r(){if(n&&s){const e=s.createBufferSource();e.buffer=n,e.connect(s.destination),e.start(0)}}D((()=>{document.body.addEventListener("pointerdown",(async()=>{s||(s=new AudioContext);await c("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"),r()}))}));let o=null;let i=!1;const u=_();return e.$$set=e=>{"data"in e&&t(6,l=e.data)},[o,i,function(e){const a=e.target;if(a.files&&a.files.length>0){const e=a.files[0];console.log("File uploaded:",e);c(URL.createObjectURL(e)).then((()=>{r()})).catch((e=>{console.error("Error loading audio:",e)}))}},async function(){t(1,i=!1);const e=G(l.pokeItems,"pokeId");t(0,o=q(e,1)[0])},function(){t(1,i=!i)},function(){const e={message:`ヒント: ${function(){if(null===o)return"よびだすボタン を おしてね";const{pros:e,cons:a}=function(e){const a=Object.values(e[0])[0]>Object.values(e[1])[0]?Object.keys(e[0])[0]:null,t=e.length-1,l=Object.values(e[t])[0]<Object.values(e[t-1])[0]?Object.keys(e[t])[0]:null;return{pros:a,cons:l}}([{HP:(l=o.stats).hp},{"こうげき":l.attack},{"ぼうぎょ":l.defense},{"とくこう":l.specialAttack},{"とくぼう":l.specialDefense},{"すばやさ":l.speed}].sort(((e,a)=>Object.values(a)[0]-Object.values(e)[0]))),t=[o.jaName[0]+"○".repeat(o.jaName.length-1),o.jaGenus,`${o.type1.jaName}タイプ`,o.type2?`${o.type2.jaName}タイプ`:"タイプは1つだけ",`たかさ${R(o.height,"height")}`,`おもさ${R(o.weight,"weight")}`,e?`${e}が たかい`:null,a?`${a}は ひくい`:null];var l;return t[z(t.length)]??"がんばれ！"}()}`,background:"bg-green-100 select-none",timeout:2e3};u.trigger(e)},l]}class le extends O{constructor(e){super(),B(this,e,te,ae,r,{data:6})}}export{le as component,W as universal};
