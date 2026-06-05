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

let CLI_BRIDGE_CONSTANTS=require("../constants").CLI_BRIDGE_CONSTANTS;class PollingService{constructor(s,t=CLI_BRIDGE_CONSTANTS.DEFAULTS.POLLING_INTERVAL_MS){this.checkStatusFunction=s,this.interval=t,this.intervalId=null,this.isRunning=!1,this.currentCode=null}start(s,t={}){this.isRunning&&this.stop(),this.currentCode=s,this.isRunning=!0,this.callbacks=t,this._poll(),this.intervalId=setInterval(()=>{this._poll()},this.interval)}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.isRunning=!1,this.currentCode=null}isActive(){return this.isRunning}async _poll(){if(this.currentCode&&this.checkStatusFunction)try{var s,t,i=await this.checkStatusFunction(this.currentCode);i.success?(s=i.data,t=Date.now(),s.expiresAt<t?(this.stop(),this.callbacks.onTimeout&&this.callbacks.onTimeout(s)):s.status===CLI_BRIDGE_CONSTANTS.STATUS_TYPES.ERROR?(this.stop(),s.error&&"USER_ABORTED"===s.error.code?this.callbacks.onUserAborted&&this.callbacks.onUserAborted(s):this.callbacks.onError&&this.callbacks.onError(s.error||{code:"UNKNOWN_ERROR",message:"Command failed"})):s.status===CLI_BRIDGE_CONSTANTS.STATUS_TYPES.SUCCESS?(this.stop(),this.callbacks.onSuccess&&this.callbacks.onSuccess(s)):this.callbacks.onPending&&this.callbacks.onPending(s)):i.error===CLI_BRIDGE_CONSTANTS.ERROR_CODES.CODE_NOT_FOUND&&(this.stop(),this.callbacks.onError)&&this.callbacks.onError({code:i.error,message:"Code not found"})}catch(s){console.error("Polling error:",s)}}}module.exports=PollingService;
