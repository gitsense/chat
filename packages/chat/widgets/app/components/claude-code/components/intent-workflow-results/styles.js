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

let INTENT_RESULTS_STYLES=`
    .gsc-intent-workflow-results-container {
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 15px;
        line-height: 1.6;
        color: #24292e;
    }

    .gsc-intent-workflow-header {

    }

    .gsc-intent-workflow-header h1 {
        marginTop: 0;
    }

    /* Intent Section */
    .gsc-intent-workflow-intent-block {
        white-space: pre-wrap;
        word-break: break-word;
        margin-top: 10px;
        margin-bottom: 25px;
        fontSize: 14px;
    }

    /* Candidates Section */
    .gsc-intent-workflow-candidates-section {
        margin-top: 10px;
        padding: 5px 0 2.5px 0;
    }

    /* WD Map */
    .gsc-intent-workflow-wd-map {
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 7px;
    }

    /* Details Section */
    .gsc-intent-workflow-details-section {
        margin-top: 25px;
    }

    /* ==================== Collapsible Section Styles ==================== */
    
    /* Collapsible section wrapper */
    .gsc-collapsible-section {
        margin-bottom: 10px;
        overflow: hidden;
    }

    /* Header row */
    .gsc-collapsible-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #ffffff;
        cursor: pointer;
        user-select: none;
        transition: background 0.2s ease;
    }

    .gsc-collapsible-header:hover {

    }

    .gsc-collapsible-header h3 {
        font-size: 16px;
        font-weight: 600;
        color: #24292e;
        margin: 0;
    }

    /* Toggle link */
    .gsc-collapsible-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #0366d6;
        font-size: 13px;
        font-weight: 600;
        text-decoration: none;
    }

    .gsc-collapsible-toggle:hover {
        text-decoration: underline;
    }

    .gsc-collapsible-toggle-icon {
        transition: transform 0.3s ease;
    }

    .gsc-collapsible-section.expanded .gsc-collapsible-toggle-icon {
        transform: rotate(180deg);
    }

    /* Description row */
    .gsc-collapsible-description {
        margin-top: 10px;
    }

    .gsc-collapsible-description p {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
    }

    /* Collapsible content area */
    .gsc-collapsible-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
    }

    .gsc-collapsible-section.expanded .gsc-collapsible-content {
        max-height: 10000px;
        transition: max-height 0.5s ease-in;
    }

    .gsc-collapsible-content-inner {
        margin-left: 10px;
        padding: 15px 0 5px 20px;
        border-left: 1px solid #aaa;
    }

    /* Sub-section dividers within Detailed Analysis */
    .gsc-collapsible-sub-section {
        margin-bottom: 25px;
        padding-bottom: 25px;
        border-bottom: 1px solid #e1e4e8;
    }

    .gsc-collapsible-sub-section:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }

    .gsc-collapsible-sub-section h4 {
        font-size: 14px;
        font-weight: 600;
        color: #24292e;
        margin-bottom: 10px;
    }

    /* ==================== End Collapsible Section Styles ==================== */

    /* Candidate Cards */
    .gsc-intent-workflow-candidate-card {
        font-size: 14px;
        padding-bottom: 15px;
        padding-top: 5px;
        margin-top: 20px;
        margin-bottom: 15px;
        border-bottom: 2px solid #ddd;
    }

    .gsc-intent-workflow-candidate-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .gsc-intent-workflow-candidate-title {
    
    }

    .gsc-intent-workflow-candidate-score {
        background: #28a745;
        color: white;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: bold;
    }

    .gsc-intent-workflow-candidate-content p {
        margin: 0 0 10px 0;
        line-height: 1.6;
    }

    .gsc-intent-workflow-candidate-content strong {
        color: #24292e;
    }

    /* Log Section */
    .gsc-intent-workflow-log-section {
        margin-top: 20px;
        padding: 5px 0 2.5px 0;
    }

    .gsc-intent-workflow-log-content {
        font-size: 14px;
    }

    .gsc-intent-workflow-log-content p {
        margin: 0 0 10px 0;
    }

    .gsc-intent-workflow-log-content ul {
        margin: 0;
        padding-left: 20px;
    }

    /* Activity Section */
    .gsc-intent-workflow-activity-section {
        margin-top: 10px;
        padding: 5px 0 2.5px 0;
    }

    .gsc-intent-workflow-activity-feed-container {

    }

    .gsc-intent-workflow-loading {
        padding: 20px;
        text-align: center;
        color: #586069;
    }

    .gsc-intent-workflow-error-container {
        font-size: 14px;
        padding: 20px;
        background-color: #fff5f5;
        border: 1px solid #fed7d7;
        border-radius: 6px;
        color: #c53030;
    }

    .gsc-intent-workflow-error-container h3 {
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 600;
    }

    .gsc-intent-workflow-error-container p {
        margin-bottom: 15px;
        line-height: 1.5;
    }

    .gsc-intent-workflow-error-container ul {
        margin-bottom: 15px;
        padding-left: 20px;
        line-height: 1.6;
    }

    .gsc-intent-workflow-error-container ul li {
        margin-bottom: 5px;
    }

    .gsc-intent-workflow-error-container p:last-child {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #fed7d7;
        font-weight: 500;
        font-style: italic;
    }

    /* Actions Section */
    .gsc-intent-workflow-actions-section {
        padding-top: 20px;
        display: flex;
        gap: 15px;
    }

    /* Load Links (Legacy - kept for backward compatibility) */
    .gsc-intent-workflow-load-link {
        color: #0366d6;
        text-decoration: none;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        transition: color 0.2s ease;
    }

    .gsc-intent-workflow-load-link:hover:not(.disabled) {
        color: #0256c7;
        text-decoration: underline;
    }

    .gsc-intent-workflow-load-link.disabled {
        color: #999;
        cursor: not-allowed;
        pointer-events: none;
    }

    /* Actions Container */
    .gsc-intent-workflow-actions-container {
        margin-top: 15px;
    }

    /* Action Groups */
    .gsc-intent-workflow-action-group {

    }

    .gsc-intent-workflow-action-group-title {
        margin: 0 0 8px 0;
        font-size: 14px;
        font-weight: 600;
        color: #24292e;
    }

    .gsc-intent-workflow-action-group-description {
        margin: 0 0 12px 0;
        font-size: 14px;
        color: #586069;
        line-height: 1.5;
    }

    /* Action Links */
    .gsc-intent-workflow-actions {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }

    .gsc-intent-workflow-action-link {
        text-decoration: none;
        font-size: 14px;
        transition: all 0.2s ease;
        cursor: pointer;
    }

    .gsc-intent-workflow-action-link:hover:not(.disabled) {
        text-decoration: none;
    }

    .gsc-intent-workflow-action-link.disabled {
        color: #999;
        cursor: not-allowed;
        pointer-events: none;
    }

    .gsc-intent-workflow-turn-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .gsc-intent-workflow-turn-header-title {
        margin: 0;
        border-bottom: 0;
    }



    /* Turn Section */
    .gsc-intent-workflow-turn-section {
        margin-top: 25px;
    }

    .gsc-intent-workflow-turn-description {
        margin: 0 0 12px 0;
        font-size: 14px;
        color: #586069;
        line-height: 1.5;
    }

    .gsc-intent-workflow-turn-link {
        color: #0366d6;
        text-decoration: none;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        transition: color 0.2s ease;
    }

    .gsc-intent-workflow-turn-link.disabled {
        color: #999;
        cursor: not-allowed;
        pointer-events: none;
    }

    .gsc-intent-workflow-turn-link:hover {
        color: #0256c7;
        text-decoration: underline;
    }

    .gsc-intent-workflow-turn-textarea {
        width: 100%;
        min-height: 80px;
        padding: 10px;
        border: 1px solid #e1e4e8;
        border-radius: 4px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        resize: vertical;
        box-sizing: border-box;
        transition: border-color 0.2s ease;
    }

    .gsc-intent-workflow-turn-textarea:focus {
        outline: none;
        border-color: #0366d6;
        box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.1);
    }

    .gsc-intent-workflow-turn-start-button {
        padding: 8px 16px;
        background: #0366d6;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .gsc-intent-workflow-turn-start-button:hover {
        background: #0256c7;
    }

    .gsc-intent-workflow-turn-cancel-button {
        padding: 8px 16px;
        background: #f6f8fa;
        color: #24292e;
        border: 1px solid #e1e4e8;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .gsc-intent-workflow-turn-cancel-button:hover {
        background: #edf2f7;
    }

    .gsc-intent-workflow-content {
        border-left: 1px solid #ccc;
        margin-left: 2.5px;
        padding-left: 15px;
    }

    .gsc-intent-workflow-hidden {
        display: none;
    }

    /* Access Requirements Section */
    .gsc-intent-workflow-access-requirements {
        margin-top: 35px;
    }

    /* ==================== Error Section Styles ==================== */
    .gsc-intent-workflow-error-section {
        background: #fff5f5;
        border: 1px solid #fed7d7;
        border-radius: 6px;
        padding: 20px;
        margin-top: 20px;
    }

    .gsc-intent-workflow-error-title {
        font-size: 1.15em;
        font-weight: 600;
        margin-bottom: 5px;
        color: #c53030;
    }

    .gsc-intent-workflow-error-message {
        color: #c53030;
        font-size: 14px;
        line-height: 1.6;
    }

    .gsc-intent-workflow-error-code {
        display: inline-block;
        background: #c53030;
        color: white;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        margin-right: 8px;
    }

    .gsc-intent-workflow-error-details {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #fed7d7;
    }

    .gsc-intent-workflow-error-details-toggle {
        color: #c53030;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    .gsc-intent-workflow-error-details-toggle:hover {
        text-decoration: underline;
    }

    .gsc-intent-workflow-error-details-content {
        margin-top: 15px;
        display: none;
    }

    .gsc-intent-workflow-error-details-content.show {
        display: block;
    }

    .gsc-intent-workflow-error-detail-item {
        margin-bottom: 12px;
    }

    .gsc-intent-workflow-error-detail-item:last-child {
        margin-bottom: 0;
    }

    .gsc-intent-workflow-error-detail-label {
        font-weight: 600;
        font-size: 12px;
        color: #c53030;
        margin-bottom: 4px;
    }

    .gsc-intent-workflow-error-detail-value {
        font-family: 'SF Mono', 'Segoe UI Mono', monospace;
        font-size: 12px;
        color: #24292e;
        background: white;
        padding: 8px;
        border: 1px solid #e1e4e8;
        border-radius: 4px;
        white-space: pre-wrap;
        word-break: break-word;
        max-height: 200px;
        overflow-y: auto;
    }

    /* ==================== Action Buttons ==================== */
    .gsc-intent-workflow-actions-section {
        padding-top: 20px;
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
    }

    /* ==================== Next Steps Section ==================== */
    .gsc-intent-workflow-next-steps-container {
        font-size: 14px;
        padding: 20px 0;
    }

    .gsc-intent-workflow-next-steps-blurb {
        margin-bottom: 15px;
        color: #586069;
        font-size: 14px;
        line-height: 1.6;
    }

    .gsc-intent-workflow-next-steps-bullets {
        margin-bottom: 20px;
        padding-left: 20px;
        line-height: 1.6;
    }

    .gsc-intent-workflow-next-steps-bullets li {
        margin-bottom: 8px;
    }

    .gsc-intent-workflow-next-steps-buttons {
        display: flex;
        gap: 10px;
        margin-bottom: 25px;
    }

    .gsc-intent-workflow-next-steps-buttons .btn {
        padding: 8px 16px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .gsc-intent-workflow-next-steps-buttons .btn-outline {
        background: transparent;
        border: 1px solid #e1e4e8;
        color: #24292e;
    }

    .gsc-intent-workflow-next-steps-buttons .btn-outline:hover {
        background: #f6f8fa;
        border-color: #d1d5da;
    }

    .gsc-intent-workflow-refinement-tips {
        margin-top: 20px;
        font-size: 1.2em;
    }

    .gsc-intent-workflow-refinement-tips h4 {
        margin: 0 0 10px 0;
        font-size: 14px;
        font-weight: 600;
        color: #24292e;
    }

    .gsc-intent-workflow-refinement-tips ul {
        margin: 0 0 10px 0;
        padding-left: 20px;
        line-height: 1.6;
    }

    .gsc-intent-workflow-refinement-tips li {
        margin-bottom: 6px;
        font-size: 14px;
        color: #586069;
    }

    .gsc-intent-workflow-refinement-tips a {
        color: #0366d6;
        text-decoration: none;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
    }

    .gsc-intent-workflow-refinement-tips a:hover {
        text-decoration: underline;
    }

    /* ==================== Change Log Section Styles ==================== */
    
    /* Narrative Summary */
    .gsc-intent-workflow-change-log-narrative-summary {
        color: #586069;
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 20px;
        padding: 0;
    }

    /* Metric Cards Container */
    .gsc-intent-workflow-change-log-metric-cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    /* Metric Card */
    .gsc-intent-workflow-change-log-metric-card {
        background: white;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid rgb(225, 228, 232);
    }

    /* Metric Label */
    .gsc-intent-workflow-change-log-metric-label {
        font-size: 12px;
        color: rgb(88, 96, 105);
        margin-bottom: 4px;
    }

    /* Metric Value */
    .gsc-intent-workflow-change-log-metric-value {
        font-size: 16px;
        font-weight: 600;
        color: rgb(36, 41, 46);
    }

    /* Action Legend */
    .gsc-intent-workflow-change-log-action-legend {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
        padding: 10px 0;
        border-bottom: 1px solid #e1e4e8;
    }

    /* Legend Item */
    .gsc-intent-workflow-change-log-legend-item {
        font-weight: 500;
        font-size: 14px;
        color: #586069;
    }

    /* Legend Count */
    .gsc-intent-workflow-change-log-legend-count {
        font-weight: 600;
        color: #24292e;
    }

    /* File Table */
    .gsc-intent-workflow-change-log-file-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }

    .gsc-intent-workflow-change-log-file-table td {
        padding: 0;
        vertical-align: top;
        border: none;
    }

    .gsc-intent-workflow-change-log-file-table tr {
        border: 0;
        margin-bottom: 16px;
    }

    /* Change Number */
    .gsc-intent-workflow-change-log-change-number {
        width: 30px;
        color: #586069;
        font-family: "SF Mono", "Segoe UI Mono", "Roboto Mono", monospace;
        font-size: 13px;
        padding-top: 2px;
    }

    /* Path & Description Cell */
    .gsc-intent-workflow-change-log-path-description {
        width: auto;
    }

    /* File Path */
    .gsc-intent-workflow-change-log-file-path {
        color: #24292e;
        font-family: "SF Mono", "Segoe UI Mono", "Roboto Mono", monospace;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 10px;
    }

    .gsc-intent-workflow-change-log-file-path-link {
        font-size: 13px;
        font-weight: 500;
        color: #24292e;
        text-decoration: none;
        border-bottom: 1px solid black;
        padding-bottom: 3px;
    }

    /* File Description */
    .gsc-intent-workflow-change-log-file-description {
        color: #586069;
        font-size: 14px;
        line-height: 1.5;
    }

    /* Action Badge */
    .gsc-intent-workflow-change-log-action-badge {
        width: 20px;
        text-align: center;
        font-size: 11px;
        font-weight: 600;
        color: #24292e;
        padding-top: 2px;
    }

    /* Lines Added */
    .gsc-intent-workflow-change-log-lines-added {
        width: 40px;
        text-align: right;
        color: #28a745;
        font-size: 12px;
        padding-top: 2px;
    }

    /* Lines Deleted */
    .gsc-intent-workflow-change-log-lines-deleted {
        width: 40px;
        text-align: right;
        color: #dc3545;
        font-size: 12px;
        padding-top: 2px;
    }

    /* ==================== Changes Section Styles ==================== */
    
    /* Changes Section Container */
    .gsc-intent-workflow-changes-section-container {
        margin-top: 10px;
    }

    /* Changes Section Title */
    .gsc-intent-workflow-changes-section-title {
        margin-top: 0;
        margin-bottom: 15px;
        color: #24292e;
        font-size: 16px;
        font-weight: 600;
    }

    /* File Card */
    .gsc-intent-workflow-changes-file-card {
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        padding: 15px;
        margin-bottom: 15px;
    }

    /* File Header */
    .gsc-intent-workflow-changes-file-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    /* Title Group (Path + Badge) */
    .gsc-intent-workflow-changes-title-group {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    /* File Path */
    .gsc-intent-workflow-changes-file-path {
        font-size: 13px;
        color: #24292e;
        font-family: "SF Mono", "Segoe UI Mono", "Roboto Mono", monospace;
    }

    /* Scope Badge - In Scope */
    .gsc-intent-workflow-changes-scope-badge-in {
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        background-color: #d4edda;
        color: #155724;
    }

    /* Scope Badge - Out of Scope */
    .gsc-intent-workflow-changes-scope-badge-out {
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        background-color: #fff3cd;
        color: #856404;
    }

    /* Line Stats */
    .gsc-intent-workflow-changes-line-stats {
        font-size: 12px;
        color: #586069;
        font-family: monospace;
    }

    /* File Description */
    .gsc-intent-workflow-changes-file-description {
        margin: 0 0 10px 0;
        font-size: 14px;
        color: #586069;
        line-height: 1.5;
    }

    /* View Diff Button */
    .gsc-intent-workflow-changes-view-diff-btn {
        font-size: 12px;
        padding: 3px 8px;
        background: #f6f8fa;
        border: 1px solid #e1e4e8;
        border-radius: 4px;
        color: #24292e;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .gsc-intent-workflow-changes-view-diff-btn:hover {
        background: #edf2f7;
    }

    /* Diff Container */
    .gsc-intent-workflow-changes-diff-container {
        display: none;
        margin-top: 15px;
        padding: 10px;
        background-color: #f6f8fa;
        border-radius: 4px;
        font-family: monospace;
        font-size: 12px;
        white-space: pre-wrap;
        overflow-x: auto;
    }

    /* ==================== Brain Effectiveness Section Styles ==================== */
    
    /* Brain Effectiveness Section */
    .gsc-intent-workflow-brain-effectiveness-section {
        margin-top: 32px;
        padding-top: 16px;
        border-top: 1px solid #e1e4e8;
    }

    /* Brain Entry */
    .gsc-intent-workflow-brain-entry {
        margin-bottom: 16px;
    }

    /* Brain Feedback */
    .gsc-intent-workflow-brain-feedback {
        margin-top: 8px;
        font-size: 12px;
        line-height: 1.5;
    }

    /* Field Tags */
    .gsc-intent-workflow-field-tag {
        display: inline-block;
        font-family: monospace;
        font-size: 11px;
        background: #f6f8fa;
        padding: 2px 6px;
        border-radius: 3px;
        margin: 2px;
        color: #24292e;
    }

    .gsc-intent-workflow-field-tag-missing {
        background: #ffebee;
        color: #c62828;
    }
`;module.exports={INTENT_RESULTS_STYLES:INTENT_RESULTS_STYLES};
