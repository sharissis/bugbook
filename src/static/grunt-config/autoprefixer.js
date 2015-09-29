module.exports = function(grunt, options){
  return {
    options: {
      browsers: ['last 2 versions', 'ie 8', 'ie 9']
    },
    dist: {
      files: [{
        expand: true,
        cwd: '.tmp/css/',
        src: '{,*/}*.css',
        dest: '.tmp/css/'
      }]
    }
  }
};