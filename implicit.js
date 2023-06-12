// A gene string can be represented by an 8-character long string, with choices from 'A', 'C', 'G', and 'T'.

// Suppose we need to investigate a mutation from a gene string startGene to a gene string endGene where one mutation is defined as one single character changed in the gene string.

// For example, "AACCGGTT" --> "AACCGGTA" is one mutation.
// There is also a gene bank bank that records all the valid gene mutations. A gene must be in bank to make it a valid gene string.

// Given the two gene strings startGene and endGene and the gene bank bank, return the minimum number of mutations needed to mutate from startGene to endGene. If there is no such a mutation, return -1.

// Note that the starting point is assumed to be valid, so it might not be included in the bank.

// Example 1:

// Input: startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]
// Output: 1

// https://leetcode.com/problems/minimum-genetic-mutation/description/

function minMutation(startGene, endGene, bank) {
    if (!bank.includes(endGene)) return -1
    const bankOptions = new Set(bank)
    const seen = new Set()
    seen.add(startGene)

    function getMutations(gene) {
        mutations = []
        for (let i = 0; i < gene.length; i++) {
            for (letter of ["A", "C", "G", "T"]) {
                if (gene[i] !== letter) {
                    const geneCopy = [...gene]
                    geneCopy[i] = letter
                    const newMutation = geneCopy.join("")
                    if (bankOptions.has(newMutation) && !seen.has(newMutation)) {
                        seen.add(newMutation)
                        mutations.push(newMutation)
                    }
                }
            }
        }
        return mutations
    }

    let queue = [startGene]
    let steps = 0

    while (queue.length) {
        const nextQueue = []
        const currentLength = queue.length

        for (let i = 0; i < currentLength; i++) {
            const gene = queue[i]
            if (gene === endGene) return steps
            const mutations = getMutations(gene)
            nextQueue.push(...mutations)
        }
        steps++
        queue = nextQueue
    }
    return -1
}

// Given an array of non-negative integers arr, you are initially positioned at start index of the array. When you are at index i, you can jump to i + arr[i] or i - arr[i], check if you can reach to any index with value 0.

// Notice that you can not jump outside of the array at any time.

// Example 1:

// Input: arr = [4,2,3,0,3,1,2], start = 5
// Output: true
// Explanation:
// All possible ways to reach at index 3 with value 0 are:
// index 5 -> index 4 -> index 1 -> index 3
// index 5 -> index 6 -> index 4 -> index 1 -> index 3

// https://leetcode.com/problems/jump-game-iii/description/

function canReach(arr, start) {
    if (arr[start] === 0) return true
    const seen = new Set([start])

    function checkValidIndex(index) {
        return index < arr.length && index >= 0
    }

    function getIndexes(index) {
        const indexes = []
        if (checkValidIndex(index + arr[index]) && !seen.has(index + arr[index])) {
            seen.add(index + arr[index])
            indexes.push(index + arr[index])
        }
        if (checkValidIndex(index - arr[index]) && !seen.has(index - arr[index])) {
            seen.add(index - arr[index])
            indexes.push(index - arr[index])
        }
        return indexes
    }

    let queue = [start]

    while (queue.length) {
        const nextQueue = []
        const currentLength = queue.length
        for (let i = 0; i < currentLength; i++) {
            const index = queue[i]
            if (arr[index] === 0) return true
            const newIndexes = getIndexes(index)
            nextQueue.push(...newIndexes)
        }
        queue = nextQueue
    }
    return false
}

// You are given a list of bombs. The range of a bomb is defined as the area where its effect can be felt. This area is in the shape of a circle with the center as the location of the bomb.

// The bombs are represented by a 0-indexed 2D integer array bombs where bombs[i] = [xi, yi, ri]. xi and yi denote the X-coordinate and Y-coordinate of the location of the ith bomb, whereas ri denotes the radius of its range.

// You may choose to detonate a single bomb. When a bomb is detonated, it will detonate all bombs that lie in its range. These bombs will further detonate the bombs that lie in their ranges.

// Given the list of bombs, return the maximum number of bombs that can be detonated if you are allowed to detonate only one bomb.

// Example 1:

// Input: bombs = [[2,1,3],[6,1,4]]
// Output: 2
// Explanation:
// The above figure shows the positions and ranges of the 2 bombs.
// If we detonate the left bomb, the right bomb will not be affected.
// But if we detonate the right bomb, both bombs will be detonated.
// So the maximum bombs that can be detonated is max(1, 2) = 2.

// https://leetcode.com/problems/detonate-the-maximum-bombs/description/

function maximumDetonation(bombs) {
    const bombsGraph = new Map()

    function getCloseBombs(x, y, radius, targetX, targetY) {
        const distance = Math.sqrt((x - targetX) ** 2 + (y - targetY) ** 2)
        return distance <= radius
    }

    function getNeighborBombs(bombs, seen) {
        for (bomb of bombs) {
            if (!seen.has(bomb)) {
                seen.add(bomb)
                getNeighborBombs(bombsGraph.get(bomb), seen)
            }
        }
    }

    for (let i = 0; i < bombs.length; i++) bombsGraph.set(i, [])

    for (let i = 0; i < bombs.length; i++) {
        const [x, y, radius] = bombs[i]
        for (let j = 0; j < bombs.length; j++) {
            if (j === i) continue
            const [targetX, targetY, targetRadius] = bombs[j]
            if (getCloseBombs(x, y, radius, targetX, targetY) && !bombsGraph.get(i).includes(j)) bombsGraph.get(i).push(j)
            if (getCloseBombs(targetX, targetY, targetRadius, x, y) && !bombsGraph.get(j).includes(i)) bombsGraph.get(j).push(i)
        }
    }

    let ans = 0

    for (const [key, val] of bombsGraph) {
        const seen = new Set([key])
        getNeighborBombs(val, seen)
        ans = Math.max(ans, seen.size)
    }

    return ans
}

// A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

// Every adjacent pair of words differs by a single letter.
// Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
// sk == endWord
// Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

// Example 1:

// Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
// Output: 5
// Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.

function ladderLength(beginWord, endWord, wordList) {
    if (!wordList.includes(endWord) || beginWord === endWord) return 0
    const seen = new Set([beginWord])

    function getWordMutations(word) {
        const possibleWords = []
        for (let i = 0; i < wordList.length; i++) {
            const listWord = wordList[i]
            let differentLetters = 0
            for (let j = 0; j < word.length; j++) {
                if (word[j] !== listWord[j]) differentLetters++
            }
            if (differentLetters === 1 && !seen.has(listWord)) {
                seen.add(listWord)
                possibleWords.push(listWord)
            }
        }
        return possibleWords
    }

    let queue = [beginWord]
    let steps = 0

    while (queue.length) {
        const nextQueue = []
        const currentLength = queue.length

        for (let i = 0; i < currentLength; i++) {
            const word = queue[i]
            if (word === endWord) return steps + 1
            const wordMutations = getWordMutations(word)
            nextQueue.push(...wordMutations)
        }
        steps++
        queue = nextQueue
    }
    return 0
}