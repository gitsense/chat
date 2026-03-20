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

let metricCardsStyles=`
.gsc-metric-cards-container {
    display: flex;
    gap: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
    flex-wrap: wrap;
}

.gsc-metric-card {
    width: 180px;
    min-width: 150px;
    max-width: 200px;
    padding: 15px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: #fff;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
}

.gsc-metric-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.gsc-metric-card-active {
    border-color: #aaa;
    background-color: #fefefe;
}

.gsc-metric-card-disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.gsc-metric-card-disabled:hover {
    transform: none;
    box-shadow: none;
}

.gsc-metric-card-checkbox {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 14px;
    height: 14px;
    cursor: pointer;
}

.gsc-metric-card-icon {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 16px;
    height: 16px;
    opacity: 0.7;
    color: #6c757d;
}

.gsc-metric-card-value {
    font-size: 30px;
    font-weight: 600;
    line-height: 1;
    color: #495057;
}

.gsc-metric-card-value-suffix {
    font-size: .7em;
}

.gsc-metric-card-label {
    font-size: 14px;
    font-weight: 600;
    color: #495057;
}

.gsc-metric-card-count {
    font-size: 12px;
    color: #6c757d;
}

.gsc-metric-cards-actions {
    display: flex;
    gap: 10px;
    margin-left: auto;
    align-self: flex-end;
}

.gsc-metric-cards-action-link {
    font-size: 0.9em;
    text-decoration: none;
    color: #007bff;
    cursor: pointer;
}

.gsc-metric-cards-action-link:hover {
    text-decoration: underline;
}
`;module.exports=metricCardsStyles;
