/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * This software is permitted for internal use and modification.
 * Copying for profit or redistribution is strictly not permitted.
 *
 * The Fair License, which formalizes these terms, will be adopted as the official license in the future.
 * Once finalized, the unminified source code will be freely available for internal use for non-
 * commercial purposes.
 *
 * This software may not be used to develop or enhance any product or service that competes
 * directly or indirectly with GitSense Chat without explicit permission.
 *
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let fs=require("fs").promises,path=require("path");async function buildAnalyzeMenuOptions(a){if(!a||"string"!=typeof a)throw new Error("basePath argument is required and must be a string.");let m=[],p=[],c=[],d=[],h=new Set;return await async function e(t,n,i=null){try{for(let a of await fs.readdir(t,{withFileTypes:!0})){var r=path.join(t,a.name);if(a.isDirectory()&&!(f=a.name).startsWith("_")&&!f.includes(".")&&/^[a-zA-Z0-9_-]+$/.test(f)){var s=(await(async e=>{var a=path.join(e,"config.json");try{var t=await fs.readFile(a,"utf8");return JSON.parse(t)}catch(a){return"ENOENT"!==a.code&&d.push(`Failed to parse config.json in ${e}: `+a.message),null}})(r))?.label||a.name,o=a.name,l={label:s,name:o};if(0===n)m.push(l),await e(r,n+1,o);else if(1===n)p.push(l),await e(r,n+1,i);else if(2===n){if(i&&i.startsWith("tutorial-")){var u=path.join(r,"1.md");try{if((await fs.stat(u)).mtime.getTime()<Date.now()-36e5){h.add(i);continue}}catch(a){if("ENOENT"!==a.code)throw a;h.add(i);continue}}c.push(l)}}}}catch(a){d.push(`Failed to read directory ${t}: `+a.message)}var f}(a,0,null),{analyzer:Array.from(new Map(m.filter(a=>!h.has(a.name)).map(a=>[a.name,a])).values()),content:Array.from(new Map(p.map(a=>[a.name,a])).values()),instructions:Array.from(new Map(c.map(a=>[a.name,a])).values()),warnings:0<d.length?d:void 0}}module.exports={buildAnalyzeMenuOptions:buildAnalyzeMenuOptions};
