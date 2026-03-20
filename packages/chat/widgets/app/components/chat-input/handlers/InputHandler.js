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

let DEFAULT_CONFIG=require("../constants").DEFAULT_CONFIG,MessageHistory=require("../../message-history").MessageHistory;class InputHandler{constructor(t,e={}){if(!t)throw new Error("InputHandler requires an inputElement");this.inputElement=t,this.config={autoSaveDebounce:e.autoSaveDebounce||DEFAULT_CONFIG.AUTO_SAVE_DEBOUNCE,saveFrequency:e.saveFrequency||DEFAULT_CONFIG.SAVE_FREQUENCY,...e},this.events={},this.autoSaveTimer=null,this.autoSaveInterval=null,this.lastSavedContent="",this.isActive=!1,this.chat=e.chat||null}setEvent(t,e){this.events[t]=e}start(){this.isActive||(this.isActive=!0,this._attachEvents(),this._startAutoSaveInterval())}stop(){this.isActive&&(this.isActive=!1,this._removeEvents(),this._clearAutoSaveTimers())}getCurrentContent(){return this.inputElement.value||""}setContent(t){this.inputElement.value=t||"";t=new Event("input",{bubbles:!0});this.inputElement.dispatchEvent(t)}focus(){this.inputElement.focus()}_attachEvents(){this._handleInputChange=this._handleInputChange.bind(this),this.inputElement.addEventListener("input",this._handleInputChange)}_removeEvents(){this._handleInputChange&&this.inputElement.removeEventListener("input",this._handleInputChange)}_handleInputChange(){var t=this.getCurrentContent();!t.trim()&&this.lastSavedContent.trim()&&this._deleteDraft(),this.autoSaveTimer&&clearTimeout(this.autoSaveTimer),this.autoSaveTimer=setTimeout(()=>{this._saveDraft()},this.config.autoSaveDebounce),this.events.onInputChange&&this.events.onInputChange(t)}_startAutoSaveInterval(){this.autoSaveInterval&&clearInterval(this.autoSaveInterval),this.autoSaveInterval=setInterval(()=>{this._saveDraft()},this.config.saveFrequency)}_clearAutoSaveTimers(){this.autoSaveTimer&&(clearTimeout(this.autoSaveTimer),this.autoSaveTimer=null),this.autoSaveInterval&&(clearInterval(this.autoSaveInterval),this.autoSaveInterval=null)}_saveDraft(){var t=this.getCurrentContent();t!==this.lastSavedContent&&t.trim()&&(this.events.onSaveDraft&&this.events.onSaveDraft(t),this.lastSavedContent=t)}_deleteDraft(){if(this.chat&&this.chat.uuid)try{MessageHistory.deleteDraft(this.chat.uuid),this.lastSavedContent="",this.events.onDraftDeleted&&this.events.onDraftDeleted()}catch(t){console.error("Error deleting draft:",t)}}updateConfig(t){this.config={...this.config,...t},t.saveFrequency&&this.isActive&&this._startAutoSaveInterval()}forceSaveDraft(){this._saveDraft()}clearLastSavedContent(){this.lastSavedContent=""}setChat(t){this.chat=t}}module.exports={InputHandler:InputHandler};
