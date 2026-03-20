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

let LOADED_SELECTIONS_KEY="treeTable_loadedSelections",MAX_RECENT_SELECTIONS=20;function generateUniqueId(e,t,o,d,a){var e=[...e].sort((e,t)=>e-t),n=JSON.stringify({id:a?(new Date).getTime():null,selectedNodes:e,selectionOptions:t,contentType:o,contentOption:d});let l=0;for(let e=0;e<n.length;e++){var r=n.charCodeAt(e);l=(l<<5)-l+r,l&=l}return l.toString(16)}function getLoadedSelections(){try{var e=localStorage.getItem(LOADED_SELECTIONS_KEY),t=e?JSON.parse(e):[];return t.forEach(e=>{e.lastLoaded||(e.lastLoaded=e.createdAt)}),t.sort((e,t)=>new Date(t.lastLoaded)-new Date(e.lastLoaded))}catch(e){return console.error("Error retrieving loaded selections:",e),[]}}function saveLoadedSelections(e){try{var t=e.slice(0,MAX_RECENT_SELECTIONS);localStorage.setItem(LOADED_SELECTIONS_KEY,JSON.stringify(t))}catch(e){console.error("Error saving loaded selections:",e)}}function addOrUpdateLoadedSelection(e,t,o,d,a="",n){let l=generateUniqueId(e,t,o,d,n);var n=getLoadedSelections(),r=n.findIndex(e=>e.id===l),i=(new Date).toISOString(),e={id:l,selectedNodes:e,selectionOptions:t,contentType:o,contentOption:d,createdAt:i,lastLoaded:i,customName:a||""};return-1!==r?n[r]={...n[r],lastLoaded:i,customName:e.customName||n[r].customName}:n.unshift(e),saveLoadedSelections(n),-1!==r?n[r]:e}function deleteLoadedSelection(t){var e=getLoadedSelections(),o=e.filter(e=>e.id!==t);return o.length!==e.length&&(saveLoadedSelections(o),!0)}function updateLoadedSelectionName(t,e){var o=getLoadedSelections(),d=o.findIndex(e=>e.id===t);return-1!==d&&(o[d].customName=e,saveLoadedSelections(o),!0)}module.exports={getLoadedSelections:getLoadedSelections,addOrUpdateLoadedSelection:addOrUpdateLoadedSelection,deleteLoadedSelection:deleteLoadedSelection,updateLoadedSelectionName:updateLoadedSelectionName,MAX_RECENT_SELECTIONS:MAX_RECENT_SELECTIONS};
