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

function formatCondensedTinyOverviews(e){if(!e||0===e.length)return"No Tiny Overviews found.";let m=`## Condensed Top ${e.length} Tiny Overviews (Ranked by Relevance)

`;return e.forEach((e,t)=>{var s=e.messages_chat_id,n=e.messages_meta_file_path||"N/A",a=e.group_name||"N/A",r=e.messages_meta_document_type||"N/A",i=e.messages_meta_purpose||"No purpose available.",e=(e.messages_content||"").match(/^## Keywords\n([\s\S]*?)(?=\n## |\n---|$)/m);let o="N/A";e&&e[1]&&(e=e[1].split(",").map(e=>e.trim()).filter(e=>0<e.length),o=e.join(", "));e=100<o.length?o.substring(0,100)+"...":o;m+=t+1+`. ID: ${s} | Repo: ${a} | Path: ${n} | Type: ${r} | Purpose: ${i} | Keywords: ${e}
`}),m+=`
---

`}function formatFullTinyOverviews(e,t){let s=e;if(!(s=Array.isArray(t)&&0<t.length?e.filter(e=>t.includes(e.messages_chat_id)):s)||0===s.length)return"No Tiny Overviews found.";let p=`## Detailed Tiny Overviews for Review

`;return s.forEach((e,t)=>{var s=e.messages_chat_id,n=e.messages_meta_file_path||"N/A",a=e.messages_meta_git_repo||"N/A",r=e.messages_meta_document_type||"N/A",i=e.messages_content||"No content available.",e=void 0!==e.fts_rank?e.fts_rank:"N/A",o=i.match(/^## Keywords\n([\s\S]*?)(?=\n## |\n---|$)/m);let m="N/A";o&&o[1]&&(o=o[1].split(",").map(e=>e.trim()).filter(e=>0<e.length),m=o.join(", ")),p=(p=(p=(p=(p+=`### Item ${t+1}
`)+`- **Chat ID:** ${s}
`+`- **Repo:** ${a}
`)+`- **Path:** ${n}
`+`- **Type:** ${r}
`)+`- **Keywords:** ${m}
`)+`- **FTS Rank:** ${e}
`+`
\`\`\`
${i}
\`\`\`

`}),p+=`
---

`}function formatDirectSnippets(e){if(!e||0===e.length)return"No Direct Snippets found.";let i=`## Direct Snippets (Ranked by Relevance)

`;return e.forEach((e,t)=>{var s=e.messages_chat_id,n=e.messages_meta_file_path||e.chats_name||"N/A",a=e.groups_name||"N/A",r=e.messages_content_snippet||"No snippet available.",e=void 0!==e.fts_rank?e.fts_rank:"N/A";i=(i+=`### Snippet ${t+1}
`)+`- **Chat ID:** ${s} | **Repo:** ${a} | **Path:** ${n} | **FTS Rank:** ${e}
`+`\`\`\`
${r}
\`\`\`

`}),i+=`
---

`}module.exports={formatCondensedTinyOverviews:formatCondensedTinyOverviews,formatFullTinyOverviews:formatFullTinyOverviews,formatDirectSnippets:formatDirectSnippets};
