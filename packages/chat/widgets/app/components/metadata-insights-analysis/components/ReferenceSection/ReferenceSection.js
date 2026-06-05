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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,METADATA_INSIGHT_RESULT_CONSTANTS=require("../../constants").METADATA_INSIGHT_RESULT_CONSTANTS,ReferenceSectionHeader=require("./ReferenceSectionHeader"),ReferenceList=require("./ReferenceList");class ReferenceSection{constructor(e,t,i,s=!0,n=()=>{},r={},h=0,a=null){if(!e)throw new Error("ReferenceSection: Container is required");if(!Array.isArray(t))throw new Error("ReferenceSection: References must be an array");this.container=e,this.references=t,this.referenceType=i,this.isExpanded=s,this.onToggle=n,this.callbacks=r,this.totalFieldCount=h,this.stateManager=a,this.header=null,this.list=null,this.sectionElement=null,this._initialize()}_initialize(){this._render()}_render(){this.sectionElement=DomUtils.h.createDiv({cls:METADATA_INSIGHT_RESULT_CONSTANTS.CSS_CLASSES.REFERENCE_SECTION,style:{marginBottom:"5px"}}),this.header=new ReferenceSectionHeader(this.sectionElement,this.referenceType,this.references.length,this.isExpanded,e=>this._handleToggle(e)),this.listContainer=DomUtils.h.createDiv({style:{overflow:"hidden",transition:"max-height 0.2s ease-out"}}),this.isExpanded&&(this.list=new ReferenceList(this.listContainer,this.references,this.referenceType,{...this.callbacks,totalFieldCount:this.totalFieldCount,stateManager:this.stateManager})),this._updateListHeight(),this.sectionElement.appendChild(this.listContainer),this.container.appendChild(this.sectionElement)}_handleToggle(e){this.isExpanded=!this.isExpanded,this.header.setExpanded(this.isExpanded),this._updateListVisibility(),this.onToggle(e,this.isExpanded)}_updateListVisibility(){this.isExpanded&&!this.list?this.list=new ReferenceList(this.listContainer,this.references,this.referenceType,{...this.callbacks,totalFieldCount:this.totalFieldCount,stateManager:this.stateManager}):!this.isExpanded&&this.list&&(this.list.cleanup(),this.list=null),this._updateListHeight()}_updateListHeight(){this.listContainer&&(this.isExpanded?setTimeout(()=>{this.listContainer&&this.isExpanded&&(this.listContainer.style.maxHeight=this.listContainer.scrollHeight+"px")},10):this.listContainer.style.maxHeight="0px")}updateReferences(e){if(!Array.isArray(e))throw new Error("ReferenceSection: New references must be an array");this.references=e,this.header&&this.header.updateCount(this.references.length),this.list&&this.list.updateReferences(this.references),this._updateListHeight()}updateSelectedValuesCount(){this.referenceType===METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.FIELDS&&this.list&&this.list._updateSelectedValuesCountDisplay()}updateFieldVisibilityDisplay(){this.referenceType===METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.FIELDS&&this.list&&this.list._updateFieldVisibilityDisplay()}getReferences(){return[...this.references]}getReferenceType(){return this.referenceType}setExpanded(e){this.isExpanded!==e&&(this.isExpanded=e,this.header&&this.header.setExpanded(e),this._updateListVisibility())}getExpanded(){return this.isExpanded}cleanup(){this.header&&(this.header.cleanup(),this.header=null),this.list&&(this.list.cleanup(),this.list=null),this.sectionElement&&this.sectionElement.parentElement&&this.sectionElement.remove(),this.sectionElement=null,this.listContainer=null}}module.exports=ReferenceSection;
