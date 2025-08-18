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

let{ChatUtils,MessageUtils}=require("@gitsense/gsc-utils"),supportedDemos=require("./demos").supportedDemos,DEMO_CONSTANTS=require("./constants"),DemoUtils=require("./utils/demoUtils"),MessageService=require("../../../services/MessageService");async function handleGitSenseChatDemo(t,s,i,e){if(!i.chat.name||!i.chat.type.startsWith("demo|"))return!1;if(t.kids&&0<t.kids.length)return!1;let n=i.chat.type.split("|").pop();var a=supportedDemos.find(e=>e.id===n);if(!a)return console.error(`handleGitSenseChatDemo: Active demo '${n}' not found in supportedDemos.`),!1;let o=ChatUtils.getChatMessages(i.chat).filter(e=>"assistant"===e.role),r=t.meta?.demo?.scene?.id,d=null;if(r){if(!(d=a.scenes.find(e=>e.id===r)))return!1}else if(!(d=a.scenes.find(e=>e.triggerCondition&&e.triggerCondition(t,s,i,o))))return;if(!t.meta?.demo?.scene?.rendered)return d.contentToType?.startsWith("## What Happened")&&await DemoUtils._pause(2e3),DemoUtils.disableChatBox(),await _executeSceneAction(d,t,s,i,e),(a=t.meta?.demo?.scene?t.meta:{demo:{scene:{id:d.id}}}).demo.scene.rendered=!0,await MessageService.updateChatMessage(i.widget,t.id,{newMeta:a}),setTimeout(()=>{i.updateChat()},1e3),!0;d.postProcess&&"function"==typeof d.postProcess&&d.postProcess(t,d,s,i),null===d.nextSceneId&&DemoUtils.enableChatBox()}async function _executeSceneAction(e,t,s,i,n){var{chat:a,widget:o}=i;switch(e.action){case"typeAndAppend":await DemoUtils.appendAndTypeOutMessage(t,e.id,e.contentToType,i);break;case"createBlankChildMessage":var r={demo:{scene:{id:e.nextSceneId}}};await MessageService.newChatMessage(o,a.id,{parentId:t.id,model:a.main_model,role:"assistant",message:"",meta:r,visibility:"human-public"});break;default:console.warn("_executeSceneAction: Unknown action type: "+e.action)}}module.exports={handleGitSenseChatDemo:handleGitSenseChatDemo};
