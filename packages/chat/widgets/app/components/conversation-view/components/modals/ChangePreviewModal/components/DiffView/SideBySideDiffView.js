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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,jsdiff=require("diff"),Diff2Html=require("diff2html");function renderSideBySideDiffView(e){var{fromText:e,toText:r,language:i,filename:t="file."+(i||"txt")}=e,l=DomUtils.h.createDiv({cls:"side-by-side-diff-view"});try{var o=jsdiff.createTwoFilesPatch("a/"+t,"b/"+t,e,r,"","",{context:3}),d={drawFileList:!1,matching:"lines",outputFormat:"side-by-side",renderNothingWhenEmpty:!1,matchWordsThreshold:.25,matchingMaxComparisons:2500,maxLineSizeInBlockForComparison:200,maxLineLengthHighlight:1e4,diffStyle:"word"},n=(i&&(d.language=i),Diff2Html.html(o,d)),f=DomUtils.h.createDiv({cls:"d2h-wrapper",style:{margin:"0",padding:"0",transform:"translateZ(0)"}});f.innerHTML=n,applyDiff2HtmlStyling(f),l.appendChild(f)}catch(e){console.error("Error rendering side-by-side diff:",e);t=DomUtils.h.createDiv({cls:"diff-error",style:{padding:"20px",color:"#cc0000",textAlign:"center"},text:"Error rendering diff: "+e.message});l.appendChild(t)}return l}function applyDiff2HtmlStyling(e){e.querySelectorAll(".d2h-diff-table").forEach(e=>{e.style.lineHeight=1.5,e.style.fontSize=12.5}),e.querySelectorAll(".d2h-code-line-ctn").forEach(e=>{e.style.whiteSpace="pre",e.style.wordBreak="keep-all",e.style.overflow="auto"}),e.querySelectorAll(".d2h-code-linenumber").forEach(e=>{e.style.backgroundColor="#f8f8f8",e.style.borderRight="1px solid #eee",e.style.color="#999",e.style.textAlign="right",e.style.width="40px"}),e.querySelectorAll(".d2h-deletion").forEach(e=>{e.style.backgroundColor="#ffeeee"}),e.querySelectorAll(".d2h-insertion").forEach(e=>{e.style.backgroundColor="#eeffee"}),e.querySelectorAll(".d2h-file-header").forEach(e=>{e.style.padding="5px 10px",e.style.fontSize="14px"})}module.exports={renderSideBySideDiffView:renderSideBySideDiffView};
