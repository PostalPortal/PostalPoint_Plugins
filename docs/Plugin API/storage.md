<a name="storage"></a>

## storage : <code>object</code>
Get and set data.

**Kind**: global namespace  

* [storage](#storage) : <code>object</code>
    * [.getSmall(key, defaultValue)](#storage.getSmall) ⇒ <code>\*</code>
    * [.setSmall(key, value)](#storage.setSmall)
    * [.getBig(key, defaultValue)](#storage.getBig)
    * [.setBig(key, value)](#storage.setBig)
    * [.getDB(key, defaultValue)](#storage.getDB) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.setDB(key, value)](#storage.setDB) ⇒ <code>Promise</code>

<a name="storage.getSmall"></a>

### storage.getSmall(key, defaultValue) ⇒ <code>\*</code>
Get a value from the small data storage, using localStorage or a similar mechanism (may change in the future).

**Kind**: static method of [<code>storage</code>](#storage)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Storage item key/ID |
| defaultValue | <code>\*</code> | Value to return if the item key doesn't have a stored value. |

<a name="storage.setSmall"></a>

### storage.setSmall(key, value)
Set a value in the small data storage, using localStorage or a similar mechanism (may change in the future).

**Kind**: static method of [<code>storage</code>](#storage)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Storage item key/ID |
| value | <code>\*</code> | Value to store. |

<a name="storage.getBig"></a>

### storage.getBig(key, defaultValue)
Get a value in the large data storage. Unserialized from a JSON file on disk.

**Kind**: static method of [<code>storage</code>](#storage)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Storage item key/ID |
| defaultValue | <code>\*</code> | Value to return if the item key doesn't have a stored value. |

<a name="storage.setBig"></a>

### storage.setBig(key, value)
Set a value in the large data storage.  Serialized to JSON and stored on disk as a file.

**Kind**: static method of [<code>storage</code>](#storage)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Storage item key/ID |
| value | <code>\*</code> | Value to store. |

<a name="storage.getDB"></a>

### storage.getDB(key, defaultValue) ⇒ <code>Promise.&lt;\*&gt;</code>
Get a value from the database storage.  Unlike other storage types, values in the database are available on all PostalPoint installations in a single location.

**Kind**: static method of [<code>storage</code>](#storage)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Storage item key/ID |
| defaultValue | <code>\*</code> | Value to return if the item key doesn't have a stored value. |

<a name="storage.setDB"></a>

### storage.setDB(key, value) ⇒ <code>Promise</code>
Set a value in the database storage. Non-string values are serialized to JSON. Unlike other storage types, values in the database are available on all PostalPoint installations in a single location.

**Kind**: static method of [<code>storage</code>](#storage)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Storage item key/ID |
| value | <code>\*</code> | Value to store. |

