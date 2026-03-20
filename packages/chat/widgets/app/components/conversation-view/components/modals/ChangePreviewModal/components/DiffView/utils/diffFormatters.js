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

let{DIFF_DELETE,DIFF_INSERT,DIFF_EQUAL}=require("./diffGenerators");function convertToUnifiedDiff(e,a,i,l="file.txt"){a.split("\n"),i.split("\n");a=(new Date).toISOString().replace(/T/," ").replace(/\..+/,"");let t=`--- a/${l}	${a}
`,r=(t+=`+++ b/${l}	${a}
`,0),n=0,s=0,f=0,c=0,o=0,p=[],g=!1;var F,d,h=()=>{0!==p.length&&(t=(t+=`@@ -${s},${c} +${f},${o} @@
`)+p.join("\n")+"\n",p=[],c=0,o=0,g=!1)};for([F,d]of e){var D=d.split("\n");for(let e=0;e<D.length;e++){var T=D[e],E=e===D.length-1;if(!(E&&""===T&&0<e)){switch(F){case DIFF_DELETE:g||(g=!0,s=r+1,f=n+1),p.push("-"+T),c++,r++;break;case DIFF_INSERT:g||(g=!0,s=r+1,f=n+1),p.push("+"+T),o++,n++;break;case DIFF_EQUAL:g?(p.push(" "+T),c++,o++):0<p.length&&h(),r++,n++}100<p.length&&h()}}}return 0<p.length&&h(),t}function formatDiffsToHTML(e,a={}){var{inline:a=!1,highlightFn:l=null,language:t="plaintext"}=a;let r="";if(a){for(var[i,n]of e){var s=escapeHTML(n);switch(i){case DIFF_DELETE:r+=`<span class="diff-delete">${s}</span>`;break;case DIFF_INSERT:r+=`<span class="diff-insert">${s}</span>`;break;case DIFF_EQUAL:r+=s}}if(l&&t)try{r=l(r,{language:t,ignoreIllegals:!0}).value}catch(e){console.error(`Failed to highlight ${t} code:`,e)}}else{r='<div class="diff-container">';for(var[f,c]of e){c=escapeHTML(c);let e="",a="";switch(f){case DIFF_DELETE:e="diff-delete",a="-";break;case DIFF_INSERT:e="diff-insert",a="+";break;case DIFF_EQUAL:e="diff-equal",a=" "}let i=c;if(l&&t)try{i=l(c,{language:t,ignoreIllegals:!0}).value}catch(e){console.error(`Failed to highlight ${t} code:`,e)}r+=`<div class="diff-line ${e}">
                <span class="diff-prefix">${a}</span>
                <span class="diff-text">${i}</span>
            </div>`}r+="</div>"}return r}function escapeHTML(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}module.exports={convertToUnifiedDiff:convertToUnifiedDiff,formatDiffsToHTML:formatDiffsToHTML,escapeHTML:escapeHTML};
