<a name="shipping"></a>

## shipping : <code>object</code>
Add custom carrier and rates, and adjust markup.

**Kind**: global namespace  

* [shipping](#shipping) : <code>object</code>
    * [.Address](#shipping.Address)
        * [new Address()](#new_shipping.Address_new)
    * [.getZIPCode(zipcode, country)](#shipping.getZIPCode) ⇒ <code>Object</code>
    * [.getPackagingByID(id)](#shipping.getPackagingByID) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getRetailPriceWithMarkup(cost, retail, carrier, service, weightOz, packaging)](#shipping.getRetailPriceWithMarkup) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.getCarrierName(carrierId)](#shipping.getCarrierName) ⇒ <code>string</code>
    * [.getServiceName(serviceId, carrier)](#shipping.getServiceName) ⇒ <code>string</code>
    * [.registerRateEndpoint(getRates, purchase, idPrefix)](#shipping.registerRateEndpoint)
    * [.registerMarkupCalculator(markupFn)](#shipping.registerMarkupCalculator)
    * [.registerInsuranceProvider(id, name, cardText, maxValue, getQuote, insure)](#shipping.registerInsuranceProvider)

<a name="shipping.Address"></a>

### shipping.Address
**Kind**: static class of [<code>shipping</code>](#shipping)  
<a name="new_shipping.Address_new"></a>

#### new Address()
A class representing an address.

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

<a name="shipping.getCarrierName"></a>

### shipping.getCarrierName(carrierId) ⇒ <code>string</code>
Converts the carrier ID string into a consistent and human-readable name.

**Kind**: static method of [<code>shipping</code>](#shipping)  

| Param | Type |
| --- | --- |
| carrierId | <code>string</code> | 

<a name="shipping.getServiceName"></a>

### shipping.getServiceName(serviceId, carrier) ⇒ <code>string</code>
Converts the service ID string into a consistent and human-readable name. Set the carrier ID for better results.

**Kind**: static method of [<code>shipping</code>](#shipping)  

| Param | Type | Default |
| --- | --- | --- |
| serviceId | <code>string</code> |  | 
| carrier | <code>string</code> | <code>&quot;USPS&quot;</code> | 

<a name="shipping.registerRateEndpoint"></a>

### shipping.registerRateEndpoint(getRates, purchase, idPrefix)
Register the plugin as a shipping rate and label provider.  See the Shipping example plugin.

**Kind**: static method of [<code>shipping</code>](#shipping)  

| Param | Type | Description |
| --- | --- | --- |
| getRates | <code>function</code> | A function passed a Parcel object to get rates for. Returns a Promise that resolves to an array of rate objects. |
| purchase | <code>function</code> | A function passed a rate ID to purchase. Returns a Promise that resolves to the label information. |
| idPrefix | <code>string</code> | A unique string that will be prefixing all rate IDs from this plugin. |

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
    receiptItem: ReceiptItem,
    tracking: "12345678901234567890",
    cost: 10.0,
    price: 15.0,
    carrier: "Carrier Name",
    service: "Service Name",
    delivery_days: 3,
    delivery_date: 1234567890, // UNIX timestamp
    to: toAddressLines // Array of strings
}
```
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
async function getQuote(value, parcel, carrier, service) {
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
