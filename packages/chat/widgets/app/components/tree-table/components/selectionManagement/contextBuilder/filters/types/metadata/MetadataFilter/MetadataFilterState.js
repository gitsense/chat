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

let MetadataFilterTypes=require("./MetadataFilterTypes");class MetadataFilterState{constructor(e){e||console.error("MetadataFilterState: MetadataFilterApi instance is required."),this.api=e,this._selectedAnalyzers=[],this._analyzerSchemas=new Map,this._rules=[]}async selectAnalyzers(e){if(this._selectedAnalyzers=e||[],this._analyzerSchemas.clear(),0<this._selectedAnalyzers.length)try{var a=this._selectedAnalyzers.map(a=>this.api.fetchAnalyzerSchema(a).then(e=>({analyzerId:a,schema:e})).catch(e=>(console.error(`Failed to fetch schema for analyzer "${a}":`,e),{analyzerId:a,schema:null,error:e})));(await Promise.all(a)).forEach(({analyzerId:e,schema:a})=>{a&&this._analyzerSchemas.set(e,a)})}catch(e){throw console.error("MetadataFilterState: One or more analyzer schemas failed to load:",e),e}}getSelectedAnalyzers(){return[...this._selectedAnalyzers]}getAnalyzerSchema(e){return this._analyzerSchemas.get(e)||null}getAllAnalyzerSchemas(){return new Map(this._analyzerSchemas)}addRule(e){e.id||(e.id=`rule-${Date.now()}-`+Math.random().toString(36).substr(2,9)),this._rules.push({...e})}removeRule(a){this._rules=this._rules.filter(e=>e.id!==a)}updateRule(a,e){var t=this._rules.findIndex(e=>e.id===a);-1!==t&&(this._rules[t]={...this._rules[t],...e})}getFilterState(){var e;return 0!==this._selectedAnalyzers.length&&0!==this._analyzerSchemas.size&&0!==this._rules.length&&0<(e=this._rules.filter(e=>{var a=!!e.field&&!!e.operator,t=["is_null","is_not_null"].includes(e.operator),r=null!=e.value,l="range"===e.operator&&(null!==e.value?.min||null!==e.value?.max),e=("includes"===e.operator||"excludes"===e.operator)&&Array.isArray(e.value)&&0<e.value.length;return a&&(t||r||l||e)})).length?{analyzerIds:this._selectedAnalyzers,rules:e}:null}getRules(){return[...this._rules]}getUniqueSelectedFields(){let a=new Set;return this._rules.forEach(e=>{e.field&&a.add({analyzerId:e.analyzerId,fieldName:e.field})}),a}applyState(e){e?(this._selectedAnalyzers=e.analyzerIds||[],this._rules=(e.rules||[]).map(e=>(e.id||(e.id=`rule-${Date.now()}-`+Math.random().toString(36).substr(2,9)),e))):this.reset()}reset(){this._selectedAnalyzers=[],this._analyzerSchemas.clear(),this._rules=[]}resetRules(){this._rules=[]}}module.exports=MetadataFilterState;
