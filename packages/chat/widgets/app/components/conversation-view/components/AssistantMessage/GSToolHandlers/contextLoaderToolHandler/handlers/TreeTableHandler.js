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

let{ChatUtils,MessageUtils}=require("@gitsense/gsc-utils"),saveOptions=require("../utils/StorageUtils").saveOptions,getTokens=require("../utils/Tokens.js").getTokens;function registerTreeTableHandler(e){let{context:m,components:b,contentType:t,contentOption:l,storageId:v,updateStates:h}=e,k=null,O=null,U=t,I=l;return(e,t)=>{e?k=e:e=k,t?O=t:t=O;var l,{input:s,analyzed:n=null,content:i=null,"total-items":r=null,"total-tokens":a=null}=b.filter?b.filter.api.getInputValues():{};if(I=i?([i,l]=i.split("::"),U=i,l):(U=t?.selectedType||U,t?.selectedOption||I),v&&saveOptions(v,{contentType:U,contentOption:I}),!e)return[];let o=e,p=("files"===s?o=o.filter(e=>"git-blob"===e.type):"trees"===s&&(o=o.filter(e=>"git-tree"===e.type||"git-ref"===e.type)),"file content"===U&&(o=o.filter(e=>"git-blob"===e.type)),null);try{var u=m.chat,g=ChatUtils.getChatMessages(u,u.main_model).find(e=>"assistant"===e.role),f=MessageUtils.parseAnalyzeMessage(g.message);p=f.id}catch(e){}if(p&&"any"!==n){let l="no"===n,s=!l;o=o.filter(e=>{var t=(e.meta?.tokens||{}).analysis||{};if(s&&t[p]||l&&null==t[p])return e})}if(r&&"unlimited"!==r&&(i=parseInt(r.split("-")[1]),o=o.slice(0,i)),a&&"unlimited"!==a){var c=parseInt(a.split("-").pop()),d=[];let t=0;for(let e=0;e<o.length;e++){var y=o[e],T=getTokens(y,U,I);if(t+T>c)break;d.push(y),t+=T}o=d}return h&&"function"==typeof h&&h(o,e),{filteredNodes:o,selectedNodes:e}}}module.exports={registerTreeTableHandler:registerTreeTableHandler};
