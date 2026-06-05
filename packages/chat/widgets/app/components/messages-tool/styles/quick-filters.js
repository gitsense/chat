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

let quickFiltersStyles=`
.gs-quick-filters {
    padding: 15px;
    border-top: 1px solid #eee;
    display: flex;
    align-items: center;
}

.gs-quick-search-container {
    flex: 1;
    margin-right: 15px;
}

.gs-quick-type-filters-container {
    flex-shrink: 0;
}

.gs-quick-type-filters-container .gs-type-filters {
    display: flex;
    gap: 10px;
    margin-left: 10px;
}

.gs-quick-type-filters-container .gs-type-filters label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
}

/* Search input styles in quick filters */
.gs-quick-search-container .gsc-search-input-wrapper {
    border: none;
    width: 100%;
}

.gs-quick-search-container .gsc-search-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
}

.gs-quick-search-container .gsc-search-input:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}
`;module.exports=quickFiltersStyles;
