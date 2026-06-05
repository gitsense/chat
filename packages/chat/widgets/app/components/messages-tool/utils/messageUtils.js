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

let messageUtils={truncateMessage(e,a=6){var s;return e?(s=e.split("\n")).length<=2*a?e:s.slice(0,a).join("\n")+`

...

`+s.slice(-a).join("\n"):""},formatRelativeTime(e){var a,s,t;return e?(e=new Date(e+(e.endsWith("Z")?"":"Z")),a=new Date,a=Math.floor((a-e)/1e3),e=Math.floor(a/60),s=Math.floor(e/60),t=Math.floor(s/24),a<60?a+"s ago":e<60?e+"m ago":s<24?s+"h ago":t+"d ago"):""},validateMessageRange(e,a,s){return isNaN(a)||isNaN(s)||a<2||s>e.length||s<a?{isValid:!1,error:`Please enter a valid message range (from 2 to ${e.length}).`}:(e=e.slice(a-1,s)).some(e=>"system"===e.role)?{isValid:!1,error:"The range cannot include system messages (message 1)."}:e.some(e=>"compacted-message"===e.type)?{isValid:!1,error:"The range cannot include previously compacted messages."}:{isValid:!0,messagesInRange:e}},formatMessagesForCompactChat(t,e,a){var s=t.slice(e-1,a),n=[...t.slice(0,e-1),...t.slice(a)];return{messagesToCompact:s.map(e=>{var a=e.role||"unknown",s=e.position||t.indexOf(e)+1;return`<${a} message number ${s}>
${e.content||""}
</${a} message number ${s}>`}).join("\n\n"),messagesToKeep:n.map(e=>{var a=e.role||"unknown",s=e.position||t.indexOf(e)+1;return`<${a} message number ${s}>
${e.content||""}
</${a} message number ${s}>`}).join("\n\n"),range:e+"-"+a}},createCompactedMessageMetadata(e,a){return{compactedFrom:e,compactedRange:a,compactedAt:(new Date).toISOString()}},isCompactedMessage(e){return e&&"compacted-message"===e.type},getCompactedMessageInfo(e){return this.isCompactedMessage(e)&&e.metadata?{originalChatId:e.metadata.compactedFrom,range:e.metadata.compactedRange,compactedAt:e.metadata.compactedAt}:null}};module.exports=messageUtils;
