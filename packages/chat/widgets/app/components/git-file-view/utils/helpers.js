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

let{formatTokens,formatAge,normalizeLanguageName,DomUtils}=require("@gitsense/gsc-utils"),CSS_CLASSES=require("../constants").CSS_CLASSES;function createTwoLineCell(e,t){var n=DomUtils.h.createDiv({className:CSS_CLASSES.TWO_LINE_CELL,style:{display:"flex",flexDirection:"column",lineHeight:"1.5",padding:"5px 3px"}});let r;"string"==typeof e?r=DomUtils.h.createSpan({text:e}):(r=DomUtils.h.createSpan()).appendChild(e);let o;return"string"==typeof t?o=DomUtils.h.createSpan({text:t}):(o=DomUtils.h.createSpan()).appendChild(t),o.style.fontSize="0.85em",o.style.color="#666",n.appendChild(r),n.appendChild(o),n}function formatCommitAge(e){return e?(e=new Date(1e3*e),formatAge(e.toISOString())):"N/A"}function calculateLineCount(e){return e?e.split("\n").length:0}function estimateTokenCount(e){var t;return e?(t=require("@gitsense/gsc-utils").LLMUtils,t.estimateTokens(e)):0}function prepareContentForRendering(e,t){return`\`\`\`${t||"text"}
${e}
\`\`\``}function createLink(e,t,n={}){return DomUtils.h.createLink({href:"#",text:e,style:{cursor:"pointer",color:"#007bff",textDecoration:"none",...n},onclick:e=>{e.preventDefault(),t&&t()}})}function createButton(e,t,n={}){return DomUtils.h.createButton({text:e,style:{padding:"6px 12px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"14px",...n},onclick:e=>{e.preventDefault(),t&&t()}})}module.exports={createTwoLineCell:createTwoLineCell,formatCommitAge:formatCommitAge,calculateLineCount:calculateLineCount,estimateTokenCount:estimateTokenCount,prepareContentForRendering:prepareContentForRendering,createLink:createLink,createButton:createButton};
