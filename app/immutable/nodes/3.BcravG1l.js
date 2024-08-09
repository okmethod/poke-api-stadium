import{s as Xe,D as ye,j as C,d as p,o as Rt,e as m,a as $,c as _,b as v,f as T,m as qt,h as f,k as c,u as Y,p as se,t as Re,g as He,v as xe,l as Ue,r as Ht,n as qe,q as zt,i as $t}from"../chunks/scheduler.DYDYJMk9.js";import{S as Ze,i as et,a as I,g as Ie,t as A,c as Fe,b as le,d as ne,m as ae,e as re}from"../chunks/index.oLKdMOgl.js";import{e as be,u as Tt,o as It}from"../chunks/each.Di6b4VGC.js";import{g as tt}from"../chunks/ProgressBar.svelte_svelte_type_style_lang.DD9dOxch.js";import{l as Gt,I as ke,c as je,a as Te,b as Jt,d as Kt,e as Le,f as Yt,g as xt,L as Qt,p as Qe,j as Wt,T as Ft}from"../chunks/constants.B_FoSusj.js";import{P as Ut}from"../chunks/PokeTile.DHN9q61v.js";async function Xt(o,t,s){const e=await Gt(o,t.id.toString());if(!e)return"default";const{double_damage_to:l,half_damage_to:a,no_damage_to:r}=e.damage_relations,n={double:l.map(u=>u.name),half:a.map(u=>u.name),no:r.map(u=>u.name)};for(const[u,g]of Object.entries(n))if(g.includes(s.enName))return u;return"default"}function Nt(o){let t,s,e,l,a,r,n,u,g,w;return n=new ke({props:{icon:"mdi:close",class:"w-5 h-5"}}),{c(){t=m("div"),s=m("div"),e=m("img"),a=$(),r=m("button"),le(n.$$.fragment),this.h()},l(b){t=_(b,"DIV",{class:!0,"data-parent":!0});var h=v(t);s=_(h,"DIV",{class:!0});var y=v(s);e=_(y,"IMG",{src:!0,alt:!0,class:!0}),a=T(y),r=_(y,"BUTTON",{class:!0});var D=v(r);ne(n.$$.fragment,D),D.forEach(p),y.forEach(p),h.forEach(p),this.h()},h(){qt(e.src,l=es)||f(e,"src",l),f(e,"alt","type_relations"),f(e,"class","w-96 h-96"),f(r,"class","absolute top-1 right-6 z-10"),f(s,"class","relative"),f(t,"class","min-w-[400px]"),f(t,"data-parent",o[0])},m(b,h){C(b,t,h),c(t,s),c(s,e),c(s,a),c(s,r),ae(n,r,null),u=!0,g||(w=Y(r,"click",o[3]),g=!0)},p(b,h){(!u||h&1)&&f(t,"data-parent",b[0])},i(b){u||(I(n.$$.fragment,b),u=!0)},o(b){A(n.$$.fragment,b),u=!1},d(b){b&&p(t),re(n),g=!1,w()}}}function Zt(o){let t,s,e=o[1][0]&&Nt(o);return{c(){e&&e.c(),t=ye()},l(l){e&&e.l(l),t=ye()},m(l,a){e&&e.m(l,a),C(l,t,a),s=!0},p(l,[a]){l[1][0]?e?(e.p(l,a),a&2&&I(e,1)):(e=Nt(l),e.c(),I(e,1),e.m(t.parentNode,t)):e&&(Ie(),A(e,1,1,()=>{e=null}),Fe())},i(l){s||(I(e),s=!0)},o(l){A(e),s=!1},d(l){l&&p(t),e&&e.d(l)}}}const es="https://www.pokemon.co.jp/ex/sun_moon/common/images/fight/161215_01/img_01.png";function ts(o,t,s){let e,{parent:l}=t;const a=tt();Rt(o,a,n=>s(1,e=n));function r(){a.close()}return o.$$set=n=>{"parent"in n&&s(0,l=n.parent)},[l,e,a,r]}class ss extends Ze{constructor(t){super(),et(this,t,ts,Zt,Xe,{parent:0})}}function St(o){let t,s,e,l=`<div class="p-4"><h2 class="text-2xl font-bold">ルール</h2> <p class="mt-4">まず ポケモン を 1たい えらぶ。
            <br/>
            つぎに タイプ を どちらか 1つ えらぶ。
            <br/>
            すばやさ が たかい ほうが こうげきする。</p> <ul class="mt-4 list-disc list-inside"><li>ばつぐん なら かち。</li> <li>いまひとつ か こうかなし なら まけ。</li> <li>どちらでもない なら あいこ。</li></ul></div>`,a,r,n,u,g,w;return n=new ke({props:{icon:"mdi:close",class:"w-5 h-5"}}),{c(){t=m("div"),s=m("div"),e=m("div"),e.innerHTML=l,a=$(),r=m("button"),le(n.$$.fragment),this.h()},l(b){t=_(b,"DIV",{class:!0,"data-parent":!0});var h=v(t);s=_(h,"DIV",{class:!0});var y=v(s);e=_(y,"DIV",{class:!0,"data-svelte-h":!0}),se(e)!=="svelte-1r4440v"&&(e.innerHTML=l),a=T(y),r=_(y,"BUTTON",{class:!0});var D=v(r);ne(n.$$.fragment,D),D.forEach(p),y.forEach(p),h.forEach(p),this.h()},h(){f(e,"class","w-96 h-96 bg-white"),f(r,"class","absolute top-1 right-6 z-10"),f(s,"class","relative"),f(t,"class","min-w-[400px]"),f(t,"data-parent",o[0])},m(b,h){C(b,t,h),c(t,s),c(s,e),c(s,a),c(s,r),ae(n,r,null),u=!0,g||(w=Y(r,"click",o[3]),g=!0)},p(b,h){(!u||h&1)&&f(t,"data-parent",b[0])},i(b){u||(I(n.$$.fragment,b),u=!0)},o(b){A(n.$$.fragment,b),u=!1},d(b){b&&p(t),re(n),g=!1,w()}}}function ls(o){let t,s,e=o[1][0]&&St(o);return{c(){e&&e.c(),t=ye()},l(l){e&&e.l(l),t=ye()},m(l,a){e&&e.m(l,a),C(l,t,a),s=!0},p(l,[a]){l[1][0]?e?(e.p(l,a),a&2&&I(e,1)):(e=St(l),e.c(),I(e,1),e.m(t.parentNode,t)):e&&(Ie(),A(e,1,1,()=>{e=null}),Fe())},i(l){s||(I(e),s=!0)},o(l){A(e),s=!1},d(l){l&&p(t),e&&e.d(l)}}}function ns(o,t,s){let e,{parent:l}=t;const a=tt();Rt(o,a,n=>s(1,e=n));function r(){a.close()}return o.$$set=n=>{"parent"in n&&s(0,l=n.parent)},[l,e,a,r]}class as extends Ze{constructor(t){super(),et(this,t,ns,ls,Xe,{parent:0})}}function At(o,t,s){const e=o.slice();return e[25]=t[s],e}function Vt(o,t,s){const e=o.slice();return e[28]=t[s],e[30]=s,e}function Ct(o,t,s){const e=o.slice();return e[31]=t[s],e[30]=s,e}function Pt(o,t){let s,e,l,a,r;return e=new Ut({props:{pokeData:t[31]}}),{key:o,first:null,c(){s=m("div"),le(e.$$.fragment),l=$(),this.h()},l(n){s=_(n,"DIV",{class:!0});var u=v(s);ne(e.$$.fragment,u),l=T(u),u.forEach(p),this.h()},h(){f(s,"class",a="rounded-2xl border-2 "+(t[30]==t[5]?"border-red-500":"border-transparent")),this.first=s},m(n,u){C(n,s,u),ae(e,s,null),c(s,l),r=!0},p(n,u){t=n;const g={};u[0]&16&&(g.pokeData=t[31]),e.$set(g),(!r||u[0]&48&&a!==(a="rounded-2xl border-2 "+(t[30]==t[5]?"border-red-500":"border-transparent")))&&f(s,"class",a)},i(n){r||(I(e.$$.fragment,n),r=!0)},o(n){A(e.$$.fragment,n),r=!1},d(n){n&&p(s),re(e)}}}function rs(o){let t,s,e,l,a;return{c(){t=m("span"),s=Re(o[7]),e=$(),l=m("span"),a=Re(o[8]),this.h()},l(r){t=_(r,"SPAN",{class:!0});var n=v(t);s=He(n,o[7]),n.forEach(p),e=T(r),l=_(r,"SPAN",{class:!0});var u=v(l);a=He(u,o[8]),u.forEach(p),this.h()},h(){f(t,"class","block sm:inline"),f(l,"class","block sm:inline")},m(r,n){C(r,t,n),c(t,s),C(r,e,n),C(r,l,n),c(l,a)},p(r,n){n[0]&128&&Ue(s,r[7]),n[0]&256&&Ue(a,r[8])},d(r){r&&(p(t),p(e),p(l))}}}function os(o){let t,s="VS";return{c(){t=m("span"),t.textContent=s,this.h()},l(e){t=_(e,"SPAN",{class:!0,"data-svelte-h":!0}),se(t)!=="svelte-qavuzn"&&(t.textContent=s),this.h()},h(){f(t,"class","block")},m(e,l){C(e,t,l)},p:qe,d(e){e&&p(t)}}}function Bt(o,t){let s,e,l,a,r,n,u,g;l=new Ut({props:{pokeData:t[28]}});function w(){return t[15](t[30])}function b(...h){return t[16](t[30],...h)}return{key:o,first:null,c(){s=m("div"),e=m("button"),le(l.$$.fragment),a=$(),this.h()},l(h){s=_(h,"DIV",{class:!0});var y=v(s);e=_(y,"BUTTON",{type:!0});var D=v(e);ne(l.$$.fragment,D),D.forEach(p),a=T(y),y.forEach(p),this.h()},h(){f(e,"type","button"),f(s,"class",r="rounded-2xl border-2 "+(t[30]==t[1]?"border-red-500":"border-transparent")),this.first=s},m(h,y){C(h,s,y),c(s,e),ae(l,e,null),c(s,a),n=!0,u||(g=[Y(e,"click",w),Y(e,"keydown",b)],u=!0)},p(h,y){t=h;const D={};y[0]&8&&(D.pokeData=t[28]),l.$set(D),(!n||y[0]&10&&r!==(r="rounded-2xl border-2 "+(t[30]==t[1]?"border-red-500":"border-transparent")))&&f(s,"class",r)},i(h){n||(I(l.$$.fragment,h),n=!0)},o(h){A(l.$$.fragment,h),n=!1},d(h){h&&p(s),re(l),u=!1,Ht(g)}}}function us(o){let t,s=be(We(o[3][o[1]])),e=[];for(let l=0;l<s.length;l+=1)e[l]=Ot(At(o,s,l));return{c(){for(let l=0;l<e.length;l+=1)e[l].c();t=ye()},l(l){for(let a=0;a<e.length;a+=1)e[a].l(l);t=ye()},m(l,a){for(let r=0;r<e.length;r+=1)e[r]&&e[r].m(l,a);C(l,t,a)},p(l,a){if(a[0]&4106){s=be(We(l[3][l[1]]));let r;for(r=0;r<s.length;r+=1){const n=At(l,s,r);e[r]?e[r].p(n,a):(e[r]=Ot(n),e[r].c(),e[r].m(t.parentNode,t))}for(;r<e.length;r+=1)e[r].d(1);e.length=s.length}},i:qe,o:qe,d(l){l&&p(t),zt(e,l)}}}function is(o){let t,s,e,l,a,r;return e=new ke({props:{icon:"mdi:pokeball",class:je}}),{c(){t=m("button"),s=m("div"),le(e.$$.fragment),this.h()},l(n){t=_(n,"BUTTON",{type:!0,class:!0});var u=v(t);s=_(u,"DIV",{class:!0});var g=v(s);ne(e.$$.fragment,g),g.forEach(p),u.forEach(p),this.h()},h(){f(s,"class",Le),f(t,"type","button"),f(t,"class",Te)},m(n,u){C(n,t,u),c(t,s),ae(e,s,null),l=!0,a||(r=Y(t,"click",o[11]),a=!0)},p:qe,i(n){l||(I(e.$$.fragment,n),l=!0)},o(n){A(e.$$.fragment,n),l=!1},d(n){n&&p(t),re(e),a=!1,r()}}}function Ot(o){let t,s=o[25].jaName+"",e,l,a,r;function n(){return o[17](o[25])}return{c(){t=m("button"),e=Re(s),l=$(),this.h()},l(u){t=_(u,"BUTTON",{style:!0,class:!0});var g=v(t);e=He(g,s),l=T(g),g.forEach(p),this.h()},h(){var u;$t(t,"background-color",((u=Ft[o[25].enName])==null?void 0:u.color)||"blue"),f(t,"class","px-2 py-1 hover:brightness-85 text-white rounded h-full flex items-center")},m(u,g){C(u,t,g),c(t,e),c(t,l),a||(r=Y(t,"click",n),a=!0)},p(u,g){var w;o=u,g[0]&10&&s!==(s=o[25].jaName+"")&&Ue(e,s),g[0]&10&&$t(t,"background-color",((w=Ft[o[25].enName])==null?void 0:w.color)||"blue")},d(u){u&&p(t),a=!1,r()}}}function cs(o){let t,s,e=`<h1 class="${Jt}">ポケモンタイプじゃんけん</h1>`,l,a,r,n,u,g="ポケモン を よびだす",w,b,h,y,D,x,pe,H,Ne="",me,Q,U,q,z,Ee,W,G,X,E,M,P,Z="",B,L,R,De="あいて",_e,J,F=[],Se=new Map,Me,oe,ue,ze,ee,ie,st="あなた",Ge,ce,V=[],lt=new Map,Je,he,K,ge,Ae,Ke,Ve,N,S,fe,Ye,nt;D=new ke({props:{icon:"mdi:pokeball",class:je}}),z=new ke({props:{icon:"mdi:head-question-outline",class:je}}),E=new ke({props:{icon:"mdi:table-question",class:je}});let we=be(o[4]);const at=i=>i[31].id;for(let i=0;i<we.length;i+=1){let d=Ct(o,we,i),k=at(d);Se.set(k,F[i]=Pt(k,d))}function rt(i,d){return i[0]!=="term"?os:rs}let Ce=rt(o),j=Ce(o),$e=be(o[3]);const ot=i=>i[28].id;for(let i=0;i<$e.length;i+=1){let d=Vt(o,$e,i),k=ot(d);lt.set(k,V[i]=Bt(k,d))}const ut=[is,us],te=[];function it(i,d){return d[0]&3&&(Ve=null),Ve==null&&(Ve=!!(i[0]=="select_poke"&&i[9].includes(i[1]))),Ve?0:i[0]=="select_type"?1:-1}return~(N=it(o,[-1,-1]))&&(S=te[N]=ut[N](o)),{c(){t=m("div"),s=m("div"),s.innerHTML=e,l=$(),a=m("div"),r=m("div"),n=m("div"),u=m("span"),u.textContent=g,w=$(),b=m("form"),h=m("button"),y=m("div"),le(D.$$.fragment),pe=$(),H=m("div"),H.innerHTML=Ne,me=$(),Q=m("form"),U=m("button"),q=m("div"),le(z.$$.fragment),Ee=$(),W=m("form"),G=m("button"),X=m("div"),le(E.$$.fragment),M=$(),P=m("div"),P.innerHTML=Z,B=$(),L=m("div"),R=m("span"),R.textContent=De,_e=$(),J=m("div");for(let i=0;i<F.length;i+=1)F[i].c();Me=$(),oe=m("div"),ue=m("p"),j.c(),ze=$(),ee=m("div"),ie=m("span"),ie.textContent=st,Ge=$(),ce=m("div");for(let i=0;i<V.length;i+=1)V[i].c();Je=$(),he=m("div"),K=m("div"),ge=m("span"),Ae=Re(o[6]),Ke=$(),S&&S.c(),this.h()},l(i){t=_(i,"DIV",{class:!0});var d=v(t);s=_(d,"DIV",{class:!0,"data-svelte-h":!0}),se(s)!=="svelte-ky43s9"&&(s.innerHTML=e),l=T(d),a=_(d,"DIV",{class:!0});var k=v(a);r=_(k,"DIV",{class:!0});var ct=v(r);n=_(ct,"DIV",{class:!0});var O=v(n);u=_(O,"SPAN",{class:!0,"data-svelte-h":!0}),se(u)!=="svelte-mp7i3f"&&(u.textContent=g),w=T(O),b=_(O,"FORM",{});var ft=v(b);h=_(ft,"BUTTON",{type:!0,class:!0});var dt=v(h);y=_(dt,"DIV",{class:!0});var pt=v(y);ne(D.$$.fragment,pt),pt.forEach(p),dt.forEach(p),ft.forEach(p),pe=T(O),H=_(O,"DIV",{class:!0,"data-svelte-h":!0}),se(H)!=="svelte-1rtwic7"&&(H.innerHTML=Ne),me=T(O),Q=_(O,"FORM",{});var mt=v(Q);U=_(mt,"BUTTON",{type:!0,class:!0});var _t=v(U);q=_(_t,"DIV",{class:!0});var ht=v(q);ne(z.$$.fragment,ht),ht.forEach(p),_t.forEach(p),mt.forEach(p),Ee=T(O),W=_(O,"FORM",{});var gt=v(W);G=_(gt,"BUTTON",{type:!0,class:!0});var vt=v(G);X=_(vt,"DIV",{class:!0});var bt=v(X);ne(E.$$.fragment,bt),bt.forEach(p),vt.forEach(p),gt.forEach(p),M=T(O),P=_(O,"DIV",{class:!0,"data-svelte-h":!0}),se(P)!=="svelte-17db9va"&&(P.innerHTML=Z),O.forEach(p),ct.forEach(p),B=T(k),L=_(k,"DIV",{class:!0});var Pe=v(L);R=_(Pe,"SPAN",{class:!0,"data-svelte-h":!0}),se(R)!=="svelte-10ns923"&&(R.textContent=De),_e=T(Pe),J=_(Pe,"DIV",{class:!0});var kt=v(J);for(let de=0;de<F.length;de+=1)F[de].l(kt);kt.forEach(p),Pe.forEach(p),Me=T(k),oe=_(k,"DIV",{});var yt=v(oe);ue=_(yt,"P",{class:!0});var Et=v(ue);j.l(Et),Et.forEach(p),yt.forEach(p),ze=T(k),ee=_(k,"DIV",{class:!0});var Be=v(ee);ie=_(Be,"SPAN",{class:!0,"data-svelte-h":!0}),se(ie)!=="svelte-mhotnc"&&(ie.textContent=st),Ge=T(Be),ce=_(Be,"DIV",{class:!0});var Dt=v(ce);for(let de=0;de<V.length;de+=1)V[de].l(Dt);Dt.forEach(p),Be.forEach(p),Je=T(k),he=_(k,"DIV",{class:!0});var Mt=v(he);K=_(Mt,"DIV",{class:!0});var Oe=v(K);ge=_(Oe,"SPAN",{class:!0});var wt=v(ge);Ae=He(wt,o[6]),wt.forEach(p),Ke=T(Oe),S&&S.l(Oe),Oe.forEach(p),Mt.forEach(p),k.forEach(p),d.forEach(p),this.h()},h(){f(s,"class",Kt),f(u,"class","text-lg"),f(y,"class",Le),f(h,"type","submit"),h.disabled=o[2],f(h,"class",x=Te+" "+(o[2]?"bg-gray-500":"")),f(H,"class","flex-grow"),f(q,"class",Le),f(U,"type","submit"),f(U,"class",Te),f(X,"class",Le),f(G,"type","submit"),f(G,"class",Te),f(P,"class","mr-4"),f(n,"class","flex items-center space-x-3"),f(r,"class","ml-4"),f(R,"class","block mt-1 ml-2"),f(J,"class",Lt),f(L,"class",jt),f(ue,"class","text-center text-lg"),f(ie,"class","block mt-1 ml-2"),f(ce,"class",Lt),f(ee,"class",jt),f(ge,"class","text-lg"),f(K,"class","flex items-center space-x-3"),f(he,"class","ml-4"),f(a,"class",Yt+" min-w-[300px] max-w-[600px]"),f(t,"class",xt)},m(i,d){C(i,t,d),c(t,s),c(t,l),c(t,a),c(a,r),c(r,n),c(n,u),c(n,w),c(n,b),c(b,h),c(h,y),ae(D,y,null),c(n,pe),c(n,H),c(n,me),c(n,Q),c(Q,U),c(U,q),ae(z,q,null),c(n,Ee),c(n,W),c(W,G),c(G,X),ae(E,X,null),c(n,M),c(n,P),c(a,B),c(a,L),c(L,R),c(L,_e),c(L,J);for(let k=0;k<F.length;k+=1)F[k]&&F[k].m(J,null);c(a,Me),c(a,oe),c(oe,ue),j.m(ue,null),c(a,ze),c(a,ee),c(ee,ie),c(ee,Ge),c(ee,ce);for(let k=0;k<V.length;k+=1)V[k]&&V[k].m(ce,null);c(a,Je),c(a,he),c(he,K),c(K,ge),c(ge,Ae),c(K,Ke),~N&&te[N].m(K,null),fe=!0,Ye||(nt=[Y(b,"submit",xe(o[10])),Y(Q,"submit",xe(o[13])),Y(W,"submit",xe(o[14]))],Ye=!0)},p(i,d){(!fe||d[0]&4)&&(h.disabled=i[2]),(!fe||d[0]&4&&x!==(x=Te+" "+(i[2]?"bg-gray-500":"")))&&f(h,"class",x),d[0]&48&&(we=be(i[4]),Ie(),F=Tt(F,d,at,1,i,we,Se,J,It,Pt,null,Ct),Fe()),Ce===(Ce=rt(i))&&j?j.p(i,d):(j.d(1),j=Ce(i),j&&(j.c(),j.m(ue,null))),d[0]&10&&($e=be(i[3]),Ie(),V=Tt(V,d,ot,1,i,$e,lt,ce,It,Bt,null,Vt),Fe()),(!fe||d[0]&64)&&Ue(Ae,i[6]);let k=N;N=it(i,d),N===k?~N&&te[N].p(i,d):(S&&(Ie(),A(te[k],1,1,()=>{te[k]=null}),Fe()),~N?(S=te[N],S?S.p(i,d):(S=te[N]=ut[N](i),S.c()),I(S,1),S.m(K,null)):S=null)},i(i){if(!fe){I(D.$$.fragment,i),I(z.$$.fragment,i),I(E.$$.fragment,i);for(let d=0;d<we.length;d+=1)I(F[d]);for(let d=0;d<$e.length;d+=1)I(V[d]);I(S),fe=!0}},o(i){A(D.$$.fragment,i),A(z.$$.fragment,i),A(E.$$.fragment,i);for(let d=0;d<F.length;d+=1)A(F[d]);for(let d=0;d<V.length;d+=1)A(V[d]);A(S),fe=!1},d(i){i&&p(t),re(D),re(z),re(E);for(let d=0;d<F.length;d+=1)F[d].d();j.d();for(let d=0;d<V.length;d+=1)V[d].d();~N&&te[N].d(),Ye=!1,Ht(nt)}}}const ve=3,jt="min-h-[220px] min-w-[300px] border bg-white rounded-xl",Lt="flex flex-wrap justify-between gap-y-1 p-4";function We(o){const t=o.type1,s=o.type2;return s?[t,s]:[t]}function fs(o,t,s){const e=Array.from({length:ve},(E,M)=>M);let l=!1,a=[],r=[];async function n(){s(2,l=!0),s(0,u="summonning_poke"),U();try{const E=Array.from({length:Qt},(Z,B)=>B+1),M=Qe(E,ve*2),P=await Promise.all(M.slice(0,ve*2).map(Z=>Wt(fetch,Z.toString())));s(3,a=P.slice(0,ve)),s(4,r=P.slice(ve,ve*2))}catch{}s(2,l=!1),s(0,u="select_poke")}let u="init",g=-1,w=-1,b,h,y,D,x,pe;function H(){const E={init:"ポケモン を よびだしてね",summonning_poke:"ポケモン を よびだしちゅう...",select_poke:e.includes(g)?`${a[g].jaName} で しょうぶ する？`:"ポケモン をえらんでね",select_type:"タイプ をえらんでね",term:pe};s(6,y=E[u])}function Ne(){s(0,u="select_type"),s(5,w=Qe(e,1)[0])}async function me(E){b=E;const M=We(r[w]);h=M.length===1?M[0]:M[Qe([0,1],1)[0]],s(7,{attackMessage:D,compatibilityMessage:x,resultMessage:pe}=await Q(a[g],r[w],b,h),D,s(8,x)),s(0,u="term")}async function Q(E,M,P,Z){const B=E.stats.speed>=M.stats.speed,L=B?E:M,R=B?P:Z,De=B?Z:P,_e={double:{efficacyMessage:"ばつぐん だ！",resultMessage:B?"あなた の かち！":"あなた の まけ..."},half:{efficacyMessage:"いまひとつ...",resultMessage:B?"あなた の まけ...":"あなた の かち！"},no:{efficacyMessage:"こうかは なし...",resultMessage:B?"あなた の まけ...":"あなた の かち！"},default:{efficacyMessage:"まずまず だ",resultMessage:"あいこ"}},J=await Xt(fetch,R,De),{efficacyMessage:F,resultMessage:Se}=_e[J]||_e.default,Me=`${L.jaName} の こうげき！`,oe=`${R.jaName} は ${De.jaName} に ${F}`;return{attackMessage:Me,compatibilityMessage:oe,resultMessage:Se}}function U(){s(3,a=[]),s(4,r=[]),s(1,g=-1),s(5,w=-1)}const q=tt();function z(){const M={type:"component",component:{ref:as,props:{}},backdropClasses:"fixed inset-0 !bg-gray-300/90"};q.trigger(M)}function Ee(){const M={type:"component",component:{ref:ss,props:{}},backdropClasses:"fixed inset-0 !bg-gray-300/90"};q.trigger(M)}const W=E=>s(1,g=E),G=(E,M)=>{(M.key==="Enter"||M.key===" ")&&s(1,g=E)},X=E=>me(E);return o.$$.update=()=>{o.$$.dirty[0]&3&&(u||g)&&H()},[u,g,l,a,r,w,y,D,x,e,n,Ne,me,z,Ee,W,G,X]}class vs extends Ze{constructor(t){super(),et(this,t,fs,cs,Xe,{},null,[-1,-1])}}export{vs as component};
