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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,MESSAGE_DRAFTER_CONSTANTS=require("../constants").MESSAGE_DRAFTER_CONSTANTS;class EditorPanel{constructor(e,t={}){this.containerElement=e,this.config={height:t.height||MESSAGE_DRAFTER_CONSTANTS.DEFAULTS.TEXTAREA_HEIGHT,placeholder:t.placeholder||"Type your message here...",...t},this.content="",this.callbacks={contentChange:null,heightChange:null},this.elements={}}render(){this.containerElement.innerHTML="";var e=DomUtils.h.createDiv(),t=(e.className=MESSAGE_DRAFTER_CONSTANTS.CSS_CLASSES.EDITOR_PANEL,DomUtils.h.createTextarea());t.className=MESSAGE_DRAFTER_CONSTANTS.CSS_CLASSES.TEXTAREA,t.placeholder=this.config.placeholder,t.style.height=this.config.height+"px",t.value=this.content,t.addEventListener("input",()=>this._handleContentChange()),t.addEventListener("mouseup",()=>this._handleHeightChange()),this.elements.textarea=t,e.appendChild(t),this.containerElement.appendChild(e)}getContent(){return this.content}setContent(e){this.content=e||"",this.elements.textarea&&(this.elements.textarea.value=this.content)}getHeight(){return this.elements.textarea?parseInt(this.elements.textarea.style.height,10):this.config.height}setHeight(e){e=Math.max(MESSAGE_DRAFTER_CONSTANTS.DEFAULTS.MIN_TEXTAREA_HEIGHT,Math.min(e,MESSAGE_DRAFTER_CONSTANTS.DEFAULTS.MAX_TEXTAREA_HEIGHT));this.config.height=e,this.elements.textarea&&(this.elements.textarea.style.height=e+"px")}onContentChange(e){this.callbacks.contentChange=e}onHeightChange(e){this.callbacks.heightChange=e}show(){this.containerElement&&(this.containerElement.style.display="block")}hide(){this.containerElement&&(this.containerElement.style.display="none")}focus(){this.elements.textarea&&this.elements.textarea.focus()}cleanup(){this.elements.textarea&&(this.elements.textarea.removeEventListener("input",this._handleContentChange),this.elements.textarea.removeEventListener("mouseup",this._handleHeightChange)),this.containerElement&&(this.containerElement.innerHTML=""),this.elements={},this.callbacks={contentChange:null,heightChange:null}}_handleContentChange(){var e=this.elements.textarea.value;e!==this.content&&(this.content=e,this.callbacks.contentChange)&&this.callbacks.contentChange(this.content)}_handleHeightChange(){var e=this.elements.textarea.offsetHeight;e!==this.config.height&&(this.setHeight(e),this.callbacks.heightChange)&&this.callbacks.heightChange(this.config.height)}}module.exports=EditorPanel;
