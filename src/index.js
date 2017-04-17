const B2 = '01'; // Binary
const B4 = '0134'; // Quaternary
const B8 = '01234567'; // Octal
const B16 = '0123456789ABCDEF'; // Hexadecimal
const B62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // Base62

function chooseAlphabet(opts = {}) {
    const {
        alphabet,
        base
    } = opts;

    if (alphabet !== undefined) {
        return alphabet;
    }

    switch (base) {
        case 2: return B2;
        case 4: return B4;
        case 8: return B8;
        case 16: return B16;
        case 62: return B62;
        default: return B62;
    }
}

function converter(opts) {
    const alphabet = chooseAlphabet(opts);
    const radix = alphabet.length;

    function encode(num = 0) {
        if (num < 1) {
            throw new Error('Input must be a positive number.');
        }

        let encoded = '';
        while (num > 0) {
            const div = Math.floor(num / radix);
            const rem = num % radix;
            num = div;
            encoded = `${alphabet.charAt(rem)}${encoded}`;
        }
        return encoded;
    }

    function decode(str = '') {
        if (str === '') {
            throw new Error('Input must not be empty.');
        }

        return str.split('').reverse().reduce((acc, char, i) => {
            const alphabetIndex = alphabet.indexOf(char);
            return acc + Math.pow(radix, i) * alphabetIndex;
        }, 0);
    }

    return {
        encode, decode
    };
}

module.exports = converter;
