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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,CLI_BRIDGE_CONSTANTS=require("../constants").CLI_BRIDGE_CONSTANTS,formatCountdown=require("../utils/formatUtils").formatCountdown;class ActiveView{constructor(e,t,i,s=!1){this.containerElement=e,this.context=t,this.codeData=i,this.isRecovered=s,this.callbacks={onCopyCode:null,requestCancelCode:null},this.elements={},this.timerInterval=null}render(){this.containerElement.innerHTML="";var e=DomUtils.h.createDiv({cls:"gsc-cli-bridge-view-section active"}),t=this.isRecovered?CLI_BRIDGE_CONSTANTS.UI_TEXT.ACTIVE_INSTRUCTION_RECOVERED:CLI_BRIDGE_CONSTANTS.UI_TEXT.ACTIVE_INSTRUCTION_NEW,t=DomUtils.h.createP({cls:"gsc-cli-bridge-text",style:{textAlign:"center"},text:t}),t=(e.appendChild(t),DomUtils.h.createDiv({cls:"gsc-cli-bridge-code-display"})),i=DomUtils.h.createDiv({cls:"gsc-cli-bridge-code-number",text:this.codeData.code,title:"Click to copy",onclick:()=>this.copyToClipboard()}),i=(this.elements.codeNumber=i,t.appendChild(i),e.appendChild(t),DomUtils.h.createDiv({cls:"gsc-cli-bridge-active-footer"})),t=DomUtils.h.createDiv({cls:"gsc-cli-bridge-timer-display",text:CLI_BRIDGE_CONSTANTS.UI_TEXT.ACTIVE_EXPIRES_IN+" ..."}),t=(this.elements.timerDisplay=t,i.appendChild(t),DomUtils.h.createDiv({cls:"gsc-cli-bridge-btn-container"})),s=DomUtils.h.createButton({cls:"btn",text:CLI_BRIDGE_CONSTANTS.UI_TEXT.BUTTON_COPY_CODE,onclick:()=>this.copyToClipboard()}),s=(this.elements.copyBtn=s,t.appendChild(s),DomUtils.h.createButton({cls:"btn btn-danger",text:CLI_BRIDGE_CONSTANTS.UI_TEXT.BUTTON_CANCEL_CODE,onclick:()=>{this.callbacks.requestCancelCode&&this.callbacks.requestCancelCode()}}));t.appendChild(s),i.appendChild(t),e.appendChild(i),this.containerElement.appendChild(e),this.startTimer()}startTimer(){this.stopTimer(),this.updateTimer(),this.timerInterval=setInterval(()=>{this.updateTimer()},1e3)}stopTimer(){this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null)}updateTimer(){var e,t;this.elements.timerDisplay&&(e=Date.now(),(e=this.codeData.expiresAt-e)<=0?(this.elements.timerDisplay.textContent=CLI_BRIDGE_CONSTANTS.UI_TEXT.ACTIVE_EXPIRED,this.elements.timerDisplay.classList.add("warning"),this.stopTimer()):(t=formatCountdown(e),this.elements.timerDisplay.textContent=CLI_BRIDGE_CONSTANTS.UI_TEXT.ACTIVE_EXPIRES_IN+" "+t,e<3e4?this.elements.timerDisplay.classList.add("warning"):this.elements.timerDisplay.classList.remove("warning")))}async copyToClipboard(){try{if(await navigator.clipboard.writeText(this.codeData.code),this.elements.copyBtn){let e=this.elements.copyBtn.textContent;this.elements.copyBtn.textContent=CLI_BRIDGE_CONSTANTS.UI_TEXT.ACTIVE_COPIED,setTimeout(()=>{this.elements.copyBtn.textContent=e},2e3)}if(this.elements.codeNumber){let e=this.codeData.code;this.elements.codeNumber.textContent="✓",setTimeout(()=>{this.elements.codeNumber.textContent=e},2e3)}}catch(e){console.error("Failed to copy code:",e)}}onCopyCode(e){this.callbacks.onCopyCode=e}requestCancelCode(e){this.callbacks.requestCancelCode=e}cleanup(){this.stopTimer(),this.containerElement.innerHTML="",this.callbacks={onCopyCode:null,requestCancelCode:null},this.elements={}}}module.exports=ActiveView;
