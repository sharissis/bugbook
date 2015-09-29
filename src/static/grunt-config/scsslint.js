module.exports = function (grunt, options) {
  'use strict';
  var yeoman = options.yeoman;
  return {
    allFiles: [
      yeoman.app + '/sass/**/*.scss',
    ],
    options: {
      bundleExec: false,
      config: '.scss-lint.yml',
      reporterOutput: 'scss-lint-report.xml',
      colorizeOutput: true
    },
  };
};
