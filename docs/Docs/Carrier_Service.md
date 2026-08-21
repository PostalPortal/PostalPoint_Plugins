# getCarrierName and getServiceName

For a list of usable carrier and service IDs, visit these links (warning: raw JSON data).

List of carriers: https://cat.postalportal.net/api/datafile/?file=shipping_carriers

List of services: https://cat.postalportal.net/api/datafile/?file=shipping_services

Any ID or name defined in those files (or by a plugin) and passed to `global.apis.shipping.getCarrierName` or `global.apis.shipping.getServiceName` will resolve to the carrier/service name defined in the JSON files above.
