//canvas property
var canvas = document.getElementById("myCanvas");
canvas.style.position = 'absolute';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//add canvas to body
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');
//circle diameter
var size = 10;
//particles Array
var particles = new Array();
//particle
var Particle = function(x, y, sx, sy, r, g, b, a) {
	//update function
	this.update = function() {
		//move particle
		
		x += sx;
		y += sy;
		//If particle reach border, it will disappear
		if (x < (-size) || x > (canvas.width + size)) {
			var index = particles.indexOf(this);
			particles.splice(index, 1);
			return false;
		}

		//friction
		if (y > canvas.height - size) {
			y = canvas.height - size;
			sy = -sy * 0.8;
		}

		//gravity
		sy += 0.98;

		//Clear away particle which stay in the bottom without elasticity
		if ((Math.abs(y - (canvas.height - size)) < 1) && (Math.abs(sy) < 1)) {
			a = a * 0.8;
		}

		if (a < 0.05) {
			var index = particles.indexOf(this);
			particles.splice(index, 1);
			return false;
		}

		//draw circle
		ctx.beginPath();
		ctx.arc(x, y, size, 0, 2 * Math.PI, false);
		ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
		ctx.fill();

		return true;
	}

}

//throw particle
var throwParticle = function(x, y) {

	//random colour
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var a = Math.random() * 0.5 + 0.5;

	//create a particle
	var particle = new Particle(x, y, (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 8 + 2), -Math.random() * 20, r, g, b, a);

	//put the particle in array
	particles.push(particle);

}

//mouse operation
document.addEventListener('mousedown', function(event) {

	event.preventDefault();

	document.addEventListener('mousemove', onMouseMove, false);

}, false);

document.addEventListener('mouseup', function(event) {

	event.preventDefault();

	throwParticle(event.clientX, event.clientY);

	document.removeEventListener('mousemove', onMouseMove, false);

}, false);

function onMouseMove(event) {

	event.preventDefault();

	throwParticle(event.clientX, event.clientY);

}

//touch operation for phone and table
document.addEventListener('touchstart', function(event) {

	event.preventDefault();

	for (var i = 0; i < event.changedTouches.length; i++) {

		throwParticle(event.changedTouches[0].pageX, event.changedTouches[0].pageY);

	}

}, false);

document.addEventListener('touchmove', function(event) {

	event.preventDefault();

	for (var i = 0; i < event.touches.length; i++) {

		throwParticle(event.touches[i].pageX, event.touches[i].pageY);

	}

}, false);

//continue calling the function update to move the particles or delete the particles
setInterval(function() {

	var i = 0;
	var l = particles.length;

	while (i < l) {
		if (particles[i].update()) {
			i++;
		} else {
			l--;
		}
	}


}, 20);

function clearscreen(){
	particles.splice(0,particles.length);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}