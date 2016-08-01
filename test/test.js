/**
 * Created by Samuele on 7/20/16.
 */
'use strict';

var pUserAgentRender = require('../');

var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon');

describe('Prerender User Agent Render', function () {

    let sandbox;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('User Agent Render', function () {

        it('Run function is corrected call', function () {

            let fakeThen = {
                then: sinon.stub()
            };

            let fakePrerender = {
                run: function () {
                    return fakeThen;
                }
            };

            let phantom = {},
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

                let userAgent = 'Mobile';

                let ua = createUserAgentParsed(true, false, false);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, userAgent);
                assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.testConst.mobile.width);
                assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.testConst.mobile.height);
            });

            it('Mobile Bot', function () {

                let userAgent = 'Mobile Bot';

                let ua = createUserAgentParsed(true, false, true);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, defaultUserAgent);
                assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.testConst.mobile.width);
                assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.testConst.mobile.height);
            });

            it('Tablet', function () {

                let userAgent = 'Tablet';

                let ua = createUserAgentParsed(false, true, false);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, userAgent);
                assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.testConst.tablet.width);
                assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.testConst.tablet.height);
            });

            it('Tablet Bot', function () {

                let userAgent = 'Tablet Bot';

                let ua = createUserAgentParsed(false, true, true);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, defaultUserAgent);
                assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.testConst.tablet.width);
                assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.testConst.tablet.height);
            });

            it('Desktop', function () {

                let userAgent = 'Desktop';

                let ua = createUserAgentParsed(false, false, false);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, userAgent);
                assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.testConst.desktop.width);
                assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.testConst.desktop.height);
            });

            it('Desktop Bot', function () {

                let userAgent = 'Desktop Bot';

                let ua = createUserAgentParsed(false, false, true);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, defaultUserAgent);
                assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.testConst.desktop.width);
                assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.testConst.desktop.height);
            });

            it('Both Mobile and Tablet, Tablet is choose', function () {

                let userAgent = 'Tablet';

                let ua = createUserAgentParsed(true, true, false);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, userAgent);
                assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.testConst.tablet.width);
                assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.testConst.tablet.height);
            });

            it('Both Mobile Bot and Tablet Bot, Tablet Bot is choose', function () {

                let userAgent = 'Tablet Bot';

                let ua = createUserAgentParsed(true, true, true);

                pUserAgentRender.testLogic(userAgent, ua, spyResolve);

                assert(spyResolve.called);
                assert.equal(pUserAgentRender.settings.userAgent, defaultUserAgent);
                assert.equal(pUserAgentRender.viewportSize.width, pUserAgentRender.testConst.tablet.width);
                assert.equal(pUserAgentRender.viewportSize.height, pUserAgentRender.testConst.tablet.height);
            });

        });
    });

});