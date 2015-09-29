module.exports = function(grunt, options){
  var yeoman = options.yeoman;
  return {
	  options: {
	    dest: yeoman.dist
	  },
	  html: yeoman.app + '/index.html'
	}
};