#Prerender User Agent Render [![Build Status](https://travis-ci.org/Byte-Code/prerender-user-agent-render.svg?branch=master)](https://travis-ci.org/Byte-Code/prerender-user-agent-render) ![Dependencies](https://david-dm.org/Byte-Code/prerender-user-agent-render.svg)[![Code Climate](https://codeclimate.com/github/Byte-Code/prerender-user-agent-render/badges/gpa.svg)](https://codeclimate.com/github/Byte-Code/prerender-user-agent-render)


A plugin for [Prerender](https://github.com/prerender/prerender) that set the windows size of phantomjs 
for the request user agent

## Usage

Run the test

        npm test
        
Install

        npm install prerender-user-agent-render
        
Add this to your Prerender server.js:

        server.use(require('prerender-user-agent-render'));
        
[License](LICENSE)
