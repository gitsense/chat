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

let{formatTokens,formatAge,normalizeLanguageName,DomUtils}=require("@gitsense/gsc-utils"),{createLink,createButton}=require("./utils/helpers"),CSS_CLASSES=require("./constants").CSS_CLASSES;class OverviewSection{constructor(e,t={}){this.container=e,this.options=t,this.h=DomUtils.h}render(e){this.container.innerHTML="";var t=this.h.createH2({style:{paddingBottom:"10px",borderBottom:"1px solid #d8dee4"}});let i=!0;"file"===e.type?t.textContent="File":"patch"===e.type?t.textContent="Patch":(t.style.display="none",i=!1),this.container.appendChild(t);var t=this.h.createUl({style:{marginTop:i?"20px":"0px",listStyleType:"none"}}),{language:a,metadata:n}=(this.container.appendChild(t),e.data),e="patch"===e.type;this._addItem(t,"Name",n.name||"N/A"),this._addItem(t,"Path",n.path||"N/A"),this._addItem(t,"Repository",n.repo||"N/A"),this._addItem(t,"Branch",n.branch||"N/A"),e||(this._addItem(t,"Component",n.component||"N/A"),this._addItem(t,"Description",n.description||"No description provided.")),this._addItem(t,"Version",n.version||"N/A"),this._addItem(t,"Language",normalizeLanguageName(a||"unknown")),this._addItem(t,"Tokens",formatTokens(n.metrics.tokens)),this._addItem(t,"Lines",n.metrics.lines.toLocaleString()),n.message&&(e=n.message,a=formatAge(e.created_at),this._addItem(t,"Message",`${e.position} of ? | #${e.id} | Created `+a))}_addItem(e,t,i){t=this.h.createLi({style:{marginBottom:"5px"},html:`<strong>${t}:</strong> `+i});e.appendChild(t)}destroy(){this.container.innerHTML=""}}module.exports={OverviewSection:OverviewSection};
