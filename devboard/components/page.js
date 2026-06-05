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

let h=require("../utils/html.js");function Page(a,r={minHeight:"300px"}){let i={body:null,current:null,cards:a,init(){return this.body=h.createDiv({cls:"tblr-page",style:r}),this.current=this.body,this},addPageWrapper(){var r=h.createDiv({cls:"tblr-page-wrapper"});return this.current.appendChild(r),this.current=r,this},addPageBody(){var r=h.createDiv({cls:"tblr-page-body"});return this.current.appendChild(r),this.current=r,this},addContainer(){var r=h.createDiv({cls:"tblr-container-xxl"});return this.current.appendChild(r),this.current=r,this},addRow(){var r=h.createDiv({cls:"tblr-row tblr-row-deck tblr-row-cards"});return this.current.appendChild(r),this.current=r,this}};this.create=function(){var t=i.init(r).addPageWrapper().addPageBody().addContainer().addRow();for(let r=0;r<a.length;r++){var e=a[r];t.current.appendChild(e.body)}return t}}module.exports=Page;
