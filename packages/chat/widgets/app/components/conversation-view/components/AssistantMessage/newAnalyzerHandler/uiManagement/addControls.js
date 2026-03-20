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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,MessageService=require("../../../../services/MessageService"),constants=require("../constants");async function addSaveAnalyzerButton(e,r,s){let o=DomUtils.h,i=o.createDiv({cls:"analyzer-save-control-container",style:{margin:"15px 0",paddingBottom:"5px"}}),l="Save Analyzer",c=o.createButton({cls:"btn btn-primary save-analyzer-btn",text:l,onclick:async t=>{t.preventDefault(),c.disabled=!0,c.textContent="Saving...";t=o.createSpan({style:{color:"#666",marginLeft:"10px",lineHeight:1.7}});i.appendChild(t);try{var{analyzerId:e,instructionsContent:n}=r,a=await MessageService.saveAnalyzer(s.widget,e,n);"success"===a.status?(t.style.marginLeft=0,t.innerHTML='<strong style="font-size:1.3em">Saved Successfully</strong><br>To review or to delete, click the "Analyzers" button on the right sidebar',c.style.display="none"):(t.textContent="Save failed: "+a.message,t.style.color="red",c.disabled=!1,c.textContent=l)}catch(e){t.textContent="An error occurred during saving: "+e.message,t.style.color="red",c.disabled=!1,c.textContent=l,console.error("Error saving analyzer configuration:",e)}}});i.appendChild(c),e.appendChild(i)}module.exports={addSaveAnalyzerButton:addSaveAnalyzerButton};
