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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,baseStyles=require("./base").baseStyles,manualStyles=require("./manual").manualStyles,dropzoneStyles=require("./dropzone").dropzoneStyles,combinedStyles=`
    ${baseStyles}
    ${manualStyles}
    ${dropzoneStyles}
`;function injectStyles(){return document.getElementById("import-data-styles")?document.getElementById("import-data-styles"):DomUtils.h.injectStyles(combinedStyles,"import-data-styles")}module.exports={injectStyles:injectStyles,baseStyles:baseStyles,manualStyles:manualStyles,dropzoneStyles:dropzoneStyles};
