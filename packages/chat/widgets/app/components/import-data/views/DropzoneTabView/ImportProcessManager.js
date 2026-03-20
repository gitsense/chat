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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,ConfirmationBox=require("../../../ui/confirmation-box").ConfirmationBox,PromptBox=require("../../../ui/prompt-box").PromptBox,IMPORT_DATA_CONSTANTS=require("../../constants").IMPORT_DATA_CONSTANTS,FormatUtils=require("../../utils/formatUtils"),FileUtils=require("../../utils/fileUtils"),FileService=require("./FileService"),ImportService=require("./ImportService");class ImportProcessManager{constructor(t,r={}){this.context=t,this.config={maxRetries:3,...r},this.state={isImporting:!1,lastError:null,retryCount:0},this.confirmationBox=new ConfirmationBox,this.progressPromptBox=null,this.callbacks={complete:null,error:null},this.customCompletionCallback=null,this.importCompletionCallback=null,this.importDataManager=null}setCustomCompletionCallback(t){this.customCompletionCallback=t}setImportCompletionCallback(t){this.importCompletionCallback=t}setImportDataManager(t){this.importDataManager=t}startImport(t,r,o){this.callbacks.complete=r,this.callbacks.error=o,this.importData=t,this.showConfirmation(t,()=>{this._executeImport()},()=>{this.callbacks.error&&this.callbacks.error({cancelled:!0})})}showConfirmation(t,r,o){var e=(t.repositoryConfig.namePrefix||IMPORT_DATA_CONSTANTS.DEFAULTS.REPO_NAME_PREFIX)+"-"+t.repositoryConfig.nameSuffix;let s=[],i=[],a=("dropzone"===t.mode&&(s=t.files.filter(t=>!t.isTextFile),i=t.files.filter(t=>t.isDuplicate)),0),p=0,l=(p="dropzone"===t.mode?(a=t.files.reduce((t,r)=>t+r.size,0),t.files.length):(a=new Blob([t.snippet.content]).size,1),'<div class="import-data-confirmation-message">');l=(l=(l=(l=(l+="<p>"+IMPORT_DATA_CONSTANTS.UI_TEXT.DROPZONE_CONFIRMATION.MESSAGE+"</p>")+"<p><strong>"+IMPORT_DATA_CONSTANTS.UI_TEXT.DROPZONE_CONFIRMATION.DETAILS+"</strong></p><ul>")+"<li>"+IMPORT_DATA_CONSTANTS.UI_TEXT.DROPZONE_CONFIRMATION.REPOSITORY.replace("{owner}",t.repositoryConfig.owner).replace("{name}",e).replace("{visibility}",FormatUtils.formatVisibilityDuration(t.repositoryConfig.visibilityDuration)).replace("{branch}",t.repositoryConfig.branch)+"</li>")+"<li>"+IMPORT_DATA_CONSTANTS.UI_TEXT.DROPZONE_CONFIRMATION.FILES.replace("{count}",p)+"</li>")+"<li>"+IMPORT_DATA_CONSTANTS.UI_TEXT.DROPZONE_CONFIRMATION.SIZE.replace("{size}",FileUtils.formatFileSize(a))+"</li></ul>",0<s.length&&(l+='<p class="warning"><strong>'+IMPORT_DATA_CONSTANTS.UI_TEXT.DROPZONE_CONFIRMATION.WARNING+"</strong> "+IMPORT_DATA_CONSTANTS.UI_TEXT.DROPZONE_VALIDATION.BINARY_FILES_WARNING.replace("{count}",s.length)+"</p>"),0<i.length&&(l+='<p class="warning"><strong>'+IMPORT_DATA_CONSTANTS.UI_TEXT.DROPZONE_CONFIRMATION.NOTE+"</strong> "+IMPORT_DATA_CONSTANTS.UI_TEXT.DROPZONE_VALIDATION.DUPLICATE_FILES_NOTE.replace("{count}",i.length)+"</p>"),l=l+("<p><strong>"+IMPORT_DATA_CONSTANTS.UI_TEXT.DROPZONE_CONFIRMATION.IMPORTANT)+"</strong></p></div>",this.confirmationBox.show({title:IMPORT_DATA_CONSTANTS.UI_TEXT.DROPZONE_CONFIRMATION.TITLE,htmlMessage:l,confirmButtonText:"Confirm",cancelButtonText:"Cancel"},()=>{r&&r()},()=>{o&&o()})}cancelImport(){this.progressPromptBox&&this.progressPromptBox.hide(),this.state.isImporting=!1,this.state.lastError=null,this.state.retryCount=0}cleanup(){this.cancelImport(),this.confirmationBox&&this.confirmationBox.destroy(),this.progressPromptBox&&this.progressPromptBox.destroy(),this.callbacks={complete:null,error:null}}async _executeImport(){var t;this.state.lastError=null,this.state.retryCount=0,this.state.isImporting=!0;let e=(this.importData.repositoryConfig.namePrefix||IMPORT_DATA_CONSTANTS.DEFAULTS.REPO_NAME_PREFIX)+"-"+this.importData.repositoryConfig.nameSuffix,s;s="snippet"===this.importData.mode?(t=FileService.createFileFromSnippet(this.importData.snippet.filename,this.importData.snippet.content),await FileService.prepareFilesForUpload([t])):await FileService.prepareFilesForUpload(this.importData.files),this._showProgressPromptBox("Preparing to import your files...",e);try{let{success:t,storageId:r,error:o}=await ImportService.upload(this.context.widget,s,{repositoryName:e});t?(this._updateProgressPromptBox("Files uploaded successfully. Creating repository..."),await ImportService.createRepoStream(this.context.widget,r,{onProgress:t=>this._updateProgressPromptBox(t),onError:t=>this._showErrorInPromptBox(t),onComplete:t=>this._startImportProcess(r,e)})):this._showErrorInPromptBox({type:"fileProcessing",code:"UPLOAD_FAILED",message:"Failed to upload files: "+o,details:{error:o}})}catch(t){console.error("Import error:",t),this._showErrorInPromptBox({type:"system",code:"UNEXPECTED_ERROR",message:"An unexpected error occurred: "+t.message,details:{stack:t.stack}})}finally{this.state.isImporting=!1}}_startImportProcess(t,r){this._updateProgressPromptBox("Starting import to GitSense..."),ImportService.importRepoStream(this.context.widget,t,{onProgress:t=>this._updateProgressPromptBox(t),onError:t=>this._showErrorInPromptBox(t),onComplete:t=>this._showImportComplete(t.refChatUuid,t.refChatId,r)})}_showProgressPromptBox(t,r){this.progressPromptBox||(this.progressPromptBox=new PromptBox({title:"Importing Files",width:"500px",showCloseButton:!1,closeOnOverlayClick:!1}));var o=this.importData.repositoryConfig.namePrefix||IMPORT_DATA_CONSTANTS.DEFAULTS.REPO_NAME_PREFIX,r=r||o+"-"+this.importData.repositoryConfig.nameSuffix;this.progressPromptBox.show({content:`
                <div class="import-progress-container">
                    <div class="import-progress-message">${t}</div>
                    <div class="import-progress-details">
                        <div>Repository: ${this.importData.repositoryConfig.owner}/${r}</div>
                        <div>Files: ${"snippet"===this.importData.mode?1:this.importData.files.length}</div>
                    </div>
                    <div class="import-progress-spinner"></div>
                </div>
            `,isHtmlContent:!0})}_updateProgressPromptBox(t){var r;this.progressPromptBox&&(r=(this.importData.repositoryConfig.namePrefix||IMPORT_DATA_CONSTANTS.DEFAULTS.REPO_NAME_PREFIX)+"-"+this.importData.repositoryConfig.nameSuffix,this.progressPromptBox.show({content:`
                <div class="import-progress-container">
                    <div class="import-progress-message">${t}</div>
                    <div class="import-progress-details">
                        <div>Repository: ${this.importData.repositoryConfig.owner}/${r}</div>
                        <div>Files: ${"snippet"===this.importData.mode?1:this.importData.files.length}</div>
                    </div>
                    <div class="import-progress-spinner"></div>
                </div>
            `,isHtmlContent:!0}))}_showErrorInPromptBox(t){this.state.lastError=t;var r=ImportService.handleRetry(t,this.state.retryCount,this.config.maxRetries).canRetry;let o=`
            <div class="import-error-container">
                <div class="import-error-message">${t.message}</div>
        `;t.details&&0<Object.keys(t.details).length&&(o+=`
                <div class="import-error-details">
                    <h4>Error Details:</h4>
                    <pre>${this._formatErrorDetails(t.details)}</pre>
                </div>
            `,console.error(t)),o=o+`
            <div class="import-error-debug">
                <small>Error Type: ${t.type}, Code: ${t.code}</small>
            </div>
        `+`
            <div class="import-error-actions">
        `,r&&(o+=`
                <button class="import-error-retry-btn">Retry (${this.config.maxRetries-this.state.retryCount} attempts left)</button>
            `),o+=`
                <button class="import-error-close-btn">Close</button>
            </div>
        </div>
        `,this.progressPromptBox||(this.progressPromptBox=new PromptBox({title:"Import Error",width:"500px",showCloseButton:!0,closeOnOverlayClick:!0})),this.progressPromptBox.show({content:o,isHtmlContent:!0});var r=this.progressPromptBox.elements.body.querySelector(".import-error-retry-btn"),e=this.progressPromptBox.elements.body.querySelector(".import-error-close-btn");r&&r.addEventListener("click",()=>{this.state.retryCount++,this._executeImport()}),e&&e.addEventListener("click",()=>{this.progressPromptBox.hide(),this.callbacks.error&&this.callbacks.error(t)})}_showImportComplete(t,r,o){r={refChatUuid:t,refChatId:r,fullRepoName:o,repositoryConfig:this.importData.repositoryConfig,importData:this.importData};console.log("ImportProcessManager._showImportComplete - Import result:",r),this.progressPromptBox&&this.progressPromptBox.hide(),this.importCompletionCallback&&"function"==typeof this.importCompletionCallback?this.importCompletionCallback(r):this.importDataManager&&this.importDataManager.handleImportComplete?this.importDataManager.handleImportComplete(r):(this.progressPromptBox||(this.progressPromptBox=new PromptBox({title:"Import Complete",width:"500px",showCloseButton:!0,closeOnOverlayClick:!0})),this.progressPromptBox.show({content:`
                    <div class="import-success-container">
                        <div class="import-success-message">Import completed successfully!</div>
                        <div class="import-success-details">
                            <div>Repository: ${this.importData.repositoryConfig.owner}/${o}</div>
                            <div>Files: ${"snippet"===this.importData.mode?1:this.importData.files.length}</div>
                            <div>Chat UUID: ${t}</div>
                        </div>
                        <div class="import-success-actions">
                            <button class="import-success-close-btn">Close</button>
                        </div>
                    </div>
                `,isHtmlContent:!0}),this.progressPromptBox.elements.body.querySelector(".import-success-close-btn").addEventListener("click",()=>{this.progressPromptBox.hide(),this.callbacks.complete&&this.callbacks.complete({refChatUuid:t,fullRepoName:o})}))}_generateRandomSuffix(){var r="0123456789abcdefghijklmnopqrstuvwxyz";let o="";for(let t=0;t<8;t++)o+=r.charAt(Math.floor(Math.random()*r.length));return o}_formatErrorDetails(t){try{var r,o,e={};for([r,o]of Object.entries(t))o&&"object"==typeof o&&o.type&&o.target?e[r]={type:o.type,message:o.message||"No message available"}:e[r]=o;return JSON.stringify(e,null,2)}catch(t){return"Error formatting details: "+t.message}}}module.exports=ImportProcessManager;
