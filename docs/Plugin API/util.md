<a name="util"></a>

## util : <code>object</code>
Various utility functions: HTTP, time/date, barcode creation, clipboard, etc.

**Kind**: global namespace  

* [util](#util) : <code>object</code>
    * [.uuid](#util.uuid) : <code>object</code>
        * [.v4()](#util.uuid.v4) ⇒ <code>string</code>
        * [.short([length])](#util.uuid.short) ⇒ <code>string</code>
    * [.http](#util.http) : <code>object</code>
        * [.webhook](#util.http.webhook) : <code>object</code>
            * [.geturl(sourcename)](#util.http.webhook.geturl) ⇒ <code>Promise.&lt;string&gt;</code>
            * [.poll(sourcename)](#util.http.webhook.poll) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
            * [.ack(webhookid)](#util.http.webhook.ack)
        * [.post(url, data, [responseType], [headers], [method], [continueOnBadStatusCode], [timeoutSeconds])](#util.http.post) ⇒ <code>Promise.&lt;(string\|Blob\|ArrayBuffer\|Object)&gt;</code>
        * [.fetch(url, [responseType], [timeoutSeconds])](#util.http.fetch) ⇒ <code>Promise.&lt;(string\|Blob\|ArrayBuffer\|Object)&gt;</code>
    * [.string](#util.string) : <code>object</code>
        * [.split(input, separator, [limit])](#util.string.split) ⇒ <code>Array.&lt;string&gt;</code>
        * [.chunk(input, chunksize)](#util.string.chunk) ⇒ <code>Array.&lt;string&gt;</code>
    * [.time](#util.time) : <code>object</code>
        * [.now()](#util.time.now) ⇒ <code>number</code>
        * [.diff(compareto)](#util.time.diff) ⇒ <code>number</code>
        * [.strtotime(str)](#util.time.strtotime) ⇒ <code>number</code>
        * [.format(format, [timestamp])](#util.time.format) ⇒ <code>string</code>
        * [.toDateString(timestamp)](#util.time.toDateString) ⇒ <code>string</code>
        * [.toTimeString(timestamp)](#util.time.toTimeString) ⇒ <code>string</code>
    * [.clipboard](#util.clipboard) : <code>object</code>
        * [.copy(text, [showNotification])](#util.clipboard.copy) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.barcode](#util.barcode) : <code>object</code>
        * [.getBuffer(data, [type], [height], [scale], [includetext])](#util.barcode.getBuffer) ⇒ <code>Promise.&lt;Buffer&gt;</code>
        * [.getBase64(data, [type], [height], [scale], [includetext])](#util.barcode.getBase64) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.geography](#util.geography) : <code>object</code>
        * [.isoToCountryName(iso)](#util.geography.isoToCountryName) ⇒ <code>string</code>
    * [.objectEquals(a, b)](#util.objectEquals) ⇒ <code>boolean</code>
    * [.delay([ms])](#util.delay) ⇒ <code>Promise</code>

<a name="util.uuid"></a>

### util.uuid : <code>object</code>
Unique ID generators.

**Kind**: static namespace of [<code>util</code>](#util)  

* [.uuid](#util.uuid) : <code>object</code>
    * [.v4()](#util.uuid.v4) ⇒ <code>string</code>
    * [.short([length])](#util.uuid.short) ⇒ <code>string</code>

<a name="util.uuid.v4"></a>

#### uuid.v4() ⇒ <code>string</code>
Generate a UUID string

**Kind**: static method of [<code>uuid</code>](#util.uuid)  
**Returns**: <code>string</code> - UUID v4 with dashes: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx  
<a name="util.uuid.short"></a>

#### uuid.short([length]) ⇒ <code>string</code>
Generate a short random alphanumeric string.

**Kind**: static method of [<code>uuid</code>](#util.uuid)  
**Returns**: <code>string</code> - A string of length `length`, from the character set "acdefhjkmnpqrtuvwxy0123456789".  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [length] | <code>number</code> | <code>16</code> | String character count. |

<a name="util.http"></a>

### util.http : <code>object</code>
HTTP requests and webhooks.

**Kind**: static namespace of [<code>util</code>](#util)  

* [.http](#util.http) : <code>object</code>
    * [.webhook](#util.http.webhook) : <code>object</code>
        * [.geturl(sourcename)](#util.http.webhook.geturl) ⇒ <code>Promise.&lt;string&gt;</code>
        * [.poll(sourcename)](#util.http.webhook.poll) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
        * [.ack(webhookid)](#util.http.webhook.ack)
    * [.post(url, data, [responseType], [headers], [method], [continueOnBadStatusCode], [timeoutSeconds])](#util.http.post) ⇒ <code>Promise.&lt;(string\|Blob\|ArrayBuffer\|Object)&gt;</code>
    * [.fetch(url, [responseType], [timeoutSeconds])](#util.http.fetch) ⇒ <code>Promise.&lt;(string\|Blob\|ArrayBuffer\|Object)&gt;</code>

<a name="util.http.webhook"></a>

#### http.webhook : <code>object</code>
Use webhooks via a PostalPoint cloud relay service.

**Kind**: static namespace of [<code>http</code>](#util.http)  

* [.webhook](#util.http.webhook) : <code>object</code>
    * [.geturl(sourcename)](#util.http.webhook.geturl) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.poll(sourcename)](#util.http.webhook.poll) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.ack(webhookid)](#util.http.webhook.ack)

<a name="util.http.webhook.geturl"></a>

##### webhook.geturl(sourcename) ⇒ <code>Promise.&lt;string&gt;</code>
geturl - Returns a public URL that can be used as a webhook target/endpoint for third-party integrations.

**Kind**: static method of [<code>webhook</code>](#util.http.webhook)  
**Returns**: <code>Promise.&lt;string&gt;</code> - A URL for the webhook.  

| Param | Type | Description |
| --- | --- | --- |
| sourcename | <code>string</code> | Unique identifier for the webhook |

<a name="util.http.webhook.poll"></a>

##### webhook.poll(sourcename) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
poll - Returns an array of webhook payloads received by the webhook identified by `sourcename`.

**Kind**: static method of [<code>webhook</code>](#util.http.webhook)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - Payloads as received by the webhook relay service.  

| Param | Type | Description |
| --- | --- | --- |
| sourcename | <code>string</code> | Unique identifier for the webhook |

**Example**  
```js
[
     {
         // Unique ID. Used for ack(webhookid).
         id: 123,

         // UNIX timestamp (in seconds) of when the data was received by the webhook URL.
         timestamp: 1234567890,

         // Source name set in geturl()
         source: "sourcename",

         // JSON string of all the HTTP headers sent to the webhook URL.
         headers: "{'Content-Type': 'application/json'}",

         // Entire HTTP request body sent to the webhook URL.
         body: ""
     }
]
```
<a name="util.http.webhook.ack"></a>

##### webhook.ack(webhookid)
Acknowledge receipt of a webhook payload, deleting it from the relay server.
Webhook payload is only queued for deletion, so polling may still return it for a short time.

**Kind**: static method of [<code>webhook</code>](#util.http.webhook)  

| Param | Type | Description |
| --- | --- | --- |
| webhookid | <code>number</code> | Numeric unique ID received with the payload. See `poll`. |

<a name="util.http.post"></a>

#### http.post(url, data, [responseType], [headers], [method], [continueOnBadStatusCode], [timeoutSeconds]) ⇒ <code>Promise.&lt;(string\|Blob\|ArrayBuffer\|Object)&gt;</code>
post - Fetch a HTTP POST request.

**Kind**: static method of [<code>http</code>](#util.http)  
**Returns**: <code>Promise.&lt;(string\|Blob\|ArrayBuffer\|Object)&gt;</code> - The server response body. See `responseType` parameter.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  |  |
| data | <code>Object.&lt;string, string&gt;</code> |  | POST data key/value list |
| [responseType] | <code>string</code> | <code>&quot;text&quot;</code> | "text", "blob", "buffer", or "json" |
| [headers] | <code>Object.&lt;string, string&gt;</code> |  | HTTP headers to send. Defaults to `{"Content-Type": "application/json"}`. |
| [method] | <code>string</code> | <code>&quot;POST&quot;</code> |  |
| [continueOnBadStatusCode] | <code>boolean</code> | <code>false</code> | If false, throws an Error when the HTTP response code is not 2XX. If true, ignores the response code and proceeds as normal. |
| [timeoutSeconds] | <code>number</code> | <code>15</code> | Aborts the request (timeout) after this many seconds. |

<a name="util.http.fetch"></a>

#### http.fetch(url, [responseType], [timeoutSeconds]) ⇒ <code>Promise.&lt;(string\|Blob\|ArrayBuffer\|Object)&gt;</code>
fetch - Fetch a HTTP GET request.

**Kind**: static method of [<code>http</code>](#util.http)  
**Returns**: <code>Promise.&lt;(string\|Blob\|ArrayBuffer\|Object)&gt;</code> - The server response body. See `responseType` parameter.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  |  |
| [responseType] | <code>string</code> | <code>&quot;text&quot;</code> | "text", "blob", "buffer", or "json" |
| [timeoutSeconds] | <code>number</code> | <code>15</code> | Aborts the request (timeout) after this many seconds. |

<a name="util.string"></a>

### util.string : <code>object</code>
String manipulation functions.

**Kind**: static namespace of [<code>util</code>](#util)  

* [.string](#util.string) : <code>object</code>
    * [.split(input, separator, [limit])](#util.string.split) ⇒ <code>Array.&lt;string&gt;</code>
    * [.chunk(input, chunksize)](#util.string.chunk) ⇒ <code>Array.&lt;string&gt;</code>

<a name="util.string.split"></a>

#### string.split(input, separator, [limit]) ⇒ <code>Array.&lt;string&gt;</code>
Split a string with a separator regex.

**Kind**: static method of [<code>string</code>](#util.string)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | Input string |
| separator | <code>string</code> | Passed to `new RegExp(separator, 'g')` |
| [limit] | <code>number</code> | Maximum number of splits to perform |

<a name="util.string.chunk"></a>

#### string.chunk(input, chunksize) ⇒ <code>Array.&lt;string&gt;</code>
Split a string into chunks of length `chunksize`.

**Kind**: static method of [<code>string</code>](#util.string)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | Input string |
| chunksize | <code>string</code> | Number of characters per chunk |

<a name="util.time"></a>

### util.time : <code>object</code>
Date and time functions

**Kind**: static namespace of [<code>util</code>](#util)  

* [.time](#util.time) : <code>object</code>
    * [.now()](#util.time.now) ⇒ <code>number</code>
    * [.diff(compareto)](#util.time.diff) ⇒ <code>number</code>
    * [.strtotime(str)](#util.time.strtotime) ⇒ <code>number</code>
    * [.format(format, [timestamp])](#util.time.format) ⇒ <code>string</code>
    * [.toDateString(timestamp)](#util.time.toDateString) ⇒ <code>string</code>
    * [.toTimeString(timestamp)](#util.time.toTimeString) ⇒ <code>string</code>

<a name="util.time.now"></a>

#### time.now() ⇒ <code>number</code>
Get the current UNIX timestamp in seconds.

**Kind**: static method of [<code>time</code>](#util.time)  
<a name="util.time.diff"></a>

#### time.diff(compareto) ⇒ <code>number</code>
Get the number of seconds between now and the given Date or UNIX timestamp in seconds.

**Kind**: static method of [<code>time</code>](#util.time)  

| Param | Type |
| --- | --- |
| compareto | <code>number</code> \| <code>Date</code> | 

<a name="util.time.strtotime"></a>

#### time.strtotime(str) ⇒ <code>number</code>
Parse a string date and return UNIX timestamp (in seconds).

**Kind**: static method of [<code>time</code>](#util.time)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="util.time.format"></a>

#### time.format(format, [timestamp]) ⇒ <code>string</code>
Take a Date or UNIX timestamp in seconds and format it to a string.
Mostly compatible with the [PHP date format codes](https://www.php.net/manual/en/datetime.format.php).

**Kind**: static method of [<code>time</code>](#util.time)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| format | <code>string</code> |  | "Y-m-d H:i:s", etc |
| [timestamp] | <code>number</code> \| <code>Date</code> | <code>now()</code> |  |

<a name="util.time.toDateString"></a>

#### time.toDateString(timestamp) ⇒ <code>string</code>
Format a UNIX timestamp (in seconds) as a localized date string.

**Kind**: static method of [<code>time</code>](#util.time)  

| Param | Type |
| --- | --- |
| timestamp | <code>number</code> | 

<a name="util.time.toTimeString"></a>

#### time.toTimeString(timestamp) ⇒ <code>string</code>
Format a UNIX timestamp (in seconds) as a localized time string.

**Kind**: static method of [<code>time</code>](#util.time)  

| Param | Type |
| --- | --- |
| timestamp | <code>number</code> | 

<a name="util.clipboard"></a>

### util.clipboard : <code>object</code>
OS clipboard

**Kind**: static namespace of [<code>util</code>](#util)  
<a name="util.clipboard.copy"></a>

#### clipboard.copy(text, [showNotification]) ⇒ <code>Promise.&lt;boolean&gt;</code>
Copy a string to the system clipboard.

**Kind**: static method of [<code>clipboard</code>](#util.clipboard)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True if the copy succeeded, else false.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  |  |
| [showNotification] | <code>boolean</code> | <code>false</code> | If true, a "Copied" notification will appear onscreen briefly. |

<a name="util.barcode"></a>

### util.barcode : <code>object</code>
Barcode image generation functions.

**Kind**: static namespace of [<code>util</code>](#util)  

* [.barcode](#util.barcode) : <code>object</code>
    * [.getBuffer(data, [type], [height], [scale], [includetext])](#util.barcode.getBuffer) ⇒ <code>Promise.&lt;Buffer&gt;</code>
    * [.getBase64(data, [type], [height], [scale], [includetext])](#util.barcode.getBase64) ⇒ <code>Promise.&lt;string&gt;</code>

<a name="util.barcode.getBuffer"></a>

#### barcode.getBuffer(data, [type], [height], [scale], [includetext]) ⇒ <code>Promise.&lt;Buffer&gt;</code>
Get a PNG image buffer of a barcode. Uses library "bwip-js".

**Kind**: static method of [<code>barcode</code>](#util.barcode)  
**Returns**: <code>Promise.&lt;Buffer&gt;</code> - PNG data for the barcode.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>string</code> |  |  |
| [type] | <code>string</code> | <code>&quot;\&quot;code128\&quot;&quot;</code> |  |
| [height] | <code>number</code> | <code>10</code> |  |
| [scale] | <code>number</code> | <code>2</code> |  |
| [includetext] | <code>boolean</code> | <code>false</code> | Set true to render the barcode's content as text below the code. |

<a name="util.barcode.getBase64"></a>

#### barcode.getBase64(data, [type], [height], [scale], [includetext]) ⇒ <code>Promise.&lt;string&gt;</code>
Get a PNG image of a barcode as a base64 data URI. Uses library "bwip-js".

**Kind**: static method of [<code>barcode</code>](#util.barcode)  
**Returns**: <code>Promise.&lt;string&gt;</code> - "data:image/png;base64,..."  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>string</code> |  |  |
| [type] | <code>string</code> | <code>&quot;\&quot;code128\&quot;&quot;</code> |  |
| [height] | <code>number</code> | <code>10</code> |  |
| [scale] | <code>number</code> | <code>2</code> |  |
| [includetext] | <code>boolean</code> | <code>false</code> | Set true to render the barcode's content as text below the code. |

<a name="util.geography"></a>

### util.geography : <code>object</code>
**Kind**: static namespace of [<code>util</code>](#util)  
<a name="util.geography.isoToCountryName"></a>

#### geography.isoToCountryName(iso) ⇒ <code>string</code>
Get a human-readable country name from an ISO country code.

**Kind**: static method of [<code>geography</code>](#util.geography)  

| Param | Type | Description |
| --- | --- | --- |
| iso | <code>string</code> \| <code>number</code> | 2 or 3 letter country code, or numeric country code. |

<a name="util.objectEquals"></a>

### util.objectEquals(a, b) ⇒ <code>boolean</code>
Compare two objects for equality.  See https://stackoverflow.com/a/16788517

**Kind**: static method of [<code>util</code>](#util)  
**Returns**: <code>boolean</code> - True if equal, else false.  

| Param | Type |
| --- | --- |
| a | <code>\*</code> | 
| b | <code>\*</code> | 

<a name="util.delay"></a>

### util.delay([ms]) ⇒ <code>Promise</code>
Pause execution for some amount of time in an async function, i.e., returns a Promise that resolves in some number of milliseconds.

**Kind**: static method of [<code>util</code>](#util)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [ms] | <code>number</code> | <code>1000</code> | Number of milliseconds to pause. |

