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

class MetadataFilterLogic{constructor(){}extractFilterData(r){return null}applyFilter(r,e){if(e&&e.rules&&0!==e.rules.length){if(!r.meta||!r.meta.extracted_metadata)return!1;var a,t=r.meta.extracted_metadata;for(a of e.rules){var n=t[a.field],l=a.value,u=a.operator;if(null==n){if("is_not"===u&&null==l)continue;return!1}if(!this.evaluateRule(n,u,l))return!1}}return!0}evaluateRule(a,t,n){switch(t){case"is":return Array.isArray(a)?a.includes(n):a===n;case"is_not":return Array.isArray(a)?!a.includes(n):a!==n;case"range":if("number"!=typeof a)return!1;if("object"!=typeof n||null===n||!n.hasOwnProperty("min")&&!n.hasOwnProperty("max"))return console.warn("MetadataFilterLogic: Invalid ruleValue for 'range' operator. Expected { min: number | null, max: number | null }, got",n),!1;var l=n.min,u=n.max;if(!("number"==typeof a))return!1;let r=!0,e=(null!=l&&(r=l<=a),!0);return null!=u&&(e=a<=u),r&&e;case"includes":return Array.isArray(a)&&Array.isArray(n)?a.some(r=>n.includes(r)):!1;case"excludes":return Array.isArray(a)&&Array.isArray(n)?!a.some(r=>n.includes(r)):!1;case"is_null":return null==a;case"is_not_null":return null!=a;default:return console.warn(`MetadataFilterLogic: Unknown operator "${t}"`),!1}}}module.exports={MetadataFilterLogic:MetadataFilterLogic};
