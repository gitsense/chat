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

let format=require("sql-formatter").format,castJsonExtract=require("../../utils/sqlCastingUtils").castJsonExtract,resolveDescendantChatIds=require("./scopeResolvers/resolveDescendantChatIds").resolveDescendantChatIds,resolveConnectedChatIds=require("./scopeResolvers/resolveConnectedChatIds").resolveConnectedChatIds,FIELD_TABLE_MAP=require("../constants").FIELD_TABLE_MAP,DEBUG="TRUE"===process.env.GSC_DEBUG?.toUpperCase();async function buildMetaRawQuery(s,e,t=null){let{analyzerId:a,fieldsToExtract:r,repoFullNames:n,chatIds:l,scope:c}=e;if(!a)throw new Error("Analyzer ID is mandatory for the meta-raw query builder.");if(!r||0===r.length)throw new Error("At least one field to extract is mandatory for the meta-raw query builder.");let o=null,i=("current-chat"===c&&null!==t?o=[t]:"current-chat-and-branches"===c&&null!==t?o=await resolveDescendantChatIds(s,t):"connected-chats"===c&&null!==t&&(o=await resolveConnectedChatIds(s,t)),null),h=(null!==l&&0<l.length?i=null!==o?o.filter(e=>l.includes(e)):l:null!==o&&(i=o),null),d=null;t=n&&0<n.length||null!==i&&0<i.length;t&&(d="cte_filter_chat_ids",h=s("chats").select("chats.id as chat_id").where("chats.deleted",0),n&&0<n.length&&(h=h.join("groups","chats.group_id","groups.id").whereIn("groups.name",n)),null!==i)&&0<i.length&&(h=h.whereIn("chats.id",i));let u=s("messages").select(["messages.id as messages_id","messages.chat_id as chats_id","messages.type as messages_type","messages.updated_at as messages_updated_at","chats.uuid as chats_uuid","chats.name as chats_name","chats.type as chats_type","groups.name as groups_name",s.raw("json_extract(chats.meta, '$.path') as chats_meta_git_path"),s.raw("json_extract(chats.meta, '$.language') as chats_meta_language"),s.raw("json_extract(chats.meta, '$.type') as chats_meta_ref_type"),s.raw("json_extract(chats.meta, '$.refContext.refName') as chats_meta_ref_name"),s.raw("json_extract(chats.meta, '$.refContext.refType') as chats_meta_ref_context_type")]).where("messages.deleted",0).where("messages.type",a).join("chats","messages.chat_id","chats.id").leftJoin("groups","chats.group_id","groups.id");t&&u.join(d,"messages.chat_id",d+".chat_id"),r.forEach(({field:e,type:t})=>{let a;a="string"===t||"array"===t?"TEXT":"number"===t?"REAL":"boolean"===t?"INTEGER":"datetime"===t?"REAL":"TEXT";t="$.extracted_metadata."+e,e="meta_"+e,t=castJsonExtract(s,"messages","meta",t,a,e);u.select(t)}),u.orderBy("chats_id","asc");var m=e.pagination?.limit,_=e.pagination?.offset;null!==m&&0<m&&u.limit(m),null!==_&&0<=_&&u.offset(_),DEBUG&&(console.log("META RAW SQL QUERY:"),console.log(format(u.toString(),{language:"sqlite"})));let g=u;return{finalQuery:g=t?u.with(d,h):g,matchCTEs:{},searchCriteria:e,isMetaRaw:!0,isMetaInsights:!1,isMetaSearch:!1}}module.exports={buildMetaRawQuery:buildMetaRawQuery};
