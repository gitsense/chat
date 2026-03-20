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

let h=require("../../../../Dependencies").h,CSS_CLASSES=require("./DirectSearchResultsUtils").CSS_CLASSES;function render(e,t){var r=h.createDiv({cls:CSS_CLASSES.FOOTER,style:{marginTop:"20px",paddingTop:"15px",borderTop:"1px solid #eee",textAlign:"center"}});return 0<e.totalResults?((e=h.createButton({text:"Load All Matches into Context Builder",cls:CSS_CLASSES.BUTTON,style:{padding:"10px 20px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"5px",cursor:"pointer",fontSize:"1em"}})).addEventListener("click",e=>{e.preventDefault(),t.onLoadAllMatchesClick&&t.onLoadAllMatchesClick()}),r.appendChild(e)):r.appendChild(h.createSpan({text:"No results to load into context.",style:{color:"#666",fontSize:"0.9em"}})),r}module.exports={render:render};
