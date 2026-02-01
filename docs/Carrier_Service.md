# getCarrierName and getServiceName

This is the source code for `global.apis.shipping.getCarrierName` and `global.apis.shipping.getServiceName`.

## getCarrierName

```javascript
export function getCarrierName(carrier) {
    switch (carrier) {
        case "USPS":
        case "USPSReturns":
        case "usps":
            return "USPS";
        case "UPS":
        case "UPSDAP":
        case "ups":
            return "UPS";
        case "FedExDefault":
        case "FedExSmartPost":
        case "fedex":
            return "FedEx";
        case "DHLExpress":
        case "dhl_express":
            return "DHL Express";
        case "DhlEcs":
            return "DHL eCommerce";
        case "SpeedeeAccount":
            return "Spee-Dee";
        case "globalpost":
            return "GlobalPost";
        case "AccurateAccount":
            return "Accurate Courier Express";
        case "ApcAccount":
            return "APC";
        case "AsendiaUsaAccount":
            return "Asendia";
        case "BetterTrucksAccount":
            return "Better Trucks";
        case "BluestreakAccount":
            return "Blue Streak";
        case "CanadaPostAccount":
        case "CanadaPost":
            return "Canada Post";
        case "GsoAccount":
            return "GLS";
        case "LsoAccount":
            return "LSO";
        case "OntracV3Account":
            return "OnTrac";
        case "USAExportPBA":
            return "Asendia";
        case "FirstChoiceAccount":
            return "1st Choice Delivery";
        case "PurolatorAccount":
            return "Purolator";
        case "CanparAccount":
            return "Canpar";
        case "MaerskAccount":
            return "Maersk";
    }
    if (carrier.endsWith("Account")) {
        // A lot of EasyPost carriers are the carrier name and the word Account
        return carrier.replace("Account", "");
    }
    return carrier;
}
```

## getServiceName

