/**
 * @file svg to jsx
 * @author ludafa <leonlu@outlook.com>
 */

const gutil = require('gulp-util');
const through = require('through2');
const svgtojsx = require('svg-to-jsx');
const path = require('path')
const svgRename = require('./svg-rename');

const DEFAULT_TEMPLATE = function (filepath, jsx) {
    let componentName = svgRename(path.basename(filepath));
    return `\
import React, {PureComponent} from 'react';
export default class MelonSvgIcon${componentName} extends PureComponent {
    static displayName = 'MelonSvgIcon<${componentName}>';
    render() {
        return (
            ${jsx}
        );
    }
}
`;
}

module.exports = function (options = {}) {

    let {
        template = DEFAULT_TEMPLATE,
        ...rest
    } = options;

    function transform(file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            return callback(
                new gutil.PluginError('gulp-svg-to-jsx', 'Streaming not supported')
            );
        }

        svgtojsx(file.contents.toString(), rest, (error, result) => {

            if (template) {
                result = template(file.path, result);
            }

            callback(
                error,
                new gutil.File({
                    contents: new Buffer(result),
                    path: file.path
                })
            );
        });

    }

    return through.obj(transform);
};
