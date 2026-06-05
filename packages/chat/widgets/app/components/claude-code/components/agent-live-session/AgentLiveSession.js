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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,AgentActivityFeed=require("../agent-activity-feed").AgentActivityFeed,AgentEventParser=require("../../AgentEventParser").AgentEventParser,AGENT_LIVE_SESSION_STYLES=require("./styles").AGENT_LIVE_SESSION_STYLES,h=DomUtils.h;class AgentLiveSession{constructor(t,e={}){this.parentElement=t,this.options=e,this.h=h,this.intent=e.intent||"",this.turn=e.turn||1,this.turnType=e.turnType||"discovery",this.status=e.status||"initializing",this.onStop=e.onStop||null,this.activityFeedOptions=e.activityFeedOptions||{},this.activityFeed=null,this.eventParser=null,this.statusElement=null,this.stopButton=null,this.intentContentElement=null,h.injectStyles(AGENT_LIVE_SESSION_STYLES,"gsc-agent-live-session-styles")}render(){this.parentElement.innerHTML="",this._renderIntentSection(),this._renderActivitySection(),this._renderActionsSection()}updateStatus(t){this.status=t,this.statusElement&&(this.statusElement.textContent="Status: "+t),this.stopButton&&("stopped"===t?(this.stopButton.textContent="Session Stopped",this.stopButton.disabled=!0,this.stopButton.classList.add("disabled")):(this.stopButton.textContent="Stop Session",this.stopButton.disabled=!1,this.stopButton.classList.remove("disabled")))}getActivityFeed(){return this.activityFeed}getEventParser(){return this.eventParser}setPostProcessingStatus(t="Post-processing..."){this.activityFeed&&"function"==typeof this.activityFeed.setPostProcessingStatus&&this.activityFeed.setPostProcessingStatus(t)}cleanup(){this.activityFeed&&(this.activityFeed.cleanup(),this.activityFeed=null),this.eventParser&&(this.eventParser.cleanup(),this.eventParser=null)}_renderIntentSection(){var t=this.h.createDiv({cls:"gsc-agent-live-intent"}),e=this.h.createDiv({cls:"gsc-agent-live-intent-header",append:[this.h.createH1({text:"discovery"===this.turnType?"Discovery In Progress":"Change In Progress",style:{marginTop:0,borderBottom:0}}),this.statusElement=this.h.createDiv({cls:"gsc-agent-live-status",text:"Status: "+this.status})]}),i=this.h.createDiv({cls:"gsc-agent-live-intent-label",text:"Intent"});this.intentContentElement=this.h.createDiv({cls:"gsc-agent-live-intent-content",text:this.intent}),t.appendChild(e),t.appendChild(i),t.appendChild(this.intentContentElement),this.parentElement.appendChild(t)}_renderActivitySection(){var t=this.h.createDiv({cls:"gsc-agent-live-activity"}),e=this.h.createDiv({cls:"gsc-agent-live-activity-label",text:"Activity"}),i=this.h.createDiv({cls:"gsc-agent-live-activity-container"}),e=(t.appendChild(e),t.appendChild(i),this.parentElement.appendChild(t),{mode:"historical",autoScroll:!0,showScrollButton:!0,showAutoScrollToggle:!0,maxActivities:500,maxHeight:400,...this.activityFeedOptions});this.activityFeed=new AgentActivityFeed(i,e),this.eventParser=new AgentEventParser(this.activityFeed),this.activityFeed&&"function"==typeof this.activityFeed.startElapsedTimeTracking&&this.activityFeed.startElapsedTimeTracking(),this.activityFeed.addActivity({id:"waiting-for-first-event",type:"receiving",status:"processing",title:"Initializing",description:"Waiting for first event...",content:"Connecting to Agent session...",timestamp:(new Date).toISOString()})}_renderActionsSection(){var t=this.h.createDiv({cls:"gsc-agent-live-actions"});this.stopButton=this.h.createButton({cls:"btn btn-danger",text:"Stop Session",onclick:()=>{this.onStop&&this.onStop()}}),t.appendChild(this.stopButton),this.parentElement.appendChild(t)}}module.exports={AgentLiveSession:AgentLiveSession};
