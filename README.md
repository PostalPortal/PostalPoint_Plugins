# PostalPoint Plugins

PostalPoint® supports plugin extensions. Plugins can hook into PostalPoint to add features.

## What plugins can do

* Process card payments and handle saved payment methods
* Add additional carriers and provide shipping rates
* Print to label and receipt printers, letting PostalPoint handle hardware support and drivers
* Extend support for prepaid label acceptance, prepaid barcode recognition, and carrier dropoff QR codes
* Install pages in the Tools interface, creating new interfaces and features
* Receive transaction receipts for ingestion into third-party accounting or business software
* Run both Node.JS and browser code.

## Plugin Package Structure

A plugin is distributed as a simple ZIP file, containing a folder. The folder then has at least one file, named `plugin.js`.
The `exports.init` function in `plugin.js` is executed when PostalPoint launches, allowing the plugin
to request involvement with various events in PostalPoint.

PostalPoint installs plugin packages by unzipping their contents into a plugins folder.
Plugins are uninstalled by deleting their folder.

## Minimal Plugin Code

```javascript
// plugin-name/plugin.js
exports.init = function () {
    global.apis.alert("This message appears when PostalPoint launches.", "Hello!");
};
```

Yes, the smallest plugin really is just two lines of code, and accessing PostalPoint features
really is that easy.

## Plugin Metadata File

While not strictly required, a `package.json` is encouraged, and allows specifying the plugin's
display name, PostalPoint version compatibility, and using a filename other than `plugin.js`
for the main plugin script.

Sample:

```js
{
    "name": "plugin-id-here",
    "main": "plugin.js",
    "description": "Human-readable description of the plugin",
    "version": "1.0.0",
    "author": "Your Name",
    "license": "Code license name",
    "postalpoint": {
        "pluginname": "Display Name for Plugin",
        "minVersion": "000034",
        "maxVersion": "001000"
    }
}

```

PostalPoint version codes are MMMnnn where MMM is the major version and nnn is the minor version, zero-padded.
So version 0.35 is "000035", and 1.23 is "001023".

## Example Plugins

Check out the `examples` folder for sample plugins demonstrating the API features.

## PostalPoint Plugin API

The PostalPoint plugin API is a globally-available object named `global.apis`.

### API List

#### Core

`global.apis.`:

* `alert(text, title)`: Display an alert dialog.
* `getAppFolder()`: Get the filesystem path to the PostalPoint installation folder.
* `getPluginFolder(pluginName)`: Get the filesystem path to a plugin's folder.
  If used without arguments, gets the root plugin storage folder.
