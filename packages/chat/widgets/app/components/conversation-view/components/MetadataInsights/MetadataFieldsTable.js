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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let DomUtils=require("../../utils/DomUtils"),Table=require("../../Dependencies").Table,h=DomUtils.h;class InsightsTable{constructor(e,t,a,i=null,s=[],l=!1){this.renderTo=e,this.context=t,this.analyzerId=a,this.readOnly=l,this.onSelectionChange=i,this.analyzerSchema=null,this.selectedFields=new Set,this.tableInstance=null,s.forEach(e=>this.selectedFields.add(e)),this._handleCheckboxChange=this._handleCheckboxChange.bind(this),this._renderTable()}_renderTable(){var e=[{id:"metadata",header:"Metadata",width:"auto",renderCell:e=>h.createDiv({append:[h.createSpan({text:e.title,style:{fontWeight:"600"}}),h.createBr(),h.createSpan({text:e.description,style:{fontSize:".9em",color:"#666"}})]})},{id:"type",header:"Type",width:"100px",renderCell:e=>h.createText(e.type)},{id:"select",header:"",width:"40px",textAlign:"center",renderCell:e=>{e=h.createInput({type:"checkbox",id:"insight-checkbox-"+e.fieldName,dataset:{fieldName:e.fieldName},checked:this.selectedFields.has(e.fieldName),disabled:this.readOnly});return e.addEventListener("change",this._handleCheckboxChange),e}}];this.tableInstance=new Table(this.renderTo,{columns:e,options:{maxBodyHeight:"300px",emptyMessage:"No metadata fields found for this analyzer."}})}render(e,t,a){this.analyzerSchema=e,void 0!==a&&(this.readOnly=a),void 0!==t&&(this.selectedFields.clear(),t.forEach(e=>this.selectedFields.add(e)));var i,s=[];if(e&&e.properties&&0<Object.keys(e.properties).length)for(var l in e.properties)Object.hasOwnProperty.call(e.properties,l)&&(i=e.properties[l],s.push({fieldName:l,title:i.title||l,description:i.description||"No description available.",type:i.type}));this.tableInstance.updateData(s)}_handleCheckboxChange(e){var t,e=e.target;"checkbox"===e.type&&e.dataset.fieldName&&(t=e.dataset.fieldName,e.checked?this.selectedFields.add(t):this.selectedFields.delete(t),this.onSelectionChange)&&this.onSelectionChange()}getSelectedMetadataFields(){return Array.from(this.selectedFields)}cleanup(){this.tableInstance&&this.tableInstance.cleanup(),console.log("Cleaned up InsightsTable.")}}module.exports=InsightsTable;
