<a name="mailboxes"></a>

## mailboxes : <code>object</code>
Add, modify, and delete mailboxes and mailbox customers.

**Kind**: global namespace  

* [mailboxes](#mailboxes) : <code>object</code>
    * [.FormPS1583](#mailboxes.FormPS1583)
        * [new FormPS1583()](#new_mailboxes.FormPS1583_new)
    * [.getList(filter)](#mailboxes.getList) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.addDaysToMailbox(boxNumber, days, months)](#mailboxes.addDaysToMailbox) ⇒ <code>Promise</code>
    * [.setMailboxExpirationDate(boxNumber, date)](#mailboxes.setMailboxExpirationDate) ⇒ <code>Promise</code>
    * [.createMailbox(number, size, notes, barcode)](#mailboxes.createMailbox) ⇒ <code>Promise</code>
    * [.editMailbox(oldNumber, newNumber, newSize, barcode)](#mailboxes.editMailbox) ⇒ <code>Promise</code>
    * [.deleteMailbox(number)](#mailboxes.deleteMailbox) ⇒ <code>Promise</code>
    * [.closeMailbox(number)](#mailboxes.closeMailbox) ⇒ <code>Promise</code>
    * [.mailboxExists(number)](#mailboxes.mailboxExists) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.addOrUpdateBoxholder(boxNumber, info)](#mailboxes.addOrUpdateBoxholder) ⇒ <code>Promise</code>
    * [.removeBoxholder(boxNumber, uuid)](#mailboxes.removeBoxholder) ⇒ <code>Promise</code>
    * [.get1583(boxNumber, uuid, archiveNumber)](#mailboxes.get1583) ⇒ <code>Promise.&lt;FormPS1583&gt;</code>
    * [.set1583(boxNumber, uuid, formps1583)](#mailboxes.set1583) ⇒ <code>Promise</code>
    * [.boxNumberValid()](#mailboxes.boxNumberValid) ⇒ <code>boolean</code>
    * [.getMailboxProducts()](#mailboxes.getMailboxProducts) ⇒ <code>Promise.&lt;Array&gt;</code>

<a name="mailboxes.FormPS1583"></a>

### mailboxes.FormPS1583
**Kind**: static class of [<code>mailboxes</code>](#mailboxes)  
<a name="new_mailboxes.FormPS1583_new"></a>

#### new FormPS1583()
USPS Form PS1583 object, with all the fields needed by USPS for CMRA customers.

<a name="mailboxes.getList"></a>

### mailboxes.getList(filter) ⇒ <code>Promise.&lt;Array&gt;</code>
Get the list of mailboxes and boxholders as an array of objects, see example.

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filter | <code>null</code> \| <code>object</code> | <code></code> | Filter to mailboxes matching a column condition, such as `getList({number: "102"})` or `getList({"size >=": "2"})`. Supported filter names include "number" (string, box number), "expires" (expiration date), "size" (number 1-10), and "barcode" (string) SQL injection warning: Filter names are inserted directly into query strings without sanitization. Only the values are safe for user input. |

**Example**  
```js
[{
    num: "123", // Box number as string
    expires: 1234567890, // UNIX timestamp (in seconds) or false if box vacant
    size: "2", // Box size, 1-10
    notes: "", // Notes for mailbox, not currently shown in Mailbox Manager UI but may be used in the future
    barcode: "", // Unique barcode for the mailbox, for future use
    renewalMerchID: "", // Merchandise item ID used for autorenewing this mailbox
    isBusiness: false, // True if the box is for a business, false if for personal use
    names: [], // Array of boxholders. See addOrUpdateBoxholder for the format.
    packages: [], // Array of packages awaiting pickup, see below
    vacant: false // True if the box is currently vacant, else false
}]
```
**Example**  
```js
// Data objects in the packages array:
{
    tracking: tracking ?? "[Untracked]", // Package tracking number
    finalized: true, // True if package check-in is finished and shelf tag/mailbox slips printed, false if not finalized
    available_date: Date(), // The date and time the package was checked in
    tag: "" // Unique number assigned to the package and printed on shelf tags, scanned by employee when customer picks up package
}
```
<a name="mailboxes.addDaysToMailbox"></a>

### mailboxes.addDaysToMailbox(boxNumber, days, months) ⇒ <code>Promise</code>
Add a number of days or months to a mailbox's expiration. Use either days or months, not both.

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| boxNumber | <code>string</code> |  | Mailbox number. |
| days | <code>number</code> | <code>0</code> | Days to add. |
| months | <code>number</code> | <code>0</code> | Months to add. |

<a name="mailboxes.setMailboxExpirationDate"></a>

### mailboxes.setMailboxExpirationDate(boxNumber, date) ⇒ <code>Promise</code>
Set the box expiration to a specific JavaScript Date object, or a UNIX timestamp (in seconds).

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  

| Param | Type |
| --- | --- |
| boxNumber | <code>string</code> | 
| date | <code>number</code> \| <code>Date</code> | 

<a name="mailboxes.createMailbox"></a>

### mailboxes.createMailbox(number, size, notes, barcode) ⇒ <code>Promise</code>
Create a new mailbox number with the specified box size. Throws an error if the box number is already in use.

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>string</code> | Mailbox number |
| size | <code>number</code> | Box size (1 - 10) |
| notes | <code>string</code> | Arbitrary string with human-readable notes about the box. |
| barcode | <code>null</code> \| <code>string</code> | A barcode value representing this mailbox, typically a sticker on the the physical box visible when delivering mail. |

<a name="mailboxes.editMailbox"></a>

### mailboxes.editMailbox(oldNumber, newNumber, newSize, barcode) ⇒ <code>Promise</code>
Change the number and/or size of a mailbox while preserving the boxholders
and packages associated. If only changing size, set oldNumber and newNumber to the same value.

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| oldNumber | <code>string</code> |  | Currently assigned box number. |
| newNumber | <code>string</code> |  | New box number. Must not exist yet. |
| newSize | <code>number</code> \| <code>null</code> | <code></code> | Box size (1 - 10), if changing the size. |
| barcode | <code>null</code> \| <code>string</code> |  | A barcode value representing this mailbox, typically a sticker on the the physical box visible when delivering mail. |

<a name="mailboxes.deleteMailbox"></a>

### mailboxes.deleteMailbox(number) ⇒ <code>Promise</code>
Delete a mailbox. Throws an Error if the mailbox has boxholders attached.

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>string</code> | Mailbox number to delete. |

<a name="mailboxes.closeMailbox"></a>

### mailboxes.closeMailbox(number) ⇒ <code>Promise</code>
Close a mailbox by removing the boxholders and marking it as vacant.
Boxholder PS Form 1583 records are automatically archived per USPS regulations.

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>string</code> | Mailbox number to close. |

<a name="mailboxes.mailboxExists"></a>

### mailboxes.mailboxExists(number) ⇒ <code>Promise.&lt;boolean&gt;</code>
Returns true if the mailbox number exists, false if it doesn't.

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>string</code> | Mailbox number to check. |

<a name="mailboxes.addOrUpdateBoxholder"></a>

### mailboxes.addOrUpdateBoxholder(boxNumber, info) ⇒ <code>Promise</code>
Modify or add a boxholder to a mailbox. info is the boxholder structure below.
If the uuid given already belongs to a boxholder, their info is updated with what you supply.
Otherwise, the info is added as a new boxholder.

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  

| Param | Type | Description |
| --- | --- | --- |
| boxNumber | <code>string</code> | Mailbox number |
| info | <code>Object</code> | Boxholder information. |

**Example**  
```js
// Unless noted, all fields are strings and default to an empty string.
{
    name: [bizname, fname, mname, lname].filter(Boolean).join(" "),
    fname: "", // First name
    mname: "", // Middle name
    lname: "", // Last name
    email: "", // Email
    phone: "", // Phone
    uuid: "", // Customer UUID
    bizname: "", // Business name
    street1: "", // Street address
    city: "", // City
    state: "", // Two-character state
    zipcode: "", // ZIP or postal code
    country: "", // Two-character country code
    primary: true // True if the primary (first) boxholder, false if an additional authorized mail recipient
}
```
<a name="mailboxes.removeBoxholder"></a>

### mailboxes.removeBoxholder(boxNumber, uuid) ⇒ <code>Promise</code>
Remove a boxholder by their UUID, and archive their PS Form 1583 data per USPS regulations.

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  

| Param | Type | Description |
| --- | --- | --- |
| boxNumber | <code>string</code> | Mailbox number. |
| uuid | <code>string</code> | Boxholder UUID. |

<a name="mailboxes.get1583"></a>

### mailboxes.get1583(boxNumber, uuid, archiveNumber) ⇒ <code>Promise.&lt;FormPS1583&gt;</code>
Get the FormPS1583 object for a boxholder by UUID.

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| boxNumber | <code>string</code> |  | Mailbox number. |
| uuid | <code>string</code> |  | Boxholder UUID. |
| archiveNumber | <code>boolean</code> | <code>false</code> | If true, returns the form for a deleted boxholder from the archive. |

<a name="mailboxes.set1583"></a>

### mailboxes.set1583(boxNumber, uuid, formps1583) ⇒ <code>Promise</code>
Set the FormPS1583 object for a boxholder by UUID.

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  

| Param | Type | Description |
| --- | --- | --- |
| boxNumber | <code>string</code> | Mailbox number. |
| uuid | <code>string</code> | Boxholder UUID. |
| formps1583 | <code>FormPS1583</code> | The FormPS1583 object to use. |

<a name="mailboxes.boxNumberValid"></a>

### mailboxes.boxNumberValid() ⇒ <code>boolean</code>
Returns true if the mailbox number is an acceptable format, false if it isn't.
Does not check if the box actually exists, merely if the number is acceptable to use as a mailbox number.

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  
<a name="mailboxes.getMailboxProducts"></a>

### mailboxes.getMailboxProducts() ⇒ <code>Promise.&lt;Array&gt;</code>
Get a list of merchandise items that are usable for mailbox renewals.

**Kind**: static method of [<code>mailboxes</code>](#mailboxes)  
**Example**  
```js
[{
    id: "", // Unique ID for this entry in the merchandise table
    name: "", // Merch item name
    category: "", // Merch item category
    price: 0.0, // Sale price in dollars
    cost: 0.0, // Merchandise cost in dollars (likely not used for mailboxes)
    barcode: "", // Barcode/UPC (likely not used for mailboxes)
    tax: 0.0, // Sales tax rate
    rentaldays: 30, // Number of days this item adds to a mailbox (mutually exclusive with rentalmonths)
    rentalmonths: 1, // Number of months (mutually exclusive with rentaldays)
    boxsize: "1" // Mailbox size tier, 1-10
}]
```
