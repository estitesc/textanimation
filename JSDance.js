var a="\n";
var num_frames=0;
var time=0;
var current_frame = 0;

function list() {
	num_frames=list.arguments.length;
	for (i=0; i<num_frames; i++) {
		this[i]=list.arguments[i];
	}
}

frames_old = new list(
"  o <br />"  +
" /|\\ <br />" +
" / \\ <br />",

"  0 <br />" +
" /|\\ <br />" +
" | \\ <br />",

"  o <br />"  +
" /|\\ <br />" +
" / | <br />",

"  0 <br />"  +
" /|\\ <br />" +
" / \\ <br />"
);

frames = new list(
"Hello<br />"  +
"What<br />" +
"No<br />",

"Hello?<br />" +
"Whaaa<br />" +
"Oh... <br />",

"Hello<br />"  +
"What<br />" +
"Damn<br />",

"Hullo<br />"  +
"What?<br />" +
"NO.<br />"
);

steps_1 = [500, 100, 134, 319, 30];

function stepThrough(steps) {
	step = steps[0];

	steps_length = steps.length;
	max = steps_length;

	new_steps = [];

	for (i=0; i<max; i++) {
		if(i == max-1) {
			new_steps[i] = steps[0];
		} else {
			new_steps[i] = steps[i+1];
		}
	}

	steps = new_steps;

	console.log(steps[0]);

	return steps;
}

var x=0;
var refreshIntervalId;

function start() {

	step_new = stepThrough(steps_1);

	refreshIntervalId = setInterval("tickNew()", 1);

	step_new = stepThrough(steps_1);
	console.log(step_new[0])

	stepThrough(step_new);
}

function stop() {
	clearInterval(refreshIntervalId);
}

function instagramFeed(tag) {
	var feed = new Instafeed({
        get: 'tagged',
        tagName: tag,
        clientId: 'a201c5295e4a42d1bad1e23aa4cda7be',
        useHttp: 'true'
  });
  feed.run();
}

//requestAnimationFrame instead of interval

//ten thousand click cycle
function tickNew() {
	x++;
	if (x == 10000) {
		x = 0;
	}
	time=x;

	if (x % 200 == 0) {
		nextFrame();
	}
}

function nextFrame() {
	current_frame++;

	if(current_frame >= num_frames-1) {
		current_frame = 0;
	}

	$("#canvas").html(frames[current_frame]);
}

//Grab onclick action to capture word

$("#grab").click(function() {
	$("#canvas").html($("#text_input").val());

	//Calling the Instagram feed!
	instagramFeed($("#text_input").val());
});
