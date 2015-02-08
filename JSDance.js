var a="\n";
var max=0;

function list() {
	max=list.arguments.length;
	for (i=0; i<max; i++) {
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

steps_1 = [5, 10, 34, 19, 3];

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
	refreshIntervalId = setInterval("tick()", 200);

	step_new = stepThrough(steps_1);
	console.log(step_new[0])

	stepThrough(step_new);

	var feed = new Instafeed({
        get: 'tagged',
        tagName: 'hackathon',
        clientId: 'a201c5295e4a42d1bad1e23aa4cda7be',
        template: '<a href="{{link}}"><img src="{{image}}" /></a>'
  });

}

function stop() {
	clearInterval(refreshIntervalId);
}

//requestAnimationFrame instead of interval

function tick() {
	$("#canvas").html(frames[x]);
	x++;
	if (x == max) {
		x = 0;
	}
}