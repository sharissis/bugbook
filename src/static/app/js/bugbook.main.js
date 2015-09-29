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

			$('#js-submit-bug').on('click', function() {
				bugbook.main.addBug();
			});
			
			// For each bug, display it
			bugbookRef.on('child_added', function(item) {
				var bug = item.val();
				bugbook.main.displayBug(bug.title, bug.link, bug.desc);
			});

		},

		// Adds bug to DB
		addBug: function() {
			var title = $('#js-title-input').val(),
				link = $('#js-link-input').val(),
				desc = $('#js-link-desc').val(),
				missingFieldAlert = $('#js-missing-field'),
				blankTitleAlert = $('#js-blank-title'),
				invalidUrlAlert = $('#js-invalid-url');

			if (!title || title.replace(/\s/g, '') === '') { // If there's no title...

				bugbook.main.fadeAlert(blankTitleAlert); // Show validation alert

			} else { // Otherwise...

				if ((link && link.replace(/\s/g, '') !== '') || (desc && desc.replace(/\s/g, '') !== '')) { // If there's a link, description, or both...

					if (link) {
						var valid = bugbook.main.validateUrl(link);

						if (valid) {

							var httpRegex = new RegExp('^(http|https)://.*$'),
								hasHttp = httpRegex.test(link);

							if (!hasHttp) {
								link = 'http://' + link;
							}

							if (desc) {

								bugbookRef.push({
									title: title,
									link: link,
									desc: desc
								});

							} else {

								bugbookRef.push({
									title: title,
									link: link,
									desc: ''
								});

							}

							bugbook.main.clearFields();

						} else {
							bugbook.main.fadeAlert(invalidUrlAlert); // Show validation alert
						}

					} else {

						bugbookRef.push({
							title: title,
							link: '',
							desc: desc
						});

						bugbook.main.clearFields();

					}

				} else { // Otherwise...

					bugbook.main.fadeAlert(missingFieldAlert); // Show validation alert

				}

			}

		},

		// Appends bug entry to a list of bugs
		displayBug: function(title, link, desc) {
			// $('#js-bugs-list > ul').append('<li><a href="' + link + '" title="' + title + '" target="_blank">' + title + '</a></li>');
			$('#js-bugs-list > ul').append('<li>Title: ' + title + '<br>Link: ' + link + '<br>Desc: ' + desc + '</li>');
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
			$('#js-link-desc').val(''); // Clear field
		}

	};

})(window.jQuery, window.Modernizr, window, window.document);

$(function () {

	'use strict';

	bugbook.main.init();

});