<a name="barcode"></a>

## barcode : <code>object</code>
Handle tracking barcodes

**Kind**: global namespace  

* [barcode](#barcode) : <code>object</code>
    * [.TrackingBarcode](#barcode.TrackingBarcode)
        * [new TrackingBarcode(code)](#new_barcode.TrackingBarcode_new)
    * [.addPrepaidBarcode(trackingBarcodeData)](#barcode.addPrepaidBarcode)
    * [.inject(barcodeData)](#barcode.inject)
    * [.onPrepaidScan(f)](#barcode.onPrepaidScan)

<a name="barcode.TrackingBarcode"></a>

### barcode.TrackingBarcode
**Kind**: static class of [<code>barcode</code>](#barcode)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| tracking | <code>string</code> | Tracking number |
| barcode | <code>string</code> | Original barcode data this was created from |
| toZip | <code>string</code> | Destination ZIP Code, for domestic shipments. The city and state are automatically added.  If toAddress is specified, toZip is ignored in favor of it. |
| toCountry | <code>string</code> | Two-letter destination country code.  If it doesn't match the country PostalPoint is running in, the full country name is appended to the displayed address information. |
| toAddress | <code>string</code> | Destination mailing/shipping address. |
| carrier | <code>string</code> | Shipping carrier name. |
| service | <code>string</code> | Shipping service/mail class name. Example: "Priority Mail". |
| dropoff | <code>boolean</code> | If set to false, the barcode will be rejected with a suitable message when PostalPoint is running in self-serve kiosk mode. |
| confidentCarrier | <code>boolean</code> | If false, PostalPoint may prompt user to specify the shipping carrier. |
| extraInfo | <code>Array.&lt;string&gt;</code> | Extra description strings, like "Signature Required". |
| message | <code>string</code> | If not empty, the barcode will NOT be added and the contents of `message` will be displayed to the user. |
| warning | <code>string</code> | If not empty, the barcode WILL be added and the contents of `warning` will be displayed to the user. |
| destString | <code>string</code> | (read only) Get the destination information as a human-presentable multiline string. |
| serviceString | <code>string</code> | (read only) Get the carrier and service. |
| toString() | <code>function</code> | Get the package information in a format suitable for display on a receipt. |
| toString(false) | <code>function</code> | Get the package information in a format suitable for display on a receipt, suppressing the tracking number. |

<a name="new_barcode.TrackingBarcode_new"></a>

#### new TrackingBarcode(code)
A Tracking barcode object.


| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | Barcode data |

<a name="barcode.addPrepaidBarcode"></a>

### barcode.addPrepaidBarcode(trackingBarcodeData)
Add a TrackingBarcode object to the transaction receipt at any time other than `onPrepaidScan`.

**Kind**: static method of [<code>barcode</code>](#barcode)  

| Param | Type |
| --- | --- |
| trackingBarcodeData | <code>TrackingBarcode</code> | 

<a name="barcode.inject"></a>

### barcode.inject(barcodeData)
Pass data to the internal barcode event subsystem. The data is handled as if it
were just received from a physical barcode scanner.

**Kind**: static method of [<code>barcode</code>](#barcode)  

| Param | Type |
| --- | --- |
| barcodeData | <code>string</code> | 

<a name="barcode.onPrepaidScan"></a>

### barcode.onPrepaidScan(f)
The function passed to onPrepaidScan is run when a barcode is scanned on the Prepaid page.
The function is passed one argument, a string containing the raw barcode data.
The function shall return boolean false if unable or unwilling to handle the barcode.
If the barcode is handled by this function, it shall return a TrackingBarcode object.

**Kind**: static method of [<code>barcode</code>](#barcode)  

| Param | Type |
| --- | --- |
| f | <code>function</code> | 

