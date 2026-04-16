# Parcel/Package Object

This is the object used for `global.apis.shipping.Package` and several other shipping APIs.

```javascript
class Package {

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
            extraInsurance: false, // can be a number in USD
            extraInsuranceProviderID: "",
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
        this.useReturnAsOriginAddress = false;
    }

    toPostalPortalShipment() {
    }

    /**
     * Format as EasyPost shipment object
     * @returns {Package.toEasyPostShipment.shipment}
     */
    async toEasyPostShipment() {
    }

    /**
     * Format as Endicia shipment object
     * @returns {Package.toSERAShipment.shipment}
     */
    async toSERAShipment() {
    }

    toJSON() {
        return {
            prepaid: this.prepaid,
            packaging: this.packaging,
            extraServices: this.extraServices,
            specialRateEligibility: this.specialRateEligibility,
            customs: this.customs,
            toAddress: this.toAddress,
            returnAddress: this.returnAddress,
            originAddress: this.originAddress,
            trackingNumber: this.trackingNumber,
            description: this.description,
            useReturnAsOriginAddress: this.useReturnAsOriginAddress
        };
    }

    /**
     * Get a human-readable summary of size and options.
     * Does not include address data.
     * @returns {String}
     */
    async toString() {
    }

    /**
     * Check if the package requires the USPS HAZMAT screening question
     * @returns {Boolean}
     */
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
    }

    setCustomsItems(items) {
        for (var i = 0; i < items.length; i++) {
            items[i].hscode = items[i].hscode?.replace(/\D/g, '');
        }
        this.customs.items = items;
    }

    getCustoms() {
        this.customs.items = this.getCustomsItems();
        return this.customs;
    }

    /**
     * Attempt to automatically fix simple issues like overweight letters.
     */
    async fixIssues() {
    }

    /**
     * Do some basic checks to see if this package is even remotely shippable
     * @param {boolean} kioskMode If true, returned strings are suitable for display in kiosk mode.
     * @returns {boolean|string} true if okay, human-readable error message and instructions if not okay
     */
    async isValid(kioskMode = false) {
    }

    /**
     * Set package characteristics
     * @param {string} type - "Parcel", "Letter", "Flat", "Card"
     * @param {string} service
     * @param {string} carrier
     * @param {number} length - inches
     * @param {number} width - inches
     * @param {number} height - inches
     * @param {number} weightOz - ounces
     * @returns {undefined}
     */
    setPackaging(type, service, carrier, length, width, height, weightOz, nonmachinable) {
    }

    /**
     * Set an extra service
     * @param {string} id Service ID
     * @param {boolean} enabled Turn it on or off
     * @param {string} value Service value, if needed (some are not just a boolean)
     * @returns {undefined}
     */
    setExtraService(id, enabled, value) {
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
     * @param {string} type - "to", "return", or "origin"
     * @param {object} address
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
    }

    /**
     * @param {String} n - Tracking number
     */
    set tracking(n) {
    }

    /**
     * Get the "from" address that will be shown,
     * using the return address or origin address as needed
     * @returns {address}
     */
    getReturnAddress() {
    }

    /**
     * @returns {Address}
     */
    getToAddress() {
    }

    /**
     * @returns {Address}
     */
    getFromAddress() {
    }
}
```
