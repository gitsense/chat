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

let{parseFullMetaFilter,splitMappingPairs}=require("../../utils/queryStringParser"),{FULL_META_DELIMITER,FULL_META_FILTER_REGEX}=require("./constants"),FullMetaErrorHandler=require("./FullMetaErrorHandler");class FullMetaQueryProcessor{constructor(){this.errorHandler=new FullMetaErrorHandler}extractFullMetaFilters(r){return r.match(FULL_META_FILTER_REGEX)||[]}parseFullMetaFilter(r,e=!1){try{return parseFullMetaFilter(r,e)}catch(r){throw this.errorHandler.createInvalidSyntaxError(r.message)}}parseAllFullMetaFilters(r,e=!1){var t,l=[];for(t of this.extractFullMetaFilters(r)){var a=this.parseFullMetaFilter(t,e);this.errorHandler.validateParsedFilter(a,e),l.push(a)}return l}groupFiltersByAnalyzer(r){var e,t={};for(e of r){var l=e.analyzerId;t[l]||(t[l]=[]),t[l].push(e)}return t}buildMetaSearchSubQueryForAnalyzerGroup(r,e,t){let l=r;var a,i;for(a of this.extractFullMetaFilters(l))l=l.replace(a,"").trim();l+=" analyzer:"+e;for(i of t){var s=`meta:${i.field}:`+i.type+i.operator+i.value;l+=" "+s}return l.trim()}buildMetaInsightsSubQueryForAnalyzerGroup(r,e,t){let l=r;var a;for(a of this.extractFullMetaFilters(l))l=l.replace(a,"").trim();(l=l.replace(/profile:meta-search/i,"")).includes("profile:meta-insights")||(l="profile:meta-insights "+l),l+=" analyzer:"+e;r=t.map(r=>`insight-field:${r.field}:`+r.type).join(" ");return(l+=" "+r).trim()}removeFullMetaFilters(r){var e;let t=r;for(e of this.extractFullMetaFilters(r))t=t.replace(e,"").trim();return t}}module.exports=FullMetaQueryProcessor;
