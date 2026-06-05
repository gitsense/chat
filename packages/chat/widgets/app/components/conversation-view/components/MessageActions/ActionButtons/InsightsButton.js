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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,svg=require("../../../Dependencies").svg,DropDownMenu=require("../../../Dependencies").DropDownMenu,InsightsModal=require("../../modals/InsightsModal"),h=DomUtils.h;function render(e,n,t){var l=svg.lightBulb({style:{cursor:"pointer",position:"relative",left:"3px"}});let s=createInsightsMenu(n,t);n=h.createDiv({append:[l,s],style:{display:"inline-block",marginLeft:"6px"}});e.appendChild(n),l.addEventListener("click",()=>s.open())}function createInsightsMenu(a,{chat:i,mainModel:r,settings:o,allModels:e,model2Messages:p}){e=[{value:"",selected:!0},{value:1<e.length?"Evaluate model responses":`Evaluate ${r} response`+(2<a.level?"s":"")}];let n=new DropDownMenu(e,"",{dropDownClass:"",dropDownStyle:{fontSize:"14px"},menuStyle:{left:"-15px",marginTop:"10px",width:"325px",zIndex:1e6,textAlign:"left"},callback:(e,n)=>{var t,n=getInsightType(n),l=[];for(t in p){var s=p[t][0];l.push({name:t,ready:s&&null!=s.message})}new InsightsModal(n,i,a,r,l,p,o.models).render()}});e=h.createDiv({append:[n.create()],style:{display:"inline-block"}});return e.open=()=>n.open(),e}function getInsightType(e){return e.match(/compare/i)?"compare":e.match(/validate/i)?"validate":e.match(/ask/i)?"ask more":"evaluate"}module.exports={render:render};
