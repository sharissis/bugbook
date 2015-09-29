module.exports = function(grunt, options){
  var yeoman = options.yeoman;
  return {
    options: {
      jshintrc: '.jshintrc'
    },
    all: ['Gruntfile.js',
      yeoman.app + '/js/{,*/}*.js',
      '!' + yeoman.app + '/js/plugins.js',
      '!' + yeoman.app + '/js/plugins/*',
      '!' + yeoman.app + '/js/vendor/*',
      'test/spec/{,*/}*.js'
    ]
  }
};