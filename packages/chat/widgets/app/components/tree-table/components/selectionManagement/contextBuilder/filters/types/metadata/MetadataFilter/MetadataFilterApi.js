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

class MetadataFilterApi{constructor(a){a&&"object"==typeof a||console.error("MetadataFilterApi: Invalid chatApi instance provided."),this.chatApi=a,this._analyzers=[],this._analyzerSchemas={}}async fetchAnalyzers(){if(!this.chatApi||"function"!=typeof this.chatApi.getAnalyzers)throw console.error("MetadataFilterApi: chatApi or getAnalyzers function is not available."),new Error("API not available");try{return this._analyzers=await this.chatApi.getAnalyzers(),this._analyzers}catch(a){throw console.error("MetadataFilterApi: Failed to fetch analyzers:",a),a}}getAnalyzers(){return this._analyzers}async fetchAnalyzerSchema(t){if(!t)return console.warn("MetadataFilterApi: Cannot fetch schema. No analyzer ID provided."),null;if(!this.chatApi||"function"!=typeof this.chatApi.getAnalyzerSchema)throw console.error("MetadataFilterApi: chatApi or getAnalyzerSchema function is not available."),new Error("API not available");if(this._analyzerSchemas[t])return this._analyzerSchemas[t];try{var a=await this.chatApi.getAnalyzerSchema(t);return this._analyzerSchemas[t]=a}catch(a){throw console.error(`MetadataFilterApi: Failed to fetch schema for analyzer "${t}":`,a),a}}getAnalyzerSchema(a){return this._analyzerSchemas[a]||null}}module.exports=MetadataFilterApi;
