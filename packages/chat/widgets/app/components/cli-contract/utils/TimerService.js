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

class TimerService{constructor(){this.intervalId=null,this.isRunning=!1}start(t,i,e){this.isRunning&&this.stop(),this.isRunning=!0;let s=new Date(t).getTime();this._checkTime(s,i,e),this.intervalId=setInterval(()=>{this._checkTime(s,i,e)},6e4)}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.isRunning=!1}_checkTime(t,i,e){t-=Date.now();t<=0?(this.stop(),e&&e()):i&&i(this._formatTime(t))}_formatTime(t){var i,t=Math.floor(t/6e4);return t<60?t+"m":(i=Math.floor(t/60),0==(t=t%60)?i+"h":i+`h ${t}m`)}}module.exports=TimerService;
