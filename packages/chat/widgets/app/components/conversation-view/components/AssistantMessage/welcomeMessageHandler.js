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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,QuickChatButtons=require("../../Dependencies").QuickChatButtons;async function handleWelcomeMessage(e,n,c,t){return"welcome"===e.type&&!!n&&(n.querySelectorAll("a").forEach(r=>{r.addEventListener("click",e=>{e.preventDefault();var e=r.textContent.trim().toLowerCase(),n=e.includes("ergonomic"),t=e.includes("demos"),s=e.includes("help"),l=e.includes("smarter agents"),t=n||l?"lessons":t?"demos":s?"help":null;if(!t)return void console.warn(`Unrecognized link text "${e}"`);s={type:t,lessonType:n?"ergonomic-chats":l?"smarter-agents":null,lessonTypeName:n?"Ergonomic Chats 101":l?"Smarter Agents 101":null,onSuccess:()=>{o.remove()}};let o=DomUtils.h.createDiv({});document.body.appendChild(o);e=new QuickChatButtons([s],c);e.render(o),e.click(s)})}),!0)}module.exports={handleWelcomeMessage:handleWelcomeMessage};
