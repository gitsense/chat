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

let MessageService=require("../../services/MessageService");async function handleHelpMessage(e,a,t,r){if("help"!==e.type&&"help-home"!==e.type)return!1;var s=e.message;if(!s)return!1;if(s.includes("/?chat="))return!1;var i=t.chat.descendants;let n=new Map;if(i&&0<i.length)for(var l of i)n.set(l.name,l.uuid);let u=s,d=!1;return u=u.replace(/\[([^\]]+)\]\(\{\{uuid-link\}\}\)/g,(e,a)=>{if(0<n.size){var t=n.get(a);if(t)return d=!0,`[${a}](/?chat=${t})`}return e}),!!d&&(await MessageService.updateChatMessage(t.widget,e.id,null,u),t.updateChat(),!0)}module.exports={handleHelpMessage:handleHelpMessage};
