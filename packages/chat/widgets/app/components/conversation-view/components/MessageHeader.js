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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,ModelService=require("../services/ModelService");function renderMessageHeader(e,t,r){var n=e.meta,{type:s,message:a}=t,{}=n||{};return"regular"===s||"notes"===s||"workspace"===s||"project"===s||"task"===s||s.match(/split/)?"":s.match(/^git/)?renderGitHeader(s,t,n,r):a.trimStart().startsWith("# GitSense Chat Analysis")?(n=a+"\n\n### Metadata\n```json\n"+JSON.stringify(t.meta,null,2)+"\n```",r.render(n)):"chat-meta"===s?r.render("### Metadata\n\n```json\n"+JSON.stringify(e.meta,null,2)+"\n```"):"chat-history"===s?r.render("### History\n```json\n"+t.message+"\n```"):""}function renderGitHeader(e,t,r,n){var{highlight:s,path:a,name:i}=r||{};return"git-repos"!==e&&"git-repo-owner"!==e&&"git-repo"!==e&&!("git-branch"===e||"git-ref"===e&&r.type.match(/branch/))&&"git-tree"!==e&&"git-blob"===e?n.render(`# ${i}
`+"`"+a+"`\n```"+s+"\n"+t.message+"\n```"):""}function createMessageContainer(e,{isHistory:t=!1}){return DomUtils.h.createDiv({cls:"gs-chat-assistant-message-content",style:{marginTop:"40px",display:t?"none":null}})}module.exports={renderMessageHeader:renderMessageHeader,createMessageContainer:createMessageContainer};
