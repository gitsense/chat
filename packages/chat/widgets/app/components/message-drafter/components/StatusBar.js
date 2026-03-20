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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,MESSAGE_DRAFTER_CONSTANTS=require("../constants").MESSAGE_DRAFTER_CONSTANTS,TokenCounter=require("../utils/TokenCounter"),formatTimeDifference=require("@gitsense/gsc-utils/src/DateUtils").formatTimeDifference;class StatusBar{constructor(t,e={}){this.containerElement=t,this.config={...e},this.content="",this.lastSaveTime=null,this.isSaving=!1,this.elements={}}render(){this.containerElement.innerHTML="";var t=DomUtils.h.createDiv(),e=(t.className=MESSAGE_DRAFTER_CONSTANTS.CSS_CLASSES.STATUS_BAR,DomUtils.h.createDiv()),s=(e.className=MESSAGE_DRAFTER_CONSTANTS.CSS_CLASSES.STATUS_LEFT,DomUtils.h.createSpan()),i=(s.textContent=MESSAGE_DRAFTER_CONSTANTS.UI_TEXT.TOKENS+": 0",DomUtils.h.createSpan()),n=(i.textContent=MESSAGE_DRAFTER_CONSTANTS.UI_TEXT.SIZE+": 0 B",DomUtils.h.createSpan()),S=(n.textContent=MESSAGE_DRAFTER_CONSTANTS.UI_TEXT.NEVER_SAVED,e.appendChild(s),e.appendChild(DomUtils.h.createTextNode(" | ")),e.appendChild(i),e.appendChild(DomUtils.h.createTextNode(" | ")),e.appendChild(n),DomUtils.h.createDiv()),a=(S.className=MESSAGE_DRAFTER_CONSTANTS.CSS_CLASSES.STATUS_RIGHT,DomUtils.h.createButton());a.className=MESSAGE_DRAFTER_CONSTANTS.CSS_CLASSES.SUBMIT_BUTTON,a.textContent=MESSAGE_DRAFTER_CONSTANTS.UI_TEXT.SUBMIT,a.disabled=!0,S.appendChild(a),this.elements.tokenCount=s,this.elements.size=i,this.elements.lastSaved=n,this.elements.submitButton=a,t.appendChild(e),t.appendChild(S),this.containerElement.appendChild(t)}updateContent(t){this.content=t||"";t=TokenCounter.estimateTokens(this.content),this.elements.tokenCount.textContent=MESSAGE_DRAFTER_CONSTANTS.UI_TEXT.TOKENS+": "+TokenCounter.formatTokenCount(t),t=new Blob([this.content]).size;this.elements.size.textContent=MESSAGE_DRAFTER_CONSTANTS.UI_TEXT.SIZE+": "+this._formatSize(t),this.elements.submitButton.disabled=0===this.content.trim().length||this.isSaving}updateLastSaveTime(t){var e;(this.lastSaveTime=t)?(e=new Date,e=Math.floor((e-t)/1e3),t=formatTimeDifference(e),this.elements.lastSaved.textContent="Saved: "+t):this.elements.lastSaved.textContent=MESSAGE_DRAFTER_CONSTANTS.UI_TEXT.NEVER_SAVED}setSavingState(t){(this.isSaving=t)?(this.elements.lastSaved.textContent=MESSAGE_DRAFTER_CONSTANTS.UI_TEXT.SAVING,this.elements.submitButton.disabled=!0,this.containerElement.classList.add("message-drafter-saving")):(this.updateLastSaveTime(this.lastSaveTime),this.elements.submitButton.disabled=0===this.content.trim().length,this.containerElement.classList.remove("message-drafter-saving"))}onSubmit(t){this.submitCallback=t,this.elements.submitButton&&this.elements.submitButton.addEventListener("click",()=>{this.submitCallback&&!this.elements.submitButton.disabled&&this.submitCallback()})}cleanup(){this.containerElement&&(this.containerElement.innerHTML=""),this.elements={},this.submitCallback=null}_formatSize(t){return t<1024?t+" B":t<1048576?(t/1024).toFixed(1)+" KB":(t/1048576).toFixed(1)+" MB"}}module.exports=StatusBar;
