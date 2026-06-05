#!/usr/bin/env node

/*
 * Component: GitSense Chat Admin LLM Helpers
 * Block-UUID: abffef46-b2b9-4d9b-8071-274a829e49f6
 * Parent-UUID: N/A
 * Version: 1.0.0
 * Description: Shared helper functions used across the LLM admin command modules. Extracted from gsc-admin-llm to support modular splitting.
 * Language: JavaScript
 * Created-at: 2026-05-31T00:28:32.000Z
 * Authors: GLM-4.7 (v1.0.0)
 */


/**
 * Displays a formatted list of models and dividers.
 * @param {Array<object>} models - The models array from chat-config.json.
 */
function displayModels(models) {
    if (!models || models.length === 0) {
        console.log('No models or dividers configured.');
        return;
    }
    console.log('\nModels and Dividers (Current Order):');
    models.forEach((item, index) => {
        if (item.name === '---------') {
            console.log(`${index}: ${item.name}`);
        } else {
            const providerName = item.providers && item.providers[0] ? ` (${item.providers[0].name})` : '';
            const isDefault = item.default ? ' [default]' : '';
            console.log(`${index}: ${item.name}${providerName}${isDefault}`);
        }
    });
    console.log('');
}

/**
 * Prompts user to select an item (model or divider) by number from a list.
 * @param {Array<object>} items - The array of items to choose from.
 * @param {string} itemType - 'model' or 'divider'.
 * @returns {Promise<{item: object, index: number}|null>} The selected item and its index, or null.
 */
async function selectItemFromList(items, itemType) {
    if (!items || items.length === 0) {
        console.log(`No ${itemType}s found.`);
        return null;
    }

    const { promptForListSelection } = require('../lib/utils-esm');
    displayModels(items); // Show the full list for context

    const choices = items.map((item, index) => ({
        name: item.name === '---------' ? `${index}: ${item.name}` : `${index}: ${item.name}`,
        value: index,
    }));

    const selectedIndex = await promptForListSelection(`Select the ${itemType} by number:`, choices);
    const selectedItem = items[selectedIndex];

    if (!selectedItem) {
        console.log(`No ${itemType} selected. Operation cancelled.`);
        return null;
    }
    return {
        item: selectedItem,
        index: selectedIndex
    };
}

/**
 * Prompts user for a position input and parses it.
 * @param {number} currentArrayLength - The current length of the array for 'end' calculation.
 * @param {boolean} [optional=false] - Whether the position is optional.
 * @returns {Promise<string|number>} The parsed position.
 */
async function getPositionInput(currentArrayLength, optional = false) {
    const { promptForInput } = require('../lib/utils-esm');
    
    const positionInput = await promptForInput(
        '? Where would you like to place this item? (Optional)\n  (Enter 0-based index, \'top\', \'end\', \'before <num>\', \'after <num>\')\n  (Press Enter to add to the bottom of the list)',
        (input) => {
            if (input === '' && optional) return true;
            if (input === '') return true; // optional is always true for our usage
            const parts = input.toLowerCase().split(' ');
            if (parts[0] === 'top' || parts[0] === 'end') return true;
            if ((parts[0] === 'before' || parts[0] === 'after') && parts[1]) {
                const num = parseInt(parts[1]);
                return !isNaN(num) && num >= 0 && num < currentArrayLength;
            }
            const num = parseInt(input);
            return !isNaN(num) && num >= 0 && num <= currentArrayLength;
        },
        ''
    );

    if (positionInput === '') {
        return 'end'; // Default to end if optional input is empty
    }
    return positionInput;
}

module.exports = {
    displayModels,
    selectItemFromList,
    getPositionInput
};
