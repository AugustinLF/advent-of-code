const fs = require('fs');
const {
    isIpTLSValid,
    isAbba,
    countTLSValid,
    isIpSSLValid,
    countSSLValid,
    getABA,
    getBAB,
} = require('./7');

const input = fs.readFileSync('./7.txt', 'utf-8');
const ex7 = fs.readFileSync('./7ex.txt', 'utf-8');
const ex72 = fs.readFileSync('./7ex2.txt', 'utf-8');

test('isAbba()', () => {
    expect(isAbba('abba', 0)).toBe(true);
    expect(isAbba('abbar', 1)).toBe(false);
    expect(isAbba('aaaa', 0)).toBe(false);
});

test('getABA()', () => {
    expect(getABA('abae', 0)).toBe('aba');
    expect(getABA('abae', 1)).toBe(null);
    expect(getABA('aaa', 0)).toBe(null);
    expect(getABA('a[a', 0)).toBe(null);
});

test('getBAB()', () => {
    expect(getBAB('aba')).toBe('bab');
});

test('isIpTLSValid()', () => {
    expect(isIpTLSValid('abba[mnop]qrst')).toBe(true);
    expect(isIpTLSValid('abcd[bddb]xyyx')).toBe(false);
    expect(isIpTLSValid('aaaa[qwer]tyui')).toBe(false);
    expect(isIpTLSValid('ioxxoj[asdfgh]zxcvbn')).toBe(true);
    expect(isIpTLSValid('zxabba')).toBe(true);
});

test('isIpSSLValid', () => {
    expect(isIpSSLValid('aba[bab]xyz')).toBe(true);
    expect(isIpSSLValid('xyx[xyx]xyx')).toBe(false);
    expect(isIpSSLValid('aaa[kek]eke')).toBe(true);
    expect(isIpSSLValid('zazbz[bzb]cdb')).toBe(true);
});

test('countTLSValid', () => {
    expect(countTLSValid(ex7)).toBe(2);
    expect(countTLSValid(input)).toBe(105);
});

test('countSSLValid', () => {
    expect(countSSLValid(ex72)).toBe(3);
    expect(countSSLValid(input)).toBe(258);
});