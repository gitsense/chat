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

let{dirname,resolve}=require("path"),{existsSync,readFileSync,mkdirSync}=require("fs"),zlib=require("zlib"),{connect,execAsync}=require("./sqlite.js"),DATA_DIR=resolve(process.env.GSC_HOME,"data"),DB_FILE=resolve(DATA_DIR,"chats.sqlite3");function filterIncompatibleStatements(e){return e.split(";").map(e=>e.trim()).filter(e=>{var t;return!(!e||((t=e.toUpperCase()).includes("INSERT INTO SQLITE_SCHEMA")||t.includes("INSERT INTO SQLITE_MASTER")||t.includes("CREATE TABLE SQLITE_SEQUENCE")||t.includes("INSERT INTO SQLITE_SEQUENCE")||t.includes("DELETE FROM SQLITE_SEQUENCE")||t.includes("PRAGMA WRITABLE_SCHEMA"))&&(console.log(`[FILTER] Removing incompatible statement: ${e.substring(0,80)}...`),1))}).join(";\n")}function getDBPath(){return DB_FILE}module.exports={getDBPath:getDBPath};
