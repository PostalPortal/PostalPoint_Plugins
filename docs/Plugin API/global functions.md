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

## alert(text, title, [callback]) ⇒ <code>Promise</code>
Display a simple alert-style dialog box with an "OK" button.

**Kind**: global function  
**Returns**: <code>Promise</code> - Resolves when the user closes the dialog.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | Body text of the dialog. Can include HTML tags. |
| title | <code>string</code> |  | Dialog title. |
| [callback] | <code>function</code> | <code></code> | Function to call when the alert is closed. |

<a name="confirm"></a>

## confirm(text, title, [callback], [cancelCallback]) ⇒ <code>Promise</code>
Display a simple confirm dialog box with OK and Cancel buttons.

**Kind**: global function  
**Returns**: <code>Promise</code> - Resolves when the user closes the dialog, with value `true` if OK is pressed, or `false` if Cancel is pressed.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | Body text of the dialog. Can include HTML tags. |
| title | <code>string</code> |  | Dialog title. |
| [callback] | <code>function</code> \| <code>null</code> | <code></code> | Function to call when the OK button is pressed. |
| [cancelCallback] | <code>function</code> \| <code>null</code> | <code></code> | Function to call when the Cancel button is pressed. |

<a name="confirm"></a>

## confirm(text, title, [callback], [cancelCallback], defaultValue) ⇒ <code>Promise</code>
Display a simple confirm dialog box with OK and Cancel buttons.

**Kind**: global function  
**Returns**: <code>Promise</code> - Resolves when the user closes the dialog, with the input box's value if OK is pressed, or `false` if Cancel is pressed.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | Body text of the dialog. Can include HTML tags.  The input box will be appended to this. |
| title | <code>string</code> |  | Dialog title. |
| [callback] | <code>function</code> \| <code>null</code> | <code></code> | Function to call when the OK button is pressed. Is passed the input value. |
| [cancelCallback] | <code>function</code> \| <code>null</code> | <code></code> | Function to call when the Cancel button is pressed. Is passed the input value. |
| defaultValue | <code>string</code> |  | Text to pre-fill in the input box. |

<a name="confirm"></a>

## confirm(text, title, [callback], [cancelCallback]) ⇒ <code>Promise</code>
Display a simple confirm dialog box with OK and Cancel buttons.

**Kind**: global function  
**Returns**: <code>Promise</code> - Resolves when the user closes the dialog, with value `true` if OK is pressed, or `false` if Cancel is pressed.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | Body text of the dialog. Can include HTML tags. |
| title | <code>string</code> |  | Dialog title. |
| [callback] | <code>function</code> \| <code>null</code> | <code></code> | Function to call when the OK button is pressed. |
| [cancelCallback] | <code>function</code> \| <code>null</code> | <code></code> | Function to call when the Cancel button is pressed. |

<a name="confirm"></a>

## confirm(text, title, [callback], [cancelCallback], defaultValue) ⇒ <code>Promise</code>
Display a simple confirm dialog box with OK and Cancel buttons.

**Kind**: global function  
**Returns**: <code>Promise</code> - Resolves when the user closes the dialog, with the input box's value if OK is pressed, or `false` if Cancel is pressed.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | Body text of the dialog. Can include HTML tags.  The input box will be appended to this. |
| title | <code>string</code> |  | Dialog title. |
| [callback] | <code>function</code> \| <code>null</code> | <code></code> | Function to call when the OK button is pressed. Is passed the input value. |
| [cancelCallback] | <code>function</code> \| <code>null</code> | <code></code> | Function to call when the Cancel button is pressed. Is passed the input value. |
| defaultValue | <code>string</code> |  | Text to pre-fill in the input box. |

