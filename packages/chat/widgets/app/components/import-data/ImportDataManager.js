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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,MainView=require("./views/MainView"),StateManager=require("./utils/StateManager"),injectStyles=require("./styles").injectStyles,chatApi=require("../../chat"),formatImportCompletionMessage=require("./utils/formatUtils").formatImportCompletionMessage;class ImportDataManager{constructor(t,e,a){this.containerElement=t,this.message=e,this.context=a,this.mainView=null,this.state={activeTab:"manual",uploadedFiles:[],submittedJobs:[]},this.importCompletionCallback=null}setImportCompletionCallback(t){this.importCompletionCallback=t,this.mainView&&this.mainView.setImportCompletionCallback(t)}getImportCompletionCallback(){return this.importCompletionCallback}async handleImportComplete(t){var e=await chatApi.getChat(this.context.widget,t.refChatUuid),a=e.lineage[0],i=e.lineage[1],s=e.lineage[2],o=e.descendants.filter(t=>"git-blob"===t.type),t=formatImportCompletionMessage(t,o,{repositoriesChat:a,ownerChat:i,repositoryChat:s,refChat:e});await chatApi.updateChatMessage(this.context.widget,this.message.id,{newType:"imported-data-summary",newMessage:t}),window.location.reload()}async initialize(){try{await this._restoreState(),this._addStyles(),this.mainView=new MainView(this.containerElement,this.context),this.importCompletionCallback&&this.mainView.setImportCompletionCallback(this.importCompletionCallback),this.mainView.setImportDataManager(this),this.mainView.render()}catch(t){console.error("Error initializing Import Data Tool:",t)}}async _restoreState(){try{var t=await StateManager.restore(this.message,this.context);t&&(this.state={...this.state,...t})}catch(t){console.warn("Could not restore state:",t)}}async _saveState(t=!0){try{await StateManager.save(this.message,this.context,this.state,t)}catch(t){console.error("Error saving state:",t)}}_addStyles(){this.styleElement=injectStyles()}cleanup(){this.mainView&&this.mainView.cleanup(),this.styleElement&&this.styleElement.remove()}}module.exports=ImportDataManager;
