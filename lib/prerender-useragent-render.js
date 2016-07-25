/**
 * Created by Samuele on 7/20/16.
 */
'use strict';

var userAgentParser = require('express-useragent');

let screenDeviceRender= {
    mobile: {width: 320, height: 480},
    tablet: {width: 768, height: 1024},
    desktop: {width: 1024, height: 600}
};

let userAgentRender = function (userAgent, ua, resolve) {

    if(ua.isTablet) {
        this.viewportSize = {
            width: screenDeviceRender.tablet.width,
            height: screenDeviceRender.tablet.height
        };
    } else if (ua.isMobile) {
        this.viewportSize = {
            width: screenDeviceRender.mobile.width,
            height: screenDeviceRender.mobile.height
        };

    } else {
        this.viewportSize = {
            width: screenDeviceRender.desktop.width,
            height: screenDeviceRender.desktop.height
        };
    }


    if (!ua.isBot) {
        this.settings.userAgent = userAgent;
    }

    resolve();
};


module.exports = {
    onPhantomPageCreate: function (phantom, req, res, next) {
        const userAgent = req.headers['user-agent'];
        const ua = userAgentParser.parse(userAgent);

        req.prerender.page.run(userAgent, ua, userAgentRender).then(next);
    },

    testLogic: userAgentRender,
    testConst: screenDeviceRender
};
