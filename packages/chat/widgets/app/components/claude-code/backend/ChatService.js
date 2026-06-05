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

let spawn=require("child_process").spawn,fs=require("fs"),path=require("path"),os=require("os"),promisify=require("util").promisify,execAsync=promisify(require("child_process").exec);class ChatService{static executeStream({chat:s,userMessage:r,model:p,res:m,onBeforeDone:v,onClose:g}){return new Promise((t,n)=>{m.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Accel-Buffering":"no"}),m.flushHeaders();let i=(e,t)=>{m.writableEnded||(m.write(`data: ${JSON.stringify({type:e,...t})}

`),"function"==typeof m.flush&&m.flush())};var e="analyze"===s.type?"analyze":"coding-assistant",e=["claude","chat","--uuid",s.uuid,"--parent-id",r.id,"--message",r.message,"--format","json","--model",p,"--mode",e];let a=spawn("gsc",e,{stdio:["ignore","pipe","pipe"]}),o="",c="",l=null,d=p,u=!1,h=!1;a.stdout.on("data",e=>{var t,e=(o+=e.toString()).split("\n");o=e.pop();for(t of e)if(t.trim())try{var a=JSON.parse(t);switch(a.event){case"init":d=a.model,i("init",a);break;case"status":i("status",{message:a.message});break;case"text":a.delta&&(c+=a.delta,i("text",{delta:a.delta}));break;case"thinking":a.delta&&i("thinking",{delta:a.delta});break;case"done":l=a.stats,console.error("[ChatService] Received done event");var s=a.result||c,r=ChatService.appendSessionMetrics(s,l,d);v(r,l,d).then(()=>{u=!0,h=!0,i("done",{stats:l}),m.end()}).catch(e=>{console.error("[ChatService] Error in onBeforeDone:",e),i("error",{message:"Failed to process response."}),m.end(),n(e)});break;default:i("unknown",a)}}catch(e){console.warn("[ChatService] Failed to parse line:",t)}}),a.stderr.on("data",e=>{console.error("[ChatService] CLI Error:",e.toString()),i("error",{message:e.toString()})}),a.on("exit",e=>{0===e?h?t():console.warn("[ChatService] Process exited with code 0, but stream not yet marked complete. Waiting for done event..."):(m.writableEnded||(i("error",{message:"CLI exited with code "+e}),m.end()),n(new Error("CLI process exited with code "+e)))}),m.on("close",async()=>{if(!h){if(a&&!a.killed&&a.kill("SIGTERM"),g)try{await g(c,d)}catch(e){console.error("[ChatService] Error in onClose:",e)}m.writableEnded||m.end()}})})}static appendSessionMetrics(e,t,a){return t?(a={duration_ms:t.duration_ms||0,cost_usd:t.total_cost_usd||0,input_tokens:t.usage?.input_tokens||0,output_tokens:t.usage?.output_tokens||0,cache_creation_tokens:t.usage?.cache_creation_input_tokens||0,cache_read_tokens:t.usage?.cache_read_input_tokens||0,model:a||t.model||"unknown",session_id:t.session_id||"unknown"},e+`

`+("@@GSC-SESSION-METRICS<json>"+JSON.stringify(a))):e}static async checkAvailability(){var t={available:!1,reason:null,details:{}};try{try{await execAsync("claude auth status --text"),t.details.authenticated=!0}catch(e){return t.available=!1,t.reason="Claude Code is not authenticated. Please run `claude auth login`.",t.details.authenticated=!1,t}var e=process.env.GSC_HOME||path.join(os.homedir(),".gitsense"),a=path.join(e,"cli","templates","claude","chat","claude_template.md");if(fs.existsSync(a)){t.details.configured=!0;try{var s=(await execAsync("claude --version")).stdout;t.details.version=s.trim()}catch(e){t.details.version="unknown"}t.available=!0}else t.available=!1,t.reason="Claude Code environment not initialized. Please run `gsc claude init`.",t.details.configured=!1;return t}catch(e){return t.available=!1,t.reason="Unexpected error checking availability: "+e.message,t}}}module.exports=ChatService;
