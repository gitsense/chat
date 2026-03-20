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

let diff_match_patch=require("diff-match-patch");function generateDiff(e,t,f={}){var{cleanup:f=!0,byLine:a=!0}=f,n=new diff_match_patch;return a?generateLineDiff(e,t,f):(a=n.diff_main(e,t),f&&n.diff_cleanupSemantic(a),a)}function generateLineDiff(e,t,f=!0){var a,n,i=new diff_match_patch,e=e.split("\n"),t=t.split("\n"),c="\n",e=e.join(c),t=t.join(c),e=i.diff_main(e,t),r=(f&&i.diff_cleanupSemantic(e),[]);for([a,n]of e){var _,h=n.split(c);for(_ of h)""===_&&1<h.length||r.push([a,_])}return r}function getOperationName(e){switch(e){case diff_match_patch.DIFF_DELETE:return"delete";case diff_match_patch.DIFF_INSERT:return"insert";case diff_match_patch.DIFF_EQUAL:return"equal";default:return"unknown"}}module.exports={generateDiff:generateDiff,generateLineDiff:generateLineDiff,getOperationName:getOperationName,DIFF_DELETE:diff_match_patch.DIFF_DELETE,DIFF_INSERT:diff_match_patch.DIFF_INSERT,DIFF_EQUAL:diff_match_patch.DIFF_EQUAL};
