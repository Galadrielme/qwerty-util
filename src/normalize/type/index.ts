/**
 * @author kaihua.wang
 * @since 2020-12-03 21:18:12
 * @modify 2020-12-03 23:05:51
 * @description
 */

 /**
  * @description Type canonical interface
  * @interface
  */
export interface NormalizeTypeItf<I = any, O = any> {
    /**
     * @description Test object format
     * @param { I } i - target
     * @returns { boolean }
     */
    test(i: I): boolean;
    /**
     * @description Normalize I to O
     * @param { I } i - target
     * @returns { boolean }
     */
    transfer ( i: I ): O;

    toString (): string;
}
