import{a as t}from"../chunks/fetchStaticData.9PMlZd1J.js";import{P as a,F as e}from"../chunks/common.D3vKClQu.js";import{a as n,y as s,z as o,A as r,B as l}from"../chunks/scheduler.L2H8yLnq.js";import{S as c,i,a as u,t as m}from"../chunks/index.JYZId_L6.js";const p=Object.freeze(Object.defineProperty({__proto__:null,load:async function({fetch:n}){return await t(n,"load to cache"),{pokeItems:await async function(){const s=Array.from({length:a},((t,a)=>e+a)).map((async a=>{const e=await t(n,a.toString());return e&&null!==e.imageUrl?{pokeId:a,jaName:(s=e).jaName,imageUrl:s.imageUrl??"not_found",height:s.height,weight:s.weight}:null;var s}));return(await Promise.all(s)).filter((t=>null!==t))}()}}},Symbol.toStringTag,{value:"Module"}));function f(t){let a;const e=t[1].default,n=s(e,t,t[0],null);return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,e){n&&n.m(t,e),a=!0},p(t,[s]){n&&n.p&&(!a||1&s)&&o(n,e,t,t[0],a?l(e,t[0],s,null):r(t[0]),null)},i(t){a||(u(n,t),a=!0)},o(t){m(n,t),a=!1},d(t){n&&n.d(t)}}}function h(t,a,e){let{$$slots:n={},$$scope:s}=a;return t.$$set=t=>{"$$scope"in t&&e(0,s=t.$$scope)},[s,n]}class d extends c{constructor(t){super(),i(this,t,h,f,n,{})}}export{d as component,p as universal};
