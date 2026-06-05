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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,h=DomUtils.h;class IntentIntentSection{constructor(t,e){this.parentElement=t,this.intent=e,this.h=h}render(){this.parentElement.innerHTML="",this.parentElement.appendChild(this.h.createH3({text:"Intent",style:{marginTop:0,marginBottom:"10px"}})),this.parentElement.appendChild(this.h.createDiv({cls:"gsc-intent-workflow-intent-block",text:this.intent,style:{fontSize:"14px"}}))}cleanup(){}}module.exports={IntentIntentSection:IntentIntentSection};
