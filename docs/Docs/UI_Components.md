# UI Components

PostalPoint uses Framework7 for its user interface and styling.

There are several custom Framework7 components developed for PostalPoint that are available for use in plugin UIs, for added UI consistency.

You can trigger events with Framework7 markup, for example `<li-button @click="${onClickFunction}" />` or `<li-input @change="${onChangeFunction}" />`.

## Form Inputs and Controls

These form inputs are intended to be used inside a Framework7 list. They generate the entire `<li>` for you.

### li-input

A versatile and powerful input field.

#### Properties:

* type: text, password, number, file, textarea, date
* id: ID for the `input` tag.
* name: Name for the `input` tag.
* value: Initial input value.
* placeholder: Text to show when input is empty.
* class: CSS class string for the `input` tag.
* label: Short line of text shown near the input.
* min, max, step: Same as on a normal `type=number` input element.
* liid: ID for the `li` tag inside this component.
* liclass: CSS class string for the `li` tag.
* buttonstep: When `type=number`, the amount to change the value by when the + or - button is pressed.
* purpose: Can be "currency" or "percent". If currency, adds the local currency symbol and sets the step and buttonstep to the smallest unit of the currency (0.01 for USD). If "percent", places a percent sign after the value.
* touchkeypad: If set to a string value and the display is a touchscreen, a pop-up touch-friendly number keypad is made available.
* leadingsymbol, trailingsymbol: A character to show before/after the input. Ignored if type is not number.
* list: A datalist to attach to a text input.

#### Notes:

* `type=number` shows + and - UI buttons near the actual input.
* `type=file` is an editable text input and a browse button.  The input's value is the full file path, and the browse button allows the user to select a file path to set in the input.

```html
<div class="list">
    <ul>
        <li-input type="text" placeholder="Placeholder Text" name="notes" id="notesInput" />
    </ul>
</div>
```

### li-select-input

Similar to `li-input` but a dropdown list.

#### Properties:

* id: ID for the `input` tag.
* name: Name for the `input` tag.
* value: Initial selected option value.
* options: JSON array of the available options: `[ ["value1", "Label 1"], ["value2", "Label 2"] ]`, or `["value1", "value2"]`
* class: CSS class string for the `input` tag.
* label: Short line of text shown near the input.
* text: More text.
* liid: ID for the `li` tag inside this component.
* liclass: CSS class string for the `li` tag.


```html
<div class="list">
    <ul>
        <li-select-input label="Country" name="country" id="country_select" value="" options="${JSON.stringify(['a', 'b', 'c'])}" />
    </ul>
</div>
```

### li-multi-select-input

Similar to `li-select-input` but opens a list popup with items and checkboxes.
Uses a hidden `input` element to store the value as a comma-separated string.
This means you cannot use commas in any of the values.

#### Properties:

* id: ID for the hidden `input` tag. Randomly generated if not set.
* name: Name for the `input` tag.
* value: comma-separated list of the selected values: "value1,value2"
* options: JSON array of the available options: `[ ["value1", "Label 1"], ["value2", "Label 2"] ]`, or `["value1", "value2"]`
* label: Text shown on the element next to the selected options.
* liid: ID for the `li` tag inside this component.
* liclass: CSS class string for the `li` tag.
* style: CSS style for the `li` tag.

```html
<div class="list">
    <ul>
        <li-multi-select-input label="Select Carriers" name="carriers" value="" options='${JSON.stringify(["USPS", "FedEx"])}' />
    </ul>
</div>
```

### li-checkbox-input

A checkbox/toggle switch, but easier to deal with because you can also read its value if you don't want to check if it's checked.

The value is an empty string unless/until the box is checked.

Uses a hidden `input` element as well as the checkbox input element.  The hidden element is assigned the `name` property, and its value is set to `value` or cleared based on the checkbox's checked state.
The hidden `input`'s `id` is set to `${id}_hidden`, that is, the ID you set followed by "_hidden".

#### Properties:

* id: ID for the `input` checkbox. Randomly generated if not set.
* name: Name for the hidden `input` tag.
* value: Value to use when checkbox is checked. Defaults to "1" if not provided.
* checked: If "true", "1", "on", or otherwise truthy, the checkbox will be pre-checked.
* label: Text shown near the checkbox.
* text: Additional text shown near the checkbox.
* liid: ID for the `li` tag inside this component.
* liclass: CSS class string for the `li` tag.

```html
<div class="list">
    <ul>
        <li-checkbox-input id="someCheck" label="Turn me on" name="someCheck" value="I'm on" />
    </ul>
</div>
```

### li-color-input

Similar to `li-input` but shows a color picker popup on click.  Also shows a patch/square of the selected color, as well as the RGB hex color code selected.

#### Properties:

* value: A color code string, as "#000000".
* id: ID for the input element. Randomly generated if undefined.
* name: Input name.
* label: Short text string to show.
* defaultcolor: The default color code to use. Always available for selection in the color popup's palette.
* placeholder: Text to show instead of the color code if none is set.
* liid: ID for the `li` tag inside this component.
* liclass: CSS class string for the `li` tag.
* style: CSS styles for the `li` tag.

```html
<div class="list">
    <ul>
        <li-color-input label="Pick a Color" id="picked_color" name="picked_color" placeholder="" value="#00acff" defaultcolor="#00acff" />
    </ul>
</div>
```

### li-button

A button sitting nicely inside a `li` element.

#### Properties:

* id: ID for the button's `div`. If unset, will be a random ID.
* class: `<div class="button ${class}" ...`
* label: Button text.
* liid: ID for the `li` tag inside this component.
* liclass: CSS class string for the `li` tag.
* style: CSS styles for the `li` tag.


```html
<div class="list">
    <ul>
        <li-button label="Click Me" @click="${someFunction}" class="color-green button-outline" />
    </ul>
</div>
```

## Scale/Weight Display

### Small display

Simply include this in a navbar to show the postage scale's current weight or error code. Updated automatically.

```html
<div class="navbar-scale-display"></div>
```

#### Example:

```html
<div class="navbar">
    <div class="navbar-bg"></div>
    <div class="navbar-inner">
        <div class="title display-flex justify-content-start align-items-center">
            <div>Some Page Title</div>
        </div>
        <div class="right padding-right">
            <div class="navbar-scale-display"></div>
        </div>
    </div>
</div>
```


## Shortcut Key Hint

Show a tiny keyboard symbol on a button or other UI element.  Not shown if the user turns off the "Show Keyboard Shortcuts" preference.

Has CSS to deal with embedding in a Framework7 button or tab label.

```html
<key-hint k="F5" />
```

## Number Pad

A touch-friendly onscreen number pad that sends its input to a target element.

If the target element has its `step` property set to `0.25`, the number pad will include buttons for 1/4, 1/2, and 3/4.

The `change` and `input` events are triggered on the target element when the number pad is used.

### Properties:

* target: The ID of an input element.
* decimal: If set to a non-empty string, a decimal point button will be included.
* eraseonstart: If set to a non-empty string, the target input's existing value will be cleared the first time the user presses a key on the number pad.
* clearbutton: If set to a non-empty string, an erase/clear button will be included on the number pad.

```html
<osk-numberpad target="amountInput" decimal="yes" />
```
