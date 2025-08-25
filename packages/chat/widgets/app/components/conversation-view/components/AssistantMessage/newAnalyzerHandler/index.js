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

let{ChatUtils,MessageUtils,CodeBlockUtils}=require("@gitsense/gsc-utils"),DomUtils=require("../../../utils/DomUtils"),MessageService=require("../../../services/MessageService"),processInstructionsStream=require("./blockProcessing").processInstructionsStream,validateAndExtractInstructions=require("./instructionsValidation").validateAndExtractInstructions,renderOrUpdateStatusUI=require("./uiManagement/renderStatus").renderOrUpdateStatusUI,addSaveAnalyzerButton=require("./uiManagement/addControls").addSaveAnalyzerButton,addErrorElement=require("./uiManagement/elementManagement").addErrorElement,constants=require("./constants");async function handleNewAnalyzer(r,n,s,e,a){if(!(r&&n&&s&&s.chat))return console.error("handleNewAnalyzer: Missing required parameters."),!0;if(a){let e=r.message;if("Thinking in progress..."===e.trim())return;a=e.length;let t="# New Analyzer Instructions";if(!!!(a<20||e.trimStart().startsWith(t)))return console.warn(`LLM did not following instructions. Message started with "${e}"`),showTryAgain(t,e,n,s),setTimeout(()=>{showTryAgain(t,e,n,s)},1500),!0}var t,i,o,d,l,c;r.kids&&r.kids.length||ChatUtils.isNewAnalyzerChat(s.chat,r.model)&&(a=MessageUtils.isNewAnalyzerInstructionsMessage(r.message,!1),t=r.message.trim().split(/\n/).pop().startsWith("Authored by LLM "),a)&&(t?(a=validateAndExtractInstructions(r.message)).success?(n.innerHTML="",{analyzerId:i,instructionsContent:o,nestedMarkdownBlock:d,nestedJsonBlock:l,nestedConfigBlock:c}=a,renderOrUpdateStatusUI(n,{analyzerId:i,instructionsContent:o,nestedMarkdownBlock:d,nestedJsonBlock:l,nestedConfigBlock:c,uniqueIdDetected:!0,roleDetected:!0,taskDetected:!0,markdownDetected:!0,jsonDetected:!0,configDetected:!0,charactersReceived:null},t,s),n.appendChild(DomUtils.h.createH3({text:"Instructions",style:{marginTop:"15px"}})),d=DomUtils.h.createPre({text:o,style:{maxHeight:"500px",overflow:"auto",padding:"20px",marginTop:"5px",marginBottom:"20px",border:"1px solid #ccc"}}),n.appendChild(d),await addSaveAnalyzerButton(n,{analyzerId:i,instructionsContent:o},s)):({error:l,streamingStatusAtStop:c}=a,renderOrUpdateStatusUI(n,c||{},t,s,constants.GENERATION_FAILED_HEADER),addErrorElement(n,"Failed to validate analyzer instructions: "+l)):(d=processInstructionsStream(r.message,t),renderOrUpdateStatusUI(n,d,t,s)))}function showTryAgain(e,t,r,n){r.innerHTML=n.md.render(`
# LLM Instruction Error 

The LLM did not follow our instructions. We require the first 20 characters in the response to start with \`${e}\` but it generated \`${t}\` instead.

Select the refresh icon below and try again or send the LLM a message, instructing it to follow the instructions in the System Prompt.
`)}module.exports={handleNewAnalyzer:handleNewAnalyzer};
