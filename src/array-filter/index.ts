/**
 * @author kaihua.wang
 * @since 2020-12-09 22:42:32
 * @modify 2020-12-09 23:19:23
 * @description
 */

import { isArrayLike, isFunction, typing } from 'src/typing';

let filterFn = Array.prototype.filter || function filter<T> ( this: T[], predicate: ( value: T, index: number, array: T[] ) => unknown, thisArg?: any ): T[] {
    let newArray = [];
    for ( let i = 0, len = this.length - 1; i < len; i++ ) predicate( this[ i ], i, this ) && newArray.push( this[ i ] );
    return newArray;
};
type FilterCallbackFn<T> = ( value: T, index: number, array: T[] ) => T;
function filter<T> ( array: ArrayLike<T>, ...filters: FilterCallbackFn<T>[] ) {
    if ( !isArrayLike( array ) ) return [];
    try {
        let newArray: T[] = array as T[];
        ( filters as FilterCallbackFn<T>[] ).forEach( filter => {
            if ( isFunction( filter ) )
                filterFn.call( newArray, filter );
        } );
        if ( newArray !== array ) return newArray;
    } catch ( e ) {

    }
    return Array.prototype.slice.call( array );
}

export default filter;
