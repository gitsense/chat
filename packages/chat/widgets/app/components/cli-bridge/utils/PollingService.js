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

let CLI_BRIDGE_CONSTANTS=require("../constants").CLI_BRIDGE_CONSTANTS;class PollingService{constructor(s,t=CLI_BRIDGE_CONSTANTS.DEFAULTS.POLLING_INTERVAL_MS){this.checkStatusFunction=s,this.interval=t,this.intervalId=null,this.isRunning=!1,this.currentCode=null}start(s,t={}){this.isRunning&&this.stop(),this.currentCode=s,this.isRunning=!0,this.callbacks=t,this._poll(),this.intervalId=setInterval(()=>{this._poll()},this.interval)}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.isRunning=!1,this.currentCode=null}isActive(){return this.isRunning}async _poll(){if(this.currentCode&&this.checkStatusFunction)try{var s,t,i=await this.checkStatusFunction(this.currentCode);i.success?(s=i.data,t=Date.now(),s.expiresAt<t?(this.stop(),this.callbacks.onTimeout&&this.callbacks.onTimeout(s)):s.status===CLI_BRIDGE_CONSTANTS.STATUS_TYPES.ERROR?(this.stop(),s.error&&"USER_ABORTED"===s.error.code?this.callbacks.onUserAborted&&this.callbacks.onUserAborted(s):this.callbacks.onError&&this.callbacks.onError(s.error||{code:"UNKNOWN_ERROR",message:"Command failed"})):s.status===CLI_BRIDGE_CONSTANTS.STATUS_TYPES.SUCCESS?(this.stop(),this.callbacks.onSuccess&&this.callbacks.onSuccess(s)):this.callbacks.onPending&&this.callbacks.onPending(s)):i.error===CLI_BRIDGE_CONSTANTS.ERROR_CODES.CODE_NOT_FOUND&&(this.stop(),this.callbacks.onError)&&this.callbacks.onError({code:i.error,message:"Code not found"})}catch(s){console.error("Polling error:",s)}}}module.exports=PollingService;
