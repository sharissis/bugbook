module.exports = function(grunt, options){
  var yeoman = options.yeoman;
  return {
    options: {
      sassDir: yeoman.app + '/sass',
      cssDir: '.tmp/css',
      generatedImagesDir: '.tmp/img/generated',
      imagesDir: yeoman.app + '/img',
      javascriptsDir: yeoman.app + '/js',
      fontsDir: yeoman.app + '/sass/icons/fonts',
      importPath: yeoman.app + '/bower_components',
      httpImagesPath: '/img',
      httpGeneratedImagesPath: '/img/generated',
      httpFontsPath: '/sass/icons/fonts',
      relativeAssets: false,
      outputStyle: 'expanded',
      debugInfo: false
    },
    dist: {
      options: {
        generatedImagesDir: yeoman.dist + '/img/generated',
        debugInfo: false,
        outputStyle: 'compressed'
      }
    },
    server: {
      options: {
        debugInfo: false
      }
    }
  }
};
