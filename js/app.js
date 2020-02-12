// let el = document.getElementsByClassName('sub-header')
// console.log(el);
// key to jquery is the $ sign object
// jquery version: let el = $(".sub-header")
// $(function() {
// 	let counter = 5;

// 	$('.page-wrapper').on('click', function() {
// 		// counter++;
// 		// $('.numbers').append(`<li>${counter}</li>`);

// 		let val = $('input[type="text"]').val();
// 		console.log(val);
// 		$('.page-wrapper').append(val);
// 		$("input[type='text']").val('');
// 	});

// 	$('form').after('<button>Check Value</button>');
// });

$(function () {


	$('.select-dropdown').change(function (e) {
		$(".article-grid").empty();

		let selectedVal = $(".select-dropdown option:selected").text();
		$.getJSON(`https://api.nytimes.com/svc/topstories/v2/${selectedVal}.json?api-key=f2IdtWRfwa37ubY3f2wGJ5MDReLY3klv`,
			function ({ results }) {
				console.log(results);
				let image, caption, articleLink;
				let height = 1500; //initialized height variable to keep track of shortest image
				$.each(results, function (key, val) {
					//loading gif
					if (key > 11) {
						// $("a").height(`${height}`);
						// console.log("the computed height is" + height);
						return false;
					}

					image = val.multimedia[0].url;

					// if (height > val.multimedia[0].height) {
					// 	height = val.multimedia[0].height;
					// 	console.log("NEWEST MIN HEIGHT IS" + height);
					// }
					console.log("all the heights" + val.multimedia[0].height);

					articleLink = val.url;
					caption = val.abstract;
					$(".article-grid").append(`<a href="${articleLink}" class="grid-links"><figure class="cell${key}"><img src="${image}" /img><p>${caption}</p></figure></a>`)

				});

				// (figure.height = height here)
			});

	});

});



