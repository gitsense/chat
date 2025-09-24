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

require("dotenv").config();let fs=require("fs"),path=require("path"),Anthropic=require("@anthropic-ai/sdk"),OpenAI=require("openai"),crypto=require("crypto"),sleep=require("util").promisify(setTimeout),{join,dirname}=require("path"),existsSync=require("fs").existsSync,ChatManager=require("@gitsense/gscb-git-tools").ChatManager,{init:initInit,models,providers,trees,readOptionsFile}=require("./init.js"),{create,getDBPath}=require("./db.js"),{connect,closeAsync,allAsync,runAsync,prepareAsync,stmtFinalizeAsync,stmtRunAsync}=require("./sqlite.js"),Prompts=require("./prompts.js").Prompts,{search,generateSearchSystemPrompt,getSearchUserInstruction,getSearchHelp}=require("./components/search/backend/gitsense"),buildAnalyzeMenuOptions=require("./components/chat-builder/utils/analyzeMenuBuilder").buildAnalyzeMenuOptions,SUGGEST_CHAT_TITLE=require("./prompt-templates.js").SUGGEST_CHAT_TITLE,prepareIsolatedTree=require("./components/chat-builder/utils/treesUtils").prepareIsolatedTree,{extractCodeBlocks,fixTextCodeBlocks,removeCodeBlockMarkers,formatWithLineNumbers,removeLineNumbers,updateCodeBlockByIndex,deleteCodeBlockByIndex,getChatTemplateMessages:_getChatTemplateMessages,estimateTokens,isToolBlock,parseToolBlock}=require("@gitsense/gsc-utils"),AnalyzerUtils=require("@gitsense/gsc-utils").AnalyzerUtils,SYSTEM_ROLE="system",USER_ROLE="user",ASSISTANT_ROLE="assistant",DEFAULT_GROUP_TYPE="regular",DEFAULT_PROMPT_TYPE="system",DEFAULT_CHAT_OWNER="everyone",DEFAULT_CHAT_TYPE="regular",DEFAULT_MSG_TYPE="regular",DEFAULT_CHAT_VISIBILITY="public",DEFAULT_MSG_VISIBILITY="public",STREAM_TIMEOUT=3e4,MAX_OUTPUT_TOKENS=4e3,GSC_HOME=path.resolve(__dirname,"..","..","..",".."),ANALYZE_BASE_PATH=path.resolve(GSC_HOME,"data","analyze"),ENTERPRISE_BATCH_NOT_INSTALLED="Enterprise batch component not installed",batch=null,widget=null;async function init(e){widget=e,await create(readOptionsFile,!0);e=connect(getDBPath());try{var t=path.resolve(__dirname,"..","..","..","..");await initInit(e);try{await(batch=require("@gitsense/gsc-enterprise-batch")).initialize({gscHome:t})}catch(e){console.log("GitSense Chat batch processing not installed")}}finally{await closeAsync(e)}}async function deleteData(e){var t=e.query.action;return"delete-analyzer"===t?deleteAnalyzer(e.query):"delete-chat"===t?deleteChat(e.query):"delete-chat-message"===t?deleteChatMessage(e.query):{status:"failed",data:{action:"Unrecognized action "+t}}}async function getData(e){var t,a,r,s=e.query.action;try{if("get-chat"===s)return await getChat(e.query);if("get-chat-title-suggestion"===s)return await getChatTitleSuggestion(e.query);if("get-git-blob-chat-messages"===s)return await getGitBlobChatMessages(e.query);if("get-chat-analysis-messages"===s)return await getChatAnalysisMessages(e.query);if("get-tiny-overview-chat-purpose"===s)return await getTinyOverviewChatPurpose(e.query);if("get-git-ref-chat-by-family-member"===s)return await getGitRefChatByFamilyMember(e.query);if("get-analyze-batch-details"===s)return batch&&batch.getAnalyzeBatchDetails?(t=e.query["batch-job-id"],{status:"success",data:await batch.getAnalyzeBatchDetails(parseInt(t))}):{status:"failed",error:ENTERPRISE_BATCH_NOT_INSTALLED};if("get-analyze-chat-messages-for-batch-group"===s)return batch&&batch.getAnalyzeChatMessagesForBatchGroup?({"batch-job-id":a,"group-number":r}=e.query,{status:"success",data:await batch.getAnalyzeChatMessagesForBatchGroup(parseInt(a),parseInt(r))}):{status:"failed",error:ENTERPRISE_BATCH_NOT_INSTALLED};if("get-analyze-chat-menu-options"===s)return getAnalyzeChatMenuOptions(e.query);if("get-analyzers"===s)return getAnalyzers(e.query);if("get-analyzer-schema"===s)return getAnalyzerSchema(e.query);if("get-chat-template-messages"===s)return getChatTemplateMessages(e.query);if("get-search-help"===s)return getSearchHelp(e.query);if("get-search-user-instructions"===s)return getSearchUserInstruction(e.query);if("get-options"===s)return getOptions();if("generate-search-system-prompt"===s)return await generateSearchSystemPrompt(e.query);if("get-scheduled-batch-providers"===s)return batch?{status:"success",data:await batch.getScheduledBatchProviders()}:{status:"failed",error:ENTERPRISE_BATCH_NOT_INSTALLED};if("search"===s)return await search(e.query);if("stream"===s)return await stream(e)}catch(e){return console.error(e),{status:"failed",error:e.message}}return{status:"failed",data:{action:"Unrecognized action "+s}}}async function postData(e){var t=e.body.action;if("cancel-batch-job"===t){if(!batch)return{status:"failed",error:ENTERPRISE_BATCH_NOT_INSTALLED};var a=e.body["batch-job-id"];try{return{status:"success",data:await batch.cancelBatchJob(parseInt(a))}}catch(e){return console.error(e),{status:"failed",error:e}}}else if("create-analyze-batch-job"===t){if(!batch)return{status:"failed",error:ENTERPRISE_BATCH_NOT_INSTALLED};var{analyzerId:a,modelName:r,batchGroupsPayload:s,batchOptions:i,triggerChatId:n,batchType:o}=e.body;try{return{status:"success",data:await batch.createAnalyzeBatchJob(a,r,s,i,n,o)}}catch(e){return console.error(e),{status:"failed",error:e}}}else{if("new-chat"===t)return newChat(e.body);if("new-chat-message"===t)return newChatMessage(e.body);if("new-chat-tree"===t)return newChatTree(e.body)}return{status:"failed",data:{action:"Unrecognized action "+t}}}async function putData(e){var t=e.body.action;if("update-batch-group-analyze-chat-uuid"===t){if(!batch)return{status:"failed",error:ENTERPRISE_BATCH_NOT_INSTALLED};var{"batch-job-id":a,"group-number":r,"analyze-chat-uuid":s}=e.body;try{return await batch.updateBatchGroupAnalyzeChatUuid(parseInt(a),parseInt(r),s),{status:"success"}}catch(e){return console.error(e),{status:"failed",error:"Failed to update analyze chat UUID: "+e.message}}}else{if("update-chat-analyzer"===t)return updateChatAnalyzer(e.body);if("update-chats"===t)return updateChats(e.body);if("update-chat-message"===t)return updateChatMessage(e.body);if("update-chat-analysis-messages"===t)return upateChatAnalysisMessages(e.body);if("update-chat-name"===t)return updateChatName(e.body);if("reset-batch-group"===t){if(!batch)return{status:"failed",error:ENTERPRISE_BATCH_NOT_INSTALLED};var{"batch-job-id":a,"group-number":r}=e.body;try{return await batch.resetBatchGroup(parseInt(a),parseInt(r))}catch(e){return console.error(e),{success:!1,message:"Failed to reset batch group: "+e.message}}}else if("reset-chat-message"===t)return resetChatMessage(e.body)}return{status:"failed",data:{action:"Unrecognized action "+t}}}async function stream(o,l){let{"message-id":_,"chat-uuid":P,provider:a}=o.query,T=connect(getDBPath());try{var{message:e,model:r,real_model:i,temperature:c}=await getMessage(T,_);if(null!=e)l.status(403).send({status:"failed",data:"Chat has already completed"});else{var s=readOptionsFile(),d=i||r,u=!!d.match(/^Fake/),m=!!d.match(/Notes/i);let e=null;if(u||m||a){var t=(e=u||m?{}:providers[a.toLowerCase()]).apiKeyName,h=t?process.env[t]:"";if(u||m||h){var g=models[d]?.providers||null;if(u||m||g){var p="number"==typeof s.maxChatCompletionSize?s.maxChatCompletionSize:-1;let t="number"==typeof s.maxOutputTokens?s.maxOutputTokens:MAX_OUTPUT_TOKENS,r=null,i=null,n=null;if(u||m)n=d;else for(let e=0;e<g.length;e++){var y=g[e];if(y.name.toLowerCase()===a.toLowerCase()){n=y.modelId,y.maxOutputTokens&&(t=y.maxOutputTokens),y.thinkingBudget&&(r=isNaN(y.thinkingBudget)?0:y.thinkingBudget),y.includeThoughts&&(i=y.includeThoughts||!1);break}}if(n){global.gschat||(global.gschat={streaming:{}});var f=P+"::"+d+"::"+c,E=global.gschat.streaming[f];if(E){var{startedAt:B,updatedAt:Y}=E,W=Date.now()-B,z=Date.now()-Y;if(z<STREAM_TIMEOUT)return void l.status(400).send({status:"failed",data:`Streaming in progresss. Started ${W}ms ago and last updated ${z}.`});console.warn(`The stream ${f} has not updated in over ${STREAM_TIMEOUT}ms`),delete global.gschat.streaming[f]}var w={startedAt:Date.now(),updatedAt:Date.now()};global.gschat.streaming[f]=w,console.log("Created streaming lock for "+f);try{var A=(await getMessageLineage(T,_)).filter(e=>"public"===e.visibility),q=A.map(e=>e.message),G=JSON.stringify(q).length;if(-1!==p&&p<G)await H(l,`Total chat completion payload message size (${G}) exceeds the maximum allowed character limit of ${p} characters.`);else{l.setHeader("Content-Type","text/event-stream"),l.setHeader("Cache-Control","no-cache"),l.setHeader("Connection","keep-alive"),l.flushHeaders();var J="anthropic"===a.toLowerCase();if(u){var j=d;var V=A;let a=[],e=(V.forEach((e,t)=>{t!==V.length-1&&({role:t,message:e}=e,""!==e)&&a.push({role:t,content:e})}),Date.now()),t="This is a Fake LLM response.",r={content:t,done:!1};l.write(`id: ${e}
event: message
data: ${JSON.stringify(r)}

`),l.flush?.(),r={content:"",done:!0},l.write(`id: ${e}
event: message
data: ${JSON.stringify(r)}

`),l.flush?.(),l.write(`id: ${e}
event: complete
data: {}

`),l.end(),await k(t,j);void await 0}else if(m){var K=d;var Z=A;let a=[],e=(Z.forEach((e,t)=>{t!==Z.length-1&&({role:t,message:e}=e,""!==e)&&a.push({role:t,content:e})}),Date.now()),t="This is a GitSense Notes response.",r={content:t,done:!1};l.write(`id: ${e}
event: message
data: ${JSON.stringify(r)}

`),l.flush?.(),r={content:"",done:!0},l.write(`id: ${e}
event: message
data: ${JSON.stringify(r)}

`),l.flush?.(),l.write(`id: ${e}
event: complete
data: {}

`),l.end(),await k(t,K);void await 0}else{if(J){var X=A,S=w,v=d,Q=c,N=n,ee=t,te=h,ae=f;let a=null,r=[];X.forEach((e,t)=>{t!==X.length-1&&({role:t,message:e}=e,""!==e)&&(t===SYSTEM_ROLE?a=e:r.push({role:t,content:e}))});var I={messages:I=populateMessages(v,r),model:N,temperature:Q,max_tokens:ee,stream:!0};a&&(N=populateMessages(v,[{content:a}]),I.system=N[0].content);try{o.setTimeout(3e4);var R=Date.now();let e=!1;o.on("close",()=>{console.log("Client closed connection"),e=!0});var D,C,re,se=new Anthropic({apiKey:te}),O=(console.log(`Starting stream ${ae}...`),{startedAt:(new Date).getTime()}),ie=await se.messages.create(I);S.createdAt=Date.now(),S.payload=I;let t=!1,a="";for await(D of ie){if(S.updatedAt=Date.now(),e)break;if("content_block_delta"===D.type&&(C=D.delta.text||"")&&(a+=C,re={content:C,done:!1},l.write(`id: ${R}
event: message
data: ${JSON.stringify(re)}

`),l.flush?.()),"message_stop"===D.type){console.log("Finished streaming "+ae),l.write(`id: ${R}
event: message
data: {"done": true}

`),l.flush?.(),O.done=!0,O.stoppedAt=(new Date).getTime(),t=!0;break}}t||(O.incomplete=!0,O.stoppedAt=(new Date).getTime(),a+="\n\n---\nWarning: Incomplete response"),e||(l.write(`id: ${R}
event: complete
data: {}

`),l.end()),await k(a,v,O)}catch(e){console.error("Streaming error: "+e),await H(l,e.message),l.end()}}else{var ne=e,oe=A,M=w,L=d,le=c,ce=n,de=t,ue=r,me=i,he=h,ge=f;let a=[],s=(oe.forEach((e,t)=>{t!==oe.length-1&&({role:t,message:e}=e,""!==e)&&a.push({role:t,content:e})}),populateMessages(L,a));try{o.setTimeout(3e4);let t=!1;o.on("close",e=>{console.log("Client closed connection"),t=!0});var b={model:ce,temperature:le,messages:s,stream:!0,max_tokens:de},pe=((ue||me)&&(b.extra_body={google:{thinking_config:{thinking_budget:0,include_thoughts:me}}}),new OpenAI({apiKey:he,baseURL:ne.baseURL})),U={startedAt:(new Date).getTime()};let e=null;try{console.log(`Starting stream ${ge}...`),e=await pe.chat.completions.create(b)}catch(e){return void await(console.error("Failed to create a stream:",e),e.message.includes("status code")&&(e.message+="\n\nPlease look up the error code with the provider to determine the problem."),await H(l,e.message,L),void l.end())}M.createdAt=Date.now(),M.payload=b;var F,ye=Date.now();let a=!1,r="";for await(F of e){if(M.updatedAt=Date.now(),t)break;var $=F.choices[0]?.delta?.content||"",x=F.choices[0]?.finish_reason,fe=x&&"null"!==x&&"stop"===x,Ee={content:$,done:fe};if($&&(r+=$),l.write(`id: ${ye}
event: message
data: ${JSON.stringify(Ee)}

`),l.flush?.(),fe){console.log("Finished streaming "+ge),""===r.trim()&&(r="### WARNING\n\nThe LLM stopped without returning a response. If a response was expected, please try sending a `Try again` message."),U.done=!0,U.stoppedAt=(new Date).getTime(),a=!0;break}}a||(U.incomplete=!0,U.stoppedAt=(new Date).getTime(),r+="\n---\nWarning: Incomplete response"),t||(l.write(`id: ${ye}
event: complete
data: {}

`),l.end()),await k(r,L,U)}catch(e){console.error("Streaming error:",e),await H(l,e.message),l.end()}}await 0}}}finally{console.log("Deleting streaming lock "+f),delete global.gschat.streaming[f]}}else l.status(500).send({status:"failed",data:`Server side error. No model identifier for ${d} by ${a} found.`})}else l.status(400).send({status:"failed",data:"No providers for the LLM "+d})}else await H(l,`No ${a} API key defined. Please define to chat with ${d}.`)}else l.status(400).send({status:"failed",data:{provider:"Missing provider information"}})}}finally{console.log("Closing db"),await closeAsync(T)}async function H(e,t,a){console.log("Stream error message",t);try{try{e.setHeader("Content-Type","text/event-stream"),e.setHeader("Cache-Control","no-cache"),e.setHeader("Connection","keep-alive"),e.flushHeaders()}catch(e){}var r=Date.now(),s={content:t,done:!1};e.write(`id: ${r}
event: message
data: ${JSON.stringify(s)}

`),e.flush?.(),s={content:"",done:!0},e.write(`id: ${r}
event: message
data: ${JSON.stringify(s)}

`),e.flush?.(),e.write(`id: ${r}
event: complete
data: {}

`),e.end(),await k(t,a),console.log("saved response")}catch(e){console.log(e.message)}}async function k(t,a,e){var r=new RegExp("Authored by [^\n]+\n*$");let s=extractCodeBlocks(t,{silent:!0}).blocks||[];for(let e=0;e<s.length;e++){var i=s[e];i.header?.["Block-UUID"]&&(i=removeLineNumbers(i.headerText+"\n\n\n"+i.content),t=updateCodeBlockByIndex(t,e,i))}t=(t=fixTextCodeBlocks(replaceGSUUIDs(t)).text).replace(r,""),t=removeCodeBlockMarkers(t);r=isSearchableMessage(t+=`

Authored by LLM ${a||"N/A"} at `+(new Date).toUTCString()),a=`
            UPDATE
                messages
            SET
                message = ?,
                ${e?"chat_completion_stats = ?,":""}
                ${r?"":"meta = ?,"}
                job_id = NULL
            WHERE
                id = ?
        `;let n=[t];e&&n.push(JSON.stringify(e)),r||n.push(JSON.stringify({searchable:!1})),n.push(_);try{await runAsync(T,a,n)}catch(e){throw new Error(`Failed to update chat message ${_}:
${a}
`+e)}if((s=(extractCodeBlocks(t,{silent:!0})||{}).blocks||[]).length){var o=`
            INSERT INTO code_blocks (
                message_id,
                type,
                uuid,
                parent_uuid,
                component,
                size,
                major,
                minor,
                patch,
                header,
                content,
                created_at,
                updated_at
            ) VALUES (
                ?, -- message id
                ?, -- type
                ?, -- uuid
                ?, -- parent uuid
                ?, -- component
                ?, -- size
                ?, -- major
                ?, -- minor
                ?, -- patch
                ?, -- header
                ?, -- content
                strftime('%Y-%m-%d %H:%M:%f', 'now'),
                strftime('%Y-%m-%d %H:%M:%f', 'now')
            )
            ON CONFLICT (message_id, uuid) DO UPDATE SET
                parent_uuid = excluded.parent_uuid,
                component = excluded.component,
                size = excluded.size,
                major = excluded.major,
                minor = excluded.minor,
                patch = excluded.patch,
                header = excluded.header,
                content = excluded.content,
                updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now');
        `;for(let e=0;e<s.length;e++){var{type:l,header:c,metadata:d,content:u}=s[e];if(c||d){var m="code"===l,h="patch"===l,{Component:g,"Block-UUID":p,"Parent-UUID":y,"Source-Block-UUID":f,"Target-Block-UUID":E,"Target-Version":w}=m?c:d;if(!(m&&!c.Version||h&&!w)){h=(m?c.Version:w).split(/\./);if(h&&3===h.length)if(h.find(e=>isNaN(e)))console.warn(`Found the non number "${nonNumber}" in the version array. Ignoring code block.`);else{let e=[_,l,m?p:f+":"+E,!m||"N/A"===y?null:y,g||"Patch",u.length,h[0],h[1],h[2],JSON.stringify(c||d),u];try{await runAsync(T,o,e)}catch(e){throw new Error(`Failed to upsert code block:
${o}
`+e)}}else console.warn(`Expecting version array to contain a major, minor and patch value. Found "${JSON.stringify(h)}" instead. Ignoring code block.`)}}}}else console.log("No code blocks")}}async function getChatCompletion(e,t,p,a){var r=models[t]?.providers||null;if(!r)throw new Error("No providers with the model "+t);readOptionsFile();r=r[0];r.maxOutputTokens||MAX_OUTPUT_TOKENS;let y=r.modelId;var r=r.name,s=providers[r],i="anthropic"===r.toLowerCase(),n=s.apiKeyName,o=n?process.env[n]:"";return null==o?{status:"failed",data:`No API key ${n} for ${r} defined`}:(i?async(r,s,i)=>{let n=r.name,e=new Anthropic({apiKey:i}),d=(new Date).getTime()/1e3,u=/You have reached your specified API usage limits/,o=(console.log("Using API key ..."+i.slice(40)),null),l=[];s.forEach((e,t)=>{var{role:e,content:a}=e;e===SYSTEM_ROLE?o=a:l.push({role:e,content:[{type:"text",text:a}]})}),r={messages:l,model:y,temperature:p,max_tokens:1e3,stream:!1},o&&(r.system=o);try{var{data:t,response:a}=await e.messages.create(r).withResponse(),c=a.headers,m=g(null,c),h=replaceGSUUIDs(t.content[0].text);return{success:!0,messages:s,response:h,rateLimit:m}}catch(e){var{status:i,headers:r,error:s}=e,s=s?s.error.message:null;console.error("Exception:\n"),console.error(e),s?(console.log("Error message"),console.error(s)):console.log("No error message");let t=null,a=null;return 400===i?s.match(u)?(t="Rate limit error",a=g(s,r)):t="Serious: Bad request error":401===i?t="Serious: Authentication error":403===i?t="Serious: Permission denied error":404===i?t="Serious: Not found error":413===i?t="Serious: Request exceeds the maximum allowed number of bytes.":429===i?(t="Rate limit error",a=g(s,r)):t=500<=i?n+" server error":"Serious: Unknown error",{success:!1,reason:t,rateLimit:a}}function g(e,t){let a=null,r=null,s=null,i=null,n=null,o=null,l=null,c=null;try{c=t.get?(a=new Date(t.get("date")).getTime()/1e3,r=parseInt(t.get("anthropic-ratelimit-requests-limit")),i=parseInt(t.get("anthropic-ratelimit-requests-remaining")),o=t.get("anthropic-ratelimit-requests-reset"),s=parseInt(t.get("anthropic-ratelimit-tokens-limit")),n=parseInt(t.get("anthropic-ratelimit-tokens-remaining")),l=t.get("anthropic-ratelimit-tokens-reset"),t.get("retry-after")):(a=new Date(t.date).getTime()/1e3,r=parseInt(t["anthropic-ratelimit-requests-limit"]),i=parseInt(t["anthropic-ratelimit-requests-remaining"]),o=t["anthropic-ratelimit-requests-reset"],s=parseInt(t["x-ratelimit-limit-tokens"]),n=parseInt(t["anthropic-ratelimit-tokens-remaining"]),l=t["anthropic-ratelimit-tokens-reset"],t["retry-after"])}catch(e){console.error("Failed to parse header: "+e.getMessage())}return e&&e.match(u)&&(c="60m"),{sentAtEpochTime:d,receivedAtEpochTime:a,limitRequests:r,limitTokens:s,limitRemainingRequests:i,limitRemainingTokens:n,limitResetRequests:o,limitResetTokens:l,retryAfter:c}}}:async(s,i,n)=>{let{name:d,baseURL:e}=s,t=new OpenAI({apiKey:n,baseURL:e}),u=(new Date).getTime()/1e3,m=/Please try again in ([^\.]+)./,h=/You exceeded your current quota/;try{console.log("Using API key ..."+n.slice(20));var a={messages:i,model:y,temperature:p,stream:!1},r=(await t.chat.completions.create(a).withResponse()).data;return{status:"success",data:replaceGSUUIDs(r.choices[0].message.content)}}catch(e){var{status:s,headers:n,error:i}=e;let t="No error message";i&&(i.message?t=i.message:i.error&&(t=i.error.message)),console.error("Request failed"),console.error(JSON.stringify(e,null,2)),console.error("Error message:"),console.error(t);let a=null,r=null;return 400===s?a="Serious: Bad request error":401===s?a="Serious: Authentication error":403===s?a="Serious: Permission denied error":404===s?a="Serious: Not found error":422===s?a="Serious: UnprocessableEntityError":429===s?(a="Rate limit error",r=((e,t)=>{console.log("Retrieving rate limit from the following response header:"),console.log(t),console.log("");let a=null,r=null,s=null,i=null,n=null,o=null,l=null,c=null;return c=t.get?(a=new Date(t.get("date")).getTime()/1e3,r=parseInt(t.get("x-ratelimit-limit-requests")),i=parseInt(t.get("x-ratelimit-remaining-requests")),o=t.get("x-ratelimit-reset-requests"),s=parseInt(t.get("x-ratelimit-limit-tokens")),n=parseInt(t.get("x-ratelimit-remaining-tokens")),l=t.get("x-ratelimit-reset-requests"),t.get("retry-after")):(a=new Date(t.date).getTime()/1e3,r=parseInt(t["x-ratelimit-limit-requests"]),i=parseInt(t["x-ratelimit-remaining-requests"]),o=t["x-ratelimit-reset-requests"],s=parseInt(t["x-ratelimit-limit-tokens"]),n=parseInt(t["x-ratelimit-remaining-tokens"]),l=t["x-ratelimit-reset-requests"],t["retry-after"]),e?"groq"===d?e.match(m)?(t=m.exec(e),c=t[1]):console.log("Error message did not match "+m):"openai"===d?e.match(h)&&(c="60m"):console.log("No message processor for provider "+d):console.log("No message provided"),{sentAtEpochTime:u,receivedAtEpochTime:a,limitRequests:r,limitTokens:s,limitRemainingRequests:i,limitRemainingTokens:n,limitResetRequests:o,limitResetTokens:l,retryAfter:c}})(t,n)):a=500<=s?d+" server error":"Serious: Unknown error",{success:!1,reason:a,rateLimit:r}}})(s,populateMessages(t,a),o)}async function getChat(e){var{id:t,uuid:a,model:r,"system-message-name":s,"group-id":i}=e,e=e["max-depth"]?parseInt(e["max-depth"]):1e4,n=connect(getDBPath());try{var o,l,c=a?await getChatPrivate(n,null,a):t?await getChatPrivate(n,t):i&&s&&r?await getChatPrivate(n,null,null,i,s,r):null;return c?({id:o,parent_id:l}=c,(new Date).getTime(),c.messages=await getChatMessages(n,o,r),l&&(c.lineage=await getChatLineage(n,o)),c.descendants=e?await getChatDescendants(n,o,e):null,{status:"success",data:{chat:c}}):{status:"failed",data:"Not found"}}finally{await closeAsync(n)}}async function getGitRefChatByFamilyMember(e){var e=e.id,t=connect(getDBPath());try{var a,r,s=await getChatPrivate(t,e);return s?(a=["git-ref","git-blob","git-tree"]).includes(s.type)?(r="git-ref"===s.type?s:await getGitRefChat(t,s.id))?(r.descendants=await getChatDescendants(t,r.id),{status:"success",data:r}):{status:"failed",data:"Failed to retrieve the Git ref chat for the chat with the id "+s.id}:{status:"failed",data:"Invalid chat type. Expecting one of the following "+`${JSON.string(a.join(","))} but found ${s.type} instead`}:{status:"failed",data:"No chat with the provided id or UUID found"}}catch(e){return{status:"failed",data:e.message}}finally{await closeAsync(t)}}async function getChatPrivate(e,t,a,r,s,i){var n=[];let o=null;if(t)o="c.id = ?",n.push(t);else if(a)"repositories"===a?o="c.type = 'git-repos'":(o="uuid = ?",n.push(a));else{if(!(r&&s&&i))return null;o="group_id = ? AND p.name = ? AND c.main_model = ?",n.push(r),n.push(s),n.push(i)}t=`
        SELECT
            c.id,
            c.type,
            c.name,
            c.uuid,
            c.parent_id,
            c.group_id,
            p.name prompt,
            c.main_model,
            c.is_default_name,
            c.order_weight,
            c.meta,
            c.created_at,
            c.updated_at
        FROM
            chats c,
            prompts p
        WHERE
            c.deleted = 0 AND
            p.id = c.prompt_id AND
            ${o}
    `;try{var l,c=await allAsync(e,t,n);return c&&c.length?((l=c[0]).meta&&(l.meta=JSON.parse(l.meta)),l):null}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}}async function getChatLineage(e,t,a=!0){var r=`
        WITH RECURSIVE matches AS (
            SELECT
                id,
                type,
                uuid,
                name,
                parent_id,
                group_id,
                main_model,
                created_at,
                updated_at
            FROM
                chats
            WHERE
                deleted = 0 AND
                id = ?

            UNION

            SELECT
                c.id,
                c.type,
                c.uuid,
                c.name,
                c.parent_id,
                c.group_id,
                c.main_model,
                c.created_at,
                c.updated_at
            FROM
                chats c
            INNER JOIN matches m ON m.parent_id = c.id
            WHERE
                deleted = 0
        )
        SELECT * FROM matches ${a?"WHERE id != ?":""} ORDER BY parent_id
    `;try{var s=a?[t,t]:[t];return await allAsync(e,r,s)}catch(e){throw console.error(`Failed to execute ${r}:
`+e.message),new Error("Server side error")}}async function getChatTitleSuggestion(a){var{uuid:a,model:r}=a,s=connect(getDBPath());try{var i=await(async(e,t)=>{var a=`
            SELECT
                id,
                main_model
            FROM
                chats
            WHERE
                uuid = ?
        `;try{var r=[t],s=await allAsync(e,a,r);return s&&s.length?s[0]:null}catch(e){throw console.error(`Failed to execute ${a}:
`+e.message),new Error("Server side error")}})(s,a);if(!i)return{status:"failed",data:"Not found",code:404};var{id:n,main_model:o}=i,l=(await getChatMessages(s,n,o))[0];let e=SUGGEST_CHAT_TITLE.replace(/{{system}}/,null==l.message?"":`<system_prompt>${l.message}</system_prompt>`);var c;let t=null;e=("GitSense Notes"===o?(t=l.kids[0],e.replace(/{{user}}/,"")):(c=l.kids[0],t=c.kids[0],e.replace(/{{user}}/,`<user_message>${c.message}</user_message>`))).replace(/{{assistant}}/,`<assistant_message>${t.message}</assistant_message>`);var d=[{role:USER_ROLE,content:e}],u=await getChatCompletion(s,r,0,d),{status:m,data:h}=u;return"success"!==m?u:{status:"success",data:{title:h}}}finally{await closeAsync(s)}}async function getGitBlobChatMessages(e){var{"id-type":t,ids:a}=e;let r=e["working-directory"]||!1;if(r="true"===r.toLowerCase(),"chat"!==t)return{status:"failed",data:"Currently, only chat ids are supported",code:400};let s=[];try{a.split(",").forEach(e=>{if(isNaN(e))throw new Error(e+" is not a number");s.push(parseInt(e))})}catch(e){return{status:"failed",data:e.message,code:400}}let i=connect(getDBPath());try{var n,o=await(async()=>{var t=`
            SELECT DISTINCT
                c.id,
                g.name,
                g.meta
            FROM
                chats c,
                groups g
            WHERE
                c.group_id=g.id AND
                c.id IN (${s.join(",")})
        `;try{var e=await allAsync(i,t);let r={};return e.forEach(e=>{var{id:e,meta:t,name:a}=e;r[e]=JSON.parse(t),r[e].fullName=a}),r}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}})(),l=await(async()=>{var t=`
            SELECT
                chat_id,
                m.id,
                m.type,
                m.parent_id,
                message content,
                c.meta,
                m.updated_at updated_at
            FROM
                chats c,
                messages m
            WHERE
                c.deleted = 0 AND
                m.deleted = 0 AND
                c.id=chat_id AND
                c.id IN (${s.join(",")}) AND
                m.type = 'git-blob'
        `;try{var e=await allAsync(i,t);let o={};return e.forEach(e=>{var{id:e,type:t,parent_id:a,chat_id:r,content:s,meta:i,updated_at:n}=e;o[r]={id:e,type:t,chat_id:r,parent_id:a,content:s,meta:JSON.parse(i),updated_at:n}}),o}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}})(),c={};for(n in l){var d=l[n];if(!d)return{status:"failed",data:"No Git blob message associated with chat ID: "+n};var u,m=o[n];if(!m)return{status:"failed",data:"No repository associated with chat ID: "+n};r&&(u=path.join(m.path,d.meta.path),fs.existsSync(u)?d.content=fs.readFileSync(u,"utf8"):d.content="<Not Found in Working Directory>"),c[n]={repo:m,message:d}}return{status:"success",data:{chat2Result:c}}}finally{await closeAsync(i)}}async function getTinyOverviewChatPurpose(e){e=e.ids;let r=[];try{e.split(",").forEach(e=>{if(isNaN(e))throw new Error(e+" is not a number");r.push(parseInt(e))})}catch(e){return{status:"failed",data:e.message,code:400}}let s=connect(getDBPath());try{var t,a=await(async()=>{var t=`
            SELECT DISTINCT
                c.id,
                g.name,
                g.meta
            FROM
                chats c,
                groups g
            WHERE
                c.group_id=g.id AND
                c.id IN (${r.join(",")})
        `;try{var e=await allAsync(s,t);let r={};return e.forEach(e=>{var{id:e,meta:t,name:a}=e;r[e]=JSON.parse(t),r[e].fullName=a}),r}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}})(),i=((new Date).getTime(),await(async()=>{var a=`
            WITH tiny_overview_messages AS (
                SELECT
                    id,
                    type,
                    chat_id,
                    message AS content,
                    meta
                FROM
                    messages 
                WHERE
                    type='tiny-overview::file-content::default' AND
                    chat_id IN (${r.join(",")})
            )
            SELECT
                c.id chat_id,
                c.uuid chat_uuid,
                c.name chat_name,
                c.type chat_type,
                c.meta chat_meta,
                m.content message_content,
                m.meta message_meta
            FROM
                chats c
                LEFT JOIN tiny_overview_messages m ON c.id=chat_id
            WHERE
                c.id IN (${r.join(",")})
        `;try{var e=await allAsync(s,a);let t={};return e.forEach(e=>{e.chat_meta&&(e.chat_meta=JSON.parse(e.chat_meta)),e.message_meta&&(e.message_meta=JSON.parse(e.message_meta)),t[e.chat_id]=e}),t}catch(e){throw console.error(`Failed to execute ${a}:
`+e.message),new Error("Server side error")}})()),n={};for(t in i){var o=i[t];if(!o)return{status:"failed",data:`The provided id ${t} is not a valid chat id`};var l,c,d=a[t];if(!d)return{status:"failed",data:"No repository associated with chat ID: "+t};o.keywords=null,o.message_content&&(c=(l=o.message_content.split("\n")).findIndex(e=>e.startsWith("## Keywords")),o.keywords=l[c+1]?.split(", "),delete o.message_content),o.purpose=o.message_meta?.extracted_metadata?.purpose||null,delete o.message_meta,n[t]={overview:o,repo:d}}return{status:"success",data:{chat2Result:n}}}catch(e){return{status:"failed",data:e.message}}finally{await closeAsync(s)}}async function getChatAnalysisMessages(e){let{"id-type":t,ids:a,type:r}=e;if("chat"!==t)return{status:"failed",data:"Currently, only chat ids are supported",code:400};if("tiny"!==r&&"short"!==r&&"long"!==r)return{status:"failed",data:`Invalid type ${r}. Expected tiny, short or long.`,code:400};let s=[];try{a.split(",").forEach(e=>{if(isNaN(e))throw new Error(e+" is not a number");s.push(parseInt(e))})}catch(e){return{status:"failed",data:e.message,code:400}}let i=connect(getDBPath());try{var n,o=await(async()=>{var t=`
            SELECT DISTINCT
                c.id,
                g.name,
                g.meta
            FROM
                chats c,
                groups g
            WHERE
                c.group_id=g.id AND
                c.id IN (${s.join(",")})
        `;try{var e=await allAsync(i,t);let r={};return e.forEach(e=>{var{id:e,meta:t,name:a}=e;r[e]=JSON.parse(t),r[e].fullName=a}),r}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}})(),l=await(async()=>{var t=`
            SELECT
                m.id,
                m.type,
                m.parent_id,
                chat_id,
                message content,
                c.meta,
                m.updated_at
            FROM
                chats c,
                messages m
            WHERE
                c.id=chat_id AND
                c.id IN (${s.join(",")}) AND
                m.type = '${r}-overview'
        `;try{var e=await allAsync(i,t);let o={};return e.forEach(e=>{var{id:e,type:t,parent_id:a,chat_id:r,content:s,meta:i,updated_at:n}=e;o[r]={id:e,type:t,parent_id:a,chat_id:r,content:s,meta:JSON.parse(i),updated_at:n}}),o}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}})(),c={};for(n in l){var d=l[n];if(!d)return{status:"failed",data:"No Git blob message associated with chat ID: "+n};var u=o[n];if(!u)return{status:"failed",data:"No repository associated with chat ID: "+n};c[n]={message:d,repo:u}}return{status:"success",data:{chat2Result:c}}}finally{await closeAsync(i)}}async function getChatTemplateMessages(e){var t,a,e=e.type;return e?(a=(t=e.startsWith("<GSC_HOME>/"))?e.replace("<GSC_HOME>",""+GSC_HOME):path.join(__dirname,"components","chat-builder","messages"),{status:"success",data:{messages:_getChatTemplateMessages(a,t?null:path.normalize(e))}}):{status:"failed",data:"No type specified",code:400}}async function getAnalyzeChatMenuOptions(e){try{return{status:"success",data:await buildAnalyzeMenuOptions(ANALYZE_BASE_PATH)}}catch(e){return{status:"failed",data:e}}}async function getAnalyzers(e){e=e["include-description"];try{return{status:"success",data:await AnalyzerUtils.getAnalyzers(ANALYZE_BASE_PATH,{includeDescription:e})}}catch(e){return{status:"failed",data:e}}}async function getAnalyzerSchema(e){e=e["analyzer-id"];try{return{status:"success",data:await AnalyzerUtils.getAnalyzerSchema(ANALYZE_BASE_PATH,e)}}catch(e){return{status:"failed",data:e}}}function getOptions(){try{let r=readOptionsFile();if(!r)return{status:"failed",message:"No config file found"};r.prompts&&(r.prompts=r.prompts.filter(e=>null==e.show||e.show));let s={};return r.providers&&r.providers.forEach(e=>s[e.name.toLowerCase()]=e.apiKeyName),r.models&&r.models.forEach((e,t)=>{var{name:e,providers:a}=e;e.match(/^---/)||(e=a[0].name,a=s[e.toLowerCase()],r.models[t].hasApiKey=!!process.env[a])}),{status:"success",data:r}}catch(e){return console.error(e),{status:"failed",message:"Server side error"}}}async function deleteAnalyzer(e){e=e["analyzer-id"];try{return await AnalyzerUtils.deleteAnalyzer(ANALYZE_BASE_PATH,e),{status:"success"}}catch(e){return{status:"failed",data:e}}}async function deleteChat(r){var r=r.uuid,s=connect(getDBPath());try{var i=await(async(e,t)=>{var a=`
            SELECT
                id,
                name,
                protected,
                group_id,
                type
            FROM
                chats
            WHERE
                uuid = ?
        `;try{return(await allAsync(e,a,[t]))[0]}catch(e){throw console.error(`Failed to execute ${a}:
`+e.message),new Error("Server side error")}})(s,r);if(!i)return{status:"failed",data:`No chat with the uuid ${r} found`};var{id:n,protected:e}=i;if(e)return{status:"failed",data:"Protected chat. Remove protection and try again."};var o=`
            WITH RECURSIVE descendants(id, parent_id) AS (
                -- Base case: the selected node
                SELECT
                    id,
                    parent_id
                FROM
                    chats
                WHERE
                    id = ?

                UNION ALL

                -- Recursive case: all descendants
                SELECT
                    c.id,
                    c.parent_id
                FROM
                    chats c
                JOIN descendants d ON c.parent_id = d.id
            )
            SELECT
                id
            FROM
                descendants
        `;let t=null;try{var l=await allAsync(s,o,[n]);t=l.map(e=>e.id)}catch(e){throw new Error(`Failed to get all descendant chat ids or ${n}:
${o}
`+e)}var c=[`
            UPDATE
                chats
            SET
                deleted = 1,
                updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now')
            WHERE
                id IN <ids>
        `,`
            UPDATE
                messages
            SET
                deleted = 1,
                updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now')
            WHERE
                chat_id IN <ids>
        `];let a=null;try{for(let e=0;e<c.length;e++){a=c[e].replace(/<ids>/,"("+t.join(",")+")");var d=await runAsync(s,a);if(0===e&&!d?.changes)return{status:"failed",data:"No matching chat. Make sure the chat UUID is correct."}}}catch(e){throw new Error(`Failed to delete chat with uuid ${r}:
${a}
`+e)}if("git-repo"===i.type||"git-repo-owner"===i.type){let t=[];if("git-repo"===i.type)t.push(i.group_id);else if("git-repo-owner"===i.type){var u=`
                SELECT 
                    id 
                FROM 
                    groups 
                WHERE 
                    type='git-repo' AND
                    name LIKE '${i.name}/%'`;try{(await allAsync(s,u)).forEach(e=>t.push(e.id))}catch(e){throw new Error(`Failed to group ids:
${u}
`+e)}}var m=`DELETE FROM groups WHERE id IN (${t.join(",")})`;try{await runAsync(s,m)}catch(e){throw new Error(`Failed to delete chat group ${i.group_id}:
${m}
`+e)}}return{status:"success"}}finally{await closeAsync(s)}}async function deleteChatMessage(t){var{id:t,"includes-children":e}=t,a=connect(getDBPath());try{var r=await getMessage(a,t),s=!(!r?.meta?.description||!r?.meta.extracted_metadata),i=s?await(async(e,t)=>{var a=`
            SELECT
                meta
            FROM
                chats
            WHERE
                id=?
        `;try{var r=await allAsync(e,a,[t]);if(!r||!r.length)return null;var s=r[0].meta;if(s)return JSON.parse(s)}catch(e){throw console.error(`Failed to execute ${a}:
`+e.message),new Error("Server side error")}return null})(a,r.chat_id):{},n=r.parent_id,o=`
            UPDATE
                messages
            SET
                deleted = 1,
                updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now')
            WHERE
                id = ?
        `;try{if(!(await runAsync(a,o,[t])).changes)return{status:"failed",data:"No matching message. Make sure the id and original message is correct."};console.log("Deleted chat message with id "+t)}catch(e){throw new Error(`Failed to delete chat with id ${t}:
${o}
`+e)}var l=`
            UPDATE
                messages
            SET
                deleted = 1
            WHERE
                parent_id = ?
        `,c=e&&"true"===e?l:`
            UPDATE
                messages
            SET
                parent_id = ${n}
            WHERE
                parent_id = ?
        `;try{await runAsync(a,c,[t])}catch(e){throw new Error(`Failed to update chats with parent id ${n}:
${l}
`+e)}return s&&i?.tokens?.analysis?.[r.type]&&(delete i.tokens?.analysis[r.type],await runAsync(a,"UPDATE chats SET meta=? WHERE id=?",[JSON.stringify(i),r.chat_id])),{status:"success"}}catch(e){return console.error(e),{status:"failed",error:"Server side error"}}finally{await closeAsync(a)}}async function newChat(e){let{type:a=DEFAULT_CHAT_TYPE,model:o,temperature:l,analysis:r={},name:s,"parent-id":c,"group-id":d,"group-name":u,"group-type":m,"system-message-name":h,"system-message":g,"user-message":p,"assistant-message":y,"prompt-type":f=DEFAULT_PROMPT_TYPE,"forked-from-message-id":E,"real-model":w,messages:_=[]}=e;var T=connect(getDBPath());try{var A,S=crypto.randomUUID(),v=s||(a===DEFAULT_CHAT_TYPE?"chat":a)+"-"+S.split("-")[0],N=m||DEFAULT_GROUP_TYPE,I=u||S,k=DEFAULT_CHAT_OWNER;let e=null;e=d||(e=I!==S&&(A=await(async(e,t,a)=>{var r=`
            SELECT
                id,
                name
            FROM
                groups
            WHERE
                ${null!=t?"id = ?":"name = ?"}
        `,t=[null!=t?t:a];try{var s=await allAsync(e,r,t);return s.length?s[0]:null}catch(e){throw console.error(`Failed to execute ${r}:
`+e.message),new Error("Server side error")}})(T,null,I))?A.id:e)||await insertGroup(T,N,I);var P=c||0;let t=null;if(g)if(h){var R=new Prompts,D=R.computeHash(f,h,g);if(!(t=await getPrompt(T,null,D))||!t.id){var C=await R.insert(T,null,f,D,h,g);if(!C)throw new Error("No prompt created");t={id:C.id,content:C.prompt}}}else g={id:0,content:g};else t=await getPrompt(T,null,null,f,h);if(!t||void 0===t.id)throw new Error("No system prompt id defined");var O,M=await insertChat(T,a,DEFAULT_CHAT_VISIBILITY,S,k,v,0,P,e,t.id,o,s?0:1,E);_.length?(O=_[0]).role===SYSTEM_ROLE&&("<replace with system message>"===O.message||g&&h)&&(O.message=t.content):(_.push({role:SYSTEM_ROLE,message:t.content}),o.match(/Notes/)?_.push({role:ASSISTANT_ROLE,message:p}):(_.push({role:USER_ROLE,message:p}),_.push({role:ASSISTANT_ROLE,message:y})));let i=0,n=null;for(let s=0;s<_.length;s++){let{role:e,message:t,type:a,visibility:r}=_[s];if(e===SYSTEM_ROLE){var B=(await insertMessage(T,a||DEFAULT_MSG_TYPE,r||DEFAULT_MSG_VISIBILITY,M,i,null,null,null,null,e,t)).id;i=B}else if(e===USER_ROLE){var Y=(await insertMessage(T,a||DEFAULT_MSG_TYPE,DEFAULT_MSG_VISIBILITY,M,i,null,null,null,null,e,t)).id;i=Y}else{if(e!==ASSISTANT_ROLE)return{status:"failed",code:400,data:"Invalid message role "+e};var W=(await insertMessage(T,a||DEFAULT_MSG_TYPE,DEFAULT_MSG_VISIBILITY,M,i,1,o,w,l,e,t)).id;n=i=W}}var L,z,b,U,q,F,$,{type:x="",options:H={}}=r||{},G=(x.match(/no error analysis/i),x.match(/validate/i)),J=x.match(/compare/i);return x.match(/samples/i)?({samples:L,summarize:z,summarizer:b}=H,await newCompareSamplesAnalysis(T,n,L,b)):J?({models:U,summarize:q,summarizer:F}=H,await newCompareModelsAnalysis(T,n,U,F)):G&&($=H.models,await newValidateAnalysis(T,n,$)),await getChat({id:M})}finally{await closeAsync(T)}}async function getChatDescendants(e,t,a=1e4){var r=`
        WITH RECURSIVE matches AS (
            SELECT
                id,
                type,
                uuid,
                name,
                main_model,
                parent_id,
                group_id,
                order_weight,
                meta,
                created_at,
                updated_at,
                1 AS depth -- Start at depth 1 for direct children
            FROM
                chats
            WHERE
                deleted = 0 AND
                parent_id = ?

            UNION ALL -- Use UNION ALL for performance unless duplicate rows need removal

            SELECT
                c.id,
                c.type,
                c.uuid,
                c.name,
                c.main_model,
                c.parent_id,
                c.group_id,
                c.order_weight,
                c.meta,
                c.created_at,
                c.updated_at,
                m.depth + 1 AS depth -- Increment depth for recursive steps
            FROM
                chats c
            INNER JOIN matches m ON m.id = c.parent_id
            WHERE
                c.deleted = 0 AND
                m.depth < ? -- Stop recursion when depth exceeds maxDepth
        )
        SELECT
            id,
            type,
            uuid,
            name,
            main_model,
            parent_id,
            group_id,
            order_weight,
            meta,
            created_at,
            updated_at
        FROM matches
        WHERE id != ? -- Exclude the starting chat itself
        ORDER BY parent_id
    `;try{var s=[t,a,t],i=await allAsync(e,r,s);return i.forEach(e=>{e.meta&&(e.meta=JSON.parse(e.meta))}),i}catch(e){throw console.error(`Failed to execute ${r}:
`+e.message),new Error("Server side error")}}async function getGitRefChat(e,t){e=await getChatLineage(e,t,!1);return e&&e.length?e.find(e=>"git-ref"===e.type):null}async function insertGroup(e,t,a){var r=`
        INSERT INTO groups(
            type,
            name,
            created_at,
            updated_at
        ) VALUES (
            ?,
            ${null==a?"":"?,"}
            strftime('%Y-%m-%d %H:%M:%f', 'now'),
            strftime('%Y-%m-%d %H:%M:%f', 'now')
        )
    `;try{return(await runAsync(e,r,[t,a])).lastID}catch(e){throw new Error(`Failed to insert chat:
${r}
`+e)}}async function insertChat(e,t,a,r,s,i,n,o,l,c,d,u=0,m){var h=`
        INSERT INTO chats(
            type,
            deleted,
            visibility,
            uuid,
            owner,
            name,
            order_weight,
            parent_id,
            group_id,
            prompt_id,
            main_model,
            is_default_name,
            forked_from_msg_id,
            created_at,
            updated_at
        ) VALUES (
            ?, -- type
            0, -- deleted
            ?, -- visibility
            ?, -- uuid
            ?, -- owner
            ?, -- name
            ?, -- order_weight
            ?, -- parent_id
            ?, -- group_id
            ?, -- prompt_id
            ?, -- main_model
            ?, -- is_dfdault_name
            ?, -- forked_from_msg_id
            strftime('%Y-%m-%d %H:%M:%f', 'now'),
            strftime('%Y-%m-%d %H:%M:%f', 'now')
        )
    `;try{var g=[t,a,r,s,i,n,o,l,c,d,u,m];return(await runAsync(e,h,g)).lastID}catch(e){throw new Error(`Failed to insert chat:
${h}
`+e)}}async function newChatMessage(a){var r,{"chat-id":a,"parent-id":s,model:i,temperature:n,role:o,message:l,"real-model":c,"reference-message-id":d,insert:u,meta:m,type:h,visibility:g}=a,p=connect(getDBPath());try{if(o===SYSTEM_ROLE)return{status:"failed",code:400,data:"New system message not supported.  Create a new chat instead."};let e=null;if(d){if(o!==ASSISTANT_ROLE)return{status:"failed",code:400,data:"Only assistant messages can be inserted above or below an existing message."};if("before"!==u&&"after"!==u)return{status:"failed",code:400,data:"Only assistant messages can be inserted above or below an existing message."};if(!(e=await getMessage(p,d)))return{status:"failed",code:400,data:`No reference message with the id ${d} found.`};if(e.chat_id!==parseInt(a))return{status:"failed",code:400,data:"Reference message does not belong to chat #"+a}}let t=null;if(o===USER_ROLE){if(null==l)return{code:400,status:"failed",data:{message:"No message defined. User message cannot be empty"}};var y=await insertMessage(p,h||DEFAULT_MSG_TYPE,g||DEFAULT_MSG_VISIBILITY,a,s,null,null,null,null,USER_ROLE,l);t=y.id}else o===ASSISTANT_ROLE&&(r=await insertMessage(p,h||DEFAULT_MSG_TYPE,g||DEFAULT_MSG_VISIBILITY,a,s,1,i,c,n,ASSISTANT_ROLE,l,m),t=r.id);if(e){var f=[];"before"===u?(f.push(`
                UPDATE
                    messages
                SET
                    parent_id = ${e.parent_id}  -- point to the reference message parent
                WHERE
                    id = ${t}
            `),f.push(`
                UPDATE
                    messages
                SET
                    parent_id = ${t}
                WHERE
                    id = ${e.id}
            `)):(f.push(`
                UPDATE
                    messages
                SET
                    parent_id = ${e.id}
                WHERE
                    id = ${t}
            `),f.push(`
                UPDATE
                    messages
                SET
                    parent_id = ${t}
                WHERE
                    id != ${t} AND
                    parent_id = ${e.id};
            `));for(let e=0;e<f.length;e++){var E=f[e];try{var{}=await runAsync(p,E)}catch(e){throw new Error(`Failed to update messages:
${E}
`+e)}}}return{status:"success",data:{id:t}}}finally{await closeAsync(p)}}async function newChatTree(e){let{tree:t,name:a,"parent-id":r=0,"system-message-name":s,model:i="GitSense Notes"}=e;if(!(e=trees.find(e=>e.name===t)))return{status:"failed",code:400,data:`No tree with the name "${t}" found`};var n=widget.staticURL.split("/"),n=(n.pop(),n.join("/")),e=prepareIsolatedTree(e,n);let T=/\{\{short-id(?:-(\d+))?\}\}/g,A=new Map,S=connect(getDBPath());try{var o=await getPrompt(S,null,null,DEFAULT_PROMPT_TYPE,s),l=await insertGroup(S,DEFAULT_GROUP_TYPE,crypto.randomUUID());try{var c=e.config.type||(t.match(/workspace/)?"workspace":t.match(/project/)?"project":"help"===t?"help":DEFAULT_CHAT_TYPE),d="help"===t||"demos"===t?t:DEFAULT_MSG_TYPE;return getChat({id:await async function a(e,r,t,s,i,n,o,l){let{config:c,kids:d,messages:u,uuid:m}=e;if(!c)throw new Error(`No config associated with the tree "${e.name}"`);let{name:h,order:g=0}=c;let p=m||crypto.randomUUID();let y=1;let f=0;let E=await insertChat(S,r,DEFAULT_CHAT_VISIBILITY,p,DEFAULT_CHAT_OWNER,t||h,g,i,s,n.id,o);let w=[{role:SYSTEM_ROLE,message:n.content},{role:USER_ROLE,message:""}];u.forEach(e=>{"help"!==r&&"demos"!==r||(e=e.replace(T,(e,t)=>{let a=t||"_default";return A.has(a)||A.set(a,v()),A.get(a)})),w.push({role:ASSISTANT_ROLE,message:e,model:o,temperature:f,type:l})});let _=0;for(let n=0;n<w.length;n++){let{role:e,type:t,message:a,model:r,temperature:s}=w[n],i=(await insertMessage(S,l,DEFAULT_MSG_VISIBILITY,E,_,1,r,null,s,e,a)).id;_=i}for(let t=0;t<d.length;t++){let e=d[t];await a(e,e.config.type||r,null,s,E,n,o,l)}return E}(e,c,a,l,r,o,i,d)})}catch(e){return console.error("Failed to create tree: ",e),{status:"failed",data:"Server side error"}}}finally{await closeAsync(S)}function v(){return""+Math.random().toString(36).substring(2,8)}}async function newCompareSamplesAnalysis(a,e,s,r){var i=await getMessage(a,e);if(!i)throw new Error(`No message with the id ${e} found`);let{id:n,chat_id:o,parent_id:l,model:c,temperature:d,role:u}=i;e=await getMessageSiblings(a,i);let m=1,h=[];e.forEach(e=>{var{id:e,model:a,sample:r}=e;s<r||c!==a||d!==t||(r>m&&(m=r),h.push(e))});for(let e=m+1;e<=s;e++){var g=await insertMessage(a,DEFAULT_MSG_TYPE,DEFAULT_MSG_VISIBILTY,o,l,e,c,null,d,u);h.push(g.id)}h.push(n),h.sort((e,t)=>e-t);var i="samples-summary",e=JSON.stringify(h),p=await getAnalysis(a,null,o,i,e,"",r,1);return p||insertAnalysis(a,o,i,e,"",r)}async function newCompareModelsAnalysis(a,e,r,t){let s=await getMessage(a,e);if(!s)throw new Error(`No message with the id ${e} found`);e=await getMessageSiblings(a,s);let i={};e.forEach(e=>{var{model:t,sample:a}=e;1===a&&(i[t]=e)});var{id:e,chat_id:n,parent_id:o,temperature:l,role:c}=s,d=[e];for(let t=0;t<r.length;t++){var u=r[t];let e=i[u];e||(u=await insertMessage(a,DEFAULT_MSG_TYPE,DEFAULT_MSG_VISIBILTY,n,o,1,u,null,l,c),d.push(u.id))}d.sort((e,t)=>e-t);var e="models-summary",m=JSON.stringify(d),h=await getAnalysis(a,null,n,e,m,"",t,1);return h||insertAnalysis(a,n,e,m,"",t)}async function newValidateAnalysis(t,e,a){var r=await getMessage(t,e);if(!r)throw new Error(`No message with the id ${e} found`);e=await(async(e,t,a)=>{var{chat_id:t,id:r}=t,s=`
            SELECT
                id,
                model
            FROM
                analysis
            WHERE
                chat_id = ? AND
                type = 'validate' AND
                message_ids = ? AND
                model IN (?)
        `,t=[t,`[${r}]`,a.map(e=>`'${e}'`).join(",")];try{return await allAsync(e,s,t)}catch(e){throw console.error(`Failed to execute ${s}:
`+e.message),new Error("Server side error")}})(t,r,a);let s={};e.forEach(e=>s[e.model]=e);var{id:e,chat_id:i}=r,n=`[${e}]`,o=[];for(let e=0;e<a.length;e++){var l=a[e],c=s[l];c?o.push(c.id):(c=await insertAnalysis(t,i,"validate",n,"",l),console.log("Inserted new validate analysis "+c.id),o.push(c.id))}o.sort((e,t)=>e-t);var r=JSON.stringify(o),e="validate-summary",d=await getAnalysis(t,null,i,e,"",r);return d||insertAnalysis(t,i,e,"",r)}async function getPrompt(e,t,a,r,s){var i={id:0,content:""};if(null==t&&null==a&&null==s)return i;var n=[];let o=null;null!=t?(o="id = ?",n.push(t)):a?(o="hash = ?",n.push(a)):(o="type = ? AND name = ?",n.push(r),n.push(s));t=`
        SELECT
            id,
            prompt
        FROM
            prompts
        WHERE
            ${o}
        ORDER BY id DESC LIMIT 1
    `;try{var l=await allAsync(e,t,n);if(l&&l.length){let{id:e,name:t,prompt:a}=l[0];return{id:e,name:t,content:a}}return i}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}}async function getMessage(e,t){e=await getMessages(e,[t]);return e?e[0]:null}async function getMessages(e,t){t=`
        SELECT
            id,
            type,
            chat_id,
            parent_id,
            sample,
            model,
            real_model,
            temperature,
            role,
            message,
            meta
        FROM
            messages
        WHERE
            id IN (${t.join(",")})
    `;try{let a=await allAsync(e,t);return a?(a.forEach((e,t)=>{e=e.meta;e&&(a[t].meta=JSON.parse(e))}),a):null}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}return null}async function getMessagesByChatIdAndType(e,t,r){if(t.find(e=>"number"!=typeof e))throw new Error("Found a non number Chat ID");t=`
        SELECT
            id,
            chat_id,
            parent_id,
            sample,
            model,
            real_model,
            temperature,
            role,
            message,
            meta
        FROM
            messages
        WHERE
            chat_id IN (${t.join(",")}) AND
            type = ?
    `;try{let a=await allAsync(e,t,[r]);return a?(a.forEach((e,t)=>{e=e.meta;e&&(a[t].meta=JSON.parse(e))}),a):null}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}return null}async function getChatMessages(e,t,o,a=1e4){var r=`
        WITH RECURSIVE matched_messages AS (
            SELECT
                0 AS position,
                id,
                type,
                visibility,
                chat_id,
                parent_id,
                level,
                sample,
                model,
                real_model,
                temperature,
                role,
                message,
                meta,
                created_at,
                updated_at,
                modified_at
            FROM
                messages
            WHERE
                deleted = 0 AND
                chat_id = ? AND
                parent_id = 0 AND
                level <= ?

            UNION

            SELECT
                position + 1 AS position,
                m.id,
                m.type,
                m.visibility,
                m.chat_id,
                m.parent_id,
                m.level,
                m.sample,
                m.model,
                m.real_model,
                m.temperature,
                m.role,
                CASE
                    WHEN m.chat_id = ${t} THEN m.message
                    ELSE null
                END message,
                m.meta,
                m.created_at,
                m.updated_at,
                m.modified_at
            FROM
                messages m
            INNER JOIN matched_messages mm ON m.parent_id = mm.id
            WHERE
                m.chat_id = ? AND
                deleted = 0
        )
        SELECT * FROM matched_messages ORDER BY position, sample DESC, model
    `;try{let i={},n=[];var s=[t,a,t];return(await allAsync(e,r,s)).forEach(e=>{var{id:t,parent_id:a,model:r,meta:s}=e,s=(e.meta=s?JSON.parse(s):{},i[t]),t=(s||(s=[],i[t]=s,e.kids=s),i[a]);t&&(r&&r===o?(e.main=!0,t.unshift(e)):(e.main=!1,t.push(e))),0===a&&n.push(e)}),n}catch(e){throw console.error(`Failed to execute ${r}:
`+e.message),new Error("Server side error")}}async function getMessageLineage(e,t,a=0){var r=`
        WITH RECURSIVE matched_messages AS (
            SELECT
                id,
                type,
                visibility,
                chat_id,
                parent_id,
                level,
                sample,
                model,
                real_model,
                temperature,
                role,
                message,
                created_at,
                updated_at,
                modified_at
            FROM
                messages
            WHERE
                deleted = 0 AND
                id = ?

            UNION

            SELECT
                m.id,
                m.type,
                m.visibility,
                m.chat_id,
                m.parent_id,
                m.level,
                m.sample,
                m.model,
                m.real_model,
                m.temperature,
                m.role,
                m.message,
                m.created_at,
                m.updated_at,
                m.modified_at
            FROM
                messages m
            INNER JOIN matched_messages mm  ON m.id = mm.parent_id
        )
        SELECT * FROM matched_messages ORDER BY parent_id, sample DESC, model
    `;try{return await allAsync(e,r,[t])}catch(e){throw console.error(`Failed to execute ${r}:
`+e.message),new Error("Server side error")}}async function getMessageSiblings(e,t){var{id:t,parent_id:a,role:r}=t,s=`
        SELECT
            id,
            type,
            visibility,
            chat_id,
            parent_id,
            sample,
            model,
            real_model,
            temperature
        FROM
            messages
        WHERE
            id != ? AND
            parent_id = ? AND
            role = ?
        ORDER BY sample
    `;let i=null;try{i=await allAsync(e,s,[t,a,r])}catch(e){throw console.error(`Failed to execute ${s}:
`+e.message),new Error("Server side error")}return i||[]}async function insertMessage(e,t,a,r,s,i,n,o=null,l,c,d=null,u=null){var m=`
        INSERT INTO messages(
            type,
            deleted,
            visibility,
            chat_id,
            parent_id,
            level,
            sample,
            model,
            real_model,
            temperature,
            role,
            message,
            meta,
            created_at,
            updated_at
        ) VALUES (
            ?, -- type
            0, -- deleted
            ?, -- visibility,
            ?, -- chat_id
            ?, -- parent_id
            (SELECT IFNULL((SELECT level FROM messages WHERE id = ?), -1) + 1), -- level
            ?, -- sample
            ?, -- model
            ?, -- real_model
            ?, -- temperature
            ?, -- role
            ?, -- message
            ?, -- meta
            strftime('%Y-%m-%d %H:%M:%f', 'now'),
            strftime('%Y-%m-%d %H:%M:%f', 'now')
        )
    `,h=!d||isSearchableMessage(d),h=(u&&!h?u.searchable=!1:h||(u={searchable:!1}),[t,a,r,s,s,i,n,o,l,c,d,u?JSON.stringify(u):null]);let g=null;try{if(!(g=await runAsync(e,m,h)).changes)throw new Error("No changes after insert message")}catch(e){throw console.log("Failed to insert the following message:"),console.log(JSON.stringify({params:h},null,2)),new Error(`Failed to insert message:
${m}
${JSON.stringify(h)}
`+e)}return getMessage(e,g.lastID)}async function getAnalysis(e,t,a,r,s,i,n,o=0,l=1){let c=`
        SELECT
            id,
            message_ids,
            analysis_ids,
            message,
            response
        FROM
            analysis
        WHERE
    `,d=null,u=(d=t?(c+=`
            id = ?
        `,[t]):(c+=`
            chat_id = ? AND
            type = ? AND
            message_ids = ? AND
            analysis_ids = ? AND
            model = ? AND
            temperature = ? AND
            sample = ?
        `,[a,r,s,i,n,o,l]),null);try{u=await allAsync(e,c,d)}catch(e){throw console.error(`Failed to execute ${c}:
`+e.message),new Error("Server side error")}return u?u[0]:null}async function insertAnalysis(e,t,a,r,s,i="",n=1,o=0){var l=`
        INSERT INTO analysis (
            chat_id,
            type,
            message_ids,
            analysis_ids,
            sample,
            model,
            temperature,
            created_at,
            updated_at
        ) VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            strftime('%Y-%m-%d %H:%M:%f', 'now'),
            strftime('%Y-%m-%d %H:%M:%f', 'now')
        )
    `,t=[t,a,r,s,n,i,o];try{return await getAnalysis(e,(await runAsync(e,l,t)).lastID)}catch(e){throw new Error(`Failed to insert chat:
${l}
`+e)}}async function resetChatMessage(e){var e=e.id,t=`
        UPDATE
            messages
        SET
            message = NULL,
            meta=null,
            modified_at = strftime('%Y-%m-%d %H:%M:%f', 'now')
        WHERE
            id = ?
    `,a=`
        UPDATE
            messages
        SET
            deleted = 1
        WHERE
            parent_id = ?
    `,r=connect(getDBPath());try{try{if(!(await runAsync(r,t,[e])).changes)return{status:"failed",data:"No matching message. Make sure the id and original message is correct."}}catch(e){throw new Error(`Failed to update chat message:
${t}
`+e)}try{await runAsync(r,a,[e])}catch(e){throw new Error(`Failed to detach chat message:
${a}
`+e)}return{status:"success"}}finally{await closeAsync(r)}}async function updateChatAnalyzer(e){var{analyzerId:e,instructionsContent:t}=e;try{return await AnalyzerUtils.saveConfiguration(ANALYZE_BASE_PATH,e,t),{status:"success"}}catch(e){return console.log(e),{status:"failed",data:e}}}async function updateChats(e){var t=e.chats,e=connect(getDBPath()),a=`
        UPDATE
            chats
        SET
            parent_id = ?,
            name = ?,
            order_weight = ?
        WHERE
            id = ?
    `;let r=null;try{r=await prepareAsync(e,a);for(let e=0;e<t.length;e++){var{id:s,parent_id:i,name:n,order_weight:o=0}=t[e];await stmtRunAsync(r,[i,n,o,s])}}catch(e){throw new Error(`Failed to update chat:
${a}
`+e)}finally{if(r)try{await stmtFinalizeAsync(r)}catch(e){console.error("Failed to finalize statement:",e)}await closeAsync(e)}return{status:"success"}}async function updateChatMessage(e){var{id:t,"old-message":a,"new-message":r,"new-type":s,"new-visibility":i,"new-meta":n}=e,o=r?r.match(/ {{GS-UUID}}/)?replaceGSUUIDs(r):r:null,l=connect(getDBPath());try{var c=await getMessage(l,t);if(!c)return{status:"failed",data:"Invalid message id "+t};var d=`
            INSERT INTO message_history
                SELECT
                    id,
                    type,
                    deleted,
                    visibility,
                    chat_id,
                    parent_id,
                    level,
                    message,
                    chat_completion_stats,
                    meta,
                    created_at,
                    updated_at,
                    modified_at
                FROM
                    messages
                WHERE
                    id = ?
        `;try{let e=[t];if(!(await runAsync(l,d,e)).changes)return{status:"failed",data:"No matching message. Make sure the id and original message is correct."}}catch(e){throw new Error(`Failed to update chat:
${d}
`+e)}var u=n||c.meta,m=(o&&!isSearchableMessage(o)?u.searchable=!1:n&&(u.searchable=c.meta?.searchable||null),`
            UPDATE
                messages
            SET
                ${r?"message=?,":""}
                ${s?"type=?,":""}
                ${i?"visibility=?,":""}
                ${n||o?"meta = ?,":""}
                updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now'),
                modified_at = strftime('%Y-%m-%d %H:%M:%f', 'now')
            WHERE
                id = ?
                ${null==a?"":"AND message = ?"}
        `);try{let e=[];r&&e.push(o),s&&e.push(s),i&&e.push(i),(n||o)&&e.push(JSON.stringify(u)),e.push(t),null!=a&&e.push(a);var h=await runAsync(l,m,e);return h.changes?{status:"success",data:h}:{status:"failed",data:"No matching message. Make sure the id and original message is correct."}}catch(e){throw new Error(`Failed to update chat:
${m}
`+e)}}finally{await closeAsync(l)}}async function upateChatAnalysisMessages(a){var r=connect(getDBPath());try{let{"analyzer-id":i,analyses:e}=a;var s=e.map(e=>e.chatId),m=await(async(e,t)=>{let a=`
            SELECT
                id,
                main_model,
                meta
            FROM
                chats
            WHERE 
                id IN (${t.join(",")})
        `,r=null,s={};try{if(!(r=await allAsync(e,a)))return null;r.forEach((e,t)=>{e.meta&&(e.meta=JSON.parse(e.meta)),s[e.id]=e})}catch(e){throw console.error(`Failed to execute ${a}:
`+e.message),new Error("Server side error")}var i,n=await(async(e,a)=>{a=`
            SELECT
                t1.id,
                t1.chat_id
            FROM
                messages t1
            JOIN (
                -- Subquery to find the ID of the leaf message with the latest created_at for each chat
                SELECT
                    m1.id, -- Select the ID of the message
                    m1.chat_id,
                    -- Rank leaf messages within each chat by created_at (latest first) and id (highest first for ties)
                    ROW_NUMBER() OVER(PARTITION BY m1.chat_id ORDER BY m1.created_at DESC, m1.id DESC) as rn
                FROM
                    messages m1
                WHERE
                    m1.chat_id IN (${a.join(",")})
                    -- Check if this message is NOT a parent to any other message in the same chat
                    AND NOT EXISTS (
                        SELECT 1
                        FROM messages m2
                        WHERE m2.parent_id = m1.id
                          AND m2.chat_id = m1.chat_id
                    )
            ) AS ranked_leaf_messages
            WHERE
                ranked_leaf_messages.rn = 1 -- Select only the top-ranked leaf message per chat
                AND t1.id = ranked_leaf_messages.id -- Join back to get full message details using the ID
                AND t1.chat_id = ranked_leaf_messages.chat_id; -- Ensure chat_id matches for the join
        `;try{var r=await allAsync(e,a);let t={};return r.forEach(e=>t[e.chat_id]=e.id),t}catch(e){throw console.error(`Failed to execute ${a}:
`+e.message),new Error("Server side error")}})(e,t);for(i in n)s[i].latestMessageId=n[i];return r})(r,s);let n={};if(m.forEach(e=>n[e.id]=e),m.length!==s.length)return{status:"failed",data:"One or more invalid chat ids"};var h=await getMessagesByChatIdAndType(r,s,i);let o={},l=(h.forEach(e=>o[e.chat_id]=e),{}),c=(e.forEach(e=>l[e.chatId]=e),[]),d=[],u=(new Date).toISOString();if(s.forEach(e=>{var t=n[e],a=o[e],r=l[e],e=n[e].meta||{},s=(e.tokens||(e.tokens={}),e.tokens.analysis||(e.tokens.analysis={}),estimateTokens(r.content));e.tokens.analysis[i]={estimate:s,estimatedAt:u},a?(a.message=r.content,a.meta=r.metadata,c.push(a)):(e=[i,"public",t.id,t.latestMessageId,,1,t.main_model,null,0,"assistant",r.content,JSON.stringify(r.metadata)],d.push(e))}),c.length){var g=`
                INSERT INTO message_history
                    SELECT
                        id,
                        type,
                        deleted,
                        visibility,
                        chat_id,
                        parent_id,
                        level,
                        message,
                        chat_completion_stats,
                        meta,
                        created_at,
                        updated_at,
                        modified_at
                    FROM
                        messages
                    WHERE
                        id IN (${c.map(e=>e.id).join(",")})
            `;try{if(!(await runAsync(r,g)).changes)return{status:"failed",data:"No matching messages. Make sure the id is correct."}}catch(e){throw new Error(`Failed to update chat:
${g}
`+e)}var p=`
                UPDATE
                    messages
                SET
                    message = ?,
                    meta = ?,
                    updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now'),
                    modified_at = strftime('%Y-%m-%d %H:%M:%f', 'now')
                WHERE
                    id = ?;
            `;let t=null;try{t=await prepareAsync(r,p);for(let e=0;e<c.length;e++){var{id:y,message:f,meta:E}=c[e];await stmtRunAsync(t,[f,JSON.stringify(E),y])}}catch(e){throw new Error(`Failed to update message:
${p}
`+e)}finally{if(t)try{await stmtFinalizeAsync(t)}catch(e){console.error("Failed to finalize statement:",e)}}}if(d.length){var w=`
                INSERT INTO messages(
                    type,
                    deleted,
                    visibility,
                    chat_id,
                    parent_id,
                    level,
                    sample,
                    model,
                    real_model,
                    temperature,
                    role,
                    message,
                    meta,
                    created_at,
                    updated_at
                ) VALUES (
                    ?, -- type
                    0, -- deleted
                    ?, -- visibility,
                    ?, -- chat_id
                    ?, -- parent_id
                    (SELECT IFNULL((SELECT level FROM messages WHERE id = ?), -1) + 1), -- level
                    ?, -- sample
                    ?, -- model
                    ?, -- real_model
                    ?, -- temperature
                    ?, -- role
                    ?, -- message
                    ?, -- meta
                    strftime('%Y-%m-%d %H:%M:%f', 'now'),
                    strftime('%Y-%m-%d %H:%M:%f', 'now')
                )
            `;let t=null;try{t=await prepareAsync(r,w);for(let e=0;e<d.length;e++)await stmtRunAsync(t,d[e])}catch(e){throw new Error(`Failed to update message:
${w}
`+e)}finally{if(t)try{await stmtFinalizeAsync(t)}catch(e){console.error("Failed to finalize statement:",e)}}}var _=`
            UPDATE
                chats
            SET
                meta = ?,
                updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now')
            WHERE
                id = ?;
        `;let t=null;try{t=await prepareAsync(r,_);for(let e=0;e<s.length;e++){var T=s[e],A=n[s[e]].meta;await stmtRunAsync(t,[JSON.stringify(A),T])}}catch(e){throw new Error(`Failed to update message:
${_}
`+e)}finally{if(t)try{await stmtFinalizeAsync(t)}catch(e){console.error("Failed to finalize statement:",e)}}return{status:"success"}}catch(e){return console.error(e),{status:"failed",data:e.message}}finally{await closeAsync(r)}}async function updateChatName(e){let{uuid:t,model:a,"old-name":r,"new-name":s,suggest:i}=e;if(a&&i){var e=await getChatTitleSuggestion({uuid:t,model:a}),{status:n,data:o}=e;if("failed"===n)return e;s=o.title}n=`
        UPDATE
            chats
        SET
            name = ?,
            is_default_name = 0
        WHERE
            uuid = ?
            ${r?"AND name = ?":""}
    `,o=connect(getDBPath());try{let e=[s,t];return r&&e.push(r),(await runAsync(o,n,e)).changes?await getChat({uuid:t}):{status:"failed",data:"No matching chat. Make sure the uuid and original name is correct."}}catch(e){throw new Error(`Failed to update chat:
${n}
`+e)}finally{await closeAsync(o)}}function populateMessages(t,e){let i=[...e],n=(new Date).toISOString(),o="and the current date and time is",l=new RegExp(o+" \\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z.");return i.forEach((a,e)=>{if(i[e].content=a.content?a.content.replace(/{{gs-chat-datetime}}/g,n).replace(/{{gs-chat-llm-model}}/g,t).replace(l,o+" "+n+"."):"","assistant"===a.role){let e=0;for(;e<=20;){e++;var r=extractCodeBlocks(a.content,{silent:!0}).blocks;let t=-1;for(let e=0;e<r.length;e++){var s=r[e];if("gs-tool"===s.type){t=e;break}}if(-1===t)break;a.content=deleteCodeBlockByIndex(a.content,t)}}}),i}function generateUUID(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}function replaceGSUUIDs(e){return e.replace(/{{GS-UUID}}/g,generateUUID)}function isSearchableMessage(e){try{var t,a,r=extractCodeBlocks(e,{silent:!0}).blocks;return r&&1!==r.length?!0:(t=r[0].content,a=parseToolBlock(t),!(isToolBlock(t)&&"search"===a.tool))}catch{return!0}}module.exports={init:init,deleteData:deleteData,getData:getData,postData:postData,putData:putData,stream:stream};
