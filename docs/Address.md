# Address object

```javascript
export default class Address {
    constructor(uuid = "", name = "", company = "", street1 = "", street2 = "", zip = "", city = "", state = "", country = "", phone = "", email = "", taxid = "") {
        this.uuid = uuid;
        this.name = name;
        this.company = company;
        this.street1 = street1;
        this.street2 = street2;
        this.zip = zip;
        this.city = city;
        this.state = state;
        this.country = country;
        this.phone = phone;
        this.email = email;
        this.taxid = taxid;
        this.residential = null;
    }

    static fromObject(address) {
        if (address instanceof Address) {
            return address;
        }
        var a = new Address(address.uuid ?? "", address.name, address.company, address.street1,
                address.street2, address.zip, address.city, address.state, address.country,
                address.phone, address.email, address.taxid);
        return a;
    }

    toStringArray(expandCountry = false) {
        var citystatezipLine = [this.city, this.state, this.zip].filter(Boolean);
        var country = this.country == defaultCountryCode() ? "" : this.country;
        if (expandCountry && country != "") {
            country = getCountryNameForISO(country);
        }
        return [this.name, this.company, this.street1, this.street2, `${citystatezipLine.join(" ")}`, country, (this.taxid ? "Tax ID " + this.taxid : "")].filter(Boolean);
    }

    /**
     * Test if the address provided is the same as this address.
     */
    equals(address, checkUUID = false) {
        if (
                (checkUUID ? this.uuid == address.uuid : true)
                && this.name == address.name
                && this.company == address.company
                && this.street1 == address.street1
                && this.street2 == address.street2
                && this.city == address.city
                && this.state == address.state
                && this.zip == address.zip
                && this.country == address.country
                && this.taxid == address.taxid) {
            return true;
        }
        return false;
    }

    /**
     * Test if an address is the same delivery point as this address.
     */
    dpEquals(address) {
        if (
                this.street1 == address.street1
                && this.street2 == address.street2
                && this.city == address.city
                && this.state == address.state
                && this.zip == address.zip
                && this.country == address.country) {
            return true;
        }
        return false;
    }
}
```
