import fs from 'node:fs'
import path from 'node:path'

const genDiff = (filepath1, filepath2, format) => {
    const path1 = path.isAbsolute(filepath1) ? filepath1 : path.resolve(filepath1)
    const path2 = path.isAbsolute(filepath2) ? filepath2 : path.resolve(filepath2)
    const data1 = fs.readFileSync(path1, 'utf-8')
    const data2 = fs.readFileSync(path2, 'utf-8')
    const ext = path.extname(filepath1)
    let parse1
    let parse2
    if (ext === '.json') {
        parse1 = JSON.parse(data1)
        parse2 = JSON.parse(data2)
    }

    return ''
}

export default genDiff