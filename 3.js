const R = require('ramda');

const processString = R.pipe(
    R.split('\n'),
    R.map(
        R.pipe(
            R.match(/\S+/g),
            R.map(Number)
        )
    ),
);

const isTrianglePossible = R.pipe(
    R.sort((a, b) => a - b),
    t => t[2] < t[0] + t[1],
);

const countTriangles = R.pipe(
    // arr => {console.log(arr); return arr},
    R.reduce(
        (count, triangle) => isTrianglePossible(triangle) ? count + 1 : count,
        0,
    )
);

const countPossibleTriangles = R.pipe(
    processString,
    countTriangles,
);

const getAllButLastElement = arr => arr.reduce(
    (headArray, val, index, arr) => index !== arr.length - 1 ? [...headArray, val] : headArray,
    [],
);

const convertArrayIntoTriples = (triples, arr) => {
    if (arr.length === 0)
        return triples;
    
    const addNewTriple = R.last(triples) && R.last(triples).length === 3;
    const [first, ...rest] = arr;
    const head = addNewTriple ? triples : getAllButLastElement(triples);
    const lastTriple = R.defaultTo([], R.last(triples));

    return convertArrayIntoTriples(
        [...head, [...lastTriple.length !== 3 ? lastTriple : [], first]],
        rest,
    );
}

const countPossibleVerticalTriangles = R.pipe(
    processString,
    R.transpose,
    R.map(arr => convertArrayIntoTriples([], arr)),
    R.unnest,
    
    countTriangles,
);

// Would have been easier to work with one list of numbers

module.exports = {
    countPossibleTriangles,
    countPossibleVerticalTriangles,
};
