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

class AutoSave{constructor(t,e=3e3){this.saveFunction=t,this.interval=e,this.timeoutId=null,this.lastSaveTime=null}triggerSave(t){this.timeoutId&&clearTimeout(this.timeoutId),this.timeoutId=setTimeout(async()=>{try{await this.saveFunction(t),this.lastSaveTime=new Date}catch(t){console.error("Auto-save failed:",t)}},this.interval)}async saveNow(t){this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=null);try{return await this.saveFunction(t),this.lastSaveTime=new Date,!0}catch(t){return console.error("Save failed:",t),!1}}getLastSaveTime(){return this.lastSaveTime}isPending(){return null!==this.timeoutId}cancelPendingSave(){this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=null)}cleanup(){this.cancelPendingSave()}}module.exports=AutoSave;
