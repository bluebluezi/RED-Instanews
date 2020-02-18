
$(function () { //run after jQuery loaded

	const API_KEY = 'f2IdtWRfwa37ubY3f2wGJ5MDReLY3klv';
	let vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	let vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	let cachedResults = null;

	function calculateRowCount() {
		if (vw < 768) {
			return 1;
		} else if (vw < 992) {
			return 3
		} else {
			return 4;
		}
	}

	function renderGrid() {
		console.log('rerendering');
		$(".article-grid").empty();
		const rowCount = calculateRowCount();
		$.each(cachedResults, function (key, val) {
			let image, caption, articleLink;
			image = val.multimedia[0].url;


			if (image != null) {

				let width = val.multimedia[0].width;
				let height = val.multimedia[0].height;
				if (1.5 * width > height) {
					height = vw / rowCount * 1.5;
					width = 'auto';
				} else {
					width = vw / rowCount;
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

	//add snap to first article feature..
	$(".dropdown select").change(function (e) {
		$(".article-grid").empty();

		let selectedVal = $(".dropdown select option:selected").text();
		$.getJSON(`https://api.nytimes.com/svc/topstories/v2/${selectedVal}.json?api-key=${API_KEY}`,
			function ({ results }) {
				console.log(results);
				cachedResults = results

				renderGrid();
			});
	});

	$(window).resize(function () {
		vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		if (cachedResults !== null) {
			renderGrid();
		}
	})
});



