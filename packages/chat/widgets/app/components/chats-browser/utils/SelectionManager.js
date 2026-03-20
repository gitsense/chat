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

class SelectionManager{constructor(){this.selectedMap=new Map,this.listeners=[]}subscribe(t){return this.listeners.push(t),()=>{var e=this.listeners.indexOf(t);-1<e&&this.listeners.splice(e,1)}}notify(){let t=Array.from(this.selectedMap.values());this.listeners.forEach(e=>{try{e(t)}catch(e){console.error("Error in selection listener:",e)}})}getSelected(){return Array.from(this.selectedMap.values())}getSelectedIds(){return Array.from(this.selectedMap.keys())}isSelected(e){e="string"==typeof e?e:e?.id;return this.selectedMap.has(e)}getCount(){return this.selectedMap.size}validateSelections(t){if(t&&Array.isArray(t)){var s,r,i=new Set(t.filter(e=>e&&e.id).map(e=>e.id));let e=!1;for([s,r]of this.selectedMap)i.has(s)||(this.selectedMap.delete(s),e=!0);e&&this.notify()}}}module.exports={SelectionManager:SelectionManager};
