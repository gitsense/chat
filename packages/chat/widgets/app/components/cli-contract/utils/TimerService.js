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

class TimerService{constructor(){this.intervalId=null,this.isRunning=!1}start(t,i,e){this.isRunning&&this.stop(),this.isRunning=!0;let s=new Date(t).getTime();this._checkTime(s,i,e),this.intervalId=setInterval(()=>{this._checkTime(s,i,e)},6e4)}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.isRunning=!1}_checkTime(t,i,e){t-=Date.now();t<=0?(this.stop(),e&&e()):i&&i(this._formatTime(t))}_formatTime(t){var i,t=Math.floor(t/6e4);return t<60?t+"m":(i=Math.floor(t/60),0==(t=t%60)?i+"h":i+`h ${t}m`)}}module.exports=TimerService;
