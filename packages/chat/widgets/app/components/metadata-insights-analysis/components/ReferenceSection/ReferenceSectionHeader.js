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

let{DomUtils,SVGUtils}=require("@gitsense/gsc-utils"),METADATA_INSIGHT_RESULT_CONSTANTS=require("../../constants").METADATA_INSIGHT_RESULT_CONSTANTS;class ReferenceSectionHeader{constructor(e,t,n,i=!0,s=()=>{}){if(!e)throw new Error("ReferenceSectionHeader: Container is required");this.container=e,this.referenceType=t,this.count=n,this.isExpanded=i,this.onToggle=s,this.headerElement=null,this.titleElement=null,this.countElement=null,this.iconElement=null,this._initialize()}_initialize(){this._render()}_render(){this.headerElement=DomUtils.h.createDiv({cls:METADATA_INSIGHT_RESULT_CONSTANTS.CSS_CLASSES.REFERENCE_HEADER,style:{display:"flex",alignItems:"center",padding:"5px 0",cursor:"pointer",userSelect:"none",fontWeight:"600",color:"#495057"},onclick:()=>this._handleClick()}),this.iconElement=this._createChevronIcon(),this.headerElement.appendChild(this.iconElement),this.titleElement=DomUtils.h.createSpan({text:this._getFormattedTitle(),style:{marginLeft:"5px",flex:"1",fontSize:"1.1em"}}),this.headerElement.appendChild(this.titleElement),this.countElement=DomUtils.h.createSpan({text:""+this.count,style:{fontSize:"12px",color:"#6c757d",backgroundColor:"#e9ecef",padding:"2px 6px",borderRadius:"10px",marginLeft:"8px"}}),this.headerElement.appendChild(this.countElement),this.container.appendChild(this.headerElement)}_createChevronIcon(){return SVGUtils.chevronRight({style:{width:"16px",height:"16px",color:"#6c757d",transition:"transform 0.2s ease",transform:this.isExpanded?"rotate(90deg)":"rotate(0deg)"}})}_getFormattedTitle(){return{[METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.REPOSITORIES]:"Repositories",[METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.BRANCHES]:"Branches",[METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.ANALYZERS]:"Analyzers",[METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.FIELDS]:"Fields"}[this.referenceType]||this.referenceType}_handleClick(){this.onToggle(this.referenceType)}setExpanded(e){this.isExpanded=e,this._updateIcon()}_updateIcon(){this.iconElement&&(this.iconElement.remove(),this.iconElement=this._createChevronIcon(),this.headerElement.insertBefore(this.iconElement,this.titleElement))}updateCount(e){this.count=e,this.countElement&&(this.countElement.textContent=""+this.count)}getExpanded(){return this.isExpanded}cleanup(){this.headerElement&&this.headerElement.parentElement&&this.headerElement.remove(),this.headerElement=null,this.titleElement=null,this.countElement=null,this.iconElement=null}}module.exports=ReferenceSectionHeader;
