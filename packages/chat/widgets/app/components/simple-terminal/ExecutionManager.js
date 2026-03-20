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

class ExecutionManager{constructor(r){this.contractManager=r,this.currentAbortController=null}async execute(r,{onData:t,onComplete:o,onError:e}){this.abort(),this.currentAbortController=new AbortController;try{await this.contractManager.streamCommand({command:r,onData:r=>{"stdout"===r.type||"stderr"===r.type?t&&t(r):"complete"===r.type?o&&o():"error"===r.type&&e&&e({error:r.message||"Unknown error"})},onComplete:()=>{o&&o()},onError:r=>{e&&e(r)}})}catch(r){e&&e({error:r.message})}finally{this.currentAbortController=null}}abort(){this.currentAbortController&&(this.currentAbortController.abort(),this.currentAbortController=null)}}module.exports={ExecutionManager:ExecutionManager};
