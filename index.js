const HTMLboard = document.getElementsByTagName("td");

var arrayBoard  = [[], [], [], [], []];

for (let i = 0; i < document.getElementsByTagName("tr").length; i++) {
	let children = document.getElementsByTagName("tr")[i].getElementsByTagName("td");
	for (let j = 0; j < children.length; j++) {
		arrayBoard[i][j] = children[j];
	}
}

console.log(arrayBoard);

var toggleHighlight = (e) => {
	e.target.classList.toggle("highlighted");
	if (checkForBingo() == true) {
		console.log("BINGO");
		if (!animationRunning) startAnimation();
	}
}

var checkForBingo = () => {
	// Check row
	for (let i = 0; i < arrayBoard.length; i++) {
		let rowIsBingo = true;
		for (let j = 0; j < arrayBoard[i].length; j++) {
			if (arrayBoard[i][j].className != "highlighted") {
				rowIsBingo = false;
				break;
			}
		}
		if (rowIsBingo) {
			return true;
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
			return true;
		}
	}
	return false;
}

var randint = (limit) => {
	return Math.floor(Math.random() * limit);
}

var entries = ["TGVguy", "Someone grinding the Ores route", "Complaints about Historically Inaccurate", "Stupid train suggestion", "Train deletes itself before spawning",
"Someone complains about @everyone", "Rokerige Joe", "Someone Complains about signals", "LIGHTS", "TTTE Roleplay", "Someone asks when the next update is",
"Big Dean", "Clock talks about NS 4000", "UnionPacificGuy is retarded in-game", "Cheeselined", "Traffic jam at Zand", "Someone spams whistles", "Missing sounds",
"Shitty bugreport without F9 screen", "Robin tells someone to boost", "Someone crashes into Zand", "Class 15", "Kid raging about stealing signals", 
"Low graphics uncropped screenshot", "Someone ragequits", "Someone mentions Doggo Cow", "Someone complains over the game choice", "Someone plays a meme song on the bot"];

// "Shiiba posts M Hund", 

console.log(entries.length);

for (let i = 0; i < HTMLboard.length; i++) {
	if (i == 12) continue; // skips functionality for the center square
	HTMLboard[i].addEventListener("click", toggleHighlight);
	let index = randint(entries.length);
	HTMLboard[i].innerText = entries[index];
	entries.splice(index, 1)
}


// canvas

class Square {
	constructor() {
		this.x = window.innerWidth / 2 + Math.random() * 100 - 50;
		this.y = window.innerHeight * 0.9;

		this.dx = Math.random() * 20 - 10;
		this.dy = Math.random() * 10 + 25;

		this.sideLength = Math.random() * 5 + 5;

		let colours = ["hotpink", "red", "lime", "cyan", "yellow"];

		this.colour = colours[Math.floor(Math.random() * colours.length)];

		// this.a = Math.random() * 2 * Math.PI; // angle
		// this.da = Math.random * Math.PI / 60;
	}

	draw() {

		ctx.fillStyle = this.colour;
		this.dy -= 0.75; // Gravity

		this.x += this.dx;
		this.y -= this.dy;

		ctx.fillRect(this.x, this.y, this.sideLength, this.sideLength);
	}
}

const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

window.addEventListener("resize", () => {
	c.width = window.innerWidth;
	c.height = window.innerHeight;
});

var frameCount = 0;

var animationRunning = false;

var animationObjects = [];

var startAnimation = () => {
	frameCount = 0;	
	animationObjects = [];
	animationRunning = true;

	for (let i = 0; i < 100; i++) {
		animationObjects.push(new Square());
	}
	console.log(typeof frameCount);
	console.log("ASDKAJSLKDJASLKDJASLKDJAKLS" + frameCount)
	animate();
}

var animate = () => {
	if (frameCount < 120) {
		requestAnimationFrame(animate);
	}
	else {
		animationRunning = false;
	}
	frameCount++;
	
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	animationObjects.forEach(obj => {
		obj.draw();
	});
}
