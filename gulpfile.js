"use strict";
require("es6-promise").polyfill();


// =============================
// Vars
// =============================
var gulp        = require( 'gulp' );
var del         = require( 'del' );
var flatten     = require( 'gulp-flatten' );
var jshint      = require( 'gulp-jshint' );
var sourcemaps  = require( 'gulp-sourcemaps' );
var uglify      = require( 'gulp-uglify' );
var header      = require( 'gulp-header' );
var rename      = require( 'gulp-rename' );

var now         = new Date();
var _package    = require( './package.json' );

var license     = '/*! true-visibility v' + _package.version + 
                ' | (c) 2016-' + now.getUTCFullYear() + 
                ' : MIT license - ' + _package.homepage + '/license.txt */\n';


// =============================
// Paths
// =============================
var paths = {
    base: "./"
};
paths.src   = paths.base + "src/";
paths.dist  = paths.base + "dist/";
paths.jsSrc = paths.src + "*.js";


// =============================
// jsHint - error detection
// =============================
gulp.task("jshint", function () 
{
    var jshGlobals = [
        '$',
        'jQuery',
        'window',
        'document',
        'Element',
        'Node',
        'console',
        'define',
        'module'
    ];

    gulp.src(paths.jsSrc)
        .pipe(jshint({
            predef: jshGlobals,
            undef: true,
            eqnull: true
        }))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});


// =============================
// Cleans
// =============================
gulp.task("clean:dist", function () 
{
    return del([
        paths.dist + "**/*"
    ]);
});


// =============================
// build - transform js and place in dist
// =============================
gulp.task( 'build:js', ['clean:dist', 'jshint'], function()
{
    return gulp.src( paths.jsSrc, { base: "." })
        .pipe( flatten() )
        .pipe( sourcemaps.init() )
        .pipe( uglify() )
        .pipe( rename({
            suffix: '.min'
        }) )
        .pipe( header( license ) )
        .pipe( sourcemaps.write( "." ) )
        .pipe( gulp.dest( paths.dist ) );
});




// =============================
// default
// =============================
gulp.task( 'default', ['build:js'] );
