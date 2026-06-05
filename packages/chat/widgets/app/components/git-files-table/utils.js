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

let formatAge=require("@gitsense/gsc-utils").formatAge;function formatCommitAge(e){return e?(e=new Date(1e3*e),formatAge(e.toISOString())):"N/A"}function createTwoLineCell(e,t,a){var n=e.createDiv({className:"gsc-gft-two-line-cell",style:{display:"flex",flexDirection:"column",lineHeight:"1.5",padding:"5px 3px"}});let r;r="string"==typeof t?e.createSpan({text:t}):e.createSpan({append:t});let l;return(l="string"==typeof a?e.createSpan({text:a}):e.createSpan({append:a})).style.fontSize="0.85em",l.style.color="#666",n.appendChild(r),n.appendChild(l),n}module.exports={formatCommitAge:formatCommitAge,createTwoLineCell:createTwoLineCell};
