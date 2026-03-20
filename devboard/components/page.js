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

let h=require("../utils/html.js");function Page(a,r={minHeight:"300px"}){let i={body:null,current:null,cards:a,init(){return this.body=h.createDiv({cls:"tblr-page",style:r}),this.current=this.body,this},addPageWrapper(){var r=h.createDiv({cls:"tblr-page-wrapper"});return this.current.appendChild(r),this.current=r,this},addPageBody(){var r=h.createDiv({cls:"tblr-page-body"});return this.current.appendChild(r),this.current=r,this},addContainer(){var r=h.createDiv({cls:"tblr-container-xxl"});return this.current.appendChild(r),this.current=r,this},addRow(){var r=h.createDiv({cls:"tblr-row tblr-row-deck tblr-row-cards"});return this.current.appendChild(r),this.current=r,this}};this.create=function(){var t=i.init(r).addPageWrapper().addPageBody().addContainer().addRow();for(let r=0;r<a.length;r++){var e=a[r];t.current.appendChild(e.body)}return t}}module.exports=Page;
