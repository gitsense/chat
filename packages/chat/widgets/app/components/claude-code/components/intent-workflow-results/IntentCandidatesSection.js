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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,h=DomUtils.h;class IntentCandidatesSection{constructor(e,t){this.parentElement=e,this.candidates=t,this.h=h}render(){this.parentElement.innerHTML="",this.candidates.forEach((e,t)=>{this.parentElement.appendChild(this._createCandidateCard(e,t+1))})}_createCandidateCard(e,a){var t=this.h.createDiv({cls:"gsc-intent-workflow-candidate-card",style:this._getCardStyle()}),a=this.h.createDiv({cls:"gsc-intent-workflow-candidate-header",append:[this.h.createDiv({cls:"gsc-intent-workflow-candidate-title",html:`<code>${a}. ${e.file_path}</code>`}),this._createScoreBadge(e)]}),a=(t.appendChild(a),this.h.createDiv({cls:"gsc-intent-workflow-candidate-content"}));if(e.reasoning&&a.appendChild(this.h.createP({append:[this.h.createSpan({text:e.reasoning})]})),e.code_validation){if(a.appendChild(this.h.createP({append:[this.h.createStrong({text:"Code Validation: "}),this.h.createSpan({text:e.code_validation.implementation_details||"Confirmed"})]})),e.code_validation.confirmed_patterns&&0<e.code_validation.confirmed_patterns.length){let t=this.h.createUl({style:{marginLeft:"20px",marginTop:"5px"}});e.code_validation.confirmed_patterns.forEach(e=>{t.appendChild(this.h.createLi({text:e}))}),a.appendChild(t)}var i=this.h.createP({style:{marginTop:"10px"}});let t=this.h.createA({text:"View File Metadata",href:"#",style:{color:"#0366d6",textDecoration:"underline",cursor:"pointer"}});t.addEventListener("click",e=>{e.preventDefault(),d.style.display="none"===d.style.display?"block":"none",t.text="none"===d.style.display?"View File Metadata":"Hide File Metadata"}),i.appendChild(t),a.appendChild(i)}let d=this.h.createDiv({style:{display:"none",marginTop:"15px",paddingTop:"15px",borderTop:"1px solid #ddd"}});return e.metadata?.purpose&&d.appendChild(this.h.createP({append:[this.h.createStrong({text:"Purpose: "}),this.h.createSpan({text:e.metadata.purpose})]})),e.metadata?.keywords&&0<e.metadata.keywords.length&&d.appendChild(this.h.createP({append:[this.h.createStrong({text:"Keywords: "}),this.h.createSpan({text:e.metadata.keywords.join(", ")})]})),e.metadata?.parent_keywords&&0<e.metadata.parent_keywords.length&&d.appendChild(this.h.createP({append:[this.h.createStrong({text:"Parent Keywords: "}),this.h.createSpan({text:e.metadata.parent_keywords.join(", ")})]})),a.appendChild(d),t.appendChild(a),t}_createScoreBadge(e){var e=e.score,t=(100*e).toFixed(0)+"%";let a="#6f42c1";return.9<=e?a="#28a745":.7<=e&&(a="#0366d6"),this.h.createSpan({cls:"gsc-intent-workflow-candidate-score",text:t,style:{backgroundColor:a}})}_getCardStyle(){return{padding:"15px",marginTop:"20px",marginBottom:"25px",border:"2px solid #ddd",borderRadius:"6px"}}cleanup(){}}module.exports={IntentCandidatesSection:IntentCandidatesSection};
