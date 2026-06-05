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

let{DomUtils,SVGUtils}=require("@gitsense/gsc-utils");class Callout{constructor(t={}){this.title=t.title||"",this.purpose=t.purpose||"",this.steps=t.steps||[],this.targetElement=t.targetElement,this.className=t.className||"demo-callout",this.showStepsByDefault=!1!==t.showStepsByDefault,this.arrowDirection=t.arrowDirection||"none",this.container=null,this.stepsContainer=null,this.toggleLink=null,this.marginTop=t.marginTop,this.marginBottom=t.marginBottom}show(){if(!this.targetElement)return console.error("Callout: No target element specified"),null;let t=null;var e;if("up"!==this.arrowDirection&&"down"!==this.arrowDirection||((e="up"===this.arrowDirection?SVGUtils.arrowUp():SVGUtils.arrowDown()).style.width="30px",e.style.height="30px",e.style.display="block",e.style.margin="0 auto",(t=DomUtils.h.createDiv({style:{display:"flex",justifyContent:"center",width:"100%"}})).appendChild(e)),this.container=DomUtils.h.createDiv({cls:this.className,style:{backgroundColor:"#fff3cd",border:"1px solid #856404",borderRadius:"4px",padding:"15px",marginTop:"up"===this.arrowDirection?this.marginTop||"10px":"20px",marginBottom:"down"===this.arrowDirection?this.marginBottom||"10px":"20px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)",position:"relative",color:"#856404"}}),this.title&&(e=DomUtils.h.createH4({text:this.title,style:{margin:"0 0 10px 0",fontSize:"16px",fontWeight:"600",color:"#856404"}}),this.container.appendChild(e)),this.purpose&&(e=DomUtils.h.createP({text:this.purpose,style:{margin:"0 0 15px 0",fontSize:"14px",color:"#856404",fontStyle:"italic"}}),this.container.appendChild(e)),this.stepsContainer=DomUtils.h.createDiv({style:{display:this.showStepsByDefault?"block":"none"}}),0<this.steps.length){let e=DomUtils.h.createOl({style:{margin:"0",paddingLeft:"20px"}});this.steps.forEach(t=>{t=DomUtils.h.createLi({text:t,style:{marginBottom:"8px",lineHeight:"1.4"}});e.appendChild(t)}),this.stepsContainer.appendChild(e),this.container.appendChild(this.stepsContainer)}return 0<this.steps.length&&(this.toggleLink=DomUtils.h.createA({text:this.showStepsByDefault?"Hide steps":"Show steps",href:"#",style:{fontSize:"14px",fontWeight:"500",color:"#856404",textDecoration:"underline",cursor:"pointer"}}),this.toggleLink.onclick=t=>{t.preventDefault(),this.toggleSteps()},this.container.appendChild(this.toggleLink)),"up"===this.arrowDirection?(this.targetElement.parentNode.insertBefore(t,this.targetElement.nextSibling),this.targetElement.parentNode.insertBefore(this.container,t.nextSibling)):"down"===this.arrowDirection?(this.targetElement.parentNode.insertBefore(this.container,this.targetElement.nextSibling),this.targetElement.parentNode.insertBefore(t,this.container.nextSibling)):this.targetElement.parentNode.insertBefore(this.container,this.targetElement.nextSibling),this.container}toggleSteps(){var t;this.stepsContainer&&this.toggleLink&&(t="none"===this.stepsContainer.style.display,this.stepsContainer.style.display=t?"block":"none",this.toggleLink.innerText=t?"Hide steps":"Show steps")}setStepsVisibility(t){this.stepsContainer&&this.toggleLink&&(this.stepsContainer.style.display=t?"block":"none",this.toggleLink.innerText=t?"Hide steps":"Show steps")}hide(){this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}module.exports=Callout;
