import{a as t}from"../chunks/fetchStaticData.BL8SPXEv.js";import{P as a,F as e}from"../chunks/common.Cow6YdGJ.js";import{s as o,y as s,z as n,A as r,B as l}from"../chunks/scheduler.CKlfITpV.js";import{S as c,i,a as u,t as m}from"../chunks/index.DneOF3-m.js";const p=Object.freeze(Object.defineProperty({__proto__:null,load:async function({fetch:o}){return await t(o,"load to cache"),{pokeItems:await async function(){const s=Array.from({length:a},((t,a)=>e+a)).map((async a=>{const e=await t(o,a.toString());return e&&null!==e.imageUrl?{pokeId:a,jaName:(s=e).jaName,imageUrl:s.imageUrl??"not_found",oggUrl:s.oggUrl,height:s.height,weight:s.weight}:null;var s}));return(await Promise.all(s)).filter((t=>null!==t))}()}}},Symbol.toStringTag,{value:"Module"}));function f(t){let a;const e=t[1].default,o=s(e,t,t[0],null);return{c(){o&&o.c()},l(t){o&&o.l(t)},m(t,e){o&&o.m(t,e),a=!0},p(t,[s]){o&&o.p&&(!a||1&s)&&n(o,e,t,t[0],a?l(e,t[0],s,null):r(t[0]),null)},i(t){a||(u(o,t),a=!0)},o(t){m(o,t),a=!1},d(t){o&&o.d(t)}}}function h(t,a,e){let{$$slots:o={},$$scope:s}=a;return t.$$set=t=>{"$$scope"in t&&e(0,s=t.$$scope)},[s,o]}class g extends c{constructor(t){super(),i(this,t,h,f,o,{})}}export{g as component,p as universal};
