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
type GetLetter = (l: LetterMap) => string;
const frequencyLetterGetter = (compare: (LetterTuple, LetterTuple) => number): GetLetter =>
    R.pipe(
        R.toPairs,
        R.sort(compare),
        R.head,
        R.head,
    );
const getMostCommonLetter = frequencyLetterGetter(
    (first: LetterTuple, second: LetterTuple) => second[1] - first[1],
);
const getLeastCommonLetter = frequencyLetterGetter(
    (first: LetterTuple, second: LetterTuple) => first[1] - second[1],
)

const getNameWhenMostCommon: Array<LetterMap> => string = R.pipe(
    R.map(getMostCommonLetter),
    R.join(''),
);
const getNameWhenLeastCommon: Array<LetterMap> => string = R.pipe(
    R.map(getLeastCommonLetter),
    R.join(''),
);

const getCorrectedVersion = R.pipe(
    parseInput,
    getLetterMaps,
    getNameWhenMostCommon,
);

const getCorrectedLeastLikelyVersion = R.pipe(
    parseInput,
    getLetterMaps,
    getNameWhenLeastCommon,
);

module.exports = {
    getCorrectedVersion,
    getCorrectedLeastLikelyVersion,
}