# Tablo

A tool to simplify displaying data in table form in the console.

## Installation

Install Tablo using

```
npm install Tablo
```

Import Tablo using

```
const Tablo = require("Tablo");
```

Typescript is also supported:

```
import Tablo from "Tablo";
```

## Usage

To use Tablo, import the module. Then construct a Tablo object, passing in the data in object form. The Tablo can then be printed to the console by, first adding any desired styling using the 'with...' methods, and then calling the 'print' method.

The given object must follow the correct format, obeying certain rules:

- Objects can have standard fields, which correspond to columns, and have primitive values
- An can have at most one field whose value is a list of other valid objects. These objects can each have another object field and many standard fields.
- Only standard fields correspond to columns, object field names are ignored
- Each object in the list corresponding to an object field must have the same fields

The following is an example of a valid object:

```
const object = {
  files: [
    {
      fileName: "file name1",
      invalid: [
        { type: "type name1", count: 6, "line numbers": "7, 18" },
        { type: "type name2", count: 2, "line numbers": "17, 9" }
      ]
    },
    {
      fileName: "file name2",
      invalid: [
        { type: "type name3", count: 0, "line numbers": "28" },
        { type: "type name4", count: 3, "line numbers": "1, 9, 12" }
      ]
    }
  ]
};
```

This object can then be used to construct a Tablo:

```const Tablo = require("Tablo");
const tablo = new Tablo(object);
tablo
  .withHorizontalLineStyle("-")
  .withVerticalLineStyle("|")
  .withNumberOfSpacesAtStartOfColumns(1)
  .withNumberOfSpacesAtEndOfColumns(1)
  .print();
```

The above code would output the following:

```
|------------|------------|-------|--------------|
| fileName   | type       | count | line numbers |
|------------|------------|-------|--------------|
| file name1 | type name1 | 6     | 7, 18        |
|            | type name2 | 2     | 17, 9        |
| file name2 | type name3 | 0     | 28           |
|            | type name4 | 3     | 1, 9, 12     |
|------------|------------|-------|--------------|
```

The following styling options are currently available:

- `withHorizontalLineStyle(character)` where character can be any of `"-"`, `"="`, `"_"`, `" "`. This determines what character will form the horizontal lines.
- `withVerticalLineStyle(character)` where character can be any of `"|"`, `"||"`, `":"`, `" "`. This determines what character will form the vertical lines.
- `withNumberOfSpacesAtStartOfColumns(number)` This determies how many spaces there are between the data and the prevous vertical line.
- `withNumberOfSpacesAtEndOfColumns(number)` This determies the minimum number of spaces there are between the data and the next vertical line.

## Contributing

Any contribution such as new features or documentaion is very welcome!
Any issues, be it feature requests or bug fixes, are also welcome!
