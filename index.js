const HTMLboard = document.getElementsByTagName("td");

var arrayBoard  = [[], [], [], [], []]; // saving the board in a 2d array making it easier to check for bingo

var bingoCount = 0;

for (let i = 0; i < document.getElementsByTagName("tr").length; i++) {
	let children = document.getElementsByTagName("tr")[i].getElementsByTagName("td");
	for (let j = 0; j < children.length; j++) {
		arrayBoard[i][j] = children[j];
	}
}

var toggleHighlight = (e) => {
	e.target.classList.toggle("highlighted");
	let bingo = checkForBingo();
	if (bingo != 0) {
		if (!animationRunning && bingoCount < bingo) {
		startAnimation();
		} 
	}
	bingoCount = bingo;
}

var checkForBingo = () => {

	let newBingoCount = 0; // counting the bingos;
	// Checks each row for 
	for (let i = 0; i < arrayBoard.length; i++) {
		let rowIsBingo = true;
		for (let j = 0; j < arrayBoard[i].length; j++) {
			if (arrayBoard[i][j].className != "highlighted") {
				rowIsBingo = false;
				break;
			}
		}
		if (rowIsBingo) {
			newBingoCount += 1;
		}
	}

	//check column

	for (let i = 0; i < arrayBoard.length; i++) {
		let columnIsBingo = true;
		for (let j = 0; j < arrayBoard[i].length; j++) {
			if (arrayBoard[j][i].className != "highlighted") {
				columnIsBingo = false;
				break;
			}
		}
		if (columnIsBingo) {
			newBingoCount += 1;
		}
	}
	return newBingoCount;
}

var randint = (limit) => {
	return Math.floor(Math.random() * limit);
}

// array of all possible entries onto the bingo board
var entries = ["TGVguy", "Someone grinding the Ores route", "Complaints about Historically Inaccurate", "Stupid train suggestion", "Train deletes itself before spawning",
"Someone complains about @everyone", "Rokerige Joe", "Someone Complains about signals", "Someone driving without lights", "TTTE Roleplay", "Someone asks when the next update is",
"Big Dean", "Clock talks about NS 4000", "UnionPacificGuy is retarded in-game", "Cheeselined", "Traffic jam at Zand", "Someone spams whistles", "Missing sounds",
"Shitty bugreport without F9 screen", "Robin tells someone to boost", "Someone crashes into Zand", "Class 15", "Kid raging about stealing signals", 
"Low graphics uncropped screenshot", "Someone ragequits", "Someone posts Doggo Cow in #general", "Someone suggests crashes", "Game shutdown because update has bug",
"The Cylinder", "you spin me right round", "Someone finds the Smoldrinsk easter egg", "Shiiba posts a shiba", "vroom vroom", "Potvis", "Westinghouse brake pump",
"Train without wagons", "Someone shunting", "Someone speeding and not stopping anywhere", "A train is going through another train", "Halloween train", "Christmas train", 
"NS 3737"];

// array of things that can be displayed on the free space
var freeSpace = ["Signals are red for no reason", "Emil doesn't make house"];

for (let i = 0; i < HTMLboard.length; i++) {
	if (i == 12) { // if it's the free space in the middle
		HTMLboard[i].innerText += freeSpace[randint(freeSpace.length)];
		continue;
	}
	HTMLboard[i].addEventListener("click", toggleHighlight); // setting an eventlistener for each square individually isn't the best but it's easier so whatever
	let index = randint(entries.length);
	HTMLboard[i].innerText = entries[index]; // randomises the text on the square
	entries.splice(index, 1); // removes the text from the list so we don't get duplicates
}

// canvas animation stuff

class Square {
	constructor() {
		this.x = window.innerWidth / 2 + Math.random() * 100 - 50; // random x position
		this.y = window.innerHeight * 0.9; // constant y position

		this.dx = Math.random() * 30 - 15; //random x and y speeds
		this.dy = Math.random() * 10 + 20;

		this.height = Math.random() * 5 + 5; // random size
		this.width = Math.random() * 5 + 5;

		let colours = ["hotpink", "red", "lime", "cyan", "yellow"]; // array of colours

		this.colour = colours[Math.floor(Math.random() * colours.length)]; // randomizes said array of colours

		this.a = Math.random() * 2 * Math.PI; // gives it a random angle
		this.da = Math.random() * Math.PI / 15; // gives it a random angular velocity
	}

	draw() {

		// method for drawing an instance of the Square object

		ctx.fillStyle = this.colour; // sets the colour
		this.dy -= 0.6; // Gravity
		// this.dy *= 0.99;

		this.dx *= 0.99; // reduces sideways velocity over time

		this.x += this.dx; // adds the positions
		this.y -= this.dy;

		this.a += this.da; // adds the rotation

		ctx.translate(this.x, this.y); // moving the entire screen and rotating it is the only way I know to achieve rotation of objects
		ctx.rotate(this.a);

		ctx.fillRect(0, 0, this.width, this.height);

		ctx.rotate(-this.a); // rotates it back
		ctx.translate(-this.x, -this.y);

	}
}

const c = document.getElementById("canvas"); // getting the canvas object
const ctx = c.getContext("2d"); // getting the CanvasRenderingContext2D

c.width = window.innerWidth; //sets the size of the context so it always fills the screen
c.height = window.innerHeight;

window.addEventListener("resize", () => { // if the window is resized it updates the size of the canvas
	c.width = window.innerWidth;
	c.height = window.innerHeight;
});

// variables to keep track of things during the animation cycle

var frameCount = 0;

var animationRunning = false;

var animationObjects = [];

var startAnimation = () => { // function to start the animation
	frameCount = 0;	
	animationObjects = [];
	animationRunning = true;

	for (let i = 0; i < 100; i++) { // creates 100 "confetti" squares
		animationObjects.push(new Square());
	}
	animate();
}

var stopAnimation = () => { // function to stop and clean up the animation
	animationRunning = false;
	ctx.clearRect(0, 0, innerWidth, innerHeight); // clears the screen
}

var animate = () => {
	if (frameCount < 120) { // makes sure the animation only runs for 120 frames
		requestAnimationFrame(animate);
	}
	else {
		stopAnimation();
		return;
	}
	frameCount++;
	
	ctx.clearRect(0, 0, innerWidth, innerHeight); // clears the screen

	animationObjects.forEach(obj => { // draws all the objects
		obj.draw();
	});
}