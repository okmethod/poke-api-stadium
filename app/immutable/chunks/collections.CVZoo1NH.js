import{w as e}from"./index.BoyZvVsf.js";import{G as o}from"./scheduler.BlZZSZ7p.js";import{g as s}from"./numerics.DOcq6E6e.js";const t=e(("undefined"!=typeof localStorage?localStorage.getItem("generationId"):"all")??"all"),l={gen1:{label:"第1世代",description:"赤・緑・青・黄",lastPokeId:151,symbolPokeIds:[1,4,7]},gen2:{label:"第2世代",description:"金・銀・クリスタル",lastPokeId:251,symbolPokeIds:[152,155,158]},gen3:{label:"第3世代",description:"ルビー・サファイア・エメラルド",lastPokeId:386,symbolPokeIds:[252,255,258]},gen4:{label:"第4世代",description:"ダイヤモンド・パール",lastPokeId:494,symbolPokeIds:[387,390,393]},gen5:{label:"第5世代",description:"ブラック・ホワイト",lastPokeId:649,symbolPokeIds:[495,498,501]},gen6:{label:"第6世代",description:"X・Y",lastPokeId:721,symbolPokeIds:[650,653,656]},gen7:{label:"第7世代",description:"サン・ムーン",lastPokeId:809,symbolPokeIds:[722,725,728]},gen8:{label:"第8世代",description:"ソード・シールド",lastPokeId:905,symbolPokeIds:[810,813,816]},gen9:{label:"第9世代",description:"スカーレット・バイオレット",lastPokeId:1025,symbolPokeIds:[906,909,912]},all:{label:"全世代",description:"すべて",lastPokeId:1025,symbolPokeIds:[1024]}};function n(e,s){const n=o(t);return"all"===n?e:e.filter((e=>Number(e[s])<=l[n].lastPokeId))}function a(e,s){const n=o(t);return Object.entries(e).reduce(((e,[o,t])=>(("all"===n||Number(t[s])<=l[n].lastPokeId)&&(e[o]=t),e)),{})}function r(e){const o=Object.keys(e);return o[s(o.length)]}function d(e,o){if(e.length<o)throw new Error("shortage elements in the array");const t=[],l=new Set;for(;t.length<o;){const o=s(e.length);l.has(o)||(t.push(e[o]),l.add(o))}return t}function i(e,o){return d(Array.from({length:e.length},((e,o)=>o)),o).map((o=>e[o]))}function c(e,o){return i(Object.keys(e),o).map((o=>e[o]))}function b(e){for(let o=e.length-1;o>0;o--){const s=Math.floor(Math.random()*(o+1));[e[o],e[s]]=[e[s],e[o]]}return e}export{c as a,r as b,a as c,d,t as e,n as f,l as g,i as p,b as s};