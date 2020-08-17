const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.scripts([ 'resources/views/layouts/js/index.js' ], 'public/js/index.js')
   .styles([ 'resources/views/layouts/css/style.css' ], 'public/css/style.css')
   .styles([ 'resources/views/layouts/css/app.css' ], 'public/css/app.css');
