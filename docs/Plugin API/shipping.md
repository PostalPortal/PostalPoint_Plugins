<a name="shipping"></a>

## shipping : <code>object</code>
Add custom carrier and rates, and adjust markup.

**Kind**: global namespace  

* [shipping](#shipping) : <code>object</code>
    * [.Address](#shipping.Address)
        * [new Address()](#new_shipping.Address_new)
    * [.Package](#shipping.Package)
        * [new Package()](#new_shipping.Package_new)
    * [.getZIPCode(zipcode, country)](#shipping.getZIPCode) ⇒ <code>Object</code>
    * [.getPackagingByID(id)](#shipping.getPackagingByID) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getRetailPriceWithMarkup(cost, retail, carrier, service, weightOz, packaging)](#shipping.getRetailPriceWithMarkup) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.convertMeteredToRetail(rate_price)](#shipping.convertMeteredToRetail) ⇒ <code>number</code>
    * [.getLabelDate([carrier])](#shipping.getLabelDate) ⇒ <code>Promise.&lt;Date&gt;</code>
    * [.getCarrierName(carrierId)](#shipping.getCarrierName) ⇒ <code>string</code>
    * [.getServiceName(serviceId, [carrier], [stripInternational])](#shipping.getServiceName) ⇒ <code>string</code>
    * [.registerRateEndpoint(getRates, purchase, idPrefix, [extraOptions])](#shipping.registerRateEndpoint)
    * [.registerStampEndpoint(id, name, getRates, purchase, purchaseCorrection)](#shipping.registerStampEndpoint)
    * [.addRateWarning(message)](#shipping.addRateWarning)
    * [.registerAddressVerificationProvider(id, name, verifyFn)](#shipping.registerAddressVerificationProvider)
    * [.registerCarrierPickupMenu(carrierName, displayName)](#shipping.registerCarrierPickupMenu) ⇒ <code>undefined</code>
    * [.registerMarkupCalculator(markupFn)](#shipping.registerMarkupCalculator)
    * [.registerInsuranceProvider(id, name, cardText, maxValue, getQuote, insure)](#shipping.registerInsuranceProvider)
    * [.getParcel()](#shipping.getParcel) ⇒ <code>Package</code>
    * [.setParcel(newParcel, parcelChangeEventSource)](#shipping.setParcel)
    * [.isOfficeMode()](#shipping.isOfficeMode) ⇒ <code>boolean</code>

<a name="shipping.Address"></a>

### shipping.Address
**Kind**: static class of [<code>shipping</code>](#shipping)  
<a name="new_shipping.Address_new"></a>

#### new Address()
A class representing an address.

<a name="shipping.Package"></a>

### shipping.Package
**Kind**: static class of [<code>shipping</code>](#shipping)  
<a name="new_shipping.Package_new"></a>

#### new Package()
A class representing a package/parcel. See docs.

<a name="shipping.getZIPCode"></a>

### shipping.getZIPCode(zipcode, country) ⇒ <code>Object</code>
Get data for a ZIP Code.

**Kind**: static method of [<code>shipping</code>](#shipping)  
**Returns**: <code>Object</code> - Data about the ZIP code. See example. Fields may be empty if not available. Type may be "STANDARD", "UNIQUE", "PO BOX", or "MILITARY".  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| zipcode | <code>string</code> |  | ZIP or postal code. |
| country | <code>string</code> | <code>&quot;US&quot;</code> | Currently only "US" and "CA" are supported. |

**Example**  
```js
{city: "NEW YORK", state: "NY", type: "STANDARD"}
```
<a name="shipping.getPackagingByID"></a>

### shipping.getPackagingByID(id) ⇒ <code>Promise.&lt;Object&gt;</code>
Get a parcel's packaging type from PostalPoint's internal ID for it.

**Kind**: static method of [<code>shipping</code>](#shipping)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - See examples.  

| Param | Type |
| --- | --- |
| id | <code>number</code> | 

**Example**  
```js
{
    id: 100,
    type: "Parcel",
    img: "box.png",
    name: "Box",
    service: "",
    l: -1,
    w: -1,
    h: -1,
    weight: true,
    hazmat: true,
    source: "Customer"
}
```
**Example**  
```js
{
    id: 1,
    type: "FlatRateEnvelope",
    img: "pm-fres.png",
    name: "Flat Rate Envelope",
    service: "Priority",
    l: -2,
    w: -2,
    h: -2,
    weight: false,
    hazmat: true,
    usps_supplied: true,
    envelope: true,
    source: "USPS",
    skus: ["PS00001000014", "PS00001000012", "PS00001000027", "PS00001000064", "PS00001001921", "PS00001035000", "PS00001036014", "PS00001128600", "https://qr.usps.com/epsspu?p=30", "https://qr.usps.com/epsspu?p=8"]
}
```
**Example**  
```js
{
    id: 201,
    type: "UPSLetter",
    img: "ups-env.png",
    name: "Envelope",
    carrier: "UPS",
    l: -2,
    w: -2,
    h: -2,
    weight: true,
    hazmat: true,
    source: "OtherCarrier"
}
```
<a name="shipping.getRetailPriceWithMarkup"></a>

### shipping.getRetailPriceWithMarkup(cost, retail, carrier, service, weightOz, packaging) ⇒ <code>Promise.&lt;number&gt;</code>
Calculate the retail price for a shipment rate based on the configured margin settings.

**Kind**: static method of [<code>shipping</code>](#shipping)  
**Returns**: <code>Promise.&lt;number&gt;</code> - The amount to charge the customer  

| Param | Type | Description |
| --- | --- | --- |
| cost | <code>number</code> | Cost of shipment to business |
| retail | <code>number</code> | Default retail price from label provider |
| carrier | <code>string</code> | Shipment carrier |
| service | <code>string</code> | Shipment service |
| weightOz | <code>number</code> | The weight of the shipment in ounces, or null if not available. |
| packaging | <code>string</code> | An empty string if not available, or "Letter", "FlatRateEnvelope", etc. |

<a name="shipping.convertMeteredToRetail"></a>

### shipping.convertMeteredToRetail(rate_price) ⇒ <code>number</code>
Convert a USPS metered/PC postage letter rate to the retail stamp price by
adding the difference based on the current USPS Notice 123 rate chart.

**Kind**: static method of [<code>shipping</code>](#shipping)  
**Returns**: <code>number</code> - the retail price for the given metered rate (for example, 0.78)  

| Param | Type | Description |
| --- | --- | --- |
| rate_price | <code>number</code> | Metered price (for example, 0.74) |

<a name="shipping.getLabelDate"></a>

### shipping.getLabelDate([carrier]) ⇒ <code>Promise.&lt;Date&gt;</code>
Get the date to use for a label's ship date, based on the next carrier pickup.
If no date is found for the next pickup, defaults to the current date and time.

**Kind**: static method of [<code>shipping</code>](#shipping)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [carrier] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | Carrier ID or name. |

<a name="shipping.getCarrierName"></a>

### shipping.getCarrierName(carrierId) ⇒ <code>string</code>
Converts the carrier ID string into a consistent and human-readable name.

**Kind**: static method of [<code>shipping</code>](#shipping)  

| Param | Type |
| --- | --- |
| carrierId | <code>string</code> | 

<a name="shipping.getServiceName"></a>

### shipping.getServiceName(serviceId, [carrier], [stripInternational]) ⇒ <code>string</code>
Converts the service ID string into a consistent and human-readable name. Set the carrier ID for better results.

**Kind**: static method of [<code>shipping</code>](#shipping)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| serviceId | <code>string</code> |  |  |
| [carrier] | <code>string</code> | <code>&quot;\&quot;USPS\&quot;&quot;</code> | Carrier ID or name (i.e. the string sent to or received from `getCarrierName()`) |
| [stripInternational] | <code>boolean</code> | <code>false</code> | If true, remove "International" from the service name. For example, "Priority Mail International" becomes "Priority Mail", to allow matching a domestic USPS service with the international version of that service. |

<a name="shipping.registerRateEndpoint"></a>

### shipping.registerRateEndpoint(getRates, purchase, idPrefix, [extraOptions])
Register the plugin as a shipping rate and label provider.  See the Shipping example plugin.

**Kind**: static method of [<code>shipping</code>](#shipping)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| getRates | <code>function</code> |  | A function passed a Parcel object to get rates for. Returns a Promise that resolves to an array of rate objects. |
| purchase | <code>function</code> |  | A function passed a rate ID to purchase. Returns a Promise that resolves to the label information. |
| idPrefix | <code>string</code> |  | A unique string that will be prefixing all rate IDs from this plugin. |
| [extraOptions] | <code>Object</code> | <code>{}</code> | Extra optional functions/options that can be implemented.  See example. |

**Example**  
```js
// getRates sample return value:
[{
    rateid: `${idPrefix}_${global.apis.util.uuid.v4()}`,
    carrier: "CarrierID",
    carrierName: "Carrier Name",
    service: "CARRIER_SERVICE_ID",
    cost_rate: 10,
    retail_rate: 15,
    delivery_days: 3,
    delivery_date: null,
    guaranteed: true,
    serviceName: "Service Name",
    color: "green" // Rate card color
}]
```
**Example**  
```js
// purchase sample return value:
{
    label: labelImageToPrint,
    labeltype: "PNG",
    receiptItem: ReceiptItem, // Data to add to the transaction receipt.
    tracking: "12345678901234567890",
    cost: 10.0,
    price: 15.0,
    carrier: "Carrier Name",
    service: "Service Name",
    delivery_days: 3,
    delivery_date: 1234567890, // UNIX timestamp
    to_address: new global.apis.shipping.Address(),
    from_address: new global.apis.shipping.Address(),
    plugin_sourceid: "", // Unique string for your plugin; saved alongside shipment in store database to allow queries to filter shipments by source.
    metadata: {} // Object containing extra data to be stored in the database. Serialized to JSON.
}
```
**Example**  
```js
extraOptions = {
    getRecentLabels: async function () {
        // Return a list of recently purchased/printed labels for reprinting and/or voiding/refund purposes.
        // Your plugin must also implement voidLabel() (below) or it won't be queried for recent labels.
        return [
            {
                id: `${idPrefix}_${yourShipmentID}`,
                refund_status: false, // false to show a refund/void button, otherwise a short string to show such as "Refunded" or "Refund processing" or "Refund rejected"
                tracking: "", // Shipment tracking number or an empty string if it has no tracking.
                label_urls: [], // Array of URLs to download the label image(s) from if the user requests a reprint.
                to: new global.apis.shipping.Address(), // Destination/to address.
                from: new global.apis.shipping.Address(), // Return/from address.
                carrier: global.apis.shipping.getCarrierName(""), // Carrier name
                service: global.apis.shipping.getServiceName("") // Shipping service
            }
        ]
    },
    voidLabel: async function (id) {
        // Try to void a label with the ID provided (an `id` returned in getRecentLabels)
        // Returns a status string that's displayed to the user in a dialog box, such as "Label refunded." or "Refund request submitted." or "Refund request rejected."
        return "Void request status message goes here";
    }
}
```
<a name="shipping.registerStampEndpoint"></a>

### shipping.registerStampEndpoint(id, name, getRates, purchase, purchaseCorrection)
Register the plugin as a USPS postage indicia provider for First Class Mail.

**Kind**: static method of [<code>shipping</code>](#shipping)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique alphanumeric ID for this provider. |
| name | <code>string</code> | Human-readable name for this provider. |
| getRates | <code>function</code> | see registerRateEndpoint. Any returned rates that aren't for USPS First-Class Mail are ignored. |
| purchase | <code>function</code> | see registerRateEndpoint. Returned data must also include a `imageSettings` object, see example. |
| purchaseCorrection | <code>function</code> \| <code>null</code> | Same as `purchase` but instead of a rate ID the argument is a string number of cents to print on the postage. If null, postage correction stamps will be disabled. |

**Example**  
```js
// imageSettings object returned by purchase:
{
    includeFIM: true, // If true, a FIM D (Facing Identification Mark, variant D) is printed to the left of the indicia. Required for letter-size postage.
    indiciaX: px, // Leftmost pixel in label image to print (pixels to the left will be cropped out). If negative, counts from the right side of the label instead.
    indiciaY: px, // Topmost pixel in label image (pixels above will be cropped out). If negative, counts from the right side of the label instead.
    indiciaWidth: px, // Width in pixels to crop to, starting from indiciaX on the left side and moving right
    indiciaHeight: px, // Height in pixels to crop to, starting from indiciaY on the top side and moving down
    dpi: 300, // Native DPI (pixels per inch) of your label. PostalPoint scales your image to 300 DPI after cropping.
    rotate: 0 // If not zero, image is rotated this many degrees (90, 180, 270, etc) before any processing.
}
// Note: Depending on indicia width, FIM presence, and label width, the indicia may be
//   scaled slightly smaller after cropping to the dimensions provided in order to fit on
//   the label media size in use. In our testing with the widest indicia (PDF417),
//   the barcode in the indicia is still scannable (and the human-readable text still legible)
//   after this adjustment, but you might wish to test the worst case scenario:
//   `includeFIM: true` on a 1.1x3.5 "standard address" label printed at 200dpi.
```
<a name="shipping.addRateWarning"></a>

### shipping.addRateWarning(message)
If an error or warning is encountered while getting shipping rates
(such as an invalid/unsupported combination of shipment options/packaging for a particular service)
send a message string to this function and it will be available for the user to read
when the rate cards are displayed on screen.

**Kind**: static method of [<code>shipping</code>](#shipping)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> \| <code>Array.&lt;string&gt;</code> | A string message or an array of messages. |

<a name="shipping.registerAddressVerificationProvider"></a>

### shipping.registerAddressVerificationProvider(id, name, verifyFn)
Add an address validation/sanitization/verification provider. The user's preferred provider
will be called with a shipment's to and from addresses, and will return the validated addresses.
The verified addresses will be passed on to rate provider plugins.

**Kind**: static method of [<code>shipping</code>](#shipping)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique alphanumeric ID for this provider. |
| name | <code>string</code> | Human-readable display name for this provider. |
| verifyFn | <code>function</code> | See example. |

**Example**  
```js
registerAddressVerificationProvider("example", "Example", async function (addressData) {
    // This function is passed the data structure shown below, and must return the same structure but updated with the validated addresses.
    return {
         to: new global.apis.shipping.Address(),
         from: new global.apis.shipping.Address(),
         toVerified: true, // If the to address was verified
         fromVerified: true, // If the from/return address was verified
         toErrors: [], // String messages to display on the to address verification checkmark/warning icon
         fromErrors: [] // String messages to display on the from/return address verification checkmark/warning icon
    }
});
```
<a name="shipping.registerCarrierPickupMenu"></a>

### shipping.registerCarrierPickupMenu(carrierName, displayName) ⇒ <code>undefined</code>
Add an entry to the Carrier Pickup tool for setting the next pickup date
for your specific carrier/plugin. Used with `getLabelDate`.

**Kind**: static method of [<code>shipping</code>](#shipping)  

| Param | Type | Description |
| --- | --- | --- |
| carrierName | <code>string</code> | Carrier name. Pass to `getLabelDate` to get the next pickup date as selected by the user (or auto-incremented). |
| displayName | <code>string</code> \| <code>null</code> | Optional different name to show in the tool. |

<a name="shipping.registerMarkupCalculator"></a>

### shipping.registerMarkupCalculator(markupFn)
Register the plugin to modify PostalPoint's shipping markup calculation during shipment rating.

**Kind**: static method of [<code>shipping</code>](#shipping)  
**Throws**:

- <code>Error</code> Only one plugin may register with this function;
any subsequent attempts to register will throw an Error.


| Param | Type | Description |
| --- | --- | --- |
| markupFn | <code>function</code> | A function that must return either the retail price to charge for this rate, or `false` to opt-out of setting this particular rate. |

**Example**  
```js
global.apis.shipping.registerMarkupCalculator(
    // Parameters:
    // cost:       Cost to shipper
    // retail:     Carrier-suggested retail price
    // suggested:  PostalPoint-suggested retail (default margin calc)
    // carrier:    Shipping carrier name
    // service:    Shipping service code
    // weightOz:   The weight of the shipment in ounces, or null if not available.
    // packaging:  An empty string if not available, or "Letter", "FlatRateEnvelope", etc. See https://docs.easypost.com/docs/parcels#predefined-package
    // parcel:     The Parcel object for this shipment.  May be null for some rate-only requests without a shipment, such as USPS price calculations.
    function (cost, retail, suggested, carrier, service, weightOz, packaging, parcel) {
        if (carrier == "USPS") {
            if (service == "First-Class Mail") {
                // Handle First-Class Mail differently if it's a 1oz letter (i.e. Forever stamp)
                if (weightOz <= 1 && packaging == "Letter") {
                    return retail + 0.05;
                } else {
                    return retail + 0.25;
                }
            }
            // Handle flat rate envelopes differently
            if (global.apis.shipping.getServiceName(service, carrier) == "Priority Mail" && packaging == "FlatRateEnvelope") {
                return retail + 1.0;
            }
            return suggested + 2.0; // Charge the PostalPoint-calculated amount plus $2
        } else {
            return cost * 2; // Charges the customer double the shipment's cost.
        }
    }
);
```
<a name="shipping.registerInsuranceProvider"></a>

### shipping.registerInsuranceProvider(id, name, cardText, maxValue, getQuote, insure)
Add a shipping insurance provider.

**Kind**: static method of [<code>shipping</code>](#shipping)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> \| <code>null</code> | Unique ID for the provider. Will be autogenerated if null. |
| name | <code>string</code> | Human-readable name for the provider. Shown as the card heading on the Insurance section of the Ship screen. |
| cardText | <code>string</code> | Text or HTML to display on the Ship screen card for this provider. |
| maxValue | <code>number</code> | The largest number that will be accepted for the "Insured for" value. |
| getQuote | <code>function</code> | Returns the cost and retail price for insuring the parcel, or a Promise that resolves into the same. See the example for details. |
| insure | <code>function</code> | Insure the parcel and add the insurance details to the receipt.  See example. |

**Example**  
```js
async function getQuote(value, parcel, carrier, service, rateObject) {
    // See shipping rate provider documentation for rateObject structure.

    // Do math, etc
    var cost = value / 100;

    return {
        cost: cost,
        retail: cost * 2
    };
    // Or, to remove this shipping rate from the list,
    // because the shipment/carrier/service combination
    // is not eligible for insurance:
    return false;
}

async function insure(value, parcel, carrier = "USPS", service = "Priority", trackingNumber = "94055...") {
    // Purchase the insurance
    var cost = value / 100;
    var retailPrice = cost * 2;
    var costPrice = cost;

    var receiptitem = new global.apis.pos.ReceiptItem(`sampleinsurance_${trackingNumber}`,
        "Sample Insurance",
        "Insured for " + global.apis.i18n.moneyString(value),
        retailPrice, 1, costPrice, 0
    );
    receiptitem.merch = true;
    receiptitem.category = "Shipping Insurance";
    receiptitem.barcode = trackingNumber;
    global.apis.pos.addReceiptItem(receiptitem);
}

global.apis.shipping.registerInsuranceProvider(
     "sampleproviderid", "Sample Insurance",
     "Insurance coverage from Sample Insurance. $1 per $100 of value.",
     5000, getQuote, insure);
```
<a name="shipping.getParcel"></a>

### shipping.getParcel() ⇒ <code>Package</code>
Get the current in-progress shipment's data.

**Kind**: static method of [<code>shipping</code>](#shipping)  
**Returns**: <code>Package</code> - See Parcel/Package docs  
<a name="shipping.setParcel"></a>

### shipping.setParcel(newParcel, parcelChangeEventSource)
Set/overwrite the current in-progress shipment's data.

**Kind**: static method of [<code>shipping</code>](#shipping)  

| Param | Type | Description |
| --- | --- | --- |
| newParcel | <code>Package</code> |  |
| parcelChangeEventSource | <code>string</code> \| <code>null</code> | An optional string sent as the data for the `parcelUpdated` event. |

<a name="shipping.isOfficeMode"></a>

### shipping.isOfficeMode() ⇒ <code>boolean</code>
Check if PostalPoint is running the shipment in "office mode", i.e. the customer should be charged the cost price.

**Kind**: static method of [<code>shipping</code>](#shipping)  
**Returns**: <code>boolean</code> - true if office mode enabled, otherwise false.  
