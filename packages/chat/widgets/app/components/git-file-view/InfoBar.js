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

let{formatTokens,normalizeLanguageName}=require("@gitsense/gsc-utils"),formatCommitAge=require("./utils/helpers").formatCommitAge,CSS_CLASSES=require("./constants").CSS_CLASSES;class InfoBar{constructor(t){this.container=t,this.h=require("@gitsense/gsc-utils").DomUtils.h}render(t){this.container.innerHTML="";var e=this.h.createDiv({className:CSS_CLASSES.INFO_BAR,style:{marginBottom:"10px",color:"#333",fontSize:"0.9em"}}),{contextOrigin:n,language:r,metadata:o}=t.data,i="patch"===t.type,t="context-file"===t.type,s=[];t&&n&&s.push("<strong>Origin:</strong> "+("working-directory"===n?"Working Directory":"Imported")),s.push("<strong>Language:</strong> "+(i?"GitSense Chat Patch":normalizeLanguageName(r||"unknown"))),s.push("<strong>Tokens:</strong> "+formatTokens(o.metrics.tokens)),s.push("<strong>Lines:</strong> "+o.metrics.lines.toLocaleString()),t&&o.commit&&(n=formatCommitAge(o.commit.timestamp),i=o.commit.author||"Unknown",s.push(`<strong>Committed:</strong> ${n} by `+i)),e.innerHTML=s.join(' <span style="color: #ccc;margin-left:8px;margin-right:8px;"></span> '),this.container.appendChild(e)}destroy(){this.container.innerHTML=""}}module.exports={InfoBar:InfoBar};
