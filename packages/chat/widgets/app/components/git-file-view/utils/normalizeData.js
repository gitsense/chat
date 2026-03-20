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

let{estimateTokens,formatAge,normalizeLanguageName}=require("@gitsense/gsc-utils"),VIRTUAL_NODE_TYPES=require("../constants").VIRTUAL_NODE_TYPES;function calculateLineCount(e){return e?e.split("\n").length:0}function normalizeFileData(e){var t=e.type,e=e.data,n=t===VIRTUAL_NODE_TYPES.FILE;let a="",o="text",i=0,r=null,c=null,m=null;var s,l=e.message;let u="N/A",d="N/A",k="N/A",g="N/A",h="N/A",p="N/A",A=!1,C=!1,N=!1;n?(s=e.contextFile,a=s.content||"",o=s.language||"text",m=s.contextOrigin||"unknown",k=s.repo||"unknown",g=s.chatMetadata?.refContext?.refName||"unknown",h=s.path||"unknown",u=s.block?.header?.Component||"unknown",d=s.block?.header?.Description||"unknown",p=s.block?.header?.Version||"unknown","working-directory"===s.contextOrigin&&(p="Working directory based on version "+p),i=s.tokens?.content?.estimate||s.chatMetadata?.tokens?.content?.estimate||estimateTokens(a),s.chatMetadata?.commit&&(r=s.chatMetadata.commit.timestamp,c=s.chatMetadata.commit.author)):("code"===(s=e.codeBlock).type?A=!0:"patch"===s.type&&(C=!0),(C||s.header&&s.header.Component)&&(N=!0),a=!C&&N?s.headerText+"\n\n\n"+(s.content||""):s.content||"",o=s.language||"text",s.header&&s.header.Version?(u=s.header.Component,d=s.header.Description,p=s.header.Version):s.metadata&&s.metadata["Source-Block-UUID"]&&s.metadata["Target-Block-UUID"]&&(p=s.metadata["Source-Version"]+" &rarr; "+s.metadata["Target-Version"],d=s.metadata.Description||"Unknown"),e.associatedContextFileEntry&&(s=e.associatedContextFileEntry.contextFile||{},k=s.repo||"unknown",g=s.chatMetadata?.refContext?.refName||"unknown",h=s.path||"unknown",u=s.block?.header?.Component||"unknown",d=s.block?.header?.Description||"unknown"),i=estimateTokens(a)),o=normalizeLanguageName(o);e=calculateLineCount(a);return{nodeType:t,content:a,language:o,tokens:i,lines:e,commitTimestamp:r,commitAuthor:c,message:l,isContextFile:n,isCode:A,isPatch:C,isTraceable:N,contextOrigin:m,component:u,description:d,repo:"N/A"===k?k:k.split("/").join(" / "),branch:"N/A"===g?g:g.split("/").join(" / "),file:"N/A"===h?h:h.split("/").join(" / "),version:p}}function formatCommitAge(e){return e?(e=new Date(1e3*e),formatAge(e.toISOString())):"N/A"}module.exports={calculateLineCount:calculateLineCount,estimateTokens:estimateTokens,normalizeFileData:normalizeFileData,formatCommitAge:formatCommitAge};
