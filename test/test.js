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
    let isMobile = false;
    let isTablet = false;
    let isDesktop = false;
    let isBot = false;
    let userAgent = 'Normal';
    let defaultUserAgent = 'Not set';
    var spyResolve;


    beforeEach(function(){
        sandbox = sinon.sandbox.create();
        spyResolve = sandbox.spy();

        pUserAgentRender.settings = {userAgent: defaultUserAgent};

    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('Mobile', function(){

        beforeEach(function() {
            isMobile = true;
            isBot = false;
        });

        afterEach(function(){
            isMobile = false;
            isBot = false;
        });

        it('The user agent is mobile', function() {
            userAgent = 'iPhone';

            pUserAgentRender.renderLogic(userAgent, isMobile, isTablet, isDesktop, isBot, spyResolve);

            assert(spyResolve.called);
            assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.screenDeviceRender.mobile.width);
            assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.screenDeviceRender.mobile.height);

            assert.equal(pUserAgentRender.settings.userAgent, userAgent);
        });

        it('The user agent is bot mobile', function() {
            userAgent = 'Google Bot';
            isBot = true;

            pUserAgentRender.renderLogic(userAgent, isMobile, isTablet, isDesktop, isBot, spyResolve);

            assert(spyResolve.called);
            assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.screenDeviceRender.mobile.width);
            assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.screenDeviceRender.mobile.height);

            assert.equal(pUserAgentRender.settings.userAgent, defaultUserAgent);
        });
    });

    describe('Tablet', function(){

        beforeEach(function() {
            isTablet = true;
            isBot = false;
        });

        afterEach(function() {
            isTablet = false;
            isBot = false;
        });

        it('The user agent is tablet', function() {
            userAgent = 'iPad';

            pUserAgentRender.renderLogic(userAgent, isMobile, isTablet, isDesktop, isBot, spyResolve);

            assert(spyResolve.called);
            assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.screenDeviceRender.tablet.width);
            assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.screenDeviceRender.tablet.height);

            assert.equal(pUserAgentRender.settings.userAgent, userAgent);
        });

        it('The user agent is tablet bot', function() {
            userAgent = 'Google Bot';

            isBot = true;

            pUserAgentRender.renderLogic(userAgent, isMobile, isTablet, isDesktop, isBot, spyResolve);

            assert(spyResolve.called);
            assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.screenDeviceRender.tablet.width);
            assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.screenDeviceRender.tablet.height);

            assert.equal(pUserAgentRender.settings.userAgent, defaultUserAgent);
        });
    });

    describe('Desktop', function(){

        beforeEach(function() {
            isDesktop = true;
            isBot = false;
        });

        afterEach(function() {
            isDesktop = false;
            isBot = false;
        });

        it('The user agent is desktop', function() {
            userAgent = 'Google Chrome';

            pUserAgentRender.renderLogic(userAgent, isMobile, isTablet, isDesktop, isBot, spyResolve);

            assert(spyResolve.called);
            assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.screenDeviceRender.desktop.width);
            assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.screenDeviceRender.desktop.height);

            assert.equal(pUserAgentRender.settings.userAgent, userAgent);
        });

        it('The user agent is desktop bot', function() {
            userAgent = 'Google Bot';

            isBot = true;

            pUserAgentRender.renderLogic(userAgent, isMobile, isTablet, isDesktop, isBot, spyResolve);

            assert(spyResolve.called);
            assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.screenDeviceRender.desktop.width);
            assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.screenDeviceRender.desktop.height);

            assert.equal(pUserAgentRender.settings.userAgent, defaultUserAgent);
        });
    });

    describe('The device type is not recognized', function(){

        afterEach(function(){
            isBot = false;
        });

        it('Device not recognized', function(){
            userAgent = 'Not recognized';

            pUserAgentRender.renderLogic(userAgent, isMobile, isTablet, isDesktop, isBot, spyResolve);

            assert(spyResolve.called);
            assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.screenDeviceRender.desktop.width);
            assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.screenDeviceRender.desktop.height);

            assert.equal(pUserAgentRender.settings.userAgent, userAgent);
        });

        it('Device not recognized but is a bot', function(){
            userAgent = 'Not recognized';
            isBot = true;

            pUserAgentRender.renderLogic(userAgent, isMobile, isTablet, isDesktop, isBot, spyResolve);

            assert(spyResolve.called);
            assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.screenDeviceRender.desktop.width);
            assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.screenDeviceRender.desktop.height);

            assert.equal(pUserAgentRender.settings.userAgent, defaultUserAgent);
        });

    });
});