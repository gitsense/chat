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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let dirname=require("path").dirname,express=require("express"),router=express.Router(),{widgets,configs}=require("../../../lib/widgets.js");function getFullname(e,a){return e+"."+a}router.get("/:package",(e,a)=>{e=e.params.package,e=configs[e];e?a.json(e):a.send(404)}),router.get("/:package/:name",(e,a)=>{var{package:e,name:t}=e.params,e=getFullname(e,t),t=configs[e];t?a.json(t):a.send(404)}),router.get("/:package/:name/static/:filename",async(e,a)=>{var{package:e,name:t,filename:s}=e.params;s.match(/\.\.\//)||s.match(/\//)?a.send(404):(e=dirname(dirname(dirname(__dirname)))+`/packages/${e}/widgets/${t}/static/`+s,a.contentType(e),a.sendFile(e))}),router.get("/:package/:name/data",async(e,a)=>{var{package:t,name:s}=e.params,t=getFullname(t,s),s=widgets[t];if(void 0===s)a.send(404);else if(s.getData)try{var n=await s.getData(e);null==n?a.send(500):a.send(n)}catch(e){console.trace(e),a.send(500)}else a.send(405)}),router.delete("/:package/:name/data",async(e,a)=>{var{package:t,name:s}=e.params,t=getFullname(t,s),s=widgets[t];if(void 0===s)a.send(404);else if(s.deleteData)try{var n=await s.deleteData(e);null==n?a.send(500):a.send(n)}catch(e){console.trace(e),a.send(500)}else a.send(405)}),router.post("/:package/:name/data",async(e,a)=>{var{package:t,name:s}=e.params,t=getFullname(t,s),s=widgets[t];if(void 0===s)a.send(404);else if(s.postData)try{var n=await s.postData(e);null==n?a.send(500):a.send(n)}catch(e){console.trace(e),a.send(500)}else a.send(405)}),router.put("/:package/:name/data",async(e,a)=>{var{package:t,name:s}=e.params,t=getFullname(t,s),s=widgets[t];if(void 0===s)a.send(404);else if(s.putData)try{var n=await s.putData(e);null==n?a.send(500):a.send(n)}catch(e){console.trace(e),a.send(500)}else a.send(405)}),router.get("/:package/:name/stream",async(e,a)=>{var{package:t,name:s}=e.params,t=getFullname(t,s),s=widgets[t];if(void 0===s)a.status(404);else if(s.stream)try{await s.stream(e,a),a.end()}catch(e){console.trace(e),a.sendStatus(500)}else a.sendStatus(405)}),router.get("/*",(e,a)=>{a.send(404)}),module.exports=router;
