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

async function fetchReviewUserInstructions(t,e){var e=e.widget,e=e.dataURL,r=new URLSearchParams,e=(r.set("action","get-search-user-instructions"),r.set("instruction-set",t),e+"?"+r.toString()),r=await fetch(e);if(!r.ok)throw console.error(`Failed to fetch review user instructions for ${t}: HTTP status `+r.status),new Error("Unable to load review instructions.");e=await r.json();if("success"!==e.status)throw console.error(`Failed to get review user instructions for ${t}: `+e.data),new Error("Unable to load review instructions.");return e.data.split("\n\n\n").pop()}async function fetchReviewSystemPrompt(t,e,r,s,o){var i=e.widget,i=i.dataURL,a=new URLSearchParams,s=(a.set("action","generate-search-system-prompt"),a.set("instruction-set",t),a.set("user-query",s||""),a.set("generated-queries",JSON.stringify(o)||""),e.chat?.id&&a.set("current-chat-id",e.chat.id),i+"?"+a.toString()),o=await fetch(s);if(!o.ok)throw console.error(`Failed to fetch review system prompt for ${t}: HTTP status `+o.status),new Error("Unable to load review system prompt.");e=await o.json();if("success"!==e.status)throw console.error(`Failed to get review system prompt for ${t}: `+e.data),new Error("Unable to load review system prompt.");return e.data}module.exports={fetchReviewUserInstructions:fetchReviewUserInstructions,fetchReviewSystemPrompt:fetchReviewSystemPrompt};
