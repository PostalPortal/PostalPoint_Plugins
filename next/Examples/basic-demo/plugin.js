// Sample plugin to demonstrate plugin capabilities and structure.

async function getPage() {
    // A Framework7 component page
    return global.apis.getPluginFolder("basic-demo") + "/uipluginpage.f7";
}

// This is run when PostalPoint loads the plugin at launch.
// Use it to register for things you want to do, like adding a page, hooking into payments or shipping rates, etc.
exports.init = function () {
    console.log(global.apis.settings.get("basic-demo_secretcode"));
    global.apis.ui.addToolsPage(getPage, "Sample Page Title", "sampletool1234", "A sample plugin page", "Sample", "fa-solid fa-circle");
};

// This defines a settings UI to display for the plugin.
// If exports.config is a function instead of an array, it will be executed when opening the settings
// and must return an array like the one below.
// If exports.config is undefined, a settings menu will not be provided to the user.
exports.config = [
    {
        type: "block", // Show a block of text.
        text: "Some text <b>or html</b>"
    },
    {
        type: "button",
        label: "Test Button",
        text: "Some text about the button",
        onClick: function () {
            global.apis.alert("Button pressed");
        }
    },
    {
        type: "text",
        key: "app.postalpoint.basic-demo_somestring", // Try to make sure this is unique by using a prefix,
        // settings storage is global so there could be conflicts if you aren't careful
        defaultVal: "",
        label: "Type a string",
        placeholder: "",
        text: "Description text next to the input box",
        sync: false // Add sync: false to prevent automatically syncing this setting between
                    // PostalPoint installations (i.e. it's a device-specific setting, like a pairing code)
                    // If it's not present, or is any truthy value, it could be synced between PCs
    },
    {
        type: "password",
        key: "app.postalpoint.basic-demo_secretcode",
        defaultVal: "",
        label: "Secret Code",
        placeholder: "",
        text: "Don't tell anyone this secret code:"
    },
    {
        type: "textarea",
        key: "app.postalpoint.basic-demo_sometext",
        defaultVal: "",
        label: "Text Box",
        placeholder: "...",
        text: "You can type a few lines of text here."
    },
    {
        type: "select",
        key: "app.postalpoint.basic-demo_dropdownbox",
        defaultVal: "",
        label: "Choose an option",
        placeholder: "",
        text: "",
        options: [["key1", "Value 1"], ["key2", "Value 2"]]
    },
    {
        type: "checkbox",
        key: "app.postalpoint.basic-demo_checkbox1",
        label: "Toggle Switch/Checkbox",
        value: "1", // The value to store under key when checkbox is checked.
        // Checkbox will be checked on render if the value stored `== true`, or is "true", "1", or "on".
        // If the checkbox is unchecked, the value stored on settings save will be "".
        text: "Some text about the switch, which will be checked if the key is truthy."
    },
    {
        type: "card", // A setting card will be shown in the main part of PostalPoint's settings, not in the plugin settings.
                      // Normally, this means it will be shown in an interface similar to the Home screen tabs.
                      // Inputs/elements in a card are displayed in a single column.
        cardType: "dropoff", // One of the following:
                             // "carrier" (for a shipping carrier),
                             // "postage" (for a main postage provider),
                             // "creditcard" (card payment processor),
                             // "cryptocurrency" (crypto payment processor),
                             // "insurance" (shipping insurance provider),
                             // "dropoff" (QR code returns service provider)
        title: "Section Card Title", // Card or tab title.
        icon: "fa-solid fa-square", // Icon. Optional, may not be shown.
        fields: [
            // The fields to display in the card, ordered from top to bottom.
            {
                type: "button",
                label: "Card Test Button",
                text: "Some text about the button",
                onClick: function () {
                    global.apis.alert("Button pressed");
                }
            },
            {
                type: "text",
                key: "app.postalpoint.basic-demo_somestring", // Try to make sure this is unique by using a prefix,
                // settings storage is global so there could be conflicts if you aren't careful
                defaultVal: "",
                label: "Type a string",
                placeholder: "",
                text: "Description text next to the input box",
                sync: false // Add sync: false to prevent automatically syncing this setting between
                            // PostalPoint installations (i.e. it's a device-specific setting, like a pairing code)
                            // If it's not present, or is any truthy value, it could be synced between PCs
            }
        ]
    },
];
