import gendiff from '../src/index.js'

import { readFileSync } from 'node:fs'

import path from 'node:path'

const dirname = import.meta.dirname
let result

beforeAll(() => {
    result = readFileSync(path.join(dirname, '__fixtures__', 'result.txt'), 'utf-8').trim() 
})

describe('gendiff', () => {
    test('json', () => {
        const json1 = path.join(dirname, '__fixtures__', 'json', 'file1.json')
        const json2 = path.join(dirname, '__fixtures__', 'json', 'file2.json')
        expect(gendiff(json1, json2)).toBe(result)
    })

    test('yaml', () => {
        const yaml1 = path.join(dirname, '__fixtures__', 'yaml', 'file1.yml')
        const yaml2 = path.join(dirname, '__fixtures__', 'yaml', 'file2.yml')
        const yaml3 = path.join(dirname, '__fixtures__', 'yaml', 'file3.yaml')
        expect(gendiff(yaml1, yaml2)).toBe(result)
        expect(gendiff(yaml1, yaml3)).toBe(result)
    })
})