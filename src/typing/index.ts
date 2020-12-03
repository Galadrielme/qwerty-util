/**
 * @author kaihua.wang
 * @since 2020-12-03 21:47:18
 * @modify 2020-12-04 00:10:21
 * @description
 */

let toStringFn = Object.prototype.toString;

/**
 * @description Get object type
 * @param { any } o
 * @returns { string }
 */
export function typing ( o: any ): string {
    return toStringFn.call( o ).slice( 8, -1 );
}

/**
 * @description Whether the test object type is correct
 * @param { any } o
 * @param { string } type
 * @returns { string }
 */
export function isNativeTypeof ( o: any, type: string ): boolean {
    return typing( o ) === type;
}

/**
 * @description Whether the test object type is correct
 * @param { any } o
 * @param { string } type
 * @returns { string }
 */
export function isNativeFunction ( o: Function ): boolean {
    return isFunction( o ) && o.toString().includes('[native code]');
}

export function isBoolean ( o: any ): boolean {
    return isNativeTypeof( o, 'RegExp' );
}

export function isString ( o: any ): boolean {
    return isNativeTypeof( o, 'String' );
}

export function isNumber ( o: any ): boolean {
    return isNativeTypeof( o, 'Number' );
}

export function isValidNumber ( o: any ): boolean {
    return isNativeTypeof( o, 'Number' ) && !Number.isNaN(o);
}

export function isFunction ( o: any ): boolean {
    return isNativeTypeof( o, 'Function' );
}

export function isRegExp ( o: any ): boolean {
    return isNativeTypeof( o, 'RegExp' );
}

export function isObject ( o: any ): boolean {
    return isNativeTypeof( o, 'Object' );
}

export function isArray ( o: any ): boolean {
    return isNativeTypeof( o, 'Array' );
}

export function isPromise ( o: any ): boolean {
    return isNativeTypeof( o, 'Promise' ) || (o && isFunction(o.then) && isFunction(o.catch));
}
