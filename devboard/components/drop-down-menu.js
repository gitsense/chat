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

let h=require("../utils/html.js");function DropDownMenu(p,n="menu: ",e){let{callback:c,btn:l=!1,dropDownClass:r="color-fg-muted p-2 d-inline",dropDownStyle:o,containerStyle:t,alignment:d="se",menuStyle:u,showCaret:m=!0}=e||{},y=h.createDetail({cls:"dropdown details-reset details-overlay d-inline-block",style:t}),f=(t=>{for(let e=0;e<t.length;e++){var n=t[e];if(n.selected)return n}return t[0]})(p);this.create=function(){var{value:e,label:t}=f;(t=h.createSummary({cls:l?"btn":r,append:[h.createSpan({html:t||n+("string"==typeof e?e.replace(/^>>>/,""):""),style:{}}),h.createDiv({cls:"dropdown-caret",style:{display:m?null:"none",marginLeft:"5px"}})],style:o})).setAttribute("aria-haspopup","true"),y.appendChild(t);var a,i,s=h.createUL({cls:"dropdown-menu dropdown-menu-"+d,style:u});y.appendChild(s);for(let o=0;o<p.length;o++){let{value:e,returnValue:t,href:n,selected:l,selectable:r=!0}=p[o];""===e||(i="string"==typeof e,a=!(!i||!e.match(/^---/)),i=!(!i||!e.match(/^>>>/)),a=l?h.createSpan({cls:"dropdown-item",html:e,style:{fontWeight:600}}):h.createLink({cls:"dropdown-item",href:n,html:a?"<div style='border-bottom:1px dashed #aaa'></div>":i?"":"string"==typeof e?e.replace(/^>>>/,""):e,style:{cursor:"pointer",pointerEvents:a||i||!r?"none":null,display:i?"none":null}}),i=h.createLI({append:[a]}),s.appendChild(i),l)||n||!c||(a.onclick=()=>{c(f.returnValue||f.value,t||e),y.removeAttribute("open")})}return h.createDiv({cls:"ms-auto lh-1 d-inline",append:y})},this.getSelected=function(){return f.value},this.open=function(){y.setAttribute("open","")},this.close=function(){y.removeAttribute("open")}}module.exports=DropDownMenu;
