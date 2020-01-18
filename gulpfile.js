/*global require*/
"use strict";
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

var paths = {
    public: './public/',
    img: './public/img',
    sass: './src/sass/',
    css: './public/css/',
    fonts: './public/fonts'
};

gulp.task('assets', function() {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest(paths.img));
});

gulp.task('fonts', function() {
    return gulp.src('./src/fonts/*')
        .pipe(gulp.dest(paths.fonts));
});

gulp.task('js', function() {
    return gulp.src('./src/*.js*')
        .pipe(gulp.dest(paths.public))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function() {
    return gulp.src('./src/*.html*')
        .pipe(gulp.dest(paths.public))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('scss', function() {
    return gulp.src(paths.sass + '*.scss')
        .pipe(sass({
            includePaths: [paths.sass],
            outputStyle: 'compressed'
        }))
        .on('error', sass.logError)
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', function() {
    gulp.watch(paths.sass + '**/*.scss', ['scss']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('browser-sync', ['html', 'scss', 'assets', 'fonts', 'js'], function() {
    browserSync({
        server: {
            baseDir: paths.public
        },
        notify: false
    });
});

gulp.task('build', ['sass', 'html', 'assets', 'fonts', 'js']);

gulp.task('default', ['browser-sync', 'watch']);