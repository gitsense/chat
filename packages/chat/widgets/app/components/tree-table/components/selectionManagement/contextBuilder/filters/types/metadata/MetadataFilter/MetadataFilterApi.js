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

class MetadataFilterApi{constructor(a){a&&"object"==typeof a||console.error("MetadataFilterApi: Invalid chatApi instance provided."),this.chatApi=a,this._analyzers=[],this._analyzerSchemas={}}async fetchAnalyzers(){if(!this.chatApi||"function"!=typeof this.chatApi.getAnalyzers)throw console.error("MetadataFilterApi: chatApi or getAnalyzers function is not available."),new Error("API not available");try{return this._analyzers=await this.chatApi.getAnalyzers(),this._analyzers}catch(a){throw console.error("MetadataFilterApi: Failed to fetch analyzers:",a),a}}getAnalyzers(){return this._analyzers}async fetchAnalyzerSchema(t){if(!t)return console.warn("MetadataFilterApi: Cannot fetch schema. No analyzer ID provided."),null;if(!this.chatApi||"function"!=typeof this.chatApi.getAnalyzerSchema)throw console.error("MetadataFilterApi: chatApi or getAnalyzerSchema function is not available."),new Error("API not available");if(this._analyzerSchemas[t])return this._analyzerSchemas[t];try{var a=await this.chatApi.getAnalyzerSchema(t);return this._analyzerSchemas[t]=a}catch(a){throw console.error(`MetadataFilterApi: Failed to fetch schema for analyzer "${t}":`,a),a}}getAnalyzerSchema(a){return this._analyzerSchemas[a]||null}}module.exports=MetadataFilterApi;
