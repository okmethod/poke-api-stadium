import{s as J,e as c,a as j,c as i,b as g,p as V,f as C,d as y,h as o,j as M,k as r,y as R,u as B,v as H,r as W}from"../chunks/scheduler.Bae5lIne.js";import{S as q,i as z,b as K,d as G,m as Q,a as X,t as Y,e as Z}from"../chunks/index.LbyiwRzo.js";import{I as tt}from"../chunks/Icon.CT6Ov_xU.js";import{g as et,L as at}from"../chunks/poke.XrqMT8j9.js";function st(s){return{jaName:s.jaName,imageUrl:s.imageUrlArray[0]}}async function nt(s,e){const a={},l=e.map(async t=>{const u=await et(s,t.toString()),d=st(u);a[t.toString()]=d});return await Promise.all(l),a}function ot(s){let e,a,l='<h1 class="cTitleStyle">うらわざ</h1>',t,u,d,m,_,k="全ポケモンリストJson ダウンロード",S,f,h,x,P,p,D,b,w,I,$,L;return b=new tt({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),{c(){e=c("div"),a=c("div"),a.innerHTML=l,t=j(),u=c("div"),d=c("div"),m=c("div"),_=c("span"),_.textContent=k,S=j(),f=c("div"),h=c("input"),x=j(),P=c("form"),p=c("button"),D=c("div"),K(b.$$.fragment),this.h()},l(n){e=i(n,"DIV",{class:!0});var v=g(e);a=i(v,"DIV",{class:!0,"data-svelte-h":!0}),V(a)!=="svelte-19ephz6"&&(a.innerHTML=l),t=C(v),u=i(v,"DIV",{class:!0});var N=g(u);d=i(N,"DIV",{class:!0});var U=g(d);m=i(U,"DIV",{class:!0});var E=g(m);_=i(E,"SPAN",{class:!0,"data-svelte-h":!0}),V(_)!=="svelte-86wdmb"&&(_.textContent=k),S=C(E),f=i(E,"DIV",{class:!0});var T=g(f);h=i(T,"INPUT",{type:!0,class:!0}),x=C(T),P=i(T,"FORM",{});var A=g(P);p=i(A,"BUTTON",{type:!0,class:!0});var F=g(p);D=i(F,"DIV",{class:!0});var O=g(D);G(b.$$.fragment,O),O.forEach(y),F.forEach(y),A.forEach(y),T.forEach(y),E.forEach(y),U.forEach(y),N.forEach(y),v.forEach(y),this.h()},h(){o(a,"class","cTitlePartStyle"),o(_,"class","text-lg"),o(h,"type","text"),o(h,"class","border rounded px-4 py-1 h-full"),o(D,"class","cIconDivStyle"),o(p,"type","submit"),p.disabled=s[0],o(p,"class",w="cIconButtonStyle "+(s[0]?"!bg-gray-500":"")),o(f,"class","cInputFormAndMessagePartStyle"),o(m,"class","flex flex-col md:flex-row space-x-3"),o(d,"class","ml-4"),o(u,"class","cContentPartStyle !min-w-[300px] !max-w-[600px]"),o(e,"class","cRouteBodyStyle")},m(n,v){M(n,e,v),r(e,a),r(e,t),r(e,u),r(u,d),r(d,m),r(m,_),r(m,S),r(m,f),r(f,h),R(h,s[1]),r(f,x),r(f,P),r(P,p),r(p,D),Q(b,D,null),I=!0,$||(L=[B(h,"input",s[3]),B(P,"submit",H(s[2]))],$=!0)},p(n,[v]){v&2&&h.value!==n[1]&&R(h,n[1]),(!I||v&1)&&(p.disabled=n[0]),(!I||v&1&&w!==(w="cIconButtonStyle "+(n[0]?"!bg-gray-500":"")))&&o(p,"class",w)},i(n){I||(X(b.$$.fragment,n),I=!0)},o(n){Y(b.$$.fragment,n),I=!1},d(n){n&&y(e),Z(b),$=!1,W(L)}}}function rt(s,e){const a=new Blob([s],{type:"application/json"}),l=URL.createObjectURL(a),t=document.createElement("a");t.href=l,t.download=e,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(l)}function lt(s,e,a){let l=!1,t="staticPokeArray.json";async function u(){a(0,l=!0);const m=Array.from({length:at},(S,f)=>f+1),_=await nt(fetch,m),k=JSON.stringify(_,null,2);try{rt(k,t),console.log(`File Write Done: ${t}`)}catch(S){console.error("File Write Failed:",S)}a(0,l=!1)}function d(){t=this.value,a(1,t)}return[l,t,u,d]}class mt extends q{constructor(e){super(),z(this,e,lt,ot,J,{})}}export{mt as component};
