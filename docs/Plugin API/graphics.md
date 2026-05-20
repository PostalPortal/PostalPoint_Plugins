<a name="graphics"></a>

## graphics : <code>object</code>
PostalPoint uses the Jimp library version 1.6 for creating and manipulating images and shipping labels.

**Kind**: global namespace  

* [graphics](#graphics) : <code>object</code>
    * [.Jimp()](#graphics.Jimp) ⇒ <code>Jimp</code>
    * [.loadFont(filename)](#graphics.loadFont) ⇒ <code>Promise</code>
    * [.pdfToImage(buffer, width, height, [autoRotate], [outputPageCount])](#graphics.pdfToImage) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.zplToImage(zplData, [widthMM], [heightMM], [dpmm])](#graphics.zplToImage) ⇒ <code>Promise.&lt;Array&gt;</code>

<a name="graphics.Jimp"></a>

### graphics.Jimp() ⇒ <code>Jimp</code>
The [JavaScript Image Manipulation Program](https://jimp-dev.github.io/jimp/).

**Kind**: static method of [<code>graphics</code>](#graphics)  
**Example**  
```js
const {Jimp} = global.apis.graphics.Jimp();
```
<a name="graphics.loadFont"></a>

### graphics.loadFont(filename) ⇒ <code>Promise</code>
Replacement for [Jimp's loadFont function](https://jimp-dev.github.io/jimp/api/jimp/functions/loadfont/),
which gets very confused about our JS environment and ends up crashing everything.

**Kind**: static method of [<code>graphics</code>](#graphics)  

| Param | Type |
| --- | --- |
| filename | <code>string</code> | 

<a name="graphics.pdfToImage"></a>

### graphics.pdfToImage(buffer, width, height, [autoRotate], [outputPageCount]) ⇒ <code>Promise.&lt;Array&gt;</code>
Convert a PDF to an array of images with the specified width and height.
Pages that aren't the same ratio as the specified width and height will be centered on the image.

**Kind**: static method of [<code>graphics</code>](#graphics)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - Jimp image array, one image per page  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Buffer</code> |  | PDF data as Buffer |
| width | <code>Number</code> |  | Desired output width in pixels |
| height | <code>Number</code> |  | Desired output height in pixels |
| [autoRotate] | <code>Boolean</code> | <code>true</code> | If true, images will be rotated to best fit the desired dimensions. |
| [outputPageCount] | <code>Number</code> | <code>-1</code> | Only process the first N pages, or all if -1. |

<a name="graphics.zplToImage"></a>

### graphics.zplToImage(zplData, [widthMM], [heightMM], [dpmm]) ⇒ <code>Promise.&lt;Array&gt;</code>
Convert a ZPL string to an array of images with the specified width and height.
Supports ZPL data containing multiple labels; each label is rendered as its own image.

**Kind**: static method of [<code>graphics</code>](#graphics)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - Jimp image array, one image per label.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| zplData | <code>String</code> |  | ZPL label data |
| [widthMM] | <code>Number</code> | <code>102</code> | Label width in millimeters. |
| [heightMM] | <code>Number</code> | <code>152</code> | Label height in millimeters. |
| [dpmm] | <code>Number</code> | <code>8</code> | Dots per millimeter. 8 is 200/203 DPI, 12 is 300 DPI. Supports passing 200, 203, or 300 as well; the correct DPMM value (8 or 12) will be used. |

