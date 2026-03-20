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

let Menu=require("./AnalyzeMenu");function AnalyzeInstructionsMenu(e,n={}){let t=n.defaultValue,u=[],l=(e.forEach(e=>{var n;e.label?(n=e.label+` (${e.name})`,u.push(n),t===e.name&&(t=n)):u.push(e.name)}),null);this.render=e=>((l=new Menu({menuOptions:u,menuWidth:200},n,e)).render(t),l),this.getSelected=()=>l.getSelected(),this.reset=()=>l.reset()}module.exports=AnalyzeInstructionsMenu;
