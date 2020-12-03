const
    UNCONFIGURABLE = 2 ** 0,
    UNENUMERABLE = 2 ** 1,
    UNWRITABLE = 2 ** 2;

interface EnumGetSet {
    UNCONFIGURABLE: number,
    UNENUMERABLE: number
}
interface EnumValue extends EnumGetSet {
    UNWRITABLE: number
}
interface GetSet<T = any> {
    get?(): T,
    set?(v: T): T
}

/**
 * @description 封装Object.defineProperty
 * @param target 目标对象, 参见Object.defineProperty的第一个参数
 * @param key 键名, 参见Object.defineProperty的第二个参数
 * @param value 值, 参见Descriptor的value
 * @param type 类型, 是否可配置/枚举/写, 不传或传0默认全为true
 */
function defineValueFunction<T = any>(target: any, key: PropertyKey, value: T, type: number = 0) {
    return Object.defineProperty(target, key, {
        configurable: !(UNCONFIGURABLE & type),
        enumerable: !(UNENUMERABLE & type),
        writable: !(UNWRITABLE & type),
        value
    })
}

/**
 * @description 封装Object.defineProperty
 * @param target 目标对象, 参见Object.defineProperty的第一个参数
 * @param key 键名, 参见Object.defineProperty的第二个参数
 * @param {get, set} 值, 参见Descriptor的{get, set}
 * @param type 类型, 是否可配置/枚举, 不传或传0默认全为true
 */
function defineGetSetFunction<T = any>(target: any, key: PropertyKey, { get, set }: GetSet<T>, type: number = 0) {
    return Object.defineProperty(target, key, {
        configurable: !(UNCONFIGURABLE & type),
        enumerable: !(UNENUMERABLE & type),
        get,
        set
    })
}

/**
 * @description 封装Object.defineProperties
 * @param target 目标对象, 参见Object.defineProperty的第一个参数
 * @param defines 属性键值对
 *              如果存在{ value } 则取value
 *              如果存在{ get, set } 则取get, set
 *              否则直接将值作为define的值
 * @param type 类型, 是否可配置/枚举, 不传或传0默认全为true
 */
function defineFunction(target: any, defines: {
    [nama: string]: any
    [nama: number]: any
}, type: number = 0) {
    Object.entries(defines).forEach(([name, define]) => {
        if ('value' in define)
            return defineValueFunction(target, name, define.value, type);
        if (('get' in define && (typeof define.get === 'function')) || ('set' in define && (typeof define.set === 'function')))
            return defineGetSetFunction(target, name, define, type);
        defineValueFunction(target, name, define, type);
    })
}

export let defineValue: EnumValue & typeof defineValueFunction = Object.assign(defineValueFunction, {
    UNCONFIGURABLE,
    UNENUMERABLE,
    UNWRITABLE
})

export let defineGetSet: EnumGetSet & typeof defineGetSetFunction = Object.assign(defineGetSetFunction, {
    UNCONFIGURABLE,
    UNENUMERABLE
});

let define: EnumValue & typeof defineFunction & {
    defineValue: typeof defineValue,
    defineGetSet: typeof defineGetSet
} = Object.assign(defineFunction, {
    UNCONFIGURABLE,
    UNENUMERABLE,
    UNWRITABLE,
    defineValue,
    defineGetSet
})

export default define;
