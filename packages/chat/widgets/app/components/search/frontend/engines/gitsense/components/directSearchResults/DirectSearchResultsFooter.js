/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * Licensed under the Fair Core License, Version 1.0 (FCL-1.0-ALv2).
 * https://faircode.io
 *
 * You may use, modify, and run this software for internal, non-commercial
 * purposes including personal projects, team workflows, and self-hosted
 * deployments. You may not use this software to build or operate a product
 * or service that competes directly or indirectly with GitSense Chat.
 * Redistribution or resale is not permitted.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 *
 * For licensing inquiries, internal-use exceptions, or business use,
 * contact sales@gitsense.com
 */

let h=require("../../../../Dependencies").h,CSS_CLASSES=require("./DirectSearchResultsUtils").CSS_CLASSES;function render(e,t){var r=h.createDiv({cls:CSS_CLASSES.FOOTER,style:{marginTop:"20px",paddingTop:"15px",borderTop:"1px solid #eee",textAlign:"center"}});return 0<e.totalResults?((e=h.createButton({text:"Load All Matches into Context Builder",cls:CSS_CLASSES.BUTTON,style:{padding:"10px 20px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"5px",cursor:"pointer",fontSize:"1em"}})).addEventListener("click",e=>{e.preventDefault(),t.onLoadAllMatchesClick&&t.onLoadAllMatchesClick()}),r.appendChild(e)):r.appendChild(h.createSpan({text:"No results to load into context.",style:{color:"#666",fontSize:"0.9em"}})),r}module.exports={render:render};
