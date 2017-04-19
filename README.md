# Base Converter (convert-bases)

Base converter for various numeral systems plus custom alphabets.

Useful for creating url shortners, e.g.
 * Insert long url into database.
 * Retrieve auto generated id.
 * Convert id to base62. 13371337 -> u6Uj.
 * Result: https://my.short.com/u6Uj
 * Reverse the shortcode to get database id for original url lookup.

## Supported numeral systems

 * Binary `converter({ type: 2 })`
 * Quaternary `converter({ type: 4 })`
 * Octal `converter({ type: 8 })`
 * Hexadecimal `converter({ type: 16 })`
 * Base62 `converter({ type: 62 })`
 * Custom `converter({ alphabet: '123[]+-=()X.,' })`
 
## Usage
https://www.npmjs.com/package/convert-bases
```javascript
const converter = require('convert-bases');
```

## Example

```javascript
    // Uses Base62 by default (useful for URL shortners).
    const base62Converter = converter();

    const base62 = base62Converter.encode(1337);
    console.log(`Encoded base62 = ${base62}`);

    const decimal = base62Converter.decode(base62);
    console.log(`Decoded base62 = ${decimal}`);

    // ---

    // Hex converter.
    const hexConverter = converter({ type: 16 });

    const hex = hexConverter.encode(64001);
    console.log(`Encoded hex = ${hex}`);

    const decimal = hexConverter.decode(hex);
    console.log(`Decoded hex = ${decimal}`);

    // ---

    // Custom alphabet.
    const customConverter = converter({ alphabet: '159[]+-=()X.,' });

    const encoded = customConverter.encode(1337);
    console.log(`Encoded = ${encoded}`);

    const decoded = customConverter.decode(encoded);
    console.log(`Decoded = ${decoded}`);
```
