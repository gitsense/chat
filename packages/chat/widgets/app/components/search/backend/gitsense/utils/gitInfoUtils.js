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

let fs=require("fs").promises,path=require("path");async function getAvailableGitReposAndBranches(e,r){try{let o=r.importData?.dropzone?.repoVisibilityDuration||0,n=60*o*1e3,i=(new Date).getTime();var t=await e("chats").select("id","type","parent_id","meta","updated_at").whereIn("type",["git-repo","git-ref"]).where("deleted",0);let s={};return t.filter(e=>"git-repo"===e.type).forEach(r=>{if(r.meta)try{var e=JSON.parse(r.meta);if("GSC-Dropzone"===e.owner&&o){var t=r.updated_at,a=new Date(t).getTime();i;if(i-a>n)return}e.owner&&e.name&&(e.owner,e.name,s[r.id]={owner:e.owner,name:e.name,branches:[]})}catch(e){console.error(`Error parsing meta for git-repo chat ID ${r.id}:`,e)}}),t.filter(e=>"git-ref"===e.type).forEach(r=>{if(r.meta&&r.parent_id&&s[r.parent_id])try{var e=JSON.parse(r.meta);"branch"===e.type&&e.name&&s[r.parent_id].branches.push(e.name)}catch(e){console.error(`Error parsing meta for git-ref chat ID ${r.id}:`,e)}}),Object.values(s).map(e=>({owner:e.owner,name:e.name,branches:[...new Set(e.branches)].sort()})).sort((e,r)=>(e.owner+"/"+e.name).localeCompare(r.owner+"/"+r.name))}catch(e){return console.error("Error retrieving available Git repos and branches:",e),[]}}async function getGitChatTypesFromSchema(){var e=path.join(__dirname,"../../../docs/schema.md");try{var r=await fs.readFile(e,"utf8"),t=/CREATE TABLE IF NOT EXISTS chats \([\s\S]*?type TEXT NOT NULL CHECK\(type IN \(([\s\S]*?)\)\)/,a=r.match(t);return a&&a[1]?a[1].replace(/\s*'/g,"").replace(/\s*\)/g,"").replace(/\s*\(/g,"").split(",").map(e=>e.trim()).filter(e=>e).filter(e=>e.startsWith("git-")):(console.warn("Could not extract chat types from schema.md."),[])}catch(e){return console.error("Error reading schema.md to get chat types:",e),[]}}function formatGitReposAndBranchesForPrompt(e){if(!e||0===e.length)return"No Git repositories with imported branches found.";let r="Available Git Repositories and Branches:\n";return e.forEach(e=>{r+=`- ${e.owner}/`+e.name,e.branches&&0<e.branches.length&&(r+=` (Branches: ${e.branches.join(", ")})`),r+="\n"}),r}function formatGitChatTypesForPrompt(e){return e&&0!==e.length?`Search is currently restricted to messages within chats of the following types: ${e.join(", ")}.`:"No specific Git chat types identified."}module.exports={getAvailableGitReposAndBranches:getAvailableGitReposAndBranches,getGitChatTypesFromSchema:getGitChatTypesFromSchema,formatGitReposAndBranchesForPrompt:formatGitReposAndBranchesForPrompt,formatGitChatTypesForPrompt:formatGitChatTypesForPrompt};
