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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,CLI_BRIDGE_CONSTANTS=require("../constants").CLI_BRIDGE_CONSTANTS;class AbortedView{constructor(e,t,n){this.containerElement=e,this.context=t,this.previousSettings=n,this.callbacks={onRegenerate:null,onStartOver:null},this.elements={}}render(){this.containerElement.innerHTML="";var e=DomUtils.h.createDiv({cls:"gsc-cli-bridge-view-section active"}),t=DomUtils.h.createH3({text:CLI_BRIDGE_CONSTANTS.UI_TEXT.ABORTED_TITLE,style:{fontSize:"18px",marginBottom:"15px",color:"#333"}}),t=(e.appendChild(t),DomUtils.h.createP({cls:"gsc-cli-bridge-text",style:{marginBottom:"30px"},text:CLI_BRIDGE_CONSTANTS.UI_TEXT.ABORTED_MESSAGE})),t=(e.appendChild(t),DomUtils.h.createDiv({cls:"gsc-cli-bridge-btn-container",style:{justifyContent:"flex-end"}})),n=DomUtils.h.createButton({cls:"btn",text:CLI_BRIDGE_CONSTANTS.UI_TEXT.BUTTON_START_OVER,onclick:()=>{this.callbacks.onStartOver&&this.callbacks.onStartOver()}}),n=(t.appendChild(n),DomUtils.h.createButton({cls:"btn btn-primary",text:CLI_BRIDGE_CONSTANTS.UI_TEXT.BUTTON_REGENERATE,onclick:()=>{this.callbacks.onRegenerate&&this.callbacks.onRegenerate()}}));t.appendChild(n),e.appendChild(t),this.containerElement.appendChild(e)}onRegenerate(e){this.callbacks.onRegenerate=e}onStartOver(e){this.callbacks.onStartOver=e}cleanup(){this.containerElement.innerHTML="",this.callbacks={onRegenerate:null,onStartOver:null},this.elements={}}}module.exports=AbortedView;
