import{w as t}from"./index.D1JbSHSG.js";import{g as e,s}from"./scheduler.BlVzsFL4.js";const i="modalStore";function o(){const t=e(i);if(!t)throw new Error("modalStore is not initialized. Please ensure that `initializeStores()` is invoked in the root layout file of this app!");return t}function r(){const e=function(){const{subscribe:e,set:s,update:i}=t([]);return{subscribe:e,set:s,update:i,trigger:t=>i((e=>(e.push(t),e))),close:()=>i((t=>(t.length>0&&t.shift(),t))),clear:()=>s([])}}();return s(i,e)}export{o as g,r as i};
