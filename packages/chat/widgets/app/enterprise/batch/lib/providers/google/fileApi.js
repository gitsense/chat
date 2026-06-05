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

let GoogleGenAI=require("@google/genai").GoogleGenAI,ProviderError=require("../../errors").ProviderError,path=require("path"),fs=require("fs").promises;class GoogleFileApi{constructor(e){if(!e||!e.files)throw new ProviderError('Invalid GoogleGenAI client provided to GoogleFileApi. Missing "files" module.');this.filesClient=e.files}async uploadFile(e,i,r){try{var o={file:e,config:{mimeType:i||this._inferMimeType(e),displayName:r||path.basename(e)}};return await this.filesClient.upload(o)}catch(e){throw console.error("Error uploading file to Google Gemini File API: "+e.message,e),new ProviderError("Failed to upload file to Gemini File API: "+e.message,"Google Gemini File API",e.status||null,e)}}async downloadFile(e,i){try{var r={file:e,downloadPath:i};await this.filesClient.download(r),console.log(`File ${e} downloaded to `+i)}catch(e){throw console.error("Error downloading file from Google Gemini File API: "+e.message,e),new ProviderError("Failed to download file from Gemini File API: "+e.message,"Google Gemini File API",e.status||null,e)}}async listFiles(e={}){try{var i,r={config:{pageSize:e.pageSize}},o=await this.filesClient.list(r),l=[];for await(i of o)l.push(i);return l}catch(e){throw console.error("Error listing files from Google Gemini File API: "+e.message,e),new ProviderError("Failed to list files from Gemini File API: "+e.message,"Google Gemini File API",e.status||null,e)}}async getFileMetadata(e){try{return await this.filesClient.get({name:e})}catch(e){if(404===e.status)return null;throw console.error("Error retrieving file metadata from Google Gemini File API: "+e.message,e),new ProviderError("Failed to get file metadata from Gemini File API: "+e.message,"Google Gemini File API",e.status||null,e)}}async deleteFile(e){try{await this.filesClient.delete({name:e}),console.log(`File ${e} deleted from Gemini File API.`)}catch(e){throw console.error("Error deleting file from Google Gemini File API: "+e.message,e),new ProviderError("Failed to delete file from Gemini File API: "+e.message,"Google Gemini File API",e.status||null,e)}}_inferMimeType(e){switch(path.extname(e).toLowerCase()){case".txt":return"text/plain";case".json":return"application/json";case".jsonl":return"application/jsonl";case".jpg":case".jpeg":return"image/jpeg";case".png":return"image/png";case".gif":return"image/gif";case".pdf":return"application/pdf";case".mp3":return"audio/mpeg";case".mp4":return"video/mp4";case".zip":return"application/zip";default:return"application/octet-stream"}}}module.exports=GoogleFileApi;
