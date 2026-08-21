# Address object

The Address object is used to represent shipping addresses as well as customer accounts.

```javascript
export default class Address {
    constructor(uuid = "", name = "", company = "", street1 = "", street2 = "", zip = "", city = "", state = "", country = "", phone = "", email = "", taxid = "") {
        this.uuid = uuid;
        if (uuid == "" || uuid == null) {
            uuid = uuidv4();
        }

        this.metaphone_name_pri = null;
        this.metaphone_name_sec = null;
        this.metaphone_company_pri = null;
        this.metaphone_company_sec = null;

        this._name = name;
        this._company = company;

        this.street1 = street1;
        this.street2 = street2;
        this.zip = zip;
        this.city = city;
        this.state = state;
        this.country = country;
        this._phone = phone;
        this._phone2 = null;
        this._phone3 = null;
        this._email = email;
        this.taxid = taxid;
        this.taxid_state = null;
        this.residential = null;
    }

    setExtraFields(phone2 = null, phone3 = null, taxid_state = null) {
        this.phone2 = phone2;
        this.phone3 = phone3;
        this.taxid_state = taxid_state;
    }

    createMetaphones() {
        var n = Address.getMetaphonesForString(this.name, 8);
        this.metaphone_name_pri = n[0];
        this.metaphone_name_sec = n[1];

        var c = Address.getMetaphonesForString(this.company, 8);
        this.metaphone_company_pri = c[0];
        this.metaphone_company_sec = c[1];
    }

    static getMetaphonesForString(s, length = 8) {
        if (typeof s != "string" || s.trim().length == 0) {
            return [null, null];
        }
        var dm = doubleMetaphone(s.trim());
        return [dm[0].substring(0, length), dm[1].substring(0, length)];
    }

    get name() {
        return this._name;
    }

    set name(n) {
        if (typeof n == "string" && n.trim().length > 0) {
            this._name = n;
        } else {
            this._name = "";
        }
        this.createMetaphones();
    }

    get company() {
        return this._company;
    }

    set company(c) {
        if (typeof c == "string" && c.trim().length > 0) {
            this._company = c;
        } else {
            this._company = "";
        }
        this.createMetaphones();
    }

    get email() {
        return (this._email ?? "").toUpperCase();
    }

    set email(e) {
        this._email = e.trim().toUpperCase();
    }

    get phone() {
        return this._phone;
    }

    set phone(p) {
        this._phone = Address.formatPhone(p);
    }

    get phone2() {
        return this._phone2;
    }

    set phone2(p) {
        this._phone2 = Address.formatPhone(p, true);
    }

    get phone3() {
        return this._phone3;
    }

    set phone3(p) {
        this._phone3 = Address.formatPhone(p, true);
    }

    static formatPhone(p, retNull = false) {
        if (typeof p != "string") {
            return retNull ? null : "";
        }
        p = p.trim();
        if (p.length < 7) {
            return retNull ? null : "";
        }
        if (p.substring(0, 1) != "+") {
            p = `+${p}`;
        }
        var pf = null;
        if (this.country) {
            pf = phoneFormatter(p, {country: this.country});
        } else {
            pf = phoneFormatter(p);
        }
        console.log(pf);
        if (typeof pf.phoneNumber == "string") {
            return pf.phoneNumber.replace("+", "");
        }
        return p;
    }

    metaphoneMatches(q) {
        if (typeof q != "string" || q.trim() == "") {
            return false;
        }
        let qdm = doubleMetaphone(q.trim());
        for (var i = 0; i < qdm.length; i++) {
            qdm[i] = qdm[i].substring(0, 8);
            if (
                    this.metaphone_name_pri == qdm[i]
                    || this.metaphone_name_sec == qdm[i]
                    || this.metaphone_company_pri == qdm[i]
                    || this.metaphone_company_sec == qdm[i]
                    ) {
                return true;
            }
        }
        return false;
    }

    clone() {
        let n = Address.fromObject(structuredClone(this));
        return n;
    }

    toObject() {
        return structuredClone({
            uuid: this.uuid,
            name: this.name,
            company: this.company,
            email: this.email,
            phone: this.phone,
            phone2: this.phone2,
            phone3: this.phone3,
            street1: this.street1,
            street2: this.street2,
            zip: this.zip,
            city: this.city,
            state: this.state,
            country: this.country,
            taxid: this.taxid,
            taxid_state: this.taxid_state,
            residential: this.residential,
            stateName: this.stateName,
            stateISO: this.stateISO
        });
    }

    toJSON() {
        return this.toObject();
    }

    /**
     * Returns an object with two arrays: first is a list of database column names and the second is the values from this address.
     */
    sqlColumnDump() {
        return {
            columns: [
                "uuid", "name", "company",
                "email", "phone", "phone2", "phone3",
                "street1", "street2", "postalcode", "city", "state", "country",
                "metaphone_name_pri", "metaphone_name_sec",
                "metaphone_company_pri", "metaphone_company_sec",
                "federal_tax_id", "state_tax_id"
            ],
            values: structuredClone([
                this.uuid, this.name, this.company,
                this.email, this.phone, this.phone2, this.phone3,
                this.street1, this.street2, this.zip, this.city, this.state, this.country,
                this.metaphone_name_pri, this.metaphone_name_sec,
                this.metaphone_company_pri, this.metaphone_company_sec,
                this.taxid, this.taxid_state
            ])
        }
    }

    static fromObject(addr, createMetaphones = false) {
        if (addr instanceof Address) {
            return addr;
        }
        let address = structuredClone(addr);
        var a = new Address(address.uuid ?? "", address.name ?? (address._name ?? ""), address.company ?? (address._company ?? ""),
                address.street1, address.street2, address.zip ?? address.postalcode, address.city, address.state, address.country,
                address.phone ?? (address._phone ?? ""), address.email ?? (address._email ?? ""), address.taxid ?? (address.federal_tax_id ?? ""));
        if (typeof address.residential == "boolean") {
            a.residential = address.residential;
        }
        a.setExtraFields(address.phone2 ?? (address._phone2 ?? null), address.phone3 ?? (address._phone3 ?? null), address.taxid_state ?? (address.state_tax_id ?? null));
        if (createMetaphones) {
            a.createMetaphones();
        }
        return a;
    }

    toStringArray(expandCountry = false, expandStateCode = true) {
        var country = this.country == defaultCountryCode() ? "" : this.country;
        var state = this.state ?? "";
        if (expandStateCode || !isNaN(this.state)) {
            state = getStateNameFromCode(this.state ?? "", country).toUpperCase();
        }
        var citystatezipLine = [this.city, state, this.zip].filter(Boolean);
        if (expandCountry && country != "") {
            country = getCountryNameForISO(country);
        }
        return [this.name, this.company, this.street1, this.street2, `${citystatezipLine.join(" ")}`, country, (this.taxid ? "Tax ID " + this.taxid : "")].filter(Boolean);
    }

    toString() {
        return this.toStringArray(true, false).join("\n");
    }

    get stateName() {
        var country = this.country == defaultCountryCode() ? "" : this.country;
        return getStateNameFromCode(this.state ?? "", country) ?? this.state;
    }

    get stateISO() {
        var country = this.country == defaultCountryCode() ? "" : this.country;
        return getStateISOCode(this.state ?? "", country) ?? this.state;
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
