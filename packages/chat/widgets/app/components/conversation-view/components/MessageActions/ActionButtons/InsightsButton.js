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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,svg=require("../../../Dependencies").svg,DropDownMenu=require("../../../Dependencies").DropDownMenu,InsightsModal=require("../../modals/InsightsModal"),h=DomUtils.h;function render(e,n,t){var l=svg.lightBulb({style:{cursor:"pointer",position:"relative",left:"3px"}});let s=createInsightsMenu(n,t);n=h.createDiv({append:[l,s],style:{display:"inline-block",marginLeft:"6px"}});e.appendChild(n),l.addEventListener("click",()=>s.open())}function createInsightsMenu(a,{chat:i,mainModel:r,settings:o,allModels:e,model2Messages:p}){e=[{value:"",selected:!0},{value:1<e.length?"Evaluate model responses":`Evaluate ${r} response`+(2<a.level?"s":"")}];let n=new DropDownMenu(e,"",{dropDownClass:"",dropDownStyle:{fontSize:"14px"},menuStyle:{left:"-15px",marginTop:"10px",width:"325px",zIndex:1e6,textAlign:"left"},callback:(e,n)=>{var t,n=getInsightType(n),l=[];for(t in p){var s=p[t][0];l.push({name:t,ready:s&&null!=s.message})}new InsightsModal(n,i,a,r,l,p,o.models).render()}});e=h.createDiv({append:[n.create()],style:{display:"inline-block"}});return e.open=()=>n.open(),e}function getInsightType(e){return e.match(/compare/i)?"compare":e.match(/validate/i)?"validate":e.match(/ask/i)?"ask more":"evaluate"}module.exports={render:render};
