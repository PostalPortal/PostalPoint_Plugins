# TrackingBarcode class

For your reference, here is the source code of the TrackingBarcode class, used to represent a prepaid drop-off.
This class is provided to plugins as `global.apis.barcode.TrackingBarcode`.

```javascript
export class TrackingBarcode {
    /**
     * Create a tracking barcode object.
     * @param {string} code Tracking number.
     * @returns {TrackingBarcode}
     */
    constructor(code) {
        // All data are optional except for the tracking number. Missing data is gracefully handled by the PostalPoint UI.
        this.cleanCode = code;
        // Destination ZIP Code, for domestic shipments. The city and state are automatically added.  If toAddress is specified, toZip is ignored in favor of it.
        this.toZip = "";
        // Two-letter destination country code.  If not "US", toZip is ignored, and the full country name is appended to the displayed address information.
        this.toCountry = "US";
        // If toAddress is set, it will be used instead of the toZip when displaying the destination.
        // If both toZip and toAddress are empty strings, no destination will be displayed.
        this.toAddress = "";
        // If message is not empty, the barcode will NOT be added and the message will be displayed to the user.
        this.message = "";
        // If warning is not empty, the barcode WILL be added and a message will be displayed to the user.
        this.warning = "";
        // Shipping carrier name.
        this.carrier = "";
        // Shipping service/mail class full name and description. Example: "Priority Mail Adult Signature Required".
        this.serviceName = "";
        // Shipping service/mail class name, without extra info such as "signature required".
        // Example: "Priority Mail"
        this.serviceShort = "";
        // If set to false, the barcode will be rejected with a suitable message when PostalPoint is running in self-serve kiosk mode.
        this.dropoff = true;
    }

    /**
     * Set the tracking number
     * @param {string} str
     * @returns {undefined}
     */
    set tracking(str) {
        this.cleanCode = str;
    }

    /**
     * Set the service/mail class description string.
     * @param {string} str
     * @returns {undefined}
     */
    set service(str) {
        this.serviceShort = str;
        this.serviceName = str;
    }

    /**
     * Get the tracking number.
     * @returns {String}
     */
    get tracking() {
        return this.cleanCode;
    }

    /**
     * Get the destination ZIP code.
     * @returns {String}
     */
    get zip() {
        return this.toZip;
    }

    /**
     * Get the service/mail class description.
     * @returns {String}
     */
    get service() {
        if (this.serviceShort != "") {
            return this.serviceShort;
        } else if (this.serviceName != "") {
            return this.serviceName;
        }
        return "";
    }

    /**
     * Get the carrier and service info.
     * @returns {String}
     */
    get serviceString() {
        var str = [];
        if (this.carrier != "") {
            str.push(this.carrier);
        }
        if (this.serviceShort != "") {
            str.push(this.serviceShort);
        } else if (this.serviceName != "") {
            str.push(this.serviceName);
        }
        return str.join(" ");
    }

    /**
     * Get the destination information as a human-presentable multiline string.
     * @returns {String}
     */
    get destString() {
        var addressLines = [];
        if (this.toAddress != "") {
            addressLines.push(...this.toAddress.split("\n"));
        }
        if (this.toCountry.toUpperCase() == "US" && this.toZip != "" && this.toAddress == "") {
            var zipdata = getZIP(this.toZip);
            if (zipdata != false) {
                addressLines.push(`${zipdata.city} ${zipdata.state} ${this.toZip}`);
            } else {
                addressLines.push(`${this.toZip}`);
            }
        } else if (this.toCountry.toUpperCase() != "US") {
            addressLines.push(getCountryNameForISO(this.toCountry));
        }
        return addressLines.join("\n");
    }

    /**
     * Get the package information in a format suitable for display on a receipt.
     * @param {boolean} includeTrackingNumber If false, the tracking number will be suppressed.
     * @returns {String}
     */
    toString(includeTrackingNumber = true) {
        var lines = [];
        if (includeTrackingNumber && this.cleanCode) {
            lines.push(this.cleanCode);
        }
        var serv = this.serviceString;
        if (serv != "") {
            lines.push(serv);
        }
        var dest = this.destString;
        if (dest != "") {
            var destlines = dest.split("\n");
            destlines[0] = "To " + destlines[0];
            lines.push(...destlines);
        }

        return lines.join("\n");
    }
}
```