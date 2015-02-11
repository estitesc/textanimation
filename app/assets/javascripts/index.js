// frames = new list(
// "Hello<br />"  +
// "What<br />" +
// "No<br />",

// "Hello?<br />" +
// "Whaaa<br />" +
// "Oh... <br />",

// "Hello<br />"  +
// "What<br />" +
// "Damn<br />",

// "Hullo<br />"  +
// "What?<br />" +
// "NO.<br />"
// );

$(document).ready(function() {
	setListeners();
	start();
});

function setListeners() {
	// TODO: Submit with ENTER key, will work for now but we should really change
	// tag input box to be inside a form 
	$("#tagInput").keydown(function(e) {
		var key = e.which;
		if (key == 13) getInstaPhotos($("#tagInput").val());
	});

	$("#grab").click(function() {
		// Calling the Instagram feed!
		getInstaPhotos($("#tagInput").val());
	});
}

/** COUNTER/TICKER ***********************************************************/
var time = 0;
var refreshIntervalId;
var stepInterval = [500, 100, 134, 319, 30];
var ticker = 0;
var feedStarted = 0;

function start() {
	stepNew = stepThrough(stepInterval);
	refreshIntervalId = setInterval("tickNew()", 1);
	stepNew = stepThrough(stepInterval);
	stepThrough(stepNew);
}

function stepThrough(steps) {
	step = steps[0];
	max = steps.length;
	newSteps = [];

	for (i = 0; i < max; i++) {
		if (i == max-1) newSteps[i] = steps[0];
		else newSteps[i] = steps[i+1];
	}

	steps = newSteps;
	return steps;
}

function tickNew() {
	ticker++;
	if (ticker == 10000) ticker = 0;
	time = ticker;

	if (ticker % 400 == 0) {
		if (feedStarted == 1) {
			refreshFeed();
		}
	}
}

function stop() {
	clearInterval(refreshIntervalId);
}

/** INSTAFEED ****************************************************************/
var feed = 0;

function getInstaPhotos(tag) {
	feed = new Instafeed({
    get: 'tagged',
    tagName: tag,
    clientId: 'a201c5295e4a42d1bad1e23aa4cda7be',
    useHttp: 'true',
    resolution: 'standard_resolution',
    limit: '1',
    template: '<a target="_blank" class="animation" href="{{link}}"><img src="{{image}}" /></a>'
  });

  clearFeed();
  feed.run();
  feedStarted = 1;
}

function clearFeed() {
	insta1 = $("#instafeed").html();
	$("#instafeed2").html(insta1);
	$("#instafeed").html("");
}

function refreshFeed() {
	clearFeed();
	feed.next();
}
