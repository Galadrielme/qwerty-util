/**
 * @author kaihua.wang
 * @since 2020-12-03 21:17:20
 * @modify 2020-12-04 00:37:16
 * @description
 */
import { NormalizeTypeItf } from '../type';
import { isArray, isFunction, isNumber, isValidNumber, typing } from '../../typing'
import { toTrue } from 'src/static-fn';

let KEY= {};

class NormalizeNumber implements NormalizeTypeItf<any, number> {
    private readonly __data__!: ( key: any ) => NormalizeTypeItf<any, number>;
    constructor () { }
    test ( i: any ): boolean {
        return this.__data__( KEY ).test( i );
    }
    transfer ( i: any ): number {
        return this.__data__( KEY ).transfer( i );
    }

}

function initialization ( instance: NormalizeNumber, option: NormalizeNumberInitializationOption ): NormalizeTypeItf<any, number>  {
    switch ( typing( option ) ) {
        case 'Object': {
            let o: any = option;
            //#region case 1
            if ( isFunction( o.test ) && isFunction( o.transfer ) ) {
                let { test, transfer } = o;
                return { test, transfer }
            }
            //#endregion

            let { range, fixed, enums, skip, round } = o;
            let roundFn: Function = Math.floor;
            if ( round != null ) switch ( round ) { case 'ceil': case 'C': case 1: roundFn = Math.ceil; break; case 'floor': case 'F': case 0: roundFn = Math.floor; break; }

            let normalizedRange:any[] = normalizeRange( range );
            let inRange: ( n: number ) => boolean = normalizedRange && normalizedRange.length > 0 ? function inRange ( n: number ) {
                return normalizedRange.every( r => {
                    for ( let key in r ) {
                        switch ( key ) {
                            case 'gt': { if ( r.gt >= n ) return false; break; }
                            case 'gte': { if ( r.gte > n ) return false; break; }
                            case 'lt': { if ( r.lt <= n ) return false; break; }
                            case 'lte': { if ( r.lte < n ) return false; break; }
                        }
                        return true;
                    }
                })
            } : toTrue; 0;
            if ( isArray( enums ) ) {
                enums = normalizedRange.length > 0 ? enums.filters(inRange) :enums.slice( 0 );
            }

        }
        case 'String':
    }
    /** @todo */
    return {} as any;
}


function normalizeRange ( range: NormalizeNumberInitializationOptionRange[] ): {gt?: number, gte?: number, lt?: number, lte?: number}[] {
    let normalized: any[] = [];
    if ( isArray( range ) ) {
        range.forEach( ( item ) => {
            switch ( typing( item ) ) {
                case 'String': {
                    let s = item as string;
                    s = s.trim();
                    let left = '(['.indexOf( s[ 0 ] );
                    if ( left < 0 ) return;
                    let right = ')]'.indexOf( s[ s.length - 1 ] );
                    if ( right < 0 ) return;
                    s = s.slice( 1, -1 );
                    let ns: number[] = [];
                    for ( let c of s.split(',') ) {
                        if ( !c ) return;
                        let n = Number( c );
                        if ( Number.isNaN( n ) ) return;
                        ns.push( n );
                    }
                    switch ( ns.length ) {
                        case 1: {
                            if ( !left && !right ) return;
                            let r: any = {};
                            r[ left ? 'gte' : 'gt' ] = left ? ns[ 0 ] : -Infinity;
                            r[ right ? 'lte' : 'lt' ] = right ? [ ns[ 0 ] ] : Infinity;
                            return normalized.push(r);
                        }
                        case 2: {
                            let r: any = {};
                            let [ $1, $2 ] = ns;

                            r[ left ? 'gte' : 'gt' ] = ns[ 0 ];
                            r[ right ? 'lte' : 'lt' ] =  ns[ 1 ] ;
                            return normalized.push(r);
                        }
                    }
                }
                case 'Object': {
                    let o = item as { gt: number, gte: number, lt: number, lte: number; };
                    let hasGt = isValidNumber( o.gt ),
                        hasGte = isValidNumber( o.gte ),
                        hasLt = isValidNumber( o.lt ),
                        hasLte = isValidNumber( o.lte ),
                        hasLeft = hasGt || hasGte,
                        hasRight = hasLt || hasLte;
                    if ( !hasLeft && !hasRight ) return;
                    let r: any = {}
                    if ( hasLeft ) o.gt > o.gte ? ( r.gt = o.gt ) : ( r.gte = o.gte );
                    if ( hasRight ) o.lt < o.lte ? ( r.lt = o.lt ) : ( r.lte = o.lte );
                    normalized.push(r);
                }
            }
        })
    }
    return normalized;
}

type NormalizeNumberInitializationOption = {
    /**
     * @description Range of number
     * @example {
     *      #1: '(1, 2)'                        ==> n > 1 && n < 2;
     *      #2: '[1, 2]'                        ==> n >= 1 && n <= 2;
     *      #3: [1, 2]                          ==> n >= 1 && n <= 2;
     *      #4: [[1, 2], {gt: 3, lte: 5}]       ==> (n >= 1 && n <= 2) || (n > 3 && n <= 5);
     * }
     */
    range?: NormalizeNumberInitializationOptionRange[];
    /**
     * @description Convert digital precision
     */
    fixed?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
    /**
     * @description Enumerated numbers
     */
    enums?: number[],
    /**
     * @description Number interval
     */
    skip?: { mark: number, step: number }
    /**
     * @description Which method to use to convert numbers? [Math.round, Math.floor, Math.ceil]
     * @default 'round'
     */
    round?: 'round' | 'ceil' | 'floor' | 'R' | 'C' | 'F' | 0 | 1
} | {
    /**
     * @description Custom function test
     */
    test ( i: any ): boolean,
    /**
     * @description Custom function transfer
     */
    transfer ( i: any ): number
}
    |
    /**
     * @description expression
     * @example {
     *      (expression)|(expression)|(expression)...
     *
     *      e.g: '.0|(5,10)|(15,20)|{6,7,8,16,17}|%3-1|R'
     *      #1: .0                              ==> { fixed: 0 },
     *      #2: (5,10)|(15,20)                  ==> { range: [{gt: 5, lt: 10}, {gt: 15, lt: 20}] }
     *      #3: {6,7,8,16,17}                   ==> { enums: [6, 7, 8, 16, 17] }
     *      #4: 1+3                             ==> { skip: { start: 1, step: 3 } }
     *      #5: R                               ==> { round: R }
     *
     *      Shortcut:
     *      N: Natural number                   ==> { fixed: 0, range: [{gte: 0}] }
     *      I: Integer                          ==> { fixed: 0 }
     * }
     */
    string;

type NormalizeNumberInitializationOptionRange = ( {gt?: number, gte?: number, lt?: number, lte?: number}) | string
