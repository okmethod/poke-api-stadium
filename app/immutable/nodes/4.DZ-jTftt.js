import{a as Pe,e as h,b as V,t as ze,c as g,d as I,f as d,h as P,i as Ke,j as c,k as ce,l as J,m,n as qe,B as We,o as Je,p as Ce,q as Se,r as fe,u as se,v as He,x as me,z as Ae}from"../chunks/scheduler.CjbLQ75Z.js";import{S as Re,i as Me,g as Le,t as M,c as Ge,a as H,b as X,d as Y,m as Z,e as $}from"../chunks/index.C8jGW1p8.js";import{g as Qe}from"../chunks/stores.DfzVTFnM.js";import"../chunks/ProgressBar.svelte_svelte_type_style_lang.fMS2XfBz.js";import{I as re}from"../chunks/Icon.D9OMTyLg.js";import{T as Xe}from"../chunks/type.BpnlySAn.js";import{f as oe,b as Ye,c as Ze}from"../chunks/fetchStaticData.NawkhTRY.js";import{F as ge,P as $e,a as xe,A as et}from"../chunks/common.D9Ih3TqP.js";import{f as Be,g as Fe}from"../chunks/numerics.BpAOxbdF.js";function tt(n){let t,e,f;return e=new re({props:{icon:"mdi:image-off-outline",class:"w-8 h-8 bg-white"}}),{c(){t=h("div"),X(e.$$.fragment),this.h()},l(s){t=g(s,"DIV",{class:!0});var i=I(t);Y(e.$$.fragment,i),i.forEach(d),this.h()},h(){c(t,"class","absolute inset-0 flex items-center justify-center h-full")},m(s,i){J(s,t,i),Z(e,t,null),f=!0},p:Je,i(s){f||(H(e.$$.fragment,s),f=!0)},o(s){M(e.$$.fragment,s),f=!1},d(s){s&&d(t),$(e)}}}function lt(n){let t,e,f,s,i,k,_,y,j,w,r=!n[7]&&Ve();return{c(){t=h("button"),e=h("img"),k=V(),r&&r.c(),_=Ce(),this.h()},l(l){t=g(l,"BUTTON",{type:!0,class:!0});var u=I(t);e=g(u,"IMG",{src:!0,alt:!0,class:!0,style:!0}),u.forEach(d),k=P(l),r&&r.l(l),_=Ce(),this.h()},h(){Se(e.src,f=n[10]?n[0]:n[1])||c(e,"src",f),c(e,"alt",n[6]),c(e,"class",s="w-full h-full object-contain "+n[9]),c(e,"style",i=n[2]?"":"filter: brightness(0);"),fe(e,"image",!n[7]),fe(e,"loaded",n[7]),c(t,"type","button"),c(t,"class","animation-none transition-none")},m(l,u){J(l,t,u),m(t,e),n[17](e),J(l,k,u),r&&r.m(l,u),J(l,_,u),y=!0,j||(w=[se(e,"load",n[11]),se(t,"click",n[12])],j=!0)},p(l,u){(!y||u&1027&&!Se(e.src,f=l[10]?l[0]:l[1]))&&c(e,"src",f),(!y||u&64)&&c(e,"alt",l[6]),(!y||u&512&&s!==(s="w-full h-full object-contain "+l[9]))&&c(e,"class",s),(!y||u&4&&i!==(i=l[2]?"":"filter: brightness(0);"))&&c(e,"style",i),(!y||u&640)&&fe(e,"image",!l[7]),(!y||u&640)&&fe(e,"loaded",l[7]),l[7]?r&&(Le(),M(r,1,1,()=>{r=null}),Ge()):r?u&128&&H(r,1):(r=Ve(),r.c(),H(r,1),r.m(_.parentNode,_))},i(l){y||(H(r),y=!0)},o(l){M(r),y=!1},d(l){l&&(d(t),d(k),d(_)),n[17](null),r&&r.d(l),j=!1,He(w)}}}function Ve(n){let t,e,f;return e=new re({props:{icon:"mdi:progress-download",class:"w-full h-full text-white bg-gray-100 object-cover"}}),{c(){t=h("div"),X(e.$$.fragment),this.h()},l(s){t=g(s,"DIV",{class:!0});var i=I(t);Y(e.$$.fragment,i),i.forEach(d),this.h()},h(){c(t,"class","absolute inset-0 flex items-center justify-center h-full")},m(s,i){J(s,t,i),Z(e,t,null),f=!0},i(s){f||(H(e.$$.fragment,s),f=!0)},o(s){M(e.$$.fragment,s),f=!1},d(s){s&&d(t),$(e)}}}function nt(n){let t,e,f,s,i,k,_,y=(n[2]?n[6]:"???")+"",j,w,r,l,u,a,p,b,O;const G=[lt,tt],E=[];function S(v,o){return v[0]!==null?0:1}return u=S(n),a=E[u]=G[u](n),{c(){t=h("div"),e=h("header"),f=V(),s=h("div"),i=h("div"),k=h("h1"),_=h("div"),j=ze(y),w=V(),r=h("div"),l=h("div"),a.c(),p=V(),b=h("footer"),this.h()},l(v){t=g(v,"DIV",{class:!0});var o=I(t);e=g(o,"HEADER",{class:!0,style:!0}),I(e).forEach(d),f=P(o),s=g(o,"DIV",{class:!0});var U=I(s);i=g(U,"DIV",{class:!0});var A=I(i);k=g(A,"H1",{class:!0});var B=I(k);_=g(B,"DIV",{});var C=I(_);j=Ke(C,y),C.forEach(d),B.forEach(d),A.forEach(d),w=P(U),r=g(U,"DIV",{class:!0});var L=I(r);l=g(L,"DIV",{class:!0});var R=I(l);a.l(R),R.forEach(d),L.forEach(d),U.forEach(d),p=P(o),b=g(o,"FOOTER",{class:!0,style:!0}),I(b).forEach(d),o.forEach(d),this.h()},h(){c(e,"class","absolute top-0 w-full z-10 p-4 bg-transparent"),ce(e,"background-color",n[2]?n[4]:n[3]),c(k,"class","mt-6 bg-white bg-opacity-50 text-xl font-bold text-gray-900"),c(i,"class","flex justify-center"),c(l,"class","flex items-center h-[200px] w-[200px] justify-center bg-white rounded-2xl border border-gray-200"),c(r,"class","flex justify-center"),c(s,"class","p-2 bg-transparent z-20"),c(b,"class","absolute bottom-0 w-full z-10 p-4 bg-transparent"),ce(b,"background-color",n[2]?n[5]:n[3]),c(t,"class","relative flex flex-col bg-gray-50 rounded-2xl shadow border h-[300px] w-[300px] overflow-hidden select-none")},m(v,o){J(v,t,o),m(t,e),m(t,f),m(t,s),m(s,i),m(i,k),m(k,_),m(_,j),m(s,w),m(s,r),m(r,l),E[u].m(l,null),m(t,p),m(t,b),O=!0},p(v,[o]){(!O||o&28)&&ce(e,"background-color",v[2]?v[4]:v[3]),(!O||o&68)&&y!==(y=(v[2]?v[6]:"???")+"")&&qe(j,y);let U=u;u=S(v),u===U?E[u].p(v,o):(Le(),M(E[U],1,1,()=>{E[U]=null}),Ge(),a=E[u],a?a.p(v,o):(a=E[u]=G[u](v),a.c()),H(a,1),a.m(l,null)),(!O||o&44)&&ce(b,"background-color",v[2]?v[5]:v[3])},i(v){O||(H(a),O=!0)},o(v){M(a),O=!1},d(v){v&&d(t),E[u].d()}}}function at(n,t,e){let{pokeId:f=null}=t,{name:s=null}=t,{type1Name:i=null}=t,{type2Name:k=null}=t,{imageUrl:_=null}=t,{imageBackUrl:y=null}=t,{isOpen:j=!1}=t,w="",r="",l="";async function u(){w===""&&e(3,w=(await oe(Xe.Unknown)).themeColor),e(4,r=i?(await oe(i)).themeColor:w),e(5,l=k?(await oe(k)).themeColor:r)}let a="???",p=!1,b,O="";function G(){e(7,p=!0),e(9,O=o(b.naturalWidth,b.naturalHeight));function o(U,A){const B=U/A;function C(L){return L>=1-.3&&L<=1+.3}return C(B)?"p-4":"p-0"}}let E=!0;function S(){e(10,E=!E)}function v(o){We[o?"unshift":"push"](()=>{b=o,e(8,b)})}return n.$$set=o=>{"pokeId"in o&&e(13,f=o.pokeId),"name"in o&&e(14,s=o.name),"type1Name"in o&&e(15,i=o.type1Name),"type2Name"in o&&e(16,k=o.type2Name),"imageUrl"in o&&e(0,_=o.imageUrl),"imageBackUrl"in o&&e(1,y=o.imageBackUrl),"isOpen"in o&&e(2,j=o.isOpen)},n.$$.update=()=>{n.$$.dirty&24576&&f&&(u(),s!==null&&(f<ge?e(6,a=s):e(6,a=`とくべつな ${s}`))),n.$$.dirty&1&&_&&e(7,p=!1)},[_,y,j,w,r,l,a,p,b,O,E,G,S,f,s,i,k,v]}class st extends Re{constructor(t){super(),Me(this,t,at,nt,Pe,{pokeId:13,name:14,type1Name:15,type2Name:16,imageUrl:0,imageBackUrl:1,isOpen:2})}}function rt(n){var ve,be,ye,Ie,ke,Ne,we;let t,e,f='<h1 class="cTitleStyle">ポケモンだ〜れだ？</h1>',s,i,k,_,y,j="ポケモン を よびだす",w,r,l,u,a,p,b,O="",G,E,S,v,o,U,A,B,C,L,R,z,q,pe="こたえをみる",de,K,Q,W,ie,he,_e;return a=new re({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),o=new re({props:{icon:"mdi:lightbulb-on-outline",class:"cIconStyle"}}),C=new st({props:{pokeId:((ve=n[0])==null?void 0:ve.pokeId)??null,name:((be=n[0])==null?void 0:be.jaName)??null,type1Name:((ye=n[0])==null?void 0:ye.type1.enName)??null,type2Name:((ke=(Ie=n[0])==null?void 0:Ie.type2)==null?void 0:ke.enName)??null,imageUrl:((Ne=n[0])==null?void 0:Ne.gifUrl)??null,imageBackUrl:((we=n[0])==null?void 0:we.backGifUrl)??null,isOpen:n[1]}}),W=new re({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),{c(){t=h("div"),e=h("div"),e.innerHTML=f,s=V(),i=h("div"),k=h("div"),_=h("div"),y=h("span"),y.textContent=j,w=V(),r=h("form"),l=h("button"),u=h("div"),X(a.$$.fragment),p=V(),b=h("div"),b.innerHTML=O,G=V(),E=h("form"),S=h("button"),v=h("div"),X(o.$$.fragment),U=V(),A=h("div"),B=h("div"),X(C.$$.fragment),L=V(),R=h("div"),z=h("div"),q=h("span"),q.textContent=pe,de=V(),K=h("button"),Q=h("div"),X(W.$$.fragment),this.h()},l(N){t=g(N,"DIV",{class:!0});var T=I(t);e=g(T,"DIV",{class:!0,"data-svelte-h":!0}),me(e)!=="svelte-2df01y"&&(e.innerHTML=f),s=P(T),i=g(T,"DIV",{class:!0});var D=I(i);k=g(D,"DIV",{class:!0});var x=I(k);_=g(x,"DIV",{class:!0});var F=I(_);y=g(F,"SPAN",{class:!0,"data-svelte-h":!0}),me(y)!=="svelte-mp7i3f"&&(y.textContent=j),w=P(F),r=g(F,"FORM",{});var ee=I(r);l=g(ee,"BUTTON",{type:!0,class:!0});var te=I(l);u=g(te,"DIV",{class:!0});var le=I(u);Y(a.$$.fragment,le),le.forEach(d),te.forEach(d),ee.forEach(d),p=P(F),b=g(F,"DIV",{class:!0,"data-svelte-h":!0}),me(b)!=="svelte-1s22dac"&&(b.innerHTML=O),G=P(F),E=g(F,"FORM",{});var ne=I(E);S=g(ne,"BUTTON",{type:!0,class:!0});var ae=I(S);v=g(ae,"DIV",{class:!0});var Ee=I(v);Y(o.$$.fragment,Ee),Ee.forEach(d),ae.forEach(d),ne.forEach(d),F.forEach(d),x.forEach(d),U=P(D),A=g(D,"DIV",{class:!0});var Oe=I(A);B=g(Oe,"DIV",{class:!0});var je=I(B);Y(C.$$.fragment,je),je.forEach(d),Oe.forEach(d),L=P(D),R=g(D,"DIV",{class:!0});var De=I(R);z=g(De,"DIV",{class:!0});var ue=I(z);q=g(ue,"SPAN",{class:!0,"data-svelte-h":!0}),me(q)!=="svelte-b801jg"&&(q.textContent=pe),de=P(ue),K=g(ue,"BUTTON",{type:!0,class:!0});var Ue=I(K);Q=g(Ue,"DIV",{class:!0});var Te=I(Q);Y(W.$$.fragment,Te),Te.forEach(d),Ue.forEach(d),ue.forEach(d),De.forEach(d),D.forEach(d),T.forEach(d),this.h()},h(){c(e,"class","cTitlePartStyle"),c(y,"class","text-lg"),c(u,"class","cIconDivStyle"),c(l,"type","submit"),c(l,"class","cIconButtonStyle"),c(b,"class","w-4"),c(v,"class","cIconDivStyle"),c(S,"type","submit"),c(S,"class","cIconButtonStyle"),c(_,"class","cInputFormAndMessagePartStyle"),c(k,"class","ml-4"),c(B,"class","cInputFormAndMessagePartStyle"),c(A,"class","ml-4"),c(q,"class","text-lg"),c(Q,"class","cIconDivStyle"),c(K,"type","button"),c(K,"class","cIconButtonStyle"),c(z,"class","cInputFormAndMessagePartStyle"),c(R,"class","ml-4"),c(i,"class","cContentPartStyle"),c(t,"class","cRouteBodyStyle")},m(N,T){J(N,t,T),m(t,e),m(t,s),m(t,i),m(i,k),m(k,_),m(_,y),m(_,w),m(_,r),m(r,l),m(l,u),Z(a,u,null),m(_,p),m(_,b),m(_,G),m(_,E),m(E,S),m(S,v),Z(o,v,null),m(i,U),m(i,A),m(A,B),Z(C,B,null),m(i,L),m(i,R),m(R,z),m(z,q),m(z,de),m(z,K),m(K,Q),Z(W,Q,null),ie=!0,he||(_e=[se(r,"submit",Ae(n[2])),se(E,"submit",Ae(n[4])),se(K,"click",n[3])],he=!0)},p(N,[T]){var x,F,ee,te,le,ne,ae;const D={};T&1&&(D.pokeId=((x=N[0])==null?void 0:x.pokeId)??null),T&1&&(D.name=((F=N[0])==null?void 0:F.jaName)??null),T&1&&(D.type1Name=((ee=N[0])==null?void 0:ee.type1.enName)??null),T&1&&(D.type2Name=((le=(te=N[0])==null?void 0:te.type2)==null?void 0:le.enName)??null),T&1&&(D.imageUrl=((ne=N[0])==null?void 0:ne.gifUrl)??null),T&1&&(D.imageBackUrl=((ae=N[0])==null?void 0:ae.backGifUrl)??null),T&2&&(D.isOpen=N[1]),C.$set(D)},i(N){ie||(H(a.$$.fragment,N),H(o.$$.fragment,N),H(C.$$.fragment,N),H(W.$$.fragment,N),ie=!0)},o(N){M(a.$$.fragment,N),M(o.$$.fragment,N),M(C.$$.fragment,N),M(W.$$.fragment,N),ie=!1},d(N){N&&d(t),$(a),$(o),$(C),$(W),he=!1,He(_e)}}}function ot(n){return{message:n,background:"bg-green-100 select-none",timeout:2e3}}function it(n,t,e){let f=null;async function s(){_();const w=[...Array.from({length:$e},(a,p)=>xe+p),...Array.from({length:et},(a,p)=>ge+p)];let r,l;do r=w[Fe(w.length)],Number(r)<ge?l=await Ye(r.toString()):l=await Ze(r.toString());while(!l||l.gifUrl===null);e(0,f=await u(r,l));async function u(a,p){return{pokeId:a,jaName:p.jaName,gifUrl:p.gifUrl??"",backGifUrl:p.gifBackUrl??"",jaGenus:p.jaGenus,type1:await oe(p.type1Name),type2:p.type2Name?await oe(p.type2Name):null,height:p.height,weight:p.weight,stats:p.stats}}}let i=!1;function k(){e(1,i=!i)}function _(){e(1,i=!1)}const y=Qe();function j(){const w=ot(`ヒント: ${r()}`);y.trigger(w);function r(){if(f===null)return"よびだすボタン を おしてね";const{pros:a,cons:p}=u(l(f.stats)),b=[f.jaName[0]+"○".repeat(f.jaName.length-1),f.jaGenus,`${f.type1.jaName}タイプ`,f.type2?`${f.type2.jaName}タイプ`:"タイプは1つだけ",`たかさ${Be(f.height,"height")}`,`おもさ${Be(f.weight,"weight")}`,a?`${a}が たかい`:null,p?`${p}は ひくい`:null];return b[Fe(b.length)]??"がんばれ！"}function l(a){return[{HP:a.hp},{こうげき:a.attack},{ぼうぎょ:a.defense},{とくこう:a.specialAttack},{とくぼう:a.specialDefense},{すばやさ:a.speed}].sort((b,O)=>Object.values(O)[0]-Object.values(b)[0])}function u(a){const p=Object.values(a[0])[0]>Object.values(a[1])[0]?Object.keys(a[0])[0]:null,b=a.length-1,O=Object.values(a[b])[0]<Object.values(a[b-1])[0]?Object.keys(a[b])[0]:null;return{pros:p,cons:O}}}return[f,i,s,k,j]}class vt extends Re{constructor(t){super(),Me(this,t,it,rt,Pe,{})}}export{vt as component};
