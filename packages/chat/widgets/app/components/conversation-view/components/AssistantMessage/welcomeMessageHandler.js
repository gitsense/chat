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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,QuickChatButtons=require("../../Dependencies").QuickChatButtons;async function handleWelcomeMessage(e,n,r,t){return"welcome"===e.type&&!!n&&(n.querySelectorAll("a").forEach(c=>{c.addEventListener("click",e=>{e.preventDefault();var e=c.textContent.trim().toLowerCase(),n=e.includes("ergonomic"),t=e.includes("demos"),s=e.includes("help"),o=e.includes("code smarter"),t=n||o?"lessons":t?"demos":s?"help":null;if(!t)return void console.warn(`Unrecognized link text "${e}"`);s={type:t,lessonType:n?"ergonomic-chats":o?"code-smarter":null,lessonTypeName:n?"Ergonomic Chats 101":o?"Code Smarter 101":null,onSuccess:()=>{l.remove()}};let l=DomUtils.h.createDiv({});document.body.appendChild(l);e=new QuickChatButtons([s],r);e.render(l),e.click(s)})}),!0)}module.exports={handleWelcomeMessage:handleWelcomeMessage};
