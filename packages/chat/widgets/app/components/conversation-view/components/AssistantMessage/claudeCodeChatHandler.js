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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,h=DomUtils.h;async function handleClaudeCodeChat(e,t,r,a){var i,n=e.real_model||e.model;return!("regular"!==e.type||!n||!n.startsWith("Claude Code - ")||({metrics:n,cleanContent:i}=extractSessionMetrics(e.message||""),!n)||(e=t.querySelectorAll("p"),(e=Array.from(e).find(e=>e.textContent.startsWith("@@GSC-SESSION-METRICS<json>")))&&e.remove(),e=createMetricsDisplay(n),t.appendChild(e),0))}function extractSessionMetrics(t){var e=/^@@GSC-SESSION-METRICS<json>(\{.*\})$/m,r=t.match(e);if(!r)return{metrics:null,cleanContent:t};try{return{metrics:JSON.parse(r[1]),cleanContent:t.replace(e,"").trim()}}catch(e){return console.error("[gscChatHandler] Failed to parse session metrics:",e),{metrics:null,cleanContent:t}}}function createMetricsDisplay(e){var t=h.createDiv({cls:"gsc-chat-metrics-container",style:{marginTop:"20px",fontSize:"13px"}}),r=h.createDiv({style:{marginBottom:"10px",color:"#24292e"},html:"Session ID: "+e.session_id}),a=h.createDiv({style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))",gap:"12px"}});return a.appendChild(createMetricItem("Duration",(e.duration_ms/1e3).toFixed(1)+"s")),a.appendChild(createMetricItem("Total Cost","$"+e.cost_usd.toFixed(4))),a.appendChild(createMetricItem("Input Tokens",e.input_tokens.toLocaleString())),a.appendChild(createMetricItem("Output Tokens",e.output_tokens.toLocaleString())),0<e.cache_read_tokens&&a.appendChild(createMetricItem("Cache Hits",e.cache_read_tokens.toLocaleString())),t.appendChild(r),t.appendChild(a),t}function createMetricItem(e,t){var r=h.createDiv({style:{background:"white",padding:"10px",borderRadius:"4px",border:"1px solid #e1e4e8"}}),e=h.createDiv({style:{fontSize:"12px",color:"#586069",marginBottom:"4px"},text:e}),t=h.createDiv({style:{fontSize:"16px",fontWeight:"600",color:"#24292e"},text:t});return r.appendChild(e),r.appendChild(t),r}module.exports={handleClaudeCodeChat:handleClaudeCodeChat};
