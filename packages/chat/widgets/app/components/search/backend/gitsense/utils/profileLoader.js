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
 * Copyright (c) 2026 GitSense. All rights reserved.
 */

let path=require("path"),fs=require("fs"),profilesDir=path.join(__dirname,"/../profiles/"),DEBUG="TRUE"===process.env.GSC_DEBUG?.toUpperCase(),USE_DEBUG_PROFILE="TRUE"===process.env.GSC_USE_DEBUG_PROFILE?.toUpperCase();async function loadProfile(e){var t=e.profile;let o,r;if(t)r=(USE_DEBUG_PROFILE?"debug-":"")+t,o=path.join(profilesDir,r+".json");else{t=e.targets||[];r=USE_DEBUG_PROFILE?"debug.default":e.isEmptySearch||t.includes("all")||1<t.length||0===t.length?"all.default":1===t.length&&"all"!==t[0]?t[0]+".default":(console.warn("Could not determine a specific default profile based on targets. Falling back to all.default."),"all.default"),o=path.join(profilesDir,r+".json");try{await fs.promises.access(o,fs.constants.F_OK)}catch(e){throw console.error(`Default profile "${r}.json" not found.`),new Error(`Default search profile "${r}.json" not found.`)}}try{var a=(await fs.promises.readFile(o,"utf8")).replace(/\/\*\*[\s\S]*?\*\/\n*/g,"").replace(/\/\/[^\n]*/g,""),l=JSON.parse(a);let t={targetSpecific:{},topLevel:[],consolidated:new Set,emptySearchTargetSpecific:{},emptySearchConsolidated:new Set};if(l.defaults&&Array.isArray(l.defaults.output))t.consolidated=new Set(l.defaults.output),l.defaults.output.forEach(e=>t.consolidated.add(e));else if(l.defaults?.outputs&&"object"==typeof l.defaults.outputs){var s,i,p=l.defaults.outputs;for(s in p)Object.hasOwnProperty.call(p,s)&&(i=p[s],Array.isArray(i)?(t.targetSpecific[s]=i).forEach(e=>{e="object"==typeof e&&null!==e&&e.field?e.field:e;"string"==typeof e&&t.consolidated.add(e)}):"boolean"==typeof i&&!0===i&&(t.topLevel.push(s),t.consolidated.add(s)))}if(l.emptySearchOutputs&&"object"==typeof l.emptySearchOutputs){var f,n,c=l.emptySearchOutputs;for(f in c)Object.hasOwnProperty.call(c,f)&&(n=c[f],Array.isArray(n))&&(t.emptySearchTargetSpecific[f]=n).forEach(e=>{e="object"==typeof e&&null!==e&&e.field?e.field:e;"string"==typeof e&&t.emptySearchConsolidated.add(e)})}return t.emptySearchSortBy="object"==typeof l.emptySearchSortBy?l.emptySearchSortBy:null,t.consolidated=Array.from(t.consolidated),DEBUG&&(console.log("PROFILE"),console.log(JSON.stringify(l,null,2)),console.log("PARSED_OUTPUTS"),console.log(JSON.stringify(t,null,2))),{profile:l,parsedOutputs:t}}catch(e){throw console.error(`Error loading search profile "${r}":`,e),new Error(`Failed to load search profile "${r}".`)}}module.exports={loadProfile:loadProfile};
