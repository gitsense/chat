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

let MODEL_CONSTANTS=require("../constants/MessageConstants").MODEL_CONSTANTS;function getProvider(r,e){if(r){if(r.match(/^Fake/))return"Fake Provider";var o=e.models;if(o&&Array.isArray(o))for(let e=0;e<o.length;e++){var{name:t,providers:s}=o[e];if(!t.match(/^---/)&&t===r&&(s&&0<s.length))return s[0].name}}return"Unknown Provider"}function getUniqueModels(e,r=new Set){if(e&&e.length)for(var o of e){var{model:o,kids:t}=o;o&&r.add(o),t&&t.length&&getUniqueModels(t,r)}return Array.from(r)}function sortModels(e){if(!e||!Array.isArray(e))return[];let r=MODEL_CONSTANTS.GITSENSE_NOTES;var o=e.filter(e=>e!==r);return e.includes(r)?[r,...o]:o}function mapMessagesToModels(r){var o={};if(r&&Array.isArray(r))for(let e=0;e<r.length;e++){var t=r[e],s=t.model;if(s){let e=o[s];e||(e=[],o[s]=e),e.push(t)}}return o}function filterModelsByProvider(e,r){return e&&Array.isArray(e)&&r?e.filter(e=>!(!e.providers||!Array.isArray(e.providers))&&e.providers.some(e=>e.name===r)):[]}function getModelByName(e,r){if(e&&r&&Array.isArray(r))for(var o of r)if(o.name===e)return o;return null}function isNotesModel(e){return e&&e.match(new RegExp(MODEL_CONSTANTS.GITSENSE_NOTES))}module.exports={getProvider:getProvider,getUniqueModels:getUniqueModels,sortModels:sortModels,mapMessagesToModels:mapMessagesToModels,filterModelsByProvider:filterModelsByProvider,getModelByName:getModelByName,isNotesModel:isNotesModel};
