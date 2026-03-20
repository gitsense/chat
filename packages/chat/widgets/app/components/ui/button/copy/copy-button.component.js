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

let Button=require("../button").Button,{VARIANTS,SIZES}=require("../constants"),{FEEDBACK_DURATION_MS,DEFAULT_TEXT,FEEDBACK_TEXT,DEFAULT_ICON,FEEDBACK_ICON}=require("./copy-button.constants");class CopyButton extends Button{constructor(t,o={}){var e=o.iconOnly?"":DEFAULT_TEXT,n=o.iconOnly?VARIANTS.ICON:o.variant||VARIANTS.SECONDARY,i=o.size||SIZES.SMALL;super(t,{...o,text:e,variant:n,size:i,leftIcon:DEFAULT_ICON,onClick:t=>this._handleCopyClick(t)}),o.contentToCopy||console.error("CopyButton requires 'contentToCopy' in config."),this.contentToCopy=o.contentToCopy,this.iconOnly=o.iconOnly||!1,this.onCopySuccess=o.onCopySuccess,this.feedbackTimeout=null}_handleCopyClick(t){t.preventDefault(),this.contentToCopy&&(this.feedbackTimeout&&clearTimeout(this.feedbackTimeout),navigator.clipboard.writeText(this.contentToCopy).then(()=>{this._showFeedback(),this.onCopySuccess&&this.onCopySuccess()}).catch(t=>{console.error("Failed to copy text: ",t)}))}_showFeedback(){if(this.elements.button){let t=this.iconOnly?"":this.config.text,o=this.config.leftIcon;this.config.leftIcon=FEEDBACK_ICON,this.setText(FEEDBACK_TEXT),this.feedbackTimeout=setTimeout(()=>{this.config.leftIcon=o,this.setText(t)},FEEDBACK_DURATION_MS)}}destroy(){this.feedbackTimeout&&clearTimeout(this.feedbackTimeout),super.destroy()}}module.exports={CopyButton:CopyButton};
