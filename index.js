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

require("dotenv").config();let path=require("path"),express=require("express"),cors=require("cors"),{readdir,readFile,stat,writeFile}=require("fs/promises"),{config:boardConfig,boards}=require("./devboard/boards.js"),widgets=require("./lib/widgets.js").widgets,apiVersion="v0",localBinDirs=[path.join(__dirname,"node_modules",".bin"),path.join(__dirname,"bin")],DEFAULT_SERVER_PORT=(process.env.PATH=localBinDirs.join(path.delimiter)+path.delimiter+process.env.PATH,3357);async function main(){try{for(var e in widgets){var[r,i]=e.split("."),a=widgets[e];a.staticURL=`/api/${apiVersion}/widgets/${r}/${i}/static/{file}`,a.init&&(console.log("Initializing widget "+e),await a.init(a),console.log("Finished initializing widget "+e))}await 0}catch(e){throw new Error(`Initialize widgets failed:
`+e)}var s=express(),s=(s.use(cors()),s.use(express.json({limit:"50mb"})),s.use("/--/",express.static("public")),s.use("/api/",require("./routes/api/routes.js")),s.get("/*",(e,r)=>renderBoard(e,r)),s.listen(process.env.DEVBOARD_PORT||DEFAULT_SERVER_PORT));console.log("Server up and running on port "+s.address().port)}async function renderBoard(e,r,i){var e=(e.query||{}).board,{header:a={show:!0},menu:s={},quickLinks:t={}}=boardConfig||{},e=e?boards[e]:null,o=getDefaultBoard(s.boards),s={menuBoards:s.boards?getBoards(s.boards):[],quickLinks:t.boards?getBoards(t.boards):[],header:a},t=(await readFile("./views/index.html","utf8")).replace(/\s*=\s*{{board}}/," = "+JSON.stringify(e||o)).replace(/\s*=\s*{{header}}/," = "+JSON.stringify(s));r.send(t)}function getDefaultBoard(r){for(let e=0;e<r.length;e++){var{default:i,fullName:a}=r[e];if(i)return boards[a]}return boards[r[0].fullName]}function getBoards(e){let t=[];return e.forEach(e=>{var{default:e,fullName:r,text:i,href:a}=e,s=""===r?{text:i,href:a}:boards[r];(s||r||i||a)&&(s.fullName=r,e&&(s.default=!0,defaultBoard=r),t.push(structuredClone(s)))}),t}main();
