"use strict";

const { src, dest } = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const fileinclude = require("gulp-file-include");
const plumber = require("gulp-plumber");
const imagemin = require("gulp-imagemin");
const del = require("del");
const notify = require("gulp-notify");
const browserSync = require("browser-sync").create();
const svgstore = require("gulp-svgstore");

/* Paths */
const srcPath = "src/";
const distPath = "dist/";

const path = {
  build: {
    html: distPath,
    js: distPath + "assets/js/",
    css: distPath + "assets/css/",
    images: distPath + "assets/images/",
    fonts: distPath + "assets/fonts/",
  },
  src: {
    html: srcPath + "*.html",
    js: srcPath + "assets/js/*.js",
    css: srcPath + "assets/scss/*.scss",
    images:
      srcPath +
      "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
    icons: srcPath + "assets/images/**/*icon-*.svg",
    fonts: srcPath + "assets/fonts/**/*.{eot,otf,woff,woff2,ttf,svg}",
  },
  watch: {
    html: srcPath + "**/*.html",
    js: srcPath + "assets/js/**/*.js",
    css: srcPath + "assets/scss/**/*.scss",
    images:
      srcPath +
      "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
    fonts: srcPath + "assets/fonts/**/*.{eot,otf,woff,woff2,ttf,svg}",
  },
  clean: "./" + distPath,
};

/* Tasks */

function serve() {
  browserSync.init({
    server: {
      baseDir: "./" + distPath,
    },
  });
}

function html(cb) {
  return src(path.src.html, { base: srcPath })
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

function css(cb) {
  return src(path.src.css, { base: srcPath + "assets/scss/" })
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "SCSS Error",
            message: "Error: <%= error.message %>",
          })(err);
          this.emit("end");
        },
      })
    )
    .pipe(
      sass({
        includePaths: "./node_modules/",
      })
    )
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(
      cssnano({
        zindex: false,
        discardComments: {
          removeAll: true,
        },
      })
    )
    .pipe(
      rename({
        suffix: ".min",
        extname: ".css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

function js(cb) {
  return src(path.src.js, { base: srcPath + "assets/js/" })
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "JS Error",
            message: "Error: <%= error.message %>",
          })(err);
          this.emit("end");
        },
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

function sprite() {
  return src(path.src.icons)
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(dest(path.build.images));
}

function images(cb) {
  return src(path.src.images)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 95, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

function fonts(cb) {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

function clean(cb) {
  return del(path.clean);

  cb();
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.images], images);
  gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(
  clean,
  sprite,
  gulp.parallel(html, css, js, images, fonts)
);
const watch = gulp.parallel(build, watchFiles, serve);

/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.js = js;
exports.sprite = sprite;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
