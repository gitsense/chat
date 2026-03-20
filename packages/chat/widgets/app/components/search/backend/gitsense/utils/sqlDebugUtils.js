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

let format=require("sql-formatter").format,fs=require("fs"),path=require("path"),DEBUG_LOG_QUERY=["1","true","on"].includes(process.env.GSC_DEBUG_LOG_QUERY?.toLowerCase()||!1),DEBUG_OUTPUT_DIR=process.env.GSC_DEBUG_LOG_QUERY_DIR||"/tmp/gsc-debug-sql";function wrapQueryWithTiming(e){return`
    -- Create temporary table for timing
    CREATE TEMP TABLE IF NOT EXISTS query_timing (
        step TEXT,
        start_time DATETIME,
        end_time DATETIME
    );

    -- Wrap each CTE with timing information
    ${e.replace(/with\s+([^(]*)\s+as\s+\((.*?)\)/gis,(e,t,r)=>`
    -- Time the start of ${t}
    INSERT INTO query_timing VALUES ('${t}', datetime('now'), NULL);

    with ${t} as (${r})

    -- Time the end of ${t}
    UPDATE query_timing 
    SET end_time = datetime('now') 
    WHERE step = '${t}' AND end_time IS NULL;
    `)}

    -- Final query to show timing information
    SELECT * FROM query_timing ORDER BY start_time;`}function logSqlQuery(e,t,r=!1,i=!1){if(t=t||query,DEBUG_LOG_QUERY){if(!fs.existsSync(DEBUG_OUTPUT_DIR))try{fs.mkdirSync(DEBUG_OUTPUT_DIR,{recursive:!0})}catch(e){return void console.error(`Gemini 2.5 Flash Thinking: Failed to create SQL debug directory ${DEBUG_OUTPUT_DIR}:`,e)}t=`sql_debug_${(new Date).toISOString().replace(/[:.-]/g,"_")}_${t.replace(/[^a-zA-Z0-9_-]/g,"")}.sql`,t=path.join(DEBUG_OUTPUT_DIR,t);try{var o=r?format(e,{tabWidth:4}):e,o=i?wrapQueryWithTiming(o):o;fs.writeFileSync(t,o,"utf8"),console.log("SQL query logged to: "+t)}catch(e){console.error(`Failed to log SQL query to ${t}:`,e)}}}module.exports={logSqlQuery:logSqlQuery,wrapQueryWithTiming:wrapQueryWithTiming};
