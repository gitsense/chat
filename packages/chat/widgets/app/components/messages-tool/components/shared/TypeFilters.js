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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class TypeFilters{constructor(e,t={}){this.container=e,this.options={onFilterChange:()=>{},...t},this.filters={system:!0,user:!0,assistant:!0},this.h=DomUtils.h}render(){this.container.innerHTML="";let r=this.h.createDiv({className:"gs-type-filters"});Object.entries(this.filters).forEach(([e,t])=>{var i=this.h.createLabel({style:{display:"flex",alignItems:"center",gap:"5px",fontSize:"14px",fontWeight:500,marginRight:"15px"}});let s=this.h.createCheckbox({checked:t,dataset:{type:e},onchange:()=>{this.filters[e]=s.checked,this.options.onFilterChange(this.filters)}});t=this.h.createSpan({text:e.charAt(0).toUpperCase()+e.slice(1)});i.appendChild(s),i.appendChild(t),r.appendChild(i)}),this.container.appendChild(r)}getActiveFilters(){return this.filters}cleanup(){this.container.innerHTML=""}}module.exports={TypeFilters:TypeFilters};
