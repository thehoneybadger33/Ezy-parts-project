const { src, dest, watch, parallel } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const kit = require('gulp-kit');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}

function gulpkit() {
    return src('app/kit/**/*.kit')
        .pipe(kit())
        .pipe(dest('app/'));
}

function scripts() {
    return src([
        'app/js/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('app/scss/**/*.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function images() {
    return src('app/images/')
        .pipe(dest('dist/images/**/*.*'))
        .pipe(reload({ stream: true }))
}

// function cleanDist() {
//     return del('dist');
// }

// let build = gulp.series(clean, gulp.parallel(scripts, styles, gulpkit, images));

function build() {
    return src([
        'app/css/style.css',
        'app/fonts/**/*',
        'app/images/**/*.*',
        'app/js/main.min.js',
        // 'app/kit/*.kit',
        'app/*.html'
    ], { base: 'app/' })
        .pipe(dest('dist/'))
}

function serve(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    }, done);
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/kit/**/*.kit'], gulpkit);
    watch(['app/images/**/*.*'], images);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.gulpkit = gulpkit;
exports.serve = serve;
exports.build = parallel(serve, images, browsersync, build)
exports.default = parallel(build, watching, styles, scripts, browsersync,);
