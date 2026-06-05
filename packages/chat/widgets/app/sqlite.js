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

let Database=require("better-sqlite3");function connect(e){if(!e)throw new Error("Error: No database defined");try{var n=new Database(e);return n.pragma("journal_mode = WAL"),n}catch(n){throw new Error(`ERROR: Unable to connect to database ${e}
`+n)}}async function closeAsync(r){return new Promise((n,e)=>{try{r.close(),n()}catch(n){e(n)}})}function execAsync(r,t){return new Promise((n,e)=>{try{r.exec(t),n()}catch(n){e(n)}})}function runAsync(r,t,c=[]){return new Promise((n,e)=>{try{n(r.prepare(t).run(c))}catch(n){e(n)}})}function getAsync(r,t,c=[]){return new Promise((n,e)=>{try{n(r.prepare(t).get(c))}catch(n){e(n)}})}function allAsync(r,t,c=[]){return new Promise((n,e)=>{try{n(r.prepare(t).all(c))}catch(n){e(n)}})}function eachAsync(t,c,s=[]){return new Promise((n,e)=>{try{var r=t.prepare(c).all(s);n({rows:r,count:r.length})}catch(n){e(n)}})}function prepareAsync(r,t){return new Promise((n,e)=>{try{n(r.prepare(t))}catch(n){e(n)}})}function stmtRunAsync(r,t=[]){return new Promise((n,e)=>{try{n(r.run(t))}catch(n){e(n)}})}function stmtAllAsync(r,t=[]){return new Promise((n,e)=>{try{n(r.all(t))}catch(n){e(n)}})}function stmtFinalizeAsync(n){return new Promise(n=>{n()})}function serializeAsync(n,r){return new Promise((n,e)=>{r().then(n).catch(e)})}module.exports={connect:connect,closeAsync:closeAsync,allAsync:allAsync,execAsync:execAsync,getAsync:getAsync,prepareAsync:prepareAsync,runAsync:runAsync,stmtAllAsync:stmtAllAsync,stmtFinalizeAsync:stmtFinalizeAsync,stmtRunAsync:stmtRunAsync,serializeAsync:serializeAsync};
