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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

function BaseAction(e){if(!(this instanceof BaseAction))return new BaseAction(e);this.state=e}BaseAction.prototype.getId=function(){throw new Error("getId must be implemented by subclass")},BaseAction.prototype.getLabel=function(){throw new Error("getLabel must be implemented by subclass")},BaseAction.prototype.getIcon=function(){throw new Error("getIcon must be implemented by subclass")},BaseAction.prototype.execute=function(){throw new Error("execute must be implemented by subclass")},BaseAction.prototype.renderButton=function(){var e=require("../../../../Dependencies").h,t=e.createButton({className:"gs-menu-button"}),e=(this.getIcon(),e.createSpan({text:this.getLabel()}));return t.appendChild(e),t.addEventListener("click",this.execute.bind(this)),t},BaseAction.create=function(e){return new this(e)},module.exports=BaseAction;
