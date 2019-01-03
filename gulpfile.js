"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Run local dev server
var open = require('gulp-open'); // Open url in web browser
var browserify = require('browserify');//Bundles JS
var reactify = require('reactify');//Transforms React JSX to JS
var source = require('vinyl-source-stream');//Use to conventional text streams with Gulp

var config = {
	port:9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		dist: './dist',
		mainJS: './src/main.js'
	}
}
//Start a local development server 
gulp.task('connect',function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

//This task should run after connect task 
gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
	.pipe(open({uri: config.devBaseUrl +':'+ config.port + '/'}));
});


//Handel html file and bundle them to dist folder 
gulp.task('html',function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
	});

//js task 
gulp.task('js',function() {
	browserify(config.paths.mainJS)
	.transform(reactify)
	.bundle()
	.on('error',console.error.bind(console))
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(config.paths.dist+'/scripts'))
	.pipe(connect.reload());
});

//task to watch htlm files so if any thing changes it runs html task 
gulp.task('watch',function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
})

//If i go to command line write gulp it should run html and open tasks
gulp.task('default', ['html','js', 'open','watch']);