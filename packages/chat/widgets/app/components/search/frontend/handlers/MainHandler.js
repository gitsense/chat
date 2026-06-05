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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),SEARCH_TOOL=require("../constants").SEARCH_TOOL,handleSearchProcess=require("./searchProcessHandler").handleSearchProcess,parseConfig=require("../utils/configParser").parseConfig,handleAiSearchCompleteResponse=require("./aiSearchCompleteResponseHandler").handleAiSearchCompleteResponse,handleDirectSearchResults=require("../engines/gitsense/handlers/directSearchResultsHandler").handleDirectSearchResults,getSearchToolConfigs=require("../utils/searchToolConfig").getSearchToolConfigs,renderUI=require("../components/uiRenderer").renderUI,COMPLETED=require("../../common/gitsense/searchStates").COMPLETED,h=require("../Dependencies").h;async function handleSearchTool(r,s,n,e){var a=require("../components/eventHandler").setupEventHandlers,o=require("../Dependencies").getToolBlockElemsByTool;if(!r||null==r.message||!s||!n)return console.error("Missing required parameters."),!1;var t=r.message,l=t.includes("### Answer")||t.includes("load-context:"),t=t.includes('"results": {');if(!l&&!t&&r.kids&&r.kids.length){let e=o(s,SEARCH_TOOL);return e.forEach(e=>{e.remove()}),!(s.innerHTML="The search tool cannot be displayed because it is not the last message in the conversation.")}l=getSearchToolConfigs(r.message);if(!l.length)return!1;if(1===l.length){t=l[0];let e=o(s,SEARCH_TOOL);if(1<e.length)return console.error("More than one search tool element found."),!1;e.length&&e[0].remove();l=t.states&&0<t.states.length?t.states[t.states.length-1]:null;if(!l||!l.error){if(l&&l.finished_at&&l.type===COMPLETED)return"direct-search-results"===r.type?handleDirectSearchResults(r,s,n):((t.data?.searchCriteria?.aiEnabled||!1)&&(o=!r.message.includes("load-context:"),await handleAiSearchCompleteResponse(r,s,n,o)),!0);l=parseConfig(t);if(!l)return console.error("Failed to parse or validate search tool config."),!1;l.data&&l.data.searchCriteria?await handleSearchProcess(r,l,s,n):(o=h.createDiv({cls:"gitsense-search-tool-container",style:{marginTop:"10px"}}),t={models:[...n.settings.models],mainModel:n.chat.main_model},renderUI(l,o,t),s.appendChild(o),a(r,o,l,n))}return!0}console.warn("More than one search tool block found in message. Unable to continue.")}module.exports={handleSearchTool:handleSearchTool};
