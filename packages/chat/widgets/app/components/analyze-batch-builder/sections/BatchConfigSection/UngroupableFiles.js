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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,{CSS_CLASSES,TEXT}=require("./constants"),createLink=require("../../utils/helpers").createLink;class UngroupableFiles{constructor(e,t={}){this.container=e,this.options={onAnalyzeIndividually:null,onUpdateSettings:null,...t},this.sectionContainer=null,this.filesList=null,this.actionsContainer=null,this.render()}render(){this.sectionContainer=DomUtils.h.createDiv({cls:CSS_CLASSES.UNGROUPABLE_SECTION,style:{marginTop:"20px",padding:"15px",backgroundColor:"#fff3cd",border:"1px solid #ffeeba",borderRadius:"4px",display:"none"}});var e=DomUtils.h.createH3({text:TEXT.UNGROUPABLE_FILES_TITLE.replace("{count}","0"),style:{margin:"0 0 10px 0",color:"#856404"}}),e=(this.sectionContainer.appendChild(e),DomUtils.h.createParagraph({text:TEXT.UNGROUPABLE_FILES_MESSAGE,style:{margin:"0 0 15px 0",fontSize:"0.9em"}}));this.sectionContainer.appendChild(e),this.filesList=DomUtils.h.createUl({style:{margin:"0 0 15px 0",paddingLeft:"20px"}}),this.sectionContainer.appendChild(this.filesList),this.container.appendChild(this.sectionContainer)}updateFiles(e){this.filesList.innerHTML="",this.sectionContainer.querySelector("h3").textContent=TEXT.UNGROUPABLE_FILES_TITLE.replace("{count}",e.length),this.sectionContainer.style.display=0<e.length?"block":"none",e.forEach(e=>{e=this._createFileListItem(e);this.filesList.appendChild(e)})}_createFileListItem(e){var t=DomUtils.h.createLi({style:{marginBottom:"8px",fontSize:"0.9em"}}),i=DomUtils.h.createDiv({style:{display:"flex",justifyContent:"space-between",alignItems:"center"}}),n=DomUtils.h.createDiv({style:{flex:1}}),s=DomUtils.h.createSpan({text:e.name||"Unknown file",style:{fontWeight:"600",marginRight:"5px"}}),s=(n.appendChild(s),e.path&&(s=DomUtils.h.createSpan({text:`(${e.path})`,style:{color:"#666",fontSize:"0.9em"}}),n.appendChild(s)),DomUtils.h.createDiv({style:{textAlign:"right",marginLeft:"10px"}})),l=(e.tokens&&(l=DomUtils.h.createSpan({text:this._formatNumber(e.tokens)+" tokens",style:{color:"#856404",fontWeight:"500"}}),s.appendChild(l)),e.size&&(l=DomUtils.h.createSpan({text:` (${this._formatFileSize(e.size)})`,style:{color:"#666",fontSize:"0.9em"}}),s.appendChild(l)),createLink("Analyze",()=>{this.options.onAnalyzeIndividually&&this.options.onAnalyzeIndividually(e)},{fontSize:"0.8em",marginLeft:"10px"}));return s.appendChild(l),i.appendChild(n),i.appendChild(s),t.appendChild(i),t}_formatNumber(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}_formatFileSize(e){return e?e<1024?e+" B":e<1048576?(e/1024).toFixed(1)+" KB":(e/1048576).toFixed(1)+" MB":"0 B"}setVisible(e){this.sectionContainer&&(this.sectionContainer.style.display=e?"block":"none")}getSectionContainer(){return this.sectionContainer}cleanup(){this.sectionContainer&&this.sectionContainer.parentElement&&(this.sectionContainer.remove(),this.sectionContainer=null),this.filesList=null,this.actionsContainer=null}}module.exports=UngroupableFiles;
