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

function renderStoppingState(n){n.turnTabContentContainer.innerHTML="";var e=n.h.createDiv({cls:"gsc-agent-stopping",style:{padding:"20px",backgroundColor:"#fff3cd",border:"1px solid #ffc107",borderRadius:"8px",color:"#856404"}}),t=n.h.createH3({text:"Stopping agent...",style:{marginTop:0,marginBottom:"10px"}});let o=n.h.createDiv({cls:"gsc-agent-stopping-elapsed-time",text:"Elapsed time: 0.0 seconds",style:{fontSize:"14px",fontWeight:"500",marginBottom:"10px",fontFamily:"'SF Mono', 'Segoe UI Mono', monospace"}});var i=n.h.createP({text:"Graceful shutdown in progress. This may take 5 seconds or more to complete.",style:{marginBottom:"15px"}}),t=(e.appendChild(t),e.appendChild(o),e.appendChild(i),n.h.createDiv({cls:"gsc-agent-live-activity-label",text:"Activity",style:{fontWeight:"600",marginBottom:"10px",color:"#24292e"}})),i=n.h.createDiv({cls:"gsc-agent-live-activity-container"}),t=(e.appendChild(t),e.appendChild(i),n.turnTabContentContainer.appendChild(e),require("../components/agent-activity-feed")).AgentActivityFeed;if(n.activityFeed=new t(i,{mode:"historical",autoScroll:!1,showScrollButton:!0,showAutoScrollToggle:!1,maxActivities:500,maxHeight:"400px"}),n.eventBuffer&&0<n.eventBuffer.length){e=require("../AgentEventParser").AgentEventParser;let t=new e(n.activityFeed);t.setMode("historical"),n.eventBuffer.forEach(e=>{t.handleEvent(e)}),t.flushHistoricalBuffer()}let a=n.meta.state.stoppingStartedAt;if(a){let t=()=>{var e=(new Date-new Date(a))/1e3;o.textContent=`Elapsed time: ${e.toFixed(1)} seconds`,"stopping"===n.meta.state.status&&requestAnimationFrame(t)};requestAnimationFrame(t)}}module.exports={renderStoppingState:renderStoppingState};
