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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,PromptBox=require("@gitsense/gsc-utils").PromptBox,CONTRACT_CONSTANTS=require("../constants").CONTRACT_CONSTANTS,injectStyles=require("../styles").injectStyles;class ContractSaveModal{constructor(e,t){this.manager=e,this.mode=t.mode,this.rawContent=t.rawContent,this.targetInfo=t.targetInfo,this.messageId=t.messageId,this.elements={},this.promptBox=new PromptBox}async show(){injectStyles();var e=this._createSkeleton();this.promptBox.show({title:"Contract Save",content:e,width:"auto",showCloseButton:!0,closeOnOverlayClick:!0}),await this._runPreFlightCheck()}_createSkeleton(){var e=DomUtils.h.createDiv({cls:CONTRACT_CONSTANTS.CSS_PREFIX+"-modal mode-"+this.mode}),t=DomUtils.h.createDiv({cls:CONTRACT_CONSTANTS.CSS_PREFIX+"-modal-header"}),s="update"===this.mode?CONTRACT_CONSTANTS.UI_TEXT.MODAL_TITLE_UPDATE:CONTRACT_CONSTANTS.UI_TEXT.MODAL_TITLE_NEW,s=(t.appendChild(DomUtils.h.createH3({text:s})),e.appendChild(t),DomUtils.h.createDiv({cls:CONTRACT_CONSTANTS.CSS_PREFIX+"-modal-body"})),t=DomUtils.h.createDiv({cls:CONTRACT_CONSTANTS.CSS_PREFIX+"-path-section"}),n=DomUtils.h.createLabel({text:"update"===this.mode?CONTRACT_CONSTANTS.UI_TEXT.LABEL_TARGET_FILE:CONTRACT_CONSTANTS.UI_TEXT.LABEL_RELATIVE_PATH}),n=(t.appendChild(n),DomUtils.h.createDiv()),n=(this.elements.pathContent=n,t.appendChild(n),s.appendChild(t),DomUtils.h.createDiv({cls:CONTRACT_CONSTANTS.CSS_PREFIX+"-diff-section",style:{display:"none"}})),t=(n.innerHTML=`<div class="${CONTRACT_CONSTANTS.CSS_PREFIX}-diff-content"></div>`,this.elements.diffSection=n,this.elements.diffContent=n.querySelector(`.${CONTRACT_CONSTANTS.CSS_PREFIX}-diff-content`),s.appendChild(n),e.appendChild(s),DomUtils.h.createDiv({cls:CONTRACT_CONSTANTS.CSS_PREFIX+"-modal-footer"})),n=DomUtils.h.createButton({cls:"btn btn-primary",text:CONTRACT_CONSTANTS.UI_TEXT.BUTTON_CONFIRM,onclick:()=>this.handleConfirm()});return this.elements.confirmBtn=n,t.appendChild(n),e.appendChild(t),e}async _runPreFlightCheck(){var e=this.manager.getContractUUID(),t="update"===this.mode?CONTRACT_CONSTANTS.UI_TEXT.LOADING_RESOLVING:CONTRACT_CONSTANTS.UI_TEXT.LOADING_VALIDATING;this.elements.pathContent.innerHTML=`
            <div class="${CONTRACT_CONSTANTS.CSS_PREFIX}-path-display">
                <span class="${CONTRACT_CONSTANTS.CSS_PREFIX}-spinner"></span> ${t}
            </div>
        `,this.elements.diffSection.style.display="none",this.elements.confirmBtn.disabled=!0;try{var s=await chatApi.executeContractTest(e,this.rawContent,this.messageId);s.success?this._handleTestSuccess(s):this._handleTestFailure(s)}catch(e){this.elements.pathContent.innerHTML=`
                <div class="${CONTRACT_CONSTANTS.CSS_PREFIX}-error-box">
                    <strong>${CONTRACT_CONSTANTS.UI_TEXT.ERROR_SYSTEM}</strong> ${e.message}
                </div>
            `,this._disableActions()}}_handleTestSuccess(e){"update"===this.mode?this.elements.pathContent.innerHTML=`
                <div class="${CONTRACT_CONSTANTS.CSS_PREFIX}-path-display">
                    ${e.relative_path}
                </div>
            `:this.elements.pathContent.innerHTML=`
                <input type="text" class="${CONTRACT_CONSTANTS.CSS_PREFIX}-path-input" 
                       placeholder="src/utils/newFile.js" 
                       value="${this.targetInfo.suggestedPath||""}" />
                <div class="${CONTRACT_CONSTANTS.CSS_PREFIX}-hint}">${CONTRACT_CONSTANTS.UI_TEXT.HINT_RELATIVE_PATH}</div>
            `,"update"===this.mode&&e.diff_html&&(this.elements.diffContent.innerHTML=e.diff_html,this.elements.diffSection.style.display="block"),this.elements.confirmBtn.disabled=!1}_handleTestFailure(e){e=CONTRACT_CONSTANTS.ERROR_MESSAGES[e.error_code]||e.message||"Unknown validation error.";this.elements.pathContent.innerHTML=`
            <div class="${CONTRACT_CONSTANTS.CSS_PREFIX}-error-box">
                <strong>${CONTRACT_CONSTANTS.UI_TEXT.ERROR_VALIDATION_FAILED}</strong> ${e}
            </div>
        `,this.elements.diffSection.style.display="none",this.elements.confirmBtn.disabled=!0}_disableActions(){this.elements.confirmBtn.disabled=!0}async handleConfirm(){var e,t=this.manager.getContractUUID();let s=null;"new-file"===this.mode&&(e=this.elements.pathContent.querySelector("input"))&&(s=e.value.trim()),this.elements.confirmBtn.disabled=!0,this.elements.confirmBtn.textContent="Saving...";try{var n=await chatApi.executeContractSave(t,this.rawContent,s,this.messageId);n.success?this.promptBox.hide():(alert("Save failed: "+(n.message||"Unknown error")),this.elements.confirmBtn.disabled=!1,this.elements.confirmBtn.textContent=CONTRACT_CONSTANTS.UI_TEXT.BUTTON_CONFIRM)}catch(e){alert("System Error: "+e.message),this.elements.confirmBtn.disabled=!1,this.elements.confirmBtn.textContent=CONTRACT_CONSTANTS.UI_TEXT.BUTTON_CONFIRM}}}module.exports=ContractSaveModal;
