import gendiff from '../src/index.js'

import { readFileSync } from 'node:fs'

import path from 'node:path'

const dirname = import.meta.dirname
let result1, result2, result3
let json1, json2, json3, json4
let yaml1, yaml2, yaml3, yaml4, yaml5

beforeAll(() => {
    result1 = readFileSync(path.join(dirname, '__fixtures__', 'result1.txt'), 'utf-8').trim()
    result2 = readFileSync(path.join(dirname, '__fixtures__', 'result2.txt'), 'utf-8').trim()
    result3 = readFileSync(path.join(dirname, '__fixtures__', 'result3.txt'), 'utf-8').trim()
    json1 = path.join(dirname, '__fixtures__', 'json', 'file1.json')
    json2 = path.join(dirname, '__fixtures__', 'json', 'file2.json')
    json3 = path.join(dirname, '__fixtures__', 'json', 'file3.json')
    json4 = path.join(dirname, '__fixtures__', 'json', 'file4.json')
    yaml1 = path.join(dirname, '__fixtures__', 'yaml', 'file1.yml')
    yaml2 = path.join(dirname, '__fixtures__', 'yaml', 'file2.yml')
    yaml3 = path.join(dirname, '__fixtures__', 'yaml', 'file3.yaml')
    yaml4 = path.join(dirname, '__fixtures__', 'yaml', 'file4.yml')
    yaml5 = path.join(dirname, '__fixtures__', 'yaml', 'file5.yml')
})

describe('gendiff', () => {
    test('json-stylish', () => {
        expect(gendiff(json1, json2, 'stylish')).toBe(result1)
        expect(gendiff(json3, json4, 'stylish')).toBe(result2)
    })

    test('json-plain', () => {
        expect(gendiff(json3, json4, 'plain')).toBe(result3)
    })

    test('yaml-stylish', () => {
        expect(gendiff(yaml1, yaml2, 'stylish')).toBe(result1)
        expect(gendiff(yaml1, yaml3, 'stylish')).toBe(result1)
        expect(gendiff(yaml4, yaml5, 'stylish')).toBe(result2)
    })

    test('yaml-plain', () => {
        expect(gendiff(yaml4, yaml5, 'plain')).toBe(result3)
    })
})