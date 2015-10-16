/*global window:false */
/*global $:false */
/*jslint plusplus: true */
/*global Firebase:false */

// Firebase Data: https://pvzp1paydyr.firebaseio-demo.com

var bugbook = bugbook || {};

(function ($, Modernizr, window, document) {

	'use strict';

	var bugbookRef 		= new Firebase('https://torrid-heat-7306.firebaseio.com/'),
		bugsList 		= $('#js-bugs-list'),
		searchTagsList	= $('#js-search-tags-list'),
		searchInput		= $('#js-search-input'),
		searchTags 		= [],
		emptyMessage 	= $('#js-bugs-list-empty');

	bugbook.main = {

		init: function () {
			var searchToggle 	= $('#js-search-toggle'),
				searchForm 		= $('#js-search-form'),
				searchButton 	= $('#js-search-button'),
				searchAddTag	= $('#js-search-add-tag'),
				submitToggle 	= $('#js-submit-toggle'),
				submitForm 		= $('#js-submit-bug-form'),
				submitButton 	= $('#js-submit-button');

			setTimeout(function() {
				$(emptyMessage).addClass('show');
			}, 500);
			
			// For each bug in data, display it
			bugbookRef.on('child_added', function(item) {
				var bug = item.val();

				if (emptyMessage.length > 0) {
					$(emptyMessage).hide();
				}

				bugbook.main.displayBug(bug.title, bug.link, bug.desc, bug.tags);

			});

			//---------- EVENTS ----------//

			// Toggle nav on click
			$(searchToggle).add(submitToggle).on('click', function () {

				if (!($(this).hasClass('active'))) {
					$(searchToggle)
						.add(submitToggle)
						.add(searchForm)
						.add(submitForm)
						.toggleClass('active');
				}
				
			});

			// Submit bug on button click
			$(submitButton).on('click', function() {
				bugbook.main.submitBug();
			});

			// Submit bug on enter
			// $(document).keypress(function(e) {

			//     if (e.which === 13) {
			//         bugbook.main.submitBug();
			//     }

			// });
			
			// Add tag to search on enter
			$(searchInput).keypress(function(e) {
				var tag = $(this).val();

			    if (e.which === 13) {
			        bugbook.main.addTagToSearch(tag);
			    }

			});

			// Add tag on click
			$(searchAddTag).on('click', function() {
				var tag = $(searchInput).val();
				bugbook.main.addTagToSearch(tag);
			});

			// Search for bugs on click
			$(searchButton).on('click', function() {

				if ($(searchInput).val().length > 0) {
					var tag = $(searchInput).val();
					bugbook.main.addTagToSearch(tag);
				}

				if (searchTags.length > 0) {
					bugbook.main.searchBugs(searchTags);
				}

			});

			// Toggle accordions when toggle is clicked
			$('body').on('click', '.js-accordion-toggle', function(e) {
				var accordion = $(e.target).parent();
				$(accordion).toggleClass('open');
			});

		},

		// Adds bug to DB
		submitBug: function() {
			var title = $('#js-title-input').val(),
				link = $('#js-link-input').val(),
				desc = $('#js-desc-input').val(),
				tags = $('#js-tags-input').val(),
				missingFieldAlert = $('#js-missing-field'),
				blankTitleAlert = $('#js-blank-title'),
				invalidUrlAlert = $('#js-invalid-url'),
				noTagsAlert = $('#js-no-tags');

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

						bugbook.main.clearSubmitFields();

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

					bugbook.main.clearSubmitFields();

				}

			// Otherwise...
			} else {
				// Show validation alert
				bugbook.main.fadeAlert(missingFieldAlert); 
			}

		},

		// Appends bug entry to a list of bugs
		displayBug: function(title, link, desc, tags) {
			var dataTags = '';

			$(tags).each(function (i) {
				var dataTag = tags[i].replace(/\s/g, '-');
				
				if (i === 0) {
					dataTags += dataTag;
				} else {
					dataTags += (' ' + dataTag);
				}

			});

			if (desc) {

				if (link) {
					$('#js-bugs-list > ul').append('<li class="js-accordion accordion clearfix" data-tags="' + dataTags + '"><i class="js-accordion-toggle toggle fa fa-plus-circle"></i><a class="title" href="' + link + '" title="' + title + '" target="_blank">' + title + ' <i class="fa fa-external-link-square"></i></a><div class="desc">' + desc + '</div></li>');
				} else {
					$('#js-bugs-list > ul').append('<li class="js-accordion accordion clearfix" data-tags="' + dataTags + '"><i class="js-accordion-toggle toggle fa fa-plus-circle"></i><span class="title">' + title + '</span><div class="desc">' + desc + '</div></li>');
				}

			} else {
				$('#js-bugs-list > ul').append('<li data-tags="' + dataTags + '"><a class="title" href="' + link + '" title="' + title + '" target="_blank">' + title + ' <i class="fa fa-external-link-square"></a></li>');
			}

		},

		addTagToSearch: function (tag) {
			var prevHtml = $(searchTagsList).html();

			tag = tag.toLowerCase();
			searchTags.push(tag);

			$(searchTagsList).addClass('has-tags');
			$(searchTagsList).html(prevHtml += '<span class="tag">' + tag + '</span>');
			$(searchInput).val(''); // Clear field

		},

		searchBugs: function(tags) {
			
			$(bugsList).addClass('search-active');

			$(searchTags).each(function (i) {
				var tag = searchTags[i].replace(/\s/g, '-');
				$('[data-tags~="' + tag + '"').addClass('show'); // Show results with the tag in data-tags
			});

			var results = $(bugsList).find('li.show');

			if (results.length === 0) { // If no results
				console.log('hi');
				$(emptyMessage).show(); // Show no results message
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

		clearSubmitFields: function() {

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