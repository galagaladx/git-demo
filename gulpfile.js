'use strict';

/*
*      1.LESS���� ѹ�� �ϲ�
 *     2.JS�ϲ� ѹ�� ����
 *     3.img�ĸ���
 *     4.HTMLѹ��
*
**/
// ��GulpFile��������gulp�İ�����Ϊ�ṩ��һЩAPI
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//ע������
// 1.LESS���� ѹ�� �ϲ�--û�б�Ҫ����Ԥ����������
gulp.task('style',function () {
    //��������ִ��style�����ʱ���Զ�ִ��
    //���ҵ��ļ�
    gulp.src('src/style/*.less')
    //less����
        .pipe(less())
    //cssѹ��
        .pipe(cssnano())
    //����Ŀ���ļ��� dist
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.reload(
            {stream:true}
        ));
});

//2.JS�ϲ� ѹ�� ����
gulp.task('script', function () {
   gulp.src('src/script/*js')
       //�ϲ�
       .pipe(concat('all.js'))
       //ѹ���ϲ�
       .pipe(uglify())
       .pipe(gulp.dest('dist/script'))
       .pipe(browserSync.reload(
           {stream:true}
       ));
});
// 3.img�ĸ���

gulp.task('image', function () {
    gulp.src('src/image/*.*')
        .pipe(gulp.dest('dist/image'))
        .pipe(browserSync.reload(
            {stream:true}
        ));
})
var htmlmin = require('gulp-htmlmin');
//4.HTMLѹ��
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            removeComments:true, //ɾ��ע��
            collapseWhitespace:true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload(
            {stream:true}
        )); //�Զ�ˢ��
});
var browserSync = require('browser-sync');
//�������� �����ļ�
gulp.task('serve', function () {
    //����������
    browserSync({
        server:{
            baseDir:['dist']
        },

    }, function (err,bs) {

    });
//    �����ļ��仯
    gulp.watch('src/style/*.less',['style']);
    gulp.watch('src/script/*.js',['script']);
    gulp.watch('src/image/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});
