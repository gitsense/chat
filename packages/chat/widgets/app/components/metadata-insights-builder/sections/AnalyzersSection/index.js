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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,{CSS_CLASSES,TEXT}=require("./constants"),Header=require("../../ui/Header"),Selection=require("./Selection"),Summary=require("./Summary");class AnalyzersSection{constructor(e,t,i){this.container=e,this.props={initialState:{items:[],isEditing:!0,...t.initialState},callbacks:t.callbacks||{},mode:t.mode||"auto",text:{...TEXT,...t.text}},this.context=i,this.state={items:this.props.initialState.items,isEditing:this.props.initialState.isEditing},this.sectionElement=null,this.header=null,this.activeView=null,this.render()}render(){this.sectionElement=DomUtils.h.createDiv({id:"insights-analyzers-section",cls:CSS_CLASSES.SECTION,style:{marginBottom:"20px"}});var e=DomUtils.h.createDiv(),e=(this.header=new Header(e,this.props.text.ANALYZERS,{helpTitle:this.props.text.HELP_TITLE,helpText:this.props.text.HELP_TEXT}),this.sectionElement.appendChild(e),DomUtils.h.createDiv({cls:CSS_CLASSES.SECTION_CONTENT}));this.sectionElement.appendChild(e),this._renderView(e),this.container.appendChild(this.sectionElement)}_renderView(e){this.activeView&&(this.activeView.cleanup(),this.activeView=null);var t="summary"===this.props.mode||"auto"===this.props.mode&&0<this.state.items.length&&!this.state.isEditing;this.activeView=t?new Summary(e,this.state.items,{onClearClick:()=>this._handleClear(),onChangeClick:()=>this._handleChange()},this.context):new Selection(e,[],{onSaveClick:e=>this._handleSave(e)},this.context)}update(e){e.initialState&&(e.initialState.items&&(this.state.items=e.initialState.items),e.initialState.hasOwnProperty("isEditing"))&&(this.state.isEditing=e.initialState.isEditing),e.callbacks&&(this.props.callbacks={...this.props.callbacks,...e.callbacks}),e.mode&&(this.props.mode=e.mode);e=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT);e&&this._renderView(e)}_handleSave(e){var t;0<e.length&&(this.state.items=e,this.state.isEditing=!1,(t=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT))&&this._renderView(t),this.props.callbacks.onSave)&&this.props.callbacks.onSave(e)}_handleClear(){this.state.items=[],this.state.isEditing=!0;var e=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT);e&&this._renderView(e),this.props.callbacks.onClear&&this.props.callbacks.onClear()}_handleChange(){this.state.isEditing=!0;var e=this.sectionElement.querySelector("."+CSS_CLASSES.SECTION_CONTENT);e&&this._renderView(e),this.props.callbacks.onChange&&this.props.callbacks.onChange()}cleanup(){this.activeView&&this.activeView.cleanup(),this.header&&this.header.cleanup(),this.sectionElement&&this.sectionElement.parentElement&&this.sectionElement.remove(),this.sectionElement=null}}module.exports=AnalyzersSection;
