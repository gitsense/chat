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

let layouts=require("./layouts"),collectGitSenseCriteria=require("./utils/collectCriteria").collectCriteria,searchTargetOptions=require("./config/searchTargetOptions"),processGitSenseSearch=require("./utils/searchProcessor").processSearch,gitsenseEngine={name:"gitsense",dynamicElementHandlers:{aiEnabledCheckbox:async(e,t,n,i)=>{var a=t.querySelector('[name="aiEnabledCheckbox"]'),r=t.querySelector('[name="searchTargetProfileSelect"]'),t=t.querySelector('[name="aiAssistantSelect"]'),a=a.checked;r&&(r.style.display=a?"none":null),t&&(t.parentNode.style.display=a?null:"none")},aiAssistantToggle:async(e,t,n,i)=>{}},actions:{queryInput:{type:"search"},toggleAdvanced:{type:"toggle-visibility",target:"advancedOptionsSection"},searchButton:{type:"search"}},validateCriteria:function(e){return console.log("GitSense Engine: Validating search criteria...",e),e&&e.query||console.warn("GitSense Engine Validation: Query is empty."),!0},collectCriteria:function(e,t){return collectGitSenseCriteria(e,t)},processSearch:async function(e,t,n,i){await processGitSenseSearch(e,t,n,i)},getLayout:function(e){if(layouts[e])return layouts[e];console.warn(`GitSense Engine: Layout "${e}" not found. Available layouts: `+Object.keys(layouts).join(", "))},renderResults:function(e,t,n,i,a){}};module.exports=gitsenseEngine;
