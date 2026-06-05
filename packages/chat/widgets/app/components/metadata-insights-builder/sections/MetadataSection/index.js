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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,{CSS_CLASSES,TEXT}=require("./constants"),Header=require("../../ui/Header"),Selection=require("./Selection"),Summary=require("./Summary");class MetadataSection{constructor(t,e,i){this.container=t,this.props={initialState:{items:[],isEditing:!0,...e.initialState},analyzers:e.analyzers||[],callbacks:e.callbacks||{},mode:e.mode||"auto",hideFieldsWithoutDescription:e.hideFieldsWithoutDescription||!1,text:{...TEXT,...e.text}},this.context=i,this.state={items:this.props.initialState.items,isEditing:this.props.initialState.isEditing},this.sectionElement=null,this.header=null,this.activeView=null,this.render()}render(){this.sectionElement=DomUtils.h.createDiv({id:"insights-metadata-section",cls:CSS_CLASSES.SECTION,style:{marginBottom:"20px"}});var t=DomUtils.h.createDiv(),t=(this.header=new Header(t,this.props.text.METADATA,{helpTitle:this.props.text.HELP_TITLE,helpText:this.props.text.HELP_TEXT}),this.sectionElement.appendChild(t),DomUtils.h.createDiv({cls:CSS_CLASSES.SECTION_CONTENT}));this.sectionElement.appendChild(t),this._renderView(t),this.container.appendChild(this.sectionElement)}_renderView(t){this.activeView&&(this.activeView.cleanup(),this.activeView=null);var e="summary"===this.props.mode||"auto"===this.props.mode&&0<this.state.items.length&&!this.state.isEditing;this.activeView=e?new Summary(t,this.state.items,this.props.analyzers,{onClearClick:()=>this._handleClear(),onChangeClick:()=>this._handleChange()},this.context):new Selection(t,[],this.props.analyzers,{onSaveClick:t=>this._handleSave(t)},this.context,{hideFieldsWithoutDescription:this.props.hideFieldsWithoutDescription})}update(t){t.initialState&&(t.initialState.items&&(this.state.items=t.initialState.items),t.initialState.hasOwnProperty("isEditing"))&&(this.state.isEditing=t.initialState.isEditing),t.analyzers&&(this.props.analyzers=t.analyzers),t.callbacks&&(this.props.callbacks={...this.props.callbacks,...t.callbacks}),t.mode&&(this.props.mode=t.mode);t=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT);t&&this._renderView(t)}_handleSave(t){var e;0<t.length&&(this.state.items=t,this.state.isEditing=!1,(e=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT))&&this._renderView(e),this.props.callbacks.onSave)&&this.props.callbacks.onSave(t)}_handleClear(){this.state.items=[],this.state.isEditing=!0;var t=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT);t&&this._renderView(t),this.props.callbacks.onClear&&this.props.callbacks.onClear()}_handleChange(){this.state.isEditing=!0;var t=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT);t&&this._renderView(t),this.props.callbacks.onChange&&this.props.callbacks.onChange()}cleanup(){this.activeView&&this.activeView.cleanup(),this.header&&this.header.cleanup(),this.sectionElement&&this.sectionElement.parentElement&&this.sectionElement.remove(),this.sectionElement=null}}module.exports=MetadataSection;
