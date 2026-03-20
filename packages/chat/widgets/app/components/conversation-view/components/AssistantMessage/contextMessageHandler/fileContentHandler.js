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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,svg=require("../../../Dependencies").svg,CodeBlock=require("../../CodeBlock");function renderFileContentSections(e,t,r){let y="context-loader-main-row",i="context-loader-content-row",u="100%",x="45px",d=[{text:"Path",width:u},{text:"Repository"},{text:"",width:x}],g=DomUtils.h;var l,n=g.createTableHead({style:{textAlign:"left"}}),a=g.createTableBody({style:{}}),o=g.createTable({append:[n,a],style:{whiteSpace:"nowrap",width:"100%",borderCollapse:"collapse",tableLayout:"fixed"}}),e=(e.appendChild(o),6===t.length?6:5);function w(e,l,n){var t=e.nextElementSibling;if(null===t||!t.classList.contains(i)){var a=maxWidth=e.offsetWidth-33+"px",o=n.language||"txt";let t=(new Date).getTime()+"-"+l;(l=g.createTableCell({id:t,html:r.render(n.header)+"\n"+r.render("```"+o+"\n"+n.content+"```"),style:{padding:"15px"}})).colSpan=d.length,(o=l.querySelector("pre"))&&(o.style.maxWidth=maxWidth,o.style.width=a),n=g.createTableRow({cls:i,append:[l],style:{backgroundColor:"white"}}),e.insertAdjacentHTML("afterend",n.outerHTML),setTimeout(()=>{var e=document.getElementById(t);e?CodeBlock.addClipboards(e,5):console.error("Unable to find the context row content with the DOM ID: "+t)},100)}else{o="none"===t.style.display;t.style.display=o?null:"none"}}l=n,d.forEach(e=>{var t=e.width,e=g.createTableHeadCell({text:e.text,style:{width:t}});l.appendChild(e)}),function t(p,h,e=0,l=3){let n=e+l>h.length?h.length:e+l;for(let s=e;s<n;s++){let t=h[s],{repo:e,path:l,content:n}=t,a=g.createTableRow({cls:y,style:{backgroundColor:"white"}}),o=(p.appendChild(a),g.createLink({href:"#",text:l,onclick:e=>{e.preventDefault(),w(a,s,t)}})),r=g.createTableCell({append:[o],style:{width:u}}),i=g.createTableCell({text:e,style:{}}),d=svg.copy({style:{opacity:0,cursor:"pointer"}}),c=(d.onclick=async e=>{e.preventDefault();try{await navigator.clipboard.writeText(n)}catch(e){console.error("Copy failed:",e)}},g.createTableCell({append:[d],style:{width:x}}));a.appendChild(r),a.appendChild(i),a.appendChild(c),a.onmouseover=()=>{d.style.opacity=1},a.onmouseout=()=>{d.style.opacity=0}}if(n===h.length)return;let a=g.createA({text:`Show ${h.length-n} more`,href:"#",style:{display:"inline-block",fontWeight:500}});let o=g.createDiv({append:[a],style:{textAlign:"center",marginTop:"15px"}});a.onclick=e=>{e.preventDefault(),o.remove(),t(p,h,n,l)};p.appendChild(o)}(a,t,0,e)}module.exports={render:renderFileContentSections};
