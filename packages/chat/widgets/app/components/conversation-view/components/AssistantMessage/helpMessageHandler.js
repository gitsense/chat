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

let MessageService=require("../../services/MessageService");async function handleHelpMessage(e,a,t,r){if("help"!==e.type&&"help-home"!==e.type)return!1;var s=e.message;if(!s)return!1;if(s.includes("/?chat="))return!1;var i=t.chat.descendants;let n=new Map;if(i&&0<i.length)for(var l of i)n.set(l.name,l.uuid);let u=s,d=!1;return u=u.replace(/\[([^\]]+)\]\(\{\{uuid-link\}\}\)/g,(e,a)=>{if(0<n.size){var t=n.get(a);if(t)return d=!0,`[${a}](/?chat=${t})`}return e}),!!d&&(await MessageService.updateChatMessage(t.widget,e.id,null,u),t.updateChat(),!0)}module.exports={handleHelpMessage:handleHelpMessage};
