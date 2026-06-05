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

class ArrowControls{constructor(e,t={}){var{h:e,SVGUtils:i}=e;this.h=e,this.SVGUtils=i,this.config={minHeight:t.minHeight||75,maxHeight:t.maxHeight||window.innerHeight-75,disabledColor:t.disabledColor||"#ccc",enabledColor:t.enabledColor||"#333",onExpand:t.onExpand||(()=>{}),onCollapse:t.onCollapse||(()=>{}),...t},this.elements={},this.currentHeight=this.config.minHeight}render(e){this._createArrowControls(),e.appendChild(this.elements.container)}updateHeight(e){this.currentHeight=e,this._updateArrowStates()}destroy(){this.elements.container&&this.elements.container.parentNode&&this.elements.container.parentNode.removeChild(this.elements.container),this.elements={}}_createArrowControls(){this.elements.container=this.h.createDiv({style:{display:"flex",flexDirection:"row",alignItems:"center",gap:"10px"}}),this.elements.upArrow=this.SVGUtils.arrowUp({style:{cursor:"pointer",width:"16px",height:"16px"}}),this.elements.downArrow=this.SVGUtils.arrowDown({style:{cursor:"pointer",width:"16px",height:"16px"}}),this.elements.container.appendChild(this.elements.upArrow),this.elements.container.appendChild(this.elements.downArrow),this.elements.upArrow.addEventListener("click",()=>{this.currentHeight<this.config.maxHeight&&this.config.onExpand()}),this.elements.downArrow.addEventListener("click",()=>{this.currentHeight>this.config.minHeight&&this.config.onCollapse()}),this._updateArrowStates()}_updateArrowStates(){this.currentHeight>=this.config.maxHeight?(this.elements.upArrow.style.fill=this.config.disabledColor,this.elements.upArrow.style.cursor="default"):(this.elements.upArrow.style.fill=this.config.enabledColor,this.elements.upArrow.style.cursor="pointer"),this.currentHeight<=this.config.minHeight?(this.elements.downArrow.style.fill=this.config.disabledColor,this.elements.downArrow.style.cursor="default"):(this.elements.downArrow.style.fill=this.config.enabledColor,this.elements.downArrow.style.cursor="pointer")}}module.exports={ArrowControls:ArrowControls};
