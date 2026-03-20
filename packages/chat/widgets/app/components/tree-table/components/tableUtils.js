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

let updateRow=require("./row/tableRow").updateRow,chevronDownSvg=require("../constants").chevronDownSvg;function setupDynamicUpdates(e){let{container:t,state:d,decorator:r}=e;d.clearUpdateInterval();e=setInterval(()=>{t.querySelectorAll("tbody tr").forEach(e=>{let t=e.dataset.id;var a=d.getData().find(e=>e.id==t);a&&updateRow(e,{node:a,decorator:r})})},1e3);d.setUpdateInterval(e)}function expandAllNodesWithChildren(e){let{container:a,state:d}=e;d.expandAllNodesWithChildren(),a.querySelectorAll("tr").forEach(e=>{var t=e.dataset.id;d.isNodeExpanded(t)&&(e=e.querySelector(".expand-button"))&&("collapsed"===e.dataset.state||"false"===e.dataset.expanded)&&(e.innerHTML=chevronDownSvg,e.dataset.state="expanded",e.dataset.expanded="true",a.querySelectorAll(`tr[data-parent="${t}"]`).forEach(e=>e.classList.remove("hidden")))})}module.exports={setupDynamicUpdates:setupDynamicUpdates,expandAllNodesWithChildren:expandAllNodesWithChildren};
