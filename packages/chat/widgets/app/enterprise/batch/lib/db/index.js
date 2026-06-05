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

let path=require("path"),core=require("./core"),createBatchesApi=require("./batchesApi"),createChatsApi=require("./chatsApi"),BatchError=require("../errors").BatchError,BATCH_SCHEMA_SQL_PATH=path.join(__dirname,"batch.sql"),_batchesDbInstance=null,_chatsDbInstance=null,_batchesDbApi=null,_chatsDbApi=null;async function connect(a,c){if(_batchesDbApi&&_chatsDbApi)return{batches:_batchesDbApi,chats:_chatsDbApi};if(!a||!c)throw new BatchError("Missing database paths for connection. batchesDbPath and chatsDbPath are required.");try{_batchesDbInstance=await core.connectAndInitializeDb(a,BATCH_SCHEMA_SQL_PATH),console.log("Connected to batches database at "+a),_chatsDbInstance=await core.connectAndInitializeDb(c,null),console.log("Connected to chats database at "+c);var t={run:(a,c)=>core.run(_batchesDbInstance,a,c),get:(a,c)=>core.get(_batchesDbInstance,a,c),all:(a,c)=>core.all(_batchesDbInstance,a,c),beginTransaction:()=>core.beginTransaction(_batchesDbInstance),commitTransaction:()=>core.commitTransaction(_batchesDbInstance),rollbackTransaction:()=>core.rollbackTransaction(_batchesDbInstance),inTransaction:()=>core.inTransaction(_batchesDbInstance)},e={run:(a,c)=>core.run(_chatsDbInstance,a,c),get:(a,c)=>core.get(_chatsDbInstance,a,c),all:(a,c)=>core.all(_chatsDbInstance,a,c),beginTransaction:()=>core.beginTransaction(_chatsDbInstance),commitTransaction:()=>core.commitTransaction(_chatsDbInstance),rollbackTransaction:()=>core.rollbackTransaction(_chatsDbInstance),inTransaction:()=>core.inTransaction(_chatsDbInstance)};return _batchesDbApi=createBatchesApi(t),(_chatsDbApi=createChatsApi(e)).setDbPath(c),{batches:_batchesDbApi,chats:_chatsDbApi}}catch(a){if(_batchesDbInstance){try{_batchesDbInstance.close()}catch(a){console.error("Error closing batches database during cleanup: "+a.message)}_batchesDbInstance=null}if(_chatsDbInstance){try{_chatsDbInstance.close()}catch(a){console.error("Error closing chats database during cleanup: "+a.message)}_chatsDbInstance=null}throw new BatchError("Failed to connect or initialize databases: "+a.message)}}async function close(){var a=[];_batchesDbInstance&&a.push(new Promise((a,c)=>{try{_batchesDbInstance.close(),_batchesDbInstance=null,_batchesDbApi=null,a()}catch(a){c(new Error("Failed to close batches database: "+a.message))}})),_chatsDbInstance&&a.push(new Promise((a,c)=>{try{_chatsDbInstance.close(),_chatsDbInstance=null,_chatsDbApi=null,a()}catch(a){c(new Error("Failed to close chats database: "+a.message))}})),await Promise.all(a),console.log("All database connections closed.")}module.exports={connect:connect,close:close};
