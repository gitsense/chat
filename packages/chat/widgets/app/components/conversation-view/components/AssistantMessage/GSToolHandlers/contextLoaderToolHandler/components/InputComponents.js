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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,{FILTER_INPUT_OPTIONS,ANALYZE_BUILDER_INPUT_OPTIONS}=require("../constants");function createInputs(e,s){if(!e||!e.length)return null;let a=DomUtils.h.createDiv({cls:"context-input-container",style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"17px",marginBottom:"20px"}}),r={};return e.forEach(i=>{var t=i.id;if(t){if(null==i.show||i.show){var n=DomUtils.h.createDiv({style:{display:"flex",alignItems:"center"}}),e=DomUtils.h.createSpan({text:i.label+":",style:{marginRight:"5px",fontWeight:500}});if(n.appendChild(e),"dropdown"===i.type){let e=i.options;if("string"==typeof i.options)switch(t){case"analyzed":e=FILTER_INPUT_OPTIONS.ANALYZED;break;case"batch-size":e=ANALYZE_BUILDER_INPUT_OPTIONS.BATCH_SIZE;break;case"committed":e=ANALYZE_BUILDER_INPUT_OPTIONS.COMMITTED;break;case"content":e=FILTER_INPUT_OPTIONS.CONTENT;break;case"min-item-size":e=ANALYZE_BUILDER_INPUT_OPTIONS.MIN_ITEM_SIZE;break;case"max-context-items":e=ANALYZE_BUILDER_INPUT_OPTIONS.MAX_CONTEXT_ITEMS;break;case"source":e=FILTER_INPUT_OPTIONS.SOURCE;break;case"total-items":e=FILTER_INPUT_OPTIONS.TOTAL_ITEMS;break;case"total-tokens":e=FILTER_INPUT_OPTIONS.TOTAL_TOKENS;break;case"max-context-tokens":e=ANALYZE_BUILDER_INPUT_OPTIONS.MAX_CONTEXT_TOKENS;break;default:throw new Error(`Unrecognized input ID "${t}"`)}let a=DomUtils.h.createSelect({id:"input-"+t,style:{padding:"3px 5px",border:"1px solid #ccc",borderRadius:"4px",fontSize:"13px"}});e.forEach(e=>{var t=DomUtils.h.createOption({value:e.value,text:e.text});e.value===i.defaultValue&&(t.selected=!0),a.appendChild(t)}),n.appendChild(a),(r[t]=a).addEventListener("change",()=>{s&&s()})}a.appendChild(n)}}else console.warn("Skipping input due to missing 'id'",i)}),{elem:a,api:{getInputValues:()=>{var e,t={};for(e in r)t[e]=r[e].value;return t}}}}module.exports={createInputs:createInputs};
