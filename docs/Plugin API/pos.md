<a name="pos"></a>

## pos : <code>object</code>
Point of Sale, transaction, and payment-related functionality.

**Kind**: global namespace  

* [pos](#pos) : <code>object</code>
    * [.ReceiptItem](#pos.ReceiptItem)
        * [new ReceiptItem(id, label, text, priceEach, quantity, cost, taxrate, taxableAmount)](#new_pos.ReceiptItem_new)
    * [.ReceiptPayment](#pos.ReceiptPayment)
        * [new ReceiptPayment(amount, type, text)](#new_pos.ReceiptPayment_new)
    * [.addReceiptItem(item)](#pos.addReceiptItem)
    * [.addReceiptPayment(payment)](#pos.addReceiptPayment)
    * [.addOnscreenPaymentLog(msg)](#pos.addOnscreenPaymentLog)
    * [.getReceiptID()](#pos.getReceiptID) ⇒ <code>string</code>
    * [.onReceiptChange(f)](#pos.onReceiptChange)
    * ~~[.onTransactionFinished(f)](#pos.onTransactionFinished)~~
    * [.registerCardProcessor(f)](#pos.registerCardProcessor)
    * [.registerCryptoProcessor(f)](#pos.registerCryptoProcessor)
    * [.getShippingSalesTax()](#pos.getShippingSalesTax) ⇒ <code>Object</code>

<a name="pos.ReceiptItem"></a>

### pos.ReceiptItem
**Kind**: static class of [<code>pos</code>](#pos)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| merch | <code>boolean</code> | <code>false</code> | True if merchandise, false if shipping. |
| barcode | <code>string</code> |  | Item barcode, or tracking number if `merch = false`. |
| qty | <code>number</code> | <code>1</code> | Item quantity. |
| retailPrice | <code>number</code> |  | The calculated retail/markup price for a shipment, regardless of actual sale price. If unset, defaults to priceEach * qty. |
| taxRate | <code>number</code> | <code>0</code> | Tax rate |
| toAddress | <code>Address</code> |  | Shipping destination address. |
| fromAddress | <code>Address</code> |  | Shipping return address. |
| carrier | <code>string</code> |  | Shipping carrier. |
| service | <code>string</code> |  | Shipping service. |
| category | <code>string</code> |  | Merchandise/item category. |
| electronicReturnReceipt | <code>boolean</code> | <code>false</code> | If true, the customer's receipt will have instructions on retrieveing the return receipt from USPS. |
| mailboxDays | <code>number</code> | <code>0</code> | Number of days this item adds to a mailbox's expiration date. |
| mailboxMonths | <code>number</code> | <code>0</code> | Number of months this item adds to a mailbox's expiration date. |
| mailboxNumber | <code>string</code> |  | Mailbox number to apply `mailboxDays` or `mailboxMonths` to after checkout. |
| setCertifiedInfo() | <code>function</code> |  | Set Certified Mail receipt data. `setCertifiedInfo(trackingNumber, certfee, extrafees, postage, date, location, toaddress)` |
| toJSON() | <code>function</code> |  | Get the item as an object suitable for JSON encoding. |
| fromJSON(json) | <code>static\_function</code> |  | Returns a ReceiptItem created from the object returned by `item.toJSON()`. |

<a name="new_pos.ReceiptItem_new"></a>

#### new ReceiptItem(id, label, text, priceEach, quantity, cost, taxrate, taxableAmount)
A class representing a sale item in the current transaction.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Unique ID number for this item (UPC code, inventory number, etc). Used to deduplicate and merge line items on the receipt. Unique items (like shipping labels) should be a unique/random ID. |
| label | <code>string</code> |  | One-line item information. |
| text | <code>string</code> |  | Extra multi-line item information. |
| priceEach | <code>number</code> |  | Sale price per unit. |
| quantity | <code>number</code> |  | Number of units. |
| cost | <code>number</code> |  | Cost per unit. Used for automatic expense tracking. |
| taxrate | <code>number</code> | <code>0.0</code> | Examples: 0 (for 0%), 0.05 (for 5%), etc |
| taxableAmount | <code>string</code> |  | The part of the sale price that's taxable. "" for default (all), "markup" for only taxing profit. |

<a name="pos.ReceiptPayment"></a>

### pos.ReceiptPayment
**Kind**: static class of [<code>pos</code>](#pos)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | (readonly) The human-readable string of the payment type. |
| id | <code>string</code> | Automatically-generated unique ID for this payment. |
| toJSON() | <code>function</code> | Get the payment as an object suitable for JSON encoding. |
| fromJSON(json) | <code>static\_function</code> | Returns a ReceiptPayment created from the object returned by `payment.toJSON()`. |

<a name="new_pos.ReceiptPayment_new"></a>

#### new ReceiptPayment(amount, type, text)
A class representing a payment entry for the current transaction.


| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | amount paid |
| type | <code>string</code> | payment type |
| text | <code>string</code> | extra data (credit card info, etc) |

<a name="pos.addReceiptItem"></a>

### pos.addReceiptItem(item)
Add an item (shipment, merchandise, etc) to the current transaction.

**Kind**: static method of [<code>pos</code>](#pos)  

| Param | Type |
| --- | --- |
| item | <code>ReceiptItem</code> | 

<a name="pos.addReceiptPayment"></a>

### pos.addReceiptPayment(payment)
Add a payment to the current transaction/receipt.

**Kind**: static method of [<code>pos</code>](#pos)  

| Param | Type |
| --- | --- |
| payment | <code>ReceiptPayment</code> | 

<a name="pos.addOnscreenPaymentLog"></a>

### pos.addOnscreenPaymentLog(msg)
Append a line of text to the onscreen log displayed during credit card processing.
Not shown in kiosk mode.

**Kind**: static method of [<code>pos</code>](#pos)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Line of text to add to the log. |

<a name="pos.getReceiptID"></a>

### pos.getReceiptID() ⇒ <code>string</code>
Get the unique alphanumeric ID for the current transaction/receipt.
This is the same code printed on receipts and used in digital receipt URLs.

**Kind**: static method of [<code>pos</code>](#pos)  
<a name="pos.onReceiptChange"></a>

### pos.onReceiptChange(f)
Specify a function to be called whenever the transaction data/receipt is changed.
It is passed a single argument, a Receipt object containing the entire transaction so far.

**Kind**: static method of [<code>pos</code>](#pos)  

| Param | Type |
| --- | --- |
| f | <code>function</code> | 

<a name="pos.onTransactionFinished"></a>

### ~~pos.onTransactionFinished(f)~~
***Deprecated***

The supplied function will be called when a transaction is finished.
It is passed a single argument, a Receipt object containing the entire transaction.
Recommended to listen for the `transactionFinished` event instead.

**Kind**: static method of [<code>pos</code>](#pos)  

| Param | Type |
| --- | --- |
| f | <code>function</code> | 

<a name="pos.registerCardProcessor"></a>

### pos.registerCardProcessor(f)
Register as a card payment processor.

**Kind**: static method of [<code>pos</code>](#pos)  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>Object</code> | Payment processor functions |

**Example**  
```js
global.apis.pos.registerCardProcessor({
    name: "Demo Card Processor", // Shown in PostalPoint settings menu
    init: async function () {
        // This will run after PostalPoint launches
        // and before any payments are processed.
        // In some situations it might run multiple times in a session.
    },
    checkout: async function ({amount, capture = true}) {
        // Charge a credit card using a card reader device.
        // amount is in pennies (or the equivalent base unit in the local currency).

        // Add a payment to the receipt with the total amount paid, card details, etc.
        global.apis.pos.addReceiptPayment(
            new global.apis.pos.ReceiptPayment(
                global.apis.i18n.currencyMinorToMajor(amount),
                "card", // Payment type. Accepted values are card, ach, crypto, cash,
                // check, account, and free.  Other types will be displayed as-is.
                "Demo Card\nCardholder Name, etc\nMore info for receipt" // Additional text for receipt
            )
        );


        // Must return boolean false if the payment failed.
        // Otherwise it will be assumed it succeeded.
        // If an error is encountered, handle it and return false.
        // It's recommended to display a short "payment failed" error
        // message via global.apis.alert, and outputting more details
        // via global.apis.pos.addOnscreenPaymentLog.

        // If capture is false, perform an authorization but don't capture,
        // and return a value you can use to identify the authorization later
        // and complete it.  The value will be passed back to finishPayment, below.
        // This is used mainly for the self-serve kiosk mode, in case the label fails
        // to be purchased/generated by the carrier.
    },
    cancelCheckout: function () {
        // The user has requested the card transaction be canceled before it completes.
        // Reset the terminal to its resting state, clear its screen, etc.
    },
    finishPayment: async function ({checkoutResponse}) {
        // Finish a payment that was authorized but not captured
        // because checkout() was called with capture = false.
        // If payment was already captured and added
        // to the receipt, just return true.
        global.apis.pos.addReceiptPayment(
            new global.apis.pos.ReceiptPayment(
                global.apis.i18n.currencyMinorToMajor(amount),
                "card",
                "Demo Card\nCardholder Name, etc\nMore info for receipt"
            )
        );
    },
    updateCartDisplay: function (receipt) {
        // Show transaction data on the card reader display.
        // This function is called when the "cart" or total changes.
        // `receipt` is a receipt object, see docs for details.
    },
    checkoutSavedMethod: async function ({customerID, paymentMethodID, amount}) {
        // Same as checkout() except using a payment method already on file.
        // customerID and paymentMethodID are provided by getSavedPaymentMethods below.

        // Must return true upon success.
        // If the payment is not successful, and you didn't throw an Error to show the user,
        // then `return false` instead and it'll appear that the user's action to start the payment did nothing.
        return true;
    },
    saveCardForOfflineUse: async function ({statusCallback, customerUUID, name,
             company, street1, street2, city, state, zip, country, email, phone}) {
        // Use the card reader to capture an in-person card and save it for offline use.
        // Provided details are the customer's info, which might be empty strings except for the customerUUID.
        // Saved card details must be tied to the customerUUID, as that's how saved cards are looked up.

        // statusCallback(string, boolean) updates the progress message on the cashier's screen.
        // If the boolean is true, the progress message is replaced with a confirmation message.
        statusCallback("Saving card details...", false);

        return true; // Card saved to customer
        // If an error occurred, you can throw it and the error
        // message will be displayed to the cashier.
        // Alternatively, return boolean false and display the error
        // yourself with global.apis.alert(message, title) or something.
    },
    cancelSaveCardForOfflineUse: function () {
        // Cancel the process running in saveCardForOfflineUse() at the user/cashier's request.
    },
    getSavedPaymentMethods: async function ({customerUUID}) {
        // Return all saved payment methods tied to the provided customer UUID.
        return [{
            customer: "<internal string referencing the customer>", // Passed to checkoutSavedMethod as customerID
            customer_uuid: customerUUID,
            id: "<card/payment method identifier>", // Passed to checkoutSavedMethod as paymentMethodID
            type: "card", // Payment type. Accepted values are card, ach, crypto, cash, check, account, and free.
            label: "Visa debit x1234 (exp. 12/29)", // Label for payment method
            label_short: "Visa debit x1234" // Abbreviated label for payment method
        }];
    },
    deleteSavedPaymentMethod: async function ({customerUUID, customerID, paymentMethodID}) {
        // Delete the payment method identified by paymentMethodID
        // and tied to the PostalPoint customerUUID and the card processor customerID.
        // If unable to delete, throw an error and the error message
        // will be displayed to the cashier.
    }
});
```
<a name="pos.registerCryptoProcessor"></a>

### pos.registerCryptoProcessor(f)
Register as a cryptocurrency payment processor.

**Kind**: static method of [<code>pos</code>](#pos)  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>Object</code> | Payment processor functions |

**Example**  
```js
global.apis.pos.registerCryptoProcessor({
    name: "Demo Crypto", // Shown in PostalPoint settings menu
    init: async function () {
        // This is run after PostalPoint starts,
        // and before any other crypto functions are called.
    },
    checkout: async function ({amount}) {
        // Run the checkout process.
        // amount is the amount of fiat currency to collect,
        // in pennies (or the local equivalent).

        // If an error is encountered during processing,
        //    display an error message in a dialog and return boolean false.
        //    If this function returns anything except false or undefined,
        //    and doesn't throw an error,
        //    it is assumed the payment was successful.

        // Adds a line of text visible to the cashier
        global.apis.pos.addOnscreenPaymentLog("Getting crypto payment...");

        // Display a web page (i.e. with a payment QR code)
        // to the customer on the customer-facing display.
        global.apis.ui.setCustomerScreen("<html></html>", "html");
        global.apis.ui.setCustomerScreen("https://postalpoint.app", "raw");

        // Poll the status of the crypto transaction
        var paymentComplete = false;
        do {
            await global.apis.util.delay(1000);
            paymentComplete = true;
        } while (paymentComplete != true);

        global.apis.pos.addReceiptPayment(
                new global.apis.pos.ReceiptPayment(
                        global.apis.i18n.currencyMinorToMajor(amount),
                        "crypto", // Payment type.
                        "Bitcoin\n0.00001234 BTC" // Additional text for receipt
                        )
                );
        global.apis.pos.addOnscreenPaymentLog("Payment successful!");
        global.apis.ui.clearCustomerScreen();
    },
    cancelCheckout: function () {
        // The user requested to cancel the payment.
        // Reset things accordingly.
        global.apis.ui.clearCustomerScreen();
    },
    isConfigured: function () {
        // Is this plugin properly setup
        // and able to process payments?
        // If not, return false.
        // This determines if the crypto payment method button will be shown.
        return true;
    }
});
```
<a name="pos.getShippingSalesTax"></a>

### pos.getShippingSalesTax() ⇒ <code>Object</code>
Get the sales tax percentage to charge on a shipping service ReceiptItem.

**Kind**: static method of [<code>pos</code>](#pos)  
**Returns**: <code>Object</code> - `{type: "", percent: 0.15}`
`type` is an empty string for taxing the entire price, or "markup" for only adding tax to the markup amount.
`percent` is the tax percentage.  A value of 0.15 means a 15% tax.  
