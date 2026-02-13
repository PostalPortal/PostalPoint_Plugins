<a name="f7"></a>

## f7
The Framework7 app instance for PostalPoint's entire UI, created by new Framework7().
See https://framework7.io/docs/app for details.

**Kind**: global constant  
<a name="getPluginFolder"></a>

## getPluginFolder([id]) ⇒ <code>string</code>
Get the filesystem path to a plugin's installation folder.

**Kind**: global function  
**Returns**: <code>string</code> - "/home/user/.config/postalpoint-retail/Default/storage/plugins/...", "C:\Users\user\AppData\...", etc  

| Param | Type | Description |
| --- | --- | --- |
| [id] | <code>string</code> | Plugin ID. If omitted or empty, will return the parent folder plugins are installed within. |

<a name="getAppFolder"></a>

## getAppFolder() ⇒ <code>string</code>
Get the filesystem path to the PostalPoint installation folder.

**Kind**: global function  
<a name="alert"></a>

## alert(text, title, [callback])
Display a simple alert-style dialog box.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | Body text of the dialog. |
| title | <code>string</code> |  | Dialog title. |
| [callback] | <code>function</code> | <code></code> | Function to call when the alert is closed. |

