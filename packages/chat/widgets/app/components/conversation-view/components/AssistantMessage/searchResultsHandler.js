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

let ChatUtils=require("@gitsense/gsc-utils").ChatUtils,DomUtils=require("../../utils/DomUtils");async function handleSearchResults(a,e,r,t){if(a.meta?.isSearchResultsHandled)return!0;if(!(a&&null!==a.message&&e&&r&&r.chat))return console.warn("handleSearchResults: Missing required parameters"),!1;var l=r.chat,s=a.message;if(!l.name||!l.name.match(/AI Search - \d+ - State: /))return!1;try{var n=ChatUtils.getChatMessages(l);if(!n||0===n.length)return!1;var i=n[0].message;if(!i||"string"!=typeof i||!i.trim().startsWith("{"))return!1;var d,p=JSON.parse(i).queries;if(!Array.isArray(p)||0===p.length||"object"!=typeof p[0]||null===p[0])return!1;if(!p[0].hasOwnProperty("type")||!p[0].hasOwnProperty("query"))return!1;let t=null;for(let e=0;e<n.length;e++)if(a.message===n[e].message){t=e;break}if(null===t)return console.warn("Unable to find the position for this message in this chat"),!1;if(0===t)d=DomUtils.h.createPre({text:JSON.stringify(JSON.parse(i),null,2),style:{padding:"15px"}}),e.innerHTML="",e.appendChild(d);else{if(!s||"string"!=typeof s||!s.trim().startsWith("{"))return!1;var h=JSON.parse(s);if("object"!=typeof h||null===h||!h.hasOwnProperty("searchCriteria"))return!1;e.innerHTML="";let o=DomUtils.h;var c={"tiny-overview":"Tiny Overview","short-overview":"Short Overview","direct-search":"Direct Search","meta-search":"Meta Search","meta-insights":"Meta Insights"},u=p[t-1],g=c[u.type],f=u.query||"N/A",y="meta-insights"===u.type,m=h.totalResultsReturned||0,C=o.createH2({text:g+` Matches (${m})`,style:{marginTop:"10px"}}),x=(e.appendChild(C),o.createH3({text:"Query"})),v=(e.appendChild(x),o.createPre({append:[o.createCode({text:f})],style:{padding:"15px",borderRadius:"5px",overflowX:"auto",whiteSpace:"pre-wrap",wordWrap:"break-word",fontSize:".9em"}}));if(e.appendChild(v),y){var b,w=h.results;if(!w||0===Object.keys(w).length)return"No meta-insights data found for review.";let a="";for(b in a=a+`### Aggregated Meta-Insights Results

`+`The following are aggregated counts for the requested insight fields:

`,w){var S,{description:T,results:R}=w[b];Array.isArray(R)&&0!==R.length&&(S=b.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()),a=(a=a+`#### Insight Field: ${S}

`+T+`
`)+`| Value | Count |
`+`| :---- | :---- |
`,R.forEach(e=>{let t=String(e.value);"boolean"===e.type&&(t=1===e.value?"true":"false"),a+=`| ${t} | ${e.count} |
`}),a+=`
`)}var O=o.createDiv({html:r.md.render(a),style:{}});e.appendChild(O)}else{var A=o.createH3({text:"Matches"}),D=(e.appendChild(A),h.results?.messages||[]);if(0===D.length)e.appendChild(o.createP({text:"No matches found."}));else{var H=o.createTable({style:{width:"100%",borderCollapse:"collapse",marginTop:"10px"}}),M=(e.appendChild(H),o.createTableHead()),N=(H.appendChild(M),o.createTableRow());M.appendChild(N),N.appendChild(o.createTableHeadCell({text:"Chat ID",style:{textAlign:"left",padding:"8px",borderBottom:"1px solid #ddd"}})),N.appendChild(o.createTableHeadCell({text:"Chat Path",style:{textAlign:"left",padding:"8px",borderBottom:"1px solid #ddd",width:"100%"}}));let d=o.createTableBody(),p=(H.appendChild(d),[]);if(D.forEach((t,e)=>{var e=10<=e,a=o.createTableRow({style:{borderBottom:"1px solid #eee",cursor:"pointer",display:e?"none":null}}),r=(d.appendChild(a),o.createTableCell({text:t.messages_chat_id||"N/A",style:{padding:"8px",fontWeight:"bold",color:"#007bff"}})),r=(a.appendChild(r),(t.chat_path||t.chats_name||"N/A").replace(/->/g,"/")),r=o.createTableCell({text:r,style:{padding:"8px"}});a.appendChild(r);let l=o.createTableRow({style:{display:"none",backgroundColor:"#f9f9f9"}});d.appendChild(l);var s,r=o.createTableCell({colSpan:2,style:{padding:"15px",borderTop:"1px solid #ddd"}}),n=(l.appendChild(r),o.createDiv());for(s in r.appendChild(n),t)if(t.hasOwnProperty(s)){let e=t[s];e="object"==typeof e&&null!==e?JSON.stringify(e,null,2):null===e?"null":void 0===e?"undefined":String(e);var i=o.createDiv({append:[o.createSpan({text:s+": ",style:{fontWeight:"bold"}}),o.createSpan({text:e})],style:{marginBottom:"5px"}});n.appendChild(i)}a.onclick=()=>{l.style.display="none"===l.style.display?null:"none"},e&&p.push(a)}),10<D.length){let t=o.createLink({href:"#",text:`Show More (${D.length-10} more)`,style:{marginTop:"15px",cursor:"pointer"},onclick:e=>{e.preventDefault(),p.forEach(e=>{e.style.display=null}),t.style.display="none"}});e.appendChild(t)}}}}return a.meta||(a.meta={}),a.meta.isSearchResultsHandled=!0}catch(e){return console.error("Error handling search results message:",e),!1}}module.exports={handleSearchResults:handleSearchResults};
