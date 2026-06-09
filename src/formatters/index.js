import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const formatters = {
    stylish,
    plain,
    json
}

export default (objs, format) => formatters[format](objs) ?? 'Такого формата нет'
