import _ from 'lodash'


const stringer = value => typeof value === 'string' ? `'${value}'` : value


const plain = (objs, pref = '') => {
    const result = []
    for (const obj of objs) {
        const { key, type } = obj
        if (type === 'added') {
            const value = _.isObject(obj.value) ? '[complex value]' : stringer(obj.value)
            result.push(`Property '${pref}${key}' was added with value: ${value}`)
        } else if (type === 'removed') {
            result.push(`Property '${pref}${key}' was removed`)
        } else if (type === 'changed') {
            const oldValue = _.isObject(obj.oldValue) ? '[complex value]' : stringer(obj.oldValue)
            const newValue = _.isObject(obj.newValue) ? '[complex value]' : stringer(obj.newValue)
            result.push(`Property '${pref}${key}' was updated. From ${oldValue} to ${newValue}`)
        } else if (type === 'nested') {
            result.push(plain(obj.children, pref + `${key}.`))
        }
    }

    return result.join('\n')
}

const formatter = (objs) => plain(objs)

export default formatter