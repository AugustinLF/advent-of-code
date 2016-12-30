//@flow
// While snooping around the local network of EBHQ, you compile a list of IP addresses (they're IPv7, of course; IPv6 is much too limited). You'd like to figure out which IPs support TLS (transport-layer snooping).

// An IP supports TLS if it has an Autonomous Bridge Bypass Annotation, or ABBA. An ABBA is any four-character sequence which consists of a pair of two different characters followed by the reverse of that pair, such as xyyx or abba. However, the IP also must not have an ABBA within any hypernet sequences, which are contained by square brackets.

// For example:

// abba[mnop]qrst supports TLS (abba outside square brackets).
// abcd[bddb]xyyx does not support TLS (bddb is within square brackets, even though xyyx is outside square brackets).
// aaaa[qwer]tyui does not support TLS (aaaa is invalid; the interior characters must be different).
// ioxxoj[asdfgh]zxcvbn supports TLS (oxxo is outside square brackets, even though it's within a larger string).
// How many IPs in your puzzle input support TLS?

const R = require('ramda');

const isAbba = (s: string, i: number): bool =>
    s[i] === s[i + 3] && s[i + 1] === s[i + 2] && s[i] !== s[i + 1];

// Simply iterate over the string, find an abba, then check if before there is a [ (not a ])
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

const countTLSValid: (input: string) => number = R.pipe(
    R.split('\n'),
    R.filter(isIpTLSValid),
    R.length,
);

module.exports = {
    isAbba,
    isIpTLSValid,
    countTLSValid,
};