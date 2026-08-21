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
            dryIceMedical: false,
            holdAtLocation: false
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
        this._toAddress = new Address();
        this._returnAddress = new Address();
        this._originAddress = new Address();
        this.trackingNumber = "";
        this.useReturnAsOriginAddress = false;
        this.verifyToAddress = true;
        this.addPackageDimGetSet();
    }

    fromObject(obj) {
        this.prepaid = obj.prepaid;
        this.packaging = obj.packaging;
        this.extraServices = obj.extraServices;
        this.description = obj.description;
        this.specialRateEligibility = obj.specialRateEligibility;
        this.customs = obj.customs;
        this.toAddress = obj.toAddress ?? obj._toAddress;
        this.returnAddress = obj.returnAddress ?? obj._returnAddress;
        this.originAddress = obj.originAddress ?? obj._originAddress;
        this.trackingNumber = obj.trackingNumber;
        this.useReturnAsOriginAddress = obj.useReturnAsOriginAddress;
        this.verifyToAddress = obj.verifyToAddress ?? true;
        this.addPackageDimGetSet();
    }

    clone() {
        let n = new Package();
        n.fromObject(structuredClone(this));
        return n;
    }

    addPackageDimGetSet() {
        if (typeof this.packaging.lengthDisplay == "undefined") {
            Object.defineProperty(this.packaging, "lengthDisplay", {
                get: function () {
                    return convertFromInches(this.length);
                },
                set: function (val) {
                    this.length = convertToInches(val);
                }
            });
        }
        if (typeof this.packaging.widthDisplay == "undefined") {
            Object.defineProperty(this.packaging, "widthDisplay", {
                get: function () {
                    return convertFromInches(this.width);
                },
                set: function (val) {
                    this.width = convertToInches(val);
                }
            });
        }
        if (typeof this.packaging.heightDisplay == "undefined") {
            Object.defineProperty(this.packaging, "heightDisplay", {
                get: function () {
                    return convertFromInches(this.height);
                },
                set: function (val) {
                    this.height = convertToInches(val);
                }
            });
        }
    }

    toJSON() {
        return {
            prepaid: this.prepaid,
            packaging: this.packaging,
            extraServices: this.extraServices,
            specialRateEligibility: this.specialRateEligibility,
            customs: this.customs,
            toAddress: this.toAddress.toObject(),
            returnAddress: this.returnAddress.toObject(),
            originAddress: this.originAddress.toObject(),
            trackingNumber: this.trackingNumber,
            description: this.description,
            useReturnAsOriginAddress: this.useReturnAsOriginAddress,
            verifyToAddress: this.verifyToAddress
        };
    }

    /**
     * Get a text description of the package contents. Uses this.description if set, otherwise generates from customs items descriptions.
     * @returns {String}
     */
    getDescription() {
        if (this.description) {
            return this.description;
        }
        let items = this.getCustomsItems();
        if (items.length == 0 && this.customs.contents == "documents") {
            return "Documents, no commercial value";
        }
        let descriptionStrings = [];
        for (let i = 0; i < items.length; i++) {
            descriptionStrings.push(items[i].description);
        }
        let str = descriptionStrings.join(", ");
        if (str.length > 50) {
            str = str.substring(0, 47) + "...";
        }
        return str;
    }

    /**
     * Get a human-readable summary of size and options.
     * Does not include address data.
     * @param {string} insuranceLanguage - Insured package description.  "ins": "Insured for", "dv": "Declared value", "": "Value" (default)
     * @param {boolean} customerFacing - If true, strings will be localized to the configured customer language.
     * @returns {String}
     */
    async toString(insuranceLanguage = "", customerFacing = true) {
        let tf = global.tc;
        if (!customerFacing) {
            tf = global.t;
        }
        console.log("parcel toString", customerFacing);
        let summary = [];
        let packaging = await getPackagingByID(this.packaging.internalid);

        let weight = ozToLbsOz(this.packaging.weightOz);
        let weightStr = this.packaging.weightOz >= 16 ? `${weight[0]} lbs ${weight[1]} oz` : `${weight[1]} oz`;
        switch ((customerFacing ? getScaleStatus().customerUnits : getScaleStatus().displayUnits)) {
            case "lb":
                weightStr = convertFromOunces(this.packaging.weightOz, "lb").toFixed(2) + " lbs";
                break;
            case "kg":
                weightStr = convertFromOunces(this.packaging.weightOz, "kg").toFixed(3) + " kg";
                break;
        }
        if (packaging != false) {
            if (packaging.i18n) {
                packaging.name = tf(packaging.i18n);
            }
            if (packaging.irregular) {
                if (packaging.weight === false) {
                    summary.push(tf("ship~~parcelToString~Parcel"));
                } else {
                    summary.push(tf("ship~~parcelToString~[weight] Parcel", {weight: weightStr}));
                }
                summary.push(tf("ship~~parcelToString~Additional Handling"));
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
            summary.push(tf("ship~~parcelToString~HAZMAT"));
        }
        if (this.extraServices.liveAnimal === true) {
            summary.push(tf("ship~~parcelToString~Live Animals"));
        } else if (typeof this.extraServices.liveAnimal == "string") {
            switch (this.extraServices.liveAnimal) {
                case "BEES":
                    summary.push(tf("ship~~parcelToString~Live Bees"));
                    break;
                case "DAY_OLD_POULTRY":
                    summary.push(tf("ship~~parcelToString~Day-old Poultry"));
                    break;
                case "ADULT_BIRDS":
                    summary.push(tf("ship~~parcelToString~Live Adult Birds"));
                    break;
                case "OTHER_LIVES":
                default:
                    summary.push(tf("ship~~parcelToString~Live Animals"));
                    break;
            }
        }
        if (this.extraServices.perishable) {
            summary.push(tf("ship~~parcelToString~Perishable"));
        }
        if (this.extraServices.crematedRemains) {
            summary.push(tf("ship~~parcelToString~Cremated Remains"));
        }
        if (this.extraServices.certifiedMail) {
            summary.push(tf("ship~~parcelToString~Certified Mail"));
        } else if (this.extraServices.registeredMail) {
            summary.push(tf("ship~~parcelToString~Registered Mail"));
            summary.push(tf("ship~~parcelToString~Registered for [money]", {money: moneyString(this.extraServices.registeredMailAmount * 1.0)}));
        } else if (this.extraServices.signature == "SIGNATURE") {
            summary.push(tf("ship~~parcelToString~Signature Required"));
        }
        if (this.extraServices.signature == "ADULT_SIGNATURE") {
            summary.push(tf("ship~~parcelToString~Adult Signature Required"));
        }
        if (this.extraServices.signature == "SIGNATURE_RESTRICTED") {
            summary.push(tf("ship~~parcelToString~Restricted Delivery"));
        }
        if (this.extraServices.returnReceiptElectronic) {
            summary.push(tf("ship~~parcelToString~Return Receipt Electronic"));
        }
        if (this.extraServices.returnReceipt) {
            summary.push(tf("ship~~parcelToString~Return Receipt"));
        }
        if (this.extraServices.insurance) {
            let infostr = "Value: [money]";
            switch (insuranceLanguage) {
                case "dv":
                    infostr = "Declared value: [money]";
                    break;
                case "ins":
                    infostr = "Insured for [money]";
                    break;
            }
            summary.push(tf("ship~~parcelToString~" + infostr, {money: moneyString(this.extraServices.insurance * 1.0)}));
        }
        if (this.extraServices.extraInsurance && this.extraServices.extraInsuranceProviderID) {
            try {
                summary.push(getInsurancePlugin(this.extraServices.extraInsuranceProviderID).name + ": " + moneyString(this.extraServices.extraInsurance * 1.0));
            } catch (ex) {
                console.error(ex);
            }
        }
        if (this.extraServices.cod) {
            summary.push(tf("ship~~parcelToString~Collect on Delivery: [money]", {money: moneyString(this.extraServices.codAmount * 1.0)}));
        }
        if (this.extraServices.dryIce && this.extraServices.dryIceWeight > 0) {
            summary.push(tf("ship~~parcelToString~Dry Ice: [weight]", {weight: (this.extraServices.dryIceWeight * 1).toFixed(0) + " oz"}));
        }
        if (this.extraServices.carrier_billing_account?.type) {
            if (this.extraServices.carrier_billing_account.type != "") {
                var accountNumber = this.extraServices.carrier_billing_account.account_number;
                var accountNumberCensored = accountNumber.substring(accountNumber.length - 4).padStart(accountNumber.length, "X");
                var carrierName = this.extraServices.carrier_billing_account.carrier;
                switch (this.extraServices.carrier_billing_account.type) {
                    case "SENDER":
                        summary.push(tf("ship~~parcelToString~Bill to sender [carrier] account [account]", {carrier: carrierName, account: accountNumberCensored}));
                        break;
                    case "THIRD_PARTY":
                        summary.push(tf("ship~~parcelToString~Bill to third party [carrier] account [account]", {carrier: carrierName, account: accountNumberCensored}));
                        break;
                    case "RECEIVER":
                        summary.push(tf("ship~~parcelToString~Bill to receiver [carrier] account [account]", {carrier: carrierName, account: accountNumberCensored}));
                        break;
                    case "COLLECT":
                        if (accountNumber.length > 0) {
                            summary.push(tf("ship~~parcelToString~Bill collect [carrier] account [account]", {carrier: carrierName, account: accountNumberCensored}));
                        } else {
                            summary.push(tf("ship~~parcelToString~Bill collect"));
                        }
                        break;
                }
            }
        }
        return summary.join("\n");
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

    setCustomsInfo(contents, contentsExplanation, signature, restriction, restrictionComments, nonDelivery, eel_pfc = "NOEEI 30.37(a)") {
        let items = this.customs.items; // Save this and copy it back in so we don't overwrite it
        this.customs = {
            contents: contents,
            contentsExplanation: contentsExplanation, // needed if contents is "other"
            signature: signature,
            restriction: (restriction == "" ? "none" : restriction),
            restrictionComments: restrictionComments, // needed if restriction is "other"
            nonDelivery: nonDelivery, // "return" or "abandon",
            eel_pfc: eel_pfc,
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
            item.hscode = item.hscode?.replace(/\D/g, '');
            items.push(item);
        }
        return items;
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
     * Get the eel_pfc string, but if it's not set, look at the shipment data and find an exemption code to return instead.
     * @returns {String}
     */
    getSuggestedEELPFC() {
        if (typeof this.customs.eel_pfc == "string" && this.customs.eel_pfc.length > 4) {
            return this.customs.eel_pfc;
        }
        if (this.getFromAddress().country == "US") {
            var valueTotal = 0;
            var its = this.getCustomsItems();
            for (var i = 0; i < its.length; i++) {
                if (!isNaN(its[i].value)) {
                    valueTotal += its[i].value * 1.0;
                }
            }
            if (valueTotal < 800 && this.customs.contents == "gift") {
                return "NOEEI 30.37(h)";
            } else if (valueTotal < 2500) {
                // Shipments valued at $2,500 or less
                return "NOEEI 30.37(a)";
            } else if (this.getToAddress().country == "CA") {
                // Shipments destined to Canada of any value
                return "NOEEI 30.36";
            } else if (this.getToAddress().country == "US" && ["AA", "AE", "AP"].includes(this.getToAddress().state)) {
                // Shipments to Army Post Office (APO address), Diplomatic Post Office (DPO), or Fleet Post Office (FPO).
                return "NOEEI 30.37(w)";
            }
        }
        return this.customs.eel_pfc;
    }

    /**
     * Attempt to automatically fix simple issues like overweight letters.
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
        if (this.returnAddress.street1 == "") {
            return "Missing \"from\" street address.";
        }
        if (this.toAddress.street1 == "") {
            return "Missing \"to\" street address.";
        }
        if (this.extraServices.hazmat
                && (
                        (this.toAddress.name == "" && this.toAddress.company == "")
                        || (this.returnAddress.name == "" && this.returnAddress.company == ""))) {
            return "HAZMAT labels must have names in the \"to\" and \"from\".";
        }
        if (this.returnAddress.country && this.returnAddress.country != defaultCountryCode()) {
            return "From/return address must be a domestic address, not international.";
        }
        if (false && (!this.toAddress.city || this.toAddress.city == "")) {
            // Disable this check, some international (UAE, for example) might not have it.
            if (kioskMode) {
                return "To/destination address must have a city/district/locality, but none was found.";
            }
            return "To/destination address must have a city/district/locality, but none was entered.";
        }
        var box = await getPackagingByID(this.packaging.internalid);
        if (box == false) {
            return "Invalid packaging type. Did you forget to select the envelope type?";
        }
        var itemnoun = "package";
        var Itemnoun = "Package";
        if (box.envelope == true) {
            itemnoun = "envelope";
            Itemnoun = "Envelope";
        }
        if (this.packaging.length == 999999 || this.packaging.width == 999999 || this.packaging.height == 999999) {
            if (kioskMode) {
                return `Go back and fill in the ${itemnoun}'s size.`;
            }
            return `Set the ${itemnoun} dimensions first.`;
        }
        if (this.packaging.weightOz == 999999) {
            if (box.weight !== false) {
                if (kioskMode) {
                    return `Your ${itemnoun} hasn't been weighed yet. Go back and try again.`;
                }
                return `The ${itemnoun} needs to be weighed first.`;
            }
        }
        if (this.packaging.length > 150 || this.packaging.width > 150 || this.packaging.height > 150) {
            // Nobody allows things this big except for freight
            if (kioskMode) {
                return `${Itemnoun} is too large and cannot be shipped from this kiosk.`;
            }
            if (getSetting("freight_mode", "") == "") {
                return Itemnoun + " too large (maybe use a freight company instead).";
            }
        }
        if ((this.packaging.length * 1.0) + (this.packaging.width * 2.0) + (this.packaging.height * 2.0) > 165) {
            if (kioskMode) {
                return `${Itemnoun} is too large and cannot be shipped from this kiosk.`;
            }
            if (getSetting("freight_mode", "") == "") {
                return Itemnoun + " too large (maybe use a freight company instead).";
            }
        }
        if (this.packaging.height <= 0.25) {
            if (box.l >= -1 && (this.packaging.length < 5 || this.packaging.width < 3.5)) {
                if (kioskMode) {
                    if (getDimUnit() == "cm") {
                        return `${Itemnoun} is too small to be safely shipped. It must be at least 12 cm long and 9 cm wide.`;
                    }
                    return `${Itemnoun} is too small to be safely shipped. It must be at least 5 inches long and 3 1/2 inches wide.`;
                }
                if (getDimUnit() == "cm") {
                    return "Too small: must be at least 9 by 12 cm";
                }
                return "Too small: must be at least 3.5 by 5 inches";
            }
        }

        if (this.packaging.type == "Letter" && this.packaging.weightOz > 3.5) {
            if (this.packaging.nonmachinable) {
                return "Letters must be 3.5 oz or less. An overweight non-machinable letter must be sent as a box instead.";
            }
            return "Letters must be 3.5 oz or less. Send as a flat/large envelope instead.";
        }

        if (this.packaging.type == "Flat" && defaultCountryCode() == "US") {
            if (this.toAddress.country == "US" || (this.toAddress.country == "" && defaultCountryCode() == "US")) {
                if (this.packaging.weightOz > 13) {
                    if (kioskMode) {
                        return "Envelopes must be 13 oz or less. To continue, go back and send it as a box instead.";
                    }
                    return "Flats (large envelopes) must be 13 oz or less. Send as a box or a pouch/padded mailer instead.";
                }
            } else {
                if (this.packaging.weightOz > 15.994) {
                    if (kioskMode) {
                        return "International envelopes must be 15.994 oz or less. To continue, go back and send it as a box instead.";
                    }
                    return "International flats (large envelopes) must be 15.994 oz or less. Send as a box instead.";
                }
            }
        }

        if (this.extraServices.perishable && ["FlatRateEnvelope", "FlatRateLegalEnvelope", "FlatRatePaddedEnvelope", "SmallFlatRateBox", "MediumFlatRateBox", "LargeFlatRateBox"].includes(this.packaging.type)) {
            return "Perishable shipments cannot be sent in USPS Flat Rate packaging.";
        }

        if (this.packaging.weightOz <= 0.0 && box.weight !== false) {
            // Must have weight
            return Itemnoun + " weight invalid (must be greater than zero)";
        }

        if (this.packaging.weightOz > 2400 && this.packaging.weightOz != 999999) {
            // Can't be over 150 lbs
            if (kioskMode) {
                return `${Itemnoun} is too heavy and can't be shipped at this kiosk.`;
            }
            if (getSetting("freight_mode", "") == "") {
                return Itemnoun + " weight invalid (must be under 150 lbs)";
            }
        }

        if (kioskMode && this.packaging.weightOz > 1120 && this.packaging.weightOz != 999999) {
            // 70lb limit for kiosks, why are they even doing that
            return `${Itemnoun} is too heavy and can't be shipped at this kiosk.`;
        }

        if (this.packaging.weightOz > 1120 && this.packaging.carrier == "USPS" && this.packaging.weightOz != 999999) {
            // Over 70lbs
            if (kioskMode) {
                return `USPS ${itemnoun}s must be under 70 pounds. Your ${itemnoun} is too heavy.`;
            }
            return `USPS ${itemnoun}s must be 70 pounds or less.`;
        }

        if (this.extraServices.registeredMail && kioskMode) {
            return "Registered Mail must be handed to a clerk at a Post Office.";
        }

        if (this.extraServices.certifiedMail && this.extraServices.registeredMail) {
            // These conflict with each other, UI should prevent this but hey
            return "Cannot select both Certified Mail and Registered Mail";
        }

        if (this.extraServices.certifiedMail && this.packaging.type == "Letter" && getUnsupportedOptions().use_3800_for_letters && this.extraServices.barcode3800 == "") {
            if (kioskMode) {
                return `Attach a USPS Form 3800 (Certified Mail Receipt) barcode to the letter, then go back and scan its barcode when prompted.`;
            }
            return "Attach a USPS Form 3800 (Certified Mail Receipt) barcode to the letter and enter its tracking number on the Options tab under Extra Services.";
        }

        if (this.packaging.type == "Card" && (this.extraServices.certifiedMail || this.extraServices.registeredMail
                || this.extraServices.insurance > 0 || this.extraServices.signature != false)) {
            if (kioskMode) {
                return "Postcards are not eligible for extra services, signature on delivery, or insurance.";
            }
            return "Postcards are not eligible for extra services, signatures, or insurance. Suggestion: enclose it in another packaging type.";
        }

        if (kioskMode && this.extraServices.insurance > 5000) {
            return "The insured value must be $5,000 or less.";
        }

        if (this.extraServices.certifiedMail || this.extraServices.registeredMail) {
            if (this.packaging.carrier != "" && this.packaging.carrier != "USPS") {
                // Only USPS supports these
                return "Certified Mail and Registered Mail are only available when sending with USPS.";
            }
            if (this.specialRateEligibility != false) {
                return "Media Mail and Library Mail can not be combined with Certified Mail or Registered Mail.";
            }
        }

        if (this.extraServices.certifiedMail && this.extraServices.insurance > 0) {
            return "Certified Mail cannot be combined with insurance. Suggested alternative: Signature Tracking with insurance.";
        }

        if (this.extraServices.registeredMail && this.extraServices.insurance > 0) {
            return "Registered Mail cannot be combined with normal insurance; enter the item's value in Registered Mail Declared Value instead.";
        }

//        if (this.extraServices.registeredMail && (this.extraServices.registeredMailAmount == false || this.extraServices.registeredMailAmount === 0)) {
//            return `Must declare the value of Registered Mail ${itemnoun} contents`;
//        }

        if (this.extraServices.returnReceipt || this.extraServices.returnReceiptElectronic) {
            if (this.packaging.carrier != "" && this.packaging.carrier != "USPS") {
                // Only USPS supports return receipts
                return "Return Receipts are only available when sending with USPS, but the packaging selected is not usable with USPS.";
            }
            if (this.extraServices.signature == false
                    && this.extraServices.certifiedMail == false
                    && this.extraServices.registeredMail == false
                    && (this.extraServices.insurance == false || this.extraServices.insurance < 500)) {
                // Can't do a return receipt without a signature
                return "Return Receipts are only available with signature services";
            }
        }

        if (this.extraServices.returnReceiptElectronic && this.extraServices.signature != false
                && this.extraServices.certifiedMail == false && this.extraServices.registeredMail == false) {
            return "Return Receipt Electronic is not available with normal signature delivery. Suggestion: Use Certified Mail.";
        }

        if (this.extraServices.returnReceiptElectronic && this.extraServices.insurance > 500
                && this.extraServices.certifiedMail == false && this.extraServices.registeredMail == false) {
            return "Return Receipt Electronic is not available with insurance over $500.";
        }

        if (this.extraServices.carrier_billing_account.type != "" && this.extraServices.carrier_billing_account.carrier == "") {
            return "You must specify a carrier when using a carrier billing account number.";
        }
        if (this.extraServices.carrier_billing_account.type != "" && this.extraServices.carrier_billing_account.account_number == "") {
            return "You must either specify a carrier billing account number or set the billing type to \"Use Own Account\".";
        }
        if (this.extraServices.carrier_billing_account.type != "" && this.extraServices.carrier_billing_account.postal_code == "") {
            return "You must specify the carrier billing account's postal code.";
        }
        if (this.extraServices.carrier_billing_account.type != "" && this.extraServices.carrier_billing_account.country == "") {
            return "You must specify the carrier billing account's country.";
        }

        if (this.extraServices.dryIce != false && this.extraServices.dryIceWeight <= 0) {
            return "You must specify the weight of the dry ice in ounces.";
        } else if (this.extraServices.dryIce != false && this.extraServices.dryIceWeight > this.packaging.weightOz) {
            return "Dry ice weight cannot exceed total package weight.";
        }

        if (this.extraServices.dryIce == false && this.extraServices.dryIceMedical != false) {
            return "Dry ice option must also be selected when sending medical dry ice.";
        }

        if (this.toAddress.country.toUpperCase() != defaultCountryCode() && this.toAddress.country.toUpperCase() != "" && this.customs.contents == "") {
            if (["Letter", "Flat", "Card"].includes(this.packaging.type) != true) {
                return "International shipments require a customs form.";
            }
        }

        if (this.customs.contents == "" && await isMilitaryCustomsFormRequired(this)) {
            if (kioskMode) {
                return "This package requires a customs form, which is not currently available at this kiosk.";
            }
            return "A customs form is required for this military/diplomatic destination.";
        }

        if (this.customs.contents != "") {
            if (this.toAddress.name == "" && this.toAddress.company == "") {
                return "To address requires a name and/or company.";
            }
            if (this.returnAddress.name == "" && this.returnAddress.company == "") {
                return "From address requires a name and/or company.";
            }
            if (this.customs.contents == "other" && this.customs.contentsExplanation == "") {
                return "Customs contents explanation required when contents are \"Other\"";
            }

            if (this.customs.restriction != "none" && this.customs.restrictionComments == "") {
                return "Customs restriction explanation required when restriction is not \"None\"";
            }

            let customsItems = this.getCustomsItems();
            console.log(customsItems);
            let customsContentsType = this.customs.contents;
            // Remove empty items
            customsItems = customsItems.filter((item) => {
                if (item.description.trim() == ""
                        && item.hscode.trim() == ""
                        && item.lbs.trim() == ""
                        && item.oz.trim() == ""
                        && item.origin.trim() == ""
                        && item.qty.trim() == ""
                        && item.value.trim() == "") {
                    return false;
                }
                return true;
            });

            if (customsItems.length == 0 && this.customs.contents != "documents") {
                return "Customs form must declare at least one item.";
            }

            for (let i = 0; i < customsItems.length; i++) {
                if (customsItems[i].description == "") {
                    return `Description required for all customs items (missing for #${i + 1}).`;
                }
                if (customsItems[i].qty == 0) {
                    return `Quantity required for all customs items (missing for #${i + 1}).`;
                }
                if (customsItems[i].value == 0) {
                    return `Value required for all customs items (missing for #${i + 1}).`;
                }
                if ((isNaN(customsItems[i].lbs) ? 0 : customsItems[i].lbs * 16.0) + (isNaN(customsItems[i].oz) ? 0 : customsItems[i].oz * 1.0) == 0) {
                    return `Weight required for all customs items (missing for #${i + 1}).`;
                }
                if (/^[0-9]{6,}$/.test(customsItems[i].hscode) != true) {
                    return `HS codes are required for all customs items and must be at least 6 digits long (missing for #${i + 1}).`;
                }
                if (/^[A-Za-z]{2}$/.test(customsItems[i].origin) != true) {
                    return `Valid two-letter country of origin required for all customs items (missing for #${i + 1}).`;
                }
            }

            if (this.toAddress.phone == "" || this.returnAddress.phone == "") {
                return "Shipments with a customs form require phone numbers on the to and from addresses.";
            }
        }

        return true;
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

    get tracking() {
        return this.trackingNumber;
    }

    /**
     * @param {String} n - Tracking number
     */
    set tracking(n) {
        this.trackingNumber = n;
    }

    get toAddress() {
        return this._toAddress;
    }

    get returnAddress() {
        return this._returnAddress;
    }

    get originAddress() {
        return this._originAddress;
    }

    set toAddress(addr) {
        if (addr instanceof Address) {
            this._toAddress = addr;
        } else {
            this._toAddress = Address.fromObject(addr);
        }
    }

    set returnAddress(addr) {
        if (addr instanceof Address) {
            this._returnAddress = addr;
        } else {
            this._returnAddress = Address.fromObject(addr);
        }
    }

    set originAddress(addr) {
        if (addr instanceof Address) {
            this._originAddress = addr;
        } else {
            this._originAddress = Address.fromObject(addr);
        }
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

    /**
     * @returns {Address}
     */
    getToAddress() {
        var a = Address.fromObject(this.toAddress);
        if (a.country == "") {
            a.country = defaultCountryCode();
        }
        return a;
    }

    /**
     * @returns {Address}
     */
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
