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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,{CSS_CLASSES,TEXT}=require("./constants"),Header=require("../../ui/Header"),Selection=require("./Selection"),Summary=require("./Summary");class ReferenceFilesSection{constructor(e,t,i,s){this.container=e,this.state={items:t.items||[],isEditing:t.isEditing,locked:t.locked||!1},this.callbacks=i,this.context=s,this.sectionElement=null,this.header=null,this.activeView=null,this.render()}render(){this.sectionElement=DomUtils.h.createDiv({id:"abb-reference-files-section",cls:CSS_CLASSES.SECTION,style:{marginBottom:"20px"}});var e=DomUtils.h.createDiv(),e=(this.header=new Header(e,TEXT.REFERENCE_FILES,{helpTitle:TEXT.HELP_TITLE,helpText:TEXT.HELP_TEXT}),this.header.setLocked(this.state.locked),this.sectionElement.appendChild(e),DomUtils.h.createDiv({cls:CSS_CLASSES.SECTION_CONTENT}));this.sectionElement.appendChild(e),this._renderView(e),this.container.appendChild(this.sectionElement)}_renderView(e){this.activeView&&(this.activeView.cleanup(),this.activeView=null),this.state.locked?this._renderLockedMessage(e):(e.innerHTML="",this.state.isEditing?this.activeView=new Selection(e,[],{onSaveClick:e=>this._handleSaveClick(e),onNoFilesClick:()=>this._handleNoFilesClick()},this.context):this.activeView=new Summary(e,this.state.items,{onChangeClick:()=>this._handleChangeClick()},this.context))}_renderLockedMessage(e){e.innerHTML="",e.appendChild(DomUtils.h.createParagraph({text:"Waiting for Analyzer to be selected.",style:{fontStyle:"italic",color:"#666",marginTop:"15px",marginBottom:"15px"}}))}update(e){var t=0<this.state.items.length,i=this.state.isEditing,s=this.state.locked,e=(this.state={...this.state,...e},0<this.state.items.length),n=this.state.isEditing,l=this.state.locked;s!==l&&this.header&&this.header.setLocked(l),t!=e||i!==n||s!==l?(t=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT))&&this._renderView(t):e&&this.activeView&&this.activeView.update&&this.activeView.update(this.state.items)}getState(){return{items:[...this.state.items]}}setVisible(e){this.sectionElement&&(this.sectionElement.style.display=e?"block":"none")}cleanup(){this.activeView&&(this.activeView.cleanup(),this.activeView=null),this.header&&(this.header.cleanup(),this.header=null),this.sectionElement&&this.sectionElement.parentElement&&this.sectionElement.remove(),this.sectionElement=null}_handleSaveClick(e){0<e.length&&this.callbacks.onSaveItems&&this.callbacks.onSaveItems({section:"referenceFiles",data:{items:e,isEditing:!1}})}_handleNoFilesClick(){this.callbacks.onNoFilesClick&&this.callbacks.onNoFilesClick({section:"referenceFiles",data:{items:[],isEditing:!1}})}_handleChangeClick(){if(!this.callbacks.onChangeItems)throw new Error("ReferenceFilesSection._handleChangeClick: No onChangeItems callback defined");this.state.items=[],this.callbacks.onChangeItems({section:"referenceFiles",data:{items:[],isEditing:!0},onConfirmed:()=>{var e=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT);e&&this._renderView(e)}})}}module.exports=ReferenceFilesSection;
