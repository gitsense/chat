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

let{CodeBlockUtils,DomUtils}=require("@gitsense/gsc-utils");function renderAnalysisStatus(e,d,a,n,i,p,r=[]){var o=DomUtils.h,e=(o.createP({text:e.real_model||e.model,style:{fontSize:"13px"}}),o.createDiv({})),c=(e.appendChild(o.createH1({text:"Analysis",style:{}})),o.createDiv({style:{display:"flex",flexDirection:"column",border:"1px solid #ccc",marginTop:"20px",marginBottom:"20px"}})),t=(e.appendChild(c),o.createDiv({style:{display:"flex",fontWeight:"bold",padding:"10px 10px",borderBottom:"1px solid #ccc",backgroundColor:"#f4f4f4"}})),s=(t.appendChild(o.createDiv({text:"Chat ID",style:{flex:"0 0 100px",textAlign:"left"}})),t.appendChild(o.createDiv({text:"Path",style:{flex:"1 1 auto",paddingRight:"20px",textAlign:"left"}})),t.appendChild(o.createDiv({text:"Overview",style:{flex:"0 0 85px",textAlign:"center"}})),t.appendChild(o.createDiv({text:"Metadata",style:{flex:"0 0 85px",textAlign:"center"}})),c.appendChild(t),[]);for(let l=0;l<a.length;l++){var x=a[l],h=n[l],{"Chat ID":f,Path:g}=x.analysisMetadata||{},y=!!h,v=!!h,m=o.createDiv({style:{display:"flex",whiteSpace:"nowrap",padding:"10px 10px",borderTop:"1px solid "+(0===l?null:"#ddd"),alignItems:"center"}});let e,t;t=i&&f&&g?(s.push({linkId:D="chat-id-link-"+f,chatId:f,path:g}),e=o.createLink({href:"#",id:D,text:"#"+f}),o.createSpan({style:{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",maxWidth:"100%"},text:g})):(e=o.createSpan({text:"#"+(f||"N/A"),style:{textAlign:"left"}}),o.createSpan({text:g||"N/A",style:{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",maxWidth:"100%"}}));var D=o.createDiv({text:y?"✓":x.content.length}),y=o.createDiv({text:v?"✓":h?.content?.length||"-"});if(m.appendChild(o.createDiv({append:[e],style:{flex:"0 0 100px",textAlign:"left",overflow:"hidden"}})),m.appendChild(o.createDiv({append:[t],style:{flex:"1 1 0%",paddingRight:"20px",textAlign:"left",overflow:"hidden"}})),m.appendChild(o.createDiv({append:[D],style:{flex:"0 0 85px",textAlign:"center"}})),m.appendChild(o.createDiv({append:[y],style:{flex:"0 0 85px",textAlign:"center"}})),c.appendChild(m),v&&r.length){let l=null;try{l=JSON.parse(h.content)}catch(e){throw new Error("Invalid JSON ",e.message)}let a=l.extracted_metadata||{},n=[];r.forEach(e=>{let t=null;a[e]?t=a[e]:l[e]&&(t=l[e]),n.push(e+": "+(t||"No metadata value"))});y=o.createPre({text:n.join("\n"),style:{flex:"1 0 100%",whiteSpace:"nowrap",lineHeight:1.5,fontSize:".85em",color:"#666",overflow:"auto"}});c.appendChild(o.createDiv({append:[o.createDiv({text:"Metatdata",style:{fontSize:"0.95em",fontWeight:"normal",marginBottom:"3px"}}),y],style:{padding:"0px 10px 10px 10px"}}))}i&&x.content&&h?.content&&(m=o.createDiv({id:`code-blocks-${f}-`+g.replace(/[^a-zA-Z0-9]/g,"-"),style:{display:"none",marginTop:"10px",padding:"10px",border:"1px solid #eee",whiteSpace:"pre-wrap",wordBreak:"break-word"}}),v=`\`\`\`${x.language}
${x.content}
\`\`\`

`+`\`\`\`json
${h.content}
\`\`\``,m.innerHTML=p.md.render(v),c.appendChild(m))}try{DomUtils.h.updateDOM(e,d)}catch(e){console.warn("DOM update failed:",e)}i&&s.forEach(e=>{let{linkId:t,chatId:n,path:i}=e;document.getElementById(t).onclick=e=>{e.preventDefault();var e=n,t=i,l=d;if(e=`code-blocks-${e}-`+t.replace(/[^a-zA-Z0-9]/g,"-"),t=l.querySelector("#"+e)){l="none"===t.style.display;if(t.style.display=l?"block":"none",!t.padded){var a=t.querySelectorAll("pre");for(let e=0;e<a.length;e++)a[e].style.padding="10px";t.padded=!0}}}})}module.exports={renderAnalysisStatus:renderAnalysisStatus};
