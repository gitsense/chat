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

require("dotenv").config();let path=require("path"),express=require("express"),cors=require("cors"),{readdir,readFile,stat,writeFile}=require("fs/promises"),{config:boardConfig,boards}=require("./devboard/boards.js"),widgets=require("./lib/widgets.js").widgets,apiVersion="v0",DEFAULT_SERVER_PORT=3357;async function main(){try{for(var e in widgets){var[r,i]=e.split("."),s=widgets[e];s.staticURL=`/api/${apiVersion}/widgets/${r}/${i}/static/{file}`,s.init&&(console.log("Initializing widget "+e),await s.init(s),console.log("Finished initializing widget "+e))}await 0}catch(e){throw new Error(`Initialize widgets failed:
`+e)}var a=express(),a=(a.use(cors()),a.use(express.json({limit:"10mb"})),a.use("/--/",express.static("public")),a.use("/api/",require("./routes/api/routes.js")),a.get("/*",(e,r)=>renderBoard(e,r)),a.listen(process.env.DEVBOARD_PORT||DEFAULT_SERVER_PORT));console.log("Server up and running on port "+a.address().port)}async function renderBoard(e,r,i){var e=(e.query||{}).board,{header:s={show:!0},menu:a={},quickLinks:t={}}=boardConfig||{},e=e?boards[e]:null,o=getDefaultBoard(a.boards),a={menuBoards:a.boards?getBoards(a.boards):[],quickLinks:t.boards?getBoards(t.boards):[],header:s},t=(await readFile("./views/index.html","utf8")).replace(/\s*=\s*{{board}}/," = "+JSON.stringify(e||o)).replace(/\s*=\s*{{header}}/," = "+JSON.stringify(a));r.send(t)}function getDefaultBoard(r){for(let e=0;e<r.length;e++){var{default:i,fullName:s}=r[e];if(i)return boards[s]}return boards[r[0].fullName]}function getBoards(e){let t=[];return e.forEach(e=>{var{default:e,fullName:r,text:i,href:s}=e,a=""===r?{text:i,href:s}:boards[r];(a||r||i||s)&&(a.fullName=r,e&&(a.default=!0,defaultBoard=r),t.push(structuredClone(a)))}),t}main();
