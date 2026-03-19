# Configuration Flags

In the Advanced settings of PostalPoint, there is a tool to manually get and set settings by ID.

Most PostalPoint settings are available in the Settings screen, and their IDs can be found in the JSON file created by running a database backup.

However, there are some special "hidden" setting options that can override default behavior.

Warning: PostalPoint is tested with these settings at their default values (usually, unset). There is a small chance of bugs being created by changing a value.

* `approved_shipper_receipt_disclaimer`: Set non-empty to add a disclaimer on printed receipts: "Note: A non-postal surcharge was added to x items"
* `disable_hid_feedback`: Set non-empty to skip sending scan feedback commands (error beep, etc) to the USB HID POS barcode scanner.
* `disable_keyboard_shortcuts`: Set non-empty to disable the Function key row keyboard navigation shortcuts.
* `disablesettingsbackup`: Set non-empty to skip backing up settings with the database.
* `dymo_twin_roll_selection`: Set label roll selection when using a Dymo twin label printer: 0=auto, 1=left, 2=right, default is 1.
* `easypost_allow_wallet_billing`: Set truthy to allow EasyPost wallet accounts with TOS that restricts resale.
* `mailboxslipoverride`: Change the print size of a mailbox package slip, which is normally 4x6, but defaults to 4x3 when using a QL label printer and DK2243 labels.  Set to "4x6" or "4x3" to force a size.
* `mute_sounds`: Set non-empty to disable sound effects.
* `postalpoint_lan_server_port`: Override the port used for the internal web server. This must match on all installations that need to communicate.
* `postalpoint_lan_server_bind_address`: Override the IP address to bind the internal web server to. Default is "0.0.0.0".
