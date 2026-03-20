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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,PromptBox=require("../ui/prompt-box").PromptBox,Browser=require("./components/Browser").Browser,PreviewPanel=require("./components/PreviewPanel").PreviewPanel,BatchTreeBuilder=require("./utils/buildBatchTree").BatchTreeBuilder,BATCH_BROWSER_WIDTH=require("./constants").BATCH_BROWSER_WIDTH;class BatchReviewBrowser{constructor(e,t={}){this.context=e,this.options=t,this.batch=t.batch||null,this.referenceFiles=t.referenceFiles||[],this.filesToAnalyze=t.filesToAnalyze||[],this.onClose=t.onClose||null,this.promptBox=null,this.browser=null,this.previewPanel=null,this.batchTreeData=null,this.treeBuilder=new BatchTreeBuilder,this.h=DomUtils.h}async show(){if(this.promptBox)console.warn("BatchReviewBrowser is already shown.");else{try{this._buildBatchTree()}catch(e){console.error("BatchReviewBrowser failed to process data:",e),this.batchTreeData=[]}this.promptBox=new PromptBox({title:`Batch ${this.batch.id} Review`,width:"100%",height:"100%",maxWidth:"none",maxHeight:"none",bodyPadding:"0px",headerPadding:"5px 15px 10px 15px",zIndex:100000000001,showCloseButton:!0,customClass:"gsc-batch-review-modal"});var e=this._createModalContent();this.promptBox.show({content:e},()=>{this.destroy()})}}destroy(){this.promptBox&&(this.promptBox.destroy(),this.promptBox=null),this.previewPanel&&(this.previewPanel.destroy(),this.previewPanel=null),this.browser&&(this.browser.destroy(),this.browser=null),this.onClose&&"function"==typeof this.onClose&&this.onClose()}_buildBatchTree(){this.batchTreeData=this.treeBuilder.buildTree(this.batch,this.referenceFiles,this.filesToAnalyze)}_handleNodeSelection(e){var t,i;this.previewPanel&&({node:t,path:i}=this._findNodeAndPath(e),t?this.previewPanel.updateContent(t,{batch:this.batch,referenceFiles:this.referenceFiles,filesToAnalyze:this.filesToAnalyze},i):console.warn("BatchReviewBrowser: Could not find node with ID: "+e))}_findNodeAndPath(s){let o=null,h=(e,t)=>{for(var i of e){var r=[...t,i];if(i.id===s)return o=i,r;if(i.kids&&0<i.kids.length){i=h(i.kids,r);if(i)return i}}return null};var e=h(this.batchTreeData,[]);return{node:o,path:e||[]}}_createModalContent(){var e,t,i,r=this.h.createDiv({style:{height:"100%",display:"flex",flexDirection:"column"}}),s=this.h.createDiv({style:{flexGrow:"1",display:"flex",overflow:"hidden"}});return this.batchTreeData&&0!==this.batchTreeData.length?(e=this.h.createDiv({id:"gsc-brb-tree-browser",style:{width:BATCH_BROWSER_WIDTH,height:"100%",overflowY:"auto",borderRight:"1px solid #eee",backgroundColor:"#fafafa",flexShrink:"0"}}),t=(this.browser=new Browser(e,this.batchTreeData,this._handleNodeSelection.bind(this)),this.h.createDiv({id:"gsc-brb-preview-area",style:{flexGrow:"1",width:`calc(100% - ${BATCH_BROWSER_WIDTH})`,minWidth:`calc(100% - ${BATCH_BROWSER_WIDTH})`,height:"calc(100%)",overflowY:"auto",padding:"20px 25px 0px 25px",backgroundColor:"#ffffff"}})),i=(this.previewPanel=new PreviewPanel(t,this.context,{chatApi:this.chatApi,onBreadcrumbClick:e=>{this._handleNodeSelection(e)},onNodeDrillDown:e=>{this._handleNodeSelection(e)}}),this.batchTreeData[0]),this.previewPanel.updateContent(i,{batch:this.batch,referenceFiles:this.referenceFiles,filesToAnalyze:this.filesToAnalyze},[i]),s.appendChild(e),s.appendChild(t),r.appendChild(s)):(i=this.h.createDiv({style:{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"},html:`
                    <h2 style="color: #555;">No Batch Data</h2>
                    <p style="color: #777; font-size: 1.1em;">
                        There is no data available for this batch.<br>
                    </p>
                `}),s.appendChild(i),r.appendChild(s)),r}}module.exports={BatchReviewBrowser:BatchReviewBrowser};
