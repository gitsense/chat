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

let DomUtils=require("../../../../../utils/DomUtils"),renderDiffViewSelector=require("./DiffViewSelector").renderDiffViewSelector,renderSideBySideDiffView=require("./SideBySideDiffView").renderSideBySideDiffView,renderUnifiedDiffView=require("./UnifiedDiffView").renderUnifiedDiffView;function renderDiffView(e){let{fromText:i,toText:r,language:f,viewType:d="side-by-side",onViewTypeChange:t}=e;var e=DomUtils.h.createDiv({cls:"diff-view-section"}),n=(e.dataset.fromText=i,e.dataset.toText=r,e.dataset.language=f||"",renderDiffViewSelector({currentViewType:d,onViewTypeChange:e=>{t&&t(e)}})),n=(e.appendChild(n),DomUtils.h.createDiv({cls:"diff-container",style:{height:"calc(80vh - 60px)",overflow:"auto",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:"#f8f8f8"}}));e.appendChild(n);let o;switch(d){case"side-by-side":o=renderSideBySideDiffView({fromText:i,toText:r,language:f,filename:"code."+(f||"txt")});break;case"unified":o=renderUnifiedDiffView({fromText:i,toText:r,language:f,filename:"code."+(f||"txt")});break;default:o=renderSideBySideDiffView({fromText:i,toText:r,language:f,filename:"code."+(f||"txt")})}return n.appendChild(o),e}module.exports={renderDiffView:renderDiffView,renderSideBySideDiffView:renderSideBySideDiffView,renderUnifiedDiffView:renderUnifiedDiffView,renderDiffViewSelector:renderDiffViewSelector};
