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

let{DomUtils,ChatUtils}=require("@gitsense/gsc-utils"),{ReferenceMessageUtils,CompactedMessageUtils}=require("@gitsense/gsc-utils");class CompactChatMessagesDecorator{process(e,s,t){var a,o,i=e.message;i.includes("## Compacted Message\n")&&i.includes("## End Compacted Message")&&(a=ChatUtils.getChatMessages(t.chat).filter(e=>this.isCompactMessage(e)),e.id===a[a.length-1].id)&&((a=ChatUtils.getChatMessages(t.chat).find(e=>"compact-messages-data"===e.type))?(o=(a=ReferenceMessageUtils.extractReferenceMessageData(a.message)).sessionId)?(i=CompactedMessageUtils.extractCompactedMessageContent(i),this.createInstructionsUI(s,o,i,a,e,t)):console.error("CompactChatMessagesDecorator: Session ID not found in reference message"):console.error("CompactChatMessagesDecorator: Reference message not found"))}createInstructionsUI(e,s,t,a,o,i){var c=a.from||a.messagesToCompact[0]?.position,r=a.to||a.messagesToCompact[a.messagesToCompact.length-1]?.position,i=i.md.render(`
## Your compacted message is ready!

This message has been compacted from messages **#${c}-${r}** in the original chat.

1. Click the "Use This Message" button below to save this compacted message
2. Return to the original chat tab where you started the compaction
3. The compacted message will appear automatically in the compaction modal
4. Review and save to create your new chat with the compacted messages

[Use This Message](#)

### Note

- This compacted message will be available for **30 minutes** in your browser
- The original chat will automatically detect when you've selected this message
- No need to copy-paste - everything is handled automatically!
        `),c=DomUtils.h.createDiv({html:i,style:{border:"1px solid #ddd",borderRadius:"4px",padding:"0px 15px 15px",margin:"15px 0",backgroundColor:"#f9f9f9"}});e.appendChild(c);let n=c.querySelector('a[href="#"]');n&&(n.classList.add("btn"),n.classList.add("btn-primary"),n.onclick=e=>{e.preventDefault(),this.handleUseMessage(s,t,a,o)&&(n.textContent="Message Saved!",n.style.backgroundColor="#28a745",n.style.pointerEvents="none")})}handleUseMessage(e,s,t,a){var o=t.from||t.messagesToCompact[0]?.position,i=t.to||t.messagesToCompact[t.messagesToCompact.length-1]?.position,c=t.range||o+"-"+i,s={sessionId:e,content:s,metadata:{messageNumber:a.position,timestamp:(new Date).toISOString(),originalChatUuid:t.originalChatUuid,range:c,from:o,to:i,model:a.model,validationHash:t.validationHash,compactedAt:a.created_at}};return localStorage.setItem("compact-"+e,JSON.stringify(s)),this.showNotification("Compacted message saved! Return to the original chat to continue.","success"),!0}isCompactMessage(e){return e.message.includes("## Compacted Message\n")&&e.message.includes("## End Compacted Message")}showNotification(e,s="info"){let t=DomUtils.h.createDiv({text:e,style:{position:"fixed",top:"20px",right:"20px",padding:"12px 16px",borderRadius:"4px",backgroundColor:"success"===s?"#d4edda":"error"===s?"#f8d7da":"#d1ecf1",color:"success"===s?"#155724":"error"===s?"#721c24":"#0c5460",zIndex:1000003,boxShadow:"0 2px 10px rgba(0,0,0,0.1)",fontSize:"14px",maxWidth:"300px"}});document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},3e3)}}module.exports={CompactChatMessagesDecorator:CompactChatMessagesDecorator};
