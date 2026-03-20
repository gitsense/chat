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

let{ContextUtils,DomUtils,MessageUtils}=require("@gitsense/gsc-utils"),fileContentHandler=require("./fileContentHandler"),overviewHandler=require("./overviewHandler");async function handleContextMessage(e,t,r,n){if(!e||!e.message||!t)return console.error("handleContextMessage: Missing required parameters or DomUtils."),!1;var e=e.message,s=MessageUtils.isContextMessage(e),o=MessageUtils.isContextItemsOverviewMessage(e);if(!s&&!o)return!1;try{if(s){var a=ContextUtils.extractContextSections(e);if(0===a.length)return console.warn("Context message detected, but no context sections could be parsed."),!1;var i=c();_renderContextSummary(i),fileContentHandler.render(i,a,r.md)}else{if(!o)throw new Error("Unrecognized context type");var l=ContextUtils.extractContextItemsOverviewTableRows(e);if(0===l.length)return console.warn("Context items overview  message detected, but no rows were found."),!1;var d=c();_renderContextSummary(d),overviewHandler.render(d,l,r.md)}return!0}catch(e){return console.error("Error handling context message:",e),!(t.innerHTML="<p>Error rendering context message. See console for details.</p>")}function c(){t.innerHTML="";var e=DomUtils.h.createDiv({style:{}});return t.appendChild(e),e}}function _renderContextSummary(e,t=0){var r=DomUtils.h.createH2({text:"Context Files",style:{marginTop:"0px"}});e.appendChild(r)}module.exports={handleContextMessage:handleContextMessage};
