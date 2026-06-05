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

let h=require("../utils/html.js"),DropDownMenu=require("./drop-down-menu.js");function Header(a,n,l){let t=null,o=null,p=null;this.render=e=>{e=e,t=h.createDiv({id:"devboard-header-menu",style:{display:"inline-block",width:"200px",whiteSpace:"nowrap"}}),o=h.createDiv({id:"devboard-header-quick-links",style:{display:"inline-block",width:"calc(100% - 400px)",textAlign:"center",verticalAlign:"middle"}}),p=h.createDiv({id:"devboard-header-quick-links",style:{display:"inline-block",width:"200px",textAlign:"right"}}),e.appendChild(t),e.appendChild(o),e.appendChild(p);{let e=((e,l)=>{let a=getFullname(l),n=!0,t=[];return e.forEach(e=>{getFullname(e)===a&&(n=!1),t.push(e)}),n&&t.unshift(l),t})(n,a),i=window.location.pathname,l=new URLSearchParams(window.location.search),d=(l.delete("board"),l.toString()),r=getFullname(a),o=[];e.forEach(e=>{var{displayName:l,default:a}=e,e=getFullname(e),n=e===r,t=new URLSearchParams(d),a=(a||t.append("board",e),t.toString());o.push({value:l,href:i+(""===a?"":"?"+a),selected:n})}),t.appendChild(new DropDownMenu(o,"",{btn:!0,alignment:"se",menuStyle:{width:"225px",lineHeight:1.3,paddingTop:"7px",paddingBottom:"7px",zIndex:1e5}}).create())}{let i=window.location.pathname,d=new URLSearchParams,r=getFullname(a);l.forEach(e=>{var{fullName:e,displayName:l,text:a,href:n}=e;let t=null;e&&(d.set("board",e),t=i+"?"+d.toString());e=e===r?"orange":"transparent",a=h.createLink({text:a||l,href:n||t,style:{color:"black",padding:"6px",borderBottom:"2px solid "+e,marginRight:"5px"}});o.appendChild(a)})}{let{origin:l,pathname:a,search:e}=window.location,n=new URLSearchParams(e),t=n.get("help"),i="show"===t,d=h.createDiv({style:{display:"inline-block",textAlign:"left"}}),r=(p.appendChild(d),[{value:"hide",selected:!i},{value:"show",selected:i}]),o=new DropDownMenu(r,"<strong>Help: </strong>",{menuStyle:{width:"100px"},callback:e=>{"show"===e?n.set("help",e):n.delete("help");e=n.toString(),e=l+("/"===a?"":a)+(e?"?"+e:"");window.location.assign(e)}}).create();d.appendChild(o)}}}function getFullname(e){return e.package+"."+e.name}module.exports=Header;
