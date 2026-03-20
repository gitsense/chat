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

let{ChatUtils,DomUtils,MessageUtils,CodeBlockUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../services/MessageService"),processInstructionsStream=require("./blockProcessing").processInstructionsStream,validateAndExtractInstructions=require("./instructionsValidation").validateAndExtractInstructions,renderOrUpdateStatusUI=require("./uiManagement/renderStatus").renderOrUpdateStatusUI,addSaveAnalyzerButton=require("./uiManagement/addControls").addSaveAnalyzerButton,addErrorElement=require("./uiManagement/elementManagement").addErrorElement,constants=require("./constants");async function handleNewAnalyzer(r,s,n,e,a){if(!(r&&s&&n&&n.chat))return console.error("handleNewAnalyzer: Missing required parameters."),!0;if("new-analyzer"===n.chat.type)if("new-analyzer-instructions"===r.type||r.message.startsWith("# Analyzer Requirements\n\n"))s.innerHTML=n.md.render(`## New Analyzer
I'm ready to help you define a new analyzer for the GitSense Chat Application.

**To get started, please describe:**
- What you want the analyzer to do (e.g., "extract security issues from code," "summarize documents")
- What information it should extract and display
- Whether it needs any reference files (like a style guide or configuration file)

**Don't worry about the details.** If you're unsure about metadata fields, custom tags, or how to structure your analyzer, just ask. I'll guide you through each step and help you refine your requirements.
        `);else{if(a){let e=r.message;if("Thinking in progress..."===e.trim())return;a=e.length;let t="# New Analyzer Instructions";if(!!!(a<20||e.trimStart().startsWith(t)))return console.warn(`LLM did not following instructions. Message started with "${e}"`),showTryAgain(t,e,s,n),setTimeout(()=>{showTryAgain(t,e,s,n)},1500),!0}var t,o,i,d,l,a=MessageUtils.isNewAnalyzerInstructionsMessage(r.message,!1),c=r.message.trim().split(/\n/).pop().startsWith("Authored by LLM ");a&&(c?(a=validateAndExtractInstructions(r.message)).success?(s.innerHTML="",{analyzerId:t,instructionsContent:o,nestedMarkdownBlock:l,nestedJsonBlock:i,nestedConfigBlock:d}=a,renderOrUpdateStatusUI(s,{analyzerId:t,instructionsContent:o,nestedMarkdownBlock:l,nestedJsonBlock:i,nestedConfigBlock:d,uniqueIdDetected:!0,roleDetected:!0,taskDetected:!0,markdownDetected:!0,jsonDetected:!0,configDetected:!0,charactersReceived:null},c,n),s.appendChild(DomUtils.h.createH3({text:"Instructions",style:{marginTop:"15px"}})),l=DomUtils.h.createPre({text:o,style:{maxHeight:"500px",overflow:"auto",padding:"20px",marginTop:"5px",marginBottom:"20px",border:"1px solid #ccc"}}),s.appendChild(l),await addSaveAnalyzerButton(s,{analyzerId:t,instructionsContent:o},n)):({error:i,streamingStatusAtStop:d}=a,renderOrUpdateStatusUI(s,d||{},c,n,constants.GENERATION_FAILED_HEADER),l=`
            <h3>Validation Error</h3>
            <p>There was an issue with the generated analyzer instructions:</p>
            <div class="error-details" style="background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px; padding: 10px; margin: 10px 0; font-family: monospace; font-size: 0.9em; color: #721c24;">
                ${i}
            </div>
            <h3 style='margin-top:15px;'>How to Fix This</h3>
            <p>Please follow these steps to resolve the issue:</p>
            <ol style='margin-left:25px;margin-bottom:15px;'>
                <li>Copy the error message above</li>
                <li>Send a new message to the LLM with the error message (see example below)</li>
                <li>The LLM will regenerate the instructions with the corrections</li>
            </ol>
            <p><strong>Example message to send:</strong></p>
            <div class="example-message" style="background-color: white; border: 1px solid #ced4da; border-radius: 4px; padding: 10px; margin: 10px 0;">
                The following error occurred: ${i}
            </div>
        `,addErrorElement(s,l)):(t=processInstructionsStream(r.message,c),renderOrUpdateStatusUI(s,t,c,n)))}}function showTryAgain(e,t,r,s){r.innerHTML=s.md.render(`
# LLM Instruction Error 

The LLM did not follow our instructions. We require the first 20 characters in the response to start with \`${e}\` but it generated \`${t}\` instead.

Select the refresh icon below and try again or send the LLM a message, instructing it to follow the instructions in the System Prompt.
`)}module.exports={handleNewAnalyzer:handleNewAnalyzer};
