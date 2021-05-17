const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();


// Styles

const styles = () => {
  return gulp.src("source/sass/index.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;


// Html

const html = () => {
  return gulp.src("source/**/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest("build"));
}

exports.html = html;


// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(concat("script.js"))
    .pipe(terser())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;


// Images

const optimizeImages = () => {
  return gulp.src([
      "source/img/**/*.{jpg,png,svg}",
      "!source/img/icons/*.svg"
    ])
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {removeRasterImages: true}
        ]
      })
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.optimizeImages = optimizeImages;


const copyImages = () => {
  return gulp.src([
    "source/img/**/*.{jpg,png,svg}",
    "!source/img/icons/*.svg"
  ])
    .pipe(gulp.dest("build/img"));
}

exports.copyImages = copyImages;


// WebP

const createWebp = () => {
  return gulp.src([
    "source/img/**/*.{jpg,png}",
    "!source/img/backgrounds/*.{jpg,png}",
    "!source/img/favicons/*.png"
  ])
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;


// SVG Sprite

const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {removeRasterImages: true}
        ]
      })
    ]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;


// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    'source/favicon.ico',
    'source/manifest.webmanifest',
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
  done();
}

exports.copy = copy;


// Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;


// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;


// Reload

const reload = (done) => {
  sync.reload();
  done();
}


// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/*.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
  gulp.watch("source/img/**/*.{jpg,png,svg}", gulp.series(copyImages, sprite, createWebp));
}


// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  )
);

exports.build = build;


// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
