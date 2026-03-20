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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,ScrollUtils=require("../../../../utils/ScrollUtils"),DEMO_CONSTANTS=require("../constants");function _pause(t){return new Promise(e=>setTimeout(e,t))}function _getChatInputBox(){return document.querySelector(".gsc-chat-input-textarea")}function _getDeleteAllContextsExceptLastLink(e){return e.querySelector('a[onclick*="deleteAllContextsExceptLast"]')}async function typeOutMessage(e,n,o){var s=o.renderedMessage[e.id]?.contentBody;if(s){var a=s.cloneNode(!0);let t="";var r=DEMO_CONSTANTS.TYPING_CHARS_PER_STEP;for(let e=0;e<n.length;e+=r)t+=n.substring(e,e+r),a.innerHTML=o.md.render(t),DomUtils.h.updateDOM(a,s),(e+r)%DEMO_CONSTANTS.SCROLL_TO_BOTTOM_FREQUENCY_BLOCKS==0&&ScrollUtils.scrollToBottom(window,s,0,"smooth",!0),await _pause(DEMO_CONSTANTS.TYPING_PAUSE_MS);await require("../../../../services/MessageService").updateChatMessage(o.widget,e.id,null,n)}else console.error("typeOutMessage: contentBody not found for message ID "+e.id)}async function appendAndTypeOutMessage(e,n,o,s){var a=s.renderedMessage[e.id]?.contentBody;if(a){var r=a.cloneNode(!0),i=e.message;let t=i;var l=DEMO_CONSTANTS.TYPING_CHARS_PER_STEP;for(let e=0;e<o.length;e+=l)t+=o.substring(e,e+l),r.innerHTML=s.md.render(t),DomUtils.h.updateDOM(r,a),(e+l)%DEMO_CONSTANTS.SCROLL_TO_BOTTOM_FREQUENCY_BLOCKS==0&&ScrollUtils.scrollToBottom(window,a,0,"smooth",!0),await _pause(DEMO_CONSTANTS.TYPING_PAUSE_MS);i=require("../../../../services/MessageService"),n=e.meta?.demo?e.meta:{demo:{scene:{id:n.id}}};return n.demo.scene.rendered=!0,await i.updateChatMessage(s.widget,e.id,{newMessage:t,newMeta:n}),{content:t}}console.error("appendAndTypeOutMessage: contentBody not found for message ID "+e.id)}async function simulateTyping(e,t){var n=_getChatInputBox();n?(n.focus(),n.value=e):console.error("Chat input box not found.")}async function simulateClick(e){e&&(e.click(),await _pause(500))}function sendMessage(){var e,t=_getChatInputBox();t?(t.focus(),e=0<=navigator.platform.toUpperCase().indexOf("MAC"),e=new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,which:13,bubbles:!0,cancelable:!0,[e?"metaKey":"ctrlKey"]:!0}),t.dispatchEvent(e),t.dispatchEvent(new Event("input",{bubbles:!0}))):console.error("Chat input box not found.")}function disableChatBox(){var e=_getChatInputBox();e?e.parentNode.style.pointerEvents="none":console.error("Chat input box not found.")}function enableChatBox(){var e=_getChatInputBox();e?e.parentNode.style.pointerEvents=null:console.error("Chat input box not found.")}module.exports={_pause:_pause,_getDeleteAllContextsExceptLastLink:_getDeleteAllContextsExceptLastLink,typeOutMessage:typeOutMessage,appendAndTypeOutMessage:appendAndTypeOutMessage,disableChatBox:disableChatBox,enableChatBox:enableChatBox,simulateTyping:simulateTyping,simulateClick:simulateClick,sendMessage:sendMessage};
