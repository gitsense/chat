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

let{DomUtils,SVGUtils}=require("@gitsense/gsc-utils"),h=DomUtils.h;class IntentTurnActionsHeader{constructor(t,e={}){this.parentElement=t,this.options=e,this.h=h,this.title=e.title||"",this.isLatestTurn=e.isLatestTurn||!1,this.showDelete=!1!==e.showDelete,this.isSkippedDiscovery=e.isSkippedDiscovery||!1,this.onRetry=e.onRetry||null,this.onDelete=e.onDelete||null,this.headerContainer=null,this.retryButton=null,this.deleteButton=null,this._injectStyles()}render(){this.parentElement.innerHTML="",this.headerContainer=this.h.createDiv({cls:"gsc-intent-workflow-turn-header"});var t=this.h.createH1({cls:"gsc-intent-workflow-turn-title",text:this.title,style:{marginTop:0,marginBottom:"10px",borderBottom:0}});this.headerContainer.appendChild(t),this.isLatestTurn&&(t=this.h.createDiv({cls:"gsc-intent-workflow-turn-actions"}),this.retryButton=this.h.createButton({cls:"gsc-intent-workflow-turn-action-btn","aria-label":"Retry turn",title:"Retry turn",onclick:()=>{this.onRetry&&this.onRetry()}}),this.retryButton.innerHTML=SVGUtils.sync({cls:"gsc-intent-workflow-turn-action-icon"}).outerHTML,t.appendChild(this.retryButton),this.showDelete&&!this.isSkippedDiscovery&&(this.deleteButton=this.h.createButton({cls:"gsc-intent-workflow-turn-action-btn","aria-label":"Delete turn",title:"Delete turn",onclick:()=>{this.onDelete&&this.onDelete()}}),this.deleteButton.innerHTML=SVGUtils.trash({cls:"gsc-intent-workflow-turn-action-icon"}).outerHTML,t.appendChild(this.deleteButton)),this.headerContainer.appendChild(t)),this.parentElement.appendChild(this.headerContainer)}updateButtonStates(t={}){this.retryButton&&void 0!==t.retryDisabled&&(t.retryDisabled?(this.retryButton.disabled=!0,this.retryButton.classList.add("disabled")):(this.retryButton.disabled=!1,this.retryButton.classList.remove("disabled"))),this.deleteButton&&void 0!==t.deleteDisabled&&(t.deleteDisabled?(this.deleteButton.disabled=!0,this.deleteButton.classList.add("disabled")):(this.deleteButton.disabled=!1,this.deleteButton.classList.remove("disabled")))}_injectStyles(){h.injectStyles(`
            .gsc-intent-workflow-turn-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }

            .gsc-intent-workflow-turn-title {
                margin: 0;
                font-size: 1.5em;
                font-weight: 600;
                color: #24292e;
            }

            .gsc-intent-workflow-turn-actions {
                display: flex;
                gap: 0;
                align-items: center;
                flex-shrink: 0;
            }

            .gsc-intent-workflow-turn-action-btn {
                background: transparent;
                border: 1px solid transparent;
                cursor: pointer;
                padding: 5px;
                border-radius: 4px;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .gsc-intent-workflow-turn-action-btn:hover {
                background: #f6f8fa;
                border: 1px solid #e1e4e8;
            }

            .gsc-intent-workflow-turn-action-btn.disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }

            .gsc-intent-workflow-turn-action-btn.disabled:hover {
                background: transparent;
                border: 1px solid transparent;
            }

            .gsc-intent-workflow-turn-action-icon {
                width: 16px;
                height: 16px;
                fill: #586069;
                transition: fill 0.2s ease;
            }

            .gsc-intent-workflow-turn-action-btn:hover .gsc-intent-workflow-turn-action-icon {
                fill: #0366d6;
            }

            .gsc-intent-workflow-turn-action-btn.disabled .gsc-intent-workflow-turn-action-icon {
                fill: #586069;
            }
        `,"gsc-intent-workflow-turn-actions-header-styles")}cleanup(){}}module.exports={IntentTurnActionsHeader:IntentTurnActionsHeader};
