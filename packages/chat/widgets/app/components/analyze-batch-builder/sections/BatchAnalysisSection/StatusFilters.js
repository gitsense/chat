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

let{DomUtils,SVGUtils}=require("@gitsense/gsc-utils"),{CSS_CLASSES,TEXT,STATUS_FILTER_OPTIONS,STATUS_ICONS}=require("./constants"),MetricCards=require("../../Dependencies").MetricCards;class StatusFilters{constructor(t,e={}){this.container=t,this.options={initialFilters:{pending:!1,running:!1,completed:!1,failed:!1,cancelled:!1,...e.initialFilters},onFilterChange:null,showCounts:!0,...e},this.filters={...this.options.initialFilters},this.filtersContainer=null,this.metricCardsComponent=null,this.render()}render(t=0){this.filtersContainer=DomUtils.h.createDiv({cls:CSS_CLASSES.STATUS_FILTERS_CONTAINER});let e={};STATUS_FILTER_OPTIONS.forEach(t=>{e[t.key]=SVGUtils[STATUS_ICONS[t.key]]({style:{width:"16px",height:"16px",opacity:"0.7",color:"#6c757d"}})});var i=STATUS_FILTER_OPTIONS.map(t=>({id:t.key,label:t.label,value:0,valueSuffix:"%",count:0,countLabel:"batch",countLabelPlural:"batches",icon:e[t.key],selected:this.filters[t.key]}));this.metricCardsComponent=new MetricCards(this.filtersContainer,{metrics:i,showCheckboxes:!0,showIcons:!0,allowMultipleSelection:!0,showSelectAllActions:!0,cardWidth:"215px",cardMinWidth:"200px",cardMaxWidth:"250px",gap:"20px",valueFontSize:"30px",valueSuffixFontSize:".7em",labelFontSize:"14px",countFontSize:"12px",selectAllText:TEXT.STATUS_FILTERS_SELECT_ALL,clearAllText:TEXT.STATUS_FILTERS_CLEAR_ALL,onSelectionChange:(e,t)=>{let i={};STATUS_FILTER_OPTIONS.forEach(t=>{i[t.key]=e.includes(t.key)}),this.filters=i,this.options.onFilterChange&&this.options.onFilterChange(this.filters)}}),this.metricCardsComponent.render(),this.container.appendChild(this.filtersContainer)}updateFilters(t){this.filters={...this.filters,...t},this.metricCardsComponent&&(t=Object.keys(this.filters).filter(t=>this.filters[t]),this.metricCardsComponent.setSelectedIds(t))}updateCounts(r){if(this.options.showCounts&&this.metricCardsComponent){let l=Object.values(r).reduce((t,e)=>t+e,0);var t=STATUS_FILTER_OPTIONS.map(t=>{var e=r[t.key]||0,i=0<l?Math.round(e/l*100):0,s=SVGUtils[STATUS_ICONS[t.key]]({style:{width:"16px",height:"16px",opacity:"0.7",color:"#6c757d"}});return{id:t.key,label:t.label,value:i,valueSuffix:"%",count:e,countLabel:"batch",countLabelPlural:"batches",icon:s,selected:this.filters[t.key]}});this.metricCardsComponent.updateMetricsEfficiently(t)}}getFilters(){return{...this.filters}}setFilters(t){this.filters={...t},this.updateFilters(t)}setEnabled(e){this.metricCardsComponent&&STATUS_FILTER_OPTIONS.forEach(t=>{this.metricCardsComponent.setMetricEnabled(t.key,e)})}cleanup(){this.metricCardsComponent&&(this.metricCardsComponent.cleanup(),this.metricCardsComponent=null),this.filtersContainer&&this.filtersContainer.parentElement&&(this.filtersContainer.remove(),this.filtersContainer=null),this.filters={}}}module.exports=StatusFilters;
