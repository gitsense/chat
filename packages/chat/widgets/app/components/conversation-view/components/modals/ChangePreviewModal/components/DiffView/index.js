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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,renderDiffViewSelector=require("./DiffViewSelector").renderDiffViewSelector,renderSideBySideDiffView=require("./SideBySideDiffView").renderSideBySideDiffView,renderUnifiedDiffView=require("./UnifiedDiffView").renderUnifiedDiffView;function renderDiffView(e){let{fromText:i,toText:r,language:f,viewType:d="side-by-side",onViewTypeChange:t}=e;var e=DomUtils.h.createDiv({cls:"diff-view-section"}),n=(e.dataset.fromText=i,e.dataset.toText=r,e.dataset.language=f||"",renderDiffViewSelector({currentViewType:d,onViewTypeChange:e=>{t&&t(e)}})),n=(e.appendChild(n),DomUtils.h.createDiv({cls:"diff-container",style:{height:"calc(80vh - 60px)",overflow:"auto",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:"#f8f8f8"}}));e.appendChild(n);let o;switch(d){case"side-by-side":o=renderSideBySideDiffView({fromText:i,toText:r,language:f,filename:"code."+(f||"txt")});break;case"unified":o=renderUnifiedDiffView({fromText:i,toText:r,language:f,filename:"code."+(f||"txt")});break;default:o=renderSideBySideDiffView({fromText:i,toText:r,language:f,filename:"code."+(f||"txt")})}return n.appendChild(o),e}module.exports={renderDiffView:renderDiffView,renderSideBySideDiffView:renderSideBySideDiffView,renderUnifiedDiffView:renderUnifiedDiffView,renderDiffViewSelector:renderDiffViewSelector};
