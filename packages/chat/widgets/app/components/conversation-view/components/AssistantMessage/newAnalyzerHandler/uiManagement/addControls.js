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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,MessageService=require("../../../../services/MessageService"),constants=require("../constants");async function addSaveAnalyzerButton(e,r,s){let o=DomUtils.h,i=o.createDiv({cls:"analyzer-save-control-container",style:{margin:"15px 0",paddingBottom:"5px"}}),l="Save Analyzer",c=o.createButton({cls:"btn btn-primary save-analyzer-btn",text:l,onclick:async t=>{t.preventDefault(),c.disabled=!0,c.textContent="Saving...";t=o.createSpan({style:{color:"#666",marginLeft:"10px",lineHeight:1.7}});i.appendChild(t);try{var{analyzerId:e,instructionsContent:n}=r,a=await MessageService.saveAnalyzer(s.widget,e,n);"success"===a.status?(t.style.marginLeft=0,t.innerHTML='<strong style="font-size:1.3em">Saved Successfully</strong><br>To review or to delete, click the "Analyzers" button on the right sidebar',c.style.display="none"):(t.textContent="Save failed: "+a.message,t.style.color="red",c.disabled=!1,c.textContent=l)}catch(e){t.textContent="An error occurred during saving: "+e.message,t.style.color="red",c.disabled=!1,c.textContent=l,console.error("Error saving analyzer configuration:",e)}}});i.appendChild(c),e.appendChild(i)}module.exports={addSaveAnalyzerButton:addSaveAnalyzerButton};
