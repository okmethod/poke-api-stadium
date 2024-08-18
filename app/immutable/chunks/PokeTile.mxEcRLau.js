import{a as $,e as v,b as q,t as ee,c as y,d as w,f as m,h as x,i as te,j as h,k as T,l as C,m as p,n as le,o as ae,p as G,q as M,r as U,u as re}from"./scheduler.D16oZ6cK.js";import{S as oe,i as se,g as J,t as V,c as K,a as j,b as Q,d as W,m as X,e as Y}from"./index.BWx_jO9Z.js";import{I as Z}from"./Icon.HXW41lnT.js";import{T as ie}from"./type.BpnlySAn.js";import{f as H}from"./numerics.CCjFTfwg.js";function ne(n){let e,t,i;return t=new Z({props:{icon:"mdi:image-off-outline",class:"w-8 h-8 bg-white"}}),{c(){e=v("div"),Q(t.$$.fragment),this.h()},l(l){e=y(l,"DIV",{class:!0});var a=w(e);W(t.$$.fragment,a),a.forEach(m),this.h()},h(){h(e,"class","absolute inset-0 flex items-center justify-center h-full")},m(l,a){C(l,e,a),X(t,e,null),i=!0},p:ae,i(l){i||(j(t.$$.fragment,l),i=!0)},o(l){V(t.$$.fragment,l),i=!1},d(l){l&&m(e),Y(t)}}}function ce(n){let e,t,i,l,a,c,g,b,r=!n[4]&&B();return{c(){e=v("img"),l=q(),r&&r.c(),a=G(),this.h()},l(o){e=y(o,"IMG",{src:!0,alt:!0,class:!0}),l=x(o),r&&r.l(o),a=G(),this.h()},h(){M(e.src,t=n[1])||h(e,"src",t),h(e,"alt",i=n[0]??"???"),h(e,"class","w-full h-full object-cover"),U(e,"image",!n[4]),U(e,"loaded",n[4])},m(o,f){C(o,e,f),C(o,l,f),r&&r.m(o,f),C(o,a,f),c=!0,g||(b=re(e,"load",n[5]),g=!0)},p(o,f){(!c||f&2&&!M(e.src,t=o[1]))&&h(e,"src",t),(!c||f&1&&i!==(i=o[0]??"???"))&&h(e,"alt",i),(!c||f&16)&&U(e,"image",!o[4]),(!c||f&16)&&U(e,"loaded",o[4]),o[4]?r&&(J(),V(r,1,1,()=>{r=null}),K()):r?f&16&&j(r,1):(r=B(),r.c(),j(r,1),r.m(a.parentNode,a))},i(o){c||(j(r),c=!0)},o(o){V(r),c=!1},d(o){o&&(m(e),m(l),m(a)),r&&r.d(o),g=!1,b()}}}function B(n){let e,t,i;return t=new Z({props:{icon:"mdi:progress-download",class:"w-full h-full text-white bg-gray-100 object-cover"}}),{c(){e=v("div"),Q(t.$$.fragment),this.h()},l(l){e=y(l,"DIV",{class:!0});var a=w(e);W(t.$$.fragment,a),a.forEach(m),this.h()},h(){h(e,"class","absolute inset-0 flex items-center justify-center h-full")},m(l,a){C(l,e,a),X(t,e,null),i=!0},i(l){i||(j(t.$$.fragment,l),i=!0)},o(l){V(t.$$.fragment,l),i=!1},d(l){l&&m(e),Y(t)}}}function fe(n){let e,t,i,l,a,c,g,b=(n[0]??"???")+"",r,o,f,k,_,s,z,D,N;const L=[ce,ne],I=[];function O(u,d){return u[1]!==null?0:1}return _=O(n),s=I[_]=L[_](n),{c(){e=v("div"),t=v("header"),i=q(),l=v("div"),a=v("div"),c=v("h1"),g=v("div"),r=ee(b),o=q(),f=v("div"),k=v("div"),s.c(),z=q(),D=v("footer"),this.h()},l(u){e=y(u,"DIV",{class:!0});var d=w(e);t=y(d,"HEADER",{class:!0,style:!0}),w(t).forEach(m),i=x(d),l=y(d,"DIV",{class:!0});var E=w(l);a=y(E,"DIV",{class:!0});var P=w(a);c=y(P,"H1",{class:!0});var R=w(c);g=y(R,"DIV",{});var S=w(g);r=te(S,b),S.forEach(m),R.forEach(m),P.forEach(m),o=x(E),f=y(E,"DIV",{class:!0});var A=w(f);k=y(A,"DIV",{class:!0});var F=w(k);s.l(F),F.forEach(m),A.forEach(m),E.forEach(m),z=x(d),D=y(d,"FOOTER",{class:!0,style:!0}),w(D).forEach(m),d.forEach(m),this.h()},h(){h(t,"class","absolute top-0 w-full z-10 p-4 bg-transparent"),T(t,"background-color",n[2]),h(c,"class","bg-white bg-opacity-50 text-xl font-bold text-gray-900"),h(a,"class","flex justify-center"),h(k,"class","flex items-center justify-center bg-white rounded-full border border-gray-200"),h(f,"class","flex justify-center"),h(l,"class","p-2 bg-transparent z-20"),h(D,"class","absolute bottom-0 w-full z-10 p-4 bg-transparent"),T(D,"background-color",n[3]),h(e,"class","relative flex flex-col bg-gray-50 rounded-2xl shadow border h-[150px] w-[150px] overflow-hidden select-none")},m(u,d){C(u,e,d),p(e,t),p(e,i),p(e,l),p(l,a),p(a,c),p(c,g),p(g,r),p(l,o),p(l,f),p(f,k),I[_].m(k,null),p(e,z),p(e,D),N=!0},p(u,[d]){(!N||d&4)&&T(t,"background-color",u[2]),(!N||d&1)&&b!==(b=(u[0]??"???")+"")&&le(r,b);let E=_;_=O(u),_===E?I[_].p(u,d):(J(),V(I[E],1,1,()=>{I[E]=null}),K(),s=I[_],s?s.p(u,d):(s=I[_]=L[_](u),s.c()),j(s,1),s.m(k,null)),(!N||d&8)&&T(D,"background-color",u[3])},i(u){N||(j(s),N=!0)},o(u){V(s),N=!1},d(u){u&&m(e),I[_].d()}}}function ue(n,e,t){let{pokeId:i=null}=e,{name:l=null}=e,{type1Name:a=null}=e,{type2Name:c=null}=e,{imageUrl:g=null}=e,b="",r="",o="";async function f(){b===""&&(b=(await H(ie.Unknown)).themeColor),t(2,r=a?(await H(a)).themeColor:b),t(3,o=c?(await H(c)).themeColor:r)}let k=!1;function _(){t(4,k=!0)}return n.$$set=s=>{"pokeId"in s&&t(6,i=s.pokeId),"name"in s&&t(0,l=s.name),"type1Name"in s&&t(7,a=s.type1Name),"type2Name"in s&&t(8,c=s.type2Name),"imageUrl"in s&&t(1,g=s.imageUrl)},n.$$.update=()=>{n.$$.dirty&64&&i&&f(),n.$$.dirty&2&&g&&t(4,k=!1)},[l,g,r,o,k,_,i,a,c]}class be extends oe{constructor(e){super(),se(this,e,ue,fe,$,{pokeId:6,name:0,type1Name:7,type2Name:8,imageUrl:1})}}export{be as P};
