import gendiff from '../src/index.js'

import { readFileSync } from 'node:fs'

import path from 'node:path'

const dirname = import.meta.dirname
let result
let result2

beforeAll(() => {
    result = readFileSync(path.join(dirname, '__fixtures__', 'result.txt'), 'utf-8').trim()
    result2 = readFileSync(path.join(dirname, '__fixtures__', 'result2.txt'), 'utf-8').trim()
})

describe('gendiff', () => {
    test('json', () => {
        const json1 = path.join(dirname, '__fixtures__', 'json', 'file1.json')
        const json2 = path.join(dirname, '__fixtures__', 'json', 'file2.json')
        const json3 = path.join(dirname, '__fixtures__', 'json', 'file3.json')
        const json4 = path.join(dirname, '__fixtures__', 'json', 'file4.json')
        expect(gendiff(json1, json2, 'stylish')).toBe(result)
        expect(gendiff(json3, json4, 'stylish')).toBe(result2)
    })

    test('yaml', () => {
        const yaml1 = path.join(dirname, '__fixtures__', 'yaml', 'file1.yml')
        const yaml2 = path.join(dirname, '__fixtures__', 'yaml', 'file2.yml')
        const yaml3 = path.join(dirname, '__fixtures__', 'yaml', 'file3.yaml')
        const yaml4 = path.join(dirname, '__fixtures__', 'yaml', 'file4.yml')
        const yaml5 = path.join(dirname, '__fixtures__', 'yaml', 'file5.yml')
        expect(gendiff(yaml1, yaml2, 'stylish')).toBe(result)
        expect(gendiff(yaml1, yaml3, 'stylish')).toBe(result)
        expect(gendiff(yaml4, yaml5, 'stylish')).toBe(result2)
    })
})