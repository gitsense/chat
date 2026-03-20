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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,SearchInput=require("../../../ui/search-input").SearchInput;class MessageSearchInput{constructor(e,s={}){this.container=e,this.options={onSearchChange:()=>{},...s},this.searchTerm="",this.searchInput=null,this.h=DomUtils.h}render(){this.container.innerHTML="",this.searchInput=new SearchInput(this.container,{placeholder:"Search messages...",width:"100%",onFilterChange:e=>{this.searchTerm=e.target.value,this.options.onSearchChange(this.searchTerm)}}),this.searchInput.render()}getSearchTerm(){return this.searchTerm}cleanup(){this.searchInput&&(this.searchInput.cleanup(),this.searchInput=null)}}module.exports={MessageSearchInput:MessageSearchInput};
