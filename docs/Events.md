# Event Bus

Plugins can use `global.apis.eventbus` to receive events when certain actions happen in PostalPoint.

## Event List

* `barcodeScanned`: Contents of a barcode that was just scanned.
* `browserCloseRequest`: The embedded web browser listens for this event, and closes itself when received.
* `browserNavigate`: Contains the URL the embedded web browser just navigated to.
* `sendToCustomerScreen`: Emit to send data via `window.postMessage` to a custom HTML interface on the customer-facing display.
* `transactionFinished`: Contains a receipt object of a transaction that was just finalized.
* `receiveFromCustomerScreen`: Contains the event sent from the customer-facing display's custom HTML interface via `window.parent.postMessage`
* `customerSignatureCollected`: Contains a signature image from the customer-facing display, in the structure `{"svg": "data:image/svg+xml;base64,...", "png": "data:image/png;base64,..."}`.

## Example Code

```javascript

// Handle a barcode scan.
// Remember that PostalPoint will probably also be doing something in response to the barcode.
global.apis.eventbus.on("barcodeScanned", function (barcodedata) {
    // do something with the barcode
});

// Close the embedded web browser, returning the user to whatever was onscreen before it opened
global.apis.eventbus.emit("browserCloseRequest");

```