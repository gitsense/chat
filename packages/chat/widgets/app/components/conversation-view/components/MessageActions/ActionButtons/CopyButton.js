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

let ChatUtils=require("@gitsense/gsc-utils").ChatUtils,MessageService=require("../../../services/MessageService"),svg=require("../../../Dependencies").svg;function render(e,s,r){let a=svg.copy({style:{cursor:"pointer",transition:"opacity 300ms ease-in-out"}});e.appendChild(a),a.onclick=async()=>{try{var t=await MessageService.getChat(r.widget,r.chat.uuid),i=ChatUtils.getChatMessages(t).find(e=>e.id===s.id)?.message||"";a.style.opacity="0",await new Promise(e=>setTimeout(e,300)),await navigator.clipboard.writeText(i),a.style.opacity="1";let e=a.innerHTML;a.innerHTML=svg.check().outerHTML,setTimeout(()=>{a.innerHTML=e},1e3)}catch(e){console.error("Copy failed:",e),a.style.opacity="1"}}}module.exports={render:render};
