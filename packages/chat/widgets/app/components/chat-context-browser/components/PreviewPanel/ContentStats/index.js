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

let{METRICS,CHART_CONFIG}=require("./constants"),Header=require("./Header").Header,SideStats=require("./SideStats").SideStats,Chart=require("./Chart").Chart,DomUtils=require("@gitsense/gsc-utils").DomUtils;class ContentStats{constructor(t,e){this.container=t,this.onMetricChange=e,this.data=[],this.activeMetric=METRICS.TOKENS,this.h=DomUtils.h}_createLayout(){this.container.style.height=CHART_CONFIG.CHART_HEIGHT,this.container.style.minHeight=CHART_CONFIG.CHART_HEIGHT,this.container.style.border="1px solid #ddd",this.container.style.marginBottom="20px",this.container.style.backgroundColor="#f9f9f9",this.container.style.display="flex",this.container.style.flexDirection="column",this.container.innerHTML="";var t=this.h.createDiv({className:"gsc-cs-header-container"}),e=this.h.createDiv({style:{display:"flex",flexGrow:"1",overflow:"hidden"}}),i=this.h.createDiv({className:"gsc-cs-chart-container"}),a=this.h.createDiv({className:"gsc-cs-side-stats-container"});return e.appendChild(i),e.appendChild(a),this.container.appendChild(t),this.container.appendChild(e),{headerContainer:t,chartContainer:i,sideStatsContainer:a}}_calculateStats(t,e){if(0===t.length)return{min:0,max:0,median:0,total:0,avg:0};var t=t.map(t=>t[e]).sort((t,e)=>t-e),i=t.reduce((t,e)=>t+e,0),a=t[0],s=t[t.length-1],r=i/t.length;let n;var h=Math.floor(t.length/2);return{min:a,max:s,median:n=t.length%2==0?(t[h-1]+t[h])/2:t[h],total:i,avg:r}}_getTopItems(t,i){var e,t=[...t].sort((t,e)=>e[i]-t[i]),a=t.slice(0,CHART_CONFIG.MAX_ITEMS);return t.length<=CHART_CONFIG.MAX_ITEMS?a.map(t=>({id:t.id,name:t.name,value:t[i]})):(e=(t=t.slice(CHART_CONFIG.MAX_ITEMS)).reduce((t,e)=>t+e[i],0),(a=a.map(t=>({id:t.id,name:t.name,value:t[i]}))).push({id:"other-aggregate",name:`Other (${t.length} items)`,value:e}),a)}update(t,e,i){this.container=t,this.data=e||[],this.activeMetric=i||METRICS.TOKENS,this.elements=this._createLayout(),this.header=new Header(this.elements.headerContainer,this.onMetricChange),this.sideStats=new SideStats(this.elements.sideStatsContainer),this.chart=new Chart(this.elements.chartContainer);t=this._calculateStats(this.data,this.activeMetric),e=this._getTopItems(this.data,this.activeMetric);this.header.render({tokens:t.total,size:t.total,lines:t.total},this.activeMetric),this.sideStats.render(t,this.activeMetric),this.chart.render(e,this.activeMetric)}destroy(){this.header.destroy(),this.sideStats.destroy(),this.chart.destroy(),this.container.innerHTML=""}}module.exports={ContentStats:ContentStats};
