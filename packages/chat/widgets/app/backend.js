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

let fs=require("fs"),path=require("path"),Anthropic=require("@anthropic-ai/sdk"),Groq=require("groq-sdk"),OpenAI=require("openai"),Together=require("together-ai"),crypto=require("crypto"),sleep=require("util").promisify(setTimeout),{join,dirname}=require("path"),existsSync=require("fs").existsSync,ChatManager=require("@gitsense/gscb-git-tools").ChatManager,{init:initInit,models,providers,trees,readOptionsFile}=require("./init.js"),{create,getDBPath}=require("./db.js"),{connect,closeAsync,allAsync,runAsync,prepareAsync,stmtFinalizeAsync,stmtRunAsync}=require("./sqlite.js"),Prompts=require("./prompts.js").Prompts,{extractCodeBlocks,fixTextCodeBlocks,removeCodeBlockMarkers,formatWithLineNumbers,removeLineNumbers,updateCodeBlockByIndex,deleteCodeBlockByIndex,getChatTemplateMessages:_getChatTemplateMessages,estimateTokens,isToolBlock,parseToolBlock}=require("@gitsense/gsc-utils"),{search,generateSearchSystemPrompt,getSearchUserInstruction,getSearchHelp}=require("./components/search/backend/gitsense"),buildAnalyzeMenuOptions=require("./components/chat-builder/utils/analyzeMenuBuilder").buildAnalyzeMenuOptions,saveAnalyzerConfiguration=require("./components/chat-builder/utils/analyzerSaver").saveAnalyzerConfiguration,SUGGEST_CHAT_TITLE=require("./prompt-templates.js").SUGGEST_CHAT_TITLE,analyzerUtils=require("./components/chat-builder/utils/analyzerUtils"),prepareIsolatedTree=require("./components/chat-builder/utils/treesUtils").prepareIsolatedTree,SYSTEM_ROLE="system",USER_ROLE="user",ASSISTANT_ROLE="assistant",DEFAULT_GROUP_TYPE="regular",DEFAULT_PROMPT_TYPE="system",DEFAULT_CHAT_OWNER="everyone",DEFAULT_CHAT_TYPE="regular",DEFAULT_MSG_TYPE="regular",DEFAULT_CHAT_VISIBILITY="public",DEFAULT_MSG_VISIBILITY="public",STREAM_TIMEOUT=3e4,MAX_OUTPUT_TOKENS=4e3;async function init(){await create(readOptionsFile,!0);var e=connect(getDBPath());try{await initInit(e)}finally{await closeAsync(e)}}async function deleteData(e){var t=e.query.action;return"delete-analyzer"===t?deleteAnalyzer(e.query):"delete-chat"===t?deleteChat(e.query):"delete-chat-message"===t?deleteChatMessage(e.query):{status:"failed",data:{action:"Unrecognized action "+t}}}async function getData(e){var t=e.query.action;return"get-chat"===t?getChat(e.query):"get-chat-title-suggestion"===t?getChatTitleSuggestion(e.query):"get-git-blob-chat-messages"===t?getGitBlobChatMessages(e.query):"get-chat-analysis-messages"===t?getChatAnalysisMessages(e.query):"get-tiny-overview-chat-purpose"===t?getTinyOverviewChatPurpose(e.query):"get-git-ref-chat-by-family-member"===t?getGitRefChatByFamilyMember(e.query):"get-analyze-chat-menu-options"===t?getAnalyzeChatMenuOptions(e.query):"get-analyzers"===t?getAnalyzers(e.query):"get-analyzer-schema"===t?getAnalyzerSchema(e.query):"get-chat-template-messages"===t?getChatTemplateMessages(e.query):"get-search-help"===t?getSearchHelp(e.query):"get-search-user-instructions"===t?getSearchUserInstruction(e.query):"get-options"===t?getOptions():"generate-search-system-prompt"===t?generateSearchSystemPrompt(e.query):"search"===t?search(e.query):"stream"===t?stream(e):{status:"failed",data:{action:"Unrecognized action "+t}}}async function postData(e){var t=e.body.action;return"new-chat"===t?newChat(e.body):"new-chat-message"===t?newChatMessage(e.body):"new-chat-tree"===t?newChatTree(e.body):{status:"failed",data:{action:"Unrecognized action "+t}}}async function putData(e){var t=e.body.action;return"update-chat-analyzer"===t?updateChatAnalyzer(e.body):"update-chats"===t?updateChats(e.body):"update-chat-message"===t?updateChatMessage(e.body):"update-chat-analysis-messages"===t?upateChatAnalysisMessages(e.body):"update-chat-name"===t?updateChatName(e.body):"reset-chat-message"===t?resetChatMessage(e.body):{status:"failed",data:{action:"Unrecognized action "+t}}}async function stream(l,d){let{"message-id":_,"chat-uuid":B,provider:a}=l.query,v=connect(getDBPath());try{var{message:e,model:s,real_model:i,temperature:c}=await getMessage(v,_);if(null!=e)d.status(403).send({status:"failed",data:"Chat has already completed"});else{var r=readOptionsFile();let o=i||s;var m=!!o.match(/^Fake/),u=!!o.match(/Notes/i);let e=null;if(m||u||a){var t=(e=m||u?{}:providers[a.toLowerCase()]).apiKeyName,h=t?process.env[t]:"";if(m||u||h){var g=models[o]?.providers||null;if(m||u||g){var p="number"==typeof r.maxChatCompletionSize?r.maxChatCompletionSize:-1;let t="number"==typeof r.maxOutputTokens?r.maxOutputTokens:MAX_OUTPUT_TOKENS,s=null,i=null,n=null;if(m||u)n=o;else for(let e=0;e<g.length;e++){var y=g[e];if(y.name.toLowerCase()===a.toLowerCase()){n=y.modelId,y.maxOutputTokens&&(t=y.maxOutputTokens),y.thinkingBudget&&(s=isNaN(y.thinkingBudget)?0:y.thinkingBudget),y.includeThoughts&&(i=y.includeThoughts||!1);break}}if(n){global.gschat||(global.gschat={streaming:{}});var f=B+"::"+o+"::"+c,E=global.gschat.streaming[f];if(E){var{startedAt:q,updatedAt:Y}=E,W=Date.now()-q,w=Date.now()-Y;if(w<STREAM_TIMEOUT)return void d.status(400).send({status:"failed",data:`Streaming in progresss. Started ${W}ms ago and last updated ${w}.`});console.warn(`The stream ${f} has not updated in over ${STREAM_TIMEOUT}ms`),delete global.gschat.streaming[f]}var S={startedAt:Date.now(),updatedAt:Date.now()};global.gschat.streaming[f]=S,console.log("Created streaming lock for "+f);try{var T=(await getMessageLineage(v,_)).filter(e=>"public"===e.visibility),z=T.map(e=>e.message),A=JSON.stringify(z).length;if(-1!==p&&p<A)await H(d,`Total chat completion payload message size (${A}) exceeds the maximum allowed character limit of ${p} characters.`);else{d.setHeader("Content-Type","text/event-stream"),d.setHeader("Cache-Control","no-cache"),d.setHeader("Connection","keep-alive");var G="anthropic"===a.toLowerCase();if(m){var J=o;var j=T;let a=[],e=(j.forEach((e,t)=>{t!==j.length-1&&({role:t,message:e}=e,""!==e)&&a.push({role:t,content:e})}),Date.now()),t="This is a Fake LLM response.",s={content:t,done:!1};d.write(`id: ${e}
event: message
data: ${JSON.stringify(s)}

`),d.flush?.(),s={content:"",done:!0},d.write(`id: ${e}
event: message
data: ${JSON.stringify(s)}

`),d.flush?.(),d.write(`id: ${e}
event: complete
data: {}

`),d.end(),await P(t,J);void await 0}else if(u){var V=o;var K=T;let a=[],e=(K.forEach((e,t)=>{t!==K.length-1&&({role:t,message:e}=e,""!==e)&&a.push({role:t,content:e})}),Date.now()),t="This is a GitSense Notes response.",s={content:t,done:!1};d.write(`id: ${e}
event: message
data: ${JSON.stringify(s)}

`),d.flush?.(),s={content:"",done:!0},d.write(`id: ${e}
event: message
data: ${JSON.stringify(s)}

`),d.flush?.(),d.write(`id: ${e}
event: complete
data: {}

`),d.end(),await P(t,V);void await 0}else{if(G){var X=T,N=S,I=o,Z=c,R=n,Q=t,ee=h,te=f;let a=null,s=[];X.forEach((e,t)=>{t!==X.length-1&&({role:t,message:e}=e,""!==e)&&(t===SYSTEM_ROLE?a=e:s.push({role:t,content:e}))});var D={messages:D=populateMessages(I,s),model:R,temperature:Z,max_tokens:Q,stream:!0};a&&(R=populateMessages(I,[{content:a}]),D.system=R[0].content);try{l.setTimeout(3e4);var C=Date.now();let e=!1;l.on("close",()=>{console.log("Client closed connection"),e=!0});var M,O,ae,se=new Anthropic({apiKey:ee}),L=(console.log(`Starting stream ${te}...`),{startedAt:(new Date).getTime()}),re=await se.messages.create(D);N.createdAt=Date.now(),N.payload=D;let t=!1,a="";for await(M of re){if(N.updatedAt=Date.now(),e)break;if("content_block_delta"===M.type&&(O=M.delta.text||"")&&(a+=O,ae={content:O,done:!1},d.write(`id: ${C}
event: message
data: ${JSON.stringify(ae)}

`),d.flush?.()),"message_stop"===M.type){console.log("Finished streaming "+te),d.write(`id: ${C}
event: message
data: {"done": true}

`),d.flush?.(),L.done=!0,L.stoppedAt=(new Date).getTime(),t=!0;break}}t||(L.incomplete=!0,L.stoppedAt=(new Date).getTime(),a+="\n\n---\nWarning: Incomplete response"),e||(d.write(`id: ${C}
event: complete
data: {}

`),d.end()),await P(a,I,L)}catch(e){console.error("Streaming error: "+e),await H(d,e.message),d.end()}}else{var ie=e,ne=T,U=S,oe=o,le=c,de=n,ce=t,me=s,ue=i,he=h,ge=f;let a=[],r=(ne.forEach((e,t)=>{t!==ne.length-1&&({role:t,message:e}=e,""!==e)&&a.push({role:t,content:e})}),populateMessages(oe,a));try{l.setTimeout(3e4);let t=!1;l.on("close",e=>{console.log("Client closed connection"),t=!0});var F={model:de,temperature:le,messages:r,stream:!0,max_tokens:ce},pe=((me||ue)&&(F.extra_body={google:{thinking_config:{thinking_budget:0,include_thoughts:ue}}}),new OpenAI({apiKey:he,baseURL:ie.baseURL})),$={startedAt:(new Date).getTime()};let e=null;try{console.log(`Starting stream ${ge}...`),e=await pe.chat.completions.create(F)}catch(e){return void await(console.error("Failed to create a stream:",e),e.message.includes("status code")&&(e.message+="\n\nPlease look up the error code with the provider to determine the problem."),await H(d,e.message),void d.end())}U.createdAt=Date.now(),U.payload=F;var b,ye=Date.now();let a=!1,s="";for await(b of e){if(U.updatedAt=Date.now(),t)break;var x=b.choices[0]?.delta?.content||"",k=b.choices[0]?.finish_reason,fe=k&&"null"!==k&&"stop"===k,Ee={content:x,done:fe};if(x&&(s+=x),d.write(`id: ${ye}
event: message
data: ${JSON.stringify(Ee)}

`),d.flush?.(),fe){console.log("Finished streaming "+ge),$.done=!0,$.stoppedAt=(new Date).getTime(),a=!0;break}}a||($.incomplete=!0,$.stoppedAt=(new Date).getTime(),s+="\n---\nWarning: Incomplete response"),t||(d.write(`id: ${ye}
event: complete
data: {}

`),d.end()),await P(s,oe,$)}catch(e){console.error("Streaming error:",e),await H(d,e.message),d.end()}}await 0}}}finally{console.log("Deleting streaming lock "+f),delete global.gschat.streaming[f]}}else d.status(500).send({status:"failed",data:`Server side error. No model identifier for ${o} by ${a} found.`})}else d.status(400).send({status:"failed",data:"No providers for the LLM "+o})}else await H(d,`No ${a} API key defined. Please define to chat with ${o}.`)}else d.status(400).send({status:"failed",data:{provider:"Missing provider information"}})}}finally{console.log("Closing db"),await closeAsync(v)}async function H(e,t){console.log("Stream error message",t);try{e.setHeader("Content-Type","text/event-stream"),e.setHeader("Cache-Control","no-cache"),e.setHeader("Connection","keep-alive");var a=Date.now(),s=t,r={content:s,done:!1};e.write(`id: ${a}
event: message
data: ${JSON.stringify(r)}

`),e.flush?.(),r={content:"",done:!0},e.write(`id: ${a}
event: message
data: ${JSON.stringify(r)}

`),e.flush?.(),e.write(`id: ${a}
event: complete
data: {}

`),e.end(),await P(s,useModel)}catch(e){console.log(e.message)}}async function P(t,a,e){var s=new RegExp("Authored by [^\n]+\n*$");let r=extractCodeBlocks(t,{silent:!0}).blocks||[];for(let e=0;e<r.length;e++){var i=r[e];i.header?.["Block-UUID"]&&(i=removeLineNumbers(i.headerText+"\n\n\n"+i.content),t=updateCodeBlockByIndex(t,e,i))}t=(t=fixTextCodeBlocks(replaceGSUUIDs(t)).text).replace(s,""),t=removeCodeBlockMarkers(t);s=isSearchableMessage(t+=`

Authored by LLM ${a} at `+(new Date).toUTCString()),a=`
            UPDATE
                messages
            SET
                message = ?,
                ${e?"chat_completion_stats = ?,":""}
                ${s?"":"meta = ?,"}
                job_id = NULL
            WHERE
                id = ?
        `;let n=[t];e&&n.push(JSON.stringify(e)),s||n.push(JSON.stringify({searchable:!1})),n.push(_);try{await runAsync(v,a,n)}catch(e){throw new Error(`Failed to update chat message ${_}:
${a}
`+e)}if((r=(extractCodeBlocks(t,{silent:!0})||{}).blocks||[]).length){var o=`
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
        `;for(let e=0;e<r.length;e++){var{type:l,header:d,metadata:c,content:m}=r[e];if(d||c){var u="code"===l,h="patch"===l,{Component:g,"Block-UUID":p,"Parent-UUID":y,"Source-Block-UUID":f,"Target-Block-UUID":E,"Target-Version":w}=u?d:c;if(!(u&&!d.Version||h&&!w)){h=(u?d.Version:w).split(/\./);if(h&&3===h.length)if(h.find(e=>isNaN(e)))console.warn(`Found the non number "${nonNumber}" in the version array. Ignoring code block.`);else{let e=[_,l,u?p:f+":"+E,!u||"N/A"===y?null:y,g||"Patch",m.length,h[0],h[1],h[2],JSON.stringify(d||c),m];try{await runAsync(v,o,e)}catch(e){throw new Error(`Failed to upsert code block:
${o}
`+e)}}else console.warn(`Expecting version array to contain a major, minor and patch value. Found "${JSON.stringify(h)}" instead. Ignoring code block.`)}}}}else console.log("No code blocks")}}async function getChatCompletion(e,t,p,a){var s=models[t]?.providers||null;if(!s)throw new Error("No providers with the model "+t);readOptionsFile();s=s[0];s.maxOutputTokens||MAX_OUTPUT_TOKENS;let y=s.modelId;var s=s.name,r=providers[s],i="anthropic"===s.toLowerCase(),n=r.apiKeyName,o=n?process.env[n]:"";return null==o?{status:"failed",data:`No API key ${n} for ${s} defined`}:(i?async(s,r,i)=>{let n=s.name,e=new Anthropic({apiKey:i}),c=(new Date).getTime()/1e3,m=/You have reached your specified API usage limits/,o=(console.log("Using API key ..."+i.slice(40)),null),l=[];r.forEach((e,t)=>{var{role:e,content:a}=e;e===SYSTEM_ROLE?o=a:l.push({role:e,content:[{type:"text",text:a}]})}),s={messages:l,model:y,temperature:p,max_tokens:1e3,stream:!1},o&&(s.system=o);try{var{data:t,response:a}=await e.messages.create(s).withResponse(),d=a.headers,u=g(null,d),h=replaceGSUUIDs(t.content[0].text);return{success:!0,messages:r,response:h,rateLimit:u}}catch(e){var{status:i,headers:s,error:r}=e,r=r?r.error.message:null;console.error("Exception:\n"),console.error(e),r?(console.log("Error message"),console.error(r)):console.log("No error message");let t=null,a=null;return 400===i?r.match(m)?(t="Rate limit error",a=g(r,s)):t="Serious: Bad request error":401===i?t="Serious: Authentication error":403===i?t="Serious: Permission denied error":404===i?t="Serious: Not found error":413===i?t="Serious: Request exceeds the maximum allowed number of bytes.":429===i?(t="Rate limit error",a=g(r,s)):t=500<=i?n+" server error":"Serious: Unknown error",{success:!1,reason:t,rateLimit:a}}function g(e,t){let a=null,s=null,r=null,i=null,n=null,o=null,l=null,d=null;try{d=t.get?(a=new Date(t.get("date")).getTime()/1e3,s=parseInt(t.get("anthropic-ratelimit-requests-limit")),i=parseInt(t.get("anthropic-ratelimit-requests-remaining")),o=t.get("anthropic-ratelimit-requests-reset"),r=parseInt(t.get("anthropic-ratelimit-tokens-limit")),n=parseInt(t.get("anthropic-ratelimit-tokens-remaining")),l=t.get("anthropic-ratelimit-tokens-reset"),t.get("retry-after")):(a=new Date(t.date).getTime()/1e3,s=parseInt(t["anthropic-ratelimit-requests-limit"]),i=parseInt(t["anthropic-ratelimit-requests-remaining"]),o=t["anthropic-ratelimit-requests-reset"],r=parseInt(t["x-ratelimit-limit-tokens"]),n=parseInt(t["anthropic-ratelimit-tokens-remaining"]),l=t["anthropic-ratelimit-tokens-reset"],t["retry-after"])}catch(e){console.error("Failed to parse header: "+e.getMessage())}return e&&e.match(m)&&(d="60m"),{sentAtEpochTime:c,receivedAtEpochTime:a,limitRequests:s,limitTokens:r,limitRemainingRequests:i,limitRemainingTokens:n,limitResetRequests:o,limitResetTokens:l,retryAfter:d}}}:async(r,i,n)=>{let{name:c,baseURL:e}=r,t=new OpenAI({apiKey:n,baseURL:e}),m=(new Date).getTime()/1e3,u=/Please try again in ([^\.]+)./,h=/You exceeded your current quota/;try{console.log("Using API key ..."+n.slice(20));var a={messages:i,model:y,temperature:p,stream:!1},s=(await t.chat.completions.create(a).withResponse()).data;return{status:"success",data:replaceGSUUIDs(s.choices[0].message.content)}}catch(e){var{status:r,headers:n,error:i}=e;let t="No error message";i&&(i.message?t=i.message:i.error&&(t=i.error.message)),console.error("Request failed"),console.error(JSON.stringify(e,null,2)),console.error("Error message:"),console.error(t);let a=null,s=null;return 400===r?a="Serious: Bad request error":401===r?a="Serious: Authentication error":403===r?a="Serious: Permission denied error":404===r?a="Serious: Not found error":422===r?a="Serious: UnprocessableEntityError":429===r?(a="Rate limit error",s=((e,t)=>{console.log("Retrieving rate limit from the following response header:"),console.log(t),console.log("");let a=null,s=null,r=null,i=null,n=null,o=null,l=null,d=null;return d=t.get?(a=new Date(t.get("date")).getTime()/1e3,s=parseInt(t.get("x-ratelimit-limit-requests")),i=parseInt(t.get("x-ratelimit-remaining-requests")),o=t.get("x-ratelimit-reset-requests"),r=parseInt(t.get("x-ratelimit-limit-tokens")),n=parseInt(t.get("x-ratelimit-remaining-tokens")),l=t.get("x-ratelimit-reset-requests"),t.get("retry-after")):(a=new Date(t.date).getTime()/1e3,s=parseInt(t["x-ratelimit-limit-requests"]),i=parseInt(t["x-ratelimit-remaining-requests"]),o=t["x-ratelimit-reset-requests"],r=parseInt(t["x-ratelimit-limit-tokens"]),n=parseInt(t["x-ratelimit-remaining-tokens"]),l=t["x-ratelimit-reset-requests"],t["retry-after"]),e?"groq"===c?e.match(u)?(t=u.exec(e),d=t[1]):console.log("Error message did not match "+u):"openai"===c?e.match(h)&&(d="60m"):console.log("No message processor for provider "+c):console.log("No message provided"),{sentAtEpochTime:m,receivedAtEpochTime:a,limitRequests:s,limitTokens:r,limitRemainingRequests:i,limitRemainingTokens:n,limitResetRequests:o,limitResetTokens:l,retryAfter:d}})(t,n)):a=500<=r?c+" server error":"Serious: Unknown error",{success:!1,reason:a,rateLimit:s}}})(r,populateMessages(t,a),o)}async function getChat(e){var{id:t,uuid:a,model:s,"system-message-name":r,"group-id":i}=e,e=e["max-depth"]?parseInt(e["max-depth"]):1e4,n=connect(getDBPath());try{var o,l,d=a?await getChatPrivate(n,null,a):t?await getChatPrivate(n,t):i&&r&&s?await getChatPrivate(n,null,null,i,r,s):null;return d?({id:o,parent_id:l}=d,(new Date).getTime(),d.messages=await getChatMessages(n,o,s),l&&(d.lineage=await getChatLineage(n,o)),d.descendants=e?await getChatDescendants(n,o,e):null,{status:"success",data:{chat:d}}):{status:"failed",data:"Not found"}}finally{await closeAsync(n)}}async function getGitRefChatByFamilyMember(e){var e=e.id,t=connect(getDBPath());try{var a,s,r=await getChatPrivate(t,e);return r?(a=["git-ref","git-blob","git-tree"]).includes(r.type)?(s="git-ref"===r.type?r:await getGitRefChat(t,r.id))?(s.descendants=await getChatDescendants(t,s.id),{status:"success",data:s}):{status:"failed",data:"Failed to retrieve the Git ref chat for the chat with the id "+r.id}:{status:"failed",data:"Invalid chat type. Expecting one of the following "+`${JSON.string(a.join(","))} but found ${r.type} instead`}:{status:"failed",data:"No chat with the provided id or UUID found"}}catch(e){return{status:"failed",data:e.message}}finally{await closeAsync(t)}}async function getChatPrivate(e,t,a,s,r,i){var n=[];let o=null;if(t)o="c.id = ?",n.push(t);else if(a)"repositories"===a?o="c.type = 'git-repos'":(o="uuid = ?",n.push(a));else{if(!(s&&r&&i))return null;o="group_id = ? AND p.name = ? AND c.main_model = ?",n.push(s),n.push(r),n.push(i)}t=`
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
    `;try{var l,d=await allAsync(e,t,n);return d&&d.length?((l=d[0]).meta&&(l.meta=JSON.parse(l.meta)),l):null}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}}async function getChatLineage(e,t,a=!0){var s=`
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
    `;try{var r=a?[t,t]:[t];return await allAsync(e,s,r)}catch(e){throw console.error(`Failed to execute ${s}:
`+e.message),new Error("Server side error")}}async function getChatTitleSuggestion(a){var{uuid:a,model:s}=a,r=connect(getDBPath());try{var i=await(async(e,t)=>{var a=`
            SELECT
                id,
                main_model
            FROM
                chats
            WHERE
                uuid = ?
        `;try{var s=[t],r=await allAsync(e,a,s);return r&&r.length?r[0]:null}catch(e){throw console.error(`Failed to execute ${a}:
`+e.message),new Error("Server side error")}})(r,a);if(!i)return{status:"failed",data:"Not found",code:404};var{id:n,main_model:o}=i,l=(await getChatMessages(r,n,o))[0];let e=SUGGEST_CHAT_TITLE.replace(/{{system}}/,null==l.message?"":`<system_prompt>${l.message}</system_prompt>`);var d;let t=null;e=("GitSense Notes"===o?(t=l.kids[0],e.replace(/{{user}}/,"")):(d=l.kids[0],t=d.kids[0],e.replace(/{{user}}/,`<user_message>${d.message}</user_message>`))).replace(/{{assistant}}/,`<assistant_message>${t.message}</assistant_message>`);var c=[{role:USER_ROLE,content:e}],m=await getChatCompletion(r,s,0,c),{status:u,data:h}=m;return"success"!==u?m:{status:"success",data:{title:h}}}finally{await closeAsync(r)}}async function getGitBlobChatMessages(e){var{"id-type":e,ids:t,"working-directory":a=!1}=e;if("chat"!==e)return{status:"failed",data:"Currently, only chat ids are supported",code:400};let s=[];try{t.split(",").forEach(e=>{if(isNaN(e))throw new Error(e+" is not a number");s.push(parseInt(e))})}catch(e){return{status:"failed",data:e.message,code:400}}let r=connect(getDBPath());try{var i,n=await(async()=>{var t=`
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
        `;try{var e=await allAsync(r,t);let s={};return e.forEach(e=>{var{id:e,meta:t,name:a}=e;s[e]=JSON.parse(t),s[e].fullName=a}),s}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}})(),o=await(async()=>{var t=`
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
        `;try{var e=await allAsync(r,t);let o={};return e.forEach(e=>{var{id:e,type:t,parent_id:a,chat_id:s,content:r,meta:i,updated_at:n}=e;o[s]={id:e,type:t,chat_id:s,parent_id:a,content:r,meta:JSON.parse(i),updated_at:n}}),o}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}})(),l={};for(i in o){var d=o[i];if(!d)return{status:"failed",data:"No Git blob message associated with chat ID: "+i};var c,m=n[i];if(!m)return{status:"failed",data:"No repository associated with chat ID: "+i};a&&(c=path.join(m.path,d.meta.path),fs.existsSync(c)?d.content=fs.readFileSync(c,"utf8"):d.content="<Not Found in Working Directory>"),l[i]={repo:m,message:d}}return{status:"success",data:{chat2Result:l}}}finally{await closeAsync(r)}}async function getTinyOverviewChatPurpose(e){e=e.ids;let s=[];try{e.split(",").forEach(e=>{if(isNaN(e))throw new Error(e+" is not a number");s.push(parseInt(e))})}catch(e){return{status:"failed",data:e.message,code:400}}let r=connect(getDBPath());try{var t,a=await(async()=>{var t=`
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
        `;try{var e=await allAsync(r,t);let s={};return e.forEach(e=>{var{id:e,meta:t,name:a}=e;s[e]=JSON.parse(t),s[e].fullName=a}),s}catch(e){throw console.error(`Failed to execute ${t}:
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
                    chat_id IN (${s.join(",")})
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
                c.id IN (${s.join(",")})
        `;try{var e=await allAsync(r,a);let t={};return e.forEach(e=>{e.chat_meta&&(e.chat_meta=JSON.parse(e.chat_meta)),e.message_meta&&(e.message_meta=JSON.parse(e.message_meta)),t[e.chat_id]=e}),t}catch(e){throw console.error(`Failed to execute ${a}:
`+e.message),new Error("Server side error")}})()),n={};for(t in i){var o=i[t];if(!o)return{status:"failed",data:`The provided id ${t} is not a valid chat id`};var l,d,c=a[t];if(!c)return{status:"failed",data:"No repository associated with chat ID: "+t};o.keywords=null,o.message_content&&(d=(l=o.message_content.split("\n")).findIndex(e=>e.startsWith("## Keywords")),o.keywords=l[d+1]?.split(", "),delete o.message_content),o.purpose=o.message_meta?.purpose||null,delete o.message_meta,n[t]={overview:o,repo:c}}return{status:"success",data:{chat2Result:n}}}catch(e){return{status:"failed",data:e.message}}finally{await closeAsync(r)}}async function getChatAnalysisMessages(e){let{"id-type":t,ids:a,type:s}=e;if("chat"!==t)return{status:"failed",data:"Currently, only chat ids are supported",code:400};if("tiny"!==s&&"short"!==s&&"long"!==s)return{status:"failed",data:`Invalid type ${s}. Expected tiny, short or long.`,code:400};let r=[];try{a.split(",").forEach(e=>{if(isNaN(e))throw new Error(e+" is not a number");r.push(parseInt(e))})}catch(e){return{status:"failed",data:e.message,code:400}}let i=connect(getDBPath());try{var n,o=await(async()=>{var t=`
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
        `;try{var e=await allAsync(i,t);let s={};return e.forEach(e=>{var{id:e,meta:t,name:a}=e;s[e]=JSON.parse(t),s[e].fullName=a}),s}catch(e){throw console.error(`Failed to execute ${t}:
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
                c.id IN (${r.join(",")}) AND
                m.type = '${s}-overview'
        `;try{var e=await allAsync(i,t);let o={};return e.forEach(e=>{var{id:e,type:t,parent_id:a,chat_id:s,content:r,meta:i,updated_at:n}=e;o[s]={id:e,type:t,parent_id:a,chat_id:s,content:r,meta:JSON.parse(i),updated_at:n}}),o}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}})(),d={};for(n in l){var c=l[n];if(!c)return{status:"failed",data:"No Git blob message associated with chat ID: "+n};var m=o[n];if(!m)return{status:"failed",data:"No repository associated with chat ID: "+n};d[n]={message:c,repo:m}}return{status:"success",data:{chat2Result:d}}}finally{await closeAsync(i)}}async function getChatTemplateMessages(e){var t,e=e.type;return e?(t=path.join(__dirname,"components","chat-builder","messages"),{status:"success",data:{messages:_getChatTemplateMessages(t,path.normalize(e))}}):{status:"failed",data:"No type specified",code:400}}async function getAnalyzeChatMenuOptions(e){var t=path.join(__dirname,"components","chat-builder","messages","analyze");try{return{status:"success",data:await buildAnalyzeMenuOptions(t)}}catch(e){return{status:"failed",data:e}}}async function getAnalyzers(e){var t=path.join(__dirname,"components","chat-builder","messages","analyze");try{return{status:"success",data:await analyzerUtils.getAnalyzers(t)}}catch(e){return{status:"failed",data:e}}}async function getAnalyzerSchema(e){var e=e["analyzer-id"],t=path.join(__dirname,"components","chat-builder","messages","analyze");try{return{status:"success",data:await analyzerUtils.getAnalyzerSchema(t,e)}}catch(e){return{status:"failed",data:e}}}function getOptions(){try{var e=readOptionsFile();return e?(e.prompts&&(e.prompts=e.prompts.filter(e=>null==e.show||e.show)),{status:"success",data:e}):{status:"failed",message:"No config file found"}}catch(e){return console.log(e),{status:"failed",message:"Server side error"}}}async function deleteAnalyzer(e){var e=e["analyzer-id"],t=path.join(__dirname,"components","chat-builder","messages","analyze");try{return await analyzerUtils.deleteAnalyzer(t,e),{status:"success"}}catch(e){return{status:"failed",data:e}}}async function deleteChat(s){var s=s.uuid,r=connect(getDBPath());try{var i=await(async(e,t)=>{var a=`
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
`+e.message),new Error("Server side error")}})(r,s);if(!i)return{status:"failed",data:`No chat with the uuid ${s} found`};var{id:n,protected:e}=i;if(e)return{status:"failed",data:"Protected chat. Remove protection and try again."};var o=`
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
        `;let t=null;try{var l=await allAsync(r,o,[n]);t=l.map(e=>e.id)}catch(e){throw new Error(`Failed to get all descendant chat ids or ${n}:
${o}
`+e)}var d=[`
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
        `];let a=null;try{for(let e=0;e<d.length;e++){a=d[e].replace(/<ids>/,"("+t.join(",")+")");var c=await runAsync(r,a);if(0===e&&!c?.changes)return{status:"failed",data:"No matching chat. Make sure the chat UUID is correct."}}}catch(e){throw new Error(`Failed to delete chat with uuid ${s}:
${a}
`+e)}if("git-repo"===i.type||"git-repo-owner"===i.type){let t=[];if("git-repo"===i.type)t.push(i.group_id);else if("git-repo-owner"===i.type){var m=`
                SELECT 
                    id 
                FROM 
                    groups 
                WHERE 
                    type='git-repo' AND
                    name LIKE '${i.name}/%'`;try{(await allAsync(r,m)).forEach(e=>t.push(e.id))}catch(e){throw new Error(`Failed to group ids:
${m}
`+e)}}var u=`DELETE FROM groups WHERE id IN (${t.join(",")})`;try{await runAsync(r,u)}catch(e){throw new Error(`Failed to delete chat group ${i.group_id}:
${u}
`+e)}}return{status:"success"}}finally{await closeAsync(r)}}async function deleteChatMessage(t){var{id:t,"includes-children":e}=t,a=connect(getDBPath());try{var s=(await getMessage(a,t)).parent_id,r=`
            UPDATE
                messages
            SET
                deleted = 1,
                updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now')
            WHERE
                id = ?
        `;try{if(!(await runAsync(a,r,[t])).changes)return{status:"failed",data:"No matching message. Make sure the id and original message is correct."};console.log("Deleted chat message with id "+t)}catch(e){throw new Error(`Failed to delete chat with id ${t}:
${r}
`+e)}var i=`
            UPDATE
                messages
            SET
                deleted = 1
            WHERE
                parent_id = ?
        `,n=e&&"true"===e?i:`
            UPDATE
                messages
            SET
                parent_id = ${s}
            WHERE
                parent_id = ?
        `;try{await runAsync(a,n,[t])}catch(e){throw new Error(`Failed to update chats with parent id ${s}:
${i}
`+e)}return{status:"success"}}finally{await closeAsync(a)}}async function newChat(e){let{type:a=DEFAULT_CHAT_TYPE,model:o,temperature:l,analysis:s={},name:r,"parent-id":d,"group-id":c,"group-name":m,"group-type":u,"system-message-name":h,"system-message":g,"user-message":p,"assistant-message":y,"prompt-type":f=DEFAULT_PROMPT_TYPE,"forked-from-message-id":E,"real-model":w,messages:_=[]}=e;var v=connect(getDBPath());try{var S,T=crypto.randomUUID(),A=r||(a===DEFAULT_CHAT_TYPE?"chat":a)+"-"+T.split("-")[0],N=u||DEFAULT_GROUP_TYPE,I=m||T,H=DEFAULT_CHAT_OWNER;let e=null;e=c||(e=I!==T&&(S=await(async(e,t,a)=>{var s=`
            SELECT
                id,
                name
            FROM
                groups
            WHERE
                ${null!=t?"id = ?":"name = ?"}
        `,t=[null!=t?t:a];try{var r=await allAsync(e,s,t);return r.length?r[0]:null}catch(e){throw console.error(`Failed to execute ${s}:
`+e.message),new Error("Server side error")}})(v,null,I))?S.id:e)||await insertGroup(v,N,I);var P=d||0;let t=null;if(g)if(h){var R=new Prompts,D=R.computeHash(f,h,g);if(!(t=await getPrompt(v,null,D))||!t.id){var C=await R.insert(v,null,f,D,h,g);if(!C)throw new Error("No prompt created");t={id:C.id,content:C.prompt}}}else g={id:0,content:g};else t=await getPrompt(v,null,null,f,h);if(!t||void 0===t.id)throw new Error("No system prompt id defined");var M,O=await insertChat(v,a,DEFAULT_CHAT_VISIBILITY,T,H,A,0,P,e,t.id,o,r?0:1,E);_.length?(M=_[0]).role===SYSTEM_ROLE&&("<replace with system message>"===M.message||g&&h)&&(M.message=t.content):(_.push({role:SYSTEM_ROLE,message:t.content}),o.match(/Notes/)?_.push({role:ASSISTANT_ROLE,message:p}):(_.push({role:USER_ROLE,message:p}),_.push({role:ASSISTANT_ROLE,message:y})));let i=0,n=null;for(let r=0;r<_.length;r++){let{role:e,message:t,type:a,visibility:s}=_[r];if(e===SYSTEM_ROLE){var B=(await insertMessage(v,a||DEFAULT_MSG_TYPE,s||DEFAULT_MSG_VISIBILITY,O,i,null,null,null,null,e,t)).id;i=B}else if(e===USER_ROLE){var q=(await insertMessage(v,a||DEFAULT_MSG_TYPE,DEFAULT_MSG_VISIBILITY,O,i,null,null,null,null,e,t)).id;i=q}else{if(e!==ASSISTANT_ROLE)return{status:"failed",code:400,data:"Invalid message role "+e};var Y=(await insertMessage(v,a||DEFAULT_MSG_TYPE,DEFAULT_MSG_VISIBILITY,O,i,1,o,w,l,e,t)).id;n=i=Y}}var L,W,U,F,z,$,b,{type:x="",options:k={}}=s||{},G=(x.match(/no error analysis/i),x.match(/validate/i)),J=x.match(/compare/i);return x.match(/samples/i)?({samples:L,summarize:W,summarizer:U}=k,await newCompareSamplesAnalysis(v,n,L,U)):J?({models:F,summarize:z,summarizer:$}=k,await newCompareModelsAnalysis(v,n,F,$)):G&&(b=k.models,await newValidateAnalysis(v,n,b)),await getChat({id:O})}finally{await closeAsync(v)}}async function getChatDescendants(e,t,a=1e4){var s=`
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
    `;try{var r=[t,a,t],i=await allAsync(e,s,r);return i.forEach(e=>{e.meta&&(e.meta=JSON.parse(e.meta))}),i}catch(e){throw console.error(`Failed to execute ${s}:
`+e.message),new Error("Server side error")}}async function getGitRefChat(e,t){e=await getChatLineage(e,t,!1);return e&&e.length?e.find(e=>"git-ref"===e.type):null}async function insertGroup(e,t,a){var s=`
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
    `;try{return(await runAsync(e,s,[t,a])).lastID}catch(e){throw new Error(`Failed to insert chat:
${s}
`+e)}}async function insertChat(e,t,a,s,r,i,n,o,l,d,c,m=0,u){var h=`
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
    `;try{var g=[t,a,s,r,i,n,o,l,d,c,m,u];return(await runAsync(e,h,g)).lastID}catch(e){throw new Error(`Failed to insert chat:
${h}
`+e)}}async function newChatMessage(a){var s,{"chat-id":a,"parent-id":r,model:i,temperature:n,role:o,message:l,"real-model":d,"reference-message-id":c,insert:m,meta:u,type:h,visibility:g}=a,p=connect(getDBPath());try{if(o===SYSTEM_ROLE)return{status:"failed",code:400,data:"New system message not supported.  Create a new chat instead."};let e=null;if(c){if(o!==ASSISTANT_ROLE)return{status:"failed",code:400,data:"Only assistant messages can be inserted above or below an existing message."};if("before"!==m&&"after"!==m)return{status:"failed",code:400,data:"Only assistant messages can be inserted above or below an existing message."};if(!(e=await getMessage(p,c)))return{status:"failed",code:400,data:`No reference message with the id ${c} found.`};if(e.chat_id!==parseInt(a))return{status:"failed",code:400,data:"Reference message does not belong to chat #"+a}}let t=null;if(o===USER_ROLE){if(null==l)return{code:400,status:"failed",data:{message:"No message defined. User message cannot be empty"}};var y=await insertMessage(p,h||DEFAULT_MSG_TYPE,g||DEFAULT_MSG_VISIBILITY,a,r,null,null,null,null,USER_ROLE,l);t=y.id}else o===ASSISTANT_ROLE&&(s=await insertMessage(p,h||DEFAULT_MSG_TYPE,g||DEFAULT_MSG_VISIBILITY,a,r,1,i,d,n,ASSISTANT_ROLE,l,u),t=s.id);if(e){var f=[];"before"===m?(f.push(`
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
`+e)}}}return{status:"success",data:{id:t}}}finally{await closeAsync(p)}}async function newChatTree(e){let{tree:t,name:a,"parent-id":s=0,"system-message-name":r,model:i="GitSense Notes"}=e;e=trees.find(e=>e.name===t);if(!e)return{status:"failed",code:400,data:`No tree with the name "${t}" found`};e=prepareIsolatedTree(e);let v=/\{\{short-id(?:-(\d+))?\}\}/g,S=new Map,T=connect(getDBPath());try{var n=await getPrompt(T,null,null,DEFAULT_PROMPT_TYPE,r),o=await insertGroup(T,DEFAULT_GROUP_TYPE,crypto.randomUUID());try{var l=t.match(/workspace/)?"workspace":t.match(/project/)?"project":"help"===t?"help":DEFAULT_CHAT_TYPE,d="help"===t?"help":DEFAULT_MSG_TYPE;return getChat({id:await async function t(e,a,s,r,i,n,o,l){let{config:d,kids:c,messages:m,uuid:u}=e;if(!d)throw new Error(`No config associated with the tree "${e.name}"`);let{name:h,order:g=0}=d;let p=u||crypto.randomUUID();let y=1;let f=0;let E=await insertChat(T,a,DEFAULT_CHAT_VISIBILITY,p,DEFAULT_CHAT_OWNER,s||h,g,i,r,n.id,o);let w=[{role:SYSTEM_ROLE,message:n.content},{role:USER_ROLE,message:""}];m.forEach(e=>{"help"===a&&(e=e.replace(v,(e,t)=>{let a=t||"_default";return S.has(a)||S.set(a,A()),S.get(a)})),w.push({role:ASSISTANT_ROLE,message:e,model:o,temperature:f,type:l})});let _=0;for(let n=0;n<w.length;n++){let{role:e,type:t,message:a,model:s,temperature:r}=w[n],i=(await insertMessage(T,l,DEFAULT_MSG_VISIBILITY,E,_,1,s,null,r,e,a)).id;_=i}for(let e=0;e<c.length;e++)await t(c[e],a,null,r,E,n,o,l);return E}(e,l,a,o,s,n,i,d)})}catch(e){return console.error("Failed to create tree: ",e),{status:"failed",data:"Server side error"}}}finally{await closeAsync(T)}function A(){return""+Math.random().toString(36).substring(2,8)}}async function newCompareSamplesAnalysis(a,e,r,s){var i=await getMessage(a,e);if(!i)throw new Error(`No message with the id ${e} found`);let{id:n,chat_id:o,parent_id:l,model:d,temperature:c,role:m}=i;e=await getMessageSiblings(a,i);let u=1,h=[];e.forEach(e=>{var{id:e,model:a,sample:s}=e;r<s||d!==a||c!==t||(s>u&&(u=s),h.push(e))});for(let e=u+1;e<=r;e++){var g=await insertMessage(a,DEFAULT_MSG_TYPE,DEFAULT_MSG_VISIBILTY,o,l,e,d,null,c,m);h.push(g.id)}h.push(n),h.sort((e,t)=>e-t);var i="samples-summary",e=JSON.stringify(h),p=await getAnalysis(a,null,o,i,e,"",s,1);return p||insertAnalysis(a,o,i,e,"",s)}async function newCompareModelsAnalysis(a,e,s,t){let r=await getMessage(a,e);if(!r)throw new Error(`No message with the id ${e} found`);e=await getMessageSiblings(a,r);let i={};e.forEach(e=>{var{model:t,sample:a}=e;1===a&&(i[t]=e)});var{id:e,chat_id:n,parent_id:o,temperature:l,role:d}=r,c=[e];for(let t=0;t<s.length;t++){var m=s[t];let e=i[m];e||(m=await insertMessage(a,DEFAULT_MSG_TYPE,DEFAULT_MSG_VISIBILTY,n,o,1,m,null,l,d),c.push(m.id))}c.sort((e,t)=>e-t);var e="models-summary",u=JSON.stringify(c),h=await getAnalysis(a,null,n,e,u,"",t,1);return h||insertAnalysis(a,n,e,u,"",t)}async function newValidateAnalysis(t,e,a){var s=await getMessage(t,e);if(!s)throw new Error(`No message with the id ${e} found`);e=await(async(e,t,a)=>{var{chat_id:t,id:s}=t,r=`
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
        `,t=[t,`[${s}]`,a.map(e=>`'${e}'`).join(",")];try{return await allAsync(e,r,t)}catch(e){throw console.error(`Failed to execute ${r}:
`+e.message),new Error("Server side error")}})(t,s,a);let r={};e.forEach(e=>r[e.model]=e);var{id:e,chat_id:i}=s,n=`[${e}]`,o=[];for(let e=0;e<a.length;e++){var l=a[e],d=r[l];d?o.push(d.id):(d=await insertAnalysis(t,i,"validate",n,"",l),console.log("Inserted new validate analysis "+d.id),o.push(d.id))}o.sort((e,t)=>e-t);var s=JSON.stringify(o),e="validate-summary",c=await getAnalysis(t,null,i,e,"",s);return c||insertAnalysis(t,i,e,"",s)}async function getPrompt(e,t,a,s,r){var i={id:0,content:""};if(null==t&&null==a&&null==r)return i;var n=[];let o=null;null!=t?(o="id = ?",n.push(t)):a?(o="hash = ?",n.push(a)):(o="type = ? AND name = ?",n.push(s),n.push(r));t=`
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
`+e.message),new Error("Server side error")}return null}async function getMessagesByChatIdAndType(e,t,s){if(t.find(e=>"number"!=typeof e))throw new Error("Found a non number Chat ID");t=`
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
    `;try{let a=await allAsync(e,t,[s]);return a?(a.forEach((e,t)=>{e=e.meta;e&&(a[t].meta=JSON.parse(e))}),a):null}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}return null}async function getChatMessages(e,t,o,a=1e4){var s=`
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
    `;try{let i={},n=[];var r=[t,a,t];return(await allAsync(e,s,r)).forEach(e=>{var{id:t,parent_id:a,model:s,meta:r}=e,r=(e.meta=r?JSON.parse(r):{},i[t]),t=(r||(r=[],i[t]=r,e.kids=r),i[a]);t&&(s&&s===o?(e.main=!0,t.unshift(e)):(e.main=!1,t.push(e))),0===a&&n.push(e)}),n}catch(e){throw console.error(`Failed to execute ${s}:
`+e.message),new Error("Server side error")}}async function getMessageLineage(e,t,a=0){var s=`
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
    `;try{return await allAsync(e,s,[t])}catch(e){throw console.error(`Failed to execute ${s}:
`+e.message),new Error("Server side error")}}async function getMessageSiblings(e,t){var{id:t,parent_id:a,role:s}=t,r=`
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
    `;let i=null;try{i=await allAsync(e,r,[t,a,s])}catch(e){throw console.error(`Failed to execute ${r}:
`+e.message),new Error("Server side error")}return i||[]}async function insertMessage(e,t,a,s,r,i,n,o=null,l,d,c=null,m=null){var u=`
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
    `,h=!c||isSearchableMessage(c),h=(m&&!h?m.searchable=!1:h||(m={searchable:!1}),[t,a,s,r,r,i,n,o,l,d,c,m?JSON.stringify(m):null]);let g=null;try{if(!(g=await runAsync(e,u,h)).changes)throw new Error("No changes after insert message")}catch(e){throw console.log("Failed to insert the following message:"),console.log(JSON.stringify({params:h},null,2)),new Error(`Failed to insert message:
${u}
${JSON.stringify(h)}
`+e)}return getMessage(e,g.lastID)}async function getAnalysis(e,t,a,s,r,i,n,o=0,l=1){let d=`
        SELECT
            id,
            message_ids,
            analysis_ids,
            message,
            response
        FROM
            analysis
        WHERE
    `,c=null,m=(c=t?(d+=`
            id = ?
        `,[t]):(d+=`
            chat_id = ? AND
            type = ? AND
            message_ids = ? AND
            analysis_ids = ? AND
            model = ? AND
            temperature = ? AND
            sample = ?
        `,[a,s,r,i,n,o,l]),null);try{m=await allAsync(e,d,c)}catch(e){throw console.error(`Failed to execute ${d}:
`+e.message),new Error("Server side error")}return m?m[0]:null}async function insertAnalysis(e,t,a,s,r,i="",n=1,o=0){var l=`
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
    `,t=[t,a,s,r,n,i,o];try{return await getAnalysis(e,(await runAsync(e,l,t)).lastID)}catch(e){throw new Error(`Failed to insert chat:
${l}
`+e)}}async function resetChatMessage(e){var e=e.id,t=`
        UPDATE
            messages
        SET
            message = NULL,
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
    `,s=connect(getDBPath());try{try{if(!(await runAsync(s,t,[e])).changes)return{status:"failed",data:"No matching message. Make sure the id and original message is correct."}}catch(e){throw new Error(`Failed to update chat message:
${t}
`+e)}try{await runAsync(s,a,[e])}catch(e){throw new Error(`Failed to detach chat message:
${a}
`+e)}return{status:"success"}}finally{await closeAsync(s)}}async function updateChatAnalyzer(e){var{analyzerId:e,instructionsContent:t}=e,a=path.join(__dirname,"components","chat-builder","messages","analyze");try{return await saveAnalyzerConfiguration(a,e,t),{status:"success"}}catch(e){return{status:"failed",data:e}}}async function updateChats(e){var t=e.chats,e=connect(getDBPath()),a=`
        UPDATE
            chats
        SET
            parent_id = ?,
            name = ?,
            order_weight = ?
        WHERE
            id = ?
    `;let s=null;try{s=await prepareAsync(e,a);for(let e=0;e<t.length;e++){var{id:r,parent_id:i,name:n,order_weight:o=0}=t[e];await stmtRunAsync(s,[i,n,o,r])}}catch(e){throw new Error(`Failed to update chat:
${a}
`+e)}finally{if(s)try{await stmtFinalizeAsync(s)}catch(e){console.error("Failed to finalize statement:",e)}await closeAsync(e)}return{status:"success"}}async function updateChatMessage(e){var{id:t,"old-message":a,"new-message":s,"new-type":r,"new-visibility":i,"new-meta":n}=e,o=s?s.match(/ {{GS-UUID}}/)?replaceGSUUIDs(s):s:null,l=connect(getDBPath());try{var d=await getMessage(l,t);if(!d)return{status:"failed",data:"Invalid message id "+t};var c=`
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
        `;try{let e=[t];if(!(await runAsync(l,c,e)).changes)return{status:"failed",data:"No matching message. Make sure the id and original message is correct."}}catch(e){throw new Error(`Failed to update chat:
${c}
`+e)}var m=n||d.meta,u=(o&&!isSearchableMessage(o)?m.searchable=!1:n&&(m.searchable=d.meta?.searchable||null),`
            UPDATE
                messages
            SET
                ${s?"message=?,":""}
                ${r?"type=?,":""}
                ${i?"visibility=?,":""}
                ${n||o?"meta = ?,":""}
                updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now'),
                modified_at = strftime('%Y-%m-%d %H:%M:%f', 'now')
            WHERE
                id = ?
                ${null==a?"":"AND message = ?"}
        `);try{let e=[];s&&e.push(o),r&&e.push(r),i&&e.push(i),(n||o)&&e.push(JSON.stringify(m)),e.push(t),null!=a&&e.push(a);var h=await runAsync(l,u,e);return h.changes?{status:"success",data:h}:{status:"failed",data:"No matching message. Make sure the id and original message is correct."}}catch(e){throw new Error(`Failed to update chat:
${u}
`+e)}}finally{await closeAsync(l)}}async function upateChatAnalysisMessages(a){var s=connect(getDBPath());try{let{"analyzer-id":i,analyses:e}=a;var r=e.map(e=>e.chatId),u=await(async(e,t)=>{let a=`
            SELECT
                id,
                main_model,
                meta
            FROM
                chats
            WHERE 
                id IN (${t.join(",")})
        `,s=null,r={};try{if(!(s=await allAsync(e,a)))return null;s.forEach((e,t)=>{e.meta&&(e.meta=JSON.parse(e.meta)),r[e.id]=e})}catch(e){throw console.error(`Failed to execute ${a}:
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
        `;try{var s=await allAsync(e,a);let t={};return s.forEach(e=>t[e.chat_id]=e.id),t}catch(e){throw console.error(`Failed to execute ${a}:
`+e.message),new Error("Server side error")}})(e,t);for(i in n)r[i].latestMessageId=n[i];return s})(s,r);let n={};if(u.forEach(e=>n[e.id]=e),u.length!==r.length)return{status:"failed",data:"One or more invalid chat ids"};var h=await getMessagesByChatIdAndType(s,r,i);let o={},l=(h.forEach(e=>o[e.chat_id]=e),{}),d=(e.forEach(e=>l[e.chatId]=e),[]),c=[],m=(new Date).toISOString();if(r.forEach(e=>{var t=n[e],a=o[e],s=l[e],e=n[e].meta||{},r=(e.tokens||(e.tokens={}),e.tokens.analysis||(e.tokens.analysis={}),estimateTokens(s.content));e.tokens.analysis[i]={estimate:r,estimatedAt:m},a?(a.message=s.content,a.meta=s.metadata,d.push(a)):(e=[i,"public",t.id,t.latestMessageId,,1,t.main_model,null,0,"assistant",s.content,JSON.stringify(s.metadata)],c.push(e))}),d.length){var g=`
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
                        id IN (${d.map(e=>e.id).join(",")})
            `;try{if(!(await runAsync(s,g)).changes)return{status:"failed",data:"No matching messages. Make sure the id is correct."}}catch(e){throw new Error(`Failed to update chat:
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
            `;let t=null;try{t=await prepareAsync(s,p);for(let e=0;e<d.length;e++){var{id:y,message:f,meta:E}=d[e];await stmtRunAsync(t,[f,JSON.stringify(E),y])}}catch(e){throw new Error(`Failed to update message:
${p}
`+e)}finally{if(t)try{await stmtFinalizeAsync(t)}catch(e){console.error("Failed to finalize statement:",e)}}}if(c.length){var w=`
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
            `;let t=null;try{t=await prepareAsync(s,w);for(let e=0;e<c.length;e++)await stmtRunAsync(t,c[e])}catch(e){throw new Error(`Failed to update message:
${w}
`+e)}finally{if(t)try{await stmtFinalizeAsync(t)}catch(e){console.error("Failed to finalize statement:",e)}}}var _=`
            UPDATE
                chats
            SET
                meta = ?,
                updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now')
            WHERE
                id = ?;
        `;let t=null;try{t=await prepareAsync(s,_);for(let e=0;e<r.length;e++){var v=r[e],S=n[r[e]].meta;await stmtRunAsync(t,[JSON.stringify(S),v])}}catch(e){throw new Error(`Failed to update message:
${_}
`+e)}finally{if(t)try{await stmtFinalizeAsync(t)}catch(e){console.error("Failed to finalize statement:",e)}}return{status:"success"}}catch(e){return console.error(e),{status:"failed",data:e.message}}finally{await closeAsync(s)}}async function updateChatName(e){let{uuid:t,model:a,"old-name":s,"new-name":r,suggest:i}=e;if(a&&i){var e=await getChatTitleSuggestion({uuid:t,model:a}),{status:n,data:o}=e;if("failed"===n)return e;r=o.title}n=`
        UPDATE
            chats
        SET
            name = ?,
            is_default_name = 0
        WHERE
            uuid = ?
            ${s?"AND name = ?":""}
    `,o=connect(getDBPath());try{let e=[r,t];return s&&e.push(s),(await runAsync(o,n,e)).changes?await getChat({uuid:t}):{status:"failed",data:"No matching chat. Make sure the uuid and original name is correct."}}catch(e){throw new Error(`Failed to update chat:
${n}
`+e)}finally{await closeAsync(o)}}function populateMessages(t,e){let i=[...e],n=(new Date).toISOString(),o="and the current date and time is",l=new RegExp(o+" \\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z.");return i.forEach((a,e)=>{if(i[e].content=a.content?a.content.replace(/{{gs-chat-datetime}}/g,n).replace(/{{gs-chat-llm-model}}/g,t).replace(l,o+" "+n+"."):"","assistant"===a.role){let e=0;for(;e<=20;){e++;var s=extractCodeBlocks(a.content,{silent:!0}).blocks;let t=-1;for(let e=0;e<s.length;e++){var r=s[e];if("gs-tool"===r.type){t=e;break}}if(-1===t)break;a.content=deleteCodeBlockByIndex(a.content,t)}}}),i}function generateUUID(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}function replaceGSUUIDs(e){return e.replace(/{{GS-UUID}}/g,generateUUID)}function isSearchableMessage(e){try{var t,a,s=extractCodeBlocks(e,{silent:!0}).blocks;return s&&1!==s.length?!0:(t=s[0].content,a=parseToolBlock(t),!(isToolBlock(t)&&"search"===a.tool))}catch{return!0}}module.exports={init:init,deleteData:deleteData,getData:getData,postData:postData,putData:putData,stream:stream};
