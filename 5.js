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

module.exports = {
    getPassword,
};