import{_ as fe}from"../chunks/preload-helper.D6kgxu3v.js";import{a as Ve,e as h,b as F,t as Re,c as g,d as E,f as d,h as B,i as Ue,j as u,k as ae,l as q,m as f,n as He,A as Me,o as Ke,p as ke,q as we,r as re,u as ie,x as oe,z as Ae,v as ze,B as Ge}from"../chunks/scheduler.Cw8-zcu1.js";import{S as Pe,i as Fe,g as Be,t as U,c as Le,a as L,b as Q,d as X,m as Z,e as $}from"../chunks/index.DVAtxqIq.js";import{g as Ye}from"../chunks/stores.DRDWfzKu.js";import"../chunks/ProgressBar.svelte_svelte_type_style_lang.DlPh3xtE.js";import{I as le}from"../chunks/Icon.D6put5Ma.js";import{TYPE_COLOR_DICT as me}from"../chunks/staticTypeData.B1KTCKI2.js";import{F as qe}from"../chunks/common.CN3BLeE4.js";import{p as We,f as je,g as Je}from"../chunks/numerics.CWhu2cDx.js";function Qe(l){let e,t,p;return t=new le({props:{icon:"mdi:image-off-outline",class:"w-8 h-8 bg-white"}}),{c(){e=h("div"),Q(t.$$.fragment),this.h()},l(n){e=g(n,"DIV",{class:!0});var a=E(e);X(t.$$.fragment,a),a.forEach(d),this.h()},h(){u(e,"class","absolute inset-0 flex items-center justify-center h-full")},m(n,a){q(n,e,a),Z(t,e,null),p=!0},p:Ke,i(n){p||(L(t.$$.fragment,n),p=!0)},o(n){U(t.$$.fragment,n),p=!1},d(n){n&&d(e),$(t)}}}function Xe(l){let e,t,p,n,a,b,c,D,O,_=!l[5]&&Se();return{c(){e=h("img"),a=F(),_&&_.c(),b=ke(),this.h()},l(i){e=g(i,"IMG",{src:!0,alt:!0,class:!0,style:!0}),a=B(i),_&&_.l(i),b=ke(),this.h()},h(){we(e.src,t=l[0])||u(e,"src",t),u(e,"alt",l[4]),u(e,"class",p="w-full h-full object-contain "+l[7]),u(e,"style",n=l[1]?"":"filter: brightness(0);"),re(e,"image",!l[5]),re(e,"loaded",l[5])},m(i,m){q(i,e,m),l[14](e),q(i,a,m),_&&_.m(i,m),q(i,b,m),c=!0,D||(O=ie(e,"load",l[9]),D=!0)},p(i,m){(!c||m&1&&!we(e.src,t=i[0]))&&u(e,"src",t),(!c||m&16)&&u(e,"alt",i[4]),(!c||m&128&&p!==(p="w-full h-full object-contain "+i[7]))&&u(e,"class",p),(!c||m&2&&n!==(n=i[1]?"":"filter: brightness(0);"))&&u(e,"style",n),(!c||m&160)&&re(e,"image",!i[5]),(!c||m&160)&&re(e,"loaded",i[5]),i[5]?_&&(Be(),U(_,1,1,()=>{_=null}),Le()):_?m&32&&L(_,1):(_=Se(),_.c(),L(_,1),_.m(b.parentNode,b))},i(i){c||(L(_),c=!0)},o(i){U(_),c=!1},d(i){i&&(d(e),d(a),d(b)),l[14](null),_&&_.d(i),D=!1,O()}}}function Se(l){let e,t,p;return t=new le({props:{icon:"mdi:progress-download",class:"w-full h-full text-white bg-gray-100 object-cover"}}),{c(){e=h("div"),Q(t.$$.fragment),this.h()},l(n){e=g(n,"DIV",{class:!0});var a=E(e);X(t.$$.fragment,a),a.forEach(d),this.h()},h(){u(e,"class","absolute inset-0 flex items-center justify-center h-full")},m(n,a){q(n,e,a),Z(t,e,null),p=!0},i(n){p||(L(t.$$.fragment,n),p=!0)},o(n){U(t.$$.fragment,n),p=!1},d(n){n&&d(e),$(t)}}}function Ze(l){let e,t,p,n,a,b,c,D=(l[1]?l[4]:"???")+"",O,_,i,m,y,v,A,s,C;const o=[Xe,Qe],T=[];function k(r,N){return r[0]!==null?0:1}return y=k(l),v=T[y]=o[y](l),{c(){e=h("div"),t=h("header"),p=F(),n=h("div"),a=h("div"),b=h("h1"),c=h("div"),O=Re(D),_=F(),i=h("div"),m=h("div"),v.c(),A=F(),s=h("footer"),this.h()},l(r){e=g(r,"DIV",{class:!0});var N=E(e);t=g(N,"HEADER",{class:!0,style:!0}),E(t).forEach(d),p=B(N),n=g(N,"DIV",{class:!0});var w=E(n);a=g(w,"DIV",{class:!0});var R=E(a);b=g(R,"H1",{class:!0});var H=E(b);c=g(H,"DIV",{});var V=E(c);O=Ue(V,D),V.forEach(d),H.forEach(d),R.forEach(d),_=B(w),i=g(w,"DIV",{class:!0});var W=E(i);m=g(W,"DIV",{class:!0});var M=E(m);v.l(M),M.forEach(d),W.forEach(d),w.forEach(d),A=B(N),s=g(N,"FOOTER",{class:!0,style:!0}),E(s).forEach(d),N.forEach(d),this.h()},h(){u(t,"class","absolute top-0 w-full z-10 p-4 bg-transparent"),ae(t,"background-color",l[1]?l[2]:l[8]),u(b,"class","mt-6 bg-white bg-opacity-50 text-xl font-bold text-gray-900"),u(a,"class","flex justify-center"),u(m,"class","flex items-center h-[200px] w-[200px] justify-center bg-white rounded-2xl border border-gray-200"),u(i,"class","flex justify-center"),u(n,"class","p-2 bg-transparent z-20"),u(s,"class","absolute bottom-0 w-full z-10 p-4 bg-transparent"),ae(s,"background-color",l[1]?l[3]:l[8]),u(e,"class","relative flex flex-col bg-gray-50 rounded-2xl shadow border h-[300px] w-[300px] overflow-hidden select-none")},m(r,N){q(r,e,N),f(e,t),f(e,p),f(e,n),f(n,a),f(a,b),f(b,c),f(c,O),f(n,_),f(n,i),f(i,m),T[y].m(m,null),f(e,A),f(e,s),C=!0},p(r,[N]){(!C||N&6)&&ae(t,"background-color",r[1]?r[2]:r[8]),(!C||N&18)&&D!==(D=(r[1]?r[4]:"???")+"")&&He(O,D);let w=y;y=k(r),y===w?T[y].p(r,N):(Be(),U(T[w],1,1,()=>{T[w]=null}),Le(),v=T[y],v?v.p(r,N):(v=T[y]=o[y](r),v.c()),L(v,1),v.m(m,null)),(!C||N&10)&&ae(s,"background-color",r[1]?r[3]:r[8])},i(r){C||(L(v),C=!0)},o(r){U(v),C=!1},d(r){r&&d(e),T[y].d()}}}function $e(l,e,t){let{pokeId:p=null}=e,{name:n=null}=e,{type1Name:a=null}=e,{type2Name:b=null}=e,{imageUrl:c=null}=e,{isOpen:D=!1}=e;const O=me.unknown.themeColor;let _=O,i=O,m="???",y=!1,v,A="";function s(){t(5,y=!0),t(7,A=o(v.naturalWidth,v.naturalHeight));function o(T,k){const r=T/k;function N(w){return w>=1-.3&&w<=1+.3}return N(r)?"p-4":"p-0"}}function C(o){Me[o?"unshift":"push"](()=>{v=o,t(6,v)})}return l.$$set=o=>{"pokeId"in o&&t(10,p=o.pokeId),"name"in o&&t(11,n=o.name),"type1Name"in o&&t(12,a=o.type1Name),"type2Name"in o&&t(13,b=o.type2Name),"imageUrl"in o&&t(0,c=o.imageUrl),"isOpen"in o&&t(1,D=o.isOpen)},l.$$.update=()=>{l.$$.dirty&15364&&p&&(n!==null&&(p<qe?t(4,m=n):t(4,m=`とくべつな ${n}`)),t(2,_=a?me[a].themeColor:O),t(3,i=b?me[b].themeColor:_)),l.$$.dirty&1&&c&&t(5,y=!1)},[c,D,_,i,m,y,v,A,O,s,p,n,a,b,C]}class xe extends Pe{constructor(e){super(),Fe(this,e,$e,Ze,Ve,{pokeId:10,name:11,type1Name:12,type2Name:13,imageUrl:0,isOpen:1})}}function et(l){var he,ge,pe,ve;let e,t,p='<h1 class="cTitleStyle">ポケモンだ〜れだ？</h1>',n,a,b,c,D,O="ポケモン を よびだす",_,i,m,y,v,A,s,C="",o,T,k,r,N,w,R,H,V,W,M,K,G,de="こたえをみる",ue,z,J,Y,ne,ce,_e;return v=new le({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),N=new le({props:{icon:"mdi:lightbulb-on-outline",class:"cIconStyle"}}),V=new xe({props:{pokeId:l[1],name:l[1]>0?(he=l[0][l[1]])==null?void 0:he.jaName:null,type1Name:l[1]>0?(ge=l[0][l[1]])==null?void 0:ge.type1Name:null,type2Name:l[1]>0?(pe=l[0][l[1]])==null?void 0:pe.type2Name:null,imageUrl:l[1]>0?(ve=l[0][l[1]])==null?void 0:ve.gifUrl:null,isOpen:l[2]}}),Y=new le({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),{c(){e=h("div"),t=h("div"),t.innerHTML=p,n=F(),a=h("div"),b=h("div"),c=h("div"),D=h("span"),D.textContent=O,_=F(),i=h("form"),m=h("button"),y=h("div"),Q(v.$$.fragment),A=F(),s=h("div"),s.innerHTML=C,o=F(),T=h("form"),k=h("button"),r=h("div"),Q(N.$$.fragment),w=F(),R=h("div"),H=h("div"),Q(V.$$.fragment),W=F(),M=h("div"),K=h("div"),G=h("span"),G.textContent=de,ue=F(),z=h("button"),J=h("div"),Q(Y.$$.fragment),this.h()},l(I){e=g(I,"DIV",{class:!0});var S=E(e);t=g(S,"DIV",{class:!0,"data-svelte-h":!0}),oe(t)!=="svelte-2df01y"&&(t.innerHTML=p),n=B(S),a=g(S,"DIV",{class:!0});var j=E(a);b=g(j,"DIV",{class:!0});var x=E(b);c=g(x,"DIV",{class:!0});var P=E(c);D=g(P,"SPAN",{class:!0,"data-svelte-h":!0}),oe(D)!=="svelte-mp7i3f"&&(D.textContent=O),_=B(P),i=g(P,"FORM",{});var ee=E(i);m=g(ee,"BUTTON",{type:!0,class:!0});var te=E(m);y=g(te,"DIV",{class:!0});var Ie=E(y);X(v.$$.fragment,Ie),Ie.forEach(d),te.forEach(d),ee.forEach(d),A=B(P),s=g(P,"DIV",{class:!0,"data-svelte-h":!0}),oe(s)!=="svelte-1s22dac"&&(s.innerHTML=C),o=B(P),T=g(P,"FORM",{});var be=E(T);k=g(be,"BUTTON",{type:!0,class:!0});var ye=E(k);r=g(ye,"DIV",{class:!0});var Te=E(r);X(N.$$.fragment,Te),Te.forEach(d),ye.forEach(d),be.forEach(d),P.forEach(d),x.forEach(d),w=B(j),R=g(j,"DIV",{class:!0});var Ee=E(R);H=g(Ee,"DIV",{class:!0});var Ne=E(H);X(V.$$.fragment,Ne),Ne.forEach(d),Ee.forEach(d),W=B(j),M=g(j,"DIV",{class:!0});var De=E(M);K=g(De,"DIV",{class:!0});var se=E(K);G=g(se,"SPAN",{class:!0,"data-svelte-h":!0}),oe(G)!=="svelte-b801jg"&&(G.textContent=de),ue=B(se),z=g(se,"BUTTON",{type:!0,class:!0});var Ce=E(z);J=g(Ce,"DIV",{class:!0});var Oe=E(J);X(Y.$$.fragment,Oe),Oe.forEach(d),Ce.forEach(d),se.forEach(d),De.forEach(d),j.forEach(d),S.forEach(d),this.h()},h(){u(t,"class","cTitlePartStyle"),u(D,"class","text-lg"),u(y,"class","cIconDivStyle"),u(m,"type","submit"),u(m,"class","cIconButtonStyle"),u(s,"class","w-4"),u(r,"class","cIconDivStyle"),u(k,"type","submit"),u(k,"class","cIconButtonStyle"),u(c,"class","cInputFormAndMessagePartStyle"),u(b,"class","ml-4"),u(H,"class","cInputFormAndMessagePartStyle"),u(R,"class","ml-4"),u(G,"class","text-lg"),u(J,"class","cIconDivStyle"),u(z,"type","button"),u(z,"class","cIconButtonStyle"),u(K,"class","cInputFormAndMessagePartStyle"),u(M,"class","ml-4"),u(a,"class","cContentPartStyle"),u(e,"class","cRouteBodyStyle")},m(I,S){q(I,e,S),f(e,t),f(e,n),f(e,a),f(a,b),f(b,c),f(c,D),f(c,_),f(c,i),f(i,m),f(m,y),Z(v,y,null),f(c,A),f(c,s),f(c,o),f(c,T),f(T,k),f(k,r),Z(N,r,null),f(a,w),f(a,R),f(R,H),Z(V,H,null),f(a,W),f(a,M),f(M,K),f(K,G),f(K,ue),f(K,z),f(z,J),Z(Y,J,null),ne=!0,ce||(_e=[ie(i,"submit",Ae(l[3])),ie(T,"submit",Ae(l[5])),ie(z,"click",l[4])],ce=!0)},p(I,[S]){var x,P,ee,te;const j={};S&2&&(j.pokeId=I[1]),S&3&&(j.name=I[1]>0?(x=I[0][I[1]])==null?void 0:x.jaName:null),S&3&&(j.type1Name=I[1]>0?(P=I[0][I[1]])==null?void 0:P.type1Name:null),S&3&&(j.type2Name=I[1]>0?(ee=I[0][I[1]])==null?void 0:ee.type2Name:null),S&3&&(j.imageUrl=I[1]>0?(te=I[0][I[1]])==null?void 0:te.gifUrl:null),S&4&&(j.isOpen=I[2]),V.$set(j)},i(I){ne||(L(v.$$.fragment,I),L(N.$$.fragment,I),L(V.$$.fragment,I),L(Y.$$.fragment,I),ne=!0)},o(I){U(v.$$.fragment,I),U(N.$$.fragment,I),U(V.$$.fragment,I),U(Y.$$.fragment,I),ne=!1},d(I){I&&d(e),$(v),$(N),$(V),$(Y),ce=!1,ze(_e)}}}function tt(l){return{message:l,background:"bg-green-100 select-none",timeout:2e3}}function lt(l,e,t){let p,n;Ge(async()=>{const{STATIC_POKE_DICT:m}=await fe(async()=>{const{STATIC_POKE_DICT:o}=await import("../chunks/staticPokeData.C8WSKTxQ.js");return{STATIC_POKE_DICT:o}},[],import.meta.url),y=s(m),{STATIC_ADDITIONAL_POKE_DICT:v}=await fe(async()=>{const{STATIC_ADDITIONAL_POKE_DICT:o}=await import("../chunks/staticAddPokeData.BQO6nHAN.js");return{STATIC_ADDITIONAL_POKE_DICT:o}},[],import.meta.url),A=s(v);t(0,p={...y,...A});function s(o){const T={};return Object.entries(o).forEach(([k,r])=>{r.gifUrl!==null&&(T[Number(k)]={jaName:r.jaName,gifUrl:r.gifUrl,jaGenus:r.jaGenus,type1Name:r.type1Name,type2Name:r.type2Name?r.type2Name:null,height:r.height,weight:r.weight,stats:r.stats})}),T}const{STATIC_TYPE_DICT:C}=await fe(async()=>{const{STATIC_TYPE_DICT:o}=await import("../chunks/staticTypeData.B1KTCKI2.js");return{STATIC_TYPE_DICT:o}},[],import.meta.url);n=C});let a=0;function b(){O(),t(1,a=We(p))}let c=!1;function D(){t(2,c=!c)}function O(){t(2,c=!1)}const _=Ye();function i(){const m=tt(`ヒント: ${y()}`);_.trigger(m);function y(){if(a<=0)return"よびだすボタン を おしてね";const s=p[a],{pros:C,cons:o}=A(v(s.stats)),T=[s.jaName[0]+"○".repeat(s.jaName.length-1),s.jaGenus,`${n[s.type1Name].jaName}タイプ`,s.type2Name?`${n[s.type2Name].jaName}タイプ`:"タイプは1つだけ",`たかさ${je(s.height,"height")}`,`おもさ${je(s.weight,"weight")}`,C?`${C}が たかい`:null,o?`${o}は ひくい`:null];return T[Je(T.length)]??"がんばれ！"}function v(s){return[{HP:s.hp},{こうげき:s.attack},{ぼうぎょ:s.defense},{とくこう:s.specialAttack},{とくぼう:s.specialDefense},{すばやさ:s.speed}].sort((o,T)=>Object.values(T)[0]-Object.values(o)[0])}function A(s){const C=Object.values(s[0])[0]>Object.values(s[1])[0]?Object.keys(s[0])[0]:null,o=s.length-1,T=Object.values(s[o])[0]<Object.values(s[o-1])[0]?Object.keys(s[o])[0]:null;return{pros:C,cons:T}}}return[p,a,c,b,D,i]}class mt extends Pe{constructor(e){super(),Fe(this,e,lt,et,Ve,{})}}export{mt as component};
