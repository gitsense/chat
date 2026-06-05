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

function mapModel2Messages(a){var o={};for(let t=0;t<a.length;t++){var n=a[t],s=n.model;let e=o[s];e||(e=[],o[s]=e),e.push(n)}return o}function getMsgStateId(e){return"msg-state-"+e}function navigateToChat(e,t){var{pathname:a,search:o}=window.location,o=new URLSearchParams(o),e=(o.set("chat",e),t?o.set("model",t):o.delete("model"),(""===a?"/":a)+"?"+o.toString());window.location.assign(e)}function updateSideBySideURL(e,t,a){var{pathname:o,search:n}=window.location,n=new URLSearchParams(n),s=n.get("chats")?n.get("chats").split(","):["",""],d=n.get("models")?n.get("models").split(","):["",""],a="left"===a?0:1,e=(s[a]=e,d[a]=t,n.delete("chat"),n.delete("model"),n.set("chats",s.join(",")),n.set("models",d.join(",")),(""===o?"/":o)+"?"+n.toString());window.location.assign(e)}function getProvider(t,e){var a=e.models;for(let e=0;e<a.length;e++){var{name:o,providers:n}=a[e];if(!o.match(/^---/)&&o===t&&(n&&0<n.length&&n[0].name))return n[0].name}return t&&t.match(/^Fake/)?"Fake Provider":"Unknown Provider"}module.exports={mapModel2Messages:mapModel2Messages,getMsgStateId:getMsgStateId,navigateToChat:navigateToChat,updateSideBySideURL:updateSideBySideURL,getProvider:getProvider};
