module.exports = function(grunt, options){
  var yeoman = options.yeoman;
  return {
    options: {
      collections: [{
        name: 'module',
        sortby: 'title',
        sortorder: 'ascending'
      }, {
        name: 'template',
        sortby: 'title',
        sortorder: 'ascending'
      }],
      layout: 'default.hbs',
      layoutdir: yeoman.app + '/assemble/layouts/',
      helpers: yeoman.app + '/assemble/helpers/**/*.js',
      partials: [
        yeoman.app + '/assemble/partials/{,*/}*.hbs',
        yeoman.app + '/assemble/modules/**/*',
        yeoman.app + '/assemble/includes/{,*/}*.hbs'
      ],
      data: yeoman.app + '/assemble/fixtures/{,*/}*.json'
    },
    templates: {
      files: [{
        cwd: yeoman.app + '/assemble/modules/',
        dest: yeoman.app + '/modules/',
        expand: true,
        src: ['**/*.hbs']
      }, {
        cwd: yeoman.app + '/assemble/',
        dest: yeoman.app + '/',
        expand: true,
        src: ['*.hbs', '!index.hbs']
      }, {
        cwd: yeoman.app + '/assemble/',
        dest: yeoman.app + '/',
        expand: true,
        src: ['index.hbs']
      }]
    }
  }
};