# Minimal Plugin

This is the smallest possible valid plugin.


```js title="plugin-name/plugin.js"
exports.init = function () {
    global.apis.alert("This message appears when PostalPoint launches.", "Hello!");
};
```
