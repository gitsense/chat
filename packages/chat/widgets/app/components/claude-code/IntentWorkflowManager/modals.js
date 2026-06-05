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

let PromptBox=require("../../ui/prompt-box").PromptBox;async function showConfirmModal(e,n,i){return new Promise(o=>{e.confirmPromptBox||(e.confirmPromptBox=new PromptBox({title:n,width:"400px",showCloseButton:!0})),e.confirmPromptBox.show({content:i},()=>{});var t=e.h.createButton({cls:"btn btn-primary",text:"Confirm",onclick:()=>{e.confirmPromptBox.hide(),o(!0)}}),r=e.h.createButton({cls:"btn",text:"Cancel",style:{marginRight:"10px"},onclick:()=>{e.confirmPromptBox.hide(),o(!1)}}),r=e.h.createDiv({style:{marginTop:"20px",textAlign:"right"},append:[r,t]});e.confirmPromptBox.elements.body.appendChild(r)})}function updateConfirmModalContent(o,t){if(o.confirmPromptBox){for(var r=o.confirmPromptBox.elements.body;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(o.h.createP({text:t}));var t=o.h.createButton({cls:"btn btn-primary",text:"Retry",onclick:()=>{o._callStopAPI()}}),e=o.h.createButton({cls:"btn",text:"Cancel",style:{marginRight:"10px"},onclick:()=>{o.confirmPromptBox.hide()}}),e=o.h.createDiv({style:{marginTop:"20px",textAlign:"right"},append:[e,t]});r.appendChild(e)}else console.warn("[AgentManager::_updateConfirmModalContent] Confirm modal not found")}function showConfirmModalError(o,t){if(o.confirmPromptBox){for(var r=o.confirmPromptBox.elements.body;r.firstChild;)r.removeChild(r.firstChild);var t=o.h.createDiv({style:{color:"#d73a49",backgroundColor:"#ffeef0",border:"1px solid #ffc1c0",borderRadius:"6px",padding:"12px",marginBottom:"15px"},text:t}),t=(r.appendChild(t),o.h.createButton({cls:"btn btn-primary",text:"Retry",onclick:()=>{o._callStopAPI()}})),e=o.h.createButton({cls:"btn",text:"Cancel",style:{marginRight:"10px"},onclick:()=>{o.confirmPromptBox.hide()}}),e=o.h.createDiv({style:{marginTop:"20px",textAlign:"right"},append:[e,t]});r.appendChild(e)}else console.warn("[AgentManager::_showConfirmModalError] Confirm modal not found")}function showProgressModal(o,t){o.progressPromptBox||(o.progressPromptBox=new PromptBox({title:"Processing",width:"400px",showCloseButton:!1})),o.progressPromptBox.show({content:`
        <div style="text-align: center; padding: 20px;">
            <div style="
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #0366d6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 15px auto;
            "></div>
            <p style="margin: 0; color: #586069;">${t}</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `,isHtmlContent:!0})}function closeProgressModal(o){o.progressPromptBox&&o.progressPromptBox.hide()}module.exports={showConfirmModal:showConfirmModal,updateConfirmModalContent:updateConfirmModalContent,showConfirmModalError:showConfirmModalError,showProgressModal:showProgressModal,closeProgressModal:closeProgressModal};
