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

let{formatTokens,formatAge,normalizeLanguageName,DomUtils}=require("@gitsense/gsc-utils"),{createLink,createButton}=require("./utils/helpers"),CSS_CLASSES=require("./constants").CSS_CLASSES;class OverviewSection{constructor(e,t={}){this.container=e,this.options=t,this.h=DomUtils.h}render(e){this.container.innerHTML="";var t=this.h.createH2({style:{paddingBottom:"10px",borderBottom:"1px solid #d8dee4"}});let i=!0;"file"===e.type?t.textContent="File":"patch"===e.type?t.textContent="Patch":(t.style.display="none",i=!1),this.container.appendChild(t);var t=this.h.createUl({style:{marginTop:i?"20px":"0px",listStyleType:"none"}}),{language:a,metadata:n}=(this.container.appendChild(t),e.data),e="patch"===e.type;this._addItem(t,"Name",n.name||"N/A"),this._addItem(t,"Path",n.path||"N/A"),this._addItem(t,"Repository",n.repo||"N/A"),this._addItem(t,"Branch",n.branch||"N/A"),e||(this._addItem(t,"Component",n.component||"N/A"),this._addItem(t,"Description",n.description||"No description provided.")),this._addItem(t,"Version",n.version||"N/A"),this._addItem(t,"Language",normalizeLanguageName(a||"unknown")),this._addItem(t,"Tokens",formatTokens(n.metrics.tokens)),this._addItem(t,"Lines",n.metrics.lines.toLocaleString()),n.message&&(e=n.message,a=formatAge(e.created_at),this._addItem(t,"Message",`${e.position} of ? | #${e.id} | Created `+a))}_addItem(e,t,i){t=this.h.createLi({style:{marginBottom:"5px"},html:`<strong>${t}:</strong> `+i});e.appendChild(t)}destroy(){this.container.innerHTML=""}}module.exports={OverviewSection:OverviewSection};
