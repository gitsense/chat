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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,Table=require("../../../ui/table").Table;class AnalyzerSchemaView{constructor(e,t){this.container=e,this.rawSchema=t||{},this.h=DomUtils.h,this.table=null,this.elements=this._createLayout()}_createLayout(){this.container.innerHTML="";var e=this.h.createDiv({id:"gsc-asv-table-container",className:"markdown-body",style:{flexGrow:"1",overflowY:"auto"}});return this.container.appendChild(e),{tableContainer:e}}_processSchemaData(){var e,t,i=this.rawSchema.properties||{},a=new Set(this.rawSchema.required||[]),r=[];for(e in i)Object.prototype.hasOwnProperty.call(i,e)&&(t=i[e],r.push({fieldName:e,title:t.title||e,type:t.type||"unknown",description:t.description||"No description provided.",isRequired:a.has(e)?"Yes":"No"}));return r}render(){this.table&&this.table.cleanup(),this.elements.tableContainer.innerHTML="";var e=this._processSchemaData(),t=[{id:"fieldName",header:"Property Name",width:"150px",verticalAlign:"top",renderCell:e=>{var t=this.h.createSpan({text:e.fieldName});return"Yes"===e.isRequired&&(t.style.fontWeight="bold"),t}},{id:"type",header:"Type",width:"100px",verticalAlign:"top",renderCell:e=>e.type},{id:"description",header:"Description",width:"auto",verticalAlign:"top",renderCell:e=>e.description}];this.table=new Table(this.elements.tableContainer,{columns:t,options:{emptyMessage:"No schema properties defined for this analyzer.",fontSize:"14px",cellPadding:"10px",maxBodyHeight:"5000px"}}),e.forEach(e=>{this.table.addRow(e)}),setTimeout(()=>{this.table&&this.table.refreshColumnWidths(!0)},250)}destroy(){this.table&&(this.table.cleanup(),this.table=null),this.container.innerHTML=""}}module.exports={AnalyzerSchemaView:AnalyzerSchemaView};
