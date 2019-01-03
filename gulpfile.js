"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Run local dev server
var open = require('gulp-open'); // Open url in web browser

var config = {
	port:9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		dist: './dist'
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

//task to watch htlm files so if any thing changes it runs html task 
gulp.task('watch',function() {
	gulp.watch(config.paths.html, ['html'])
})
//If i go to command line write gulp it should run html and open tasks
gulp.task('default', ['html','open','watch']);