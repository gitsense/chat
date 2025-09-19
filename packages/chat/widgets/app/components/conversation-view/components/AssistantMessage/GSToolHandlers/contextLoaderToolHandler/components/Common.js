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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let DomUtils=require("../../../../../utils/DomUtils");function createContainer(e){var t,r=e.container?.style||{},i=DomUtils.h.createDiv({cls:"context-loader-container",style:{textAlign:"left",marginTop:"10px"}});for(t in r)i.style[t]=r[t];return i}function createHeader(e,t=2){if(isNaN(t))throw new Error("Size is not a number, it is a ${(typeof size)}");var e=e?.text||"[No Header Text]",r=1===t?DomUtils.h.createH1():2===t?DomUtils.h.createH2():3===t?DomUtils.h.createH3():null;if(r)return r.innerText=e,r;throw new Error("Unsupported header size "+t)}module.exports={createContainer:createContainer,createHeader:createHeader};
