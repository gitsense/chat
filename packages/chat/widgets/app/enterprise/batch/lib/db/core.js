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

let Database=require("better-sqlite3"),fs=require("fs").promises,_transactionDepths=new WeakMap,_dbPaths=new WeakMap;function getTransactionDepth(r){return _transactionDepths.get(r)||0}function setTransactionDepth(r,a){_transactionDepths.set(r,a)}function getDbPath(r){return _dbPaths.get(r)||"unknown"}function setDbPath(r,a){_dbPaths.set(r,a)}async function run(n,t,s=[]){return new Promise((r,a)=>{try{var e=n.prepare(t).run(s);r({lastID:e.lastInsertRowid,changes:e.changes})}catch(r){console.error(`DB Error (run): ${r.message}
SQL: ${t}
Params: `+JSON.stringify(s)),a(new Error("DB Error (run): "+r.message))}})}async function get(e,n,t=[]){getDbPath(e);return new Promise((r,a)=>{try{r(e.prepare(n).get(t)||null)}catch(r){console.error(`DB Error (get): ${r.message}
SQL: ${n}
Params: `+JSON.stringify(t)),a(new Error("DB Error (get): "+r.message))}})}async function all(e,n,t=[]){return new Promise((r,a)=>{try{r(e.prepare(n).all(t))}catch(r){console.error(`DB Error (all): ${r.message}
SQL: ${n}
Params: `+JSON.stringify(t)),a(new Error("DB Error (all): "+r.message))}})}async function exec(e,n){return new Promise((r,a)=>{try{e.exec(n),r()}catch(r){console.error(`DB Error (exec): ${r.message}
SQL: ${n.substring(0,200)}...`),a(new Error("DB Error (exec): "+r.message))}})}async function beginTransaction(r){var a=getTransactionDepth(r);setTransactionDepth(r,++a),1==a?await run(r,"BEGIN DEFERRED TRANSACTION"):await run(r,"SAVEPOINT s"+(a-1))}async function commitTransaction(r){var a=getTransactionDepth(r);if(0===a)throw new Error("No active transaction to commit.");1===a?await run(r,"COMMIT TRANSACTION"):await run(r,"RELEASE s"+(a-1)),setTransactionDepth(r,a-1)}async function rollbackTransaction(r){var a=getTransactionDepth(r);if(0===a)throw new Error("No active transaction to rollback.");1===a?await run(r,"ROLLBACK TRANSACTION"):await run(r,"ROLLBACK TRANSACTION TO s"+(a-1)),setTransactionDepth(r,a-1)}async function connectAndInitializeDb(n,t){return new Promise(async(r,a)=>{try{var e=new Database(n,{readonly:!1});if(e.pragma("journal_mode = WAL"),setTransactionDepth(e,0),setDbPath(e,n),t)try{await exec(e,await fs.readFile(t,"utf8"))}catch(r){return e.close(),console.error(`Failed to apply schema to ${n}: `+r.message),a(new Error(`Failed to apply schema to ${n}: `+r.message))}r(e)}catch(r){console.error(`Failed to open database at ${n}: `+r.message),a(new Error(`Failed to open database at ${n}: `+r.message))}})}function inTransaction(r){return 0<getTransactionDepth(r)}module.exports={run:run,get:get,all:all,exec:exec,inTransaction:inTransaction,beginTransaction:beginTransaction,commitTransaction:commitTransaction,rollbackTransaction:rollbackTransaction,connectAndInitializeDb:connectAndInitializeDb};
