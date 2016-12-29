// @flow
const R = require('ramda');

const parseInput = R.pipe(
    R.split('\n'),
    R.map(R.split('')),
);

type LetterMap = {[letter: string]: number};

const addLetterToMap = (letter: string, letterMap: LetterMap = {}): LetterMap =>
    R.over(
        R.lensProp(letter),
        R.pipe(
            R.defaultTo(0),
            R.inc,
        ),
    )(letterMap);


const getLetterMaps: Array<Array<string>> => Array<LetterMap> = R.reduce(
    (letterMaps, row) => row.map((letter, index) => addLetterToMap(letter, letterMaps[index])),
    [],
);

type LetterTuple = [string, number];
const getMostCommonLetter: (LetterMap) => string = R.pipe(
    R.toPairs,
    R.sort((first: LetterTuple, second: LetterTuple) => second[1] - first[1]),
    R.head,
    R.head,
);

const getName: Array<LetterMap> => string = R.pipe(
    R.map(getMostCommonLetter),
    R.join(''),
);

const getCorrectedVersion = R.pipe(
    parseInput,
    getLetterMaps,
    getName,
);

module.exports = {
    getCorrectedVersion,
}