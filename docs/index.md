# Overview

PostalPoint® supports JavaScript plugin extensions. Plugins can hook into PostalPoint to add features and integrations.

## What plugins can do

* Process card payments and handle saved payment methods
* Process cryptocurrency payments
* Add additional carriers, providing shipping rates and labels
* Print to label and receipt printers, letting PostalPoint handle hardware support and drivers
* Extend support for prepaid label acceptance, prepaid barcode recognition, and carrier dropoff QR codes
* Install pages in the Tools menu, creating new interfaces and features
* Receive transaction receipts for ingestion into third-party accounting or business software
* Display interactive HTML5 content on the customer-facing screen
* Run both Node.JS and browser code.

## Plugin Package Structure

A plugin is distributed as a simple ZIP file, containing a folder. The folder then has at least one file, named `plugin.js`.
The `exports.init` function in `plugin.js` is executed when PostalPoint launches, allowing the plugin
to request involvement with various events in PostalPoint.

PostalPoint installs plugin packages by unzipping their contents into a plugins folder.
Plugins are uninstalled by deleting their folder.

## PostalPoint Plugin API

The PostalPoint plugin API is a globally-available object named `global.apis`.
It contains many useful functions for integrating with PostalPoint.
All the APIs listed under the Plugin API section must be prefixed with `global.apis.` in order to work.

## Minimal Plugin Code

```javascript title="plugin-name/plugin.js"
exports.init = function () {
    global.apis.alert("This message appears when PostalPoint launches.", "Hello!");
};
```

Yes, the smallest plugin really is just two lines of code, and accessing PostalPoint features
really is that easy.

## Plugin Metadata File

While not strictly required, a `package.json` is encouraged, and allows specifying the plugin's
display name, PostalPoint version compatibility, and other metadata.

Sample:

```json
{
    "name": "plugin-id-here",
    "main": "plugin.js",
    "description": "Human-readable description of the plugin",
    "version": "1.0.0",
    "author": "Your Name",
    "license": "Code license name",
    "postalpoint": {
        "pluginname": "Display Name for Plugin",
        "minVersion": "000034",
        "maxVersion": "001000"
    }
}

```

PostalPoint version codes are MMMnnn where MMM is the major version and nnn is the minor version, zero-padded.
So version 0.35 is "000035", and 1.23 is "001023".
