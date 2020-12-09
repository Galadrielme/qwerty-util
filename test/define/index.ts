/**
 * @author kaihua.wang
 * @since 2020-12-08 21:49:27
 * @modify 2020-12-09 21:57:28
 * @description
 */
import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;

import define, { defineGetSet, defineValue } from '../../src/define';
describe( 'src/define', () => {
    describe( 'define', () => {

        let o: any = {};
        define( o, {
            a: {
                get: () => 1
            },
            b: {
                value: 2
            },
            c: 3
        }, 'cwe' );

        it( 'define o.a should be 1', () => {
            expect( o.a ).to.equal( 1 );
        } );

        it( 'define o.b should be 2', () => {
            expect( o.b ).to.equal( 2 );
        } );

        it( 'define o.c should be 3', () => {
            expect( o.c ).to.equal( 3 );
        } );
    } );
} );

