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

let ChatUtils=require("@gitsense/gsc-utils").ChatUtils,CompactMessageValidator=require("./CompactMessageValidator").CompactMessageValidator,chatApi=require("../../../chat");class NewChatService{static validateSelectedMessages(e){return e&&0!==e.length?{isValid:!0}:{isValid:!1,error:"No messages selected for new chat."}}static createTraceabilityMessage(e,a){var t=(new Date).toISOString();return`### Trace Metadata Message 

- **Original Chat UUID:** [${e}](/?chat=${e})
- **Included Messages:** ${[...a].sort((e,a)=>e-a).join(", ")}
- **Creation Date:** ${t}
- **Operation:** New chat
`}static async createNewChat(e,a){var{widget:e,chat:t}=e,{selectedMessages:a,newChatName:i,relationship:s,addTraceability:r,postCreationAction:c}=a,n=a.map(e=>e.position),o=[],a=[...a].sort((e,a)=>e.position-a.position);o.push(...a),r&&(a=this.createTraceabilityMessage(t.uuid,n),o.push({role:"assistant",message:a,type:"trace-metadata",visibility:"human-public"}));let d;switch(s){case"child":d=t.id;break;case"sibling":case"swap":d=t.parent_id;break;default:d=0}r=await chatApi.newChat(e,{name:i,type:t.type,messages:o,model:t.main_model,temperature:0,parentId:d});if(r)return"swap"===s&&await chatApi.updateChat(e,t.uuid,{parentId:r.id}),{newChat:r,postCreationAction:c};throw new Error("Failed to create new chat "+i)}static openNewChat(e){e="/?chat="+e.uuid;window.location.assign(e)}static openNewChatInNewTab(e){e="/?chat="+e.uuid;window.open(e,"_blank")}}module.exports={NewChatService:NewChatService};
