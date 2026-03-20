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

let FileUtils=require("../../utils/fileUtils");class FileService{static validateFiles(t,e){return FileUtils.validateFilesAgainstLimits(t,e)}static createFileFromSnippet(t,e){return{name:t,size:new Blob([e]).size,type:this._getMimeTypeFromFilename(t),content:e,isSnippet:!0,isTextFile:!0}}static async prepareFilesForUpload(t){var e,i,s,x=[];for(e of t)e.isTextFile&&!e.isSkipped&&(e.isSnippet?(i=Buffer.from(e.content,"utf8"),x.push({name:e.name,path:e.name,content:i,size:i.length,mimeType:e.type})):(i=await e.file.arrayBuffer(),s=Buffer.from(i),x.push({name:e.name,path:e.name,content:s,size:e.size,mimeType:e.file.type})));return x}static generateUniqueName(i,s){if(!s.some(t=>t.name===i))return i;var x=i.split(".");if(1<x.length){var l=x.pop(),a=x.join(".");let t=1,e;for(;e=`${a}_${t}.`+l,t++,s.some(t=>t.name===e););return e}{let t=1,e;for(;e=i+"_"+t,t++,s.some(t=>t.name===e););return e}}static async isTextFile(t){return t.file?FileUtils.isTextFile(t.file):FileUtils.isTextFileByExtension({name:t.name,type:t.type})}static _getMimeTypeFromFilename(t){return{js:"text/javascript",jsx:"text/javascript",ts:"text/typescript",tsx:"text/typescript",py:"text/x-python",java:"text/x-java-source",c:"text/x-c",cpp:"text/x-c++",h:"text/x-c",hpp:"text/x-c++",cs:"text/x-csharp",php:"text/x-php",rb:"text/x-ruby",go:"text/x-go",rs:"text/x-rust",swift:"text/x-swift",kt:"text/x-kotlin",scala:"text/x-scala",sh:"text/x-shellscript",bash:"text/x-shellscript",zsh:"text/x-shellscript",fish:"text/x-shellscript",ps1:"text/x-powershell",bat:"text/x-batch",cmd:"text/x-batch",html:"text/html",htm:"text/html",css:"text/css",scss:"text/x-scss",sass:"text/x-sass",less:"text/x-less",xml:"text/xml",json:"application/json",yaml:"text/x-yaml",yml:"text/x-yaml",toml:"text/x-toml",ini:"text/x-ini",cfg:"text/x-ini",conf:"text/x-ini",log:"text/plain",txt:"text/plain",md:"text/markdown",markdown:"text/markdown",sql:"text/x-sql",dockerfile:"text/x-dockerfile","docker-compose":"text/x-yaml",gitignore:"text/plain",gitattributes:"text/plain",editorconfig:"text/plain",eslintrc:"text/plain",prettierrc:"text/plain",babelrc:"text/plain",tsconfig:"application/json",diff:"text/x-diff",patch:"text/x-diff"}[t.split(".").pop().toLowerCase()]||"text/plain"}}module.exports=FileService;
