function c(){return{credentials:"same-origin"}}async function l(e,a,t){try{const n=await e(a,t);if(!n.ok)throw console.error("API response:",n.status),new Error(`Failed to fetch: ${t.method} ${a}`);return n}catch(n){throw console.error("API error:",n),new Error(`Failed to fetch: ${t.method} ${a}`)}}async function f(e,a){const t=`https://pokeapi.co/api/v2/pokemon/${a}`;return d(e,t)}async function d(e,a){const n={...c(),method:"GET"};return await(await l(e,a,n)).json()}async function m(e,a){const n={...c(),method:"GET"};return await(await l(e,a,n)).json()}async function b(e,a){const t=`https://pokeapi.co/api/v2/type/${a}`;return i(e,t)}async function i(e,a){const n={...c(),method:"GET"};return await(await l(e,a,n)).json()}var h=(e=>(e.Normal="normal",e.Fighting="fighting",e.Flying="flying",e.Poison="poison",e.Ground="ground",e.Rock="rock",e.Bug="bug",e.Ghost="ghost",e.Steel="steel",e.Fire="fire",e.Water="water",e.Grass="grass",e.Electric="electric",e.Psychic="psychic",e.Ice="ice",e.Dragon="dragon",e.Dark="dark",e.Fairy="fairy",e.Unknown="unknown",e))(h||{});function u(e){var a;return{id:e.id,enName:e.name,jaName:((a=e.names.find(t=>t.language.name==="ja"))==null?void 0:a.name)??"???",damageRelations:{doubleDamageFrom:e.damage_relations.double_damage_from.map(t=>t.name),doubleDamageTo:e.damage_relations.double_damage_to.map(t=>t.name),halfDamageFrom:e.damage_relations.half_damage_from.map(t=>t.name),halfDamageTo:e.damage_relations.half_damage_to.map(t=>t.name),noDamageFrom:e.damage_relations.no_damage_from.map(t=>t.name),noDamageTo:e.damage_relations.no_damage_to.map(t=>t.name)}}}function g(e){let a=[];if(typeof e=="object"&&e!==null)for(const t in e){const n=e[t];typeof n=="string"?a.push(n):typeof n=="object"&&n!==null&&(a=a.concat(g(n)))}return a}function _(e){let a=g(e);return e.front_default&&(a=[e.front_default,...a.filter(t=>t!==e.front_default)]),a}function w(e){const a={};return e.forEach(t=>{switch(t.stat.name){case"hp":a.hp=t.base_stat;break;case"attack":a.attack=t.base_stat;break;case"defense":a.defense=t.base_stat;break;case"special-attack":a.specialAttack=t.base_stat;break;case"special-defense":a.specialDefense=t.base_stat;break;case"speed":a.speed=t.base_stat;break}}),a}function p(e,a,t,n){var r,s;return{id:e.id,enName:e.species.name,jaName:((r=a.names.find(o=>o.language.name==="ja"))==null?void 0:r.name)??"???",imageUrl:e.sprites.front_default,gifUrl:e.sprites.other.showdown.front_default,imageUrlArray:_(e.sprites),jaGenus:((s=a.genera.find(o=>o.language.name==="ja"))==null?void 0:s.genus)??"???",type1:u(t),type2:n?u(n):null,height:e.height,weight:e.weight,stats:w(e.stats)}}function k(e){var a;return{jaName:e.jaName,imageUrl:e.imageUrl,gifUrl:e.gifUrl,type1Name:e.type1.enName,type2Name:((a=e.type2)==null?void 0:a.enName)??null,height:e.height,weight:e.weight,stats:e.stats}}async function y(e,a){const t=await f(e,a),n=await m(e,t.species.url),r=await i(e,t.types[0].type.url),s=t.types[1]?await i(e,t.types[1].type.url):null;return p(t,n,r,s)}export{h as T,u as a,k as c,b as g,y as m};