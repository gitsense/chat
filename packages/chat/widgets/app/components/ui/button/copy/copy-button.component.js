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

let Button=require("../button").Button,{VARIANTS,SIZES}=require("../constants"),{FEEDBACK_DURATION_MS,DEFAULT_TEXT,FEEDBACK_TEXT,DEFAULT_ICON,FEEDBACK_ICON}=require("./copy-button.constants");class CopyButton extends Button{constructor(t,o={}){var e=o.iconOnly?"":DEFAULT_TEXT,n=o.iconOnly?VARIANTS.ICON:o.variant||VARIANTS.SECONDARY,i=o.size||SIZES.SMALL;super(t,{...o,text:e,variant:n,size:i,leftIcon:DEFAULT_ICON,onClick:t=>this._handleCopyClick(t)}),o.contentToCopy||console.error("CopyButton requires 'contentToCopy' in config."),this.contentToCopy=o.contentToCopy,this.iconOnly=o.iconOnly||!1,this.onCopySuccess=o.onCopySuccess,this.feedbackTimeout=null}_handleCopyClick(t){t.preventDefault(),this.contentToCopy&&(this.feedbackTimeout&&clearTimeout(this.feedbackTimeout),navigator.clipboard.writeText(this.contentToCopy).then(()=>{this._showFeedback(),this.onCopySuccess&&this.onCopySuccess()}).catch(t=>{console.error("Failed to copy text: ",t)}))}_showFeedback(){if(this.elements.button){let t=this.iconOnly?"":this.config.text,o=this.config.leftIcon;this.config.leftIcon=FEEDBACK_ICON,this.setText(FEEDBACK_TEXT),this.feedbackTimeout=setTimeout(()=>{this.config.leftIcon=o,this.setText(t)},FEEDBACK_DURATION_MS)}}destroy(){this.feedbackTimeout&&clearTimeout(this.feedbackTimeout),super.destroy()}}module.exports={CopyButton:CopyButton};
