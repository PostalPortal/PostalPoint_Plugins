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