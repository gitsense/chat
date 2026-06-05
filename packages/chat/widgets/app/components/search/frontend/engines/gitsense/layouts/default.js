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

let searchTargetOptions=require("../config/searchTargetOptions");module.exports=[{type:"row",style:{justifyContent:"center"},elements:[{type:"select",name:"engineSelect",label:null,options:[{value:"gitsense",label:"Ask & Search"}],defaultValue:"gitsense",style:{fontSize:"1.4em",fontWeight:"500"}}]},{type:"row",style:{justifyContent:"space-between",marginTop:"20px"},elements:[[{name:"aiEnabledCheckbox",label:"Ask:",type:"checkbox",defaultValue:function(e){e=e.aiEnabled;return null==e||e},labelPosition:"left",style:{marginRight:"20px"}},{type:"select",name:"aiAssistantSelect",label:"AI Assistant:",options:function(e){e=e.models||[];let t=[];return e.forEach(e=>{e=e.name;e.startsWith("---")||t.push({value:e,label:e})}),t},defaultValue:function(e){return e.mainModel},style:{marginRight:"15px",display:function(e){e=e.aiEnabled;return e?null:"none"}}},{type:"select",name:"scopeSelect",label:"Scope:",options:[{value:"current-chat",label:"Current Chat"},{value:"current-chat-and-branches",label:"Chats ↓"},{value:"connected-chats",label:"Chats ↕"},{value:"all-chats",label:"All chats"}],defaultValue:"all-chats",style:{marginRight:"20px",display:"none"}},{type:"select",name:"searchTargetProfileSelect",label:"Search In:",options:function(){return searchTargetOptions||[]},defaultValue:"git-blobs",style:{display:function(e){e=e.aiEnabled;return null==e||e?"none":null}}}],[{type:"link",name:"showSearchHelpLink",label:"Show Help",style:{marginLeft:"auto",fontSize:"0.9em",color:"#007bff",cursor:"pointer"}}]]},{type:"row",style:{justifyContent:"center",marginTop:"7px"},elements:[{type:"textarea",name:"queryInput",placeholder:"Enable 'Ask' to activate AI-assisted search for imported Git repositories and analyzers, or turn off for direct text search.",style:{flexGrow:1,width:"100%",padding:"8px",minHeight:"50px",fontSize:"14px"},controls:[]}]},{type:"row",elements:[{type:"text",name:"queryHintMessage",text:"",style:{display:"none",fontSize:"0.8em",color:"#666",marginTop:"5px"}}]},{type:"row",style:{justifyContent:"center",marginTop:"5px",marginBottom:"15px"},elements:[{type:"text",name:"alphaWarningMessage",text:"Ask & Search is currently in Alpha. This feature searches within GitSense Chat for analyzers, repositories, code, and messages. AI responses can vary significantly based on the selected model's capabilities.",style:{color:"#666",fontSize:"0.85em",marginTop:"5px"}}]},,{type:"row",style:{justifyContent:"center",marginTop:"5px"},elements:[{type:"text",name:"inFilterWarning",text:"",style:{color:"orange",fontSize:"0.8em",display:"none"}}]}];
