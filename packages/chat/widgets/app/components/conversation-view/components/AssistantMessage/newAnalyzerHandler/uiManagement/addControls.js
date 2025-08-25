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

let DomUtils=require("../../../../utils/DomUtils"),MessageService=require("../../../../services/MessageService"),constants=require("../constants");async function addSaveAnalyzerButton(e,r,s){let o=DomUtils.h,l=o.createDiv({cls:"analyzer-save-control-container",style:{margin:"15px 0",paddingBottom:"5px"}}),i="Save Analyzer",c=o.createButton({cls:"btn btn-primary save-analyzer-btn",text:i,onclick:async t=>{t.preventDefault(),c.disabled=!0,c.textContent="Saving...";t=o.createSpan({style:{fontSize:".9em",color:"#666"}});l.appendChild(t);try{var{analyzerId:e,instructionsContent:n}=r,a=await MessageService.updateChatAnalyzer(s.widget,e,n);"success"===a.status?(t.textContent='Saved successfully! To confirm it was created or to delete, click the "Analyzers" button on the right sidebar',c.style.display="none"):(t.textContent="Save failed: "+a.message,t.style.color="red",c.disabled=!1,c.textContent=i)}catch(e){t.textContent="An error occurred during saving: "+e.message,t.style.color="red",c.disabled=!1,c.textContent=i,console.error("Error saving analyzer configuration:",e)}}});l.appendChild(c),e.appendChild(l)}module.exports={addSaveAnalyzerButton:addSaveAnalyzerButton};
