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

let h=require("../../../../Dependencies").h,{CSS_CLASSES,formatChatPathLink,getItemName,getMetadataSummary}=require("./DirectSearchResultsUtils");function render(e,a){var t=h.createDiv({cls:CSS_CLASSES.TABLE_CONTAINER}),{chats:e,messages:r,codeBlocks:d}=e.results,l=(e,t,a,r)=>{if(!t||0===t.length)return null;var d=h.createDiv({style:{marginBottom:"20px"}}),e=(d.appendChild(h.createH3({text:e,style:{marginBottom:"10px",borderBottom:"1px solid #eee",paddingBottom:"5px"}})),h.createTable({cls:CSS_CLASSES.TABLE,style:{width:"100%",borderCollapse:"collapse"}})),l=h.createThead();let n=h.createTr({cls:CSS_CLASSES.TABLE_HEADER}),c=(a.forEach(e=>{n.appendChild(h.createTh({text:e,style:{padding:"8px",border:"1px solid #ddd",textAlign:"left",backgroundColor:"#f2f2f2"}}))}),l.appendChild(n),e.appendChild(l),h.createTbody());return t.forEach(e=>{let a=h.createTr({cls:CSS_CLASSES.TABLE_ROW});r(e).forEach(e=>{var t=h.createTd({style:{padding:"8px",border:"1px solid #ddd",verticalAlign:"top"}});"string"==typeof e?t.textContent=e:t.appendChild(e),a.appendChild(t)}),c.appendChild(a)}),e.appendChild(c),d.appendChild(e),d},n=l(`Chats (${e.length})`,e,["Chat ID","Chat Path","Type / Owner"],t=>{var e=formatChatPathLink(t.chat_path,t.chats_uuid,h);return e.querySelector("."+CSS_CLASSES.LINK_BUTTON).addEventListener("click",e=>{e.preventDefault(),a.onChatPathClick&&a.onChatPathClick(t.chats_id)}),[String(t.chats_id),e,`${t.chats_type||"N/A"} / `+(t.chats_owner||"N/A")]}),n=(n&&t.appendChild(n),l(`Messages (${r.length})`,r,["Message ID","Chat Path","Role / Type"],t=>{var e=formatChatPathLink(t.chat_path,t.messages_chat_uuid,h);return e.querySelector("."+CSS_CLASSES.LINK_BUTTON).addEventListener("click",e=>{e.preventDefault(),a.onChatPathClick&&a.onChatPathClick(t.messages_chat_id)}),[String(t.messages_id),e,`${t.messages_role||"N/A"} / `+(t.messages_type||"N/A")]})),n=(n&&t.appendChild(n),l(`Code Blocks (${d.length})`,d,["Code Block UUID","Chat Path","Component / Language"],t=>{var e=formatChatPathLink(t.chat_path,t.result_chat_uuid,h);return e.querySelector("."+CSS_CLASSES.LINK_BUTTON).addEventListener("click",e=>{e.preventDefault(),a.onChatPathClick&&a.onChatPathClick(t.result_chat_id)}),[t.code_blocks_uuid||"N/A",e,`${t.code_blocks_component||"N/A"} / `+(t.code_blocks_header?.Language||"N/A")]}));return n&&t.appendChild(n),0===e.length&&0===r.length&&0===d.length&&t.appendChild(h.createDiv({text:"No results found for the current criteria.",style:{textAlign:"center",padding:"20px",color:"#666"}})),t}module.exports={render:render};
