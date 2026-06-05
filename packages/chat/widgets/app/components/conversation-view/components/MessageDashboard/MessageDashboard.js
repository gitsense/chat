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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,MessagePositionIndicator=require("./components/MessagePositionIndicator");function MessageDashboard(e={}){let t=DomUtils.h,{positionIndicatorOptions:o={}}=e,s=null,a=null;return{initialize:function(e){var i,n;return s=s||(i=t.createDiv({className:"gs-message-dashboard",style:{display:"flex",flexDirection:"column",gap:"8px"}}),n=(a=new MessagePositionIndicator(o)).initialize(),i.appendChild(n),i),e&&e.appendChild(s),s},updateDockingState:function(e){a&&a.updateDockingState(e)},refresh:function(){a&&a.refresh()},update:function(e={}){e.positionIndicatorOptions&&a&&a.update(e.positionIndicatorOptions)},cleanup:function(){a&&(a.cleanup(),a=null),s&&s.parentNode&&s.parentNode.removeChild(s)}}}module.exports=MessageDashboard;
