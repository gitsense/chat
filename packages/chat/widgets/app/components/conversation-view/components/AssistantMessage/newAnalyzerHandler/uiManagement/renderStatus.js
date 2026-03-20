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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,constants=require("../constants");function renderOrUpdateStatusUI(e,t,r,a,n=null){let s=DomUtils.h,d=constants.GENERATING_HEADER;n?d=n:r&&(d=constants.GENERATED_HEADER);var n=s.createDiv({}),l=(n.appendChild(s.createH1({text:d.replace(/^#\s*/,""),style:{marginBottom:"10px"}})),t.analyzerId&&n.appendChild(s.createH2({text:t.analyzerId.split("::")[0],style:{marginBottom:"10px"}})),s.createDiv({style:{marginBottom:"10px"}})),o=(n.appendChild(l),(e,t)=>{t=t?"[✓]":"[ &nbsp;]";return s.createP({html:t+` <strong>${e}</strong>`,style:{margin:"5px 0",fontSize:"14px"}})});l.appendChild(o("Role",t.roleDetected)),l.appendChild(o("Task",t.taskDetected)),l.appendChild(o("Markdown",t.markdownDetected)),l.appendChild(o("JSON",t.jsonDetected)),l.appendChild(o("User Settings",t.configDetected)),r||null==t.charactersReceived?r&&(d,constants.GENERATED_HEADER):n.appendChild(s.createP({html:"<strong>Characters received:</strong> "+t.charactersReceived,style:{color:"#666"}}));try{s.updateDOM(n,e)}catch(e){console.error("Error updating DOM with streaming status:",e)}}module.exports={renderOrUpdateStatusUI:renderOrUpdateStatusUI};
