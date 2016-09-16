var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var sourcemaps = require("gulp-sourcemaps");
var Cache = require('gulp-file-cache');
var eslint = require('gulp-eslint');

var cache = new Cache();
var path = {src: 'src/**/*'};

gulp.task('build', function() {
    return gulp.src([path.src])
    .pipe(eslint({
        fix: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(cache.cache())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./dist/src'));
});

gulp.task('run', ['build'], function() {
    return nodemon({
        script: './dist/src/server.js',
        ext: 'js',
        tasks: ['build'],
        watch: path.src,
        env: {
            NODE_PATH: './dist'
        }
    });
});

gulp.task('default', ['run']);