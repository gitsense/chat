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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,Table=require("../../../ui/table").Table;class AnalyzerSchemaView{constructor(e,t){this.container=e,this.rawSchema=t||{},this.h=DomUtils.h,this.table=null,this.elements=this._createLayout()}_createLayout(){this.container.innerHTML="";var e=this.h.createDiv({id:"gsc-asv-table-container",className:"markdown-body",style:{flexGrow:"1",overflowY:"auto"}});return this.container.appendChild(e),{tableContainer:e}}_processSchemaData(){var e,t,i=this.rawSchema.properties||{},a=new Set(this.rawSchema.required||[]),r=[];for(e in i)Object.prototype.hasOwnProperty.call(i,e)&&(t=i[e],r.push({fieldName:e,title:t.title||e,type:t.type||"unknown",description:t.description||"No description provided.",isRequired:a.has(e)?"Yes":"No"}));return r}render(){this.table&&this.table.cleanup(),this.elements.tableContainer.innerHTML="";var e=this._processSchemaData(),t=[{id:"fieldName",header:"Property Name",width:"150px",verticalAlign:"top",renderCell:e=>{var t=this.h.createSpan({text:e.fieldName});return"Yes"===e.isRequired&&(t.style.fontWeight="bold"),t}},{id:"type",header:"Type",width:"100px",verticalAlign:"top",renderCell:e=>e.type},{id:"description",header:"Description",width:"auto",verticalAlign:"top",renderCell:e=>e.description}];this.table=new Table(this.elements.tableContainer,{columns:t,options:{emptyMessage:"No schema properties defined for this analyzer.",fontSize:"14px",cellPadding:"10px",maxBodyHeight:"5000px"}}),e.forEach(e=>{this.table.addRow(e)}),setTimeout(()=>{this.table&&this.table.refreshColumnWidths(!0)},250)}destroy(){this.table&&(this.table.cleanup(),this.table=null),this.container.innerHTML=""}}module.exports={AnalyzerSchemaView:AnalyzerSchemaView};
