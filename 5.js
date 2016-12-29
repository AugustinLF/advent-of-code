// @flow
const crypto = require('crypto');

const getHex = (hashedValue: string) =>
    crypto
        .createHash('md5')
        .update(hashedValue)
        .digest('hex');

const isValidHex = (hex: string): bool => hex.slice(0, 5) === '00000';
const getLetterFromHash = (val: string): string => val[5];

const getPassword = (doorId: string): string => {
    let index = 0;
    let password = '';

    while (password.length !== 8) {
        const hashedValue = doorId + String(index);
        const hex = getHex(hashedValue);
        if (isValidHex(hex))
            password += getLetterFromHash(hex);

        index++;
    }

    return password;
}

const getLetter = (hex: string): {letter: string, position: number} => ({
    letter: hex[6],
    position: Number(hex[5]),
});
// being lazy, imperative code is a pain to extract
const getHarderPassword = (doorId: string): string => {
    let index = 0;
    let password = '        '.split('');

    while (password.includes(' ')) {
        const hashedValue = doorId + String(index);
        const hex = getHex(hashedValue);
        // if (index % 10000 === 0) {}
        if (isValidHex(hex)) {
            const {letter, position} = getLetter(hex);
            if (position < 8 && password[position] === ' ')
                password[position] = letter;
        }

        index++;
    }

    return password.join('');
}

module.exports = {
    getPassword,
    getHarderPassword,
};