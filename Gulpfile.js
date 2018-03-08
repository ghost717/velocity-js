var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');

var insert = require('gulp-insert');
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var clean = require("gulp-clean");
var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');


//kopiowanie plikow  
gulp.task('php', function () {
    return gulp.src('./src/*.php')
      //  .pipe(gulp.dest('./dist'))
        .pipe(gulp.dest('./'));
});

gulp.task('html', function () {
    return gulp.src('./src/*.html')
      //  .pipe(gulp.dest('./dist'))
        .pipe(gulp.dest('./'));
});

gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./dist/js'));
});

//kopiowanie assetow
gulp.task('assets', function () {
    return gulp.src('src/images/**')
        .pipe(gulp.dest('./dist/assets/images'));
});

//move files
gulp.task('move-files',function(){
  return gulp.src([
      './src/js/*',
      './src/bootstrap/*/*',
      './src/wow/*',
//      './src/biloxi_script/*',
  ],  {base: './src/'}) 
  .pipe(gulp.dest('./dist/assets'));
});

//mimifikacja less
gulp.task('min-less', function () {
  //return gulp.src('./src/less/layout.less')
    return gulp.src([
      './src/less/layout.less',
      './src/css/reset.css',
  ]) 
    .pipe(less().on('error', function (err) {
      console.log(err);
    }))
    .pipe(cssmin().on('error', function(err) {
      console.log(err);
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/assets/css'));
});


gulp.task('watch', function () {
  gulp.watch('./src/less/*.less', ['min-less']);
  gulp.watch('./src/*.php', ['php']);
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/js/*.js', ['js']);
});


//czyszczenie
gulp.task('clean', function () {
    return gulp.src('./dist', {force: true})
        .pipe(clean());
});

//mimifikacja js
gulp.task('min-js', function () {
    return gulp.src('./dist/assets/js/*')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/js'));
});

//publikacja ftp /wywolanie gulp deploy
gulp.task('deploy', ['build'], function () {
    var conn = ftp.create({
        host: config.host,
        user: config.user,
        password: config.password,
        parallel: 10,
        log: gutil.log
    });
 
    return gulp.src("./dist/**", {
            base: './dist',
            buffer: false
    })
    .pipe(conn.newer(config.path))
    .pipe(conn.dest(config.path));
});

gulp.task('default', ['min-less', 'watch']);

//build
gulp.task('build', [
    'clean',
    'php',
    'html',
    'assets',
    'min-less',
    'move-files',
//    'min-js',
]);
 
