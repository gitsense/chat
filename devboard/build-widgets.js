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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let{resolve,basename,dirname}=require("path"),{readdirSync,readFileSync,statSync,existsSync,writeFileSync}=require("fs"),backendWidgetsFile=resolve(__dirname,"../lib/widgets.js"),frontendWidgetsFile=resolve(__dirname,"./widgets.js"),configs={},frontendWidgets={},backendWidgets={},configsJSON=(writeFrontend("// Generated file. Execute 'npm run build:widgets' to update this file\n",!1),writeFrontend("const widgets = {};\n"),writeBackend("// Generated file. Execute 'npm run build:widgets' to update this file\n",!1),writeBackend("const widgets = {};\n",!0),readdirSync(resolve(__dirname,"../packages")).forEach(e=>{var e=resolve(__dirname,"../packages/"+e),n=resolve(e+"/package-config.json");if(existsSync(n)){let d=JSON.parse(readFileSync(n,"utf8"));var i=d.name;if(void 0===i)throw`ERROR: ${n} does not have a name property`;if(!i.match(/^[a-z0-9_-]+$/))throw`ERROR: Invalid package name in ${n}. Only alphanumeric, dash and underscore characters allowed`;let o=resolve(e+"/widgets");existsSync(o)&&(configs[d.name]=d,readdirSync(""+o).forEach(e=>{var n=resolve(o+"/"+e),i=resolve(n+"/widget-config.json");let t=null;if(existsSync(i)){var a=JSON.parse(readFileSync(i,"utf8")),{name:s,help:r={}}=a;if(void 0===s)throw`ERROR: ${i} does not have a name property`;if(!s.match(/^[a-z0-9_-]+$/))throw`ERROR: Invalid widget name in ${i}. Only alphanumeric, dash and underscore characters allowed`;if(t=d.name+"."+a.name,configs[t])throw`ERROR: Widget with the full name ${t} already exists!`;configs[t]={package:d.name,name:a.name,help:r};s=resolve(n+"/frontend.js"),a=resolve(n+"/backend.js");existsSync(s)&&writeFrontend(`widgets["${t}"] = require("../packages/${d.name}/widgets/${e}/frontend.js")
`,!0),existsSync(a)&&writeBackend(`widgets["${t}"] = require("../packages/${d.name}/widgets/${e}/backend.js")
`,!0)}else console.log(`WARNING: ${i} does not exists. Unable to add widget in `+n)}))}else console.log(`WARNING: ${n} does not exists. Unable to add dashboards in `+e)}),JSON.stringify(configs,null,2));function writeBackend(e,n){writeFileSync(backendWidgetsFile,e,n?{flag:"a"}:null)}function writeFrontend(e,n){writeFileSync(frontendWidgetsFile,e,n?{flag:"a"}:null)}writeFrontend("\n",!0),writeFrontend(`const configs = ${configsJSON}

`,!0),writeFrontend("module.exports = { widgets, configs };\n",!0),writeBackend("\n",!0),writeBackend(`const configs = ${configsJSON}

`,!0),writeBackend("module.exports = { widgets, configs };\n",!0);
