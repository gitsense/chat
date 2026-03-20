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

function mapModel2Messages(a){var o={};for(let t=0;t<a.length;t++){var n=a[t],s=n.model;let e=o[s];e||(e=[],o[s]=e),e.push(n)}return o}function getMsgStateId(e){return"msg-state-"+e}function navigateToChat(e,t){var{pathname:a,search:o}=window.location,o=new URLSearchParams(o),e=(o.set("chat",e),t?o.set("model",t):o.delete("model"),(""===a?"/":a)+"?"+o.toString());window.location.assign(e)}function updateSideBySideURL(e,t,a){var{pathname:o,search:n}=window.location,n=new URLSearchParams(n),s=n.get("chats")?n.get("chats").split(","):["",""],d=n.get("models")?n.get("models").split(","):["",""],a="left"===a?0:1,e=(s[a]=e,d[a]=t,n.delete("chat"),n.delete("model"),n.set("chats",s.join(",")),n.set("models",d.join(",")),(""===o?"/":o)+"?"+n.toString());window.location.assign(e)}function getProvider(t,e){var a=e.models;for(let e=0;e<a.length;e++){var{name:o,providers:n}=a[e];if(!o.match(/^---/)&&o===t&&(n&&0<n.length&&n[0].name))return n[0].name}return t&&t.match(/^Fake/)?"Fake Provider":"Unknown Provider"}module.exports={mapModel2Messages:mapModel2Messages,getMsgStateId:getMsgStateId,navigateToChat:navigateToChat,updateSideBySideURL:updateSideBySideURL,getProvider:getProvider};
