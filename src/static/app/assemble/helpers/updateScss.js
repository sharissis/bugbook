var fs = require('fs');
var path = require('path');
var nodeDir = require('node-dir');
var collection = [
	{
		'name': 'partials',
		'searchName': 'partials',
		'dir': './app/assemble/partials'
	},
	{
		'name': 'modules',
		'searchName': 'modules',
		'dir': './app/assemble/modules'
	},
	{
		'name': 'templates',
		'searchName': 'assemble',
		'dir': './app/assemble'
	}
];

collection.forEach(function(data) {

	nodeDir.files(data.dir, function(err, files) {
		var names = [];
		var finalScssFile = '';
		var finalPath = './app/sass/' + data.name + '/_assemble-' + data.name +'.scss';

		console.log('Updating Assemble.io sass...');

		if (err) {
			throw err;
		}

		files.forEach(function(entry) {
			if (path.extname(entry) === '.hbs') {
				// Add names to be added to .scss file
				var regex = new RegExp('^.+' + data.searchName + '/');
				var name = path.basename(entry, '.hbs');

				if (!/^_+/.test(name)/* && data.name !== 'templates'*/) {
					name = '_' + name;
				}

				entry = entry.replace(regex, '');
				entry = entry.split('/');
				entry[entry.length - 1] = name;

				if (data.name === 'templates') {
					if (entry.length === 1 && entry[0] !== 'index') {
						names.push(entry);
						writeMissingFiles(data, entry);
					}
				} else {
					entry = entry.join('/');
					names.push(entry);
					writeMissingFiles(data, entry);
				}
			}
		});

		names.forEach(function(name) {
			var importPath = '@import "';

			importPath = importPath + name;
			finalScssFile = finalScssFile + importPath + '";\n';
		});

		fs.writeFile(finalPath, finalScssFile, function(err) {
			if (err) { throw err; }

			console.log('Done! ' + data.name + ' updated!');
		});

	});
});

// Check to see if same name .scss file exists. If not, create one
var writeMissingFiles = function(data, entry) {
	var name = entry[entry.length - 1];
	var readPath = './app/sass/' + data.name + '/' + name +'.scss';
	fs.readFile(readPath, 'utf8', function(err, file) {
		if (err) {
			console.log('\n\nA SASS file doesnt exist.\n"I can fix it!" - Fix-it-Felix jr.\n\n');
		}

		if (!file) {
			var writePath = readPath;
			var content = '.' + name + ' {\n\n}';

			if (name.length > 2) {
				fs.writeFile(writePath, content, function(err) {
					if (err) { throw err; }

					console.log('\nI just wrote ' + name + ' for you!\n');
				});
			}

		}
	});
}
