#!/usr/bin/env node

/*
 * Component: GitSense Chat Admin LLM Edit Commands
 * Block-UUID: b739e47e-43f9-46ab-8156-09f6e2fd84ef
 * Parent-UUID: N/A
 * Version: 1.0.0
 * Description: Handles the 'edit provider', 'edit model', and 'set-default-model' commands for the LLM admin CLI.
 * Language: JavaScript
 * Created-at: 2026-05-31T00:47:47.000Z
 * Authors: GLM-4.7 (v1.0.0)
 */


const {
    readChatConfig,
    writeChatConfig,
    confirmAction,
    promptForInput,
    promptForListSelection,
    promptForNumber,
    findItem,
    parseIdentifier
} = require('../lib/utils-esm');
const { displayModels, selectItemFromList } = require('./gsc-admin-llm-helpers');

module.exports = (program) => {
    // --- Edit Command Group ---
    const editCommand = program.command('edit')
        .description('Edit LLM models, providers, or dividers.')
        .action(() => editCommand.help());

    editCommand
        .command('provider [name]')
        .description('Edit an LLM provider.')
        .option('-n, --name <name>', 'New display name for the provider')
        .option('-k, --api-key-env <name>', 'New API key environment variable name')
        .option('-u, --base-url <url>', 'New base URL for the API endpoint')
        .action(async (name, options) => {
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

                console.log(`\nEditing provider: ${targetProvider.name}`);
                console.log('Current values:');
                console.log(`  Name:          ${targetProvider.name}`);
                console.log(`  API Key Env:   ${targetProvider.apiKeyName}`);
                console.log(`  Base URL:      ${targetProvider.baseURL || 'N/A'}`);
                console.log('');

                // Get new values (use flags if provided, otherwise prompt)
                const newName = options.name || await promptForInput('? Enter new display name (leave blank to keep current):', () => true, targetProvider.name);
                const newApiKeyEnv = options['api-key-env'] || await promptForInput('? Enter new API key environment variable (leave blank to keep current):', () => true, targetProvider.apiKeyName);
                const newBaseURL = options['base-url'] || await promptForInput('? Enter new base URL (leave blank to keep current):', (input) => {
                    if (input === '') return true;
                    try {
                        new URL(input);
                        return true;
                    } catch (e) {
                        return 'Please enter a valid URL or leave empty.';
                    }
                }, targetProvider.baseURL || '');

                // Check if any changes were made
                const hasChanges = newName !== targetProvider.name ||
                                  newApiKeyEnv !== targetProvider.apiKeyName ||
                                  newBaseURL !== (targetProvider.baseURL || '');

                if (!hasChanges) {
                    console.log('No changes detected. Operation cancelled.');
                    return;
                }

                // Check for name conflicts
                if (newName !== targetProvider.name && config.providers.some((p, idx) => p.name === newName && idx !== targetIndex)) {
                    console.log(`! A provider with the name '${newName}' already exists.`);
                    return;
                }

                // Display updated values
                console.log('\nUpdated Provider Details:');
                console.log(`  Name:          ${newName}`);
                console.log(`  API Key Env:   ${newApiKeyEnv}`);
                console.log(`  Base URL:      ${newBaseURL || 'N/A'}`);
                console.log('');

                const confirmed = await confirmAction('? Confirm updating this provider?');

                if (confirmed) {
                    targetProvider.name = newName;
                    targetProvider.apiKeyName = newApiKeyEnv;
                    if (newBaseURL) {
                        targetProvider.baseURL = newBaseURL;
                    } else {
                        delete targetProvider.baseURL;
                    }
                    await writeChatConfig(config);
                } else {
                    console.log('Provider update cancelled.');
                }

            } catch (error) {
                console.error(`Error editing provider: ${error.message}`);
                process.exit(1);
            }
        });

    editCommand
        .command('model [name_or_index]')
        .description('Edit an LLM model.')
        .option('-n, --name <name>', 'New display name for the model')
        .option('-i, --model-id <id>', 'New model ID')
        .option('-t, --max-tokens <number>', 'New max output tokens')
        .option('-p, --provider <name>', 'New provider name')
        .option('-d, --default', 'Set as default model')
        .option('--no-default', 'Unset as default model')
        .action(async (nameOrIndex, options) => {
            try {
                const config = await readChatConfig();
                let targetModel;
                let targetIndex;

                if (nameOrIndex !== undefined) {
                    const identifier = parseIdentifier(nameOrIndex);
                    const found = findItem(config.models, identifier);
                    if (!found || found.item.name === '---------') {
                        console.log(`! Model '${nameOrIndex}' not found or is a divider.`);
                        return;
                    }
                    targetModel = found.item;
                    targetIndex = found.index;
                } else {
                    const modelsOnly = config.models.filter(m => m.name !== '---------');
                    if (modelsOnly.length === 0) {
                        console.log('No models to edit.');
                        return;
                    }
                    const choices = modelsOnly.map((model, index) => ({
                        name: `${index}: ${model.name} (${model.providers[0]?.name || 'N/A'})`,
                        value: model.name,
                    }));
                    const selectedName = await promptForListSelection('? Select the model to edit:', choices);
                    const found = findItem(config.models, selectedName);
                    if (!found) {
                        console.log('Model not found. Aborting edit.');
                        return;
                    }
                    targetModel = found.item;
                    targetIndex = found.index;
                }

                const currentProvider = targetModel.providers[0];
                console.log(`\nEditing model: ${targetModel.name}`);
                console.log('Current values:');
                console.log(`  Name:              ${targetModel.name}`);
                console.log(`  Provider:          ${currentProvider?.name || 'N/A'}`);
                console.log(`  Model ID:          ${currentProvider?.modelId || 'N/A'}`);
                console.log(`  Max Output Tokens: ${currentProvider?.maxOutputTokens || 'N/A'}`);
                console.log(`  Default:           ${targetModel.default ? 'Yes' : 'No'}`);
                console.log('');

                // Get new values (use flags if provided, otherwise prompt)
                const newName = options.name || await promptForInput('? Enter new display name (leave blank to keep current):', () => true, targetModel.name);

                let newProviderName = options.provider;
                if (!newProviderName) {
                    const providers = config.providers || [];
                    const providerChoices = providers.map(p => ({
                        name: p.name,
                        value: p.name
                    }));
                    newProviderName = await promptForListSelection('? Select the provider (leave blank to keep current):', providerChoices);
                }

                const newModelId = options['model-id'] || await promptForInput('? Enter new model ID (leave blank to keep current):', () => true, currentProvider?.modelId || '');

                let newMaxTokens = options['max-tokens'];
                if (newMaxTokens === undefined) {
                    newMaxTokens = await promptForNumber('? Enter new max output tokens (leave blank to keep current):', () => true, currentProvider?.maxOutputTokens || 0);
                }

                let newDefault = targetModel.default;
                if (options.default !== undefined) {
                    newDefault = options.default;
                } else {
                    newDefault = await confirmAction('? Should this be the default model?', targetModel.default);
                }

                // Check if any changes were made
                const hasChanges = newName !== targetModel.name ||
                                  newProviderName !== currentProvider?.name ||
                                  newModelId !== currentProvider?.modelId ||
                                  newMaxTokens !== currentProvider?.maxOutputTokens ||
                                  newDefault !== targetModel.default;

                if (!hasChanges) {
                    console.log('No changes detected. Operation cancelled.');
                    return;
                }

                // Check for name conflicts
                if (newName !== targetModel.name && config.models.some((m, idx) => m.name === newName && m.name !== '---------' && idx !== targetIndex)) {
                    console.log(`! A model with the name '${newName}' already exists.`);
                    return;
                }

                // Validate provider exists
                const newProvider = config.providers.find(p => p.name === newProviderName);
                if (!newProvider) {
                    console.log(`! Provider '${newProviderName}' not found.`);
                    return;
                }

                // Display updated values
                console.log('\nUpdated Model Details:');
                console.log(`  Name:              ${newName}`);
                console.log(`  Provider:          ${newProviderName}`);
                console.log(`  Model ID:          ${newModelId}`);
                console.log(`  Max Output Tokens: ${newMaxTokens}`);
                console.log(`  Default:           ${newDefault ? 'Yes' : 'No'}`);
                console.log('');

                const confirmed = await confirmAction('? Confirm updating this model?');

                if (confirmed) {
                    // Handle default model changes
                    if (newDefault && !targetModel.default) {
                        // Unset old default
                        config.models.forEach(m => {
                            if (m.default) delete m.default;
                        });
                    } else if (!newDefault && targetModel.default) {
                        // Just unset this one
                        delete targetModel.default;
                    }

                    targetModel.name = newName;
                    targetModel.providers[0] = {
                        name: newProviderName,
                        modelId: newModelId,
                        maxOutputTokens: newMaxTokens
                    };
                    targetModel.default = newDefault;

                    await writeChatConfig(config);
                } else {
                    console.log('Model update cancelled.');
                }

            } catch (error) {
                console.error(`Error editing model: ${error.message}`);
                process.exit(1);
            }
        });

    // --- Set Default Model Command (Top-level) ---
    program
        .command('set-default-model [name]')
        .description('Set the specified model as the default model. If no name is provided, you will be prompted to select one.')
        .action(async (identifier) => {
            try {
                const config = await readChatConfig();
                let targetModel;

                if (identifier) {
                    const found = findItem(config.models, identifier);
                    if (!found || found.item.name === '---------') {
                        console.log(`! Model '${identifier}' not found or is a divider.`);
                        return;
                    }
                    targetModel = found.item;
                } else {
                    const modelsOnly = config.models.filter(m => m.name !== '---------');
                    if (modelsOnly.length === 0) {
                        console.log('No models available to set as default.');
                        return;
                    }
                    const choices = modelsOnly.map((model) => ({
                        name: `${model.name} (${model.providers[0]?.name || 'N/A'})`,
                        value: model.name
                    }));
                    const selectedName = await promptForListSelection('? Select the model to set as default:', choices);
                    const found = findItem(config.models, selectedName);
                    if (!found) {
                        console.log('Model not found. Aborting.');
                        return;
                    }
                    targetModel = found.item;
                }

                const currentDefault = config.models.find(m => m.default);
                if (currentDefault && currentDefault.name === targetModel.name) {
                    console.log(`✓ '${targetModel.name}' is already the default model.`);
                    return;
                }

                const confirmed = await confirmAction(`? Set model '${targetModel.name}' as the default model?`);
                if (!confirmed) {
                    console.log('Operation cancelled.');
                    return;
                }

                if (currentDefault) delete currentDefault.default;
                targetModel.default = true;

                await writeChatConfig(config);
            } catch (error) {
                console.error(`Error setting default model: ${error.message}`);
                process.exit(1);
            }
        });
};
