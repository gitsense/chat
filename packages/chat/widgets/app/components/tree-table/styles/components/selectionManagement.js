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

let variables=require("../base/variables"),selectionManagement={treeTableContainer:`
        .tree-table-container {
            display: flex;
            flex-direction: column;
            height: 100%; /* Or a defined height */
            overflow: hidden; /* Prevent parent scroll */
        }
    `,container:`
        .selection-management-component {
            padding-top: 20px;
            padding-bottom: 0px;
            font-family: ${variables.fonts.family};
            font-size: ${variables.fonts.size.base};
            top: -5; /* Stick to the top of its scrolling parent */
            z-index: 10; /* Ensure it stays above the table content */
            background-color: white; /* Add a background to hide content scrolling underneath */
            /* Initially no border or shadow */
            border-bottom: 1px solid transparent; /* Reserve space, initially transparent */
            transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* Smooth transition for border and shadow */
        }

        /* Styles applied when the component is sticky (requires JS to add/remove this class) */
        .selection-management-component.is-sticky {
            border-bottom: 1px solid #eee; /* Add visible border when sticky */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add subtle shadow when sticky */
        }

        .selection-combined-container {
            display: flex;
            flex-direction: column;
            gap: ${variables.spacing.sm};
            padding: 18px 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-bottom: 25px;
        }
    `,scrollableTableContainer:`
        .scrollable-table-container {
            flex-grow: 1; /* Allow this container to take up remaining space */
            overflow-y: auto; /* Enable vertical scrolling */
            position: relative; /* Needed for sticky table header if implemented later */
        }
    `,optionsRow:`
        .selection-options-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 2px;
        }

        .options-container {
            display: flex;
            gap: ${variables.spacing.md};
        }

        .selection-option {
            display: flex;
            align-items: center;
            gap: 2px;
            cursor: pointer;
        }

        .reset-container button {
            background: none;
            border: none;
            color: ${variables.colors.primary};
            cursor: pointer;
            text-decoration: underline;
        }
    `,dropdownsRow:`
        .selection-dropdowns-row {
            display: flex;
            gap: ${variables.spacing.md};
            margin-top: 3px;
            margin-bottom: 10px;
        }

        .selection-dropdowns-row select {
            padding: 4px 8px;
            border: 1px solid #ddd;
            border-radius: 3px;
            font-size: ${variables.fonts.size.base};
            width: 100%;
        }
    `,infoRow:`
        .selection-info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .selection-info {
            color: ${variables.colors.textSecondary};
            font-size: ${variables.fonts.size.base};
        }

        .selection-button-container {
        }

        .quick-add-button {
            min-width: 65px;
            padding: 7px 12px;
            border-radius: ${variables.borderRadius};
            border: 1px solid #ddd;
            background-color: white;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            margin-right: 5px
        }

        .quick-add-button:hover {
            background-color: ${variables.colors.backgroundHover};
        }

        /* Disabled state for both review and load buttons */
        .quick-add-button:disabled {
            border-color: transparent;
            background-color: #f4f4f4;
            color: #999;
            cursor: not-allowed;
        }

        .review-button {
            padding: 8px 12px; /* Same padding as load button */
            background-color: ${variables.colors.primary};
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 13px;
        }

        /* Disabled state for both review and load buttons */
        .review-button:disabled, .load-button:disabled {
            background-color: #f4f4f4;
            color: #999;
            cursor: not-allowed;
        }
    `,warningRow:`
        .selection-warning-row {
            display: flex;
            align-items: center;
            gap: ${variables.spacing.xs};
            color: #666;
            font-size: 12px;
            border-top: 1px solid #ccc;
            margin-top: 5px;
            padding-top: 5px;
        }

        .warning-icon svg {
            fill: ${variables.colors.warning};
        }
    `,stats:`
        .preview-stats {
            padding: 8px;
            border-bottom: 1px solid #eee;
            font-family: monospace;
            font-size: 12px;
            background-color: ${variables.colors.background};
        }

        .stat-row {
            display: flex;
            gap: ${variables.spacing.sm};
            margin-bottom: 2px;
        }

        .stat-label {
            font-weight: 500;
            color: ${variables.colors.text};
        }

        .stat-value {
            color: ${variables.colors.textSecondary};
        }

        .stat-error {
            color: ${variables.colors.error};
            margin-left: ${variables.spacing.sm};
        }
    `,modalStatsDisplay:`
        .modal-stats-display { /* Container for modal statistics */
            display: flex;
            align-items: center;
            font-size: ${variables.fonts.size.small};
            color: ${variables.colors.textSecondary};
        }

        .modal-stats-display .stat-item { /* Individual stat item */
            /* Individual stat item styling if needed */
        }

        .modal-stats-display .stat-error {
             color: ${variables.colors.error};
        }
    `,loadedSelections:`
        /* Loaded Selections Container */
        .loaded-selections {

        }

        /* Loaded Selections Header */
        .loaded-selections-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0px 5px 8px 5px;
            margin-bottom: 10px;
            border-bottom: 1px solid #ddd;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        /* Loaded Selections Title */
        .loaded-selections-title {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            color: ${variables.colors.text};
        }

        /* Loaded Selections Content */
        .loaded-selections-content {
            padding: 0px 5px;
        }

        /* Loaded Selections Table */
        .loaded-selections-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8px;
            font-size: 13px;
            table-layout: fixed;
        }

        /* New Selection Icon Column */
        .selection-icon-column {
            width: 30px;
            min-width: 30px;
        }
        .loaded-selections-table thead th {
            text-align: left;
            padding: 6px 8px;
            font-weight: 600;
            border-bottom: 1px solid #eee;
            color: ${variables.colors.textSecondary};
            font-size: 12px;
        }

        .loaded-selections-table tbody tr {
            transition: background-color 0.2s;
        }

        .loaded-selections-table tbody tr:hover {
            background-color: #f5f5f5;
        }

        .loaded-selections-table tbody tr.selected {
            background-color: rgba(0, 123, 255, 0.05);
        }

        .loaded-selections-table tbody tr.selected:hover {
            background-color: rgba(0, 123, 255, 0.1);
        }

        .loaded-selections-table td {
            padding: 6px 8px;
            border-bottom: 1px solid #f0f0f0;
        }

        /* New Selection Icon Cell */
        .selection-icon-cell {
            text-align: center;
        }

        /* Column widths */
        .checkbox-column {
            width: 30px;
            min-width: 30px;
        }

        .time-column {
            width: 80px;
            min-width: 80px;
        }

        .options-column {
            width: 40px;
            min-width: 40px;
        }

        /* Make name column take remaining space */
        .name-column {
            width: auto;
        }

        /* Checkbox styling */
        .loaded-selections-table input[type="checkbox"] {
            cursor: pointer;
        }

        /* Name cell styling */
        .name-cell {
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
        }

        /* Loaded Item Link */
        .loaded-item-link {
            color: ${variables.colors.primary};
            text-decoration: none;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .loaded-item-link:hover {
            text-decoration: underline;
        }

        /* Options cell styling */
        .options-cell {
            text-align: center;
        }

        /* Options button styling */
        .options-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            padding: 0;
            border: none;
            border-radius: 4px;
            background-color: transparent;
            color: ${variables.colors.textSecondary};
            cursor: pointer;
            transition: background-color 0.2s, color 0.2s;
            opacity: 0; /* Hidden by default, shown on row hover */
        }

        .loaded-selections-table tr:hover .options-button {
            opacity: 1; /* Show on row hover */
        }

        .options-button:hover {
            background-color: #e0e0e0;
            color: ${variables.colors.text};
        }

        .options-button svg {
            fill: currentColor;
        }

        /* Options menu styling */
        .options-menu {
            position: absolute;
            z-index: 1000;
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            min-width: 140px;
            display: none;
            animation: fadeIn 0.15s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .options-menu.visible {
            display: block;
        }

        .options-menu ul {
            list-style: none;
            margin: 0;
            padding: 4px 0;
        }

        .options-menu li {
            padding: 0;
        }

        .options-menu li:not(:last-child) {
            border-bottom: 1px solid #f0f0f0;
        }

        .options-menu button {
            display: flex;
            align-items: center;
            width: 100%;
            text-align: left;
            padding: 8px 12px;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 13px;
            color: ${variables.colors.text};
            transition: background-color 0.2s;
        }

        .options-menu button:hover {
            background-color: #f5f5f5;
        }

        .options-menu button:before {
            content: '';
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 8px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }

        .options-menu .rename-option:before {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z'%3E%3C/path%3E%3C/svg%3E");
        }

        .options-menu .duplicate-option:before {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='9' y='9' width='13' height='13' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'%3E%3C/path%3E%3C/svg%3E");
        }

        .options-menu .delete-option:before {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3 6 5 6 21 6'%3E%3Cpolyline%3E%3Cpath d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'%3E%3C/path%3E%3C/svg%3E");
            color: ${variables.colors.error};
        }

        /* Loaded Item Edit Form */
        .loaded-item-edit-form {
            display: flex;
            align-items: center;
            padding: 4px 0;
        }

        /* Loaded Item Edit Input */
        .loaded-item-edit-input,
        .rename-input {
            flex: 1;
            height: 28px;
            padding: 0 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: white;
            color: ${variables.colors.text};
            font-size: 13px;
            width: 100%;
        }

        .loaded-item-edit-input:focus,
        .rename-input:focus {
            outline: none;
            border-color: ${variables.colors.primary};
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        /* Loaded Item Edit Buttons */
        .loaded-item-edit-save,
        .loaded-item-edit-cancel {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            margin-left: 4px;
            padding: 0;
            border: none;
            border-radius: 4px;
            background-color: #f0f0f0;
            color: ${variables.colors.text};
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .loaded-item-edit-save:hover,
        .loaded-item-edit-cancel:hover {
            background-color: #e0e0e0;
        }

        /* Loaded Selections No Items */
        .loaded-selections-no-items {
            padding: 12px 8px;
            color: ${variables.colors.textSecondary};
            font-style: italic;
            text-align: center;
        }

        /* Loaded Selections Show More */
        .loaded-selections-show-more {
            display: flex; /* Use flex for horizontal layout */
            justify-content: center; /* Center the links */
            align-items: center;
            gap: 5px; /* Space between elements */
            margin-top: 8px;
        }

        /* Loaded Selections Show More Link */
        .loaded-selections-show-more-link,
        .loaded-selections-hide-link {
            color: ${variables.colors.primary};
            text-decoration: none;
            font-size: 12px;
            cursor: pointer;
        }

        .loaded-selections-show-more-link:hover,
        .loaded-selections-hide-link:hover {
            text-decoration: underline;
        }

        /* Loaded Selections Summary (when hidden) */
        .loaded-selections-summary {
            font-size: 13px;
            padding: 5px 5px;
            color: #555;
            text-align: center; /* Center the summary text */
        }

        .loaded-selections-summary a { /* Style for the 'Click here to view' link */
            color: ${variables.colors.primary};
            text-decoration: none;
            cursor: pointer;
        }

        .loaded-selections-summary a:hover {
            text-decoration: underline;
        }

    `,metadataFilter:`
        .modal-metadata-filter-section {
            padding: 10px 10px 3px 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .metadata-filter-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .metadata-filter-title h4 {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            color: ${variables.colors.text};
        }

        .metadata-filter-actions {
            display: flex;
            gap: 10px;
        }

        .reset-metadata-filter-link,
        .save-metadata-query-link,
        .load-metadata-query-link,
        .edit-metadata-query-link,
        .help-metadata-query-link,
        .add-metadata-condition-link,
        .fetch-metadata-values-link {
            color: ${variables.colors.primary};
            text-decoration: none;
            font-size: 12px;
            cursor: pointer;
        }

        .reset-metadata-filter-link:hover,
        .save-metadata-query-link:hover,
        .load-metadata-query-link:hover,
        .edit-metadata-query-link:hover,
        .help-metadata-query-link:hover,
        .add-metadata-condition-link:hover,
        .fetch-metadata-values-link:hover {
            text-decoration: underline;
        }

        .metadata-filter-controls {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .metadata-analyzer-select {
            padding: 4px 8px;
            border: 1px solid #ddd;
            border-radius: 3px;
            font-size: ${variables.fonts.size.base};
        }

        .metadata-filter-rules-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .metadata-filter-rule-template,
        .metadata-filter-rule-row {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 5px;
            border: 1px solid #eee;
            border-radius: 4px;
            background-color: #f9f9f9;
        }

        .metadata-filter-rule-row select,
        .metadata-filter-rule-row input[type="text"],
        .metadata-filter-rule-row input[type="number"] {
            padding: 4px 8px;
            border: 1px solid #ddd;
            border-radius: 3px;
            font-size: 12px;
        }

        .metadata-filter-rule-row .metadata-field-select {
            width: 150px; /* Adjust width as needed */
        }

        .metadata-filter-rule-row .metadata-operator-select {
            width: 100px; /* Adjust width as needed */
        }

        .metadata-filter-rule-row .metadata-value-input-area {
            flex-grow: 1; /* Allow input area to take available space */
            display: flex; /* Use flex for potential multiple inputs (e.g., range) */
            gap: 5px;
            align-items: center;
        }

        .metadata-filter-rule-row .metadata-value-input-area input[type="text"],
        .metadata-filter-rule-row .metadata-value-input-area input[type="number"],
        .metadata-filter-rule-row .metadata-value-input-area select {
             flex-grow: 1; /* Allow inputs/selects within the area to grow */
        }

        .metadata-filter-rule-row .metadata-value-type-indicator {
            font-size: 10px;
            color: #666;
            white-space: nowrap;
        }

        .metadata-filter-rule-row .remove-metadata-condition-button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            color: #999;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .metadata-filter-preview-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 10px;
            border-top: 1px dashed #ccc; /* Visual separation */
        }

        .metadata-query-preview {
            flex-grow: 1;
            font-family: monospace;
            font-size: .85em;
            color: #555;
            margin-right: 10px;
            white-space: pre-wrap; /* Allow wrapping */
            word-break: break-all; /* Break long words */
        }

        .metadata-query-actions {
            display: flex;
            gap: 10px;
            flex-shrink: 0; /* Prevent actions from shrinking */
        }

        /* Disabled state for metadata filter elements */
        .modal-metadata-filter-section.disabled {
            pointer-events: none; /* Disable all pointer events */
            opacity: 0.7; /* Visually indicate disabled state */
        }

        .modal-metadata-filter-section.disabled select,
        .modal-metadata-filter-section.disabled input,
        .modal-metadata-filter-section.disabled textarea,
        .modal-metadata-filter-section.disabled a,
        .modal-metadata-filter-section.disabled button {
            cursor: not-allowed; /* Change cursor for disabled elements */
        }

        .metadata-analyzer-dropdown-container {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 3px 5px;
        }

        .metadata-apply-button-container {
            margin-bottom: 5px;
            gap: 7px;
        }

        .metadata-filter-apply-button {
            padding: 6px 12px;
        }

        .metadata-filter-apply-button-disabled {
            color: #aaa;
            pointer-events: none;
        }
    `,contextBuilderModal:`
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10000000;
        }

        /* Full screen modal styles */
        .context-builder-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: none; /* Remove centering transform */
            /* Original centering styles commented out */
            /* top: 50%; */
            /* left: 50%; */
            /* transform: translate(-50%, -50%); */
            max-width: none; /* Remove max width */
            max-height: none; /* Remove max height */
            background-color: white;
            /*
             * Uncomment if you don't want to have 100% width and height
             * border: 1px solid #666;
             * border-radius: 5px;
             * box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
             */
            display: flex;
            flex-direction: column;
            z-index: 100000001;
            /* Original size/positioning commented out */
            overflow: hidden;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: ${variables.spacing.sm} ${variables.spacing.md};
            border-bottom: 1px solid #aaa;
        }

        .modal-title {
            font-weight: 600;
            font-size: 20px;
            margin: 0;
        }

        .close-button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 22px;
            font-weight: 600;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid ${variables.colors.border};
        }

        .metadata-toggle {
            display: flex;
            align-items: center;
            font-size: ${variables.fonts.size.base};
            font-weight: normal;
        }

        .metadata-toggle input[type="checkbox"] {
            margin-right: ${variables.spacing.xs};
        }

        .progress-container {
            height: 4px;
            background-color: #eee;
            border-radius: 2px;
            width: 200px;
            overflow: hidden;
        }

        .progress-bar {
            height: 100%;
            background-color: ${variables.colors.primary};
            transition: width 0.3s ease;
        }


        /* Style for the visual separator */
        .button-separator {
            display: inline-block;
            width: 1px; /* Thin line */
            height: 20px; /* Height similar to button height */
            background-color: #ccc; /* Light grey color */
        }

        /* New row for Ask AI links */
        .modal-ask-ai-row {
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid ${variables.colors.border};
            gap: 5px;
        }

        .modal-ask-ai-row .ask-ai-links {
            display: flex;
            align-items: center;
            gap: 5px; /* Gap between the two links */
        }


        /* New row containers for future filters */
        .modal-filters-row-2,
        .modal-filters-row-3 {
            padding: ${variables.spacing.xs} ${variables.spacing.md};
            border-bottom: 1px solid ${variables.colors.border};
            /* Add basic styling, will be populated later */
            min-height: 0; /* Don't reserve space if empty */
            display: none; /* Use flex for potential future content */
            align-items: center;
            gap: ${variables.spacing.md};
        }

        .modal-body {
            /* Use flexbox to create two columns */
            display: flex;
            flex: 1;
            flex-direction: row; /* Arrange children (sidebar and table) in a row */
            overflow: hidden;
        }

        /* Styles for the new filter sidebar */
        .modal-filter-sidebar {
            font-size: .9em;
            width: 0px; /* Fixed width for the sidebar */
            min-width: 250px; /* Prevent shrinking */
            display: flex;
            flex-direction: column; /* Stack filter sections vertically */
            border-left: 1px solid #ccc;
            overflow-y: auto; /* Add scrolling if filter content exceeds height */
        }

        /* Styles for individual filter sections within the sidebar */
        .modal-filter-sidebar .filter-section {
            /* Default styles for filter sections */
            overflow-y: auto; /* Add scrolling if filter content exceeds height */
            border-top: 1px solid #ddd;
        }

        .modal-filter-sidebar .path-filter-content {
            padding: 10px 10px 15px 10px;
        }

        /* Specific styles for the Path filter section */
        .modal-filter-sidebar .path-filter-section {
            flex: none; /* Do NOT allow path filter section to grow */
            min-height: auto; /* Allow height to be determined by content */
            border-bottom: 1px solid #ccc;
        }

        /* Styles for the text area within the Path filter */
        .modal-filter-sidebar .path-filter-textarea {
            width: 100%;
            box-sizing: border-box; /* Include padding and border in width */
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: ${variables.fonts.size.base};
            margin-top: 7px;
        }

        /* File list container now holds the table */
        .file-list {
            border-right: none;
            display: flex;
            flex-direction: column; /* Keep column direction for header/container */
            overflow: hidden;
        }

        .file-list h3 {
            margin: ${variables.spacing.xs} ${variables.spacing.sm};
            font-size: ${variables.fonts.size.base};
            font-weight: 600;
        }

        .file-list-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 ${variables.spacing.sm};
            margin-bottom: ${variables.spacing.xs};
        }

        .content-totals {
            display: flex;
            gap: ${variables.spacing.md};
            font-size: 13px;
            font-weight: 600;
            color: ${variables.colors.textSecondary};
        }

        /* File list container takes full width and height in the modal body */
        .modal-body > .file-list {
            width: 100%;
            border-right: none;
        }

        .context-builder-table-container {
            flex: 1;
            overflow-y: auto;
            padding: 0;
        }

        /* Styles for the new Context Builder Table */
        .context-builder-table {
            width: 100%;
            table-layout: fixed;
            border-collapse: collapse;
            font-size: ${variables.fonts.size.base};
            line-height: 1.5;
        }

        .context-builder-table th,
        .context-builder-table td {
            padding: 10px;
            border-bottom: 1px solid ${variables.colors.border};
            text-align: left;
            white-space: nowrap; /* Prevent wrapping in cells */
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .context-builder-table th {
            font-weight: 600;
            color: ${variables.colors.textSecondary};
            background-color: ${variables.colors.background}; /* Light background for header */
            position: sticky; /* Make header sticky */
            top: 0; /* Stick to the top of the scrollable container */
            z-index: 1; /* Ensure header is above table rows */
        }

        /* Column Widths */
        .context-builder-table .col-status { width: 40px; min-width: 30px; text-align: center; padding:0px; } /* Checkbox/Status */
        .context-builder-table .col-repo { width: 175px; min-width: 175px; }
        .context-builder-table .col-name { width: 400px; min-width: 400px; padding-left: 5px; line-height: 1.6; }
        .context-builder-table .col-description { width: auto; min-width: 200px; }
        .context-builder-table .col-directory { width: auto; }
        .context-builder-table .col-size { width: 100px; min-width: 80px; }
        .context-builder-table .col-tokens { width: 90px; min-width: 90px; }
        .context-builder-table .col-committed { width: 120px; min-width: 120px; text-align: center; padding: 0px; }

        /* Style for item name link */
        .context-builder-table .item-name-link {
            color: ${variables.colors.primary};
            text-decoration: none;
            cursor: pointer;
        }

        .context-builder-table .item-name-link:hover {
            text-decoration: underline;
        }

        /* Styles for the Description column content */
        .context-builder-table .col-description .item-purpose {
            width: 100%;
            white-space: normal;
            margin-bottom: 4px;
        }

        .context-builder-table .col-description .item-directory {
            font-size: 0.9em;
            color: #555;
        }

        .context-builder-table .col-description .item-keywords {
            font-size: 0.8em;
            color: #555;
        }

        /* Style for error rows */
        .context-builder-table .context-builder-item-row.error {
            color: ${variables.colors.error};
            background-color: rgba(255, 0, 0, 0.05); /* Subtle red background */
        }

        /* Style for expanded content row */
        .context-builder-table .expanded-content-row td {
            background-color: ${variables.colors.backgroundDark}; /* Dark background for code */
            padding: ${variables.spacing.sm};
        }

        .context-builder-table .expanded-content {
            margin: 0;
            font-family: monospace;
            font-size: ${variables.fonts.size.small};
            white-space: pre-wrap;
            word-break: break-word;
            line-height: 1.5;
            max-height: 500px; /* Limit height of expanded content */
            overflow-y: auto; /* Add scrollbar if content exceeds max height */
        }

        /* Style for the copy icon */
        .context-builder-table .copy-item-icon {
            cursor: pointer;
            opacity: 0; /* Hidden by default */
            transition: opacity 0.2s ease;
        }

        /* Show copy icon on row hover */
        .context-builder-table tbody tr:hover .copy-item-icon {
            opacity: 1;
        }

        /* Optional: Style for copy icon on click/active state */
        .context-builder-table .copy-item-icon:active {
            transform: scale(0.9);
        }

        /* Optional: Style for copy icon when content is copied (e.g., change color briefly) */
        /* .context-builder-table .copy-item-icon.copied { color: green; } */


        .file-row {
            display: flex;
            align-items: center;
            padding: ${variables.spacing.xs} ${variables.spacing.sm};
            border-radius: ${variables.borderRadius};
            cursor: pointer;
            transition: background-color 0.2s ease;
        }

        .file-row:hover {
            background-color: ${variables.colors.backgroundHover};
        }

        .file-row.highlighted {
            background-color: ${variables.colors.backgroundSelected};
        }

        .file-row.error {
            color: ${variables.colors.error};
        }

        .status-icon {
            margin-right: ${variables.spacing.sm};
            font-size: ${variables.fonts.size.base};
            width: 16px;
            text-align: center;
        }

        .file-name {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: ${variables.spacing.sm};
        }

        .file-info {
            font-size: ${variables.fonts.size.small};
            color: ${variables.colors.textSecondary};
        }

        .modal-footer {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-top: 1px solid #aaa;
        }

        /* Containers for left and right aligned buttons in the footer */
        .modal-footer .footer-left-container,
        .modal-footer .footer-right-container {
            display: flex;
            gap: ${variables.spacing.sm};
            align-items: center; /* Vertically center items */
            /* Allow left container to take available space */
            /* Prevent shrinking below content size */
            flex-shrink: 0;
        }

        /* Styles for the new save selection controls container */
        .modal-footer .save-controls-container {
            display: flex;
            align-items: center;
            gap: ${variables.spacing.sm};
            flex-wrap: wrap; /* Allow wrapping on smaller screens */
        }

        /* Styles for the new save name input */
        .modal-footer .save-name-input {
            width: 300px;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: ${variables.borderRadius};
            font-size: 13px;
            box-sizing: border-box; /* Include padding and border in the element's total width and height */
        }

        .modal-footer .save-name-input:focus {
            outline: none; /* Remove default blue outline */
            border-color: ${variables.colors.primary}; /* Optional: Add a custom focus style */
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25); /* Optional: Add a subtle shadow on focus */
        }

        /* Styles for the new save selection button */
        .modal-footer .save-selection-button {
            min-width: 120px;
        }

        .modal-footer .secondary-button-disabled {
            color: #aaa;
            pointer-events: none;
        }

        /* Styles for the error message container */
        .modal-footer .error-message-container {
            font-size: 12px;
            color: ${variables.colors.error}; /* Red color for errors */
            margin-top: 4px; /* Space above the message */
            width: 100%; /* Take full width */
        }

        .primary-button {
            min-width: 65px;
            padding: 8px 12px;
            border-radius: ${variables.borderRadius};
            border: none;
            background-color: ${variables.colors.primary};
            color: white;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
        }

        .primary-button:hover {
            background-color: ${variables.colors.so};
        }

        .primary-button-disabled {
            pointer-events: none;
            opacity: .5;
        }

        .secondary-button {
            min-width: 65px;
            padding: 8px 12px;
            border-radius: ${variables.borderRadius};
            border: 1px solid ${variables.colors.border};
            background-color: white;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
        }

        .secondary-button:hover {
            background-color: ${variables.colors.backgroundHover};
        }

        .ai-button-container {
            display: flex;
            align-items: center;
            gap: ${variables.spacing.sm}; /* Space between button and separator */
        }

        .ai-button {
            border: 1px solid #666;
        }

        .ai-button-disabled {
            border: 1px solid #ccc;
            pointer-events: none;
            color: #aaa;
        }

        .ai-button:hover {
            /* disable distinct color for now
             * background-color: #388E3C; /* Darker green on hover */
             * border-color: #388E3C;
             */
        }

        /* Styles to disable inputs within the filter sidebar when it has the 'filters-disabled' class */
        .modal-filter-sidebar.filters-disabled {
            pointer-events: none; /* Disable all pointer events */
            opacity: 0.7; /* Visually indicate disabled state */
        }

        .modal-filter-sidebar.filters-disabled input,
        .modal-filter-sidebar.filters-disabled textarea {
            cursor: not-allowed; /* Change cursor for disabled inputs */
            /* Add other styles like background-color if needed */
        }

        .modal-search-and-filter-stats {
            padding: 10px 10px 3px 10px;
            font-weight: 600;
            min-height: 20px;
            color: ${variables.colors.textSecondary};
        }

        .modal-search-and-filter-message {
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #ddd;
            min-height: 20px;
            color: ${variables.colors.textSecondary};
        }

        /* Wrapper for Search Input and Clear Button */
        .search-input-wrapper {
            display: flex; /* Use flexbox to arrange input and button */
            align-items: center; /* Vertically align input and button */
            flex-grow: 1; /* Allow wrapper to take up available space */
            position: relative; /* Needed for absolute positioning of the clear button */
            font-weight: normal;
        }

        /* Search Input Field */
        .context-builder-search-input {
            flex-grow: 1; /* Allow input to take up available space within the wrapper */
            padding: 6px 25px 6px 10px; /* Add right padding for the clear button */
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: ${variables.fonts.size.base};
            box-sizing: border-box; /* Include padding and border in element's total width */
            outline: none; /* Remove default outline */
            transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        .context-builder-search-input:focus {
            border-color: ${variables.colors.primary};
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        /* Clear Search Button */
        .clear-search-button {
            position: absolute; /* Position absolutely within the wrapper */
            right: 8px; /* Position from the right edge of the wrapper */
            top: 50%; /* Align vertically */
            transform: translateY(-50%); /* Adjust for vertical centering */
            background: none;
            border: none;
            cursor: pointer;
            font-size: 14px;
            color: #999; /* Grey color for the 'x' */
            padding: 0;
            line-height: 1; /* Ensure consistent vertical alignment */
            visibility: hidden; /* Hidden by default */
            pointer-events: none; /* Disable pointer events when hidden */
            margin-right: 2px;
        }

        /* Search Spinner Container */
        .search-spinner-container {
            position: absolute; /* Position absolutely within the wrapper */
            right: 8px; /* Position from the right edge of the wrapper */
            top: 25px; /* Align vertically */
            transform: translateY(-50%); /* Adjust for vertical centering */
            display: flex; /* Use flex to center the SVG inside */
            align-items: center;
            justify-content: center;
            width: 16px; /* Match SVG size */
            height: 16px; /* Match SVG size */
            fill: #666;
        }

        /* Spinner Animation */
        @keyframes spinning {
            from { transform: translateY(-50%) rotate(0deg); }
            to { transform: translateY(-50%) rotate(360deg); }
        }

        /* Apply animation to the SVG when the 'spinning' class is added */
        .search-spinner-container svg.spinning {
            animation: spinning 1s linear infinite; /* 1 second duration, linear timing, infinite loop */
        }

        .language-filter-list {
            margin-top: 5px;
            line-height: 2;
        }

        /* Styles for the new re-usable Filter Table component */
        .filter-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            font-size: .9em;
        }

        .filter-table th,
        .filter-table td {
            padding: 12px;
            border-bottom: 1px solid ${variables.colors.border};
            text-align: left;
            white-space: nowrap; /* Prevent wrapping */
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .filter-table th {
            font-weight: 600;
            color: ${variables.colors.textSecondary};
            background-color: ${variables.colors.background}; /* Light background for header */
        }

        /* Column Widths for Filter Table */
        .filter-table .col-checkbox {
            width: 30px;
            min-width: 30px;
            padding: 0px;
            text-align: center;
            text-overflow: none;
        }
        .filter-table .col-name { width: auto; padding-left: 5px; } /* Takes remaining space */
        .filter-table .col-items { width: 60; min-width: 60px; text-align: right; } /* Align count to the right */

        /* Styles for the display mode buttons */
        .filter-table-display-button {
            background: none;
            border: none;
            padding: 4px 0px;
            cursor: pointer;
            font-size: 13px;
            color: black;
            transition: color 0.2s ease;
        }

        .filter-table-display-button:hover:not(:disabled) {
            color: black;
        }

        .filter-table-display-button.active {
            color: black;
            font-weight: 600; /* Make active button bold */
        }

        .filter-table-input {
            border: 0px;
        }

        .filter-table-reset-button {
            background: none;
            border: none;
            padding: 4px 8px;
            cursor: pointer;
            font-size: 13px;
            color: ${variables.colors.primary}; /* Use primary color for link style */
            text-decoration: none;
            transition: color 0.2s ease;
        }
    `,metadataInsightsModal:`
        .metadata-insights-modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
            z-index: 100000002; /* Above the context builder modal but below metadata-insights-modal */
        }

        .metadata-insights-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 95vw;
            height: 95vh;
            background-color: white;
            border: 1px solid #666;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            z-index: 100000003; /* Higher than context-builder-modal */
            overflow: hidden;
        }

        .metadata-insights-modal .modal-body {
            flex: 1; /* Allow modal body to take remaining height */
            display: flex;
            flex-direction: column;
            padding: 15px; /* Padding around the grid */
            overflow: hidden; /* Ensure content area handles its own scrolling */
        }

        .metadata-insights-modal .insights-content-area {
            flex: 1; /* Allow content area to grow and fill modal body */
            display: grid;
            /* grid-template-columns and grid-template-rows are set by JS */
            gap: 20px; /* Gap between grid items */
            overflow-y: auto; /* Enable scrolling for the grid container itself */
            padding-right: 1px; /* Small padding to ensure rightmost border is visible if scrollbar appears */
            padding-bottom: 1px; /* Small padding to ensure bottommost border is visible if scrollbar appears */
        }

        .insights-table-wrapper {
            border: 1px solid #ddd; /* Default border on all sides */
            border-radius: 5px;
            display: flex;
            flex-direction: column; /* Ensure FilterTable fills its wrapper */
            min-height: 300px;
            overflow: auto;
        }
    `};module.exports=selectionManagement;
