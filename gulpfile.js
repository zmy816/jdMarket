const gulp = require("gulp");
const connect = require("gulp-connect");

// 将HTML文件拷贝到dist目录下
gulp.task("html", done => {
    gulp.src("*.html")
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
    done();
});

// 将css文件拷贝到dist/css目录下
gulp.task("css", done => {
    gulp.src("css/*.css")
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
    done();
});

// 将js文件拷贝到dist/js目录下
gulp.task("js", done => {
    gulp.src("js/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
    done();
});
// 将图片拷贝到dist/img目录下
gulp.task("img", done => {
    gulp.src("img/*")
        .pipe(gulp.dest("dist/img"))
        .pipe(connect.reload());
    done();
});

gulp.task("font", done => {
    gulp.src("font/*")
        .pipe(gulp.dest("dist/font"))
        .pipe(connect.reload());
    done();
});
// 侦听文件的改变
gulp.task("watch", done => {
    gulp.watch("*.html", gulp.series("html"));
    gulp.watch("css/*.css", gulp.series("css"));
    gulp.watch("js/*.js", gulp.series("js"));
    gulp.watch("img/*", gulp.series("img"));
    gulp.watch("font/*", gulp.series("font"));
    done();
})

gulp.task("bulid", gulp.parallel("html", "css", "js", "img", "font"));

// 创建服务器
gulp.task("server", done => {
    connect.server({
        root: "dist",
        livereload: true
    })
    done();
});

gulp.task("default",gulp.series("bulid","watch","server"))