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

let ConfirmationBox=require("../../../ui/confirmation-box").ConfirmationBox;class ChatNavigationPrompt{constructor(t,o){this.chat=t,this.onConfirm=o,this.confirmationBox=null}show(){if(this.chat){var o=document.createElement("div");o.innerHTML=`
            <p>You are about to navigate to the chat "<strong>${this.chat.name||"Untitled Chat"}</strong>".</p>
            <p>This will take you away from the Chats Browser and open the selected chat.</p>
            <p>Do you want to continue?</p>
        `,this.confirmationBox=new ConfirmationBox,this.confirmationBox.show({title:"Navigate to Chat",message:o,confirmButtonText:"Go to Chat",cancelButtonText:"Cancel"},()=>{this.onConfirm&&this.onConfirm(this.chat),this.destroy()});let t=this.confirmationBox.hide.bind(this.confirmationBox);this.confirmationBox.hide=()=>{t(),this.destroy()}}else console.error("ChatNavigationPrompt requires a chat object")}destroy(){this.confirmationBox&&(this.confirmationBox=null)}}module.exports={ChatNavigationPrompt:ChatNavigationPrompt};
