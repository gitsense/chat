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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let confirmationBoxStyles=require("./confirmation-box.styles"),GSC_CONFIRMATION_CONSTANTS=require("./constants").GSC_CONFIRMATION_CONSTANTS,stylesInjected=!1;class ConfirmationBox{constructor(){this.elements={},this.currentConfirmCallback=null,this.init()}init(){this.injectStyles(),this.render(),this.bindEvents()}injectStyles(){var e;stylesInjected||((e=document.createElement("style")).textContent=confirmationBoxStyles,document.head.appendChild(e),stylesInjected=!0)}render(){var e=document.createElement("div"),t=(e.classList.add(GSC_CONFIRMATION_CONSTANTS.CONTAINER_CLASS),`
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
        `);e.innerHTML=t,document.body.appendChild(e),this.elements.box=e,this.elements.closeBtn=e.querySelector("."+GSC_CONFIRMATION_CONSTANTS.CLOSE_BTN_CLASS),this.elements.cancelBtn=e.querySelector("."+GSC_CONFIRMATION_CONSTANTS.CANCEL_BTN_CLASS),this.elements.confirmBtn=e.querySelector("."+GSC_CONFIRMATION_CONSTANTS.CONFIRM_BTN_CLASS),this.elements.messageContainer=e.querySelector("."+GSC_CONFIRMATION_CONSTANTS.BODY_CLASS),this.elements.titleContainer=e.querySelector("."+GSC_CONFIRMATION_CONSTANTS.TITLE_CLASS)}bindEvents(){this.elements.closeBtn.addEventListener("click",this.hide.bind(this)),this.elements.cancelBtn.addEventListener("click",this.hide.bind(this)),this.elements.confirmBtn.addEventListener("click",this.handleConfirmClick.bind(this)),this.elements.box.addEventListener("click",this.handleOverlayClick.bind(this))}_updateContent(e,t){for(;e.firstChild;)e.removeChild(e.firstChild);if("string"==typeof t||t instanceof String){var n="H3"===e.tagName?document.createElement("h3"):document.createElement("p");n.textContent=t,e.appendChild(n)}else{if(!(t instanceof Node))throw console.error("Content must be a string or DOM element",t),new Error("Content must be a string or DOM element");e.appendChild(t)}}handleConfirmClick(){"function"==typeof this.currentConfirmCallback&&this.currentConfirmCallback(),this.hide()}handleOverlayClick(e){e.target===this.elements.box&&this.hide()}hide(){this.elements.box.style.display=GSC_CONFIRMATION_CONSTANTS.DISPLAY_NONE_STYLE,document.body.style.overflow=""}show({title:e="Confirm Action",message:t="Are you sure you want to proceed?"},n){this._updateContent(this.elements.titleContainer,e),this._updateContent(this.elements.messageContainer,t),this.elements.box.style.display=GSC_CONFIRMATION_CONSTANTS.DISPLAY_BLOCK_STYLE,document.body.style.overflow="hidden",this.currentConfirmCallback=n}destroy(){this.elements.closeBtn.removeEventListener("click",this.hide.bind(this)),this.elements.cancelBtn.removeEventListener("click",this.hide.bind(this)),this.elements.confirmBtn.removeEventListener("click",this.handleConfirmClick.bind(this)),this.elements.box.removeEventListener("click",this.handleOverlayClick.bind(this)),this.elements.box&&this.elements.box.parentNode&&this.elements.box.parentNode.removeChild(this.elements.box),this.elements={},this.currentConfirmCallback=null}}module.exports={ConfirmationBox:ConfirmationBox};
