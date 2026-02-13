<a name="reports"></a>

## reports : <code>object</code>
Define custom reports for the user.

**Kind**: global namespace  
<a name="reports.registerReport"></a>

### reports.registerReport(name, onload(startDate,endDate), date)
**Kind**: static method of [<code>reports</code>](#reports)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Report name |
| onload(startDate,endDate) | <code>function</code> | Called when the report is loaded, with start and end Date objects. See example. |
| date | <code>boolean</code> | If the report requires a date range be selected. |

**Example**  
```js
global.apis.reports.registerReport("sample", function (startDate, endDate) {

 // Note about column datatypes:
 // Use "string" for the datatype, except for the special cases listed here.
 // Other datatypes may be added in the future, so use "string"
 // unless you like unexpected behavior!
 //
 // datetime:   Column is a UNIX timestamp (in seconds).
 //             It is displayed as a formatted date and time string.
 // receiptid:  Column is a PostalPoint receipt ID number. Displayed as a link.
 //             Clicking the ID will fetch and open the receipt in a popup.
 // userid:     Column contains an employee ID number from the PostalPoint database.
 //             It is queried in the database and replaced with the employee's name,
 //             or with an empty string if the ID lookup has no results.
 // money:      Column is a number that will be formatted as currency for display.
 // percent:    Column is a percent value (as 12.3, not .123) and will be formatted
 //             with a trailing % sign and rounded to two decimal places.

 // Single-table report
 return {
   table: {
     header: ["Column 1", "Column 2"],
     datatypes: ["string", "string"],
     rows: [
       ["Row 1 Col 1", "Row 1 Col 2"],
       ["Row 2 Col 1", "Row 2 Col 2"]
     ]
   }
 };

 // Multiple-table report
 return {
    multitable: true,
    table: {
      titles: ["Report 1 Title", "Report 2 Title"],
      header: [["Report 1 Column 1", "Report 1 Column 2"], ["Report 2 Column 1", ...]],
      datatypes: [["string", "string"], ["string", "string"]],
      rows: [
        [
          ["Report 1 Row 1 Col 1", "Report 1 Row 1 Col 2"],
          ["Report 1 Row 2 Col 1", "Report 1 Row 2 Col 2"]
        ],
        [
          ["Report 2 Row 1 Col 1", "Report 2 Row 1 Col 2"],
          ["Report 2 Row 2 Col 1", "Report 2 Row 2 Col 2"]
        ]
      ]
    }
  }
}, true);
```
