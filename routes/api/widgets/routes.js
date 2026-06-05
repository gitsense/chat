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

let dirname=require("path").dirname,mime=require("mime"),express=require("express"),router=express.Router(),{widgets,configs}=require("../../../lib/widgets.js");function getFullname(e,a){return e+"."+a}router.get("/:package",(e,a)=>{e=e.params.package,e=configs[e];e?a.json(e):a.send(404)}),router.get("/:package/:name",(e,a)=>{var{package:e,name:t}=e.params,e=getFullname(e,t),t=configs[e];t?a.json(t):a.send(404)}),router.get("/:package/:name/static/*",async(e,a)=>{var{package:t,name:s}=e.params,e=e.params[0];e.match(/\.\.\//)?a.sendStatus(404):(t=dirname(dirname(dirname(__dirname)))+`/packages/${t}/widgets/${s}/static/`+e,(s=mime.lookup(t))?a.contentType(s):console.warn("Could not determine content type for "+filename),a.sendFile(t))}),router.get("/:package/:name/data",async(e,a)=>{var{package:t,name:s}=e.params,t=getFullname(t,s),s=widgets[t];if(void 0===s)a.send(404);else if(s.getData)try{var n=await s.getData(e);null==n?a.send(500):a.send(n)}catch(e){console.trace(e),a.send(500)}else a.send(405)}),router.delete("/:package/:name/data",async(e,a)=>{var{package:t,name:s}=e.params,t=getFullname(t,s),s=widgets[t];if(void 0===s)a.send(404);else if(s.deleteData)try{var n=await s.deleteData(e);null==n?a.send(500):a.send(n)}catch(e){console.trace(e),a.send(500)}else a.send(405)}),router.post("/:package/:name/data",async(e,a)=>{var{package:t,name:s}=e.params,t=getFullname(t,s),s=widgets[t];if(void 0===s)a.send(404);else if(s.postData)try{var n=await s.postData(e);null==n?a.send(500):a.send(n)}catch(e){console.trace(e),a.send(500)}else a.send(405)}),router.put("/:package/:name/data",async(e,a)=>{var{package:t,name:s}=e.params,t=getFullname(t,s),s=widgets[t];if(void 0===s)a.send(404);else if(s.putData)try{var n=await s.putData(e);null==n?a.send(500):a.send(n)}catch(e){console.trace(e),a.send(500)}else a.send(405)}),router.get("/:package/:name/stream",async(e,a)=>{var{package:t,name:s}=e.params,t=getFullname(t,s),s=widgets[t];if(void 0===s)a.status(404);else if(s.stream)try{await s.stream(e,a,e.query)}catch(e){console.trace(e),a.sendStatus(500)}else a.sendStatus(405)}),router.post("/:package/:name/stream",async(e,a)=>{var{package:t,name:s}=e.params,t=getFullname(t,s),s=widgets[t];if(void 0===s)a.status(404).send("Widget not found");else if(s.stream)try{await s.stream(e,a,e.body)}catch(e){console.trace(e),a.headersSent||a.sendStatus(500)}else a.sendStatus(405)}),router.get("/*",(e,a)=>{a.send(404)}),module.exports=router;
