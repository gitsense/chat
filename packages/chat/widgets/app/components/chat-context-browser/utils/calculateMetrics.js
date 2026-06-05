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

let{LLMUtils,MessageUtils}=require("@gitsense/gsc-utils");function _calculateContentStats(e){var t;return e?(t=e.split("\n").length,{tokens:LLMUtils.estimateTokens(e),lines:t}):{tokens:0,lines:0}}function calculateMetrics(e,t,s){let a=0,l=0,o=0,c=0;s=s.length;return e.forEach(e=>{var e=e.contextFile,t=e.content||"",e=e.tokens||_calculateContentStats(t).tokens,t=t.split("\n").length;a+=e,l+=t}),t.forEach(e=>{var t,s=e.codeBlock,e=e.message,n=s.content||"";"gs-tool"!==s.type&&({tokens:s,lines:n}=_calculateContentStats(n),t=MessageUtils.isContextMessage(e.message),"user"===e.role?(a+=s,l+=n):"assistant"!==e.role||t||(o+=s,c+=n))}),{totalMessages:s,curatedTokens:a,curatedLines:l,generatedTokens:o,generatedLines:c}}module.exports={calculateMetrics:calculateMetrics};
