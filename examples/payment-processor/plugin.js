// This is a sample PostalPoint plugin that adds a card payment processor.

exports.init = function () {
    global.apis.pos.registerCardProcessor({
        name: "Demo Card Processor",
        init: async function () {
            // This function runs once after starting PostalPoint
            // and before any other card processor functions are called.
        },
        checkout: async function({amount, capture = true}) {
            // amount is an integer number of pennies.

            // If an error is encountered during processing,
            //    display an error message in a dialog and return boolean false.
            //    If this function returns anything except false or undefined, and doesn't throw an error,
            //    it is assumed the payment was successful.
            try {
                if (capture) {
                    // authorize, capture, add a ReceiptPayment to the receipt, and return boolean true.
                    global.apis.pos.addOnscreenPaymentLog("Getting card payment..."); // Add a line to the onscreen card processing status log
                    await global.apis.util.delay(1000); // Replace this with something useful!
                    global.apis.pos.addReceiptPayment(
                        new global.apis.pos.ReceiptPayment(
                            (amount / 100).toFixed(2) * 1,
                            "card", // Payment type. Accepted values are card, ach, crypto, cash, check, account, and free.  Other types will be displayed as-is to the user and on the receipt.
                            "Demo Card\nCardholder Name, etc\nMore info for receipt" // Additional text for receipt
                        )
                    );
                    global.apis.pos.addOnscreenPaymentLog("Payment successful!");
                    return true;
                } else {
                    // only authorize the payment, don't actually capture/charge the payment method,
                    // and return whatever transaction data that will be passed to finishPayment to capture the payment.
                    await global.apis.util.delay(1000); // Replace this with something useful!
                    return {amount: amount};
                }
            } catch (ex) {
                global.apis.pos.addOnscreenPaymentLog(`Error: ${ex.message} [okay to put extra details here for troubleshooting or tech support, it's visible to the cashier]`);
                if (global.apis.kiosk.isKiosk()) {
                    // This message will be shown to an end-user/customer, not a cashier/employee
                    global.apis.alert("Your card was declined.", "Card Error");
                } else {
                    global.apis.alert("The customer's card was declined.", "Card Error");
                }
                return false;
            }
        },
        cancelCheckout: function () {
            // The user requested to cancel the payment.
            // Reset the terminal to its resting state, clear its screen, etc.
        },
        finishPayment: async function ({checkoutResponse}) {
            // Finish a payment that was authorized but not captured because checkout was called with capture = false
            // If payment was already captured and added to the receipt for some reason, just return true.
            await global.apis.util.delay(1000); // Replace this with something useful!
            global.apis.pos.addReceiptPayment(
                new global.apis.pos.ReceiptPayment(
                    (checkoutResponse.amount / 100).toFixed(2) * 1,
                    "card", // Payment type.
                    "Demo Card\nCardholder Name, etc\nMore info for receipt" // Additional text for receipt
                )
            );
            return true;
        },
        updateCartDisplay: function (receipt) {
            // Show transaction data on the card reader display.
            // This function will be called when the cart or total changes.
            console.log(receipt);
            // Sample structure of the receipt variable:
            receipt = {
                "items": [
                    {
                        "id": "testitem",
                        "label": "Test Item",
                        "text": "",
                        "priceEach": 2,
                        "qty": 1,
                        "cost": 0,
                        "retail": 2,
                        "taxRate": 0.1,
                        "free": false,
                        "barcode": "",
                        "certifiedInfo": false,
                        "isMerch": true,
                        "surcharge": false
                    },
                    {
                        "id": "9100123456789012345678",
                        "label": "Test Package",
                        "text": "Package Details\nTracking # 9100 1234 5678 9012 3456 78\nTo:\nTEST PERSON\nORGANIZATION INC\n123 TEST ROAD\nTESTTOWN TE 99999-0001",
                        "priceEach": 8,
                        "qty": 1,
                        "cost": 0,
                        "retail": 8,
                        "taxRate": 0,
                        "free": false,
                        "barcode": "9100123456789012345678",
                        "certifiedInfo": false,
                        "isMerch": false,
                        "surcharge": false,
                        "toAddress": {
                            "name": "TEST PERSON",
                            "company": "ORGANIZATION INC",
                            "street1": "123 TEST ROAD",
                            "street2": null,
                            "city": "TESTTOWN",
                            "state": "TE",
                            "zip": "99999-0001",
                            "email": null,
                            "phone": null,
                            "country": "US"
                        },
                        "fromAddress": {
                            "name": "TEST PERSON",
                            "company": "ORGANIZATION INC",
                            "street1": "123 TEST ROAD",
                            "street2": null,
                            "city": "TESTTOWN",
                            "state": "TE",
                            "zip": "99999-0001",
                            "email": null,
                            "phone": null,
                            "country": "US"
                        }
                    }
                ],
                "payments": [
                    {
                        "amount": 10,
                        "amountFormatted": "$10.00",
                        "type": "cash",
                        "label": "Cash",
                        "text": "",
                        "texthtml": "",
                        "id": "12345678_cash_10"
                    },
                    {
                        "amount": 12.34,
                        "amountFormatted": "$12.34",
                        "type": "card",
                        "label": "Card",
                        "text": "Card Details here\n1234abcd",
                        "texthtml": "Card Details here<br />1234abcd",
                        "id": "87654321_card_12.34"
                    }
                ],
                "subtotal": 10,
                "subtotalFormatted": "$10.00",
                "tax": 0.2,
                "taxFormatted": "$0.20",
                "grandTotal": 10.2,
                "grandTotalFormatted": "$10.20",
                "paid": 22.34,
                "paidFormatted": "$22.34",
                "due": -12.14, // If negative, is the amount of change owed to the customer instead
                "dueFormatted": "$12.14"
            }
        },
        checkoutSavedMethod: async function ({customerID, paymentMethodID, amount}) {
            // Same as checkout() except using a payment method already on file.
            // customerID and paymentMethodID are provided by getSavedPaymentMethods below.
            await global.apis.util.delay(1000); // Replace this with something useful!
            var error = false;
            if (error) {
                // If you can't charge the payment method, throw an Error with a string to display to the user.
                throw new Error("The saved card didn't work.");
            }
            global.apis.pos.addReceiptPayment(
                new global.apis.pos.ReceiptPayment(
                    (amount / 100).toFixed(2) * 1,
                    "card", // Payment type.
                    "Card on File\nx1234" // Additional text for receipt
                )
            );
            // Must return true upon success.
            // If the payment is not successful, and you didn't throw an Error to show the user,
            // then `return false` instead and it'll appear that the user's action to start the payment did nothing.
            return true;
        },
        saveCardForOfflineUse: async function ({statusCallback, customerUUID, name, company, street1, street2, city, state, zip, country, email, phone}) {
            // Use the card reader to capture an in-person card and save it for offline use.
            // Provided details are the customer's info, which might be empty strings except for the customerUUID.
            // Saved card details must be tied to the customerUUID, as that's how saved cards are looked up.

            // statusCallback(string, boolean) updates the progress message on the cashier's screen.
            // If the boolean is true, the progress message is replaced with a confirmation message.
            statusCallback("Insert the card into the reader.", false);

            await global.apis.util.delay(1000); // Wait for the customer to insert their card,
            //then save it for later offline billing

            statusCallback("Saving card details...", false);

            await global.apis.util.delay(1000);

            statusCallback("Card saved!", true);

            return true; // Card saved to customer
            // If an error occurred, you can throw it and the error message will be displayed to the cashier.
            // Alternatively, return boolean false and display the error yourself with global.apis.alert(message, title) or something.
        },
        cancelSaveCardForOfflineUse: function () {
            // Cancel the process running in saveCardForOfflineUse() at the user/cashier's request.
        },
        getSavedPaymentMethods: async function ({customerUUID}) {
            // Return all saved payment methods tied to the provided customer UUID.
            var methods = [];
            methods.push({
                customer: "<internal string referencing the customer>", // Passed to checkoutSavedMethod as customerID
                customer_uuid: customerUUID,
                id: "<card/payment method identifier>", // Passed to checkoutSavedMethod as paymentMethodID
                type: "card", // Payment type. Accepted values are card, ach, crypto, cash, check, account, and free.
                label: "Visa debit x1234 (exp. 12/29)", // Label for payment method
                label_short: "Visa debit x1234" // Abbreviated label for payment method
            });
            return methods;
        },
        deleteSavedPaymentMethod: async function ({customerUUID, customerID, paymentMethodID}) {
            // Delete the payment method identified by paymentMethodID and tied to the PostalPoint customerUUID and the card processor customerID.
            // If unable to delete, throw an error and the error message will be displayed to the cashier.
            await global.apis.util.delay(1000);
        }
    });
}

// Plugin settings to display.
exports.config = [
    {
        type: "password",
        key: "democardprocessor_apikey",
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
