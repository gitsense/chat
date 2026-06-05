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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function renderMetadataSection(o){var e=DomUtils.h.createDiv({cls:"patch-metadata-section",style:{marginBottom:"20px",padding:"10px",backgroundColor:"#f5f5f5",borderRadius:"4px"}});let r=document.createElement("table");r.style.width="100%",r.style.borderCollapse="collapse",r.style.fontSize="13px";return[{key:"Source-Block-UUID",label:"Source Block UUID"},{key:"Target-Block-UUID",label:"Target Block UUID"},{key:"Source-Version",label:"Source Version"},{key:"Target-Version",label:"Target Version"},{key:"Description",label:"Description"},{key:"Authors",label:"Authors"}].forEach(e=>{var t=document.createElement("tr"),l=document.createElement("td"),a=(l.style.padding="3px 10px",l.style.fontWeight="bold",l.style.width="150px",l.textContent=e.label,document.createElement("td"));a.style.padding="5px 10px",a.textContent=o[e.key]||"N/A",t.appendChild(l),t.appendChild(a),r.appendChild(t)}),e.appendChild(r),e}module.exports={renderMetadataSection:renderMetadataSection};
