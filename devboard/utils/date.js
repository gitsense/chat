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

let dayjs=require("dayjs"),relativeTime=require("dayjs/plugin/relativeTime"),utc=require("dayjs/plugin/utc"),d=(dayjs.extend(relativeTime),dayjs.extend(utc),{shortAge:(t,a=0)=>{a=dayjs().utc().add(a,"hours").to(t);return a.match(/^a few seconds/)?"3s":a.match(/^a minute ago/)?"1m":a.match(/^an hour/)?"1h":a.match(/a month/)?"1mo":a.match(/^a day/)?"1d":a.match(/a year/)?"1y":a.match(/^\d+ min/)?a.split(" ")[0]+"m":a.match(/^\d+ hour/)?a.split(" ")[0]+"h":a.match(/^\d+ d/)||a.match(/\d+ day/)?a.split(" ")[0]+"d":a.match(/\d+ month/)?a.split(" ")[0]+"mo":a.match(/\d+ year/)?a.split(" ")[0]+"y":a.match(/^in a few seconds/)?"i3s":a.match(/^in a minute/)?"i1m":a.match(/^in ^\d+ min/)?a.split(" ")[0]+"m":a.match(/^in \d+ min/)?"i"+a.split(" ")[1]+"m":a.match(/^in an hour/)?"i1h":a.match(/^in \d+ hour/)?"i"+a.split(" ")[1]+"h":a.match(/^in \d+ day/)?"i"+a.split(" ")[1]+"d":a.match(/^in \d+ month/)?a.split(" ")[0]+"mo":a.match(/^in \d+ year/)?a.split(" ")[0]+"y":a}});module.exports=d;
