import fs from 'fs';

type Position = {
    row: number;
    col: number;
}

type Direction = 'up' | 'down' | 'left' | 'right';

function turn90DegreesToRight(direction: Direction): Direction {
    switch (direction) {
        case 'up': return 'right';
        case 'right': return 'down';
        case 'down': return 'left';
        case 'left': return 'up';
    }
}

function canGuardMoveForward(position: Position, direction: Direction, grid: string[][]): Position | undefined {
    switch (direction) {
        case 'up': {
            return grid[position.row - 1][position.col] === '.' ? {
                row: position.row - 1,
                col: position.col,
            } : undefined;
        }
        case 'down': {
            return grid[position.row + 1][position.col] === '.' ? {
                row: position.row + 1,
                col: position.col,
            } : undefined;
        }
        case 'left': {
            return grid[position.row][position.col - 1] === '.' ? {
                row: position.row,
                col: position.col - 1,
            }: undefined;
        }
        case 'right': {
            return grid[position.row][position.col + 1] === '.' ? {
                row: position.row,
                col: position.col + 1,
            } : undefined;
        }
    }
}

function isGuardInGridBoundaries(position: Position, grid: string[][]): boolean {
    return (
        position.row > 0 &&
        position.row < grid.length - 1 &&
        position.col > 0 &&
        position.col < grid[position.row].length - 1
    )
}

function getInitialPosition(grid: string[][]): Position {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '^') {
                return {
                    row,
                    col,
                }
            }
        }
    }

    return {
        row: 0,
        col: 0,
    }
}

function pushToVisitedSpots(position: Position, visitedSpots: Position[]): void {
    const index = visitedSpots.findIndex((spot) => spot.row === position.row && spot.col === position.col);
    if (index === -1) {
        visitedSpots.push(position);
    }
}

function findGuardPath(grid: string[][]): number {
    const visitedSpots: Position[] = [];
    let currentPosition: Position = getInitialPosition(grid);
    visitedSpots.push(currentPosition);
    let currentDirection: Direction = 'up';

    while (true) {
        if (isGuardInGridBoundaries(currentPosition, grid)) {
            const nextPositionOnSameDirection = canGuardMoveForward(currentPosition, currentDirection, grid);
            if (nextPositionOnSameDirection) {
                pushToVisitedSpots(nextPositionOnSameDirection, visitedSpots);
                currentPosition = nextPositionOnSameDirection;
            } else {
                currentDirection = turn90DegreesToRight(currentDirection);
            }
        } else {
            console.log('guard is out of grid boundaries');
            break;
        }
    }

    return visitedSpots.length;
}

function main(): void {
    const input = fs.readFileSync('./input.txt', 'utf8');
    const lines = input.split('\n');
    const grid = lines.map((line) => line.split(''));

    const part1 = findGuardPath(grid);
    console.log({part1});
}

main();