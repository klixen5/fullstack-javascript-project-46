import fs from 'node:fs'
import path from 'node:path'
import _ from 'lodash'
import parse from './parsers.js'

const genDiff = (filepath1, filepath2, format) => {
    const path1 = path.resolve(filepath1)
    const path2 = path.resolve(filepath2)
    const data1 = fs.readFileSync(path1, 'utf-8')
    const data2 = fs.readFileSync(path2, 'utf-8')
    const ext = path.extname(filepath1)
    let parse1 = parse(data1, ext)
    let parse2 = parse(data2, ext)
    const result = []
    const keys1 = Object.keys(parse1)
    const keys2 = Object.keys(parse2)
    const allKeys = _.union(keys1, keys2).sort((a, b) => a.localeCompare(b))

    result.push('{')
    allKeys.forEach(key => {
        if (!Object.hasOwn(parse1, key)) {
            result.push(`  + ${key}: ${parse2[key]}`)
        } 
        else if (!Object.hasOwn(parse2, key)) {
            result.push(`  - ${key}: ${parse1[key]}`)
        }
        else if (parse1[key] === parse2[key]) {
            result.push(`    ${key}: ${parse1[key]}`)
        } else {
            result.push(`  - ${key}: ${parse1[key]}\n  + ${key}: ${parse2[key]}`)
        }
    })
    result.push('}')

    return result.join('\n')
}

export default genDiff