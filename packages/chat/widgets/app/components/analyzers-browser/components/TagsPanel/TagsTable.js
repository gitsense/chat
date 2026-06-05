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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,Table=require("../../../ui/table").Table;class TagsTable{constructor(e,t){if(!e)throw new Error("TagsTable requires a containerElement.");if(!t||!Array.isArray(t.tags))throw new Error("TagsTable requires a config object with a tags array.");if("function"!=typeof t.onSelectionChange)throw new Error("TagsTable requires an onSelectionChange callback function.");this.containerElement=e,this.config=t,this.tags=t.tags||[],this.selectedTags=new Set,this.table=null,this.h=DomUtils.h}render(){this.containerElement.innerHTML="";var e=this._getColumnConfig();this.table=new Table(this.containerElement,{columns:e,options:{emptyMessage:"No tags found.",cellPadding:"10px",fontSize:"14px",addMarkdownBodyClass:!0}}),this._setupEventDelegation(),this.updateData(this.tags),setTimeout(()=>{this.table&&(this.table.refreshColumnWidths(!0),this.table.refreshOptions({maxBodyHeight:-40}))},50),setTimeout(()=>{this.table&&(this.table.refreshColumnWidths(!0),this.table.refreshOptions({maxBodyHeight:-40}))},500)}_getColumnConfig(){var e=this.h.createInput({type:"checkbox",id:"gsc-tags-select-all",style:{cursor:"pointer",margin:"0 5px"}});return e.addEventListener("change",e=>{e.target.checked?this.selectAll():this.clearAll()}),[{id:"select",header:e,width:"50px",textAlign:"center",verticalAlign:"middle",renderCell:e=>this.h.createInput({type:"checkbox",id:"gsc-tag-checkbox-"+e.name,checked:this.selectedTags.has(e.name),style:{cursor:"pointer",margin:"0 5px"}})},{id:"name",header:"Tag",width:"auto",renderCell:e=>this.h.createSpan({text:e.name,style:{fontWeight:"500"}})},{id:"count",header:"Count",width:"80px",textAlign:"center",verticalAlign:"middle",renderCell:e=>this.h.createSpan({text:e.count.toString()})}]}_setupEventDelegation(){this.containerElement.addEventListener("change",e=>{var t;"checkbox"===e.target.type&&e.target.id.startsWith("gsc-tag-checkbox-")&&(t=e.target.id.replace("gsc-tag-checkbox-",""),e.target.checked?this.selectedTags.add(t):this.selectedTags.delete(t),this._updateSelectAllCheckbox(),this.config.onSelectionChange(Array.from(this.selectedTags)))})}_updateSelectAllCheckbox(){var e,t,a=this.containerElement.querySelector("#gsc-tags-select-all");a&&(e=this.tags.length,t=this.selectedTags.size,a.checked=0<e&&t===e)}updateData(e){this.tags=e||[],this.table&&(this.table.updateData(this.tags),this._updateCheckboxStates(),this._updateSelectAllCheckbox())}_updateCheckboxStates(){requestAnimationFrame(()=>{this.containerElement.querySelectorAll('input[type="checkbox"][id^="gsc-tag-checkbox-"]').forEach(e=>{var t=e.id.replace("gsc-tag-checkbox-","");e.checked=this.selectedTags.has(t)})})}selectAll(){this.selectedTags.clear(),this.tags.forEach(e=>{this.selectedTags.add(e.name)}),this._updateCheckboxStates(),this._updateSelectAllCheckbox(),this.config.onSelectionChange(Array.from(this.selectedTags))}clearAll(){this.selectedTags.clear(),this._updateCheckboxStates(),this._updateSelectAllCheckbox(),this.config.onSelectionChange(Array.from(this.selectedTags))}getSelectedTags(){return Array.from(this.selectedTags)}setSelectedTags(e){this.selectedTags=new Set(e||[]),this._updateCheckboxStates(),this._updateSelectAllCheckbox(),this.config.onSelectionChange(Array.from(this.selectedTags))}cleanup(){this.table&&(this.table.cleanup(),this.table=null),this.containerElement.innerHTML=""}}module.exports={TagsTable:TagsTable};
