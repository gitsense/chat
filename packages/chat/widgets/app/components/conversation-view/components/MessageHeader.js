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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,ModelService=require("../services/ModelService");function renderMessageHeader(e,t,r){var n=e.meta,{type:s,message:a}=t,{}=n||{};return"regular"===s||"notes"===s||"workspace"===s||"project"===s||"task"===s||s.match(/split/)?"":s.match(/^git/)?renderGitHeader(s,t,n,r):a.trimStart().startsWith("# GitSense Chat Analysis")?(n=a+"\n\n### Metadata\n```json\n"+JSON.stringify(t.meta,null,2)+"\n```",r.render(n)):"chat-meta"===s?r.render("### Metadata\n\n```json\n"+JSON.stringify(e.meta,null,2)+"\n```"):"chat-history"===s?r.render("### History\n```json\n"+t.message+"\n```"):""}function renderGitHeader(e,t,r,n){var{highlight:s,path:a,name:i}=r||{};return"git-repos"!==e&&"git-repo-owner"!==e&&"git-repo"!==e&&!("git-branch"===e||"git-ref"===e&&r.type.match(/branch/))&&"git-tree"!==e&&"git-blob"===e?n.render(`# ${i}
`+"`"+a+"`\n```"+s+"\n"+t.message+"\n```"):""}function createMessageContainer(e,{isHistory:t=!1}){return DomUtils.h.createDiv({cls:"gs-chat-assistant-message-content",style:{marginTop:"40px",display:t?"none":null}})}module.exports={renderMessageHeader:renderMessageHeader,createMessageContainer:createMessageContainer};
