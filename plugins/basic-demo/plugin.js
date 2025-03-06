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
        text: "Description text next to the input box"
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
    }
];
