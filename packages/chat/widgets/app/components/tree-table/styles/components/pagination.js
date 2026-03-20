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

let variables=require("../base/variables"),pagination={pagination:`
        .pagination-controls {
            display: flex;
            align-items: center;
            gap: ${variables.spacing.xl};
            margin-top: ${variables.spacing.xl};
            padding: ${variables.spacing.sm};
            border-radius: 4px;
        }

        .pagination-buttons {
            display: flex;
            gap: ${variables.spacing.sm};
            align-items: center;
        }

        .page-button {
            padding: 6px ${variables.spacing.md};
            border: 1px solid ${variables.colors.border};
            border-radius: 4px;
            background-color: #fff;
            color: ${variables.colors.primary};
            cursor: pointer;
            font-size: ${variables.fonts.size.base};
            line-height: 1.5;
            transition: all 0.2s;
        }

        .page-button:hover:not(:disabled) {
            background-color: ${variables.colors.border};
            border-color: ${variables.colors.border};
        }

        .page-button.active {
            background-color: ${variables.colors.primary};
            color: #fff;
            border-color: ${variables.colors.primary};
        }

        .page-button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
            background-color: ${variables.colors.background};
        }

        .page-ellipsis {
            padding: 6px ${variables.spacing.sm};
            color: ${variables.colors.textMuted};
        }

        .page-size-selector {
            display: flex;
            align-items: center;
            gap: ${variables.spacing.sm};
        }

        .page-size-select {
            padding: 4px ${variables.spacing.md};
            border: 1px solid ${variables.colors.border};
            border-radius: 4px;
            background-color: #fff;
            cursor: pointer;
            font-size: ${variables.fonts.size.base};
        }

        .page-size-select:hover {
            border-color: ${variables.colors.primary};
        }

        .page-info {
            color: ${variables.colors.textMuted};
            font-size: ${variables.fonts.size.base};
        }
    `};module.exports=pagination;
