/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * Licensed under the Fair Core License, Version 1.0 (FCL-1.0-ALv2).
 * https://faircode.io
 *
 * You may use, modify, and run this software for internal, non-commercial
 * purposes including personal projects, team workflows, and self-hosted
 * deployments. You may not use this software to build or operate a product
 * or service that competes directly or indirectly with GitSense Chat.
 * Redistribution or resale is not permitted.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 *
 * For licensing inquiries, internal-use exceptions, or business use,
 * contact sales@gitsense.com
 */

let{ERROR_MESSAGES,MESSAGES,SPECIAL_MODELS}=require("../constants");class SendHandler{constructor(e,t,n={}){if(!t)throw new Error("SendHandler requires an inputBox");if(!e)throw new Error("SendHandler requires an optionsBar");this.optionsBar=e,this.inputBox=t,this.config={mainModel:n.mainModel||"",...n},this.events={},this.isSending=!1}setEvent(e,t){this.events[e]=t}handleSend(e){var t=this.config.alwaysSend||this.optionsBar.getSendOnEnter(),n=e&&(e.metaKey||e.ctrlKey);!e||n||t&&!e.shiftKey?this._validateInput()?(this.setSendingState(!0),n=this.optionsBar.getSelectedModel(),t=this.inputBox.getInputValue(),this._dispatchSend(n,t),this._resetAfterSend()):this.events.onError&&this.events.onError("Message cannot be empty. Please enter some text."):e&&(e.preventDefault=!1)}handleStop(){this.events.onStop&&this.events.onStop()}setSendingState(e){(this.isSending=e)?this.inputBox.showStopBtn():this.inputBox.showGoBtn()}_dispatchSend(e,t){this.events.onSend&&this.events.onSend(e,t)}_resetAfterSend(){this.inputBox.reset(),this.optionsBar.reset()}_validateInput(){this.inputBox.getInputValue();return!0}updateMainModel(e){this.config.mainModel=e}getSendingState(){return this.isSending}}module.exports={SendHandler:SendHandler};
