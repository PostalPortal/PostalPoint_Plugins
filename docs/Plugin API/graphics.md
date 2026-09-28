<a name="graphics"></a>

## graphics : <code>object</code>
PostalPoint uses the Jimp library version 1.6 for creating and manipulating images and shipping labels.

**Kind**: global namespace  

* [graphics](#graphics) : <code>object</code>
    * [.Jimp()](#graphics.Jimp) ⇒ <code>Jimp</code>
    * [.renderText(a, [b])](#graphics.renderText) ⇒ <code>Jimp</code>
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
<a name="graphics.renderText"></a>

### graphics.renderText(a, [b]) ⇒ <code>Jimp</code>
Draw text onto a Jimp image. Uses the platform's (i.e. Chromium) text engine.
The text is rasterized and alpha-blended (source-over) directly into `image.bitmap.data`.
The image is mutated in place and also returned, so either calling style works:

    img = renderText({ image: img, size: 50, ... });
    renderText(img, { size: 50, ... });

Text is laid out inside the box (`x`, `y`, `maxWidth`, `maxHeight`) and
aligned within it. Content taller than the box overflows downward rather than
being clipped — use `shrinkToFit` to bound it. Anything falling outside the
image itself is clipped.

**Kind**: static method of [<code>graphics</code>](#graphics)  
**Returns**: <code>Jimp</code> - The same image passed in, mutated.  
**Throws**:

- <code>Error</code> If `image` is missing or is not a Jimp image.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| a | <code>Jimp</code> \| <code>Object</code> |  | The options object, or the Jimp image when the        options are passed as the second argument. |
| [b] | <code>Object</code> |  | The options, when the image was passed positionally. |
| options.image | <code>Jimp</code> |  | Target image. Required unless passed as the        first argument. Mutated in place. |
| options.font | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | Registered font family name, or an        ordered list of them. Automatic fallback to system fonts as needed.        Defaults to `PostalPointSans`. |
| [options.size] | <code>number</code> | <code>32</code> | Font size in pixels. |
| [options.weight] | <code>string</code> \| <code>number</code> | <code>&quot;\&quot;normal\&quot;&quot;</code> | CSS font weight:        `"normal"`, `"bold"`, or 100–900. |
| [options.style] | <code>string</code> | <code>&quot;\&quot;normal\&quot;&quot;</code> | CSS font style: `"normal"`,        `"italic"` or `"oblique"`. Synthesized if no matching face exists. |
| [options.color] | <code>string</code> | <code>&quot;\&quot;#000000\&quot;&quot;</code> | Any CSS color string. Alpha in        the color (`rgba(...)`) composites correctly against the image. |
| [options.x] | <code>number</code> | <code>0</code> | Left edge of the text box, in image pixels. |
| [options.y] | <code>number</code> | <code>0</code> | Top edge of the text box, in image pixels. |
| [options.maxWidth] | <code>number</code> |  | Box width. Wrapping and horizontal        alignment are both measured against it. Defaults to the remaining        image width from `x`. |
| [options.maxHeight] | <code>number</code> |  | Box height. Used for vertical alignment        and as the target for `shrinkToFit`. Defaults to the remaining image        height from `y`. |
| options.text | <code>string</code> \| <code>Object</code> |  | The string to draw, or an object        matching Jimp's `print()` shape. |
| options.text.text | <code>string</code> |  | The string to draw. Embedded `\n` forces        a hard break. Empty or null returns the image untouched. |
| [options.text.alignmentX] | <code>number</code> \| <code>string</code> |  | Horizontal alignment        within `maxWidth`. Accepts Jimp's `HorizontalAlign` enum        or the strings `"left"`, `"center"`, `"right"`. Defaults to left. |
| [options.text.alignmentY] | <code>number</code> \| <code>string</code> |  | Vertical alignment of the        whole text block within `maxHeight`. Accepts Jimp's `VerticalAlign`        enum or the strings `"top"`, `"middle"`, `"bottom"`. Defaults to top. |
| [options.lineHeight] | <code>number</code> |  | Row pitch. Values of 4 or less are        treated as a multiplier of the font's natural line height        (`1.5` = one-and-a-half spacing); larger values are an absolute pixel        pitch. Omitted, the font's own ascent + descent is used. Set an        absolute value when rows must land on a pre-printed grid, or when        several columns have to stay row-aligned with each other. |
| [options.wrap] | <code>boolean</code> | <code>true</code> | When false, lines break only at        explicit `\n` and `maxWidth` governs alignment alone. Use this for        columns whose rows must correspond one-to-one across several calls,        where an auto-wrap in one column would desync the others. |
| [options.kinsoku] | <code>boolean</code> | <code>true</code> | Applies simplified kinsoku shori:        prevents a line from beginning with closing punctuation        (`。` `、` `）` `!` `?` and similar), letting it hang past `maxWidth`        instead. Only affects text containing those characters. |
| [options.shrinkToFit] | <code>boolean</code> | <code>false</code> | Step the size down (~4% at a        time) until the wrapped block fits within `maxHeight`, or `minSize` is        reached. |
| [options.minSize] | <code>number</code> | <code>8</code> | Floor for `shrinkToFit`, in pixels.        Below this the text stops shrinking and is allowed to overflow. |
| [options.mono] | <code>boolean</code> \| <code>number</code> | <code>false</code> | Hard-threshold the antialiased        alpha to fully on or off before blending, producing pure 1-bit edges        for direct thermal printing. `true` thresholds at 128; a number sets        the cutoff (lower = heavier text). Leave off when the downstream        rasterizer dithers or does its own halftoning. |
| [options.letterSpacing] | <code>number</code> |  | Extra tracking in pixels. Ignored        by canvas backends that don't implement `ctx.letterSpacing`. Negative        values tighten. Avoid on Arabic and Indic text, where it breaks        cursive joining. |
| [options.onLayout] | <code>function</code> |  | Called after layout with        `{ size, lines, lineHeight, width, height }`: the final size after any        shrinking, the wrapped lines, the resolved pitch, and the measured        block dimensions. Useful for positioning whatever comes next, or for        logging when `shrinkToFit` had to intervene. |

**Example** *(Centered in a box, matching Jimp&#x27;s print() options)*  
```js
img = renderText({
    image: img,
    font: "PostalPointSans",
    size: 100,
    weight: "bold",
    x: 10, y: 45,
    text: {
        text: "123",
        alignmentX: HorizontalAlign.CENTER,
        alignmentY: VerticalAlign.MIDDLE
    },
    maxWidth: 780,
    maxHeight: 200
});
```
**Example** *(Column that must stay row-aligned with its neighbours)*  
```js
form = renderText({
    image: form,
    font: "PostalPointSans",
    size: 30,
    lineHeight: 36,   // absolute pitch, matches the ruled grid
    wrap: false,      // only \n breaks, so rows can't desync
    x: 425, y: 295,
    text: { text: "abc\ndef", alignmentX: HorizontalAlign.CENTER },
    maxWidth: 75,
    maxHeight: 435
});
```
**Example** *(Text into a fixed box, 1-bit output)*  
```js
img = renderText({
    image: img,
    font: "PostalPointSans",
    size: 250,
    shrinkToFit: true,
    minSize: 60,
    mono: true,
    x: 10, y: 40,
    text: { text: "Hello World",
            alignmentX: HorizontalAlign.CENTER,
            alignmentY: VerticalAlign.MIDDLE },
    maxWidth: 780,
    maxHeight: 250
});
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

