<a name="ui"></a>

## ui : <code>object</code>
Interact with and modify the PostalPoint user interface.

**Kind**: global namespace  

* [ui](#ui) : <code>object</code>
    * [.addToolsPage(page, title, id, description, cardTitle, icon, type)](#ui.addToolsPage)
    * [.addHomeTab(content, title, icon, id)](#ui.addHomeTab) ⇒ <code>undefined</code>
    * [.showProgressSpinner(title, text, subtitle)](#ui.showProgressSpinner) ⇒ <code>undefined</code>
    * [.hideProgressSpinner()](#ui.hideProgressSpinner)
    * [.openSystemWebBrowser(url)](#ui.openSystemWebBrowser)
    * [.openInternalWebBrowser(url)](#ui.openInternalWebBrowser)
    * [.clearCustomerScreen()](#ui.clearCustomerScreen)
    * [.setCustomerScreen(content, type, displayInCard, cardSize, displayStatusBar)](#ui.setCustomerScreen)
    * [.collectSignatureFromCustomerScreen(title, terms, termstype)](#ui.collectSignatureFromCustomerScreen)
    * [.cancelSignatureCollection()](#ui.cancelSignatureCollection)
    * [.clearSignaturePad()](#ui.clearSignaturePad)
    * [.getCustomerDisplayInfo()](#ui.getCustomerDisplayInfo) ⇒ <code>Object</code>

<a name="ui.addToolsPage"></a>

### ui.addToolsPage(page, title, id, description, cardTitle, icon, type)
Add a page to the Tools screen. If type is set to "function", the page argument
will be run as a function and will not be expected to return a page component.
[Framework7 Page Component documentation](https://framework7.io/docs/router-component#single-file-component)

**Kind**: static method of [<code>ui</code>](#ui)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| page | <code>string</code> \| <code>function</code> |  | Page content as a Framework7 component page. If `page` is a string ending in `.f7` it is treated as a file path and the page content will be loaded from disk. If `page` is any other string, it is treated as the page content. If `page` is a function, it will be called and must return the page content (unless `type` is set to `"function"`, see examples) |
| title | <code>string</code> |  | Page title. |
| id | <code>string</code> |  | Page ID. Make it unique, or pass an empty string to be assigned a random ID. |
| description | <code>string</code> |  | Description of this tool for its card on the Tools screen. |
| cardTitle | <code>string</code> |  | Title of the card for this page on the Tools screen. |
| icon | <code>string</code> |  | FontAwesome icon class, for example, "fa-solid fa-globe". FontAwesome Pro solid, regular, light, and duotone icons are available. |
| type | <code>string</code> | <code>&quot;page&quot;</code> | What kind of data is supplied by `page`: "page" or "function". |

**Example**  
```js
// Full plugin that displays an alert when the card is clicked on the Tools page
exports.init = function () {
    global.apis.ui.addToolsPage(
                                 displayMessage,
                                 "click me",
                                 "clickmecard",
                                 "Click here to see a message",
                                 "Click This Card",
                                 "fa-solid fa-arrow-pointer",
                                 "function"
                               );
}

function displayMessage() {
    global.apis.alert("Card clicked");
}
```
**Example**  
```js
// Open a dynamically-generated page
function rollDice() {
    var randomNumber = Math.round(Math.random() * 6) + 1;
    return `<div class="page">
        <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner">
                <a href="#" class="link back">
                    <i class="icon icon-back"></i>
                </a>
                <div class="title">Random Number</div>
            </div>
        </div>
        <div class="page-content">
            <div class="block">
                <h1>You rolled ${randomNumber}</h1>
            </div>
        </div>
    </div>`;
}
global.apis.ui.addToolsPage(
                             rollDice,
                             "Random",
                             "randomnumbercard",
                             "Click here for a random number",
                             "Random Number",
                             "fa-regular fa-dice",
                             "page"
                           );
```
**Example**  
```js
// Open a page from a file.
// See https://framework7.io/docs/router-component#single-file-component
global.apis.ui.addToolsPage(
                             global.apis.getPluginFolder("example-plugin") + "/page.f7",
                             "Page",
                             "filepage",
                             "Open page.f7 from the plugin installation folder",
                             "Open Custom Page",
                             "fa-regular fa-file",
                             "page"
                           );
```
<a name="ui.addHomeTab"></a>

### ui.addHomeTab(content, title, icon, id) ⇒ <code>undefined</code>
Add a custom tab to the PostalPoint home screen.  Works almost the same as addToolsPage.

**Kind**: static method of [<code>ui</code>](#ui)  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> \| <code>function</code> | Tab content. It is rendered/processed when the user navigates to the Home screen and clicks the tab; if the user navigates to a different screen and back to Home, it will be re-rendered. If `content` is a string ending in `.f7` it is treated as a file path and the content will be loaded from disk. If `content` is any other string, it is treated as the content. If `content` is a function, it will be called and must return the content. |
| title | <code>string</code> | Tab title. Keep it short; depending on screen size and tab count, you have as little as 150px of space. |
| icon | <code>string</code> | FontAwesome icon displayed above the tab title. |
| id | <code>string</code> | Tab ID. Make it unique, or pass an empty string to be assigned a random ID. If addHomeTab is called with a tab ID that is already registered, it will be overwritten. |

**Example**  
```js
global.apis.ui.addHomeTab("<div class='block'>Hello</div>", "Hello Tab", "fa-duotone fa-hand-wave", "hellotab");
```
**Example**  
```js
function renderTab() {
    return "<template><div><h1>${hellovar}</h1></div></template><script>export default (props, {$on, $update, $f7}) => {var hellovar = 'hello world'; return $render;}</script>";
}
global.apis.ui.addHomeTab(renderTab, "Hello Template", "fa-duotone fa-file-code", "hellotemplatetab");
```
<a name="ui.showProgressSpinner"></a>

### ui.showProgressSpinner(title, text, subtitle) ⇒ <code>undefined</code>
Show a notification with a loading icon.

**Kind**: static method of [<code>ui</code>](#ui)  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The message to show on the spinner. |
| text | <code>string</code> | Optional. Body text on the spinner. |
| subtitle | <code>string</code> | Optional. Sub-heading under the `title`. |

<a name="ui.hideProgressSpinner"></a>

### ui.hideProgressSpinner()
Close the notification opened by `showProgressSpinner`.

**Kind**: static method of [<code>ui</code>](#ui)  
<a name="ui.openSystemWebBrowser"></a>

### ui.openSystemWebBrowser(url)
Open the native OS default browser to the URL given.

**Kind**: static method of [<code>ui</code>](#ui)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

<a name="ui.openInternalWebBrowser"></a>

### ui.openInternalWebBrowser(url)
Open a web browser inside PostalPoint. The browser has forward/back/close buttons.

**Kind**: static method of [<code>ui</code>](#ui)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

**Example**  
```js
global.apis.ui.openInternalWebBrowser("https://postalpoint.app");
global.apis.eventbus.on("browserNavigate", function (newUrl) {
    global.apis.alert(`New URL: ${newUrl}`, "Browser Navigated");
    if (newUrl == "https://closeme.com") {
        global.apis.eventbus.emit("browserCloseRequest");
    }
});
```
<a name="ui.clearCustomerScreen"></a>

### ui.clearCustomerScreen()
Clear any custom content on the customer-facing display, defaulting back to blank/receipt/shipping rates, as applicable.

**Kind**: static method of [<code>ui</code>](#ui)  
<a name="ui.setCustomerScreen"></a>

### ui.setCustomerScreen(content, type, displayInCard, cardSize, displayStatusBar)
Render content on the customer-facing display.
Encodes content as a data URI (example: `data:text/html;charset=utf-8,${content}`)
and renders on the customer-facing display. If type is html, renders the string as HTML.
If type is pdf, displays a PDF viewer. If type is raw, functions like setting an iframe's
src to content. All other type values are rendered as text/plain.
To display the iframe in a card centered on the screen, set displayInCard to true
and pass the desired dimensions (w, h) of the card in px.
If the requested size is larger than the available screen space, the card will instead
fill the available space.
Warning: Do not load third-party websites, this is a security risk.
Wrap it in a <webview src="..."></webview> tag if you need to display one.

**Kind**: static method of [<code>ui</code>](#ui)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| content | <code>string</code> |  | Page content. |
| type | <code>string</code> | <code>&quot;html&quot;</code> | Format of the `content`. One of "html", "pdf", "raw", "body", or "text". |
| displayInCard | <code>boolean</code> | <code>false</code> | Set to true to wrap the content in a card UI. |
| cardSize | <code>Array.&lt;number&gt;</code> | <code>[300,300</code> | Size of the card UI if displayInCard == true. |
| displayStatusBar | <code>boolean</code> | <code>true</code> | Whether the bar on the bottom of the screen should be visible, containing the store logo and scale weight. |

**Example**  
```js
// How content is converted by PostalPoint before display:
if (type == "html") {
    customerScreenContent = `data:text/html;charset=utf-8,${content}`;
} else if (type == "pdf") {
    customerScreenContent = `data:application/pdf,${content}`;
} else if (type == "raw") {
    global.customerScreenContent = `${content}`;
} else if (type == "body") {
    customerScreenContent = `data:text/html;charset=utf-8,<!DOCTYPE html>
    <meta charset="utf-8">
    <title></title>
    <style>
        html, body {margin: 0; padding: 0; font-family: Roboto, Ubuntu, Arial, sans-serif;}
        h1, h2, h3 {margin: 0;}
    </style>
    <div id="maindiv">${content}</div>`;
} else {
    customerScreenContent = `data:text/plain;charset=utf-8,${content}`;
}
```
<a name="ui.collectSignatureFromCustomerScreen"></a>

### ui.collectSignatureFromCustomerScreen(title, terms, termstype)
Show a signature pad on the customer-facing display.
When the customer indicates the signature is finished,
the customerSignatureCollected event is emitted with the data
{"svg": "data:image/svg+xml;base64,...", "png": "data:image/png;base64,..."}

**Kind**: static method of [<code>ui</code>](#ui)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| title | <code>string</code> | <code>null</code> | Display a title/header on the customer screen. Currently ignored, but may be used in the future. |
| terms | <code>string</code> \| <code>boolean</code> | <code>false</code> | Set to a string to display terms and conditions or other text content next to the signature pad. |
| termstype | <code>string</code> | <code>&quot;body&quot;</code> | "html", "pdf", "raw", or "body". See setCustomerScreen() |

**Example**  
```js
global.apis.ui.collectSignatureFromCustomerScreen("", "<p>By signing, you agree to pay us lots of money</p>", "body");
global.apis.eventbus.on("customerSignatureCollected", function (sigdata) {
    const pngDataURL = sigdata.png;
    const svgDataURL = sigdata.svg;
});
```
<a name="ui.cancelSignatureCollection"></a>

### ui.cancelSignatureCollection()
Cancels customer signature collection and returns the customer-facing display to normal operation.

**Kind**: static method of [<code>ui</code>](#ui)  
**Example**  
```js
global.apis.ui.cancelSignatureCollection();
```
<a name="ui.clearSignaturePad"></a>

### ui.clearSignaturePad()
Erase the signature drawn on the customer-facing display.
Note that the customer is also provided a button to do this.

**Kind**: static method of [<code>ui</code>](#ui)  
**Example**  
```js
global.apis.ui.clearSignaturePad();
```
<a name="ui.getCustomerDisplayInfo"></a>

### ui.getCustomerDisplayInfo() ⇒ <code>Object</code>
Describes if the customer-facing display is currently enabled,
and if it supports customer touch interaction.

**Kind**: static method of [<code>ui</code>](#ui)  
**Returns**: <code>Object</code> - {"enabled": true, "touch": true}  
**Example**  
```js
var info = global.apis.ui.getCustomerDisplayInfo();
```
