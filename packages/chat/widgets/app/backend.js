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
 * Copyright (c) 2026 GitSense. All rights reserved.
 */

require("dotenv").config();let os=require("os"),path=require("path"),GSC_HOME=null,fs=(process.env.GSC_HOME?GSC_HOME=process.env.GSC_HOME:os.homedir()&&(process.env.GSC_HOME=GSC_HOME=path.resolve(os.homedir(),".gitsense")),console.log("Intialized GSC HOME: "+GSC_HOME),require("fs")),Anthropic=require("@anthropic-ai/sdk"),OpenAI=require("openai"),Cerebras=require("@cerebras/cerebras_cloud_sdk"),crypto=require("crypto"),sleep=require("util").promisify(setTimeout),{join,dirname}=require("path"),existsSync=require("fs").existsSync,ChatManager=require("@gitsense/gscb-git-tools").ChatManager,{init:initInit,models,providers,trees,readOptionsFile}=require("./init.js"),getDBPath=require("./db.js").getDBPath,{connect,closeAsync,allAsync,runAsync,prepareAsync,stmtFinalizeAsync,stmtRunAsync}=require("./sqlite.js"),Prompts=require("./prompts.js").Prompts,{search,generateSearchSystemPrompt,getSearchUserInstruction,getSearchHelp}=require("./components/search/backend/gitsense"),buildAnalyzeMenuOptions=require("./components/chat-builder/utils/analyzeMenuBuilder").buildAnalyzeMenuOptions,SUGGEST_CHAT_TITLE=require("./prompt-templates.js").SUGGEST_CHAT_TITLE,prepareIsolatedTree=require("./components/chat-builder/utils/treesUtils").prepareIsolatedTree,{extractCodeBlocks,fixTextCodeBlocks,removeCodeBlockMarkers,formatWithLineNumbers,removeLineNumbers,updateCodeBlockByIndex,deleteCodeBlockByIndex,getChatTemplateMessages:_getChatTemplateMessages,estimateTokens,isToolBlock,parseToolBlock,parseTraceableCodeHeaders}=require("@gitsense/gsc-utils"),AnalyzerUtils=require("@gitsense/gsc-utils").AnalyzerUtils,{DropzoneHandler,SSEStreamHandler}=require("./components/import-data/backend"),GSCCodeService=require("./components/cli-bridge/backend").GSCCodeService,ContractService=require("./components/cli-contract/backend").ContractService,SYSTEM_ROLE="system",USER_ROLE="user",ASSISTANT_ROLE="assistant",DEFAULT_GROUP_TYPE="regular",DEFAULT_PROMPT_TYPE="system",DEFAULT_CHAT_OWNER="everyone",DEFAULT_CHAT_TYPE="regular",DEFAULT_MSG_TYPE="regular",DEFAULT_CHAT_VISIBILITY="public",DEFAULT_MSG_VISIBILITY="public",STREAM_TIMEOUT=3e4,MAX_OUTPUT_TOKENS=4e3,ANALYZERS_BASE_PATH=path.resolve(GSC_HOME,"data","analyzers"),ENTERPRISE_BATCH_NOT_INSTALLED="Enterprise batch component not installed",dropzoneHandler=new DropzoneHandler(GSC_HOME),importDataStreamHandler=new SSEStreamHandler,gscCodeService=new GSCCodeService(GSC_HOME),enterpriseBatch=null,contractService=null,widget=null;async function init(e){widget=e;e=connect(getDBPath());try{await initInit(e);try{await(enterpriseBatch=require("@gitsense/gsc-enterprise-batch")).initialize({gscHome:GSC_HOME}),console.log("GitSense Chat Enteprise batch processing installed")}catch(e){console.log("GitSense Chat Enteprise batch processing not installed")}contractService=new ContractService}catch(e){console.log(e)}finally{await closeAsync(e)}}async function deleteData(e){var t=e.query.action;return"delete-analyzer"===t?deleteAnalyzer(e.query):"delete-chat"===t?deleteChat(e.query):"delete-chat-message"===t?deleteChatMessage(e.query):"delete-gsc-code"===t?deleteGSCCode(e.query):{status:"failed",data:{action:"Unrecognized action "+t}}}async function getData(e){var t,a,r=e.query.action;try{if("get-chat"===r)return await getChat(e.query);if("get-chat-ids"===r)return await getChatIds(e.query);if("get-chat-title-suggestion"===r)return await getChatTitleSuggestion(e.query);if("get-chats-in-trees"===r)return await getChatsInTrees(e.query);if("get-git-blob-chat-messages"===r)return await getGitBlobChatMessages(e.query);if("get-chat-analysis-messages"===r)return await getChatAnalysisMessages(e.query);if("get-chat-metadata"===r)return await getChatMetadata(e.query);if("get-cli-contract-info"===r)return await getCLIContractInfo(e.query);if("get-cli-contract-launch-list"===r)return await getCLIContractLaunchList(e.query);if("get-gsc-code-status"===r)return await getGSCCodeStatus(e.query);if("get-tiny-overview-chat-purpose"===r)return await getTinyOverviewChatPurpose(e.query);if("get-git-ref-chat-by-family-member"===r)return await getGitRefChatByFamilyMember(e.query);if("get-analyze-chat-menu-options"===r)return getAnalyzeChatMenuOptions(e.query);if("get-analyzers"===r)return getAnalyzers(e.query);if("get-analyzer-detail"===r)return getAnalyzerDetail(e.query);if("get-analyzer-schema"===r)return getAnalyzerSchema(e.query);if("get-chat-template-messages"===r)return getChatTemplateMessages(e.query);if("get-search-help"===r)return getSearchHelp(e.query);if("get-search-user-instructions"===r)return getSearchUserInstruction(e.query);if("get-options"===r)return getOptions();if("generate-search-system-prompt"===r)return t=readOptionsFile(),await generateSearchSystemPrompt(e.query,t);if("search"===r)return a=e.query?.query.includes("profile:git-nav")?readOptionsFile():null,await search(e.query,a);try{if("get-batch-group-chat-messages"===r){if(!enterpriseBatch)return{status:"failed",error:ENTERPRISE_BATCH_NOT_INSTALLED};var{"batch-job-id":s,"group-number":n}=e.query;try{s=parseInt(s),n=parseInt(n);return{success:!0,messages:await enterpriseBatch.getBatchGroupChatMessages(s,n)}}catch(e){return console.error(e),{success:!1,error:e.message}}}else if("get-batch-job-details"===r||"get-batch-job-details-with-worker-status"==r){if(!enterpriseBatch)return{status:"failed",error:ENTERPRISE_BATCH_NOT_INSTALLED};var i="get-batch-job-details"===r;try{var{"batch-job-id":o,"last-updated":c}=e.query,o=parseInt(o),l=await enterpriseBatch.getBatchJobDetails(o,c);return i?{success:!0,details:l}:{success:!0,data:{batchJobDetails:l,workerStatus:await enterpriseBatch.getWorkerStatus()}}}catch(e){return console.error(e),{success:!1,error:e.message}}}else if("get-scheduable-batch-providers"===r)return enterpriseBatch?{success:!0,providers:await enterpriseBatch.getScheduableBatchProviders()}:{success:!1,error:ENTERPRISE_BATCH_NOT_INSTALLED}}catch(e){return console.log(e),{success:!1,error:"Server side error"}}}catch(e){return console.error(e),{status:"failed",error:e.message}}return{status:"failed",data:{action:"Unrecognized action "+r}}}async function postData(e){var t=e.body.action;if("execute-gsc-cli-contract-launch"===t)try{var a=JSON.parse(e.body.payload);return await contractService.executeLaunch(a)}catch(e){return console.log(e),{success:!1,error:"Server side error"}}else{if("new-chat"===t)return newChat(e.body);if("new-chat-message"===t)return newChatMessage(e.body);if("new-chat-tree"===t)return newChatTree(e.body);if("validate-mapped-workspace"===t)try{var{uuid:r,authcode:s,messageId:n}=e.body;return await contractService.validateMappedWorkspace(r,n,s)}catch(e){return console.log(e),{success:!1,error:"Server side error"}}}if("cancel-batch-job"===t){if(!enterpriseBatch)return{status:"failed",error:ENTERPRISE_BATCH_NOT_INSTALLED};a=e.body["batch-job-id"];try{return await enterpriseBatch.cancelBatchJob(parseInt(a))}catch(e){return console.log(e),{status:"failed",error:e}}}else if("create-batch-job"===t){if(!enterpriseBatch)return{status:"failed",error:ENTERPRISE_BATCH_NOT_INSTALLED};var{batchType:r="unknown",batchGroups:n,analyzerId:s,modelName:a,processType:i="realtime",triggerChatId:o,temperature:c=0}=e.body;try{return{success:!0,...await enterpriseBatch.createBatchJob(r,n,{modelName:a,temperature:c},i,{analyzerId:s,triggerChatId:o})}}catch(e){return console.error(e),{success:!1,error:e.message}}}else if("create-gsc-code"===t){var{chatId:r,chatTitle:n,timeoutMinutes:a,parentMessageId:c,maxOutputSizeMB:i}=e.body;try{return gscCodeService.createGSCCode({chatId:r,chatTitle:n,timeoutMinutes:a,parentMessageId:c,maxOutputSizeMB:i})}catch(e){return console.error(e),{success:!1,error:"Server side error"}}}return{status:"failed",data:{action:"Unrecognized action "+t}}}async function putData(e){var t=e.body.action;if("clone-analyzer"===t)return cloneAnalyzer(e.body);if("save-analyzer"===t)return saveAnalyzer(e.body);if("save-import-data-files"===t)return saveImportDataFiles(e.body);if("update-chat"===t)return updateChat(e.body);if("update-chats"===t)return updateChats(e.body);if("update-chat-message"===t)return updateChatMessage(e.body);if("update-chat-analysis-messages"===t)return upateChatAnalysisMessages(e.body);if("update-chat-name"===t)return updateChatName(e.body);if("update-event-status"===t)try{return await contractService.updateEventStatus(e.body),{success:!0}}catch(e){return console.log("Failed to update events table: ",e),{success:!1,message:"Server side error"}}else if("reset-chat-message"===t)return resetChatMessage(e.body);if("reset-batch-job-group"===t){if(!enterpriseBatch)return{status:"failed",error:ENTERPRISE_BATCH_NOT_INSTALLED};var{"batch-job-id":e,"group-number":a}=e.body;try{return await enterpriseBatch.resetBatchGroup(parseInt(e),parseInt(a))}catch(e){return console.error(e),{success:!1,message:"Failed to reset batch group: "+e.message}}}return{status:"failed",data:{action:"Unrecognized action "+t}}}async function stream(c,l,a){let{"message-id":I,"chat-uuid":P,provider:s,"storage-id":r,task:e,command:n,authcode:i,"chat-id":o,"contract-uuid":t}=a;if(r)return importDataStreamHandler.handleStreamRequest(c,l);if("execute-command"===e&&t&&i&&n)return contractService.executeCommandStream({uuid:t,authcode:i,command:n,res:l});if("watch-events"===e&&t&&o)return contractService.watchEvents({uuid:t,chatId:o,res:l});let d=connect(getDBPath()),m=null;try{let{message:e,model:t,real_model:a,temperature:o}=m=await getMessage(d,I);if(null!=e)l.status(403).send({status:"failed",data:"Chat has already completed"});else{var u=readOptionsFile(),h=a||t,g=!!h.match(/^Fake/),p=!!h.match(/Notes/i);let e=null;if(g||p||s){var z=(e=g||p?{}:providers[s.toLowerCase()]).apiKeyName,y=z?process.env[z]:"";if(g||p||y){var E=models[h]?.providers||null;if(g||p||E){var _="number"==typeof u.maxChatCompletionSize?u.maxChatCompletionSize:-1;let t="number"==typeof u.maxOutputTokens?u.maxOutputTokens:MAX_OUTPUT_TOKENS,r=null,n=null,i=null;if(g||p)i=h;else for(let e=0;e<E.length;e++){var f=E[e];if(f.name.toLowerCase()===s.toLowerCase()){i=f.modelId,f.maxOutputTokens&&(t=f.maxOutputTokens),f.thinkingBudget&&(r=isNaN(f.thinkingBudget)?0:f.thinkingBudget),f.includeThoughts&&(n=f.includeThoughts||!1);break}}if(i){global.gschat||(global.gschat={streaming:{}});var w=P+"::"+h+"::"+o,G=global.gschat.streaming[w];if(G){var{startedAt:W,updatedAt:q}=G,Y=Date.now()-W,j=Date.now()-q;if(j<STREAM_TIMEOUT)return void l.status(400).send({status:"failed",data:`Streaming in progresss. Started ${Y}ms ago and last updated ${j}.`});console.warn(`The stream ${w} has not updated in over ${STREAM_TIMEOUT}ms`),delete global.gschat.streaming[w]}var S={startedAt:Date.now(),updatedAt:Date.now()};global.gschat.streaming[w]=S,console.log("Created streaming lock for "+w);try{var v=(await getMessageLineage(d,I)).filter(e=>"public"===e.visibility),J=v.map(e=>e.message),V=JSON.stringify(J).length;if(-1!==_&&_<V)await k(l,`Total chat completion payload message size (${V}) exceeds the maximum allowed character limit of ${_} characters.`);else{l.setHeader("Content-Type","text/event-stream"),l.setHeader("Cache-Control","no-cache"),l.setHeader("Connection","keep-alive"),l.flushHeaders();var Z="anthropic"===s.toLowerCase();if(g){var K=h;var X=v;let a=[],e=(X.forEach((e,t)=>{t!==X.length-1&&({role:t,message:e}=e,""!==e)&&a.push({role:t,content:e})}),Date.now()),t="This is a Fake LLM response.",r={content:t,done:!1};l.write(`id: ${e}
event: message
data: ${JSON.stringify(r)}

`),l.flush?.(),r={content:"",done:!0},l.write(`id: ${e}
event: message
data: ${JSON.stringify(r)}

`),l.flush?.(),l.write(`id: ${e}
event: complete
data: {}

`),l.end(),await B(t,K);void await 0}else if(p){var Q=h;var ee=v;let a=[],e=(ee.forEach((e,t)=>{t!==ee.length-1&&({role:t,message:e}=e,""!==e)&&a.push({role:t,content:e})}),Date.now()),t="This is a GitSense Notes response.",r={content:t,done:!1};l.write(`id: ${e}
event: message
data: ${JSON.stringify(r)}

`),l.flush?.(),r={content:"",done:!0},l.write(`id: ${e}
event: message
data: ${JSON.stringify(r)}

`),l.flush?.(),l.write(`id: ${e}
event: complete
data: {}

`),l.end(),await B(t,Q);void await 0}else{if(Z){var te=v,A=S,T=h,ae=o,N=i,re=t,se=y,ne=w;let a=null,r=[];te.forEach((e,t)=>{t!==te.length-1&&({role:t,message:e}=e,""!==e)&&(t===SYSTEM_ROLE?a=e:r.push({role:t,content:e}))});var C={messages:C=populateMessages(T,r),model:N,temperature:ae,max_tokens:re,stream:!0};a&&(N=populateMessages(T,[{content:a}]),C.system=N[0].content);try{c.setTimeout(3e4);var R=Date.now();let e=!1;c.on("close",()=>{e=!0});var D,O,ie,oe=new Anthropic({apiKey:se}),M=(console.log(`Starting stream ${ne}...`),{startedAt:(new Date).getTime()}),ce=await oe.messages.create(C);A.createdAt=Date.now(),A.payload=C;let t=!1,a="";for await(D of ce){if(A.updatedAt=Date.now(),e)break;if("content_block_delta"===D.type&&(O=D.delta.text||"")&&(a+=O,ie={content:O,done:!1},l.write(`id: ${R}
event: message
data: ${JSON.stringify(ie)}

`),l.flush?.()),"message_stop"===D.type){console.log("Finished streaming "+ne),l.write(`id: ${R}
event: message
data: {"done": true}

`),l.flush?.(),M.done=!0,M.stoppedAt=(new Date).getTime(),t=!0;break}}t||(M.incomplete=!0,M.stoppedAt=(new Date).getTime(),a+="\n\n---\nWarning: Incomplete response"),e||(l.write(`id: ${R}
event: complete
data: {}

`),l.end()),await B(a,T,M)}catch(e){console.error("Streaming error: "+e),await k(l,e.message),l.end()}}else{var le=e,de=v,L=S,b=h,ue=o,me=i,he=t,ge=r,pe=n,ye=y,Ee=w;let a=[],s=(de.forEach((e,t)=>{t!==de.length-1&&({role:t,message:e}=e,""!==e)&&a.push({role:t,content:e})}),populateMessages(b,a));try{c.setTimeout(3e4);let t=!1;c.on("close",e=>{t=!0});var U={model:me,temperature:ue,messages:s,stream:!0,max_tokens:he},_e=((ge||pe)&&(U.extra_body={google:{thinking_config:{thinking_budget:0,include_thoughts:pe}}}),"cerebras"===le.name.toLowerCase()),fe=(_e&&(U.reasoning_format="hidden"),_e?new Cerebras({apiKey:ye}):new OpenAI({apiKey:ye,baseURL:le.baseURL})),x={startedAt:(new Date).getTime()};let e=null;try{console.log(`Starting stream ${Ee}...`),e=await fe.chat.completions.create(U)}catch(e){return void await(console.error("Failed to create a stream:",e),e.message.includes("status code")&&(e.message+="\n\nPlease look up the error code with the provider to determine the problem."),await k(l,e.message,b),void l.end())}L.createdAt=Date.now(),L.payload=U;var F,we=Date.now();let a=!1,r="";for await(F of e){if(L.updatedAt=Date.now(),t)break;var $=F.choices[0]?.delta?.content||"",H=F.choices[0]?.finish_reason,Se=H&&"null"!==H&&"stop"===H,ve={content:$,done:Se};if($&&(r+=$),l.write(`id: ${we}
event: message
data: ${JSON.stringify(ve)}

`),l.flush?.(),Se){console.log("Finished streaming "+Ee),""===r.trim()&&(r="### WARNING\n\nThe LLM stopped without returning a response. If a response was expected, please try sending a `Try again` message."),x.done=!0,x.stoppedAt=(new Date).getTime(),a=!0;break}}a||(x.incomplete=!0,x.stoppedAt=(new Date).getTime(),r+="\n---\nWarning: Incomplete response"),t||(l.write(`id: ${we}
event: complete
data: {}

`),l.end()),await B(r,b,x)}catch(e){console.error("Streaming error:",e),await k(l,e.message),l.end()}}await 0}}}finally{console.log("Deleting streaming lock "+w),delete global.gschat.streaming[w]}}else l.status(500).send({status:"failed",data:`Server side error. No model identifier for ${h} by ${s} found.`})}else l.status(400).send({status:"failed",data:"No providers for the LLM "+h})}else await k(l,`No ${s} API key defined. Please define to chat with ${h}.`)}else l.status(400).send({status:"failed",data:{provider:"Missing provider information"}})}}finally{await closeAsync(d)}async function k(e,t,a){console.log("Stream error message",t);try{try{e.setHeader("Content-Type","text/event-stream"),e.setHeader("Cache-Control","no-cache"),e.setHeader("Connection","keep-alive"),e.flushHeaders()}catch(e){}var r=Date.now(),s={content:t,done:!1};e.write(`id: ${r}
event: message
data: ${JSON.stringify(s)}

`),e.flush?.(),s={content:"",done:!0},e.write(`id: ${r}
event: message
data: ${JSON.stringify(s)}

`),e.flush?.(),e.write(`id: ${r}
event: complete
data: {}

`),e.end(),await B(t,a),console.log("saved response")}catch(e){console.log(e.message)}}async function B(N,e,t){var a=N;let r=extractCodeBlocks(N,{silent:!0}).blocks||[];for(let e=0;e<r.length;e++){var s=r[e];s.index=e,s.header?.["Block-UUID"]&&(s=removeLineNumbers(s.headerText+"\n\n\n"+s.content),N=updateCodeBlockByIndex(N,e,s))}var n=new RegExp("Authored by [^\n]+\n*$"),n=(N=(N=fixTextCodeBlocks(replaceGSUUIDs(N)).text).replace(n,""),N=removeCodeBlockMarkers(N),isSearchableMessage(N+=`

Authored by LLM ${e||"N/A"} at `+(new Date).toUTCString())),e=crypto.createHash("sha256").update(N+m.created_at).digest("hex");let i=`
            UPDATE
                messages
            SET
                message = ?,
                original_message = ?,
                hash = ?,
                ${t?"chat_completion_stats = ?,":""}
                ${n?"":"meta = ?,"}
                job_id = NULL
            WHERE
                id = ?
        `;a=[N,a,e];t&&a.push(JSON.stringify(t)),n||a.push(JSON.stringify({searchable:!1})),a.push(I);try{await runAsync(d,i,a)}catch(e){throw new Error(`Failed to update chat message ${I}:
${i}
`+e)}if((r=(extractCodeBlocks(N,{silent:!0})||{}).blocks||[]).length){let v=parseTraceableCodeHeaders(N),A=!1,T=new Set;if((r=r.filter((c,l)=>{var{type:d,header:u,metadata:m,content:h}=c;if(u||m){c.index=l;var g="code"===d,p="patch"===d;let{Component:e,Description:t,Language:a,"Block-UUID":r,"Parent-UUID":s,"Source-Block-UUID":n,"Target-Block-UUID":i,"Target-Version":o}=g?u:m;if(!(g&&!u.Version||p&&!o)){var y,E,_,f,w,S=(g?u.Version:o).split(/\./);if(S&&3===S.length){if(!S.find(e=>isNaN(e)))return g?(w=r,r=crypto.randomUUID(),console.log(`Replaced Block-UUID ${w} with `+r)):(w=i,i=crypto.randomUUID(),console.log(`Replaced Target-Block-UUID ${w} with `+i)),w=h.trim(),{isTraceable:w,isNewVersion:y,currentParentUUID:E,newParentUUID:_,newBlockUUID:f}=(c.hash=crypto.createHash("sha256").update(h).digest("hex"),c.trimmedHash=crypto.createHash("sha256").update(w).digest("hex"),c.component=e||"None Provided",c.uuid=r||n+":"+i,c.parentUuid=s||n||"N/A",c.version=S.join("."),c.language=a||"None Provided",c.description=t||"None Provided",v[c.index]?.data||{}),w&&g?(y&&c.parentUuid!==_&&(console.log("WARNING: Parent UUID is not the same as the New Parent UUID as defined in the traceable code header text"),c.parentUuid=_),w=c.headerText.replace(/Block-UUID: [\w-]+\n/g,`Block-UUID: ${c.uuid}
`).replace(/Parent-UUID: [\w-]+\n/g,`Parent-UUID: ${c.parentUuid}
`)+"\n\n\n"+c.content,N=updateCodeBlockByIndex(N,l,w),A=!0):p&&(g=c.content.replace(/Target-Block-UUID: [\w-]+\n/g,`Target-Block-UUID: ${i}
`),N=updateCodeBlockByIndex(N,l,g),A=!0,T.add(c.uuid||i)),c.upsertParams=[I,d,c.uuid,"N/A"===c.parentUuid?null:c.parentUuid,c.component,c.description,c.language,c.hash,c.trimmedHash,h.length,S[0],S[1],S[2],JSON.stringify(u||m),h],c;console.warn(`Found the non number "${nonNumber}" in the version array. Ignoring code block.`)}else console.warn(`Expecting version array to contain a major, minor and patch value. Found "${JSON.stringify(S)}" instead. Ignoring code block.`)}}})).length){let u=await(async(e,a)=>{var r=`
                SELECT
                    uuid,
                    IFNULL(parent_uuid, 'N/A') parent_uuid,
                    component,
                    language,
                    major||'.'||minor||'.'||patch AS version,
                    hash,
                    trimmed_hash
                FROM
                    code_blocks
                WHERE
                    uuid IN (${a.map(e=>"?").join(",")})
            `;try{var s=await allAsync(e,r,a);let t={};return s.forEach(e=>{t[e.uuid]=e}),t}catch(e){throw new Error(`Failed to update chat message ${I}:
${i}
`+e)}})(d,[...T]);if(r.forEach(e=>{var t,a,r,s,n,i,o,c,l,d=u[e.uuid];d&&({type:t,uuid:a,parentUuid:l,component:r,version:s,language:n}=e,{parent_uuid:d,component:i,language:o,version:c}=d,d===l&&i===r&&c===s&&o===n||(A=!0,d=crypto.randomUUID(),"code"===t?(console.log(`Changing block uuid from ${a} to `+d),e.upsertParams[2]=d,l=e.headerText.replaceAll(a,d)+"\n\n\n"+e.content,N=(N=updateCodeBlockByIndex(N,e.index,l)).replaceAll("\n\nAuthored by LLM",`

> **WARNING:** The GitSense Chat server replaced the LLM generated Block-UUID in code block #${e.index+1} ${e.uuid} with "${d}" as it was not unique.

Authored By LLM`)):"patch"===t?console.log("TODO: We need to change the uuid for patch code block"):console.log("Unrecognized code block type "+t)))}),A){a[0]=N,a[2]=crypto.createHash("sha256").update(N+m.created_at).digest("hex");try{await runAsync(d,i,a)}catch(e){throw new Error(`Failed to update chat message ${I}:
${i}
`+e)}}var o=`
            INSERT INTO code_blocks (
                message_id,
                type,
                uuid,
                parent_uuid,
                component,
                description,
                language,
                hash,
                trimmed_hash,
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
                ?, -- description
                ?, -- language
                ?, -- hash
                ?, -- trimmed_hash
                ?, -- size
                ?, -- major
                ?, -- minor
                ?, -- patch
                ?, -- header
                ?, -- content
                strftime('%Y-%m-%dT%H:%M:%fZ', 'now'),
                strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
            )
            ON CONFLICT (message_id, uuid) DO UPDATE SET
                parent_uuid = excluded.parent_uuid,
                component = excluded.component,
                description = excluded.description,
                language = excluded.language,
                hash = excluded.hash,
                trimmed_hash = excluded.trimmed_hash,
                size = excluded.size,
                major = excluded.major,
                minor = excluded.minor,
                patch = excluded.patch,
                header = excluded.header,
                content = excluded.content,
                updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now');
        `;for(let e=0;e<r.length;e++){var c=r[e];try{await runAsync(d,o,c.upsertParams)}catch(e){throw new Error(`Failed to upsert code block:
${o}
`+e)}}}else console.log("No valid traceable code blocks")}else console.log("No code blocks")}}async function getChatCompletion(e,t,p,a){var r=models[t]?.providers||null;if(!r)throw new Error("No providers with the model "+t);readOptionsFile();r=r[0];r.maxOutputTokens||MAX_OUTPUT_TOKENS;let y=r.modelId;var r=r.name,s=providers[r],n="anthropic"===r.toLowerCase(),i=s.apiKeyName,o=i?process.env[i]:"";return null==o?{status:"failed",data:`No API key ${i} for ${r} defined`}:(n?async(r,s,n)=>{let i=r.name,e=new Anthropic({apiKey:n}),d=(new Date).getTime()/1e3,u=/You have reached your specified API usage limits/,o=(console.log("Using API key ..."+n.slice(40)),null),c=[];s.forEach((e,t)=>{var{role:e,content:a}=e;e===SYSTEM_ROLE?o=a:c.push({role:e,content:[{type:"text",text:a}]})}),r={messages:c,model:y,temperature:p,max_tokens:1e3,stream:!1},o&&(r.system=o);try{var{data:t,response:a}=await e.messages.create(r).withResponse(),l=a.headers,m=g(null,l),h=replaceGSUUIDs(t.content[0].text);return{success:!0,messages:s,response:h,rateLimit:m}}catch(e){var{status:n,headers:r,error:s}=e,s=s?s.error.message:null;console.error("Exception:\n"),console.error(e),s?(console.log("Error message"),console.error(s)):console.log("No error message");let t=null,a=null;return 400===n?s.match(u)?(t="Rate limit error",a=g(s,r)):t="Serious: Bad request error":401===n?t="Serious: Authentication error":403===n?t="Serious: Permission denied error":404===n?t="Serious: Not found error":413===n?t="Serious: Request exceeds the maximum allowed number of bytes.":429===n?(t="Rate limit error",a=g(s,r)):t=500<=n?i+" server error":"Serious: Unknown error",{success:!1,reason:t,rateLimit:a}}function g(e,t){let a=null,r=null,s=null,n=null,i=null,o=null,c=null,l=null;try{l=t.get?(a=new Date(t.get("date")).getTime()/1e3,r=parseInt(t.get("anthropic-ratelimit-requests-limit")),n=parseInt(t.get("anthropic-ratelimit-requests-remaining")),o=t.get("anthropic-ratelimit-requests-reset"),s=parseInt(t.get("anthropic-ratelimit-tokens-limit")),i=parseInt(t.get("anthropic-ratelimit-tokens-remaining")),c=t.get("anthropic-ratelimit-tokens-reset"),t.get("retry-after")):(a=new Date(t.date).getTime()/1e3,r=parseInt(t["anthropic-ratelimit-requests-limit"]),n=parseInt(t["anthropic-ratelimit-requests-remaining"]),o=t["anthropic-ratelimit-requests-reset"],s=parseInt(t["x-ratelimit-limit-tokens"]),i=parseInt(t["anthropic-ratelimit-tokens-remaining"]),c=t["anthropic-ratelimit-tokens-reset"],t["retry-after"])}catch(e){console.error("Failed to parse header: "+e.getMessage())}return e&&e.match(u)&&(l="60m"),{sentAtEpochTime:d,receivedAtEpochTime:a,limitRequests:r,limitTokens:s,limitRemainingRequests:n,limitRemainingTokens:i,limitResetRequests:o,limitResetTokens:c,retryAfter:l}}}:async(s,n,i)=>{let{name:d,baseURL:e}=s,t=new OpenAI({apiKey:i,baseURL:e}),u=(new Date).getTime()/1e3,m=/Please try again in ([^\.]+)./,h=/You exceeded your current quota/;try{console.log("Using API key ..."+i.slice(20));var a={messages:n,model:y,temperature:p,stream:!1},r=(await t.chat.completions.create(a).withResponse()).data;return{status:"success",data:replaceGSUUIDs(r.choices[0].message.content)}}catch(e){var{status:s,headers:i,error:n}=e;let t="No error message";n&&(n.message?t=n.message:n.error&&(t=n.error.message)),console.error("Request failed"),console.error(JSON.stringify(e,null,2)),console.error("Error message:"),console.error(t);let a=null,r=null;return 400===s?a="Serious: Bad request error":401===s?a="Serious: Authentication error":403===s?a="Serious: Permission denied error":404===s?a="Serious: Not found error":422===s?a="Serious: UnprocessableEntityError":429===s?(a="Rate limit error",r=((e,t)=>{console.log("Retrieving rate limit from the following response header:"),console.log(t),console.log("");let a=null,r=null,s=null,n=null,i=null,o=null,c=null,l=null;return l=t.get?(a=new Date(t.get("date")).getTime()/1e3,r=parseInt(t.get("x-ratelimit-limit-requests")),n=parseInt(t.get("x-ratelimit-remaining-requests")),o=t.get("x-ratelimit-reset-requests"),s=parseInt(t.get("x-ratelimit-limit-tokens")),i=parseInt(t.get("x-ratelimit-remaining-tokens")),c=t.get("x-ratelimit-reset-requests"),t.get("retry-after")):(a=new Date(t.date).getTime()/1e3,r=parseInt(t["x-ratelimit-limit-requests"]),n=parseInt(t["x-ratelimit-remaining-requests"]),o=t["x-ratelimit-reset-requests"],s=parseInt(t["x-ratelimit-limit-tokens"]),i=parseInt(t["x-ratelimit-remaining-tokens"]),c=t["x-ratelimit-reset-requests"],t["retry-after"]),e?"groq"===d?e.match(m)?(t=m.exec(e),l=t[1]):console.log("Error message did not match "+m):"openai"===d?e.match(h)&&(l="60m"):console.log("No message processor for provider "+d):console.log("No message provided"),{sentAtEpochTime:u,receivedAtEpochTime:a,limitRequests:r,limitTokens:s,limitRemainingRequests:n,limitRemainingTokens:i,limitResetRequests:o,limitResetTokens:c,retryAfter:l}})(t,i)):a=500<=s?d+" server error":"Serious: Unknown error",{success:!1,reason:a,rateLimit:r}}})(s,populateMessages(t,a),o)}async function getChat(e){var{id:t,uuid:a,model:r,"system-message-name":s,"group-id":n}=e,e=e["max-depth"]?parseInt(e["max-depth"]):1e4,i=connect(getDBPath());try{var o=a?await getChatPrivate(i,null,a):t?await getChatPrivate(i,t):n&&s&&r?await getChatPrivate(i,null,null,n,s,r):null;if(!o)return{status:"failed",data:"Not found"};var{id:c,parent_id:l}=o;(new Date).getTime();if(o.messages=await getChatMessages(i,c,r),l&&(o.lineage=await getChatLineage(i,c)),o.descendants=e?await getChatDescendants(i,c,e):null,e){var d=readOptionsFile().importData?.dropzone?.repoVisibilityDuration||null;if(d){let a=60*d*1e3,r=(new Date).getTime();o.descendants=o.descendants.filter(e=>{var t;return!(["git-repo","git-ref"].includes(e.type)&&e.group_name&&e.group_name.startsWith("GSC-Dropzone/"))||(t=new Date(e.updated_at).getTime(),r,r-t<a)?e:void 0})}}return{status:"success",data:{chat:o}}}finally{await closeAsync(i)}}async function getChatsInTrees(e){e=e["root-chat-ids"];if(!e)return{success:!1,error:"No root chat ids provided"};var e=e.split(","),t=e.filter(e=>!isNaN(e));if(t.length!==e.length)return{success:!1,error:"Not all root chat IDs are numbers"};var e=t.map(e=>"?"),a=connect(getDBPath());try{var r=`
            -- Get all chats in the tree with their UUIDs and last activity
            WITH RECURSIVE chat_tree AS (
              -- Base case: Root chat
              SELECT 
                c.id,
                c.uuid,
                c.name,
                c.parent_id,
                c.type,
                c.visibility,
                c.main_model,
                c.created_at,
                c.updated_at,
                c.modified_at
              FROM chats c
              WHERE c.id IN (${e.join(",")}) AND c.deleted = 0
              
              UNION ALL
              
              -- Recursive case: All descendants
              SELECT 
                c.id,
                c.uuid,
                c.name,
                c.parent_id,
                c.type,
                c.visibility,
                c.main_model,
                c.created_at,
                c.updated_at,
                c.modified_at
              FROM chats c
              JOIN chat_tree ct ON c.parent_id = ct.id
              WHERE c.deleted = 0
            ),
            
            -- Get last activity for each chat
            chat_activity AS (
              SELECT 
                chat_id,
                MAX(updated_at) as last_activity,
                COUNT(*) as message_count
              FROM messages
              WHERE deleted = 0 AND chat_id IN (SELECT id FROM chat_tree)
              GROUP BY chat_id
            )
            
            -- Final query with essential data
            SELECT 
              ct.*,
              ca.last_activity,
              ca.message_count,
              '/?chat=' || ct.uuid as chat_url
            FROM chat_tree ct
            LEFT JOIN chat_activity ca ON ct.id = ca.chat_id
            ORDER BY ct.created_at;
        `;return{success:!0,chats:await allAsync(a,r,t)}}catch(e){return console.error(e),{success:e,error:e.message}}finally{await closeAsync(a)}}async function getChatIds(e){e=e.uuids,e=e?e.split(","):[];if(0===e.length)return{status:success,data:[]};var t=e.map(()=>"?").join(","),a=connect(getDBPath());try{var r=`SELECT id FROM chats WHERE uuid IN (${t})`;return{status:"success",data:(await allAsync(a,r,e)).map(e=>e.id)}}finally{await closeAsync(a)}}async function getGitRefChatByFamilyMember(e){var{id:e,uuid:t}=e,a=connect(getDBPath());try{var r,s,n=await getChatPrivate(a,e);return n?(r=["git-ref","git-blob","git-tree"]).includes(n.type)?(s="git-ref"===n.type?n:await getGitRefChat(a,n.id))?(s.descendants=await getChatDescendants(a,s.id,void 0,!0),{status:"success",data:s}):{status:"failed",data:"Failed to retrieve the Git ref chat for the chat with the id "+n.id}:{status:"failed",data:"Invalid chat type. Expecting one of the following "+`${JSON.string(r.join(","))} but found ${n.type} instead`}:{status:"failed",data:`No chat with the provided ${e?"ID: "+e:"UUID: "+t} found`}}catch(e){return{status:"failed",data:e.message}}finally{await closeAsync(a)}}async function getChatPrivate(e,t,a,r,s,n){var i=[];let o=null;if(t)o="c.id = ?",i.push(t);else if(a)"repositories"===a?o="c.type = 'git-repos'":"intelligence-manifests"===a?o="c.type = 'intelligence-manifests-root'":(o="uuid = ?",i.push(a));else{if(!(r&&s&&n))return null;o="group_id = ? AND p.name = ? AND c.main_model = ?",i.push(r),i.push(s),i.push(n)}t=`
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
    `;try{var c,l=await allAsync(e,t,i);return l&&l.length?((c=l[0]).meta&&(c.meta=JSON.parse(c.meta)),c):null}catch(e){throw console.error(`Failed to execute ${t}:
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
`+e.message),new Error("Server side error")}}async function getChatTitleSuggestion(a){var{uuid:a,model:r}=a,s=connect(getDBPath());try{var n=await(async(e,t)=>{var a=`
            SELECT
                id,
                main_model
            FROM
                chats
            WHERE
                uuid = ?
        `;try{var r=[t],s=await allAsync(e,a,r);return s&&s.length?s[0]:null}catch(e){throw console.error(`Failed to execute ${a}:
`+e.message),new Error("Server side error")}})(s,a);if(!n)return{status:"failed",data:"Not found",code:404};var{id:i,main_model:o}=n,c=(await getChatMessages(s,i,o))[0];let e=SUGGEST_CHAT_TITLE.replace(/{{system}}/,null==c.message?"":`<system_prompt>${c.message}</system_prompt>`);var l;let t=null;e=("GitSense Notes"===o?(t=c.kids[0],e.replace(/{{user}}/,"")):(l=c.kids[0],t=l.kids[0],e.replace(/{{user}}/,`<user_message>${l.message}</user_message>`))).replace(/{{assistant}}/,`<assistant_message>${t.message}</assistant_message>`);var d=[{role:USER_ROLE,content:e}],u=await getChatCompletion(s,r,0,d),{status:m,data:h}=u;return"success"!==m?u:{status:"success",data:{title:h.trim()}}}finally{await closeAsync(s)}}async function getGitBlobChatMessages(e){var{"id-type":t,ids:a}=e;let r=e["working-directory"]||!1;if(r="true"===r.toLowerCase(),"chat"!==t)return{status:"failed",data:"Currently, only chat ids are supported",code:400};let s=[];try{a.split(",").forEach(e=>{if(isNaN(e))throw new Error(e+" is not a number");s.push(parseInt(e))})}catch(e){return{status:"failed",data:e.message,code:400}}let n=connect(getDBPath());try{var i,o=await(async()=>{var t=`
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
        `;try{var e=await allAsync(n,t);let r={};return e.forEach(e=>{var{id:e,meta:t,name:a}=e;r[e]=JSON.parse(t),r[e].fullName=a}),r}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}})(),c=await(async()=>{var t=`
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
        `;try{var e=await allAsync(n,t);let o={};return e.forEach(e=>{var{id:e,type:t,parent_id:a,chat_id:r,content:s,meta:n,updated_at:i}=e;o[r]={id:e,type:t,chat_id:r,parent_id:a,content:s,meta:JSON.parse(n),updated_at:i}}),o}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}})(),l={};for(i in c){var d=c[i];if(!d)return{status:"failed",data:"No Git blob message associated with chat ID: "+i};var u=o[i];if(!u)return{status:"failed",data:"No repository associated with chat ID: "+i};if(r){var m,h=path.join(u.path,d.meta.path);if(fs.existsSync(h))try{fs.lstatSync(h).isSymbolicLink()?(m=fs.readlinkSync(h),d.content=m):((t,e=1024)=>{var a=Math.min(t.length,e);for(let e=0;e<a;e++)if(0===t[e])return 1})(fs.readFileSync(h))?d.content="Binary File":d.content=fs.readFileSync(h,"utf8")}catch(e){console.error(`Error processing file ${h}:`,e)}}l[i]={repo:u,message:d}}return{status:"success",data:{chat2Result:l}}}finally{await closeAsync(n)}}async function getChatMetadata(e){e=e.ids;let t=[];try{e.split(",").forEach(e=>{if(isNaN(e))throw new Error(e+" is not a number");t.push(parseInt(e))})}catch(e){return{status:"failed",data:e.message,code:400}}e=connect(getDBPath());try{var r=`
            SELECT
                id,
                meta
            FROM
                chats c
            WHERE
                c.deleted = 0 AND
                c.id IN (${t.join(",")})
        `;let a=[];try{(await allAsync(e,r)).forEach(e=>{var{id:e,meta:t}=e;a.push({chat_id:e,meta:JSON.parse(t)})})}catch(e){throw console.error(`Failed to execute ${r}:
`+e.message),new Error("Server side error")}return{status:"success",data:a}}finally{await closeAsync(e)}}async function getTinyOverviewChatPurpose(e){e=e.ids;let r=[];try{e.split(",").forEach(e=>{if(isNaN(e))throw new Error(e+" is not a number");r.push(parseInt(e))})}catch(e){return{status:"failed",data:e.message,code:400}}let s=connect(getDBPath());try{var t,a=await(async()=>{var t=`
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
`+e.message),new Error("Server side error")}})(),n=((new Date).getTime(),await(async()=>{var a=`
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
`+e.message),new Error("Server side error")}})()),i={};for(t in n){var o=n[t];if(!o)return{status:"failed",data:`The provided id ${t} is not a valid chat id`};var c=a[t];if(!c)return{status:"failed",data:"No repository associated with chat ID: "+t};o.keywords=o?.message_meta?.extracted_metadata?.parent_keywords||[],o.message_content&&delete o.message_content,o.purpose=o.message_meta?.extracted_metadata?.purpose||null,delete o.message_meta,i[t]={overview:o,repo:c}}return{status:"success",data:{chat2Result:i}}}catch(e){return{status:"failed",data:e.message}}finally{await closeAsync(s)}}async function getChatAnalysisMessages(e){let{"id-type":t,ids:a,type:r}=e;if("chat"!==t)return{status:"failed",data:"Currently, only chat ids are supported",code:400};if("tiny"!==r&&"short"!==r&&"long"!==r)return{status:"failed",data:`Invalid type ${r}. Expected tiny, short or long.`,code:400};let s=[];try{a.split(",").forEach(e=>{if(isNaN(e))throw new Error(e+" is not a number");s.push(parseInt(e))})}catch(e){return{status:"failed",data:e.message,code:400}}let n=connect(getDBPath());try{var i,o=await(async()=>{var t=`
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
        `;try{var e=await allAsync(n,t);let r={};return e.forEach(e=>{var{id:e,meta:t,name:a}=e;r[e]=JSON.parse(t),r[e].fullName=a}),r}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}})(),c=await(async()=>{var t=`
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
        `;try{var e=await allAsync(n,t);let o={};return e.forEach(e=>{var{id:e,type:t,parent_id:a,chat_id:r,content:s,meta:n,updated_at:i}=e;o[r]={id:e,type:t,parent_id:a,chat_id:r,content:s,meta:JSON.parse(n),updated_at:i}}),console.log({chat2Message:o}),o}catch(e){throw console.error(`Failed to execute ${t}:
`+e.message),new Error("Server side error")}})(),l={};for(i in c){var d=c[i];if(!d)return{status:"failed",data:"No Git blob message associated with chat ID: "+i};var u=o[i];if(!u)return{status:"failed",data:"No repository associated with chat ID: "+i};l[i]={message:d,repo:u}}return{status:"success",data:{chat2Result:l}}}finally{await closeAsync(n)}}async function getChatTemplateMessages(e){var t,a,e=e.type;return e?(a=(t=e.startsWith("<GSC_HOME>/"))?e.replace("<GSC_HOME>",""+GSC_HOME):path.join(__dirname,"components","chat-builder","messages"),{status:"success",data:{messages:_getChatTemplateMessages(a,t?null:path.normalize(e))}}):{status:"failed",data:"No type specified",code:400}}async function getAnalyzeChatMenuOptions(e){try{return{status:"success",data:await buildAnalyzeMenuOptions(ANALYZERS_BASE_PATH)}}catch(e){return{status:"failed",data:e}}}async function getAnalyzers(e){var{"include-description":e,"include-insights":t}=e,r=t?connect(getDBPath()):null;try{var s=await AnalyzerUtils.getAnalyzers(ANALYZERS_BASE_PATH,{includeDescription:e});if(t){var n=s.map(e=>e.id),i=`
            SELECT
                m.type AS analyzer_id,
                COUNT(m.id) AS analyzed,
                MAX(m.updated_at) AS last_analysis,
                COUNT(DISTINCT(g.name)) AS repos
            FROM
                messages m,
                chats c,
                groups g
            WHERE
                m.deleted = 0 AND
                m.type IN (${n.map(e=>"?").join(",")}) AND
                m.chat_id = c.id AND
                c.group_id = g.id
            GROUP BY m.type ORDER BY m.type;
        `;let a={};try{(await allAsync(r,i,n)||[]).forEach(e=>{var t=e.analyzer_id;delete e.analyzer_id,a[t]=e})}catch(e){throw new Error(`Get analyzers insights error.
${i}
`+e)}s.forEach(e=>{e.insights=a[e.id]||{analyzed:0,last_analysis:null,repos:0}})}return{status:"success",data:s}}catch(e){return console.error(e),{status:"failed",data:e}}finally{r&&await closeAsync(r)}}async function getAnalyzerDetail(e){var e=e["analyzer-id"],t=connect(getDBPath()),r=`
        WITH analyzed_cte AS (
            WITH analyzer_messages AS (
                SELECT
                    chat_id,
                    json_extract(meta, '$.version') version,
                    json_extract(meta, '$.analyzer_model') analyzer_model,
                    json_extract(meta, '$.analyzed_at') analyzed_at
                FROM
                    messages
                WHERE
                    type = '${e}' AND
                    deleted = 0
            )
            SELECT
                chat_id,
                c.uuid chat_uuid,
                g.name AS repo,
                json_extract(c.meta, '$.refContext.refName') branch,
                json_extract(c.meta, '$.path') path,
                json_extract(c.meta, '$.commit.author') commit_author,
                json_extract(c.meta, '$.commit.timestamp') commit_time,
                version,
                analyzer_model,
                analyzed_at
            FROM
                chats c,
                groups g,
                analyzer_messages m
            WHERE
                c.id = m.chat_id AND
                c.group_id = g.id
        ),
        overview_cte AS (
            WITH analyzer_models AS (
                SELECT GROUP_CONCAT(analyzer_model, ',') analyzer_models FROM (
                    SELECT
                        DISTINCT analyzer_model
                    FROM
                        analyzed_cte
                ) AS t
            ),
            repos AS (
                SELECT GROUP_CONCAT(repo, ',') repos FROM (
                    SELECT
                        DISTINCT repo
                    FROM
                        analyzed_cte
                ) AS t
            ),
            stats AS (
                SELECT
                    COUNT(chat_id) AS total_analyzed,
                    MAX(analyzed_at) AS latest_analyzed_at
                FROM
                    analyzed_cte
            )
            SELECT
                stats.*,
                analyzer_models,
                repos
            FROM
                stats,
                analyzer_models,
                repos
        ),
        overview_json AS (
            SELECT json_object(
                'total_analyzed', total_analyzed,
                'latest_analyzed_at', latest_analyzed_at,
                'repos', repos,
                'analyzer_models', analyzer_models
            ) AS overview_json
            FROM overview_cte
        ),
        latest_cte AS (
            SELECT * FROM analyzed_cte ORDER BY analyzed_at DESC limit 100
        ),
        latest_json AS (
            SELECT json_object (
                'chat_id', chat_id,
                'chat_uuid', chat_uuid,
                'repo', repo,
                'branch', branch,
                'path', path,
                'commit', (
                    json_object(
                        'author', commit_author,
                        'timestamp', commit_time
                    )
                ),
                'version', version,
                'analyzer_model', analyzer_model,
                'analyzed_at', analyzed_at
            ) AS analyzed_json
            FROM
                latest_cte
        )
        SELECT json_object(
            'latest', (SELECT json_group_array(analyzed_json) from latest_json),
            'overview', (SELECT json_group_array(overview_json) from overview_json)
        ) AS result
    `;try{var s=await allAsync(t,r);let a=s[0]?JSON.parse(s[0].result):{};return a.latest.forEach((e,t)=>{a.latest[t]=JSON.parse(e)}),a.overview=JSON.parse(a.overview),a.schema=await AnalyzerUtils.getAnalyzerSchema(ANALYZERS_BASE_PATH,e),{status:"success",data:a}}catch(e){return console.error(e),{status:"failed",message:"Server side error"}}finally{await closeAsync(t)}}async function getAnalyzerSchema(e){e=e["analyzer-id"];try{return{status:"success",data:await AnalyzerUtils.getAnalyzerSchema(ANALYZERS_BASE_PATH,e)}}catch(e){return{status:"failed",data:e}}}async function getCLIContractInfo(e){var{uuid:e,authcode:t}=e;try{return await contractService.executeInfo(e,t)}catch(e){return e.toString().toLowerCase().includes("command not found")&&console.log(`WARNING: The GitSense Chat CLI (gsc) was not found. Install the binary in ${GSC_HOME}/bin`),{success:!1,message:e.toString()}}}async function getCLIContractLaunchList(e){e=e.uuid;try{return await contractService.executeLaunchList(e)}catch(e){return e.toString().toLowerCase().includes("command not found")&&console.log(`WARNING: The GitSense Chat CLI (gsc) was not found. Install the binary in ${GSC_HOME}/bin`),{success:!1,message:e.toString()}}}function getOptions(){try{let r=readOptionsFile();if(!r)return{status:"failed",message:"No config file found"};r.prompts&&(r.prompts=r.prompts.filter(e=>null==e.show||e.show));let s={};return r.providers&&r.providers.forEach(e=>s[e.name.toLowerCase()]=e.apiKeyName),r.models&&r.models.forEach((e,t)=>{var{name:e,providers:a}=e;e.match(/^---/)||(e=a[0].name,a=s[e.toLowerCase()],r.models[t].hasApiKey=!!process.env[a])}),{status:"success",data:r}}catch(e){return console.error(e),{status:"failed",message:"Server side error"}}}async function deleteAnalyzer(e){e=e["analyzer-id"];try{return await AnalyzerUtils.deleteAnalyzer(ANALYZERS_BASE_PATH,e),{status:"success"}}catch(e){return{status:"failed",data:e}}}async function deleteChat(a){var a=a.uuid,r=connect(getDBPath());try{var s=await(async(e,t)=>{var a=`
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
`+e.message),new Error("Server side error")}})(r,a);if(!s)return{success:!1,error:`No chat with the uuid ${a} found`};var{id:n,protected:i}=s;if(i)return{success:!1,error:"Protected chat. Remove protection and try again."};var o=`
            WITH RECURSIVE descendants(id, parent_id, protected) AS (
                -- Base case: the selected node
                SELECT
                    id,
                    parent_id,
                    protected
                FROM
                    chats
                WHERE
                    id = ?

                UNION ALL

                -- Recursive case: all descendants
                SELECT
                    c.id,
                    c.parent_id,
                    c.protected
                FROM
                    chats c
                JOIN descendants d ON c.parent_id = d.id
            )
            SELECT
                id,
                protected
            FROM
                descendants
        `;let e=null;try{e=await allAsync(r,o,[n])}catch(e){return console.error(`Failed to get descendant chat IDs for ${n}:
${o}
`+e),{success:!1,error:"Server side error"}}if(e.find(e=>e.protected))return{success:!1,error:"Chat has one or more protected descendant. Update descendants then try again."};var c=e.map(e=>e.id),l=e.map(e=>"?"),d=[`
            UPDATE
                chats
            SET
                deleted = 1,
                updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
            WHERE
                id IN (${l.join(",")})
        `,`
            UPDATE
                messages
            SET
                deleted = 1,
                updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
            WHERE
                chat_id IN (${l.join(",")})
        `];let t;try{for(t=0;t<d.length;t++){var u=await runAsync(r,d[t],c);if(0===t&&!u?.changes)return{success:!1,data:"No matching chat. Make sure the chat UUID is correct."}}}catch(e){var m=d[t];return console.error(`Failed to delete chat with uuid ${a}:
${m}
`+e),{success:!1,error:"Server side error"}}if("git-repo"===s.type||"git-repo-owner"===s.type){let t=[];if("git-repo"===s.type)t.push(s.group_id);else if("git-repo-owner"===s.type){var h=`
                SELECT
                    id
                FROM
                    groups
                WHERE
                    type='git-repo' AND
                    name LIKE '${s.name}/%'`;try{(await allAsync(r,h)).forEach(e=>t.push(e.id))}catch(e){return console.error(`Failed to group ids:
${h}
`+e),{success:!1,error:"Server side error"}}}var g=`DELETE FROM groups WHERE id IN (${t.join(",")})`;try{await runAsync(r,g)}catch(e){return console.error(`Failed to delete chat group ${s.group_id}:
${g}
`+err),{success:!1,error:"Server side error"}}}return{success:!0}}finally{await closeAsync(r)}}async function deleteChatMessage(e){var{"message-id":e,"include-descendants":t}=e,a=connect(getDBPath());try{var r=await getMessage(a,e);if(!r)return{success:!1,error:`No message with the ID ${e} found`};var s=await getShortChat(a,null,r.chat_id);if(!s)return{success:!1,error:`No chat with the ID '${r.chat_id}' found.`};var n=s.type.startsWith("git-"),i=1===s.protected;if(n&&i)return{success:!1,error:"Git messages cannot be deleted when the chat is protected"};var o=!(!r?.meta?.description||!r?.meta.extracted_metadata),c=o?await(async(e,t)=>{var a=`
            SELECT
                meta
            FROM
                chats
            WHERE
                id=?
        `;try{var r=await allAsync(e,a,[t]);if(!r||!r.length)return null;var s=r[0].meta;if(s)return JSON.parse(s)}catch(e){throw console.error(`Failed to execute ${a}:
`+e.message),new Error("Server side error")}return null})(a,r.chat_id):{},l=`
            UPDATE
                messages
            SET
                deleted = 1,
                updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
            WHERE
                id = ?
        `;try{if(!(await runAsync(a,l,[r.id])).changes)return{succes:!1,error:"No matching message. Make sure the id and original message is correct."};console.log("Deleted chat message with ID "+r.id)}catch(e){return console.error(`Failed to delete chat with ID ${r.id}:
${l}
`+e),{success:!1,error:"Server side error"}}var d=`UPDATE messages SET parent_id = ${r.parent_id} WHERE parent_id = ?`,u=JSON.parse(t)?"UPDATE messages SET deleted = 1 WHERE parent_id = ?":d;try{await runAsync(a,u,[r.id])}catch(e){throw new Error(`Failed to update chats with parent id ${r.parent_id}:
${detachMessage}
`+e)}return o&&c?.tokens?.analysis?.[r.type]&&(delete c.tokens?.analysis[r.type],await runAsync(a,"UPDATE chats SET meta=? WHERE id=?",[JSON.stringify(c),r.chat_id])),{success:!0}}catch(e){return console.error(e),{success:!1,error:"Server side error"}}finally{await closeAsync(a)}}async function deleteGSCCode(e){e=e.code;try{return await gscCodeService.deleteCode(e),{success:!0}}catch(e){return{status:"failed",data:e}}}async function newChat(e){let{type:a=DEFAULT_CHAT_TYPE,model:h,temperature:g,analysis:r={},name:s,"parent-id":n,"group-id":i,"group-name":o,"group-type":c,"system-message-name":l,"system-message":d,"user-message":p,"assistant-message":y,"prompt-type":E=DEFAULT_PROMPT_TYPE,"forked-from-message-id":_,"real-model":f,messages:w=[],metadata:S}=e;var v=connect(getDBPath());try{var A,T=crypto.randomUUID(),N=s||(a===DEFAULT_CHAT_TYPE?"chat":a)+"-"+T.split("-")[0],k=c||DEFAULT_GROUP_TYPE,I=o||T,B=DEFAULT_CHAT_OWNER;let e=null;e=i||(e=I!==T&&(A=await(async(e,t,a)=>{var r=`
            SELECT
                id,
                name
            FROM
                groups
            WHERE
                ${null!=t?"id = ?":"name = ?"}
        `,t=[null!=t?t:a];try{var s=await allAsync(e,r,t);return s.length?s[0]:null}catch(e){throw console.error(`Failed to execute ${r}:
`+e.message),new Error("Server side error")}})(v,null,I))?A.id:e)||await insertGroup(v,k,I);var P=n||0;let t=null;if(d)if(l){var C=new Prompts,R=C.computeHash(E,l,d);if(!(t=await getPrompt(v,null,R))||!t.id){var D=await C.insert(v,null,E,R,l,d);if(!D)throw new Error("No prompt created");t={id:D.id,content:D.prompt}}}else d={id:0,content:d};else t=await getPrompt(v,null,null,E,l);if(!t||void 0===t.id)throw new Error("No system prompt id defined");var O,z=w[0]?.created_at?w[0].created_at:null,G=w[0]?.updated_at?w[0].updated_at:null,M=await insertChat(v,a,DEFAULT_CHAT_VISIBILITY,T,B,N,0,P,e,t.id,h,S,s?0:1,_,z,G);w.length?(O=w[0]).role===SYSTEM_ROLE&&("<replace with system message>"===O.message||d&&l)&&(O.message=t.content):(w.push({role:SYSTEM_ROLE,message:t.content}),h.match(/Notes/)?w.push({role:ASSISTANT_ROLE,message:p}):(w.push({role:USER_ROLE,message:p}),w.push({role:ASSISTANT_ROLE,message:y})));let u=0,m=null;for(let d=0;d<w.length;d++){let{id:e,role:t,message:a,content:r,type:s,visibility:n,metadata:i,meta:o,created_at:c,updated_at:l}=w[d];if(t===SYSTEM_ROLE){var W=(await insertMessage(v,s||DEFAULT_MSG_TYPE,n||DEFAULT_MSG_VISIBILITY,M,u,null,null,null,null,t,null!=r?r:null!=a?a:null,i||o,e,c,l)).id;u=W}else if(t===USER_ROLE){var q=(await insertMessage(v,s||DEFAULT_MSG_TYPE,n||DEFAULT_MSG_VISIBILITY,M,u,null,null,null,null,t,null!=r?r:null!=a?a:null,i||o,e,c,l)).id;u=q}else{if(t!==ASSISTANT_ROLE)return{status:"failed",code:400,data:"Invalid message role "+t};var Y=(await insertMessage(v,s||DEFAULT_MSG_TYPE,n||DEFAULT_MSG_VISIBILITY,M,u,1,h,f,g,t,null!=r?r:null!=a?a:null,i||o,e,c,l)).id;m=u=Y}}var L,j,b,U,J,x,F,{type:$="",options:H={}}=r||{},V=($.match(/no error analysis/i),$.match(/validate/i)),Z=$.match(/compare/i);return $.match(/samples/i)?({samples:L,summarize:j,summarizer:b}=H,await newCompareSamplesAnalysis(v,m,L,b)):Z?({models:U,summarize:J,summarizer:x}=H,await newCompareModelsAnalysis(v,m,U,x)):V&&(F=H.models,await newValidateAnalysis(v,m,F)),await getChat({id:M})}finally{await closeAsync(v)}}async function getChatDescendants(e,t,a=1e4){var r=`
        WITH RECURSIVE matches AS (
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
                g.name group_name,
                g.meta group_meta,
                c.created_at,
                c.updated_at,
                1 AS depth -- Start at depth 1 for direct children
            FROM
                chats c,
                groups g
            WHERE
                deleted = 0 AND
                c.group_id = g.id AND
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
                g.name group_name,
                g.meta group_meta,
                c.created_at,
                c.updated_at,
                m.depth + 1 AS depth -- Increment depth for recursive steps
            FROM
                chats c,
                groups g
            INNER JOIN matches m ON m.id = c.parent_id
            WHERE
                c.deleted = 0 AND
                c.group_id = g.id AND
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
            group_name,
            group_meta,
            created_at,
            updated_at
        FROM matches
        WHERE id != ? -- Exclude the starting chat itself
        ORDER BY parent_id
    `;try{var s=[t,a,t],n=await allAsync(e,r,s);return n.forEach(e=>{e.meta&&(e.meta=JSON.parse(e.meta)),e.group_meta&&(e.group_meta=JSON.parse(e.group_meta))}),n}catch(e){throw console.error(`Failed to execute ${r}:
`+e.message),new Error("Server side error")}}async function getGitRefChat(e,t){e=await getChatLineage(e,t,!1);return e&&e.length?e.find(e=>"git-ref"===e.type):null}async function getGSCCodeStatus(e){e=e.code;try{return gscCodeService.getCodeStatus(e)}catch(e){return console.error(e),{success:!1,error:"Server side error"}}}async function insertGroup(e,t,a){var r=`
        INSERT INTO groups(
            type,
            name,
            created_at,
            updated_at
        ) VALUES (
            ?,
            ${null==a?"":"?,"}
            strftime('%Y-%m-%dT%H:%M:%fZ', 'now'),
            strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
        )
    `;try{return(await runAsync(e,r,[t,a])).lastInsertRowid}catch(e){throw new Error(`Failed to insert chat:
${r}
`+e)}}async function insertChat(e,t,a,r,s,n,i,o,c,l,d,u=null,m=0,h=null,g=null,p=null){g=g||"now",p=p||"now";var y=`
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
            meta,
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
            ?, -- meta
            ?, -- is_default_name
            ?, -- forked_from_msg_id
            strftime('%Y-%m-%dT%H:%M:%fZ', ?),
            strftime('%Y-%m-%dT%H:%M:%fZ', ?)
        )
    `;try{var E=[t,a,r,s,n,i,o,c,l,d,u?JSON.stringify(u):null,m,h,g,p];return(await runAsync(e,y,E)).lastInsertRowid}catch(e){throw new Error(`Failed to insert chat:
${y}
`+e)}}async function newChatMessage(a){var r,{"chat-id":a,"parent-id":s,model:n,temperature:i,role:o,message:c,"real-model":l,"reference-message-id":d,insert:u,meta:m,type:h,visibility:g}=a,p=connect(getDBPath());try{if(o===SYSTEM_ROLE)return{success:!1,code:400,error:"New system message not supported.  Create a new chat instead."};let e=null;if(d){if(o!==ASSISTANT_ROLE)return{success:!1,code:400,error:"Only assistant messages can be inserted above or below an existing message."};if("before"!==u&&"after"!==u)return{success:!1,code:400,error:"Only assistant messages can be inserted above or below an existing message."};if(!(e=await getMessage(p,d)))return{success:!1,code:400,data:`No reference message with the id ${d} found.`};if(e.chat_id!==parseInt(a))return{success:!1,code:400,error:"Reference message does not belong to chat #"+a}}let t=null;if(o===USER_ROLE){if(null==c)return{success:!1,code:400,error:"No message defined. User message cannot be empty"};var y=await insertMessage(p,h||DEFAULT_MSG_TYPE,g||DEFAULT_MSG_VISIBILITY,a,s,null,null,null,null,USER_ROLE,c);t=y.id}else o===ASSISTANT_ROLE&&(r=await insertMessage(p,h||DEFAULT_MSG_TYPE,g||DEFAULT_MSG_VISIBILITY,a,s,1,n,l,i,ASSISTANT_ROLE,c,m),t=r.id);if(e){var E=[];"before"===u?(E.push(`
                UPDATE
                    messages
                SET
                    parent_id = ${e.parent_id}  -- point to the reference message parent
                WHERE
                    id = ${t}
            `),E.push(`
                UPDATE
                    messages
                SET
                    parent_id = ${t}
                WHERE
                    id = ${e.id}
            `)):(E.push(`
                UPDATE
                    messages
                SET
                    parent_id = ${e.id}
                WHERE
                    id = ${t}
            `),E.push(`
                UPDATE
                    messages
                SET
                    parent_id = ${t}
                WHERE
                    id != ${t} AND
                    parent_id = ${e.id};
            `));for(let e=0;e<E.length;e++){var _=E[e];try{var{}=await runAsync(p,_)}catch(e){return console.rrror(`Failed to update messages:
${_}
`+e),{success:!1,error:"Server side error"}}}}return{success:!0,message:await getMessage(p,t)}}catch(e){return console.error(e),{success:!1,error:e.message}}finally{await closeAsync(p)}}async function newChatTree(e){let{tree:t,name:a,"parent-id":r=0,"system-message-name":s,model:n="GitSense Notes"}=e;if(!(e=trees.find(e=>e.name===t)))return{status:"failed",code:400,data:`No tree with the name "${t}" found`};var i=widget.staticURL.split("/"),i=(i.pop(),i.join("/")),e=prepareIsolatedTree(e,i);let v=/\{\{short-id(?:-(\d+))?\}\}/g,A=new Map,T=connect(getDBPath());try{var o=await getPrompt(T,null,null,DEFAULT_PROMPT_TYPE,s),c=await insertGroup(T,DEFAULT_GROUP_TYPE,crypto.randomUUID());try{var l=e.config.type||(t.match(/workspace/)?"workspace":t.match(/project/)?"project":"help"===t?"help":DEFAULT_CHAT_TYPE),d="help"===t||"demos"===t?t:DEFAULT_MSG_TYPE;return getChat({id:await async function a(e,r,t,s,n,i,o,c,l=!1){let{config:d,kids:u,messages:m,uuid:h}=e;if(!d)throw new Error(`No config associated with the tree "${e.name}"`);let{name:g,order:p=0}=d;let y=h||crypto.randomUUID();let E=1;let _=0;let f=await insertChat(T,"help"===r&&l?r+"-home":r,DEFAULT_CHAT_VISIBILITY,y,DEFAULT_CHAT_OWNER,t||g,p,n,s,i.id,o);let w=[{role:SYSTEM_ROLE,message:i.content},{role:USER_ROLE,message:""}];m.forEach(e=>{"help"!==r&&"demos"!==r||(e=e.replace(v,(e,t)=>{let a=t||"_default";return A.has(a)||A.set(a,N()),A.get(a)})),w.push({role:ASSISTANT_ROLE,message:e,model:o,temperature:_,type:c})});let S=0;for(let i=0;i<w.length;i++){let{role:e,type:t,message:a,model:r,temperature:s}=w[i],n=(await insertMessage(T,c,DEFAULT_MSG_VISIBILITY,f,S,1,r,null,s,e,a)).id;S=n}for(let t=0;t<u.length;t++){let e=u[t];await a(e,e.config.type||r,null,s,f,i,o,c)}return f}(e,l,a,c,r,o,n,d,!0)})}catch(e){return console.error("Failed to create tree: ",e),{status:"failed",data:"Server side error"}}}finally{await closeAsync(T)}function N(){return""+Math.random().toString(36).substring(2,8)}}async function newCompareSamplesAnalysis(a,e,s,r){var n=await getMessage(a,e);if(!n)throw new Error(`No message with the id ${e} found`);let{id:i,chat_id:o,parent_id:c,model:l,temperature:d,role:u}=n;e=await getMessageSiblings(a,n);let m=1,h=[];e.forEach(e=>{var{id:e,model:a,sample:r}=e;s<r||l!==a||d!==t||(r>m&&(m=r),h.push(e))});for(let e=m+1;e<=s;e++){var g=await insertMessage(a,DEFAULT_MSG_TYPE,DEFAULT_MSG_VISIBILTY,o,c,e,l,null,d,u);h.push(g.id)}h.push(i),h.sort((e,t)=>e-t);var n="samples-summary",e=JSON.stringify(h),p=await getAnalysis(a,null,o,n,e,"",r,1);return p||insertAnalysis(a,o,n,e,"",r)}async function newCompareModelsAnalysis(a,e,r,t){let s=await getMessage(a,e);if(!s)throw new Error(`No message with the id ${e} found`);e=await getMessageSiblings(a,s);let n={};e.forEach(e=>{var{model:t,sample:a}=e;1===a&&(n[t]=e)});var{id:e,chat_id:i,parent_id:o,temperature:c,role:l}=s,d=[e];for(let t=0;t<r.length;t++){var u=r[t];let e=n[u];e||(u=await insertMessage(a,DEFAULT_MSG_TYPE,DEFAULT_MSG_VISIBILTY,i,o,1,u,null,c,l),d.push(u.id))}d.sort((e,t)=>e-t);var e="models-summary",m=JSON.stringify(d),h=await getAnalysis(a,null,i,e,m,"",t,1);return h||insertAnalysis(a,i,e,m,"",t)}async function newValidateAnalysis(t,e,a){var r=await getMessage(t,e);if(!r)throw new Error(`No message with the id ${e} found`);e=await(async(e,t,a)=>{var{chat_id:t,id:r}=t,s=`
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
`+e.message),new Error("Server side error")}})(t,r,a);let s={};e.forEach(e=>s[e.model]=e);var{id:e,chat_id:n}=r,i=`[${e}]`,o=[];for(let e=0;e<a.length;e++){var c=a[e],l=s[c];l?o.push(l.id):(l=await insertAnalysis(t,n,"validate",i,"",c),console.log("Inserted new validate analysis "+l.id),o.push(l.id))}o.sort((e,t)=>e-t);var r=JSON.stringify(o),e="validate-summary",d=await getAnalysis(t,null,n,e,"",r);return d||insertAnalysis(t,n,e,"",r)}async function getPrompt(e,t,a,r,s){var n={id:0,content:""};if(null==t&&null==a&&null==s)return n;var i=[];let o=null;null!=t?(o="id = ?",i.push(t)):a?(o="hash = ?",i.push(a)):(o="type = ? AND name = ?",i.push(r),i.push(s));t=`
        SELECT
            id,
            prompt
        FROM
            prompts
        WHERE
            ${o}
        ORDER BY id DESC LIMIT 1
    `;try{var c=await allAsync(e,t,i);if(c&&c.length){let{id:e,name:t,prompt:a}=c[0];return{id:e,name:t,content:a}}return n}catch(e){throw console.error(`Failed to execute ${t}:
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
            meta,
            created_at,
            updated_at
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
            meta,
            created_at
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
    `;try{let n={},i=[];var s=[t,a,t];return(await allAsync(e,r,s)).forEach(e=>{var{id:t,parent_id:a,model:r,meta:s}=e,s=(e.meta=s?JSON.parse(s):{},n[t]),t=(s||(s=[],n[t]=s,e.kids=s),n[a]);t&&(r&&r===o?(e.main=!0,t.unshift(e)):(e.main=!1,t.push(e))),0===a&&i.push(e)}),i}catch(e){throw console.error(`Failed to execute ${r}:
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
    `;let n=null;try{n=await allAsync(e,s,[t,a,r])}catch(e){throw console.error(`Failed to execute ${s}:
`+e.message),new Error("Server side error")}return n||[]}async function insertMessage(e,t,a,r,s,n,i,o=null,c,l,d=null,u=null,m,h,g){var p=(new Date).toISOString(),p=(h=h||p,g=g||p,crypto.createHash("sha256").update(d+h).digest("hex")),y=`
        INSERT INTO messages(
            type,
            deleted,
            visibility,
            chat_id,
            parent_id,
            level,
            hash,
            sample,
            model,
            real_model,
            temperature,
            role,
            message,
            meta,
            copied_from_msg_id,
            created_at,
            updated_at
        ) VALUES (
            ?, -- type
            0, -- deleted
            ?, -- visibility,
            ?, -- chat_id
            ?, -- parent_id
            (SELECT IFNULL((SELECT level FROM messages WHERE id = ?), -1) + 1), -- level
            ?, -- hash
            ?, -- sample
            ?, -- model
            ?, -- real_model
            ?, -- temperature
            ?, -- role
            ?, -- message
            ?, -- meta,
            ?, -- copied_from_msg_id,
            ?, -- created_at,
            ?  -- updated_at
        )
    `,E=!d||isSearchableMessage(d),E=(u&&!E?u.searchable=!1:E||(u={searchable:!1}),[t,a,r,s,s,p,n,i,o,c,l,d,u?JSON.stringify(u):null,m||null,h,g]);let _=null;try{if(!(_=await runAsync(e,y,E)).changes)throw new Error("No changes after insert message")}catch(e){throw console.log("Failed to insert the following message:"),console.log(JSON.stringify({params:E},null,2)),new Error(`Failed to insert message:
${y}
${JSON.stringify(E)}
`+e)}return getMessage(e,_.lastInsertRowid)}async function getAnalysis(e,t,a,r,s,n,i,o=0,c=1){let l=`
        SELECT
            id,
            message_ids,
            analysis_ids,
            message,
            response
        FROM
            analysis
        WHERE
    `,d=null,u=(d=t?(l+=`
            id = ?
        `,[t]):(l+=`
            chat_id = ? AND
            type = ? AND
            message_ids = ? AND
            analysis_ids = ? AND
            model = ? AND
            temperature = ? AND
            sample = ?
        `,[a,r,s,n,i,o,c]),null);try{u=await allAsync(e,l,d)}catch(e){throw console.error(`Failed to execute ${l}:
`+e.message),new Error("Server side error")}return u?u[0]:null}async function insertAnalysis(e,t,a,r,s,n="",i=1,o=0){var c=`
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
            strftime('%Y-%m-%dT%H:%M:%fZ', 'now'),
            strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
        )
    `,t=[t,a,r,s,i,n,o];try{return await getAnalysis(e,(await runAsync(e,c,t)).lastInsertRowid)}catch(e){throw new Error(`Failed to insert chat:
${c}
`+e)}}async function resetChatMessage(e){var e=e.id,t=`
        UPDATE
            messages
        SET
            message = NULL,
            meta=null,
            modified_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
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
`+e)}return{status:"success"}}finally{await closeAsync(r)}}async function cloneAnalyzer(e){var{"analyzer-id":e,"new-analyzer-name":t,label:a,description:r}=e;try{var s=await AnalyzerUtils.cloneAnalyzer(ANALYZERS_BASE_PATH,e,t,{label:a,description:r});return s.success?s:{success:!1,error:cloneResult.message}}catch(e){return console.error(e),{success:!1,data:"Server side error"}}}async function saveAnalyzer(e){var{"analyzer-id":e,instructions:t}=e;try{return await AnalyzerUtils.saveConfiguration(ANALYZERS_BASE_PATH,e,t),{status:"success"}}catch(e){return console.log(e),{status:"failed",data:e}}}async function updateAnalyzer(e){var{"analyzer-id":e,name:t,label:a,description:r}=e;try{var s=AnalyzerUtils.updateAnalyzer(ANALYZERS_BASE_PATH,e,{name:t,label:a,description:r});return s.success?{success:!0,data:s.message}:{success:!1,error:s.message}}catch(e){return console.log(e),{status:"failed",data:e}}}async function updateChat(e){var{uuid:e,name:t,parentId:a}=e,r=connect(getDBPath()),s=[],n=[],t=(t&&(s.push("name = ?"),n.push(t)),null!=a&&(s.push("parent_id = ?"),n.push(a)),n.push(e),`
        UPDATE chats
        SET ${s.join(",")}
        WHERE uuid = ?
    `);try{return await runAsync(r,t,n),getChat({uuid:e})}catch(e){console.error(`Failed to update chat:
${t}
`+e)}finally{await closeAsync(r)}return{status:"success"}}async function updateChats(e){var t=e.chats,e=connect(getDBPath()),a=`
        UPDATE
            chats
        SET
            parent_id = ?,
            name = ?,
            order_weight = ?
        WHERE
            id = ?
    `;let r=null;try{r=await prepareAsync(e,a);for(let e=0;e<t.length;e++){var{id:s,parent_id:n,name:i,order_weight:o=0}=t[e];await stmtRunAsync(r,[n,i,o,s])}}catch(e){return console.error(`Failed to update chats:
${a}
`+e),{status:"failed",data:"Server side error"}}finally{if(r)try{await stmtFinalizeAsync(r)}catch(e){console.error("Failed to finalize statement:",e)}await closeAsync(e)}return{status:"success"}}async function updateChatMessage(e){var{id:t,"old-message":a,"new-message":r,"new-type":s,"new-visibility":n,"new-meta":i,"new-parent-id":o}=e,c=null!=r?r.match(/: {{GS-UUID}}\s*\n/)||r.match(/": "{{GS-UUID}}"/)?replaceGSUUIDs(r):r:null,l=connect(getDBPath());try{var d=await getMessage(l,t);if(!d)return{success:!1,error:"Invalid message id "+t};var u=await getShortChat(l,null,d.chat_id);if(!u)return{success:!1,error:`No chat with the ID '${d.chat_id}' found.`};var m=u.type.startsWith("git-"),h=1===u.protected;if(m&&h)return{success:!1,error:"Git messages cannot be updated when the chat is protected"};var g=`
            INSERT INTO message_history(
                id,
                type,
                deleted,
                visibility,
                chat_id,
                parent_id,
                level,
                hash,
                message,
                chat_completion_stats,
                meta,
                created_at,
                updated_at,
                modified_at
            ) SELECT
                id,
                type,
                deleted,
                visibility,
                chat_id,
                parent_id,
                level,
                hash,
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
        `;try{let e=[t];if(!(await runAsync(l,g,e)).changes)return{success:!1,error:"No matching message. Make sure the id and original message is correct."}}catch(e){throw new Error(`Failed to update chat:
${g}
`+e)}var p=i||d.meta,y=(c&&!isSearchableMessage(c)?p.searchable=!1:i&&(p.searchable=d.meta?.searchable||null),`
            UPDATE
                messages
            SET
                ${r?"message=?,":""}
                ${s?"type=?,":""}
                ${n?"visibility=?,":""}
                ${i||c?"meta = ?,":""}
                ${"number"==typeof o&&0<=o?"parent_id = ?,":""}
                updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now'),
                modified_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
            WHERE
                id = ?
                ${null==a?"":"AND message = ?"}
        `);try{let e=[];r&&e.push(c),s&&e.push(s),n&&e.push(n),(i||c)&&e.push(JSON.stringify(p)),"number"==typeof o&&0<=o&&e.push(o),e.push(t),null!=a&&e.push(a);var E=await runAsync(l,y,e);return E.changes?(E.oldMessage=d,E.newMessage=await getMessage(l,t),{success:!0,...E}):{success:!1,error:"No matching message. Make sure the id and original message is correct."}}catch(e){return console.error(`Failed to update chat:
${y}
`+e),{success:!1,error:"Server side error"}}}finally{await closeAsync(l)}}async function updateChatName(e){let{uuid:t,model:a,"old-name":r,"new-name":s,suggest:n}=e;if(a&&n){var e=await getChatTitleSuggestion({uuid:t,model:a}),{status:i,data:o}=e;if("failed"===i)return{success:!1,error:e.data};s=o.title}i=`
        UPDATE
            chats
        SET
            name = ?,
            is_default_name = 0
        WHERE
            uuid = ?
            ${r?"AND name = ?":""}
    `,o=connect(getDBPath());try{var c=await getShortChat(o,t);if(!c)return{success:!1,error:`No chat with the UUID '${t}' found.`};if(c.protected)return{success:!1,error:"Protected chat - rename disabled."};let e=[s,t];return r&&e.push(r),(await runAsync(o,i,e)).changes?{success:!0,chat:(await getChat({uuid:t})).data.chat}:{success:!1,error:"No matching chat. Make sure the uuid and original name is correct."}}catch(e){return console.error(`Failed to update chat:
${i}
`+e),{success:!1,error:"Server side error"}}finally{await closeAsync(o)}}async function upateChatAnalysisMessages(a){var r=connect(getDBPath());try{let{"analyzer-id":n,analyses:e}=a;var s=e.map(e=>e.chatId),m=await(async(e,t)=>{let a=`
            SELECT
                id,
                main_model,
                meta
            FROM
                chats
            WHERE
                id IN (${t.join(",")})
        `,r=null,s={};try{if(!(r=await allAsync(e,a)))return null;r.forEach((e,t)=>{e.meta&&(e.meta=JSON.parse(e.meta)),s[e.id]=e})}catch(e){throw console.error(`Failed to execute ${a}:
`+e.message),new Error("Server side error")}var n,i=await(async(e,a)=>{a=`
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
`+e.message),new Error("Server side error")}})(e,t);for(n in i)s[n].latestMessageId=i[n];return r})(r,s);let i={};if(m.forEach(e=>i[e.id]=e),m.length!==s.length)return{status:"failed",data:"One or more invalid chat ids"};var h=await getMessagesByChatIdAndType(r,s,n);let o={},c=(h.forEach(e=>o[e.chat_id]=e),{}),l=(e.forEach(e=>c[e.chatId]=e),[]),d=[],u=(new Date).toISOString();if(s.forEach(e=>{var t=i[e],a=o[e],r=c[e],e=i[e].meta||{},s=(e.tokens||(e.tokens={}),e.tokens.analysis||(e.tokens.analysis={}),estimateTokens(r.content));e.tokens.analysis[n]={estimate:s,estimatedAt:u},a?(a.message=r.content,a.meta=r.metadata,l.push(a)):(e=crypto.createHash("sha256").update(r.content+u).digest("hex"),s=[n,"public",t.id,t.latestMessageId,t.latestMessageId,e,1,t.main_model,null,0,"assistant",r.content,JSON.stringify(r.metadata),u,u],d.push(s))}),l.length){var g=`
                INSERT INTO message_history
                    SELECT
                        id,
                        type,
                        deleted,
                        visibility,
                        chat_id,
                        parent_id,
                        level,
                        hash,
                        message,
                        chat_completion_stats,
                        meta,
                        created_at,
                        updated_at,
                        modified_at
                    FROM
                        messages
                    WHERE
                        id IN (${l.map(e=>e.id).join(",")})
            `;try{if(!(await runAsync(r,g)).changes)return{status:"failed",data:"No matching messages. Make sure the id is correct."}}catch(e){throw new Error(`Failed to update chat:
${g}
`+e)}var p=`
                UPDATE
                    messages
                SET
                    message = ?,
                    meta = ?,
                    updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now'),
                    modified_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
                WHERE
                    id = ?;
            `;let t=null;try{t=await prepareAsync(r,p);for(let e=0;e<l.length;e++){var{id:y,message:E,meta:_}=l[e];await stmtRunAsync(t,[E,JSON.stringify(_),y])}}catch(e){throw new Error(`Failed to update message:
${p}
`+e)}finally{if(t)try{await stmtFinalizeAsync(t)}catch(e){console.error("Failed to finalize statement:",e)}}}if(d.length){var f=`
                INSERT INTO messages(
                    type,
                    deleted,
                    visibility,
                    chat_id,
                    parent_id,
                    level,
                    hash,
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
                    ?, -- hash
                    ?, -- sample
                    ?, -- model
                    ?, -- real_model
                    ?, -- temperature
                    ?, -- role
                    ?, -- message
                    ?, -- meta
                    ?, -- created_at
                    ?  -- updated_at
                )
            `;let t=null;try{t=await prepareAsync(r,f);for(let e=0;e<d.length;e++)await stmtRunAsync(t,d[e])}catch(e){throw new Error(`Failed to insert new message:
${f}
`+e)}finally{if(t)try{await stmtFinalizeAsync(t)}catch(e){console.error("Failed to finalize statement:",e)}}}var w=`
            UPDATE
                chats
            SET
                meta = ?,
                updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
            WHERE
                id = ?;
        `;let t=null;try{t=await prepareAsync(r,w);for(let e=0;e<s.length;e++){var S=s[e],v=i[s[e]].meta;await stmtRunAsync(t,[JSON.stringify(v),S])}}catch(e){throw new Error(`Failed to update message:
${w}
`+e)}finally{if(t)try{await stmtFinalizeAsync(t)}catch(e){console.error("Failed to finalize statement:",e)}}return{status:"success"}}catch(e){return console.error(e),{status:"failed",data:e.message}}finally{await closeAsync(r)}}async function saveImportDataFiles(e){try{var t=e.files,a=e.options,r=await dropzoneHandler.handleFileUpload(t,a);return r.success?{success:!0,storageId:r.storageId}:{success:!1,error:r.error}}catch(e){console.error("Error in uploadFiles function:",e),res.status(500).json({status:"failed",error:"Internal server error"})}}async function getShortChat(e,t,a){var r=`
        SELECT 
            id, 
            type,
            name,
            protected 
        FROM 
            chats 
        WHERE 
            ${t?"uuid=?":"id=?"}
    `;try{return(await allAsync(e,r,[t||a]))[0]}catch(e){throw new Error(`Failed to execute ${r}:
`+e.message)}}function populateMessages(t,e){let n=[...e],i=(new Date).toISOString(),o="and the current date and time is",c=new RegExp(o+" \\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z.");return n.forEach((a,e)=>{if(n[e].content=a.content?a.content.replace(/{{gs-chat-datetime}}/g,i).replace(/{{gs-chat-llm-model}}/g,t).replace(c,o+" "+i+"."):"","assistant"===a.role){let e=0;for(;e<=20;){e++;var r=extractCodeBlocks(a.content,{silent:!0}).blocks;let t=-1;for(let e=0;e<r.length;e++){var s=r[e];if("gs-tool"===s.type){t=e;break}}if(-1===t)break;a.content=deleteCodeBlockByIndex(a.content,t)}}}),n}function generateUUID(){return": xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx\n".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}function generateJsonUuid(){return'": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"'.replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}function replaceGSUUIDs(e){return e.replace(/: {{GS-UUID}}\s*\n/g,generateUUID).replace(/": "{{GS-UUID}}"/g,generateJsonUuid)}function isSearchableMessage(e){try{var t,a,r=extractCodeBlocks(e,{silent:!0}).blocks;return r&&1!==r.length?!0:(t=r[0].content,a=parseToolBlock(t),!(isToolBlock(t)&&"search"===a.tool))}catch{return!0}}module.exports={init:init,deleteData:deleteData,getData:getData,postData:postData,putData:putData,stream:stream};
