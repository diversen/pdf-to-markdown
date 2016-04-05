'use strict';

var URL = require('url-parse');

module.exports = function getHash(str) {
    var url = new URL(str);
    return url.hash.replace('#', '');
};
