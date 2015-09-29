module.exports = function(grunt, options){
  var yeoman = options.yeoman;
  return {
	  dist: {
	    files: [{
	      expand: true,
	      cwd: yeoman.app + '/img',
	      src: '{,*/}*.svg',
	      dest: yeoman.dist + '/img'
	    }]
	  }
	}
};