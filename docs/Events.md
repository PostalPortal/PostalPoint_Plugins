# Event Bus

Plugins can use `global.apis.eventbus` to receive events when certain actions happen in PostalPoint.

## Event List

* `barcodeScanned`: Contents of a barcode that was just scanned.
* `browserCloseRequest`: The embedded web browser listens for this event, and closes itself when received.
* `browserNavigate`: Contains the URL the embedded web browser just navigated to.
* `transactionFinished`: Contains a receipt object of a transaction that was just finalized.

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