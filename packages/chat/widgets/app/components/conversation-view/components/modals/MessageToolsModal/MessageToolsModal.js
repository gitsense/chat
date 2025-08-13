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

let h=require("../../../Dependencies").h,MessageSelectionList=require("./components/MessageSelectionList"),MessagePreview=require("./components/MessagePreview"),FormatSelector=require("./components/FormatSelector"),NotificationArea=require("./components/NotificationArea"),ModalLayout=require("./layouts/ModalLayout"),TwoPanelLayout=require("./layouts/TwoPanelLayout"),MenuBarLayout=require("./layouts/MenuBarLayout"),ActionRegistry=require("./actions/ActionRegistry"),CopyAction=require("./actions/CopyAction"),StateProvider=require("./state/StateProvider"),MessageFormatter=require("./utils/MessageFormatter");function MessageToolsModal(e={}){let{messages:a=[],onClose:l=()=>{}}=e,s=null,i=null,u=null,c=null,g=null,m=null,d=null,y=null,M=null;function p(e){y.setSelectedMessages(e),m&&m.setMessages(e)}function S(e){y.setSelectedFormat(e),m&&m.setFormat(e)}return{render:function(e){y=new StateProvider({formatter:MessageFormatter}),o=y,(M=new ActionRegistry).register(CopyAction.create(o)),M,s=new ModalLayout({title:"Messages Tool",onClose:l}),i=new TwoPanelLayout,u=new MenuBarLayout,c=new NotificationArea;let t=s.render(e);var o=c.render(t.notificationArea);y.state.notificationManager=o,u.render(t.menuBar,M);var o=e=i.render(t.body),e=y,{leftPanel:o,formatSelectorContainer:n,previewContainer:r}=o;g=MessageSelectionList({messages:a,initialSelection:{system:!0,user:!0,assistant:!0},onChange:p}),d=FormatSelector({initialFormat:e.getSelectedFormat(),onChange:S}),m=MessagePreview({messages:a,format:e.getSelectedFormat(),onCopy:function(){var e=M.getAction("copy");e&&e.execute()}}),g.render(o),d.render(n),m.render(r),p(g.getSelectedMessages()),setTimeout(()=>{t.modal&&(t.modal.style.opacity="1")},25)},cleanup:function(){s&&(s.cleanup(),s=null),i&&(i.cleanup(),i=null),u&&(u.cleanup(),u=null),c&&(c.cleanup(),c=null),g=null,m=null,d=null,y=null,M=null}}}module.exports=MessageToolsModal;
