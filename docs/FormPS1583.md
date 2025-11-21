# FormPS1583 object

```javascript
export class FormPS1583 {
    constructor() {
        this.formRevision = LATEST_FORM_REVISION; // Currently "June2024"
        this.pmbOpenedDate = new Date();
        this.pmbClosedDate = null;
        this.cmraStreetAddress = getSetting("origin_street1");
        this.pmbNumber = "";
        this.cmraZIP = getSetting("origin_zip");
        var cmraZIPData = getZIP(this.cmraZIP);
        if (cmraZIPData) {
            this.cmraCity = cmraZIPData.city;
            this.cmraState = cmraZIPData.state;
        } else {
            this.cmraCity = getSetting("origin_city", "");
            this.cmraState = getSetting("origin_state", "");
        }
        this.serviceTypeBusiness = false; // true for business PMB, false for residential
        this.applicant = {
            firstName: "",
            lastName: "",
            middleName: "",
            phone: "",
            email: "",
            streetAddress: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            courtProtected: false,
            photoID: {
                name: "",
                number: "",
                issuer: "",
                expirationDate: null,
                type: null  // "DL/ID", "UniformedService", "USAccess", "USUni",
                        // "Passport", "Matricula", "NEXUS",
                        // "CertOfNaturalization", "USPermResident"
            },
            addressID: {
                name: "",
                streetAddress: "",
                city: "",
                state: "",
                zip: "",
                country: "",
                type: null, // "DL/ID", "Lease", "Mortgage", "Insurance", "VehicleReg", "Voter"
                expirationDate: null // Optional currently but must be kept current - Oct 2025
            }
        };
        this.authorizedIndividual = {
            firstName: "",
            lastName: "",
            middleName: "",
            phone: "",
            email: "",
            streetAddress: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            photoID: {
                name: "",
                number: "",
                issuer: "",
                expirationDate: null,
                type: null  // "DL/ID", "UniformedService", "USAccess", "USUni",
                        // "Passport", "Matricula", "NEXUS",
                        // "CertOfNaturalization", "USPermResident"
            },
            addressID: {
                name: "",
                streetAddress: "",
                city: "",
                state: "",
                zip: "",
                country: "",
                type: null, // "DL/ID", "Lease", "Mortgage", "Insurance", "VehicleReg", "Voter"
                expirationDate: null // Optional currently but must be kept current - Oct 2025
            }
        };
        this.mailTransferredTo = {
            streetAddress: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            phone: "",
            email: ""
        };
        this.business = {
            name: "",
            type: "",
            streetAddress: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            phone: "",
            placeOfRegistration: ""
        };
        this.additionalRecipients = []; // Array of strings containing names
        this.applicantSignature = ""; // PNG image data URI
        this.applicantSignatureDate = null;
        this.cmraSignature = ""; // PNG image data URI
        this.cmraSignatureDate = null;
        this.hasForwardingAddress = false;
    }

    getTermsAndConditions() {
        return DEFAULT_TERMS_CONDITIONS[this.formRevision];
    }

    getApplicantForwardingAddress() {
        if (this.mailTransferredTo.streetAddress != "") {
            return new Address(null,
                    [this.applicant.firstName, this.applicant.lastName].filter(Boolean).join(" "),
                    this.business.name ?? "",
                    this.mailTransferredTo.streetAddress,
                    "",
                    this.mailTransferredTo.zip,
                    this.mailTransferredTo.city,
                    this.mailTransferredTo.state,
                    this.mailTransferredTo.country ?? "US",
                    this.mailTransferredTo.phone ?? "",
                    this.mailTransferredTo.email ?? ""
                    );
        }
        return new Address(null,
                [this.applicant.firstName, this.applicant.lastName].filter(Boolean).join(" "),
                this.business.name ?? "",
                this.applicant.streetAddress,
                "",
                this.applicant.zip,
                this.applicant.city,
                this.applicant.state,
                this.applicant.country ?? "US",
                this.applicant.phone ?? "",
                this.applicant.email ?? ""
                );
    }

    getFormFields() {
        var fields = FORM_FIELDS[this.formRevision];
        function getNestedValue(obj, path) {
            return path.split('.').reduce((o, key) => (o ? o[key] : ""), obj);
        }
        var outfields = [];
        var groupheading = {};
        var groupfields = [];
        for (var prop in fields) {
            if (fields[prop].t == "heading") {
                if (groupfields.length > 0) {
                    groupheading.fields = groupfields;
                    outfields.push(groupheading);
                    groupfields = [];
                }
                groupheading = {
                    heading: fields[prop].l,
                    groupid: fields[prop].group ?? null,
                    fields: []
                };
            }
            fields[prop].n = prop;
            fields[prop].v = getNestedValue(this, prop);
            if (typeof fields[prop].v == "undefined" || fields[prop].v == null) {
                fields[prop].v = "";
            }
            if (fields[prop].t == "date") {
                if (fields[prop].v instanceof Date) {
                    // Cancel out the timezone in the date object
                    // If we don't do this, the dates will be subtracted by one day each time we load
                    // https://stackoverflow.com/a/17329571
                    fields[prop].v.setTime(fields[prop].v.getTime() + fields[prop].v.getTimezoneOffset() * 60 * 1000);
                }
                fields[prop].v = formatTimestamp("Y-m-d", fields[prop].v);
                if (fields[prop].v == "1969-12-31" || fields[prop].v == "1970-01-01") {
                    fields[prop].v = "";
                }
            }
            if (fields[prop].t == "select" && typeof fields[prop].b == "boolean") {
                fields[prop].v = fields[prop].v ? "true" : "";
            }
            if (fields[prop].t != "heading") {
                groupfields.push(fields[prop]);
            }
        }
        if (groupfields != []) {
            groupheading.fields = groupfields;
            outfields.push(groupheading);
        }
        return outfields;
    }

    static fromHTMLFormData(formdata, revision = LATEST_FORM_REVISION) {
        var f = new FormPS1583();

        function setNestedValue(obj, path, value) {
            const keys = path.split('.');
            const lastKey = keys.pop();
            const target = keys.reduce((o, key) => {
                if (o[key] === undefined)
                    o[key] = {};
                return o[key];
            }, obj);
            if (typeof FORM_FIELDS[revision][path].b == "boolean") {
                target[lastKey] = (value == "true" || value == true);
            } else {
                target[lastKey] = value;
            }
        }

        for (var prop in formdata) {
            setNestedValue(f, prop, formdata[prop]);
        }

        return f;
    }

    static fromJSON(o) {
        var f = new FormPS1583();
        f.formRevision = o.formRevision ?? LATEST_FORM_REVISION;
        f.pmbOpenedDate = new Date(o.pmbOpenedDate);
        f.pmbClosedDate = o.pmbClosedDate ? new Date(o.pmbClosedDate) : null;
        f.cmraStreetAddress = o.cmraStreetAddress;
        f.pmbNumber = o.pmbNumber;
        f.cmraCity = o.cmraCity;
        // snip, see constructor for full data structure
        return f;
    }

    toJSON() {
        return {
            formRevision: this.formRevision,
            pmbOpenedDate: this.pmbOpenedDate,
            pmbClosedDate: this.pmbClosedDate,
            cmraStreetAddress: this.cmraStreetAddress,
            pmbNumber: this.pmbNumber,
            cmraCity: this.cmraCity,
            // snip, see constructor for full data structure
        };
    }

    /**
     * Render this form to PDF
     * @returns PDF bytes
     */
    async getPDF() {
        // snip, it draws the form contents onto a PDF using the pdf-lib library
        // If you really want to see how, email us for the code
        return await document.save();
    }
}
```
