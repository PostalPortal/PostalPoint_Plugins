<a name="fs"></a>

## fs : <code>object</code>
Basic filesystem access utility functions, wrapping Node.JS and/or NW.JS code.

**Kind**: global namespace  

* [fs](#fs) : <code>object</code>
    * [.openFileSaveDialog(suggestedFilename, fileExtensions)](#fs.openFileSaveDialog) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
    * [.openFileBrowseDialog(chooseFolder, accept, dialogTitle)](#fs.openFileBrowseDialog) ⇒ <code>string</code> \| <code>null</code>
    * [.writeFile(filename, data, encoding, flag)](#fs.writeFile) ⇒ <code>Promise</code>
    * [.readFile(filename, encoding, flag)](#fs.readFile) ⇒ <code>Promise.&lt;(string\|Buffer)&gt;</code>
    * [.fileExists(filename)](#fs.fileExists) ⇒ <code>boolean</code>

<a name="fs.openFileSaveDialog"></a>

### fs.openFileSaveDialog(suggestedFilename, fileExtensions) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Open a file save as dialog prompting the user to save a file.
Opens to the user's Documents folder, with sane fallbacks if it cannot be located.

**Kind**: static method of [<code>fs</code>](#fs)  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - The full file path the user selected, or null if they cancelled.  

| Param | Type | Description |
| --- | --- | --- |
| suggestedFilename | <code>string</code> | The filename string to pre-fill in the dialog. |
| fileExtensions | <code>string</code> | The file type filter to show. Examples: ".csv", ".csv,.html" |

<a name="fs.openFileBrowseDialog"></a>

### fs.openFileBrowseDialog(chooseFolder, accept, dialogTitle) ⇒ <code>string</code> \| <code>null</code>
Open a file browse/file open dialog prompting the user to select a file or folder.
Opens to the user's Documents folder, with sane fallbacks if it cannot be located.

**Kind**: static method of [<code>fs</code>](#fs)  
**Returns**: <code>string</code> \| <code>null</code> - The selected file/folder path, or null if cancelled.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| chooseFolder | <code>boolean</code> | <code>false</code> | Set to true to choose a folder instead of a file. |
| accept | <code>string</code> |  | File filter.  ".csv,.html", "image/*", etc. |
| dialogTitle | <code>string</code> \| <code>null</code> | <code>null</code> | Title of the file open dialog. |

<a name="fs.writeFile"></a>

### fs.writeFile(filename, data, encoding, flag) ⇒ <code>Promise</code>
Write a file to disk.

**Kind**: static method of [<code>fs</code>](#fs)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filename | <code>string</code> |  | The path and filename to write to. |
| data | <code>string</code> \| <code>Buffer</code> \| <code>ArrayBuffer</code> \| <code>Uint8Array</code> |  | Data to write to the file. |
| encoding | <code>string</code> \| <code>null</code> | <code>&quot;utf8&quot;</code> | Text encoding. Set to empty if not passing string data. |
| flag | <code>string</code> \| <code>null</code> | <code>&quot;w+&quot;</code> | Filesystem flag. |

<a name="fs.readFile"></a>

### fs.readFile(filename, encoding, flag) ⇒ <code>Promise.&lt;(string\|Buffer)&gt;</code>
Read a file from disk and return its contents.

**Kind**: static method of [<code>fs</code>](#fs)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filename | <code>string</code> |  | The path and filename to read from. |
| encoding | <code>string</code> | <code>&quot;utf8&quot;</code> | File encoding. Set to null or empty string when reading binary data. |
| flag | <code>string</code> | <code>&quot;r+&quot;</code> | Filesystem flag. |

<a name="fs.fileExists"></a>

### fs.fileExists(filename) ⇒ <code>boolean</code>
Check if a file exists.

**Kind**: static method of [<code>fs</code>](#fs)  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | Path and filename to check. |

