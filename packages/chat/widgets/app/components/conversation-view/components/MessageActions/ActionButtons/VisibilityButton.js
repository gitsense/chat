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

let SVGUtils=require("@gitsense/gsc-utils").SVGUtils;function render(e,i,t,r){var n="human-public"===(i.visibility||"public"),l=n?SVGUtils.eyeClosed():SVGUtils.eye({style:{cursor:"pointer",marginLeft:"8px"}});n&&(l.style.cursor="pointer",l.style.marginLeft="8px"),e.appendChild(l),l.onclick=()=>{"function"==typeof r?r(i):console.error("onClickVisibility is not a function")}}module.exports={render:render};
