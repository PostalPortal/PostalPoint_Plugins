<a name="documentscanner"></a>

## documentscanner : <code>object</code>
Scan documents from flatbed/ADF scanners.

**Kind**: global namespace  

* [documentscanner](#documentscanner) : <code>object</code>
    * [.discoverScanners()](#documentscanner.discoverScanners) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.scanToPDF(scannerObj, opts)](#documentscanner.scanToPDF) ⇒ <code>Promise.&lt;Blob&gt;</code>

<a name="documentscanner.discoverScanners"></a>

### documentscanner.discoverScanners() ⇒ <code>Promise.&lt;Array&gt;</code>
Get a list of document scanners found on the network. Supports eSCL/AirPrint.

**Kind**: static method of [<code>documentscanner</code>](#documentscanner)  
**Example**  
```js
[{
         protocol: "http",
         host: "ip or hostname",
         port: 80,
         rs: "eSCL",
         uuid: "1234etc",
         icon: "http://hostname/icon.png", // Icon supplied by the scanner to represent itself visually to the user.
         name: "ScanTron 9000",
         note: "", // Whatever is set as the scanner's human-readable location in its settings
         hasAdf: true, // Has an automatic document/page feeder
         hasPlaten: true, // Has a flatbed
         hasDuplex: false // Can do automatic duplex scanning
         }]
```
<a name="documentscanner.scanToPDF"></a>

### documentscanner.scanToPDF(scannerObj, opts) ⇒ <code>Promise.&lt;Blob&gt;</code>
Scan a document to PDF. Supports eSCL/AirPrint.

**Kind**: static method of [<code>documentscanner</code>](#documentscanner)  
**Returns**: <code>Promise.&lt;Blob&gt;</code> - PDF file.  

| Param | Type | Description |
| --- | --- | --- |
| scannerObj | <code>Object</code> | A scanner object from discoverScanners() |
| opts | <code>Object</code> | Scanning options:   dpi?: number,            // default 300   colorMode?: string,      // "RGB24" | "Grayscale8" | "BlackAndWhite1", default "RGB24"   source?: string,         // Where the document is physically located: "Platen" or "Feeder". Default is "Feeder" (if scanner has one and it isn't empty) or unset (so scanner can autodetect media).   intent?: string,         // default is unset. "Document" | "TextAndGraphic" | "Photo" | "Preview"   duplex?: boolean,        // default true if the scanner supports it.   scanHeight?: number,     // Height in inches. Default 11.   scanWidth?: number       // Width in inches. Default 8.5. |

