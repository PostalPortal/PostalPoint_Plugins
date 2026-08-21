<a name="customers"></a>

## customers : <code>object</code>
Customer account functions.

**Kind**: global namespace  

* [customers](#customers) : <code>object</code>
    * [.getCustomerAccountInfo()](#customers.getCustomerAccountInfo) ⇒ <code>global.apis.shipping.Address</code> \| <code>boolean</code>
    * [.getCustomerInfoByUUID(uuid)](#customers.getCustomerInfoByUUID) ⇒ <code>global.apis.shipping.Address</code> \| <code>boolean</code>
    * [.searchCustomerAccount(query, name, company, email, phone, state, country, zipcode)](#customers.searchCustomerAccount) ⇒ <code>Promise.&lt;Array.&lt;global.apis.shipping.Address&gt;&gt;</code>
    * [.setCustomerAccount(uuid)](#customers.setCustomerAccount) ⇒ <code>Promise.&lt;Array.&lt;global.apis.shipping.Address&gt;&gt;</code>

<a name="customers.getCustomerAccountInfo"></a>

### customers.getCustomerAccountInfo() ⇒ <code>global.apis.shipping.Address</code> \| <code>boolean</code>
Get information about the active customer account.

**Kind**: static method of [<code>customers</code>](#customers)  
**Returns**: <code>global.apis.shipping.Address</code> \| <code>boolean</code> - An Address object with the customer's
data, or `false` if no customer account associated with the transaction.  
<a name="customers.getCustomerInfoByUUID"></a>

### customers.getCustomerInfoByUUID(uuid) ⇒ <code>global.apis.shipping.Address</code> \| <code>boolean</code>
Get information about a customer account using their UUID.

**Kind**: static method of [<code>customers</code>](#customers)  
**Returns**: <code>global.apis.shipping.Address</code> \| <code>boolean</code> - An Address object with the customer's
data, or `false` if no customer exists with that UUID.  

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>String</code> | Customer account UUID |

<a name="customers.searchCustomerAccount"></a>

### customers.searchCustomerAccount(query, name, company, email, phone, state, country, zipcode) ⇒ <code>Promise.&lt;Array.&lt;global.apis.shipping.Address&gt;&gt;</code>
Search for a customer account.  Fuzzy matches on name and company to allow typos/misspellings.
Multiple fields can be used for better matches, except if `query` is present, the others are ignored.

**Kind**: static method of [<code>customers</code>](#customers)  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>String</code> \| <code>null</code> | Freeform text to search by; can be a name, email, phone, UUID, etc. |
| name | <code>String</code> \| <code>null</code> | Customer name or start of their name. |
| company | <code>String</code> \| <code>null</code> | Customer business name. |
| email | <code>String</code> \| <code>null</code> |  |
| phone | <code>String</code> \| <code>null</code> |  |
| state | <code>String</code> \| <code>null</code> | State abbrevation (NY, MT, DC, etc). For non-US states, use ISO 3166-2 code without the leading country code. |
| country | <code>String</code> \| <code>null</code> | Two-letter ISO 3166 country code. |
| zipcode | <code>String</code> \| <code>null</code> | Postal code. |

**Example**  
```js
await searchCustomerAccount({query: "4067474477"});
  await searchCustomerAccount({name: "john doe", state: "MT"});
```
<a name="customers.setCustomerAccount"></a>

### customers.setCustomerAccount(uuid) ⇒ <code>Promise.&lt;Array.&lt;global.apis.shipping.Address&gt;&gt;</code>
Set the customer for the current transaction.

**Kind**: static method of [<code>customers</code>](#customers)  

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>String</code> | Customer account UUID. |

