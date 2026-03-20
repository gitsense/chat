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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,Table=require("../../../ui/table").Table,Pagination=require("../../../ui/pagination").Pagination;class FacetDataTable{constructor(e,t={}){if(!e)throw new Error("FacetDataTable: Container is required");this.container=e,this.config={onSelectionChange:()=>{},onPageChange:()=>{},onPageSizeChange:()=>{},isValueSelected:()=>!1,options:{itemsPerPage:100,emptyMessage:"No values found matching the current filters.",maxBodyHeight:"500px",...t.options},...t},this.tableElement=null,this.table=null,this.pagination=null,this.currentData={rows:[],totalCount:0,currentPage:1,totalPages:0,itemsPerPage:this.config.options.itemsPerPage},this._initialize()}_initialize(){this._render()}_render(){var e=document.createElement("div");e.style.marginTop="10px",this.pagination=new Pagination(e,{currentPage:1,itemsPerPage:this.config.options.itemsPerPage,totalItems:0,itemsPerPageOptions:[10,25,50,100],maxVisiblePageButtons:5,showPageSizeSelector:!0,showPageInfo:!0,onPageChange:e=>this.config.onPageChange(e),onPageSizeChange:e=>this.config.onPageSizeChange(e)}),this.pagination.render(),this.tableElement=DomUtils.h.createDiv({cls:"facet-data-table markdown-body",style:{border:"1px solid #ddd",borderRadius:"4px",overflow:"hidden",marginBottom:"10px"}}),this.table=new Table(this.tableElement,{columns:this._createTableColumns(),options:{maxBodyHeight:this.config.options.maxBodyHeight,emptyMessage:this.config.options.emptyMessage,fontSize:"14px",cellPadding:"10px 15px"}}),this.container.appendChild(this.tableElement),this.container.appendChild(e)}_createTableColumns(){return[{id:"select",header:"",width:"50px",textAlign:"center",renderCell:e=>{let t=DomUtils.h.createInput({type:"checkbox",checked:this.config.isValueSelected(e.value),style:{width:"16px",height:"16px",cursor:"pointer"},onchange:()=>{this.config.onSelectionChange(e.value,t.checked)}});return t}},{id:"value",header:"Value",width:"auto",renderCell:e=>{var t=document.createElement("span");return t.textContent=e.value.toString(),t}},{id:"count",header:"Count",width:"80px",renderCell:e=>{var t=document.createElement("span");return t.textContent=e.count.toString(),t.style.color="#666",t}}]}update(t){if(this.table){this.currentData={rows:t.rows||[],totalCount:t.totalCount||0,currentPage:t.currentPage||1,totalPages:t.totalPages||0,itemsPerPage:t.itemsPerPage||this.config.options.itemsPerPage},this.table.updateData(this.currentData.rows),this.pagination&&this.pagination.update({currentPage:this.currentData.currentPage,totalItems:this.currentData.totalCount,itemsPerPage:this.currentData.itemsPerPage});let e=this.table;setTimeout(()=>{e&&e.refreshColumnWidths(!0)},200)}}getData(){return[...this.currentData.rows]}getPaginationState(){return{currentPage:this.currentData.currentPage,itemsPerPage:this.currentData.itemsPerPage,totalItems:this.currentData.totalCount,totalPages:this.currentData.totalPages}}cleanup(){this.pagination&&(this.pagination.cleanup(),this.pagination=null),this.table&&(this.table.cleanup(),this.table=null),this.tableElement&&this.tableElement.parentElement&&this.tableElement.remove(),this.tableElement=null}}module.exports=FacetDataTable;
