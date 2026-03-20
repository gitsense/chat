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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,MESSAGE_DRAFTER_CONSTANTS=require("../constants").MESSAGE_DRAFTER_CONSTANTS;class PreviewPanel{constructor(e,t={}){this.containerElement=e,this.config={height:t.height||MESSAGE_DRAFTER_CONSTANTS.DEFAULTS.TEXTAREA_HEIGHT,...t},this.content="",this.renderedContent="",this.elements={}}render(){this.containerElement.innerHTML="";var e=DomUtils.h.createDiv(),t=(e.className=MESSAGE_DRAFTER_CONSTANTS.CSS_CLASSES.PREVIEW_PANEL,e.style.height=this.config.height+"px",DomUtils.h.createDiv());t.className=MESSAGE_DRAFTER_CONSTANTS.CSS_CLASSES.PREVIEW_CONTENT,this.elements.container=e,this.elements.content=t,e.appendChild(t),this.containerElement.appendChild(e),this._renderContent()}getContent(){return this.content}setContent(e){this.content=e||"",this._renderContent()}getHeight(){return this.elements.container?parseInt(this.elements.container.style.height,10):this.config.height}setHeight(e){e=Math.max(MESSAGE_DRAFTER_CONSTANTS.DEFAULTS.MIN_TEXTAREA_HEIGHT,Math.min(e,MESSAGE_DRAFTER_CONSTANTS.DEFAULTS.MAX_TEXTAREA_HEIGHT));this.config.height=e,this.elements.container&&(this.elements.container.style.height=e+"px")}show(){this.containerElement&&(this.containerElement.style.display="block")}hide(){this.containerElement&&(this.containerElement.style.display="none")}cleanup(){this.containerElement&&(this.containerElement.innerHTML=""),this.elements={}}_renderContent(){this.elements.content&&(this.renderedContent=this._markdownToHtml(this.content),this.elements.content.innerHTML=this.renderedContent)}_markdownToHtml(e){if(!e)return"<p><em>Nothing to preview</em></p>";let t=e;return t=(t=(t=`<p>${t=(t=(t=(t=(t=(t=(t=(t=(t=t.replace(/^### (.*$)/gim,"<h3>$1</h3>")).replace(/^## (.*$)/gim,"<h2>$1</h2>")).replace(/^# (.*$)/gim,"<h1>$1</h1>")).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")).replace(/\*(.+?)\*/g,"<em>$1</em>")).replace(/```(\w+)?\n([\s\S]*?)```/g,'<pre><code class="language-$1">$2</code></pre>')).replace(/`([^`]+)`/g,"<code>$1</code>")).replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank">$1</a>')).replace(/\n\n/g,"</p><p>")}</p>`).replace(/<p><\/p>/g,"")).replace(/<p>(\s+)<\/p>/g,"")}}module.exports=PreviewPanel;
