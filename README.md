# a11y-junit-reporter

A JUnit reporter for [a11y](https://github.com/addyosmani/a11y)

## Usage

```javascript
var a11yJunitReporter = require('a11y-junit-reporter');
var junitReport = a11yJunitReporter.generateJUnitReport(url, audit, endTimestamp, duration);
```
with:
- `url`: the url to the audited file/web page
- `audit`: the `audit` property of the result object returned by the `a11y` audit
- `endTimestamp`: the end of the audit execution
- `duration`: the audit execution duration

returns:
- a `String` that contains the JUnit report