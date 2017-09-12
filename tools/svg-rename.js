/**
 * @file rename svg to component name
 * @author leon <ludafa@outlook.com>
 */

const path = require('path');
const camelCase = require('lodash.camelcase');

const REMAP = {
    '3d': 'ThreeD'
}
const RESERVED_KEYS = Object.keys(REMAP);

module.exports = function (filepath) {
    filepath = path.basename(filepath, '.svg').slice(2, -4);
    for (let key of RESERVED_KEYS) {
        filepath = filepath.replace(key, REMAP[key]);
    }
    let basename = camelCase(filepath);
    return `${basename[0].toUpperCase()}${basename.slice(1)}`;
}
