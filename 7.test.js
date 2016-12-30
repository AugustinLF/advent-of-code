const fs = require('fs');
const {isIpTLSValid, isAbba, countTLSValid} = require('./7');

const input = fs.readFileSync('./7.txt', 'utf-8');
const ex7 = fs.readFileSync('./7ex.txt', 'utf-8');

test('isAbba', () => {
    expect(isAbba('abba', 0)).toBe(true);
    expect(isAbba('abbar', 1)).toBe(false);
    expect(isAbba('aaaa', 0)).toBe(false);
})

test('isIpTLSValid()', () => {
    expect(isIpTLSValid('abba[mnop]qrst')).toBe(true);
    expect(isIpTLSValid('abcd[bddb]xyyx')).toBe(false);
    expect(isIpTLSValid('aaaa[qwer]tyui')).toBe(false);
    expect(isIpTLSValid('ioxxoj[asdfgh]zxcvbn')).toBe(true);
    expect(isIpTLSValid('zxabba')).toBe(true);
});

test('countTLSValid', () => {
    expect(countTLSValid(ex7)).toBe(2);
    expect(countTLSValid(input)).toBe(105);
});