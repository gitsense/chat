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

let ChatUtils=require("@gitsense/gsc-utils").ChatUtils,CompactMessageValidator=require("./CompactMessageValidator").CompactMessageValidator,chatApi=require("../../../chat");class DeleteMessageService{static validateSelectedMessages(e){return e&&0!==e.length?e.some(e=>"system"===e.role)?{isValid:!1,error:"System messages cannot be deleted."}:{isValid:!0}:{isValid:!1,error:"No messages selected for deletion."}}static createTraceabilityMessage(e,a){var t=(new Date).toISOString();return`### Trace Metadata Message

This message was created to trace back to the original conversation after a message deletion operation.

- **Original Chat UUID:** [${e}](/?chat=${e})
- **Deleted Messages:** ${[...a].sort((e,a)=>e-a).join(", ")}
- **Deletion Date:** ${t}
- **Operation:** Delete
`}static async createDeletedChat(e,a){var{widget:e,chat:t}=e;let{selectedMessages:s,relationship:i,originalChatName:r,deletedChatName:l,originalMessages:o}=a;var a=s.map(e=>e.position),a=this.createTraceabilityMessage(t.uuid,a),d=o.filter(a=>!s.some(e=>e.id===a.id)),a=(d.push({role:"assistant",message:a,type:"trace-metadata",visibility:"human-public"}),await chatApi.newChat(e,{name:l,type:t.type,messages:d,model:t.main_model,temperature:0,parentId:"child"===i?t.id:t.parent_id}));if(a)return r===t.name&&"swap"!==i||await chatApi.updateChat(e,t.uuid,{name:r!==t.name?r:null,parentId:"swap"===i?a.id:null}),a;throw new Error("Failed to create deleted chat "+l)}static openDeletedChat(e){e="/?chat="+e.uuid;window.location.assign(e)}}module.exports={DeleteMessageService:DeleteMessageService};
