/**
 * Component: GitSense Chat Admin LLM Add Commands
 * Block-UUID: 56bd5130-2f4f-4eef-a730-50843d554682
 * Parent-UUID: 339eb22c-86d2-46ce-97c1-b3b19f920686
 * Version: 1.3.0
 * Description: Handles the 'add provider', 'add model', and 'add divider' commands for the LLM admin CLI. Added flag support for non-interactive provider and model creation. Added --no-divider and --yes flags for fully non-interactive model addition.
 * Language: JavaScript
 * Created-at: 2026-06-04T23:13:16.504Z
 * Authors: GLM-4.7 (v1.0.0), GLM-4.7 (v1.1.0), GLM-4.7 (v1.2.0), GLM-4.7 (v1.2.1), GLM-4.7 (v1.3.0)
 */


const {
    readChatConfig,
    writeChatConfig,
    confirmAction,
    promptForInput,
    promptForListSelection,
    promptForNumber,
    insertItem
} = require('../lib/utils-esm');
const { displayModels, getPositionInput } = require('./gsc-admin-llm-helpers');

module.exports = (program) => {
    const addCommand = program.command('add')
        .description('Add LLM models, providers, or dividers.')
        .action(() => addCommand.help());

    addCommand
        .command('provider')
        .description('Add a new LLM provider.')
        .option('-n, --name <name>', 'Display name for the provider')
        .option('-k, --api-key-env <name>', 'API key environment variable name')
        .option('-u, --base-url <url>', 'Base URL for the API endpoint (optional)')
        .action(async (options) => {
            try {
                const config = await readChatConfig();
                let providerName;
                let isUnique = false;

                // Use flag if provided, otherwise prompt
                if (options.name) {
                    providerName = options.name;
                    if (config.providers.some(p => p.name === providerName)) {
                        console.log(`! A provider with the name '${providerName}' already exists.`);
                        console.log(`! If you wish to modify it, please use 'gsc-admin llm edit provider "${providerName}"'.`);
                        return;
                    }
                    isUnique = true;
                } else {
                    while (!isUnique) {
                        providerName = await promptForInput('? Enter the display name for the new provider (e.g., \'My Custom AI\'):', (input) => input.trim().length > 0 || 'Provider name cannot be empty.');
                        if (config.providers.some(p => p.name === providerName)) {
                            console.log(`! A provider with the name '${providerName}' already exists.`);
                            console.log(`! If you wish to modify it, please use 'gsc-admin llm edit provider "${providerName}"'.`);
                        } else {
                            isUnique = true;
                        }
                    }
                }

                const defaultApiKeyName = providerName.toUpperCase().replace(/[^A-Z0-9_]/g, '_') + '_API_KEY';
                let apiKeyName;
                if (options.apiKeyEnv) {
                    apiKeyName = options.apiKeyEnv;
                } else {
                    apiKeyName = await promptForInput(`? Enter the name of the environment variable for the API key (e.g., '${defaultApiKeyName}'):`, (input) => input.trim().length > 0 || 'API key environment variable name cannot be empty.', defaultApiKeyName);
                }

                let baseURL;
                if (options.baseUrl !== undefined) {
                    baseURL = options.baseUrl;
                } else {
                    baseURL = await promptForInput('? Enter the base URL for the API endpoint (optional, e.g., \'https://api.mycustomai.com/v1\'):', (input) => {
                        if (input === '') return true;
                        try {
                            new URL(input);
                            return true;
                        } catch (e) {
                            return 'Please enter a valid URL or leave empty.';
                        }
                    }, '');
                }

                const newProvider = {
                    name: providerName,
                    apiKeyName: apiKeyName,
                };
                if (baseURL) {
                    newProvider.baseURL = baseURL;
                }

                console.log('\nNew Provider Details:');
                console.log(`  Name:          ${newProvider.name}`);
                console.log(`  API Key Env:   ${newProvider.apiKeyName}`);
                console.log(`  Base URL:      ${newProvider.baseURL || 'N/A'}`);

                const confirmed = await confirmAction('? Confirm adding this provider to chat-config.json?');

                if (confirmed) {
                    config.providers.push(newProvider);
                    await writeChatConfig(config);
                } else {
                    console.log('Provider addition cancelled.');
                }

            } catch (error) {
                console.error(`Error adding provider: ${error.message}`);
                process.exit(1);
            }
        });

    addCommand
        .command('model')
        .description('Add a new LLM model. Note: This command will prompt for divider placement and confirmation unless --no-divider and --yes flags are used.')
        .option('-x, --index <number>', 'Specify the 0-based index to insert the model')
        .option('-b, --before <name_or_index>', 'Insert the model before a specific model/divider (by name or index)')
        .option('-a, --after <name_or_index>', 'Insert the model after a specific model/divider')
        .option('-n, --name <name>', 'Display name for the model')
        .option('-p, --provider <name>', 'Provider name')
        .option('-i, --model-id <id>', 'Model ID')
        .option('-t, --max-tokens <number>', 'Max output tokens')
        .option('-d, --default', 'Set as default model')
        .option('--no-divider', 'Skip the divider prompt (do not add a divider)')
        .option('-y, --yes', 'Auto-confirm without prompting')
        .action(async (options) => {
            try {
                const config = await readChatConfig();
                const providers = config.providers || [];

                if (providers.length === 0) {
                    console.log('! No providers are registered. Please add a provider first using `gsc-admin llm add provider`.');
                    return;
                }

                // Step 1: Select Provider
                let selectedProvider;
                if (options.provider) {
                    selectedProvider = providers.find(p => p.name === options.provider);
                    if (!selectedProvider) {
                        console.log(`! Provider '${options.provider}' not found.`);
                        return;
                    }
                } else {
                    const providerChoices = providers.map(p => ({
                        name: p.name,
                        value: p.name
                    }));
                    providerChoices.unshift({
                        name: '[Create New Provider]',
                        value: '__CREATE_NEW__'
                    });

                    const selectedProviderName = await promptForListSelection('? Select the provider for this model:', providerChoices);

                    if (selectedProviderName === '__CREATE_NEW__') {
                        console.log('! To add a new model, its provider must already exist.');
                        console.log('! Please run `gsc-admin llm add provider` first to create the new provider.');
                        console.log('! After that, you can re-run `gsc-admin llm add model`.');
                        return;
                    }
                    selectedProvider = providers.find(p => p.name === selectedProviderName);
                }

                // Step 2: Get Model Display Name
                let modelName;
                let isUnique = false;
                if (options.name) {
                    modelName = options.name;
                    if (config.models.some(m => m.name === modelName && m.name !== '---------')) {
                        console.log(`! A model with the name '${modelName}' already exists.`);
                        console.log(`! If you wish to modify it, please use 'gsc-admin llm edit model "${modelName}"'.`);
                        return;
                    }
                    isUnique = true;
                } else {
                    while (!isUnique) {
                        modelName = await promptForInput('? Enter the display name for the new model (e.g., \'My Custom GPT-4\'):', (input) => input.trim().length > 0 || 'Model name cannot be empty.');
                        if (config.models.some(m => m.name === modelName && m.name !== '---------')) {
                            console.log(`! A model with the name '${modelName}' already exists.`);
                            console.log(`! If you wish to modify it, please use 'gsc-admin llm edit model "${modelName}"'.`);
                            console.log(`? Please enter a unique name for this new model:`);
                        } else {
                            isUnique = true;
                        }
                    }
                }

                // Step 3: Get Model ID
                let modelId;
                if (options.modelId) {
                    modelId = options.modelId;
                } else {
                    modelId = await promptForInput([
                        '? Enter the model ID:',
                        '  (e.g., \'gpt-4o\', \'claude-3-5-sonnet-20241022\')',
                        '  You can usually find this on the provider\'s API documentation or model list page.'
                    ].join('\n'), (input) => input.trim().length > 0 || 'Model ID cannot be empty.');
                }

                // Step 4: Get Max Output Tokens
                let maxOutputTokens;
                if (options.maxTokens !== undefined) {
                    maxOutputTokens = parseInt(options.maxTokens);
                    if (isNaN(maxOutputTokens) || maxOutputTokens <= 0) {
                        console.log('! Max output tokens must be a positive number.');
                        return;
                    }
                } else {
                    maxOutputTokens = await promptForNumber([
                        '? Enter the max allowable output tokens:',
                        '  (Your value cannot exceed the model\'s actual maximum output token capability.)',
                        '  (e.g., 8192, 20000)'
                    ].join('\n'), (input) => input > 0 || 'Max output tokens must be a positive number.');
                }

                // Step 5: Set Default Model (Optional)
                let isDefault = false;
                if (options.default !== undefined) {
                    isDefault = options.default;
                } else {
                    const confirmDefault = await confirmAction('? Should this be the default model?');
                    if (confirmDefault) {
                        const currentDefaultModel = config.models.find(m => m.default);
                        if (currentDefaultModel) {
                            const overrideConfirmed = await confirmAction(`! There is already a default model: '${currentDefaultModel.name}'.\n? Do you want to make '${modelName}' the new default and unset '${currentDefaultModel.name}'?`, false);
                            if (overrideConfirmed) {
                                isDefault = true;
                            } else {
                                console.log(`✓ '${modelName}' will NOT be set as the default. '${currentDefaultModel.name}' will remain the default.`);
                            }
                        } else {
                            isDefault = true;
                        }
                    }
                }

                const newModel = {
                    name: modelName,
                    providers: [{
                        name: selectedProvider.name,
                        modelId: modelId,
                        maxOutputTokens: maxOutputTokens
                    }],
                    default: isDefault
                };

                // Step 6: Display Current Model Order
                const currentModels = [...(config.models || [])];
                displayModels(currentModels);

                // Step 7: Determine New Model Position (Optional)
                let positionInput = 'end';
                if (options.index !== undefined) {
                    positionInput = parseInt(options.index);
                } else if (options.before) {
                    positionInput = `before ${options.before}`;
                } else if (options.after) {
                    positionInput = `after ${options.after}`;
                } else {
                    // Only prompt if no position flags provided
                    positionInput = await getPositionInput(currentModels.length);
                }

                let targetIndex;
                try {
                    const tempModels = [...currentModels];
                    targetIndex = insertItem(tempModels, newModel, positionInput, currentModels);
                } catch (e) {
                    console.error(`Error determining position: ${e.message}`);
                    return;
                }

                // Step 8: Optional Divider Placement
                let addDividerBefore = false;
                let addDividerAfter = false;
                
                if (!options.noDivider) {
                    const confirmDivider = await confirmAction('? Would you like to add a divider near this new model?');
                    if (confirmDivider) {
                        const dividerPosition = await promptForListSelection('? Add divider (before/after) the new model?', ['before', 'after']);
                        if (dividerPosition === 'before') {
                            addDividerBefore = true;
                        } else {
                            addDividerAfter = true;
                        }
                    }
                }

                // Step 9: Final Summary and Confirmation
                const finalModelsArray = [...(config.models || [])];
                let actualModelIndex;

                // Unset old default if new one is default
                if (isDefault) {
                    finalModelsArray.forEach(m => {
                        if (m.default) {
                            delete m.default;
                        }
                    });
                }

                // Insert model and dividers into the final array
                if (addDividerBefore) {
                    actualModelIndex = insertItem(finalModelsArray, {
                        name: '---------'
                    }, targetIndex);
                    insertItem(finalModelsArray, newModel, actualModelIndex + 1);
                } else if (addDividerAfter) {
                    actualModelIndex = insertItem(finalModelsArray, newModel, targetIndex);
                    insertItem(finalModelsArray, {
                        name: '---------'
                    }, actualModelIndex + 1);
                } else {
                    actualModelIndex = insertItem(finalModelsArray, newModel, targetIndex);
                }

                console.log('\n--- Preview of New Order ---');
                displayModels(finalModelsArray);
                console.log('----------------------------');

                const confirmed = options.yes || await confirmAction('? Confirm adding this model (and optional divider) with the above order?');

                if (confirmed) {
                    config.models = finalModelsArray;
                    await writeChatConfig(config);
                } else {
                    console.log('Model addition cancelled. No changes made to chat-config.json.');
                }

            } catch (error) {
                console.error(`Error adding model: ${error.message}`);
                process.exit(1);
            }
        });

    addCommand
        .command('divider')
        .description('Add a new divider to the model list.')
        .option('-i, --index <number>', 'Specify the 0-based index to insert the divider.')
        .option('-b, --before <name_or_index>', 'Insert the divider before a specific model/divider (by name or index).')
        .option('-a, --after <name_or_index>', 'Insert the divider after a specific model/divider.')
        .action(async (options) => {
            try {
                const config = await readChatConfig();
                const models = [...(config.models || [])];

                let position = 'end';
                if (options.index !== undefined) {
                    position = parseInt(options.index);
                } else if (options.before) {
                    position = `before ${options.before}`;
                } else if (options.after) {
                    position = `after ${options.after}`;
                } else {
                    displayModels(models);
                    position = await getPositionInput(models.length);
                }

                const newDivider = {
                    name: '---------'
                };
                insertItem(models, newDivider, position, models);

                console.log('\n--- Preview of New Order ---');
                displayModels(models);
                console.log('----------------------------');

                const confirmed = await confirmAction('? Confirm adding this divider with the above order?');

                if (confirmed) {
                    config.models = models;
                    await writeChatConfig(config);
                } else {
                    console.log('Divider addition cancelled.');
                }

            } catch (error) {
                console.error(`Error adding divider: ${error.message}`);
                process.exit(1);
            }
        });
};
