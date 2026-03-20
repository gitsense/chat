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

let{ValidationUtils,StorageUtils}=require("../utils/MessageStateUtils");function MessageStateManager(){let a=this,p=null;p=StorageUtils.loadFromStorage(),this.getState=(e,t=!0,a)=>{if(ValidationUtils.isValidMessageId(e))return e+="",t?p.get(e)?.expanded??!0:void 0!==p.get(e)?p.get(e).expanded:void 0;throw new Error("Invalid message ID")},this.setState=(e,t)=>{if(!ValidationUtils.isValidMessageId(e))throw new Error("Invalid message ID");if(ValidationUtils.isValidState(t))return e+="",p.set(e,{expanded:t,timestamp:Date.now()}),StorageUtils.saveToStorage(p);throw new Error("Invalid state value")},this.toggleState=e=>{var t=a.getState(e);return a.setState(e,!t),!t},this.getStats=()=>{let e=0,t=0;for(var[,a]of p)a.expanded?e++:t++;return{total:p.size,expanded:e,collapsed:t}},this.bulkUpdate=e=>{if(!ValidationUtils.isValidStateObject(e))throw new Error("Invalid updates object");let t=!0,a=!1;var s,i=[],r=Object.entries(e);for(let e=0;e<r.length;e+=50)i.push(r.slice(e,e+50));for(s of i){var l,o,n,d,g,S=new Map;for([l,o]of s)try{ValidationUtils.isValidMessageId(l)?ValidationUtils.isValidState(o)?(n=l+"",p.get(n)?.expanded!==o&&(S.set(n,{expanded:o,timestamp:Date.now()}),a=!0)):console.warn("Invalid state for message "+l):console.warn("Invalid message ID: "+l)}catch(e){console.error(`Failed to process message ${l}:`,e),t=!1}for([d,g]of S)p.set(d,g)}return t=a&&!StorageUtils.saveToStorage(p)?!1:t},this.getAllStates=()=>new Map(p),this.setAllStates=e=>{if(!ValidationUtils.isValidState(e))throw new Error("Invalid state value");var t,a={};for([t]of p)a[t]=e;return this.bulkUpdate(a)},this.cleanup=(e=31536e6)=>StorageUtils.cleanupStorage(e)}module.exports=MessageStateManager;
