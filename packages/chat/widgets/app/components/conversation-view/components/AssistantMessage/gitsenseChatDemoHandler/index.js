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

let{ChatUtils,MessageUtils}=require("@gitsense/gsc-utils"),supportedDemos=require("./demos").supportedDemos,DEMO_CONSTANTS=require("./constants"),DemoUtils=require("./utils/demoUtils"),MessageService=require("../../../services/MessageService");async function handleGitSenseChatDemo(n,a,o,r){var d=o.chat;if(!d.type.startsWith("demos"))return!1;if("demos|home"===d.type){if("demos"!==n.type)return;var s=a.querySelectorAll("a");let t={};d.descendants.forEach(e=>{t[e.name]=e.uuid});for(let e=0;e<s.length;e++){var i=s[e],c=t[i.innerText.trim()];i.href="/?chat="+c}}else{if(n.kids&&0<n.kids.length)return!1;let t=ChatUtils.getChatMessages(d).filter(e=>"assistant"===e.role),s=d.type.split("|").pop();d=supportedDemos.find(e=>e.id===s);if(!d)return console.error(`handleGitSenseChatDemo: Active demo '${s}' not found in supportedDemos.`),!1;let i=n.meta?.demo?.scene?.id,e=null;if(i){if(!(e=d.scenes.find(e=>e.id===i)))return!1}else if(!(e=d.scenes.find(e=>e.triggerCondition&&e.triggerCondition(n,a,o,t))))return;if(n.meta?.demo?.scene?.rendered)e.postProcess&&"function"==typeof e.postProcess&&e.postProcess(n,e,a,o),null===e.nextSceneId&&DemoUtils.enableChatBox();else{if(!t.find(e=>e.message.includes("## Demo Complete"))){e.contentToType?.startsWith("## What Happened")&&await DemoUtils._pause(1e3),DemoUtils.disableChatBox();try{await _executeSceneAction(e,n,a,o,r)}catch(e){return void console.log(e)}d=n.meta?.demo?.scene?n.meta:{demo:{scene:{id:e.id}}};return d.demo.scene.rendered=!0,await MessageService.updateChatMessage(o.widget,n.id,{newMeta:d}),setTimeout(()=>{o.updateChat()},1e3),!0}DemoUtils.enableChatBox()}}}async function _executeSceneAction(e,t,s,i,n){var{chat:a,widget:o}=i;switch(e.action){case"typeAndAppend":var r=i.widget.staticURL.replace(/\/{file}/,""),r=e.contentToType.replace(/{{base-url}}/g,r);await DemoUtils.appendAndTypeOutMessage(t,e.id,r,i);break;case"createBlankChildMessage":r={demo:{scene:{id:e.nextSceneId}}};await MessageService.newChatMessage(o,a.id,{parentId:t.id,model:a.main_model,role:"assistant",message:"",meta:r,visibility:"human-public"});break;default:console.warn("_executeSceneAction: Unknown action type: "+e.action)}}module.exports={handleGitSenseChatDemo:handleGitSenseChatDemo};
