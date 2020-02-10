const gulp = require("gulp")

const terser = require("gulp-terser"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    cssnano = require("gulp-cssnano"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync");


gulp.task("scripts", function (done) {
    return gulp
        .src("./js/*.js") //input files for gulp to minify
        .pipe(terser()) //calls the terser function on these files
        .pipe(rename({ extname: ".min.js" })) // renames minified file
        .pipe(gulp.dest("./build/js")) //creates a build folder and places min files in there
        .pipe(browserSync.stream())
})

//This is for SASS, check your file-paths
gulp.task('sass', function () {
    return gulp
        //locates scss files
        .src('./sass/main.scss')
        //converts sass to css
        .pipe(sass())
        //adds prefixes for compatability
        .pipe(
            autoprefixer()
        )
        //adds css to build dir
        .pipe(gulp.dest('./build/css'))
        //minifies our CSS
        .pipe(cssnano())
        //renames our CSS files
        .pipe(rename('main.min.css'))
        //adds our final output to build dir
        .pipe(gulp.dest('./build/css'))
        //syncs browser whenever a change is made and saved
        .pipe(browserSync.stream());
});
//local server
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })

    gulp.watch('./js/*.js', gulp.series(['scripts']))
    gulp.watch('./sass/*.scss', gulp.series(['sass']))
    gulp.watch('./*html').on('change', browserSync.reload)
    gulp.watch("./sass/*.scss").on("change", browserSync.reload);

})

gulp.task("default", gulp.series('watch'))
