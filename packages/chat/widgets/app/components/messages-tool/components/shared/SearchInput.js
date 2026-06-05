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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,SearchInput=require("../../../ui/search-input").SearchInput;class MessageSearchInput{constructor(e,s={}){this.container=e,this.options={onSearchChange:()=>{},...s},this.searchTerm="",this.searchInput=null,this.h=DomUtils.h}render(){this.container.innerHTML="",this.searchInput=new SearchInput(this.container,{placeholder:"Search messages...",width:"100%",onFilterChange:e=>{this.searchTerm=e.target.value,this.options.onSearchChange(this.searchTerm)}}),this.searchInput.render()}getSearchTerm(){return this.searchTerm}cleanup(){this.searchInput&&(this.searchInput.cleanup(),this.searchInput=null)}}module.exports={MessageSearchInput:MessageSearchInput};
