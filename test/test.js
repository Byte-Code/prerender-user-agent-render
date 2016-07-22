/**
 * Created by Samuele on 7/20/16.
 */
'use strict';

var pUserAgentRender = require('../');

const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');


describe('Prerender User Agent Render', function() {
    let sandbox;
    beforeEach(function(){
        sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('User Agent Render', function(){

        it('Success', function() {

            var fakeThen = {
                then: sinon.stub()
            };


            var fakePrerender = {
                run: function() {
                    return fakeThen;
                }
            };

            var phantom = {};
            var req = { headers: {}, prerender: {page: fakePrerender} };
            var res = {};
            var fakeNext = sinon.stub;

            req.headers['user-agent'] = 'mobile' ;


            pUserAgentRender.onPhantomPageCreate(phantom, req, res, fakeNext);

            assert(fakeThen.then.called);

        });

    });

});