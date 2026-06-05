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

let variables=require("./base/variables"),common=require("./base/common"),mainTable=require("./layouts/mainTable"),rowActions=require("./components/rowActions"),navTable=require("./layouts/navTable"),selectionManagement=require("./components/selectionManagement");function initStyles(e,n,a=!1){var t=document.getElementById("tree-table-styles");t&&!a||(a="nav"===e?navTable:mainTable,(t=document.createElement("style")).id="tree-table-styles",e=Object.entries(a).map(([,e])=>"function"==typeof e?e(n):e).join("\n"),t.textContent=e,document.head.appendChild(t))}module.exports={variables:variables,common:common,rowActions:rowActions,mainTable:mainTable,navTable:navTable,selectionManagement:selectionManagement,initStyles:initStyles};
