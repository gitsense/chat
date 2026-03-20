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

let chatApi=require("../../../Dependencies").chatApi,renderRepos=require("./renderRepos").renderRepos,renderBranches=require("./renderBranches").renderBranches,renderTree=require("./renderTree").renderTree;async function handleGitNavigation(r,e,t,n){if(!(r&&e&&t&&t.widget))return console.error("handleGitNavigation: Missing required parameters (message, contentBody, context.widget)."),!1;if(!["git-repos","git-repo-owner","git-repo","git-ref","git-tree"].includes(r.type))return!1;let i="profile:git-nav";try{switch(r.type){case"git-repos":break;case"git-repo-owner":var a=r.meta?.owner||t.chat?.meta?.owner;a?i+=" git-owner:"+a:console.warn("handleGitNavigation: Could not determine owner name for 'git-repo-owner' message.");break;case"git-repo":var o=r.meta?.owner||t.chat?.meta?.owner,s=r.meta?.name||t.chat?.meta?.name;o&&s?i+=` git-repository:${o}/${s} git-branch:*`:console.warn("handleGitNavigation: Could not determine full repository name for 'git-repo' message.");break;case"git-ref":case"git-tree":var g=t.chat.lineage,p=g.find(e=>"git-repo-owner"===e.type),d=g.find(e=>"git-repo"===e.type),c="git-ref"===r.type?t.chat:g.find(e=>"git-ref"===e.type);p&&d&&c&&(i+=` git-repository:${p.name}/`+d.name+" git-branch:"+c.name+" git-ls-tree-id:"+t.chat.id);break;default:return console.warn(`handleGitNavigation: Unexpected message type '${r.type}'.`),!1}var l=await chatApi.search(t.widget,i);return l&&l.results?"git-repos"===r.type||"git-repo-owner"===r.type?renderRepos(r,e,l,t):"git-repo"===r.type?renderBranches(r,e,l,t):"git-ref"!==r.type&&"git-tree"!==r.type||renderTree(r,e,l,t):"profile:git-nav"===i?renderRepos(r,e,l||{results:[]},t):console.warn("handleGitNavigation: No results returned for query: "+i),!0}catch(e){return console.error(`handleGitNavigation: Error occurred while processing message type '${r.type}' with query '${i}':`,e),!0}}module.exports={handleGitNavigation:handleGitNavigation};
