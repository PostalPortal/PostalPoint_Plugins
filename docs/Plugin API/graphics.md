<a name="graphics"></a>

## graphics : <code>object</code>
PostalPoint uses the Jimp library version 1.6 for creating and manipulating images and shipping labels.

**Kind**: global namespace  

* [graphics](#graphics) : <code>object</code>
    * [.Jimp()](#graphics.Jimp) ⇒ <code>Jimp</code>
    * [.loadFont(filename)](#graphics.loadFont) ⇒ <code>Promise</code>

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

