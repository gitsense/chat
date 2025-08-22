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

let ChatUtils=require("@gitsense/gsc-utils").ChatUtils,{TOKEN_LIMIT_TINY_OVERVIEWS_STAGE,TOKEN_LIMIT_SHORT_OVERVIEWS_STAGE,TOKEN_LIMIT_DIRECT_SNIPPETS_STAGE,TOKEN_LIMIT_META_SEARCH_STAGE,TOKEN_LIMIT_META_INSIGHTS_STAGE,META_INSIGHTS_REVIEW_STAGE}=require("./constants");function selectBatchForReview(e,t,s,a,n,r=[]){var i;if(t===META_INSIGHTS_REVIEW_STAGE)return(T=n[META_INSIGHTS_REVIEW_STAGE])&&0!==Object.keys(T).length?(i=estimateItemTokenCount(T={type:META_INSIGHTS_REVIEW_STAGE,data:T},t,n))<=a?{batchItems:[T],totalItemsInStage:1,batchTokenCount:i}:(console.warn(`Meta-insights data too large for single batch: ${i} tokens. Limit: `+a),{batchItems:[],totalItemsInStage:0,batchTokenCount:0}):{batchItems:[],totalItemsInStage:0,batchTokenCount:0};var o=[];let _=0;var l=new Set;let c=new Set;for(let t in s)Array.isArray(s[t])&&s[t].forEach(e=>{c.add(t+"-"+e)});var u,I,h=e.filter(e=>!!("tiny-overviews"===t&&e.tiny_overview||"short-overviews"===t&&e.short_overview||"direct-snippets"===t&&e.direct_snippets&&0<e.direct_snippets.length||"meta-search"===t&&e.extracted_metadata_fields)),T=h.length,g=[],d=new Set;for(let t of r){var m=t.source_type+"-"+t.id,E=h.some(e=>e.source_type===t.source_type&&e.id===t.id),S=c.has(m);!E||S||d.has(m)||(g.push(t),d.add(m))}for(u of h){var f=u.source_type+"-"+u.id;c.has(f)||d.has(f)||(g.push(u),d.add(f))}for(I of g){var v=I.source_type+"-"+I.id;if(!l.has(v)){var p=estimateItemTokenCount(I,t,n);if(!(_+p<=a))break;o.push(I),_+=p,l.add(v)}}return o.sort((e,t)=>void 0===e.row_num?1:void 0===t.row_num?-1:e.row_num-t.row_num),{batchItems:o,totalItemsInStage:T,batchTokenCount:_}}function findMessageInRawResults(e,t){var s=e.source_type;let a=e.id;var n,e=t[s];if(e){for(n of Array.isArray(e)?e:[e])if(n.results&&n.results.messages){var r=n.results.messages.find(e=>e.messages_id===a);if(r)return r}else console.warn(`findMessageInRawResults: Result set for type '${s}' is missing 'results.messages'.`,n);console.warn(`findMessageInRawResults: Message with ID '${a}' not found in raw results for type '${s}'.`)}return null}function estimateItemTokenCount(t,e,s){let a=0;if(a+=50,"tiny-overviews"===e){let e=t.tiny_overview?.messages_content;e||(n=findMessageInRawResults(t,s),e=n?.messages_content),a+=e?.length?Math.ceil(e.length/4):100}else if("short-overviews"===e){let e=t.short_overview?.messages_content;e||(n=findMessageInRawResults(t,s),e=n?.messages_content),a+=e?.length?Math.ceil(e.length/4):200}else{var n;"direct-snippets"===e&&(t.direct_snippets||t.source_type&&s[t.source_type])?(0===(n=t.direct_snippets||[]).length&&t.source_type&&s[t.source_type]&&(s=findMessageInRawResults(t,s))&&n.push(s),n.forEach(e=>{e=e.messages_content_snippet||e.messages_content;a=a+(e?.length?Math.ceil(e.length/4):50)+30})):"meta-search"===e?(s=JSON.stringify(t.extracted_metadata_fields||{}),a+=Math.ceil(s.length/4)+100):e===META_INSIGHTS_REVIEW_STAGE&&(n=t.data,s=JSON.stringify(n),a=Math.ceil(s.length/4)+200)}return a}function formatReviewBatch(e,r){let i="";if(1===e.length&&e[0].type===META_INSIGHTS_REVIEW_STAGE){var t,s=e[0].data;if(!s||0===Object.keys(s).length)return"No meta-insights data found for review.";for(t in i=i+`## Aggregated Meta-Insights Results

`+`The following are aggregated counts for the requested insight fields:

`,s){var a,{description:n,results:o}=s[t];Array.isArray(o)&&0!==o.length&&(a=t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()),i=(i=i+`### Insight Field: ${a}

`+n+`
`)+`| Value | Count |
`+`| :---- | :---- |
`,o.forEach(e=>{let t=String(e.value);"boolean"===e.type&&(t=1===e.value?"true":"false"),i+=`| ${t} | ${e.count} |
`}),i+=`
`)}}else e.forEach(e=>{i=(i=(i=(i=(i=(i=(i=i+`### Search Result Item: ${e.file_path||e.git_repo||e.chat_id}

`+`#### Common Information
`)+`- **Chat ID:** ${e.chat_id}
`)+`- **Path:** ${e.file_path||"N/A"}
`)+`- **Repo:** ${e.git_repo||"N/A"}
`)+`- **Type:** ${e.source_type}
`)+`- **Item ID:** ${e.id}
`)+`- **FTS Rank:** ${void 0!==e.fts_rank?e.fts_rank:"N/A"}

`+`#### Tiny Overview
`;let t=e.tiny_overview?.messages_content;t||(a=findMessageInRawResults(e,r),t=a?.messages_content),t?(a=t.match(/^## Summary\n([\s\S]*?)(?=\n## |\n---|$)/m),n=t.match(/^## Keywords\n([\s\S]*?)(?=\n## |\n---|$)/m),a=a?a[1].trim():"No summary available.",n=n?n[1].trim():"No keywords available.",i=i+`**Summary:** ${a}

`+`**Keywords:** ${n}

`):i+=`Content Not Found

`,i+=`#### Short Overview
`;let s=e.short_overview?.messages_content;s||(a=findMessageInRawResults(e,r),s=a?.messages_content),s?i+=s+`

`:i+=`Content Not Found

`,i+=`#### Snippets Overview
`;var a,n=e.direct_snippets||[];0===n.length&&e.source_type&&r[e.source_type]&&(a=findMessageInRawResults(e,r))&&n.push(a),0<n.length?n.forEach((e,t)=>{var s=e.messages_content_snippet||e.messages_content||"No snippet available.",e=void 0!==e.fts_rank?e.fts_rank:"N/A";i=i+`**Snippet ${t+1} (Rank: ${e}):**
`+`\`\`\`
${s}
\`\`\`

`}):i+=`Snippets Not Found

`,i=(i+=`#### Extracted Metadata
`)+(e.extracted_metadata_fields?`\`\`\`json
${JSON.stringify(e.extracted_metadata_fields,null,2)}
\`\`\`

`:`Not Available

`)+`---

`});return i.trim()}function getTokenLimitForStage(e){switch(e){case"tiny-overviews":return TOKEN_LIMIT_TINY_OVERVIEWS_STAGE;case"short-overviews":return TOKEN_LIMIT_SHORT_OVERVIEWS_STAGE;case"meta-search":return TOKEN_LIMIT_META_SEARCH_STAGE;case"direct-snippets":return TOKEN_LIMIT_DIRECT_SNIPPETS_STAGE;case META_INSIGHTS_REVIEW_STAGE:return TOKEN_LIMIT_META_INSIGHTS_STAGE;default:return console.error(`Unknown review stage: ${e}. Returning 0 token limit.`),0}}module.exports={selectBatchForReview:selectBatchForReview,estimateItemTokenCount:estimateItemTokenCount,formatReviewBatch:formatReviewBatch,getTokenLimitForStage:getTokenLimitForStage};
