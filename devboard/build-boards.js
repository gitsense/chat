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

let{resolve,dirname}=require("path"),{readdirSync,readFileSync,existsSync,statSync,writeFileSync}=require("fs"),widgets=require("./widgets").widgets,packagesDir=resolve(__dirname,"../packages"),boardsFile=resolve(__dirname,"./boards.js"),boards={},defaultConfig={menu:{boards:[]}};readdirSync(packagesDir).forEach(e=>{let s=resolve(packagesDir+"/"+e);e=resolve(s+"/package-config.json");if(existsSync(e)){let n=JSON.parse(readFileSync(e,"utf8"));var a=n.name;if(void 0===a)throw`ERROR: ${e} does not have a name property`;if(!a.match(/^[a-z0-9_-]+$/))throw`ERROR: Invalid package name in ${e}. Only alphanumeric, dash and underscore characters allowed`;readdirSync(s+"/boards").forEach(e=>{var a=resolve(s+"/boards/"+e);if(e.match(/.json$/)){console.log("Processing board config "+a);var e=JSON.parse(readFileSync(a,"utf8")),{name:o,displayName:r,blocks:i}=e;if(void 0===o)console.log(`ERROR: ${a} does not have a name attribute. Skipping board file.`);else{if(!o.match(/^[a-z0-9_-]+$/))throw`ERROR: Invalid board name in ${a}. Only alphanumeric, dash and underscore characters allowed`;if(i)if(Array.isArray(i)){r||(console.log(`ERROR: ${a} does not have displayName attribute. Using name as displayName instead.`),e.displayName=o);i=n.name+"."+e.name;if(boards[i])throw`ERROR: Board with the full name ${i} already exists`;e.package=n.name,boards[i]=e,defaultConfig.menu.boards.push({boardFullName:i})}else console.log(`ERROR: blocks attribute in ${a} is not an array. Skipping board file.`);else console.log(`ERROR: ${a} does not have a blocks attribute. Skipping board file.`)}}})}else console.log(`WARNING: ${e} does not exists.  Unable to add boards in `+s)}),write("// Execute 'npm run build:boards' to update this file\n",!1),write("const boards = {};\n\n",!0);for(let a in boards){let o=boards[a],e=o.blocks;e.forEach(e=>{var a=e.widget;if(!a)throw`ERROR: No widget property for board block
`+JSON.stringify(e,null,2);if(!widgets[a])throw`ERROR: No widget named "${a}" found in the board "${o.package+"."+o.name}"`}),write(`boards["${a}"] = ${JSON.stringify(o,null,2)};

`,!0)}let boardConfigFiles=[resolve(__dirname,"../boards.json"),resolve(__dirname,"../boards.default.json")],config=null;function write(e,a){writeFileSync(boardsFile,e,a?{flag:"a"}:null)}boardConfigFiles.forEach(e=>{if(null===config&&existsSync(e)){var a=((config=JSON.parse(readFileSync(e,"utf8"))).menu||{}).boards;if(!boards)throw`ERROR: No menu boards defined in ${e}!`;a.forEach(e=>{var a=e.fullName;if(!a)throw"ERROR: No fullName property for board "+JSON.stringify(e);if(!boards[a])throw`ERROR: No board with the name ${a} found`})}}),write(`const config = ${JSON.stringify(config||defaultConfig,null,2)};
`,!0),write("module.exports = { config, boards };\n",!0);
