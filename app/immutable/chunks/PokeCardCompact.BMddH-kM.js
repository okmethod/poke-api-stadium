import{s as B,e as _,a as $,t as J,c as p,b as h,f as m,d as q,m as K,h as c,n as j,i as Y,j as d,o as L,q as x,r as F}from"./scheduler.WzBlcp83.js";import{S as Q,i as W,g as X,d as z,b as Z,t as A,c as ee,a as te,m as ae,e as re}from"./index.CitmOJln.js";import{T as G,n as C,I as le}from"./numerics.DDJCrcuH.js";function oe(o){let e,r;return e=new le({props:{icon:"mdi:image-off-outline",class:"w-8 h-8"}}),{c(){ee(e.$$.fragment)},l(t){te(e.$$.fragment,t)},m(t,a){ae(e,t,a),r=!0},p:x,i(t){r||(A(e.$$.fragment,t),r=!0)},o(t){z(e.$$.fragment,t),r=!1},d(t){re(e,t)}}}function se(o){let e,r,t;return{c(){e=_("img"),this.h()},l(a){e=p(a,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){F(e.src,r=o[0].imageUrlArray[M])||c(e,"src",r),c(e,"alt",t=o[0].jaName),c(e,"class","w-full h-full object-cover")},m(a,n){Y(a,e,n)},p(a,n){n&1&&!F(e.src,r=a[0].imageUrlArray[M])&&c(e,"src",r),n&1&&t!==(t=a[0].jaName)&&c(e,"alt",t)},i:x,o:x,d(a){a&&m(e)}}}function ne(o){let e,r,t,a,n,i,v,I=(o[0]!==null?o[0].jaName:"???")+"",w,N,D,k,u,f,V,y,E;const P=[se,oe],g=[];function S(l,s){return l[0]!==null?0:1}return u=S(o),f=g[u]=P[u](o),{c(){e=_("div"),r=_("header"),t=$(),a=_("div"),n=_("div"),i=_("h1"),v=_("div"),w=J(I),N=$(),D=_("div"),k=_("div"),f.c(),V=$(),y=_("footer"),this.h()},l(l){e=p(l,"DIV",{class:!0});var s=h(e);r=p(s,"HEADER",{class:!0,style:!0}),h(r).forEach(m),t=q(s),a=p(s,"DIV",{class:!0});var b=h(a);n=p(b,"DIV",{class:!0});var T=h(n);i=p(T,"H1",{class:!0});var H=h(i);v=p(H,"DIV",{});var O=h(v);w=K(O,I),O.forEach(m),H.forEach(m),T.forEach(m),N=q(b),D=p(b,"DIV",{class:!0});var R=h(D);k=p(R,"DIV",{class:!0});var U=h(k);f.l(U),U.forEach(m),R.forEach(m),b.forEach(m),V=q(s),y=p(s,"FOOTER",{class:!0,style:!0}),h(y).forEach(m),s.forEach(m),this.h()},h(){c(r,"class","absolute top-0 p-4 bg-transparent w-full z-10"),j(r,"background-color",o[1]),c(i,"class","bg-white bg-opacity-50 text-xl font-bold text-gray-900"),c(n,"class","flex justify-center"),c(k,"class","bg-white rounded-full border border-gray-200 flex items-center justify-center"),c(D,"class","flex justify-center"),c(a,"class","relative p-2 bg-transparent z-20"),c(y,"class","absolute bottom-0 p-4 bg-transparent w-full z-10"),j(y,"background-color",o[2]),c(e,"class","select-none relative grid border bg-gray-50 rounded-2xl shadow h-[150px] w-[150px] overflow-hidden")},m(l,s){Y(l,e,s),d(e,r),d(e,t),d(e,a),d(a,n),d(n,i),d(i,v),d(v,w),d(a,N),d(a,D),d(D,k),g[u].m(k,null),d(e,V),d(e,y),E=!0},p(l,[s]){(!E||s&2)&&j(r,"background-color",l[1]),(!E||s&1)&&I!==(I=(l[0]!==null?l[0].jaName:"???")+"")&&L(w,I);let b=u;u=S(l),u===b?g[u].p(l,s):(X(),z(g[b],1,1,()=>{g[b]=null}),Z(),f=g[u],f?f.p(l,s):(f=g[u]=P[u](l),f.c()),A(f,1),f.m(k,null)),(!E||s&4)&&j(y,"background-color",l[2])},i(l){E||(A(f),E=!0)},o(l){z(f),E=!1},d(l){l&&m(e),g[u].d()}}}const M=0;function ce(o,e,r){let{pokeData:t=null}=e,a=C,n=C;return o.$$set=i=>{"pokeData"in i&&r(0,t=i.pokeData)},o.$$.update=()=>{var i,v;o.$$.dirty&3&&t!==null&&(r(1,a=((i=G[t.type1.enName])==null?void 0:i.color)??C),r(2,n=t.type2!==null?((v=G[t.type2.enName])==null?void 0:v.color)??C:a))},[t,a,n]}class de extends Q{constructor(e){super(),W(this,e,ce,ne,B,{pokeData:0})}}export{de as P};
