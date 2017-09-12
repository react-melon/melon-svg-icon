/**
 * @file gulpfile
 * @author ludafa <leonlu@outlook.com>
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const svgToJsx = require('./tools/svg-to-component');
const svgRename = require('./tools/svg-rename');
const through = require('through2');
const gutil = require('gulp-util');
const path = require('path');
const fs = require('fs');

gulp.task('svg', () => (
    gulp
        .src('node_modules/material-design-icons/**/svg/production/*_24px.svg')
        .pipe(svgToJsx({
            passProps: true
        }))
        .pipe(rename(path => {
            path.dirname = path.dirname
                .replace('node_modules/material-design-icons', '')
                .replace(/[^/]+\/svg\/production/, '');
            path.extname = '.js';
            path.basename = svgRename(path.basename);
        }))
        .pipe(gulp.dest('components'))
));

gulp.task('index', ['svg'], () => {

    let files = [];
    let stream = gulp
        .src('components/*.js')
        .pipe(
            through.obj((file, encoding, callback) => {
                files.push(file.path);
                callback(null, file);
            })
        );

    stream.on('end', () => {

        let content = files
            .map(file => {
                let componentName = path.basename(file, '.js');
                return `export {default as ${componentName}} from './${componentName}';`
            })
            .join('\n');

        let icons = files.map(file => path.basename(file, '.js'));

        fs.writeFileSync(`${__dirname}/components/index.js`, content, 'utf-8');
        fs.writeFileSync(`${__dirname}/components/icons.json`, JSON.stringify(icons, 0, 4), 'utf8');

    });

    return stream;

});

gulp.task('babel', ['index'], () => (
    gulp
        .src(['components/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('lib'))
));

gulp.task('icons', ['index'], () => gulp.src('components/icons.json').pipe(gulp.dest('lib')));

gulp.task('default', ['babel', 'icons']);
