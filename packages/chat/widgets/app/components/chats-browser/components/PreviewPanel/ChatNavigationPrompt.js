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

let ConfirmationBox=require("../../../ui/confirmation-box").ConfirmationBox;class ChatNavigationPrompt{constructor(t,o){this.chat=t,this.onConfirm=o,this.confirmationBox=null}show(){if(this.chat){var o=document.createElement("div");o.innerHTML=`
            <p>You are about to navigate to the chat "<strong>${this.chat.name||"Untitled Chat"}</strong>".</p>
            <p>This will take you away from the Chats Browser and open the selected chat.</p>
            <p>Do you want to continue?</p>
        `,this.confirmationBox=new ConfirmationBox,this.confirmationBox.show({title:"Navigate to Chat",message:o,confirmButtonText:"Go to Chat",cancelButtonText:"Cancel"},()=>{this.onConfirm&&this.onConfirm(this.chat),this.destroy()});let t=this.confirmationBox.hide.bind(this.confirmationBox);this.confirmationBox.hide=()=>{t(),this.destroy()}}else console.error("ChatNavigationPrompt requires a chat object")}destroy(){this.confirmationBox&&(this.confirmationBox=null)}}module.exports={ChatNavigationPrompt:ChatNavigationPrompt};
