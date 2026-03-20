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

let hljs=require("highlight.js"),{DomUtils,MarkdownUtils}=require("@gitsense/gsc-utils"),chatApi=require("../../../../dependencies").chatApi;class FileContentView{constructor(e,t,n){this.container=e,this.node=t,this.context=n,this.h=DomUtils.h}render(){this.container.innerHTML="";var e=this.h.createDiv({className:"gsc-brb-file-info",style:{display:"flex",gap:"15px"}}),t=this.node.data.file,n=this.h.createSpan({text:`Size: ${t.meta?.size||0} bytes`,style:{marginBottom:"5px"}}),i=this.h.createSpan({text:"Language: "+(t.meta?.language||"Unknown"),style:{marginBottom:"5px"}}),t=this.h.createSpan({text:"Tokens: "+(t.meta?.tokens?.content?.estimate||0),style:{marginBottom:"5px"}}),n=(e.appendChild(n),e.appendChild(i),e.appendChild(t),this.h.createDiv({className:"gsc-brb-file-content",style:{}})),i=this.h.createDiv({className:"gsc-brb-file-content-body markdown-body"});i.textContent="Loading file content...",n.appendChild(i),this.container.appendChild(e),this.container.appendChild(n),this._loadFileContent(i)}async _loadFileContent(e){var t=this.node.data.file,n=(await chatApi.getGitBlobChatMessagesByChatIds(this.context.widget,[t.id]))?.[t.id]||null;n?(t="```"+t.meta.language+"\n"+n.message.content.trimEnd()+"\n```",n=MarkdownUtils.createMarkdownRenderer(hljs).render(t),e.innerHTML=n):e.textContent="File not found"}destroy(){this.container.innerHTML=""}}module.exports={FileContentView:FileContentView};
