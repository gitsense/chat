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

let s={capFirstLetter:t=>t.split(" ").map(t=>t.charAt(0).toUpperCase()+t.substring(1)).join(" "),truncate:(t,r=3,e=500)=>{if("string"!=typeof t)return"";var n=t.trim().split("\n");let i=0;var s=[];for(let t=0;t<Math.min(r,n.length);t++){var a=n[t].trim(),l=e-i;if(l<=0)break;s.push(a.substring(0,l)),i+=a.length+(t<2?1:0)}return s.join("\n")+(t.length>e?"...":"")}};module.exports=s;
