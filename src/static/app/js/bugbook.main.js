/*global window:false */
/*global $:false */
/*jslint plusplus: true */
/*global Firebase:false */

// Firebase Data: https://pvzp1paydyr.firebaseio-demo.com

var bugbook = bugbook || {};

(function ($, Modernizr, window, document) {

	'use strict';

	var bugbookRef = new Firebase('https://pvzp1paydyr.firebaseio-demo.com/');

	bugbook.main = {

		init: function () {

			var emptyMessage = $('#js-bugs-list-empty');

			// Submit bug on button click
			$('#js-submit-bug').on('click', function() {
				bugbook.main.addBug();
			});

			// Submit bug on enter
			$(document).keypress(function(e) {
			    if (e.which == 13) {
			        bugbook.main.addBug();
			    }
			});

			setTimeout(function() {
				$(emptyMessage).addClass('show');
			}, 500);
			
			// For each bug, display it
			bugbookRef.on('child_added', function(item) {
				var bug = item.val();

				if (emptyMessage.length > 0) {
					$(emptyMessage).remove();
				}

				bugbook.main.displayBug(bug.title, bug.link, bug.desc, bug.tags);

			});

		},

		// Adds bug to DB
		addBug: function() {
			var title = $('#js-title-input').val(),
				link = $('#js-link-input').val(),
				desc = $('#js-desc-input').val(),
				tags = $('#js-tags-input').val(),
				missingFieldAlert = $('#js-missing-field'),
				blankTitleAlert = $('#js-blank-title'),
				invalidUrlAlert = $('#js-invalid-url'),
				noTagsAlert = $('#js-no-tags');

			console.log(title);
			console.log(link);
			console.log(desc);
			console.log(tags);

			// If there's no title...
			if (!title || title.replace(/\s/g, '') === '') {
				// Show validation alert
				bugbook.main.fadeAlert(blankTitleAlert);
			}

			// If there are no tags...
			if (tags.length < 1) {
				// Show validation alert
				bugbook.main.fadeAlert(noTagsAlert);
			} else {
				// Split tags into array
				tags = tags.split(',');

				// Remove extra spaces from around each tag
				$.each(tags, function(i) {
					var string = tags[i];
					tags[i] = string.trim().toLowerCase();
				});

			}

			// If there's a link, description, or both...
			if ((link && link.replace(/\s/g, '') !== '') || (desc && desc.replace(/\s/g, '') !== '')) {

				if (link) {
					var valid = bugbook.main.validateUrl(link);

					if (valid) {

						var httpRegex = new RegExp('^(http|https)://.*$'),
							hasHttp = httpRegex.test(link);

						if (!hasHttp) {
							link = 'http://' + link;
						}

						bugbookRef.push({
							title: title,
							link: link,
							desc: desc || '',
							tags: tags
						});

						bugbook.main.clearFields();

					} else {
						// Show validation alert
						bugbook.main.fadeAlert(invalidUrlAlert);
					}

				} else {

					bugbookRef.push({
						title: title,
						link: '',
						desc: desc,
						tags: tags
					});

					bugbook.main.clearFields();

				}

			// Otherwise...
			} else {
				// Show validation alert
				bugbook.main.fadeAlert(missingFieldAlert); 
			}

		},

		// Appends bug entry to a list of bugs
		displayBug: function(title, link, desc, tags) {

			if (desc) {

				if (link) {
					$('#js-bugs-list > ul').append('<li class="accordion"><i class="toggle fa fa-plus-circle"></i><a class="title" href="' + link + '" title="' + title + '" target="_blank">' + title + '</a><div class="desc">' + desc + '</div></li>');
				} else {
					$('#js-bugs-list > ul').append('<li class="accordion"><i class="toggle fa fa-plus-circle"></i><span class="title">' + title + '</span><div class="desc">' + desc + '</div></li>');
				}

			} else {
				$('#js-bugs-list > ul').append('<li><a class="title" href="' + link + '" title="' + title + '" target="_blank">' + title + '</a></li>');
			}

		},

		fadeAlert: function(el) {
			var alertTimeout = 4000;

			$(el).addClass('active');

			setTimeout(function() {
				$(el).addClass('show');
			}, 50);

			setTimeout(function() {
				$(el).removeClass('show');
				setTimeout(function() {
					$(el).removeClass('active');
					return false;
				}, 750);
			}, alertTimeout);

		},

		validateUrl: function(url) {
			var urlRegex = new RegExp('^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)');
  			return urlRegex.test(url);
		},

		clearFields: function() {
			$('#js-title-input').val(''); // Clear field
			$('#js-link-input').val(''); // Clear field
			$('#js-desc-input').val(''); // Clear field
			$('#js-tags-input').val(''); // Clear field
		}

	};

})(window.jQuery, window.Modernizr, window, window.document);

$(function () {

	'use strict';

	bugbook.main.init();

});