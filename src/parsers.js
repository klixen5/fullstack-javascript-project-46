import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const yaml = require('js-yaml')

const parse = (data, extname) => {
    if (extname === '.json') {
        return JSON.parse(data)
    } else if (extname === '.yml' || extname === '.yaml') {
        return yaml.load(data)
    }

    return ''
}

export default parse