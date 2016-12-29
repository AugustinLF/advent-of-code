const {getPassword, getHarderPassword} = require('./5');

test('getPassword()', () => {
    // ~30s per run
    // expect(getPassword('abc')).toBe('18f47a30');
    // expect(getPassword('ojvtpuvg')).toBe('4543c154');
});

test('getHarderPassword()', () => {
    // longer run
    // expect(getHarderPassword('abc')).toBe('05ace8e3');
    // expect(getHarderPassword('ojvtpuvg')).toBe('1050cbbd');
});