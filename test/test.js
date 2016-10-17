/**
 * Created by Samuele on 7/20/16.
 */
'use strict';

var pUserAgentRender = require('../');

var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon');

describe('Prerender User Agent Render', function () {

    var screenDeviceRender= {
        mobile: {width: 320, height: 480},
        tablet: {width: 768, height: 1024},
        desktop: {width: 1440, height: 718}
    };

    var sandbox;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('User Agent Render', function () {

        it('Run function is corrected call', function () {

            var fakeThen = {
                then: sinon.stub()
            };

            var fakePrerender = {
                run: function () {
                    return fakeThen;
                }
            };

            var phantom = {},
                req = {headers: {}, prerender: {page: fakePrerender}},
                res = {},
                fakeNext = sinon.stub;

            req.headers['user-agent'] = 'mobile';

            pUserAgentRender.onPhantomPageCreate(phantom, req, res, fakeNext);

            assert(fakeThen.then.called);

        });

        describe('User Agent test', function () {

            var defaultUserAgent = 'default';

            var spyResolve = sinon.stub();

            beforeEach(function () {

                pUserAgentRender.settings = { userAgent: defaultUserAgent};

            });

            function createUserAgentParsed(mobile, tablet, bot) {
                var ua = {
                    isMobile: mobile,
                    isTablet: tablet,
                    isBot: bot
                };

                return ua;
            }

            it('Mobile', function () {

                var userAgent = 'Mobile';

                var ua = createUserAgentParsed(true, false, false);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, userAgent);
                assert.equal(pUserAgentRender.viewportSize.width, screenDeviceRender.mobile.width);
                assert.equal(pUserAgentRender.viewportSize.height, screenDeviceRender.mobile.height);
            });

            it('Mobile Bot', function () {

                var userAgent = 'Mobile Bot';

                var ua = createUserAgentParsed(true, false, true);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, defaultUserAgent);
                assert.equal(pUserAgentRender.viewportSize.width, screenDeviceRender.mobile.width);
                assert.equal(pUserAgentRender.viewportSize.height, screenDeviceRender.mobile.height);
            });

            it('Tablet', function () {

                var userAgent = 'Tablet';

                var ua = createUserAgentParsed(false, true, false);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, userAgent);
                assert.equal(pUserAgentRender.viewportSize.width, screenDeviceRender.tablet.width);
                assert.equal(pUserAgentRender.viewportSize.height, screenDeviceRender.tablet.height);
            });

            it('Tablet Bot', function () {

                var userAgent = 'Tablet Bot';

                var ua = createUserAgentParsed(false, true, true);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, defaultUserAgent);
                assert.equal(pUserAgentRender.viewportSize.width, screenDeviceRender.tablet.width);
                assert.equal(pUserAgentRender.viewportSize.height, screenDeviceRender.tablet.height);
            });

            it('Desktop', function () {

                var userAgent = 'Desktop';

                var ua = createUserAgentParsed(false, false, false);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, userAgent);
                assert.equal(pUserAgentRender.viewportSize.width, screenDeviceRender.desktop.width);
                assert.equal(pUserAgentRender.viewportSize.height, screenDeviceRender.desktop.height);
            });

            it('Desktop Bot', function () {

                var userAgent = 'Desktop Bot';

                var ua = createUserAgentParsed(false, false, true);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, defaultUserAgent);
                assert.equal(pUserAgentRender.viewportSize.width, screenDeviceRender.desktop.width);
                assert.equal(pUserAgentRender.viewportSize.height, screenDeviceRender.desktop.height);
            });

            it('Both Mobile and Tablet, Tablet is choose', function () {

                var userAgent = 'Tablet';

                var ua = createUserAgentParsed(true, true, false);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, userAgent);
                assert.equal(pUserAgentRender.viewportSize.width, screenDeviceRender.tablet.width);
                assert.equal(pUserAgentRender.viewportSize.height, screenDeviceRender.tablet.height);
            });

            it('Both Mobile Bot and Tablet Bot, Tablet Bot is choose', function () {

                var userAgent = 'Tablet Bot';

                var ua = createUserAgentParsed(true, true, true);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, defaultUserAgent);
                assert.equal(pUserAgentRender.viewportSize.width, screenDeviceRender.tablet.width);
                assert.equal(pUserAgentRender.viewportSize.height, screenDeviceRender.tablet.height);
            });

        });
    });

});