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

let ChatUtils=require("@gitsense/gsc-utils").ChatUtils,CompactMessageValidator=require("./CompactMessageValidator").CompactMessageValidator,chatApi=require("../../../chat");class ReplaceMessageService{static validateMessageRange(e,a,t){return isNaN(a)||isNaN(t)||a<2||t>e.length||t<a?{isValid:!1,error:`Please enter a valid message range (from 2 to ${e.length}).`}:{isValid:!0,messagesInRange:messagesInRange}}static createTraceabilityMessage(e,a,t){return`### Trace Metadata Message

- **Original Chat UUID:** [${e}](/?chat=${e})
- **Replaced Range:** Messages ${a}-${t}
- **Replacement Date:** ${(new Date).toISOString()}
- **Operation:** Replace
`}static async createReplacedChat(e,a){var{widget:e,chat:t}=e,{from:a,to:s,replacementMessage:i,role:r,relationship:l,originalChatName:c,replacedChatName:n,originalMessages:g}=a;if(!i||"string"==typeof i&&!i.trim())throw new Error("Replacement message cannot be empty.");var p=this.createTraceabilityMessage(t.uuid,a,s),a=[...g.slice(0,a-1),{role:r,message:i,type:"regular"},{role:"assistant",message:p,type:"trace-metadata",visibility:"human-public"},...g.slice(s)],r=await chatApi.newChat(e,{name:n,type:t.type,messages:a,model:t.main_model,temperature:0,parentId:"child"===l?t.id:t.parent_id});if(r)return c===t.name&&"swap"!==l||await chatApi.updateChat(e,t.uuid,{name:c!==t.name?c:null,parentId:"swap"===l?r.id:null}),r;throw new Error("Failed to create replaced chat "+n)}static openReplacedChat(e){e="/?chat="+e.uuid;window.location.assign(e)}}module.exports={ReplaceMessageService:ReplaceMessageService};
