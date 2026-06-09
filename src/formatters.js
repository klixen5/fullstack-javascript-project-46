import _ from 'lodash'

const standart = (object, depth, spacesCount = 4) => {
    if (!_.isPlainObject(object)) {
        return object
    }

    const result = ['{']
    for (const [key, value] of Object.entries(object)) {
        result.push(`${' '.repeat(spacesCount * depth)}${key}: ${standart(value, depth + 1)}`)
    }
    result.push(' '.repeat(spacesCount * depth - spacesCount) + '}')

    return result.join('\n')
}

const formatters = (objs, format) => {
    if (format === 'stylish') {
        const spacesCount = 4
        const stylish = (objs, depth) => {
            const result = ['{']
            for (const obj of objs) {
                const { key, type } = obj
                if (type === 'added') {
                    const value = standart(obj.value, depth + 1)
                    result.push(`${' '.repeat(spacesCount * depth - 2)}` + `+ ${key}: ${value}`) 
                } else if (type === 'removed') {
                    const value = standart(obj.value, depth + 1)
                    result.push(`${' '.repeat(spacesCount * depth - 2)}` + `- ${key}: ${value}`)
                } else if (type === 'changed') {
                    const oldValue = standart(obj.oldValue, depth + 1)
                    const newValue = standart(obj.newValue, depth + 1)
                    result.push(`${' '.repeat(spacesCount * depth - 2)}` + `- ${key}: ${oldValue}`,
                     `${' '.repeat(spacesCount * depth - 2)}` + `+ ${key}: ${newValue}`)
                } else if (type === 'unchanged') {
                    const value = standart(obj.value, depth + 1)
                    result.push(`${' '.repeat(spacesCount * depth)}` + `${key}: ${value}`)
                }
                else {
                    const stylishChildren = stylish(obj.children, depth + 1)
                    result.push(`${' '.repeat(spacesCount * depth)}` + `${key}: ${stylishChildren}`)
                }
            }
            result.push(`${' '.repeat(spacesCount * depth - spacesCount)}` + '}')
            return result.join('\n')
        }

        return stylish(objs, 1)
    }
}

export default formatters