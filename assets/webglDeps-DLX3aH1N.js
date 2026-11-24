import{o as l}from"./VertexArrayObject-5mee55RS.js";import{p as x,h as g,r as y,c as h}from"./VertexArrayObject-5mee55RS.js";import{t as v}from"./ProgramCache-DI2YEl3x.js";import{eg as O}from"./index-Dmtgfku4.js";import"./VertexAttributeLocations-Kx03T9Tq.js";function p(o){let{options:e,value:t}=o;return typeof e[t]=="number"}function m(o){let e="";for(let t in o){let r=o[t];if(typeof r=="boolean")r&&(e+=`#define ${t}
`);else if(typeof r=="number")e+=`#define ${t} ${r.toFixed()}
`;else if(typeof r=="object")if(p(r)){let{value:n,options:f,namespace:a}=r,i=a?`${a}_`:"";for(let s in f)e+=`#define ${i}${s} ${f[s].toFixed()}
`;e+=`#define ${t} ${i}${n}
`}else{let n=r.options,f=0;for(let a in n)e+=`#define ${n[a]} ${(f++).toFixed()}
`;e+=`#define ${t} ${n[r.value]}
`}}return e}function d(o,e,t,r=""){return new l(o,r+e.vertexShader,r+e.fragmentShader,t)}export{x as BufferObject,l as DisposableProgram,g as FramebufferObject,v as ProgramCache,y as Renderbuffer,O as Texture,h as VertexArrayObject,d as createProgram,m as glslifyDefineMap};
