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

let{CodeBlockUtils,DomUtils}=require("@gitsense/gsc-utils");function renderAnalysisStatus(e,d,l,n,i,p,r=[]){var o=DomUtils.h,e=(o.createP({text:e.real_model||e.model,style:{fontSize:"13px"}}),o.createDiv({})),c=(e.appendChild(o.createH1({text:"Analysis",style:{}})),o.createDiv({style:{display:"flex",flexDirection:"column",border:"1px solid #ccc",marginTop:"20px",marginBottom:"20px"}})),t=(e.appendChild(c),o.createDiv({style:{display:"flex",fontWeight:"bold",padding:"10px 10px",borderBottom:"1px solid #ccc",backgroundColor:"#f4f4f4"}})),s=(t.appendChild(o.createDiv({text:"Chat ID",style:{flex:"0 0 100px",textAlign:"left"}})),t.appendChild(o.createDiv({text:"Path",style:{flex:"1 1 auto",paddingRight:"20px",textAlign:"left"}})),t.appendChild(o.createDiv({text:"Overview",style:{flex:"0 0 85px",textAlign:"center"}})),t.appendChild(o.createDiv({text:"Metadata",style:{flex:"0 0 85px",textAlign:"center"}})),c.appendChild(t),[]);for(let a=0;a<l.length;a++){var x=l[a],h=n[a],{"Chat ID":f,Path:g}=x.analysisMetadata||{},y=!!h,v=!!h,m=o.createDiv({style:{display:"flex",whiteSpace:"nowrap",padding:"10px 10px",borderTop:"1px solid "+(0===a?null:"#ddd"),alignItems:"center"}});let e,t;t=i&&f&&g?(s.push({linkId:D="chat-id-link-"+f,chatId:f,path:g}),e=o.createLink({href:"#",id:D,text:"#"+f}),o.createSpan({style:{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",maxWidth:"100%"},text:g})):(e=o.createSpan({text:"#"+(f||"N/A"),style:{textAlign:"left"}}),o.createSpan({text:g||"N/A",style:{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",maxWidth:"100%"}}));var D=o.createDiv({text:y?"✓":x.content.length}),y=o.createDiv({text:v?"✓":h?.content?.length||"-"});if(m.appendChild(o.createDiv({append:[e],style:{flex:"0 0 100px",textAlign:"left",overflow:"hidden"}})),m.appendChild(o.createDiv({append:[t],style:{flex:"1 1 0%",paddingRight:"20px",textAlign:"left",overflow:"hidden"}})),m.appendChild(o.createDiv({append:[D],style:{flex:"0 0 85px",textAlign:"center"}})),m.appendChild(o.createDiv({append:[y],style:{flex:"0 0 85px",textAlign:"center"}})),c.appendChild(m),v&&r.length){let e=null;try{e=JSON.parse(h.content)}catch(e){throw new Error("Invalid JSON ",e.message)}let t=e.extracted_metadata||{},a=[];r.forEach(e=>{a.push(e+": "+(void 0===t[e]?"No metadata value":t[e]))});y=o.createPre({text:a.join("\n"),style:{flex:"1 0 100%",whiteSpace:"nowrap",lineHeight:1.5,fontSize:".85em",color:"#666",overflow:"auto"}});c.appendChild(o.createDiv({append:[o.createDiv({text:"Metatdata",style:{fontSize:"0.95em",fontWeight:"normal",marginBottom:"3px"}}),y],style:{padding:"0px 10px 10px 10px"}}))}i&&x.content&&h?.content&&(m=o.createDiv({id:`code-blocks-${f}-`+g.replace(/[^a-zA-Z0-9]/g,"-"),style:{display:"none",marginTop:"10px",padding:"10px",border:"1px solid #eee",whiteSpace:"pre-wrap",wordBreak:"break-word"}}),v=`\`\`\`${x.language}
${x.content}
\`\`\`

`+`\`\`\`json
${h.content}
\`\`\``,m.innerHTML=p.md.render(v),c.appendChild(m))}try{DomUtils.h.updateDOM(e,d)}catch(e){console.warn("DOM update failed:",e)}i&&s.forEach(e=>{let{linkId:t,chatId:n,path:i}=e;document.getElementById(t).onclick=e=>{e.preventDefault();var e=n,t=i,a=d;if(e=`code-blocks-${e}-`+t.replace(/[^a-zA-Z0-9]/g,"-"),t=a.querySelector("#"+e)){a="none"===t.style.display;if(t.style.display=a?"block":"none",!t.padded){var l=t.querySelectorAll("pre");for(let e=0;e<l.length;e++)l[e].style.padding="10px";t.padded=!0}}}})}module.exports={renderAnalysisStatus:renderAnalysisStatus};
