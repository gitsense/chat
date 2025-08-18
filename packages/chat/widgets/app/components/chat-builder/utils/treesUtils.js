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

let fs=require("fs"),path=require("path"),crypto=require("crypto");function processDirectory(e,r){var s={name:path.basename(e),config:null,messages:r?[]:null,kids:[]};let t=fs.readdirSync(e);var n,a=t.filter(e=>!e.match(/^\d+.md$/)),o=t.filter(e=>e.match(/^\d+.md/)).sort((e,r)=>parseInt(e.split(".")[0],10)-parseInt(r.split(".")[0],10)),i=new Set;for(n of t=[...a,...o])if(!n.match(/\.swp$/)){var c=path.join(e,n);if(fs.statSync(c).isDirectory()){var d=processDirectory(c,r);if(i.has(d.name))throw new Error(`Duplicate directory name found: ${d.name} in `+e);i.add(d.name),s.kids.push(d)}else"config.json"===n?s.config=JSON.parse(fs.readFileSync(c,"utf8")):n.match(/\d+.md/)&&r&&s.messages.push(fs.readFileSync(c,"utf8"))}return 0<s.kids.length&&s.kids.sort((e,r)=>(e.config?.order||0)-(r.config?.order||0)),s}function treesToJson(e,r=!1){try{return processDirectory(e,r).kids}catch(e){throw console.error(e.message),e}}function generateShortId(){return Math.random().toString(36).substring(2,8)}function deepCopy(e){return JSON.parse(JSON.stringify(e))}function prepareIsolatedTree(e,t){e=deepCopy(e);let o=new Map,i=new Map,n=new Map;return function r(s){if(s.name){let e=crypto.randomUUID();s.uuid=e,o.set(s.name,e),s.config&&s.config.name&&i.set(s.config.name,e)}s.kids&&Array.isArray(s.kids)&&s.kids.forEach(e=>r(e))}(e),function r(s){s.messages&&Array.isArray(s.messages)&&s.messages.forEach((e,r)=>{e=(e=(e=t?e.replace(/{{base-uri}}/g,t):e).replace(/\[([^\]]+)\]\(\{\{(([^\|]+)\|)?chat-uuid-link\}\}\)/g,(e,r,s,t)=>{let n=t||r,a=o.get(n);return(a=a||i.get(n))?`[${r}](/?chat=${a})`:(console.warn(`Warning: Could not find UUID for tree name '${n}' in placeholder: `+e),e)})).replace(/\{\{short-id-([0-9]+)\}\}/g,(e,r)=>{let s="short-id-"+r;return n.has(s)||n.set(s,generateShortId()),n.get(s)}),s.messages[r]=e});s.kids&&Array.isArray(s.kids)&&s.kids.forEach(e=>r(e))}(e),e}module.exports={treesToJson:treesToJson,prepareIsolatedTree:prepareIsolatedTree};
