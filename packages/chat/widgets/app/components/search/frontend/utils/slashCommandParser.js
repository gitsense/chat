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

let GSToolBlockUtils=require("@gitsense/gsc-utils").GSToolBlockUtils,SEARCH_TOOL=require("../constants").SEARCH_TOOL;function parseSlashCommand(t,e){if("string"!=typeof t)return null;var s=t.trim(),l="/search",n="!search",i="/ask",o="!ask",a="/find";let r=null,u=null,f=!1,c=!0;if(s.startsWith(i))r=i,u=s.substring(i.length).trim(),f=!1,c=!0;else if(s.startsWith(a))r=a,u=s.substring(a.length).trim(),f=0<u.length,c=!1;else if(s.startsWith(l))u=s.substring(l.length).trim(),f=!1,r=l,c=!1;else if(s.startsWith(o))u=s.substring(o.length).trim(),f=0<u.length,r=o,c=!0;else{if(!s.startsWith(n))return null;u=s.substring(n.length).trim(),f=!0,r=n,c=!1}i={tool:SEARCH_TOOL,config:{layout:"default",engine:"gitsense",defaults:{query:u}}};if(f){a=e||null;if(c&&!a)return console.warn(`parseSlashCommand: Cannot perform instant AI search (${r}). User's main AI model is not available in context.`),i.config.defaults.query=t,i.config.defaults.aiEnabled=!0,formatCodeBlock(GSToolBlockUtils.formatToolBlock(i));i.config.data={searchCriteria:{query:u,aiEnabled:c,aiAssistant:c?a:void 0}},delete i.config.defaults}else i.config.defaults.aiEnabled=c;return formatCodeBlock(GSToolBlockUtils.formatToolBlock(i))}function formatCodeBlock(t){return"```txt\n"+t+"\n```"}module.exports={parseSlashCommand:parseSlashCommand};
