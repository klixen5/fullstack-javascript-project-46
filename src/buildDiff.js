import _ from 'lodash'

const buildDiff = (obj1, obj2) => {
    const result = []
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    const keys = _.union(keys1, keys2).sort((a, b) => a.localeCompare(b))
    for (const key of keys) {
        const build = { key: `${key}` }
        if (!Object.hasOwn(obj1, key)) {
            build.type = 'added'
            build.value = obj2[key]
            result.push(build)
        } else if (!Object.hasOwn(obj2, key)) {
            build.type = 'removed'
            build.value = obj1[key]
            result.push(build)
        } else if (_.isEqual(obj1[key], obj2[key])) {
            build.type = 'unchanged'
            build.value = obj1[key]
            result.push(build)
        } else if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
            build.type = 'nested'
            build.children = buildDiff(obj1[key], obj2[key])
            result.push(build)
        } else {
            build.type = 'changed'
            build.oldValue = obj1[key]
            build.newValue = obj2[key]
            result.push(build)
        }
    }

    return result
}

export default buildDiff