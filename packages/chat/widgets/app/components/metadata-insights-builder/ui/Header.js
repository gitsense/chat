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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,HELP_TEXT={SHOW:"Show help",HIDE:"Hide help"};class Header{constructor(e,t,i={}){this.container=e,this.title=t,this.options={helpTitle:"",helpText:"",style:{},...i},this.headerElement=null,this.helpLink=null,this.helpContainer=null,this.render()}render(){this.headerElement=DomUtils.h.createDiv({style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #d8dee4",...this.options.style}});var e=DomUtils.h.createH2({text:this.title,style:{color:"#555",margin:"5px 0",borderBottom:0}});this.headerElement.appendChild(e),this.options.helpText&&this._createHelpElements(),this.container.appendChild(this.headerElement)}_createHelpElements(){this.helpLink=DomUtils.h.createLink({text:HELP_TEXT.SHOW,href:"#",style:{fontSize:"0.9em"},onclick:e=>{e.preventDefault(),this._handleHelpToggle()}}),this.headerElement.appendChild(this.helpLink),this.helpContainer=DomUtils.h.createDiv({style:{display:"none",marginTop:"15px",padding:"15px",backgroundColor:"#f8f9fa",border:"1px solid #eee",borderRadius:"4px",whiteSpace:"pre-wrap",fontSize:"0.9em",color:"#333"}}),this.options.helpTitle&&this.helpContainer.appendChild(DomUtils.h.createStrong({text:this.options.helpTitle,style:{display:"block",marginBottom:"10px"}})),this.helpContainer.appendChild(DomUtils.h.createText(this.options.helpText))}_handleHelpToggle(){var e="none"===this.helpContainer.style.display;this.helpContainer.style.display=e?"block":"none",this.helpLink.textContent=e?HELP_TEXT.HIDE:HELP_TEXT.SHOW,e&&!this.helpContainer.parentElement&&this.container.appendChild(this.helpContainer)}cleanup(){this.helpLink&&this.helpLink.removeEventListener("click",this._handleHelpToggle),this.headerElement&&this.headerElement.parentElement&&this.headerElement.remove(),this.helpContainer&&this.helpContainer.parentElement&&this.helpContainer.remove(),this.headerElement=null,this.helpLink=null,this.helpContainer=null}}module.exports=Header;
