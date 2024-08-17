function x(){return Matter.Engine.create({enableSleeping:!0,positionIterations:6,velocityIterations:4,constraintIterations:6})}function h(){return Matter.Runner.create()}function M(n,t){return Matter.Render.create({element:t,engine:n,options:{width:t.clientWidth,height:t.clientHeight,pixelRatio:1,background:"transparent",hasBounds:!1,wireframes:!1,showSleeping:!1}})}function p(n,t){const o=Matter.Mouse.create(t.canvas);return t.mouse=o,Matter.MouseConstraint.create(n,{mouse:o,constraint:{stiffness:.2,damping:0,length:0,render:{visible:!1,lineWidth:2,strokeStyle:"#00ff00"}}})}async function w(n){const t=n.clientWidth,o=n.clientHeight;function e(c,s,i,r){return[{x:c/2-r,y:-i/2,w:c+r*2,h:i},{x:c/2-r,y:s+i/2,w:c+r*2,h:i},{x:-i/2,y:s/2-r,w:i,h:s+r*2},{x:c+i/2,y:s/2-r,w:i,h:s+r*2}]}const a=e(t,o,2e3,0).map(c=>Matter.Bodies.rectangle(c.x,c.y,c.w,c.h,{isStatic:!0,render:{visible:!1}}));return Matter.Composite.add(Matter.Composite.create(),a)}function b(n,t,o,e){function a(){e.isHolding=!0,Matter.World.add(n,t)}function c(){e.isHolding=!1,Matter.World.remove(n,t)}function s(){e.isHolding=!1,t.constraint.bodyA=null,t.constraint.bodyB=null,t.mouse.position={x:-1,y:-1},Matter.World.remove(n,t)}function i(r){const u=o.getBoundingClientRect();(r.clientX<u.left||r.clientX>u.right||r.clientY<u.top||r.clientY>u.bottom)&&Matter.World.remove(n,t)}return{pointerdown:a,pointerup:c,pointerleave:s,pointermove:i}}async function l(n,t){const o=await d(n),e=f(o),a=g(e,o.width,o.height),c=y(a);return m(c,t)}async function d(n){return new Promise((t,o)=>{const e=new Image;e.crossOrigin="Anonymous",e.src=n,e.onload=()=>t(e),e.onerror=a=>o(a)})}function f(n){const{width:t,height:o}=n,e=document.createElement("canvas");e.width=t,e.height=o;const a=e.getContext("2d");if(!a)throw new Error("Canvas context could not be obtained");return a.drawImage(n,0,0,t,o),a.getImageData(0,0,t,o).data}function g(n,t,o){const e=[],a=new Set;function c(i,r){const u=(r*t+i)*4;return n[u+3]===0}function s(i,r){const u=`${i},${r}`;a.has(u)||(e.push({x:i,y:r}),a.add(u))}for(let i=0;i<o;i++)for(let r=0;r<t;r++)c(r,i)||((i===0||c(r,i-1))&&s(r,i),(i===o-1||c(r,i+1))&&s(r,i),(r===0||c(r-1,i))&&s(r,i),(r===t-1||c(r+1,i))&&s(r,i));return e}function y(n){const t=n.reduce((e,a)=>(e.x+=a.x,e.y+=a.y,e),{x:0,y:0});t.x/=n.length,t.y/=n.length;const o=n.map(e=>{const a=Math.atan2(e.y-t.y,e.x-t.x);return{...e,angle:a}});return o.sort((e,a)=>e.angle-a.angle),o.map(e=>({x:e.x,y:e.y}))}function m(n,t){const o=n.reduce((a,c)=>a+c.x,0)/n.length,e=n.reduce((a,c)=>a+c.y,0)/n.length;return n.map(a=>({x:o+(a.x-o)*t,y:e+(a.y-e)*t}))}async function W(n,t,o){const e=await l(n,t*.9);return Matter.Bodies.fromVertices(o.x,o.y,[e],{restitution:.2,friction:.1,density:.001,render:{sprite:{texture:n,xScale:t,yScale:t}}})}export{h as a,M as b,p as c,w as d,b as e,W as f,x as i};
