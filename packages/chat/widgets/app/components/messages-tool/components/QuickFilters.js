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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,TypeFilters=require("./shared/TypeFilters").TypeFilters,MessageSearchInput=require("./shared/SearchInput").MessageSearchInput,RangeFilter=require("./shared/RangeFilter").RangeFilter;class QuickFilters{constructor(e,s={}){this.container=e,this.options={onFilterChange:()=>{},totalMessages:0,...s},this.components={},this.filters={system:!0,user:!0,assistant:!0,range:{from:null,to:null}},this.searchTerm="",this.h=DomUtils.h}render(){this.container.innerHTML="";var e=this.h.createDiv({className:"gs-quick-filters"}),s=this.h.createDiv({className:"gs-quick-range-filter-container"}),t=(this.components.rangeFilter=new RangeFilter(s,{totalMessages:this.options.totalMessages,onRangeChange:e=>{this.filters.range=e,this.notifyFilterChange()}}),this.components.rangeFilter.render(),this.h.createDiv({className:"gs-quick-type-filters-container"})),i=(this.components.typeFilters=new TypeFilters(t,{onFilterChange:e=>{this.filters.system=e.system,this.filters.user=e.user,this.filters.assistant=e.assistant,this.notifyFilterChange()}}),this.components.typeFilters.render(),this.h.createDiv({className:"gs-quick-search-container"}));this.components.searchInput=new MessageSearchInput(i,{onSearchChange:e=>{this.searchTerm=e,this.notifyFilterChange()}}),this.components.searchInput.render(),e.appendChild(i),e.appendChild(s),e.appendChild(t),this.container.appendChild(e)}notifyFilterChange(){this.options.onFilterChange({typeFilters:{system:this.filters.system,user:this.filters.user,assistant:this.filters.assistant},searchTerm:this.searchTerm,range:this.filters.range})}getFilters(){return{typeFilters:{system:this.filters.system,user:this.filters.user,assistant:this.filters.assistant},searchTerm:this.searchTerm,range:this.filters.range}}applyFilters(e){var{typeFilters:e,searchTerm:s,range:t}=e;e&&(this.filters.system=e.system,this.filters.user=e.user,this.filters.assistant=e.assistant,this.components.typeFilters)&&Object.entries(e).forEach(([e,s])=>{e=this.components.typeFilters.container.querySelector(`[data-type="${e}"]`);e&&(e.checked=s)}),void 0!==s&&(this.searchTerm=s,this.components.searchInput)&&(e=this.components.searchInput.container.querySelector("input"))&&(e.value=s),void 0!==t&&(this.filters.range=t,this.components.rangeFilter)&&this.components.rangeFilter.setRange(t)}setTotalMessages(e){this.options.totalMessages=e,this.components.rangeFilter&&this.components.rangeFilter.setTotalMessages(e)}cleanup(){Object.values(this.components).forEach(e=>{e.cleanup&&e.cleanup()})}}module.exports={QuickFilters:QuickFilters};
