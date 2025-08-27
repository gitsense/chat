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

let h=require("./DomUtils").h;function createMarkdownRenderer(n,e={},r={}){var a=require("markdown-it");let l={backgroundColor:"#fafafa",border:"1px solid #ddd",marginTop:"5px",overflow:"auto",maxHeight:"500px",...e},o={marginTop:"5px",overflow:"auto",maxHeight:"800px",...r},i=a({html:!1,highlight:function(a,t){if(t&&n.getLanguage(t))try{let e=h.createCode({html:`<span class='gs-chat-lang'>${t}</span>

`+n.highlight(a,{language:t,ignoreIllegals:!0}).value}),r=h.createPre({cls:"hljs",style:l,append:[e]});return r.outerHTML}catch(e){console.warn(e)}let e=h.createCode({html:i.utils.escapeHtml(a)}),r=h.createPre({cls:"hljs",style:o,append:[e]});return r.outerHTML}});return i.use(require("markdown-it-anchor"),{level:1}),i.use(require("markdown-it-attrs"),{allowedAttributes:["id"]}),i}function addSignature(e,r){var a=new RegExp("<p>Authored by [^<]+</p>");e.innerHTML=e.innerHTML.replace(a,"")}module.exports={createMarkdownRenderer:createMarkdownRenderer,addSignature:addSignature};
