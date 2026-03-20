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

let{deleteLoadedSelection,updateRecentSelectionName}=require("./loadedStorage.js");function createLoadedItem(t,i,n,a){let d=document.createElement("div");d.className="loaded-item",d.dataset.id=t.id;var e=document.createElement("div"),l=(e.className="loaded-item-content",document.createElement("a")),c=(l.href="#",l.className="loaded-item-link",l.textContent=getDisplayName(t),l.title=getDetailedDescription(t),l.addEventListener("click",e=>{e.preventDefault(),i(t)}),document.createElement("div")),o=(c.className="loaded-item-actions",document.createElement("button")),m=(o.className="loaded-item-edit",o.innerHTML='<i class="icon-pencil"></i>',o.title="Rename",o.addEventListener("click",e=>{e.stopPropagation(),enterEditMode(d,t,a)}),document.createElement("button"));return m.className="loaded-item-delete",m.innerHTML='<i class="icon-x"></i>',m.title="Delete",m.addEventListener("click",e=>{e.stopPropagation(),deleteLoadedSelection(t.id)&&n(t.id)}),c.appendChild(o),c.appendChild(m),e.appendChild(l),e.appendChild(c),d.appendChild(e),d}function getDisplayName(e){return e.customName||"Untitled"}function getDetailedDescription(e){var t=e.lastLoaded||e.createdAt,t=new Date(t),i=t.toLocaleDateString(),t=t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),n="file content"===e.contentType?"Files":"Overview",a=e.contentOption.charAt(0).toUpperCase()+e.contentOption.slice(1),e=e.selectedNodes.length;return n+` (${a}) - ${e} ${1===e?"item":"items"} - ${i} `+t}function enterEditMode(t,i,n){t.querySelector(".loaded-item-content").style.display="none";let a=document.createElement("form"),d=(a.className="loaded-item-edit-form",document.createElement("input"));d.type="text",d.className="loaded-item-edit-input",d.value=i.customName||getDisplayName(i);var e=document.createElement("button"),l=(e.type="submit",e.className="loaded-item-edit-save",e.innerHTML='<i class="icon-check"></i>',e.title="Save",document.createElement("button"));l.type="button",l.className="loaded-item-edit-cancel",l.innerHTML='<i class="icon-x"></i>',l.title="Cancel",a.appendChild(d),a.appendChild(e),a.appendChild(l),t.appendChild(a),d.focus(),d.select(),a.addEventListener("submit",e=>{e.preventDefault(),saveEdit(t,i,d.value,n)}),l.addEventListener("click",()=>{cancelEdit(t)}),d.addEventListener("keydown",e=>{"Escape"===e.key&&cancelEdit(t)});let c=e=>{a.contains(e.target)||(cancelEdit(t),document.removeEventListener("click",c))};setTimeout(()=>{document.addEventListener("click",c)},100)}function saveEdit(e,t,i,n){updateLoadedSelectionName(t.id,i)&&(t.customName=i,n(t),(n=e.querySelector(".loaded-item-link")).textContent=i||getDisplayName(t),n.title=getDetailedDescription(t)),exitEditMode(e)}function cancelEdit(e){exitEditMode(e)}function exitEditMode(e){var t=e.querySelector(".loaded-item-edit-form");t&&e.removeChild(t),e.querySelector(".loaded-item-content").style.display=""}module.exports={createLoadedItem:createLoadedItem,getDisplayName:getDisplayName,getDetailedDescription:getDetailedDescription};
