import{w as e}from"./index.CnH4iqqA.js";import{x as o}from"./scheduler.CKlfITpV.js";const t=e(("undefined"!=typeof localStorage&&"true"===localStorage.getItem("audioOn"))??!1);t.subscribe((e=>{"undefined"!=typeof localStorage&&localStorage.setItem("audioOn",e.toString())}));let a=null;function n(e,o){return e.addEventListener("pointerdown",(()=>{a||(a=new Audio(o),a.play().catch((()=>{})))})),i}function i(){o(t)&&a&&a.play().catch((e=>{console.warn("Audio playback failed:",e)}))}export{t as a,n as i,i as p};
