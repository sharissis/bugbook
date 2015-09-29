module.exports = function(grunt, options){
  var yeoman = options.yeoman;
  return {
	  target: {
	    src: [yeoman.app + '/assemble/helpers/updateScss.js']
	  }
	}
};