import{c as Dt,g as Lt}from"../chunks/numerics.CCjFTfwg.js";import{P as Rt,F as zt}from"../chunks/common.3e1mQu3z.js";import{a as Je,e as m,t as ue,b as $,c as _,d as k,i as fe,f as i,h as A,j as h,l as U,m as d,n as je,o as ce,p as Ve,q as It,r as Me,u as Se,x as Kt,z as Ge,y as Ee,A as Ke,v as qt}from"../chunks/scheduler.D16oZ6cK.js";import{S as Qe,i as We,g as de,t as j,c as he,a as S,b as Y,d as Z,m as ee,e as te}from"../chunks/index.BWx_jO9Z.js";import{e as Ce}from"../chunks/each.CeXzaOas.js";import{g as Bt}from"../chunks/stores.ByDtNtuw.js";import"../chunks/ProgressBar.svelte_svelte_type_style_lang.DonsRzKP.js";import{I as we}from"../chunks/Icon.HXW41lnT.js";import{a as Gt}from"../chunks/generation.C4JV6S5l.js";import{b as Et,s as Jt,c as Qt}from"../chunks/collections.B80cy0Im.js";function Ot(r){return{ガ:"カ",ギ:"キ",グ:"ク",ゲ:"ケ",ゴ:"コ",ザ:"サ",ジ:"シ",ズ:"ス",ゼ:"セ",ゾ:"ソ",ダ:"タ",ヂ:"チ",ヅ:"ツ",デ:"テ",ド:"ト",バ:"ハ",ビ:"ヒ",ブ:"フ",ベ:"ヘ",ボ:"ホ",パ:"ハ",ピ:"ヒ",プ:"フ",ペ:"ヘ",ポ:"ホ",ァ:"ア",ィ:"イ",ゥ:"ウ",ェ:"エ",ォ:"オ",ャ:"ヤ",ュ:"ユ",ョ:"ヨ",ッ:"ツ"}[r]||r}function Tt(r){return Ot(r.slice(0,1))}function Pe(r){let e=r.slice(-1);return["ー","♀","♂","２","Ｚ"].includes(e)&&r.length>1&&(e=r.slice(-2,-1)),Ot(e)}function Wt(r,e){const t=Pe(r),l=Tt(e);return t===l}async function Xt({fetch:r}){await Dt(r,"load to cache");const e=await l(),t=s(e);async function l(){const a=Array.from({length:Rt},(n,u)=>zt+u),p={},o=a.map(async n=>{const u=await Dt(r,n.toString());return{pokeId:n,jaName:u.jaName,imageUrl:u.imageUrl??"not_found",isUsed:!1}});return(await Promise.all(o)).forEach(n=>{p[n.pokeId]=n}),p}function s(a){return Object.entries(a).reduce((p,[o,b])=>{const n=Tt(b.jaName);return p[n]||(p[n]=[]),p[n].push(Number(o)),p},{})}return{pokeDict:e,groupByHeadCharDict:t}}const Pl=Object.freeze(Object.defineProperty({__proto__:null,load:Xt},Symbol.toStringTag,{value:"Module"}));function Yt(r){let e,t,l;return t=new we({props:{icon:"mdi:image-off-outline",class:"w-8 h-8 bg-white"}}),{c(){e=m("div"),Y(t.$$.fragment),this.h()},l(s){e=_(s,"DIV",{class:!0});var a=k(e);Z(t.$$.fragment,a),a.forEach(i),this.h()},h(){h(e,"class","absolute inset-0 flex items-center justify-center h-full")},m(s,a){U(s,e,a),ee(t,e,null),l=!0},p:ce,i(s){l||(S(t.$$.fragment,s),l=!0)},o(s){j(t.$$.fragment,s),l=!1},d(s){s&&i(e),te(t)}}}function Zt(r){let e,t,l,s,a,p,o,b,n=!r[2]&&Pt();return{c(){e=m("img"),s=$(),n&&n.c(),a=Ve(),this.h()},l(u){e=_(u,"IMG",{src:!0,alt:!0,class:!0}),s=A(u),n&&n.l(u),a=Ve(),this.h()},h(){It(e.src,t=r[1])||h(e,"src",t),h(e,"alt",l=r[0]??"???"),h(e,"class","w-full h-full object-cover"),Me(e,"image",!r[2]),Me(e,"loaded",r[2])},m(u,c){U(u,e,c),U(u,s,c),n&&n.m(u,c),U(u,a,c),p=!0,o||(b=Se(e,"load",r[3]),o=!0)},p(u,c){(!p||c&2&&!It(e.src,t=u[1]))&&h(e,"src",t),(!p||c&1&&l!==(l=u[0]??"???"))&&h(e,"alt",l),(!p||c&4)&&Me(e,"image",!u[2]),(!p||c&4)&&Me(e,"loaded",u[2]),u[2]?n&&(de(),j(n,1,1,()=>{n=null}),he()):n?c&4&&S(n,1):(n=Pt(),n.c(),S(n,1),n.m(a.parentNode,a))},i(u){p||(S(n),p=!0)},o(u){j(n),p=!1},d(u){u&&(i(e),i(s),i(a)),n&&n.d(u),o=!1,b()}}}function Pt(r){let e,t,l;return t=new we({props:{icon:"mdi:progress-download",class:"w-full h-full text-white bg-gray-100 object-cover"}}),{c(){e=m("div"),Y(t.$$.fragment),this.h()},l(s){e=_(s,"DIV",{class:!0});var a=k(e);Z(t.$$.fragment,a),a.forEach(i),this.h()},h(){h(e,"class","absolute inset-0 flex items-center justify-center h-full")},m(s,a){U(s,e,a),ee(t,e,null),l=!0},i(s){l||(S(t.$$.fragment,s),l=!0)},o(s){j(t.$$.fragment,s),l=!1},d(s){s&&i(e),te(t)}}}function el(r){let e,t,l,s,a,p=(r[0]??"???")+"",o,b,n,u,c,y,C;const L=[Zt,Yt],F=[];function M(E,f){return E[1]!==null?0:1}return c=M(r),y=F[c]=L[c](r),{c(){e=m("div"),t=m("div"),l=m("div"),s=m("h1"),a=m("div"),o=ue(p),b=$(),n=m("div"),u=m("div"),y.c(),this.h()},l(E){e=_(E,"DIV",{class:!0});var f=k(e);t=_(f,"DIV",{class:!0});var I=k(t);l=_(I,"DIV",{class:!0});var D=k(l);s=_(D,"H1",{class:!0});var N=k(s);a=_(N,"DIV",{});var B=k(a);o=fe(B,p),B.forEach(i),N.forEach(i),D.forEach(i),b=A(I),n=_(I,"DIV",{class:!0});var O=k(n);u=_(O,"DIV",{class:!0});var x=k(u);y.l(x),x.forEach(i),O.forEach(i),I.forEach(i),f.forEach(i),this.h()},h(){h(s,"class","text-xs font-bold text-gray-900"),h(l,"class","absolute inset-0 m-1 flex justify-center"),h(u,"class","flex items-center justify-center bg-white rounded-full border border-gray-200 h-[80px] w-[80px]"),h(n,"class","flex justify-center"),h(t,"class","relative p-2 bg-transparent"),h(e,"class","flex flex-col bg-gray-50 rounded-2xl shadow border h-[100px] w-[100px] overflow-hidden select-none")},m(E,f){U(E,e,f),d(e,t),d(t,l),d(l,s),d(s,a),d(a,o),d(t,b),d(t,n),d(n,u),F[c].m(u,null),C=!0},p(E,[f]){(!C||f&1)&&p!==(p=(E[0]??"???")+"")&&je(o,p);let I=c;c=M(E),c===I?F[c].p(E,f):(de(),j(F[I],1,1,()=>{F[I]=null}),he(),y=F[c],y?y.p(E,f):(y=F[c]=L[c](E),y.c()),S(y,1),y.m(u,null))},i(E){C||(S(y),C=!0)},o(E){j(y),C=!1},d(E){E&&i(e),F[c].d()}}}function tl(r,e,t){let{name:l=null}=e,{imageUrl:s=null}=e,a=!1;function p(){t(2,a=!0)}return r.$$set=o=>{"name"in o&&t(0,l=o.name),"imageUrl"in o&&t(1,s=o.imageUrl)},r.$$.update=()=>{r.$$.dirty&2&&s&&t(2,a=!1)},[l,s,a,p]}class Mt extends Qe{constructor(e){super(),We(this,e,tl,el,Je,{name:0,imageUrl:1})}}function Ct(r,e,t){const l=r.slice();return l[6]=e[t],l}function St(r){let e,t,l,s,a,p,o,b,n,u,c,y,C,L,F,M=Ce(r[1]),E=[];for(let f=0;f<M.length;f+=1)E[f]=wt(Ct(r,M,f));return y=new we({props:{icon:"mdi:close",class:"w-5 h-5"}}),{c(){e=m("div"),t=m("div"),l=m("div"),s=m("div"),a=m("h2"),p=ue(r[0]),o=$(),b=m("div"),n=m("ul");for(let f=0;f<E.length;f+=1)E[f].c();u=$(),c=m("button"),Y(y.$$.fragment),this.h()},l(f){e=_(f,"DIV",{class:!0,"data-parent":!0});var I=k(e);t=_(I,"DIV",{class:!0});var D=k(t);l=_(D,"DIV",{class:!0});var N=k(l);s=_(N,"DIV",{class:!0});var B=k(s);a=_(B,"H2",{class:!0});var O=k(a);p=fe(O,r[0]),O.forEach(i),o=A(B),b=_(B,"DIV",{class:!0});var x=k(b);n=_(x,"UL",{class:!0});var T=k(n);for(let H=0;H<E.length;H+=1)E[H].l(T);T.forEach(i),x.forEach(i),B.forEach(i),N.forEach(i),u=A(D),c=_(D,"BUTTON",{class:!0});var z=k(c);Z(y.$$.fragment,z),z.forEach(i),D.forEach(i),I.forEach(i),this.h()},h(){h(a,"class","text-2xl font-bold"),h(n,"class","mt-4 list-decimal list-inside"),h(b,"class","overflow-y-auto flex-grow"),h(s,"class","p-4 flex flex-col h-full"),h(l,"class","h-full h-full bg-white"),h(c,"class","absolute top-1 right-6 z-10"),h(t,"class","relative"),h(e,"class",""),h(e,"data-parent",r[2])},m(f,I){U(f,e,I),d(e,t),d(t,l),d(l,s),d(s,a),d(a,p),d(s,o),d(s,b),d(b,n);for(let D=0;D<E.length;D+=1)E[D]&&E[D].m(n,null);d(t,u),d(t,c),ee(y,c,null),C=!0,L||(F=Se(c,"click",r[5]),L=!0)},p(f,I){if((!C||I&1)&&je(p,f[0]),I&2){M=Ce(f[1]);let D;for(D=0;D<M.length;D+=1){const N=Ct(f,M,D);E[D]?E[D].p(N,I):(E[D]=wt(N),E[D].c(),E[D].m(n,null))}for(;D<E.length;D+=1)E[D].d(1);E.length=M.length}(!C||I&4)&&h(e,"data-parent",f[2])},i(f){C||(S(y.$$.fragment,f),C=!0)},o(f){j(y.$$.fragment,f),C=!1},d(f){f&&i(e),Ge(E,f),te(y),L=!1,F()}}}function wt(r){let e,t=r[6]+"",l;return{c(){e=m("li"),l=ue(t)},l(s){e=_(s,"LI",{});var a=k(e);l=fe(a,t),a.forEach(i)},m(s,a){U(s,e,a),d(e,l)},p(s,a){a&2&&t!==(t=s[6]+"")&&je(l,t)},d(s){s&&i(e)}}}function ll(r){let e,t,l=r[3][0]&&St(r);return{c(){l&&l.c(),e=Ve()},l(s){l&&l.l(s),e=Ve()},m(s,a){l&&l.m(s,a),U(s,e,a),t=!0},p(s,[a]){s[3][0]?l?(l.p(s,a),a&8&&S(l,1)):(l=St(s),l.c(),S(l,1),l.m(e.parentNode,e)):l&&(de(),j(l,1,1,()=>{l=null}),he())},i(s){t||(S(l),t=!0)},o(s){j(l),t=!1},d(s){s&&i(e),l&&l.d(s)}}}function sl(r,e,t){let l,{title:s}=e,{stringArray:a=[]}=e,{parent:p}=e;const o=Bt();Kt(r,o,n=>t(3,l=n));function b(){o.close()}return r.$$set=n=>{"title"in n&&t(0,s=n.title),"stringArray"in n&&t(1,a=n.stringArray),"parent"in n&&t(2,p=n.parent)},[s,a,p,l,o,b]}class rl extends Qe{constructor(e){super(),We(this,e,sl,ll,Je,{title:0,stringArray:1,parent:2})}}function Vt(r,e,t){const l=r.slice();return l[15]=e[t],l[17]=t,l}function jt(r,e,t){const l=r.slice();return l[15]=e[t],l}function nl(r){let e;return{c(){e=ue("しりとり リセット")},l(t){e=fe(t,"しりとり リセット")},m(t,l){U(t,e,l)},d(t){t&&i(e)}}}function al(r){let e;return{c(){e=ue("しりとり スタート")},l(t){e=fe(t,"しりとり スタート")},m(t,l){U(t,e,l)},d(t){t&&i(e)}}}function ol(r){let e;return{c(){e=m("div"),this.h()},l(t){e=_(t,"DIV",{class:!0}),k(e).forEach(i),this.h()},h(){h(e,"class",Xe)},m(t,l){U(t,e,l)},p:ce,i:ce,o:ce,d(t){t&&i(e)}}}function il(r){let e,t,l,s,a;t=new Mt({props:{name:r[15].jaName,imageUrl:r[15].imageUrl}});function p(){return r[8](r[15])}return{c(){e=m("button"),Y(t.$$.fragment),this.h()},l(o){e=_(o,"BUTTON",{type:!0});var b=k(e);Z(t.$$.fragment,b),b.forEach(i),this.h()},h(){h(e,"type","button")},m(o,b){U(o,e,b),ee(t,e,null),l=!0,s||(a=Se(e,"click",p),s=!0)},p(o,b){r=o;const n={};b&2&&(n.name=r[15].jaName),b&2&&(n.imageUrl=r[15].imageUrl),t.$set(n)},i(o){l||(S(t.$$.fragment,o),l=!0)},o(o){j(t.$$.fragment,o),l=!1},d(o){o&&i(e),te(t),s=!1,a()}}}function Ft(r){let e,t,l,s,a;const p=[il,ol],o=[];function b(n,u){return n[15].isUsed?1:0}return t=b(r),l=o[t]=p[t](r),{c(){e=m("div"),l.c(),s=$(),this.h()},l(n){e=_(n,"DIV",{class:!0});var u=k(e);l.l(u),s=A(u),u.forEach(i),this.h()},h(){h(e,"class","rounded-2xl border-2")},m(n,u){U(n,e,u),o[t].m(e,null),d(e,s),a=!0},p(n,u){let c=t;t=b(n),t===c?o[t].p(n,u):(de(),j(o[c],1,1,()=>{o[c]=null}),he(),l=o[t],l?l.p(n,u):(l=o[t]=p[t](n),l.c()),S(l,1),l.m(e,s))},i(n){a||(S(l),a=!0)},o(n){j(l),a=!1},d(n){n&&i(e),o[t].d()}}}function cl(r){let e;return{c(){e=m("div"),this.h()},l(t){e=_(t,"DIV",{class:!0}),k(e).forEach(i),this.h()},h(){h(e,"class",Xe)},m(t,l){U(t,e,l)},p:ce,i:ce,o:ce,d(t){t&&i(e)}}}function ul(r){let e,t;return e=new Mt({props:{name:r[15].jaName,imageUrl:r[15].imageUrl}}),{c(){Y(e.$$.fragment)},l(l){Z(e.$$.fragment,l)},m(l,s){ee(e,l,s),t=!0},p(l,s){const a={};s&1&&(a.name=l[15].jaName),s&1&&(a.imageUrl=l[15].imageUrl),e.$set(a)},i(l){t||(S(e.$$.fragment,l),t=!0)},o(l){j(e.$$.fragment,l),t=!1},d(l){te(e,l)}}}function fl(r){let e,t="→";return{c(){e=m("span"),e.textContent=t},l(l){e=_(l,"SPAN",{"data-svelte-h":!0}),Ee(e)!=="svelte-1xb5tc"&&(e.textContent=t)},m(l,s){U(l,e,s)},d(l){l&&i(e)}}}function Ut(r){let e,t,l,s,a,p;const o=[ul,cl],b=[];function n(c,y){return c[15]?0:1}t=n(r),l=b[t]=o[t](r);let u=r[17]<2&&fl();return{c(){e=m("div"),l.c(),s=$(),u&&u.c(),a=Ve(),this.h()},l(c){e=_(c,"DIV",{class:!0});var y=k(e);l.l(y),y.forEach(i),s=A(c),u&&u.l(c),a=Ve(),this.h()},h(){h(e,"class","rounded-2xl border-2")},m(c,y){U(c,e,y),b[t].m(e,null),U(c,s,y),u&&u.m(c,y),U(c,a,y),p=!0},p(c,y){let C=t;t=n(c),t===C?b[t].p(c,y):(de(),j(b[C],1,1,()=>{b[C]=null}),he(),l=b[t],l?l.p(c,y):(l=b[t]=o[t](c),l.c()),S(l,1),l.m(e,null))},i(c){p||(S(l),p=!0)},o(c){j(l),p=!1},d(c){c&&(i(e),i(s),i(a)),b[t].d(),u&&u.d(c)}}}function dl(r){let e,t,l='<h1 class="cTitleStyle">ポケモンしりとり</h1>',s,a,p,o,b,n,u,c,y,C,L,F,M="",E,f,I=r[0].length+"",D,N,B,O,x,T,z,H,Fe="",J,me,le,xe,_e,Q,se,Ye="ポケモン を いれかえる",He,ve,K,pe,re,Ue,Ne,Le,ge,q,$e,be,ke,ne,Ze="？",Re,ye,De,Ie,Ae,W,ze,et;function tt(v,P){return v[1].length===0?al:nl}let Be=tt(r),G=Be(r);C=new we({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),T=new we({props:{icon:"mdi:format-list-numbered",class:"cIconStyle"}});let ae=Ce(r[1]),w=[];for(let v=0;v<ae.length;v+=1)w[v]=Ft(jt(r,ae,v));const xt=v=>j(w[v],1,1,()=>{w[v]=null});re=new we({props:{icon:"mdi:pokeball",class:"cIconStyle"}});let oe=Ce(r[0].length>=2?r[0].slice(-2):[...Array(2-r[0].length).fill(null),...r[0]]),V=[];for(let v=0;v<oe.length;v+=1)V[v]=Ut(Vt(r,oe,v));const Ht=v=>j(V[v],1,1,()=>{V[v]=null});return{c(){e=m("div"),t=m("div"),t.innerHTML=l,s=$(),a=m("div"),p=m("div"),o=m("div"),b=m("span"),G.c(),n=$(),u=m("form"),c=m("button"),y=m("div"),Y(C.$$.fragment),L=$(),F=m("div"),F.innerHTML=M,E=$(),f=m("p"),D=ue(I),N=$(),B=m("form"),O=m("button"),x=m("div"),Y(T.$$.fragment),z=$(),H=m("div"),H.innerHTML=Fe,J=$(),me=m("div"),le=m("div");for(let v=0;v<w.length;v+=1)w[v].c();xe=$(),_e=m("div"),Q=m("div"),se=m("span"),se.textContent=Ye,He=$(),ve=m("form"),K=m("button"),pe=m("div"),Y(re.$$.fragment),Le=$(),ge=m("div"),q=m("div");for(let v=0;v<V.length;v+=1)V[v].c();$e=$(),be=m("div"),ke=m("div"),ne=m("span"),ne.textContent=Ze,Re=$(),ye=m("div"),De=m("div"),Ie=m("span"),Ae=ue(r[2]),this.h()},l(v){e=_(v,"DIV",{class:!0});var P=k(e);t=_(P,"DIV",{class:!0,"data-svelte-h":!0}),Ee(t)!=="svelte-n7rgko"&&(t.innerHTML=l),s=A(P),a=_(P,"DIV",{class:!0});var g=k(a);p=_(g,"DIV",{class:!0});var X=k(p);o=_(X,"DIV",{class:!0});var R=k(o);b=_(R,"SPAN",{class:!0});var lt=k(b);G.l(lt),lt.forEach(i),n=A(R),u=_(R,"FORM",{});var st=k(u);c=_(st,"BUTTON",{type:!0,class:!0});var rt=k(c);y=_(rt,"DIV",{class:!0});var nt=k(y);Z(C.$$.fragment,nt),nt.forEach(i),rt.forEach(i),st.forEach(i),L=A(R),F=_(R,"DIV",{class:!0,"data-svelte-h":!0}),Ee(F)!=="svelte-1rtwic7"&&(F.innerHTML=M),E=A(R),f=_(R,"P",{class:!0});var at=k(f);D=fe(at,I),at.forEach(i),N=A(R),B=_(R,"FORM",{});var ot=k(B);O=_(ot,"BUTTON",{type:!0,class:!0});var it=k(O);x=_(it,"DIV",{class:!0});var ct=k(x);Z(T.$$.fragment,ct),ct.forEach(i),it.forEach(i),ot.forEach(i),z=A(R),H=_(R,"DIV",{class:!0,"data-svelte-h":!0}),Ee(H)!=="svelte-17db9va"&&(H.innerHTML=Fe),R.forEach(i),X.forEach(i),J=A(g),me=_(g,"DIV",{class:!0});var ut=k(me);le=_(ut,"DIV",{class:!0});var ft=k(le);for(let ie=0;ie<w.length;ie+=1)w[ie].l(ft);ft.forEach(i),ut.forEach(i),xe=A(g),_e=_(g,"DIV",{class:!0});var dt=k(_e);Q=_(dt,"DIV",{class:!0});var Oe=k(Q);se=_(Oe,"SPAN",{class:!0,"data-svelte-h":!0}),Ee(se)!=="svelte-1ysiuuh"&&(se.textContent=Ye),He=A(Oe),ve=_(Oe,"FORM",{});var ht=k(ve);K=_(ht,"BUTTON",{type:!0,class:!0});var mt=k(K);pe=_(mt,"DIV",{class:!0});var _t=k(pe);Z(re.$$.fragment,_t),_t.forEach(i),mt.forEach(i),ht.forEach(i),Oe.forEach(i),dt.forEach(i),Le=A(g),ge=_(g,"DIV",{class:!0});var vt=k(ge);q=_(vt,"DIV",{class:!0});var Te=k(q);for(let ie=0;ie<V.length;ie+=1)V[ie].l(Te);$e=A(Te),be=_(Te,"DIV",{class:!0});var pt=k(be);ke=_(pt,"DIV",{class:!0});var gt=k(ke);ne=_(gt,"SPAN",{class:!0,"data-svelte-h":!0}),Ee(ne)!=="svelte-mds9k2"&&(ne.textContent=Ze),gt.forEach(i),pt.forEach(i),Te.forEach(i),vt.forEach(i),Re=A(g),ye=_(g,"DIV",{class:!0});var bt=k(ye);De=_(bt,"DIV",{class:!0});var kt=k(De);Ie=_(kt,"SPAN",{class:!0});var yt=k(Ie);Ae=fe(yt,r[2]),yt.forEach(i),kt.forEach(i),bt.forEach(i),g.forEach(i),P.forEach(i),this.h()},h(){h(t,"class","cTitlePartStyle"),h(b,"class","text-lg"),h(y,"class","cIconDivStyle"),h(c,"type","submit"),h(c,"class","cIconButtonStyle"),h(F,"class","flex-grow"),h(f,"class","text-lg"),h(x,"class","cIconDivStyle"),h(O,"type","submit"),h(O,"class","cIconButtonStyle"),h(H,"class","mr-4"),h(o,"class","cInputFormAndMessagePartStyle"),h(p,"class","m-4 space-y-2"),h(le,"class",At),h(me,"class",$t),h(se,"class","text-lg"),h(pe,"class","cIconDivStyle"),h(K,"type","submit"),K.disabled=Ue=r[0].length==0,h(K,"class",Ne="cIconButtonStyle "+(r[0].length==0?"!bg-gray-500":"")),h(Q,"class","cInputFormAndMessagePartStyle"),h(_e,"class","m-4"),h(ne,"class","block text-center text-xl"),h(ke,"class",Xe),h(be,"class","rounded-2xl border-2"),h(q,"class",At+" md:ml-16 md:mr-16"),h(ge,"class",$t),h(Ie,"class","text-lg"),h(De,"class","cInputFormAndMessagePartStyle mb-2"),h(ye,"class","m-4"),h(a,"class","cContentPartStyle !min-w-[300px] !max-w-[750px]"),h(e,"class","cRouteBodyStyle")},m(v,P){U(v,e,P),d(e,t),d(e,s),d(e,a),d(a,p),d(p,o),d(o,b),G.m(b,null),d(o,n),d(o,u),d(u,c),d(c,y),ee(C,y,null),d(o,L),d(o,F),d(o,E),d(o,f),d(f,D),d(o,N),d(o,B),d(B,O),d(O,x),ee(T,x,null),d(o,z),d(o,H),d(a,J),d(a,me),d(me,le);for(let g=0;g<w.length;g+=1)w[g]&&w[g].m(le,null);d(a,xe),d(a,_e),d(_e,Q),d(Q,se),d(Q,He),d(Q,ve),d(ve,K),d(K,pe),ee(re,pe,null),d(a,Le),d(a,ge),d(ge,q);for(let g=0;g<V.length;g+=1)V[g]&&V[g].m(q,null);d(q,$e),d(q,be),d(be,ke),d(ke,ne),d(a,Re),d(a,ye),d(ye,De),d(De,Ie),d(Ie,Ae),W=!0,ze||(et=[Se(u,"submit",Ke(r[5])),Se(B,"submit",Ke(r[6])),Se(ve,"submit",Ke(r[3]))],ze=!0)},p(v,[P]){if(Be!==(Be=tt(v))&&(G.d(1),G=Be(v),G&&(G.c(),G.m(b,null))),(!W||P&1)&&I!==(I=v[0].length+"")&&je(D,I),P&18){ae=Ce(v[1]);let g;for(g=0;g<ae.length;g+=1){const X=jt(v,ae,g);w[g]?(w[g].p(X,P),S(w[g],1)):(w[g]=Ft(X),w[g].c(),S(w[g],1),w[g].m(le,null))}for(de(),g=ae.length;g<w.length;g+=1)xt(g);he()}if((!W||P&1&&Ue!==(Ue=v[0].length==0))&&(K.disabled=Ue),(!W||P&1&&Ne!==(Ne="cIconButtonStyle "+(v[0].length==0?"!bg-gray-500":"")))&&h(K,"class",Ne),P&1){oe=Ce(v[0].length>=2?v[0].slice(-2):[...Array(2-v[0].length).fill(null),...v[0]]);let g;for(g=0;g<oe.length;g+=1){const X=Vt(v,oe,g);V[g]?(V[g].p(X,P),S(V[g],1)):(V[g]=Ut(X),V[g].c(),S(V[g],1),V[g].m(q,$e))}for(de(),g=oe.length;g<V.length;g+=1)Ht(g);he()}(!W||P&4)&&je(Ae,v[2])},i(v){if(!W){S(C.$$.fragment,v),S(T.$$.fragment,v);for(let P=0;P<ae.length;P+=1)S(w[P]);S(re.$$.fragment,v);for(let P=0;P<oe.length;P+=1)S(V[P]);W=!0}},o(v){j(C.$$.fragment,v),j(T.$$.fragment,v),w=w.filter(Boolean);for(let P=0;P<w.length;P+=1)j(w[P]);j(re.$$.fragment,v),V=V.filter(Boolean);for(let P=0;P<V.length;P+=1)j(V[P]);W=!1},d(v){v&&i(e),G.d(),te(C),te(T),Ge(w,v),te(re),Ge(V,v),ze=!1,qt(et)}}}const qe=12,Nt=4,$t="min-h-[150px] md:min-w-[750px] border bg-white rounded-xl",At="flex flex-wrap justify-between gap-y-1 p-4",Xe="h-[100px] w-[100px] bg-gray-100 rounded-2xl";function hl(r){return{type:"component",component:r,backdropClasses:"fixed inset-0 !bg-gray-300/90"}}function ml(r,e,t){let{data:l}=e,s=l.pokeDict;const a=l.groupByHeadCharDict;let p=[];function o(){n.length===0&&u();const f=Pe(n[n.length-1].jaName),I=O(s),D=x(I,a,f),N=Object.keys(I).length>qe?Et(I,qe):Object.values(I),B=Object.keys(D).length>Nt?Et(D,Nt):Object.values(D);t(1,p=Jt([...new Set([...N,...B])]).slice(0,qe));function O(T){return Object.fromEntries(Object.entries(T).filter(([,z])=>!z.isUsed))}function x(T,z,H){const Fe=z[H]??[];return Object.fromEntries(Fe.filter(J=>J in T).map(J=>[J,T[J]]))}}function b(f){s[f].isUsed=!0,t(1,p=p.map(I=>I.pokeId===f?{...I,isUsed:!0}:I))}let n=[];function u(){const f=Qt(s);b(f),t(0,n=[s[f]])}function c(f){if(n.length===0){t(2,y="ポケモン を よびだしてね");return}const I=n[n.length-1].jaName,D=f.jaName;if(!Wt(I,D)){t(2,y=`「${Pe(I??"")}」 から はじまる ポケモン を えらんでね`);return}b(f.pokeId),t(0,n=[...n,f])}let y;function C(){const f=n.slice(-1)[0]??null;if(f===null){t(2,y="ポケモン を よびだしてね");return}const I=f.jaName,D=Pe(I);if(D==="ン"){t(2,y="ン で おわっちゃった...");return}if(n.length==1)t(2,y=`はじめは 「${Pe(D)}」`);else{const N=["そのちょうし！","いいぞ！","がんばれ！","すごい！","いけいけ！"];t(2,y=`${N[Lt(N.length)]} つぎは 「${Pe(D)}」`)}}function L(){s=f(Gt(l.pokeDict,"pokeId")),t(0,n=[]),u(),o(),C();function f(I){return Object.fromEntries(Object.entries(I).map(([D,N])=>[D,{...N,isUsed:!1}]))}}const F=Bt();function M(){const f={ref:rl,props:{title:"しりとりリスト",stringArray:n.map(D=>D.jaName)}},I=hl(f);F.trigger(I)}const E=f=>c(f);return r.$$set=f=>{"data"in f&&t(7,l=f.data)},r.$$.update=()=>{r.$$.dirty&1&&n&&C()},[n,p,y,o,c,L,M,l,E]}class Cl extends Qe{constructor(e){super(),We(this,e,ml,dl,Je,{data:7})}}export{Cl as component,Pl as universal};
