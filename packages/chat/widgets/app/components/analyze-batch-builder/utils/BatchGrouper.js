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

class BatchGrouper{static groupFiles(e,t,a=[],s){var{maxFilesPerBatch:t=5,maxTokensPerBatch:r=25e3,maxBatchSizeMB:n=5,groupByLanguage:i=!0,randomizeOrder:o=!1,groupByParent:c=!1}=t,n=1024*n*1024,l=this._calculateReferenceTotals(a),u=r-l.tokens,n=n-l.size;return r<l.tokens?(console.warn("Reference items exceed token limit and cannot be included in batches"),{batches:[],ungroupableFiles:e.map(e=>({...e,reason:"Reference items exceed token limit",tokens:e.meta?.tokens?.content?.estimate||0}))}):({filteredFiles:r,duplicateFiles:l}=this._removeDuplicates(e,a),{validFiles:e,ungroupableFiles:r}=this._separateByTokenLimit(r,u),{batches:this._groupByRepository(e,t,u,n,a,i,o,c),ungroupableFiles:[...r,...l]})}static _removeDuplicates(e,t){let a=new Set(t.map(e=>e.id)),s=[],r=[];return e.forEach(e=>{a.has(e.id)?r.push({...e,reason:"File already selected as a reference file",tokens:e.meta?.tokens?.content?.estimate||0}):s.push(e)}),{filteredFiles:s,duplicateFiles:r}}static _calculateReferenceTotals(e){return e.reduce((e,t)=>{var a=t.meta?.tokens?.content?.estimate||0,t=t.meta?.size||0;return{tokens:e.tokens+a,size:e.size+t}},{tokens:0,size:0})}static _separateByTokenLimit(e,a){let s=[],r=[];return e.forEach(e=>{var t=e.meta?.tokens?.content?.estimate||0;a<t?r.push({...e,reason:"Token limit exceeded",tokens:t}):s.push(e)}),{validFiles:s,ungroupableFiles:r}}static _groupByRepository(e,a,s,r,n,i,o,c){let l={},u=(e.forEach(e=>{var t=e.group_name||"Unknown";l[t]||(l[t]=[]),l[t].push(e)}),[]);return Object.keys(l).forEach(t=>{let e=l[t];o&&(e=this._shuffleArray(e)),(c?this._groupByParent(e,a,s,r,n,i):i?this._groupByLanguage(e,a,s,r,n):this._createBatches(e,a,s,r,n)).forEach(e=>{e.repository=t,u.push(e)})}),o?this._shuffleArray(u):u}static _groupByParent(e,a,s,r,n,i){let o={},c=(e.forEach(e=>{var t=this._extractParentDirectory(e);o[t]||(o[t]=[]),o[t].push(e)}),[]);return Object.keys(o).forEach(t=>{var e=o[t];(i?this._groupByLanguage(e,a,s,r,n):this._createBatches(e,a,s,r,n)).forEach(e=>{e.parent=t,c.push(e)})}),c}static _extractParentDirectory(e){var e=e.meta?.path||"",t=e.lastIndexOf("/");return-1===t?"":e.substring(0,t)}static _groupByLanguage(e,a,s,r,n){let i={},o=(e.forEach(e=>{var t=e.meta?.language||"Unknown";i[t]||(i[t]=[]),i[t].push(e)}),[]);return Object.keys(i).forEach(t=>{var e=i[t];this._createBatches(e,a,s,r,n).forEach(e=>{e.language=t,o.push(e)})}),o}static _createBatches(e,n,i,o,c){let l=[],u=c.length,h={files:[...c],tokens:this._calculateReferenceTotals(c).tokens,size:this._calculateReferenceTotals(c).size,referenceItems:c.map(e=>e.id)};return e.forEach((e,t)=>{var a=e.meta?.tokens?.content?.estimate||0,s=e.meta?.size||0,r=h.files.length-u;(n<=r||h.tokens+a>i||h.size+s>o)&&(0<r&&l.push(h),h={files:[...c],tokens:this._calculateReferenceTotals(c).tokens,size:this._calculateReferenceTotals(c).size,referenceItems:c.map(e=>e.id)}),h.files.push(e),h.tokens+=a,h.size+=s}),0<h.files.length-u&&l.push(h),l}static _shuffleArray(e){var t=[...e];for(let e=t.length-1;0<e;e--){var a=Math.floor(Math.random()*(e+1));[t[e],t[a]]=[t[a],t[e]]}return t}}module.exports=BatchGrouper;
