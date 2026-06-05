/*
 * Component: Batch Component Custom Error Declarations
 * Block-UUID: acf5e4be-ab76-40b6-8d74-1668c4f03207
 * Parent-UUID: N/A
 * Version: 1.0.0
 * Description: TypeScript declaration file for custom error classes used in the batch processing component.
 * Language: TypeScript
 * Created-at: 2025-08-31T18:56:17.690Z
 * Authors: Gemini 2.5 Flash (v1.0.0)
 */


export class BatchError extends Error {
    details: any;
    constructor(message: string, details?: any);
}

export class ProviderError extends Error {
    providerName: string;
    statusCode: number | null;
    details: any;
    constructor(message: string, providerName?: string, statusCode?: number | null, details?: any);
}

export class InvalidInputError extends Error {
    details: any;
    constructor(message: string, details?: any);
}

export class AnalyzerNotFoundError extends Error {
    analyzerId: string;
    details: any;
    constructor(analyzerId: string, message?: string, details?: any);
}
