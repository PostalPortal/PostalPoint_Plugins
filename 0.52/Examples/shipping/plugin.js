// This is a sample PostalPoint plugin for adding support for a shipping carrier.

var rateCache = [];
var parcelCache = {};

exports.init = function () {
    // Add support for shipping rating and label purchasing
    global.apis.shipping.registerRateEndpoint(getRates, purchase, "uniqueprefixhere", {
            name: "Sample Carrier",
            getRecentLabels: getRecentLabels,
            voidLabel: voidLabel
        }
    );
    
    // Add support for prepaid drop-offs
    global.apis.barcode.onPrepaidScan(function (barcode) {
        if (barcode.startsWith("mycarrierbarcode")) { // Replace this with your checks for barcode validity
            var data = new global.apis.barcode.TrackingBarcode(barcode);
            data.carrier = "Carrier Name";
            data.service = "Service Name";
            return data;
        }
        return false;
    });
    
    // Add a menu to the carrier pickup tool,
    // where the user can set the date of the next package pickup from this carrier
    global.apis.shipping.registerCarrierPickupMenu("uniqueidhere", "Sample Carrier");
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

            // Create receipt item
            var receiptitem = new global.apis.pos.ReceiptItem(`uniqueprefixhere_${tracking}`,
                    `${rate.carrierName} ${rate.serviceName}`,
                    `Tracking # ${global.apis.util.string.chunk(tracking, 3).join(" ")}\nTo:\n${toAddressLines.join("\n")}`,
                    rate.retail_rate, 1, rate.cost_rate, 0
                    );
            receiptitem.barcode = tracking;
            receiptitem.carrier = "Carrier Name";
            receiptitem.service = "Service Name";
            receiptitem.merch = false;
            receiptitem.free = false;
            receiptitem.toAddress = parcelCache.toAddress;
            receiptitem.fromAddress = parcelCache.returnAddress;

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
                to_address: parcelCache.toAddress,
                from_address: parcelCache.returnAddress,
                plugin_sourceid: "uniqueidhere",
                metadata: {}
            };
        }
    }
}

async function getRates(parcel) {
    // parcel is an object as shown in docs/Parcel.md
    var rates = [];
    
    // A Date object to use for the shipping date, for delivery date estimates
    var shipDate = await global.apis.shipping.getLabelDate("uniqueidhere");
    
    rates.push({
        rateid: "uniqueprefixhere" + global.apis.util.uuid.v4(),
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

/**
 * Get a list of labels to display to the user for reprinting and/or voiding.
 */
async function getRecentLabels() {
    var list = [];
    
    list.push({
        id: `uniqueprefixhere${labelid}`, // Unique ID, passed to voidLabel. Must have the same prefix as provided to registerRateEndpoint so PostalPoint can route the void action to your plugin.
        refund_status: false, // false if not refunded/voided and a void button should be shown, otherwise a string status to display
        tracking: "123456",
        label_urls: ["https://.../label.png", "data:image/png;base64,..."], // Array of 4x6 inch labels to print if user requests reprinting
        to: toAddress, // A global.apis.shipping.Address object
        from: returnAddress, // A global.apis.shipping.Address object
        carrier: global.apis.shipping.getCarrierName("carrier name"),
        service: global.apis.shipping.getServiceName("service name", "carrier name")
    });
    
    return list;
}

async function voidLabel(id) {
    id = id.replace("uniqueprefixhere", ""); // Remove plugin ID prefix
    
    // Do refund/void here
    
    return "Action status message"; // Message shown to user in a dialog box
}
