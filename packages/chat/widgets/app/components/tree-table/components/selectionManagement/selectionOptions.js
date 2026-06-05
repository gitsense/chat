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

function createOption({id:e,label:t,checked:n,onChange:l}){var i=document.createElement("div");i.className="selection-option";let c=document.createElement("input");c.type="checkbox",c.id=e,c.checked=n,c.style.marginRight="5px",c.addEventListener("change",e=>{l(e.target.checked)});n=document.createElement("label");return n.htmlFor=e,n.textContent=t,n.addEventListener("click",e=>{e.preventDefault(),c.checked=!c.checked,l(c.checked)}),n.style.fontWeight=500,i.appendChild(c),i.appendChild(n),i.style.marginRight="12px",i}function createResetButton(e){let t=document.createElement("button");return t.className="reset-button",t.title="Reset selection options",t.setAttribute("aria-label","Reset selection options"),t.style.background="none",t.style.border="none",t.style.cursor="pointer",t.style.padding="4px",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.color="#666",t.style.transition="color 0.2s ease",t.addEventListener("mouseover",()=>{t.style.color="#000"}),t.addEventListener("mouseout",()=>{t.style.color="#666"}),t.addEventListener("click",e),t.innerText="Reset",t}function createSelectionOptions({state:t,onSelectionOptionsChange:n}){var e=document.createElement("div"),l=(e.className="selection-options-row",document.createElement("div")),i=(l.className="options-container",l.style.display="flex",l.style.flex="1",l.style.textAlign="left",t.selectionOptions||{recursiveSelection:!0,fileSelectionEnabled:!0,directorySelectionEnabled:!0}),c=createOption({id:"recursive-selection",label:"Recursive",checked:i.recursiveSelection,onChange:e=>{t.updateSelectionOptions({recursiveSelection:e}),t.setRecursiveSelection?.(e),n?.()}}),o=createOption({id:"files-selection",label:"Files",checked:i.fileSelectionEnabled,onChange:e=>{t.updateSelectionOptions({fileSelectionEnabled:e}),t.setFileSelectionEnabled?.(e),n?.()}}),i=createOption({id:"directories-selection",label:"Trees",checked:i.directorySelectionEnabled,onChange:e=>{t.updateSelectionOptions({directorySelectionEnabled:e}),t.setDirectorySelectionEnabled?.(e),n?.()}}),c=(l.appendChild(c),l.appendChild(o),l.appendChild(i),document.createElement("div")),o=(c.className="reset-container",c.style.display="flex",c.style.alignItems="center",c.style.textAlign="right",createResetButton(e=>{e.preventDefault();e={recursiveSelection:!0,fileSelectionEnabled:!0,directorySelectionEnabled:!0};t.updateSelectionOptions(e),document.getElementById("recursive-selection").checked=e.recursiveSelection,document.getElementById("files-selection").checked=e.fileSelectionEnabled,document.getElementById("directories-selection").checked=e.directorySelectionEnabled,t.setRecursiveSelection?.(e.recursiveSelection),t.setFileSelectionEnabled?.(e.fileSelectionEnabled),t.setDirectorySelectionEnabled?.(e.directorySelectionEnabled),t.clearSelections?.(),n?.()}));return c.appendChild(o),e.appendChild(l),e.appendChild(c),e}module.exports={createSelectionOptions:createSelectionOptions};
