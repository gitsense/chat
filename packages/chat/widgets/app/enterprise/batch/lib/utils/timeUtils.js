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

let dayjs=require("dayjs"),relativeTime=require("dayjs/plugin/relativeTime");function formatRelativeTime(e){var i=dayjs(),e=dayjs(e),a=i.diff(e,"second"),r=i.diff(e,"minute"),i=i.diff(e,"hour");return a<60?a+` second${1===a?"":"s"} ago`:r<60?r+` minute${1===r?"":"s"} ago`:i<48?i+` hour${1===i?"":"s"} ago`:e.fromNow()}dayjs.extend(relativeTime),module.exports={formatRelativeTime:formatRelativeTime};
