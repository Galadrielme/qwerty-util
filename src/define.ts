const
    UNCONFIGURABLE = 2 ** 0,
    UNENUMERABLE = 2 ** 1,
    UNWRITABLE = 2 ** 2;
const
    c = UNENUMERABLE | UNWRITABLE,
    e = UNCONFIGURABLE | UNWRITABLE,
    w = UNCONFIGURABLE | UNENUMERABLE,
    ce = UNWRITABLE,
    cw = UNENUMERABLE,
    ew = UNCONFIGURABLE,
    cew = 0;

const EnumGetSet = { UNCONFIGURABLE, UNENUMERABLE, c, e, ce };
const EnumValue = Object.assign(EnumGetSet, { UNWRITABLE, w, cw, ew, cew });

interface GetSet<T = any> {
    get?(): T;
    set?(v: T): T;
}
type QuickEnum = '' | 'c' | 'e' | 'w' | 'ce' | 'cw' | 'ec' | 'ew' | 'wc' | 'we' | 'cew' | 'cwe' | 'ecw' | 'ewc' | 'wce' | 'wec';

/**
 * @description 校验是否可配置
 * @param target
 */
function valid(target: any, key: PropertyKey): number {
    if (target == null) return -1;
    let description = Object.getOwnPropertyDescriptor(target, key);
    if (description && description.configurable === false) return description.writable === false ? UNCONFIGURABLE : UNWRITABLE;
    return 0;
}

const C_TEST = RegExp.prototype.test.bind(/c/i);
const E_TEST = RegExp.prototype.test.bind(/e/i);
const W_TEST = RegExp.prototype.test.bind(/w/i);
/**
 * @description 解析快捷枚举
 * @param { string } type - 快捷枚举
 */
function resolveStringEnum(type: string) {
    let numberEnum: number = 0;
    C_TEST(type) || (numberEnum |= UNCONFIGURABLE);
    E_TEST(type) || (numberEnum |= UNENUMERABLE);
    W_TEST(type) || (numberEnum |= UNWRITABLE);
    return numberEnum === 0 ? UNCONFIGURABLE | UNENUMERABLE | UNWRITABLE : numberEnum;
}

/**
 * @description 封装Object.defineProperty
 * @param target - 目标对象, 参见Object.defineProperty的第一个参数
 * @param key - 键名, 参见Object.defineProperty的第二个参数
 * @param value - 值, 参见Descriptor的value
 * @param type - 类型, 是否可配置/枚举/写, 不传或传0默认全为true
 */
function defineValueFunction<T = any>(target: any, key: PropertyKey, value: T, type: number | QuickEnum = 0) {
    switch (valid(target, key)) {
        case 0: break;
        case UNCONFIGURABLE: return (target[key] = value, target); // 如果不可配置, 但可写, 则直接赋值
        default: return target;
    }
    if (Object.prototype.toString.call(type) === '[object String]') type = resolveStringEnum(type as string);
    return Object.defineProperty(target, key, {
        configurable: !(UNCONFIGURABLE & type as number),
        enumerable: !(UNENUMERABLE & type as number),
        writable: !(UNWRITABLE & type as number),
        value
    })
}

/**
 * @description 封装Object.defineProperty
 * @param target - 目标对象, 参见Object.defineProperty的第一个参数
 * @param key - 键名, 参见Object.defineProperty的第二个参数
 * @param {get, set} - 值, 参见Descriptor的{get, set}
 * @param type - 类型, 是否可配置/枚举, 不传或传0默认全为true
 */
function defineGetSetFunction<T = any>(target: any, key: PropertyKey, { get, set }: GetSet<T>, type: number | QuickEnum = 0) {
    if (valid(target, key)) return target;
    if (Object.prototype.toString.call(type) === '[object String]') type = resolveStringEnum(type as string);
    return Object.defineProperty(target, key, {
        configurable: !(UNCONFIGURABLE & type as number),
        enumerable: !(UNENUMERABLE & type as number),
        get,
        set
    })
}

/**
 * @description 封装Object.defineProperties
 * @param target - 目标对象, 参见Object.defineProperty的第一个参数
 * @param defines - 属性键值对
 *              如果存在{ value } 则取value
 *              如果存在{ get, set } 则取get, set
 *              否则直接将值作为define的值
 * @param type - 类型, 是否可配置/枚举, 不传或传0默认全为true
 */
function defineFunction(target: any, defines: {
    [nama: string]: any
    [nama: number]: any
}, type: number | QuickEnum = 0) {
    if (target == null) return target;
    if (Object.prototype.toString.call(type) === '[object String]') type = resolveStringEnum(type as string);
    Object.entries(defines).forEach(([name, define]) => {
        if (Object.prototype.toString.call(define) === '[object Obejct]') {
            if ('value' in define)
                return defineValueFunction(target, name, define.value, type);
            if (('get' in define && (typeof define.get === 'function')) || ('set' in define && (typeof define.set === 'function')))
                return defineGetSetFunction(target, name, define, type);
        }
        defineValueFunction(target, name, define, type);
    })
}

export let defineValue = Object.assign(defineValueFunction, EnumValue)

export let defineGetSet = Object.assign(defineGetSetFunction, EnumGetSet);

let define = Object.assign(defineFunction, EnumGetSet, {
    defineValue,
    defineGetSet
})

export default define;
