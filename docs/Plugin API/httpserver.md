<a name="httpserver"></a>

## httpserver : <code>object</code>
Add features to PostalPoint's integrated LAN HTTP API server.

**Kind**: global namespace  

* [httpserver](#httpserver) : <code>object</code>
    * [.addEndpoint(id, onCall)](#httpserver.addEndpoint)
    * [.getServerPort()](#httpserver.getServerPort) ⇒ <code>number</code>
    * [.getClientKey()](#httpserver.getClientKey) ⇒ <code>string</code>
    * [.sendRequestToRemote(data, endpointID, serverAddress, serverPort)](#httpserver.sendRequestToRemote) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="httpserver.addEndpoint"></a>

### httpserver.addEndpoint(id, onCall)
Add a custom HTTP JSON POST endpoint to the LAN HTTP API server running inside
PostalPoint.  Requests must be POSTed and contain a JSON body (or empty body, which will be converted to `null`).

**Kind**: static method of [<code>httpserver</code>](#httpserver)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Endpoint ID. Used in URL, for example: `http://<host>:7678/<id>` |
| onCall | <code>function</code> | Async function to call when the endpoint is called, which returns the response. |

**Example**  
```js
global.apis.httpserver.addEndpoint("testendpoint", async function (request) {
    if (request.abc == "123") {
        // A non-string `body` is converted to JSON before the HTTP reply is sent.
        return {body: {json: true, abc: 123}, httpcode: 200, contentType: "application/json"};
    }
    // A string `body` is sent to the client as-is using whatever contentType you specify.
    return {body: "abc", httpcode: 200, contentType: "text/plain"};
});
```
<a name="httpserver.getServerPort"></a>

### httpserver.getServerPort() ⇒ <code>number</code>
Get the local HTTP server's port number.

**Kind**: static method of [<code>httpserver</code>](#httpserver)  
<a name="httpserver.getClientKey"></a>

### httpserver.getClientKey() ⇒ <code>string</code>
Get the local machine's HTTP client key it uses to authenticate with other
installations of PostalPoint on the LAN.

**Kind**: static method of [<code>httpserver</code>](#httpserver)  
<a name="httpserver.sendRequestToRemote"></a>

### httpserver.sendRequestToRemote(data, endpointID, serverAddress, serverPort) ⇒ <code>Promise.&lt;Object&gt;</code>
Send a HTTP request to another PostalPoint installation on the local network.

**Kind**: static method of [<code>httpserver</code>](#httpserver)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The JSON reply.  
**Throws**:

- <code>Error</code> When there's a network or other unrecoverable error while completing the request.  Error message is a human-readable description of the problem.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Data to encode as JSON in the request body. |
| endpointID | <code>string</code> | Endpoint to call. |
| serverAddress | <code>string</code> \| <code>undefined</code> | Address of the PostalPoint server. If undefined, uses the host address configured in PostalPoint's Databases settings. |
| serverPort | <code>number</code> \| <code>undefined</code> | Port of the PostalPoint server. If undefined, the default PostalPoint port number is used. |

