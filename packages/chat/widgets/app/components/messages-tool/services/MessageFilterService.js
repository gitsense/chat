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

class MessageFilterService{filterMessages(e,t,l,n=[],a={}){return e.filter(e=>{if(t&&!t[e.role])return!1;if(n&&0<n.length&&n.includes(e.type))return!1;var r;if(l&&l.trim())return s=(e.content||"").toLowerCase(),r=l.toLowerCase(),s.includes(r);if(a&&(null!==a.from||null!==a.to)){var s=e.position||0;if(null!==a.from&&s<a.from)return!1;if(null!==a.to&&s>a.to)return!1}return!0})}filterOutCompactedMessages(e){return this.filterMessages(e,null,null,["compacted-message"])}getCompactableMessages(e){return e.filter(e=>"system"!==e.role&&"compacted-message"!==e.type)}validateMessageRange(e,r,s){return isNaN(r)||isNaN(s)||r<2||s>e.length||s<r?{isValid:!1,error:`Please enter a valid message range (from 2 to ${e.length}).`}:(e=e.slice(r-1,s)).some(e=>"system"===e.role)?{isValid:!1,error:"The range cannot include system messages (message 1)."}:{isValid:!0,messagesInRange:e}}getMessagesInRange(e,r){if(!r||null===r.from&&null===r.to)return e;let s=null!==r.from?r.from:1,t=null!==r.to?r.to:e.length;return e.filter(e=>{e=e.position||0;return e>=s&&e<=t})}}module.exports={MessageFilterService:MessageFilterService};
