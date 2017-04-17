const { expect } = require('chai');
const converter = require('../src/index');

describe('base-converter', () => {
    describe('#encode()', () => {
        it('should throw an error when input is zero', () => {
            const c = converter();
            expect(() => {
                c.encode(0);
            }).to.throw('Input must be a positive number.')
        });

        it('should throw an error when input is negative', () => {
            const c = converter();
            expect(() => {
                c.encode(-123);
            }).to.throw('Input must be a positive number.')
        });

        it('should throw an error when input is is missing', () => {
            const c = converter();
            expect(() => {
                c.encode();
            }).to.throw('Input must be a positive number.')
        });
    });

    describe('#decode()', () => {
        it('should throw an error when input is empty string', () => {
            const c = converter();
            expect(() => {
                c.decode('');
            }).to.throw('Input must not be empty.')
        });

        it('should throw an error when input is is missing', () => {
            const c = converter();
            expect(() => {
                c.decode();
            }).to.throw('Input must not be empty.')
        });
    });

    it('should be able to encode and decode using a provided alphabet', () => {
        const c = converter({
            alphabet: '+_-()[]'
        });
        const num = 12334523;

        const encoded = c.encode(num);
        const decoded = c.decode(encoded);
        expect(encoded).to.equal('-+][]_)][');
        expect(decoded).to.equal(num);
    });

    it('should use the base62 alphabet when one is not provided', () => {
        const c = converter();
        const num = 8765323234953

        const encoded = c.encode(num);
        const decoded = c.decode(encoded);
        expect(encoded).to.equal('2UJk31Ev');
        expect(decoded).to.equal(num);
    });

    it('should use binary alphabet when base is `2`', () => {
        const c = converter({ base: 2 });
        const num = 21;

        const encoded = c.encode(num);
        const decoded = c.decode(encoded);
        expect(encoded).to.equal('10101');
        expect(decoded).to.equal(num);
    });

    it('should use quaternary alphabet when base is `4`', () => {
        const c = converter({ base: 4 });
        const num = 21;

        const encoded = c.encode(num);
        const decoded = c.decode(encoded);
        expect(encoded).to.equal('111');
        expect(decoded).to.equal(num);
    });

    it('should use octal alphabet when base is `8`', () => {
        const c = converter({ base: 8 });
        const num = 64001;

        const encoded = c.encode(num);
        const decoded = c.decode(encoded);
        expect(encoded).to.equal('175001');
        expect(decoded).to.equal(num);
    });

    it('should use hexadecimal alphabet when base is `8`', () => {
        const c = converter({ base: 16 });
        const num = 64001;

        const encoded = c.encode(num);
        const decoded = c.decode(encoded);
        expect(encoded).to.equal('FA01');
        expect(decoded).to.equal(num);
    });

    it('should use base62 alphabet when base is `62`', () => {
        const c = converter({ base: 62 });
        const num = 8765323234953

        const encoded = c.encode(num);
        const decoded = c.decode(encoded);
        expect(encoded).to.equal('2UJk31Ev');
        expect(decoded).to.equal(num);
    });

    it('should use base62 alphabet when base is not recognised', () => {
        const c = converter({ base: 999 });
        const num = 8765323234953

        const encoded = c.encode(num);
        const decoded = c.decode(encoded);
        expect(encoded).to.equal('2UJk31Ev');
        expect(decoded).to.equal(num);
    });

    it('should need two converts for converting between bases', () => {
        const hexConverter = converter({ base: 16 });
        const decimalNumber = hexConverter.decode('FFF');
        expect(decimalNumber).to.equal(4095);

        const binaryConverter = converter({ base: 2 });
        const encodedBinary = binaryConverter.encode(decimalNumber);
        expect(encodedBinary).to.equal('111111111111');
    });
});
