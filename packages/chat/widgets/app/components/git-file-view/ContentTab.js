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

let{DomUtils,createMarkdownRenderer}=require("@gitsense/gsc-utils"),InfoBar=require("./InfoBar").InfoBar,prepareContentForRendering=require("./utils/helpers").prepareContentForRendering,{CSS_CLASSES,DEFAULTS}=require("./constants"),CopyButton=require("../ui/button").CopyButton;class ContentTab{constructor(t,e={}){this.container=t,this.options={showCopyButton:void 0!==e.showCopyButton?e.showCopyButton:DEFAULTS.SHOW_COPY_BUTTON,showLineNumbers:void 0!==e.showLineNumbers?e.showLineNumbers:DEFAULTS.SHOW_LINE_NUMBERS,maxHeight:e.maxHeight||DEFAULTS.MAX_HEIGHT},this.infoBar=null,this.copyButton=null,this.h=DomUtils.h,this.markdownRenderer=this._initMarkdownRenderer()}_initMarkdownRenderer(){var t={maxHeight:this.options.maxHeight,overflow:"none"===this.options.maxHeight?"visible":"auto",backgroundColor:"#fafafa",border:"1px solid #ddd",marginTop:"5px",padding:"15px"},e=require("highlight.js");return createMarkdownRenderer(e,t,t)}render(t){this.container.innerHTML="";var e=this.h.createDiv(),{content:e,language:t}=(this.container.appendChild(e),this.infoBar=new InfoBar(e),this.infoBar.render(t),t.data),t=prepareContentForRendering(e.trimStart(),t),t=this.markdownRenderer.render(t),n=this.h.createDiv({className:CSS_CLASSES.CONTENT_TAB,style:{position:"relative"}});n.innerHTML=t,this.options.showCopyButton&&this._addCopyButton(n,e),this.container.appendChild(n)}_addCopyButton(t,e){var n=this.h.createDiv({style:{position:"absolute",top:"10px",right:"10px",zIndex:"10"}});this.copyButton=new CopyButton(n,{contentToCopy:e,iconOnly:!0,variant:"icon",size:"large",style:{backgroundColor:"rgba(255, 255, 255, 0.8)",border:"1px solid #ddd",borderRadius:"4px",padding:"4px"}}),this.copyButton.render(),t.appendChild(n)}destroy(){this.infoBar&&(this.infoBar.destroy(),this.infoBar=null),this.copyButton&&(this.copyButton.destroy(),this.copyButton=null),this.container.innerHTML=""}}module.exports={ContentTab:ContentTab};
