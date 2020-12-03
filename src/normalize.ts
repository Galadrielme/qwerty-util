/**
 * @author kaihua.wang
 * @since 2020-12-01 23:12:37
 * @modify 2020-12-02 00:01:50
 * @description
 */

 /**
  * @class
  * @description Transform input into unified output
  */
class Normalize<I extends any[], O = any, R extends Function = (...args: I) => O> {
    private rule!: R;
    constructor(rule: R) {
        this.rule = rule;
    }
    transform(...args: I): O;
    transform(): O{
        return this.rule.apply(this, arguments);
    }
    static override<A extends any[], R, F = (...args: A) => R>(fn: Function, option: OverrideOption) {

    }

    static $<A extends any[], R, F = (...args: A) => R>(fn: Function, option: {
        /** @description Standardized parameters */
        input?: Normalize<A> | ((...args: A) => any);
        /** @description Standardized returns */
        output?: Normalize<any, R> | ((rtn: any) => R);
        /** @description this */
        context?: any;
        /** @description to override function */
        overrides?: OverrideOption,
        /** @description how to throw an error? */
        throw?: boolean | Function | 'console'
    }) { }
}

type OverrideOption = {
    handler: Function;
    pop?: boolean;
    length?: number | number[];
    test?: (...args: any) => boolean;
    [index: number]: {
        /** @description type of parameter @enum { String, Number, Array, Object... } */
        type: string | string[];
        /** @description test paramter is instanceof Constructor */
        constructor: Function | Function[];
        /** @description test whether the parameter is one of the enumerated values */
        enum: any[],
        /** @description use RegExp.prototype.test */
        reg: RegExp
        /** @description custom test */
        test: (o: any) => boolean
    } | string | RegExp | any[] | ((o: any) => boolean);
}[];
