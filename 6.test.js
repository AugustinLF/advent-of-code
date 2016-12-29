const fs = require('fs');

const {getCorrectedVersion, getCorrectedLeastLikelyVersion} = require('./6');

const input = fs.readFileSync('./6.txt', 'utf-8');
const ex6 = fs.readFileSync('./6ex.txt', 'utf-8');

test('getCorrectedVersion', () => {
    expect(getCorrectedVersion(ex6)).toBe('easter');
    expect(getCorrectedVersion(input)).toBe('qoclwvah');
});

test('getCorrectedLeastLikelyVersion', () => {
    expect(getCorrectedLeastLikelyVersion(ex6)).toBe('advent');
    expect(getCorrectedLeastLikelyVersion(input)).toBe('ryrgviuv');
})