import{s as Ge,e as h,t as ue,a as $,c as _,b as p,g as ie,d as o,f as U,h as m,j as w,k as c,l as Fe,n as oe,m as Pe,o as It,p as Te,q as Ae,u as Rt,w as qe,v as Ee,x as ze,r as zt}from"../chunks/scheduler.8mt35fBc.js";import{S as Ke,i as Je,g as ce,t as S,c as fe,a as B,b as W,d as X,m as Y,e as Z}from"../chunks/index.ySw2sHjO.js";import{e as Ce}from"../chunks/each.DP6o4sLe.js";import{g as Tt}from"../chunks/ProgressBar.svelte_svelte_type_style_lang.DIn6fv-b.js";import{I as Be,S as Dt}from"../chunks/staticPokeData.Do0twg6C.js";import{s as Et,p as yt,g as qt}from"../chunks/numerics.DYRi6Rfg.js";function Gt(r){let e,t,l;return t=new Be({props:{icon:"mdi:image-off-outline",class:"w-8 h-8 bg-white"}}),{c(){e=h("div"),W(t.$$.fragment),this.h()},l(s){e=_(s,"DIV",{class:!0});var n=p(e);X(t.$$.fragment,n),n.forEach(o),this.h()},h(){m(e,"class","absolute inset-0 flex items-center justify-center h-full")},m(s,n){w(s,e,n),Y(t,e,null),l=!0},p:oe,i(s){l||(B(t.$$.fragment,s),l=!0)},o(s){S(t.$$.fragment,s),l=!1},d(s){s&&o(e),Z(t)}}}function Kt(r){let e,t,l,s,n,I,i,k,a=!r[2]&&Ct();return{c(){e=h("img"),s=$(),a&&a.c(),n=Pe(),this.h()},l(d){e=_(d,"IMG",{src:!0,alt:!0,class:!0}),s=U(d),a&&a.l(d),n=Pe(),this.h()},h(){It(e.src,t=r[1])||m(e,"src",t),m(e,"alt",l=r[0]??"???"),m(e,"class","w-full h-full object-cover"),Te(e,"image",!r[2]),Te(e,"loaded",r[2])},m(d,u){w(d,e,u),w(d,s,u),a&&a.m(d,u),w(d,n,u),I=!0,i||(k=Ae(e,"load",r[3]),i=!0)},p(d,u){(!I||u&2&&!It(e.src,t=d[1]))&&m(e,"src",t),(!I||u&1&&l!==(l=d[0]??"???"))&&m(e,"alt",l),(!I||u&4)&&Te(e,"image",!d[2]),(!I||u&4)&&Te(e,"loaded",d[2]),d[2]?a&&(ce(),S(a,1,1,()=>{a=null}),fe()):a?u&4&&B(a,1):(a=Ct(),a.c(),B(a,1),a.m(n.parentNode,n))},i(d){I||(B(a),I=!0)},o(d){S(a),I=!1},d(d){d&&(o(e),o(s),o(n)),a&&a.d(d),i=!1,k()}}}function Ct(r){let e,t,l;return t=new Be({props:{icon:"mdi:progress-download",class:"w-full h-full text-white bg-gray-100 object-cover"}}),{c(){e=h("div"),W(t.$$.fragment),this.h()},l(s){e=_(s,"DIV",{class:!0});var n=p(e);X(t.$$.fragment,n),n.forEach(o),this.h()},h(){m(e,"class","absolute inset-0 flex items-center justify-center h-full")},m(s,n){w(s,e,n),Y(t,e,null),l=!0},i(s){l||(B(t.$$.fragment,s),l=!0)},o(s){S(t.$$.fragment,s),l=!1},d(s){s&&o(e),Z(t)}}}function Jt(r){let e,t,l,s,n,I=(r[0]??"???")+"",i,k,a,d,u,b,A;const O=[Kt,Gt],V=[];function M(E,f){return E[1]!==null?0:1}return u=M(r),b=V[u]=O[u](r),{c(){e=h("div"),t=h("div"),l=h("div"),s=h("h1"),n=h("div"),i=ue(I),k=$(),a=h("div"),d=h("div"),b.c(),this.h()},l(E){e=_(E,"DIV",{class:!0});var f=p(e);t=_(f,"DIV",{class:!0});var y=p(t);l=_(y,"DIV",{class:!0});var D=p(l);s=_(D,"H1",{class:!0});var j=p(s);n=_(j,"DIV",{});var N=p(n);i=ie(N,I),N.forEach(o),j.forEach(o),D.forEach(o),k=U(y),a=_(y,"DIV",{class:!0});var T=p(a);d=_(T,"DIV",{class:!0});var L=p(d);b.l(L),L.forEach(o),T.forEach(o),y.forEach(o),f.forEach(o),this.h()},h(){m(s,"class","text-xs font-bold text-gray-900"),m(l,"class","absolute inset-0 m-1 flex justify-center"),m(d,"class","flex items-center justify-center bg-white rounded-full border border-gray-200 h-[80px] w-[80px]"),m(a,"class","flex justify-center"),m(t,"class","relative p-2 bg-transparent"),m(e,"class","flex flex-col bg-gray-50 rounded-2xl shadow border h-[100px] w-[100px] overflow-hidden select-none")},m(E,f){w(E,e,f),c(e,t),c(t,l),c(l,s),c(s,n),c(n,i),c(t,k),c(t,a),c(a,d),V[u].m(d,null),A=!0},p(E,[f]){(!A||f&1)&&I!==(I=(E[0]??"???")+"")&&Fe(i,I);let y=u;u=M(E),u===y?V[u].p(E,f):(ce(),S(V[y],1,1,()=>{V[y]=null}),fe(),b=V[u],b?b.p(E,f):(b=V[u]=O[u](E),b.c()),B(b,1),b.m(d,null))},i(E){A||(B(b),A=!0)},o(E){S(b),A=!1},d(E){E&&o(e),V[u].d()}}}function Qt(r,e,t){let{name:l=null}=e,{imageUrl:s=null}=e,n=!1;function I(){t(2,n=!0)}return r.$$set=i=>{"name"in i&&t(0,l=i.name),"imageUrl"in i&&t(1,s=i.imageUrl)},r.$$.update=()=>{r.$$.dirty&2&&s&&t(2,n=!1)},[l,s,n,I]}class Mt extends Ke{constructor(e){super(),Je(this,e,Qt,Jt,Ge,{name:0,imageUrl:1})}}function At(r,e,t){const l=r.slice();return l[6]=e[t],l}function Bt(r){let e,t,l,s,n,I,i,k,a,d,u,b,A,O,V,M=Ce(r[1]),E=[];for(let f=0;f<M.length;f+=1)E[f]=Pt(At(r,M,f));return b=new Be({props:{icon:"mdi:close",class:"w-5 h-5"}}),{c(){e=h("div"),t=h("div"),l=h("div"),s=h("div"),n=h("h2"),I=ue(r[0]),i=$(),k=h("div"),a=h("ul");for(let f=0;f<E.length;f+=1)E[f].c();d=$(),u=h("button"),W(b.$$.fragment),this.h()},l(f){e=_(f,"DIV",{class:!0,"data-parent":!0});var y=p(e);t=_(y,"DIV",{class:!0});var D=p(t);l=_(D,"DIV",{class:!0});var j=p(l);s=_(j,"DIV",{class:!0});var N=p(s);n=_(N,"H2",{class:!0});var T=p(n);I=ie(T,r[0]),T.forEach(o),i=U(N),k=_(N,"DIV",{class:!0});var L=p(k);a=_(L,"UL",{class:!0});var H=p(a);for(let R=0;R<E.length;R+=1)E[R].l(H);H.forEach(o),L.forEach(o),N.forEach(o),j.forEach(o),d=U(D),u=_(D,"BUTTON",{class:!0});var de=p(u);X(b.$$.fragment,de),de.forEach(o),D.forEach(o),y.forEach(o),this.h()},h(){m(n,"class","text-2xl font-bold"),m(a,"class","mt-4 list-decimal list-inside"),m(k,"class","overflow-y-auto flex-grow"),m(s,"class","p-4 flex flex-col h-full"),m(l,"class","h-full h-full bg-white"),m(u,"class","absolute top-1 right-6 z-10"),m(t,"class","relative"),m(e,"class",""),m(e,"data-parent",r[2])},m(f,y){w(f,e,y),c(e,t),c(t,l),c(l,s),c(s,n),c(n,I),c(s,i),c(s,k),c(k,a);for(let D=0;D<E.length;D+=1)E[D]&&E[D].m(a,null);c(t,d),c(t,u),Y(b,u,null),A=!0,O||(V=Ae(u,"click",r[5]),O=!0)},p(f,y){if((!A||y&1)&&Fe(I,f[0]),y&2){M=Ce(f[1]);let D;for(D=0;D<M.length;D+=1){const j=At(f,M,D);E[D]?E[D].p(j,y):(E[D]=Pt(j),E[D].c(),E[D].m(a,null))}for(;D<E.length;D+=1)E[D].d(1);E.length=M.length}(!A||y&4)&&m(e,"data-parent",f[2])},i(f){A||(B(b.$$.fragment,f),A=!0)},o(f){S(b.$$.fragment,f),A=!1},d(f){f&&o(e),qe(E,f),Z(b),O=!1,V()}}}function Pt(r){let e,t=r[6]+"",l;return{c(){e=h("li"),l=ue(t)},l(s){e=_(s,"LI",{});var n=p(e);l=ie(n,t),n.forEach(o)},m(s,n){w(s,e,n),c(e,l)},p(s,n){n&2&&t!==(t=s[6]+"")&&Fe(l,t)},d(s){s&&o(e)}}}function Wt(r){let e,t,l=r[3][0]&&Bt(r);return{c(){l&&l.c(),e=Pe()},l(s){l&&l.l(s),e=Pe()},m(s,n){l&&l.m(s,n),w(s,e,n),t=!0},p(s,[n]){s[3][0]?l?(l.p(s,n),n&8&&B(l,1)):(l=Bt(s),l.c(),B(l,1),l.m(e.parentNode,e)):l&&(ce(),S(l,1,1,()=>{l=null}),fe())},i(s){t||(B(l),t=!0)},o(s){S(l),t=!1},d(s){s&&o(e),l&&l.d(s)}}}function Xt(r,e,t){let l,{title:s}=e,{stringArray:n=[]}=e,{parent:I}=e;const i=Tt();Rt(r,i,a=>t(3,l=a));function k(){i.close()}return r.$$set=a=>{"title"in a&&t(0,s=a.title),"stringArray"in a&&t(1,n=a.stringArray),"parent"in a&&t(2,I=a.parent)},[s,n,I,l,i,k]}class Yt extends Ke{constructor(e){super(),Je(this,e,Xt,Wt,Ge,{title:0,stringArray:1,parent:2})}}function Ft(r,e,t){const l=r.slice();return l[15]=e[t],l[17]=t,l}function St(r,e,t){const l=r.slice();return l[15]=e[t],l}function Zt(r){let e;return{c(){e=ue("しりとり リセット")},l(t){e=ie(t,"しりとり リセット")},m(t,l){w(t,e,l)},d(t){t&&o(e)}}}function el(r){let e;return{c(){e=ue("しりとり スタート")},l(t){e=ie(t,"しりとり スタート")},m(t,l){w(t,e,l)},d(t){t&&o(e)}}}function tl(r){let e;return{c(){e=h("div"),this.h()},l(t){e=_(t,"DIV",{class:!0}),p(e).forEach(o),this.h()},h(){m(e,"class",Qe)},m(t,l){w(t,e,l)},p:oe,i:oe,o:oe,d(t){t&&o(e)}}}function ll(r){let e,t,l,s,n;t=new Mt({props:{name:r[1][r[15]].jaName,imageUrl:r[1][r[15]].imageUrl}});function I(){return r[8](r[15])}return{c(){e=h("button"),W(t.$$.fragment),this.h()},l(i){e=_(i,"BUTTON",{type:!0});var k=p(e);X(t.$$.fragment,k),k.forEach(o),this.h()},h(){m(e,"type","button")},m(i,k){w(i,e,k),Y(t,e,null),l=!0,s||(n=Ae(e,"click",I),s=!0)},p(i,k){r=i;const a={};k&6&&(a.name=r[1][r[15]].jaName),k&6&&(a.imageUrl=r[1][r[15]].imageUrl),t.$set(a)},i(i){l||(B(t.$$.fragment,i),l=!0)},o(i){S(t.$$.fragment,i),l=!1},d(i){i&&o(e),Z(t),s=!1,n()}}}function Vt(r){let e,t,l,s,n;const I=[ll,tl],i=[];function k(a,d){return a[1][a[15]].isUsed?1:0}return t=k(r),l=i[t]=I[t](r),{c(){e=h("div"),l.c(),s=$(),this.h()},l(a){e=_(a,"DIV",{class:!0});var d=p(e);l.l(d),s=U(d),d.forEach(o),this.h()},h(){m(e,"class","rounded-2xl border-2")},m(a,d){w(a,e,d),i[t].m(e,null),c(e,s),n=!0},p(a,d){let u=t;t=k(a),t===u?i[t].p(a,d):(ce(),S(i[u],1,1,()=>{i[u]=null}),fe(),l=i[t],l?l.p(a,d):(l=i[t]=I[t](a),l.c()),B(l,1),l.m(e,s))},i(a){n||(B(l),n=!0)},o(a){S(l),n=!1},d(a){a&&o(e),i[t].d()}}}function sl(r){let e;return{c(){e=h("div"),this.h()},l(t){e=_(t,"DIV",{class:!0}),p(e).forEach(o),this.h()},h(){m(e,"class",Qe)},m(t,l){w(t,e,l)},p:oe,i:oe,o:oe,d(t){t&&o(e)}}}function rl(r){let e,t;return e=new Mt({props:{name:r[1][r[15]].jaName,imageUrl:r[1][r[15]].imageUrl}}),{c(){W(e.$$.fragment)},l(l){X(e.$$.fragment,l)},m(l,s){Y(e,l,s),t=!0},p(l,s){const n={};s&3&&(n.name=l[1][l[15]].jaName),s&3&&(n.imageUrl=l[1][l[15]].imageUrl),e.$set(n)},i(l){t||(B(e.$$.fragment,l),t=!0)},o(l){S(e.$$.fragment,l),t=!1},d(l){Z(e,l)}}}function nl(r){let e,t="→";return{c(){e=h("span"),e.textContent=t},l(l){e=_(l,"SPAN",{"data-svelte-h":!0}),Ee(e)!=="svelte-1xb5tc"&&(e.textContent=t)},m(l,s){w(l,e,s)},d(l){l&&o(e)}}}function wt(r){let e,t,l,s,n,I;const i=[rl,sl],k=[];function a(u,b){return u[15]?0:1}t=a(r),l=k[t]=i[t](r);let d=r[17]<2&&nl();return{c(){e=h("div"),l.c(),s=$(),d&&d.c(),n=Pe(),this.h()},l(u){e=_(u,"DIV",{class:!0});var b=p(e);l.l(b),b.forEach(o),s=U(u),d&&d.l(u),n=Pe(),this.h()},h(){m(e,"class","rounded-2xl border-2")},m(u,b){w(u,e,b),k[t].m(e,null),w(u,s,b),d&&d.m(u,b),w(u,n,b),I=!0},p(u,b){let A=t;t=a(u),t===A?k[t].p(u,b):(ce(),S(k[A],1,1,()=>{k[A]=null}),fe(),l=k[t],l?l.p(u,b):(l=k[t]=i[t](u),l.c()),B(l,1),l.m(e,null))},i(u){I||(B(l),I=!0)},o(u){S(l),I=!1},d(u){u&&(o(e),o(s),o(n)),k[t].d(),d&&d.d(u)}}}function al(r){let e,t,l='<h1 class="cTitleStyle">ポケモンしりとり</h1>',s,n,I,i,k,a,d,u,b,A,O,V,M="",E,f,y=r[0].length+"",D,j,N,T,L,H,de,R,We="",Me,me,ee,Le,he,K,te,Xe="ポケモン を いれかえる",He,_e,z,ve,le,Se,Ve,Oe,ge,q,we,pe,be,se,Ye="？",xe,ke,Ie,De,Ne,J,Re,Ze;function et(v,C){return v[2].length===0?el:Zt}let $e=et(r),G=$e(r);A=new Be({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),H=new Be({props:{icon:"mdi:format-list-numbered",class:"cIconStyle"}});let re=Ce(r[2]),P=[];for(let v=0;v<re.length;v+=1)P[v]=Vt(St(r,re,v));const Ot=v=>S(P[v],1,1,()=>{P[v]=null});le=new Be({props:{icon:"mdi:pokeball",class:"cIconStyle"}});let ne=Ce(r[0].length>=2?r[0].slice(-2):[...Array(2-r[0].length).fill(null),...r[0]]),F=[];for(let v=0;v<ne.length;v+=1)F[v]=wt(Ft(r,ne,v));const xt=v=>S(F[v],1,1,()=>{F[v]=null});return{c(){e=h("div"),t=h("div"),t.innerHTML=l,s=$(),n=h("div"),I=h("div"),i=h("div"),k=h("span"),G.c(),a=$(),d=h("form"),u=h("button"),b=h("div"),W(A.$$.fragment),O=$(),V=h("div"),V.innerHTML=M,E=$(),f=h("p"),D=ue(y),j=$(),N=h("form"),T=h("button"),L=h("div"),W(H.$$.fragment),de=$(),R=h("div"),R.innerHTML=We,Me=$(),me=h("div"),ee=h("div");for(let v=0;v<P.length;v+=1)P[v].c();Le=$(),he=h("div"),K=h("div"),te=h("span"),te.textContent=Xe,He=$(),_e=h("form"),z=h("button"),ve=h("div"),W(le.$$.fragment),Oe=$(),ge=h("div"),q=h("div");for(let v=0;v<F.length;v+=1)F[v].c();we=$(),pe=h("div"),be=h("div"),se=h("span"),se.textContent=Ye,xe=$(),ke=h("div"),Ie=h("div"),De=h("span"),Ne=ue(r[3]),this.h()},l(v){e=_(v,"DIV",{class:!0});var C=p(e);t=_(C,"DIV",{class:!0,"data-svelte-h":!0}),Ee(t)!=="svelte-n7rgko"&&(t.innerHTML=l),s=U(C),n=_(C,"DIV",{class:!0});var g=p(n);I=_(g,"DIV",{class:!0});var Q=p(I);i=_(Q,"DIV",{class:!0});var x=p(i);k=_(x,"SPAN",{class:!0});var tt=p(k);G.l(tt),tt.forEach(o),a=U(x),d=_(x,"FORM",{});var lt=p(d);u=_(lt,"BUTTON",{type:!0,class:!0});var st=p(u);b=_(st,"DIV",{class:!0});var rt=p(b);X(A.$$.fragment,rt),rt.forEach(o),st.forEach(o),lt.forEach(o),O=U(x),V=_(x,"DIV",{class:!0,"data-svelte-h":!0}),Ee(V)!=="svelte-1rtwic7"&&(V.innerHTML=M),E=U(x),f=_(x,"P",{class:!0});var nt=p(f);D=ie(nt,y),nt.forEach(o),j=U(x),N=_(x,"FORM",{});var at=p(N);T=_(at,"BUTTON",{type:!0,class:!0});var ot=p(T);L=_(ot,"DIV",{class:!0});var ut=p(L);X(H.$$.fragment,ut),ut.forEach(o),ot.forEach(o),at.forEach(o),de=U(x),R=_(x,"DIV",{class:!0,"data-svelte-h":!0}),Ee(R)!=="svelte-17db9va"&&(R.innerHTML=We),x.forEach(o),Q.forEach(o),Me=U(g),me=_(g,"DIV",{class:!0});var it=p(me);ee=_(it,"DIV",{class:!0});var ct=p(ee);for(let ae=0;ae<P.length;ae+=1)P[ae].l(ct);ct.forEach(o),it.forEach(o),Le=U(g),he=_(g,"DIV",{class:!0});var ft=p(he);K=_(ft,"DIV",{class:!0});var Ue=p(K);te=_(Ue,"SPAN",{class:!0,"data-svelte-h":!0}),Ee(te)!=="svelte-1ysiuuh"&&(te.textContent=Xe),He=U(Ue),_e=_(Ue,"FORM",{});var dt=p(_e);z=_(dt,"BUTTON",{type:!0,class:!0});var mt=p(z);ve=_(mt,"DIV",{class:!0});var ht=p(ve);X(le.$$.fragment,ht),ht.forEach(o),mt.forEach(o),dt.forEach(o),Ue.forEach(o),ft.forEach(o),Oe=U(g),ge=_(g,"DIV",{class:!0});var _t=p(ge);q=_(_t,"DIV",{class:!0});var je=p(q);for(let ae=0;ae<F.length;ae+=1)F[ae].l(je);we=U(je),pe=_(je,"DIV",{class:!0});var vt=p(pe);be=_(vt,"DIV",{class:!0});var gt=p(be);se=_(gt,"SPAN",{class:!0,"data-svelte-h":!0}),Ee(se)!=="svelte-mds9k2"&&(se.textContent=Ye),gt.forEach(o),vt.forEach(o),je.forEach(o),_t.forEach(o),xe=U(g),ke=_(g,"DIV",{class:!0});var pt=p(ke);Ie=_(pt,"DIV",{class:!0});var bt=p(Ie);De=_(bt,"SPAN",{class:!0});var kt=p(De);Ne=ie(kt,r[3]),kt.forEach(o),bt.forEach(o),pt.forEach(o),g.forEach(o),C.forEach(o),this.h()},h(){m(t,"class","cTitlePartStyle"),m(k,"class","text-lg"),m(b,"class","cIconDivStyle"),m(u,"type","submit"),m(u,"class","cIconButtonStyle"),m(V,"class","flex-grow"),m(f,"class","text-lg"),m(L,"class","cIconDivStyle"),m(T,"type","submit"),m(T,"class","cIconButtonStyle"),m(R,"class","mr-4"),m(i,"class","cInputFormAndMessagePartStyle"),m(I,"class","ml-4 space-y-2"),m(ee,"class",Ut),m(me,"class",$t),m(te,"class","text-lg"),m(ve,"class","cIconDivStyle"),m(z,"type","submit"),z.disabled=Se=r[0].length==0,m(z,"class",Ve="cIconButtonStyle "+(r[0].length==0?"!bg-gray-500":"")),m(K,"class","cInputFormAndMessagePartStyle"),m(he,"class","ml-4"),m(se,"class","block text-center text-xl"),m(be,"class",Qe),m(pe,"class","rounded-2xl border-2"),m(q,"class",Ut+" md:ml-16 md:mr-16"),m(ge,"class",$t),m(De,"class","text-lg"),m(Ie,"class","cInputFormAndMessagePartStyle mb-2"),m(ke,"class","ml-4"),m(n,"class","cContentPartStyle !min-w-[300px] !max-w-[750px]"),m(e,"class","cRouteBodyStyle")},m(v,C){w(v,e,C),c(e,t),c(e,s),c(e,n),c(n,I),c(I,i),c(i,k),G.m(k,null),c(i,a),c(i,d),c(d,u),c(u,b),Y(A,b,null),c(i,O),c(i,V),c(i,E),c(i,f),c(f,D),c(i,j),c(i,N),c(N,T),c(T,L),Y(H,L,null),c(i,de),c(i,R),c(n,Me),c(n,me),c(me,ee);for(let g=0;g<P.length;g+=1)P[g]&&P[g].m(ee,null);c(n,Le),c(n,he),c(he,K),c(K,te),c(K,He),c(K,_e),c(_e,z),c(z,ve),Y(le,ve,null),c(n,Oe),c(n,ge),c(ge,q);for(let g=0;g<F.length;g+=1)F[g]&&F[g].m(q,null);c(q,we),c(q,pe),c(pe,be),c(be,se),c(n,xe),c(n,ke),c(ke,Ie),c(Ie,De),c(De,Ne),J=!0,Re||(Ze=[Ae(d,"submit",ze(r[6])),Ae(N,"submit",ze(r[7])),Ae(_e,"submit",ze(r[4]))],Re=!0)},p(v,[C]){if($e!==($e=et(v))&&(G.d(1),G=$e(v),G&&(G.c(),G.m(k,null))),(!J||C&1)&&y!==(y=v[0].length+"")&&Fe(D,y),C&38){re=Ce(v[2]);let g;for(g=0;g<re.length;g+=1){const Q=St(v,re,g);P[g]?(P[g].p(Q,C),B(P[g],1)):(P[g]=Vt(Q),P[g].c(),B(P[g],1),P[g].m(ee,null))}for(ce(),g=re.length;g<P.length;g+=1)Ot(g);fe()}if((!J||C&1&&Se!==(Se=v[0].length==0))&&(z.disabled=Se),(!J||C&1&&Ve!==(Ve="cIconButtonStyle "+(v[0].length==0?"!bg-gray-500":"")))&&m(z,"class",Ve),C&3){ne=Ce(v[0].length>=2?v[0].slice(-2):[...Array(2-v[0].length).fill(null),...v[0]]);let g;for(g=0;g<ne.length;g+=1){const Q=Ft(v,ne,g);F[g]?(F[g].p(Q,C),B(F[g],1)):(F[g]=wt(Q),F[g].c(),B(F[g],1),F[g].m(q,we))}for(ce(),g=ne.length;g<F.length;g+=1)xt(g);fe()}(!J||C&8)&&Fe(Ne,v[3])},i(v){if(!J){B(A.$$.fragment,v),B(H.$$.fragment,v);for(let C=0;C<re.length;C+=1)B(P[C]);B(le.$$.fragment,v);for(let C=0;C<ne.length;C+=1)B(F[C]);J=!0}},o(v){S(A.$$.fragment,v),S(H.$$.fragment,v),P=P.filter(Boolean);for(let C=0;C<P.length;C+=1)S(P[C]);S(le.$$.fragment,v),F=F.filter(Boolean);for(let C=0;C<F.length;C+=1)S(F[C]);J=!1},d(v){v&&o(e),G.d(),Z(A),Z(H),qe(P,v),Z(le),qe(F,v),Re=!1,zt(Ze)}}}const Nt=12,ol=4,$t="min-h-[150px] md:min-w-[750px] border bg-white rounded-xl",Ut="flex flex-wrap justify-between gap-y-1 p-4",Qe="h-[100px] w-[100px] bg-gray-100 rounded-2xl";function Lt(r){return{ガ:"カ",ギ:"キ",グ:"ク",ゲ:"ケ",ゴ:"コ",ザ:"サ",ジ:"シ",ズ:"ス",ゼ:"セ",ゾ:"ソ",ダ:"タ",ヂ:"チ",ヅ:"ツ",デ:"テ",ド:"ト",バ:"ハ",ビ:"ヒ",ブ:"フ",ベ:"ヘ",ボ:"ホ",パ:"ハ",ピ:"ヒ",プ:"フ",ペ:"ヘ",ポ:"ホ",ァ:"ア",ィ:"イ",ゥ:"ウ",ェ:"エ",ォ:"オ",ャ:"ヤ",ュ:"ユ",ョ:"ヨ",ッ:"ツ"}[r]||r}function Ht(r){return Lt(r.slice(0,1))}function ye(r){let e=r.slice(-1);return["ー","♀","♂","２","Ｚ"].includes(e)&&r.length>1&&(e=r.slice(-2,-1)),Lt(e)}function ul(r){return Object.entries(r).reduce((e,[t,l])=>{const s=Ht(l.jaName);return e[s]||(e[s]=[]),e[s].push(Number(t)),e},{})}function jt(r){return r.filter(e=>!e.isUsed).map((e,t)=>Number(t))}function il(r,e){const t=ye(r),l=Ht(e);return t===l}function cl(r,e,t){let s=[{jaName:"dummy",imageUrl:"",isUsed:!0},...Object.entries(Dt).map(([,f])=>({jaName:f.jaName,imageUrl:f.imageUrl,isUsed:!1}))],n=[];function I(){const f=jt(s),y=yt(f,Nt)[0];t(1,s[y].isUsed=!0,s),t(0,n=[...n,y])}function i(){const f=n.slice(-1)[0]??null;return f===null?(I(),d(),""):s[f].jaName}const k=ul(Dt);let a=[];function d(){const f=ye(i()),y=k[f]??[],D=jt(s),j=y.filter(H=>D.includes(H)),N=Et(j).slice(0,ol),T=new Set(N),L=yt(D.filter(H=>!T.has(H)),Nt-N.length);t(2,a=Et([...N,...L]))}function u(f){const y=i(),D=s[f].jaName;if(!il(y,D)){t(3,b=`「${ye(y??"")}」 から はじまる ポケモン を えらんでね`);return}t(1,s[f].isUsed=!0,s),t(0,n=[...n,f])}let b;function A(){const f=n.slice(-1)[0]??null;if(f===null){t(3,b="ポケモン を よびだしてね");return}const y=s[f].jaName,D=ye(y);if(D==="ン"){t(3,b="ン で おわっちゃった...");return}if(n.length==1)t(3,b=`はじめは 「${ye(D)}」`);else{const j=["そのちょうし！","いいぞ！","がんばれ！","すごい！","いけいけ！"];t(3,b=`${j[qt(j.length)]} つぎは 「${ye(D)}」`)}}function O(){t(1,s=s.map(f=>({...f,isUsed:!1}))),t(0,n=[]),I(),d(),A()}const V=Tt();function M(){const y={type:"component",component:{ref:Yt,props:{title:"しりとりリスト",stringArray:n.map(D=>s[D].jaName)}},backdropClasses:"fixed inset-0 !bg-gray-300/90"};V.trigger(y)}const E=f=>u(f);return r.$$.update=()=>{r.$$.dirty&1&&n&&A()},[n,s,a,b,d,u,O,M,E]}class gl extends Ke{constructor(e){super(),Je(this,e,cl,al,Ge,{})}}export{gl as component};
