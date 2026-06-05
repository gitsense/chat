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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class PanelContainer{constructor(t,i={}){this.container=t,this.options={position:"left",width:"auto",border:"right",panel:null,...i},this.panel=this.options.panel,this.h=DomUtils.h}render(){this.container.innerHTML="";var t={height:"100%"},t=("flex: 1"===this.options.width?(t.flex="1 1 0%",t.minWidth="0"):(t.flex=`0 0 ${this.options.width}px`,t.width=this.options.width),this.h.createDiv({className:"gs-panel-container gs-panel-"+this.options.position,style:t}));this.panel&&this.panel.render&&this.panel.render(t),this.container.appendChild(t)}setPanel(t){this.panel=t,this.render()}cleanup(){this.panel&&this.panel.cleanup&&this.panel.cleanup(),this.container.innerHTML=""}}module.exports={PanelContainer:PanelContainer};
