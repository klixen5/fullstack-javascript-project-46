import gendiff from '../src/index.js'

import { readFileSync } from 'node:fs'

import path from 'node:path'

let result
let path1
let path2

beforeAll(() => {
    const dirname = import.meta.dirname
    result = readFileSync(path.join(dirname, '__fixtures__', 'result.txt'), 'utf-8').trim()
    path1 = path.join(dirname, '__fixtures__', 'file1.json')
    path2 = path.join(dirname, '__fixtures__', 'file2.json')
})

describe('gendiff', () => {
    test('equals', () => {
        expect(gendiff(path1, path2)).toBe(result)
    })
})