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

let optionsMap=require("./selectionConfig").optionsMap;function createSelectionDropdowns({state:o,onDropdownChange:t}){var e=document.createElement("div");e.className="selection-dropdowns-row";let n=document.createElement("select");n.id="insights-type-select";[{value:"file content",label:"File content"}].forEach(e=>{var t=document.createElement("option");t.value=e.value,t.textContent=e.label,e.value===o.selectionOptions.selectedType&&(t.selected=!0),n.appendChild(t)});let l=document.createElement("select");function c(n){l.innerHTML="",optionsMap[n].forEach(e=>{var t=document.createElement("option");t.value=e.value,t.textContent=e.label,e.value===o.selectionOptions.selectedOption&&n===o.selectionOptions.selectedType&&(t.selected=!0),l.appendChild(t)})}return l.id="insights-options-select",c(o.selectionOptions.selectedType),e.appendChild(l),n.addEventListener("change",()=>{var e=n.value;o.updateSelectionOptions({selectedType:e}),c(e),t?.()}),l.addEventListener("change",()=>{o.updateSelectionOptions({selectedOption:l.value}),t?.()}),{element:e,update:()=>{n.value=o.selectionOptions.selectedType,c(o.selectionOptions.selectedType),l.value=o.selectionOptions.selectedOption}}}module.exports={createSelectionDropdowns:createSelectionDropdowns};
