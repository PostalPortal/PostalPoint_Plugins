# Parcel/Package Object

This object is supplied a plugin registered with `registerRateEndpoint` when PostalPoint requests
shipping rates from the plugin.

```javascript
export class Package {
    constructor(isPrepaid = false) {
        this.prepaid = isPrepaid;
        this.packaging = {
            type: "Parcel",
            service: "",
            carrier: "",
            length: 999999,
            width: 999999,
            height: 999999,
            weightOz: 999999,
            nonmachinable: false,
            additionalHandling: false,
            internalid: 100,
            oversizeFlag: false
        };
        this.extraServices = {
            certifiedMail: false,
            barcode3800: "",
            registeredMail: false,
            registeredMailAmount: false, // can be a number in USD
            returnReceipt: false,
            returnReceiptElectronic: false,
            insurance: false, // can be a number in USD
            signature: false, // can be false, "SIGNATURE", or "SIGNATURE_RESTRICTED"
            hazmat: false,
            perishable: false,
            crematedRemains: false,
            liveAnimal: false, // BEES, DAY_OLD_POULTRY, ADULT_BIRDS, OTHER_LIVES
            cod: false, // Collect on Delivery
            codAmount: false,
            endorsement: "", // ADDRESS_SERVICE_REQUESTED, CHANGE_SERVICE_REQUESTED, FORWARDING_SERVICE_REQUESTED, LEAVE_IF_NO_RESPONSE, RETURN_SERVICE_REQUESTED
            carrier_billing_account: {// Bill a third party's account number for the label
                type: "", // "" (ignores this entire option), "SENDER" (EasyPost default), "THIRD_PARTY", "RECEIVER", "COLLECT"
                carrier: "", // Carrier ID (should be used to filter rates)
                account_number: "", // Carrier account number to bill
                country: "", // Country account is based in
                postal_code: "" // Postal code of account
            },
            dryIce: false,
            dryIceWeight: 0,
            dryIceMedical: false
        };
        this.description = ""; // Fillable on customs form, or generated before rating call using customs items
        this.specialRateEligibility = false;
        this.customs = {
            contents: "",
            contentsExplanation: "", // needed if contents is "other", will be copied from this.description if blank for maximum carrier compatibility
            signature: "",
            restriction: "",
            restrictionComments: "", // needed if restriction is "other"
            nonDelivery: "return", // "return" or "abandon",
            eel_pfc: "",
            items: [] // {index: 0, description: "", qty: "", lbs: "", oz: "", value: "", hscode: "", origin: US"}
        };
        this.toAddress = new Address();
        this.returnAddress = new Address();
        this.originAddress = new Address();
        this.trackingNumber = "";
    }

    /**
     * Format as EasyPost shipment object
     * @returns {Package.toEasyPostShipment.shipment}
     */
    async toEasyPostShipment() {
        // Not relevant to plugins
    }

    /**
     * Format as Endicia shipment object
     * @returns {Package.toSERAShipment.shipment}
     */
    async toSERAShipment() {
        // Not relevant to plugins
    }

    /**
     * Get a human-readable summary of size and options.
     * Does not include address data.
     * @returns {String}
     */
    async toString() {
        let summary = [];
        let packaging = await getPackagingByID(this.packaging.internalid);
        let weight = ozToLbsOz(this.packaging.weightOz);
        let weightStr = this.packaging.weightOz >= 16 ? `${weight[0]} lbs ${weight[1]} oz` : `${weight[1]} oz`;
        if (packaging != false) {
            if (packaging.irregular) {
                if (packaging.weight === false) {
                    summary.push("Parcel");
                } else {
                    summary.push(`${weightStr} Parcel`);
                }
                summary.push("Additional Handling");
            } else {
                if (packaging.weight === false) {
                    summary.push(packaging.name);
                } else {
                    summary.push(`${weightStr} ${packaging.name}`);
                }
            }
        } else {
            summary.push(weightStr);
        }
        if (this.extraServices.hazmat) {
            summary.push("HAZMAT");
        }
        if (this.extraServices.liveAnimal === true) {
            summary.push("Live Animals");
        } else if (typeof this.extraServices.liveAnimal == "string") {
            switch (this.extraServices.liveAnimal) {
                case "BEES":
                    summary.push("Live Bees");
                    break;
                case "DAY_OLD_POULTRY":
                    summary.push("Day-old Poultry");
                    break;
                case "ADULT_BIRDS":
                    summary.push("Live Adult Birds");
                    break;
                case "OTHER_LIVES":
                default:
                    summary.push("Live Animals");
                    break;
            }
        }
        if (this.extraServices.perishable) {
            summary.push("Perishable");
        }
        if (this.extraServices.crematedRemains) {
            summary.push("Cremated Remains");
        }
        if (this.extraServices.certifiedMail) {
            summary.push("Certified Mail");
        } else if (this.extraServices.registeredMail) {
            summary.push("Registered Mail");
            summary.push("Registered for $" + (this.extraServices.registeredMailAmount * 1.0).toFixed(2));
        } else if (this.extraServices.signature == "SIGNATURE") {
            summary.push("Signature Required");
        }
        if (this.extraServices.signature == "ADULT_SIGNATURE") {
            summary.push("Adult Signature Required");
        }
        if (this.extraServices.signature == "SIGNATURE_RESTRICTED") {
            summary.push("Restricted Delivery");
        }
        if (this.extraServices.returnReceiptElectronic) {
            summary.push("Return Receipt Electronic");
        }
        if (this.extraServices.returnReceipt) {
            summary.push("Return Receipt");
        }
        if (this.extraServices.insurance) {
            summary.push("Insured for $" + (this.extraServices.insurance * 1.0).toFixed(2));
        }
        if (this.extraServices.cod) {
            summary.push("Collect on Delivery: $" + (this.extraServices.codAmount * 1.0).toFixed(2));
        }
        if (this.extraServices.dryIce && this.extraServices.dryIceWeight > 0) {
            summary.push("Dry Ice: " + (this.extraServices.dryIceWeight * 1).toFixed(0) + " oz");
        }
        if (this.extraServices.carrier_billing_account?.type) {
            if (this.extraServices.carrier_billing_account.type != "") {
                var accountNumber = this.extraServices.carrier_billing_account.account_number;
                var accountNumberCensored = accountNumber.substring(accountNumber.length - 4).padStart(accountNumber.length, "X");
                var carrierName = this.extraServices.carrier_billing_account.carrier;
                switch (this.extraServices.carrier_billing_account.type) {
                    case "SENDER":
                        summary.push(`Bill to sender ${carrierName} account #${accountNumberCensored}`);
                        break;
                    case "THIRD_PARTY":
                        summary.push(`Bill to third party ${carrierName} account #${accountNumberCensored}`);
                        break;
                    case "RECEIVER":
                        summary.push(`Bill to receiver ${carrierName} account #${accountNumberCensored}`);
                        break;
                    case "COLLECT":
                        if (accountNumber.length > 0) {
                            summary.push(`Bill collect ${carrierName} account #${accountNumberCensored}`);
                        } else {
                            summary.push(`Bill collect`);
                        }
                        break;
                }
            }
        }
        return summary.join("\n");
    }

    async needsHAZMATPrompt() {
        try {
            let packagingInfo = await getPackagingByID(this.packaging.internalid);
            if (packagingInfo.hazmat) {
                return true;
            }
            if (this.packaging.weight > 10) {
                return true;
            }
            if (packagingInfo.l >= -1 && Math.max(this.packaging.length, this.packaging.width, this.packaging.height) > 0.5) {
                return true;
            }
            switch (packagingInfo.type) {
                case "Letter":
                case "Card":
                    return false;
            }
            return true;
        } catch (ex) {
            return true;
        }
    }

    get isPrepaid() {
        return this.prepaid == true;
    }

    setCustomsInfo(contents, contentsExplanation, signature, restriction, restrictionComments, nonDelivery) {
        let items = this.customs.items; // Save this and copy it back in so we don't overwrite it
        this.customs = {
            contents: contents,
            contentsExplanation: contentsExplanation, // needed if contents is "other"
            signature: signature,
            restriction: restriction,
            restrictionComments: restrictionComments, // needed if restriction is "other"
            nonDelivery: nonDelivery, // "return" or "abandon",
            items: items
        };
    }

    /**
     * Get the customs items, ignoring any that are blank.
     * @returns {Array}
     */
    getCustomsItems() {
        let items = [];
        for (let i = 0; i < this.customs.items.length; i++) {
            let item = this.customs.items[i];
            if (item.description == "" && (item.qty == "" || item.qty == 0) && (item.weight == "" || item.weight == 0) && (item.value == "" || item.value == 0)) {
                continue;
            }
            items.push(item);
        }
        return items;
    }

    setCustomsItems(items) {
        this.customs.items = items;
    }

    getCustoms() {
        this.customs.items = this.getCustomsItems();
        return this.customs;
    }

    /**
     * Attempt to automatically fix simple issues like overweight letters.
     * @returns {undefined}
     */
    async fixIssues() {
        if (this.packaging.type == "Letter" && this.packaging.weightOz > 3.5) {
            if (this.packaging.nonmachinable) {
                return; // Has to be a parcel, can't fix without dimensions
            }
            this.packaging.type = "Flat";
            this.packaging.internalid = 104;
        }
    }

    /**
     * Do some basic checks to see if this package is even remotely shippable
     * @param {boolean} kioskMode If true, returned strings are suitable for display in kiosk mode.
     * @returns {boolean|string} true if okay, human-readable error message and instructions if not okay
     */
    async isValid(kioskMode = false) {
        // Removed from docs for brevity. Just a bunch of if statements to catch problems.
    }

    /**
     * Set package characteristics
     * @param {string} type "Parcel", "Letter", "Flat", "Card"
     * @param {type} service
     * @param {type} carrier
     * @param {type} length
     * @param {type} width
     * @param {type} height
     * @param {type} weightOz
     * @returns {undefined}
     */
    setPackaging(type, service, carrier, length, width, height, weightOz, nonmachinable) {
        if (typeof nonmachinable == "undefined") {
            nonmachinable = false;
        }
        if (type == "Card") {
            // Postcards
            weightOz = 1;
            this.packaging.internalid = 105;
        } else if (type == "Flat") {
            this.packaging.internalid = 104;
        } else if (type == "Letter") {
            this.packaging.internalid = 102;
            if (nonmachinable) {
                this.packaging.internalid = 103;
            }
        }
        this.packaging.type = type;
        this.packaging.service = service;
        this.packaging.carrier = carrier;
        this.packaging.weightOz = weightOz;
        this.packaging.nonmachinable = nonmachinable;

        // Enforce Length > Width > Height
        let size = [length, width, height];
        size.sort(function (a, b) {
            return b - a;
        });
        this.packaging.length = size[0];
        this.packaging.width = size[1];
        this.packaging.height = size[2];
    }

    /**
     * Set an extra service
     * @param {string} id Service ID
     * @param {boolean} enabled Turn it on or off
     * @param {string} value Service value, if needed (some are not just a boolean)
     * @returns {undefined}
     */
    setExtraService(id, enabled, value) {
        if (typeof value != "undefined" && enabled) {
            this.extraServices[id] = value;
        } else {
            this.extraServices[id] = enabled == true;
        }
    }

    getExtraServices() {
        return this.extraServices;
    }

    /**
     * Set to "MEDIA_MAIL", "LIBRARY_MAIL", or false
     * @param {type} rate
     * @returns {undefined}
     */
    set specialRate(rate) {
        if (rate == "MEDIA") {
            rate = "MEDIA_MAIL";
        } else if (rate == "LIBRARY") {
            rate = "LIBRARY_MAIL";
        }
        if (rate != "MEDIA_MAIL" && rate != "LIBRARY_MAIL") {
            rate = false;
        }
        this.specialRateEligibility = rate;
    }

    get specialRate() {
        return this.specialRateEligibility;
    }

    /**
     * Save an address to this package.
     * @param {string} type "to", "return", or "origin"
     * @param {string} name
     * @param {string} company
     * @param {string} street1
     * @param {string} street2
     * @param {string} city
     * @param {string} state
     * @param {string} zip
     * @param {string} country ISO 2-char country code
     * @param {string} phone
     * @param {string} email
     * @returns {undefined}
     */
    setAddress(type, name, company, street1, street2, city, state, zip, country, phone, email) {
        let address = Address.fromObject({
            name: name,
            company: company,
            street1: street1,
            street2: street2,
            city: city,
            state: state,
            zip: zip,
            country: country,
            phone: phone,
            email: email
        });
        switch (type) {
            case "to":
                this.toAddress = address;
                break;
            case "return":
                this.returnAddress = address;
                break;
            case "origin":
                this.originAddress = address;
                break;
        }
    }

    /**
     * Set an address using an object that matches the internal form (see setAddress())
     * @param {string} type
     * @param {object} data
     * @returns {undefined}
     */
    setAddressWhole(type, address) {
        switch (type) {
            case "to":
                this.toAddress = Address.fromObject(address);
                break;
            case "return":
                this.returnAddress = Address.fromObject(address);
                break;
            case "origin":
                this.originAddress = Address.fromObject(address);
                break;
        }
    }

    get tracking() {
        return this.trackingNumber;
    }

    set tracking(n) {
        this.trackingNumber = n;
    }

    /**
     * Get the "from" address that will be shown,
     * using the return address or origin address as needed
     * @returns {address}
     */
    getReturnAddress() {
        var a = null;
        if (typeof this.returnAddress == "object") {
            a = Address.fromObject(this.returnAddress);
        } else {
            a = Address.fromObject(this.originAddress);
        }
        if (a.country == "") {
            a.country = defaultCountryCode();
        }
        return a;
    }

    getToAddress() {
        var a = Address.fromObject(this.toAddress);
        if (a.country == "") {
            a.country = defaultCountryCode();
        }
        return a;
    }

    getFromAddress() {
        var a = null;
        if (typeof this.originAddress == "object") {
            a = Address.fromObject(this.originAddress);
        } else {
            a = Address.fromObject(this.returnAddress);
        }
        if (a.country == "") {
            a.country = defaultCountryCode();
        }
        return a;
    }
}
```