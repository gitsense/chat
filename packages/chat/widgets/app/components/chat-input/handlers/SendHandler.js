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

let{ERROR_MESSAGES,MESSAGES,SPECIAL_MODELS}=require("../constants");class SendHandler{constructor(e,t,n={}){if(!t)throw new Error("SendHandler requires an inputBox");if(!e)throw new Error("SendHandler requires an optionsBar");this.optionsBar=e,this.inputBox=t,this.config={mainModel:n.mainModel||"",...n},this.events={},this.isSending=!1}setEvent(e,t){this.events[e]=t}handleSend(e){var t=this.config.alwaysSend||this.optionsBar.getSendOnEnter(),n=e&&(e.metaKey||e.ctrlKey);!e||n||t&&!e.shiftKey?this._validateInput()?(n=this.optionsBar.getSelectedModel(),t=this.inputBox.getInputValue(),this._dispatchSend(n,t),this._resetAfterSend()):this.events.onError&&this.events.onError("Message cannot be empty. Please enter some text."):e&&(e.preventDefault=!1)}handleStop(){this.events.onStop&&this.events.onStop()}setSendingState(e){(this.isSending=e)?this.inputBox.showStopBtn():this.inputBox.showGoBtn()}_dispatchSend(e,t){this.events.onSend&&this.events.onSend(e,t)}_resetAfterSend(){this.inputBox.reset(),this.optionsBar.reset(),this.setSendingState(!1)}_validateInput(){var e=this.inputBox.getInputValue(),t=this.inputBox.getInputFiles();return!(!e.trim()&&0===t.length)}updateMainModel(e){this.config.mainModel=e}getSendingState(){return this.isSending}}module.exports={SendHandler:SendHandler};
