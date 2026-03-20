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

let formatAge=require("@gitsense/gsc-utils").formatAge;function formatCommitAge(e){return e?(e=new Date(1e3*e),formatAge(e.toISOString())):"N/A"}function createTwoLineCell(e,t,a){var n=e.createDiv({className:"gsc-gft-two-line-cell",style:{display:"flex",flexDirection:"column",lineHeight:"1.5",padding:"5px 3px"}});let r;r="string"==typeof t?e.createSpan({text:t}):e.createSpan({append:t});let l;return(l="string"==typeof a?e.createSpan({text:a}):e.createSpan({append:a})).style.fontSize="0.85em",l.style.color="#666",n.appendChild(r),n.appendChild(l),n}module.exports={formatCommitAge:formatCommitAge,createTwoLineCell:createTwoLineCell};
