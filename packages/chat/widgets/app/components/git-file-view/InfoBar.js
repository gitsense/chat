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

let{formatTokens,normalizeLanguageName}=require("@gitsense/gsc-utils"),formatCommitAge=require("./utils/helpers").formatCommitAge,CSS_CLASSES=require("./constants").CSS_CLASSES;class InfoBar{constructor(t){this.container=t,this.h=require("@gitsense/gsc-utils").DomUtils.h}render(t){this.container.innerHTML="";var e=this.h.createDiv({className:CSS_CLASSES.INFO_BAR,style:{marginBottom:"10px",color:"#333",fontSize:"0.9em"}}),{contextOrigin:n,language:r,metadata:o}=t.data,i="patch"===t.type,t="context-file"===t.type,s=[];t&&n&&s.push("<strong>Origin:</strong> "+("working-directory"===n?"Working Directory":"Imported")),s.push("<strong>Language:</strong> "+(i?"GitSense Chat Patch":normalizeLanguageName(r||"unknown"))),s.push("<strong>Tokens:</strong> "+formatTokens(o.metrics.tokens)),s.push("<strong>Lines:</strong> "+o.metrics.lines.toLocaleString()),t&&o.commit&&(n=formatCommitAge(o.commit.timestamp),i=o.commit.author||"Unknown",s.push(`<strong>Committed:</strong> ${n} by `+i)),e.innerHTML=s.join(' <span style="color: #ccc;margin-left:8px;margin-right:8px;"></span> '),this.container.appendChild(e)}destroy(){this.container.innerHTML=""}}module.exports={InfoBar:InfoBar};
