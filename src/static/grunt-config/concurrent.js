module.exports = function(grunt, options){
  return {
	  server: ['compass:server', 'copy:styles'],
	  test: ['copy:styles'],
	  // dist: ['copy:styles', 'imagemin', 'svgmin', 'htmlmin']
	  dist: ['copy:styles', 'svgmin', 'htmlmin']
	}
};