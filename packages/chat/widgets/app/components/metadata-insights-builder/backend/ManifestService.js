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

let fs=require("fs"),path=require("path"),os=require("os"),exec=require("child_process").exec,promisify=require("util").promisify,execAsync=promisify(exec);class ManifestService{static async publishManifest(e,r){var{owner:r,repo:s,branch:t,authCode:a}=r;let i=null;try{var n=`gsc app auth validate ${a} --permission manifest:publish --format json`,o=await this._executeCommand(n);if(!o||!o.valid)return{success:!1,status:o?.status||"unknown",error:o?.error||"Authentication failed"};var c=os.tmpdir(),u=`gsc-manifest-publish-${Date.now()}.json`,l=(i=path.join(c,u),fs.writeFileSync(i,JSON.stringify(e,null,2),"utf8"),`gsc manifest publish "${i}" --owner ${r} --repo ${s} --branch ${t} --format json`),f=await this._executeCommand(l);if(!f||"success"!==f.status)return{success:!1,status:f?.status||"unknown",error:f?.error||"Failed to publish manifest"};try{await execAsync(`gsc app auth delete ${a} --format json`)}catch(e){console.warn(`Failed to delete auth code ${a}: `+e.message)}return{success:!0,repoUUID:f.repoUUID,manifestUUID:f.manifestUUID}}catch(e){throw e}finally{if(i&&fs.existsSync(i))try{fs.unlinkSync(i)}catch(e){console.warn("Failed to cleanup temp manifest file:",e.message)}}}static async _executeCommand(e){try{var{stdout:r,stderr:s}=await execAsync(e),t=r||s;if(t)return JSON.parse(t);throw new Error("Command produced no output")}catch(r){if("ENOENT"===r.code)throw new Error("The gsc CLI tool was not found. Please ensure it is installed and in your PATH.");if(r instanceof SyntaxError)throw new Error("Failed to parse CLI response: "+r.message);if(r.stderr)try{return JSON.parse(r.stderr)}catch(e){throw new Error("CLI execution failed: "+r.stderr)}throw r}}}module.exports=ManifestService;
