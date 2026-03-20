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

let n={short:(t,e)=>{var l=[{value:1,symbol:""},{value:1e3,symbol:"k"},{value:1e6,symbol:"M"},{value:1e9,symbol:"G"},{value:1e12,symbol:"T"},{value:1e15,symbol:"P"},{value:1e18,symbol:"E"}].slice().reverse().find(function(e){return t>=e.value});return l?(t/l.value).toFixed(e).replace(/\.0+$|(\.[0-9]*[1-9])0+$/,"$1")+l.symbol:"0"},toWords:e=>{let l=["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"],n=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];var t=["","Thousand","Million","Billion"];if(0===e)return l[0];let o="";let r=0;for(;0<e;)e%1e3!=0&&(o=function e(t){return 0===t?"":t<20?l[t]+" ":t<100?n[Math.floor(t/10)]+" "+e(t%10):l[Math.floor(t/100)]+" Hundred "+e(t%100)}(e%1e3)+t[r]+" "+o),e=Math.floor(e/1e3),r++;return o.trim()}};module.exports=n;
