import{a as e,c as a,f as t}from"../chunks/fetchStaticData.CX4NCr_3.js";import{P as l,F as s,b as n,c as r}from"../chunks/common.Cow6YdGJ.js";import{s as c,e as o,a as i,t as u,c as f,b as m,g as p,f as h,d as g,h as d,p as v,i as y,j as $,k as b,B as k,n as I,q as w,r as j,u as N,v as U,w as E,C as D,D as S}from"../chunks/scheduler.BlZZSZ7p.js";import{S as x,i as O,g as B,t as V,c as T,a as P,b as M,d as A,m as C,e as H}from"../chunks/index.BmmfLK84.js";import{g as _}from"../chunks/stores.sKz7UJJR.js";import"../chunks/ProgressBar.svelte_svelte_type_style_lang.BdDMvFiu.js";import{I as F,f as L,g as R}from"../chunks/Icon.CbI2r_q0.js";import{f as z,p as G}from"../chunks/collections.CcO4f3jY.js";import{T as q}from"../chunks/type.DlO2-6e_.js";const W=Object.freeze(Object.defineProperty({__proto__:null,load:async function({fetch:c}){return await e(c,"load to cache"),await a(c,"load to cache"),{pokeItems:await async function(){const o=[...Array.from({length:l},((e,a)=>s+a)),...Array.from({length:n},((e,a)=>r+a))].map((async l=>{let s;return s=l<r?await e(c,l.toString()):await a(c,l.toString()),s&&null!==s.gifUrl&&null!==s.gifBackUrl?async function(e,a){return{pokeId:e,jaName:a.jaName,gifUrl:a.gifUrl??"",gifBackUrl:a.gifBackUrl??"",oggUrl:a.oggUrl,oggLegacyUrl:a.oggLegacyUrl,jaGenus:a.jaGenus,type1:await t(a.type1Name),type2:a.type2Name?await t(a.type2Name):null,height:a.height,weight:a.weight,stats:a.stats}}(l,s):null}));return(await Promise.all(o)).filter((e=>null!==e))}()}}},Symbol.toStringTag,{value:"Module"}));function J(e){let a,t,l;return t=new F({props:{icon:"mdi:image-off-outline",class:"w-8 h-8 bg-white"}}),{c(){a=o("div"),M(t.$$.fragment),this.h()},l(e){a=f(e,"DIV",{class:!0});var l=m(a);A(t.$$.fragment,l),l.forEach(p),this.h()},h(){d(a,"class","absolute inset-0 flex items-center justify-center h-full")},m(e,s){y(e,a,s),C(t,a,null),l=!0},p:I,i(e){l||(P(t.$$.fragment,e),l=!0)},o(e){V(t.$$.fragment,e),l=!1},d(e){e&&p(a),H(t)}}}function K(e){let a,t,l,s,n,r,c,u,g,b,k=!e[6]&&Q();return{c(){a=o("button"),t=o("img"),r=i(),k&&k.c(),c=w(),this.h()},l(e){a=f(e,"BUTTON",{type:!0,class:!0,style:!0});var l=m(a);t=f(l,"IMG",{src:!0,alt:!0,class:!0,style:!0}),l.forEach(p),r=h(e),k&&k.l(e),c=w(),this.h()},h(){j(t.src,l=e[10]?e[0]:e[1])||d(t,"src",l),d(t,"alt",e[7]),d(t,"class","w-full h-full object-contain"),d(t,"style",s=e[2]?"":"filter: brightness(0);"),N(t,"image",!e[6]),N(t,"loaded",e[6]),d(a,"type","button"),d(a,"class",n="w-full h-full "+e[9]),v(a,"-webkit-tap-highlight-color","transparent")},m(l,s){y(l,a,s),$(a,t),e[17](t),y(l,r,s),k&&k.m(l,s),y(l,c,s),u=!0,g||(b=[U(t,"load",e[11]),U(a,"click",e[12])],g=!0)},p(e,r){(!u||1027&r&&!j(t.src,l=e[10]?e[0]:e[1]))&&d(t,"src",l),(!u||128&r)&&d(t,"alt",e[7]),(!u||4&r&&s!==(s=e[2]?"":"filter: brightness(0);"))&&d(t,"style",s),(!u||64&r)&&N(t,"image",!e[6]),(!u||64&r)&&N(t,"loaded",e[6]),(!u||512&r&&n!==(n="w-full h-full "+e[9]))&&d(a,"class",n),e[6]?k&&(B(),V(k,1,1,(()=>{k=null})),T()):k?64&r&&P(k,1):(k=Q(),k.c(),P(k,1),k.m(c.parentNode,c))},i(e){u||(P(k),u=!0)},o(e){V(k),u=!1},d(t){t&&(p(a),p(r),p(c)),e[17](null),k&&k.d(t),g=!1,E(b)}}}function Q(e){let a,t,l;return t=new F({props:{icon:"mdi:progress-download",class:"w-full h-full text-white bg-gray-100 object-cover"}}),{c(){a=o("div"),M(t.$$.fragment),this.h()},l(e){a=f(e,"DIV",{class:!0});var l=m(a);A(t.$$.fragment,l),l.forEach(p),this.h()},h(){d(a,"class","absolute inset-0 flex items-center justify-center h-full")},m(e,s){y(e,a,s),C(t,a,null),l=!0},i(e){l||(P(t.$$.fragment,e),l=!0)},o(e){V(t.$$.fragment,e),l=!1},d(e){e&&p(a),H(t)}}}function X(e){let a,t,l,s,n,r,c,k,I,w,j,N,U,E,D,S,x=(e[2]?e[7]:"???")+"";const O=[K,J],M=[];function A(e,a){return null!==e[0]?0:1}return N=A(e),U=M[N]=O[N](e),{c(){a=o("div"),t=o("header"),l=i(),s=o("div"),n=o("div"),r=o("h1"),c=o("div"),k=u(x),I=i(),w=o("div"),j=o("div"),U.c(),E=i(),D=o("footer"),this.h()},l(e){a=f(e,"DIV",{class:!0});var o=m(a);t=f(o,"HEADER",{class:!0,style:!0}),m(t).forEach(p),l=h(o),s=f(o,"DIV",{class:!0});var i=m(s);n=f(i,"DIV",{class:!0});var u=m(n);r=f(u,"H1",{class:!0});var d=m(r);c=f(d,"DIV",{});var v=m(c);k=g(v,x),v.forEach(p),d.forEach(p),u.forEach(p),I=h(i),w=f(i,"DIV",{class:!0});var y=m(w);j=f(y,"DIV",{class:!0});var $=m(j);U.l($),$.forEach(p),y.forEach(p),i.forEach(p),E=h(o),D=f(o,"FOOTER",{class:!0,style:!0}),m(D).forEach(p),o.forEach(p),this.h()},h(){d(t,"class","absolute top-0 w-full z-10 p-4 bg-transparent"),v(t,"background-color",e[2]?e[4]:e[3]),d(r,"class","mt-6 bg-white bg-opacity-50 text-xl font-bold text-gray-900"),d(n,"class","flex justify-center"),d(j,"class","flex items-center h-[200px] w-[200px] justify-center bg-white rounded-2xl border border-gray-200"),d(w,"class","flex justify-center"),d(s,"class","p-2 bg-transparent z-20"),d(D,"class","absolute bottom-0 w-full z-10 p-4 bg-transparent"),v(D,"background-color",e[2]?e[5]:e[3]),d(a,"class","relative flex flex-col bg-gray-50 rounded-2xl shadow border h-[300px] w-[300px] overflow-hidden select-none")},m(e,o){y(e,a,o),$(a,t),$(a,l),$(a,s),$(s,n),$(n,r),$(r,c),$(c,k),$(s,I),$(s,w),$(w,j),M[N].m(j,null),$(a,E),$(a,D),S=!0},p(e,[a]){(!S||28&a)&&v(t,"background-color",e[2]?e[4]:e[3]),(!S||132&a)&&x!==(x=(e[2]?e[7]:"???")+"")&&b(k,x);let l=N;N=A(e),N===l?M[N].p(e,a):(B(),V(M[l],1,1,(()=>{M[l]=null})),T(),U=M[N],U?U.p(e,a):(U=M[N]=O[N](e),U.c()),P(U,1),U.m(j,null)),(!S||44&a)&&v(D,"background-color",e[2]?e[5]:e[3])},i(e){S||(P(U),S=!0)},o(e){V(U),S=!1},d(e){e&&p(a),M[N].d()}}}function Y(e,a,l){let{pokeId:s=null}=a,{name:n=null}=a,{type1Name:c=null}=a,{type2Name:o=null}=a,{imageUrl:i=null}=a,{imageBackUrl:u=null}=a,{isOpen:f=!1}=a,m="",p="",h="";let g,d=!1,v="???",y="";let $=!0;return e.$$set=e=>{"pokeId"in e&&l(13,s=e.pokeId),"name"in e&&l(14,n=e.name),"type1Name"in e&&l(15,c=e.type1Name),"type2Name"in e&&l(16,o=e.type2Name),"imageUrl"in e&&l(0,i=e.imageUrl),"imageBackUrl"in e&&l(1,u=e.imageBackUrl),"isOpen"in e&&l(2,f=e.isOpen)},e.$$.update=()=>{if(24578&e.$$.dirty&&s){if(l(6,d=!1),l(10,$=!0),u){(new Image).src=u}null!==n&&l(7,v=s<r?n:`とくべつな ${n}`),async function(){""===m&&l(3,m=(await t(q.Unknown)).themeColor),l(4,p=c?(await t(c)).themeColor:m),l(5,h=o?(await t(o)).themeColor:p)}()}},[i,u,f,m,p,h,d,v,g,y,$,function(){""===y&&l(9,y=function(e,a){if(t=e/a,t>=.7&&t<=1.3)return"p-4";var t;return"p-0"}(g.naturalWidth,g.naturalHeight)),l(6,d=!0)},function(){l(10,$=!$)},s,n,c,o,function(e){k[e?"unshift":"push"]((()=>{g=e,l(8,g)}))}]}class Z extends x{constructor(e){super(),O(this,e,Y,X,c,{pokeId:13,name:14,type1Name:15,type2Name:16,imageUrl:0,imageBackUrl:1,isOpen:2})}}function ee(e){var a,t,l,s,n,r,c;let u,g,v,b,k,I,w,j,N,x,O,B,T,_,L,R,z,G,q,W,J,K,Q,X,Y,ee,ae,te,le,se,ne,re,ce,oe,ie='<h1 class="cTitleStyle">ポケモンだ〜れだ？</h1>',ue="ポケモン を よびだす",fe="こたえをみる";return B=new F({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),q=new F({props:{icon:"mdi:lightbulb-on-outline",class:"cIconStyle"}}),Q=new Z({props:{pokeId:(null==(a=e[0])?void 0:a.pokeId)??null,name:(null==(t=e[0])?void 0:t.jaName)??null,type1Name:(null==(l=e[0])?void 0:l.type1.enName)??null,type2Name:(null==(n=null==(s=e[0])?void 0:s.type2)?void 0:n.enName)??null,imageUrl:(null==(r=e[0])?void 0:r.gifUrl)??null,imageBackUrl:(null==(c=e[0])?void 0:c.gifBackUrl)??null,isOpen:e[1]}}),ne=new F({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),{c(){u=o("div"),g=o("div"),g.innerHTML=ie,v=i(),b=o("div"),k=o("div"),I=o("div"),w=o("span"),w.textContent=ue,j=i(),N=o("form"),x=o("button"),O=o("div"),M(B.$$.fragment),T=i(),_=o("div"),_.innerHTML="",L=i(),R=o("form"),z=o("button"),G=o("div"),M(q.$$.fragment),W=i(),J=o("div"),K=o("div"),M(Q.$$.fragment),X=i(),Y=o("div"),ee=o("div"),ae=o("span"),ae.textContent=fe,te=i(),le=o("button"),se=o("div"),M(ne.$$.fragment),this.h()},l(e){u=f(e,"DIV",{class:!0});var a=m(u);g=f(a,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-2df01y"!==D(g)&&(g.innerHTML=ie),v=h(a),b=f(a,"DIV",{class:!0});var t=m(b);k=f(t,"DIV",{class:!0});var l=m(k);I=f(l,"DIV",{class:!0});var s=m(I);w=f(s,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-263kan"!==D(w)&&(w.textContent=ue),j=h(s),N=f(s,"FORM",{});var n=m(N);x=f(n,"BUTTON",{type:!0,class:!0});var r=m(x);O=f(r,"DIV",{class:!0});var c=m(O);A(B.$$.fragment,c),c.forEach(p),r.forEach(p),n.forEach(p),T=h(s),_=f(s,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-1s22dac"!==D(_)&&(_.innerHTML=""),L=h(s),R=f(s,"FORM",{});var o=m(R);z=f(o,"BUTTON",{type:!0,class:!0});var i=m(z);G=f(i,"DIV",{class:!0});var d=m(G);A(q.$$.fragment,d),d.forEach(p),i.forEach(p),o.forEach(p),s.forEach(p),l.forEach(p),W=h(t),J=f(t,"DIV",{class:!0});var y=m(J);K=f(y,"DIV",{class:!0});var $=m(K);A(Q.$$.fragment,$),$.forEach(p),y.forEach(p),X=h(t),Y=f(t,"DIV",{class:!0});var U=m(Y);ee=f(U,"DIV",{class:!0});var E=m(ee);ae=f(E,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-1egwsn2"!==D(ae)&&(ae.textContent=fe),te=h(E),le=f(E,"BUTTON",{type:!0,class:!0});var S=m(le);se=f(S,"DIV",{class:!0});var V=m(se);A(ne.$$.fragment,V),V.forEach(p),S.forEach(p),E.forEach(p),U.forEach(p),t.forEach(p),a.forEach(p),this.h()},h(){d(g,"class","cTitlePartStyle"),d(w,"class","cSpanTextStyle"),d(O,"class","cIconDivStyle"),d(x,"type","submit"),d(x,"class","cIconButtonStyle"),d(_,"class","w-4"),d(G,"class","cIconDivStyle"),d(z,"type","submit"),d(z,"class","cIconButtonStyle"),d(I,"class","cInputFormAndMessagePartStyle"),d(k,"class","m-4"),d(K,"class","cInputFormAndMessagePartStyle"),d(J,"class","m-4"),d(ae,"class","cSpanTextStyle"),d(se,"class","cIconDivStyle"),d(le,"type","button"),d(le,"class","cIconButtonStyle"),d(ee,"class","cInputFormAndMessagePartStyle"),d(Y,"class","m-4"),d(b,"class","cContentPartStyle"),d(u,"class","cRouteBodyStyle")},m(a,t){y(a,u,t),$(u,g),$(u,v),$(u,b),$(b,k),$(k,I),$(I,w),$(I,j),$(I,N),$(N,x),$(x,O),C(B,O,null),$(I,T),$(I,_),$(I,L),$(I,R),$(R,z),$(z,G),C(q,G,null),$(b,W),$(b,J),$(J,K),C(Q,K,null),$(b,X),$(b,Y),$(Y,ee),$(ee,ae),$(ee,te),$(ee,le),$(le,se),C(ne,se,null),re=!0,ce||(oe=[U(N,"submit",S(e[2])),U(R,"submit",S(e[4])),U(le,"click",e[3])],ce=!0)},p(e,[a]){var t,l,s,n,r,c,o;const i={};1&a&&(i.pokeId=(null==(t=e[0])?void 0:t.pokeId)??null),1&a&&(i.name=(null==(l=e[0])?void 0:l.jaName)??null),1&a&&(i.type1Name=(null==(s=e[0])?void 0:s.type1.enName)??null),1&a&&(i.type2Name=(null==(r=null==(n=e[0])?void 0:n.type2)?void 0:r.enName)??null),1&a&&(i.imageUrl=(null==(c=e[0])?void 0:c.gifUrl)??null),1&a&&(i.imageBackUrl=(null==(o=e[0])?void 0:o.gifBackUrl)??null),2&a&&(i.isOpen=e[1]),Q.$set(i)},i(e){re||(P(B.$$.fragment,e),P(q.$$.fragment,e),P(Q.$$.fragment,e),P(ne.$$.fragment,e),re=!0)},o(e){V(B.$$.fragment,e),V(q.$$.fragment,e),V(Q.$$.fragment,e),V(ne.$$.fragment,e),re=!1},d(e){e&&p(u),H(B),H(q),H(Q),H(ne),ce=!1,E(oe)}}}function ae(e,a,t){let{data:l}=a,s=null;let n=!1;const r=_();return e.$$set=e=>{"data"in e&&t(5,l=e.data)},[s,n,async function(){t(1,n=!1);const e=z(l.pokeItems,"pokeId");t(0,s=G(e,1)[0])},function(){t(1,n=!n),null!==s&&null!==s.oggUrl&&new Audio(s.oggUrl).play()},function(){const e={message:`ヒント: ${function(){if(null===s)return"よびだすボタン を おしてね";const{pros:e,cons:a}=function(e){const a=Object.values(e[0])[0]>Object.values(e[1])[0]?Object.keys(e[0])[0]:null,t=e.length-1,l=Object.values(e[t])[0]<Object.values(e[t-1])[0]?Object.keys(e[t])[0]:null;return{pros:a,cons:l}}([{HP:(l=s.stats).hp},{"こうげき":l.attack},{"ぼうぎょ":l.defense},{"とくこう":l.specialAttack},{"とくぼう":l.specialDefense},{"すばやさ":l.speed}].sort(((e,a)=>Object.values(a)[0]-Object.values(e)[0]))),t=[s.jaName[0]+"○".repeat(s.jaName.length-1),s.jaGenus,`${s.type1.jaName}タイプ`,s.type2?`${s.type2.jaName}タイプ`:"タイプは1つだけ",`たかさ${L(s.height,"height")}`,`おもさ${L(s.weight,"weight")}`,e?`${e}が たかい`:null,a?`${a}は ひくい`:null];var l;return t[R(t.length)]??"がんばれ！"}()}`,background:"bg-green-100 select-none",timeout:2e3};r.trigger(e)},l]}class te extends x{constructor(e){super(),O(this,e,ae,ee,c,{data:5})}}export{te as component,W as universal};
