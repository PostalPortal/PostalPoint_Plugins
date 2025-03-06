# Receipt Objects

## global.apis.pos.ReceiptItem

```javascript
export class ReceiptItem {
    /**
     *
     * @param {string|number} id Unique ID number for this item (UPC code, inventory number, etc). Used to deduplicate line items. Unique items (like shipping labels) should be random or empty.
     * @param {string} label One-line item information.
     * @param {string} text Extra item information.
     * @param {number} priceEach Price per unit
     * @param {number} quantity Number of units
     * @param {number} cost Cost per unit. Used for automatic expense tracking.
     * @param {number} taxrate Examples: 0 (for 0%), 0.05 (for 5%), etc
     * @returns {ReceiptItem}
     */
    constructor(id, label, text, priceEach, quantity, cost, taxrate) {
        this.id = id;
        this.label = label;
        if (text == null) {
            this.txt == "";
        } else {
            this.txt = text;
        }
        this.priceEach = num(priceEach);
        this.qty = num(quantity);
        this.cost = num(cost);
        if (isNaN(taxrate)) {
            this.taxRate = 0;
        } else {
            this.taxRate = num(taxrate);
        }
        this.merch = false;
        this.merchid = null;
        this.surcharge = false;
        this.retail = 0; // For ensuring PostalPoint fee collection on office mode shipments
    }

    static fromJSON(obj) {
        var item = new ReceiptItem(obj.id, obj.label, obj.text, obj.priceEach, obj.qty, obj.cost, obj.taxRate);
        item.free = obj.free;
        item.barcode = obj.barcode;
        item.certifiedInfo = obj.certifiedInfo;
        item.toAddress = obj.toAddress;
        item.fromAddress = obj.fromAddress;
        item.merch = obj.isMerch == true;
        item.merchid = item.merch ? obj.merchid : null;
        item.surcharge = obj.surcharge;
        item.retailPrice = obj.retail;
        return item;
    }

    toJSON() {
        return {
            id: this.id,
            label: this.label,
            text: this.text,
            priceEach: num(this.priceEach),
            qty: num(this.qty),
            cost: num(this.cost),
            retail: num(this.retail),
            taxRate: num(this.taxRate),
            free: this.free,
            barcode: this.barcode,
            certifiedInfo: this.certifiedInfo,
            isMerch: this.merch,
            merchid: this.merchid,
            surcharge: this.surcharge,
            toAddress: this.toAddress,
            fromAddress: this.fromAddress
        };
    }

    get text() {
        if (typeof this.txt == "string") {
            return this.txt;
        }
        return "";
    }

    set text(t) {
        if (typeof t == "string") {
            this.txt = t;
        } else {
            this.txt = "";
        }
    }

    get certifiedInfo() {
        if (typeof this.certified == "undefined") {
            return false;
        }
        return this.certified;
    }

    set certifiedInfo(info) {
        this.certified = info;
    }

    setCertifiedInfo(tracking, certfee, extrafees, postage, date, location, toaddress) {
        this.certified = {
            tracking: tracking,
            certifiedFee: num(certfee),
            extraFees: extrafees,
            postage: num(postage),
            date: date,
            location: location,
            to: toaddress
        };
    }

    setQuantity(q) {
        this.qty = num(q);
    }

    get free() {
        return this.isFree == true;
    }

    set free(free) {
        this.isFree = free == true;
    }

    get barcode() {
        if (typeof this.barcodeData != "string") {
            return "";
        }
        return this.barcodeData;
    }

    set barcode(data) {
        this.barcodeData = data;
    }

    get linePrice() {
        return round(m(this.priceEach, this.qty), 2);
    }

    get priceEachFormatted() {
        return "$" + round(num(this.priceEach), 2).toFixed(2);
    }

    get linePriceFormatted() {
        return "$" + round(num(this.linePrice), 2).toFixed(2);
    }

    get texthtml() {
        if (typeof this.text != "string") {
            return "";
        }
        var lines = this.text.split("\n");
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].startsWith("Tracking # ")) {
                // Allow copying tracking number
                lines[i] = "Tracking # <span class=\"usall\">" + lines[i].replace("Tracking # ", "") + "</span>";
            }
        }
        return lines.join("<br />");
    }

    get taxAmount() {
        return round(m(this.linePrice, this.taxRate), 2);
    }

    get retailPrice() {
        if (typeof this.retail == "number") {
            return this.retail;
        }
        return this.priceEach * this.qty;
    }

    set retailPrice(price) {
        this.retail = num(price);
    }

}
```

## global.apis.pos.ReceiptPayment

```javascript
export class ReceiptPayment {

    /**
     *
     * @param {number} amount amount paid
     * @param {string} type payment type
     * @param {string} text extra data (credit card info, etc)
     * @returns {ReceiptPayment}
     */
    constructor(amount, type, text) {
        this.id = (Math.random() * 100000000) + "_" + type + "_" + amount;
        this.text = (typeof text != "string" ? "" : text);
        this.type = type;
        this.amount = amount;
    }

    static fromJSON(obj) {
        var item = new ReceiptPayment(obj.amount, obj.type, obj.text);
        item.id = obj.id;
        return item;
    }

    toJSON() {
        return {
            amount: round(this.amount, 2),
            type: this.type,
            text: this.text,
            id: this.id
        };
    }

    get texthtml() {
        if (typeof this.text != "string") {
            return "";
        }
        return this.text.replaceAll("\n", "<br />");
    }

    get amountFormatted() {
        return "$" + this.amount.toFixed(2);
    }

    get label() {
        if (typeof this.type != "string") {
            return "Payment";
        }
        switch (this.type) {
            case "cash":
                return "Cash";
            case "check":
                return "Check";
            case "card":
                return "Card";
            case "card_manual":
                return "Card";
            case "account":
                return "Account";
            case "free":
                return "Free";
            case "discount":
                return "Discount";
            case "crypto":
                return "Cryptocurrency";
            case "ach":
                return "ACH Debit";
            default:
                return this.type;
        }
    }
}
```