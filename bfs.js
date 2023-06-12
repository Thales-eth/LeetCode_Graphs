// You are given an m x n matrix maze (0-indexed) with empty cells (represented as '.') and walls (represented as '+'). You are also given the entrance of the maze, where entrance = [entrancerow, entrancecol] denotes the row and column of the cell you are initially standing at.

// In one step, you can move one cell up, down, left, or right. You cannot step into a cell with a wall, and you cannot step outside the maze. Your goal is to find the nearest exit from the entrance. An exit is defined as an empty cell that is at the border of the maze. The entrance does not count as an exit.

// Return the number of steps in the shortest path from the entrance to the nearest exit, or -1 if no such path exists.

// Example 1:

// Input: maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2]
// Output: 1
// Explanation: There are 3 exits in this maze at [1,0], [0,2], and [2,3].
// Initially, you are at the entrance cell [1,2].
// - You can reach [1,0] by moving 2 steps left.
// - You can reach [0,2] by moving 1 step up.
// It is impossible to reach [2,3] from the entrance.
// Thus, the nearest exit is [0,2], which is 1 step away.

// https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/description/

function nearestExit(maze, entrance) {
    const m = maze.length
    const n = maze[0].length

    function getHash(row, col) {
        return `${row},${col}`
    }

    function validate(row, col) {
        return row >= 0 && row < m && col >= 0 && col - n && maze[row][col] === "."
    }

    function isExit(row, col) {
        return row === 0 || row === m - 1 || col === 0 || col === n - 1
    }

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    const seen = new Set()
    seen.add(getHash(entrance[0], entrance[1]))
    let steps = 0

    let queue = [entrance]
    while (queue.length) {
        const nextQueue = []
        const currentLength = queue.length
        for (let i = 0; i < currentLength; i++) {
            const [row, col] = queue[i]
            for (const [dx, dy] of directions) {
                const newRow = row + dy
                const newCol = col + dx
                if (isExit(newRow, newCol) && validate(newRow, newCol) && !seen.has(getHash(newRow, newCol))) return steps + 1

                if (validate(newRow, newCol) && !seen.has(getHash(newRow, newCol))) {
                    seen.add(getHash(newRow, newCol))
                    nextQueue.push([newRow, newCol])
                }
            }
        }
        queue = nextQueue
        steps++
    }
    return -1
}

// You are given an n x n integer matrix board where the cells are labeled from 1 to n2 in a Boustrophedon style starting from the bottom left of the board (i.e. board[n - 1][0]) and alternating direction each row.

// You start on square 1 of the board. In each move, starting from square curr, do the following:

// Choose a destination square next with a label in the range [curr + 1, min(curr + 6, n2)].
// This choice simulates the result of a standard 6-sided die roll: i.e., there are always at most 6 destinations, regardless of the size of the board.
// If next has a snake or ladder, you must move to the destination of that snake or ladder. Otherwise, you move to next.
// The game ends when you reach the square n2.
// A board square on row r and column c has a snake or ladder if board[r][c] != -1. The destination of that snake or ladder is board[r][c]. Squares 1 and n2 do not have a snake or ladder.

// Note that you only take a snake or ladder at most once per move. If the destination to a snake or ladder is the start of another snake or ladder, you do not follow the subsequent snake or ladder.

// For example, suppose the board is [[-1,4],[-1,3]], and on the first move, your destination square is 2. You follow the ladder to square 3, but do not follow the subsequent ladder to 4.
// Return the least number of moves required to reach the square n2. If it is not possible to reach the square, return -1.

// Example 1:

// Input: board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
// Output: 4
// Explanation:
// In the beginning, you start at square 1 (at row 5, column 0).
// You decide to move to square 2 and must take the ladder to square 15.
// You then decide to move to square 17 and must take the snake to square 13.
// You then decide to move to square 14 and must take the ladder to square 35.
// You then decide to move to square 36, ending the game.
// This is the lowest possible number of moves to reach the last square, so return 4.

// https://leetcode.com/problems/snakes-and-ladders/description/

function snakesAndLadders(board) {

    const n = board[0].length

    function getCoordinatedPosition(square) {
        const row = n - 1 - Math.floor((square - 1) / n)
        const col = (n - 1 - row) % 2 === 0 ? (square - 1) % n : n - 1 - ((square - 1) % n)
        return board[row][col]
    }

    function checkIfValid(square) {
        return square <= n ** 2
    }

    function checkEnd(square) {
        return square === n ** 2
    }

    if (checkEnd(1)) return 0

    let queue = [1]
    let steps = 0
    const seen = new Set()
    seen.add(1)

    while (queue.length) {
        steps++
        const currentLength = queue.length
        const nextQueue = []
        for (let i = 0; i < currentLength; i++) {
            const square = queue[i]
            const dices = [square + 1, Math.min(square + 6, n ** 2)]
            for (let i = dices[0]; i <= dices[1]; i++) {
                let newSquare = i
                if (!checkIfValid(newSquare)) continue
                if (getCoordinatedPosition(newSquare) !== -1) {
                    newSquare = getCoordinatedPosition(newSquare)
                }
                if (checkEnd(newSquare)) return steps
                if (!seen.has(newSquare)) {
                    seen.add(newSquare)
                    nextQueue.push(newSquare)
                }
            }
        }
        queue = nextQueue
    }
    return -1
}