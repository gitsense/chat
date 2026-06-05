/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * Licensed under the Fair Core License, Version 1.0 (FCL-1.0-ALv2).
 * https://faircode.io
 *
 * You may use, modify, and run this software for internal, non-commercial
 * purposes including personal projects, team workflows, and self-hosted
 * deployments. You may not use this software to build or operate a product
 * or service that competes directly or indirectly with GitSense Chat.
 * Redistribution or resale is not permitted.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 *
 * For licensing inquiries, internal-use exceptions, or business use,
 * contact sales@gitsense.com
 */

let{ChatUtils,MessageUtils,SVGUtils}=require("@gitsense/gsc-utils"),supportedDemos=require("./demos").supportedDemos,DEMO_CONSTANTS=require("./constants"),DemoUtils=require("./utils/demoUtils"),MessageService=require("../../../services/MessageService");async function handleGitSenseChatDemo(a,o,r,e){var d=r.chat;if(!d.type.startsWith("demos"))return!1;if(["demos|home","demos|foundation-and-core-workflows","demos|train-your-ai-assistant","demos|expert-context-mastery"].includes(d.type)){if("demos"!==a.type)return;d.type;var i=o.querySelectorAll("a");let t={},s={};d.descendants.forEach(e=>{t[e.name]=e.uuid,s[e.type.split("|").pop()]=e.uuid});for(let e=0;e<i.length;e++){var n=i[e],c=n.href.split("/").pop(),c=s[c]||t[n.innerText.trim()]||"unknown";n.href="/?chat="+c}}else if("demos|ergonomic-conversations"!==d.type){if(a.kids&&0<a.kids.length)return!1;let t=ChatUtils.getChatMessages(d).filter(e=>"assistant"===e.role),s=d.type.split("|").pop();d=supportedDemos.find(e=>e.id===s);if(!d)return console.error(`handleGitSenseChatDemo: Active demo '${s}' not found in supportedDemos.`),!1;let i=a.meta?.demo?.scene?.id,n=null;if(i){if(!(n=d.scenes.find(e=>e.id===i)))return!1}else if(!(n=d.scenes.find(e=>e.triggerCondition&&e.triggerCondition(a,o,r,t))))return;DemoUtils.disableChatBox();d=a.meta?.demo?.scene?.rendered;if(d)n.postProcess&&"function"==typeof n.postProcess&&n.postProcess(a,n,o,r),null===n.nextSceneId&&DemoUtils.enableChatBox();else if(t.find(e=>e.message.includes("## Demo Complete")))DemoUtils.enableChatBox();else{n.contentToType?.startsWith("## What Happened")&&await DemoUtils._pause(1e3);let t=null;try{t=await _executeSceneAction(n,a,o,r,e)}catch(e){return void console.log(e)}d=a.meta?.demo?.scene?a.meta:{demo:{scene:{id:n.id}}};d.demo.scene.rendered=!0,await MessageService.updateChatMessage(r.widget,a.id,{newMeta:d}),setTimeout(()=>{r.updateChat()},1e3),t?.content&&n.hiddenText&&setTimeout(async()=>{var e=t.content+(`
---hidden-split---
`+n.hiddenText);await MessageService.updateChatMessage(r.widget,a.id,{newMessage:e})},2e3)}}}async function _executeSceneAction(e,t,s,i,n){var{chat:a,widget:o}=i;switch(e.action){case"typeAndAppend":var r=i.widget.staticURL.replace(/\/{file}/,""),r=e.contentToType.replace(/{{base-url}}/g,r);return DemoUtils.appendAndTypeOutMessage(t,e,r,i);case"createBlankChildMessage":r={demo:{scene:{id:e.nextSceneId}}};await MessageService.newChatMessage(o,a.id,{parentId:t.id,model:a.main_model,role:"assistant",message:"",meta:r,visibility:"human-public"});break;default:e.action&&console.warn("_executeSceneAction: Unknown action type: "+e.action)}}module.exports={handleGitSenseChatDemo:handleGitSenseChatDemo};
