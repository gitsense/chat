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

let{handleStartInlineAgent,handleAskAIToFix}=require("./actions");function messageHasChildren(e){return e.kids&&0<e.kids.length}function createWidgetElement(e){var t=document.createElement("div");return t.className=e,t}function escapeHtml(e){var t=document.createElement("div");return t.textContent=e,t.innerHTML}function renderNotLastMessageWarning(e){var t=createWidgetElement("intent-trigger-widget warning-widget");t.innerHTML=`
        <div class="widget-header">
            <div class="widget-title">Action Not Available</div>
        </div>

        <div class="warning-message">
            <div class="warning-label">Message Has Responses</div>
            <div class="warning-text">This message is not the last message in the conversation. You can only start an inline agent or ask the AI to fix from the most recent message.</div>
        </div>

        <div class="delete-hint">To delete this message, use the trash can icon below the message</div>
    `,e.appendChild(t)}function renderNormalState(r,e,t,d,l,c,o){if(messageHasChildren(c))renderNotLastMessageWarning(r);else{let a=createWidgetElement("intent-trigger-widget");var v=d.length,g=1e3<v;a.innerHTML=`
        <div class="widget-header">
            <div class="widget-title">
                ${escapeHtml(e)}
            </div>
            <div class="widget-description">${escapeHtml(t)}</div>
        </div>

        <div class="intent-section">
            <div class="section-label">
                <span>Intent (editable)</span>
                <span class="edit-hint"> You can modify this before starting</span>
            </div>
            <textarea class="intent-textarea">${escapeHtml(d)}</textarea>
            <div class="char-count ${g?"warning":""}">${g?"<strong>Warning: </strong>":""} ${v} characters${g?" (recommended: <1,000)":""}</div>
        </div>

        <div class="model-section">
            <div class="section-label">Select Model</div>
            <select class="model-select">
                ${l.map(e=>`
                    <option value="${e.name}">
                        ${escapeHtml(e.name)}${e.name.includes("Haiku")?" (Fast, Cost-Effective)":e.name.includes("Sonnet")?" (Balanced)":" (Most Capable)"}
                    </option>
                `).join("")}
            </select>
        </div>

        <div class="action-buttons">
            <button class="btn btn-primary">Start Inline Agent</button>
        </div>
    `,r.appendChild(a);let i=a.querySelector(".intent-textarea"),n=a.querySelector(".char-count"),s=a.querySelector(".btn-primary");i.addEventListener("input",()=>{var e=i.value.trim().length,t=i.value.length;0===e?(n.textContent=" Intent cannot be empty",n.className="char-count error",s.disabled=!0):(1e3<t?(n.innerHTML=`<strong>Warning: </strong> ${t} characters (recommended: <1,000)`,n.className="char-count warning"):(n.textContent=t+" characters",n.className="char-count"),s.disabled=!1)}),s.addEventListener("click",async()=>{var e=i.value,t=a.querySelector(".model-select").value;await handleStartInlineAgent(c,r,o,e,t)})}}function renderMalformedJsonState(e,t,a,i){var n;messageHasChildren(a)?renderNotLastMessageWarning(e):((n=createWidgetElement("intent-trigger-widget error-widget")).innerHTML=`
        <div class="error-header">
            <div class="error-title">Invalid Inline Agent Trigger</div>
        </div>

        <div class="error-message">
            <div class="error-label">Error:</div>
            <div class="error-text">${escapeHtml(t)}</div>
        </div>

        <div class="info-box">
            <div class="info-text">The AI generated a malformed JSON block. This can happen occasionally. You can ask the AI to regenerate it with correct syntax.</div>
        </div>

        <div class="action-buttons">
            <button class="btn btn-primary">Ask AI to Fix</button>
        </div>
        <div class="delete-hint"> To delete this message, use the trash can icon below the message</div>
    `,e.appendChild(n),n.querySelector(".btn-primary").addEventListener("click",async()=>{await handleAskAIToFix(a,e,i,"malformed-json",t)}))}function renderMissingFieldsState(e,t,a,i){var n;messageHasChildren(a)?renderNotLastMessageWarning(e):((n=createWidgetElement("intent-trigger-widget error-widget")).innerHTML=`
        <div class="error-header">
            <div class="error-title">Incomplete Trigger Configuration</div>
        </div>

        <div class="error-message">
            <div class="error-label">Missing required fields:</div>
            <div class="error-text">${t.map(e=>"- "+e).join("\n")}</div>
        </div>

        <div class="info-box">
            <div class="info-text">The AI's trigger is missing some required information. Please ask it to regenerate the trigger with all required fields.</div>
        </div>

        <div class="action-buttons">
            <button class="btn btn-primary">Ask AI to Fix</button>
        </div>
        <div class="delete-hint"> To delete this message, use the trash can icon below the message</div>
    `,e.appendChild(n),n.querySelector(".btn-primary").addEventListener("click",async()=>{await handleAskAIToFix(a,e,i,"missing-fields","Missing required fields: "+t.join(", "))}))}function renderErrorState(e,t,a,i){var n;messageHasChildren(a)?renderNotLastMessageWarning(e):((n=createWidgetElement("intent-trigger-widget error-widget")).innerHTML=`
        <div class="error-header">
            <div class="error-title">Invalid Inline Agent Trigger</div>
        </div>

        <div class="error-message">
            <div class="error-label">Error:</div>
            <div class="error-text">${escapeHtml(t)}</div>
        </div>

        <div class="info-box">
            <div class="info-text">The AI generated an invalid trigger configuration. Please ask it to regenerate the trigger with a valid config object.</div>
        </div>

        <div class="action-buttons">
            <button class="btn btn-primary">Ask AI to Fix</button>
        </div>
        <div class="delete-hint"> To delete this message, use the trash can icon below the message</div>
    `,e.appendChild(n),n.querySelector(".btn-primary").addEventListener("click",async()=>{await handleAskAIToFix(a,e,i,"invalid-config",t)}))}function renderNoModelsState(e,t,a,i,n,s){messageHasChildren(s)?renderNotLastMessageWarning(e):((s=createWidgetElement("intent-trigger-widget warning-widget")).innerHTML=`
        <div class="widget-header">
            <div class="widget-title">
                ${escapeHtml(t)}
            </div>
            <div class="widget-description">${escapeHtml(a)}</div>
        </div>

        <div class="intent-section">
            <div class="section-label">
                <span>Intent (editable)</span>
                <span class="edit-hint"> You can modify this before starting</span>
            </div>
            <textarea class="intent-textarea">${escapeHtml(i)}</textarea>
        </div>

        <div class="warning-message">
            <div class="warning-label">Claude Code Not Available</div>
            <div class="warning-text">Claude Code models are not available. Run <code>claude auth status</code> and <code>gsc claude init</code> to ensure you are logged in and have initialized Claude Code for use with the GitSense Chat app.</div>
        </div>

        <div class="model-section">
            <div class="section-label">Select Model</div>
            <select class="model-select" disabled>
                <option value="">No models available</option>
            </select>
        </div>

        <div class="delete-hint"> To delete this message, use the trash can icon below the message</div>
    `,e.appendChild(s))}function renderEmptyIntentState(r,e,t,d,l,c,o){if(messageHasChildren(c))renderNotLastMessageWarning(r);else{let a=createWidgetElement("intent-trigger-widget"),i=(a.innerHTML=`
        <div class="widget-header">
            <div class="widget-title">
                ${escapeHtml(e)}
            </div>
            <div class="widget-description">${escapeHtml(t)}</div>
        </div>

        <div class="intent-section">
            <div class="section-label">
                <span>Intent (editable)</span>
                <span class="edit-hint"> You can modify this before starting</span>
            </div>
            <textarea class="intent-textarea">${escapeHtml(d)}</textarea>
            <div class="char-count error"> Intent cannot be empty</div>
        </div>

        <div class="model-section">
            <div class="section-label">Select Model</div>
            <select class="model-select">
                ${l.map(e=>`
                    <option value="${e.name}">
                        ${escapeHtml(e.name)}${e.name.includes("Haiku")?" (Fast, Cost-Effective)":e.name.includes("Sonnet")?" (Balanced)":" (Most Capable)"}
                    </option>
                `).join("")}
            </select>
        </div>

        <div class="action-buttons">
            <button class="btn btn-primary" disabled>Start Inline Agent</button>
        </div>
        <div class="delete-hint">To delete this message, use the trash can icon below the message</div>
    `,r.appendChild(a),a.querySelector(".intent-textarea")),n=a.querySelector(".char-count"),s=a.querySelector(".btn-primary");i.addEventListener("input",()=>{var e=i.value.trim().length,t=i.value.length;0===e?(n.textContent=" Intent cannot be empty",n.className="char-count error",s.disabled=!0):(1e3<t?(n.textContent=` ${t} characters (recommended: <1,000)`,n.className="char-count warning"):(n.textContent=t+" characters",n.className="char-count"),s.disabled=!1)}),s.addEventListener("click",async()=>{var e=i.value,t=a.querySelector(".model-select").value;await handleStartInlineAgent(c,r,o,e,t)})}}module.exports={messageHasChildren:messageHasChildren,createWidgetElement:createWidgetElement,escapeHtml:escapeHtml,renderNotLastMessageWarning:renderNotLastMessageWarning,renderNormalState:renderNormalState,renderMalformedJsonState:renderMalformedJsonState,renderMissingFieldsState:renderMissingFieldsState,renderErrorState:renderErrorState,renderNoModelsState:renderNoModelsState,renderEmptyIntentState:renderEmptyIntentState};
