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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class PanelContainer{constructor(t,i={}){this.container=t,this.options={position:"left",width:"auto",border:"right",panel:null,...i},this.panel=this.options.panel,this.h=DomUtils.h}render(){this.container.innerHTML="";var t={height:"100%"},t=("flex: 1"===this.options.width?(t.flex="1 1 0%",t.minWidth="0"):(t.flex=`0 0 ${this.options.width}px`,t.width=this.options.width),this.h.createDiv({className:"gs-panel-container gs-panel-"+this.options.position,style:t}));this.panel&&this.panel.render&&this.panel.render(t),this.container.appendChild(t)}setPanel(t){this.panel=t,this.render()}cleanup(){this.panel&&this.panel.cleanup&&this.panel.cleanup(),this.container.innerHTML=""}}module.exports={PanelContainer:PanelContainer};
