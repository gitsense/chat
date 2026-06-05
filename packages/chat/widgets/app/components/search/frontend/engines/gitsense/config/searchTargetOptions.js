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

let searchTargetOptions=[{value:"chats",label:"Chats",criteria:{targets:["chats"],filters:{}}},{value:"messages",label:"Messages",criteria:{targets:["messages"],filters:{}}},{value:"standard-messages",label:"Standard Messages",criteria:{targets:["messages"],filters:{role:{operator:"IN",values:["user","assistant"]},"msg-type":{operator:"IN",values:["regular"]}}}},{value:"standard-user-messages",label:"Standard User Messages",criteria:{targets:["messages"],filters:{role:{operator:"IN",values:["user"]},"msg-type":{operator:"IN",values:["regular"]}}}},{value:"standard-assistant-messages",label:"Standard Assistant Messages",criteria:{targets:["messages"],filters:{role:{operator:"IN",values:["assistant"]},"msg-type":{operator:"IN",values:["regular"]}}}},{value:"standard-system-messages",label:"Standard System Messages",criteria:{targets:["messages"],filters:{role:{operator:"IN",values:["system"]},"msg-type":{operator:"IN",values:["regular"]}}}},{value:"git-messages",label:"Git Messages (Metadata)",criteria:{targets:["messages"],filters:{"msg-type":{operator:"IN",values:["git-repos","git-repo-owner","git-repo","git-ref","git-branch","git-commit","git-tag","git-tree"]}}}},{value:"git-nav",label:"Git Navigation",criteria:{targets:["chats"],filters:{}}},{value:"git-blobs",label:"Git Blobs",criteria:{targets:["messages"],filters:{"msg-type":{operator:"IN",values:["git-blob"]}}}},{value:"overviews",label:"Overviews",criteria:{targets:["messages"],filters:{"msg-type":{operator:"IN",values:["tiny-overview::file-content::default","short-overview::file-content::default"]}}}},{value:"code-blocks",label:"Code Blocks",criteria:{targets:["code-blocks"],filters:{}}}];module.exports=searchTargetOptions;
