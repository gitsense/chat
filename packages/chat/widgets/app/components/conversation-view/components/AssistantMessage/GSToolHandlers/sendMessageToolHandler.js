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

let{ChatUtils,CodeBlockUtils,DomUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../services/MessageService"),{getToolBlocksByTool,getToolBlockElemsByTool}=require("../../../utils/GSToolBlockUtils"),formatSelectedItemsInfo=require("../../../Dependencies").formatSelectedItemsInfo,SEND_MESSAGE_TOOL=require("./constants").SEND_MESSAGE_TOOL;async function handleSendMessageTool(g,e,u,t){if(!g||null==g.message||!e||!u)return console.error("handleSendMessageTool: Missing required parameters."),!1;if(!u.chat||!u.chat.messages||!u.chat.messages[0])return console.error("handleSendMessageTool: Invalid chat context."),!1;var n=getToolBlocksByTool(g.message,SEND_MESSAGE_TOOL);if(0===n.length)return!1;if(1!==n.length)return console.warn("More than one send message tool defined. Update message to ensure there is only one."),!1;let s=!1;if(!s&&g.kids&&0<g.kids.length&&(console.warn("Unable to process send message tool since this is not the last message."),s=!0),u.renderedMessage[g.id]?.gitsenseChatTools?.sendMessage)return!1;let c=n[0],m=c.toolData,h=m.config||{};var n=h.button?.text||"Send Message",a=getToolBlockElemsByTool(e,SEND_MESSAGE_TOOL);if(1<a.length)return console.warn("There should only be one send message tool element, but we found "+a.length),!1;if(a.length){a=a[0];if(s||m.disabled)return void(a.innerText=m.disabled?m.disabled.text:`[${n} button not available]`);a.parentNode.removeChild(a)}let o=DomUtils.h,l=null;var r,i;let d=null;var S,f,p,T,M,v;try{return r=h.header?o.createH3({text:h.header.text}):null,i=h.information?o.createParagraph({text:h.information.text}):null,d=h.button&&!s?o.createButton({cls:h.button?.className||"btn btn-primary",text:n,style:{marginBottom:"5px"},onclick:async()=>{var t=u.widget,n=u.chat.id,s=g.model,a=g.temperature||0,o="user"===h.message.role?["user","assistant"]:["assistant"];let l=g.id;for(let e=0;e<o.length;e++){var r=o[e],i=r===h.message.role?h.message.content:null,r=await MessageService.newChatMessage(t,n,l,s,r,i,{temperature:a,stream:!0});l=r.id}if(b(),h.updateAfterSend){for(var e in h.updateAfterSend)h[e]=h.updateAfterSend[e];delete h.updateAfterSend;var d=`# GitSense Chat Tool
`+JSON.stringify(m,null,2),d=CodeBlockUtils.updateCodeBlockByIndex(g.message,c.index,d,c.language);await MessageService.updateChatMessage(t,g.id,null,d)}u.updateChat()}}):null,S=s&&h.button?o.createSpan({text:`[${n} button disabled]`}):null,l=(f=h.container,p=r,T=i,M=d,v=S,o.createDiv({cls:"send-message-container",append:[p,T,M,v],style:{textAlign:"left",marginTop:f.marginTop||"10px"}})),e.appendChild(l),!0}catch(e){return console.error("handleSendMessageTool: Error creating UI elements:",e),b(),!1}function b(){l&&l.parentElement&&l.remove(),d=null,l=null}}module.exports={handleSendMessageTool:handleSendMessageTool};
