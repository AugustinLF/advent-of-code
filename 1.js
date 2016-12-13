const computeInstructions = input => input
    .split(', ')
    .map(str => ({direction: str[0], distance: Number(str.slice(1, str.length))}));

const getNextOrientation = (currentOrientation, direction) => {
    const orientations = ['N', 'E', 'S', 'W'];

    const oIdx = orientations.indexOf(currentOrientation);
    const nextIdx = direction === 'R' ? oIdx + 1 : oIdx - 1;
    return nextIdx <= 3 && nextIdx >= 0
        ? orientations[nextIdx]
        : nextIdx === -1
            ? orientations[3]
            : orientations[0];
};

const initialCoords = {
    orientation: 'N',
    x: 0,
    y: 0,
    firstVisitedLocation: null,
};
const wasVisited = locations => (x, y) => Boolean(locations[x] && locations[x][y]);
const checkVisited = locations => (x, y) => {
    if (!locations[x])
        locations[x] = {};
    locations[x][y] = true;
}

const updateLocations = (visitedLocations, {before, after}) => {
    let firstVisitedLocation = null;

    const {moved, fixed} = before.x === after.x
        ? {moved: 'y', fixed: 'x'}
        : {moved: 'x', fixed: 'y'};

    const {min, max} = {
        min: Math.min(before[moved], after[moved]),
        max: Math.max(before[moved], after[moved]),
    }

    for (let i = min; i <= max; i++) {
        const currentPos = {
            x: moved === 'x' ? i : before.x,
            y: moved === 'y' ? i : before.y,
        }
        if (before.x !== currentPos.x || before.y !== currentPos.y) {
            if (wasVisited(visitedLocations)(currentPos.x, currentPos.y)) {
                return currentPos;
            } else {
                checkVisited(visitedLocations)(currentPos.x, currentPos.y);
            }
        }
    }

    return null;
}

const calcCoord = instructions => {
    const visitedLocations = {};

    return instructions.reduce(
        (coord, nextInstruction) => {
            const orientation = getNextOrientation(coord.orientation, nextInstruction.direction);
            const newCoords = {
                x: ['N', 'S'].includes(orientation)
                    ? orientation === 'N'
                        ? coord.x + nextInstruction.distance
                        : coord.x - nextInstruction.distance
                    : coord.x,
                y: ['W', 'E'].includes(orientation)
                    ? orientation === 'E'
                        ? coord.y + nextInstruction.distance
                        : coord.y - nextInstruction.distance
                    : coord.y,
            }
            let firstVisitedLocation = null;
            const translation = {
                before: {x: coord.x, y: coord.y},
                after: newCoords,
            };

            if(!coord.firstVisitedLocation) {
                firstVisitedLocation = updateLocations(visitedLocations, translation);
            } else {
                firstVisitedLocation = coord.firstVisitedLocation;
            }

            return {
                orientation,
                x: newCoords.x,
                y: newCoords.y,
                firstVisitedLocation,
            };
        },
        initialCoords
    );
};
const computeDistance = coords => Math.abs(coords.x) + Math.abs(coords.y)

const followInstructions = input => calcCoord(computeInstructions(input));

const computeDistanceFromInput = input => computeDistance(followInstructions(input));
const getFirstVisitedLocationDistance = input => computeDistance(
    followInstructions(input).firstVisitedLocation
);

module.exports = {
    computeDistanceFromInput,
    getFirstVisitedLocationDistance,
};
