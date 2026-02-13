# Event Bus

Plugins can use `global.apis.eventbus` to receive events when certain actions happen in PostalPoint.

## Event List

* `barcodeScanned`: Contents of a barcode that was just scanned, as a string. String also contains any non-printing characters in the barcode.
* `browserCloseRequest`: The embedded web browser listens for this event, and closes itself when received.
* `browserNavigate`: Contains the URL the embedded web browser just navigated to.
* `sendToCustomerScreen`: Emit to send data via `window.postMessage` to a custom HTML interface on the customer-facing display.
* `receiveFromCustomerScreen`: Contains the event sent from the customer-facing display's custom HTML interface via `window.parent.postMessage`
* `transactionFinished`: Contains a receipt object of a transaction that was just finalized. See below for event data details.
* `customerSignatureCollected`: Contains a signature image from the customer-facing display. See below for event data details.
* `settingsSaved`: Emitted when PostalPoint's settings are saved. Usually this means the user changed a setting in the UI.
* `pluginSettingsSaved`: Emitted when the user saves a plugin's settings. The plugin ID string is sent as the event data.
* `packageCheckIn`: Emitted when a package is checked in to a mailbox or for Hold At Location. See below for event data details.
* `mailboxMailDelivered`: Emitted when mail delivery notifications are sent by the user. Data is an array of the mailbox numbers notifications are being sent for.

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

## Event Data Objects

For events that return an object instead of a single value.

### transactionFinished

See [Receipt](./Receipt.md)

### customerSignatureCollected

```javascript
{
    "svg": "data:image/svg+xml;base64,...",
    "png": "data:image/png;base64,..."
}
```

### packageCheckIn

```javascript
{
    tag: "abcxyz123456", // Unique ID for the package, also found in the shelf label barcode.
    tracking: "94001...", // Package tracking number. May be an empty string for items without tracking.
    carrier: "FedEx", // Package carrier name, if detectable from the tracking number.  Otherwise an empty string.
    mailbox: "123", // Mailbox number. Will be "HAL" for Hold At Location packages.
    isHAL: false, // True if package is for Hold At Location.
    recipient: "", // Hold At Location recipient name, or empty string if not HAL.
    toLocker: "5", // Parcel locker number, or false if not going to a parcel locker.
    shelfLabelPrinted: true // Indicates if a shelf label was printed for this package.  Will be false if going to a locker, if the user requested no label, or if the label failed to print.
}
```
