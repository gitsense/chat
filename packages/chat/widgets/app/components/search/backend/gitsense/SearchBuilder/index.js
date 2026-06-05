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

let path=require("path"),AnalyzerUtils=require("@gitsense/gsc-utils").AnalyzerUtils,SearchBuilderModule=require("./modules"),buildMetaRawQuery=require("./modules/buildMetaRawQuery").buildMetaRawQuery,buildMetaInsightsQuery=require("./modules/buildMetaInsightsQuery").buildMetaInsightsQuery,loadProfile=require("../utils/profileLoader").loadProfile,analyzersBasePath=require("../../Dependencies").analyzersBasePath;class SearchBuilder{constructor(e){this.db=e}async build(e,t=null,a="main"){var{profile:r,parsedOutputs:i}=await loadProfile(e),s={...r.defaults,...e,profile:e.profile||r.name,scope:e.scope||r.defaults.scope,targets:(e.targets?.length?e:r.defaults).targets,filters:{...r.defaults.filters,...e.filters},options:{...r.defaults.options,...e.options},pagination:{limit:e.pagination?.limit||r.defaults.pagination.limit,offset:e.pagination?.offset||r.defaults.pagination.offset}};if(s.isMetaInsights)return(u=await buildMetaInsightsQuery(this.db,s,t)).filterChatIdsCteName&&u.filterCteQuery&&(u.finalQuery=u.finalQuery.with(u.filterChatIdsCteName,u.filterCteQuery)),u;if(s.isMetaRaw)return await buildMetaRawQuery(this.db,s,t);if(s.isMetaSearch&&s.analyzerId)try{var l,o=await AnalyzerUtils.getAnalyzerSchema(analyzersBasePath,s.analyzerId);if(o&&o.properties)for(var n in o.properties)Object.hasOwnProperty.call(o.properties,n)&&(l=o.properties[n],s.outputs.messages.push({field:"messages.meta.extracted_metadata."+n,type:l.type}))}catch(e){console.warn(`SearchBuilder: Could not load schema for analyzer ${s.analyzerId}. Dynamic metadata output may be incomplete. Error: `+e.message)}s.messageTypes&&0<s.messageTypes.length&&(s.filters["messages.type"]=s.messageTypes,delete s.messageTypes),s.chatTypes&&0<s.chatTypes.length&&(s.filters["chats.type"]=s.chatTypes,delete s.chatTypes);var u=s.metadataFilters&&0<s.metadataFilters.length,u=(s.isEmptySearch=!("git-nav"===s.profile)&&0===s.keywords.length&&0===s.phrases.length&&!u,null==s.pagination.limit&&(s.pagination.limit=10),null==s.pagination.offset&&(s.pagination.offset=0),Object.values(i.targetSpecific).some(e=>e.some(e=>"object"==typeof e&&e.snippet)));let p,d,c,f=(c=s.isEmptySearch?(p=i.emptySearchTargetSpecific||i.targetSpecific,d=0<i.emptySearchConsolidated.length?i.emptySearchConsolidated:i.consolidated,e.sortBy||i.emptySearchSortBy||r.defaults.sortBy):(p=i.targetSpecific,d=i.consolidated,e.sortBy||r.sortBy||r.defaults.sortBy),i);"main"===a&&u&&(e=(e=>{var t,a={};for(t in e)e[t]&&(a[t]=e[t].filter(e=>!("object"==typeof e&&e.snippet)));return a})(i.targetSpecific),f={...i,targetSpecific:e},s.outputs=e),s.sortBy=c,1===s.targets.length&&"all"===s.targets[0]&&(s.targets=r.defaults.targets);i.topLevel;let y=null;return{finalQuery:y=(s.isEmptySearch?y=await SearchBuilderModule.buildEmptySearchQuery(this.db,s,t,Array.from(extractConsolidatedOutputs(f)),p):await SearchBuilderModule.buildStandardSearchQuery(this.db,s,t,Array.from(extractConsolidatedOutputs(f)),f)).finalQuery,finalOutputsStructure:f.targetSpecific,finalTopLevelOutputs:f.topLevel,searchCriteria:s,originalSnippetsRequested:u}}}function extractConsolidatedOutputs(e){let t=new Set;for(var a in e.targetSpecific)e.targetSpecific[a]&&e.targetSpecific[a].forEach(e=>{e="object"==typeof e&&null!==e&&e.field?e.field:e;"string"==typeof e&&t.add(e)});return t}module.exports=SearchBuilder;
