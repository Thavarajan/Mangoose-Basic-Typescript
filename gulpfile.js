var gulp = require("gulp");
var tsc = require("gulp-typescript");
var nodemon = require("gulp-nodemon");
var tsProject = tsc.createProject('tsconfig.json');

gulp.task("compile", function() {
    return gulp
        .src("*/*.ts")
        .pipe(tsProject())
        .js.pipe(gulp.dest("./lib"));
});

gulp.task("html",function(){
    return gulp
    .src(["src/**/*.html","src/**/*.js"])
    .pipe(gulp.dest("./lib"))
});

gulp.task("watch",["compile","html"], function() {
    return gulp.watch("src/**/*.*", ["compile", "html"]);
});

gulp.task("nodemon", ["compile"], function() {
    nodemon({ script: "lib/src/index.js", delay:15 });
});

gulp.task("default", ["compile", "html", "watch", "nodemon"]);
