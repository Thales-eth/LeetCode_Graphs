// DFS

// There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

// You want to determine if there is a valid path that exists from vertex source to vertex destination.

// Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.

// Example 1:

// Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
// Output: true
// Explanation: There are two paths from vertex 0 to vertex 2:
// - 0 → 1 → 2
// - 0 → 2

// https://leetcode.com/problems/find-if-path-exists-in-graph/description/

function validPath(n, edges, source, destination) {
    const graph = new Map()
    for (let i = 0; i < n; i++) graph.set(i, [])
    for (const [x, y] of edges) {
        graph.get(x).push(y)
        graph.get(y).push(x)
    }

    function dfs(node) {
        for (edge of graph.get(node)) {
            if (!seen.has(edge)) {
                seen.add(edge)
                dfs(edge)
            }
        }
    }

    const seen = new Set()
    seen.add(source)
    dfs(source)
    return seen.has(destination)
}

// You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

// Return the number of connected components in the graph.

// Example 1:

// Input: n = 5, edges = [[0,1],[1,2],[3,4]]
// Output: 2

// https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/description/

function countComponents(n, edges) {
    const graph = new Map()
    for (let i = 0; i < n; i++) graph.set(i, [])
    for (const [x, y] of edges) {
        graph.get(x).push(y)
        graph.get(y).push(x)
    }

    const seen = new Set()

    let ans = 0

    function dfs(node) {
        for (subNode of graph.get(node)) {
            if (!seen.has(subNode)) {
                seen.add(subNode)
                dfs(subNode)
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (graph.has(i) && !seen.has(i)) {
            seen.add(i)
            dfs(i)
            ans++
        }
    }
    return ans
}

// You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

// The area of an island is the number of cells with a value 1 in the island.

// Return the maximum area of an island in grid. If there is no island, return 0.

// Example 1:

// Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
// Output: 6
// Explanation: The answer is not 11, because the island must be connected 4-directionally.

// https://leetcode.com/problems/max-area-of-island/description/

function maxAreaOfIsland(grid) {
    const m = grid.length
    const n = grid[0].length
    let maxArea = 1

    function validate(row, col) {
        return (row >= 0 && row < m && col >= 0 && col < n && grid[row][col] === 1)
    }

    function convertToHash(row, col) {
        return row + "," + col
    }

    function dfs(row, col) {
        for (const [dx, dy] of directions) {
            let newCol = col + dx
            let newRow = row + dy
            if (validate(newRow, newCol) && !seen.has(convertToHash(newRow, newCol))) {
                maxArea++
                seen.add(convertToHash(newRow, newCol))
                dfs(newRow, newCol)
            }
        }
    }

    const seen = new Set()

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    let ans = 0

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 1) {
                seen.add(convertToHash(row, col))
                dfs(row, col)
                ans = Math.max(ans, maxArea)
                maxArea = 1
            }
        }
    }
    return ans
}

// There is an undirected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.

// You are given a 2D integer array edges of length n - 1 where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree. You are also given an integer array restricted which represents restricted nodes.

// Return the maximum number of nodes you can reach from node 0 without visiting a restricted node.

// Note that node 0 will not be a restricted node.

// Example 1:

// Input: n = 7, edges = [[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]], restricted = [4,5]
// Output: 4
// Explanation: The diagram above shows the tree.
// We have that [0,1,2,3] are the only nodes that can be reached from node 0 without visiting a restricted node.

// https://leetcode.com/problems/reachable-nodes-with-restrictions/description/

function reachableNodes(n, edges, restricted) {
    const graph = new Map()
    for (let i = 0; i < n; i++) {
        graph.set(i, [])
    }
    for (const [x, y] of edges) {
        graph.get(x).push(y)
        graph.get(y).push(x)
    }

    function dfs(node) {
        for (const subNode of graph.get(node)) {
            if (!seen.has(subNode) && !restricted.includes(subNode)) {
                seen.add(subNode)
                dfs(subNode)
            }
        }
    }

    const seen = new Set()
    seen.add(0)
    dfs(0)
    return seen.size
}

