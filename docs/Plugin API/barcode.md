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
    * [.registerDropOffCarrierScanHandler(carrier, fn)](#barcode.registerDropOffCarrierScanHandler)
    * [.decodeAAMVA(barcodeData)](#barcode.decodeAAMVA) ⇒ <code>Object</code>

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

<a name="barcode.registerDropOffCarrierScanHandler"></a>

### barcode.registerDropOffCarrierScanHandler(carrier, fn)
Register to handle prepaid drop off scans for a particular shipping carrier.
Scans are kept in a local, disk-backed queue and the function registered here will be
called when a queued barcode is processed for the provided carrier.
This function is intended for carrier drop-off reimbursement programs such as ASO and FASC.

**Kind**: static method of [<code>barcode</code>](#barcode)  
**Throws**:

- <code>Error</code> - Only one plugin may register a particular carrier with this function;
any subsequent attempts to register to handle that carrier will throw an Error.


| Param | Type | Description |
| --- | --- | --- |
| carrier | <code>string</code> | Carrier name to register for. |
| fn | <code>function</code> | Async function to pass scan details to. Returns true if processed, false if not processed (but the barcode should be removed from queue), or throws an Error if it should be retried later. See example for data and usage. |

**Example**  
```js
global.apis.barcode.registerDropOffCarrierScanHandler("FedEx", function (data) {
    global.apis.alert(`Carrier: ${data.carrier}, Tracking number: ${data.tracking}, `
        + `Raw scanned barcode: ${data.barcode}, `
        + `UNIX timestamp of scan: ${data.timestamp}, Scan UUID: ${data.uuid}`,
        "Processing DropOffCarrierScan data");

    return false; // Not processed but should be discarded
    return true; // Processed, discard from queue
    throw new Error("Failed to process, try again later");
});
```
<a name="barcode.decodeAAMVA"></a>

### barcode.decodeAAMVA(barcodeData) ⇒ <code>Object</code>
Parse the contents of an AAMVA drivers license or ID card's barcode.

**Kind**: static method of [<code>barcode</code>](#barcode)  
**Returns**: <code>Object</code> - {
  type: "", // "DL" (drivers license), "ID" (ID card), or "EN" (enhanced ID)
  name: "", // Full/combined name
  firstname: "", // First name
  middlename: "", // Middle name
  lastname: "", // Last name
  number: "", // ID number
  issuer: "", // Full name of the issuer (state/province name, "USA State Dept.", etc). May be empty for issuers not on PostalPoint's lookup list.
  issuerAbbr: "", // Two-letter issuer abbreviation. May be empty for issuers without a standard abbreviation.
  iin: "", // 6-digit issuer identification number.
  exp: "", // expiration date: "YYYY-MM-DD"
  address: "", // home street address
  city: "", // home city
  state: "", // home state/province
  zip: "", // home postal code
  country: "" // Country code: "US", "CA", or "MX"
}  
**Throws**:

- Error when the barcode doesn't have valid correct header data for an AAMVA license barcode.


| Param | Type | Description |
| --- | --- | --- |
| barcodeData | <code>String</code> | Contents of the barcode. If missing or an empty string, returns an empty data object. |

