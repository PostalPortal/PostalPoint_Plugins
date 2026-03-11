# HTTP API Server

PostalPoint runs a local HTTP server to allow communication with other devices on the LAN.

With the `httpserver` plugin API, plugins can add their own local API endpoints.

Valid HTTP API requests are POST requests with either a JSON request body, or an entirely empty body.

The default HTTP server settings are to bind to all addresses on port 7678.  There is a basic API web client accessible on `/` for manual API access, for example, at http://localhost:7678/.

## Security

API requests are authenticated with a "Network Connection Key".  Each installation of PostalPoint maintains a user-configurable list of keys which are allowed to connect to that installation's API server.

This means that, in order for a remote client to connect to PostalPoint, it must generate a random alphanumeric ID, which must be saved in the PostalPoint settings.

## Adding an API endpoint

This code adds an endpoint reachable by POST to `http://[local hostname]:[port]/testendpointname`.

```js
global.apis.httpserver.addEndpoint("testendpointname", async function (request) {
    // `request` is an object parsed from the request body.
    if (request.abc == "123") {
        // A non-string `body` is converted to JSON before the HTTP reply is sent.
        return {body: {json: true, abc: 123}, httpcode: 200, contentType: "application/json"};
    }
    // A string `body` is sent to the client as-is using whatever contentType you specify.
    return {body: "abc", httpcode: 200, contentType: "text/plain"};
});
```

## Connecting to a remote endpoint

By default, `sendRequestToRemote` uses the configured "Host PC", but a different hostname/IP may be specified.

This code hits the endpoint added above.

```js
try {
    const responseObject = await global.apis.httpserver.sendRequestToRemote({abc: "123"}, "testendpointname");
    // responseObject will be {json: true, abc: 123}
    console.log(responseObject);
} catch (ex) {
    global.apis.alert(ex.message, "Request Error");
}
```
