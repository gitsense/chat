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

let path=require("path"),AnalyzerUtils=require("@gitsense/gsc-utils").AnalyzerUtils,SearchBuilderModule=require("./modules"),buildMetaInsightsQuery=require("./modules/buildMetaInsightsQuery").buildMetaInsightsQuery,loadProfile=require("../utils/profileLoader").loadProfile,analyzeMessagesBasePath=require("../../Dependencies").analyzeMessagesBasePath;class SearchBuilder{constructor(e){this.db=e}async build(e,t=null,a="main"){var{profile:r,parsedOutputs:i}=await loadProfile(e),s={...r.defaults,...e,profile:e.profile||r.name,scope:e.scope||r.defaults.scope,targets:(e.targets?.length?e:r.defaults).targets,filters:{...r.defaults.filters,...e.filters},options:{...r.defaults.options,...e.options},pagination:{limit:e.pagination?.limit||r.defaults.pagination.limit,offset:e.pagination?.offset||r.defaults.pagination.offset}};if(s.isMetaInsights)return(p=await buildMetaInsightsQuery(this.db,s,t)).filterChatIdsCteName&&p.filterCteQuery&&(p.finalQuery=p.finalQuery.with(p.filterChatIdsCteName,p.filterCteQuery)),p;if(s.isMetaSearch&&s.analyzerId)try{var l,o=await AnalyzerUtils.getAnalyzerSchema(analyzeMessagesBasePath,s.analyzerId);if(o&&o.properties)for(var n in o.properties)Object.hasOwnProperty.call(o.properties,n)&&(l=o.properties[n],s.outputs.messages.push({field:"messages.meta.extracted_metadata."+n,type:l.type}))}catch(e){console.warn(`SearchBuilder: Could not load schema for analyzer ${s.analyzerId}. Dynamic metadata output may be incomplete. Error: `+e.message)}s.messageTypes&&0<s.messageTypes.length&&(s.filters["messages.type"]=s.messageTypes,delete s.messageTypes),s.chatTypes&&0<s.chatTypes.length&&(s.filters["chats.type"]=s.chatTypes,delete s.chatTypes);var p=s.metadataFilters&&0<s.metadataFilters.length,p=(s.isEmptySearch=0===s.keywords.length&&0===s.phrases.length&&!p,null==s.pagination.limit&&(s.pagination.limit=10),null==s.pagination.offset&&(s.pagination.offset=0),Object.values(i.targetSpecific).some(e=>e.some(e=>"object"==typeof e&&e.snippet)));let u,d,c,f=(c=s.isEmptySearch?(u=i.emptySearchTargetSpecific||i.targetSpecific,d=0<i.emptySearchConsolidated.length?i.emptySearchConsolidated:i.consolidated,e.sortBy||i.emptySearchSortBy||r.defaults.sortBy):(u=i.targetSpecific,d=i.consolidated,e.sortBy||r.sortBy||r.defaults.sortBy),i);"main"===a&&p&&(e=(e=>{var t,a={};for(t in e)e[t]&&(a[t]=e[t].filter(e=>!("object"==typeof e&&e.snippet)));return a})(i.targetSpecific),f={...i,targetSpecific:e},s.outputs=e),s.sortBy=c,1===s.targets.length&&"all"===s.targets[0]&&(s.targets=r.defaults.targets);i.topLevel;let y=null;return{finalQuery:y=(s.isEmptySearch?y=await SearchBuilderModule.buildEmptySearchQuery(this.db,s,t,Array.from(extractConsolidatedOutputs(f)),u):await SearchBuilderModule.buildStandardSearchQuery(this.db,s,t,Array.from(extractConsolidatedOutputs(f)),f)).finalQuery,finalOutputsStructure:f.targetSpecific,finalTopLevelOutputs:f.topLevel,searchCriteria:s,originalSnippetsRequested:p}}}function extractConsolidatedOutputs(e){let t=new Set;for(var a in e.targetSpecific)e.targetSpecific[a]&&e.targetSpecific[a].forEach(e=>{e="object"==typeof e&&null!==e&&e.field?e.field:e;"string"==typeof e&&t.add(e)});return t}module.exports=SearchBuilder;
