const API_KEY = 'f2IdtWRfwa37ubY3f2wGJ5MDReLY3klv';

$(function () {
	//add snap to first article feature..
	$(".dropdown select").change(function (e) {
		$(".article-grid").empty();

		let selectedVal = $(".dropdown select option:selected").text();
		$.getJSON(`https://api.nytimes.com/svc/topstories/v2/${selectedVal}.json?api-key=${API_KEY}`,
			function ({ results }) {
				console.log(results);
				let image, caption, articleLink;
				//let height = $(".nav-area").height();
				//let offset = height + $(".nav-area").offset().top;
				//$(".article-grid").offset({ top: offset }); //position of .article-grid set here
				//$(".nav-area").after (place loading.gif)	, also add class to it				//loading gif
				//be sure to style loading so the gif take up whole screen (min-height:100vh, width auto, object fit cover)
				$.each(results, function (key, val) {

					image = val.multimedia[0].url;

					if (image != null) {

						// if (height > val.multimedia[0].height) {
						// 	height = val.multimedia[0].height;
						// 	console.log("NEWEST MIN HEIGHT IS" + height);
						// }

						articleLink = val.url;
						caption = val.abstract;
						$(".article-grid").append(`
						<a href="${articleLink}" class="grid-links">
							<figure class="cell-${key}">
								<img src="${image}" /img>
								<figurecaption>
									<p>${caption}</p>
								</figurecaption>
							</figure>
						</a>`)
					}
				});
				//hide nav.area after
				//end of loading of images
				// let scrollPosition = $(".article-grid").position();
				// //add softscroll
				// window.scrollTo(scrollPosition);
				// console.log("scrolled");
				// let articleHeight = $(".article-grid").height();
				// let footerOffset = articleHeight + offset;
				// console.log(typeof articleHeight);
				// console.log(articleHeight);
				// console.log(footerOffset);
				// $("footer").offset({ top: footerOffset });

			});

	});

});



