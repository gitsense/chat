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

class ArrowControls{constructor(e,t={}){var{h:e,SVGUtils:i}=e;this.h=e,this.SVGUtils=i,this.config={minHeight:t.minHeight||75,maxHeight:t.maxHeight||window.innerHeight-75,disabledColor:t.disabledColor||"#ccc",enabledColor:t.enabledColor||"#333",onExpand:t.onExpand||(()=>{}),onCollapse:t.onCollapse||(()=>{}),...t},this.elements={},this.currentHeight=this.config.minHeight}render(e){this._createArrowControls(),e.appendChild(this.elements.container)}updateHeight(e){this.currentHeight=e,this._updateArrowStates()}destroy(){this.elements.container&&this.elements.container.parentNode&&this.elements.container.parentNode.removeChild(this.elements.container),this.elements={}}_createArrowControls(){this.elements.container=this.h.createDiv({style:{display:"flex",flexDirection:"row",alignItems:"center",gap:"10px"}}),this.elements.upArrow=this.SVGUtils.arrowUp({style:{cursor:"pointer",width:"16px",height:"16px"}}),this.elements.downArrow=this.SVGUtils.arrowDown({style:{cursor:"pointer",width:"16px",height:"16px"}}),this.elements.container.appendChild(this.elements.upArrow),this.elements.container.appendChild(this.elements.downArrow),this.elements.upArrow.addEventListener("click",()=>{this.currentHeight<this.config.maxHeight&&this.config.onExpand()}),this.elements.downArrow.addEventListener("click",()=>{this.currentHeight>this.config.minHeight&&this.config.onCollapse()}),this._updateArrowStates()}_updateArrowStates(){this.currentHeight>=this.config.maxHeight?(this.elements.upArrow.style.fill=this.config.disabledColor,this.elements.upArrow.style.cursor="default"):(this.elements.upArrow.style.fill=this.config.enabledColor,this.elements.upArrow.style.cursor="pointer"),this.currentHeight<=this.config.minHeight?(this.elements.downArrow.style.fill=this.config.disabledColor,this.elements.downArrow.style.cursor="default"):(this.elements.downArrow.style.fill=this.config.enabledColor,this.elements.downArrow.style.cursor="pointer")}}module.exports={ArrowControls:ArrowControls};
