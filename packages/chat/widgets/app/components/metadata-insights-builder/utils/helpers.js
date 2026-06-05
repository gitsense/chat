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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,{CSS_CLASSES,TEXT,DEFAULT_CONFIG}=require("../constants");function createSectionHeader(e,t={}){return DomUtils.h.createH2({text:e,style:{color:"#555",marginTop:"5px",...t}})}function createStatusIndicator(e,t){var n=e?CSS_CLASSES.STATUS_SUCCESS:CSS_CLASSES.STATUS_ERROR,e=e?"✓":"✗";return DomUtils.h.createSpan({text:e,style:{fontWeight:"bold",marginRight:"8px",width:"20px"},cls:CSS_CLASSES.STATUS_INDICATOR+" "+n})}function formatFileNames(e,t=DEFAULT_CONFIG.maxFilesDisplayed){return e&&0!==e.length?(e=e.map(e=>e.name)).slice(0,t).join(", ")+(e.length>t?"...":""):""}function createLink(e,t,n={},i=!1){i={color:i?"gray":null,pointerEvents:i?"none":null},e=DomUtils.h.createLink({text:e,href:"#",style:{...i,...n}});return t&&e.addEventListener("click",e=>{e.preventDefault(),t()}),e}function createButton(e,t,n={}){var{variant:n="primary",disabled:i=!1,style:a={},type:l="button",cls:r=""}=n,o=["btn"],r=(n&&o.push("btn-"+n),r&&o.push(r),i&&o.push("disabled"),{padding:"8px 16px",margin:"0",opacity:i?.6:1,border:"outline"===n?"1px solid #eee":null,fontWeight:500,...a});let s=DomUtils.h.createButton({text:e,type:l,cls:o.join(" "),style:r,disabled:i});return t&&(s._originalClickHandler=t,s.addEventListener("click",e=>{e.preventDefault(),s.disabled||t()})),s}function truncateText(e,t=50){return!e||e.length<=t?e:e.substring(0,t-3)+"..."}function enableLink(e){e&&(e.style.pointerEvents=null,e.style.opacity=1,e.style.color=null)}function disableLink(e){e&&(e.style.pointerEvents="none",e.style.opacity=.5,e.style.color="gray")}function enableButton(e){e&&(e.disabled=!1,e.style.cursor="pointer",e.style.opacity=1,e.classList.remove("disabled"))}function disableButton(e){e&&(e.disabled=!0,e.style.cursor="not-allowed",e.style.opacity=.6,e.classList.add("disabled"))}module.exports={createSectionHeader:createSectionHeader,createStatusIndicator:createStatusIndicator,formatFileNames:formatFileNames,createLink:createLink,createButton:createButton,truncateText:truncateText,enableLink:enableLink,disableLink:disableLink,enableButton:enableButton,disableButton:disableButton};
