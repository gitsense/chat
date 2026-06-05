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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function createContainer(e){var t,r=e.container?.style||{},i=DomUtils.h.createDiv({cls:"context-loader-container",style:{textAlign:"left",marginTop:"10px"}});for(t in r)i.style[t]=r[t];return i}function createHeader(e,t=2){if(isNaN(t))throw new Error("Size is not a number, it is a ${(typeof size)}");var e=e?.text||"[No Header Text]",r=1===t?DomUtils.h.createH1():2===t?DomUtils.h.createH2():3===t?DomUtils.h.createH3():null;if(r)return r.innerText=e,r;throw new Error("Unsupported header size "+t)}module.exports={createContainer:createContainer,createHeader:createHeader};
