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

class BatchGrouper{static groupFiles(e,t,s=[],a){var{maxFilesPerBatch:t=5,maxTokensPerBatch:i=25e3,maxBatchSizeMB:n=5,groupByLanguage:r=!0}=t,n=1024*n*1024,c=this._calculateReferenceTotals(s),l=i-c.tokens,n=n-c.size;return i<c.tokens?(console.warn("Reference items exceed token limit and cannot be included in batches"),{batches:[],ungroupableFiles:e.map(e=>({...e,reason:"Reference items exceed token limit",tokens:e.meta?.tokens?.content?.estimate||0}))}):({filteredFiles:i,duplicateFiles:c}=this._removeDuplicates(e,s),{validFiles:e,ungroupableFiles:i}=this._separateByTokenLimit(i,l),{batches:r?this._groupByLanguage(e,t,l,n,s):this._createBatches(e,t,l,n,s),ungroupableFiles:[...i,...c]})}static _removeDuplicates(e,t){let s=new Set(t.map(e=>e.id)),a=[],i=[];return e.forEach(e=>{s.has(e.id)?i.push({...e,reason:"File already selected as a reference file",tokens:e.meta?.tokens?.content?.estimate||0}):a.push(e)}),{filteredFiles:a,duplicateFiles:i}}static _calculateReferenceTotals(e){return e.reduce((e,t)=>{var s=t.meta?.tokens?.content?.estimate||0,t=t.meta?.size||0;return{tokens:e.tokens+s,size:e.size+t}},{tokens:0,size:0})}static _separateByTokenLimit(e,s){let a=[],i=[];return e.forEach(e=>{var t=e.meta?.tokens?.content?.estimate||0;s<t?i.push({...e,reason:"Token limit exceeded",tokens:t}):a.push(e)}),{validFiles:a,ungroupableFiles:i}}static _groupByLanguage(e,s,a,i,n){let r={},c=(e.forEach(e=>{var t=e.meta?.language||"Unknown";r[t]||(r[t]=[]),r[t].push(e)}),[]);return Object.keys(r).forEach(t=>{var e=r[t];this._createBatches(e,s,a,i,n).forEach(e=>{e.language=t,c.push(e)})}),c}static _createBatches(e,n,r,c,l){let o=[],u=l.length,h={files:[...l],tokens:this._calculateReferenceTotals(l).tokens,size:this._calculateReferenceTotals(l).size,referenceItems:l.map(e=>e.id)};return e.forEach((e,t)=>{var s=e.meta?.tokens?.content?.estimate||0,a=e.meta?.size||0,i=h.files.length-u;(n<=i||h.tokens+s>r||h.size+a>c)&&(0<i&&o.push(h),h={files:[...l],tokens:this._calculateReferenceTotals(l).tokens,size:this._calculateReferenceTotals(l).size,referenceItems:l.map(e=>e.id)}),h.files.push(e),h.tokens+=s,h.size+=a}),0<h.files.length-u&&o.push(h),o}}module.exports=BatchGrouper;
