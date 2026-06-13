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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,MessageService=require("../../../../services/MessageService"),constants=require("../constants");async function addSaveAnalyzerButton(e,r,d){let p=DomUtils.h,c=p.createDiv({cls:"analyzer-save-control-container",style:{margin:"15px 0",paddingBottom:"5px"}});let g=p.createButton({cls:"btn btn-primary save-analyzer-btn",text:"Save Analyzer",onclick:async o=>{o.preventDefault(),g.disabled=!0,g.textContent="Saving...";o=p.createSpan({style:{color:"#666",marginLeft:"10px",lineHeight:1.7}});c.appendChild(o);try{var{analyzerId:t,instructionsContent:e}=r,a=await MessageService.saveAnalyzer(d.widget,t,e);if("success"===a.status)o.style.marginLeft=0,o.innerHTML='<strong style="font-size:1.3em">Saved Successfully</strong><br>To review or to delete, click the "Analyzers" button on the right sidebar',g.style.display="none";else{let t=a.data||a.message||"Unknown error occurred";g.style.display="none";var n=p.createDiv({style:{backgroundColor:"#F8D7DA",border:"1px solid #F5C6CB",borderRadius:"4px",padding:"15px",marginTop:"10px"}}),i=(n.appendChild(p.createH3({text:"❌ Save Failed",style:{color:"#721C24",marginTop:"0",marginBottom:"10px"}})),n.appendChild(p.createP({text:"The analyzer instructions could not be saved due to the following issue:",style:{color:"#721C24",marginBottom:"10px"}})),p.createDiv({text:t,style:{backgroundColor:"#fff",border:"1px solid #dee2e6",borderRadius:"3px",padding:"10px",fontFamily:"monospace",fontSize:"0.9em",color:"#721C24",marginBottom:"15px",wordBreak:"break-word"}})),l=(n.appendChild(i),n.appendChild(p.createH4({text:"How to Fix This",style:{color:"#721C24",marginTop:"0",marginBottom:"8px"}})),n.appendChild(p.createP({text:"Please follow these steps to resolve the issue:",style:{color:"#721C24",marginBottom:"8px"}})),p.createUl({style:{color:"#721C24",marginLeft:"20px",marginBottom:"15px"}})),s=(l.appendChild(p.createLi({text:"Review the error message above"})),l.appendChild(p.createLi({text:"Send a message to the AI below with the error details"})),l.appendChild(p.createLi({text:"The AI will regenerate the instructions with the corrections"})),n.appendChild(l),n.appendChild(p.createH4({text:"Suggested Message to Send",style:{color:"#721C24",marginTop:"0",marginBottom:"8px"}})),p.createDiv({text:`The following error occurred when trying to save the analyzer:

${t}

Please regenerate the analyzer instructions with the corrections.`,style:{backgroundColor:"#fff",border:"1px solid #dee2e6",borderRadius:"3px",padding:"10px",fontFamily:"monospace",fontSize:"0.9em",color:"#495057",marginBottom:"10px",whiteSpace:"pre-wrap",wordBreak:"break-word"}}));n.appendChild(s);let r=p.createButton({cls:"btn btn-sm",text:"📋 Copy Message",style:{fontSize:"0.85em",padding:"5px 10px"},onclick:e=>{e.preventDefault();e=`The following error occurred when trying to save the analyzer:

${t}

Please regenerate the analyzer instructions with the corrections.`;navigator.clipboard.writeText(e).then(()=>{r.textContent="✓ Copied!",setTimeout(()=>{r.textContent="📋 Copy Message"},2e3)}).catch(e=>{console.error("Failed to copy:",e)})}});n.appendChild(r),c.replaceChild(n,o)}}catch(e){g.style.display="none";t=p.createDiv({style:{backgroundColor:"#F8D7DA",border:"1px solid #F5C6CB",borderRadius:"4px",padding:"15px",marginTop:"10px"}});t.appendChild(p.createH3({text:"❌ Unexpected Error",style:{color:"#721C24",marginTop:"0",marginBottom:"10px"}})),t.appendChild(p.createP({text:"An unexpected error occurred: "+e.message,style:{color:"#721C24",marginBottom:"10px"}})),t.appendChild(p.createP({text:"Please try again or contact support if the issue persists.",style:{color:"#721C24",marginBottom:"0"}})),c.replaceChild(t,o),console.error("Error saving analyzer configuration:",e)}}});c.appendChild(g),e.appendChild(c)}module.exports={addSaveAnalyzerButton:addSaveAnalyzerButton};
