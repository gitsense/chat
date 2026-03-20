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

let{formatAge,normalizeLanguageName}=require("@gitsense/gsc-utils"),{calculateLineCount,estimateTokenCount}=require("./helpers");function processContextBrowserNode(e,t){var{contextFile:o,codeBlock:n,message:a}=e.data||{};if(!o&&!n&&!a)throw new Error("Unrecognized node object. Missing contextFile, codeBlock, and message property.");let r="",i="",s="text",c="",d="",m="",p="",l="",g="",u="";"context-file"===e.type?(r=o.contextOrigin||"Unknown",i=o.content||"",s=o.language||"text",c=o.name||"",d=o.path||"",m=o.repo||"",p=o.chatMetadata?.refContext?.refName||"main",l=o.block?.header?.Version||"N/A",g=o.block?.header?.Component||"",u=o.block?.header?.Description||""):(i=n.content||"",s=n.language||"text",n.header?(g=n.header.Component||"",u=n.header.Description||"",l=n.header.Version||"N/A",c=g||"Code Block"):n.metadata?(o=n.metadata["Source-Version"]||"N/A",x=n.metadata["Target-Version"]||"N/A",l=o+" → "+x,u=n.metadata.Description||"",c="Patch"):(c="Code Snippet",l="N/A",u=""),e.associatedContextFileEntry&&(o=e.associatedContextFileEntry.contextFile,d=o.path||"",m=o.repo||"",p=o.chatMetadata?.refContext?.refName||"main")),s=normalizeLanguageName(s);var x=calculateLineCount(i),n=estimateTokenCount(i);return{id:e.id,type:e.type,data:{contextOrigin:r,content:i,language:s,metadata:{name:c,path:d,repo:m,branch:p,version:l,component:g,description:u,message:{id:a.id,position:a.position,created_at:a.created_at},metrics:{lines:x,tokens:n}}}}}function processRepositoriesBrowserNode(e,t){console.log({node:e});var o=e.meta||{},n=o.commit||{},a=o.tokens?.content?.estimate||estimateTokenCount(t),r=calculateLineCount(t),i=o.path||e.name||"Unknown Path",s=o.name||e.name||"Unknown File",c=o.repo||"N/A",d=o.refContext?.refName||"N/A",o=o.language||"text",o=normalizeLanguageName(o||"text");return{id:e.id,type:e.type||"file",data:{contextOrigin:"imported",content:t,language:o,metadata:{name:s||"Unknown File",path:i||"",repo:c||"",branch:d||"main",version:"N/A",component:"",description:"",commit:n,message:null,metrics:{lines:r,tokens:a}}}}}module.exports={processContextBrowserNode:processContextBrowserNode,processRepositoriesBrowserNode:processRepositoriesBrowserNode};
