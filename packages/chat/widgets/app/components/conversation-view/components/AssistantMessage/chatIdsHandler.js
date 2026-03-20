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

let{ContextUtils,ChatUtils,CodeBlockUtils,DomUtils,GSToolBlockUtils,MessageUtils,MetaRawResultUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../services/MessageService"),GS_CHAT_TOOL_TYPE="gs-tool",CONTEXT_LOADER_TOOL="context-loader",h=DomUtils.h;async function handleChatIds(e,t,s,a){var o=e.message;if(!o)return!1;if(GSToolBlockUtils.getToolBlocksByTool(o,CONTEXT_LOADER_TOOL,CodeBlockUtils).length)return!0;var i,l,n=new Map;let r=new Map;for(i of ChatUtils.getChatMessages(s.chat,e.model))if(MessageUtils.isContextMessage(i.message))try{for(l of ContextUtils.extractContextSections(i.message)){var h=l["chat id"],c=l.path;h&&c&&n.set(h,l)}}catch(e){console.warn("chatIdsHandler: Error parsing context message for validation:",e)}else MessageUtils.isContextItemsOverviewMessage(i.message)&&ContextUtils.extractContextItemsOverviewTableRows(i.message).forEach(e=>{var{chatId:t,gitPath:s}=e;t&&s&&r.set(t,e)});for(var d=MetaRawResultUtils.extractMetaRawResultMappings(s.chat),g="ai-search-results"===e.type||e.message.trimStart().startsWith("## AI Search "),p="imported-data-summary"===e.type,C=e.message.trimStart().startsWith("```txt\n # GitSense Chat Tool"),m=/\(chat[-| ]id:*\s*(\d+)\)/gi,u=new Set,w=[];null!==(x=m.exec(o));){var x=parseInt(x[1],10);n.has(x)||d.has(x)||r.has(x)||g||C||p||(console.warn(`chatIdsHandler: Referenced chat-id ${x} not found in context or metadata insights analysis message.`),w.push(`<li>${x}</li>`)),u.add(x)}if(0===u.size)return!1;var T={tool:CONTEXT_LOADER_TOOL,show:!0,config:{container:{style:{marginTop:"15px"}},selected:{info:{},files:{}},actions:{load:{type:"link",text:"Review, load and add",showCopy:!0,showSave:!1,showAdd:!0},copy:{type:"link"},paste:{type:"link"}},chatIds:[...u],postLoad:{show:!0},showQuickLoad:!0,showManage:!0}},f=new RegExp("(\n\nAuthored by LLM .+)$"),v=o.match(f),f=o.replace(f,"")+"\n\n```txt\n# GitSense Chat Tool\n\n"+JSON.stringify(T,null,2)+"\n```"+(v?v[0]:"");await MessageService.updateChatMessage(s.widget,e.id,null,f),s.updateChat()}module.exports={handleChatIds:handleChatIds};
