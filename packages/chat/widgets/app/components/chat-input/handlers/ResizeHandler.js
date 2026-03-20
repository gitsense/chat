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

let DEFAULT_CONFIG=require("../constants").DEFAULT_CONFIG;class ResizeHandler{constructor(e,t,i={}){if(!e)throw new Error("ResizeHandler requires an inputElement");if(!t)throw new Error("ResizeHandler requires a resizeHandle");this.inputElement=e,this.resizeHandle=t,this.config={minInputHeight:i.minInputHeight||DEFAULT_CONFIG.MIN_INPUT_HEIGHT,maxInputHeight:i.maxInputHeight||500,...i},this.events={},this.isResizing=!1,this.startHeight=0,this.startY=0,this.originalHeight=0}setEvent(e,t){this.events[e]=t}init(){this._attachEvents()}destroy(){this._removeEvents()}setHeight(e){this.inputElement.style.height=e,this._triggerResizeEvent()}getHeight(){return parseInt(this.inputElement.style.height)||0}resetHeight(){this.inputElement.style.height=DEFAULT_CONFIG.INPUT_HEIGHT+"px",this._triggerResizeEvent()}_attachEvents(){this._handleMouseDown=this._handleMouseDown.bind(this),this._handleMouseMove=this._handleMouseMove.bind(this),this._handleMouseUp=this._handleMouseUp.bind(this),this.resizeHandle.addEventListener("mousedown",this._handleMouseDown),document.addEventListener("mousemove",this._handleMouseMove),document.addEventListener("mouseup",this._handleMouseUp)}_removeEvents(){this._handleMouseDown&&this.resizeHandle.removeEventListener("mousedown",this._handleMouseDown),this._handleMouseMove&&document.removeEventListener("mousemove",this._handleMouseMove),this._handleMouseUp&&document.removeEventListener("mouseup",this._handleMouseUp)}_handleMouseDown(e){this.isResizing=!0,this.startY=e.clientY,this.originalHeight=this.getHeight(),document.body.style.userSelect="none",document.body.style.cursor="ns-resize",e.preventDefault()}_handleMouseMove(e){this.isResizing&&(e=e.clientY-this.startY,e=this.originalHeight-e,e=Math.max(this.config.minInputHeight,e),e=Math.min(this.config.maxInputHeight,e),this.inputElement.style.height=e+"px",this._triggerResizeEvent())}_handleMouseUp(e){this.isResizing&&(this.isResizing=!1,document.body.style.userSelect="",document.body.style.cursor="",this._triggerResizeEvent(),this._triggerResizeEndEvent())}_triggerResizeEvent(){var e,t;this.events.onResize&&(e=this.inputElement.getBoundingClientRect(),t=this.getHeight(),this.events.onResize(e,t))}_triggerResizeEndEvent(){var e;this.events.onResizeEnd&&(e=this.getHeight(),this.events.onResizeEnd(e))}updateConfig(e){var t;this.config={...this.config,...e},(e.minInputHeight||e.maxInputHeight)&&(e=this.getHeight(),(t=Math.max(this.config.minInputHeight,Math.min(this.config.maxInputHeight,e)))!==e)&&this.setHeight(t+"px")}expandToFitContent(){this.inputElement.style.height="auto";var e=this.inputElement.scrollHeight,e=Math.max(this.config.minInputHeight,Math.min(this.config.maxInputHeight,e));this.inputElement.style.height=e+"px",this._triggerResizeEvent()}}module.exports={ResizeHandler:ResizeHandler};