```javascript
export function getServiceName(serviceId, carrierId = "USPS") {
    var carrier = getCarrierName(carrierId);
    switch (serviceId) {
        // Ambiguous
        case "":
            // Used internally if no service ID defined by a plugin or whatever
            return "";
        case "Ground":
            return "Ground";
        case "Express":
            if (carrier == "UPS") {
                return "Worldwide Express";
            } else if (carrier == "USPS") {
                return "Priority Mail Express";
            } else {
                return "Express";
            }
        case "Priority":
            if (carrier == "USPS") {
                return "Priority Mail";
            }
            return "Priority";


            // USPS
        case "First":
        case "usps_first_class_mail":
        case "First-Class Mail":
            return "First-Class Mail";
        case "FirstClassMailInternational":
        case "usps_first_class_mail_international":
        case "First-Class Mail International":
            return "First-Class Mail International";
        case "GroundAdvantage":
        case "usps_ground_advantage":
        case "Ground Advantage":
            return "Ground Advantage";
        case "MediaMail":
        case "usps_media_mail":
        case "Media Mail":
            return "Media Mail";
        case "LibraryMail":
        case "usps_library_mail":
        case "Library Mail":
            return "Library Mail";
        case "usps_priority_mail":
        case "Priority Mail":
            return "Priority Mail";
        case "PriorityMailInternational":
        case "usps_priority_mail_international":
        case "Priority Mail International":
            return "Priority Mail International";
        case "usps_priority_mail_express":
        case "Priority Mail Express":
            return "Priority Mail Express";
        case "ExpressMailInternational":
        case "usps_priority_mail_express_international":
        case "Priority Mail Express International":
            return "Priority Mail Express International";
        case "FirstClassPackageInternationalService":
        case "First-Class Pkg International":
            return "First-Class Pkg International";


            // UPS
        case "UPSWorldwideExpress":
        case "ups_worldwide_express":
            return "Worldwide Express";
        case "ExpressPlus":
        case "UPSExpressPlus":
        case "ups_worldwide_express_plus":
            return "Worldwide Express Plus";
        case "Expedited":
        case "UPSWorldwideExpedited":
        case "ups_worldwide_expedited":
            return "Worldwide Expedited";
        case "UPSWorldwideEconomyDDU":
            return "Worldwide Economy DDU";
        case "NextDayAir":
        case "ups_next_day_air":
            return "Next Day Air";
        case "NextDayAirSaver":
        case "ups_next_day_air_saver":
            return "Next Day Air Saver";
        case "NextDayAirEarlyAM":
        case "ups_next_day_air_early":
            return "Next Day Air A.M.";
        case "2ndDayAir":
        case "ups_2nd_day_air":
            return "2nd Day Air";
        case "2ndDayAirAM":
        case "ups_2nd_day_air_am":
            return "2nd Day Air A.M.";
        case "3DaySelect":
        case "ups_3_day_select":
            return "3-Day Select";
        case "ups_ground":
            return "Ground";
        case "UPSGroundsaverGreaterThan1lb":
            return "Ground Saver";
        case "UPSStandard":
        case "ups_standard":
            return "Standard";
        case "UPSSaver":
        case "ups_worldwide_saver":
            return "Worldwide Saver";


            // FedEx
        case "FEDEX_GROUND":
        case "fedex_ground":
            return "Ground";
        case "FEDEX_2_DAY":
        case "fedex_2day":
            return "2 Day";
        case "FEDEX_2_DAY_AM":
        case "fedex_2day_am":
            return "2 Day AM";
        case "FEDEX_EXPRESS_SAVER":
        case "fedex_express_saver":
            return "Express Saver";
        case "STANDARD_OVERNIGHT":
        case "fedex_standard_overnight":
            return "Standard Overnight";
        case "FIRST_OVERNIGHT":
        case "fedex_first_overnight":
            return "First Overnight";
        case "PRIORITY_OVERNIGHT":
        case "fedex_priority_overnight":
            return "Priority Overnight";
        case "INTERNATIONAL_ECONOMY":
        case "fedex_international_economy":
            return "International Economy";
        case "INTERNATIONAL_FIRST":
        case "fedex_international_first":
            return "International First";
        case "FEDEX_INTERNATIONAL_PRIORITY":
        case "INTERNATIONAL_PRIORITY":
        case "fedex_international_priority":
            return "International Priority";
        case "FEDEX_INTERNATIONAL_PRIORITY_EXPRESS":
        case "INTERNATIONAL_PRIORITY_EXPRESS":
            return "International Priority Express";
        case "FEDEX_INTERNATIONAL_CONNECT_PLUS":
        case "INTERNATIONAL_CONNECT_PLUS":
            return "International Connect Plus";
        case "GROUND_HOME_DELIVERY":
        case "fedex_home_delivery":
            return "Ground Home Delivery";
        case "SMART_POST":
            return "Ground Economy";
        case "FEDEX_FIRST_FREIGHT":
            return "First Overnight Freight";
        case "FEDEX_1_DAY_FREIGHT":
            return "1-Day Freight";
        case "FEDEX_2_DAY_FREIGHT":
            return "2-Day Freight";
        case "FEDEX_3_DAY_FREIGHT":
            return "3-Day Freight";
        case "INTERNATIONAL_PRIORITY_FREIGHT":
            return "International Priority Freight";
        case "INTERNATIONAL_ECONOMY_FREIGHT":
            return "International Economy Freight";


            // USPS Returns
        case "GroundAdvantageReturn":
            return "Ground Advantage Return";
        case "PriorityMailReturn":
            return "Priority Mail Return";
        case "PriorityMailExpressReturn":
            return "Priority Mail Express Return";


            // DHL Express
        case "DomesticEconomySelect":
            return "Domestic Economy Select";
        case "DomesticExpress":
            return "Domestic Express";
        case "DomesticExpress1030":
            return "Domestic Express 10:30";
        case "DomesticExpress1200":
            return "Domestic Express 12:00";
        case "EconomySelect":
            return "Economy Select Document";
        case "EconomySelectNonDoc":
            return "Economy Select Non-Document";
        case "EuroPack":
            return "EuroPack Document";
        case "EuropackNonDoc":
            return "EuroPack Non-Document";
        case "Express1030":
            return "10:30 Document";
        case "Express1030NonDoc":
            return "10:30 Non-Document";
        case "Express1200NonDoc":
            return "12:00 Non-Document";
        case "Express1200":
            return "12:00 Document";
        case "Express900":
            return "9:00 Document";
        case "Express900NonDoc":
            return "9:00 Non-Doc";
        case "ExpressEasy":
            return "Easy Document";
        case "ExpressEasyNonDoc":
            return "Easy Non-Document";
        case "ExpressEnvelope":
            return "Envelope";
        case "ExpressWorldwide":
        case "dhl_express_worldwide":
            return "Worldwide Document";
        case "ExpressWorldwideB2C":
            return "Worldwide B2C";
        case "ExpressWorldwideB2CNonDoc":
            return "Worldwide B2C Non-Document";
        case "ExpressWorldwideECX":
            return "Worldwide ECX";
        case "ExpressWorldwideNonDoc":
            return "Worldwide Non-Document";


            // DHL eCommerce
        case "DHLParcelExpedited":
            return "Parcel Expedited";
        case "DHLParcelExpeditedMax":
            return "Parcel Expedited Max";
        case "DHLParcelGround":
            return "Parcel Ground";
        case "DHLBPMExpedited":
            return "PM Expedited";
        case "DHLBPMGround":
            return "PM Ground";
        case "DHLParcelInternationalDirect":
            return "Parcel International Direct";
        case "DHLParcelInternationalStandard":
            return "Parcel International Standard";
        case "DHLParcelInternationalDirectSMB":
            return "Parcel International Direct";
        case "DHLParcelInternationalStandardSMB":
            return "Parcel International Standard";
        case "DHLPacketInternational":
            return "Packet International";
        case "DHLParcelInternationalDirectPriority":
            return "Parcel International Direct Priority";
        case "DHLParcelInternationalDirectStandard":
            return "Parcel International Direct Standard";

            // Asendia USA Export
        case "USAExportStandard":
            return "USA Export Standard";
        case "USAExportPlus":
            return "USA Export Plus";
        case "USAExportSelect":
            return "USA Export Select";

            // Spee-Dee
        case "SpeeDeeDelivery":
            return "Delivery";

            // GlobalPost
        case "globalpost_standard_international":
            return "Standard International";
        case "globalpost_economy_international":
            return "Economy International";
        case "globalpost_plus":
            return "Plus";
        case "globalpost_first_class_international":
            return "First-Class International";

            // Canada Post
        case "RegularParcel":
            return "Regular Parcel";
        case "ExpeditedParcel":
            return "Expedited Parcel";
        case "Xpresspost":
            return "Xpresspost";
        case "ExpeditedParcelUSA":
            return "Expedited Parcel USA";
        case "SmallPacketUSAAir":
            return "Small Packet USA Air";
        case "TrackedPacketUSA":
            return "Tracked Packet USA";
        case "TrackedPacketUSALVM":
            return "Tracked Packet USA LVM";
        case "XpresspostUSA":
            return "Xpresspost USA";
        case "XpresspostInternational":
            return "Xpresspost Int'l";
        case "InternationalParcelAir":
            return "Int'l Parcel Air";
        case "InternationalParcelSurface":
            return "Int'l Parcel Surface";
        case "SmallPacketInternationalAir":
            return "Small Packet Int'l Air";
        case "SmallPacketInternationalSurface":
            return "Small Packet Int'l Surface";
        case "TrackedPacketInternational":
            return "Tracked Packet Int'l";
        case "ExpeditedParcelPlus":
            return "Expedited Parcel Plus";


            // GLS US
        case "EarlyPriorityOvernight":
            return "Early Priority Overnight";
        case "PriorityOvernight":
            return "Priority Overnight";
        case "CaliforniaParcelService":
            return "California Parcel";
        case "SaturdayDeliveryService":
            return "Saturday Delivery";
        case "EarlySaturdayService":
            return "Early Saturday";
        case "NoonPriorityService":
            return "Noon Priority";

            // OnTrac
        case "GRND":
            return "Ground";

            // LSO
        case "PriorityEarly":
            return "Priority Early";
        case "PriorityBasic":
            return "Priority Basic";
        case "Priority2ndDay":
            return "Priority 2nd Day";
        case "GroundEarly":
            return "Ground Early";
        case "GroundBasic":
            return "Ground Basic";
        case "ECommerce":
            return "ECommerce";

            // Canpar
        case "USA":
            return "USA";
        case "SelectLetter":
            return "Select Letter";
        case "SelectPak":
            return "Select Pak";
        case "Select":
            return "Select";
        case "OvernightLetter":
            return "Overnight Letter";
        case "Overnight":
            return "Overnight";
        case "USALetter":
            return "USA Letter";
        case "USAPak":
            return "USA Pak";
        case "SelectUSA":
            return "Select USA";
        case "International":
            return "International";

            // Purolator
        case "PurolatorExpress":
            return "Express";
        case "PurolatorExpress12PM":
            return "Express 12PM";
        case "PurolatorExpressPack12PM":
            return "Express Pack 12PM";
        case "PurolatorExpressBox12PM":
            return "Express Box 12PM";
        case "PurolatorExpressEnvelope12PM":
            return "Express Envelope 12PM";
        case "PurolatorExpress1030AM":
            return "Express 10:30AM";
        case "PurolatorExpress9AM":
            return "Express 9AM";
        case "PurolatorExpressBox":
            return "Express Box";
        case "PurolatorExpressBox1030AM":
            return "Express Box 10:30AM";
        case "PurolatorExpressBox9AM":
            return "Express Box 9AM";
        case "PurolatorExpressBoxEvening":
            return "Express Box Evening";
        case "PurolatorExpressBoxInternational":
            return "Express Box International";
        case "PurolatorExpressBoxUS":
            return "Express Box US";
        case "PurolatorExpressEnvelope":
            return "Express Envelope";
        case "PurolatorExpressEnvelope1030AM":
            return "Express Envelope 10:30AM";
        case "PurolatorExpressEnvelope9AM":
            return "Express Envelope 9AM";
        case "PurolatorExpressEnvelopeEvening":
            return "Express Envelope Evening";
        case "PurolatorExpressEnvelopeInternational":
            return "Express Envelope International";
        case "PurolatorExpressEnvelopeUS":
            return "Express Envelope US";
        case "PurolatorExpressEvening":
            return "Express Evening";
        case "PurolatorExpressInternational":
            return "Express International";
        case "PurolatorExpressInternational1030AM":
            return "Express International 10:30AM";
        case "PurolatorExpressInternational1200":
            return "Express International 12:00";
        case "PurolatorExpressInternational9AM":
            return "Express International 9AM";
        case "PurolatorExpressBoxInternational1030AM":
            return "Express Box International 10:30AM";
        case "PurolatorExpressBoxInternational1200":
            return "Express Box International 12:00";
        case "PurolatorExpressBoxInternational9AM":
            return "Express Box International 9AM";
        case "PurolatorExpressEnvelopeInternational1030AM":
            return "Express Envelope International 10:30AM";
        case "PurolatorExpressEnvelopeInternational1200":
            return "Express Envelope International 12:00";
        case "PurolatorExpressEnvelopeInternational9AM":
            return "Express Envelope International 9AM";
        case "PurolatorExpressPackInternational1030AM":
            return "Express Pack International 10:30AM";
        case "PurolatorExpressPackInternational1200":
            return "Express Pack International 12:00";
        case "PurolatorExpressPackInternational9AM":
            return "Express Pack International 9AM";
        case "PurolatorExpressPack":
            return "Express Pack";
        case "PurolatorExpressPack1030AM":
            return "Express Pack 10:30AM";
        case "PurolatorExpressPack9AM":
            return "Express Pack 9AM";
        case "PurolatorExpressPackEvening":
            return "Express Pack Evening";
        case "PurolatorExpressPackInternational":
            return "Express Pack International";
        case "PurolatorExpressPackUS":
            return "Express Pack US";
        case "PurolatorExpressUS":
            return "Express US";
        case "PurolatorExpressUS1030AM":
            return "Express US 10:30AM";
        case "PurolatorExpressUS1200":
            return "Express US 12:00";
        case "PurolatorExpressUS9AM":
            return "Express US 9AM";
        case "PurolatorExpressBoxUS1030AM":
            return "Express Box US 10:30AM";
        case "PurolatorExpressBoxUS1200":
            return "Express Box US 12:00";
        case "PurolatorExpressBoxUS9AM":
            return "Express Box US 9AM";
        case "PurolatorExpressEnvelopeUS1030AM":
            return "Express Envelope US 10:30AM";
        case "PurolatorExpressEnvelopeUS1200":
            return "Express Envelope US 12:00";
        case "PurolatorExpressEnvelopeUS9AM":
            return "Express Envelope US 9AM";
        case "PurolatorExpressPackUS1030AM":
            return "Express Pack US 10:30AM";
        case "PurolatorExpressPackUS1200":
            return "Express Pack US 12:00";
        case "PurolatorExpressPackUS9AM":
            return "Express Pack US 9AM";
        case "PurolatorGround":
            return "Ground";
        case "PurolatorGround1030AM":
            return "Ground 10:30AM";
        case "PurolatorGround9AM":
            return "Ground 9AM";
        case "PurolatorGround12PM":
            return "Ground 12PM";
        case "PurolatorGroundDistribution":
            return "Ground Distribution";
        case "PurolatorGroundEvening":
            return "Ground Evening";
        case "PurolatorGroundUS":
            return "Ground US";
        case "PurolatorQuickShip":
            return "QuickShip";
        case "PurolatorQuickShipEnvelope":
            return "QuickShip Envelope";
        case "PurolatorQuickShipPack":
            return "QuickShip Pack";
        case "PurolatorQuickShipBox":
            return "QuickShip Box";


            // Maersk Parcel
        case "Maersk-3-Day":
            return "3 Day";

    }

    console.warn("Unknown shipping service ID: ", serviceId, "Carrier ID:", carrierId);

    // Snipped: code that attempts to format the service ID nicely based on common naming patterns found in the wild.

    return serviceName;
}
```
