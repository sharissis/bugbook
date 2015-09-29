module.exports = function(grunt, options){
  var yeoman = options.yeoman;
  return {
    dist: {
      devFile: 'app/bower_components/modernizr/modernizr.js',
      outputFile: 'dist/js/plugins/modernizr.optimized.js',
      extra: {
        shiv: true,
        printshiv: false,
        load: false,
        mq: false,
        cssclasses: true
      },
      extensibility: {
        addtest: false,
        prefixed: false,
        teststyles: false,
        testprops: false,
        testallprops: false,
        hasevents: false,
        prefixes: false,
        domprefixes: false
      },
      uglify: true,
      tests: [],
      parseFiles: true,
      files: {
        src: [yeoman.app + '/js/**/*.js',
          yeoman.app + '/css/**/*.css',
          yeoman.app + '/sass/**/*.scss'
        ]
      },
      matchCommunityTests: false,
      customTests: []
    }
  }
};