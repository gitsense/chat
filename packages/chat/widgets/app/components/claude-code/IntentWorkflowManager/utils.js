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

function handleError(e,r){r||(console.error("[AgentManager::handleError] Invalid error: undefined"),r={code:"UNKNOWN",message:"An unknown error occurred."});r="string"==typeof r?{code:"UNKNOWN",message:r,severity:"error",retryable:!1}:r;r.message||(console.warn("[AgentManager::handleError] Error object missing message field"),r.message="An unknown error occurred."),console.error("[AgentManager::handleError] Error:",r),e.meta.state.status="error",e.meta.error=r,e.renderResults()}function cleanup(e){e.abortController&&e.abortController.abort(),e.eventBuffer=[],e.currentRenderer&&(e.currentRenderer.cleanup(),e.currentRenderer=null),e.errorRenderer&&(e.errorRenderer.cleanup(),e.errorRenderer=null),e.activityFeed&&(e.activityFeed.cleanup(),e.activityFeed=null),e.eventParser&&(e.eventParser.cleanup(),e.eventParser=null),e.liveSession&&(e.liveSession.cleanup(),e.liveSession=null),e.turnTabsInstance&&(e.turnTabsInstance.cleanup(),e.turnTabsInstance=null),e.isInitializing=!1,e.isMonitoring=!1}function parseSimulationOptions(){var e={simulate:!1,streamDelay:null};try{var r=window.location.search;if(!r)return e;var n,a,t=new URLSearchParams(r);t.has("simulate")&&(n=t.get("simulate"),e.simulate="true"===n||"1"===n),t.has("streamDelay")&&(a=parseInt(t.get("streamDelay"),10),!isNaN(a))&&0<a&&(e.streamDelay=a)}catch(e){console.error("[AgentManager::parseSimulationOptions] Failed to parse simulation options:",e)}return e}module.exports={handleError:handleError,cleanup:cleanup,parseSimulationOptions:parseSimulationOptions};
