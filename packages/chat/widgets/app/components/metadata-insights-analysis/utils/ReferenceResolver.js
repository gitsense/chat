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

let METADATA_INSIGHT_RESULT_CONSTANTS=require("../constants").METADATA_INSIGHT_RESULT_CONSTANTS;class ReferenceResolver{static resolve(T,E){var e;return T&&E&&(e=this._getReferenceType(T))&&(E=E[e])&&E.find(E=>E.id===T)||null}static resolveRepository(T,E){return T&&E[METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.REPOSITORIES]&&E[METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.REPOSITORIES].find(E=>E.id===T)||null}static resolveBranch(T,E){return T&&E[METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.BRANCHES]&&E[METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.BRANCHES].find(E=>E.id===T)||null}static resolveAnalyzer(T,E){return T&&E[METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.ANALYZERS]&&E[METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.ANALYZERS].find(E=>E.id===T)||null}static resolveField(T,E){return T&&E[METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.FIELDS]&&E[METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.FIELDS].find(E=>E.id===T)||null}static getLabel(E,T){T=this.resolve(E,T);return T?T.label:E}static getDescription(E,T){E=this.resolve(E,T);return E?E.description:""}static createLookupMap(E){let e={};return Object.keys(E).forEach(T=>{E[T].forEach(E=>{e[E.id]={...E,type:T}})}),e}static resolveMultiple(E,T){return Array.isArray(E)&&T?E.map(E=>this.resolve(E,T)).filter(E=>null!==E):[]}static _getReferenceType(E){if(!E||"string"!=typeof E)return null;switch(E.charAt(0)){case"R":return METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.REPOSITORIES;case"B":return METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.BRANCHES;case"A":return METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.ANALYZERS;case"F":return METADATA_INSIGHT_RESULT_CONSTANTS.REFERENCE_TYPES.FIELDS;default:return null}}static formatCompact(E,T){T=this.resolve(E,T);return T?E+": "+T.label:E}static formatExpanded(E,T){T=this.resolve(E,T);if(!T)return E;let e=E+": "+T.label;return T.description&&(e+=" - "+T.description),e}}module.exports=ReferenceResolver;
