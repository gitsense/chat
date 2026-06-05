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

let{ChatUtils,DomUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../../services/MessageService"),updateChatAnalysisMessages=require("../../../../Dependencies").updateChatAnalysisMessages,ANALYZE_STATUS_HEADER=require("../constants").ANALYZE_STATUS_HEADER,addErrorElement=require("./elementManagement").addErrorElement;async function addUIControls(i,e,n,t,a,l,d){var s=0!==i.kids.length,o=DomUtils.h.createDiv({cls:"analysis-control-container update-all-analysis-control",style:{margin:"5px 0px 10px 0px",paddingBottom:"5px"}});let r=n[0].type;r.includes("::")||(r+="::file-content::default");let c=DomUtils.h.createButton({cls:`btn ${s?"":"btn-primary"} update-all-analysis-btn`,text:"Save analysis",onclick:async a=>{a.preventDefault();a=DomUtils.h.createSpan({text:"Saving analysis...",style:{border:"1px solid #666",padding:"7px 16px",borderRadius:"5px",fontSize:"14px",fontWeight:500}});c.style.display="none",c.insertAdjacentElement("afterend",a);try{let t=(new Date).toISOString();var e=n.map(e=>(e.metadata.analyzed_at=t,e.metadata.analyzer_model=i.real_model||i.model,{chatId:e.chatId,content:e.content,metadata:e.metadata})),s=await updateChatAnalysisMessages(l.widget,r,l.model,e)||{};"success"===s.status?(a.textContent="Successfully saved overview"+(1===n.length?"":"s"),d&&(await MessageService.newChatMessage(l.widget,l.chat.id,{parentId:i.id,model:i.model,role:"assistant",visibility:"human-public",content:ANALYZE_STATUS_HEADER+`

Auto save successful`}),l.updateChat())):(a.textContent="Save failed: "+s.data,d&&(await MessageService.newChatMessage(l.widget,l.chat.id,{parentId:i.id,model:i.model,role:"assistant",content:ANALYZE_STATUS_HEADER+`

Auto save failed: `+s.data,visibility:"human-public"}),l.updateChat()))}catch(e){a.textContent="Save All Error: "+e.message,console.error("Error saving all:",e),d&&(await MessageService.newChatMessage(l.widget,l.chat.id,{parentId:i.id,model:i.model,role:"assistant",content:ANALYZE_STATUS_HEADER+`

Auto save failed: `+e.message,visibility:"human-public"}),l.updateChat())}}});o.appendChild(c),e.appendChild(o),s||(d?c.click():(await MessageService.newChatMessage(l.widget,l.chat.id,{parentId:i.id,model:i.model,role:"assistant",content:ANALYZE_STATUS_HEADER+`

Analysis successful.`,visibility:"human-public"}),l.updateChat()))}module.exports={addUIControls:addUIControls};
