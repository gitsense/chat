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

let h=require("../utils/html.js"),defaultColStyle={padding:"12px",marginTop:"0px"};function Card(t,i,l=!1){let{minHeight:e,cols:d=12,show:a=!0,colStyle:n={},cardCSS:r="tblr-card",cardStyle:s}=t,o={widget:i,body:null,main:null,help:null,current:null,init(){for(var t in this.body=h.createDiv({append:[this.outside],cls:"tblr-col-lg-"+d,style:{display:a&&0!==d?null:"none"}}),defaultColStyle){var e=defaultColStyle[t];void 0===n[t]&&(this.body.style[t]=e)}for(var r in n)this.body.style[r]=n[r];return this.current=this.body,this},addCard(){var t=h.createDiv({cls:r,style:s||{border:"0px"}});return this.current.appendChild(t),this.current=t,this},addCardBody(){var t=h.createDiv({});return this.current.appendChild(t),this.current=t,this},addCardMain(){return this.main={body:h.createDiv({style:{minHeight:e?null:e+"px"}})},this.current.appendChild(this.main.body),this},addCardHelp(){var t,e,r;return l&&({align:t="left",link:r,text:e}=i.config.help,r)&&(r=h.createLink({href:r,text:e||i.fullName,target:"_blank"}),this.help={body:h.createDiv({append:[r],style:{textAlign:t,fontSize:"13px",marginTop:"15px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}})},this.current.appendChild(this.help.body)),this}};this.create=function(){return o.init().addCard().addCardBody().addCardMain().addCardHelp()}}module.exports=Card;
