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

let CHART_CONFIG=require("./constants").CHART_CONFIG,{formatBytes,formatTokens}=require("@gitsense/gsc-utils"),DomUtils=require("@gitsense/gsc-utils").DomUtils;class Chart{constructor(e){this.container=e,this.h=DomUtils.h}_formatValue(e,t){return"size"===t?formatBytes(e):"tokens"===t?formatTokens(e):e.toLocaleString()}render(e,o){if(this.container.innerHTML="",this.container.style.flexGrow="1",this.container.style.padding="10px",this.container.style.overflowX="auto",0===e.length)this.container.textContent="No data available for charting.";else{let n=e[0].value,s=this.h.createDiv({style:{display:"flex",flexDirection:"column",gap:"5px",minWidth:"400px"}});e.forEach(e=>{var t="other-aggregate"===e.id,i=0<n?e.value/n*100:0,i=Math.max(i,1),a=this.h.createDiv({style:{display:"flex",alignItems:"center",height:"15px",fontSize:"0.85em"},title:e.name+": "+this._formatValue(e.value,o)}),r=this.h.createSpan({text:30<e.name.length?e.name.substring(0,27)+"...":e.name,style:{width:"150px",flexShrink:"0",textAlign:"right",paddingRight:"10px"}}),r=(a.appendChild(r),this.h.createDiv({style:{height:"100%",width:i+"%",backgroundColor:t?CHART_CONFIG.OTHER_BACKGROUND:CHART_CONFIG.BAR_BACKGROUND,border:"1px solid "+(t?CHART_CONFIG.OTHER_COLOR:CHART_CONFIG.BAR_COLOR),borderRadius:"3px",position:"relative",overflow:"hidden",minWidth:"5px"}})),i=this.h.createDiv({style:{height:"100%",width:"100%",backgroundColor:t?CHART_CONFIG.OTHER_COLOR:CHART_CONFIG.BAR_COLOR,opacity:"0.7"}}),t=(r.appendChild(i),this.h.createSpan({text:this._formatValue(e.value,o),style:{marginLeft:"5px",flexShrink:"0",color:"#333"}}));a.appendChild(r),a.appendChild(t),s.appendChild(a)}),this.container.appendChild(s)}}destroy(){this.container.innerHTML=""}}module.exports={Chart:Chart};
