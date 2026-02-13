# Receipt Printer driver functions

PostalPoint abstracts the receipt printer hardware commands, so the same functions are available on
all brands and languages of receipt printer, and printer media size and settings are also handled for you.

The drivers operate in line mode, where each successive command appends content to the bottom of the page.

These functions are available on the object supplied by the promise returned from
`global.apis.print.getReceiptPrinter()`.

## Functions

```javascript

//
// Add one or more lines of text, with automatic wrapping.
// If both firsttext and secondtext are provided, two columns of text are generated,
// with the first left-justified and the second right-justified.
// `firstjustify` can be "L" (left), "C" (center), or "R" (right).
// Not all printers support all the formatting options, and may render them in different ways,
// but the formatting intent is made clear regardless.
addFieldBlock(firsttext, firstjustify, secondtext = "", secondjustify = "R", bold = false, doubleheight = false, underline = false);

// Add a blank line to the label.
newLine();

// Draw a horizontal line across the page.
drawLine();

// Render a Code 128 barcode, centered horizontally, with a human-readable label beneath.
// Important: this function is sometimes asynchronous depending on the printer driver.
barcode128(content);

// Print an image.  Width is in pixels.
// pixelByteArray is a Uint8Array where each bit is a pixel (1=black, 0=white),
// starting at the top-left of the image and going across and then down. Use `imageToBitmap` to
// obtain this data from a Jimp image.
// Use "L" as the position to print on the next line, centered horizontally.
// Some printers also support position = "C", which will
// ignore other commands and print the image centered on the label,
// but if you're doing that, just use `global.apis.print.printLabelImage()` instead.
drawImage(width, position, pixelByteArray);

// If supported by the printer, opens an attached cash drawer.  Command is ignored if unavailable.
openCashDrawer();

// The last command to run, when ready to print. Returns the raw data to send to the printer.
// Important: this function is sometimes asynchronous depending on the printer driver.
getData();

```

## Example

```javascript
var printer = await global.apis.print.getReceiptPrinter();

printer.addFieldBlock("Hello Bold World!", "C", "", "", true);
printer.drawLine();
await printer.barcode128("1234567890");
printer.newLine();

await global.apis.printer.printReceiptData(await printer.getData());
```