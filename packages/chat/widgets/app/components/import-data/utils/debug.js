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

let colors={error:"[31m",warn:"[33m",info:"[36m",debug:"[35m",trace:"[37m",reset:"[0m"};class DebugLogger{constructor(e){this.component=e,this.levels={error:0,warn:1,info:2,debug:3,trace:4};var r=process.env.GSC_IMPORT_DEBUG||"error",r=(this.currentLevel=this.levels[r]||0,"GSC_IMPORT_DEBUG_"+e.toUpperCase()),e=process.env[r];e&&void 0!==this.levels[e]&&(this.currentLevel=this.levels[e]),this.enabled=0<=this.currentLevel}error(e,r){this.enabled&&this.currentLevel>=this.levels.error&&this._log("error",e,r)}warn(e,r){this.enabled&&this.currentLevel>=this.levels.warn&&this._log("warn",e,r)}info(e,r){this.enabled&&this.currentLevel>=this.levels.info&&this._log("info",e,r)}debug(e,r){this.enabled&&this.currentLevel>=this.levels.debug&&this._log("debug",e,r)}trace(e,r){this.enabled&&this.currentLevel>=this.levels.trace&&this._log("trace",e,r)}_log(e,r,t){var s=(new Date).toISOString(),l=colors[e]||colors.reset,o=colors.reset;let n=`${l}[${s}] [${e.toUpperCase()}] [${this.component}]${o} `+r;t&&(n+=`
`+JSON.stringify(t,null,2)),console.log(n)}child(e){e=new DebugLogger(this.component+":"+e);return e.currentLevel=this.currentLevel,e.enabled=this.enabled,e}isLevelEnabled(e){return this.enabled&&this.currentLevel>=this.levels[e]}}function createLogger(e){return new DebugLogger(e)}module.exports={DebugLogger:DebugLogger,createLogger:createLogger};
