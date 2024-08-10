import{s as $,e as v,a as q,t as ee,c as p,b as k,d as u,f as x,g as le,h as d,i as S,j as V,k as b,l as te,n as ae,m as G,o as M,p as U,q as re}from"./scheduler.8mt35fBc.js";import{S as se,i as oe,g as B,t as T,c as J,a as j,b as K,d as Q,m as W,e as X}from"./index.ySw2sHjO.js";import{I as Z}from"./staticPokeData.Do0twg6C.js";import{S as C}from"./staticTypeData.Eu4_1rZe.js";function ie(n){let e,t,i;return t=new Z({props:{icon:"mdi:image-off-outline",class:"w-8 h-8 bg-white"}}),{c(){e=v("div"),K(t.$$.fragment),this.h()},l(l){e=p(l,"DIV",{class:!0});var r=k(e);Q(t.$$.fragment,r),r.forEach(u),this.h()},h(){d(e,"class","absolute inset-0 flex items-center justify-center h-full")},m(l,r){V(l,e,r),W(t,e,null),i=!0},p:ae,i(l){i||(j(t.$$.fragment,l),i=!0)},o(l){T(t.$$.fragment,l),i=!1},d(l){l&&u(e),X(t)}}}function ne(n){let e,t,i,l,r,c,_,y,s=!n[4]&&Y();return{c(){e=v("img"),l=q(),s&&s.c(),r=G(),this.h()},l(o){e=p(o,"IMG",{src:!0,alt:!0,class:!0}),l=x(o),s&&s.l(o),r=G(),this.h()},h(){M(e.src,t=n[1])||d(e,"src",t),d(e,"alt",i=n[0]??"???"),d(e,"class","w-full h-full object-cover"),U(e,"image",!n[4]),U(e,"loaded",n[4])},m(o,a){V(o,e,a),V(o,l,a),s&&s.m(o,a),V(o,r,a),c=!0,_||(y=re(e,"load",n[5]),_=!0)},p(o,a){(!c||a&2&&!M(e.src,t=o[1]))&&d(e,"src",t),(!c||a&1&&i!==(i=o[0]??"???"))&&d(e,"alt",i),(!c||a&16)&&U(e,"image",!o[4]),(!c||a&16)&&U(e,"loaded",o[4]),o[4]?s&&(B(),T(s,1,1,()=>{s=null}),J()):s?a&16&&j(s,1):(s=Y(),s.c(),j(s,1),s.m(r.parentNode,r))},i(o){c||(j(s),c=!0)},o(o){T(s),c=!1},d(o){o&&(u(e),u(l),u(r)),s&&s.d(o),_=!1,y()}}}function Y(n){let e,t,i;return t=new Z({props:{icon:"mdi:progress-download",class:"w-full h-full text-white bg-gray-100 object-cover"}}),{c(){e=v("div"),K(t.$$.fragment),this.h()},l(l){e=p(l,"DIV",{class:!0});var r=k(e);Q(t.$$.fragment,r),r.forEach(u),this.h()},h(){d(e,"class","absolute inset-0 flex items-center justify-center h-full")},m(l,r){V(l,e,r),W(t,e,null),i=!0},i(l){i||(j(t.$$.fragment,l),i=!0)},o(l){T(t.$$.fragment,l),i=!1},d(l){l&&u(e),X(t)}}}function ce(n){let e,t,i,l,r,c,_,y=(n[0]??"???")+"",s,o,a,I,h,g,z,D,N;const P=[ne,ie],w=[];function A(f,m){return f[1]!==null?0:1}return h=A(n),g=w[h]=P[h](n),{c(){e=v("div"),t=v("header"),i=q(),l=v("div"),r=v("div"),c=v("h1"),_=v("div"),s=ee(y),o=q(),a=v("div"),I=v("div"),g.c(),z=q(),D=v("footer"),this.h()},l(f){e=p(f,"DIV",{class:!0});var m=k(e);t=p(m,"HEADER",{class:!0,style:!0}),k(t).forEach(u),i=x(m),l=p(m,"DIV",{class:!0});var E=k(l);r=p(E,"DIV",{class:!0});var H=k(r);c=p(H,"H1",{class:!0});var L=k(c);_=p(L,"DIV",{});var O=k(_);s=le(O,y),O.forEach(u),L.forEach(u),H.forEach(u),o=x(E),a=p(E,"DIV",{class:!0});var R=k(a);I=p(R,"DIV",{class:!0});var F=k(I);g.l(F),F.forEach(u),R.forEach(u),E.forEach(u),z=x(m),D=p(m,"FOOTER",{class:!0,style:!0}),k(D).forEach(u),m.forEach(u),this.h()},h(){d(t,"class","absolute top-0 w-full z-10 p-4 bg-transparent"),S(t,"background-color",n[2]),d(c,"class","bg-white bg-opacity-50 text-xl font-bold text-gray-900"),d(r,"class","flex justify-center"),d(I,"class","flex items-center justify-center bg-white rounded-full border border-gray-200"),d(a,"class","flex justify-center"),d(l,"class","p-2 bg-transparent z-20"),d(D,"class","absolute bottom-0 w-full z-10 p-4 bg-transparent"),S(D,"background-color",n[3]),d(e,"class","relative flex flex-col bg-gray-50 rounded-2xl shadow border h-[150px] w-[150px] overflow-hidden select-none")},m(f,m){V(f,e,m),b(e,t),b(e,i),b(e,l),b(l,r),b(r,c),b(c,_),b(_,s),b(l,o),b(l,a),b(a,I),w[h].m(I,null),b(e,z),b(e,D),N=!0},p(f,[m]){(!N||m&4)&&S(t,"background-color",f[2]),(!N||m&1)&&y!==(y=(f[0]??"???")+"")&&te(s,y);let E=h;h=A(f),h===E?w[h].p(f,m):(B(),T(w[E],1,1,()=>{w[E]=null}),J(),g=w[h],g?g.p(f,m):(g=w[h]=P[h](f),g.c()),j(g,1),g.m(I,null)),(!N||m&8)&&S(D,"background-color",f[3])},i(f){N||(j(g),N=!0)},o(f){T(g),N=!1},d(f){f&&u(e),w[h].d()}}}function fe(n,e,t){let{name:i=null}=e,{type1Name:l=null}=e,{type2Name:r=null}=e,{imageUrl:c=null}=e,_=C.null.color,y=C.null.color,s=!1;function o(){t(4,s=!0)}return n.$$set=a=>{"name"in a&&t(0,i=a.name),"type1Name"in a&&t(6,l=a.type1Name),"type2Name"in a&&t(7,r=a.type2Name),"imageUrl"in a&&t(1,c=a.imageUrl)},n.$$.update=()=>{var a;n.$$.dirty&197&&i&&(t(2,_=l?C[l].color:C.null.color),t(3,y=r?(a=C[r])==null?void 0:a.color:_)),n.$$.dirty&2&&c&&t(4,s=!1)},[i,c,_,y,s,o,l,r]}class he extends se{constructor(e){super(),oe(this,e,fe,ce,$,{name:0,type1Name:6,type2Name:7,imageUrl:1})}}export{he as P};
