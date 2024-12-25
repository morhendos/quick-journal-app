# Journal App Utilities

## Storage and Data Management

### `exportImport.ts`
Handles journal data export and import functionality.

```typescript
exportJournalEntries(): void
```
Exports all journal entries to a JSON file with metadata including version and timestamp.
- Creates a downloadable file named `journal_export_YYYY-MM-DD.json`
- Includes version information for backwards compatibility
- Handles errors gracefully with detailed error messages

```typescript
importJournalEntries(file: File): Promise<JournalEntry[]>
```
Imports journal entries from a JSON file and merges them with existing entries.
- Validates file format and data structure
- Supports both new (with metadata) and legacy (direct array) formats
- Merges entries by date, newer entries take precedence
- Returns array of merged entries

### Data Types

```typescript
interface ExportData {
  version: string;      // Format version (e.g., "1.0.0")
  timestamp: string;    // ISO timestamp of export
  entries: JournalEntry[];
}

interface JournalEntry {
  id: string;          // Unique identifier
  date: string;        // YYYY-MM-DD format
  learning: string;    // What was learned
  enjoyment: string;   // What brought joy
}
```

### Error Handling

```typescript
type ValidationError = 'INVALID_JSON' | 'INVALID_FORMAT' | 'INVALID_ENTRIES';
```

Custom error types with specific messages for different validation failures:
- `INVALID_JSON`: File contains malformed JSON
- `INVALID_FORMAT`: JSON structure doesn't match expected format
- `INVALID_ENTRIES`: Entries don't match required schema
