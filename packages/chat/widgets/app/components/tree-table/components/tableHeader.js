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

let zapSvg=require("../constants.js").zapSvg;function createTableHeader({columns:e,dayBreakGroup:t=""}){var a=document.createElement("thead");let n=document.createElement("tr");var d=document.createElement("th");return d.textContent=t||"",e[0]?.width&&(d.style.width=e[0].width),n.appendChild(d),e.slice(1).forEach(e=>{var t;e.visible&&(t=document.createElement("th"),"actions_menu"===e.key?t.textContent=e.label||"Actions":t.textContent=e.label||"",e.width&&(t.style.width=e.width),t.setAttribute("data-column",e.key),n.appendChild(t))}),a.appendChild(n),a}module.exports={createTableHeader:createTableHeader};
