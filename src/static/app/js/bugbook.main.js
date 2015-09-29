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
				$('#js-title-input').val(''); // Clear field
				$('#js-link-input').val(''); // Clear field
			});
			
			// For each bug, display it
			bugbookRef.on('child_added', function(item) {
				var bug = item.val();
				bugbook.main.displayBug(bug.title, bug.link);
			});

		},

		// Adds bug to DB
		addBug: function() {
			var title = $('#js-title-input').val(),
				link = $('#js-link-input').val();

			// Add validation later

			bugbookRef.push({
				title: title,
				link: link
			});

		},

		// Appends bug entry to a list of bugs
		displayBug: function(title, link) {
			$('#js-bugs-list > ul').append('<li><a href="' + link + '" title="' + title + '" target="_blank">' + title + '</a></li>');
		}

	};

})(window.jQuery, window.Modernizr, window, window.document);

$(function () {

	'use strict';

	bugbook.main.init();

});