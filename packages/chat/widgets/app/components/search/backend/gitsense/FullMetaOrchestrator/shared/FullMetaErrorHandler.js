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

let{SUPPORTED_OPERATORS,SUPPORTED_TYPES}=require("./constants");class FullMetaErrorHandler{createInvalidSyntaxError(r){r=new Error("Invalid full-meta: syntax - "+r);return r.source="FullMetaOrchestrator",r.type="InvalidSyntaxError",r}createUnsupportedProfileError(r){r=new Error(`The 'full-meta:' filter is only supported with 'profile:meta-search' or 'profile:meta-insights'. Found profile: ${r}.`);return r.source="FullMetaOrchestrator",r.type="UnsupportedProfileError",r}createMissingParameterError(r){r=new Error(`Mandatory parameter '${r}' is missing.`);return r.source="FullMetaOrchestrator",r.type="MissingParameterError",r}createInvalidAnalyzerError(r){r=new Error(`Invalid or unknown analyzer ID: '${r}'.`);return r.source="FullMetaOrchestrator",r.type="InvalidAnalyzerError",r}createAnalyzerNotFoundError(r){r=new Error(`Analyzer '${r}' not found or schema could not be loaded.`);return r.source="FullMetaOrchestrator",r.type="AnalyzerNotFoundError",r}createInvalidFieldTypeError(r,e){r=new Error(`Invalid field '${r}' or type '${e}'. Field/type mismatch with analyzer schema.`);return r.source="FullMetaOrchestrator",r.type="InvalidFieldTypeError",r}createInvalidOperatorError(r){r=new Error(`Invalid operator '${r}'. Supported operators are: ${SUPPORTED_OPERATORS.join(", ")}.`);return r.source="FullMetaOrchestrator",r.type="InvalidOperatorError",r}createInvalidTypeError(r){r=new Error(`Invalid type '${r}'. Supported types are: ${SUPPORTED_TYPES.join(", ")}.`);return r.source="FullMetaOrchestrator",r.type="InvalidTypeError",r}validateParsedFilter(r,e=!1){if(!r.analyzerId)throw this.createMissingParameterError("analyzerId");if(!r.field)throw this.createMissingParameterError("field");if(!r.type)throw this.createMissingParameterError("type");if(!e&&!r.operator)throw this.createMissingParameterError("operator");if(!e&&null==r.value)throw this.createMissingParameterError("value");if(!e&&!SUPPORTED_OPERATORS.includes(r.operator))throw this.createInvalidOperatorError(r.operator);if(!SUPPORTED_TYPES.includes(r.type))throw this.createInvalidTypeError(r.type)}formatErrorResponse(r){return{status:"failed",error:r.message||r,source:r.source||"FullMetaOrchestrator",type:r.type||"UnknownError"}}}module.exports=FullMetaErrorHandler;
