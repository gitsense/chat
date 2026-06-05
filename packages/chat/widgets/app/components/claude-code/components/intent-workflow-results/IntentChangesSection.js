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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,h=DomUtils.h;class IntentChangesSection{constructor(e,t){this.parentElement=e,this.changeData=t,this.h=h}render(){this.parentElement.innerHTML="",this._renderFileDetails()}_renderFileDetails(){let a=this.h.createDiv({cls:"gsc-intent-workflow-changes-section-container"});a.appendChild(this.h.createH3({cls:"gsc-intent-workflow-changes-section-title",text:"Modified Files"})),this.changeData.enrichedCandidates.forEach(e=>{let t=this.h.createDiv({cls:"gsc-intent-workflow-changes-file-card"});var n=this.h.createDiv({cls:"gsc-intent-workflow-changes-file-header"}),i=this.h.createDiv({cls:"gsc-intent-workflow-changes-title-group"}),s=(i.appendChild(this.h.createCode({cls:"gsc-intent-workflow-changes-file-path",text:e.path})),this.h.createSpan({cls:e.in_scope?"gsc-intent-workflow-changes-scope-badge-in":"gsc-intent-workflow-changes-scope-badge-out",text:e.in_scope?"In-Scope":"Out-of-Scope"})),s=(i.appendChild(s),e.lines_added||0),s=this.h.createSpan({cls:"gsc-intent-workflow-changes-line-stats",text:`+${s} / -`+(e.lines_deleted||0)}),i=(n.appendChild(i),n.appendChild(s),t.appendChild(n),this._getFileDescription(e)),s=(i&&t.appendChild(this.h.createP({cls:"gsc-intent-workflow-changes-file-description",text:i})),this.h.createButton({cls:"gsc-intent-workflow-changes-view-diff-btn",text:"View Diff",onclick:()=>this._toggleDiff(t,e)})),n=(t.appendChild(s),this.h.createDiv({cls:"gsc-intent-workflow-changes-diff-container"}));n.textContent=e.diff_content||"No diff available.",t.appendChild(n),a.appendChild(t)}),this.parentElement.appendChild(a)}_toggleDiff(e,t){e=e.querySelector(".gsc-intent-workflow-changes-diff-container");"none"===e.style.display?e.style.display="block":e.style.display="none"}_getFileDescription(n){var e=this.changeData.changeSummary?.changelog||[];let t=n.working_dir?n.working_dir+"/"+n.path:n.path,i=e.find(e=>e.file===t);return(i=i||e.find(e=>{var t=e.file.lastIndexOf("/");return(-1!==t?e.file.substring(t+1):e.file)===n.path}))?.description||""}cleanup(){this.parentElement.innerHTML=""}}module.exports={IntentChangesSection:IntentChangesSection};
