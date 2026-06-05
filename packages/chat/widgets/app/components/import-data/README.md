# Import Data Component

The Import Data component provides multiple methods for importing files into GitSense Chat, with comprehensive error handling and tracking capabilities.

## Features

- **Multiple Import Methods**: Manual CLI, Dropzone upload, and Direct Import (Enterprise)
- **Multi-file Selection**: The Dropzone supports selecting multiple files simultaneously via the operating system's file navigator.
- **Enhanced Error Handling**: Structured error categorization with detailed error information
- **Error Tracking**: Database logging of all errors for analytics and troubleshooting
- **Retry Mechanisms**: Automatic retry options for recoverable errors
- **Progress Tracking**: Real-time progress updates during import operations

### Error Recovery

The system provides different recovery options based on error type:

- **Recoverable Errors**: Network, timeout, and temporary errors can be retried
- **Non-Recoverable Errors**: Validation and system errors require user action
- **Retry Limits**: Maximum of 3 retry attempts for recoverable errors

## Database Schema

### Error Tracking Tables

#### `file_storage` Table (Enhanced)

```sql
CREATE TABLE file_storage (
    id TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    task_type TEXT,
    metadata TEXT,
    file_count INTEGER DEFAULT 0,
    total_size INTEGER DEFAULT 0,
    error_type TEXT,
    error_code TEXT,
    error_message TEXT,
    error_details TEXT,
    retry_count INTEGER DEFAULT 0,
    last_retry_at INTEGER
);
```

#### `import_errors` Table

```sql
CREATE TABLE import_errors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    storage_id TEXT NOT NULL,
    error_type TEXT NOT NULL,
    error_code TEXT,
    error_message TEXT NOT NULL,
    error_details TEXT,
    stack_trace TEXT,
    occurred_at INTEGER NOT NULL,
    resolved_at INTEGER,
    resolution_method TEXT,
    FOREIGN KEY (storage_id) REFERENCES file_storage(id) ON DELETE CASCADE
);
```

#### `import_stats` Table

```sql
CREATE TABLE import_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    total_imports INTEGER DEFAULT 0,
    successful_imports INTEGER DEFAULT 0,
    failed_imports INTEGER DEFAULT 0,
    error_types TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
```

## Troubleshooting

### Common Issues

#### File Upload Fails

**Symptoms**: Error during file upload with "UPLOAD_FAILED" error code.

**Possible Causes**:
- Network connection issues
- File size exceeds limits
- Server storage issues

**Solutions**:
1. Check network connection
2. Verify file sizes are within limits (10MB per file, 50MB total)
3. Try uploading fewer files at once
4. Retry the operation if it's a network error

#### Repository Creation Fails

**Symptoms**: Error during repository creation with "REPOSITORY_CREATION_FAILED" error code.

**Possible Causes**:
- Invalid file names or paths
- Binary files in the upload
- Insufficient permissions

**Solutions**:
1. Check for invalid file names (special characters, excessive length)
2. Remove binary files and upload only text files
3. Check file permissions and try again

#### Import to GitSense Fails

**Symptoms**: Error during import to GitSense with "IMPORT_FAILED" error code.

**Possible Causes**:
- Repository structure issues
- GitSense server problems
- Database connection issues

**Solutions**:
1. Check repository structure is valid
2. Verify GitSense server is running
3. Check database connection and permissions
4. Retry the operation if it's a temporary error

### Error Logs

All errors are logged to the database with detailed information:

1. **Error Type and Code**: Categorized error information
2. **Error Message**: User-friendly error description
3. **Error Details**: Structured error context
4. **Stack Trace**: Technical debugging information
5. **Timestamp**: When the error occurred

To view error logs:

```sql
-- View recent errors for a specific storage ID
SELECT * FROM import_errors 
WHERE storage_id = 'your-storage-id' 
ORDER BY occurred_at DESC 
LIMIT 10;

-- View error statistics for a date range
SELECT date, total_imports, successful_imports, failed_imports, error_types 
FROM import_stats 
WHERE date >= '2026-01-01' 
ORDER BY date DESC;
```

### Error Recovery

#### Automatic Retry

For recoverable errors (network, timeout, temporary), the system provides an automatic retry option:

1. Error dialog shows retry button with remaining attempts
2. Each retry increments the retry count
3. After maximum retries, retry option is disabled

#### Manual Recovery

For non-recoverable errors, users need to take manual action:

1. **Validation Errors**: Fix input issues (file size, count, type)
2. **System Errors**: Contact support or try again later
3. **Repository Errors**: Check repository structure and try again

## API Reference

### Error Response Format

All API errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "type": "validation",
    "code": "FILE_TOO_LARGE",
    "message": "File exceeds size limit",
    "details": {
      "fileName": "example.txt",
      "fileSize": 15728640,
      "maxFileSize": 10485760
    },
    "timestamp": "2026-01-07T18:14:00.000Z"
  }
}
```

### SSE Error Events

Server-Sent Events include structured error information:

```json
{
  "type": "error",
  "errorCode": "SSE_CONNECTION_ERROR",
  "errorType": "network",
  "content": "Connection to the server was lost",
  "details": {
    "originalError": "NetworkError: Failed to fetch"
  },
  "done": true
}
```

## Development Guide

### Adding New Error Types

1. Add error type to `constants.js`:
```javascript
ERROR_TYPES: {
  // Existing types...
  NEW_TYPE: 'newType'
}
```

2. Add error codes for the new type:
```javascript
ERROR_CODES: {
  // Existing codes...
  NEW_ERROR_CODE: 'NEW_ERROR_CODE'
}
```

3. Add error messages:
```javascript
ERROR_MESSAGES: {
  // Existing messages...
  [this.ERROR_CODES.NEW_ERROR_CODE]: 'Description of the new error'
}
```

4. Add action messages:
```javascript
ERROR_ACTION_MESSAGES: {
  // Existing messages...
  [this.ERROR_TYPES.NEW_TYPE]: 'Action to take for this error type'
}
```

### Creating Custom Errors

Use the `ImportError` class for structured errors:

```javascript
const { ImportError, ERROR_CODES } = require('./utils/ImportError');

// Create a validation error
const error = ImportError.validation(
  ERROR_CODES.FILE_TOO_LARGE,
  'File exceeds size limit',
  { fileName: 'example.txt', fileSize: 15728640 }
);

// Log the error
await fileStorageManager.updateStorageError(storageId, error);
```

### Error Handling Best Practices

1. **Always use structured errors**: Use the `ImportError` class for all errors
2. **Provide detailed context**: Include relevant information in error details
3. **Log all errors**: Use the error logging system for all errors
4. **Categorize errors correctly**: Use appropriate error types and codes
5. **Provide actionable messages**: Help users understand what to do next

## Support

For issues with the Import Data component:

1. Check the error logs in the database
2. Review the troubleshooting section above
3. Contact support with error details (type, code, and message)

## License

This component is part of GitSense Chat and is subject to the same license terms.
