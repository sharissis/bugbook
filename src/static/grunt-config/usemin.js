module.exports = function(grunt, options){
	var yeoman = options.yeoman;
  	return {
		options: {
	    	dirs: [yeoman.dist],
	    	blockReplacements: {
      			css: function(block) {
					/**
					 * Find the first of the raw blocks that matches as a link, then extract the string to the left
					 * and the right of the href and put the new dest path in the middle of them, the keeping any
					 * attributes. Note: the attributes applied to the first link tag will be used, so if differnt
					 * attributes are required for different files, they need to be in their own block */
          			var result = '';
      				for(var i=0; i<block.raw.length; i++) {
          				if(block.raw[i].match(/\s*<link[^\>]+href=['"][^"']+["']/gm)) {
              				result = block.raw[i].replace(/\s*(<link[^\>]+href=['"])[^"']+(["'])/gm, '$1' + block.dest + '$2');
              				break;
          				}
      				}
          			return result;
          		}
      		}
		},
		html: [yeoman.dist + '/{,*/}*.html'],
		css: [yeoman.dist + '/css/{,*/}*.css']
	}
};