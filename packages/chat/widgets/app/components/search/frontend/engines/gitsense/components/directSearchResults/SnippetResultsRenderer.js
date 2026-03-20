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

let h=require("../../../../Dependencies").h,{CSS_CLASSES,formatChatPathLink,getItemName,getMetadataSummary}=require("./DirectSearchResultsUtils");function render(e,l){let n=h.createDiv({cls:CSS_CLASSES.SNIPPETS_CONTAINER});e=[...e.results.chats||[],...e.results.messages||[],...e.results.codeBlocks||[]];return 0===e.length?n.appendChild(h.createDiv({text:"No results found for the current criteria.",style:{textAlign:"center",padding:"20px",color:"#666"}})):e.forEach(e=>{var t=h.createDiv({cls:CSS_CLASSES.SNIPPET_ITEM,style:{border:"1px solid #ddd",borderRadius:"5px",padding:"15px",marginBottom:"15px",backgroundColor:"#fff"}}),a=getItemName(e),r=e.result_chat_id||e.chats_id||e.messages_chat_id||"N/A";let o=e.chats_uuid;var s=h.createDiv({style:{fontWeight:"bold",marginBottom:"5px"}}),a=(s.appendChild(h.createSpan({text:a})),s.appendChild(h.createSpan({text:` (ID: ${r})`,style:{fontSize:"0.9em",color:"#666",marginLeft:"5px"}})),t.appendChild(s),e.chat_path),r=formatChatPathLink(a,o,h),s=(r.querySelector("."+CSS_CLASSES.LINK_BUTTON)?.addEventListener("click",e=>{e.preventDefault(),l.onChatPathClick&&l.onChatPathClick(o)}),t.appendChild(r),getMetadataSummary(e));t.appendChild(h.createDiv({text:s,style:{fontSize:"0.85em",color:"#555",marginBottom:"10px"}}));let i="",c="";switch(e.source_type){case"message":i=e.messages_content_snippet||e.messages_content||"No snippet available.";break;case"code-block":i=e.code_blocks_content_snippet||e.code_blocks_content||"No snippet available.",c=e.code_blocks_header?.Language||"";break;case"chat":i=e.chats_meta_short_overview||e.chats_meta_tiny_overview||e.chats_meta_summary||"No direct content snippet available for chat.";break;default:i="No snippet available."}a=h.createPre({cls:CSS_CLASSES.SNIPPET_CONTENT,text:i,style:{backgroundColor:"#f8f8f8",border:"1px solid #eee",padding:"10px",borderRadius:"4px",fontFamily:"monospace",whiteSpace:"pre-wrap",wordBreak:"break-all",fontSize:"0.9em",overflowX:"auto"}});c&&a.classList.add("language-"+c.toLowerCase()),t.appendChild(a),n.appendChild(t)}),n}module.exports={render:render};
