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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function renderErrorSection(r){var e=DomUtils.h.createDiv({cls:"patch-error-section",style:{marginBottom:"20px",padding:"10px",backgroundColor:"#fff0f0",borderRadius:"4px",border:"1px solid #ffcccc"}}),t=DomUtils.h.createH3({text:"Patch Validation Errors",style:{color:"#cc0000",marginTop:0,marginBottom:"10px"}});e.appendChild(t);let o=DomUtils.h.createUL({style:{margin:0,paddingLeft:"20px"}});return r.forEach(r=>{r=DomUtils.h.createLi({text:r,style:{marginBottom:"5px"}});o.appendChild(r)}),e.appendChild(o),e}module.exports={renderErrorSection:renderErrorSection};
