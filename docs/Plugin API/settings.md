<a name="settings"></a>

## settings : <code>object</code>
PostalPoint provides a UI for user-configurable plugin settings.
See exports.config in examples/basic-demo/plugin.js for details.
Settings are typically very short strings. Do not store data in settings.
For data storage, see Storing Data. Non-string settings values are transparently converted to/from JSON objects.
Use a unique key name prefix for your plugin to prevent key name conflicts.
Reverse domain style is recommended (i.e. "com.example.pluginname.keyname").

**Kind**: global namespace  

* [settings](#settings) : <code>object</code>
    * [.get(key, defaultValue)](#settings.get) ⇒ <code>\*</code>
    * [.set(key, value)](#settings.set)

<a name="settings.get"></a>

### settings.get(key, defaultValue) ⇒ <code>\*</code>
Get a setting.

**Kind**: static method of [<code>settings</code>](#settings)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Setting key/ID |
| defaultValue | <code>\*</code> | Value to return if setting has no stored value. |

<a name="settings.set"></a>

### settings.set(key, value)
Set a setting.

**Kind**: static method of [<code>settings</code>](#settings)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Setting key/ID |
| value | <code>string</code> | Value to set. |

