//@flow
// You would also like to know which IPs support SSL (super-secret listening).

// An IP supports SSL if it has an Area-Broadcast Accessor, or ABA, anywhere in the supernet sequences (outside any square bracketed sections), and a corresponding Byte Allocation Block, or BAB, anywhere in the hypernet sequences. An ABA is any three-character sequence which consists of the same character twice with a different character between them, such as xyx or aba. A corresponding BAB is the same characters but in reversed positions: yxy and bab, respectively.

// For example:

// aba[bab]xyz supports SSL (aba outside square brackets with corresponding bab within square brackets).
// xyx[xyx]xyx does not support SSL (xyx, but no corresponding yxy).
// aaa[kek]eke supports SSL (eke in supernet with corresponding kek in hypernet; the aaa sequence is not related, because the interior character must be different).
// zazbz[bzb]cdb supports SSL (zaz has no corresponding aza, but zbz has a corresponding bzb, even though zaz and zbz overlap).

const R = require('ramda');

const isAbba = (s: string, i: number): bool =>
    s[i] === s[i + 3] && s[i + 1] === s[i + 2] && s[i] !== s[i + 1];

const getABA = (s: string, i: number): ?string =>
    s[i] === s[i + 2]
    && s[i] !== s[i + 1]
    && s[i] !== '['
    && s[i] !== ']'
    && s[i + 1] !== '['
    && s[i + 1] !== ']'
        ? s.substr(i, 3)
        : null;

const getBAB = (aba: string): string => aba[1] + aba[0] + aba[1];

const isIpTLSValid = (ip: string): bool => {
    let isWithinHypernet = false;
    let abba = false;

    for (let i = 0; i < ip.length - 3; i++) {
        const letter = ip[i];

        if (letter === '[')
            isWithinHypernet = true;
        else if (letter === ']')
            isWithinHypernet = false;
        else if (isAbba(ip, i)) {
            if (isWithinHypernet)
                return false;
            
            abba = true;
        }

    }
    return abba;
};

const isIpSSLValid = (ip: string): bool => {
    let isWithinHypernet = false;
    let abba = false;
    const ABA = [];
    const BAB = [];

    for (let i = 0; i < ip.length - 2; i++) {
        const letter = ip[i];

        if (letter === '[')
            isWithinHypernet = true;
        else if (letter === ']')
            isWithinHypernet = false;
        else {
            const aba = getABA(ip, i);
            if (aba) {
                (isWithinHypernet ? BAB : ABA).push(aba);
            }
        }
    }

    return ABA.some(aba => BAB.includes(getBAB(aba)));
};

const countValid = (pred: (s: string) => bool): (s: string) => number => R.pipe(
    R.split('\n'),
    R.filter(pred),
    R.length,
);

const countTLSValid = countValid(isIpTLSValid);
const countSSLValid = countValid(isIpSSLValid);

module.exports = {
    isAbba,
    getABA,
    getBAB,
    isIpTLSValid,
    isIpSSLValid,
    countTLSValid,
    countSSLValid,
};