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

require("dotenv").config({path:"./data/.env"});let path=require("path"),express=require("express"),cors=require("cors"),os=require("os"),{readdir,readFile,stat,writeFile}=require("fs/promises"),{config:boardConfig,boards}=require("./devboard/boards.js"),widgets=require("./lib/widgets.js").widgets,apiVersion="v0",localBinDirs=[path.join(__dirname,"node_modules",".bin"),path.join(__dirname,"bin")],DEFAULT_SERVER_PORT=(process.env.PATH=localBinDirs.join(path.delimiter)+path.delimiter+process.env.PATH,3357);async function main(){try{for(var e in widgets){var[r,s]=e.split("."),i=widgets[e];i.staticURL=`/api/${apiVersion}/widgets/${r}/${s}/static/{file}`,i.init&&(console.log("Initializing widget "+e),await i.init(i),console.log("Finished initializing widget "+e))}await 0}catch(e){throw new Error(`Initialize widgets failed:
`+e)}var a=express(),a=(a.use(cors()),a.use(express.json({limit:"50mb"})),a.use("/--/",express.static("public")),a.use("/--/css",express.static("css")),a.use("/--/js",express.static("js")),a.use("/--/images",express.static("images")),a.get("/--/manifests/:owner/:repo/:filename?",async(e,r)=>{var{owner:e,repo:s,filename:i}=e.params,a=process.env.GSC_HOME;if(!a)return r.status(500).send("Server configuration error: GSC_HOME not set");var t,a=path.join(a,"data","storage","manifests",e,s);try{if(i){var n=i.endsWith(".json")?i:i+".json",o=path.join(a,n);try{var d,u=await readFile(o,"utf8"),l=JSON.parse(u);if(l.manifest_uuid)return d=path.join(a,l.manifest_uuid+".json"),r.sendFile(d)}catch(e){}return r.sendFile(o)}return(t=(await readdir(a)).find(e=>e.endsWith(".json")))?r.sendFile(path.join(a,t)):r.status(404).send("No manifest found in this directory")}catch(e){return console.error("Manifest resolution error:",e),r.status(404).send("Manifest not found")}}),a.use("/api/",require("./routes/api/routes.js")),a.get("/*",(e,r)=>renderBoard(e,r)),a.listen(process.env.DEVBOARD_PORT||DEFAULT_SERVER_PORT));console.log("Server up and running on port "+a.address().port)}async function renderBoard(e,r,s){var e=(e.query||{}).board,{header:i={show:!0},menu:a={},quickLinks:t={}}=boardConfig||{},e=e?boards[e]:null,n=getDefaultBoard(a.boards),a={menuBoards:a.boards?getBoards(a.boards):[],quickLinks:t.boards?getBoards(t.boards):[],header:i},t=(await readFile("./views/index.html","utf8")).replace(/\s*=\s*{{board}}/," = "+JSON.stringify(e||n)).replace(/\s*=\s*{{header}}/," = "+JSON.stringify(a));r.send(t)}function getDefaultBoard(r){for(let e=0;e<r.length;e++){var{default:s,fullName:i}=r[e];if(s)return boards[i]}return boards[r[0].fullName]}function getBoards(e){let t=[];return e.forEach(e=>{var{default:e,fullName:r,text:s,href:i}=e,a=""===r?{text:s,href:i}:boards[r];(a||r||s||i)&&(a.fullName=r,e&&(a.default=!0,defaultBoard=r),t.push(structuredClone(a)))}),t}main();
