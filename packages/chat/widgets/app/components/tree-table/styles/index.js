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

let variables=require("./base/variables"),common=require("./base/common"),mainTable=require("./layouts/mainTable"),rowActions=require("./components/rowActions"),navTable=require("./layouts/navTable"),selectionManagement=require("./components/selectionManagement");function initStyles(e,n,a=!1){var t=document.getElementById("tree-table-styles");t&&!a||(a="nav"===e?navTable:mainTable,(t=document.createElement("style")).id="tree-table-styles",e=Object.entries(a).map(([,e])=>"function"==typeof e?e(n):e).join("\n"),t.textContent=e,document.head.appendChild(t))}module.exports={variables:variables,common:common,rowActions:rowActions,mainTable:mainTable,navTable:navTable,selectionManagement:selectionManagement,initStyles:initStyles};
