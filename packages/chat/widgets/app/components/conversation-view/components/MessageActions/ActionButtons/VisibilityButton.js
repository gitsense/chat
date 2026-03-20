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

let SVGUtils=require("@gitsense/gsc-utils").SVGUtils;function render(e,i,t,r){var n="human-public"===(i.visibility||"public"),l=n?SVGUtils.eyeClosed():SVGUtils.eye({style:{cursor:"pointer",marginLeft:"8px"}});n&&(l.style.cursor="pointer",l.style.marginLeft="8px"),e.appendChild(l),l.onclick=()=>{"function"==typeof r?r(i):console.error("onClickVisibility is not a function")}}module.exports={render:render};
