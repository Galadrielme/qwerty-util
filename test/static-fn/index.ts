/**
 * @author kaihua.wang
 * @since 2020-12-09 21:49:57
 * @modify 2020-12-09 22:01:00
 * @description
 */

import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;

import { toTrue, toFalse, toNull, toVoid, toSelf, toZero, toThis } from '../../src/static-fn';
describe( 'src/static-fn', () => {
    let self = {};
    describe( 'toTrue', () => {
        it( 'toTrue() should be true', () => {
            expect( toTrue() ).to.equal( true );
        } );
    } );

    describe( 'toFalse', () => {
        it( 'toFalse() should be false', () => {
            expect( toFalse() ).to.equal( false );
        } );
    } );

    describe( 'toNull', () => {
        it( 'toNull() should be false', () => {
            expect( toNull() ).to.equal( null );
        } );
    } );

    describe( 'toVoid', () => {
        it( 'toVoid() should be false', () => {
            expect( toVoid() ).to.equal( void 0 );
        } );
    } );

    describe( 'toSelf', () => {
        it( 'toSelf() should be self', () => {
            let self = {};
            expect( toSelf( self ) ).to.equal( self );
        } );
    } );

    describe( 'toThis', () => {
        it( 'toThis() should be this', () => {
            expect( toThis.call( self ) ).to.equal( self );
        } );
    } );
} );
