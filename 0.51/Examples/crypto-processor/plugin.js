// This is a sample PostalPoint plugin that adds a card payment processor.

exports.init = function () {
    global.apis.pos.registerCryptoProcessor({
        name: "Demo Crypto",
        init: async function () {
            // This is run after PostalPoint starts, and before any other crypto functions are called.
        },
        checkout: async function ( {amount}) {
            // Run the checkout process.
            // amount is the amount of USD to collect, in pennies.

            // If an error is encountered during processing,
            //    display an error message in a dialog and return boolean false.
            //    If this function returns anything except false or undefined, and doesn't throw an error,
            //    it is assumed the payment was successful.

            // Adds a line of text visible to the cashier
            global.apis.pos.addOnscreenPaymentLog("Getting crypto payment...");

            // Display a web page (i.e. with a payment QR code) to the customer on the customer-facing display.
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
                            (amount / 100).toFixed(2) * 1,
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
            // Is this plugin properly setup and able to process payments?  If not, return false.
            return true;
        }
    });
}

// Plugin settings to display.
exports.config = [
    {
        type: "password",
        key: "democryproprocessor_apikey",
        defaultVal: "",
        label: "API Key",
        placeholder: "",
        text: "API Key"
    },
    {
        type: "button",
        label: "Test Button",
        text: "Some text about the button",
        onClick: function () {
            global.apis.ui.openSystemWebBrowser("https://postalpoint.app");
        }
    }
];
