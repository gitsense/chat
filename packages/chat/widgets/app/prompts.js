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

let crypto=require("crypto"),{allAsync,runAsync}=require("../app/sqlite.js");function Prompts(){this.computeHash=function(t,r,e){return crypto.createHash("sha256").update(JSON.stringify(t+":"+r+":"+e)).digest("hex")},this.insert=async function(t,r,e,a,n,o,p){if(!e||"string"!=typeof e)throw new Error("No type defined or type is invalid. Type of type is "+typeof e);var s=`
            INSERT INTO prompts(
                ${null==r?"":"id,"}
                type,
                hash,
                name,
                prompt,
                meta,
                created_at,
                updated_at
            ) VALUES(
                ${null==r?"":"?,"}
                ?, -- type 
                ?, -- hash
                ?, -- name
                ?, -- prompt
                ?, -- meta
                DATETIME('now'),
                DATETIME('now')
            ) RETURNING id
        `;let i=null;try{var l=[e,a,n,o,p||null],c=(null!=r&&l.unshift(r),await runAsync(t,s,l));i=c.lastInsertRowid}catch(t){throw new Error(`ERROR: Failed to insert prompt:
${s}
`+t)}e="SELECT * FROM prompts WHERE id="+i;let E=null;try{E=await allAsync(t,e)}catch(t){throw new Error(`ERROR: Failed to retrieve prompt:
${e}
`+t)}return E[0]},this.map=async function(t){var r=`
            SELECT 
                id,
                type,
                name,
                hash
            FROM 
                prompts
        `;let e=null;try{e=await allAsync(t,r)}catch(t){throw new Error(`Unable to map prompts: ${r}
`+t.message)}let a={};return e.forEach(t=>{var r=t.hash;a[r]=t}),a},this.updateName=async function(t,r,e){var a=`
            UPDATE
                prompts
            SET
                name = ?,
                updated_at = DATETIME('now')
            WHERE
                id = ?
        `;try{await runAsync(t,a,[e,r])}catch(t){throw new Error(`ERROR: Failed to insert prompt:
${a}
`+t)}}}module.exports={Prompts:Prompts};
