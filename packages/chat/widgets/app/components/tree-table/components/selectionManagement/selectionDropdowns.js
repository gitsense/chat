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

let optionsMap=require("./selectionConfig").optionsMap;function createSelectionDropdowns({state:o,onDropdownChange:t}){var e=document.createElement("div");e.className="selection-dropdowns-row";let n=document.createElement("select");n.id="insights-type-select";[{value:"file content",label:"File content"}].forEach(e=>{var t=document.createElement("option");t.value=e.value,t.textContent=e.label,e.value===o.selectionOptions.selectedType&&(t.selected=!0),n.appendChild(t)});let l=document.createElement("select");function c(n){l.innerHTML="",optionsMap[n].forEach(e=>{var t=document.createElement("option");t.value=e.value,t.textContent=e.label,e.value===o.selectionOptions.selectedOption&&n===o.selectionOptions.selectedType&&(t.selected=!0),l.appendChild(t)})}return l.id="insights-options-select",c(o.selectionOptions.selectedType),e.appendChild(l),n.addEventListener("change",()=>{var e=n.value;o.updateSelectionOptions({selectedType:e}),c(e),t?.()}),l.addEventListener("change",()=>{o.updateSelectionOptions({selectedOption:l.value}),t?.()}),{element:e,update:()=>{n.value=o.selectionOptions.selectedType,c(o.selectionOptions.selectedType),l.value=o.selectionOptions.selectedOption}}}module.exports={createSelectionDropdowns:createSelectionDropdowns};
