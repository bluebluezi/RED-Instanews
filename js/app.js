
$(function () {


	const API_KEY = 'f2IdtWRfwa37ubY3f2wGJ5MDReLY3klv';
	let vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); //gets the device viewport width
	// let vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); 
	let cachedResults = null;
	const data = [    //select2 plug-in takes array as option data
		// { id: 0, text: "badCateTest" }, <-for debugging/tweakingg loader animation
		{ id: 1, text: "arts" },
		{ id: 2, text: "automobiles" },
		{ id: 3, text: "books" },
		{ id: 4, text: "business" },
		{ id: 5, text: "books" },
		{ id: 6, text: "business" },
		{ id: 7, text: "fashion" },
		{ id: 8, text: "food" },
		{ id: 9, text: "health" },
		{ id: 10, text: "home" },
		{ id: 11, text: "insider" },
		{ id: 12, text: "magazine" },
		{ id: 13, text: "movies" },
		{ id: 14, text: "NYregion" },
		{ id: 15, text: "obituaries" },
		{ id: 16, text: "opinion" },
		{ id: 17, text: "politics" },
		{ id: 18, text: "realestate" },
		{ id: 19, text: "science" },
		{ id: 20, text: "sports" },
		{ id: 21, text: "sundayreview" },
		{ id: 22, text: "technology" },
		{ id: 23, text: "theater" },
		{ id: 24, text: "t-magazine" },
		{ id: 25, text: "travel" },
		{ id: 26, text: "upshot" },
		{ id: 27, text: "U.S." },
		{ id: 28, text: "world" }]




	function calculateCol() { //determine # of columns depending on device viewport width
		if (vw < 768) { //typical breakpoints according to https://www.w3schools.com/howto/howto_css_media_query_breakpoints.asp
			return 1;
		} else if (vw < 992) {
			return 3
		} else {
			return 4;
		}
	}

	function renderGrid() {
		const colCount = calculateCol();
		$.each(cachedResults, function (key, val) {
			if (key > 11) {
				return false;
			}

			let image, caption, articleLink;
			image = val.multimedia[0].url;


			if (image != null) {

				let width = val.multimedia[0].width;
				let height = val.multimedia[0].height;
				if (width * 1.5 > height) {
					//when the image is wider than it is tall, which has an aspect ratio of 1:1.5
					height = vw / colCount * 1.5;
					width = 'auto';
				} else {
					//when the aspect ratio of image is narrower than the grid cell
					width = vw / colCount;
					height = 'auto';
				}

				articleLink = val.url;
				caption = val.abstract || val.title;
				$(".article-grid").append(`
				<a href="${articleLink}" class="grid-links">
					<figure class="cell-${key}">
						<img src="${image}" width="${width}" height="${height}"/img>
						<figurecaption>
							<p>${caption}</p>
						</figurecaption>
					</figure>
				</a>`)
			}
		});
	}
	$("#category-selector").select2({ //select2 plugin settings
		width: '100%',
		theme: 'classic',
		placeholder: "Sections...",
		data: data,
		closeOnSelect: true
	});

	//(future proposal add snap to first article feature..
	//add gradient/shadows to soften the edges of each grid cell
	$("#category-selector").change(function (e) {
		$(".article-grid").empty();
		$(".error-wrapper").removeClass('show');
		$(".loading-wrapper").addClass('show');
		$("header").addClass("shrink");
		let selectedVal = $("#category-selector").find(':selected').text(); //
		$.getJSON(`https://api.nytimes.com/svc/topstories/v2/${selectedVal}.json?api-key=${API_KEY}`)
			.done(function ({ results }) {
				console.log('success');
				$(".loading-wrapper").removeClass('show');
				cachedResults = results;
				renderGrid();
			}).fail(function (error) {
				console.log(error.responseText);
				$(".loading-wrapper").removeClass('show');
				$(".error-wrapper p").text(error.responseText);
				$(".error-wrapper").addClass('show');
			})
	});

	$(window).resize(function () {
		vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		if (cachedResults !== null) {
			renderGrid();
		}
	})
});



