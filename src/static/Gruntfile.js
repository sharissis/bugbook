var options = {
	config : {
		src: 'grunt-config/*.js'
	},
	yeoman: {
		app: 'app',
		dist: 'dist',
		deploy: '../../web'
	},
	connect: {
		port: 9000
	}
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	var configs = require('load-grunt-configs')(grunt, options); // jshint ignore:line

	// build a custom version of modernizr
	grunt.loadNpmTasks('grunt-modernizr');

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Show elapsed time after tasks run
	require('time-grunt')(grunt);

	// Assemble!
	grunt.loadNpmTasks('assemble');

	// For executing the updateScss.js script in app/assemble/helpers
	grunt.loadNpmTasks('grunt-execute');

	grunt.initConfig(configs);

	grunt.registerTask('server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
		}
		grunt.task.run([
			'clean:assemble',
			'assemble',
			'clean:server',
			'concurrent:server',
			'connect:livereload',
			'open',
			'watch'
		]);
	});

	grunt.registerTask('check', [
		'jshint'
	]);

	grunt.registerTask('build', [
		'clean:assemble',
		'assemble',
		'clean:dist',
		'useminPrepare',
		'compass:dist',
		'autoprefixer',
		'concat',
		'cssmin',
		'uglify',
		'concurrent:dist',
		'copy:dist',
		'usemin',
		'modernizr:dist'
	]);

	grunt.registerTask('deploy', [
		'clean:deploy',
		'copy:deploy'
	]);

	grunt.registerTask('default', [
		'check',
		'build'
	]);

};
