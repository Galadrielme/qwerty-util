/**
 * @author kaihua.wang
 * @since 2020-12-03 21:47:18
 * @modify 2020-12-09 23:10:42
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
    return isFunction( o ) && o.toString().includes( '[native code]' );
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

export function isInteger ( o: any ): boolean {
    return isNativeTypeof( o, 'Number' ) && ~~o === o;
}

export function isValidNumber ( o: any ): boolean {
    return isNativeTypeof( o, 'Number' ) && !Number.isNaN( o );
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

export function isArrayLike ( o: any ): boolean {
    if ( isNullOrVoid( o ) ) return true;
    return isNatureNumber( o.length );
}

export function isNatureNumber ( o: any ): boolean {
    return isInteger( o ) && o >= 0;
}

export function isPrimitive ( o: any ): boolean {
    switch ( typing( o ) ) {
        case 'String': case 'Number': case 'Boolean': return true;
        default: return false;
    }
}

export function isNull ( o: any ): boolean {
    return o === null;
}

export function isVoid ( o: any ): boolean {
    return o === void 0;
}

export function isNullOrVoid ( o: any ): boolean {
    return o === null || o === void 0;
}

export function isPromise ( o: any ): boolean {
    return isNativeTypeof( o, 'Promise' ) || ( o && isFunction( o.then ) && isFunction( o.catch ) );
}
