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

let fs=require("fs"),path=require("path"),CodeGenerator=require("../utils/CodeGenerator"),CLI_BRIDGE_CONSTANTS=require("../constants").CLI_BRIDGE_CONSTANTS;class GSCCodeService{constructor(e){this.gscHome=this._resolveGSCHome(e),this.codesDir=path.join(this.gscHome,"data","codes")}_resolveGSCHome(e){var s,e=e||process.env.GSC_HOME;if(!e)throw(s=new Error(CLI_BRIDGE_CONSTANTS.ERROR_MESSAGES.GSC_HOME_NOT_DEFINED)).code=CLI_BRIDGE_CONSTANTS.ERROR_CODES.GSC_HOME_NOT_DEFINED,s;if(fs.existsSync(e)&&fs.statSync(e).isDirectory())return e;throw(s=new Error(CLI_BRIDGE_CONSTANTS.ERROR_MESSAGES.GSC_HOME_INVALID_PATH.replace(/{resolved}/,e))).code=CLI_BRIDGE_CONSTANTS.ERROR_CODES.GSC_HOME_INVALID_PATH,s}async ensureCodesDirectory(){fs.existsSync(this.codesDir)||fs.mkdirSync(this.codesDir,{recursive:!0,mode:448})}async createGSCCode(e,s=null){var{chatId:t,chatTitle:r,timeoutMinutes:i,dbPath:n,parentMessageId:c,maxOutputSizeMB:a}=e;if(!t)return{success:!1,error:"Missing chat ID"};if(isNaN(t))return{success:!1,error:"Unexpected chat ID data type. Expecting a number but found "+t};if(!r)return{success:!1,error:"Missing chat title"};if(!c)return{success:!1,error:"Missing parent message ID"};if(isNaN(c))return{success:!1,error:"Unexpected parent message ID data type. Expecting a number but found "+c};await this.ensureCodesDirectory();let S=0;for(var o=CLI_BRIDGE_CONSTANTS.DEFAULTS.MAX_CODE_GENERATION_RETRIES;S<o;){var E,_,u,C=CodeGenerator.generate(),d=path.join(this.codesDir,C+".json");if(!fs.existsSync(d))return u=(E=Date.now())+60*i*1e3,_=a?1024*a*1024:CLI_BRIDGE_CONSTANTS.DEFAULTS.MAX_OUTPUT_SIZE_BYTES,u={code:C,chatId:t,chatTitle:r,dbPath:n||path.join(this.gscHome,"data","chats.sqlite3"),gscHome:this.gscHome,expiresAt:u,createdAt:E,defaultVisibility:"public",generatedBy:"web-ui",consumer:"gsc",status:CLI_BRIDGE_CONSTANTS.STATUS_TYPES.PENDING,command:null,startedAt:null,finishedAt:null,error:null,result:{messageId:null,output:null},parentMessageId:c||null,maxOutputSize:_,authcode:s||null},fs.writeFileSync(d,JSON.stringify(u,null,2)),{success:!0,code:C,codeData:u};S++}e=new Error(CLI_BRIDGE_CONSTANTS.ERROR_MESSAGES.CODE_COLLISION_LIMIT_REACHED);throw e.code=CLI_BRIDGE_CONSTANTS.ERROR_CODES.CODE_COLLISION_LIMIT_REACHED,e}async getCodeStatus(e){e=path.join(this.codesDir,e+".json");if(!fs.existsSync(e))return{success:!1,error:CLI_BRIDGE_CONSTANTS.ERROR_CODES.CODE_NOT_FOUND};try{return{success:!0,data:JSON.parse(fs.readFileSync(e,"utf8"))}}catch(e){return{success:!1,error:CLI_BRIDGE_CONSTANTS.ERROR_CODES.INVALID_CODE_FORMAT}}}async deleteCode(e){e=path.join(this.codesDir,e+".json");fs.existsSync(e)&&fs.unlinkSync(e)}async performLazyCleanup(){if(fs.existsSync(this.codesDir)){var e=fs.readdirSync(this.codesDir);let c=Date.now();e.forEach(s=>{if(s.endsWith(".json")){var e=path.join(this.codesDir,s);try{var t=JSON.parse(fs.readFileSync(e,"utf8")),r=t.expiresAt<c,i=t.status===CLI_BRIDGE_CONSTANTS.STATUS_TYPES.SUCCESS,n=t.status===CLI_BRIDGE_CONSTANTS.STATUS_TYPES.ERROR&&null!==t.finishedAt;null!==t.startedAt&&t.finishedAt;r&&(i||n)&&fs.unlinkSync(e)}catch(e){console.warn(`Failed to cleanup file ${s}:`,e.message)}}})}}}module.exports=GSCCodeService;
