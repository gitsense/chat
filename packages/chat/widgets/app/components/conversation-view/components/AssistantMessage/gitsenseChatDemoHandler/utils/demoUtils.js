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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let ScrollUtils=require("../../../../utils/ScrollUtils"),DEMO_CONSTANTS=require("../constants");function _pause(t){return new Promise(e=>setTimeout(e,t))}function _getChatInputBox(){return document.querySelector(".gsc-chat-input-box")}function _getDeleteAllContextsExceptLastLink(e){return e.querySelector('a[onclick*="deleteAllContextsExceptLast"]')}async function typeOutMessage(e,n,s){var o=require("../../../../utils/DomUtils"),a=s.renderedMessage[e.id]?.contentBody;if(a){var r=a.cloneNode(!0);let t="";var i=DEMO_CONSTANTS.TYPING_CHARS_PER_STEP;for(let e=0;e<n.length;e+=i)t+=n.substring(e,e+i),r.innerHTML=s.md.render(t),o.updateDOM(r,a),(e+i)%DEMO_CONSTANTS.SCROLL_TO_BOTTOM_FREQUENCY_BLOCKS==0&&ScrollUtils.scrollToBottom(window,a,0,"smooth",!0),await _pause(DEMO_CONSTANTS.TYPING_PAUSE_MS);await require("../../../../services/MessageService").updateChatMessage(s.widget,e.id,null,n)}else console.error("typeOutMessage: contentBody not found for message ID "+e.id)}async function appendAndTypeOutMessage(e,n,s,o){var a=require("../../../../utils/DomUtils"),r=o.renderedMessage[e.id]?.contentBody;if(r){var i=r.cloneNode(!0);let t=e.message;var l=DEMO_CONSTANTS.TYPING_CHARS_PER_STEP;for(let e=0;e<s.length;e+=l)t+=s.substring(e,e+l),i.innerHTML=o.md.render(t),a.updateDOM(i,r),(e+l)%DEMO_CONSTANTS.SCROLL_TO_BOTTOM_FREQUENCY_BLOCKS==0&&ScrollUtils.scrollToBottom(window,r,0,"smooth",!0),await _pause(DEMO_CONSTANTS.TYPING_PAUSE_MS);var u=require("../../../../services/MessageService"),n=e.meta?.demo?e.meta:{demo:{scene:{id:n}}};n.demo.scene.rendered=!0,await u.updateChatMessage(o.widget,e.id,{newMessage:t,newMeta:n})}else console.error("appendAndTypeOutMessage: contentBody not found for message ID "+e.id)}async function simulateTyping(t,e){var n=_getChatInputBox();if(n){n.focus();for(let e=0;e<t.length;e++)n.value+=t[e],n.dispatchEvent(new Event("input",{bubbles:!0})),await _pause(DEMO_CONSTANTS.TYPING_PAUSE_MS)}else console.error("Chat input box not found.")}async function simulateClick(e){e&&(e.click(),await _pause(500))}function sendMessage(){var e,t=_getChatInputBox();t?(t.focus(),e=new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,which:13,bubbles:!0,cancelable:!0}),t.dispatchEvent(e),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0}))):console.error("Chat input box not found.")}function disableChatBox(){var e=_getChatInputBox();e?e.parentNode.style.pointerEvents="none":console.error("Chat input box not found.")}function enableChatBox(){var e=_getChatInputBox();e?e.parentNode.style.pointerEvents=null:console.error("Chat input box not found.")}module.exports={_pause:_pause,_getDeleteAllContextsExceptLastLink:_getDeleteAllContextsExceptLastLink,typeOutMessage:typeOutMessage,appendAndTypeOutMessage:appendAndTypeOutMessage,disableChatBox:disableChatBox,enableChatBox:enableChatBox,simulateTyping:simulateTyping,simulateClick:simulateClick,sendMessage:sendMessage};
