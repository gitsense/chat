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

let confirmationBoxStyles=require("./confirmation-box.styles"),GSC_CONFIRMATION_CONSTANTS=require("./constants").GSC_CONFIRMATION_CONSTANTS,stylesInjected=!1;class ConfirmationBox{constructor(){this.elements={},this.currentConfirmCallback=null,this.currentCancelCallback=null,this.currentOptions={},this.init()}init(){this.injectStyles(),this.render(),this.bindEvents()}injectStyles(){var e;stylesInjected||((e=document.createElement("style")).textContent=confirmationBoxStyles,document.head.appendChild(e),stylesInjected=!0)}render(){var e=document.createElement("div"),t=(e.classList.add(GSC_CONFIRMATION_CONSTANTS.CONTAINER_CLASS),`
            <div class="${GSC_CONFIRMATION_CONSTANTS.CONTENT_CLASS}">
                <div class="${GSC_CONFIRMATION_CONSTANTS.HEADER_CLASS}">
                    <h3 class="${GSC_CONFIRMATION_CONSTANTS.TITLE_CLASS}">Confirm Action</h3>
                    <button class="${GSC_CONFIRMATION_CONSTANTS.CLOSE_BTN_CLASS}">&times;</button>
                </div>
                <div class="${GSC_CONFIRMATION_CONSTANTS.BODY_CLASS}">
                    <p class="${GSC_CONFIRMATION_CONSTANTS.MESSAGE_CLASS}">Are you sure you want to proceed?</p>
                </div>
                <div class="${GSC_CONFIRMATION_CONSTANTS.FOOTER_CLASS}">
                    <button class="${GSC_CONFIRMATION_CONSTANTS.BTN_CLASS} ${GSC_CONFIRMATION_CONSTANTS.CANCEL_BTN_CLASS}">Cancel</button>
                    <button class="${GSC_CONFIRMATION_CONSTANTS.BTN_CLASS} ${GSC_CONFIRMATION_CONSTANTS.CONFIRM_BTN_CLASS}">Confirm</button>
                </div>
            </div>
        `);e.innerHTML=t,document.body.appendChild(e),this.elements.box=e,this.elements.closeBtn=e.querySelector("."+GSC_CONFIRMATION_CONSTANTS.CLOSE_BTN_CLASS),this.elements.cancelBtn=e.querySelector("."+GSC_CONFIRMATION_CONSTANTS.CANCEL_BTN_CLASS),this.elements.confirmBtn=e.querySelector("."+GSC_CONFIRMATION_CONSTANTS.CONFIRM_BTN_CLASS),this.elements.messageContainer=e.querySelector("."+GSC_CONFIRMATION_CONSTANTS.MESSAGE_CLASS),this.elements.titleContainer=e.querySelector("."+GSC_CONFIRMATION_CONSTANTS.TITLE_CLASS)}bindEvents(){this.elements.closeBtn.addEventListener("click",this.hide.bind(this)),this.elements.cancelBtn.addEventListener("click",this.hide.bind(this)),this.elements.confirmBtn.addEventListener("click",this.handleConfirmClick.bind(this)),this.isMouseDown=!1,this.mouseDownTarget=null,this.handleMouseDown=e=>{this.isMouseDown=!0,this.mouseDownTarget=e.target},this.handleMouseUp=e=>{this.isMouseDown&&this.mouseDownTarget===this.elements.box&&e.target===this.elements.box&&this.hide(),this.isMouseDown=!1,this.mouseDownTarget=null},this.elements.box.addEventListener("mousedown",this.handleMouseDown),document.addEventListener("mouseup",this.handleMouseUp)}_updateContent(e,t,n=!1){for(;e.firstChild;)e.removeChild(e.firstChild);if(n&&"string"==typeof t)e.innerHTML=t;else if("string"==typeof t||t instanceof String)e.textContent=t;else{if(!(t instanceof Node))throw console.error("Content must be a string or DOM element",t),new Error("Content must be a string or DOM element");e.appendChild(t)}}async handleConfirmClick(){if("function"==typeof this.currentConfirmCallback){this._setButtonsDisabled(!0),this.elements.confirmBtn.textContent=this.currentOptions.confirmButtonLoadingText;try{var e=this.currentConfirmCallback();e&&"function"==typeof e.then&&await e,this.hide(!1)}catch(e){console.error("ConfirmationBox: Error during confirm callback:",e),this.hide(!1)}finally{this._setButtonsDisabled(!1),this.elements.confirmBtn.textContent=this.currentOptions.confirmButtonText}}else this.hide(!1)}_setButtonsDisabled(e){this.elements.confirmBtn.disabled=e,this.elements.cancelBtn.disabled=e,this.elements.closeBtn.disabled=e,this.elements.confirmBtn.style.opacity=e?"0.7":"1",this.elements.cancelBtn.style.opacity=e?"0.7":"1",this.elements.closeBtn.style.opacity=e?"0.7":"1",this.elements.confirmBtn.style.cursor=e?"not-allowed":"pointer",this.elements.cancelBtn.style.cursor=e?"not-allowed":"pointer",this.elements.closeBtn.style.cursor=e?"not-allowed":"pointer"}hide(e=!0){e&&"function"==typeof this.currentCancelCallback&&this.currentCancelCallback(),this.elements.box.style.display=GSC_CONFIRMATION_CONSTANTS.DISPLAY_NONE_STYLE,document.body.style.overflow=""}show({title:e="Confirm Action",message:t="Are you sure you want to proceed?",htmlMessage:n=null,confirmButtonText:s="Confirm",cancelButtonText:i="Cancel",confirmButtonLoadingText:o="Processing..."},l,r){t=null!==n?n:t,n=null!==n;this.currentOptions={confirmButtonText:s,cancelButtonText:i,confirmButtonLoadingText:o,isHtml:n},this.currentConfirmCallback=l,this.currentCancelCallback=r,this._updateContent(this.elements.titleContainer,e),this._updateContent(this.elements.messageContainer,t,n),this.elements.confirmBtn.textContent=s,this.elements.cancelBtn.textContent=i,this._setButtonsDisabled(!1),this.elements.box.style.display=GSC_CONFIRMATION_CONSTANTS.DISPLAY_BLOCK_STYLE,document.body.style.overflow="hidden"}destroy(){this.elements.closeBtn.removeEventListener("click",this.hide.bind(this)),this.elements.cancelBtn.removeEventListener("click",this.hide.bind(this)),this.elements.confirmBtn.removeEventListener("click",this.handleConfirmClick.bind(this)),this.elements.box.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mouseup",this.handleMouseUp),this.elements.box&&this.elements.box.parentNode&&this.elements.box.parentNode.removeChild(this.elements.box),this.elements={},this.currentConfirmCallback=null,this.currentCancelCallback=null,this.currentOptions={},this.handleMouseDown=null,this.handleMouseUp=null}}module.exports={ConfirmationBox:ConfirmationBox};
