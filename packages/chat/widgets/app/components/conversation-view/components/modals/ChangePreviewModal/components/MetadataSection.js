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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function renderMetadataSection(o){var e=DomUtils.h.createDiv({cls:"patch-metadata-section",style:{marginBottom:"20px",padding:"10px",backgroundColor:"#f5f5f5",borderRadius:"4px"}});let r=document.createElement("table");r.style.width="100%",r.style.borderCollapse="collapse",r.style.fontSize="13px";return[{key:"Source-Block-UUID",label:"Source Block UUID"},{key:"Target-Block-UUID",label:"Target Block UUID"},{key:"Source-Version",label:"Source Version"},{key:"Target-Version",label:"Target Version"},{key:"Description",label:"Description"},{key:"Authors",label:"Authors"}].forEach(e=>{var t=document.createElement("tr"),l=document.createElement("td"),a=(l.style.padding="3px 10px",l.style.fontWeight="bold",l.style.width="150px",l.textContent=e.label,document.createElement("td"));a.style.padding="5px 10px",a.textContent=o[e.key]||"N/A",t.appendChild(l),t.appendChild(a),r.appendChild(t)}),e.appendChild(r),e}module.exports={renderMetadataSection:renderMetadataSection};
