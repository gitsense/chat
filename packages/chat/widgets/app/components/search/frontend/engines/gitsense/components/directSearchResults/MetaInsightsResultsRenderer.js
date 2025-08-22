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

let h=require("../../../../Dependencies").h,CSS_CLASSES=require("./DirectSearchResultsUtils").CSS_CLASSES;function render(e,t){let a=h.createDiv({cls:CSS_CLASSES.TABLE_CONTAINER}),l=e.results;e=Object.keys(l);return 0===e.length?a.appendChild(h.createDiv({text:"No meta-insights results found for the current criteria.",style:{textAlign:"center",padding:"20px",color:"#666"}})):e.forEach(e=>{var{description:t,results:r}=l[e];if(r&&0!==r.length){a.appendChild(h.createH4({text:e.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()),style:{marginBottom:"10px",marginTop:"20px"}})),a.appendChild(h.createParagraph({text:t,style:{marginBottom:"12px"}}));var e=h.createTable({cls:CSS_CLASSES.TABLE,style:{width:"100%",borderCollapse:"collapse"}}),t=h.createThead(),d=h.createTr({cls:CSS_CLASSES.TABLE_HEADER});d.appendChild(h.createTh({text:"Value",style:{padding:"8px",border:"1px solid #ddd",textAlign:"left",backgroundColor:"#f2f2f2",width:"70%"}})),d.appendChild(h.createTh({text:"Count",style:{padding:"8px",border:"1px solid #ddd",textAlign:"left",backgroundColor:"#f2f2f2",width:"30%"}})),t.appendChild(d),e.appendChild(t);let l=h.createTbody();r.forEach(e=>{var t=h.createTr({cls:CSS_CLASSES.TABLE_ROW}),r="boolean"===e.type?0===e.value?"true":"false":e.value,d=h.createTd({style:{padding:"8px",border:"1px solid #ddd",verticalAlign:"top"}}),r=(d.textContent=String(r),t.appendChild(d),h.createTd({style:{padding:"8px",border:"1px solid #ddd",verticalAlign:"top"}}));r.textContent=String(e.count),t.appendChild(r),l.appendChild(t)}),e.appendChild(l),a.appendChild(e)}}),a}module.exports={render:render};
