import{w as e}from"./index.D1JbSHSG.js";import{w as l}from"./scheduler.BlVzsFL4.js";const o=e(("undefined"!=typeof localStorage?localStorage.getItem("generationId"):"all")??"all"),s={gen1:{label:"第1世代",description:"赤・緑・青・黄",lastPokeId:151,symbolPokeIds:[1,4,7]},gen2:{label:"第2世代",description:"金・銀・クリスタル",lastPokeId:251,symbolPokeIds:[152,155,158]},gen3:{label:"第3世代",description:"ルビー・サファイア・エメラルド",lastPokeId:386,symbolPokeIds:[252,255,258]},gen4:{label:"第4世代",description:"ダイヤモンド・パール",lastPokeId:494,symbolPokeIds:[387,390,393]},gen5:{label:"第5世代",description:"ブラック・ホワイト",lastPokeId:649,symbolPokeIds:[495,498,501]},gen6:{label:"第6世代",description:"X・Y",lastPokeId:721,symbolPokeIds:[650,653,656]},gen7:{label:"第7世代",description:"サン・ムーン",lastPokeId:809,symbolPokeIds:[722,725,728]},gen8:{label:"第8世代",description:"ソード・シールド",lastPokeId:905,symbolPokeIds:[810,813,816]},gen9:{label:"第9世代",description:"スカーレット・バイオレット",lastPokeId:1025,symbolPokeIds:[906,909,912]},all:{label:"全世代",description:"すべて",lastPokeId:1025,symbolPokeIds:[1024]}};function t(e,t){const a=l(o);return"all"===a?e:e.filter((e=>Number(e[t])<=s[a].lastPokeId))}function a(e,t){const a=l(o);return Object.entries(e).reduce(((e,[l,o])=>(("all"===a||Number(o[t])<=s[a].lastPokeId)&&(e[l]=o),e)),{})}export{a,o as b,t as f,s as g};
