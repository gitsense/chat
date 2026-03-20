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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,{CSS_CLASSES,TEXT}=require("./constants"),Header=require("../../ui/Header"),Selection=require("./Selection"),Summary=require("./Summary");class MetadataSection{constructor(t,e,i,s){this.container=t,this.state={items:e.items||[],analyzers:e.analyzers||[],isEditing:!1!==e.isEditing},this.callbacks=i,this.context=s,this.sectionElement=null,this.header=null,this.activeView=null,this.render()}render(){this.sectionElement=DomUtils.h.createDiv({id:"insights-metadata-section",cls:CSS_CLASSES.SECTION,style:{marginBottom:"20px"}});var t=DomUtils.h.createDiv(),t=(this.header=new Header(t,TEXT.METADATA,{helpTitle:TEXT.HELP_TITLE,helpText:TEXT.HELP_TEXT}),this.sectionElement.appendChild(t),DomUtils.h.createDiv({cls:CSS_CLASSES.SECTION_CONTENT}));this.sectionElement.appendChild(t),this._renderView(t),this.container.appendChild(this.sectionElement)}_renderView(t){this.activeView&&(this.activeView.cleanup(),this.activeView=null),0<this.state.items.length&&!this.state.isEditing?this.activeView=new Summary(t,this.state.items,this.state.analyzers,{onClearClick:()=>this._handleClearMetadata(),onChangeClick:()=>this._handleChangeSelection()},this.context):this.activeView=new Selection(t,[],this.state.analyzers,{onSaveClick:t=>this._handleSaveClick(t)},this.context)}update(t){var e=0<this.state.items.length,i=!!this.state.analyzers?.length,s=this.state.isEditing,t=(t.items&&(this.state.items=t.items),t.analyzers&&(this.state.analyzers=t.analyzers),t.hasOwnProperty("isEditing")&&(this.state.isEditing=t.isEditing),0<this.state.items.length),a=this.state.analyzers?.length||0,n=this.state.isEditing;e!=t||s!==n||i!==a?(e=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT))&&this._renderView(e):!n&&this.activeView&&this.activeView.update&&this.activeView.update(this.state.items,this.state.analyzers)}getState(){return{items:[...this.state.items],analyzers:[...this.state.analyzers],isEditing:this.state.isEditing}}setVisible(t){this.sectionElement&&(this.sectionElement.style.display=t?"block":"none")}cleanup(){this.activeView&&(this.activeView.cleanup(),this.activeView=null),this.header&&(this.header.cleanup(),this.header=null),this.sectionElement&&this.sectionElement.parentElement&&this.sectionElement.remove(),this.sectionElement=null}_handleSaveClick(t){var e;0<t.length&&this.callbacks.onSaveItems&&(this.state.items=t,this.state.isEditing=!1,(e=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT))&&this._renderView(e),this.callbacks.onSaveItems({section:"metadata",data:{items:t,isEditing:!1}}))}_handleClearMetadata(){this.callbacks.onClearMetadata&&this.callbacks.onClearMetadata({section:"metadata",data:{items:[],isEditing:!0}})}_handleChangeSelection(){this.state.isEditing=!0;var t=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT);t&&this._renderView(t),this.callbacks.onChangeMetadata&&this.callbacks.onChangeMetadata({section:"metadata",data:{isEditing:!0}})}}module.exports=MetadataSection;
