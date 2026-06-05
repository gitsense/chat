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

let fs=require("fs").promises,path=require("path"),AnalyzerUtils=require("@gitsense/gsc-utils").AnalyzerUtils,analyzersBasePath=require("../../Dependencies").analyzersBasePath,promptsDir=path.join(__dirname,"../prompts/"),profilesDir=path.join(__dirname,"../profiles/");async function readPromptTemplate(r){var e=path.join(promptsDir,r);try{return await fs.readFile(e,"utf8")}catch(e){throw console.error(`Error reading prompt template "${r}":`,e),new Error(`Failed to read prompt template "${r}".`)}}async function extractProfileMetadata(e){var r=(await fs.readFile(e,"utf8")).replace(/\/\*\*[\s\S]*?\*\/\n*/g,"").replace(/\/\/[^\n]*/g,""),r=JSON.parse(r);return{name:r.name||path.basename(e,".json"),description:r.description||"No description available.",keywords:r.keywords&&Array.isArray(r.keywords)?r.keywords:[]}}async function loadAndFormatAllProfiles(){try{var a,e=(await fs.readdir(profilesDir)).filter(e=>e.endsWith(".json")&&"profile.schema.json"!==e);let r="";for(a of e){var t=path.join(profilesDir,a);try{var{name:o,description:i,keywords:n}=await extractProfileMetadata(t),s=0<n.length?n.join(", "):"None";r=(r=r+`- **Profile: \`${o}\`**
`+`  - Description: ${i}
`)+`  - Keywords: ${s}
`+"\n"}catch(e){console.error(`Error parsing profile file "${a}":`,e),r=(r+=`- **Profile: \`${path.basename(a,".json")}\`**
`)+`  - Error loading profile: ${e.message}
`+"\n"}}return r}catch(e){return console.error("Error listing profile files:",e),"Error loading search profile information."}}async function loadAndFormatAllAnalyzersForPrompt(){let e="\n\n";e+="The following is a comprehensive list of all currently available GitSense Chat Analyzers. These Analyzers are LLM-powered tools designed to extract specific, structured metadata from various content types. You can use this information to answer user questions about available analyzers and their capabilities, and to construct `profile:meta-search` or `profile:meta-insights` queries.\n\n";try{var r,a=await AnalyzerUtils.getAnalyzers(analyzersBasePath);if(0===a.length)return e+="No analyzers currently available.\n";for(r of a){var t,o,i,n,s,l=await AnalyzerUtils.getAnalyzerSchema(analyzersBasePath,r.id);if(e=(e=(e+="---\n\n")+`#### Analyzer ID: \`${r.id}\`
`)+`- **Description:** ${l.description||"No description available."}
`,r.version&&(e+=`- **Version:** ${r.version}
`),r.tags&&0<r.tags.length&&(e+=`- **Tags:** ${r.tags.join(", ")}
`),l&&l.properties&&0<Object.keys(l.properties).length)for(var p in e+="- **Extracted Metadata Fields (within `extracted_metadata` JSON object):**\n",l.properties)Object.hasOwnProperty.call(l.properties,p)&&(o=(t=l.properties[p]).type||"unknown",i=t.format?` (${t.format})`:"",n=t.items&&t.items.type?` of ${t.items.type}s`:"",s=t.description||"",e+=`    - \`${p}\`: \`${o}${n}\`${i} ${s?"- "+s:""}
`);else e+=`- **Extracted Metadata Fields:** None defined or could not be retrieved.
`;e+="\n"}return e}catch(e){return console.error("Error loading and formatting analyzers for prompt:",e),"Error loading analyzer information."}}module.exports={extractProfileMetadata:extractProfileMetadata,loadAndFormatAllProfiles:loadAndFormatAllProfiles,loadAndFormatAllAnalyzersForPrompt:loadAndFormatAllAnalyzersForPrompt,readPromptTemplate:readPromptTemplate};
