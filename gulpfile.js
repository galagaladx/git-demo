'use strict';

/*
*      1.LESS编译 压缩 合并
 *     2.JS合并 压缩 混淆
 *     3.img的复制
 *     4.HTML压缩
*
**/
// 在GulpFile中线载入gulp的包，因为提供了一些API
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//注册任务
// 1.LESS编译 压缩 合并--没有必要利用预处理器导包
gulp.task('style',function () {
    //这里是在执行style任务的时候自动执行
    //先找到文件
    gulp.src('src/style/*.less')
    //less编译
        .pipe(less())
    //css压缩
        .pipe(cssnano())
    //导向目标文件夹 dist
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.reload(
            {stream:true}
        ));
});

//2.JS合并 压缩 混淆
gulp.task('script', function () {
   gulp.src('src/script/*js')
       //合并
       .pipe(concat('all.js'))
       //压缩合并
       .pipe(uglify())
       .pipe(gulp.dest('dist/script'))
       .pipe(browserSync.reload(
           {stream:true}
       ));
});
// 3.img的复制

gulp.task('image', function () {
    gulp.src('src/image/*.*')
        .pipe(gulp.dest('dist/image'))
        .pipe(browserSync.reload(
            {stream:true}
        ));
})
var htmlmin = require('gulp-htmlmin');
//4.HTML压缩
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            removeComments:true, //删除注释
            collapseWhitespace:true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload(
            {stream:true}
        )); //自动刷新
});
var browserSync = require('browser-sync');
//启动服务 监视文件
gulp.task('serve', function () {
    //启动服务器
    browserSync({
        server:{
            baseDir:['dist']
        },

    }, function (err,bs) {

    });
//    监听文件变化
    gulp.watch('src/style/*.less',['style']);
    gulp.watch('src/script/*.js',['script']);
    gulp.watch('src/image/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});
