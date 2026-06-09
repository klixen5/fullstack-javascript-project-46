import fs from 'node:fs'
import path from 'node:path'
import parse from './parsers.js'
import buildDiff from './buildDiff.js'
import formatters from './formatters.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
    const path1 = path.resolve(filepath1)
    const path2 = path.resolve(filepath2)
    const data1 = fs.readFileSync(path1, 'utf-8')
    const data2 = fs.readFileSync(path2, 'utf-8')
    const ext = path.extname(filepath1)
    let parse1 = parse(data1, ext)
    let parse2 = parse(data2, ext)
    const objs = buildDiff(parse1, parse2)
    return formatters(objs, format)
}

export default genDiff