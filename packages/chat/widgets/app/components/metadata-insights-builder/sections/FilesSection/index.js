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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,{CSS_CLASSES,TEXT}=require("./constants"),Header=require("../../ui/Header"),Selection=require("./Selection"),Summary=require("./Summary");class FilesSection{constructor(e,t,i,s){this.container=e,this.state={items:t.items||[],isEditing:!1!==t.isEditing},this.callbacks=i,this.context=s,this.sectionElement=null,this.header=null,this.activeView=null,this.render()}render(){this.sectionElement=DomUtils.h.createDiv({id:"insights-files-section",cls:CSS_CLASSES.SECTION,style:{marginBottom:"20px"}});var e=DomUtils.h.createDiv(),e=(this.header=new Header(e,TEXT.FILES,{helpTitle:TEXT.HELP_TITLE,helpText:TEXT.HELP_TEXT}),this.sectionElement.appendChild(e),DomUtils.h.createDiv({cls:CSS_CLASSES.SECTION_CONTENT}));this.sectionElement.appendChild(e),this._renderView(e),this.container.appendChild(this.sectionElement)}_renderView(e){this.activeView&&(this.activeView.cleanup(),this.activeView=null),0<this.state.items.length&&!this.state.isEditing?this.activeView=new Summary(e,this.state.items,{onClearClick:()=>this._handleClearFiles(),onChangeClick:()=>this._handleChangeSelection()},this.context):this.activeView=new Selection(e,[],{onSaveClick:e=>this._handleSaveClick(e)},this.context)}update(e){var t=0<this.state.items.length,i=this.state.isEditing,e=(e.items&&(this.state.items=e.items),e.hasOwnProperty("isEditing")&&(this.state.isEditing=e.isEditing),0<this.state.items.length),s=this.state.isEditing;t!=e||i!==s?(t=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT))&&this._renderView(t):!s&&this.activeView&&this.activeView.update&&this.activeView.update(this.state.items)}getState(){return{items:[...this.state.items],isEditing:this.state.isEditing}}setVisible(e){this.sectionElement&&(this.sectionElement.style.display=e?"block":"none")}cleanup(){this.activeView&&(this.activeView.cleanup(),this.activeView=null),this.header&&(this.header.cleanup(),this.header=null),this.sectionElement&&this.sectionElement.parentElement&&this.sectionElement.remove(),this.sectionElement=null}_handleSaveClick(e){var t;0<e.length&&this.callbacks.onSaveItems&&(this.state.items=e,this.state.isEditing=!1,(t=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT))&&this._renderView(t),this.callbacks.onSaveItems({section:"files",data:{items:e,isEditing:!1}}))}_handleClearFiles(){this.callbacks.onClearFiles&&this.callbacks.onClearFiles({section:"files",data:{items:[],isEditing:!0}})}_handleChangeSelection(){this.state.isEditing=!0;var e=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT);e&&this._renderView(e),this.callbacks.onChangeFiles&&this.callbacks.onChangeFiles({section:"files",data:{isEditing:!0}})}}module.exports=FilesSection;
