/**
 * @author kaihua.wang
 * @since 2020-12-04 00:16:12
 * @modify 2020-12-09 21:47:25
 * @description
 */

export function toFalse ( ...args: any[] ): false;
export function toFalse () { return false; }

export function toTrue ( ...args: any[] ): true;
export function toTrue () { return true; }

export function toNull ( ...args: any[] ): null;
export function toNull () { return null; }

export function toVoid ( ...args: any[] ): undefined;
export function toVoid () { return void 0; }

export function toSelf<T> ( self: T, ...args: any ): T;
export function toSelf<T> ( self: T ): T { return self; }

export function toZero ( ...args: any ): 0;
export function toZero () { return 0; }

export function toThis<T> ( this: T, ...args: any ): 0;
export function toThis<T> ( this: T ) { return this; }
