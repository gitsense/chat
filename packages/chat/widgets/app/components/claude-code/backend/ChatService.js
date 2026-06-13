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

let spawn=require("child_process").spawn,fs=require("fs"),path=require("path"),os=require("os"),promisify=require("util").promisify,execAsync=promisify(require("child_process").exec);class ChatService{static executeStream({chat:n,userMessage:s,model:p,res:v,onBeforeDone:g,onClose:m,agentType:f="claude"}){return new Promise((t,i)=>{v.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Accel-Buffering":"no"}),v.flushHeaders();let r=(e,t)=>{v.writableEnded||(v.write(`data: ${JSON.stringify({type:e,...t})}

`),"function"==typeof v.flush&&v.flush())};var e="analyze"===n.type?"analyze":"coding-assistant",e=["codex"===f?"codex":"claude","chat","--uuid",n.uuid,"--parent-id",s.id,"--message",s.message,"--format","json","--model",p,"--mode",e];let a=spawn("gsc",e,{stdio:["ignore","pipe","pipe"]}),o="",c="",d=null,l=p,u=!1,h=!1;a.stdout.on("data",e=>{var t,e=(o+=e.toString()).split("\n");o=e.pop();for(t of e)if(t.trim())try{var a=JSON.parse(t);switch(a.event){case"init":l=a.model,r("init",a);break;case"status":r("status",{message:a.message});break;case"text":a.delta&&(c+=a.delta,r("text",{delta:a.delta}));break;case"thinking":a.delta&&r("thinking",{delta:a.delta});break;case"done":d=a.stats||{session_id:a.thread_id||"unknown",total_cost_usd:0,usage:a.usage||{}},console.error("[ChatService] Received done event");var n=a.result||c,s=ChatService.appendSessionMetrics(n,d,l);g(s,d,l).then(()=>{u=!0,h=!0,r("done",{stats:d}),v.end()}).catch(e=>{console.error("[ChatService] Error in onBeforeDone:",e),r("error",{message:"Failed to process response."}),v.end(),i(e)});break;default:r("unknown",a)}}catch(e){console.warn("[ChatService] Failed to parse line:",t)}}),a.stderr.on("data",e=>{console.error("[ChatService] CLI Error:",e.toString()),r("error",{message:e.toString()})}),a.on("exit",e=>{0===e?h?t():console.warn("[ChatService] Process exited with code 0, but stream not yet marked complete. Waiting for done event..."):(v.writableEnded||(r("error",{message:"CLI exited with code "+e}),v.end()),i(new Error("CLI process exited with code "+e)))}),v.on("close",async()=>{if(!h){if(a&&!a.killed&&a.kill("SIGTERM"),m)try{await m(c,l)}catch(e){console.error("[ChatService] Error in onClose:",e)}v.writableEnded||v.end()}})})}static appendSessionMetrics(e,t,a){return t?(a={duration_ms:t.duration_ms||0,cost_usd:t.total_cost_usd||0,input_tokens:t.usage?.input_tokens||0,output_tokens:t.usage?.output_tokens||0,cache_creation_tokens:t.usage?.cache_creation_input_tokens||0,cache_read_tokens:t.usage?.cache_read_input_tokens||t.usage?.cached_input_tokens||0,model:a||t.model||"unknown",session_id:t.session_id||"unknown"},e+`

`+("@@GSC-SESSION-METRICS<json>"+JSON.stringify(a))):e}static async checkAvailability(e="claude"){var t={available:!1,reason:null,details:{}};try{var a=process.env.GSC_HOME||path.join(os.homedir(),".gitsense");if("codex"===e){var n=path.join(a,"cli","templates","codex","chat","coding_assistant.md");if(!fs.existsSync(n))return t.available=!1,t.reason="Codex environment not initialized. Please run `gsc codex init`.",t.details.configured=!1,t;t.details.configured=!0;var s=path.join(os.homedir(),".codex","auth.json");try{var i=fs.readFileSync(s,"utf8");if(!JSON.parse(i).tokens?.access_token)return t.available=!1,t.reason="Codex is not authenticated. Please run `codex` and log in.",t.details.authenticated=!1,t;t.details.authenticated=!0}catch(e){return t.available=!1,t.reason="Codex is not authenticated. Please run `codex` and log in.",t.details.authenticated=!1,t}}else{try{await execAsync("claude auth status --text"),t.details.authenticated=!0}catch(e){return t.available=!1,t.reason="Claude Code is not authenticated. Please run `claude auth login`.",t.details.authenticated=!1,t}var r=path.join(a,"cli","templates","claude","chat","claude_template.md");if(!fs.existsSync(r))return t.available=!1,t.reason="Claude Code environment not initialized. Please run `gsc claude init`.",t.details.configured=!1,t;t.details.configured=!0;try{var o=(await execAsync("claude --version")).stdout;t.details.version=o.trim()}catch(e){t.details.version="unknown"}}return t.available=!0,t}catch(e){return t.available=!1,t.reason="Unexpected error checking availability: "+e.message,t}}}module.exports=ChatService;
