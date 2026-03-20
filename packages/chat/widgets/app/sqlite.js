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

let Database=require("better-sqlite3");function connect(e){if(!e)throw new Error("Error: No database defined");try{return new Database(e)}catch(n){throw new Error(`ERROR: Unable to connect to database ${e}
`+n)}}async function closeAsync(t){return new Promise((n,e)=>{try{t.close(),n()}catch(n){e(n)}})}function execAsync(t,r){return new Promise((n,e)=>{try{t.exec(r),n()}catch(n){e(n)}})}function runAsync(t,r,c=[]){return new Promise((n,e)=>{try{n(t.prepare(r).run(c))}catch(n){e(n)}})}function getAsync(t,r,c=[]){return new Promise((n,e)=>{try{n(t.prepare(r).get(c))}catch(n){e(n)}})}function allAsync(t,r,c=[]){return new Promise((n,e)=>{try{n(t.prepare(r).all(c))}catch(n){e(n)}})}function eachAsync(r,c,s=[]){return new Promise((n,e)=>{try{var t=r.prepare(c).all(s);n({rows:t,count:t.length})}catch(n){e(n)}})}function prepareAsync(t,r){return new Promise((n,e)=>{try{n(t.prepare(r))}catch(n){e(n)}})}function stmtRunAsync(t,r=[]){return new Promise((n,e)=>{try{n(t.run(r))}catch(n){e(n)}})}function stmtAllAsync(t,r=[]){return new Promise((n,e)=>{try{n(t.all(r))}catch(n){e(n)}})}function stmtFinalizeAsync(n){return new Promise(n=>{n()})}function serializeAsync(n,t){return new Promise((n,e)=>{t().then(n).catch(e)})}module.exports={connect:connect,closeAsync:closeAsync,allAsync:allAsync,execAsync:execAsync,getAsync:getAsync,prepareAsync:prepareAsync,runAsync:runAsync,stmtAllAsync:stmtAllAsync,stmtFinalizeAsync:stmtFinalizeAsync,stmtRunAsync:stmtRunAsync,serializeAsync:serializeAsync};
