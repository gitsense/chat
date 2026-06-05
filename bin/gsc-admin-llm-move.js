#!/usr/bin/env node

/*
 * Component: GitSense Chat Admin LLM Move Commands
 * Block-UUID: cd82e2ce-112a-4a8b-92fe-5e0dd41833ec
 * Parent-UUID: N/A
 * Version: 1.0.0
 * Description: Handles the 'move model', 'move divider', and interactive 'order models' commands for the LLM admin CLI.
 * Language: JavaScript
 * Created-at: 2026-05-31T00:50:13.000Z
 * Authors: GLM-4.7 (v1.0.0)
 */


const {
    readChatConfig,
    writeChatConfig,
    confirmAction,
    promptForInput,
    promptForListSelection,
    findItem,
    insertItem,
    moveItem,
    parseIdentifier
} = require('../lib/utils-esm');
const { displayModels, getPositionInput } = require('./gsc-admin-llm-helpers');

module.exports = (program) => {
    const moveCommand = program.command('move')
        .description('Move LLM models or dividers to a new position.')
        .action(() => moveCommand.help());

    moveCommand
        .command('model [name_or_index]')
        .description('Move an LLM model to a new position.')
        .option('-t, --to-index <number>', 'Specify the 0-based target index.')
        .option('-u, --up', 'Move the model one position up.')
        .option('-d, --down', 'Move the model one position down.')
        .option('-b, --before <target_name_or_index>', 'Move the model before a specific model/divider.')
        .option('-a, --after <target_name_or_index>', 'Move the model after a specific model/divider.')
        .action(async (nameOrIndex, options) => {
            try {
                const config = await readChatConfig();
                let models = [...(config.models || [])];

                let sourceItem;
                let sourceIndex;

                if (nameOrIndex !== undefined) {
                    const identifier = parseIdentifier(nameOrIndex);
                    const found = findItem(models, identifier);
                    if (!found || found.item.name === '---------') {
                        console.log(`! Model '${nameOrIndex}' not found or is a divider. Use 'move divider' for dividers.`);
                        return;
                    }
                    sourceItem = found.item;
                    sourceIndex = found.index;
                } else {
                    const modelsOnly = models.filter(m => m.name !== '---------');
                    if (modelsOnly.length === 0) {
                        console.log('No models to move.');
                        return;
                    }
                    const choices = modelsOnly.map((model, index) => ({
                        name: `${index}: ${model.name} (${model.providers[0]?.name || 'N/A'})`,
                        value: model.name,
                    }));
                    const selectedName = await promptForListSelection('? Select the model to move:', choices);
                    const found = findItem(models, selectedName);
                    if (!found) {
                        console.log('Model not found. Aborting move.');
                        return;
                    }
                    sourceItem = found.item;
                    sourceIndex = found.index;
                }

                let targetIndex;
                if (options.toIndex !== undefined) {
                    targetIndex = parseInt(options.toIndex);
                } else if (options.up) {
                    targetIndex = sourceIndex - 1;
                } else if (options.down) {
                    targetIndex = sourceIndex + 1;
                } else if (options.before) {
                    const ref = findItem(models, parseIdentifier(options.before));
                    if (!ref) {
                        console.log(`! Reference item '${options.before}' not found.`);
                        return;
                    }
                    targetIndex = ref.index;
                } else if (options.after) {
                    const ref = findItem(models, parseIdentifier(options.after));
                    if (!ref) {
                        console.log(`! Reference item '${options.after}' not found.`);
                        return;
                    }
                    targetIndex = ref.index + 1;
                } else {
                    // If no options, prompt interactively for position
                    console.log(`\nMoving model: '${sourceItem.name}' (current index: ${sourceIndex})`);
                    displayModels(models);
                    const positionInput = await getPositionInput(models.length);
                    // Temporarily move to calculate targetIndex
                    const tempModels = [...models];
                    moveItem(tempModels, sourceIndex, sourceIndex); // Dummy move to get a mutable array
                    targetIndex = insertItem(tempModels, sourceItem, positionInput, models);
                    tempModels.splice(sourceIndex > targetIndex ? sourceIndex + 1 : sourceIndex, 1);
                    targetIndex = tempModels.indexOf(sourceItem);
                }

                // Validate targetIndex
                if (targetIndex < 0 || targetIndex >= models.length + (targetIndex === models.length ? 1 : 0)) {
                    console.log('! Invalid target position.');
                    return;
                }

                // Perform the move
                moveItem(models, sourceIndex, targetIndex);

                console.log('\n--- Preview of New Order ---');
                displayModels(models);
                console.log('----------------------------');

                const confirmed = await confirmAction(`? Confirm moving '${sourceItem.name}' to index ${targetIndex}?`);

                if (confirmed) {
                    config.models = models;
                    await writeChatConfig(config);
                } else {
                    console.log('Model move cancelled.');
                }

            } catch (error) {
                console.error(`Error moving model: ${error.message}`);
                process.exit(1);
            }
        });

    moveCommand
        .command('divider [index]')
        .description('Move a divider to a new position.')
        .option('-t, --to-index <number>', 'Specify the 0-based target index.')
        .option('-u, --up', 'Move the divider one position up.')
        .option('-d, --down', 'Move the divider one position down.')
        .option('-b, --before <target_name_or_index>', 'Move the divider before a specific model/divider.')
        .option('-a, --after <target_name_or_index>', 'Move the divider after a specific model/divider.')
        .action(async (index, options) => {
            try {
                const config = await readChatConfig();
                let models = [...(config.models || [])];

                let sourceItem;
                let sourceIndex;

                if (index !== undefined) {
                    sourceIndex = parseInt(index);
                    if (isNaN(sourceIndex) || sourceIndex < 0 || sourceIndex >= models.length || models[sourceIndex].name !== '---------') {
                        console.log(`! Invalid index or item at index ${index} is not a divider.`);
                        return;
                    }
                    sourceItem = models[sourceIndex];
                } else {
                    const dividers = models.map((item, idx) => ({
                            item,
                            index: idx
                        }))
                        .filter(entry => entry.item.name === '---------');
                    if (dividers.length === 0) {
                        console.log('No dividers to move.');
                        return;
                    }
                    const choices = dividers.map(entry => ({
                        name: `${entry.index}: ${entry.item.name}`,
                        value: entry.index,
                    }));
                    const selectedIndex = await promptForListSelection('? Select the divider to move:', choices);
                    sourceIndex = selectedIndex;
                    sourceItem = models[sourceIndex];
                }

                let targetIndex;
                if (options.toIndex !== undefined) {
                    targetIndex = parseInt(options.toIndex);
                } else if (options.up) {
                    targetIndex = sourceIndex - 1;
                } else if (options.down) {
                    targetIndex = sourceIndex + 1;
                } else if (options.before) {
                    const ref = findItem(models, parseIdentifier(options.before));
                    if (!ref) {
                        console.log(`! Reference item '${options.before}' not found.`);
                        return;
                    }
                    targetIndex = ref.index;
                } else if (options.after) {
                    const ref = findItem(models, parseIdentifier(options.after));
                    if (!ref) {
                        console.log(`! Reference item '${options.after}' not found.`);
                        return;
                    }
                    targetIndex = ref.index + 1;
                } else {
                    console.log(`\nMoving divider: (current index: ${sourceIndex})`);
                    displayModels(models);
                    const positionInput = await getPositionInput(models.length);
                    const tempModels = [...models];
                    moveItem(tempModels, sourceIndex, sourceIndex); // Dummy move to get a mutable array
                    targetIndex = insertItem(tempModels, sourceItem, positionInput, models);
                    tempModels.splice(sourceIndex > targetIndex ? sourceIndex + 1 : sourceIndex, 1);
                    targetIndex = tempModels.indexOf(sourceItem);
                }

                // Validate targetIndex
                if (targetIndex < 0 || targetIndex >= models.length + (targetIndex === models.length ? 1 : 0)) {
                    console.log('! Invalid target position.');
                    return;
                }

                // Perform the move
                moveItem(models, sourceIndex, targetIndex);

                console.log('\n--- Preview of New Order ---');
                displayModels(models);
                console.log('----------------------------');

                const confirmed = await confirmAction(`? Confirm moving divider from index ${sourceIndex} to index ${targetIndex}?`);

                if (confirmed) {
                    config.models = models;
                    await writeChatConfig(config);
                } else {
                    console.log('Divider move cancelled.');
                }

            } catch (error) {
                console.error(`Error moving divider: ${error.message}`);
                process.exit(1);
            }
        });

    // --- Interactive Order Models Command ---
    program
        .command('order models')
        .description('Interactively reorder LLM models and dividers with live preview.')
        .action(async () => {
            try {
                const config = await readChatConfig();
                let models = [...(config.models || [])];

                console.log('Entering interactive reordering mode.');
                console.log('Type commands like:');
                console.log('  - `move model <name_or_index> to <target_index>`');
                console.log('  - `move divider <index> up`');
                console.log('  - `add divider after <name_or_index>`');
                console.log('  - `remove model <name_or_index>`');
                console.log('Type `done` to apply changes, or `cancel` to exit without saving.');

                let running = true;
                while (running) {
                    displayModels(models);

                    const commandInput = await promptForInput('? Enter command (or `done`/`cancel`):');

                    if (commandInput.toLowerCase() === 'done') {
                        running = false;
                        break;
                    }
                    if (commandInput.toLowerCase() === 'cancel') {
                        console.log('Interactive reordering cancelled. No changes will be saved.');
                        return;
                    }

                    try {
                        const parts = commandInput.split(' ').filter(p => p.length > 0);
                        if (parts.length < 2) {
                            console.log('! Invalid command format. Please try again.');
                            continue;
                        }

                        const action = parts[0].toLowerCase();
                        const itemType = parts[1].toLowerCase();
                        const identifier = parseIdentifier(parts[2]);
                        const targetPosition = parts.slice(3).join(' ');

                        let sourceIndex, targetIndex;
                        let foundItem;

                        switch (action) {
                            case 'move':
                                foundItem = findItem(models, identifier);
                                if (!foundItem) {
                                    console.log(`! Item '${identifier}' not found.`);
                                    break;
                                }
                                sourceIndex = foundItem.index;

                                if (targetPosition.toLowerCase().startsWith('to ')) {
                                    targetIndex = parseInt(targetPosition.substring(3));
                                } else if (targetPosition.toLowerCase() === 'up') {
                                    targetIndex = sourceIndex - 1;
                                } else if (targetPosition.toLowerCase() === 'down') {
                                    targetIndex = sourceIndex + 1;
                                } else if (targetPosition.toLowerCase().startsWith('before ')) {
                                    const refIdentifier = parseIdentifier(targetPosition.substring(7));
                                    const ref = findItem(models, refIdentifier);
                                    if (!ref) {
                                        console.log(`! Reference item '${refIdentifier}' not found.`);
                                        break;
                                    }
                                    targetIndex = ref.index;
                                } else if (targetPosition.toLowerCase().startsWith('after ')) {
                                    const refIdentifier = parseIdentifier(targetPosition.substring(6));
                                    const ref = findItem(models, refIdentifier);
                                    if (!ref) {
                                        console.log(`! Reference item '${refIdentifier}' not found.`);
                                        break;
                                    }
                                    targetIndex = ref.index + 1;
                                } else {
                                    console.log('! Invalid move target. Use `to <num>`, `up`, `down`, `before <name_or_index>`, `after <name_or_index>`.');
                                    break;
                                }

                                if (targetIndex < 0 || targetIndex >= models.length + (targetIndex === models.length ? 1 : 0)) {
                                    console.log('! Invalid target position.');
                                    break;
                                }
                                moveItem(models, sourceIndex, targetIndex);
                                console.log(`✓ Moved ${itemType} '${foundItem.item.name || foundItem.item.name}' from ${sourceIndex} to ${targetIndex}.`);
                                break;

                            case 'add':
                                if (itemType === 'divider') {
                                    const newDivider = { name: '---------' };
                                    insertItem(models, newDivider, targetPosition, models);
                                    console.log('✓ Added divider.');
                                } else {
                                    console.log('! Only `add divider` is supported in interactive mode. Use `gsc-admin llm add model` for models.');
                                }
                                break;

                            case 'remove':
                                foundItem = findItem(models, identifier);
                                if (!foundItem) {
                                    console.log(`! Item '${identifier}' not found.`);
                                    break;
                                }
                                if (itemType === 'model' && foundItem.item.name === '---------') {
                                    console.log('! Cannot remove a divider using `remove model`. Use `remove divider`.');
                                    break;
                                }
                                if (itemType === 'divider' && foundItem.item.name !== '---------') {
                                    console.log('! Cannot remove a model using `remove divider`. Use `remove model`.');
                                    break;
                                }
                                models.splice(foundItem.index, 1);
                                console.log(`✓ Removed ${itemType} '${foundItem.item.name || foundItem.item.name}'.`);
                                break;

                            default:
                                console.log('! Unknown command. Supported actions: `move`, `add`, `remove`.');
                        }
                    } catch (error) {
                        console.error(`! Error executing command: ${error.message}`);
                    }
                }

                console.log('\n--- Final Proposed Order ---');
                displayModels(models);
                console.log('----------------------------');

                const confirmed = await confirmAction('? Confirm applying all changes to chat-config.json?');

                if (confirmed) {
                    config.models = models;
                    await writeChatConfig(config);
                } else {
                    console.log('Changes discarded. No changes made to chat-config.json.');
                }

            } catch (error) {
                console.error(`Error in interactive reordering: ${error.message}`);
                process.exit(1);
            }
        });
};
