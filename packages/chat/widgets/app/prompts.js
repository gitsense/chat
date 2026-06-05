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

let crypto=require("crypto"),{allAsync,runAsync}=require("../app/sqlite.js");function Prompts(){this.computeHash=function(t,e,r){return crypto.createHash("sha256").update(JSON.stringify(t+":"+e+":"+r)).digest("hex")},this.insert=async function(t,e,r,a,n,o,p){if(!r||"string"!=typeof r)throw new Error("No type defined or type is invalid. Type of type is "+typeof r);var s=`
            INSERT INTO prompts(
                ${null==e?"":"id,"}
                type,
                deleted,
                hash,
                name,
                prompt,
                meta,
                created_at,
                updated_at
            ) VALUES(
                ${null==e?"":"?,"}
                ?, -- type 
                0, -- deleted
                ?, -- hash
                ?, -- name
                ?, -- prompt
                ?, -- meta
                DATETIME('now'),
                DATETIME('now')
            ) RETURNING id
        `;let i=null;try{var l=[r,a,n,o,p||null],c=(null!=e&&l.unshift(e),await runAsync(t,s,l));console.log("Created new prompt: "+c.lastInsertRowid),i=c.lastInsertRowid}catch(t){throw new Error(`ERROR: Failed to insert prompt:
${s}
`+t)}r="SELECT * FROM prompts WHERE id="+i;let E=null;try{E=await allAsync(t,r)}catch(t){throw new Error(`ERROR: Failed to retrieve prompt:
${r}
`+t)}return E[0]},this.map=async function(t){var e=`
            SELECT 
                id,
                type,
                name,
                hash
            FROM 
                prompts
            WHERE
                deleted = 0
        `;let r=null;try{r=await allAsync(t,e)}catch(t){throw new Error(`Unable to map prompts: ${e}
`+t.message)}let a={};return r.forEach(t=>{var e=t.hash;a[e]=t}),a},this.updateName=async function(t,e,r){var a=`
            UPDATE
                prompts
            SET
                name = ?,
                updated_at = DATETIME('now')
            WHERE
                id = ?
        `;try{await runAsync(t,a,[r,e])}catch(t){throw new Error(`ERROR: Failed to insert prompt:
${a}
`+t)}}}module.exports={Prompts:Prompts};
