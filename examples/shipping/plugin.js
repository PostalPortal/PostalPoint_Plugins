// This is a sample PostalPoint plugin for adding support for a shipping carrier.

var rateCache = [];
var parcelCache = {};

exports.init = function () {
    global.apis.shipping.registerRateEndpoint(getRates, purchase, "uniqueprefixhere_");
    global.apis.barcode.onPrepaidScan(function (barcode) {
        if (barcode.startsWith("mycarrierbarcode")) { // Replace this with your checks for barcode validity
            var data = new global.apis.barcode.TrackingBarcode(barcode);
            data.carrier = "Carrier Name";
            data.service = "Service Name";
            return data;
        }
        return false;
    });



    /*
     * Plugins can override PostalPoint's built-in shipment markup calculation.
     * Only one plugin on an instance of PostalPoint can register, on a first-come basis.
     * This function throws an Error if another plugin has already registered.
     */
    /**
     * Add your code for calculating shipping markup.
     * @param {number} cost Cost to shipper
     * @param {number} retail Carrier-suggested retail price
     * @param {number} suggested PostalPoint-suggested retail (default margin calc)
     * @param {string} carrier Shipping carrier name
     * @param {string} service Shipping service code
     * @param {number|null} weightOz The weight of the shipment in ounces, or null if not available.
     * @param {string} packaging An empty string if not available, or "Letter", "FlatRateEnvelope", etc. See https://docs.easypost.com/docs/parcels#predefined-packages
     * @returns {Boolean|number} false if opting out of setting markup, otherwise the retail price
     */
    global.apis.shipping.registerMarkupCalculator(
            function (cost, retail, suggested, carrier, service, weightOz, packaging) {
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
}

async function purchase(rateid) {
    for (var i = 0; i < rateCache.length; i++) {
        if (rateCache[i].rateid == rateid) {
            var rate = rateCache[i];
            //
            // Fetch label and tracking and such
            //
            var label;
            var tracking = "123456";
            var toAddressLines = parcelCache.toAddress.toStringArray();

            // Create receipt item
            var receiptitem = new global.apis.pos.ReceiptItem(`uniqueprefixhere_${tracking}`,
                    `${rate.carrierName} ${rate.serviceName}`,
                    `Tracking # ${global.apis.util.string.chunk(tracking, 3).join(" ")}\nTo:\n${toAddressLines.join("\n")}`,
                    rate.retail_rate, 1, rate.cost_rate, 0
                    );
            receiptitem.barcode = tracking;
            receiptitem.carrier = "Carrier Name";
            receiptitem.service = "Service Name";

            return {
                label: label,
                labeltype: "PNG",
                receiptItem: receiptitem,
                tracking: tracking,
                cost: rate.cost_rate,
                price: rate.retail_rate,
                carrier: rate.carrierName,
                service: rate.serviceName,
                delivery_days: rate.delivery_days,
                delivery_date: rate.delivery_date,
                to: toAddressLines
            };
        }
    }
}

async function getRates(parcel) {
    // parcel is an object as shown in docs/Parcel.md
    var rates = [];
    rates.push({
        rateid: "uniqueprefixhere_" + global.apis.util.uuid.v4(),
        carrier: "Carrier",
        carrierName: "Carrier Name",
        service: "CARRIER_SERVICE_ID",
        cost_rate: 10,
        retail_rate: 15,
        delivery_days: 3,
        delivery_date: null,
        guaranteed: true,
        serviceName: "Service Name",
        color: "green" // Rate card color
    });

    // Save details for later use if purchased
    rateCache = rates;
    parcelCache = parcel;

    return rates;
}