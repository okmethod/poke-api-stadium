import{_ as Rt}from"../chunks/preload-helper.D6kgxu3v.js";import{s as Ge,e as h,t as ue,a as N,c as _,b,g as ie,d as u,f as U,h as d,j as S,k as c,l as Ve,n as oe,m as Be,o as Dt,p as je,q as Ae,u as xt,w as Ke,v as Ee,x as ze,r as zt,E as qt}from"../chunks/scheduler.C8Cqrq_a.js";import{S as Je,i as Qe,g as ce,t as w,c as fe,a as P,b as W,d as X,m as Y,e as Z}from"../chunks/index.CJoleKGr.js";import{e as Ce}from"../chunks/each.9EPyGsFy.js";import{g as Tt}from"../chunks/ProgressBar.svelte_svelte_type_style_lang.BXNy3vvb.js";import{I as Pe}from"../chunks/Icon.eyo9CSAQ.js";import{s as Et,p as yt,g as Kt}from"../chunks/numerics.DYRi6Rfg.js";function Gt(s){let e,t,l;return t=new Pe({props:{icon:"mdi:image-off-outline",class:"w-8 h-8 bg-white"}}),{c(){e=h("div"),W(t.$$.fragment),this.h()},l(r){e=_(r,"DIV",{class:!0});var n=b(e);X(t.$$.fragment,n),n.forEach(u),this.h()},h(){d(e,"class","absolute inset-0 flex items-center justify-center h-full")},m(r,n){S(r,e,n),Y(t,e,null),l=!0},p:oe,i(r){l||(P(t.$$.fragment,r),l=!0)},o(r){w(t.$$.fragment,r),l=!1},d(r){r&&u(e),Z(t)}}}function Jt(s){let e,t,l,r,n,I,i,k,a=!s[2]&&Ct();return{c(){e=h("img"),r=N(),a&&a.c(),n=Be(),this.h()},l(f){e=_(f,"IMG",{src:!0,alt:!0,class:!0}),r=U(f),a&&a.l(f),n=Be(),this.h()},h(){Dt(e.src,t=s[1])||d(e,"src",t),d(e,"alt",l=s[0]??"???"),d(e,"class","w-full h-full object-cover"),je(e,"image",!s[2]),je(e,"loaded",s[2])},m(f,o){S(f,e,o),S(f,r,o),a&&a.m(f,o),S(f,n,o),I=!0,i||(k=Ae(e,"load",s[3]),i=!0)},p(f,o){(!I||o&2&&!Dt(e.src,t=f[1]))&&d(e,"src",t),(!I||o&1&&l!==(l=f[0]??"???"))&&d(e,"alt",l),(!I||o&4)&&je(e,"image",!f[2]),(!I||o&4)&&je(e,"loaded",f[2]),f[2]?a&&(ce(),w(a,1,1,()=>{a=null}),fe()):a?o&4&&P(a,1):(a=Ct(),a.c(),P(a,1),a.m(n.parentNode,n))},i(f){I||(P(a),I=!0)},o(f){w(a),I=!1},d(f){f&&(u(e),u(r),u(n)),a&&a.d(f),i=!1,k()}}}function Ct(s){let e,t,l;return t=new Pe({props:{icon:"mdi:progress-download",class:"w-full h-full text-white bg-gray-100 object-cover"}}),{c(){e=h("div"),W(t.$$.fragment),this.h()},l(r){e=_(r,"DIV",{class:!0});var n=b(e);X(t.$$.fragment,n),n.forEach(u),this.h()},h(){d(e,"class","absolute inset-0 flex items-center justify-center h-full")},m(r,n){S(r,e,n),Y(t,e,null),l=!0},i(r){l||(P(t.$$.fragment,r),l=!0)},o(r){w(t.$$.fragment,r),l=!1},d(r){r&&u(e),Z(t)}}}function Qt(s){let e,t,l,r,n,I=(s[0]??"???")+"",i,k,a,f,o,D,A;const O=[Jt,Gt],F=[];function L(m,v){return m[1]!==null?0:1}return o=L(s),D=F[o]=O[o](s),{c(){e=h("div"),t=h("div"),l=h("div"),r=h("h1"),n=h("div"),i=ue(I),k=N(),a=h("div"),f=h("div"),D.c(),this.h()},l(m){e=_(m,"DIV",{class:!0});var v=b(e);t=_(v,"DIV",{class:!0});var E=b(t);l=_(E,"DIV",{class:!0});var y=b(l);r=_(y,"H1",{class:!0});var j=b(r);n=_(j,"DIV",{});var $=b(n);i=ie($,I),$.forEach(u),j.forEach(u),y.forEach(u),k=U(E),a=_(E,"DIV",{class:!0});var M=b(a);f=_(M,"DIV",{class:!0});var T=b(f);D.l(T),T.forEach(u),M.forEach(u),E.forEach(u),v.forEach(u),this.h()},h(){d(r,"class","text-xs font-bold text-gray-900"),d(l,"class","absolute inset-0 m-1 flex justify-center"),d(f,"class","flex items-center justify-center bg-white rounded-full border border-gray-200 h-[80px] w-[80px]"),d(a,"class","flex justify-center"),d(t,"class","relative p-2 bg-transparent"),d(e,"class","flex flex-col bg-gray-50 rounded-2xl shadow border h-[100px] w-[100px] overflow-hidden select-none")},m(m,v){S(m,e,v),c(e,t),c(t,l),c(l,r),c(r,n),c(n,i),c(t,k),c(t,a),c(a,f),F[o].m(f,null),A=!0},p(m,[v]){(!A||v&1)&&I!==(I=(m[0]??"???")+"")&&Ve(i,I);let E=o;o=L(m),o===E?F[o].p(m,v):(ce(),w(F[E],1,1,()=>{F[E]=null}),fe(),D=F[o],D?D.p(m,v):(D=F[o]=O[o](m),D.c()),P(D,1),D.m(f,null))},i(m){A||(P(D),A=!0)},o(m){w(D),A=!1},d(m){m&&u(e),F[o].d()}}}function Wt(s,e,t){let{name:l=null}=e,{imageUrl:r=null}=e,n=!1;function I(){t(2,n=!0)}return s.$$set=i=>{"name"in i&&t(0,l=i.name),"imageUrl"in i&&t(1,r=i.imageUrl)},s.$$.update=()=>{s.$$.dirty&2&&r&&t(2,n=!1)},[l,r,n,I]}class jt extends Je{constructor(e){super(),Qe(this,e,Wt,Qt,Ge,{name:0,imageUrl:1})}}function At(s,e,t){const l=s.slice();return l[6]=e[t],l}function Pt(s){let e,t,l,r,n,I,i,k,a,f,o,D,A,O,F,L=Ce(s[1]),m=[];for(let v=0;v<L.length;v+=1)m[v]=Bt(At(s,L,v));return D=new Pe({props:{icon:"mdi:close",class:"w-5 h-5"}}),{c(){e=h("div"),t=h("div"),l=h("div"),r=h("div"),n=h("h2"),I=ue(s[0]),i=N(),k=h("div"),a=h("ul");for(let v=0;v<m.length;v+=1)m[v].c();f=N(),o=h("button"),W(D.$$.fragment),this.h()},l(v){e=_(v,"DIV",{class:!0,"data-parent":!0});var E=b(e);t=_(E,"DIV",{class:!0});var y=b(t);l=_(y,"DIV",{class:!0});var j=b(l);r=_(j,"DIV",{class:!0});var $=b(r);n=_($,"H2",{class:!0});var M=b(n);I=ie(M,s[0]),M.forEach(u),i=U($),k=_($,"DIV",{class:!0});var T=b(k);a=_(T,"UL",{class:!0});var x=b(a);for(let R=0;R<m.length;R+=1)m[R].l(x);x.forEach(u),T.forEach(u),$.forEach(u),j.forEach(u),f=U(y),o=_(y,"BUTTON",{class:!0});var de=b(o);X(D.$$.fragment,de),de.forEach(u),y.forEach(u),E.forEach(u),this.h()},h(){d(n,"class","text-2xl font-bold"),d(a,"class","mt-4 list-decimal list-inside"),d(k,"class","overflow-y-auto flex-grow"),d(r,"class","p-4 flex flex-col h-full"),d(l,"class","h-full h-full bg-white"),d(o,"class","absolute top-1 right-6 z-10"),d(t,"class","relative"),d(e,"class",""),d(e,"data-parent",s[2])},m(v,E){S(v,e,E),c(e,t),c(t,l),c(l,r),c(r,n),c(n,I),c(r,i),c(r,k),c(k,a);for(let y=0;y<m.length;y+=1)m[y]&&m[y].m(a,null);c(t,f),c(t,o),Y(D,o,null),A=!0,O||(F=Ae(o,"click",s[5]),O=!0)},p(v,E){if((!A||E&1)&&Ve(I,v[0]),E&2){L=Ce(v[1]);let y;for(y=0;y<L.length;y+=1){const j=At(v,L,y);m[y]?m[y].p(j,E):(m[y]=Bt(j),m[y].c(),m[y].m(a,null))}for(;y<m.length;y+=1)m[y].d(1);m.length=L.length}(!A||E&4)&&d(e,"data-parent",v[2])},i(v){A||(P(D.$$.fragment,v),A=!0)},o(v){w(D.$$.fragment,v),A=!1},d(v){v&&u(e),Ke(m,v),Z(D),O=!1,F()}}}function Bt(s){let e,t=s[6]+"",l;return{c(){e=h("li"),l=ue(t)},l(r){e=_(r,"LI",{});var n=b(e);l=ie(n,t),n.forEach(u)},m(r,n){S(r,e,n),c(e,l)},p(r,n){n&2&&t!==(t=r[6]+"")&&Ve(l,t)},d(r){r&&u(e)}}}function Xt(s){let e,t,l=s[3][0]&&Pt(s);return{c(){l&&l.c(),e=Be()},l(r){l&&l.l(r),e=Be()},m(r,n){l&&l.m(r,n),S(r,e,n),t=!0},p(r,[n]){r[3][0]?l?(l.p(r,n),n&8&&P(l,1)):(l=Pt(r),l.c(),P(l,1),l.m(e.parentNode,e)):l&&(ce(),w(l,1,1,()=>{l=null}),fe())},i(r){t||(P(l),t=!0)},o(r){w(l),t=!1},d(r){r&&u(e),l&&l.d(r)}}}function Yt(s,e,t){let l,{title:r}=e,{stringArray:n=[]}=e,{parent:I}=e;const i=Tt();xt(s,i,a=>t(3,l=a));function k(){i.close()}return s.$$set=a=>{"title"in a&&t(0,r=a.title),"stringArray"in a&&t(1,n=a.stringArray),"parent"in a&&t(2,I=a.parent)},[r,n,I,l,i,k]}class Zt extends Je{constructor(e){super(),Qe(this,e,Yt,Xt,Ge,{title:0,stringArray:1,parent:2})}}function Vt(s,e,t){const l=s.slice();return l[14]=e[t],l[16]=t,l}function wt(s,e,t){const l=s.slice();return l[14]=e[t],l}function el(s){let e;return{c(){e=ue("しりとり リセット")},l(t){e=ie(t,"しりとり リセット")},m(t,l){S(t,e,l)},d(t){t&&u(e)}}}function tl(s){let e;return{c(){e=ue("しりとり スタート")},l(t){e=ie(t,"しりとり スタート")},m(t,l){S(t,e,l)},d(t){t&&u(e)}}}function ll(s){let e;return{c(){e=h("div"),this.h()},l(t){e=_(t,"DIV",{class:!0}),b(e).forEach(u),this.h()},h(){d(e,"class",We)},m(t,l){S(t,e,l)},p:oe,i:oe,o:oe,d(t){t&&u(e)}}}function sl(s){let e,t,l,r,n;t=new jt({props:{name:s[1][s[14]].jaName,imageUrl:s[1][s[14]].imageUrl}});function I(){return s[8](s[14])}return{c(){e=h("button"),W(t.$$.fragment),this.h()},l(i){e=_(i,"BUTTON",{type:!0});var k=b(e);X(t.$$.fragment,k),k.forEach(u),this.h()},h(){d(e,"type","button")},m(i,k){S(i,e,k),Y(t,e,null),l=!0,r||(n=Ae(e,"click",I),r=!0)},p(i,k){s=i;const a={};k&6&&(a.name=s[1][s[14]].jaName),k&6&&(a.imageUrl=s[1][s[14]].imageUrl),t.$set(a)},i(i){l||(P(t.$$.fragment,i),l=!0)},o(i){w(t.$$.fragment,i),l=!1},d(i){i&&u(e),Z(t),r=!1,n()}}}function Ft(s){let e,t,l,r,n;const I=[sl,ll],i=[];function k(a,f){return a[1][a[14]].isUsed?1:0}return t=k(s),l=i[t]=I[t](s),{c(){e=h("div"),l.c(),r=N(),this.h()},l(a){e=_(a,"DIV",{class:!0});var f=b(e);l.l(f),r=U(f),f.forEach(u),this.h()},h(){d(e,"class","rounded-2xl border-2")},m(a,f){S(a,e,f),i[t].m(e,null),c(e,r),n=!0},p(a,f){let o=t;t=k(a),t===o?i[t].p(a,f):(ce(),w(i[o],1,1,()=>{i[o]=null}),fe(),l=i[t],l?l.p(a,f):(l=i[t]=I[t](a),l.c()),P(l,1),l.m(e,r))},i(a){n||(P(l),n=!0)},o(a){w(l),n=!1},d(a){a&&u(e),i[t].d()}}}function rl(s){let e;return{c(){e=h("div"),this.h()},l(t){e=_(t,"DIV",{class:!0}),b(e).forEach(u),this.h()},h(){d(e,"class",We)},m(t,l){S(t,e,l)},p:oe,i:oe,o:oe,d(t){t&&u(e)}}}function nl(s){let e,t;return e=new jt({props:{name:s[1][s[14]].jaName,imageUrl:s[1][s[14]].imageUrl}}),{c(){W(e.$$.fragment)},l(l){X(e.$$.fragment,l)},m(l,r){Y(e,l,r),t=!0},p(l,r){const n={};r&3&&(n.name=l[1][l[14]].jaName),r&3&&(n.imageUrl=l[1][l[14]].imageUrl),e.$set(n)},i(l){t||(P(e.$$.fragment,l),t=!0)},o(l){w(e.$$.fragment,l),t=!1},d(l){Z(e,l)}}}function al(s){let e,t="→";return{c(){e=h("span"),e.textContent=t},l(l){e=_(l,"SPAN",{"data-svelte-h":!0}),Ee(e)!=="svelte-1xb5tc"&&(e.textContent=t)},m(l,r){S(l,e,r)},d(l){l&&u(e)}}}function St(s){let e,t,l,r,n,I;const i=[nl,rl],k=[];function a(o,D){return o[14]?0:1}t=a(s),l=k[t]=i[t](s);let f=s[16]<2&&al();return{c(){e=h("div"),l.c(),r=N(),f&&f.c(),n=Be(),this.h()},l(o){e=_(o,"DIV",{class:!0});var D=b(e);l.l(D),D.forEach(u),r=U(o),f&&f.l(o),n=Be(),this.h()},h(){d(e,"class","rounded-2xl border-2")},m(o,D){S(o,e,D),k[t].m(e,null),S(o,r,D),f&&f.m(o,D),S(o,n,D),I=!0},p(o,D){let A=t;t=a(o),t===A?k[t].p(o,D):(ce(),w(k[A],1,1,()=>{k[A]=null}),fe(),l=k[t],l?l.p(o,D):(l=k[t]=i[t](o),l.c()),P(l,1),l.m(e,null))},i(o){I||(P(l),I=!0)},o(o){w(l),I=!1},d(o){o&&(u(e),u(r),u(n)),k[t].d(),f&&f.d(o)}}}function ol(s){let e,t,l='<h1 class="cTitleStyle">ポケモンしりとり</h1>',r,n,I,i,k,a,f,o,D,A,O,F,L="",m,v,E=s[0].length+"",y,j,$,M,T,x,de,R,Xe="",Me,me,ee,Le,he,G,te,Ye="ポケモン を いれかえる",Oe,_e,z,ve,le,we,Fe,He,pe,q,Se,ge,be,se,Ze="？",Re,ke,Ie,De,Ne,J,xe,et;function tt(p,C){return p[2].length===0?tl:el}let Ue=tt(s),K=Ue(s);A=new Pe({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),x=new Pe({props:{icon:"mdi:format-list-numbered",class:"cIconStyle"}});let re=Ce(s[2]),B=[];for(let p=0;p<re.length;p+=1)B[p]=Ft(wt(s,re,p));const Ot=p=>w(B[p],1,1,()=>{B[p]=null});le=new Pe({props:{icon:"mdi:pokeball",class:"cIconStyle"}});let ne=Ce(s[0].length>=2?s[0].slice(-2):[...Array(2-s[0].length).fill(null),...s[0]]),V=[];for(let p=0;p<ne.length;p+=1)V[p]=St(Vt(s,ne,p));const Ht=p=>w(V[p],1,1,()=>{V[p]=null});return{c(){e=h("div"),t=h("div"),t.innerHTML=l,r=N(),n=h("div"),I=h("div"),i=h("div"),k=h("span"),K.c(),a=N(),f=h("form"),o=h("button"),D=h("div"),W(A.$$.fragment),O=N(),F=h("div"),F.innerHTML=L,m=N(),v=h("p"),y=ue(E),j=N(),$=h("form"),M=h("button"),T=h("div"),W(x.$$.fragment),de=N(),R=h("div"),R.innerHTML=Xe,Me=N(),me=h("div"),ee=h("div");for(let p=0;p<B.length;p+=1)B[p].c();Le=N(),he=h("div"),G=h("div"),te=h("span"),te.textContent=Ye,Oe=N(),_e=h("form"),z=h("button"),ve=h("div"),W(le.$$.fragment),He=N(),pe=h("div"),q=h("div");for(let p=0;p<V.length;p+=1)V[p].c();Se=N(),ge=h("div"),be=h("div"),se=h("span"),se.textContent=Ze,Re=N(),ke=h("div"),Ie=h("div"),De=h("span"),Ne=ue(s[3]),this.h()},l(p){e=_(p,"DIV",{class:!0});var C=b(e);t=_(C,"DIV",{class:!0,"data-svelte-h":!0}),Ee(t)!=="svelte-n7rgko"&&(t.innerHTML=l),r=U(C),n=_(C,"DIV",{class:!0});var g=b(n);I=_(g,"DIV",{class:!0});var Q=b(I);i=_(Q,"DIV",{class:!0});var H=b(i);k=_(H,"SPAN",{class:!0});var lt=b(k);K.l(lt),lt.forEach(u),a=U(H),f=_(H,"FORM",{});var st=b(f);o=_(st,"BUTTON",{type:!0,class:!0});var rt=b(o);D=_(rt,"DIV",{class:!0});var nt=b(D);X(A.$$.fragment,nt),nt.forEach(u),rt.forEach(u),st.forEach(u),O=U(H),F=_(H,"DIV",{class:!0,"data-svelte-h":!0}),Ee(F)!=="svelte-1rtwic7"&&(F.innerHTML=L),m=U(H),v=_(H,"P",{class:!0});var at=b(v);y=ie(at,E),at.forEach(u),j=U(H),$=_(H,"FORM",{});var ot=b($);M=_(ot,"BUTTON",{type:!0,class:!0});var ut=b(M);T=_(ut,"DIV",{class:!0});var it=b(T);X(x.$$.fragment,it),it.forEach(u),ut.forEach(u),ot.forEach(u),de=U(H),R=_(H,"DIV",{class:!0,"data-svelte-h":!0}),Ee(R)!=="svelte-17db9va"&&(R.innerHTML=Xe),H.forEach(u),Q.forEach(u),Me=U(g),me=_(g,"DIV",{class:!0});var ct=b(me);ee=_(ct,"DIV",{class:!0});var ft=b(ee);for(let ae=0;ae<B.length;ae+=1)B[ae].l(ft);ft.forEach(u),ct.forEach(u),Le=U(g),he=_(g,"DIV",{class:!0});var dt=b(he);G=_(dt,"DIV",{class:!0});var $e=b(G);te=_($e,"SPAN",{class:!0,"data-svelte-h":!0}),Ee(te)!=="svelte-1ysiuuh"&&(te.textContent=Ye),Oe=U($e),_e=_($e,"FORM",{});var mt=b(_e);z=_(mt,"BUTTON",{type:!0,class:!0});var ht=b(z);ve=_(ht,"DIV",{class:!0});var _t=b(ve);X(le.$$.fragment,_t),_t.forEach(u),ht.forEach(u),mt.forEach(u),$e.forEach(u),dt.forEach(u),He=U(g),pe=_(g,"DIV",{class:!0});var vt=b(pe);q=_(vt,"DIV",{class:!0});var Te=b(q);for(let ae=0;ae<V.length;ae+=1)V[ae].l(Te);Se=U(Te),ge=_(Te,"DIV",{class:!0});var pt=b(ge);be=_(pt,"DIV",{class:!0});var gt=b(be);se=_(gt,"SPAN",{class:!0,"data-svelte-h":!0}),Ee(se)!=="svelte-mds9k2"&&(se.textContent=Ze),gt.forEach(u),pt.forEach(u),Te.forEach(u),vt.forEach(u),Re=U(g),ke=_(g,"DIV",{class:!0});var bt=b(ke);Ie=_(bt,"DIV",{class:!0});var kt=b(Ie);De=_(kt,"SPAN",{class:!0});var It=b(De);Ne=ie(It,s[3]),It.forEach(u),kt.forEach(u),bt.forEach(u),g.forEach(u),C.forEach(u),this.h()},h(){d(t,"class","cTitlePartStyle"),d(k,"class","text-lg"),d(D,"class","cIconDivStyle"),d(o,"type","submit"),d(o,"class","cIconButtonStyle"),d(F,"class","flex-grow"),d(v,"class","text-lg"),d(T,"class","cIconDivStyle"),d(M,"type","submit"),d(M,"class","cIconButtonStyle"),d(R,"class","mr-4"),d(i,"class","cInputFormAndMessagePartStyle"),d(I,"class","ml-4 space-y-2"),d(ee,"class",Ut),d(me,"class",Nt),d(te,"class","text-lg"),d(ve,"class","cIconDivStyle"),d(z,"type","submit"),z.disabled=we=s[0].length==0,d(z,"class",Fe="cIconButtonStyle "+(s[0].length==0?"!bg-gray-500":"")),d(G,"class","cInputFormAndMessagePartStyle"),d(he,"class","ml-4"),d(se,"class","block text-center text-xl"),d(be,"class",We),d(ge,"class","rounded-2xl border-2"),d(q,"class",Ut+" md:ml-16 md:mr-16"),d(pe,"class",Nt),d(De,"class","text-lg"),d(Ie,"class","cInputFormAndMessagePartStyle mb-2"),d(ke,"class","ml-4"),d(n,"class","cContentPartStyle !min-w-[300px] !max-w-[750px]"),d(e,"class","cRouteBodyStyle")},m(p,C){S(p,e,C),c(e,t),c(e,r),c(e,n),c(n,I),c(I,i),c(i,k),K.m(k,null),c(i,a),c(i,f),c(f,o),c(o,D),Y(A,D,null),c(i,O),c(i,F),c(i,m),c(i,v),c(v,y),c(i,j),c(i,$),c($,M),c(M,T),Y(x,T,null),c(i,de),c(i,R),c(n,Me),c(n,me),c(me,ee);for(let g=0;g<B.length;g+=1)B[g]&&B[g].m(ee,null);c(n,Le),c(n,he),c(he,G),c(G,te),c(G,Oe),c(G,_e),c(_e,z),c(z,ve),Y(le,ve,null),c(n,He),c(n,pe),c(pe,q);for(let g=0;g<V.length;g+=1)V[g]&&V[g].m(q,null);c(q,Se),c(q,ge),c(ge,be),c(be,se),c(n,Re),c(n,ke),c(ke,Ie),c(Ie,De),c(De,Ne),J=!0,xe||(et=[Ae(f,"submit",ze(s[6])),Ae($,"submit",ze(s[7])),Ae(_e,"submit",ze(s[4]))],xe=!0)},p(p,[C]){if(Ue!==(Ue=tt(p))&&(K.d(1),K=Ue(p),K&&(K.c(),K.m(k,null))),(!J||C&1)&&E!==(E=p[0].length+"")&&Ve(y,E),C&38){re=Ce(p[2]);let g;for(g=0;g<re.length;g+=1){const Q=wt(p,re,g);B[g]?(B[g].p(Q,C),P(B[g],1)):(B[g]=Ft(Q),B[g].c(),P(B[g],1),B[g].m(ee,null))}for(ce(),g=re.length;g<B.length;g+=1)Ot(g);fe()}if((!J||C&1&&we!==(we=p[0].length==0))&&(z.disabled=we),(!J||C&1&&Fe!==(Fe="cIconButtonStyle "+(p[0].length==0?"!bg-gray-500":"")))&&d(z,"class",Fe),C&3){ne=Ce(p[0].length>=2?p[0].slice(-2):[...Array(2-p[0].length).fill(null),...p[0]]);let g;for(g=0;g<ne.length;g+=1){const Q=Vt(p,ne,g);V[g]?(V[g].p(Q,C),P(V[g],1)):(V[g]=St(Q),V[g].c(),P(V[g],1),V[g].m(q,Se))}for(ce(),g=ne.length;g<V.length;g+=1)Ht(g);fe()}(!J||C&8)&&Ve(Ne,p[3])},i(p){if(!J){P(A.$$.fragment,p),P(x.$$.fragment,p);for(let C=0;C<re.length;C+=1)P(B[C]);P(le.$$.fragment,p);for(let C=0;C<ne.length;C+=1)P(V[C]);J=!0}},o(p){w(A.$$.fragment,p),w(x.$$.fragment,p),B=B.filter(Boolean);for(let C=0;C<B.length;C+=1)w(B[C]);w(le.$$.fragment,p),V=V.filter(Boolean);for(let C=0;C<V.length;C+=1)w(V[C]);J=!1},d(p){p&&u(e),K.d(),Z(A),Z(x),Ke(B,p),Z(le),Ke(V,p),xe=!1,zt(et)}}}const qe=12,ul=4,Nt="min-h-[150px] md:min-w-[750px] border bg-white rounded-xl",Ut="flex flex-wrap justify-between gap-y-1 p-4",We="h-[100px] w-[100px] bg-gray-100 rounded-2xl";function il(s){return[{jaName:"dummy",imageUrl:"",isUsed:!0},...Object.entries(s).map(([,t])=>({jaName:t.jaName,imageUrl:t.imageUrl,isUsed:!1}))]}function Mt(s){return{ガ:"カ",ギ:"キ",グ:"ク",ゲ:"ケ",ゴ:"コ",ザ:"サ",ジ:"シ",ズ:"ス",ゼ:"セ",ゾ:"ソ",ダ:"タ",ヂ:"チ",ヅ:"ツ",デ:"テ",ド:"ト",バ:"ハ",ビ:"ヒ",ブ:"フ",ベ:"ヘ",ボ:"ホ",パ:"ハ",ピ:"ヒ",プ:"フ",ペ:"ヘ",ポ:"ホ",ァ:"ア",ィ:"イ",ゥ:"ウ",ェ:"エ",ォ:"オ",ャ:"ヤ",ュ:"ユ",ョ:"ヨ",ッ:"ツ"}[s]||s}function Lt(s){return Mt(s.slice(0,1))}function ye(s){let e=s.slice(-1);return["ー","♀","♂","２","Ｚ"].includes(e)&&s.length>1&&(e=s.slice(-2,-1)),Mt(e)}function cl(s){return Object.entries(s).reduce((e,[t,l])=>{const r=Lt(l.jaName);return e[r]||(e[r]=[]),e[r].push(Number(t)),e},{})}function $t(s){return s.filter(e=>!e.isUsed).map((e,t)=>Number(t))}function fl(s,e){const t=ye(s),l=Lt(e);return t===l}function dl(s,e,t){let l,r;qt(async()=>{const{STATIC_POKE_DICT:m}=await Rt(async()=>{const{STATIC_POKE_DICT:v}=await import("../chunks/staticPokeData.CNYJhbpJ.js");return{STATIC_POKE_DICT:v}},[],import.meta.url);t(1,l=il(m)),r=cl(m)});let n=[];function I(){const m=$t(l),v=yt(m,qe)[0];t(1,l[v].isUsed=!0,l),t(0,n=[...n,v])}function i(){const m=n.slice(-1)[0]??null;return m===null?(I(),a(),""):l[m].jaName}let k=[];function a(){const m=ye(i()),v=r[m]??[],E=$t(l),y=v.filter(T=>E.includes(T)),j=Et(y).slice(0,ul),$=new Set(j),M=yt(E.filter(T=>!$.has(T)),qe);t(2,k=Et([...j,...M]).slice(0,qe))}function f(m){const v=i(),E=l[m].jaName;if(!fl(v,E)){t(3,o=`「${ye(v??"")}」 から はじまる ポケモン を えらんでね`);return}t(1,l[m].isUsed=!0,l),t(0,n=[...n,m])}let o;function D(){const m=n.slice(-1)[0]??null;if(m===null){t(3,o="ポケモン を よびだしてね");return}const v=l[m].jaName,E=ye(v);if(E==="ン"){t(3,o="ン で おわっちゃった...");return}if(n.length==1)t(3,o=`はじめは 「${ye(E)}」`);else{const y=["そのちょうし！","いいぞ！","がんばれ！","すごい！","いけいけ！"];t(3,o=`${y[Kt(y.length)]} つぎは 「${ye(E)}」`)}}function A(){t(1,l=l.map(m=>({...m,isUsed:!1}))),t(0,n=[]),I(),a(),D()}const O=Tt();function F(){const v={type:"component",component:{ref:Zt,props:{title:"しりとりリスト",stringArray:n.map(E=>l[E].jaName)}},backdropClasses:"fixed inset-0 !bg-gray-300/90"};O.trigger(v)}const L=m=>f(m);return s.$$.update=()=>{s.$$.dirty&1&&n&&D()},[n,l,k,o,a,f,A,F,L]}class kl extends Je{constructor(e){super(),Qe(this,e,dl,ol,Ge,{})}}export{kl as component};
