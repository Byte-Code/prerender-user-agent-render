/**
 * Created by Samuele on 7/20/16.
 */
'use strict';

var userAgentParser = require('express-useragent');

module.exports = {
    screenDeviceRender: {
        mobile: {width: 320, height: 480},
        tablet: {width: 768, height: 1024},
        desktop: {width: 1024, height: 600}
    },

    renderLogic : function (userAgent, isMobile, isTablet, isDesktop, isBot, resolve) {
        if(isTablet) {
            this.viewportSize = {
                width: this.screenDeviceRender.tablet.width,
                height: this.screenDeviceRender.tablet.height
            };
        } else if (isMobile) {
            this.viewportSize = {
                width: this.screenDeviceRender.mobile.width,
                height: this.screenDeviceRender.mobile.height
            };

        } else {
            this.viewportSize = {
                width: this.screenDeviceRender.desktop.width,
                height: this.screenDeviceRender.desktop.height
            };
        }


        if (!isBot) {
            this.settings.userAgent = userAgent;
        }

        resolve();
    },

    onPhantomPageCreate: function (phantom, req, res, next) {
        const userAgent = req.headers['user-agent'];
        const ua = userAgentParser.parse(userAgent);

        req.prerender.page.run(userAgent, ua.isMobile, ua.isTablet, ua.isDesktop, ua.isBot, this.renderLogic).then(next);
    }
};