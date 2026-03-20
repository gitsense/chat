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

let chatApi=require("../../../../chat");class ImportService{static async upload(e,r,o={}){try{var{success:t,storageId:s,error:a}=await chatApi.saveImportDataFiles(e,r,o);return{success:t,storageId:s,error:a}}catch(e){return console.error("Upload failed:",e),{success:!1,error:e.message||"Upload failed"}}}static async createRepoStream(o,l,R={}){return new Promise((t,s)=>{let{onProgress:a=()=>{},onError:n=()=>{},onComplete:c=()=>{}}=R;var e=new URLSearchParams,r=(e.set("storage-id",l),e.set("task","convert-files-to-repository"),o.streamURL);let i=new EventSource(r+"?"+e.toString());i.onmessage=r=>{try{var e,o=JSON.parse(r.data);"error"===r.type||o.errorCode&&o.errorType?(i.close(),e={type:o.errorType||"unknown",code:o.errorCode||"UNKNOWN_ERROR",message:o.content,details:o.details||{}},n(e),s(e)):(a(o.content),o.done&&(i.close(),c(o),t(o)))}catch(e){console.error("Failed to parse SSE message:",e),i.close();r={type:"network",code:"SSE_PARSE_ERROR",message:"Failed to parse server response",details:{originalError:e.toString()}};n(r),s(r)}},i.onerror=e=>{console.error("SSE error:",e),console.log("ERROR String: ",e.toString()),i.close();e={type:"network",code:"SSE_CONNECTION_ERROR",message:"Connection error during repository creation",details:{originalError:e.toString()}};n(e),s(e)}})}static async importRepoStream(o,l,R={}){return new Promise((t,s)=>{let{onProgress:a=()=>{},onError:n=()=>{},onComplete:c=()=>{}}=R;var e=new URLSearchParams,r=(e.set("storage-id",l),e.set("task","import-repository"),o.streamURL);let i=new EventSource(r+"?"+e.toString());i.onmessage=r=>{try{var e,o=JSON.parse(r.data);"error"===r.type||o.errorCode&&o.errorType?(i.close(),e={type:o.errorType||"unknown",code:o.errorCode||"UNKNOWN_ERROR",message:o.content,details:o.details||{}},n(e),s(e)):(a(o.content),o.done&&(i.close(),c(o),t(o)))}catch(e){console.error("Failed to parse SSE message:",e),i.close();r={type:"network",code:"SSE_PARSE_ERROR",message:"Failed to parse server response",details:{originalError:e.toString()}};n(r),s(r)}},i.onerror=e=>{console.error("SSE error:",e),console.log("ERROR String: ",e.toString()),i.close();e={type:"network",code:"SSE_CONNECTION_ERROR",message:"Connection error during import",details:{originalError:e.toString()}};n(e),s(e)}})}static handleRetry(e,r,o=3){e=this._isRecoverableError(e)&&r<o;return{canRetry:e,retryCount:e?r+1:r}}static _isRecoverableError(e){return["network","timeout","temporary"].includes(e.type)||["SSE_CONNECTION_ERROR","TIMEOUT_ERROR","CONNECTION_ERROR"].includes(e.code)}}module.exports=ImportService;
