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

let{CodeBlockUtils,DomUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),updateConfig=require("../../../utils/updateConfig").updateConfig,SEARCH_TOOL=require("../../../constants").SEARCH_TOOL,{QUERY_OPTIMIZATION,SEARCH_EXECUTION_ORCHESTRATION,RESULTS_REVIEW_ORCHESTRATION,COMPLETED,ERROR}=require("../../../../common/gitsense/searchStates");class SearchProgressRenderer{constructor(e,r,s,t){if(!(e&&r&&s&&t))throw new Error("SearchProgressRenderer: Missing required constructor parameters.");this._message=e,this._config=r,this._context=s,this._contentBody=t,this._md=s.md,this._progressMarkdown="",this._initialize()}_initialize(){var e=this._config.states||[];let n="";var r=0<e.length?e[e.length-1]:null,r=(r&&r.error?n+=`## AI Search Failed

`:r&&"completed"===r.type&&r.finished_at?n+=`## AI Search Complete

`:n+=`## AI Search in Progress

`,this._config.instanceId,this._config.data?.searchCriteria?.query||"N/A"),s=this._config.data?.searchCriteria?.aiAssistant||"N/A";n=(n+=`**AI Assistant**: ${s}

`)+"```query\n"+r+"\n```\n\n"+`### Analysis

`,e.forEach(e=>{var r,s=e.finished_at?e.error?"[X]":"[✓]":"[ &nbsp; ]",t=this._getStageLabel(e.type);let a="";e.finished_at&&(r=this._getDuration(e.created_at,e.finished_at),a+=` (${r} seconds)`),e.error?a+=` (Error: ${e.error})`:e.finished_at||(a+="..."),n+=`- ${s} ${t}${a}
`}),this._progressMarkdown=n,this._updateMessage()}startStage(e){var e=this._getStageLabel(e),r=this._getLinesUpToStage(e),e=`- [ &nbsp; ] ${e}...
`;this._progressMarkdown=r.join("\n")+"\n"+e,this._updateMessage()}updateStageProgress(e,r){var e=this._getStageLabel(e),s=this._getLinesUpToStage(e);0<s.length?(s.push(`- [ &nbsp; ] ${e}... `+r),this._progressMarkdown=s.join("\n"),this._updateMessage()):console.warn("SearchProgressRenderer: Cannot update stage progress, no stage lines found.")}completeStage(e,r){var e=this._getStageLabel(e),s=this._getLinesUpToStage(e);0<s.length?(s.push(`- [✓] ${e}. `+r),this._progressMarkdown=s.join("\n"),this._updateMessage()):console.warn("SearchProgressRenderer: Cannot complete stage, no stage lines found.")}failStage(e,r){var e=this._getStageLabel(e),s=this._getLinesUpToStage(e);if(0<s.length)return r=r.substring(0,50)+(50<r.length?"...":""),s.push(`- [X] ${e} failed. (Error: ${r})`),this._progressMarkdown=s.join("\n"),e=this._renderDetailsSection(),this._progressMarkdown+=`

${e}

`,this._progressMarkdown=this._progressMarkdown.replace("## AI Search in Progress","## AI Search Failed"),this._updateMessage(),this._progressMarkdown;console.warn("SearchProgressRenderer: Cannot fail stage, no stage lines found.")}renderFinalAnswer(e){this._renderDetailsSection();return this._progressMarkdown+=`

`+e,this._progressMarkdown=this._progressMarkdown.replace("## AI Search in Progress","## AI Search Complete"),this._updateMessage(),this._progressMarkdown}renderError(e){console.error("SearchProgressRenderer: Rendering general error: "+e),this._progressMarkdown+=`
---

### Error

An unexpected error occurred:

\`\`\`
${e}
\`\`\`
`,this._progressMarkdown=this._progressMarkdown.replace("## AI Search in Progress","## AI Search Failed"),this._updateMessage()}_renderDetailsSection(){let e="#### Details\n\n";var r=this._config.states||[];let s=[];var t=r.find(e=>e.type===QUERY_OPTIMIZATION),t=(t&&t.thinking_chat&&t.thinking_chat.uuid&&(r.find(e=>e.type===SEARCH_EXECUTION_ORCHESTRATION)?.queries_to_execute?.length,s.push(`[Queries](/?board=gitsense-chat.app&chat=${t.thinking_chat.uuid})`)),r.find(e=>e.type===SEARCH_EXECUTION_ORCHESTRATION));return t&&t.raw_results_chat_uuid&&(t.progress?.totalMatches,s.push(`[Results](/?board=gitsense-chat.app&chat=${t.raw_results_chat_uuid})`)),r.filter(e=>e.type===RESULTS_REVIEW_ORCHESTRATION).forEach(e=>{e.reviews&&e.reviews.forEach((e,r)=>{r+=1;s.push(`[Review ${r}](/?board=gitsense-chat.app&chat=${e.uuid})`)})}),0<s.length?e+=s.join(" &nbsp; "):e+="No detailed information available.",e}_getStageLabel(e){switch(e){case QUERY_OPTIMIZATION:return"Optimizing query";case SEARCH_EXECUTION_ORCHESTRATION:return"Executing searches";case RESULTS_REVIEW_ORCHESTRATION:return"Reviewing results";case RESULTS_REVIEW_ORCHESTRATION+"2":return"Reviewing results pass 2";case RESULTS_REVIEW_ORCHESTRATION+"3":return"Reviewing results pass 3";case TINY_OVERVIEW_QUERY_OPTIMIZATION:return"Optimizing tiny overview query";case TINY_OVERVIEW_SEARCH_EXECUTION:return"Executing tiny overview search";case TINY_OVERVIEW_SEARCH_RESULTS_REVIEW:return"Reviewing tiny overview search results";default:throw new Error("Unrecognized stage type "+e)}}_getDuration(e,r){try{var s=new Date(e).getTime();return((new Date(r).getTime()-s)/1e3).toFixed(1)}catch(e){return console.error("SearchProgressRenderer: Error calculating duration:",e),"N/A"}}async _updateMessage(){this._message.message;var e=""+this._progressMarkdown,r=this._contentBody.cloneNode(!0);r.innerHTML=this._md.render(e);try{DomUtils.h.updateDOM(r,this._contentBody)}catch(e){console.error("SearchProgressRenderer: Error updating DOM:",e)}}_getLinesUpToStage(e){var r=this._progressMarkdown.trim().split("\n"),s=r[r.length-1];return s.includes("] "+e)&&!s.includes("seconds")&&r.pop(),r}}module.exports={SearchProgressRenderer:SearchProgressRenderer};
