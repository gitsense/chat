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

let Menu=require("./AnalyzeMenu");function AnalyzeContentMenu(e,n={}){let t=n.defaultValue,l=[],u=(e.forEach(e=>{var n;e.label?(n=e.label+` (${e.name})`,l.push(n),t===e.name&&(t=n)):l.push(e.name)}),null);this.render=e=>((u=new Menu({menuOptions:l,menuWidth:250},n,e)).render(t),u),this.getSelected=()=>u.getSelected(),this.reset=()=>u.reset()}module.exports=AnalyzeContentMenu;
