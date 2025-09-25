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

function createSelectionModal({onSaveSelections:e}){let i=document.createElement("div"),d=(i.className="selection-modal-backdrop",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.height="100%",i.style.backgroundColor="rgba(0, 0, 0, 0.5)",i.style.display="none",i.style.justifyContent="center",i.style.alignItems="center",i.style.zIndex=100000002,document.createElement("div"));d.className="selection-modal",d.setAttribute("role","dialog"),d.setAttribute("aria-modal","true"),d.setAttribute("aria-labelledby","selection-modal-title"),d.style.display="none",d.style.position="fixed",d.style.top="10%",d.style.left="10%",d.style.backgroundColor="white",d.style.borderRadius="8px",d.style.boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)",d.style.minWidth="80%",d.style.minHeight="80%",d.style.width="80%",d.style.height="80%",d.style.maxWidth="1200px",d.style.maxHeight="800px",d.style.zIndex="100000003",d.style.overflow="hidden",d.style.flexDirection="column",d.innerHTML=`
        <div class="modal-header">
            <h2 id="selection-modal-title" class="modal-title">Select Options</h2>
            <button class="close-button" aria-label="Close selection modal">&times;</button>
        </div>
        <div class="modal-body">
            <!-- Content will be populated here -->
        </div>
        <div class="modal-footer">
            <button class="secondary-button selection-modal-cancel-button">Cancel</button>
            <button class="primary-button selection-modal-save-button">Save</button>
        </div>
    `,document.body.appendChild(i),document.body.appendChild(d);var t=d.querySelector(".close-button"),l=d.querySelector(".selection-modal-cancel-button"),o=d.querySelector(".selection-modal-save-button");let s=d.querySelector(".modal-body"),n=(s.style.display="block",e),c=new Set;function r(n,e,a,t){n.innerHTML="";var l,e=e.filter(e=>!t||e.name.toLowerCase().includes(t));0===e.length?((l=document.createElement("p")).textContent="No options match the filter.",l.style.textAlign="center",l.style.fontStyle="italic",n.appendChild(l)):e.forEach(e=>{var t=document.createElement("div"),l=(t.style.display="flex",t.style.alignItems="center",document.createElement("input")),o=(l.type="checkbox",l.id="selection-modal-option-"+e.id,l.value=e.id,l.checked=a.has(e.id),l.addEventListener("change",e=>{var t=e.target.value;e.target.checked?a.add(t):a.delete(t)}),document.createElement("label"));o.htmlFor=l.id,o.textContent=e.name+` (${e.count})`,o.style.marginLeft="5px",o.style.cursor="pointer",o.style.fontWeight="normal",o.title=e.name,t.appendChild(l),t.appendChild(o),n.appendChild(t)})}function a(){i.style.display="none",d.style.display="none"}return t.addEventListener("click",a),l.addEventListener("click",a),i.addEventListener("click",e=>{e.target===i&&a()}),o.addEventListener("click",()=>{"function"==typeof n&&n(Array.from(c))}),{show:function(t,e,l="Select Options"){var o=d.querySelector(".modal-title");o&&(o.textContent=l),s.innerHTML="",c=new Set(e);let n=document.createElement("input"),a=(n.type="text",n.placeholder="Search options...",n.className="selection-modal-filter-input",n.style.width="100%",n.style.boxSizing="border-box",n.style.border="0px",n.style.padding="8px",n.addEventListener("input",()=>{var e=n.value.trim().toLowerCase();r(a,t,c,e)}),s.appendChild(n),document.createElement("div"));a.className="selection-modal-options-container",a.style.display="grid",a.style.gridTemplateColumns="repeat(3, 1fr)",a.style.gap="10px",a.style.overflowY="auto",a.style.padding="15px",a.style.flexGrow="1",a.style.borderTop="1px solid #ccc",s.appendChild(a),r(a,t,c,""),i.style.display="flex",d.style.display="flex"},hide:a,element:d}}module.exports={createSelectionModal:createSelectionModal};
