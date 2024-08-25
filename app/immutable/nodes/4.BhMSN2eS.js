import{a as e,f as t}from"../chunks/fetchStaticData.CX4NCr_3.js";import{P as a,F as n}from"../chunks/common.Cow6YdGJ.js";import{s,q as l,i as r,g as o,l as c,e as i,a as m,c as p,b as f,f as u,r as h,h as d,j as g,v,C as y,t as $,d as b,D as k,k as N,F as I,w as x,p as w,n as S}from"../chunks/scheduler.BlZZSZ7p.js";import{S as E,i as T,a as D,g as j,t as V,c as C,b as P,d as _,m as U,e as B}from"../chunks/index.BmmfLK84.js";import{e as O}from"../chunks/each.Ua_ws592.js";import{g as A}from"../chunks/stores.CsLt9EyY.js";import"../chunks/ProgressBar.svelte_svelte_type_style_lang.BdDMvFiu.js";import{I as M,g as H}from"../chunks/Icon.CbI2r_q0.js";import{f as L,p as F}from"../chunks/collections.CcO4f3jY.js";import{P as R}from"../chunks/PokeTile.C-GjLHrl.js";const q=Object.freeze(Object.defineProperty({__proto__:null,load:async function({fetch:s}){return await e(s,"load to cache"),{pokeItems:await async function(){const l=Array.from({length:a},((e,t)=>n+t)).map((async a=>{const n=await e(s,a.toString());return n&&null!==n.imageUrl?async function(e,a){const n=await t(a.type1Name);return{pokeId:e,jaName:a.jaName,imageUrl:a.imageUrl??"not_found",type:a.type2Name?[n,await t(a.type2Name)]:[n],speed:a.stats.speed}}(a,n):null}));return(await Promise.all(l)).filter((e=>null!==e))}()}}},Symbol.toStringTag,{value:"Module"}));function z(e){let t,a,n,s,l,c,y,$,b,k;return y=new M({props:{icon:"mdi:close",class:"w-5 h-5"}}),{c(){t=i("div"),a=i("div"),n=i("img"),l=m(),c=i("button"),P(y.$$.fragment),this.h()},l(e){t=p(e,"DIV",{class:!0,"data-parent":!0});var s=f(t);a=p(s,"DIV",{class:!0});var r=f(a);n=p(r,"IMG",{src:!0,alt:!0,class:!0}),l=u(r),c=p(r,"BUTTON",{class:!0});var i=f(c);_(y.$$.fragment,i),i.forEach(o),r.forEach(o),s.forEach(o),this.h()},h(){h(n.src,s=J)||d(n,"src",s),d(n,"alt","type_relations"),d(n,"class","w-96 h-96 object-contain"),d(c,"class","absolute top-1 right-6 z-10"),d(a,"class","relative"),d(t,"class",""),d(t,"data-parent",e[0])},m(s,o){r(s,t,o),g(t,a),g(a,n),g(a,l),g(a,c),U(y,c,null),$=!0,b||(k=v(c,"click",e[3]),b=!0)},p(e,a){(!$||1&a)&&d(t,"data-parent",e[0])},i(e){$||(D(y.$$.fragment,e),$=!0)},o(e){V(y.$$.fragment,e),$=!1},d(e){e&&o(t),B(y),b=!1,k()}}}function G(e){let t,a,n=e[1][0]&&z(e);return{c(){n&&n.c(),t=l()},l(e){n&&n.l(e),t=l()},m(e,s){n&&n.m(e,s),r(e,t,s),a=!0},p(e,[a]){e[1][0]?n?(n.p(e,a),2&a&&D(n,1)):(n=z(e),n.c(),D(n,1),n.m(t.parentNode,t)):n&&(j(),V(n,1,1,(()=>{n=null})),C())},i(e){a||(D(n),a=!0)},o(e){V(n),a=!1},d(e){e&&o(t),n&&n.d(e)}}}const J="https://www.pokemon.co.jp/ex/sun_moon/common/images/fight/161215_01/img_01.png";function K(e,t,a){let n,{parent:s}=t;const l=A();return c(e,l,(e=>a(1,n=e))),e.$$set=e=>{"parent"in e&&a(0,s=e.parent)},[s,n,l,function(){l.close()}]}class Q extends E{constructor(e){super(),T(this,e,K,G,s,{parent:0})}}function W(e){let t,a,n,s,l,c,h,$,b,k='<div class="p-4"><h2 class="text-2xl font-bold">ルール</h2> <p class="mt-4">まず ポケモン を 1たい えらぶ。\n            <br/>\n            つぎに タイプ を どちらか 1つ えらぶ。\n            <br/>\n            すばやさ が たかい ほうが こうげきする。</p> <ul class="mt-4 list-disc list-inside"><li>ばつぐん なら かち。</li> <li>いまひとつ か こうかなし なら まけ。</li> <li>どちらでもない なら あいこ。</li></ul></div>';return c=new M({props:{icon:"mdi:close",class:"w-5 h-5"}}),{c(){t=i("div"),a=i("div"),n=i("div"),n.innerHTML=k,s=m(),l=i("button"),P(c.$$.fragment),this.h()},l(e){t=p(e,"DIV",{class:!0,"data-parent":!0});var r=f(t);a=p(r,"DIV",{class:!0});var i=f(a);n=p(i,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-mlq9ej"!==y(n)&&(n.innerHTML=k),s=u(i),l=p(i,"BUTTON",{class:!0});var m=f(l);_(c.$$.fragment,m),m.forEach(o),i.forEach(o),r.forEach(o),this.h()},h(){d(n,"class","w-full h-full bg-white"),d(l,"class","absolute top-1 right-6 z-10"),d(a,"class","relative"),d(t,"class",""),d(t,"data-parent",e[0])},m(o,i){r(o,t,i),g(t,a),g(a,n),g(a,s),g(a,l),U(c,l,null),h=!0,$||(b=v(l,"click",e[3]),$=!0)},p(e,a){(!h||1&a)&&d(t,"data-parent",e[0])},i(e){h||(D(c.$$.fragment,e),h=!0)},o(e){V(c.$$.fragment,e),h=!1},d(e){e&&o(t),B(c),$=!1,b()}}}function X(e){let t,a,n=e[1][0]&&W(e);return{c(){n&&n.c(),t=l()},l(e){n&&n.l(e),t=l()},m(e,s){n&&n.m(e,s),r(e,t,s),a=!0},p(e,[a]){e[1][0]?n?(n.p(e,a),2&a&&D(n,1)):(n=W(e),n.c(),D(n,1),n.m(t.parentNode,t)):n&&(j(),V(n,1,1,(()=>{n=null})),C())},i(e){a||(D(n),a=!0)},o(e){V(n),a=!1},d(e){e&&o(t),n&&n.d(e)}}}function Y(e,t,a){let n,{parent:s}=t;const l=A();return c(e,l,(e=>a(1,n=e))),e.$$set=e=>{"parent"in e&&a(0,s=e.parent)},[s,n,l,function(){l.close()}]}class Z extends E{constructor(e){super(),T(this,e,Y,X,s,{parent:0})}}function ee(e,t,a){const n=e.slice();return n[26]=t[a],n}function te(e,t,a){const n=e.slice();return n[29]=t[a],n[31]=a,n}function ae(e,t,a){const n=e.slice();return n[29]=t[a],n[31]=a,n}function ne(e){let t,a,n,s,l;return a=new R({props:{pokeId:e[29].pokeId,name:e[29].jaName,type1Name:e[29].type[0].enName,type2Name:e[29].type.length>1?e[29].type[1].enName:null,imageUrl:e[29].imageUrl}}),{c(){t=i("div"),P(a.$$.fragment),n=m(),this.h()},l(e){t=p(e,"DIV",{class:!0});var s=f(t);_(a.$$.fragment,s),n=u(s),s.forEach(o),this.h()},h(){d(t,"class",s="rounded-2xl border-2 "+(e[31]==e[4]?"border-red-500":"border-transparent"))},m(e,s){r(e,t,s),U(a,t,null),g(t,n),l=!0},p(e,n){const r={};8&n[0]&&(r.pokeId=e[29].pokeId),8&n[0]&&(r.name=e[29].jaName),8&n[0]&&(r.type1Name=e[29].type[0].enName),8&n[0]&&(r.type2Name=e[29].type.length>1?e[29].type[1].enName:null),8&n[0]&&(r.imageUrl=e[29].imageUrl),a.$set(r),(!l||16&n[0]&&s!==(s="rounded-2xl border-2 "+(e[31]==e[4]?"border-red-500":"border-transparent")))&&d(t,"class",s)},i(e){l||(D(a.$$.fragment,e),l=!0)},o(e){V(a.$$.fragment,e),l=!1},d(e){e&&o(t),B(a)}}}function se(e){let t,a,n,s,l,c,h,v,y,k,I,x,S,E=e[7].jaName+"",T=e[8].jaName+"";return{c(){t=i("span"),a=$(e[6]),n=$(" の こうげき！"),s=m(),l=i("span"),c=i("span"),h=i("span"),v=$(E),y=$("\n              は\n              "),k=i("span"),I=$(T),x=$("\n              に "),S=$(e[10]),this.h()},l(r){t=p(r,"SPAN",{class:!0});var i=f(t);a=b(i,e[6]),n=b(i," の こうげき！"),i.forEach(o),s=u(r),l=p(r,"SPAN",{class:!0});var m=f(l);c=p(m,"SPAN",{class:!0});var d=f(c);h=p(d,"SPAN",{style:!0,class:!0});var g=f(h);v=b(g,E),g.forEach(o),y=b(d,"\n              は\n              "),k=p(d,"SPAN",{style:!0,class:!0});var $=f(k);I=b($,T),$.forEach(o),x=b(d,"\n              に "),S=b(d,e[10]),d.forEach(o),m.forEach(o),this.h()},h(){d(t,"class","block sm:inline"),w(h,"background-color",e[7].themeColor),w(h,"color",e[7].textColor),d(h,"class",ue),w(k,"background-color",e[8].themeColor),w(k,"color",e[8].textColor),d(k,"class",ue),d(c,"class","inline"),d(l,"class","block sm:inline")},m(e,o){r(e,t,o),g(t,a),g(t,n),r(e,s,o),r(e,l,o),g(l,c),g(c,h),g(h,v),g(c,y),g(c,k),g(k,I),g(c,x),g(c,S)},p(e,t){64&t[0]&&N(a,e[6]),128&t[0]&&E!==(E=e[7].jaName+"")&&N(v,E),128&t[0]&&w(h,"background-color",e[7].themeColor),128&t[0]&&w(h,"color",e[7].textColor),256&t[0]&&T!==(T=e[8].jaName+"")&&N(I,T),256&t[0]&&w(k,"background-color",e[8].themeColor),256&t[0]&&w(k,"color",e[8].textColor),1024&t[0]&&N(S,e[10])},d(e){e&&(o(t),o(s),o(l))}}}function le(e){let t;return{c(){t=i("span"),t.textContent="VS",this.h()},l(e){t=p(e,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-qavuzn"!==y(t)&&(t.textContent="VS"),this.h()},h(){d(t,"class","block")},m(e,a){r(e,t,a)},p:S,d(e){e&&o(t)}}}function re(e){let t,a,n,s,l,c,h,y,$;function b(){return e[17](e[31])}function k(...t){return e[18](e[31],...t)}return n=new R({props:{pokeId:e[29].pokeId,name:e[29].jaName,type1Name:e[29].type[0].enName,type2Name:e[29].type.length>1?e[29].type[1].enName:null,imageUrl:e[29].imageUrl}}),{c(){t=i("div"),a=i("button"),P(n.$$.fragment),l=m(),this.h()},l(e){t=p(e,"DIV",{class:!0});var s=f(t);a=p(s,"BUTTON",{type:!0});var r=f(a);_(n.$$.fragment,r),r.forEach(o),l=u(s),s.forEach(o),this.h()},h(){d(a,"type","button"),a.disabled=s="select_poke"!==e[1],d(t,"class",c="rounded-2xl border-2 "+(e[31]==e[0]?"border-red-500":"border-transparent"))},m(e,s){r(e,t,s),g(t,a),U(n,a,null),g(t,l),h=!0,y||($=[v(a,"click",b),v(a,"keydown",k)],y=!0)},p(l,r){e=l;const o={};4&r[0]&&(o.pokeId=e[29].pokeId),4&r[0]&&(o.name=e[29].jaName),4&r[0]&&(o.type1Name=e[29].type[0].enName),4&r[0]&&(o.type2Name=e[29].type.length>1?e[29].type[1].enName:null),4&r[0]&&(o.imageUrl=e[29].imageUrl),n.$set(o),(!h||2&r[0]&&s!==(s="select_poke"!==e[1]))&&(a.disabled=s),(!h||1&r[0]&&c!==(c="rounded-2xl border-2 "+(e[31]==e[0]?"border-red-500":"border-transparent")))&&d(t,"class",c)},i(e){h||(D(n.$$.fragment,e),h=!0)},o(e){V(n.$$.fragment,e),h=!1},d(e){e&&o(t),B(n),y=!1,x($)}}}function oe(e){let t,a=O(e[5].type),n=[];for(let s=0;s<a.length;s+=1)n[s]=ie(ee(e,a,s));return{c(){for(let e=0;e<n.length;e+=1)n[e].c();t=l()},l(e){for(let t=0;t<n.length;t+=1)n[t].l(e);t=l()},m(e,a){for(let t=0;t<n.length;t+=1)n[t]&&n[t].m(e,a);r(e,t,a)},p(e,s){if(8224&s[0]){let l;for(a=O(e[5].type),l=0;l<a.length;l+=1){const r=ee(e,a,l);n[l]?n[l].p(r,s):(n[l]=ie(r),n[l].c(),n[l].m(t.parentNode,t))}for(;l<n.length;l+=1)n[l].d(1);n.length=a.length}},i:S,o:S,d(e){e&&o(t),I(n,e)}}}function ce(e){let t,a,n,s,l,c;return n=new M({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),{c(){t=i("button"),a=i("div"),P(n.$$.fragment),this.h()},l(e){t=p(e,"BUTTON",{type:!0,class:!0});var s=f(t);a=p(s,"DIV",{class:!0});var l=f(a);_(n.$$.fragment,l),l.forEach(o),s.forEach(o),this.h()},h(){d(a,"class","cIconDivStyle"),d(t,"type","button"),d(t,"class","cIconButtonStyle")},m(o,i){r(o,t,i),g(t,a),U(n,a,null),s=!0,l||(c=v(t,"click",e[12]),l=!0)},p:S,i(e){s||(D(n.$$.fragment,e),s=!0)},o(e){V(n.$$.fragment,e),s=!1},d(e){e&&o(t),B(n),l=!1,c()}}}function ie(e){let t,a,n,s,l,c=e[26].jaName+"";function h(){return e[19](e[26])}return{c(){t=i("button"),a=$(c),n=m(),this.h()},l(e){t=p(e,"BUTTON",{style:!0,class:!0});var s=f(t);a=b(s,c),n=u(s),s.forEach(o),this.h()},h(){w(t,"background-color",e[26].themeColor),w(t,"color",e[26].textColor),d(t,"class",ue+" flex items-center hover:brightness-85")},m(e,o){r(e,t,o),g(t,a),g(t,n),s||(l=v(t,"click",h),s=!0)},p(n,s){e=n,32&s[0]&&c!==(c=e[26].jaName+"")&&N(a,c),32&s[0]&&w(t,"background-color",e[26].themeColor),32&s[0]&&w(t,"color",e[26].textColor)},d(e){e&&o(t),s=!1,l()}}}function me(e){let t,a,n,s,l,c,h,w,S,E,T,A,H,L,F,R,q,z,G,J,K,Q,W,X,Y,Z,ee,ie,me,ue,he,de,ge,ve,ye,$e,be,ke,Ne,Ie,xe,we,Se,Ee,Te,De,je,Ve,Ce,Pe,_e='<h1 class="cTitleStyle">ポケモンタイプじゃんけん</h1>',Ue="ポケモン を よびだす";A=new M({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),G=new M({props:{icon:"mdi:head-question-outline",class:"cIconStyle"}}),X=new M({props:{icon:"mdi:table-question",class:"cIconStyle"}});let Be=O(e[3]),Oe=[];for(let r=0;r<Be.length;r+=1)Oe[r]=ne(ae(e,Be,r));const Ae=e=>V(Oe[e],1,1,(()=>{Oe[e]=null}));function Me(e,t){return"term"!==e[1]?le:se}let He=Me(e),Le=He(e),Fe=O(e[2]),Re=[];for(let r=0;r<Fe.length;r+=1)Re[r]=re(te(e,Fe,r));const qe=e=>V(Re[e],1,1,(()=>{Re[e]=null})),ze=[ce,oe],Ge=[];function Je(e,t){return"select_poke"==e[1]&&-1!==e[0]?0:"select_type"==e[1]?1:-1}return~(De=Je(e))&&(je=Ge[De]=ze[De](e)),{c(){t=i("div"),a=i("div"),a.innerHTML=_e,n=m(),s=i("div"),l=i("div"),c=i("div"),h=i("span"),h.textContent=Ue,w=m(),S=i("form"),E=i("button"),T=i("div"),P(A.$$.fragment),H=m(),L=i("div"),L.innerHTML="",F=m(),R=i("form"),q=i("button"),z=i("div"),P(G.$$.fragment),J=m(),K=i("form"),Q=i("button"),W=i("div"),P(X.$$.fragment),Y=m(),Z=i("div"),Z.innerHTML="",ee=m(),ie=i("div"),me=i("span"),me.textContent="あいて",ue=m(),he=i("div");for(let e=0;e<Oe.length;e+=1)Oe[e].c();de=m(),ge=i("div"),ve=i("p"),Le.c(),ye=m(),$e=i("div"),be=i("span"),be.textContent="あなた",ke=m(),Ne=i("div");for(let e=0;e<Re.length;e+=1)Re[e].c();Ie=m(),xe=i("div"),we=i("div"),Se=i("span"),Ee=$(e[9]),Te=m(),je&&je.c(),this.h()},l(r){t=p(r,"DIV",{class:!0});var i=f(t);a=p(i,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-1r5gn7p"!==y(a)&&(a.innerHTML=_e),n=u(i),s=p(i,"DIV",{class:!0});var m=f(s);l=p(m,"DIV",{class:!0});var d=f(l);c=p(d,"DIV",{class:!0});var g=f(c);h=p(g,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-263kan"!==y(h)&&(h.textContent=Ue),w=u(g),S=p(g,"FORM",{});var v=f(S);E=p(v,"BUTTON",{type:!0,class:!0});var $=f(E);T=p($,"DIV",{class:!0});var k=f(T);_(A.$$.fragment,k),k.forEach(o),$.forEach(o),v.forEach(o),H=u(g),L=p(g,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-1rtwic7"!==y(L)&&(L.innerHTML=""),F=u(g),R=p(g,"FORM",{});var N=f(R);q=p(N,"BUTTON",{type:!0,class:!0});var I=f(q);z=p(I,"DIV",{class:!0});var x=f(z);_(G.$$.fragment,x),x.forEach(o),I.forEach(o),N.forEach(o),J=u(g),K=p(g,"FORM",{});var D=f(K);Q=p(D,"BUTTON",{type:!0,class:!0});var j=f(Q);W=p(j,"DIV",{class:!0});var V=f(W);_(X.$$.fragment,V),V.forEach(o),j.forEach(o),D.forEach(o),Y=u(g),Z=p(g,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-17db9va"!==y(Z)&&(Z.innerHTML=""),g.forEach(o),d.forEach(o),ee=u(m),ie=p(m,"DIV",{class:!0});var C=f(ie);me=p(C,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-10ns923"!==y(me)&&(me.textContent="あいて"),ue=u(C),he=p(C,"DIV",{class:!0});var P=f(he);for(let e=0;e<Oe.length;e+=1)Oe[e].l(P);P.forEach(o),C.forEach(o),de=u(m),ge=p(m,"DIV",{});var U=f(ge);ve=p(U,"P",{class:!0});var B=f(ve);Le.l(B),B.forEach(o),U.forEach(o),ye=u(m),$e=p(m,"DIV",{class:!0});var O=f($e);be=p(O,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-mhotnc"!==y(be)&&(be.textContent="あなた"),ke=u(O),Ne=p(O,"DIV",{class:!0});var M=f(Ne);for(let e=0;e<Re.length;e+=1)Re[e].l(M);M.forEach(o),O.forEach(o),Ie=u(m),xe=p(m,"DIV",{class:!0});var te=f(xe);we=p(te,"DIV",{class:!0});var ae=f(we);Se=p(ae,"SPAN",{class:!0});var ne=f(Se);Ee=b(ne,e[9]),ne.forEach(o),Te=u(ae),je&&je.l(ae),ae.forEach(o),te.forEach(o),m.forEach(o),i.forEach(o),this.h()},h(){d(a,"class","cTitlePartStyle"),d(h,"class","cSpanTextStyle"),d(T,"class","cIconDivStyle"),d(E,"type","submit"),d(E,"class","cIconButtonStyle"),d(L,"class","flex-grow"),d(z,"class","cIconDivStyle"),d(q,"type","submit"),d(q,"class","cIconButtonStyle"),d(W,"class","cIconDivStyle"),d(Q,"type","submit"),d(Q,"class","cIconButtonStyle"),d(Z,"class","mr-4"),d(c,"class","cInputFormAndMessagePartStyle"),d(l,"class","m-4"),d(me,"class","block mt-1 ml-2"),d(he,"class",fe),d(ie,"class",pe),d(ve,"class","text-center cSpanTextStyle"),d(be,"class","block mt-1 ml-2"),d(Ne,"class",fe),d($e,"class",pe),d(Se,"class","cSpanTextStyle"),d(we,"class","cInputFormAndMessagePartStyle"),d(xe,"class","m-4"),d(s,"class","cContentPartStyle !min-w-[300px] !max-w-[600px]"),d(t,"class","cRouteBodyStyle")},m(o,i){r(o,t,i),g(t,a),g(t,n),g(t,s),g(s,l),g(l,c),g(c,h),g(c,w),g(c,S),g(S,E),g(E,T),U(A,T,null),g(c,H),g(c,L),g(c,F),g(c,R),g(R,q),g(q,z),U(G,z,null),g(c,J),g(c,K),g(K,Q),g(Q,W),U(X,W,null),g(c,Y),g(c,Z),g(s,ee),g(s,ie),g(ie,me),g(ie,ue),g(ie,he);for(let e=0;e<Oe.length;e+=1)Oe[e]&&Oe[e].m(he,null);g(s,de),g(s,ge),g(ge,ve),Le.m(ve,null),g(s,ye),g(s,$e),g($e,be),g($e,ke),g($e,Ne);for(let e=0;e<Re.length;e+=1)Re[e]&&Re[e].m(Ne,null);g(s,Ie),g(s,xe),g(xe,we),g(we,Se),g(Se,Ee),g(we,Te),~De&&Ge[De].m(we,null),Ve=!0,Ce||(Pe=[v(S,"submit",k(e[11])),v(R,"submit",k(e[14])),v(K,"submit",k(e[15]))],Ce=!0)},p(e,t){if(24&t[0]){let a;for(Be=O(e[3]),a=0;a<Be.length;a+=1){const n=ae(e,Be,a);Oe[a]?(Oe[a].p(n,t),D(Oe[a],1)):(Oe[a]=ne(n),Oe[a].c(),D(Oe[a],1),Oe[a].m(he,null))}for(j(),a=Be.length;a<Oe.length;a+=1)Ae(a);C()}if(He===(He=Me(e))&&Le?Le.p(e,t):(Le.d(1),Le=He(e),Le&&(Le.c(),Le.m(ve,null))),7&t[0]){let a;for(Fe=O(e[2]),a=0;a<Fe.length;a+=1){const n=te(e,Fe,a);Re[a]?(Re[a].p(n,t),D(Re[a],1)):(Re[a]=re(n),Re[a].c(),D(Re[a],1),Re[a].m(Ne,null))}for(j(),a=Fe.length;a<Re.length;a+=1)qe(a);C()}(!Ve||512&t[0])&&N(Ee,e[9]);let a=De;De=Je(e),De===a?~De&&Ge[De].p(e,t):(je&&(j(),V(Ge[a],1,1,(()=>{Ge[a]=null})),C()),~De?(je=Ge[De],je?je.p(e,t):(je=Ge[De]=ze[De](e),je.c()),D(je,1),je.m(we,null)):je=null)},i(e){if(!Ve){D(A.$$.fragment,e),D(G.$$.fragment,e),D(X.$$.fragment,e);for(let e=0;e<Be.length;e+=1)D(Oe[e]);for(let e=0;e<Fe.length;e+=1)D(Re[e]);D(je),Ve=!0}},o(e){V(A.$$.fragment,e),V(G.$$.fragment,e),V(X.$$.fragment,e),Oe=Oe.filter(Boolean);for(let t=0;t<Oe.length;t+=1)V(Oe[t]);Re=Re.filter(Boolean);for(let t=0;t<Re.length;t+=1)V(Re[t]);V(je),Ve=!1},d(e){e&&o(t),B(A),B(G),B(X),I(Oe,e),Le.d(),I(Re,e),~De&&Ge[De].d(),Ce=!1,x(Pe)}}}const pe="min-h-[180px] sm:min-h-[220px] min-w-[300px] md:min-w-[600px] border bg-white rounded-xl",fe="flex flex-wrap justify-between gap-y-1 p-4",ue="px-2 py-1 rounded h-full";function he(e){return{type:"component",component:e,backdropClasses:"fixed inset-0 !bg-gray-300/90"}}function de(e,t,a){let{data:n}=t,s=[],l=[];let r,o,c,i,m,p,f,u=-1,h=-1;function d(e){const t=1===o.type.length?o.type[0]:o.type[H(2)];let n;a(6,({isOwnAttack:n,attackPokeName:c,attackType:i,defenseType:m}=function(e,t,a,n){const s=e.speed>=t.speed;return{isOwnAttack:s,attackPokeName:s?e.jaName:t.jaName,attackType:s?a:n,defenseType:s?n:a}}(r,o,e,t)),c,a(7,i),a(8,m)),({damageRatio:p,result:f}=function(e,t,a){const n=function(e,t){const{doubleDamageTo:a,halfDamageTo:n,noDamageTo:s}=e.damageRelations,l={double:a,half:n,no:s};for(const[r,o]of Object.entries(l))if(o.includes(t))return r;return"default"}(t,a.enName);return{damageRatio:n,result:{double:e?"win":"lose",half:e?"lose":"win",no:e?"lose":"win",default:"draw"}[n]}}(n,i,m)),a(1,y="term")}let g,v,y="init";const $=A();return e.$$set=e=>{"data"in e&&a(16,n=e.data)},e.$$.update=()=>{3&e.$$.dirty[0]&&(y||u)&&function(){const e={init:"ポケモン を よびだしてね",select_poke:-1==u?"ポケモン をえらんでね":`${s[u].jaName} で しょうぶ する？`,select_type:"タイプ をえらんでね",term:{win:"あなた の かち！",lose:"あなた の まけ...",draw:"あいこ"}[f]};a(9,g=e[y]),a(10,v={double:"ばつぐん だ！",half:"いまひとつ...",no:"こうかは なし...",default:"まずまず だ"}[p])}()},[u,y,s,l,h,r,c,i,m,g,v,async function(){a(2,s=[]),a(3,l=[]),a(0,u=-1),a(4,h=-1);const e=L(n.pokeItems,"pokeId"),t=F(e,6);a(2,s=t.slice(0,3)),a(3,l=t.slice(3,6)),a(1,y="select_poke")},function(){a(4,h=H(3)),a(5,r=s[u]),o=l[h],a(1,y="select_type")},d,function(){const e=he({ref:Z,props:{}});$.trigger(e)},function(){const e=he({ref:Q,props:{}});$.trigger(e)},n,e=>a(0,u=e),(e,t)=>{"Enter"!==t.key&&" "!==t.key||a(0,u=e)},e=>d(e)]}class ge extends E{constructor(e){super(),T(this,e,de,me,s,{data:16},null,[-1,-1])}}export{ge as component,q as universal};
