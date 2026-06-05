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

class WildcardMatcher{static match(t,e){if(!t||!e)return!1;try{return this._patternToRegex(e).test(t)}catch(t){return console.error("Error matching pattern:",t),!1}}static _patternToRegex(t){let e=t.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\\\*/g,".*").replace(/\\\?/g,".").replace(/\\\*\*\\\*/g,".*");return e="^"+(e=e.replace(/\\\//g,"[/\\\\]"))+"$",new RegExp(e,"i")}static filter(t,e){return Array.isArray(t)&&e?t.filter(t=>this.match(t,e)):[]}static isValidPattern(t){if(!t||"string"!=typeof t)return!1;try{return this._patternToRegex(t),!0}catch(t){return!1}}static getPatternExamples(){return{fileExtensions:{pattern:"*.md",description:"Matches all markdown files",examples:["README.md","doc.md","guide.md"]},directoryFiles:{pattern:"src/*",description:"Matches files directly in src directory",examples:["src/app.js","src/utils.js"],nonExamples:["src/components/button.js","test/app.js"]},recursiveDirectory:{pattern:"src/**/*.js",description:"Matches all JavaScript files in src and subdirectories",examples:["src/app.js","src/components/button.js","src/utils/helper.js"]},partialMatch:{pattern:"*config*",description:'Matches files with "config" anywhere in the name',examples:["webpack.config.js","config.json","myconfig.js"]},testFiles:{pattern:"*.test.*",description:"Matches test files with any extension",examples:["app.test.js","utils.test.ts","component.test.jsx"]}}}}module.exports=WildcardMatcher;
