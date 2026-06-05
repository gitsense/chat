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

let BROWSER_MODES=require("../constants").BROWSER_MODES;class SelectionManager{constructor(e=[],t=BROWSER_MODES.VIEW){this.selectedMap=new Map,this.listeners=[],this.mode=t,e&&0<e.length&&e.forEach(e=>{e&&e.id&&this.selectedMap.set(e.id,e)})}subscribe(t){return this.listeners.push(t),()=>{var e=this.listeners.indexOf(t);-1<e&&this.listeners.splice(e,1)}}notify(){let t=Array.from(this.selectedMap.values());this.listeners.forEach(e=>{try{e(t)}catch(e){console.error("Error in selection listener:",e)}})}toggle(e){e&&e.id?(this.mode===BROWSER_MODES.SINGLE?(this.selectedMap.clear(),this.selectedMap.set(e.id,e)):this.selectedMap.has(e.id)?this.selectedMap.delete(e.id):this.selectedMap.set(e.id,e),this.notify()):console.warn("Invalid analyzer object provided to toggle")}add(e){e&&e.id?this.mode===BROWSER_MODES.SINGLE?(this.selectedMap.clear(),this.selectedMap.set(e.id,e),this.notify()):this.selectedMap.has(e.id)||(this.selectedMap.set(e.id,e),this.notify()):console.warn("Invalid analyzer object provided to add")}remove(e){e="string"==typeof e?e:e?.id;e?this.selectedMap.has(e)&&(this.selectedMap.delete(e),this.notify()):console.warn("Invalid analyzer ID provided to remove")}selectAll(e){if(this.mode!==BROWSER_MODES.SINGLE){let t=!1;e&&0<e.length&&e.forEach(e=>{e&&e.id&&!this.selectedMap.has(e.id)&&(this.selectedMap.set(e.id,e),t=!0)}),t&&this.notify()}}clearAll(){0<this.selectedMap.size&&(this.selectedMap.clear(),this.notify())}getSelected(){return Array.from(this.selectedMap.values())}getSelectedIds(){return Array.from(this.selectedMap.keys())}isSelected(e){e="string"==typeof e?e:e?.id;return this.selectedMap.has(e)}getCount(){return this.selectedMap.size}validateSelections(t){if(t&&Array.isArray(t)){var s,i,l=new Set(t.filter(e=>e&&e.id).map(e=>e.id));let e=!1;for([s,i]of this.selectedMap)l.has(s)||(this.selectedMap.delete(s),e=!0);e&&this.notify()}}}module.exports={SelectionManager:SelectionManager};
