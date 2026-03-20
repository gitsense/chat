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

let FilterTable=require("../../FilterTable").FilterTable;class LanguageFilter{constructor({container:e,onFilterChange:t}){this.container=e,this.onFilterChange=t,this.filterData={},this.uiElements={},this.renderInitialStructure()}renderInitialStructure(){this.container.innerHTML=`
            <div class="language-filter-table-container">
                <!-- FilterTable will be rendered here by the component -->
            </div>
        `,this.uiElements.tableContainer=this.container.querySelector(".language-filter-table-container")}render(t,e=new Set){this.filterData=t,this.uiElements.tableContainer||this.renderInitialStructure();var i=Object.keys(t).map(e=>({id:e,name:e,count:t[e]}));this.filterTable?(this.filterTable.updateData(i),this.filterTable.setSelectedIds(Array.from(e))):this.filterTable=new FilterTable({container:this.uiElements.tableContainer,data:i,nameColumnHeader:"Language",sortColumn:"count",sortDirection:"desc",onSelectionChange:this.handleTableSelectionChange.bind(this),initialSelectedIds:Array.from(e),inputPlaceholder:"Filter items by language..."})}handleTableSelectionChange(e){e=e.selectedIds||[];this.onFilterChange(new Set(e))}update(e,t){this.render(e,t)}getState(){return new Set(this.filterTable?this.filterTable.getSelectedIds():[])}setState(e){this.filterTable&&this.filterTable.setSelectedIds(Array.from(e))}reset(){this.filterTable&&this.filterTable.clearSelections()}setDisabled(e){this.filterTable&&this.filterTable.setDisabled(e)}}module.exports={LanguageFilter:LanguageFilter};
