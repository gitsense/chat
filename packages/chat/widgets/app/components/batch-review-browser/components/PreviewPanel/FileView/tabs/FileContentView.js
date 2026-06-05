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

let hljs=require("highlight.js"),{DomUtils,MarkdownUtils}=require("@gitsense/gsc-utils"),chatApi=require("../../../../dependencies").chatApi;class FileContentView{constructor(e,t,n){this.container=e,this.node=t,this.context=n,this.h=DomUtils.h}render(){this.container.innerHTML="";var e=this.h.createDiv({className:"gsc-brb-file-info",style:{display:"flex",gap:"15px"}}),t=this.node.data.file,n=this.h.createSpan({text:`Size: ${t.meta?.size||0} bytes`,style:{marginBottom:"5px"}}),i=this.h.createSpan({text:"Language: "+(t.meta?.language||"Unknown"),style:{marginBottom:"5px"}}),t=this.h.createSpan({text:"Tokens: "+(t.meta?.tokens?.content?.estimate||0),style:{marginBottom:"5px"}}),n=(e.appendChild(n),e.appendChild(i),e.appendChild(t),this.h.createDiv({className:"gsc-brb-file-content",style:{}})),i=this.h.createDiv({className:"gsc-brb-file-content-body markdown-body"});i.textContent="Loading file content...",n.appendChild(i),this.container.appendChild(e),this.container.appendChild(n),this._loadFileContent(i)}async _loadFileContent(e){var t=this.node.data.file,n=(await chatApi.getGitBlobChatMessagesByChatIds(this.context.widget,[t.id]))?.[t.id]||null;n?(t="```"+t.meta.language+"\n"+n.message.content.trimEnd()+"\n```",n=MarkdownUtils.createMarkdownRenderer(hljs).render(t),e.innerHTML=n):e.textContent="File not found"}destroy(){this.container.innerHTML=""}}module.exports={FileContentView:FileContentView};
