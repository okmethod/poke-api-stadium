import{_ as i}from"./preload-helper.D6kgxu3v.js";import{b as u}from"./paths.BT9mbmof.js";function p(t,o){return`${t?(t*.1).toFixed(1):"???"} ${o==="height"?"m":"kg"}`}function T(t){return t!==void 0?t.toString():"???"}function g(t){return Math.floor(Math.random()*t)}const m=!1;async function d(t){const o=t.stream().pipeThrough(new DecompressionStream("gzip"));return await(await new Response(o).blob()).text()}async function c(t,o){console.log("loading: ",o);try{if(!m){console.log("isProduction");const e=`${u}/${o}`,a=await(await t(e)).blob(),l=await d(a);return JSON.parse(l)}}catch(e){throw console.error(`failed to load ${o}:`,e),e}}let s=null;async function D(t,o){return s===null&&(s=await c(t,"staticPokeDict.json.gz")),s[o]}let r=null;async function h(t,o){return r===null&&(r=await c(t,"staticAddPokeDict.json.gz")),r[o]}async function w(t){const{STATIC_TYPE_DICT:o,TYPE_COLOR_DICT:e}=await i(async()=>{const{STATIC_TYPE_DICT:n,TYPE_COLOR_DICT:a}=await import("./staticTypeData.B1KTCKI2.js");return{STATIC_TYPE_DICT:n,TYPE_COLOR_DICT:a}},[],import.meta.url);return{...o[t],...e[t]}}async function P(t){const{STATIC_BALL_DICT:o}=await i(async()=>{const{STATIC_BALL_DICT:e}=await import("./staticItemData.DSMs3vXt.js");return{STATIC_BALL_DICT:e}},[],import.meta.url);return o[t]}export{P as a,h as b,D as c,p as d,T as e,w as f,g};