// Load Gulp 
var gulp = require( 'gulp' );

// CSS related plugins
var sass = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );
var cleanCSS = require( 'gulp-clean-css' );

// Utility plugins
var plumber = require( 'gulp-plumber' );
var gutil = require('gulp-util');
var rename = require( 'gulp-rename' );
var sourcemaps = require( 'gulp-sourcemaps' );
var cache = require('gulp-cache');
var imagemin = require( 'gulp-imagemin' );

// JS related plugin
var uglify = require( 'gulp-uglify' );

// Browers related plugin
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Project related variables
var projectURL = 'http://localhost/';
var styleSRC = 'src/scss/style.scss';
var styleURL = './assets/css/';
var mapURL = './';

var jsSRC = 'src/scripts/*.js';
var jsCustomSRC = 'src/scripts/custom.js';
var jsURL = './assets/js/';

var imgSRC = 'src/img/**/*';
var imgURL = 'assets/img/';

var styleWatch = 'src/scss/**/*.scss';
var jsWatch = 'src/scripts/**/*.js';
var imgWatch = 'src/img/**/*.*';
var htmlWatch = '**/*.html';


/**
 * Error Handler
 */
var onError = function (err) {
  gutil.beep();
  console.log(err);
};

/**
 * Browser Sync Task and then watch all task
 */
gulp.task( 'browser-sync', function() {
	browserSync.init({
		proxy: projectURL,
		injectChanges: true,
		open: false,
	});
});


/**
 * Stylesheet Task
 */
gulp.task('styles', function () {
	gulp.src( [ styleSRC ] )
		.pipe( plumber({ errorHandler: onError }) )
    .pipe( sourcemaps.init() )
		.pipe( sass({ outputStyle: 'compact' }) )
		.pipe( autoprefixer({ browsers: [ 'last 2 versions', '> 5%', 'Firefox ESR' ] }) )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( cleanCSS() )
		.pipe( sourcemaps.write( mapURL ) )
		.pipe( gulp.dest( styleURL ) )
		.pipe( reload({ stream: true }) );
});


/**
 * Custom Script Task
 */
gulp.task( 'js', function() {
	gulp.src( [ jsCustomSRC ] )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( sourcemaps.init({ loadMaps: true }) )
		.pipe( uglify() )
		.pipe( sourcemaps.write( mapURL ) )
		.pipe( gulp.dest( jsURL ) )
		.pipe( reload({ stream: true }) );
});


/**
 * Images Task
 */
gulp.task( 'images', function() {
	triggerPlumber( imgSRC, imgURL );
	gulp.src( imgSRC )
		.pipe( imagemin ( {
	    interlaced: true,
	    progressive: true,
	    optimizationLevel: 5,
	    svgoPlugins: [ { removeViewBox: true } ]
		} ) )
		.pipe( gulp.dest( imgURL ) )
});


/**
 * Trigger Plumber Function
 */
function triggerPlumber( src, url ) {
	return gulp.src( src )
	.pipe( plumber() )
	.pipe( gulp.dest( url ) );
}


/**
 * Clean gulp cache
 */
gulp.task( 'clear', function () {
 	cache.clearAll();
});


/**
 * Default Task
 */
gulp.task( 'default', ['styles', 'images', 'js', 'browser-sync'], function() {
	gulp.watch( styleWatch , [ 'styles' ]);
	gulp.watch( htmlWatch ).on('change', reload);
	gulp.watch( jsWatch, [ 'js' ] ).on('change', reload);
	gulp.watch( imgWatch, [ 'images' ] ).on('change', reload);
} );