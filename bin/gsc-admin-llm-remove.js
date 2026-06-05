#!/usr/bin/env node

/*
 * Component: GitSense Chat Admin LLM Remove Commands
 * Block-UUID: 4c75e5f7-9ba7-4dcc-8e15-1b3234be7576
 * Parent-UUID: N/A
 * Version: 1.0.0
 * Description: Handles the 'remove provider', 'remove model', and 'remove divider' commands for the LLM admin CLI.
 * Language: JavaScript
 * Created-at: 2026-05-31T00:50:00.000Z
 * Authors: GLM-4.7 (v1.0.0)
 */


const {
    readChatConfig,
    writeChatConfig,
    confirmAction,
    promptForListSelection,
    findItem,
    parseIdentifier
} = require('../lib/utils-esm');
const { displayModels, selectItemFromList } = require('./gsc-admin-llm-helpers');

module.exports = (program) => {
    const removeCommand = program.command('remove')
        .description('Remove LLM models, providers, or dividers.')
        .action(() => removeCommand.help());

    removeCommand
        .command('provider [name]')
        .description('Remove an LLM provider.')
        .action(async (name) => {
            try {
                const config = await readChatConfig();
                let targetProvider;
                let targetIndex;

                if (name) {
                    const found = findItem(config.providers, name);
                    if (!found) {
                        console.log(`! Provider '${name}' not found.`);
                        return;
                    }
                    targetProvider = found.item;
                    targetIndex = found.index;
                } else {
                    const selected = await selectItemFromList(config.providers, 'provider');
                    if (!selected) return;
                    targetProvider = selected.item;
                    targetIndex = selected.index;
                }

                // Check for dependencies
                const dependentModels = config.models.filter(model =>
                    model.providers && model.providers[0] && model.providers[0].name === targetProvider.name
                );

                if (dependentModels.length > 0) {
                    console.log(`! Cannot remove provider '${targetProvider.name}'. It is currently used by the following models:`);
                    dependentModels.forEach(model => console.log(`  - ${model.name}`));
                    console.log('! Please remove or update these models first.');
                    return;
                }

                const confirmed = await confirmAction(`? Are you sure you want to remove provider '${targetProvider.name}'?`);

                if (confirmed) {
                    config.providers.splice(targetIndex, 1);
                    await writeChatConfig(config);
                } else {
                    console.log('Provider removal cancelled.');
                }

            } catch (error) {
                console.error(`Error removing provider: ${error.message}`);
                process.exit(1);
            }
        });

    removeCommand
        .command('model [name_or_index]')
        .description('Remove an LLM model.')
        .action(async (nameOrIndex) => {
            try {
                const config = await readChatConfig();
                let targetModel;
                let targetIndex;

                if (nameOrIndex !== undefined) {
                    const identifier = parseIdentifier(nameOrIndex);
                    const found = findItem(config.models, identifier);
                    if (!found || found.item.name === '---------') {
                        console.log(`! Model '${nameOrIndex}' not found or is a divider. Use 'remove divider' for dividers.`);
                        return;
                    }
                    targetModel = found.item;
                    targetIndex = found.index;
                } else {
                    const modelsOnly = config.models.filter(m => m.name !== '---------');
                    if (modelsOnly.length === 0) {
                        console.log('No models to remove.');
                        return;
                    }
                    const choices = modelsOnly.map((model, index) => ({
                        name: `${index}: ${model.name} (${model.providers[0]?.name || 'N/A'})`,
                        value: model.name,
                    }));
                    const selectedName = await promptForListSelection('? Select the model to remove:', choices);
                    const found = findItem(config.models, selectedName);
                    if (!found) {
                        console.log('Model not found. Aborting removal.');
                        return;
                    }
                    targetModel = found.item;
                    targetIndex = found.index;
                }

                const confirmed = await confirmAction(`? Are you sure you want to remove model '${targetModel.name}'?`);

                if (confirmed) {
                    config.models.splice(targetIndex, 1);
                    await writeChatConfig(config);
                } else {
                    console.log('Model removal cancelled.');
                }

            } catch (error) {
                console.error(`Error removing model: ${error.message}`);
                process.exit(1);
            }
        });

    removeCommand
        .command('divider [index]')
        .description('Remove a divider from the model list.')
        .option('--all', 'Remove all dividers.')
        .action(async (index, options) => {
            try {
                const config = await readChatConfig();
                let models = [...(config.models || [])];

                if (options.all) {
                    const confirmed = await confirmAction('? Are you sure you want to remove ALL dividers?');
                    if (confirmed) {
                        models = models.filter(item => item.name !== '---------');
                        config.models = models;
                        await writeChatConfig(config);
                    } else {
                        console.log('Removal of all dividers cancelled.');
                    }
                    return;
                }

                let targetIndex;
                if (index !== undefined) {
                    targetIndex = parseInt(index);
                    if (isNaN(targetIndex) || targetIndex < 0 || targetIndex >= models.length || models[targetIndex].name !== '---------') {
                        console.log(`! Invalid index or item at index ${index} is not a divider.`);
                        return;
                    }
                } else {
                    const dividers = models.map((item, idx) => ({
                            item,
                            index: idx
                        }))
                        .filter(entry => entry.item.name === '---------');
                    if (dividers.length === 0) {
                        console.log('No dividers to remove.');
                        return;
                    }
                    const choices = dividers.map(entry => ({
                        name: `${entry.index}: ${entry.item.name}`,
                        value: entry.index,
                    }));
                    const selectedIndex = await promptForListSelection('? Select the divider to remove:', choices);
                    targetIndex = selectedIndex;
                }

                const confirmed = await confirmAction(`? Confirm removing the divider at index ${targetIndex}?`);

                if (confirmed) {
                    models.splice(targetIndex, 1);
                    config.models = models;
                    await writeChatConfig(config);
                } else {
                    console.log('Divider removal cancelled.');
                }

            } catch (error) {
                console.error(`Error removing divider: ${error.message}`);
                process.exit(1);
            }
        });
};