* `f7`: The Framework7 app instance for PostalPoint's entire UI, created by `new Framework7()`.  See https://framework7.io/docs/app for details.  Be very careful.
* `eventbus`: A [Framework7 event bus](https://framework7.io/docs/events#events-bus) that parts of PostalPoint broadcast on. See docs/Events.md for details.

#### Barcode

`global.apis.barcode.`:

* `TrackingBarcode`: A class defining a prepaid barcode and related information.  See docs/TrackingBarcode.md for details.
* `onPrepaidScan(function (codeString) {})`: The function passed to onPrepaidScan is run
when a barcode is scanned on the Prepaid page. The function is passed one argument, a string
containing the raw barcode data. The function shall return boolean `false` if unable or unwilling
to handle the barcode. If the barcode is handled by this function, it shall return a TrackingBarcode object.
* `addPrepaidBarcode(trackingBarcodeData)`: Add a TrackingBarcode object to the transaction receipt at any time other than `onPrepaidScan`.

#### Database

PostalPoint supports multiple SQL databases, currently SQLite and MariaDB.

`global.apis.database.`:

* `async getConnection()`: Returns a database driver. See docs/Database.md for details.


#### Graphics

PostalPoint uses the Jimp library version 1.6 for creating and manipulating images and shipping labels.

`global.apis.graphics.`:

* `Jimp()`: The [JavaScript Image Manipulation Program](https://jimp-dev.github.io/jimp/). Access like so: `const {Jimp} = global.apis.graphics.Jimp();`.
* `async loadFont(filename)`: Replacement for [Jimp's loadFont](https://jimp-dev.github.io/jimp/api/jimp/functions/loadfont/), which gets very confused about our JS environment and ends up crashing everything.

#### Kiosk

`global.apis.kiosk.`:

* `isKiosk()`: Returns a boolean to indicate if PostalPoint is running in kiosk mode.

#### Point of Sale

`global.apis.pos.`:

* `addReceiptItem(item)`: Add a `ReceiptItem` to the current transaction.
* `addReceiptPayment(item)`: Add a `ReceiptPayment` to the current transaction.
* `addOnscreenPaymentLog(string)`: Append a line of text to the onscreen log displayed during credit card processing. Not shown in kiosk mode.
* `onReceiptChange(function (receipt) {})`: Add a function to be called whenever the transaction data/receipt is changed.
* `onTransactionFinished(function (receipt) {})`: Same as `onReceiptChange` except run when a transaction is completed.
* `registerCardProcessor(...)`: Register the plugin as a credit card processor. See examples/payment-processor for details.
* `ReceiptItem`: A class representing a sale item in the current transaction. See docs/Receipt.md for details.
* `ReceiptPayment`: A class representing a payment entry for the current transaction. See docs/Receipt.md for details.

#### Printing

`global.apis.print.`:

* `async printLabelImage(image)`: Print a 300 DPI image to the configured shipping label printer. centered on a 4x6 shipping label.
  If the printer is 200/203 DPI, the image is automatically scaled down to keep the same real size.
  Accepts a Jimp image, or the raw image file data as a Node Buffer, ArrayBuffer, or Uint8Array.
  Also accepts an http/https image URL, but it is recommended you fetch the image yourself and handle any network errors.
  Recommended image size is 1200x1800, which is 4x6 inches at 300 DPI. 800x1200 images are assumed to be 4x6 but at 200 DPI.
  For compatibility reasons, the bottom 200 pixels on an 800x1400 image is cropped off.
  Images wider than they are tall will be rotated 90 degrees.  Images that are 1200 or 800 pixels
  wide and multiples of 1800 or 1200 pixels tall, respectively, are automatically split and printed
  onto multiple 1200x1800 or 800x1200 labels.
* `async getReceiptPrinter()`: Get the receipt printer interface.  See docs/ReceiptPrinter.md for available printer functions and example code.
* `async printReceiptData(data)`: Print the raw data generated by the receipt printer interface.
* `imageToBitmap(jimpImage, dpiFrom = 300, dpiTo = 300)`: Convert a Jimp image to monochrome 1-bit
  pixel data for printing on a receipt printer. Converts color to grayscale, and grayscale is dithered to monochrome.
  Optionally changes the image DPI. Use this to get image data for sending to a receipt printer.
  Returns an object such as {width: 300, height: 200, img: Uint8Array}. Pass the img value to `drawImage`.


#### Settings/Configuration Storage

PostalPoint provides a UI for user-configurable plugin settings. See `exports.config` in examples/basic-demo/plugin.js for details.

Settings are typically very short strings. Do not store data in settings. Non-string settings values
are transparently converted to/from JSON objects.

Use a unique prefix for your plugin to prevent key name conflicts.

`global.apis.settings.`:

* `get(key, defaultValue)`: Get a setting value, or the `defaultValue` if the setting is not set.
* `set(key, value)`: Set a setting value.


#### Storing Data

Behavior is the same as the settings storage. `setBig` stores the data to disk as a JSON file,
while `setSmall` uses the settings storage.
Use `setBig` and `getBig` for storing data except for very short string or number values.

`global.apis.storage.`:

* `getBig(key, defaultValue)`
* `getSmall(key, defaultValue)`
* `setBig(key, value)`
* `setSmall(key, value)`


#### Shipping and Rates

`global.apis.shipping.`:

* `Address`: A class representing an address. See docs/Address.md.
* `getZIPCode(zip)`: Get data for a 5-digit US ZIP Code, such as
  `{"city": "HELENA", "state": "MT", "type": "STANDARD"}`.
  Returns `false` if the ZIP Code isn't in the database.
* `registerRateEndpoint(getRate, purchase, idPrefix)`: Register the plugin as a shipping rate and label provider.
  See examples/shipping/plugin.js for example usage.

#### UI

`global.apis.ui.`:

* `addToolsPage(page, title, id = "", description = "", cardTitle = "", icon = "", type = "page")`: Add a page to the Tools screen. See examples/basic-demo for example usage.  If `type` is set to "function", the `page` argument will be run as a function and will not be expected to return a page component.
* `showProgressSpinner(title, text = "", subtitle = "")`: Show a Framework7 notification with a loading icon.
* `hideProgressSpinner()`: hide the UI element created by `showProgressSpinner`.
* `openInternalWebBrowser(url)`: Open a web browser UI, navigating to the URL. The browser has forward/back/close buttons.
* `openSystemWebBrowser(url)`: Open the native OS default browser to the URL given.
* `getCustomerDisplayInfo()`: Describes if the customer-facing display is currently enabled, and if it supports customer touch interaction: `{"enabled": true, "touch": true}`.
* `clearCustomerScreen()`: Clear any custom content on the customer-facing display, defaulting back to blank/receipt/shipping rates, as applicable.
* `setCustomerScreen(content, type = "html")`: Encodes `content` as a data URI (example: `` `data:text/html;charset=utf-8,${content}` ``) and renders on the customer-facing display.  If `type` is `html`, renders the string as HTML.  If `type` is `pdf`, displays a PDF viewer.  If `type` is `raw`, functions like setting an iframe's src to `content`.  All other `type` values are rendered as `text/plain`.  Warning: Do not load third-party websites, this is a security risk. Wrap it in a `<webview src="..."></webview>` tag if you need to display one.
* `collectSignatureFromCustomerScreen()`: Show a signature pad on the customer-facing display. When the customer indicates the signature is finished, the `customerSignatureCollected` event is emitted with the data `{"svg": "data:image/svg+xml;base64,...", "png": "data:image/png;base64,..."}`
* `cancelSignatureCollection()`: Cancels customer signature collection and returns the customer-facing display to normal operation.
* `clearSignaturePad()`: Erase the signature on the customer-facing display. Note that the customer is also provided a button to do this.


#### Utilities

Various useful helper functions.

`global.apis.util.`:

* `barcode.getBuffer(data, type = "code128", height = 10, scale = 2, includetext = false)`: Get a PNG image buffer of a barcode.  Uses library "bwip-js".
* `clipboard.copy(text, showNotification = false)`: Copy a string to the system clipboard, optionally showing a "copied" notification to the user.
* `async delay(ms = 1000)`: Pause execution for some amount of time in an async function, i.e., returns a Promise that resolves in some number of milliseconds.
* `async http.fetch(url, responseType = "text", timeout = 15)`: Fetch a URL.  `responseType` can be "text", "blob", "buffer", or "json". Timeout is in seconds.
* `async http.post(url, data, responseType = "text", headers = {"Content-Type": "application/json"}, method = "POST", continueOnBadStatusCode = false)`: POST to a URL.  `data` is sent as a JSON body.
* `objectEquals(a, b)`: Compare two objects for equality.
* `string.chunk(str, chunksize)`: Split a string into an array of strings of length `chunksize`.
* `string.split(input, separator, limit)`: Split a string with a RegExp separator an optionally limited number of times.
* `time.diff(compareto)`: Get the number of seconds between now and the given UNIX timestamp.
* `time.format(format, timestamp = time.now())`: Take a UNIX timestamp in seconds and format it to a string. (Mostly) compatible with PHP's date() function.
* `time.now()`: Get the current UNIX timestamp in seconds.
* `time.strtotime(str)`: Parse a string date and return a UNIX timestamp.
* `time.toDateString(timestamp)`: Get a localized date string for a UNIX timestamp.
* `time.toTimeString(timestamp)`: Get a time string for a UNIX timestamp, for example, "2:01 PM".
* `uuid.v4()`: Generate a version 4 UUID string, for example, "fcca5b12-6a11-46eb-96e4-5ed6365de977".
* `uuid.short()`: Generate a 16-character random alphanumeric string, for example, "4210cd8f584e6f6c".