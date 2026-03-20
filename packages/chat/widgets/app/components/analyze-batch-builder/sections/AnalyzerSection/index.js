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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,{CSS_CLASSES,TEXT}=require("./constants"),Header=require("../../ui/Header"),Selection=require("./Selection"),Summary=require("./Summary");class AnalyzerSection{constructor(e,t,i,a){this.container=e,this.state={analyzer:t.analyzer||null,isEditing:!t.analyzer,locked:t.locked||!1},this.callbacks=i,this.context=a,this.sectionElement=null,this.header=null,this.activeView=null,this.render()}render(){this.sectionElement=DomUtils.h.createDiv({id:"abb-analyzer-section",cls:CSS_CLASSES.SECTION,style:{marginBottom:"20px"}});var e=DomUtils.h.createDiv(),e=(this.header=new Header(e,TEXT.ANALYZER,{helpTitle:TEXT.HELP_TITLE,helpText:TEXT.HELP_TEXT}),this.header.setLocked(this.state.locked),this.sectionElement.appendChild(e),DomUtils.h.createDiv({cls:CSS_CLASSES.SECTION_CONTENT}));this.sectionElement.appendChild(e),this._renderView(e),this.container.appendChild(this.sectionElement)}_renderView(e){this.activeView&&(this.activeView.cleanup(),this.activeView=null),this.state.locked?this._renderLockedMessage(e):(e.innerHTML="",this.state.isEditing?this.activeView=new Selection(e,{onSaveClick:e=>this._handleSaveClick(e)},this.context):this.activeView=new Summary(e,this.state.analyzer,{onChangeClick:()=>this._handleChangeClick()},this.context))}_renderLockedMessage(e){e.innerHTML="",e.appendChild(DomUtils.h.createParagraph({text:"This section is locked until the previous steps are completed.",style:{fontStyle:"italic",color:"#666",marginTop:"15px",marginBottom:"15px"}}))}update(e){var t=this.state.isEditing,i=!!this.state.analyzer,a=this.state.locked,e=(this.state={...this.state,...e},this.state.isEditing),s=!!this.state.analyzer,n=this.state.locked;a!==n&&this.header&&this.header.setLocked(n),i!=s||t!==e||a!==n?(i=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT))&&this._renderView(i):s&&this.activeView&&this.activeView.update&&this.activeView.update(this.state.analyzer)}cleanup(){this.activeView&&(this.activeView.cleanup(),this.activeView=null),this.header&&(this.header.cleanup(),this.header=null),this.sectionElement&&this.sectionElement.parentElement&&this.sectionElement.remove(),this.sectionElement=null}_handleSaveClick(e){e&&this.callbacks.onSaveAnalyzer&&this.callbacks.onSaveAnalyzer({section:"analyzer",data:{analyzer:e,isEditing:!1}})}_handleChangeClick(){if(!this.callbacks.onChangeAnalyzer)throw new Error("AnalyzerSection._handleChangeClick: No onChangeAnalyzer callback defined");this.state.analyzer=null,this.callbacks.onChangeAnalyzer({section:"analyzer",data:{analyzer:null,isEditing:!0},onConfirmed:()=>{var e=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT);e&&this._renderView(e)}})}}module.exports=AnalyzerSection;
