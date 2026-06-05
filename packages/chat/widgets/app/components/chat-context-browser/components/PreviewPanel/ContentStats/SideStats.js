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

let{METRICS,CHART_CONFIG}=require("./constants"),{formatBytes,formatTokens}=require("@gitsense/gsc-utils");class SideStats{constructor(e){this.container=e}_formatValue(e,t){return t===METRICS.SIZE?formatBytes(e):t===METRICS.TOKENS?formatTokens(e):e.toLocaleString()}render(e,n){this.container.innerHTML="",this.container.style.width=CHART_CONFIG.SIDE_STATS_WIDTH,this.container.style.padding="10px",this.container.style.borderLeft="1px solid #eee",this.container.style.flexShrink="0",this.container.style.fontSize="0.9em";var t=n.charAt(0).toUpperCase()+n.slice(1),a=document.createElement("h4");a.textContent=t+" Distribution",a.style.marginTop="0",a.style.marginBottom="10px",a.style.fontSize="1.1em",this.container.appendChild(a),[{label:"Total",value:e.total},{label:"Max",value:e.max},{label:"Median",value:e.median},{label:"Average",value:e.avg},{label:"Min",value:e.min}].forEach(e=>{var t=document.createElement("div");t.style.marginBottom="5px",t.innerHTML=`
                <strong style="display: inline-block; width: 60px;">${e.label}:</strong>
                <span>${this._formatValue(e.value,n)}</span>
            `,this.container.appendChild(t)})}destroy(){this.container.innerHTML=""}}module.exports={SideStats:SideStats};
