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

class AutoSave{constructor(t,e=3e3){this.saveFunction=t,this.interval=e,this.timeoutId=null,this.lastSaveTime=null}triggerSave(t){this.timeoutId&&clearTimeout(this.timeoutId),this.timeoutId=setTimeout(async()=>{try{await this.saveFunction(t),this.lastSaveTime=new Date}catch(t){console.error("Auto-save failed:",t)}},this.interval)}async saveNow(t){this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=null);try{return await this.saveFunction(t),this.lastSaveTime=new Date,!0}catch(t){return console.error("Save failed:",t),!1}}getLastSaveTime(){return this.lastSaveTime}isPending(){return null!==this.timeoutId}cancelPendingSave(){this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=null)}cleanup(){this.cancelPendingSave()}}module.exports=AutoSave;
