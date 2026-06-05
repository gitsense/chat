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

let updateRow=require("./row/tableRow").updateRow,chevronDownSvg=require("../constants").chevronDownSvg;function setupDynamicUpdates(e){let{container:t,state:d,decorator:r}=e;d.clearUpdateInterval();e=setInterval(()=>{t.querySelectorAll("tbody tr").forEach(e=>{let t=e.dataset.id;var a=d.getData().find(e=>e.id==t);a&&updateRow(e,{node:a,decorator:r})})},1e3);d.setUpdateInterval(e)}function expandAllNodesWithChildren(e){let{container:a,state:d}=e;d.expandAllNodesWithChildren(),a.querySelectorAll("tr").forEach(e=>{var t=e.dataset.id;d.isNodeExpanded(t)&&(e=e.querySelector(".expand-button"))&&("collapsed"===e.dataset.state||"false"===e.dataset.expanded)&&(e.innerHTML=chevronDownSvg,e.dataset.state="expanded",e.dataset.expanded="true",a.querySelectorAll(`tr[data-parent="${t}"]`).forEach(e=>e.classList.remove("hidden")))})}module.exports={setupDynamicUpdates:setupDynamicUpdates,expandAllNodesWithChildren:expandAllNodesWithChildren};
