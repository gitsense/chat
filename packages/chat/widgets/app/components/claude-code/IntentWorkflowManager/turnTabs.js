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

function renderTurnTabs(t,n=!1){var e=[...getAllTurns(t)].reverse().map(e=>{var n=getTurnType(e),n=(getStatusIcon(getTurnStatus(e)),`Turn ${e.turn_number}: `+(n.charAt(0).toUpperCase()+n.slice(1)));return{id:"turn-"+e.turn_number,label:n,active:e.turn_number===t.selectedTurn}}),r=(t.turnTabsContainer=t.h.createDiv({style:{marginBottom:"25px"}}),t.contentBody.appendChild(t.turnTabsContainer),require("../../ui/tabs")).Tabs;t.turnTabsInstance=new r(t.turnTabsContainer,{tabs:e,orientation:"horizontal",borderColor:"#000000",onTabChange:e=>{n?n=!1:(e=parseInt(e.replace("turn-",""),10),isNaN(e)||e===t.selectedTurn||(t.selectedTurn=e),t.renderTurnContent())}}),t.turnTabsInstance.render()}function renderTurnContent(e){if(e.turnTabContentContainer){e.turnTabContentContainer.innerHTML="";var n=getSelectedTurnData(e);if(n){var t=getTurnStatus(n);switch(t){case"initializing":case"running":e.renderLiveSession();break;case"stopping":e.renderStoppingState();break;case"complete":case"completed":case"stopped":case"error":e.renderResults();break;default:console.warn("[AgentManager::renderTurnContent] Unknown turn status:",t),e.renderResults()}}else e.turnTabContentContainer.appendChild(e.h.createDiv({text:"No data available for this turn."}))}else console.warn("[AgentManager::renderTurnContent] Turn tab content container not found")}function getAllTurns(e){var n=e.meta.results.turns||[];let t=e.meta.state.currentTurn;return n.some(e=>e.turn_number===t)?n:[...n,{turn_number:t,status:e.meta.state.status,turn_type:e.meta.state.currentTurnType}]}function getSelectedTurnData(n){return getAllTurns(n).find(e=>e.turn_number===n.selectedTurn)}function getTurnType(e){return e.turn_type||(1===e.turn_number?"discovery":"change")}function getTurnStatus(e){return e.status||(e.result?"completed":"initializing")}function getStatusIcon(e){return{completed:"✓",error:"✗",running:"⟳",stopping:"⏸",stopped:"⏹",initializing:"○"}[e]||""}module.exports={renderTurnTabs:renderTurnTabs,renderTurnContent:renderTurnContent,getAllTurns:getAllTurns,getSelectedTurnData:getSelectedTurnData,getTurnType:getTurnType,getTurnStatus:getTurnStatus,getStatusIcon:getStatusIcon};
