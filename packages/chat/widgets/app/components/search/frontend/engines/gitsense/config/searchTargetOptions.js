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

let searchTargetOptions=[{value:"chats",label:"Chats",criteria:{targets:["chats"],filters:{}}},{value:"messages",label:"Messages",criteria:{targets:["messages"],filters:{}}},{value:"standard-messages",label:"Standard Messages",criteria:{targets:["messages"],filters:{role:{operator:"IN",values:["user","assistant"]},"msg-type":{operator:"IN",values:["regular"]}}}},{value:"standard-user-messages",label:"Standard User Messages",criteria:{targets:["messages"],filters:{role:{operator:"IN",values:["user"]},"msg-type":{operator:"IN",values:["regular"]}}}},{value:"standard-assistant-messages",label:"Standard Assistant Messages",criteria:{targets:["messages"],filters:{role:{operator:"IN",values:["assistant"]},"msg-type":{operator:"IN",values:["regular"]}}}},{value:"standard-system-messages",label:"Standard System Messages",criteria:{targets:["messages"],filters:{role:{operator:"IN",values:["system"]},"msg-type":{operator:"IN",values:["regular"]}}}},{value:"git-messages",label:"Git Messages (Metadata)",criteria:{targets:["messages"],filters:{"msg-type":{operator:"IN",values:["git-repos","git-repo-owner","git-repo","git-ref","git-branch","git-commit","git-tag","git-tree"]}}}},{value:"git-nav",label:"Git Navigation",criteria:{targets:["chats"],filters:{}}},{value:"git-blobs",label:"Git Blobs",criteria:{targets:["messages"],filters:{"msg-type":{operator:"IN",values:["git-blob"]}}}},{value:"overviews",label:"Overviews",criteria:{targets:["messages"],filters:{"msg-type":{operator:"IN",values:["tiny-overview::file-content::default","short-overview::file-content::default"]}}}},{value:"code-blocks",label:"Code Blocks",criteria:{targets:["code-blocks"],filters:{}}}];module.exports=searchTargetOptions;
