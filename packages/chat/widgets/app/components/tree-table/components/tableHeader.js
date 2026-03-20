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

let zapSvg=require("../constants.js").zapSvg;function createTableHeader({columns:e,dayBreakGroup:t=""}){var a=document.createElement("thead");let n=document.createElement("tr");var d=document.createElement("th");return d.textContent=t||"",e[0]?.width&&(d.style.width=e[0].width),n.appendChild(d),e.slice(1).forEach(e=>{var t;e.visible&&(t=document.createElement("th"),"actions_menu"===e.key?t.textContent=e.label||"Actions":t.textContent=e.label||"",e.width&&(t.style.width=e.width),t.setAttribute("data-column",e.key),n.appendChild(t))}),a.appendChild(n),a}module.exports={createTableHeader:createTableHeader};
